# 随堂作业3： 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

## 思路
查看 ECMA-262 String Literal 的 BNF 表达式，根据定义写出对应正则表达式


## String Literal Syntax（BNF）

StringLiteral ::
    " DoubleStringCharacters " 带双引号字符串
    ' SingleStringCharacters ' 带单引号字符串

DoubleStringCharacters ::
    DoubleStringCharacter DoubleStringCharacters 双引号内字符串

SingleStringCharacters ::
    SingleStringCharacter SingleStringCharacters 单引号内字符串

DoubleStringCharacter ::
    SourceCharacter but not one of " or \ or LineTerminator  不包含 " | \ | 换行符的 unicode 字符集 
    <LS>    U+2028
    <PS>    U+2029
    \ EscapeSequence
    LineContinuation

SingleStringCharacter ::
    SourceCharacter but not one of ' or \ or LineTerminator 
    <LS>
    <PS>
    \ EscapeSequence
    LineContinuation

LineContinuation ::
    \ LineTerminatorSequence

EscapeSequence :: 
    CharacterEscapeSequence
    0 [lookahead ∉ DecimalDigit] 
    HexEscapeSequence 
    UnicodeEscapeSequence

CharacterEscapeSequence :: 
    SingleEscapeCharacter
    NonEscapeCharacter

SingleEscapeCharacter :: one of
    ' " \ b f n r t v

NonEscapeCharacter ::
    SourceCharacter but not one of EscapeCharacter or LineTerminator

EscapeCharacter :: 
    SingleEscapeCharacter
    DecimalDigit
    x 
    u

HexEscapeSequence ::
    x HexDigit HexDigit

UnicodeEscapeSequence :: 
    u Hex4Digits
    u{ CodePoint }

Hex4Digits ::
    HexDigit HexDigit HexDigit HexDigit
    
HexDigit :: one of
    0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F

SourceCharacter ::
    any Unicode code point

LineTerminator :: 
    <LF> 
    <CR> 
    <LS>
    <PS>

LineTerminatorSequence :: 
    <LF>
    <CR>[lookahead ≠ <LF>] 
    <LS>
    <PS>
    <CR><LF>



### 代码
```js
const stringReExp = /[\u0021-\u007E]{6,16}|[\x21-\x7E]{6,16}|(['"])(?:(?!\1).)*?\1/g;
```