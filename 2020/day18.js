//day 18
parser = x => x.split("").filter(x => x.trim() !== "").map(x => isNaN(+x) ? x : +x)
input = document.getElementsByTagName('pre')[0].innerText.trim().split("\n").map(parser).filter(x => x!==undefined)

part1 = (input) => {
	run = (row) => {
		index = 0
		acc = 0
		peek = () => row[index]
		next = () => row[index++]
		hasNext = () => row.length > index
		evaluate = (token, prev) => {
			switch(token) {
				case '+': return plus(prev)
				case '*': return times(prev)
				case '(': return paren(prev)
				default: return expr(token)
			}
		}
		expr = value => value
		plus = prev => {
			return prev + evaluate(next())
		}
		times = prev => {
			return prev * evaluate(next())
		}
		paren = () => {
			value = 0
			while(peek() != ")") {
				value = evaluate(next(), value)
			}
			next()
			return value
		}
		while (hasNext()) {
			acc = evaluate(next(), acc)
		}
		return acc
	}

	return input.map(x => run(x)).reduce((acc, curr) => acc + curr)
}
console.log(part1(input))

part2 = (input) => {
	matching = (index, expression) => {
		let depth = 1
		for (let i = index + 1; i < expression.length; ++i) {
			if (expression[i] == "(")
				++depth
			if (expression[i] == ")")
				--depth
			if (depth === 0)
				return i
		}
	}
	evaluate = (expression) => {
		if (expression.length === 1) 
			return expression[0]
		let paren = expression.indexOf("(")
		if (paren >= 0) {
			let match = matching(paren, expression)
			return evaluate([...expression.slice(0, paren), evaluate(expression.slice(paren + 1, match)), ...expression.slice(match + 1)])
		}
		let times = expression.indexOf("*")
		if (times >= 0) {
			return evaluate(expression.slice(0, times)) * evaluate(expression.slice(times + 1))
		}
		let plus = expression.indexOf("+")
		if (plus >= 0) {
			return evaluate(expression.slice(0, plus)) + evaluate(expression.slice(plus + 1))
		}
	}

	return input.map(x => evaluate(x)).reduce((acc, curr) => acc + curr)
}
console.log(part2(input))
