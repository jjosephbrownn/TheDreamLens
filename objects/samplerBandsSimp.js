//add envelopes?

let soundBandSamps = [ //array of sound recordings
	"/soundz/soundrecs/purpSamps/barge.mp3",
	"/soundz/soundrecs/purpSamps/bayleaves.mp3", 
	"/soundz/soundrecs/purpSamps/charcoal.mp3", 
	"/soundz/soundrecs/purpSamps/comb.mp3", 
	"/soundz/soundrecs/purpSamps/combwood.mp3", 
	"/soundz/soundrecs/purpSamps/cork.mp3", 
	"/soundz/soundrecs/purpSamps/crunchyleaves.mp3", 
	"/soundz/soundrecs/purpSamps/grinder.mp3", 
	"/soundz/soundrecs/purpSamps/grinder2.mp3",
	"/soundz/soundrecs/purpSamps/woodscrape.mp3"
]

let musicBandSamps = [
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
let wordBands = [
	"/soundz/soundrecs/words/scatter/scat1.mp3",
	"/soundz/soundrecs/words/scatter/scat2.mp3",
	"/soundz/soundrecs/words/scatter/scat3.mp3",
	"/soundz/soundrecs/words/scatter/scat4.mp3",
	"/soundz/soundrecs/words/gather/gath1.mp3",
	"/soundz/soundrecs/words/gather/gath2.mp3",
	"/soundz/soundrecs/words/gather/gath3.mp3",
	"/soundz/soundrecs/words/cartography/cart1.mp3",
	"/soundz/soundrecs/words/cartography/cart2.mp3",
	"/soundz/soundrecs/words/repurpose/purp1.mp3",
	"/soundz/soundrecs/words/repurpose/purp2.mp3"
]

let songBands = [
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

function spectral(){// type === type of samples
	
	s1 = loadSound(soundBandSamps[round(random(soundBandSamps.length-1))])
	s2 = loadSound(musicBandSamps[round(random(musicBandSamps.length-1))])
	s3 = loadSound(songBands[round(random(songBands.length-1))])

	s1.disconnect()
	s2.disconnect()
	s3.disconnect()

	let hp1 = new p5.HighPass()
	let hp2 = new p5.HighPass()
	let lp1 = new p5.HighPass()

	let env1 = new p5.Envelope()
	let env2 = new p5.Envelope()
	let env3 = new p5.Envelope()

	env1.setADSR(0.05,1,1,0.5)
	env2.setADSR(0.05,1,1,0.5)
	env3.setADSR(0.05,1,1,0.5)

	env1.setRange(0.5,0)
	env2.setRange(0.5,0)
	env3.setRange(0.5,0)

	hp1.freq(20000)
	hp2.freq(20000)
	lp1.freq(20000)

	s1.connect(hp1)
	s2.connect(hp2)
	s3.connect(lp1)

	s1.amp(env1)
	s2.amp(env2)
	s3.amp(env3)

	this.startup = function(){
		s1.loop()
		s2.loop()
		s3.loop()
	}


	this.play = function() {
		env1.triggerAttack()	
		env2.triggerAttack()
		env3.triggerAttack()	
	}
	

	this.altPlay = function(src,dur){
		if(src === 0){
			s1.jump(dur)
			env1.triggerAttack()
		} else if(src === 1){
			s2.jump(dur)
			env2.triggerAttack()
		}
	}

	this.dur1 = function(){
		return s1.duration()
	}

	this.dur2 = function(){
		return s2.duration()
	}

	this.stop = function(){
		env1.triggerRelease()
		env2.triggerRelease()
		env3.triggerRelease()
	}

	this.panner = function(src,p){
		if(src === 0){
			s1.pan(p)
		} else if(src === 1){
			s2.pan(p)
		}else if(src === 2){
			s3.pan(p)
		} 
	}

	this.pass = function(src,ng){
		if(src === 0){
			hp1.freq(ng-500)
		} else if(src === 1){
			hp2.freq(ng)
		}else if(src === 2){
			lp1.freq(ng-500)
		} 
	}	
}

