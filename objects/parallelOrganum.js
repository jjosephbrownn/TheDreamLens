

function parallel(bpm,plus,param){

	let osc1,osc2,osc3;
	let filt1,filt2,filt3
	let voice1,voice2,voice3;
	let env1,env2,env3;
	let del1,del2,del3;
	let atk,dec,amp,mFreq,fFreq
	let initAtk,initDec
	let parMaster

	let tenor,disc,ped;

	let cantus = [];
	let ten = [];
	let alt = [];

	let freqInc = 0

	let init = []

	let oct = plus
	let pace = bpm;
	let bpms = [15,30,60,90]

	let mode = JSON.parse(sessionStorage.getItem("mode"))//getting mode from nav info
	let mel = JSON.parse(sessionStorage.getItem("melody"))//getting melody primitives from session (primitive = placeholder in array ie 0-7 which can be converted to any mode)

	for(i=0;i<mel.length;i++){ // creating cantus by mapping melody primitive to stored mode (0,1,2 in mel = 0,2,4 ionian or 0,1,3 phrygian)
		let n = mel[i]
		cantus[i] = mode[n] + oct
	}

	window.addEventListener('keydown', function(e) {
	  if(e.keyCode == 32 && e.target == document.body) {
	    e.preventDefault();
	  }
	});

	filt1 = new p5.LowPass();
	filt2 = new p5.LowPass();
	filt3 = new p5.LowPass();

	del1 = new p5.Delay()
	del2 = new p5.Delay()
	del3 = new p5.Delay()

	voice1 = new p5.Phrase("tenor", seq1, init);
	voice2 = new p5.Phrase("alto", seq2, init);
	voice3 = new p5.Phrase("cant", seq3, init);

	tenor = new p5.Part();
	tenor.addPhrase(voice1);
	tenor.setBPM(pace);

	disc = new p5.Part();
	disc.addPhrase(voice2);
	disc.setBPM(pace);

	ped = new p5.Part();
	ped.addPhrase(voice3);
	ped.setBPM(pace);

	params(param)

	this.startup = function(){
		userStartAudio();
		osc11.start();
		osc21.start();
		osc31.start()	
		osc12.start();
		osc22.start();
		osc32.start()	
	}

	this.begin = function(){
		ped.loop()
	}

	this.stop = function(){
		env1.triggerRelease()
		env2.triggerRelease()
		env3.triggerRelease()
		ped.stop()
		tenor.stop()
		disc.stop()
	}

	this.pedBPM = function(bpm){
		ped.setBPM(bpm)
	}

	this.cantLen = function(){
		return(cantus.length-1)
	}

	this.firmus = function(){//adds rests into cantus
		cantus.splice(round(random(cantus.length)), 0, " ")
 		ped.replaceSequence("cant",cantus)
	}

	this.nextNote = function(src,pos,playMode){
		if(playMode === 0){
			if(src === 0){
				if(ten[pos] === " "){
					env1.triggerRelease()
				} else {
					let midiVal = midiToFreq(ten[pos]);
					env1.triggerAttack(osc11);
					env1.triggerAttack(osc12);
			     	osc11.freq(midiVal);
			     	osc12.freq(midiVal/2)
				}
					
			}else if(src === 1){
				if(alt[pos] === " "){
					env2.triggerRelease()
				} else {
					let midiVal = midiToFreq(alt[pos]);
					env2.triggerAttack(osc21);
					env2.triggerAttack(osc22);
			     	osc21.freq(midiVal);
			     }
			}else if(src === 2){
				if(cantus[pos] === " "){
					env3.triggerRelease()
				} else {
					let midiVal = midiToFreq(cantus[pos]);
					env3.triggerAttack(osc31);
					env3.triggerAttack(osc32);
			     	osc31.freq(midiVal);
				}
			}
		}else if(playMode === 1){
			if(src === 0){
				if(ten[pos] === " "){
					env1.triggerRelease()
				} else {
					let midiVal = midiToFreq(ten[pos]);
					env1.play(osc11);
					env1.play(osc12);
			     	osc11.freq(midiVal);
			     	osc12.freq(midiVal/2)
				}
					
			}else if(src === 1){
				if(alt[pos] === " "){
					env2.triggerRelease()
				} else {
					let midiVal = midiToFreq(alt[pos]);
					env2.play(osc21);
					env2.play(osc22);
			     	osc21.freq(midiVal);
			     }
			}else if(src === 2){
				if(cantus[pos] === " "){
					env3.triggerRelease()
				} else {
					let midiVal = midiToFreq(cantus[pos]);
					env3.play(osc31);
					env3.play(osc32);
			     	osc31.freq(midiVal);
				}
			}
		}
		
	}

	this.voices = function(src,onoff){
		if(src === 0){
			if(onoff === 0){
				env1.triggerRelease()
				tenor.stop()
			} else if(onoff === 1){
				tenor.loop()
			}
		} else if(src ===1){
			if(onoff === 0){
				env2.triggerRelease()
				disc.stop()
			} else if(onoff === 1){
				disc.loop()
			}
		}
	}

	this.speeds = function(src,onoff){
		if(onoff === 0){				
			tenor.setBPM(pace/2)
			disc.setBPM(pace/2)
		} else if(onoff === 1){
			tenor.setBPM(pace)
			disc.setBPM(pace)
		}
	}
	

	this.counterpoint = function(){
		for(i=0;i<cantus.length;i++){
			if(cantus[i] !== " "){
				ten[i] = cantus[i]+7
				alt[i] = cantus[i]-4
			} else {
				ten[i] = " "
				alt[i] = " "
			}
		}
		tenor.replaceSequence("tenor",ten)
		disc.replaceSequence("alto",alt)
	}

	this.paramAlter = function(envInc,ampInc,filtInc){
	    env1.setADSR(envInc,envInc*2,0.25,0.1)
	    env2.setADSR(envInc,envInc*2,0.25,0.1)
	    env3.setADSR(envInc,envInc*2,0.25,0.1)
	    if(atk < 0.01){atk = 1;dec = 1}

	    osc12.amp(ampInc)
	    osc22.amp(ampInc)

	    osc12.freq(filtInc)
	    osc22.freq(filtInc)

	    filt1.freq(filtInc)
	    filt2.freq(filtInc)
	}
	
	this.paramChange = function(inc,init){
		if(init === 0){
			amp += inc
			mFreq += inc
			fFreq += inc
		    env1.setADSR(atk+=inc,dec+=inc,0.25,1)
		    env2.setADSR(atk+=inc,dec+=inc,0.25,1)
		    env3.setADSR(atk+=inc,dec+=inc,0.25,1)
		    if(atk < 0.01){atk = 1;dec = 1}

		    osc12.amp(amp)
		    osc22.amp(amp)

		    osc12.freq(mFreq)
		    osc22.freq(mFreq)

		    filt1.freq(mFreq)
		    filt2.freq(mFreq)
		} else if (init === 1){
			amp += initamp
			mFreq += initmFreq
			fFreq += initfFreq
			env1.setADSR(initAtk,initDec,0.25,1)
	  		env2.setADSR(initAtk,initDec,0.25,1)
		    env3.setADSR(initAtk,initDec,0.25,1)
		    osc12.amp(initamp)
		    osc22.amp(initamp)

		    osc12.freq(initmFreq)
		    osc22.freq(initmFreq)

		    filt1.freq(initmFreq)
		    filt2.freq(initmFreq)
		}
  	}

  	this.envChange = function(newDec){
	    env1.setADSR(atk,newDec,0.25,1)
	    env2.setADSR(atk,newDec,0.25,1)
	    env3.setADSR(atk,newDec,0.25,1)
	    dec = newDec
  	}

	this.freqChange = function(newFreq){
	    filt1.freq(newFreq)
	    filt2.freq(newFreq)
	    filt2.freq(newFreq)
	}

    this.swell = function(newAtk){
	    env1.setADSR(newAtk,dec,0.25,1)
	    env2.setADSR(newAtk,dec,0.25,1)
	    env3.setADSR(newAtk,dec,0.25,1)
	    atk = newAtk
    }

  	this.tuning = function(f){
  		freqInc += f
  	}

  	this.panner = function(src,p){
  		if(src === 0){
  			osc11.pan(p)
  			osc12.pan(p)
  		} else if(src === 1){
  			osc21.pan(p)
  			osc22.pan(p)
  		}

  	}

  	this.rhythm = function(src){
		ten.splice(round(random(ten.length-1)),0, " ")
		alt.splice(round(random(alt.length-1)),0, " ")
  	}

	function seq1(time,note){//tenor
		if(note !== " "){
			let midiVal = midiToFreq(note);
			osc11.freq(midiVal+freqInc);
			env1.triggerAttack();
		} else if(note === " "){
			env1.triggerRelease();
		}
	};

	function seq2(time,note){//alto
		if(note !== " "){
			let midiVal = midiToFreq(note);
			osc21.freq(midiVal+freqInc);
			env2.triggerAttack();
		}else if(note === " "){
			env2.triggerRelease();
		}
	};

	function seq3(time,note){//cant
		if(note !== " "){
			let midiVal = midiToFreq(note);
			osc31.freq(midiVal+freqInc);
			env3.triggerAttack();
		}else if(note === " "){
			env3.triggerRelease();
		}
	};

	function params(src){
		parMaster = new p5.Gain()

		amp = 2
		mFreq = 1000
		fFreq = 750
		initamp = 25
		initmFreq = 100
		initfFreq = 250
		osc11 = new p5.Oscillator("triangle");
		osc21 = new p5.Oscillator("triangle");
		osc31 = new p5.Oscillator("triangle");
		osc12 = new p5.Oscillator("square");
		osc22 = new p5.Oscillator("square");
		osc32 = new p5.Oscillator("square");

		osc11.pan(-0.75);
		osc21.pan(0.75);
		osc31.pan(0);

		osc12.amp(amp)
		osc22.amp(amp)
		osc32.amp(-2)

		osc12.freq(mFreq)
		osc22.freq(mFreq)

		filt1.freq(fFreq);
		filt2.freq(fFreq);
		filt3.freq(750);
		filt1.res(1);
		filt2.res(1);
		filt3.res(1);

		osc11.freq(osc12)
		osc11.freq(osc22)
		osc11.freq(osc32)

		osc12.disconnect()
		osc22.disconnect()
		osc32.disconnect()

		osc11.disconnect()
		osc21.disconnect()
		osc31.disconnect()

		osc11.connect(filt1)
		osc21.connect(filt2)
		osc31.connect(filt3)

		env1 = new p5.Envelope;
		env1.setADSR(2,1,0.5,0.01)
		env1.setRange(0.25,0);
		osc11.amp(env1);

		env2 = new p5.Envelope;
		env2.setADSR(2,0.2,0.5,0.01)
		env2.setRange(0.25,0);
		osc21.amp(env2);

		env3 = new p5.Envelope;
		env3.setADSR(2,0.2,0.5,0.01)
		env3.setRange(0.25,0);
		osc31.amp(env3);

		atk = 1
		dec = 1
		initAtk = 1
		initDec = 1

		del1.process(osc11,random(0.75),random(0.5),500)
		del2.process(osc21,random(0.75),random(0.5),500)
		del3.process(osc31,random(0.75),random(0.5),500)

		del1.disconnect()
		del2.disconnect()
		del3.disconnect()
		filt1.disconnect()
		filt2.disconnect()
		filt3.disconnect()
		del1.connect(parMaster)
		del2.connect(parMaster)
		del3.connect(parMaster)
		filt1.connect(parMaster)
		filt2.connect(parMaster)
		filt3.connect(parMaster)
		parMaster.connect()
		parMaster.amp(0.25)
	}		
}