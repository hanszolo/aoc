// day 8
re = /^(acc|jmp|nop) ((?:\+|-)[0-9]+)$/
parser= (row) => {
	match = row.match(re)
	if (!match) return undefined
	return [match[1], +[match[2]]]
}
input = document.getElementsByTagName('pre')[0].innerText.split("\n").map(parser).filter(x => x!==undefined)

part1 = (rows) => {
	acc = 0
	seen = new Set()
	for (let i = 0; i < rows.length; ++i) {
		if (seen.has(i)) {
			return [acc, false]
			break
		}
		seen.add(i)
		let row = rows[i]
		switch (row[0]) {
			case 'acc':
				acc += row[1]
				break
			case 'jmp':
				i += (row[1] - 1)
				break
		}
	}
	return [acc, true]
}
console.log(part1(input))

part2 = (rows) => {
	seen = new Set()
	candidates = []
	for (let i = 0; i < rows.length; ++i) {
		if (seen.has(i)) {
			break
		}
		seen.add(i)
		let row = rows[i]
		switch (row[0]) {
			case 'jmp':
				candidates.push(i)
				i += (row[1] - 1)
				break
			case 'nop':
				candidates.push(i)
				break
		}
	}
	for (let candidate of candidates) {
		copy = rows.map((x, i) => i !== candidate ? x : (x[0] == 'nop' ? ['jmp', x[1]] : ['nop', x[1]]))
		result = part1(copy)
		if (result[1]) {
			return result[0]
		}
	}
	return null
}
console.log(part2(input))
