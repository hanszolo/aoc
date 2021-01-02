//day 19
parser = rows => {
	re = /^([0-9]+): (?:(\"a\")|(\"b\")|(?:([0-9]+) ?([0-9]+)? ?([0-9]+)?(?: \| ([0-9]+) ?([0-9]+)?)?))$/
	rules = {}
	rows[0].split("\n").map(x => x.trim().match(re)).forEach(matches => {
		if (matches[2])
			rules[matches[1]] = 'a'
		else if (matches[3])
			rules[matches[1]] = 'b'
		else {
			rules[matches[1]] = [[matches[4], matches[5], matches[6]].filter(x => !!x)]
			if (matches[7]) {
				rules[matches[1]].push([matches[7], matches[8]].filter(x => !!x))
			}
		}
	})
	return {
		rules: rules,
		messages: rows[1].trim().split("\n")
	}
}
input = parser(document.getElementsByTagName('pre')[0].innerText.trim().split("\n\n"))

part1 = (input) => {
	match = (str, rule) => {
		let rules = input.rules[rule]
		if (rules == 'a' || rules == 'b') {
			return str.startsWith(rules) ? rules : null
        }
		for (let option of rules) {
			let partial = ""
            let all = true
			for (let component of option) {
				let submatch = match(str.slice(partial.length), component)
				if (submatch == null) {
                    all = false
					break
                }
				partial += submatch
			}
			if (all) {
				return partial
			}
		}
		return null
	}
	return input.messages.filter(x => match(x, '0') == x).length
}
console.log(part1(input))

part2 = (input) => {
	calculate = (rule, mapping = {}) => {
	    if (input.rules[rule] == 'a' || input.rules[rule] == 'b') {
	        mapping[rule] = 1
	    } else if (mapping[rule] === undefined) {
	        for (let option of input.rules[rule]) {
	            mapping[rule] = 0
	            for (let child of option) {
	                calculate(child, mapping)
	                mapping[rule] += mapping[child]
	            }
	        }
	    }
	    return mapping
	}
	lengths = calculate(42, calculate(31))

	match = (str, rule) => {
		let rules = input.rules[rule]
		if (rules == 'a' || rules == 'b') {
			return str.startsWith(rules) ? rules : null
        }
		for (let option of rules) {
			let partial = ""
            let all = true
			for (let component of option) {
				let submatch = match(str.slice(partial.length), component)
				if (submatch == null) {
                    all = false
					break
                }
				partial += submatch
			}
			if (all) {
				return partial
			}
		}
		return null
	}
	perfect = (str, rule) => str == match(str, rule)
	matches0 = (str) => {
		count42 = 0
		for (let i = 0; i < str.length; i += lengths[42]) {
			if (perfect(str.slice(i, i + lengths[42]), 42))
				++count42
			else
				break
		}
		count31 = 0
		for (let i = count42 * lengths[42]; i < str.length; i += lengths[31]) {
			if (perfect(str.slice(i, i + lengths[31]), 31))
				++count31
			else
				return false
		}
		return count42 > 0 && count31 > 0 && count42 > count31
	}
	return input.messages.filter(x => matches0(x)).length
}
console.log(part2(input))
