## Time 包

时间包提供测量和显示时间的功能。
日历总是假设计算一个公历，并且没有闰秒。

单调时钟
操作系统既提供“挂钟”，也可以改变时钟同步，而“单调时钟”则不然。一般规则是挂钟用于告知时间，单调时钟用于测量时间。在这个包中 Time.Now 既包含挂钟读数和又包含单调时钟读数，它不拆分为两个 API;稍后的时间报告操作使用挂钟读数，但后来的时间测量操作，特别是比较和减法，使用单调时钟读数。

例如，即使在定时操作期间更改挂钟，此代码也始终计算大约 20 毫秒的正经过时间：

```
start：= time.Now（）
......需要 20 毫秒的操作......
t：= time.Now（）
elapsed：= t.Sub（start）
```

其他习语，例如 time.Since（start），time.Until（deadline）和 time.Now（）。在（截止日期）之前，对墙壁时钟重置同样具有鲁棒性。

常量
这些是在 Time.Format 和 time.Parse 中使用的预定义布局。 布局中使用的参考时间是特定时间：

```
Unix时间：
Mon Jan 2 15:04:05 MST 2006
```

```
package main

import (
	"fmt"
	"time"
)

var c chan int

func statusUpdate() string { return "" }
func handle(int)           {}
func main() {
	// 格式化
	fmt.Println(time.Now().Format("2006-01-02 15:04:05")) // 这是个奇葩,必须是这个时间点, 据说是go诞生之日, 记忆方法:6-1-2-3-4-5

	// 休眠100毫秒
	time.Sleep(100 * time.Millisecond)
	select {
	case m := <-c:
		handle(m)
		// 在一分钟之后执行
	case <-time.After(1 * time.Minute):
		fmt.Println("timed out")
	}
	fmt.Println("After 1 minute,Now I can do")
	// 每分钟执行一次滴答
	c := time.Tick(1 * time.Minute)
	for now := range c {
		fmt.Printf("%v %s\n", now, statusUpdate())
	}
	// 该句不会执行
	fmt.Println("I can't do it")
	// 其它内容请参考官方time包
}
```
