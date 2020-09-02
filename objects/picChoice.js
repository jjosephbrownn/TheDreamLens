let scatPic = [
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
	"/pics/scatter/scat19.jpg"
	] 
let gathPic = [
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
	"/pics/gather/gath19.jpg"
	]
let cartPic = [
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
let purpPic = [
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


let mapPics = [
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

let allpics = [scatPic,gathPic,cartPic,purpPic]

function piccer(){

	let print = sessionStorage.getItem("footsteps")
	let file1,file2

	this.pic1 = function(){
		if(print === "scatter"){
			let r = round(random(scatPic.length-1))
			file1 = scatPic[r]
			return(file1)
		} else if(print === "gather"){
			let r = round(random(gathPic.length-1))
			file1 = gathPic[r]
			return(file1)
		} else if(print === "repurpose"){
			let r = round(random(purpPic.length-1))
			file1 = purpPic[r]
			return(file1)
		} else if(print === "cartography"){
			let r = round(random(cartPic.length-1))
			file1 = cartPic[r]
			return(file1)
		} else if(print === "lacunae" || print === "tatters" || print === "miscera"){
			let r = round(random(allpics.length-1))
			gr1 = allpics[r]
			file1 = gr1[round(random(gr1.length-1))]
			return(file1)
			//fill this with scans or something - lacunae contents
		}else {
			let r = round(random(scatPic.length-1))
			file1 = scatPic[r]
			return(file1)
		}
	}

	this.pic2 = function(){
		if(print === "scatter"){
			let r = round(random(scatPic.length-1))
			file2 = scatPic[r]
			return(file2)
		} else if(print === "gather"){
			let r = round(random(gathPic.length-1))
			file2 = gathPic[r]
			return(file2)
		} else if(print === "repurpose"){
			let r = round(random(purpPic.length-1))
			file2 = purpPic[r]
			return(file2)
		} else if(print === "cartography"){
			let r = round(random(cartPic.length-1))
			file2 = cartPic[r]
			return(file2)
		} else if(print === "lacunae" || print === "tatters" || print === "miscera"){
			let r = round(random(allpics.length-1))
			gr1 = allpics[r]
			file1 = gr1[round(random(gr1.length-1))]
			return(file1)
			//fill this with scans or something - lacunae contents
		} else {
			let r = round(random(scatPic.length-1))
			file2 = scatPic[r]
			return(file2)
		}
	}

	this.mapPic = function(){
		let mapChoice
		let r = round(random(mapPics.length-1))
		mapChoice = mapPics[r]
		return(mapChoice)
	}
}
	
