//day 16
parser = raw => {
	[reqs, your, nearby] = raw.split("\n\n").map(x => x.trim())
	re = /([a-z ]+): ([0-9]+)-([0-9]+) or ([0-9]+)-([0-9]+)/

	reqs = reqs.split("\n").map(x => x.trim().match(re)).reduce((acc, matches) => ({...acc, ...{
		[matches[1]]: [
			[+matches[2], +matches[3]],
			[+matches[4], +matches[5]]
		]
	}}), {})
	your = (your.split("\n")[1]).trim().split(",").map(x => +x)
	nearby = nearby.split("\n").slice(1).map(x => x.trim().split(",").map(y => +y))
	return {
		reqs: reqs, 
		your: your,
		nearby: nearby
	}
}
input = parser(document.getElementsByTagName('pre')[0].innerText.trim())

part1 = (input) => {
	all = Object.values(input.reqs).reduce((acc, curr) => [...acc, ...curr], [])
	matches = (i, field) => (i >= input.reqs[field][0][0] && i <= input.reqs[field][0][1]) || (i >= input.reqs[field][1][0] && i <= input.reqs[field][1][1])
	valid = (i) => Object.keys(input.reqs).some(x => matches(i, x))
	result = 0 
	for (let row of input.nearby) {
		for (let i of row) {
			if (!valid(i)) {
				result += i
			}
		}
	}
	return result
}
console.log(part1(input))

part2 = (input) => {
	all = Object.values(input.reqs).reduce((acc, curr) => [...acc, ...curr], [])
	matches = (i, field) => (i >= input.reqs[field][0][0] && i <= input.reqs[field][0][1]) || (i >= input.reqs[field][1][0] && i <= input.reqs[field][1][1])
	valid = (i) => Object.keys(input.reqs).some(x => matches(i, x))
	possibilities = Object.keys(input.reqs).reduce((acc, curr) => ({...acc, ...{[curr]: new Set(Array(input.your.length).keys())}}), {})
	for (let row of input.nearby) {
		if (!row.every(valid)) {
			continue
		}
		row.forEach((x, i) => {
			for (let field in possibilities) {
				if (!matches(x, field)) {
					possibilities[field].delete(i)
				}
			}
		})
	}
	mapping = Object.keys(possibilities).sort((a, b) => possibilities[a].size - possibilities[b].size).reduce((acc, curr) => {
		existing = new Set(Object.values(acc))
		correct = [...possibilities[curr]].find(x => !existing.has(x))
		return {...acc, ...{[curr]: correct}}
	},{})
	return Object.keys(mapping).filter(x => x.includes("departure")).map(x => input.your[mapping[x]]).reduce((acc, curr) => acc * curr)
}
console.log(part2(input))
