## Regexp 包

包 regexp 实现正则表达式搜索。

接受的正则表达式的语法与 Perl，Python 和其他语言使用的通用语法相同。更确切地说，它是 RE2 接受的语法，并在https://golang.org/s/re2syntax中描述 ，除了\ C。有关语法的概述，请运行

```
go doc regexp / syntax
```

此包提供的 regexp 实现保证在输入大小的时间线性运行。

```
package main

import (
	"fmt"
	"regexp"
)

func main() {
	// Compile the expression once, usually at init time.
	// Use raw strings to avoid having to quote the backslashes.
	var validID = regexp.MustCompile(`^[a-z]+\[[0-9]+\]$`)

	fmt.Println(validID.MatchString("adam[23]"))
	fmt.Println(validID.MatchString("eve[7]"))
	fmt.Println(validID.MatchString("Job[48]"))
	fmt.Println(validID.MatchString("snakey"))
}
```
