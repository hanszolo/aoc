// day 1
re = /^([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)$/
parser = row => {
	matches = row.match(re)
	if (!matches) return undefined
	return {'min': +matches[1], 'max': +matches[2], 'letter': matches[3], 'password': matches[4]}
}
input = document.getElementsByTagName('pre')[0].innerText.split("\n").map(parser).filter(x => x!==undefined)

part1 = (values) => {
	count = 0
	for (let value of values) {
		char_count = [...value.password].filter(x => x===value.letter).length
		if (char_count >= value.min &&  char_count <= value.max) {
			++count
		}
	}
	return count
}
console.log(part1(input))

part2 = (values) => {
	count = 0
	for (let value of values) {
		char_count = [value.password[value.min - 1], value.password[value.max - 1]].filter(x => x===value.letter).length
		if (char_count == 1) {
			++count
		}
	}
	return count
}
console.log(part2(input))