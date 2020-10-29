## Strings 包

包字符串实现了操作 UTF-8 编码字符串的简单函数。

例如比较、索引、变为大写，变为小写，去除空格等函数。

```
package main

import (
	"fmt"
	"strings"
)

func main() {
	fmt.Println(strings.Count("cheese", "e"))
	fmt.Println(strings.Count("five", "")) // before & after each rune
}
```
