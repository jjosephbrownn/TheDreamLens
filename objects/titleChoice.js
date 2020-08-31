

function headers(){

	let titles = [
	"shreds and tatters in great store", 
	"beyond the edges", 
	"smoke in mono",
	"the night sky breathes",
	"torsion and vapid increments",
	"underneath all of the clutter",
	"Reynard Sleeps",
	"dust and memory",
	"memory material"
]

	this.choice = function(){
		let q = titles.length
		let r = round(random(q-1))
		return(titles[r])
	}
}	