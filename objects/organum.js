 //SIMPLE ORGANUM - ONE PATTERN IN TEN AND ALT WITH CHANGING CANTUS

//randomise mod values, super fun
let osc11,osc21,osc31;//oscs
let osc12,osc22,osc32;//oscs
let mod1,mod2,mod3
let filt1,filt2,filt3;//


let voice1,voice2,voice3;//phrase
let env1,env2,env3;//envelopes
let tenor,disc,ped,altPed;//parts
let del1,del2,del3
let filtEnv1,filtEnv2,filtEnv3
let dec,atk

let cantPos = 0

let bpms = []

let ten = [];//top voice
let alt = [];//counter voice
let cantus = [];//cantus firmus - this should be the tune from nav
let origTen = []
let origAlt = []

let memory = 0;
let altModes = [ //melodic minor modes
	[0,2,3,5,7,9,11,12],
	[0,1,3,5,7,9,10,12],
	[0,2,4,6,8,9,11,12],
	[0,2,4,6,7,9,10,12],
	[0,2,4,5,7,8,10,12],
	[0,2,3,5,6,8,10,12],
	[0,1,3,4,6,8,10,12],
]

function organa(bpm,plus,param){

	let len = 4;//make random or something
	let oct = plus

	let mode = JSON.parse(sessionStorage.getItem("mode"))//getting mode from nav info
	let mel = JSON.parse(sessionStorage.getItem("melody"))//getting melody primitives from session (primitive = placeholder in array ie 0-7 which can be converted to any mode)

	for(i=0;i<mel.length;i++){ // creating cantus by mapping melody primitive to stored mode (0,1,2 in mel = 0,2,4 ionian or 0,1,3 phrygian)
		let n = mel[i]
		cantus[i] = mode[n] + oct
	}
	let cant = cantus.length

	let altCantOns = []
	for(i=0;i<cant;i++){
		altCantOns[i] = random([0,1])
	}

	let pace = bpm
	bpms[0] = pace
	bpms[1] = pace/4
	bpms[2] = pace*1.5

	del1 = new p5.Delay()
	del2 = new p5.Delay()
	del3 = new p5.Delay()

	voice1 = new p5.Phrase("tenor", seq1, ten);
	voice2 = new p5.Phrase("alt", seq2, alt);
	voice3 = new p5.Phrase("cant", seq3, cantus);
	voice4 = new p5.Phrase("altCant", seq4, altCantOns);	

	tenor = new p5.Part();
	tenor.addPhrase(voice1);
	tenor.setBPM(pace);

	disc = new p5.Part();
	disc.addPhrase(voice2);
	disc.setBPM(pace);

	ped = new p5.Part();
	ped.addPhrase(voice3);
	ped.setBPM(pace/8);

	altPed = new p5.Part();//plays single note of cantus until pos is incremented
	altPed.addPhrase(voice4);
	altPed.setBPM(pace);

	params(param)

	this.startup = function(){
		userStartAudio();
		osc11.start();
		osc21.start();
		osc31.start()
		osc12.start();
		osc22.start();
		osc32.start()
		mod1.start()
		mod2.start()
		mod3.start()
	}

	this.begin = function(){
		ped.loop()
	}

	this.altBegin = function(){
		altPed.loop()
	}

	this.cantusPos = function(newPos){
		cantPos = newPos
	}

	this.cantLen = function(){
		return(cant-1)
	}

	this.voiceLen = function(){
		return(ten.length-1)
	}
	
	this.pedBPM = function(bpm){
		ped.setBPM(bpm)
	}

	this.modeChange = function(){
		let r = round(random(altModes.length-1))
		let newMode = altModes[r]
		for(i=0;i<mel.length;i++){
			let n = mel[i]
			cantus[i] = newMode[n] + oct
		}
		ped.replaceSequence("cant",cantus)
	}

	this.nextNote = function(src,pos){
		if(src === 0){
			let midiVal = midiToFreq(cantus[pos]);
			env3.play(osc31);
			env3.play(osc32);
			filtEnv3.play();
			osc31.freq(midiVal);
			osc32.freq(midiVal);
		}else if(src === 1){
			let midiVal = midiToFreq(ten[pos]);
			env1.play(osc11);
			env1.play(osc12);
			filtEnv1.play()
			osc11.freq(midiVal);
			osc12.freq(midiVal);
		}else if(src === 2){
			let midiVal = midiToFreq(alt[pos]);
			env2.play(osc21);
			env2.play(osc22);
			filtEnv2.play()
			osc21.freq(midiVal);
			osc22.freq(midiVal);
		}
		
	}

	this.chord = function(src,pos){
		if(src === 0){
			let midiVal = midiToFreq(cantus[pos]);
			env3.play(osc31);
			filtEnv3.play();
			osc31.freq(midiVal);
			osc32.freq(midiVal*2);
		}else if(src === 1){
			let midiVal = midiToFreq(cantus[round(random(cantus.length-1))]);
			env1.play(osc11);
			filtEnv1.play();
			osc11.freq(midiVal);
			osc12.freq(midiVal*2.5);
		}else if(src === 2){
			let midiVal = midiToFreq(cantus[round(random(cantus.length-1))]);
			env2.play(osc21);
			filtEnv2.play();
			osc21.freq(midiVal);
			osc22.freq(midiVal*2.5);
		}
	}

	this.altSeq = function(){
		tenor.replaceSequence("tenor", origTen)
		disc.replaceSequence("alt", origAlt)
	}

	this.chordPlay = function(){
		ped.loop()
		tenor.loop()
		disc.loop()
	}

	this.chordStop = function(){
		ped.pause()
		tenor.pause()
		disc.pause()
	}

	this.voices = function(src,onoff){
		if(src === 0){
			if(onoff === 0){
				tenor.stop()
			} else if(onoff === 1){
				tenor.loop()
				tenor.setBPM(bpms[round(random()*2)])
			}
		} else if(src ===1){
			if(onoff === 0){
				disc.stop()
			} else if(onoff === 1){
				disc.loop()
				disc.setBPM(bpms[round(random()*2)])
			}
		}
	}

	this.stop = function(src){
		if(src === 0){
			env1.triggerRelease()
			tenor.stop()
		} else if(src ===1){
			env2.triggerRelease()
			disc.stop()
		} else if(src === 2){
			env3.triggerRelease()
			ped.stop()
		}else if(src === 3){
			env3.triggerRelease()
			altPed.stop()
		}
	}

	this.octSimp = function(src,oct){
		if(src === 0){
			if(oct === 0){
				for(i=0;i<ten.length-1;i++){
					if(ten[i] !== " "){
						ten[i] -=12
					}
				}
			} else if(oct === 1){
				return null
			}else if(oct === 2){
				for(i=0;i<ten.length-1;i++){
					if(ten[i] !== " "){
						ten[i] +=12
					}
				}
			}
			tenor.replaceSequence("tenor", ten)
	 	
		}else if(src === 1){
			if(oct === 0){
				for(i=0;i<alt.length-1;i++){
					if(alt[i] !== " "){
						alt[i] -=12
					}
				}
			} else if(oct === 1){
				return null
			}else if(oct === 2){
				for(i=0;i<alt.length-1;i++){
					if(alt[i] !== " "){
						alt[i] +=12
					}
				}
			}
			disc.replaceSequence("alt", alt)
		}
	}

	this.octave = function(src,oct){
		if(src === 0){
			for(i=0;i<ten.length-1;i++){
				if(ten[i] === " "){
					return null
				} else {
				ten[i] += oct
				}
			}
		} else if(src === 1){
			for(i=0;i<disc.length-1;i++){
				if(disc[i] === " "){
					return null
				} else {
					disc[i] += oct
				}
			} 
		}
	}

	this.orgPan = function(src,p){
		if(src === 0){
			osc11.pan(p)
			osc12.pan(p)
		} else if(src ===1){
			osc21.pan(p)
			osc22.pan(p)
		}
	}

	this.floral = function(){
		for(i=0;i<cant;i++){//chooses notes from cantus
			let tenNote = cantus[Math.floor(Math.random()*cant)]+12;
			let altNote = cantus[Math.floor(Math.random()*cant)]+12;
			ten[i] = tenNote
			alt[i] = altNote
			origTen[i] = tenNote
			origAlt[i] = altNote
		};

		for(i=0;i<cant/2;i++){//adds spaces
	 		ten.push(" ");
	 		alt.push(" ");
	 	}

	 	for (let i = ten.length - 1; i > 0; i--) {//shuffle it up dude
	    	let j = Math.floor(Math.random() * (i + 1));
	    	let k = Math.floor(Math.random() * (i + 1));   
	    	[ten[i], ten[j]] = [ten[j], ten[i]];
	    	[alt[i], alt[k]] = [alt[k], alt[i]];
	 	}
	 	tenor.replaceSequence("tenor", ten)
	 	disc.replaceSequence("alt", alt)
	}

	this.paramChange = function(atk,dec,filt){
		env1.setADSR(atk,dec,0.25,0.2)
		env2.setADSR(atk,dec,0.25,0.2)
		env3.setADSR(atk,dec,0.25,0.2)
		filt1.freq(filt);
		filt2.freq(filt);
		filt3.freq(filt);
	}

	this.envChange = function(newDec){
	    env1.setADSR(atk,newDec,0.25,1)
	    env2.setADSR(atk,newDec,0.25,1)
	    env3.setADSR(atk,newDec,0.25,1)
	    filtEnv1.setADSR(atk,newDec,0.25,1)
	    filtEnv2.setADSR(atk,newDec,0.25,1)
	    filtEnv3.setADSR(atk,newDec,0.25,1)
	    dec = newDec
  	}

	this.freqChange = function(newFreq){
	    filtEnv1.setRange(newFreq,0)
	    filtEnv2.setRange(newFreq,0)
	    filtEnv3.setRange(newFreq,0)
	}

    this.swell = function(newAtk){
	    env1.setADSR(newAtk,dec,0.25,1)
	    env2.setADSR(newAtk,dec,0.25,1)
	    env3.setADSR(newAtk,dec,0.25,1)
	    filtEnv1.setADSR(newAtk,dec,0.25,1)
	    filtEnv2.setADSR(newAtk,dec,0.25,1)
	    filtEnv3.setADSR(newAtk,dec,0.25,1)
	    atk = newAtk
    }

	function seq1(time,note){
		if(note !== " "){
			let midiVal = midiToFreq(note);
			filtEnv1.triggerAttack()
			env1.triggerAttack(osc11);
			env1.triggerAttack(osc12);
			osc11.freq(midiVal);
			osc12.freq(midiVal);
		}
	};

	function seq2(time,note){
		if(note !== " "){
			let midiVal = midiToFreq(note);
			filtEnv2.triggerAttack()
			env2.triggerAttack(osc21);
			env2.triggerAttack(osc22);
			osc21.freq(midiVal);
			osc22.freq(midiVal);
		}
	};

	function seq3(time,note){
		let midiVal = midiToFreq(note);
		filtEnv3.triggerAttack()
		env3.triggerAttack(osc31);
		env3.triggerAttack(osc32);
		osc31.freq(midiVal);
		osc32.freq(midiVal);
	};

	function seq4(time,note){
		let midiVal = midiToFreq(cantus[cantPos]);
		filtEnv3.play()
		env3.play(osc31);
		env3.play(osc32);
		osc31.freq(midiVal);
		osc32.freq(midiVal);
	};

	function params(src){ //feed this function values from localStorage
		if(src === 0){
			osc11 = new p5.Oscillator("sine");
			osc21 = new p5.Oscillator("sine");
			osc31 = new p5.Oscillator("sine");
			osc12 = new p5.Oscillator("sawtooth");
			osc22 = new p5.Oscillator("sawtooth");
			osc32 = new p5.Oscillator("sawtooth");

			mod1 = new p5.Oscillator("square");
			mod2 = new p5.Oscillator("square");
			mod3 = new p5.Oscillator("square");

			mod1.disconnect();
			mod2.disconnect();
			mod3.disconnect();

			osc11.freq(mod1);
			osc12.freq(mod1);
			osc21.freq(mod2);
			osc22.freq(mod2);
			osc31.freq(mod3);	
			osc32.freq(mod3);

			filt1 = new p5.LowPass();
			filt2 = new p5.LowPass();
			filt3 = new p5.LowPass();

			osc11.disconnect();
			osc21.disconnect();
			osc31.disconnect();
			osc12.disconnect();
			osc22.disconnect();
			osc32.disconnect();

			osc11.connect(filt1);
			osc21.connect(filt1);
			osc31.connect(filt2);
			osc12.connect(filt2);
			osc22.connect(filt3);
			osc32.connect(filt3);

			osc11.pan(-0.75);
			osc12.pan(-0.75);
			osc21.pan(0.75);
			osc22.pan(0.75);	
			
			filt1.freq(750);
			filt2.freq(750);
			filt3.freq(250);
			filt3.res(10)

			env1 = new p5.Envelope;
			env1.setADSR(1,2,0.25)
			env1.setRange(0.25,0);
			osc11.amp(env1);
			osc12.amp(env1);

			env2 = new p5.Envelope;
			env2.setADSR(1,2,0.25)
			env2.setRange(0.25,0);
			osc21.amp(env2);
			osc22.amp(env2);

			env3 = new p5.Envelope;
			env3.setADSR(2,4,0.25)
			env3.setRange(0.25,0);
			osc31.amp(env3);
			osc32.amp(env3);

			filtEnv1 = new p5.Envelope;
			filtEnv1.setADSR(0.001,0.1,0.25,0.1)
			filtEnv1.setRange(2000,0);
			filt1.freq(filtEnv1);
			filt1.freq(filtEnv1);
			
			filtEnv2 = new p5.Envelope;
			filtEnv2.setADSR(0.001,0.1,0.25,0.1)
			filtEnv2.setRange(2000,0);
			filt2.freq(filtEnv2);
			filt2.freq(filtEnv2);
			
			filtEnv3 = new p5.Envelope;
			filtEnv3.setADSR(0.001,0.1,0.25,0.1)
			filtEnv3.setRange(2000,0);
			filt3.freq(filtEnv3);
			filt3.freq(filtEnv3);
			let orgMaster = new p5.Gain()
			orgMaster.connect()
			filt1.disconnect()
			filt2.disconnect()
			filt3.disconnect()
			filt1.connect(orgMaster)
			filt2.connect(orgMaster)
			filt3.connect(orgMaster)
			orgMaster.amp(0.25)

		} else if(src === 1){
			osc11 = new p5.Oscillator("sine");
			osc21 = new p5.Oscillator("sine");
			osc31 = new p5.Oscillator("sine");
			osc12 = new p5.Oscillator("square");
			osc22 = new p5.Oscillator("square");
			osc32 = new p5.Oscillator("square");

			mod1 = new p5.Oscillator("square");
			mod2 = new p5.Oscillator("square");
			mod3 = new p5.Oscillator("square");

			mod1.disconnect();
			mod2.disconnect();
			mod3.disconnect();

			osc11.freq(mod1);
			osc12.freq(mod1);
			osc21.freq(mod2);
			osc22.freq(mod2);
			osc31.freq(mod3);	
			osc32.freq(mod3);

			filt1 = new p5.LowPass();
			filt2 = new p5.LowPass();
			filt3 = new p5.LowPass();

			osc11.disconnect();
			osc21.disconnect();
			osc31.disconnect();
			osc12.disconnect();
			osc22.disconnect();
			osc32.disconnect();

			osc11.connect(filt1);
			osc21.connect(filt1);
			osc31.connect(filt2);
			osc12.connect(filt2);
			osc22.connect(filt3);
			osc32.connect(filt3);

			osc11.pan(-0.75);
			osc12.pan(-0.75);
			osc21.pan(0.75);
			osc22.pan(0.75);
		
			mod1.freq(100);
			mod2.freq(100);
			mod3.freq(100);
			mod1.amp(-1);
			mod2.amp(-1);
			mod3.amp(-1);
			
			filt1.freq(1000);
			filt2.freq(1000);
			filt3.freq(1000);
			filt1.res(1);
			filt2.res(1);
			filt3.res(1);

			env1 = new p5.Envelope;
			env1.setADSR(0.01,0.2,0.25)
			env1.setRange(0.25,0);
			osc11.amp(env1);
			osc12.amp(env1);

			env2 = new p5.Envelope;
			env2.setADSR(0.01,0.2,0.25)
			env2.setRange(0.25,0);
			osc21.amp(env2);
			osc22.amp(env2);

			env3 = new p5.Envelope;
			env3.setADSR(0.01,0.2,0.25)
			env3.setRange(0.25,0);
			osc31.amp(env3);
			osc32.amp(env3);

			filtEnv1 = new p5.Envelope;
			filtEnv1.setADSR(0.001,0.1,0.25,0.1)
			filtEnv1.setRange(2000,0);
			filt1.freq(filtEnv1);
			filt1.freq(filtEnv1);
			
			filtEnv2 = new p5.Envelope;
			filtEnv2.setADSR(0.001,0.1,0.25,0.1)
			filtEnv2.setRange(2000,0);
			filt2.freq(filtEnv2);
			filt2.freq(filtEnv2);
			
			filtEnv3 = new p5.Envelope;
			filtEnv3.setADSR(0.001,0.1,0.25,0.1)
			filtEnv3.setRange(2000,0);
			filt3.freq(filtEnv3);
			filt3.freq(filtEnv3);

			del1.process(osc12,random(0.25),random(0.5),1000)
			del2.process(osc22,random(0.25),random(0.5),1000)
			del3.process(osc32,random(0.25),random(0.5),1000)

			let orgMaster = new p5.Gain()
			orgMaster.connect()
			filt1.disconnect()
			filt2.disconnect()
			filt3.disconnect()
			filt1.connect(orgMaster)
			filt2.connect(orgMaster)
			filt3.connect(orgMaster)
			orgMaster.amp(0.25)

		} else if(src === 2){
			osc11 = new p5.Oscillator("sine");
			osc21 = new p5.Oscillator("sine");
			osc31 = new p5.Oscillator("square");
			osc12 = new p5.Oscillator("triangle");
			osc22 = new p5.Oscillator("triangle");
			osc32 = new p5.Oscillator("triangle");

			mod1 = new p5.Oscillator("sine");
			mod2 = new p5.Oscillator("sine");
			mod3 = new p5.Oscillator("sine");

			let del1 = new p5.Delay()
			let del2 = new p5.Delay()
			let del3 = new p5.Delay()

			mod1.disconnect();
			mod2.disconnect();
			mod3.disconnect();

			osc11.freq(mod1);
			osc12.freq(mod1);
			osc21.freq(mod2);
			osc22.freq(mod2);
			osc31.freq(mod3);	
			osc32.freq(mod3);

			filt1 = new p5.LowPass();
			filt2 = new p5.LowPass();
			filt3 = new p5.LowPass();

			osc11.disconnect();
			osc21.disconnect();
			osc31.disconnect();
			osc12.disconnect();
			osc22.disconnect();
			osc32.disconnect();

			osc11.connect(filt1);
			osc21.connect(filt1);
			osc31.connect(filt2);
			osc12.connect(filt2);
			osc22.connect(filt3);
			osc32.connect(filt3);

			osc11.pan(-0.75);
			osc12.pan(-0.75);
			osc21.pan(0.75);
			osc22.pan(0.75);	

			mod1.freq(2);
			mod2.freq(2);
			mod3.freq(200);
			mod1.amp(0.75);
			mod2.amp(0.75);
			mod3.amp(1);
			
			filt1.freq(500);
			filt2.freq(500);
			filt3.freq(100);
			filt1.res(50);
			filt2.res(50);
			filt3.res(1)

			env1 = new p5.Envelope;
			env1.setADSR(0.001,2,0.25,1)
			env1.setRange(0.25,0);
			osc11.amp(env1);
			osc12.amp(env1);

			env2 = new p5.Envelope;
			env2.setADSR(1,0.5,0.25)
			env2.setRange(0.25,0);
			osc21.amp(env2);
			osc22.amp(env2);

			env3 = new p5.Envelope;
			env3.setADSR(1,2,0.25)
			env3.setRange(0.15,0);
			osc31.amp(env3);
			osc32.amp(env3);

			filtEnv1 = new p5.Envelope;
			filtEnv1.setADSR(0.001,0.1,0.25,0.1)
			filtEnv1.setRange(2000,0);
			filt1.freq(filtEnv1);
			filt1.freq(filtEnv1);
			
			filtEnv2 = new p5.Envelope;
			filtEnv2.setADSR(0.001,0.1,0.25,0.1)
			filtEnv2.setRange(2000,0);
			filt2.freq(filtEnv2);
			filt2.freq(filtEnv2);
			
			filtEnv3 = new p5.Envelope;
			filtEnv3.setADSR(0.001,0.1,0.25,0.1)
			filtEnv3.setRange(2000,0);
			filt3.freq(filtEnv3);
			filt3.freq(filtEnv3);

			del1.process(filt1,random(0.75,1),random(0.5),2000)
			del2.process(filt2,random(0.75,1),random(0.5),2000)
			del3.process(filt3,random(0.75,1),random(0.5),500)

			let orgMaster = new p5.Gain()
			orgMaster.connect()
			filt1.disconnect()
			filt2.disconnect()
			filt3.disconnect()
			filt1.connect(orgMaster)
			filt2.connect(orgMaster)
			filt3.connect(orgMaster)
			orgMaster.amp(0.25)
		
		}else if(src === 3){
			osc11 = new p5.Oscillator("sawtooth");
			osc21 = new p5.Oscillator("triangle");
			osc31 = new p5.Oscillator("sawtooth");
			osc12 = new p5.Oscillator("triangle");
			osc22 = new p5.Oscillator("square");
			osc32 = new p5.Oscillator("sawtooth");

			mod1 = new p5.Oscillator("sawtooth");
			mod2 = new p5.Oscillator("sawtooth");
			mod3 = new p5.Oscillator("sawtooth");

			let del1 = new p5.Delay()
			let del2 = new p5.Delay()
			let del3 = new p5.Delay()

			mod1.disconnect();
			mod2.disconnect();
			mod3.disconnect();

			osc11.freq(mod1);
			osc12.freq(mod1);
			osc21.freq(mod2);
			osc22.freq(mod2);
			osc31.freq(mod3);	
			osc32.freq(mod3);

			filt1 = new p5.LowPass();
			filt2 = new p5.LowPass();
			filt3 = new p5.LowPass();

			osc11.disconnect();
			osc21.disconnect();
			osc31.disconnect();
			osc12.disconnect();
			osc22.disconnect();
			osc32.disconnect();

			osc11.connect(filt1);
			osc21.connect(filt1);
			osc31.connect(filt2);
			osc12.connect(filt2);
			osc22.connect(filt3);
			osc32.connect(filt3);

			osc11.pan(-0.75);
			osc12.pan(-0.75);
			osc21.pan(0.75);
			osc22.pan(0.75);	

			mod1.freq(50);
			mod2.freq(50);
			mod3.freq(200);
			mod1.amp(10);
			mod2.amp(10);
			mod3.amp(-10);
			
			filt1.res(5);
			filt2.res(5);
			filt3.res(10)

			env1 = new p5.Envelope;
			env1.setADSR(0.001,0.1,0,0.1)
			env1.setRange(0.25,0);
			osc11.amp(env1);
			osc12.amp(env1);

			env2 = new p5.Envelope;
			env2.setADSR(0.001,0.1,0,0.1)
			env2.setRange(0.25,0);
			osc21.amp(env2);
			osc22.amp(env2);

			env3 = new p5.Envelope;
			env3.setADSR(0.001,0.1,0,0.1)
			env3.setRange(0.25,0);
			osc31.amp(env3);
			osc32.amp(env3);

			filtEnv1 = new p5.Envelope;
			filtEnv1.setADSR(0.001,0.1,0,0.1)
			filtEnv1.setRange(2000,0);
			filt1.freq(filtEnv1);
			filt1.freq(filtEnv1);
			
			filtEnv2 = new p5.Envelope;
			filtEnv2.setADSR(0.001,0.1,0,0.1)
			filtEnv2.setRange(2000,0);
			filt2.freq(filtEnv2);
			filt2.freq(filtEnv2);
			
			filtEnv3 = new p5.Envelope;
			filtEnv3.setADSR(0.001,0.1,0,0.1)
			filtEnv3.setRange(2000,0);
			filt3.freq(filtEnv3);
			filt3.freq(filtEnv3);

			del1.process(filt1,random(0.75,1),random(0.5),2000)
			del2.process(filt2,random(0.75,1),random(0.5),2000)
			del3.process(filt3,random(0.75,1),random(0.5),500)

			let orgMaster = new p5.Gain()
			orgMaster.connect()
			filt1.disconnect()
			filt2.disconnect()
			filt3.disconnect()
			filt1.connect(orgMaster)
			filt2.connect(orgMaster)
			filt3.connect(orgMaster)
			orgMaster.amp(0.25)
		
		}else if(src === 4){
			osc11 = new p5.Oscillator("sawtooth")
			osc21 = new p5.Oscillator("square")
			osc31 = new p5.Oscillator("sawtooth")
			osc12 = new p5.Oscillator("square")
			osc22 = new p5.Oscillator("sawtooth")
			osc32 = new p5.Oscillator("square")

			mod1 = new p5.Oscillator("square");
			mod2 = new p5.Oscillator("square");
			mod3 = new p5.Oscillator("square");

			mod1.disconnect();
			mod2.disconnect();
			mod3.disconnect();

			osc11.freq(mod1);
			osc12.freq(mod1);
			osc21.freq(mod2);
			osc22.freq(mod2);
			osc31.freq(mod3);	
			osc32.freq(mod3);

			filt1 = new p5.LowPass();
			filt2 = new p5.LowPass();
			filt3 = new p5.LowPass();

			osc11.disconnect();
			osc21.disconnect();
			osc31.disconnect();
			osc12.disconnect();
			osc22.disconnect();
			osc32.disconnect();

			osc11.connect(filt1);
			osc21.connect(filt1);
			osc31.connect(filt2);
			osc12.connect(filt2);
			osc22.connect(filt3);
			osc32.connect(filt3);

			osc11.pan(-0.75);
			osc12.pan(-0.75);
			osc21.pan(0.75);
			osc22.pan(0.75);	

			mod1.freq(2000);
			mod2.freq(2000);
			mod3.freq(2000);
			mod1.amp(100);
			mod2.amp(100);
			mod3.amp(100);

			env1 = new p5.Envelope;
			env1.setADSR(0.001,0.25,0.25,0.1)
			env1.setRange(0.25,0);
			osc11.amp(env1);
			osc12.amp(env1);

			env2 = new p5.Envelope;
			env2.setADSR(0.001,0.25,0.25,0.1)
			env2.setRange(0.25,0);
			osc21.amp(env2);
			osc22.amp(env2);

			env3 = new p5.Envelope;
			env3.setADSR(0.001,0.25,0.25,0.1)
			env3.setRange(0.15,0);
			osc31.amp(env3);
			osc32.amp(env3);

			filtEnv1 = new p5.Envelope;
			filtEnv1.setADSR(0.001,0.25,0.25,0.1)
			filtEnv1.setRange(1000,0);
			filt1.freq(filtEnv1);
			
			filtEnv2 = new p5.Envelope;
			filtEnv2.setADSR(0.001,0.25,0.25,0.1)
			filtEnv2.setRange(1000,0);
			filt2.freq(filtEnv2);
			
			filtEnv3 = new p5.Envelope;
			filtEnv3.setADSR(0.001,0.25,0.25,0.1)
			filtEnv3.setRange(1000,0);
			filt3.freq(filtEnv3);

			let del1 = new p5.Delay()
			let del2 = new p5.Delay()
			let del3 = new p5.Delay()

			del1.process(filt1,random(0.75,1),random(0.5),2000)
			del2.process(filt2,random(0.75,1),random(0.5),2000)
			del3.process(filt3,random(0.75,1),random(0.5),500)

			let orgMaster = new p5.Gain()
			orgMaster.connect()
			del1.disconnect()
			del2.disconnect()
			del3.disconnect()
			filt1.disconnect()
			filt2.disconnect()
			filt3.disconnect()
			del1.connect(orgMaster)
			del2.connect(orgMaster)
			del3.connect(orgMaster)
			filt1.connect(orgMaster)
			filt2.connect(orgMaster)
			filt3.connect(orgMaster)
			orgMaster.amp(0.25)

			atk = 0.001
			dec = 0.25
		}
	}
}