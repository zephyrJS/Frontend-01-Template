// -----------------------------
// Util
function isTagName(c) {
    return c.match(/^[a-zA-Z]$/)
} 

function isWhiteSpace(c) {
    return c.match(/^[\t\f\n ]/)
}

function isQuote(c) {
    return c === '\'' || c === '\"' || c === '`'
}

// ----------------------------
// Main
const EOF = Symbol('EOF') // End of file

let currentToken = null
let currentAttribute = null

function emit(token) {
    if(token.type !== 'text') {
        console.log(token)
    }
}

function data(c) {
    if(c === '<') {
        return tagOpen
    }else if(c === EOF) {
        emit({
            type: 'EOF'
        })
        return 
    }else {
        emit({
            type: 'text',
            content: c
        })
        return data
    }
}

function tagOpen(c) {
    if(c === '/') {
        return endTagOpen
    }else if(isTagName(c)) {
        currentToken = {
            type: 'startTag',
            tagName: ''
        }
        return tagName(c) // Reconsume
    }else {
        emit({
            type: 'text',
            content: c
        })
        return 
    }
}

function tagName(c) {    
    if(isWhiteSpace(c)) {             
        return beforeAttributeName
    }else if(c === '/') {        
        return selfClosingStartTag
    }else if(isTagName(c)) {
        currentToken.tagName += c
        return tagName
    }else if(c === '>') {        
        emit(currentToken)
        return data
    }else {
        currentToken.tagName += c
        return tagName
    }
}

function beforeAttributeName(c) {
    if(isWhiteSpace(c)) {
        return beforeAttributeName
    }else if(c === '>' || c === '/' || c === EOF) {
        return afterAttributeName(c)
    }else if(c === '=') {
        
    }else {
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(c)
    }
}

function attributeName(c) {
    if(isWhiteSpace(c) || c === '/' || c === '> ' || c === EOF) {
        return afterAttributeName(c)
    }else if(c === '=') {
        return beforeAttributeValue
    }else if(c === '\u0000') { // null

    } else if(c === '\'' || c === '"' || c === '<') {

    } else {
        currentAttribute.name += c
        return attributeName
    }
}

function beforeAttributeValue(c) {
    if(isWhiteSpace(c) || c === '/' || c === '>' || c === EOF) {
        return beforeAttributeValue
    }else if(c === '\"') {
        return doubleQuoteAttributeValue
    }else if(c === '\'') {
        return singleQuoteAttributeValue
    }else {
        return unQuoteAttributeValue(c)
    }
}

function doubleQuoteAttributeValue(c) {
    if(c === '\"') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    }else if(c === '\u0000') {

    }else if(c === EOF) {

    }else {
        currentAttribute.value += c
        return doubleQuoteAttributeValue
    }
}

function singleQuoteAttributeValue(c) {
    if(c === '\'') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    }else if(c === '\u0000') {

    }else if(c === EOF) {

    }else {
        currentAttribute.value += c
        return singleQuoteAttributeValue
    }
}

function afterQuotedAttributeValue(c) {
    if(isWhiteSpace(c)) {
        return beforeAttributeName
    }else if(c === '/') {
        return selfClosingStartTag
    }else if(c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    }else if(c === EOF) {

    }else {
        currentAttribute.value += c
        return doubleQuoteAttributeValue
    }
}

function unQuoteAttributeValue(c) {
    if(isWhiteSpace(c)) {
        currentToken[currentAttribute.name] = currentAttribute.value
        return beforeAttributeName
    }else if(c === '/') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return selfClosingStartTag
    }else if(c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    }else if(isQuote(c) || c === '=' || c === '<') {

    }else if(c === '\u0000') {
    
    }else if(c === EOF) {

    }else {
        currentAttribute.value += c
        return unQuoteAttributeValue
    }
}

function selfClosingStartTag(c) {
    if(c === '>') {
        currentToken.isSelfClosing = true
        emit(currentToken)
        return data
    }else if(c === EOF) {

    }else {

    }
}

function endTagOpen(c) {
    if(isTagName(c)) {
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
        return tagName(c)
    }else if(c === '>') {

    }else if(c === EOF) {

    }else {

    }
}

function afterAttributeName(c) {
    if(isWhiteSpace(c)) {
        return afterAttributeName
    }else if(c === '/') {
        return selfClosingStartTag
    }else if(c === '=') {
        return beforeAttributeValue
    }else if(c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    }else if(c === EOF) {

    }else {
        currentToken[currentAttribute.name] = currentAttribute.value
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(c)
    }
}

module.exports.parseHTML = function(html) {   
    console.log(html.length) 
    // 使用 FSM 来处理字符串
    let state = data
    for(let c of html) {
        state = state(c)
    }
    state = state(EOF)
}