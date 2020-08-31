let scatPurpPic = [
	"/pics/scatter/scat1.jpg",
	"/pics/scatter/scat2.jpg",
	"/pics/scatter/scat3.jpg",
	"/pics/scatter/scat4.jpg",
	"/pics/scatter/scat5.jpg",
	"/pics/scatter/scat6.jpg",
	"/pics/scatter/scat7.jpg",
	"/pics/scatter/scat8.jpg",
	"/pics/scatter/scat9.jpg",
	"/pics/scatter/scat10.jpg",
	"/pics/scatter/scat11.jpg",
	"/pics/scatter/scat12.jpg",
	"/pics/scatter/scat13.jpg",
	"/pics/scatter/scat14.jpg",
	"/pics/scatter/scat15.jpg",
	"/pics/scatter/scat16.jpg",
	"/pics/scatter/scat17.jpg",
	"/pics/scatter/scat18.jpg",
	"/pics/scatter/scat19.jpg",
	"/pics/repurpose/purp1.jpg",
	"/pics/repurpose/purp2.jpg",
	"/pics/repurpose/purp3.jpg",
	"/pics/repurpose/purp4.jpg",
	"/pics/repurpose/purp5.jpg",
	"/pics/repurpose/purp6.jpg",
	"/pics/repurpose/purp7.jpg",
	"/pics/repurpose/purp8.jpg",
	"/pics/repurpose/purp9.jpg",
	"/pics/repurpose/purp10.jpg",
	"/pics/repurpose/purp11.jpg",
	"/pics/repurpose/purp12.jpg",
	"/pics/repurpose/purp13.jpg",
	"/pics/repurpose/purp14.jpg",
	"/pics/repurpose/purp15.jpg"
	] 
let cartGathPic = [
	"/pics/gather/gath1.jpg",
	"/pics/gather/gath2.jpg",
	"/pics/gather/gath3.jpg",
	"/pics/gather/gath4.jpg",
	"/pics/gather/gath5.jpg",
	"/pics/gather/gath6.jpg",
	"/pics/gather/gath7.jpg",
	"/pics/gather/gath8.jpg",
	"/pics/gather/gath9.jpg",
	"/pics/gather/gath10.jpg",
	"/pics/gather/gath11.jpg",
	"/pics/gather/gath12.jpg",
	"/pics/gather/gath13.jpg",
	"/pics/gather/gath14.jpg",
	"/pics/gather/gath15.jpg",
	"/pics/gather/gath16.jpg",
	"/pics/gather/gath17.jpg",
	"/pics/gather/gath18.jpg",
	"/pics/gather/gath19.jpg",
	"/pics/cartography/cart1.jpg",
	"/pics/cartography/cart2.jpg",
	"/pics/cartography/cart3.jpg",
	"/pics/cartography/cart4.jpg",
	"/pics/cartography/cart5.jpg",
	"/pics/cartography/cart6.jpg",
	"/pics/cartography/cart7.jpg",
	"/pics/cartography/cart8.jpg",
	"/pics/cartography/cart9.jpg",
	"/pics/cartography/cart10.jpg",
	"/pics/cartography/cart11.jpg",
	"/pics/cartography/cart12.jpg",
	"/pics/cartography/cart13.jpg"
	]

let tatMaps = [
	"/pics/maps/map1.jpg",
	"/pics/maps/map2.jpg",
	"/pics/maps/map3.jpg",
	"/pics/maps/map4.jpg",
	"/pics/maps/map5.jpg",
	"/pics/maps/map6.jpg",
	"/pics/maps/map7.jpg",
	"/pics/maps/map8.jpg",
	"/pics/maps/map9.jpg",
	"/pics/maps/map10.jpg",
	"/pics/maps/map11.jpg",
	"/pics/maps/map12.jpg"
]


function tatpiccer(){

	let file1,file2

	this.pic1 = function(src){
		if(src === 0){
			let r = round(random(scatPurpPic.length-1))
			file1 = scatPurpPic[r]
			return(file1)
		} else if(src === 1){
			let r = round(random(cartGathPic.length-1))
			file1 = cartGathPic[r]
			return(file1)
		}else if(src === 2){
			let r = round(random(tatMaps.length-1))
			file1 = tatMaps[r]
			return(file1)
		}
	}

	
	this.pic2 = function(src){
		if(src === 0){
			let r = round(random(scatPurpPic.length-1))
			file2 = scatPurpPic[r]
			return(file2)
		} else if(src === 1){
			let r = round(random(cartGathPic.length-1))
			file2 = cartGathPic[r]
			return(file2)
		} else if(src === 2){
			let r = round(random(tatMaps.length-1))
			file2 = tatMaps[r]
			return(file2)
		}
	}

	this.mapPic = function(){
		let r = round(random(tatMaps.length-1))
		file1 = tatMaps[r]
		return(file1)

	}
}
	
