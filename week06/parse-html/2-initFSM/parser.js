const EOF = Symbol('EOF') // End of file

function data(c) {

}

module.exports.parseHTML = function(html) {        
    // 使用 FSM 来处理字符串
    let state = data
    for(let c of html) {
        state = state(c)
    }
    state = state(EOF)
}