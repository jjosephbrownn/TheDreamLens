let allZines = [
	"/zines/zine001.jpg",
	"/zines/zine002.jpg",
	"/zines/zine003.jpg",
	"/zines/zine004.jpg",
	"/zines/zine005.jpg",
	"/zines/zine006.jpg",
	"/zines/zine007.jpg",
	"/zines/zine008.jpg",
	"/zines/zine009.jpg",
	"/zines/zine010.jpg",
	"/zines/zine011.jpg",
	"/zines/zine012.jpg",
	"/zines/zine013.jpg",
	"/zines/zine014.jpg",
	"/zines/zine015.jpg",
	"/zines/zine016.jpg",
	"/zines/zine017.jpg",
	"/zines/zine018.jpg",
	"/zines/zine019.jpg",
	"/zines/zine020.jpg",
	"/zines/zine021.jpg"
	]

function ziner(){
	let r 
	this.whichZin = function(){
		r = round(random(allZines.length-1))
		let file1 = allZines[r]
		return(file1)
	}

	this.nextPage = function(src){
		let file1
		if(src === 0){
			if(r === 0){
				file1 = allZines[0]
				r = 0
			} else if(r !== 0){
				file1 = allZines[r-1]
				r -= 1
			}
			return(file1)
		} else if(src === 1){	
			if(r === allZines.length-1){
				file1 = allZines[allZines.length-1]
				r = allZines.length-1
			}else if(r !== allZines.length-1){
				file1 = allZines[r+1]
				r += 1
			}
			return(file1)
		}
	}
}


	
