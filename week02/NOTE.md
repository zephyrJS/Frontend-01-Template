## 随堂作业
- [写一个正则表达式 匹配所有 Number 直接量](./随堂作业/match-number-literal.md)
- [写一个 UTF-8 Encoding 的函数](./随堂作业/utf8-encode.md)
- [写一个正则表达式，匹配所有的字符串直接量，单引号和双引号](./随堂作业/match-quotes.md)


## 笔记
### 乔姆斯基谱系
- 0 型文法（无限制文法或短语结构文法）包括所有的文法。
- 1 型文法（上下文相关文法）。通俗理解：产生式左边有不止一个符号，则为上下文相关文法， 如：aSb -> aaSbb
- 2 型文法（上下文无关文法）。通俗理解：所有的产生式左边只有一个非终结符，如 S -> aSb
- 3 型文法（正规文法）生成正则语言。

### BNF（巴科斯范式）
- 是一种用于表示上下文无关文法的语言
- EBNF、ABNF

EBNF 中用到的元符表:
| 用途     |  符号表示  |
| -------- | :--------: |
| 定义     |     =      |
| 串接     |     ,      |
| 终止     |     ;      |
| 分隔     |            |
| 可选     |  [ ... ]   |
| 重复     |  { ... }   |
| 分组     |  ( ... )   |
| 双引     | 号	" ... " |
| 单引     | 号	' ... ' |
| 注释     | (* ... *)  |
| 特殊序列 |  ? ... ?   |
| 除外     |     -      |


### 图灵完备
- 图灵机
  - 命令式
    - goto
    - if 和 while
  - 声明式 lambda
    - 递归


### 动态与静态
- 动态
  - 在用户的设备/在线服务器上
  - 产品实际运行时
  - Runtime
- 静态
  - 在程序员设备上
  - 产品开发时
  - Compiletime

### Atom
- whiteSpace
- LineTerminator
- Comment
- Token
  - Punctuator
  - Keywords
  - IdentifierName
  - Literal
    - Number
    - String
    - Boolean
    - Null
    - Undefind

### 资料
[通俗理解上下文无关文法](https://www.zhihu.com/question/21833944)
[EBNF](https://zh.wikipedia.org/wiki/%E6%89%A9%E5%B1%95%E5%B7%B4%E7%A7%91%E6%96%AF%E8%8C%83%E5%BC%8F)
[来点儿编译原理（1）实现一个小型四则运算编译器](https://zhuanlan.zhihu.com/p/24035780)
