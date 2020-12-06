// day 6
parser = (row) => row.split("\n").filter(x => !!x).map(x => x.split(""))
input = document.getElementsByTagName('pre')[0].innerText.split("\n\n").map(parser).filter(x => x!==undefined)

part1 = (input) => {
	count = 0
	for (let row of input) {
		s = new Set(row.flat(1))
		count += s.size
	}
	return count
}
console.log(part1(input))

part2 = (input) => {
	count = 0
	for (let row of input) {
		s = {}
		for (let answer of row.flat(1)) {
			s[answer] = s[answer] ? s[answer] + 1 : 1
		}
		for (let value of Object.values(s)) {
			if (value == row.length) {
				++count
			}
		}
	}
	return count
}
console.log(part2(input))
