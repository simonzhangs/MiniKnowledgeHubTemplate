## Toml 包

TOML 代表 Tom's Obvious，Minimal Language。这个 Go 包提供了一个类似于 Go 的标准库 json 和 xml 包的反射界面。此包还支持 encoding.TextUnmarshaler 和 encoding.TextMarshaler 接口，以便您可以定义自定义数据表示。

规格：https：//github.com/toml-lang/toml

兼容 TOML 版本 v0.4.0

**安装**

go get github.com/BurntSushi/toml

尝试 toml 验证器：

```
go get github.com/BurntSushi/toml/cmd/tomlv
tomlv some-toml-file.toml
```

**使用方法**

import "github.com/BurntSushi/toml"

**测试**

该软件包通过 toml-test 中的所有测试， 用于解码器和编码器。

**案例**

这个包与 Go 标准库处理 XML 和 JSON 的方式类似。也就是说，数据通过反射加载到 go 值中。

对于最简单的示例，将一些 toml 文件视为键和值的列表：

```
Age = 25
Cats = [ "Cauchy", "Plato" ]
Pi = 3.14
Perfection = [ 6, 28, 496, 8128 ]
DOB = 1987-07-05T05:45:00Z
```

可在 go 中定义为：

```
type Config struct {
  Age int
  Cats []string
  Pi float64
  Perfection []int
  DOB time.Time // requires `import time`
}
```

然后解码为：

```
var conf Config
if _, err := toml.Decode(tomlData, &conf); err != nil {
  // handle error
}
```

如果结构字段名未直接映射到 toml 键值，则也可以使用结构标记：

```
some_key_NAME = "wat"
type TOML struct {
  ObscureKey string `toml:"some_key_NAME"`
}
```

使用 encoding.TextUnmarshaler 接口

下面是一个自动将持续时间字符串解析为时间的示例。持续时间值：

```
[[song]]
name = "Thunder Road"
duration = "4m49s"

[[song]]
name = "Stairway to Heaven"
duration = "8m03s"
```

可被解码为：

```
type song struct {
  Name     string
  Duration duration
}
type songs struct {
  Song []song
}
var favorites songs
if _, err := toml.Decode(blob, &favorites); err != nil {
  log.Fatal(err)
}

for _, s := range favorites.Song {
  fmt.Printf("%s (%s)\n", s.Name, s.Duration)
}
```

您还需要满足 encoding.textUnmarshaler 接口的持续时间类型：

```
type duration struct {
	time.Duration
}

func (d *duration) UnmarshalText(text []byte) error {
	var err error
	d.Duration, err = time.ParseDuration(string(text))
	return err
}
```

更复杂的用法

下面是如何从官方规范页面加载示例的示例：

```
# This is a TOML document. Boom.

title = "TOML Example"

[owner]
name = "Tom Preston-Werner"
organization = "GitHub"
bio = "GitHub Cofounder & CEO\nLikes tater tots and beer."
dob = 1979-05-27T07:32:00Z # First class dates? Why not?

[database]
server = "192.168.1.1"
ports = [ 8001, 8001, 8002 ]
connection_max = 5000
enabled = true

[servers]

  # You can indent as you please. Tabs or spaces. TOML don't care.
  [servers.alpha]
  ip = "10.0.0.1"
  dc = "eqdc10"

  [servers.beta]
  ip = "10.0.0.2"
  dc = "eqdc10"

[clients]
data = [ ["gamma", "delta"], [1, 2] ] # just an update to make sure parsers support it

# Line breaks are OK when inside arrays
hosts = [
  "alpha",
  "omega"
]
```

对应的 go 类型结构为：

```
type tomlConfig struct {
	Title string
	Owner ownerInfo
	DB database `toml:"database"`
	Servers map[string]server
	Clients clients
}

type ownerInfo struct {
	Name string
	Org string `toml:"organization"`
	Bio string
	DOB time.Time
}

type database struct {
	Server string
	Ports []int
	ConnMax int `toml:"connection_max"`
	Enabled bool
}

type server struct {
	IP string
	DC string
}

type clients struct {
	Data [][]interface{}
	Hosts []string
}
```

请注意，如果找不到完全匹配，将尝试不区分大小写的匹配。

上面的工作示例可以在\_examples/exaple.{go,toml}中找到。
