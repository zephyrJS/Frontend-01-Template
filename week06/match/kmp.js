const ALPHABET = 256
function createPlanarArray(m, n) {
    return Array.from(
        new Array(m), 
        ()=> Array.from(
              new Array(n), 
              () => 0
        )
    )      
}

function genFSM(pattern) {
    const M = pattern.length
    const fsm = createPlanarArray(M, ALPHABET)
    const index = pattern[0].codePointAt()    
    fsm[0][index] = 1
    let X = 0    

    for(let j = 1; j < M; j++) {
        for(let c = 0; c < ALPHABET; c++) {
            fsm[j][c] = fsm[X][c];
        }

        let codePoint = pattern[j].codePointAt()
        fsm[j][codePoint] = j + 1;
        X = fsm[X][codePoint];
    }
    
    return fsm
}

function search(text, pattern) {    
    const N = text.length
    const M = pattern.length
    const fsm = genFSM(pattern)

    for(let i = 0, j = 0; i < N; i++) {
        let codePoint = text[i].codePointAt()        
        j = fsm[j][codePoint] 
        if(j == M) {
            console.log('匹配成功', i - M + 1);
            return i - M + 1
        }
    }
    console.log('匹配失败')
    return -1
}

const pattern = 'aaab'
const text = 'aaacaaab'
search(text, pattern)