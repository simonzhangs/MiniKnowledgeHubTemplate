## IO 包

Package io 提供 I / O 原语的基本接口。它的主要工作是将这些原语的现有实现（例如包 os 中的原语）包装到抽象功能的共享公共接口中，以及一些其他相关原语。

因为这些接口和原语用各种实现包装低级操作，除非另有通知客户端不应该认为它们对于并行执行是安全的。

子包 ioutil 实现了一些 I / O 实用程序功能。

```
package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"strings"
)

func main() {
	r := strings.NewReader("Go is a general-purpose language designed with systems programming in mind.")

	b, err := ioutil.ReadAll(r)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("%s", b)

}
```
