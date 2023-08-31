function parser(tokens) {
    let pos = 0

    function look() {
        return tokens[pos]
    }

    function eat() {
        return tokens[pos++]
    }

    function expect(type) {
        let token = look()

        if (token.type == type) {
            pos++
        } else {
            throw 'unexpected token'
        }
    }

    function parse_expr() {
        let lhs = parse_term()
        let token = look()

        while (token.type == 'add' || token.type == 'sub') {
            eat()

            let operator = token
            let rhs =  parse_term()

            token = look()
            lhs = {
                type: 'bin_expr',
                lhs: lhs,
                operator: operator.type,
                rhs: rhs
            }
        }

        return lhs
    }

    function parse_term() {
        let lhs = parse_factor()
        let token = look()

        while (token.type == 'mul' || token.type == 'div') {
            eat()

            let operator = token
            let rhs = parse_factor()

            token = look()
            lhs = {
                type: 'bin_expr',
                lhs: lhs,
                operator: operator.type,
                rhs: rhs
            }
        }

        return lhs
    }

    function parse_factor() {
        let token = look()

        if (token.type == 'number') {
            eat()
            return {
                type: 'literal',
                value: token.value
            }
        } else if (token.type == 'lparen') {
            eat()

            let value = parse_expr()
            expect('rparen')

            return value
        }
    }
    
   return parse_expr()
}

module.exports = parser