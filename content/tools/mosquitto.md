# mosquitto 源码安装部署

MQTT（Message Queuing Telemetry Transport）是一种轻量级、基于发布-订阅模式的消息传输协议，适用于资源受限的设备和低带宽、高延迟或不稳定的网络环境。它在物联网应用中广受欢迎，能够实现传感器、执行器和其它设备之间的高效通信。

Eclipse Mosquitto 是一个开源（EPL/EDL 许可）消息代理，实现了 MQTT 协议版本 5.0、3.1.1 和 3.1。Mosquitto 重量轻，适用于从低功耗单板计算机到全服务器的所有设备。

## 在 CentOS 源码安装 mosquitto

1，从 https://mosquitto.org/download/ 下载源码到 Linux 服务器。

2，解压缩后，编译安装

```
make
make install
```

在编译时，提示 cJSON 找不动，先安装 cJSON。
从该地址下载：https://github.com/DaveGamble/cJSON

```
make
make install
```

3，配置 mosquitto，在/etc/mosquitto 目录下，将 mosquitto.conf.example 改为 mosquitto.conf。
将以下内容修改：

```
# 端口
listener 1883
# 日志
log_dest file /var/log/mosquitto/mosquitto.log
log_type warning
connection_messages true
log_timestamp true
log_timestamp_format %Y-%m-%dT%H:%M:%S
# 安全
allow_anonymous false
password_file /etc/mosquitto/pwfile
acl_file /etc/mosquitto/aclfile
```

这里，浪费了我很长时间，在添加 password_file 之后，服务无法启动。后经排查，是权限的问题。
我使用的 root 账户，这是最终的修复脚本：

```
chmod 0700 /etc/mosquitto/pwfile
chown mosquitto:mosquitto /etc/mosquitto/pwfile
chmod 0700 /etc/mosquitto/aclfile
chown mosquitto:mosquitto /etc/mosquitto/aclfile
```

pwfile 可以使用 mosquitto_passwd 命令创建，脚本如下：

```
mosquitto_passwd -c /etc/mosquitto/pwfile roger
```

将创建用户 roger,如果文件已经存在，可以去掉-c 参数。

aclfile 文件可以复制模板，样例如下：

```
# This affects access control for clients with no username.
topic read $SYS/#

# This only affects clients with username "roger".
user roger
topic test/topic

# This affects all clients.
pattern write $SYS/broker/connection/%c/state
```

经过测试，当 aclfile 文件中如果没有配置某个 topic，而在应用中使用时，消息无法送达，起到了控制作用。

4，配置成服务，可以在源码中复制 service/systemd/mosquitto.service.example 到/usr/lib/systemd/system 这个目录中。例如：

```
cp /root/mosquitto-2.0.18/service/systemd/mosquitto.service /usr/lib/systemd/system

# 启动服务
systemctl start mosquitto
```

5，连接 mosquitto 并进行测试

开启一个窗口，启动订阅

```
mosquitto_sub -p 1883 -u '用户名' -P '密码' -t 'test/topic' -v
```

开启一个窗口，发布消息

```
mosquitto_pub -p 1883 -u '用户名' -P '密码' -t 'test/topic' -m 'hello world'
```

最后，如果你要在公网访问，请把防火墙打开。

使用 golang mqtt 库连接 broker 示例代码：

```
package main

import (
	"fmt"
	"time"

	mqtt "github.com/eclipse/paho.mqtt.golang"
)

var msgPubHandler mqtt.MessageHandler = func(c mqtt.Client, m mqtt.Message) {
	fmt.Printf("Received message: %s from topic: %s\n", m.Payload(), m.Topic())
}

var connHandler mqtt.OnConnectHandler = func(c mqtt.Client) {
	fmt.Println("Connected")
}

func sub(client mqtt.Client) {
	topic := "cn/91demo/wander"
	token := client.Subscribe(topic, 1, nil)
	token.Wait()
	fmt.Printf("Subscribed to topic %s", topic)
}

func pub(client mqtt.Client) {
	num := 10
	for i := 0; i < num; i++ {
		text := fmt.Sprintf("Message %d", i)
		token := client.Publish("cn/91demo/wander", 0, false, text)
		token.Wait()
		time.Sleep(time.Second)
	}
}

func main() {
	opts := mqtt.NewClientOptions()
	opts.AddBroker("mqtt://localhost:1883")
	opts.SetClientID("go_mqtt_client")
	opts.SetUsername("demo")
	opts.SetPassword("123123")
	opts.SetDefaultPublishHandler(msgPubHandler)
	opts.OnConnect = connHandler

	client := mqtt.NewClient(opts)
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		panic(token.Error())
	}

	sub(client)
	pub(client)

	client.Disconnect(250)
}

```

# Mosquitto 配置认证

在 Mosquitto 实例上配置身份验证非常重要，这样未经授权的客户端就无法连接。

在 Mosquitto 2.0 及更高版本中，你必须明确选择身份验证选项，然后客户端才能连接。早期版本中，默认设置是允许客户端无需身份验证即可连接。

身份验证有三种选择：密码文件、身份验证插件和匿名访问。可以使用三个选项的组合。

在 Mosquitto2.0 及更高版本中，可以通过配置文件中将 per_listener_settings 设置为 true，让不同的侦听器使用不同的身份验证方法。

除了身份验证，您还应该考虑访问权限控制，以确定哪些客户端可以访问哪些主题。

## 密码文件设置

密码文件是一种将用户名和密码存储在单个文件中的简单机制。适合于有相对较少的静态用户。请注意，修改了密码文件后，需要重新加载 mosquitto。

创建密码文件，可以使用`mosquitto_passwd`工具，命令如下：

```
mosquitto_passwd -c <password file> <username>
```

请注意，使用-c 标志将覆盖已存在的文件，如果向已存在文件添加，请去掉-c 标志。

要开始使用密码文件，需要配置 broker，在配置文件中，添加如下项：

```
password_file <path to the configuration file>
```

密码文件必须能够被运行 mosquitto 的用户读取。

## 身份验证插件设置

如果你需要更多的控制来认证用户，你需要使用认证插件。具体的特性依赖于你使用的认证插件。

可使用的插件：

- mosquitto-go-auth ，它提供了各种后端来存储用户数据，例如 mysql,postgresql,jwt 或 redis 等。
- Dynamic security，动态安全插件，仅适用于 2.0 及更高版本，可提供原创管理的灵活的代理客户端、组和角色。

配置身份验证插件依赖你的 Mosquitto 的版本。

版本 1.6.x 和以前的版本，使用`auth_plugin`选项。这个选项在版本 2.0 也被支持。

```
listener 1883
auth_plugin <path to plugin>
```

版本 2.0 及更高，使用`plugin`选项。

```
listener 1883
plugin <path to plugin>
```

## 匿名访问设置

配置匿名访问，请使用`allow_anonymous`选项。

```
listener 1883
allow_anonymous true
```

允许对同一代理进行匿名和身份验证访问是有效的。特别是，动态安全插件允许您为匿名用户分配与经过身份验证的用户不同的权限，例如，这可能对数据的只读访问有用。

# 给 Mosquitto 配置 Go Auth 插件

Mosquitto Go Auth 是 Mosquitto MQTT 代理的身份验证和授权插件。之所以叫这个名字，是因为历史的原因，现在改名字太晚了，影响太大。

Mosquitto 是一个很流行的开源 MQTT 代理。go-auth 主要使用 Go 语言编写，它使用 cgo 来调用 mosquitto 的 auth-plugin 函数。

它支持并实现了以下后端：

- 文件
- Postgresql 数据库
- Mysql 数据库
- Sqlite3 数据库
- MongoDB 数据库
- Redis
- JWT
- HTTP
- gRPC
- Javascript 解释器
- 定制后端

每个后端都提供用户、超级用户和 ACL 检查，并包括适当的测试。

我们先来构建它，构建它需要 cgo 环境，并且需要先构建 mosquitto。我们在 Linux 主机上安装 gcc，并安装 golang 环境，golang 版本要求 1.18 以上。

我们从`https://github.com/eclipse/mosquitto`下载源码文件。然后参考说明文档编译安装 mosquitto。我使用的 CentOS7，直接通过`yum install mosquitto`安装，安装的 mosquitto 版本为 1.6.10。所以我要下载 mosquitto1.6.10 的源代码。将代码中的 mosquitto.h，mosqutto_plugin.h 和 mosquitto_broker.h 文件复制到/usr/local/include 目录。

我们从`https://github.com/iegomez/mosquitto-go-auth`下载 go auth 的源码文件。我下载的当前版本为 2.1.0，解压缩并进入到源文件目录。输入命令`make`，将编译一个 pw 二进制文件和一个 go-auth.so 文件。我们将 go-auth.so 文件复制到`/usr/local/lib`目录，将 pw 二进制文件复制到`/usr/local/bin`目录。pw 可以用来生成密码，go-auth.so 是 mosquitto 调用的库。

现在我们调整配置，启用 go auth 插件。在/etc/mosquitto/mosquitto.conf 文件中添加如下内容：

```
include_dir /etc/mosquitto/conf.d
```

然后，在/etc/mosquitto 目录下，创建 conf.d 文件夹。进入 conf.d 文件夹，创建 go-auth.conf 文件。在该文件中，先加入如下内容：

```
auth_plugin /etc/mosquitto/conf.d/go-auth.so
auth_opt_backends files, postgres

## 添加日志
auth_opt_log_level debug
auth_opt_log_dest file
auth_opt_log_file /var/log/mosquitto.log
## 添加加密算法
auth_opt_hasher bcrypt
auth_opt_hasher_cost 10

```

我只使用了文件和 PG 数据库这两种后端，所以先讲这两种的配置方法。先来配置文件。

```
auth_opt_files_password_path /etc/mosquitto/conf.d/password_file
auth_opt_files_acl_path /etc/mosquitto/conf.d/acl_file
```

先给这两个文件修改拥有者和属性。这样 mosquitto 服务启动后，可以有权限调用这两个文件。

```
chown mosquitto:mosquitto password_file
chown mosquitto:mosquitto acl_file
chmod 0600 password_file
chmod 0600 acl_file
```

使用 pw 为用户生成密码，

```
pw -h brcrypt -p 123456(你的密码)
```

password_file 格式如下：

```
test1:$2a$10$ATi9XlzxcevYuiznP90cuuWDCvrKJKguF6KBhMKrIgWWtBSjd44XO
test2:$2a$10$DSbIaUqwJ8nTBFHyEt.5GOvSbOcRVREJGNFdquOnRdk9.4QopcOjC
test3:$2a$10$do17Uiopj9kQfPsmRIboh.3KwbUNHAS/7cUtxN8a44kUBQiAqbZ6i
```

注意，你的密码肯定和我的不一样。

acl_file 格式如下：

```
user test1
topic write test/topic/1
topic read test/topic/2

user test2
topic read test/topic/+

user test3
topic read test/#

pattern read test/%u
pattern read test/%c

```

重启 mosquitto 服务，文件后端配置就生效了。

下面我们再来讲讲如何配置 PG 数据库。需要先创建两个表，表的结构如下：

```
create table test_user(
id bigserial primary key,
username character varying (100) not null,
password_hash character varying (200) not null,
is_admin boolean not null);

create table test_acl(
id bigserial primary key,
test_user_id bigint not null references test_user on delete cascade,
topic character varying (200) not null,
rw int not null);
```

更具体的 PG 创建数据库和用户就不细节了。在库中创建这两个表。然后添加如下配置到 go-auth.conf 文件中。

```
auth_opt_pg_host localhost
auth_opt_pg_port 5432
auth_opt_pg_dbname appserver
auth_opt_pg_user appserver
auth_opt_pg_password appserver
auth_opt_pg_connect_tries 5
auth_opt_pg_userquery select password_hash from test_user where username = $1 limit 1
auth_opt_pg_superquery select count(*) from test_user where username = $1 and is_admin = true
auth_opt_pg_aclquery SELECT a.topic FROM test_user u left join test_acl a on u.id = a.test_user_id WHERE (u.username = $1) AND a.rw = $2

```

上面的配置信息仅作为参考，请根据你实际的情况进行调整。

在实际调试连接时，碰到两个问题，记录下来，以备查询。

1，连接 pg 数据库后，使用 mqtt 客户端无法连接，一直报错没有认证，数据报文 mqtt3.1.1 返回 5，mqtt5.0 返回 135。

经过排查，是配置文件问题，我使用的 mosquitto 的版本为 1.6.10。在 mosquitto 配置文件中，将下面两行注释掉，让代理取 go-auth 中的配置。

```
allow_anonymous false
#password_file /etc/mosquitto/pwfile
#acl_file /etc/mosquitto/aclfile
include_dir /etc/mosquitto/conf.d
```

2，使用 pg 的账户连接成功后，一直无法订阅主题，提示权限问题。

经过排查，是在 pg 数据库设置订阅权限问题，Readme 中有提到，但没有注意。

```
Mosquitto 1.5 introduced a new ACL access value, MOSQ_ACL_SUBSCRIBE, which is similar to the classic MOSQ_ACL_READ value but not quite the same:

Also, these are the current available values from mosquitto:

#define MOSQ_ACL_NONE 0x00
#define MOSQ_ACL_READ 0x01
#define MOSQ_ACL_WRITE 0x02
#define MOSQ_ACL_SUBSCRIBE 0x04

```

所以，如果你使用 1.5 版本以后，需要添加 MOSQ_ACL_SUBSCRIBE 0x04。否则没有权限。

下面是调通之后的正常日志：

```
time="2024-09-30T11:44:07+08:00" level=debug msg="Superuser check with backend Postgres"
time="2024-09-30T11:44:07+08:00" level=debug msg="Acl check with backend Postgres"
time="2024-09-30T11:44:07+08:00" level=debug msg="user c7a610f7176ebf8f0056 acl authenticated with backend Postgres"
time="2024-09-30T11:44:07+08:00" level=debug msg="Acl is true for user c7a610f7176ebf8f0056"
```
