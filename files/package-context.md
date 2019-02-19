## Context 包

包上下文定义了 Context 类型，它跨 API 边界和进程之间携带截止日期，取消信号和其他请求范围的值。

对服务器的传入请求应创建一个 Context，对服务器的传出调用应接受一个 Context。它们之间的函数调用链必须传播 Context，可选地将其替换为使用 WithCancel，WithDeadline，WithTimeout 或 WithValue 创建的派生 Context。取消上下文后，也会取消从中派生的所有上下文。

WithCancel，WithDeadline 和 WithTimeout 函数接受 Context（父）并返回派生的 Context（子）和 CancelFunc。调用 CancelFunc 会取消子项及其子项，删除父项对子项的引用，并停止任何关联的计时器。未能调用 CancelFunc 会泄漏子项及其子项，直到取消父项或计时器触发。go vet 工具检查 CancelFuncs 是否在所有控制流路径上使用。

使用上下文的程序应遵循这些规则，以使各接口之间的接口保持一致，并启用静态分析工具来检查上下文传播：

不要将上下文存储在结构类型中; 相反，将 Context 明确传递给需要它的每个函数。Context 应该是第一个参数，通常命名为 ctx：

```
func DoSomething（ctx context.Context，arg Arg）error {
// ...使用 ctx ...
}
```

即使函数允许，也不要传递 nil Context。如果您不确定要使用哪个上下文，请传递 context.TODO。

仅将上下文值用于转换进程和 API 的请求范围数据，而不是将可选参数传递给函数。

可以将相同的 Context 传递给在不同 goroutine 中运行的函数; 上下文对于多个 goroutine 同时使用是安全的。

有关使用上下文的服务器的示例代码，请参阅https://blog.golang.org/context。

```
package main

import (
	"context"
	"fmt"
)

func main() {
	type favContextKey string

	f := func(ctx context.Context, k favContextKey) {
		if v := ctx.Value(k); v != nil {
			fmt.Println("found value:", v)
			return
		}
		fmt.Println("key not found:", k)
	}

	k := favContextKey("language")
	ctx := context.WithValue(context.Background(), k, "Go")

	f(ctx, k)
	f(ctx, favContextKey("color"))

}
```
