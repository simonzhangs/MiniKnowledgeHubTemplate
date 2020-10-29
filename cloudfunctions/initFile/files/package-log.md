## 日志包

包日志实现了一个简单的日志包。 它定义了一种类型 Logger，其中包含格式化输出的方法。 它还有一个预定义的“标准”Logger，可以通过辅助函数 Print [f | ln]，Fatal [f | ln]和 Panic [f | ln]访问，它们比手动创建 Logger 更容易使用。 该记录器写入标准错误并打印每个记录消息的日期和时间。 每条日志消息都在单独的行中输出：如果正在打印的消息未以换行符结尾，则记录器将添加一条消息。 Fatal 函数在写入日志消息后调用 os.Exit（1）。 Panic 函数在写入日志消息后调用 panic。

```
package main

import (
	"bytes"
	"fmt"
	"log"
)

func main() {
	var (
		buf    bytes.Buffer
		logger = log.New(&buf, "logger: ", log.Lshortfile)
	)

	logger.Print("Hello, log file!")
	logger.Print("Log Info")
	fmt.Print(&buf)

}
```
