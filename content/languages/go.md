# Golang

## Hello World

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello Gophers!")
}
```

## Go 命令

```bash
# Compile & Run code
$ go run [file.go]
# Compile
$ go build [file.go]
# Running compiled file
$ ./hello
# Test packages
$ go test [folder]
# Install packages/modules
$ go install [package]
# List installed packages/modules
$ go list
# Update packages/modules
$ go fix
# Format package sources
$ go fmt
# See package documentation
$ go doc [package]
# Add dependencies and install
$ go get [module]
# See Go environment variables
$ go env
# See version
$ go version
```

## Go 模块

- Go projects are called **modules**
- Each module has multiple **packages**
- Each package should has a scoped functionality. Packages talk to each other to compose the code
- A module needs at least one package, the **main**
- The package main needs a entry function called **main**

```bash
# Create Module
$ go mod init [name]
```

Tip: 为了方便, 一般模块名称使用以下结构:

domain.com/user/module/package

Example: github.com/spf13/cobra

## 基本类型

|    Type    |               Set of Values                |                    Values                     |
| :--------: | :----------------------------------------: | :-------------------------------------------: |
|    bool    |                  boolean                   |                  true/false                   |
|   string   |            array of characters             |             needs to be inside ""             |
|    int     |                  integers                  |             32 or 64 bit integer              |
|    int8    |               8-bit integers               |                 [ -128, 128 ]                 |
|   int16    |              16-bit integers               |               [ -32768, 32767]                |
|   int32    |              32-bit integers               |          [ -2147483648, 2147483647]           |
|   int64    |              64-bit integers               | [ -9223372036854775808, 9223372036854775807 ] |
|   uint8    |          8-bit unsigned integers           |                  [ 0, 255 ]                   |
|   uint16   |          16-bit unsigned integers          |                 [ 0, 65535 ]                  |
|   uint32   |          32-bit unsigned integers          |               [ 0, 4294967295 ]               |
|   uint64   |          64-bit unsigned integers          |          [ 0, 18446744073709551615 ]          |
|  float32   |                32-bit float                |                                               |
|  float64   |                64-bit float                |                                               |
| complex64  | 32-bit float with real and imaginary parts |                                               |
| complex128 | 64-bit float with real and imaginary parts |                                               |
|    byte    |                sets of bits                |                alias for uint8                |
|    rune    |             Unicode characters             |                alias for int32                |

## 变量

```go
// Declaration
var value int

// Initialization
value = 10

// Declaration + Initialization + Type inference
var isActive = true

// Short declaration (only inside functions)
text := "Hello"

// Multi declaration
var i, j, k = 1, 2, 3

// Variable not initialized = Zero values
// Numeric: 0
// Boolean: false
// String: ""
// Special value: nil (same as null)

var number int // 0
var text string // ""
var boolean bool // false

// Type conversions
// T(v) converts v to type T

i := 1.234 // float
int(i) // 1

// Constants
const pi = 3.1415
```

## 操作符

算术操作符

| Symbol |      Operation      |                Valid Types                |
| :----: | :-----------------: | :---------------------------------------: | -------- |
|  `+`   |         Sum         | integers, floats, complex values, strings |
|  `-`   |     Difference      |     integers, floats, complex values      |
|  `*`   |       Product       |     integers, floats, complex values      |
|  `/`   |      Quotient       |     integers, floats, complex values      |
|  `%`   |      Remainder      |                 integers                  |
|  `&`   |     Bitwise AND     |                 integers                  |
|   `    |          `          |                Bitwise OR                 | integers |
|  `^`   |     Bitwise XOR     |                 integers                  |
|  `&^`  | Bit clear (AND NOT) |                 integers                  |
|  `<<`  |     Left shift      |        integer << unsigned integer        |
|  `>>`  |     Right shift     |        integer >> unsigned integer        |

比较操作符

| Symbol |    Operation     |
| :----: | :--------------: |
|  `==`  |      Equal       |
|  `!=`  |    Not equal     |
|  `<`   |       Less       |
|  `<=`  |  Less or equal   |
|  `>`   |     Greater      |
|  `>=`  | Greater or equal |

逻辑操作符

| Symbol |    Operation    |
| :----: | :-------------: | --- | -------------- |
|  `&&`  | Conditional AND |
|   `    |                 | `   | Conditional OR |
|  `!`   |       NOT       |
