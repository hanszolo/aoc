//day 12
parser = x => {
	return {
		'timestamp': +(x[0]),
		'buses': x[1].split(",").map(y => y === 'x' ? y : +y),
	}
}
input = parser(document.getElementsByTagName('pre')[0].innerText.trim().split("\n"))

part1 = (input) => {
	time = (x) => Math.ceil(input.timestamp / x) * x
	best = null
	for (let bus of input.buses) {
		if (bus === 'x') continue;
		if (best === null || time(bus) < time(best)) {
			best = bus
		}
	}
	return (time(best) - input.timestamp) * best
}
console.log(part1(input))

part2 = (input) => {
	mapping = input.buses.reduce((acc,x,i) => x === 'x' ? acc : Object.assign(acc, {[x]:i}), {})
	basis = Math.max(...Object.keys(mapping))
	offset = mapping[basis]
	return [mapping, basis, offset]
	for (let i = Math.ceil(1e14 / basis) * basis; i < 1e16; i += basis) {
		valid = [...Object.keys(mapping)].map(bus => (i - offset + mapping[bus]) % bus === 0)
		if (valid.every(x=>!!x)) return i - offset;
	}
	return [mapping, basis, offset]
}
console.log(part2(input))
