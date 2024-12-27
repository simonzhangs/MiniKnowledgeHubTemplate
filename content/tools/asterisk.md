# Asterisk

# Asterisk 常见错误

403 登录失败

解决：等待 1 分钟，等超时之后重新连接即可。一般是切换 IP 时或者换软电话登录会碰到。

401 登录失败

解决：检查账户和密码是否正确？检查连接地址是否正确？检查 Asterisk 是否启动？检查防火墙端口是否打开？

408 连接超时

解决：一般是 Asterisk 服务不通，检查 Asterisk 服务是否启动，检查防火墙是否打开？

可以拨通，没有声音？

一般是 NAT 造成，配置这三个参数：rtp_symmetric，force_rport，rewrite_contact。

SIP 客户端没有自动挂机？

一般是没有设置 stun 造成的，在 SIP 客户端，设置 stun 即可。如果没有 stun server，可以设置这个`stun.l.google.com:19302`

AGI 脚本返回状态 4，正常应该为 0？

查看网上资料，是 AGI 脚本中调用 Hangup 导致，将脚本中的 Hangup 去掉，放在拨号计划配置文件中执行 Hangup，可以解决这个问题。

```
AGI Script agidemo completed, returning 0
```

# 配置实时数据库

今天讲解 Asterisk 如何实时将 SIP 用户写入 sqlite3 数据库。

## 先定义数据库表结构，我当前使用的 PJSIP 协议。

```

CREATE TABLE ps_endpoints (
    id VARCHAR(40) NOT NULL,
    transport VARCHAR(40),
    aors VARCHAR(200),
    auth VARCHAR(40),
    context VARCHAR(40),
    disallow VARCHAR(200),
    allow VARCHAR(200),
    direct_media varchar(5) check(direct_media in ('yes','no')),
    connected_line_method varchar(10) check(connected_line_method in ('invite','reinvite','update')),
    direct_media_method varchar(10) check(direct_media_method in ('invite','reinvite','update')),
    direct_media_glare_mitigation varchar(20) check(direct_media_glare_mitigation in ('none','outgoing','incoming')),
    disable_direct_media_on_nat varchar(5) check(disable_direct_media_on_nat in ('yes','no')),
    dtmf_mode varchar(20) check(dtmf_mode in ('rfc4733','inband','info')),
    external_media_address VARCHAR(40),
    force_rport varchar(5) check(force_rport in ('yes','no')),
    ice_support varchar(5) check(ice_support in ('yes','no')),
    identify_by varchar(10) check(identify_by in ('username')),
    mailboxes VARCHAR(40),
    moh_suggest VARCHAR(40),
    outbound_auth VARCHAR(40),
    outbound_proxy VARCHAR(40),
    rewrite_contact varchar(5) check(rewrite_contact in ('yes','no')),
    rtp_ipv6 varchar(5) check(rtp_ipv6 in ('yes','no')),
    rtp_symmetric varchar(5) check(rtp_symmetric in ('yes','no')),
    send_diversion varchar(5) check(send_diversion in ('yes','no')),
    send_pai varchar(5) check(send_pai in ('yes','no')),
    send_rpid varchar(5) check(send_rpid in ('yes','no')),
    timers_min_se INTEGER,
    timers varchar(20) check(timers in ('forced','no','required','yes')),
    timers_sess_expires INTEGER,
    callerid VARCHAR(40),
    callerid_privacy varchar(40) check(callerid_privacy in ('allowed_not_screened','allowed_passed_screened','allowed_failed_screened','allowed','prohib_not_screened','prohib_passed_screened','prohib_failed_screened','prohib','unavailable')),
    callerid_tag VARCHAR(40),
    `100rel` varchar(20) check(`100rel` in ('no','required','yes')),
    aggregate_mwi varchar(5) check(aggregate_mwi in ('yes','no')),
    trust_id_inbound varchar(5) check(trust_id_inbound in ('yes','no')),
    trust_id_outbound varchar(5) check(trust_id_outbound in ('yes','no')),
    use_ptime varchar(5) check(use_ptime in ('yes','no')),
    use_avpf varchar(5) check(use_avpf in ('yes','no')),
    media_encryption varchar(10) check(media_encryption in ('no','sdes','dtls')),
    inband_progress varchar(5) check(inband_progress in ('yes','no')),
    call_group VARCHAR(40),
    pickup_group VARCHAR(40),
    named_call_group VARCHAR(40),
    named_pickup_group VARCHAR(40),
    device_state_busy_at INTEGER,
    fax_detect varchar(5) check(fax_detect in ('yes','no')),
    t38_udptl varchar(5) check(t38_udptl in ('yes','no')),
    t38_udptl_ec varchar(20) check(t38_udptl_ec in ('none','fec','redundancy')),
    t38_udptl_maxdatagram INTEGER,
    t38_udptl_nat varchar(5) check(t38_udptl_nat in ('yes','no')),
    t38_udptl_ipv6 varchar(5) check(t38_udptl_ipv6 in ('yes','no')),
    tone_zone VARCHAR(40),
    language VARCHAR(40),
    one_touch_recording varchar(5) check(one_touch_recording in ('yes','no')),
    record_on_feature VARCHAR(40),
    record_off_feature VARCHAR(40),
    rtp_engine VARCHAR(40),
    allow_transfer varchar(5) check(allow_transfer in ('yes','no')),
    allow_subscribe varchar(5) check(allow_subscribe in ('yes','no')),
    sdp_owner VARCHAR(40),
    sdp_session VARCHAR(40),
    tos_audio INTEGER,
    tos_video INTEGER,
    cos_audio INTEGER,
    cos_video INTEGER,
    sub_min_expiry INTEGER,
    from_domain VARCHAR(40),
    from_user VARCHAR(40),
    mwi_fromuser VARCHAR(40),
    dtls_verify VARCHAR(40),
    dtls_rekey VARCHAR(40),
    dtls_cert_file VARCHAR(200),
    dtls_private_key VARCHAR(200),
    dtls_cipher VARCHAR(200),
    dtls_ca_file VARCHAR(200),
    dtls_ca_path VARCHAR(200),
    dtls_setup varchar(20) check(dtls_setup in ('active','passive','actpass')),
    srtp_tag_32 varchar(5) check(srtp_tag_32 in ('yes','no')),
    UNIQUE (id)
);

CREATE INDEX ps_endpoints_id ON ps_endpoints (id);


CREATE TABLE ps_auths (
    id VARCHAR(40) NOT NULL,
    auth_type varchar(10) check(auth_type in ('md5','userpass')),
    nonce_lifetime INTEGER,
    md5_cred VARCHAR(40),
    password VARCHAR(80),
    realm VARCHAR(40),
    username VARCHAR(40),
    UNIQUE (id)
);

CREATE INDEX ps_auths_id ON ps_auths (id);

CREATE TABLE ps_aors (
    id VARCHAR(40) NOT NULL,
    contact VARCHAR(40),
    default_expiration INTEGER,
    mailboxes VARCHAR(80),
    max_contacts INTEGER,
    minimum_expiration INTEGER,
    remove_existing varchar(5) check(remove_existing in ('yes','no')),
    qualify_frequency INTEGER,
    authenticate_qualify varchar(5) check(authenticate_qualify in ('yes','no')),
    UNIQUE (id)
);

CREATE INDEX ps_aors_id ON ps_aors (id);
```

PJSIP 测试数据：

```
insert into ps_endpoints(id,context,disallow,allow,auth,aors) values ('9000','vcode','all','ulaw,alaw,gsm','9000','9000');
insert into ps_aors(id,max_contacts) values('9000',1);
insert into ps_auths(id,auth_type,password,username) values('9000','userpass','123321','9000');
```

注意：数据库表中的字段和配置文件中的字段是一致的。

## 配置 Asterisk

在 res_config_sqlite3.conf 中添加如下内容：

```
[asterisk]
dbfile => /var/lib/asterisk/realtime.sqlite3
```

在 extconfig.conf 文件中添加如下内容：

```
ps_endpoints => sqlite3,asterisk
ps_auths => sqlite3,asterisk
ps_aors => sqlite3,asterisk
```

在 sorcery.conf 文件中添加如下内容：

```
[res_pjsip]
endpoint=realtime,ps_endpoints
auth=realtime,ps_auths
aor=realtime,ps_aors
```

使用 sqlite3 命令创建 realtime.sqlite3 数据库，并创建上面的三张 PJSIP 表，然后插入记录。

最后在软电话上测试是否可以注册成功。

虽然，我使用的 sqlite3 存储 sip 用户信息，但我推荐你使用 mysql 或者 postgresql。
它的好处是可以对接第三方应用时，实时添加操作数据库，实时添加用户。而 sqlite3 会报错，提示数据库已锁定。
虽然我通过同步数据库文件解决，但它不是一个实时的方案。它在并发操作这块还是有些欠缺。

如果您有什么问题，欢迎关注公众号【技术源泉】私信我。

以下是备忘录，在 Asterisk 新版本中已不推荐使用。

如果使用的 SIP，请使用如下方法：

1，调整配置文件

修改 extconfig.conf，添加如下内容：

```
sippeers=>sqlite,general,sippeers
```

第一个 sippeers 是固定名称，最后一个 sippeers 是表名。

2，在数据库中添加表

例如，数据文件存储在/var/lib/asterisk/realtime.sqlite3

这个是 SIP 用户

```sql

CREATE TABLE sippeers (
    id INTEGER NOT NULL primary key autoincrement,
    name VARCHAR(40) NOT NULL,
    ipaddr VARCHAR(45),
    port INTEGER,
    regseconds INTEGER,
    defaultuser VARCHAR(40),
    fullcontact VARCHAR(80),
    regserver VARCHAR(20),
    useragent VARCHAR(20),
    lastms INTEGER,
    host VARCHAR(40),
    type varchar(10) check(type in ('friend','user','peer')),
    context VARCHAR(40),
    permit VARCHAR(95),
    deny VARCHAR(95),
    secret VARCHAR(40),
    md5secret VARCHAR(40),
    remotesecret VARCHAR(40),
    transport varchar(20) check(transport in ('udp','tcp','tls','ws','wss','udp,tcp','tcp,udp')),
    dtmfmode varchar(20) check(dtmfmode in ('rfc2833','info','shortinfo','inband','auto')),
    directmedia varchar(20) check(directmedia in ('yes','no','nonat','update')),
    nat VARCHAR(29),
    callgroup VARCHAR(40),
    pickupgroup VARCHAR(40),
    language VARCHAR(40),
    disallow VARCHAR(200),
    allow VARCHAR(200),
    insecure VARCHAR(40),
    trustrpid varchar(10) check(trustrpid in ('yes','no')),
    progressinband varchar(10) check(progressinband in ('yes','no','never')),
    promiscredir varchar(5) check(promiscredir in ('yes','no')),
    useclientcode varchar(5) check(useclientcode in ('yes','no')),
    accountcode VARCHAR(40),
    setvar VARCHAR(200),
    callerid VARCHAR(40),
    amaflags VARCHAR(40),
    callcounter varchar(5) check(callcounter in ('yes','no')),
    busylevel INTEGER,
    allowoverlap varchar(5) check(allowoverlap in ('yes','no')),
    allowsubscribe varchar(5) check(allowsubscribe in ('yes','no')),
    videosupport varchar(5) check(videosupport in ('yes','no')),
    maxcallbitrate INTEGER,
    rfc2833compensate varchar(5) check(rfc2833compensate in ('yes','no')),
    mailbox VARCHAR(40),
    `session-timers` varchar(20) check(`session-timers` in ('accept','refuse','originate')),
    `session-expires` INTEGER,
    `session-minse` INTEGER,
    `session-refresher` varchar(5) check(`session-refresher` in ('uac','uas')),
    t38pt_usertpsource VARCHAR(40),
    regexten VARCHAR(40),
    fromdomain VARCHAR(40),
    fromuser VARCHAR(40),
    `qualify` VARCHAR(40),
    defaultip VARCHAR(45),
    rtptimeout INTEGER,
    rtpholdtimeout INTEGER,
    sendrpid varchar(5) check(sendrpid in ('yes','no')),
    outboundproxy VARCHAR(40),
    callbackextension VARCHAR(40),
    timert1 INTEGER,
    timerb INTEGER,
    qualifyfreq INTEGER,
    constantssrc varchar(5) check(constantssrc in ('yes','no')),
    contactpermit VARCHAR(95),
    contactdeny VARCHAR(95),
    usereqphone varchar(5) check(usereqphone in ('yes','no')),
    textsupport varchar(5) check(textsupport in ('yes','no')),
    faxdetect varchar(5) check(faxdetect in ('yes','no')),
    buggymwi varchar(5) check(buggymwi in ('yes','no')),
    auth VARCHAR(40),
    fullname VARCHAR(40),
    trunkname VARCHAR(40),
    cid_number VARCHAR(40),
    callingpres varchar(50) check(callingpres in ('allowed_not_screened','allowed_passed_screen','allowed_failed_screen','allowed','prohib_not_screened','prohib_passed_screen','prohib_failed_screen','prohib')),
    mohinterpret VARCHAR(40),
    mohsuggest VARCHAR(40),
    parkinglot VARCHAR(40),
    hasvoicemail varchar(5) check(hasvoicemail in ('yes','no')),
    subscribemwi varchar(5) check(subscribemwi in ('yes','no')),
    vmexten VARCHAR(40),
    autoframing varchar(5) check(autoframing in ('yes','no')),
    rtpkeepalive INTEGER,
    `call-limit` INTEGER,
    g726nonstandard varchar(5) check(g726nonstandard in ('yes','no')),
    ignoresdpversion varchar(5) check(ignoresdpversion in ('yes','no')),
    allowtransfer varchar(5) check(allowtransfer in ('yes','no')),
    dynamic varchar(5) check(dynamic in ('yes','no')),
    path VARCHAR(256),
    supportpath varchar(5) check(supportpath in ('yes','no')),
    UNIQUE (name)
);


CREATE INDEX sippeers_name ON sippeers (name);

CREATE INDEX sippeers_name_host ON sippeers (name, host);

CREATE INDEX sippeers_ipaddr_port ON sippeers (ipaddr, port);

CREATE INDEX sippeers_host_port ON sippeers (host, port);
```

# 音频文件处理

我们使用手机上的录音机来录制音频文件。
Android 录音机录制的音频文件格式为 mp3，如果是 amr 格式，请使用豆子工具音频格式转换功能，转成 mp3 格式文件。
IOS 录音机录制的音频文件格式为 m4a，请使用豆子工具音频格式转换功能，转成 mp3 格式文件。

我们还需要使用 ffmpeg 将 mp3 文件转成 g711a 格式文件。这个 mp3 转 g711a 功能后续会集成到豆子工具中。

mp3 转 g711a 命令：

```
ffmpeg -i test.mp3 -acodec pcm_alaw -f alaw -ac 1 -ar 8000 -vn test.alaw
```

使用 ffplay 播放测试

```
ffplay -i test.alaw -f alaw -ac 1 -ar 8000
```

将制作好的音频文件存放在 asterisk sounds 目录，就可以在拨号计划中使用 Playback 应用调用它了。

# Asterisk AGI 调用

Asterisk 支持 AGI 接口，它支持多种语言，并提供多种语言 SDK，例如 Ruby，Java，PHP，Python，C++，.Net，nodejs，Go。

我使用的 Golang 语言，使用这个`github.com/CyCoreSystems/agi` AGI 库。

使用 go 编写的 agi 脚本

```
package main

import (
	"github.com/CyCoreSystems/agi"
)

func main() {
	a := agi.NewStdio()
	// 设置通道变量
	err := a.Set("MYVAR", "foo")
	if err != nil {
		panic("failed to set variable MYVAR")
	}

	m := a.Variables
	// 获取AGI参数
	callerid, ok := m["agi_callerid"]
	if !ok {
		a.Verbose("failed to get callerid", 1)
		panic("failed to get callerid")
	}
	// 打印日志
	a.Verbose(callerid, 4)
	// 播放音频文件
	a.StreamFile("bean", "", 0)
	a.StreamFile("thanks", "", 0)
}
```

我们需要将编译之后的脚本文件放在`/var/lib/asterisk/agi-bin/`目录中。
并执行`chmod +x agidemo`添加执行权限。

# Asterisk 配置 PJSIP ODBC 实时存入数据库

Asterisk 如何将 PJSIP 通道驱动程序与实时数据库存储后端相连接。实时接口允许将 PJSIP 的大部分配置（如端点、auth、aor 等）存储在数据库中，而不仅是 pjsip.conf 配置文件中。

我们假设 Asterisk 安装在 Linux 服务器上，并希望 Asterisk 通过 odbc 连接器连接到 Mysql 数据库。我们还需要安装如下依赖包：

- unixodbc 和 unixodbc-dev
- odbc 及其开发包
- libmyodbc
- odbc 到 mysql 接口包
- python-dev 和 python-pip
- python-mysqldb

如果在 Ubuntu 服务器，可以直接通过如下命令安装：

```
# apt-get install unixodbc unixodbc-dev libmyodbc python-dev python-pip python-mysqldb
```

一旦安装了这些包，你需要使用 make menuconfig 工具检查 res_config_odbc 和 res_odbc 和 res_pjsip_xxx 资源模块被安装。然后执行

```
./configure;make;make install
```

创建数据库，使用 mysqladmin 工具创建一个数据库，用来存储配置信息。

```
# mysqladmin -u root -p create asterisk
```

安装 Alembic，可以用来创建配置信息表结构。Alembic 是一个完整的数据库迁移工具，支持升级现有数据库的模式、模式版本控制、创建新表和数据库等等。

```
# pip install alembic
```

切换到 Asterisk 源码目录 contrib/ast-db-manage/，它包含 Alembic 脚本。

```
# cd contrib/ast-db-manage/
```

下一步，编辑配置文件 config.ini.sample，将 sqlalchemy.url 选项改成如下：

```
sqlalchemy.url = mysql://root:password@localhost/asterisk
```

用户名和密码填写为你的真实数据库用户名和密码。然后将 config.ini.sample 重命名为 config.ini。

最后，使用 Alembic 设置数据库表。

```
# alembic -c config.ini upgrade head
```

你可以通过连接到数据库验证表是否已经创建？

当创建了数据库表后，我们还需要配置 Asterisk，首先，我们要配置 ODBC 连接到 Mysql。我们配置/etc/odbcinst.ini 配置文件，你的文件看起来像这样

```
[MySQL]
Description = ODBC for MySQL
Driver = /usr/lib/x86_64-linux-gnu/odbc/libmyodbc.so
Setup = /usr/lib/x86_64-linux-gnu/odbc/libodbcmyS.so
UsageCount = 2
```

下一步，在/etc/odbc.ini 配置文件中，创建一个 asterisk 数据库连接器。

```
[asterisk]
Driver = MySQL
Description = MySQL connection to ‘asterisk’ database
Server = localhost
Port = 3306
Database = asterisk
UserName = root
Password = password
Socket = /var/run/mysqld/mysqld.sock
```

下一步，我们在/etc/asterisk/res_odbc.conf 配置文件中，配置 res_odbc 可以连接到 asterisk 数据库连接器。

```
[asterisk]
enabled => yes
dsn => asterisk
username => root
password => password
pre-connect => yes
```

配置正确后，我们可以在 asterisk 的 cli 中，使用`odbc show`查看配置信息。

将 PJSIP Sorcery 连接到数据库

PJSIP 堆栈在 Asterisk 使用了一个数据抽象层叫 sorcery。它允许用户为 Asterisk 狗叫一个分层数据源，以便在检索、更新、创建或销毁数据时交互使用。

PJSIP 的配置基于对象类型。在 Sorcery 中配置总共有 5 个对象：

- endpoint
- auth
- aor
- domain
- identify

我们还可以配置联系人对象，尽管本例子中不需要它。这些配置文件在/etc/asterisk/sorcery.conf。

```
text[res_pjsip] ; Realtime PJSIP configuration wizard
endpoint=realtime,ps_endpoints
auth=realtime,ps_auths
aor=realtime,ps_aors
domain_alias=realtime,ps_domain_aliases
contact=realtime,ps_contacts

[res_pjsip_endpoint_identifier_ip]
identify=realtime,ps_endpoint_id_ips
```

其中，realtime 是关键字，表示实时，ps_endpoints 是可以连接到数据库的表。如果不想实时，可以使用关键字 config。

最后，我们需要再配置 /etc/asterisk/extconfig.conf，这个配置文件是告诉 Asterisk 使用实时数据库。

```
text[settings]
ps_endpoints => odbc,asterisk
ps_auths => odbc,asterisk
ps_aors => odbc,asterisk
ps_domain_aliases => odbc,asterisk
ps_endpoint_id_ips => odbc,asterisk
ps_contacts => odbc,asterisk
```

我们还需要配置 Asterisk 在启动之前加载 ODBC 驱动，这样其它模块才能获取到正确的配置信息。

在/etc/asterisk/modules.conf 配置文件中，添加如下内容：

```
preload => res_odbc.so
preload => res_config_odbc.so
noload => chan_sip.so
```

我们配置 PJSIP，先创建一个传输。在/etc/asterisk/pjsip.conf 文件中：

```
[transport-udp]
type=transport
protocol=udp
bind=0.0.0.0
```

我们在 Mysql 数据库中维护端点和用户，也就是在数据库中插入 ps_endpoints 记录，ps_aors 记录，ps_auths 记录。

此时，你应该能够在 asterisk cli 中使用`pjsip show endpoints`命令检索出记录。

最后的拨号计划不变，现在就可以使用了，赶快尝试一下吧。

# 配置 Asterisk PJSIP 使用 POSTGRESQL

要使用 Postgresql，需要先安装 pg 头文件

```
yum install postgresql-devel
```

在 Asterisk 源文件中，执行

```
./configure
```

执行下面的命令，查看 res_config_pgsql 模块有没有选择，没有请先选择。

```
make menuselect
```

然后执行

```
make;make install
```

在/etc/asterisk/modules.conf 配置文件中，添加

```
load = res_config_pgsql.so
```

将源代码中 configs/samples/res_pgsql.conf.sample 复制到/etc/asterisk 目录下，并改为 res_pgsql.conf 文件。修改用户名等参数。

```
[general]
dbhost=127.0.0.1
dbport=5432
dbname=asterisk
dbuser=asterisk
dbpass=password
```

修改配置文件/etc/asterisk/extconfig.conf，将下面三项调整为：

```
ps_endpoints => pgsql,general
ps_auths => pgsql,general
ps_aors => pgsql,general
```

其它配置文件，参考 sqlite3 数据库的配置。

# 解决 asterisk 没有声音的问题

在配置好 asterisk 之后，拨打 8000 没有听到声音。

我的环境，asterisk 在云服务器，使用手机 zoiper 拨打。没有声音，经过一番调整后，使用如下配置可行。

asterisk 的配置如下：

```
rtp_symmetric = yes
force_rport = yes
rewrite_contact = no
```

手机 zoiper 的配置，ice 启用，其它全是默认配置。

现在发现，WIFI 可以拨通，流量不可以。

经过排查，发现 RTP 在 WIFI 情况下使用同一个端口，在流量情况下不是同一个端口。

打开 rtp 调试信息，使用如下命令：

```
rtp set debug on
```

查看 rtp 的配置，使用如下命令：

```
rtp show setting
```

可以看到 rtp 信息。

如果排查 PJSIP 信息，可以使用查看 pjsip 的日志命令：

```
pjsip set logger on
```
