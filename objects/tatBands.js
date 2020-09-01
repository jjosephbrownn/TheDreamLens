//add envelopes?

let soundSamps = [ //array of sound recordings
	"/soundz/soundrecs/purpSamps/barge.mp3",
	"/soundz/soundrecs/purpSamps/bayleaves.mp3", 
	"/soundz/soundrecs/purpSamps/breadmachine.mp3",
	"/soundz/soundrecs/purpSamps/charcoal.mp3", 
	"/soundz/soundrecs/purpSamps/comb.mp3", 
	"/soundz/soundrecs/purpSamps/combwood.mp3", 
	"/soundz/soundrecs/purpSamps/cork.mp3", 
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
	"/soundz/soundrecs/purpSamps/facGuitar.mp3",
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
	"/soundz/soundrecs/purpSamps/weirdBeat.mp3"
]

let tatBands = [
	"/soundz/soundrecs/words/tatters/tat1.mp3",
	"/soundz/soundrecs/words/tatters/tat2.mp3",
	"/soundz/soundrecs/words/tatters/tat3.mp3",
	"/soundz/soundrecs/words/tatters/tat4.mp3",
	"/soundz/soundrecs/words/tatters/tat5.mp3",
	"/soundz/soundrecs/words/tatters/tat6.mp3"
]

let songs = [
	"/soundz/soundrecs/songs/song1.mp3",
	"/soundz/soundrecs/songs/song2.mp3",
	"/soundz/soundrecs/songs/song3.mp3",
	"/soundz/soundrecs/songs/barleycorn.mp3",
	"/soundz/soundrecs/songs/silkie.mp3",
	"/soundz/soundrecs/songs/worm.mp3"
] //array of sung samples

let band1,band2,band3,band4,band5,band6
let s1,s2
let master

function spectral(type,cat){// type === type of samples
	
	let s1,s2
	if(type === 0){//play music/sound samples
		if(cat === 0){
			let c1 = round(random(soundBandsSamps.length-1))
			let c2 = round(random(soundBandsSamps.length-1))
			s1 = loadSound(soundBandsSamps[c1]);
			s2 = loadSound(soundBandsSamps[c2]);
		}else if(cat === 1){
			let c1 = round(random(soundBandsSamps.length-1))
			let c2 = round(random(musicBandsSamps.length-1))
			s1 = loadSound(soundBandsSamps[c1]);
			s2 = loadSound(musicBandsSamps[c2]);
		} else if(cat === 2){
			let c1 = round(random(musicBandsSamps.length-1))
			let c2 = round(random(musicBandsSamps.length-1))
			s1 = loadSound(musicBandsSamps[c1]);
			s2 = loadSound(musicBandsSamps[c2]);
		}		

	} else if(type === 1){//play spoken word samples
		
		let c1 = Math.floor(Math.random()*tatBands.length)
		let c2 = Math.floor(Math.random()*tatBands.length)
		s1 = loadSound(tatBands[c1])
		s2 = loadSound(tatBands[c2])

	} else if(type === 2){//play sung samples
		let c1 = round(random(songsBand.length-1))
		let c2 = round(random(songsBand.length-1))
		s1 = loadSound(songsBand[c1]);
		s2 = loadSound(songsBand[c2]);
	}		

	s1.disconnect()
	s2.disconnect()

	band11 = new p5.Filter("lowpass")//"hidden" samples, are revealed by opening filters
	band21 = new p5.Filter("bandpass")
	band31 = new p5.Filter("bandpass")
	band41 = new p5.Filter("bandpass")
	band51 = new p5.Filter("bandpass")
	band61 = new p5.Filter("highpass")

	band12 = new p5.Filter("lowpass")//"initial" samples, substracted
	band22 = new p5.Filter("bandpass")
	band32 = new p5.Filter("bandpass")
	band42 = new p5.Filter("bandpass")
	band52 = new p5.Filter("bandpass")
	band62 = new p5.Filter("highpass")

	band11amp = new p5.Gain()
	band21amp = new p5.Gain()
	band31amp = new p5.Gain()
	band41amp = new p5.Gain()
	band51amp = new p5.Gain()
	band61amp = new p5.Gain()

	band12amp = new p5.Gain()
	band22amp = new p5.Gain()
	band32amp = new p5.Gain()
	band42amp = new p5.Gain()
	band52amp = new p5.Gain()
	band62amp = new p5.Gain()
	
	s1.connect(band11)
	s1.connect(band21)
	s1.connect(band31)
	s1.connect(band41)
	s1.connect(band51)
	s1.connect(band61)

	s2.connect(band12)
	s2.connect(band22)
	s2.connect(band32)
	s2.connect(band42)
	s2.connect(band52)
	s2.connect(band62)

	band11.freq(200)
	band21.freq(500)
	band31.freq(1000)
	band41.freq(2500)
	band51.freq(5000)
	band61.freq(10000)

	band12.freq(200)
	band22.freq(500)
	band32.freq(1000)
	band42.freq(2500)
	band52.freq(5000)
	band62.freq(10000)

	band21.res(10)
	band31.res(10)
	band41.res(10)
	band51.res(10)

	band22.res(10)
	band32.res(10)
	band42.res(10)
	band52.res(10)

	band11.disconnect()
	band21.disconnect()
	band31.disconnect()
	band41.disconnect()
	band51.disconnect()
	band61.disconnect()

	band12.disconnect()
	band22.disconnect()
	band32.disconnect()
	band42.disconnect()
	band52.disconnect()
	band62.disconnect()

	band11amp.setInput(band11)
	band21amp.setInput(band21)
	band31amp.setInput(band31)
	band41amp.setInput(band41)
	band51amp.setInput(band51)
	band61amp.setInput(band61)

	band12amp.setInput(band12)
	band22amp.setInput(band22)
	band32amp.setInput(band32)
	band42amp.setInput(band42)
	band52amp.setInput(band52)
	band62amp.setInput(band62)

	band11amp.connect()
	band21amp.connect()
	band31amp.connect()
	band41amp.connect()
	band51amp.connect()
	band61amp.connect()

	band12amp.connect()
	band22amp.connect()
	band32amp.connect()
	band42amp.connect()
	band52amp.connect()
	band62amp.connect()

	band11amp.amp(0)
	band21amp.amp(0)
	band31amp.amp(0)
	band41amp.amp(0)
	band51amp.amp(0)
	band61amp.amp(0)

	band12amp.amp(1)
	band22amp.amp(1)
	band32amp.amp(1)
	band42amp.amp(1)
	band52amp.amp(1)
	band62amp.amp(1)


	this.play = function() {
		s1.loop(0,1,0.5,random(s1.duration()),3)
		s2.loop(0,1,0.5,random(s2.duration()),3)
	}

	this.stop = function(){
		s1.stop()
		s2.stop()
	}

	this.pass = function(src,g,ng){
		// console.log(g,ng)
		if(src === 1){
			band11amp.amp(g)
			band12amp.amp(ng)	
		} else if(src === 2){
			band21amp.amp(g)
			band22amp.amp(ng)
		} else if(src === 3){
			band31amp.amp(g)
			band32amp.amp(ng)
		} else if(src === 4){
			band41amp.amp(g)
			band42amp.amp(ng)
		} else if(src === 5){
			band51amp.amp(g)
			band52amp.amp(ng)
		} else if(src === 6){
			band61amp.amp(g)
			band62amp.amp(ng)
		} 
	} 
}

