let hovs = [
	"../soundz/soundrecs/hovs/hov1.mp3",
	"../soundz/soundrecs/hovs/hov2.mp3",
	"../soundz/soundrecs/hovs/hov3.mp3",
	"../soundz/soundrecs/hovs/hov4.mp3",
	"../soundz/soundrecs/hovs/hov5.mp3",
	"../soundz/soundrecs/hovs/hov6.mp3"
]


function player(){ //
	let s1 = loadSound(hovs[round(random(hovs.length-1))])
	let s2 = loadSound(hovs[round(random(hovs.length-1))])
	let s3 = loadSound(hovs[round(random(hovs.length-1))])
	let s4 = loadSound(hovs[round(random(hovs.length-1))])

	let filt1 = new p5.LowPass()
	let filt2 = new p5.LowPass()
	let filt3 = new p5.LowPass()
	let filt4 = new p5.LowPass()

	let env1 = new p5.Envelope()
	let env2 = new p5.Envelope()
	let env3 = new p5.Envelope()
	let env4 = new p5.Envelope()

	env1.setADSR(1,1,1,0.5)
	env2.setADSR(1,1,1,0.5)
	env3.setADSR(1,1,1,0.5)
	env4.setADSR(1,1,1,0.5)

	env1.setRange(0.5,0)
	env2.setRange(0.5,0)
	env3.setRange(0.5,0)
	env4.setRange(0.5,0)

	s1.amp(env1)
	s2.amp(env2)
	s3.amp(env3)
	s4.amp(env4)

	filt1.freq(0)
	filt2.freq(0)
	filt3.freq(0)
	filt4.freq(0)

	let master = new p5.Gain()
	master.connect()

	s1.disconnect()
	s2.disconnect()
	s3.disconnect()
	s4.disconnect()

	s1.connect(filt1)
	s2.connect(filt2)
	s3.connect(filt3)
	s4.connect(filt4)

	filt1.disconnect()
	filt2.disconnect()
	filt3.disconnect()
	filt4.disconnect()

	filt1.connect(master)
	filt2.connect(master)
	filt3.connect(master)
	filt4.connect(master)
	master.amp(0.3)

	this.startup = function(){
		s1.loop()
		s2.loop()
		s3.loop()
		s4.loop()
	}

	this.filt = function(src,f){
		if(src === 0){
			filt1.freq(f)
		} else if(src === 1){
			filt2.freq(f)
		}else if(src === 2){
			filt3.freq(f)
		} else if(src === 3){
			filt4.freq(f)		
		}	

	}

	this.trig = function(src,on){
		if(src === 0){
			if(on === 0){
				env1.triggerRelease()
			} else if(on === 1){
				env1.triggerAttack()
			}
		}else if(src === 1){
			if(on === 0){
				env2.triggerRelease()
			} else if(on === 1){
				env2.triggerAttack()
			}
		}else if(src === 2){
			if(on === 0){
				env3.triggerRelease()
			} else if(on === 1){
				env3.triggerAttack()
			}
		}else if(src === 3){
			if(on === 0){
				env4.triggerRelease()
			} else if(on === 1){
				env4.triggerAttack()
			}
		}
	}

	this.stop = function(){	
		s1.stop()	
		s2.stop()	
		s3.stop()	
		s4.stop()	
	}

	this.panner = function(src,p){
		if(src === 0){
			s1.pan(p)
		} else if(src === 1){
			s2.pan(p)
		}else if(src === 2){
			s3.pan(p)
		} else if(src === 3){
			s4.pan(p)		
		}	
	}

	this.dur = function(src){
		if(src === 0){
			return(s1.duration())
		}else if(src === 1){
			return(s2.duration())
		}else if(src === 2){
			return(s3.duration())
		}else if(src === 3){
			return(s4.duration())
		}
	}
}



	