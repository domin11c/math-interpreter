const lexer = require('./src/lexer')
const parser = require('./src/parser')
const evaluator = require('./src/evaluator')

let input = '(5 * 2) * 10.5'

let tokens = lexer(input)
let ast = parser(tokens)

console.log(evaluator(ast))