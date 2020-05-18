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
        return foundB
    }else {
        return start(c)
    }
}

function foundB(c) {
    if(c === 'c') {
        return foundC
    }else {
        return start(c)
    }
}

function foundC(c) {
    if(c === 'a') {
        return foundA1
    }else {
        return start(c)
    }
}

function foundA1(c) {
    if(c === 'b') {
        return foundB1
    }else {
        return start(c)
    }
}

function foundB1(c) {
    if(c === 'x') {
        return end
    }else {
        return foundB(c)
    }
}

function end() {
    return end
}

console.log(match('abcabcabx'))