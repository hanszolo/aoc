//day 19
parser = rows => {
	re = /^([0-9]+): (?:(\"a\")|(\"b\")|(?:([0-9]+) ?([0-9]+)?(?: \| ([0-9]+) ?([0-9]+)?)?))$/
	rules = {}
	rows[0].split("\n").map(x => x.trim().match(re)).forEach(matches => {
		if (matches[2])
			rules[matches[1]] = 'a'
		else if (matches[3])
			rules[matches[1]] = 'b'
		else {
			rules[matches[1]] = [[matches[4], matches[5]].filter(x => !!x)]
			if (matches[6]) {
				rules[matches[1]].push([matches[6], matches[7]].filter(x => !!x))
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
		rules = input.rules[rule]
		if (rules == 'a' || rules == 'b')
			return str == rules ? str : null
		for (let rule of rules) {

		}
	}
	return null
}
console.log(part1(input))

part2 = (input) => {
	return null
}
console.log(part2(input))
