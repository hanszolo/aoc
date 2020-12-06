// day 5
parser = (row) => row ? parseInt(row.split("").map(x => +(x=="B" || x=="R")).join(""), 2) : undefined
input = document.getElementsByTagName('pre')[0].innerText.split("\n").map(parser).filter(x => x!==undefined)

part1 = (input) => {
	return Math.max(...input)
}
console.log(part1(input))

range = (start, end) => [...Array(end - start).keys()].map(x => x+start)
part2 = (input) => {
	s = new Set(input)
	for (let i of range(Math.min(...input), Math.max(...input))) {
		if (!s.has(i)) {
			return i
		}
	}
	return undefined
}
console.log(part2(input))
