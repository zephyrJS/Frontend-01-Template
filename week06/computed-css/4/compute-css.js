const css = require('css')

const rules = []

function addCSSRules(text) {
    const ast = css.parse(text)
    rules.push(...ast.stylesheet.rules)
}

function computeCSS(element, stack) {
    const elemnts = stack.slice().reverse()
    if(!element.computedStyle) 
        element.computedStyle = {}

    for(let rule of rules) {        
        const selectorParts = rule.selectors[0].split(' ').reverse()
        
        if(!match(element, selectorParts[0])) 
            continue
        
        let matched = false
        let j = 1
        for(let i = 0; i<elemnts.length; i++) {
            if(match(elemnts[i], selectorParts[j])) {
                j++
            }
        }

        if(j >= selectorParts.length) {
            matched  = true
        }

        if(matched) {

        }
    }
}

function match() {}

module.exports = {
    addCSSRules,
    computeCSS
}

