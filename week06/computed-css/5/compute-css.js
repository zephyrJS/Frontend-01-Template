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

function match(element, selector) {
    if(!element || !selector) 
        return false
    
    if(selector.charAt(0) === '#') {        
        const attr = element.attributes.find(attr => attr.name === 'id')
        if(attr && attr.value === selector.replace('#', ''))
            return true
    }else if(selector.charAt(0) === '.') {
        const attr = element.attributes.find(attr => attr.name === 'class')
        if(attr && attr.value === selector.replace('.', ''))
            return true
    }else {
        if(element.tagName === selector) {
            return true
        }
    }
    return false
}

module.exports = {
    addCSSRules,
    computeCSS
}

