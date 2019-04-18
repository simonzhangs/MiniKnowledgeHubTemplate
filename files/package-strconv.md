## Strconv 包

包 strconv 实现与基本数据类型的字符串表示的转换。

最常见的数字转换是 Atoi（字符串到 int）和 Itoa（int 到 string）。

```
package main

import (
	"fmt"
	"strconv"
)

func main() {
	v := "true"
	if s, err := strconv.ParseBool(v); err == nil {
		fmt.Printf("%T, %v\n", s, s)
	}

}

```
