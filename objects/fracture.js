//general purpose sampler - all your sampling needs from simple playback
//to glitchy sequencer
//"type 2" sampler choose spoken word tpoics based on footprints


let soundSamps = [ //array of sound recordings
	"/soundz/soundrecs/purpSamps/barge.mp3",
	"/soundz/soundrecs/purpSamps/bayleaves.mp3", 
	"/soundz/soundrecs/purpSamps/charcoal.mp3", 
	"/soundz/soundrecs/purpSamps/comb.mp3", 
	"/soundz/soundrecs/purpSamps/combwood.mp3", 
	"/soundz/soundrecs/purpSamps/crunchyleaves.mp3", 
	"/soundz/soundrecs/purpSamps/grinder.mp3", 
	"/soundz/soundrecs/purpSamps/grinder2.mp3",
	"/soundz/soundrecs/purpSamps/woodscrape.mp3"
]

let musicSamps = [
	"/soundz/soundrecs/purpSamps/ac1.mp3",
	"/soundz/soundrecs/purpSamps/ac2.mp3",
	"/soundz/soundrecs/purpSamps/ac3.mp3",
	"/soundz/soundrecs/purpSamps/archGuitar.mp3",
	"/soundz/soundrecs/purpSamps/archGuitar2.mp3",
	"/soundz/soundrecs/purpSamps/crinDrum.mp3",
	"/soundz/soundrecs/purpSamps/crinDrumDist.mp3",
	"/soundz/soundrecs/purpSamps/crinDrumSimp.mp3",
	"/soundz/soundrecs/purpSamps/crinDrumSimp.mp3",
	"/soundz/soundrecs/purpSamps/crinSamp.mp3",
	"/soundz/soundrecs/purpSamps/crinSynths.mp3",
	"/soundz/soundrecs/purpSamps/facGuit.mp3",
	"/soundz/soundrecs/purpSamps/harm1.mp3",
	"/soundz/soundrecs/purpSamps/harm2.mp3",
	"/soundz/soundrecs/purpSamps/harm3.mp3",
	"/soundz/soundrecs/purpSamps/ikaDrum.mp3",
	"/soundz/soundrecs/purpSamps/ikaVoice.mp3",
	"/soundz/soundrecs/purpSamps/impSynth.mp3",
	"/soundz/soundrecs/purpSamps/lofiBeat.mp3",
	"/soundz/soundrecs/purpSamps/lofiguitar.mp3",
	"/soundz/soundrecs/purpSamps/lofiSynth.mp3",
	"/soundz/soundrecs/purpSamps/moldBeat.mp3",
	"/soundz/soundrecs/purpSamps/moldBeat2.mp3",
	"/soundz/soundrecs/purpSamps/moldBeat3.mp3",
	"/soundz/soundrecs/purpSamps/moldSynth.mp3",
	"/soundz/soundrecs/purpSamps/moldSynthBass.mp3",
	"/soundz/soundrecs/purpSamps/moldSynthBass2.mp3",
	"/soundz/soundrecs/purpSamps/sadGuitar.mp3",
	"/soundz/soundrecs/purpSamps/weirdBeat.mp3",
	"/soundz/soundrecs/purpSamps/bass1.mp3",
	"/soundz/soundrecs/purpSamps/bass2.mp3",
	"/soundz/soundrecs/purpSamps/folk1.mp3",
	"/soundz/soundrecs/purpSamps/folk3.mp3",
	"/soundz/soundrecs/purpSamps/fuzzGuit.mp3",
	"/soundz/soundrecs/purpSamps/fuzzGuit2.mp3",
	"/soundz/soundrecs/purpSamps/lute1.mp3",
	"/soundz/soundrecs/purpSamps/punkBass1.mp3",
]

let stabSamps = [
	"/soundz/soundrecs/purpSamps/ac1.mp3",
	"/soundz/soundrecs/purpSamps/ac2.mp3",
	"/soundz/soundrecs/purpSamps/ac3.mp3",
	"/soundz/soundrecs/purpSamps/archGuitar.mp3",
	"/soundz/soundrecs/purpSamps/archGuitar2.mp3",
	"/soundz/soundrecs/purpSamps/facGuit.mp3",
	"/soundz/soundrecs/purpSamps/lofiguitar.mp3",
	"/soundz/soundrecs/purpSamps/sadGuitar.mp3",
	"/soundz/soundrecs/purpSamps/folk1.mp3",
	"/soundz/soundrecs/purpSamps/folk3.mp3",
	"/soundz/soundrecs/purpSamps/lute1.mp3"
]

let scatPoems = [//fiction, non sensical
	"/soundz/soundrecs/words/scatter/scat1.mp3",
	"/soundz/soundrecs/words/scatter/scat2.mp3",
	"/soundz/soundrecs/words/scatter/scat3.mp3",
	"/soundz/soundrecs/words/scatter/scat4.mp3"
	]
let gathPoems = [//lists,taxonomy
	"/soundz/soundrecs/words/gather/gath1.mp3",
	"/soundz/soundrecs/words/gather/gath2.mp3",
	"/soundz/soundrecs/words/gather/gath3.mp3"
	]
let cartPoems = [
	"/soundz/soundrecs/words/cartography/cart1.mp3",
	"/soundz/soundrecs/words/cartography/cart2.mp3"
	]
let purpPoems = [
	"/soundz/soundrecs/words/repurpose/purp1.mp3",
	"/soundz/soundrecs/words/repurpose/purp2.mp3"
]

let songs = [
	"/soundz/soundrecs/songs/song1.mp3",
	"/soundz/soundrecs/songs/song2.mp3",
	"/soundz/soundrecs/songs/song3.mp3",
	"/soundz/soundrecs/songs/barleycorn.mp3",
	"/soundz/soundrecs/songs/silkie.mp3",
	"/soundz/soundrecs/songs/worm.mp3"
] //array of sung samples

function fracture(type,cat){ //

	let s1,s2,s1b,s2b
	if(type === 0){//play music/sound samples
		if(cat === 0){
			let c1 = round(random(soundSamps.length-1))
			let c2 = round(random(soundSamps.length-1))
			s1 = loadSound(soundSamps[c1]);
			s1b = loadSound(soundSamps[c1]);
			s2 = loadSound(soundSamps[c2]);
			s2b = loadSound(soundSamps[c2]);
		}else if(cat === 1){
			let c1 = round(random(soundSamps.length-1))
			let c2 = round(random(musicSamps.length-1))
			s1 = loadSound(soundSamps[c1]);
			s2 = loadSound(musicSamps[c2]);
			s1b = loadSound(soundSamps[c1]);
			s2b = loadSound(musicSamps[c2]);
		} else if(cat === 2){
			let c1 = round(random(musicSamps.length-1))
			let c2 = round(random(musicSamps.length-1))
			s1 = loadSound(musicSamps[c1]);
			s2 = loadSound(musicSamps[c2]);
			s1b = loadSound(musicSamps[c1]);
			s2b = loadSound(musicSamps[c2]);
		}		
		
	} else if(type === 1){//play spoken word samples
		let poems
		let prints = sessionStorage.getItem("footsteps")
		if(prints === "scatter"){							//finds out current page category (chosen from link in previous page), loads appropriate file
			let c1 = Math.floor(Math.random()*scatPoems.length)
			let c2 = Math.floor(Math.random()*scatPoems.length)
			s1 = loadSound(scatPoems[c1])
			s2 = loadSound(scatPoems[c2])
			s1b = loadSound(scatPoems[c1])
			s2b = loadSound(scatPoems[c2])
		} else if(prints === "gather"){
			let c1 = Math.floor(Math.random()*gathPoems.length)
			let c2 = Math.floor(Math.random()*gathPoems.length)
			s1 = loadSound(gathPoems[c1])
			s2 = loadSound(gathPoems[c2])
			s1b = loadSound(gathPoems[c1])
			s2b = loadSound(gathPoems[c2])
		} else if(prints === "cartography"){
			let c1 = Math.floor(Math.random()*cartPoems.length)
			let c2 = Math.floor(Math.random()*cartPoems.length)
			s1 = loadSound(cartPoems[c1])
			s2 = loadSound(cartPoems[c2])
			s1b = loadSound(cartPoems[c1])
			s2b = loadSound(cartPoems[c2])
		} else if(prints === "repurpose"){
			let c1 = Math.floor(Math.random()*purpPoems.length)
			let c2 = Math.floor(Math.random()*purpPoems.length)
			s1 = loadSound(purpPoems[c1])
			s2 = loadSound(purpPoems[c2])
			s1b = loadSound(purpPoems[c1])
			s2b = loadSound(purpPoems[c2])
		}  else if(prints === "miscera"){
			let c1 = Math.floor(Math.random()*scatPoems.length)
			let c2 = Math.floor(Math.random()*scatPoems.length)
			s1 = loadSound(purpPoems[c1])
			s2 = loadSound(purpPoems[c2])
			s1b = loadSound(purpPoems[c1])
			s2b = loadSound(purpPoems[c2])
		}

	} else if(type === 2){//play sung samples
		let c1 = round(random(songs.length-1))
		let c2 = round(random(songs.length-1))
		s1 = loadSound(songs[c1]);
		s2 = loadSound(songs[c2]);
		s1b = loadSound(songs[c1]);
		s2b = loadSound(songs[c2]);
	} else if(type === 3){//RADIO PAGE - SCAT ONLY
		let c1 = round(random(scatPoems.length-1))
		let c2 = round(random(scatPoems.length-1))
		s1 = loadSound(scatPoems[c1]);
		s2 = loadSound(scatPoems[c2]);
		s1b = loadSound(scatPoems[c1]);
		s2b = loadSound(scatPoems[c2]);
	}	

	let s3 = loadSound(stabSamps[round(random(stabSamps.length-1))]);

	let filt1 = new p5.LowPass()
	let filt2 = new p5.LowPass()
	let filt3 = new p5.LowPass()
	filt1.freq(5000)
	filt2.freq(5000)
	filt3.freq(5000)
	s1.disconnect()
	s2.disconnect()
	s3.disconnect()
	s1b.disconnect()
	s2b.disconnect()
	s1.connect(filt1)
	s2.connect(filt2)
	s3.connect(filt3)
	s1b.connect(filt1)
	s2b.connect(filt2)

	let del1 = new p5.Delay()
	let del2 = new p5.Delay()
	let del3 = new p5.Delay()
	del1.process(s1,0,0,1000)
	del2.process(s2,0,0,1000)
	del3.process(s3,0,0,1000)
	del1.process(s1b,0,0,1000)
	del2.process(s2b,0,0,1000)

	let master = new p5.Gain()
	master.connect()
	filt1.disconnect()
	filt2.disconnect()
	filt3.disconnect()
	filt1.connect(master)
	filt2.connect(master)
	filt3.connect(master)
	master.amp(0.25)

	let pace
	let pats1 = [0]
	let pats2 = [0]
	let stabs = []
	let durs1 = [0]
	let durs2 = [0]
	let stabDurs = [0]

	let filt1Pat = []
	let rate1Pat = []
	let del1Pat = []
	let fdbk1Pat = []

	let filt2Pat = []
	let rate2Pat = []
	let rate3Pat = []
	let del2Pat = []
	let fdbk2Pat = []

	let del3Pat = []
	let fdbk3Pat = []

	let fracPos1 = 0
	let fracPos2 = 0

	let samp1Phrase
	let samp2Phrase
	let samp3Phrase
	let samp1
	let samp2
	let samp3
	let place1 = 0
	let place2 = 0
	let place3 = 0
	let pat1pos = 0
	let pat2pos = 0

	setTimeout(function(){
		for(i=0;i<4;i++){
			stabs[i] = random(0,s3.duration())
		}	
		samp3.replaceSequence("samp3",stabs)
		print(s1,s2,s1b,s2b)
	},2000)

	pace = 40

	samp1Phrase = new p5.Phrase("samp1", seq1, pats1);
	samp2Phrase = new p5.Phrase("samp2", seq2, pats2);
	samp3Phrase = new p5.Phrase("samp3", seq3, stabs);
	samp1 = new p5.Part();
	samp1.addPhrase(samp1Phrase)
	samp1.setBPM(pace)
	samp2 = new p5.Part();
	samp2.addPhrase(samp2Phrase)
	samp2.setBPM(pace)
	samp3 = new p5.Part();
	samp3.addPhrase(samp3Phrase)
	samp3.setBPM(pace/2)

	this.fracBegin = function(src){
		userStartAudio()
		if(src === 0){
			s1.play()
			samp1.loop();
		} else if(src === 1){
			samp2.loop();
			s2.play()
		}else if(src === 2){
			samp3.loop();
			s3.play()
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

	this.fracProg = function(src){
		if(src === 0){
			filt1.freq(filt1Pat[fracPos1])
			del1.process(s1,del1Pat[fracPos1],fdbk1Pat[fracPos1])
			s1.play()
			s1.jump(random(s1.duration()),durs1[fracPos1])
			s1.rate(rate1Pat[fracPos1])
			fracPos1++
			if(fracPos1 === pats1.length-1){fracPos1 = 0}
		} else if(src === 1){
			filt2.freq(filt2Pat[fracPos2])
			del2.process(s2,del2Pat[fracPos2],fdbk2Pat[fracPos2])
			s2.play()
			s2.jump(random(s2.duration()),durs2[fracPos2])
			s2.rate(rate2Pat[fracPos2])
			fracPos2++
			if(fracPos2 === pats2.length-1){fracPos2 = 0}
		}
	}


	this.fracStop = function(src){
		if(src === 0){
			samp1.stop()
			s1.stop()
		} else if(src === 1){
			samp2.stop();
			s2.stop()
		}else if(src === 2){
			samp3.stop()
			s3.stop()
		}
	}

	this.fracBPM = function(src,bpm,init){
		if(init === 0){
			if(src === 0){
				samp1.setBPM(bpm)
			} else if(src === 1){
				samp2.setBPM(bpm)
			}
		} else if(init === 1) {
			samp1.setBPM(pace)
			samp2.setBPM(pace)
		}		
	}
	this.patterns = function(){
		print(pats1,pats2)
	}

	this.samplePlay = function(src,start,pan){//with cue start
		if(src === 0){
			s1.play(0,1,0.5,start)
			s1.pan(pan)
		} else if(src === 1){
			s2.play(0,1,0.5,start)
			s2.pan(pan)
		}
	}

	this.samplePlayCont = function(src,pan){//no cue start
		if(src === 0){
			s1.play(0,1,0.5)
			s1.pan(pan)
		} else if(src === 1){
			s2.play(0,1,0.5)
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

	this.loop = function(src){
		if(src === 0){
			s1.loop(0,1,0.5,0);
		} else if (src === 1){
			s2.loop(0,1,0.5,0)
		}				
	}

	this.fifths = function(src){
		print(src)
		if(src === 0){
			filt1.freq(filt1Pat[place1])
			del1.process(s1,del1Pat[place1],fdbk1Pat[place1])
			del1.process(s1b,del1Pat[place1],fdbk1Pat[place1])
			s1.play()
			s1.jump(pats1[place1],0.1)
			s1.rate(rate1Pat[place1])
			s1.pan(-1)

			s1b.play()
			s1b.jump(pats1[place1],0.1)
			s1b.rate(rate1Pat[place1]+0.5)
			s1b.pan(1)

			place1++
			if(place1 === pats1.length-1){place1 = 0}
		} else if (src === 1){
			filt2.freq(filt2Pat[place2])
			del2.process(s2,del2Pat[place2],fdbk2Pat[place2])
			del2.process(s2b,del2Pat[place2],fdbk2Pat[place2])
			s2.play()
			s2.jump(pats2[place2],0.1)
			s2.rate(rate2Pat[place2])
			s2.pan(-1)

			s2b.play()
			s2b.jump(pats2[place2],0.1)
			s2b.rate(rate2Pat[place2]+0.5)
			s2b.pan(1)

			place2++
			if(place2 === pats2.length-1){place2 = 0}
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

	this.panner = function(src,p){
		if(src === 0){
			s1.pan(p)
		} else if (src === 1){
			s2.pan(p)
		}
	}

	this.dur1 = function(){
		return(s1.duration())
	}

	this.dur2 = function(){
		return(s2.duration())
	}

	function seq1(time,start){
		filt1.freq(filt1Pat[place1])

		del1.process(s1,del1Pat[place1],fdbk1Pat[place1])
		// del1.delayTime(del1Pat[place1])
		// del1.feedback(fdbk1Pat[place1])
		
		s1.play()
		s1.jump(start,durs1[place1])
		s1.rate(rate1Pat[place1])
		s1.pan(random(2)-1)

		place1++
		if(place1 === pats1.length-1){place1 = 0}
	}

	function seq2(time,start){	
		print(place2)
		filt2.freq(filt2Pat[place2])
		// print(del2Pat[place2])
		// del2.delayTime(del2Pat[place2])
		// del2.feedback(fdbk2Pat[place2])
		del2.process(s2,del2Pat[place2],fdbk2Pat[place2])
		s2.play()
		s2.jump(start,durs2[place2])
		s2.rate(rate2Pat[place2])
		s2.pan(random(2)-1)

		place2++
		if(place2 === pats2.length-1){place2 = 0}
	}

	function seq3(time,start){	
		del3.delayTime(del3Pat[place3])
		del3.feedback(fdbk3Pat[place3])
		
		s3.play(0,1,1,start,0.2)
		place3++
		if(place3 === stabs.length-1){place3 = 0}
	}

	this.add = function(src,pat){
		if(src === 0){	
			pats1[pat1pos] = pat
			samp1.replaceSequence("samp1",pats1)
			pat1pos++
			if(pat1pos === 16){pat1pos = 0}
		} else if(src === 1){
			pats2[pat2pos] = pat
			samp2.replaceSequence("samp2",pats2)
			pat2pos++
			if(pat2pos === 16){pat2pos = 0}
		} else if(src === 2){	
			stabs.push(pat)
			samp3.replaceSequence("samp3",stabs)
		}
	}

	this.clear = function(src) {
		if(src === 0){
			if(pats1.length<16){
				pats1 = []
				samp1.replaceSequence("samp1",pats1)
			} else {
				return null
			}
		} else if(src === 1){
			if(pats2.length<16){
				pats2 = []
				samp2.replaceSequence("samp2",pats2)
			} else {
				return null
			}
		} else if(src === 2){	
			stabs = []
			samp3.replaceSequence("samp3",stabs)
		}
	}

	this.sweep = function(f){
		filt3.freq(f)
	}

	this.del = function(src){
		if(src === 0){
			pats1.pop()
			samp1.replaceSequence("samp1",pats1)
		} else if(src === 1){
			pats2.pop()
			samp2.replaceSequence("samp2",pats2)
		}
	}

	this.shuf = function(){// section of linden sequence,adds zeros,from control page
		for (let i = stabs.length - 1; i > 0; i--) {
		    let j = Math.floor(Math.random() * (i + 1));		    
		    [stabs[i], stabs[j]] = [stabs[j], stabs[i]];
			}
		samp3.replaceSequence("samp1",stabs)
	
	}

	this.params = function(len){//type 1 === spoken vocals, diff rates sound shit
		if(type === 1){
			for(i=0;i<16;i++){
				filt1Pat[i] = Math.random()*10000
				rate1Pat[i] = 1
				del1Pat[i] = Math.random()
				fdbk1Pat[i] = Math.random()*0.5

				filt2Pat[i] = Math.random()*10000
				rate2Pat[i] = 1
				del2Pat[i] = Math.random()
				fdbk2Pat[i] = Math.random()*0.5

				rate3Pat[i] = 1
				del3Pat[i] = Math.random()
				fdbk3Pat[i] = Math.random()*0.5
			}
		} else {
			for(i=0;i<16;i++){
				filt1Pat[i] = Math.random()*10000
				rate1Pat[i] = (Math.random()*4)-2
				del1Pat[i] = Math.random()
				fdbk1Pat[i] = Math.random()*0.5

				filt2Pat[i] = Math.random()*10000
				rate2Pat[i] = (Math.random()*4)-2
				del2Pat[i] = Math.random()
				fdbk2Pat[i] = Math.random()*0.5

				rate3Pat[i] = (Math.random()*4)-2
				del3Pat[i] = Math.random()
				fdbk3Pat[i] = Math.random()*0.5
			}
		}
			print(del2Pat)
	}
}



	