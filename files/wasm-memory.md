## wasm线性内存使用源码

### wasm源码

引入打印函数，引入线性内存，定义字符串"Hi"，wasm导出函数writeHi，传递给打印函数内存内容，并进行打印。
这里的难点在js函数，可参考下面小程序中的源码。

```
(module
  (import "console" "log" (func $log (param i32 i32)))
  (import "js" "mem" (memory 1))
  (data (i32.const 0) "Hi")
  (func (export "writeHi")
    i32.const 0  ;; pass offset 0 to log
    i32.const 2  ;; pass length 2 to log
    call $log)
	)

```

### 小程序调用

定义全局变量
`let inst;`

将编码js文件下载，需要lib下面的两个文件（encoding.js,encoding-indexes.js），放入到小程序要引用的目录内。该js下载地址为
`https://github.com/inexorabletash/text-encoding`

引入编码js，
`var encoding = require("encoding.js")`

上面的编码js文件如果不引入，在真机上会出现错误，TypeError: TextDecoder is not a constructor。


定义加载wasm函数，并在onload中调用
```
  loadWasm(){
    var memory = new WXWebAssembly.Memory({
      initial: 1
    });
    var importObj = {
      console: {
        log: function consoleLogString(offset, length) {
          var bytes = new Uint8Array(memory.buffer, offset, length);
          var string = new encoding.TextDecoder('utf8').decode(bytes);
          wx.showToast({
            title: string,
          })
          console.log(string);
        },
      },
      js: {
        mem: memory
      }
    };
    WXWebAssembly.instantiate("/wasm/logstr.wasm", importObj).then(
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

调用wasm的函数
```
callWasm() {
     inst.writeHi();
  },
```

这样就可以了，可以在小程序五位字节码查看效果，有任何问题，欢迎提问讨论。