## Flag 包

Flag 包实现命令行标志解析。

定义了 flag.String(),Bool(),Int(),等等
下面定义了一个整数标志，- flagname,存储在指针 ip 中，类型为\*int。

```
import "flag"
var ip = flag.Int("flagname", 1234, "help message for flagname")
```

如果愿意，可以使用 Var()函数将标志绑定到变量。

```
var flagvar int
func init() {
	flag.IntVar(&flagvar, "flagname", 1234, "help message for flagname")
}
```

或者，你可以创建满足 Value 接口（使用指针接收器）的自定义标志，并将它们耦合到标记解析

```
flag.Var(&flagVal, "name", "help message for flagname")
```

对于此类标志，默认值只是变量的初始值。
定义完所有标志后，调用

```
flag.Parse()
```

将命令行解析为定义的标志。

```
package main

import (
	"flag"
	"fmt"
	"net/url"
)

type URLValue struct {
	URL *url.URL
}

func (v URLValue) String() string {
	if v.URL != nil {
		return v.URL.String()
	}
	return ""
}

func (v URLValue) Set(s string) error {
	if u, err := url.Parse(s); err != nil {
		return err
	} else {
		*v.URL = *u
	}
	return nil
}

var u = &url.URL{}

func main() {
	fs := flag.NewFlagSet("ExampleValue", flag.ExitOnError)
	fs.Var(&URLValue{u}, "url", "URL to parse")

	fs.Parse([]string{"-url", "https://golang.org/pkg/flag/"})
	fmt.Printf(`{scheme: %q, host: %q, path: %q}`, u.Scheme, u.Host, u.Path)

}
```
