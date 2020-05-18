// -----------------------------
// Util
function isTagName(c) {
    return c.match(/^[a-zA-Z]$/)
} 

function isWhiteSpace(c) {
    return c.match(/^[\t\f\n ]/)
}

// ----------------------------
// Main
const EOF = Symbol('EOF') // End of file

let currentToken = null


function data(c) {
    if(c === '<') {
        return tagOpen
    }else if(c === EOF) {
        return 
    }else {
        return data
    }
}

function tagOpen(c) {
    if(c === '/') {
        return endTagOpen
    }else if(isTagName(c)) {
        return tagName(c) // Reconsume
    }else {
        return 
    }
}

function tagName(c) {    
    if(isWhiteSpace(c)) {             
        return beforeAttributeName
    }else if(c === '/') {        
        return selfClosingStartTag
    }else if(isTagName(c)) {
        return tagName
    }else if(c === '>') {        
        return data
    }else {
        return tagName
    }
}

function beforeAttributeName(c) {
    if(isWhiteSpace(c)) {
        return beforeAttributeName
    }else if(c === '>' || c === '/' || c === EOF) {
        return data
    }else if(c === '=') {
        return beforeAttributeName
    }else {
        return beforeAttributeName
    }
}


function selfClosingStartTag(c) {
    if(c === '>') {
        currentToken.isSelfClosing = true
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

module.exports.parseHTML = function(html) {   
    console.log(html.length) 
    // 使用 FSM 来处理字符串
    let state = data
    for(let c of html) {
        state = state(c)
    }
    state = state(EOF)
}