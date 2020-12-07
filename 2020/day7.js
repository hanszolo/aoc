// day 7
re1 = /([a-z]+ [a-z]+) bags contain((?: (?:[0-9]+) ([a-z]+ [a-z]+) bag(?:s?[,.]))+| (no other bags\.))/
re2 = /[ ,\.]/
parser = row => {
	matches = row.match(re1)
	if (!matches) return undefined
	source = matches[1]
	children = {}
	if (!matches[4]) {
		tokens = matches[2].split(/[ ,\.]/).filter(x => !!x)
		for (let i = 0; i < tokens.length; i += 4) {
			children[tokens[i+1]+' '+tokens[i+2]] = +tokens[i]
		}
	}
	return {'source': source, 'children': children}
}
build_mapping = (rows) => {
	mapping = {}
	for (let row of rows) {
		mapping[row.source] = row.children
	}
	return mapping
}
input = build_mapping(document.getElementsByTagName('pre')[0].innerText.split("\n").map(parser).filter(x => x!==undefined))

part1 = (values) => {
	trees = {}
	ensure=(key) => {
		if (trees[key] === undefined)
			trees[key] = []
	}
	for (let key in values) {
		ensure(key)
		for (let child in values[key]) {
			ensure(child)
			trees[child].push(key)
		}
	}
	count = 0
	queue = ['shiny gold']
	seen = new Set(queue)
	while (queue.length) {
		key = queue.pop()
		++count
		for (let parent of trees[key]) {
			if (!seen.has(parent)) {
				queue.push(parent)
				seen.add(parent)
			}
		}
	}
	return count - 1
}
console.log(part1(input))

part2 = (values) => {
	helper = key => {
		total = 0
		for (let child in values[key]) {
			total += values[key][child] * helper(child)
		}
		return total + 1
	}
	return helper('shiny gold') - 1
}
console.log(part2(input))