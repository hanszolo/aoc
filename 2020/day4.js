// day 4
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

part2 = (input) => {
	fields = {
		"byr": (x => x.match(/^[0-9]{4}$/) && x < 2003 && x > 1919),
		"iyr": (x => x.match(/^[0-9]{4}$/) && x < 2021 && x > 2009),
		"eyr": (x => x.match(/^[0-9]{4}$/) && x < 2031 && x > 2019),
		"hgt": (x => (x.match(/^[0-9]{3}cm$/) && x < "194cm" && x> "149cm") || (x.match(/^[0-9]{2}in$/) && x < "77cm" && x> "58cm")),
		"hcl": (x => x.match(/^#[0-9a-f]{6}$/)),
		"ecl": (x => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(x)),
		"pid": (x => x.match(/^[0-9]{9}$/)),
	}
	count = 0
	for (var row of input) {
		valid = true
		for (var field in fields) {
			if (row[field] === undefined || !fields[field](row[field])) {
				valid = false
				break
			}
		}
		count += valid
	}
	return count
}
console.log(part2(input))
