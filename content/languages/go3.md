# Golang

## 结构体 Struct

Structs are a way to arrange data in specific formats.

```go
// Declaring a struct
type Person struct {
    Name string
    Age int
}

// Initializing
person := Person{"John", 34}
person.Name // "John"
person.Age // 34

person2 := Person{Age: 20}
person2.Name // ""
person2.Age // 20

person3 := Person{}
person3.Name // ""
person3.Age // 0
```

## 映射 Map

Maps are data structures that holds values assigned to a key.

```go
// Declaring a map
var cities map[string]string

// Initializing
cities = make(map[string]string)
cities // nil

// Insert
cities["NY"] = "EUA"

// Retrieve
newYork = cities["NY"]
newYork // "EUA"

// Delete
delete(cities, "NY")

// Check if a key is set
value, ok := cities["NY"]
ok // false
value // ""
```

## 指针 Pointers

Pointers are a direct reference to a memory address that some variable or value is being stored.

```go
// Pointers has *T type
var value int
var pointer *int

// Point to a variable memory address with &
value = 3
pointer = &value

pointer // 3
pointer = 20
pointer // 20
pointer += 5
pointer // 25

// Pointers to structs can access the attributes
type Struct struct {
    X int
}

s := Struct{3}
pointer := &s

s.X // 3
```

Obs: Unlike C, Go doesn't have pointer arithmetics.

## 方法和接口 Methods and Interfaces

Go doesn't have classes. But you can implement methods, interfaces and almost everything contained in OOP, but in what gophers call "Go Way"

```go
type Dog struct {
    Name string
}

func (dog *Dog) bark() string {
    return dog.Name + " is barking!"
}

dog := Dog{"Rex"}
dog.bark() // Rex is barking!
```

Interfaces are implicitly implemented. You don't need to inform that your struct are correctly implementing a interface if it already has all methods with the same name of the interface.
All structs implement the `interface{}` interface. This empty interface means the same as `any`.

```go
// Car implements Vehicle interface
type Vehicle interface {
    Accelerate()
}

type Car struct {

}

func (car *Car) Accelerate() {
    return "Car is moving on ground"
}
```

## 错误 Errors

Go doesn't support `throw`, `try`, `catch` and other common error handling structures. Here, we use `error` package to build possible errors as a returning parameter in functions

```go
import "errors"

// Function that contain a logic that can cause a possible exception flow
func firstLetter(text string) (string, error) {
    if len(text) < 1 {
        return nil, errors.New("Parameter text is empty")
    }
    return string(text[0]), nil
}

a, errorA := firstLetter("Wow")
a // "W"
errorA // nil

b, errorB := firstLetter("")
b // nil
errorB // Error("Parameter text is empty")
```

## 测试 Testing

Go has a built-in library to unit testing. In a separate file you insert tests for functionalities of a file and run `go test package` to run all tests of the actual package or `go test path` to run a specific test file.

```go
// main.go
func Sum(x, y int) int {
    return x + y
}

// main_test.go
import (
    "testing"
    "reflect"
)

func TestSum(t *testing.T) {
    x, y := 2, 4
    expected := 2 + 4

    if !reflect.DeepEqual(Sum(x, y), expected) {
        t.Fatalf("Function Sum not working as expected")
    }
}
```
