## 作业
- FSM
  - [匹配 abababx](./match/abababx.js)
  - [kmp](./match/kmp.js)
- [pase-html](./parse-html/7-combineText/parser.js)
- [compute-css](computed-css/7/compute-css.js)

## 总结

### 1.有限状态机(FSM)


#### FSM 概念
- 每一个状态都是一个机器
  - 在每一个机器里，我们可以做计算、存储、输出
  - 所有的这些机器接受的输入是一致的
  - 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，它应该是纯函数（无副作用）
- 每一个机器知道下一个状态
  - 每个机器都有确定的下一个状态（Moore）
  - 每个机器根据输入决定下一个状态（Mealy）

#### 用 FSM 匹配字符串
如果直接使用 for 循环的方式来遍历匹配字符串，虽然逻辑简单，但每匹配一个字符，就需要添加一个条件分支。随着待匹配字符串规模变大，则匹配的时间复杂度会变成 O(n * m)（n 主串长度，m 模式串）。所以如果用 FSM，则时间复杂度则会降为 O(n)

FSM 匹配简单字符串的方法如下：
```js
// found abc
function match(input) {
    let state = start
    for(let c of input) {
        state = state(c)
    }
    return state === end
}

function start(c) {
    if(c === 'a') {
       return foundA 
    }else {
        return start
    }
}

function foundA(c) {
    if(c === 'b') {
        return end
    }else {
        return start
    }
}

function end() {
    return end
}
```

### KMP 算法
简单的字符串匹配虽然能解决问题，但随着模式串规模变大，需要些的状态方程也会越来越多，所以我们可以使用 KMP 算法 FSM 解法来解决这个问题。


- [] 概念
- [] 常规思路 (next 数组解法)
- [] FSM 解法




### 2.Parse HTML
- 第一步：拆分文件
- 第二步：创建状态机
- 第三步：解析标签
- 第四步：创建元素
- 第五步：处理属性
- 第六步：构建 DOM 树
- 第七步：文本节点

一句话总结：通过 FSM 生成 token，如果为 openTag 入栈，closeTag 出栈并添加到 AST 树上

### 3.Compute CSS
- 第一步：收集 CSS 规则
- 第二步：添加调用
- 第三步：获取父元素序列
- 第四步：拆分选择器
- 第五步：计算选择器与元素匹配
- 第六步：生成 computed 属性
- 第七步：确定规则覆盖关系

