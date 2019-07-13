## Path 包

包 path 实现了用于操作斜杠分隔路径的实用程序例程。

路径包应仅用于由正斜杠分隔的路径，例如 URL 中的路径。此程序包不处理带有驱动器号或反斜杠的 Windows 路径; 要操作操作系统路径，请使用 path / filepath 包。

子包 filepath 实现实用程序例程，以便以与目标操作系统定义的文件路径兼容的方式操作文件名路径。

filepath 包使用正斜杠或反斜杠，具体取决于操作系统。要处理路径，例如始终使用正斜杠的 URL 而不考虑操作系统，请参阅 path 包。

```
package main

import (
	"fmt"
	"path"
)

func main() {
	fmt.Println(path.Base("/a/b"))
	fmt.Println(path.Base("/"))
	fmt.Println(path.Base(""))
}
```
