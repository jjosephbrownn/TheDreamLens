//general purpose sampler - all your sampling needs from simple playback
//to glitchy sequencer
//"type 2" sampler choose spoken word tpoics based on footprints

let chords = [
	"/soundz/soundrecs/purpSamps/ac1.mp3",
	"/soundz/soundrecs/purpSamps/ac2.mp3",
	"/soundz/soundrecs/purpSamps/ac3.mp3",
	"/soundz/soundrecs/purpSamps/bass1.mp3",
	"/soundz/soundrecs/purpSamps/bass2.mp3",
	"/soundz/soundrecs/purpSamps/archGuitar.mp3",
	"/soundz/soundrecs/purpSamps/crinSamp.mp3",
	"/soundz/soundrecs/purpSamps/crinSynths.mp3",
	"/soundz/soundrecs/purpSamps/facGuit.mp3",
	"/soundz/soundrecs/purpSamps/folk1.mp3",
	"/soundz/soundrecs/purpSamps/folk3.mp3",
	"/soundz/soundrecs/purpSamps/fuzzGuit.mp3",
	"/soundz/soundrecs/purpSamps/fuzzGuit2.mp3",
	"/soundz/soundrecs/purpSamps/harm1.mp3",
	"/soundz/soundrecs/purpSamps/harm2.mp3",
	"/soundz/soundrecs/purpSamps/harm3.mp3",
	"/soundz/soundrecs/purpSamps/lute1.mp3",
	// "/soundz/soundrecs/purpSamps/lute2.mp3",
	"/soundz/soundrecs/purpSamps/punkBass1.mp3",
	"/soundz/soundrecs/purpSamps/archGuitar2.mp3",
	"/soundz/soundrecs/purpSamps/ikaVoice.mp3",
	"/soundz/soundrecs/purpSamps/impSynth.mp3",
	"/soundz/soundrecs/purpSamps/lofiguitar.mp3",
	"/soundz/soundrecs/purpSamps/lofiSynth.mp3",
	"/soundz/soundrecs/purpSamps/moldSynth.mp3",
	"/soundz/soundrecs/purpSamps/moldSynthBass.mp3",
	"/soundz/soundrecs/purpSamps/moldSynthBass2.mp3",
	"/soundz/soundrecs/purpSamps/sadGuitar.mp3"
]

let beats = [
	"/soundz/soundrecs/purpSamps/crinDrum.mp3",
	"/soundz/soundrecs/purpSamps/crinDrumDist.mp3",
	"/soundz/soundrecs/purpSamps/crinDrumSimp.mp3",
	"/soundz/soundrecs/purpSamps/crinDrumSimp.mp3",
	"/soundz/soundrecs/purpSamps/ikaDrum.mp3",
	"/soundz/soundrecs/purpSamps/moldBeat.mp3",
	"/soundz/soundrecs/purpSamps/moldBeat2.mp3",
	"/soundz/soundrecs/purpSamps/moldBeat3.mp3",
	"/soundz/soundrecs/purpSamps/weirdBeat.mp3",
	"/soundz/soundrecs/purpSamps/lofiBeat.mp3",
]

function songer(length){ //

	let len = length
	let s1,s2
	s1 = loadSound(chords[round(random(chords.length-1))])
	s2 = loadSound(beats[round(random(beats.length-1))])
	s3 = loadSound(chords[round(random(chords.length-1))])

	setTimeout(function(){
		let sDur1 = s1.duration()
		let sDur2 = s2.duration()
		let sDur3 = s3.duration()
		params(sDur1,sDur2,sDur3)
	},2000)

	let start1Pat = []
	let start2Pat = []
	let start3Pat = []

	let allPats = [
	[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
	[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
	[1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,1],
	[0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0],
	[1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1],
	[1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
	[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
	[1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,1],
	[0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0],
	[1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1],
	[1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0],
	[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1]
	]

	let pnum1 = round(random(allPats.length-1))
	let pnum2 = round(random(allPats.length-1))
	let pnum3 = round(random(allPats.length-1))
	let pats1 = allPats[pnum1]
	let pats2 = allPats[pnum2]
	let pats3 = allPats[pnum3]
	let dur1Pat = []
	let dur2Pat = []
	let dur3Pat = []
	
	let rate1Pat = []	
	let rate2Pat = []
	let rate3Pat = []

	let samp1Phrase
	let samp2Phrase
	let samp3Phrase
	let samp1
	let samp2
	let samp3
	let place1 = 0
	let place2 = 0
	let place3 = 0
	let songPos1=0,songPos2=0,songPos3=0

	let env1 = new p5.Envelope()
	let env2 = new p5.Envelope()
	let env3 = new p5.Envelope()
	env1.setADSR(0.01,1,1,0.1)
	env2.setADSR(0.01,1,1,0.1)
	env3.setADSR(0.01,1,1,0.1)
	env1.setRange(0.5,1)
	env2.setRange(0.5,1)
	env3.setRange(0.5,1)

	s1.amp(env1)
	s2.amp(env2)
	s3.amp(env3)

	pace = random(30,60)

	samp1Phrase = new p5.Phrase("samp1", seq1, pats1);
	samp2Phrase = new p5.Phrase("samp2", seq2, pats2);
	samp3Phrase = new p5.Phrase("samp3", seq3, pats3);
	samp1 = new p5.Part();
	samp1.addPhrase(samp1Phrase)
	samp1.setBPM(pace)
	samp2 = new p5.Part();
	samp2.addPhrase(samp2Phrase)
	samp2.setBPM(pace)
	samp3 = new p5.Part();
	samp3.addPhrase(samp3Phrase)
	samp3.setBPM(pace)

	let sampMaster = new p5.Gain()
	s1.disconnect()
	s2.disconnect()
	s3.disconnect()
	s1.connect(sampMaster)
	s2.connect(sampMaster)
	s3.connect(sampMaster)
	sampMaster.connect()
	sampMaster.amp(0.75)
	this.origPat = function(src){
		if(src === 0){
			return pnum1
		} else if(src === 1){
			return pnum2
		} else if(src === 2){
			return pnum3
		} 
	}

	this.dur = function(src){
		if(src === 0){
			return s1.duration()
		} else if(src === 1){
			return s2.duration()
		} else if(src === 2){
			return s3.duration()
		}
	}

	this.songBegin = function(src){
		userStartAudio()
		if(src === 0){
			samp1.loop();
		} else if(src === 1){
			samp2.loop();
		} else if(src === 2){
			samp3.loop();
		} else if(src == null){
			return null
		}
	}

	this.songStop = function(src){
		if(src === 0){
			if(s1.isPlaying() === true){
				samp1.stop()
				s1.stop()
			}
		} else if(src === 1){
			if(s2.isPlaying() === true){
				samp2.stop()
				s2.stop()
			}
		} else if(src === 2){
			if(s3.isPlaying() === true){
				samp3.stop();
				s3.stop()
			}
		} else if(src == null){
			return null
		}
	}	

	this.looper = function(src,start,end,p){
		if(src === 0){
			if(s1.isPlaying() === false){
				s1.loop(0,1,0.5,start,end)
				s1.pan(p)
			}else if(s1.isPlaying() === true){
				s1.jump(start,end)
				s1.pan(p)
			}
		} else if(src === 1){
			if(s2.isPlaying() === false){
				s2.loop(0,1,0.5,start,end)
				s2.pan(p)
			}else if(s2.isPlaying() === true){
				s2.jump(start,end)
				s2.pan(p)
			}
			
		} else if(src === 2){
			if(s3.isPlaying() === false){
				s3.loop(0,1,0.5,start,end)
				s3.pan(p)
			}else if(s3.isPlaying() === true){
				s3.jump(start,end)
				s3.pan(p)
			}
		}
	}	

	this.jumper = function(src,jump,end){
		if(src === 0){
			s1.jump(jump,end)
		} else if(src === 1){
			s2.jump(jump,end)
		} else if(src === 2){
			s3.jump(jump,end)
		}
	}

	this.samplePlay = function(src,start,p){//with cue start
		if(src === 0){
			if(s1.isPlaying() === false){
				s1.loop(0,1,0.25,start)
				s1.pan(p)
			}
		} else if(src === 1){
			if(s2.isPlaying() === false){
				s2.loop(0,1,0.25,start)
				s2.pan(p)
			}
			
		} else if(src === 2){
			if(s3.isPlaying() === false){
				s3.loop(0,1,0.25,start)
				s3.pan(p)
			}
		}
	}

	this.sampleStop = function(src){
		if(src === 0){
			if(s1.isPlaying() === true){
				s1.stop()
			}
		} else if(src === 1){
			if(s2.isPlaying() === true){
				s2.stop()
			}
		} else if(src === 2){
			if(s3.isPlaying() === true){
				s3.stop()
			}
		}
	}

	this.rates = function(src,onoff){
		if(onoff === 1){
			if(src === 0){
				for(i=0;i<16;i++){
					rate1Pat[i] = random(0.5,1.5)
				}
			} else if(src === 1){
				for(i=0;i<16;i++){
					rate2Pat[i] = random(0.5,1.5)
				}
			} else if(src === 2){
				for(i=0;i<16;i++){
					rate3Pat[i] = random(0.5,1.5)
				}
			}
		} else if(onoff === 0){
			if(src === 0){
				for(i=0;i<16;i++){
					rate1Pat[i] = 1
				}
			} else if(src === 1){
				for(i=0;i<16;i++){
					rate2Pat[i] = 1
				}
			} else if(src === 2){
				for(i=0;i<16;i++){
					rate3Pat[i] = 1
				}
			}
		}
	}

	function seq1(time,start){
		env1.triggerRelease(s1)
		s1.stop()
		env1.triggerAttack(s1)
		s1.play(0,rate1Pat[place1],0.25,start1Pat[place1],dur1Pat[place1])
		s1.pan(random(-1,1))

		place1++
		if(place1 === len){place1 = 0}
	}

	function seq2(time,start){	
		env2.triggerRelease(s2)
		s2.stop()
		env2.triggerAttack(s2)
		env2.play(s2)	
		s2.play(0,rate2Pat[place2],0.25,start2Pat[place2],dur2Pat[place2])
		s2.pan(random(-1,1))

		place2++
		if(place2 === len){place2 = 0}
	}

	function seq3(time,start){	
		env3.triggerRelease(s3)
		s3.stop()
		env3.triggerAttack(s3)
		env3.play(s3)	
		s3.play(0,rate3Pat[place3],0.25,start3Pat[place3],dur3Pat[place3])
		s3.pan(random(-1,1))

		place3++
		if(place3 === len){place3 = 0}
	}

	this.lenChange = function(newLen){
		len = newLen
	}

	this.alter = function(pos,inc){
		pats1[pos] = inc
		pats2[pos] = inc
		pats3[pos] = inc
	}

	this.pattern = function(src,patNum){
		if(src === 0){
			pats1 = allPats[patNum]
			samp1.replaceSequence("samp1",pats1)
		} else if(src === 1){
			pats2 = allPats[patNum]
			samp2.replaceSequence("samp2",pats2)
		} else if(src === 2){
			pats3 = allPats[patNum]
			samp3.replaceSequence("samp3",pats3)
		}
		
	}

	function params(dur1,dur2,dur3){//type 1 === spoken vocals, diff rates sound shit
		for(i=0;i<16;i++){
			rate1Pat[i] = 1
			start1Pat[i] = Math.random()*dur1

			rate2Pat[i] = 1
			start2Pat[i] = Math.random()*dur2

			rate3Pat[i] = 1
			start3Pat[i] = Math.random()*dur3
		}
	}
	
}



	