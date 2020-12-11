//day 11
input = document.getElementsByTagName('pre')[0].innerText.trim()

part1 = (input) => {
	l = input.split("\n").length
	w = input.indexOf("\n")

	index = (x,y) => (x * (w + 1)) + y
	check = (x,y, str) => x >= 0 && y >= 0 && x < l && y < w && str[index(x,y)] === '#'
	num_neighbors = (x,y, str) => {
		count = 0
		for (let i = x-1; i <= x+1; ++i) {
			for (let j = y-1; j <= y+1; ++j) {
				if (check(i,j,str)) {
					++count
				}
			}
		}
		return count
	}


	last = (" " + input).slice(1)
	for (let safety=0; safety < 1000; ++safety) {
		next = last.split("")
		for (let i = 0; i < l; ++i) {
			for (let j = 0; j < w; ++j) {
				current = last[index(i,j)]
				n = num_neighbors(i, j, last)
				if (current === 'L' && n === 0) {
					next[index(i,j)] = '#'
				} else if (current === '#' && n > 4) {
					next[index(i,j)] = 'L'
				}
			}
		}
		if (last === next.join("")) {
			return next.filter(x => x === '#').length
		}
		last = next.join("")
	}
	return null
}
console.log(part1(input))

part2 = (input) => {
	l = input.split("\n").length
	w = input.indexOf("\n")

	index = (x,y) => (x * (w + 1)) + y
	look = (x,y,dx,dy, str) => {
		x += dx
		y += dy
		while (x >= 0 && y >= 0 && x < l && y < w) {
			if (str[index(x,y)] === '#') return true
			else if (str[index(x,y)] === 'L') return false
			x += dx
			y += dy
		}
		return false
	}
	num_neighbors = (x,y, str) => {
		count = 0
		for (let dir of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]) {
			if (look(x,y,dir[0],dir[1],str)) {
				++count
			}
		}
		return count
	}


	last = (" " + input).slice(1)
	for (let safety=0; safety < 1000; ++safety) {
		next = last.split("")
		for (let i = 0; i < l; ++i) {
			for (let j = 0; j < w; ++j) {
				current = last[index(i,j)]
				n = num_neighbors(i, j, last)
				if (current === 'L' && n === 0) {
					next[index(i,j)] = '#'
				} else if (current === '#' && n > 4) {
					next[index(i,j)] = 'L'
				}
			}
		}
		if (last === next.join("")) {
			return next.filter(x => x === '#').length
		}
		last = next.join("")
	}
	return null
}
console.log(part2(input))
