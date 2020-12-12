//day 11
parser = x => x ? [x[0], +x.slice(1), x] : undefined
input = document.getElementsByTagName('pre')[0].innerText.trim().split("\n").map(parser).filter(x => x!==undefined)

part1 = (input) => {
	heading = [0, 1]
	position = [0, 0]
	for (let instruction of input) {
		if (instruction[2] == "L270" || instruction[2] == "R90")
			heading = [-heading[1], heading[0]]
		else if (instruction[2] == "L90" || instruction[2] == "R270")
			heading = [heading[1], -heading[0]]
		else if (instruction[2] == "L180" || instruction[2] == "R180")
			heading = [-heading[0], -heading[1]]
		else if (instruction[0] == 'N')
			position[0] += instruction[1]
		else if (instruction[0] == 'S')
			position[0] -= instruction[1]
		else if (instruction[0] == 'E')
			position[1] += instruction[1]
		else if (instruction[0] == 'W')
			position[1] -= instruction[1]
		else if (instruction[0] == 'F')
			position = [position[0] + (heading[0] * instruction[1]), position[1] + (heading[1] * instruction[1])]
	}
	return Math.abs(position[0]) + Math.abs(position[1])
}
console.log(part1(input))

part2 = (input) => {
	waypoint = [1, 10]
	position = [0, 0]
	for (let instruction of input) {
		if (instruction[2] == "L270" || instruction[2] == "R90")
			waypoint = [-waypoint[1], waypoint[0]]
		else if (instruction[2] == "L90" || instruction[2] == "R270")
			waypoint = [waypoint[1], -waypoint[0]]
		else if (instruction[2] == "L180" || instruction[2] == "R180")
			waypoint = [-waypoint[0], -waypoint[1]]
		else if (instruction[0] == 'N')
			waypoint[0] += instruction[1]
		else if (instruction[0] == 'S')
			waypoint[0] -= instruction[1]
		else if (instruction[0] == 'E')
			waypoint[1] += instruction[1]
		else if (instruction[0] == 'W')
			waypoint[1] -= instruction[1]
		else if (instruction[0] == 'F')
			position = [position[0] + (waypoint[0] * instruction[1]), position[1] + (waypoint[1] * instruction[1])]
	}
	return Math.abs(position[0]) + Math.abs(position[1])

}
console.log(part2(input))
