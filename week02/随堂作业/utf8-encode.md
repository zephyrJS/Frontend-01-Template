# 随堂作业2： 写一个 UTF-8 Encoding 的函数

<!-- 编码表 -->
```js
Unicode符号范围     |        UTF-8编码方式
(十六进制)        |              （二进制）
----------------------+---------------------------------------------
0000 0000-0000 007F | 0xxxxxxx
0000 0080-0000 07FF | 110xxxxx 10xxxxxx
0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
```

```js
function utf8Encode() {
    var back = []
    var byteSize = 0
    for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i)
        if (0x00 <= code && code <= 0x7f) {
            byteSize += 1
            back.push(code)
        } else if (0x80 <= code && code <= 0x7ff) {
            byteSize += 2
            back.push(192 | (31 & (code >> 6)))
            back.push(128 | (63 & code))
        } else if (
            (0x800 <= code && code <= 0xd7ff) ||
            (0xe000 <= code && code <= 0xffff)
        ) {
            byteSize += 3
            back.push(224 | (15 & (code >> 12)))
            back.push(128 | (63 & (code >> 6)))
            back.push(128 | (63 & code))
        }
    }
    for (i = 0; i < back.length; i++) {
        back[i] &= 0xff
    }
    if (isGetBytes) {
        return back
    }
    if (byteSize <= 0xff) {
        return [0, byteSize].concat(back)
    } else {
        return [byteSize >> 8, byteSize & 0xff].concat(back)
    }
}
```
