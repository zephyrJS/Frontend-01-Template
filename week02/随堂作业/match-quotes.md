# 随堂作业3： 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

## 思路
查看 ECMA-262 String Literal 的 BNF 表达式，根据定义写出对应正则表达式


## String Literal Syntax（BNF）

StringLiteral ::
    " DoubleStringCharacters " 
    ' SingleStringCharacters '

DoubleStringCharacters ::
    DoubleStringCharacter DoubleStringCharacters

SingleStringCharacters ::
    SingleStringCharacter SingleStringCharacters

DoubleStringCharacter ::
    SourceCharacter but not one of " or \ or LineTerminator 
    <LS>
    <PS>
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



### 代码
```js
const stringReExp = /[\u0021-\u007E]{6,16}|[\x21-\x7E]{6,16}|(['"])(?:(?!\1).)*?\1/g;
```