//day 17
parser = rows => rows.split("\n").map((row, i) => row.split("").map((x,j) => x == "#" ? [i,j] : []).filter(x => !!x.length)).reduce((acc, curr) => [...acc,...curr])
input = parser(document.getElementsByTagName('pre')[0].innerText.trim())

part1 = (input) => {
	adjacency = [];
	[1,0,-1].forEach(x => [1,0,-1].forEach(y => [1,0,-1].forEach(z => adjacency.push([x,y,z]))))
	run = (active) => {
		neighbors = {}
		for (let cell of active) {
			for (let adjacent of adjacency) {
				neighbor = [adjacent[0]+cell[0], adjacent[1]+cell[1], adjacent[2]+cell[2]].join(",")
				neighbors[neighbor] = neighbors[neighbor] ? neighbors[neighbor] + 1 : 1
			}
		}
		active = new Set(active.map(x=>x.join(",")))
		return Object.keys(neighbors).filter(cell => neighbors[cell] == 3 || neighbors[cell] == 4 && active.has(cell)).map(x=> x.split(",").map(y=>+y))
	}
	generation = input.map(([x,y]) => [x,y,0])
	for (let i = 0; i < 6; ++i) {
		generation = run(generation)
	}
	return generation.length
}
console.log(part1(input))

part2 = (input) => {
	adjacency = [];
	[1,0,-1].forEach(x => [1,0,-1].forEach(y => [1,0,-1].forEach(z => [1,0,-1].forEach(w => adjacency.push([x,y,z,w])))))
	run = (active) => {
		neighbors = {}
		for (let cell of active) {
			for (let adjacent of adjacency) {
				neighbor = [adjacent[0]+cell[0], adjacent[1]+cell[1], adjacent[2]+cell[2], adjacent[3]+cell[3]].join(",")
				neighbors[neighbor] = neighbors[neighbor] ? neighbors[neighbor] + 1 : 1
			}
		}
		active = new Set(active.map(x=>x.join(",")))
		return Object.keys(neighbors).filter(cell => neighbors[cell] == 3 || neighbors[cell] == 4 && active.has(cell)).map(x=> x.split(",").map(y=>+y))
	}
	generation = input.map(([x,y]) => [x,y,0,0])
	for (let i = 0; i < 6; ++i) {
		generation = run(generation)
	}
	return generation.length
}
console.log(part2(input))
