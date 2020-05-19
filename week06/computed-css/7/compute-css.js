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
            const computedStyle = element.computedStyle
            const sp = specificity(rule.selectors[0])

            for(let declaration of rule.declarations) {
                if(!computedStyle[declaration.property]) {
                    computedStyle[declaration.property] = {}
                }
                if(!computedStyle[declaration.specificity]) {
                    computedStyle[declaration.property].value = declaration.value
                    computedStyle[declaration.property].specificity = sp
                }else if(compare(computedStyle[declaration.property].specificity, sp) < 0) {
                    computedStyle[declaration.property].value = declaration.value
                    computedStyle[declaration.property].specificity = sp
                }
            }            
        }
    }
}

function specificity(selector) {
    const p = [0, 0, 0, 0]
    const selectorParts = selector.split(' ')
    for(let part of selectorParts) {
        if(part.charAt(0) === '#') {
            p[2] += 1
        }else if(part.charAt(0) === '.') {
            p[1] += 1
        }else {
            p[3] += 1
        }
    }
    return p
}

function compare(sp1, sp2) {
    if(sp1[0] - sp2[0])
        return sp1[0] - sp2[0]
    if(sp1[1] - sp2[1])
        return sp1[1] - sp2[1]
    if(sp1[2] - sp2[2])
        return sp1[2] - sp2[2]
    
    return sp1[3] - sp1[3]
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

