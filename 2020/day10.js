//day 10
parser = x => +x
input = document.getElementsByTagName('pre')[0].innerText.split("\n").map(parser).filter(x => x!==undefined || x.isNaN())

part1 = (input) => {
	data = [...input]
	data.sort((a,b)=> a-b)
	ones = 0
	threes = 1
	for (let i = 1; i < data.length; ++i) {
		diff = data[i] - data[i - 1]
		if (diff === 1) {
			++ones
		} else if (diff === 3) {
			++threes
		}
	}
	return ones * threes
}
console.log(part1(input))

part2 = (input) => {
	return null
}
console.log(part2(input))
