// day 1
parser=(x=>+x)
input = document.getElementsByTagName('pre')[0].innerText.split("\n").map(parser).filter(x => x!==undefined)

part1 = (values) => {
	const target = 2020
	const seen = new Set()
	for (let value of values) {
		if (seen.has(target - value)) {
			return value * (target - value)
		}
		seen.add(value)
	}
	return NaN
}

console.log(part1(input))

part2 = (values) => {
	const target = 2020
	const seen = new Set()
	for (let i =0; i < values.length; ++i) {
		for (let j = i+1; j < values.length; ++j) {
			if (seen.has(target - values[i] - values[j])) {
				return (target - values[i] - values[j]) * values[i] * values[j]
			}
		}
		seen.add(values[i])
	}
	return NaN
}

console.log(part2(input))