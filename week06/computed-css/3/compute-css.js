const css = require('css')

const rules = []

function addCSSRules(text) {
    const ast = css.parse(text)
    rules.push(...ast.stylesheet.rules)
}

function computeCSS(node, stack) {
    const elemnts = stack.slice().reverse()
    console.log(elemnts)
}

module.exports = {
    addCSSRules,
    computeCSS
}

