
let scatPoems = [//fiction, non sensical
	"/soundz/soundrecs/words/scatter/scat1.mp3",
	"/soundz/soundrecs/words/scatter/scat2.mp3",
	"/soundz/soundrecs/words/scatter/scat3.mp3",
	"/soundz/soundrecs/words/scatter/scat4.mp3"
	]


function radio(){ //
	let c1 = round(random(scatPoems.length-1))		
	s1 = loadSound(scatPoems[c1]);

	let radFilt = new p5.BandPass()
	s1.disconnect()
	s1.connect(radFilt)
	radFilt.freq(0)
	radFilt.res(2)
	
	this.radPause = function(){	
		s1.pause()
	}

	this.radLoop = function(){
		s1.loop();				
	}

	this.radFilt = function(f){
		radFilt.freq(f)	
	}

	this.dur = function(){
		return(s1.duration())
	}

}



	