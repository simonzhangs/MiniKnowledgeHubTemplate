## Bytes 包

包字节实现了操作字节切片的函数。它类似于字符串包的功能。

```
package main

import (
	"bytes"
	"fmt"
	"os"
)

func main() {
	var b bytes.Buffer // A Buffer needs no initialization.
	b.Write([]byte("Hello "))
	fmt.Fprintf(&b, "world!")
	b.WriteTo(os.Stdout)
}

```
