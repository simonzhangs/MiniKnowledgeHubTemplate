# go 二维码操作包

包 qrcode 实现 QR 码编码器。QR 码是矩阵（二维）条形码。可以编码任意内容，URL 是一个受欢迎的选择:)每个 QR 码都包含错误恢复信息，以帮助读取损坏或模糊的代码。错误恢复有四个级别：低，中，高和最高。具有较高恢复级别的 QR 码对于损坏更加稳健，但是以物理上更大的代价为代价。

## 安装

```shell
go get -u github.com/skip2/go-qrcode/...
```

qrcode 将在\$GOPATH/bin/下构建一个命令行工具

## golang 用法

```golang
import qrcode "github.com/skip2/go-qrcode"
```

- 创建 PNG 图像：

```golang
  var png []byte
  png, err := qrcode.Encode("https://example.org", qrcode.Medium, 256)
```

- 创建 PNG 图像并写入文件：

```golang
  err := qrcode.WriteFile("https://example.org", qrcode.Medium, 256, "qr.png")
```

- 使用自定义颜色创建 PNG 图像并写入文件：

```golang
  err := qrcode.WriteColorFile("https://example.org", qrcode.Medium, 256, color.Black, color.White, "qr.png")

```

所有示例都使用 qrcode.Medium 错误恢复级别并创建一个固定的 256x256px 大小的 QR 码。最后一个功能在白色 QR 码上创建黑色白色而不是黑色。

QR 码的最大容量根据编码的内容和错误恢复级别而变化。最大容量为 2,953 字节，4,296 个字母数字字符，7,089 个数字或这些数字的组合。
