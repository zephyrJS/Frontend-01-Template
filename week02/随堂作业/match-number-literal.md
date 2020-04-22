# 随堂作业1： 写一个正则表达式 匹配所有 Number 直接量

## 思路
查看 ECMA-262 Number Literal 的 BNF 表达式，根据定义写出对应正则表达式

## Number Literal Syntax（BNF）
NumericLiteral :: 
    DecimalLiteral 十进制
    BinaryIntegerLiteral 二进制
    OctalIntegerLiteral 八进制
    HexIntegerLiteral 十六进制

<!-- 十进制 -->
DecimalLiteral ::
    DecimalIntegerLiteral . DecimalDigits ExponentPart 整数 . 数字 指数
    . DecimalDigits ExponentPart . 数字 指数
    DecimalIntegerLiteral ExponentPart 整数 指数

DecimalIntegerLiteral :: 
    0
    NonZeroDigit DecimalDigits 非零数字 多个数字

DecimalDigits :: 
    DecimalDigits   多个数字
    DecimalDigits DecimalDigit 多个数字 数字

DecimalDigit :: onef of
    0 1 2 3 4 5 6 7 8 9

NonZeroDigit :: one of 
    1 2 3 4 5 6 7 8 9

ExponentPart ::
    ExponentIndicator SignedInteger


ExponentIndicator :: one of 
    e E
    
SignedInteger :: 
    DecimalDigits
    + DecimalDigits 
    - DecimalDigits



<!-- 二进制部分 -->
BinaryIntegerLiteral :: 
    0b BinaryDigits 
    0B BinaryDigits

BinaryDigits :: 
    BinaryDigit
    BinaryDigits BinaryDigit 
    
BinaryDigit :: one of
    0 1



<!-- 八进制 -->
OctalIntegerLiteral :: 
    0o OctalDigits 
    0O OctalDigits

OctalDigits :: 
    OctalDigit
    OctalDigits OctalDigit 
    
OctalDigit :: one of
    0 1 2 3 4 5 6 7



<!-- 十六进制 -->

HexIntegerLiteral :: 
    0x HexDigits 
    0X HexDigits

HexDigits :: 
    HexDigit
    HexDigits HexDigit 
    
HexDigit :: one of
    0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F


## 正则
### 十进制
**由上可得十进制相关的正则： **
    DecimalDigit: /[1-9]/
    NonZeroDigit: /[0-9]/
    DecimalDigits：/[0-9]*/
    ExponentIndicator: /[eE]/
    SignedInteger: /([+-]?[0-9])/
    DecimalIntegerLiteral: /0|([1-9][0-9]+)/   
    ExponentPart: /[eE]+([+-]?[1-9])/

    DecimalLiteral：
        DecimalIntegerLiteral . DecimalDigits ExponentPart: /(0|([1-9][0-9]*))\.[0-9]+[eE]+([+-]?[1-9])/
        . DecimalDigits ExponentPartopt: /\.[0-9]+[eE]+([+-]?[1-9])/
        DecimalIntegerLiteral ExponentPart: /(0|([1-9][0-9]*))/

### 二进制
**由上可得二进制相关的正则： **
    BinaryDigit：/[01]/
    BinaryDigits: /[01]+/
    BinaryIntegerLiteral：/0[bB][01]+/

### 八进制
**由上可得二进制相关的正则： **
    OctalDigit：/[01234567]/
    OctalDigits: /[01234567]+/
    OctalIntegerLiteral：/0[oO][01234567]+/

### 十六进制
**由上可得二进制相关的正则： **
    OctalDigit：/[0123456789abcdefABCDEF]/
    OctalDigits: /[0123456789abcdefABCDEF]+/
    OctalIntegerLiteral：/0[xX][0123456789abcdefABCDEF]+/

## 代码
```js
function matchNumberLiteral(num) {
    if(typeof num !== 'number') { throw new TypeError('请输入数字') }

    return /(0|([1-9][0-9]*))\.[0-9]+[eE]+([+-]?[1-9])/.test(num) ||    // 十进制
        /\.[0-9]+[eE]+([+-]?[1-9])/.test(num) ||                        // 十进制
        /(0|([1-9][0-9]*))/.test(num) ||                                // 十进制        
        /0[bB][01]+/.test(num) ||                                       // 二进制
        /0[oO][01234567]+/.test(num) ||                                 // 八进制        
        /0[xX][0123456789abcdefABCDEF]+/.test(num)                      // 十六进制    
}
```