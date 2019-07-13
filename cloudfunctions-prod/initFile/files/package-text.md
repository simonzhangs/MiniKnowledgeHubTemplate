## Text 包

包模板实现数据驱动模板以生成文本输出。

要生成 HTML 输出，请参阅包 html / template，它具有与此包相同的接口，但会自动保护 HTML 输出免受某些攻击。

通过将模板应用于数据结构来执行模板。模板中的注释引用数据结构的元素（通常是结构的字段或映射中的键）来控制执行并派生要显示的值。执行模板遍历结构并设置光标，由句点'。'表示。并且在执行过程中将“dot”称为结构中当前位置的值。

模板的输入文本是任何格式的 UTF-8 编码文本。“行动” - 数据评估或控制结构 - 由“{{”和“}}”分隔; 所有文本外部操作都将复制到输出中不变。除了原始字符串之外，虽然注释可以，但操作可能不会跨越换行符。

一旦解析，模板可以安全地并行执行，但是如果并行执行共享 Writer，则输出可以是交错的。

这是一个简单的例子，打印出“17 件由羊毛制成”。

```
type Inventory struct {
	Material string
	Count    uint
}
sweaters := Inventory{"wool", 17}
tmpl, err := template.New("test").Parse("{{.Count}} items are made of {{.Material}}")
if err != nil { panic(err) }
err = tmpl.Execute(os.Stdout, sweaters)
if err != nil { panic(err) }
```

```
package main

import (
	"log"
	"os"
	"text/template"
)

func main() {
	// Define a template.
	const letter = `
Dear {{.Name}},
{{if .Attended}}
It was a pleasure to see you at the wedding.
{{- else}}
It is a shame you couldn't make it to the wedding.
{{- end}}
{{with .Gift -}}
Thank you for the lovely {{.}}.
{{end}}
Best wishes,
Josie
`

	// Prepare some data to insert into the template.
	type Recipient struct {
		Name, Gift string
		Attended   bool
	}
	var recipients = []Recipient{
		{"Aunt Mildred", "bone china tea set", true},
		{"Uncle John", "moleskin pants", false},
		{"Cousin Rodney", "", false},
	}

	// Create a new template and parse the letter into it.
	t := template.Must(template.New("letter").Parse(letter))

	// Execute the template for each recipient.
	for _, r := range recipients {
		err := t.Execute(os.Stdout, r)
		if err != nil {
			log.Println("executing template:", err)
		}
	}

}

```
