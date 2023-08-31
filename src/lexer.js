const regexDigits = /[0-9]/g
const regexWhitespace = /[\s\n\t\r]/g

function lexer(input) {
    let pos = 0;
    let tokens = []

    function look() {
        return input.charAt(pos)
    }

    function number() {
        let found_dot = false;

        while (true) {
            let c = look()

            if (c.match(regexDigits)) {
                pos++
            } else if (c == '.') {
                if (found_dot) break
                found_dot = true
                pos++
            } else {
                break
            }
        }
    }

    while (true) {
        let char = look();

        let token = {
            type: null,
            value: null
        }

        let start_pos = pos

        if (char == '') {
            token.type = 'eof'
        } else if (char.match(regexWhitespace)) {
            pos++
        } else if (char == '+') {
            pos++
            token.type = 'add'
        } else if (char == '-') {
            pos++
            
            if (look().match(regexDigits)) {
                number()
                token.type = 'number'
                token.value = parseFloat(`${input.substring(start_pos, pos)}`)
            } else {
                token.type = 'sub'
            }

            
        } else if (char == '*') {
            pos++
            token.type = 'mul'
        } else if (char == '/') {
            pos++
            token.type = 'div'
        } else if (char == '(') {
            pos++
            token.type = 'lparen'
        } else if (char == ')') {
            pos++
            token.type = 'rparen'
        } else if (char.match(regexDigits)) {
            number()
            token.type = 'number'
            token.value = parseFloat(input.substring(start_pos, pos))
        } else {
            throw 'illegal character'
        }

        if (token.type) {
            tokens.push(token)
            if (token.type == 'eof') break
        }
    }

    return tokens
}

module.exports = lexer