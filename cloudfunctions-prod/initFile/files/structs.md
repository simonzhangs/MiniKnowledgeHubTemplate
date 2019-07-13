## 结构体

一个结构体（struct）就是一个字段的集合。

```golang
package main

import "fmt"

type Vertex struct {
	X int
	Y int
}

func main() {
	fmt.Println(Vertex{1, 2})
}
```