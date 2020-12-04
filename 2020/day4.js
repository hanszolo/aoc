// day 3
parser= (input) => {
	tokens = input.split(/\s+/)
	if (!tokens) return undefined
	mapping = {}
	for (var token of tokens) {
		[key, value] = token.split(":")
		mapping[key] = value
	}
	return mapping
}
input = document.getElementsByTagName('pre')[0].innerText.split("\n\n").map(parser).filter(x => x!==undefined)

part1 = (input) => {
	fields = ["byr","iyr","eyr","hgt","hcl","ecl","pid"]
	count = 0
	for (var row of input) {
		valid = true
		for (var field of fields) {
			if (row[field] === undefined) {
				valid = false
				break
			}
		}
		count += valid
	}
	return count
}
console.log(part1(input))