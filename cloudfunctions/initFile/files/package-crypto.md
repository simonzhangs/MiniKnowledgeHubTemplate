## Crypto 包

加密包收集了常见的加密常量。

Md5 子包实现了 RFC 1321 中定义的 MD5 哈希算法。Md5 受密码破坏，不应用于安全应用程序。

Rand 子包实现了一个加密安全的随机数生成器。

sha256 子包实现了 FIPS 180-4 中定义的 SHA224 和 SHA256 哈希算法。

```
package main

import (
	"crypto/sha256"
	"fmt"
)

func main() {
	sum := sha256.Sum256([]byte("hello world\n"))
	fmt.Printf("%x", sum)
}

```
