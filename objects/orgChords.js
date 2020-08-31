

function orgChord(plus,paramSrc){

	let chord11,chord21,chord31,chord12,chord22,chord32;
	let cFilt1,cFilt2,cFilt3
	let cEnv1,cEnv2,cEnv3;
	let verb1,verb2
	let atk,dec,amp,mFreq,fFreq
	let initAtk,initDec
	let master

	let drums = [
	"../soundz/soundrecs/purpSamps/lofiBeat.mp3",
	"../soundz/soundrecs/purpSamps/moldBeat.mp3",
	"../soundz/soundrecs/purpSamps/moldBeat2.mp3",
	"../soundz/soundrecs/purpSamps/moldBeat3.mp3"
]

	let drum = loadSound(drums[round(random(drums.length-1))])

	let top = [];
	let mid = [];
	let bass = [];

	let freqInc = 0

	let oct = plus

	let chordMode = JSON.parse(sessionStorage.getItem("mode"))//getting mode from nav info
	let chordTune = JSON.parse(sessionStorage.getItem("melody"))//getting melody primitives from session (primitive = placeholder in array ie 0-7 which can be converted to any mode)

	for(i=0;i<chordTune.length;i++){ // creating cantus by mapping melody primitive to stored mode (0,1,2 in mel = 0,2,4 ionian or 0,1,3 phrygian)
		let n = chordTune[i]
		bass[i] = chordMode[n] + oct
		top[i] = chordMode[n] + oct
		mid[i] = chordMode[n] + oct
	}
	console.log(bass,mid,top)

	cFilt1 = new p5.HighPass();
	cFilt2 = new p5.HighPass();
	cFilt3 = new p5.HighPass();

	verb1 = new p5.Reverb()
	verb2 = new p5.Reverb()

	master = new p5.Gain()

	params(paramSrc)

	this.startup = function(){
		userStartAudio();
		chord11.start();
		chord21.start();
		chord31.start()	
		chord12.start();
		chord22.start();
		chord32.start()	
	}

	this.stop = function(){
		cEnv1.triggerRelease()
		cEnv2.triggerRelease()
		cEnv3.triggerRelease()
	}

	this.chordLen = function(){
		return(bass.length)
	}

	this.nextNote = function(on,pos){	
		console.log(on,pos)	
		if(on === 0){
			return null
		} else if(on === 1){
			let topVal = midiToFreq(top[pos]);
			let midVal = midiToFreq(mid[pos]);
			let bassVal = midiToFreq(bass[pos]);

			cEnv1.play(chord11);
			cEnv1.play(chord12);
			cEnv2.play(chord21);
			cEnv2.play(chord22);
			cEnv3.play(chord31);
			cEnv3.play(chord32);
	     	
	     	chord11.freq(topVal);
	     	chord12.freq(topVal*2);
	     	chord21.freq(midVal);
	     	chord22.freq(midVal*2);
	     	chord31.freq(bassVal);
     		chord32.freq(bassVal*2);	
		}	
	}

	this.voices = function(src,onoff){
		if(src === 0){
			if(onoff === 0){
				cEnv1.triggerRelease()
				chord11.stop();
     			chord12.stop();
			} else if(onoff === 1){
				chord11.start();
     			chord12.start();
			}
		} else if(src === 1){
			if(onoff === 0){
				cEnv2.triggerRelease()
				chord21.stop();
     			chord22.stop();
			} else if(onoff === 1){
				chord21.start();
     			chord22.start();
			}
		} else if(src === 2){
			if(onoff === 0){
				cEnv3.triggerRelease()
				chord31.stop();
     			chord32.stop();
			} else if(onoff === 1){
				chord31.start();
     			chord32.start();
			}
		}
	}

	this.harmony = function(){
		for (let i = bass.length - 1; i > 0; i--) {//shuffle it up dude
	    	let j = Math.floor(Math.random() * (i + 1));
	    	let k = Math.floor(Math.random() * (i + 1));   
	    	[top[i], top[j]] = [top[j], top[i]];
	    	[mid[i], mid[k]] = [mid[k], mid[i]];
	 	}
	}
	
	this.paramChange = function(inc,init){
		if(init === 0){
			amp += inc
			mFreq += inc
			fFreq += inc
		    cEnv1.setADSR(atk+=inc,dec+=inc,0.25,1)
		    cEnv2.setADSR(atk+=inc,dec+=inc,0.25,1)
		    cEnv3.setADSR(atk+=inc,dec+=inc,0.25,1)
		    if(atk < 0.01){atk = 1;dec = 1}

		    chord12.amp(amp)
		    chord22.amp(amp)

		    chord12.freq(mFreq)
		    chord22.freq(mFreq)

		    cFilt1.freq(mFreq)
		    cFilt2.freq(mFreq)
		} else if (init === 1){
			amp += initamp
			mFreq += initmFreq
			fFreq += initfFreq
			cEnv1.setADSR(initAtk,initDec,0.25,1)
	  		cEnv2.setADSR(initAtk,initDec,0.25,1)
		    cEnv3.setADSR(initAtk,initDec,0.25,1)
		    chord12.amp(initamp)
		    chord22.amp(initamp)

		    chord12.freq(initmFreq)
		    chord22.freq(initmFreq)

		    cFilt1.freq(initmFreq)
		    cFilt2.freq(initmFreq)
		}
  	}

  	this.tuning = function(f){
  		freqInc += f
  	}

  	this.sampler = function(rate,onoff){
  		if(onoff === 1){
  			drum.loop(0,rate,0.2)
  		} else if(onoff === 0){
  			drum.pause()
  		}
  		
  	}

	function params(paramSrc){
		console.log(paramSrc)
		if(paramSrc === 0){
			chord11 = new p5.Oscillator("sine");
			chord21 = new p5.Oscillator("sine");
			chord31 = new p5.Oscillator("sine");
			chord12 = new p5.Oscillator("sine");
			chord22 = new p5.Oscillator("sine");
			chord32 = new p5.Oscillator("sine");

			chord11.pan(-1);
			chord21.pan(1);
			chord31.pan(0);

			cFilt1.freq(1000);
			cFilt2.freq(1000);
			cFilt3.freq(1000);
			cFilt1.res(1);
			cFilt2.res(1);
			cFilt3.res(1);

			chord12.disconnect()
			chord22.disconnect()
			chord32.disconnect()
			chord11.disconnect()
			chord21.disconnect()
			chord31.disconnect()

			chord11.connect(cFilt1)
			chord21.connect(cFilt2)
			chord31.connect(cFilt3)
			chord12.connect(cFilt1)
			chord22.connect(cFilt2)
			chord32.connect(cFilt3)

			cEnv1 = new p5.Envelope;
			cEnv1.setADSR(4,2,0.25,0.5)
			cEnv1.setRange(0.1,0);
			chord11.amp(cEnv1);
			chord12.amp(cEnv1)

			cEnv2 = new p5.Envelope;
			cEnv2.setADSR(4,2,0.25,0.5)
			cEnv2.setRange(0.1,0);
			chord21.amp(cEnv2);
			chord22.amp(cEnv2);

			cEnv3 = new p5.Envelope;
			cEnv3.setADSR(4,2,0.25,0.5)
			cEnv3.setRange(0.1,0);
			chord31.amp(cEnv3);
			chord32.amp(cEnv3);

			verb1.process(cFilt1,1,3)
			verb1.process(cFilt2,1,3)
			verb1.process(cFilt3,1,3)
			verb1.process(drum,1,3)
			verb1.drywet(1)
			verb1.drywet(0.5)

			cFilt1.disconnect()
			cFilt2.disconnect()
			cFilt3.disconnect()
			verb1.disconnect()
			verb2.disconnect()

			master.connect()
			cFilt1.connect(master)
			cFilt2.connect(master)
			cFilt3.connect(master)
			verb1.connect(master)
			verb2.connect(master)
			master.amp(0.1)

			atk = 4
			dec = 4
			initAtk = 4
			initDec = 4
		} else if(paramSrc === 1){
			chord11 = new p5.Oscillator("triangle");
			chord21 = new p5.Oscillator("triangle");
			chord31 = new p5.Oscillator("triangle");
			chord12 = new p5.Oscillator("triangle");
			chord22 = new p5.Oscillator("triangle");
			chord32 = new p5.Oscillator("triangle");

			chord11.pan(-1);
			chord21.pan(1);
			chord31.pan(0);

			cFilt1.freq(1000);
			cFilt2.freq(1000);
			cFilt3.freq(1000);
			cFilt1.res(5);
			cFilt2.res(5);
			cFilt3.res(5);

			chord12.disconnect()
			chord22.disconnect()
			chord32.disconnect()
			chord11.disconnect()
			chord21.disconnect()
			chord31.disconnect()

			chord11.connect(cFilt1)
			chord21.connect(cFilt2)
			chord31.connect(cFilt3)
			chord12.connect(cFilt1)
			chord22.connect(cFilt2)
			chord32.connect(cFilt3)

			cEnv1 = new p5.Envelope;
			cEnv1.setADSR(0.001,1,0.25,0.1)
			cEnv1.setRange(0.25,0);
			chord11.amp(cEnv1);
			chord12.amp(cEnv1)

			cEnv2 = new p5.Envelope;
			cEnv2.setADSR(0.001,1,0.25,0.1)
			cEnv2.setRange(0.25,0);
			chord21.amp(cEnv2);
			chord22.amp(cEnv2);

			cEnv3 = new p5.Envelope;
			cEnv3.setADSR(0.001,1,0.25,0.1)
			cEnv3.setRange(0.25,0);
			chord31.amp(cEnv3);
			chord32.amp(cEnv3);

			verb1.process(cFilt1,1,3)
			verb1.process(cFilt2,1,3)
			verb1.process(cFilt3,1,3)
			verb1.process(drum,1,3)
			verb1.drywet(1)
			verb1.drywet(0.5)

			cFilt1.disconnect()
			cFilt2.disconnect()
			cFilt3.disconnect()
			verb1.disconnect()
			verb2.disconnect()

			master.connect()
			cFilt1.connect(master)
			cFilt2.connect(master)
			cFilt3.connect(master)
			verb1.connect(master)
			verb2.connect(master)
			master.amp(0.1)

			atk = 4
			dec = 4
			initAtk = 4
			initDec = 4
		}
	}		
}