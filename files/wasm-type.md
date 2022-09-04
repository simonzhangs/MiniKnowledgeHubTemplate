## wasm基本类型使用源码

### wasm源码

一个函数将一个整数加上100并返回，一个函数将一个整数乘以100并返回。

```
(module
  (func $add100 (param $lhs i32)  (result i32)
    local.get $lhs
	i32.const 100
    i32.add)
  (func $mul100 (param $lhs i32) (result i32)
    local.get $lhs
	i32.const 100
	i32.mul)
  (export "add100" (func $add100))
  (export "mul100" (func $mul100))
)
```

### 小程序调用

定义全局变量
`let inst;`

定义加载wasm函数，并在onload中调用
```
  loadWasm() {
    var that = this;
    const info = {};
    WXWebAssembly.instantiate("/wasm/simple.wasm", info).then(
      (result) => {
        console.log("初始化成功");
        inst = result.instance.exports;
      },
      (err) => {
        console.log("初始化失败");
        that.setData({
          isCurrentWaring: true, 
        });
      }
    );
  },
```

调用wasm的函数
```
callWasm() {
    var that = this;
    const v1 = inst.add100(that.addnum);
    const v2 = inst.mul100(that.mulnum);
    that.setData({
      addResult: v1,
      mulResult: v2,
    });
  },
```

这样就可以了，有任何问题，欢迎提问讨论。