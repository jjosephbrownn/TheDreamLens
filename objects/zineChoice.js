let allZines = [
	"../../zines/scatter/scat1.jpg",
	"../../zines/scatter/scat2.jpg",
	"../../zines/scatter/scat3.jpg",
	"../../zines/scatter/scat4.jpg",
	"../../zines/scatter/scat5.jpg",
	"../../zines/scatter/scat6.jpg",
	"../../zines/scatter/scat7.jpg",
	"../../zines/scatter/scat8.jpg",
	"../../zines/scatter/scat9.jpg",
	"../../zines/scatter/scat10.jpg",
	"../../zines/scatter/scat11.jpg",
	"../../zines/scatter/scat12.jpg",
	"../../zines/scatter/scat13.jpg",
	"../../zines/scatter/scat14.jpg",
	"../../zines/scatter/scat15.jpg",
	"../../zines/scatter/scat16.jpg",

	"../../zines/gather/gath1.tif",
	"../../zines/gather/gath2.jpg",
	"../../zines/gather/gath3.jpg",
	"../../zines/gather/gath4.jpg",
	"../../zines/gather/gath5.jpg",

	"../../zines/cartography/plan1.png",
	"../../zines/cartography/plan2.jpg",
	"../../zines/cartography/plan3.jpg",
	"../../zines/cartography/plan4.jpg",
	"../../zines/cartography/plan5.jpg",

	"../../zines/repurpose/purp1.png",

	"../../zines/miscera/misc1.png",
	"../../zines/miscera/misc2.png",
	"../../zines/tatters/tat1.jpg",
	"../../zines/tatters/tat2.jpg",

	"../../zines/tatters/tat3.mp3",
	"../../zines/tatters/tat4.mp3"
	]

function ziner(){
	this.whichZin = function(){
		let r = round(random(allZines.length-1))
		file1 = allZines[r]
		print(file1)
		return(file1)
	}
}


	
