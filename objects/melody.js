//SIMPLE ORGANUM - ONE PATTERN IN TEN AND ALT WITH CHANGING motif

//randomise mod values, super fun
let osc1,osc2,osc3,osc4
let motDel
let motFilt
let motPart
let motEnv
let motVox
let motMaster
let motVerb
let oct
let orch = 0

let motif = [];//motif firmus - this should be the tune from nav

function melody(bpm,atk,del){

	oct = round(random(48,60))
	let mode = JSON.parse(sessionStorage.getItem("mode"))//getting mode from nav info
	let mel = JSON.parse(sessionStorage.getItem("melody"))//getting melody primitives from session (primitive = placeholder in array ie 0-7 which can be converted to any mode)

	for(i=0;i<mel.length;i++){ // creating motif by mapping melody primitive to stored mode (0,1,2 in mel = 0,2,4 ionian or 0,1,3 phrygian)
		let n = mel[i]
		motif[i] = mode[n] + oct
	}
	let motLen = motif.length

	motDel = new p5.Delay()
	motVox = new p5.Phrase("motif", motSeq, motif);
	motVerb = new p5.Reverb()

	motPart = new p5.Part();
	motPart.addPhrase(motVox);
	motPart.setBPM(bpm);

	params(atk,del)
	rhythm()

	this.startup = function(){
		userStartAudio();
		osc1.start();
		osc2.start()
	}

	function rhythm (){//adds rests into cantus
		for(i=0;i<motLen*2;i++){
			motif.splice(round(random(motLen-1)), 0, " ")
		}
		motPart.replaceSequence("motif",motif)
	}

	this.begin = function(){
		motPart.loop()
	}

	this.length = function(){
		return(motLen)
	}
	
	this.pedBPM = function(bpm){
		motPart.setBPM(bpm)
	}

	this.stop = function(src){
		motEnv.triggerRelease()	
		motPart.stop()
	}

	this.env = function(atk,del){
		motEnv.setADSR(atk,del,0.75,0.25)
	}

	this.sub = function(orchSub){
		orch = orchSub
	}

	this.oct = function(){
		for(i=0;i<motif.length;i++){
			if(motif[i] !== " "){
				motif[i] -= 12
			} else {
				motif[i] = motif[i]
			}
		}
	}

	function motSeq(time,note){
		if(orch === 0){
			if(note !== " "){
				let midiVal = midiToFreq(note);
				motEnv.play(osc1)
				motEnv.play(osc2)
				osc1.freq(midiVal*1.5);
				osc2.freq(midiVal);
			}
		}else if(orch === 1){
			if(note !== " "){
				let midiVal = midiToFreq(note);
				motEnv.play(osc1)
				motEnv.play(osc2)
				osc1.freq(midiVal*1.5);
				osc2.freq(midiVal);
				osc4.freq(midiVal*0.5);
			}
		}
	};

	
	function params(atk,del){ //feed this function values from localStorage
		motMaster = new p5.Gain()
		osc1 = new p5.Oscillator("sine");
		osc2 = new p5.Oscillator("triangle");
		osc3 = new p5.Oscillator("sawtooth");
		osc4 = new p5.Oscillator("square");

		motFilt = new p5.LowPass();

		osc1.disconnect();
		osc2.disconnect();
		osc3.disconnect();
		osc4.disconnect();

		osc1.freq(osc3)
		osc2.freq(osc3)
		osc4.freq(osc3)

		osc1.pan(-0.5)
		osc2.pan(0.5)

		osc3.amp(-150)
		osc3.freq(100)

		osc1.connect(motFilt);
		osc2.connect(motFilt);
		osc4.connect(motFilt);
		
		motFilt.freq(300);
		motFilt.res(25)
		motFilt.amp(0.5)
		motFilt.disconnect()

		motEnv = new p5.Envelope;
		motEnv.setADSR(atk,del,0.75,0.25)
		motEnv.setRange(0.25,0);
		osc1.amp(motEnv);
		osc2.amp(motEnv);
		osc4.amp(motEnv);

		let time = random(0.75)
		let fd = random(0.5)
		let df = random(200,1000)
		motDel.process(motFilt,time,fd,df)
		motDel.disconnect()

		motVerb.process(motFilt,1,1)
		motVerb.drywet(1)
		motVerb.disconnect()

		motFilt.connect(motMaster)
		motDel.connect(motMaster)
		motVerb.connect(motMaster)
		motMaster.connect()
		motMaster.amp(0.1)
	}
}