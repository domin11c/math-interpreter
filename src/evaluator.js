function evaluator(node) {
    if (node.type === 'bin_expr') {
        let result

        let lhs = evaluator(node.lhs);
        let rhs = evaluator(node.rhs);

        switch (node.operator) {
            case 'add':
                result = lhs + rhs
                break
            case 'sub':
                result = lhs - rhs
                break
            case 'mul':
                result = lhs * rhs
                break
            case 'div':
                result = lhs / rhs
                break
        }

        return result
    } else if (node.type === 'literal') {
        return node.value
    }
}

module.exports = evaluator