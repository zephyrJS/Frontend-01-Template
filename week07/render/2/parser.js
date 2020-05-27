const {addCSSRules, computeCSS} = require('./compute-css')
const layout = require('./layout')

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
const stack = [{ type: 'document', children: [] }]

let currentToken = null
let currentAttribute = null
let currentTextNode = null

function emit(token) {
    const top = stack[stack.length - 1]

    if(token.type === 'startTag') {
        const node = {
            type: 'element',
            tagName: token.tagName,
            children: [],
            attributes: []
        }

        for(let i in token) {
            if(!['tagName', 'type', 'isSelfClosing'].includes(i)) {
                node.attributes.push({
                    name: i,
                    value: token[i]
                })
            }
        }
        
        computeCSS(node, stack)
        
        top.children.push(node)
        // node.parent = top

        if(!token.isSelfClosing) stack.push(node)        

        currentTextNode = null

        return 
    }

    if(token.type === 'endTag') {
        if(token.tagName !== top.tagName) {
            throw new Error('Tag start and end doesn\'t match')
        }else {
            // 遇到 style 标签时，执行添加 css 操作
            if(top.tagName === 'style') {
                addCSSRules(top.children[0].content)
            }
            layout(top)
            stack.pop()
        }

        currentTextNode = null

        return 
    }

    if(token.type === 'text') {
        if(!currentTextNode) {
            currentTextNode = {
                type: 'text',
                content: '',
            }
            top.children.push(currentTextNode)
        }

        currentTextNode.content += token.content

        return 
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

    // console.log(JSON.stringify(stack[0], null, 2))
    return stack[0]
}