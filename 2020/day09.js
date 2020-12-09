//day 9
parser = x => +x
input = document.getElementsByTagName('pre')[0].innerText.split("\n").map(parser).filter(x => x!==undefined || x.isNaN())

part1 = (input, size=25) => {
	is_valid = (preamble, value) => {
		for (let i = 0; i < preamble.length; ++i) {
			for (let j = i+1; j < preamble.length; ++j) {
				if (preamble[i] + preamble[j] === value) {
					return true
				}
			}
		}
		return false
	}
	for (let i = size; i < input.length; ++i) {
		if (!is_valid(input.slice(i - size, i), input[i])) {
			return input[i]
		}
	}

}
console.log(part1(input))

part2 = (input, size=25) => {
	target = part1(input, size)
	for (let i = 0; i < input.length; ++i) {
		for (let j = i+2; j < input.length; ++j) {
			amble = input.slice(i, j)
			sum = amble.reduce((x,y)=>x+y, 0)
			if (sum > target) {
				break
			}
			if (sum === target) {
				return Math.max(...amble) + Math.min(...amble)
			}
		}
	}
	return null
}
console.log(part2(input))
