const css = require('css')

const rules = []

function addCSSRules(text) {
    const ast = css.parse(text)
    console.log(JSON.stringify(ast, null, 2))
    rules.push(...ast.stylesheet.rules)
}

function computeCSS(node) {
    
}

module.exports = {
    addCSSRules
}

