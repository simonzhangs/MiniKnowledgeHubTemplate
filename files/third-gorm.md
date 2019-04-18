# Go 数据库框架 gorm

Golang 梦幻般的 ORM 库旨在让开发人员使用更加友好。

## 概览

- 全功能 ORM (无限接近)
- 关联（有一个，有很多，属于，多对多，多态）
- 钩子 (在创建/保存/更新/删除/查找之前或之后)
- 预加载
- 事务
- 复合主键
- SQL 生成器
- 数据库自动迁移
- 自定义日志
- 可扩展性, 可基于 GORM 回调编写插件
- 所有功能都被测试覆盖
- 开发者友好

## 安装

```bash
go get -u github.com/jinzhu/gorm
```

## 快速入门

```golang
package main

import (
  "github.com/jinzhu/gorm"
  _ "github.com/jinzhu/gorm/dialects/sqlite"
)

type Product struct {
  gorm.Model
  Code string
  Price uint
}

func main() {
  db, err := gorm.Open("sqlite3", "test.db")
  if err != nil {
    panic("failed to connect database")
  }
  defer db.Close()

  // Migrate the schema
  db.AutoMigrate(&Product{})

  // 创建
  db.Create(&Product{Code: "L1212", Price: 1000})

  // 读取
  var product Product
  db.First(&product, 1) // 查询id为1的product
  db.First(&product, "code = ?", "L1212") // 查询code为l1212的product

  // 更新 - 更新product的price为2000
  db.Model(&product).Update("Price", 2000)

  // 删除 - 删除product
  db.Delete(&product)
}
```

## 模块定义

模型（Models）通常只是正常的 golang structs、基本的 go 类型或它们的指针。 同时也支持 sql.Scanner 及 driver.Valuer 接口（interfaces）。

模型（Model）示例:

```golang
type User struct {
  gorm.Model
  Name         string
  Age          sql.NullInt64
  Birthday     *time.Time
  Email        string  `gorm:"type:varchar(100);unique_index"`
  Role         string  `gorm:"size:255"` // 设置字段大小为255
  MemberNumber *string `gorm:"unique;not null"` // 设置会员号（member number）唯一并且不为空
  Num          int     `gorm:"AUTO_INCREMENT"` // 设置 num 为自增类型
  Address      string  `gorm:"index:addr"` // 给address字段创建名为addr的索引
  IgnoreMe     int     `gorm:"-"` // 忽略本字段
  }
```

## 结构体标记（tags）

标记（tags）在声明模型时是可选项。gorm 支持以下标记:

### 支持的结构体标记（Struct tags）

| 结构体标记（Tag） | 描述                                                     |
| ----------------- | -------------------------------------------------------- |
| Column            | 指定列名                                                 |
| Type              | 指定列数据类型                                           |
| Size              | 指定列大小, 默认值 255                                   |
| PRIMARY_KEY       | 将列指定为主键                                           |
| UNIQUE            | 将列指定为唯一                                           |
| DEFAULT           | 指定列默认值                                             |
| PRECISION         | 指定列精度                                               |
| NOT NULL          | 将列指定为非 NULL                                        |
| AUTO_INCREMENT    | 指定列是否为自增类型                                     |
| INDEX             | 创建具有或不带名称的索引, 如果多个索引同名则创建复合索引 |
| UNIQUE_INDEX      | 和 INDEX 类似，只不过创建的是唯一索引                    |
| EMBEDDED          | 将结构设置为嵌入                                         |
| EMBEDDED_PREFIX   | 设置嵌入结构的前缀                                       |
| -                 | 忽略此字段                                               |

### 关联关系相关的结构体标记（tags）

| 结构体标记（Tag）                | 描述                                           |
| -------------------------------- | ---------------------------------------------- |
| MANY2MANY                        | 设置 join 的表                                 |
| FOREIGNKEY                       | 设置外键                                       |
| ASSOCIATION_FOREIGNKEY           | Specifies association foreign key              |
| POLYMORPHIC                      | Specifies polymorphic type                     |
| POLYMORPHIC_VALUE                | Specifies polymorphic value                    |
| JOINTABLE_FOREIGNKEY             | Specifies foreign key of jointable             |
| ASSOCIATION_JOINTABLE_FOREIGNKEY | Specifies association foreign key of jointable |
| SAVE_ASSOCIATIONS                | AutoSave associations or not                   |
| ASSOCIATION_AUTOUPDATE           | AutoUpdate associations or not                 |
| ASSOCIATION_AUTOCREATE           | AutoCreate associations or not                 |
| ASSOCIATION_SAVE_REFERENCE       | AutoSave associations reference or not         |
| PRELOAD                          | Auto Preload associations or not               |

## 约定

gorm.Model 是一个基本结构 GoLang 它包括以下字段：ID，CreatedAt，UpdatedAt，DeletedAt。

它可以嵌入到您的模型中，也可以在没有它的情况下构建自己的模型。

```golang
// gorm.Model definition
type Model struct {
  ID        uint `gorm:"primary_key"`
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt *time.Time
}

// Inject fields `ID`, `CreatedAt`, `UpdatedAt`, `DeletedAt` into model `User`
type User struct {
  gorm.Model
  Name string
}

// Declaring model w/o gorm.Model
type User struct {
  ID   int
  Name string
}
```

### ID 作为主键

GORM 默认使用名称 ID 作为表主键。

```golang
type User struct {
  ID   string // field named `ID` will be used as primary field by default
  Name string
}

// Set field `AnimalID` as primary field
type Animal struct {
  AnimalID int64 `gorm:"primary_key"`
  Name     string
  Age      int64
}
```

### 多元化的表名

表名是结构体名称的复数形式

```golang
type User struct {} // default table name is `users`

// Set User's table name to be `profiles`
func (User) TableName() string {
  return "profiles"
}

func (u User) TableName() string {
    if u.Role == "admin" {
        return "admin_users"
    } else {
        return "users"
    }
}

// Disable table name's pluralization, if set to true, `User`'s table name will be `user`
db.SingularTable(true)
```

### 指定表名称

```golang
// Create `deleted_users` table with struct User's definition
db.Table("deleted_users").CreateTable(&User{})

var deleted_users []User
db.Table("deleted_users").Find(&deleted_users)
//// SELECT * FROM deleted_users;

db.Table("deleted_users").Where("name = ?", "jinzhu").Delete()
//// DELETE FROM deleted_users WHERE name = 'jinzhu';
```

### 更改默认表名称

通过定义 DefaultTableNameHandler 可以自定义默认表名

```golang
gorm.DefaultTableNameHandler = func (db *gorm.DB, defaultTableName string) string  {
    return "prefix_" + defaultTableName;
}
```

### 下划线分割命名的列名

列名默认会为结构体名称的小写驼峰方式命名

```golang
type User struct {
  ID        uint      // column name is `id`
  Name      string    // column name is `name`
  Birthday  time.Time // column name is `birthday`
  CreatedAt time.Time // column name is `created_at`
}

// Overriding Column Name
type Animal struct {
    AnimalId    int64     `gorm:"column:beast_id"`         // set column name to `beast_id`
    Birthday    time.Time `gorm:"column:day_of_the_beast"` // set column name to `day_of_the_beast`
    Age         int64     `gorm:"column:age_of_the_beast"` // set column name to `age_of_the_beast`
}
```

### 时间点跟踪

#### CreatedAt

如果模型中包含 CreatedAt 字段，它会在记录第一次创建时设置时间

```golang
db.Create(&user) // will set `CreatedAt` to current time

// To change its value, you could use `Update`
db.Model(&user).Update("CreatedAt", time.Now())
```

#### UpdatedAt

如果模型中包含 UpdatedAt 字段，它会在记录更新时设置时间

```golang
db.Save(&user) // will set `UpdatedAt` to current time

db.Model(&user).Update("name", "jinzhu") // will set `UpdatedAt` to current time
```

#### DeletedAt

如果模型中包含 DeletedAt 字段，当实例调用 Delete 时，它并不会真正的删除记录，仅仅在该字段中设置当前时间。也叫软删除。

```golang
db.Delete(&user)
//// UPDATE users SET deleted_at="2013-10-29 10:23" WHERE id = 111;

// Batch Delete
db.Where("age = ?", 20).Delete(&User{})
//// UPDATE users SET deleted_at="2013-10-29 10:23" WHERE age = 20;

// Soft deleted records will be ignored when query them
db.Where("age = 20").Find(&user)
//// SELECT * FROM users WHERE age = 20 AND deleted_at IS NULL;

// Find soft deleted records with Unscoped
db.Unscoped().Where("age = 20").Find(&users)
//// SELECT * FROM users WHERE age = 20;
```

如果想永久删除记录

```golang
// Delete record permanently with Unscoped
db.Unscoped().Delete(&order)
//// DELETE FROM orders WHERE id=10;
```

## 连接数据库

为了连接到数据库，你需要先引入数据库驱动。例如：

```golang
import _ "github.com/go-sql-driver/mysql"
```

GORM 包装了一些驱动，在引入的时候方便记忆。这样你可以这样引入数据库驱动：

```golang
import _ "github.com/jinzhu/gorm/dialects/mysql"
// import _ "github.com/jinzhu/gorm/dialects/postgres"
// import _ "github.com/jinzhu/gorm/dialects/sqlite"
// import _ "github.com/jinzhu/gorm/dialects/mssql"
```

### 所支持的数据库

这里仅仅列出了 Mysql，其它数据库请参考 gorm.io 官网

#### Mysql

注意：为了正确处理 time.Time,你需要将 parseTime 作为一个参数引入，为了完整支持 utf-8 编码，你需要将字符集从 charset=utf8 改为 charset=utf8mb4。

```golang
import (
  "github.com/jinzhu/gorm"
  _ "github.com/jinzhu/gorm/dialects/mysql"
)

func main() {
  db, err := gorm.Open("mysql", "user:password@/dbname?charset=utf8&parseTime=True&loc=Local")
  defer db.Close()
}
```

其它更高级内容请参考 gorm.io 官网
