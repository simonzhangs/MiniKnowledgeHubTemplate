## Sync 包

包同步提供基本同步原语，例如互斥锁。除了 Once 和 WaitGroup 类型之外，大多数类型都适用于低级库例程。通过通道和通信可以更好地完成更高级别的同步。

不应复制包含此包中定义的类型的值。

```
package main

import (
	"fmt"
	"sync"
)

func main() {
	var once sync.Once
	onceBody := func() {
		fmt.Println("Only once")
	}
	done := make(chan bool)
	for i := 0; i < 10; i++ {
		go func() {
			once.Do(onceBody)
			done <- true
		}()
	}
	for i := 0; i < 10; i++ {
		<-done
	}
}
```
