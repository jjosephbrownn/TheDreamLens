//general purpose sampler - all your sampling needs from simple playback
//to glitchy sequencer
//"type 2" sampler choose spoken word tpoics based on footprints
let soundSamps = [ //array of sound recordings
	"../../soundz/soundrecs/purpSamps/barge.mp3",
	"../../soundz/soundrecs/purpSamps/bayleaves.mp3", 
	"../../soundz/soundrecs/purpSamps/charcoal.mp3", 
	"../../soundz/soundrecs/purpSamps/comb.mp3", 
	"../../soundz/soundrecs/purpSamps/combwood.mp3", 
	"../../soundz/soundrecs/purpSamps/cork.mp3", 
	"../../soundz/soundrecs/purpSamps/crunchyleaves.mp3", 
	"../../soundz/soundrecs/purpSamps/grinder.mp3", 
	"../../soundz/soundrecs/purpSamps/grinder2.mp3",
	"../../soundz/soundrecs/purpSamps/woodscrape.mp3"
]

let musicSamps = [
	"../soundz/soundrecs/purpSamps/ac1.mp3",
	"../soundz/soundrecs/purpSamps/ac2.mp3",
	"../soundz/soundrecs/purpSamps/ac3.mp3",
	"../soundz/soundrecs/purpSamps/archGuitar.mp3",
	"../soundz/soundrecs/purpSamps/archGuitar2.mp3",
	"../soundz/soundrecs/purpSamps/crinDrum.mp3",
	"../soundz/soundrecs/purpSamps/crinDrumDist.mp3",
	"../soundz/soundrecs/purpSamps/crinDrumSimp.mp3",
	"../soundz/soundrecs/purpSamps/crinDrumSimp.mp3",
	"../soundz/soundrecs/purpSamps/crinSamp.mp3",
	"../soundz/soundrecs/purpSamps/crinSynths.mp3",
	"../soundz/soundrecs/purpSamps/facGuit.mp3",
	"../soundz/soundrecs/purpSamps/harm1.mp3",
	"../soundz/soundrecs/purpSamps/harm2.mp3",
	"../soundz/soundrecs/purpSamps/harm3.mp3",
	"../soundz/soundrecs/purpSamps/ikaDrum.mp3",
	"../soundz/soundrecs/purpSamps/ikaVoice.mp3",
	"../soundz/soundrecs/purpSamps/impSynth.mp3",
	"../soundz/soundrecs/purpSamps/lofiBeat.mp3",
	"../soundz/soundrecs/purpSamps/lofiguitar.mp3",
	"../soundz/soundrecs/purpSamps/lofiSynth.mp3",
	"../soundz/soundrecs/purpSamps/moldBeat.mp3",
	"../soundz/soundrecs/purpSamps/moldBeat2.mp3",
	"../soundz/soundrecs/purpSamps/moldBeat3.mp3",
	"../soundz/soundrecs/purpSamps/moldSynth.mp3",
	"../soundz/soundrecs/purpSamps/moldSynthBass.mp3",
	"../soundz/soundrecs/purpSamps/moldSynthBass2.mp3",
	"../soundz/soundrecs/purpSamps/sadGuitar.mp3",
	"../soundz/soundrecs/purpSamps/weirdBeat.mp3",
	"../soundz/soundrecs/purpSamps/bass1.mp3",
	"../soundz/soundrecs/purpSamps/bass2.mp3",
	"../soundz/soundrecs/purpSamps/folk1.mp3",
	"../soundz/soundrecs/purpSamps/folk3.mp3",
	"../soundz/soundrecs/purpSamps/fuzzGuit.mp3",
	"../soundz/soundrecs/purpSamps/fuzzGuit2.mp3",
	"../soundz/soundrecs/purpSamps/lute1.mp3",
	"../soundz/soundrecs/purpSamps/punkBass1.mp3",
]


let tatPoems = [
	"../../soundz/soundrecs/words/tatters/tat1.mp3",
	"../../soundz/soundrecs/words/tatters/tat2.mp3",
	"../../soundz/soundrecs/words/tatters/tat3.mp3",
	"../../soundz/soundrecs/words/tatters/tat4.mp3",
	"../../soundz/soundrecs/words/tatters/tat5.mp3",
	"../../soundz/soundrecs/words/tatters/tat6.mp3"
]

let songs = [
	"../../soundz/soundrecs/songs/song1.mp3",
	"../../soundz/soundrecs/songs/song2.mp3",
	"../../soundz/soundrecs/songs/song3.mp3",
	"../../soundz/soundrecs/songs/barleycorn.mp3",
	"../../soundz/soundrecs/songs/silkie.mp3",
	"../../soundz/soundrecs/songs/worm.mp3"
] //array of sung samples


function fracture(sound1,sound2){ //type = sample type, cat = scat gath etc

	let s1,s2
	if(sound1 === 0){//play music/sound samples
		let cr = random([0,1])
		if(cr === 0){
			let c1 = round(random(soundSamps.length-1))
			s1 = loadSound(soundSamps[c1]);
		} else if(cr === 1){
			let c1 = round(random(musicSamps.length-1))
			s1 = loadSound(musicSamps[c1]);
		} 
	} else if(sound1 === 1){//play spoken word samples
		let c1 = Math.floor(Math.random()*tatPoems.length)
		s1 = loadSound(tatPoems[c1])
	} else if(sound1 === 2){//play sung samples
		let c1 = round(random(songs.length-1))
		s1 = loadSound(songs[c1]);
	}	

	if(sound2 === 0){//play music/sound samples
		let cr = random([0,1])
		if(cr === 0){
			let c2 = round(random(soundSamps.length-1))
			s2 = loadSound(soundSamps[c2]);
		} else if(cr === 1){
			let c2 = round(random(musicSamps.length-1))
			s2 = loadSound(musicSamps[c2]);
		} 	
	} else if(sound2 === 1){//play spoken word samples
		let c2 = Math.floor(Math.random()*tatPoems.length)
		s2 = loadSound(tatPoems[c2])		
	} else if(sound2 === 2){//play sung samples
		let c2 = round(random(songs.length-1))
		s2 = loadSound(songs[c2]);
	}	

	let filt1 = new p5.LowPass()
	let filt2 = new p5.LowPass()
	s1.connect(filt1)
	s2.connect(filt2)

	let del1 = new p5.Delay()
	let del2 = new p5.Delay()
	del1.process(s1,0,0,1000)
	del2.process(s2,0,0,1000)

	let master = new p5.Gain()
	master.connect()
	filt1.connect(master)
	filt2.connect(master)
	master.amp(0.25)

	let pace
	let pats1 = [0]
	let pats2 = [0]
	let durs1 = [0]
	let durs2 = [0]

	let filt1Pat = []
	let rate1Pat = []
	let del1Pat = []
	let fdbk1Pat = []

	let filt2Pat = []
	let rate2Pat = []
	let del2Pat = []
	let fdbk2Pat = []

	let samp1Phrase
	let samp2Phrase
	let samp1
	let samp2
	let place1 = 0
	let place2 = 0

	pace = random([60,90,120])

	samp1Phrase = new p5.Phrase("samp1", seq1, pats1);
	samp2Phrase = new p5.Phrase("samp2", seq2, pats2);
	samp1 = new p5.Part();
	samp1.addPhrase(samp1Phrase)
	samp1.setBPM(pace)
	samp2 = new p5.Part();
	samp2.addPhrase(samp2Phrase)
	samp2.setBPM(pace)

	console.log(s1,s2)

	this.fracBegin = function(src){
		print(src)
		userStartAudio()
		if(src === 0){
			samp1.loop();
		} else if(src === 1){
			samp2.loop();
		}
	}

	this.fracNoLoop = function(src){
		if(src === 0){
			samp1.start();
			samp1.noLoop()
		} else if(src === 1){
			samp2.start();
			samp2.noLoop()
		}
	}

	this.playing = function(src){
		if(src === 0){
			return(s1.isPlaying())
		} else if(src === 1){
			return(s2.isPlaying())
		}
	}

	this.fracStop = function(src){
		if(src === 0){
			samp1.stop()
			s1.stop()
		} else if (src === 1){
			samp2.stop()
			s2.stop()
		}		
	}

	this.fracBPM = function(src, bpm){
		if(src === 0){
			samp1.setBPM(bpm)
		} else if(src === 1){
			samp2.setBPM(bpm)
		}
	}

	this.fracClear = function(){
		pats1 = [0]
		pats2 = [0]
		samp1.replaceSequence("samp1",pats1)
		samp2.replaceSequence("samp2",pats2)
	}

	this.samplePlay = function(src,start,pan,end){//with cue start
		if(src === 0){
			s1.play(0,1,0.25,start,end)
			s1.pan(pan)
		} else if(src === 1){
			s2.play(0,1,0.25,start,end)
			s2.pan(pan)
		}
	}

	this.samplePlayCont = function(src,pan){//no cue start
		if(src === 0){
			s1.play()
			s1.pan(pan)
		} else if(src === 1){
			s2.play()
			s2.pan(pan)
		}
	}

	this.samplePause = function(src){
		if(src === 0){
			s1.pause()
		} else if(src === 1){
			s2.pause()
		}
	}

	this.sampleStop = function(src){
		if(src === 0){
			s1.stop()
		} else if(src === 1){
			s2.stop()
		}
	}

	this.loop = function(src,cue,end){
		if(src === 0){
			s1.loop(0,1,1,cue,end);
		} else if (src === 1){
			s2.loop(0,1,1,cue,end)
		}
	}

	this.delay = function(src,del,fdbk){
		if(src === 0){
			del1.process(s1,del,fdbk,500)
		} else if (src === 1){
			del2.process(s2,del,fdbk,500)
		}
	}

	this.filt = function(src,f,r){
		if(src === 0){
			filt1.set(f,r)
		} else if (src === 1){
			filt2.set(f,r)
		}
	}

	this.dur1 = function(){
		return(s1.duration())
	}

	this.dur2 = function(){
		return(s2.duration())
	}

	function seq1(time,start){
		print(start)
		filt1.freq(filt1Pat[place1])

		del1.delayTime(del1Pat[place1])
		del1.feedback(fdbk1Pat[place1])
		
		s1.play()
		s1.jump(start,durs1[place1])
		s1.rate(rate1Pat[place1])
		s1.pan(random(2)-1)

		place1++
		if(place1 === 15){place1 = 0}
		if(pats1.length > 15){
			pats1 = []
		}
	}

	function seq2(time,start){	
		filt2.freq(filt2Pat[place2])

		del2.delayTime(del2Pat[place2])
		del2.feedback(fdbk2Pat[place2])
		
		s2.play()
		s2.jump(start,durs2[place2])
		s2.rate(rate2Pat[place2])
		s2.pan(random(2)-1)

		place1++
		if(place1 === 15){place1 = 0}
		if(pats2.length > 15){
			pats2 = []
		}
	}

	this.add = function(src,pat){
		print(src,pat)
		if(src === 0){
			if(pats1.length<16){
				pats1.push(pat)
				samp1.replaceSequence("samp1",pats1)
			} else {
				return null
			}
		} else if(src === 1){
			if(pats2.length<16){
				pats2.push(pat)
				samp2.replaceSequence("samp2",pats2)
			} else {
				return null
			}
		}
	}

	this.del = function(src){
		if(src === 0){
			pats1.pop()
			samp1.replaceSequence("samp1",pats1)
		} else if(src === 1){
			pats2.pop(pat)
			samp2.replaceSequence("samp2",pats2)
		}
	}

	this.params = function(len){//type 1 === spoken vocals, diff rates sound shit
		if(sound1 === 1 && sound2 === 1){
			for(i=0;i<16;i++){
				filt1Pat[i] = Math.random()*1000
				rate1Pat[i] = 1
				del1Pat[i] = Math.random()
				fdbk1Pat[i] = Math.random()*0.5

				filt2Pat[i] = Math.random()*1000
				rate2Pat[i] = 1
				del2Pat[i] = Math.random()
				fdbk2Pat[i] = Math.random()*0.5
			}
		} else if(sound1 === 1 && sound2 !== 1){
			for(i=0;i<16;i++){
				filt1Pat[i] = Math.random()*1000
				rate1Pat[i] = 1
				del1Pat[i] = Math.random()
				fdbk1Pat[i] = Math.random()*0.5

				filt2Pat[i] = Math.random()*1000
				rate2Pat[i] = (Math.random()*4)-2
				del2Pat[i] = Math.random()
				fdbk2Pat[i] = Math.random()*0.5
			}
		}else if(sound1 !== 1 && sound2 === 1){
			for(i=0;i<16;i++){
				filt1Pat[i] = Math.random()*1000
				rate1Pat[i] = (Math.random()*4)-2
				del1Pat[i] = Math.random()
				fdbk1Pat[i] = Math.random()*0.5

				filt2Pat[i] = Math.random()*1000
				rate2Pat[i] = 1
				del2Pat[i] = Math.random()
				fdbk2Pat[i] = Math.random()*0.5
			}
		} else {
			for(i=0;i<16;i++){
				filt1Pat[i] = Math.random()*1000
				rate1Pat[i] = (Math.random()*4)-2
				del1Pat[i] = Math.random()
				fdbk1Pat[i] = Math.random()*0.5

				filt2Pat[i] = Math.random()*1000
				rate2Pat[i] = (Math.random()*4)-2
				del2Pat[i] = Math.random()
				fdbk2Pat[i] = Math.random()*0.5
			}
		}
	}
}



	