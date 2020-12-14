//day 14
parser = x => x
input = document.getElementsByTagName('pre')[0].innerText.trim().split("\n").map(parser).filter(x => x!==undefined)

part1 = (input) => {
	mem = {}
	for (let row of input) {
		tokens = row.split(' = ')
		if (tokens[0] === 'mask') {
			mask = tokens[1].split("")
		} else {
			// JS doesn't have 64 bit bitwise operators WTFFFF
			pad = (bitstring, l) => [...Array(l - bitstring.length)].map(x => 0).join("") + bitstring
			mem[tokens[0]] = parseInt(pad((+tokens[1]).toString(2),36).split("").map((x,i) => mask[i] === 'X' ? x : mask[i]).join(""), 2)
		}
	}
	return Object.values(mem).reduce((x,y) => x + y)
}
console.log(part1(input))

part2 = (input) => {
	mem = {}
	write = (address, value) => {
		let pos = address.findIndex(x => x === 'X')
		if (pos === -1) {
			mem[parseInt(address.join(""),2)] = value
		} else {
			copy0 = [...address]
			copy0[pos] = "0"
			write(copy0, value)
			copy1 = [...address]
			copy1[pos] = "1"
			write(copy1, value)
		}
	}
	for (let row of input) {
		tokens = row.split(' = ')
		if (tokens[0] === 'mask') {
			mask = tokens[1].split("")
		} else {
			pad = (arr, l) => [...Array(l - arr.length)].map(x => 0).concat(arr)
			address = pad((+tokens[0].slice(4, tokens[0].length - 1)).toString(2).split(""), 36).map((x,i) => mask[i] === 'X' ? 'X' : (mask[i] === '1' ? '1' : x))
			write(address, +tokens[1])
		}
	}
	return Object.values(mem).reduce((x,y) => x + y)
}
console.log(part2(input))
