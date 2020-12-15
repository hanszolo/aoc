//day 15
input = [2,0,1,9,5,19]

part1 = (input, size=2020) => {
	prev = Array(size)
	next = 0
	for (let i in input) {
		prev[input[i]] = i
	}
	for (let i = input.length; i < size-1; ++i) {
		curr = next
		if (prev[curr]) {
			next = i - prev[curr]
		} else {
			next = 0
		}
		prev[curr] = i
	}
	return next
}
console.log(part1(input))

part2 = input => part1(input, 3e7)
console.log(part2(input))
