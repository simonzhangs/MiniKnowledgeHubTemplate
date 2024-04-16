## wasm表格使用源码

### wasm源码

定义表格，包含2个函数，元素从0开始，定义函数类型，然后导出调用表格的函数，通过表格索引去调用具体函数。函数1返回42，函数2返回13。

```
(module
  (table 2 funcref)
  (func $f1 (result i32)
    i32.const 42)
  (func $f2 (result i32)
    i32.const 13)
  (elem (i32.const 0) $f1 $f2)
  (type $return_i32 (func (result i32)))
  (func (export "callByIndex") (param $i i32) (result i32)
    local.get $i
    call_indirect  (type $return_i32)
    )
)

```

### 小程序调用

定义全局变量
`let inst;`


定义加载wasm函数，并在onload中调用
```
  loadWasm() {
    var importObj = {

    };
    WXWebAssembly.instantiate("/wasm/wasm-table.wasm", importObj).then(
      (result) => {
        console.log("初始化成功");
        inst = result.instance.exports;
      },
      (err) => {
        console.log("初始化失败", err);
      }
    );
  },
```

调用wasm的函数，这里写了两个按钮，分别调用不同函数。
```
  callWasm2() {
      let i = inst.callByIndex(1);
    console.log(i); // 返回 13
    wx.showToast({
      title: ''+i,
    })
  },
  
  callWasm1() {
      let i = inst.callByIndex(0);
    console.log(i); // 返回 42
    wx.showToast({
      title: ''+i,
    })
  },
```

这样就可以了，可以在小程序五位字节码查看效果，有任何问题，欢迎提问讨论。