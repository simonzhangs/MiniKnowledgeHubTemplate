# Rsync

rsync 是一个常用的 Linux 应用程序，用于文件同步。它可以在本地计算机与远程计算机之间，或者两个本地目录之间同步文件。

rsync 在 Linux 安装，安装命令如下：

```
# ubuntu
sudo apt install rsync
# centos
sudo yum install rsync
```

如果使用 Windows ，可以使用 cwRsync，它是 Windows 客户端 GUI 的一个包含 Rsync 的包装。您可以使用 cwRsync 快速远程文件备份和同步。

## 基本用法

在本机使用 rsync 命令时，可以作为 cp 和 mv 命令的替代方法，将源目录同步到目标目录。

```
rsync -r source destination
```

其中，-r 表示递归，即包含子目录。source 目录为源目录，destination 表示目标目录。

如果有多个目录需要同步，可以写成下面这样。

```
rsync -r source1 source2 destination
```

我们可以使用-a 参数替代-r，除了可以递归同步以外，还可以同步元信息（比如修改时间，权限）。由于 rsync 默认使用文件大小和修改时间决定文件是否需要更新，所以-a 比-r 更有用。下面的用法才是常见的写法。

```
rsync -a source destination
```

目标目录 destination 如果不存在，rsync 会自动创建。执行上面的命令后，源目录 source 被完整地复制到目标目录 destination 下面，即形成了 destination/source 的目录结构。

如果只想同步源目录 source 下的内容到目标目录 destination，则需要在源目录后面加上斜杠。

```
rsync -a source/ destination
```

如果不确定 rsync 执行后会产生什么结果，我们可以用-n 或 --dry-run 模拟执行结果。

```
rsync -anv source/ destination
```

-n 参数模拟命令执行结果，不真实执行命令。-v 参数将结果打印到终端。

默认情况下，rsync 只确保源目录的所有内容都复制到目标目录。它不会使两个目录保持相同，并且不会删除文件。如果要使用目标目录成为源目录的镜像副本，使用--delete 参数，这将删除只存在于目标目录，不在源目录的文件。

```
rsync -av --delete source/ destination
```

如果我们想排除某些文件或目录，可以使用--exclude 参数指定排除模式。

```
rsync -av --exclude '*.txt' source/ destination
```

该命令将排除所有后缀为 txt 的文件。

如果要排除隐藏文件，可以这样写`--exclude ".*"`，如果要排除某个目录里面的所有文件，但不排除目录本身，可以这样写`--exclude 'dir1/*'`，多个排除目录，可以用多个--exclude 参数。也可以简写为--exclude={'file1.txt','dir1/\*'}，这个需要在 Linux 环境下。

如果排除模式很多，我们可以将其写入一个文件，每个模式一行，然后使用参数--exclude-from 指定这个文件。

```
rsync -av --exclude-from='exclude-file.txt' source/ destination
```

如果只想同步某类型文件，可以使用下面的语法：

```
rsync -av --include="*.txt" --exclude="*" source/ destination
```

rsync 除了支持本地两个目录之间的同步，也支持远程同步。它可以将本地内容，同步到远程服务器。

```
rsync -av source/ username@remotehost:destination
```

如何 ssh 端口不为默认的 22，则使用下面的命令：

```
 rsync -avP -e 'ssh -p 2222' --exclude="*.log" ./test username@remotehost:destination
```

rsync 默认使用 SSH 进行远程登录和数据传输。如果想使用 rsync 协议，需要在同步的目标服务器安装和运行 rsync 守护程序，则可以使用 rsync://协议（默认端口 873）进行传输。

```
rsync -av source/ 192.168.0.1::module/destination
或
rsync -av source/ rsync://192.168.0.1/module/destination
```

module 不是实际路径名，是 rsync 守护程序指定的一个资源名，由管理员分配。想查看 rsync 守护程序分配的 module 列表，使用下面的命令：

```
rsync rsync://192.168.0.1
```

到重点了，rsync 的最大特点是它可以增量备份，即只复制有变动的文件。它也支持使用基准目录，即将源目录于基准目录之间变动的部分，同步到目标目录。

具体做法是，第一次同步是全量备份，所有文件在基准目录里面同步一份。以后每一次同步都是增量备份，只同步源目录与基准目录之间有变动的部分，将这部分保存在一个新的目标目录。这个新的目标目录中，只有那些变动过的文件。

```
rsync -a --delete --link-dest /compare/path /source/path /target/path
```

上面命令中，--link-dest 参数指定基准目录/compare/path，然后源目录/source/path 跟基准目录进行比较，找出变动的文件，将它们拷贝到目标目录/target/path。那些没有变动的文件则会生成硬链接。这个命令的第一次备份是全量备份，后面就是增量备份了。

下面是一个脚本示例，备份用户主目录。

```
#!/bin/bash

# A script to perform incremental backups using rsync

set -o errexit
set -o nounset
set -o pipefail

readonly SOURCE_DIR="${HOME}"
readonly BACKUP_DIR="/mnt/data/backups"
readonly DATETIME="$(date '+%Y-%m-%d_%H:%M:%S')"
readonly BACKUP_PATH="${BACKUP_DIR}/${DATETIME}"
readonly LATEST_LINK="${BACKUP_DIR}/latest"

mkdir -p "${BACKUP_DIR}"

rsync -av --delete \
  "${SOURCE_DIR}/" \
  --link-dest "${LATEST_LINK}" \
  --exclude=".cache" \
  "${BACKUP_PATH}"

rm -rf "${LATEST_LINK}"
ln -s "${BACKUP_PATH}" "${LATEST_LINK}"
```

上面脚本中，每一次同步都会生成一个新目录${BACKUP_DIR}/${DATETIME}，并将软链接${BACKUP_DIR}/latest指向这个目录。下一次备份时，就将${BACKUP_DIR}/latest 作为基准目录，生成新的备份目录。最后，再将软链接${BACKUP_DIR}/latest 指向新的备份目录。

注意：在 Windows 上你可以使用 WSL Linux，在 Linux 使用 rsync 要可靠稳定很多。我测试 Windows 的 cwRsync 连接 Linux 服务器报错，网上有帖子说是 SSH 问题。

当在 WSL Linux 使用计划任务 cron 进行定时备份时，你会发现不生效？

可以通过以下方法解决：

```
usermod -a -G crontab (username)
service cron start
```

在 WSL Linux 中，如果要 cron 服务开机自启，有点麻烦。请参考 wsl linux 文章。

```
ws.run "wsl -d Ubuntu -u root /etc/init.d/cron start",vbhide
```

## 应用场景

备份你的代码，上传 mdbook 书籍到你的网站。
