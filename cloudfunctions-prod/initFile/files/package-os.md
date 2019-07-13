## OS 包

Package os 为操作系统功能提供了与平台无关的接口。设计类似 Unix，虽然错误处理是 Go-like; 失败的调用返回类型错误的值而不是错误号。通常，错误中可以获得更多信息。例如，如果采用文件名的调用失败，例如 Open 或 Stat，则错误将在打印时包含失败的文件名，并且类型为\* PathError，可以解压缩以获取更多信息。

os 接口旨在在所有操作系统中保持一致。通常不可用的功能出现在系统特定的包 syscall 中。

```
package main

import (
	"log"
	"os"
)

func main() {
	f, err := os.OpenFile("notes.txt", os.O_RDWR|os.O_CREATE, 0755)
	if err != nil {
		log.Fatal(err)
	}
	if err := f.Close(); err != nil {
		log.Fatal(err)
	}
}
```
