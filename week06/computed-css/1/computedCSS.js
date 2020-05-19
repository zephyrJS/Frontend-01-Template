const css = require('css')

const rules = []

module.exports.addCSSRules = function(text) {
    const ast = css.parse(text)
    console.log(JSON.stringify(ast, null, 2))
    rules.push(...ast.stylesheet.rules)
}