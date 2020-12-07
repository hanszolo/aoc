// day 3
parser=(x=>x?x.split(""):undefined)
input = document.getElementsByTagName('pre')[0].innerText.split("\n").map(parser).filter(x => x!==undefined)

part1 = (input, move=[1,3]) => {
	count = 0
	for (var position = [0,0]; position[0] < input.length; position = [position[0] + move[0], position[1] + move[1]]) {
		if (input[position[0]][position[1] % input[position[0]].length] === "#") {
			++count
		}
	}
	return count
}
console.log(part1(input))

part2 = (input) => {
	moves = [
		[1,1], [1,3], [1,5], [1,7], [2,1]
	]
	product=1
	for(let move of moves) {
		product *= part1(input, move)
	}
	return product
}
console.log(part2(input))