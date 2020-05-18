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
        return start1
    }else {
        return start(c)
    }
}

function start1(c) {
    if(c === 'a') {
        return foundA1
    }else {
        return start(c)
    }
}

function foundA1(c) {
    if(c === 'b') {
        return start2
    }else {
        return start(c)
    }
}

function start2(c) {
    if(c === 'a') {
        return foundA2
    }else {
        return start(c)
    }
}

function foundA2(c) {
    if(c === 'b') {
        return foundB
    }else {
        return start(c)
    }
}

function foundB(c) {
    if(c === 'x') {
        return end
    }else {
        return start(c)
    }
}

function end() {
    return end
}

console.log(match('abababx'))