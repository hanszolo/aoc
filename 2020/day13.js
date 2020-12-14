//day 13
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
	rows = input.buses.map((x, i) => x === "x" ? false : [x, -i]).filter(x => !!x).sort((x,y) => y[0] - x[0])
	crt = (n,m,a,b) => { // Chinese remainder theorem, returns x such that x % n = a && x % m = b
		for (let i = 0; i < n; ++i) {
			if ((i * m + b - a) % n === 0) {
				return i * m + b
			}
		}
	}
	result = rows.reduce((x, y) => [x[0] * y[0], crt(y[0], x[0], y[1], x[1])])
	return result[1]
}
console.log(part2(input))
