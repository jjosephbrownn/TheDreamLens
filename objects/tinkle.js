 //SIMPLE ORGANUM - ONE PATTERN IN TEN AND ALT WITH CHANGING tinkMel

//randomise mod values, super fun
let tinkOsc1,tinkOsc2,tinkOsc3;//oscs
let tinkOsc4,tinkOsc5,tinkOsc6;//oscs
let tinkFilt1,tinkFilt2,tinkFilt3;//

let tinkEnv1,tinkEnv2,tinkEnv3;//tinkEnvelopes
let tinkDel1,tinkDel2,tinkDel3

let tink1
let tink2
let tink3
let tinkPart1
let tinkPart2
let tinkPart3

let tinkPat1 = []
let tinkPat2 = []
let tinkPat3 = []
let tinkMel = []
function tink(bpm){

	let len = 4;//make random or something
	let pace = bpm

	let mode = JSON.parse(sessionStorage.getItem("mode"))//getting mode from nav info
	let mel = JSON.parse(sessionStorage.getItem("melody"))//getting melody primitives from session (primitive = placeholder in array ie 0-7 which can be converted to any mode)

	for(i=0;i<mel.length;i++){ // creating tinkMel by mapping melody primitive to stored mode (0,1,2 in mel = 0,2,4 ionian or 0,1,3 phrygian)
		let n = mel[i]
		tinkMel[i] = mode[n] + 72
	}

	tinkDel1 = new p5.Delay()
	tinkDel2 = new p5.Delay()
	tinkDel3 = new p5.Delay()

	tink1 = new p5.Phrase("tink1", seq1, tinkPat1);
	tink2 = new p5.Phrase("tink2", seq2, tinkPat2);
	tink3 = new p5.Phrase("tink3", seq3, tinkPat3);

	tinkPart1 = new p5.Part();
	tinkPart1.addPhrase(tink1);
	tinkPart1.setBPM(pace);

	tinkPart2 = new p5.Part();
	tinkPart2.addPhrase(tink2);
	tinkPart2.setBPM(pace);

	tinkPart3 = new p5.Part();
	tinkPart3.addPhrase(tink3);
	tinkPart3.setBPM(pace/8);

	params()

	this.startup = function(){
		userStartAudio();
		tinkOsc1.start();
		tinkOsc2.start();
		tinkOsc3.start()
		tinkOsc4.start();
		tinkOsc5.start();
		tinkOsc6.start()
		mod1.start()
		mod2.start()
		mod3.start()
	}

	this.patterns = function(){
		for(i=0;i<48;i++){
			tinkPat1[i] = random([0,1])
			tinkPat2[i] = random([0,1])
			tinkPat3[i] = random([0,1])
		}
		tinkPart1.replaceSequence("tink1", tinkPat1)
		tinkPart2.replaceSequence("tink2", tinkPat2)
		tinkPart3.replaceSequence("tink3", tinkPat3)
	}

	this.begin = function(){
		tinkPart1.loop()
		tinkPart2.loop()
		tinkPart3.loop()
	}

	this.stop = function(){
		tinkPart1.stop()
		tinkPart2.stop()
		tinkPart3.stop()
	}

	function seq1(time,note){
		let midiVal = midiToFreq(tinkMel[round(random(tinkMel.length-1))]);
		tinkEnv1.play(tinkOsc1);
		tinkEnv1.play(tinkOsc4);
		tinkOsc1.freq(midiVal);
		tinkOsc4.freq(midiVal);
		
	};

	function seq2(time,note){
		let midiVal = midiToFreq(tinkMel[round(random(tinkMel.length-1))]);
		tinkEnv2.play(tinkOsc2);
		tinkEnv2.play(tinkOsc5);
		tinkOsc2.freq(midiVal);
		tinkOsc5.freq(midiVal);

	};

	function seq3(time,note){
		let midiVal = midiToFreq(tinkMel[round(random(tinkMel.length-1))]);
		tinkEnv3.play(tinkOsc3);
		tinkEnv3.play(tinkOsc6);
		tinkOsc3.freq(midiVal);
		tinkOsc6.freq(midiVal);
	};


	function params(){ //feed this function values from localStorage

		tinkOsc1 = new p5.Oscillator("sawtooth");
		tinkOsc2 = new p5.Oscillator("sawtooth");
		tinkOsc3 = new p5.Oscillator("sawtooth");
		tinkOsc4 = new p5.Oscillator("square");
		tinkOsc5 = new p5.Oscillator("square");
		tinkOsc6 = new p5.Oscillator("square");

		tinkFilt1 = new p5.LowPass();
		tinkFilt2 = new p5.LowPass();
		tinkFilt3 = new p5.LowPass();

		tinkFilt1.freq(250)
		tinkFilt2.freq(250)
		tinkFilt3.freq(250)

		tinkOsc1.disconnect();
		tinkOsc2.disconnect();
		tinkOsc3.disconnect();
		tinkOsc4.disconnect();
		tinkOsc5.disconnect();
		tinkOsc6.disconnect();

		tinkOsc1.connect(tinkFilt1);
		tinkOsc2.connect(tinkFilt1);
		tinkOsc3.connect(tinkFilt2);
		tinkOsc4.connect(tinkFilt2);
		tinkOsc5.connect(tinkFilt3);
		tinkOsc6.connect(tinkFilt3);

		tinkOsc1.pan(-0.75);
		tinkOsc4.pan(-0.75);
		tinkOsc2.pan(0.75);
		tinkOsc5.pan(0.75);	

		tinkEnv1 = new p5.Envelope;
		tinkEnv1.setADSR(0.001,0.05,0.25,0.05)
		tinkEnv1.setRange(0.25,0);
		tinkOsc1.amp(tinkEnv1);
		tinkOsc4.amp(tinkEnv1);

		tinkEnv2 = new p5.Envelope;
		tinkEnv2.setADSR(0.001,0.05,0.25,0.05)
		tinkEnv2.setRange(0.25,0);
		tinkOsc2.amp(tinkEnv2);
		tinkOsc5.amp(tinkEnv2);

		tinkEnv3 = new p5.Envelope;
		tinkEnv3.setADSR(0.001,0.05,0.25,0.05)
		tinkEnv3.setRange(0.25,0);
		tinkOsc3.amp(tinkEnv3);
		tinkOsc6.amp(tinkEnv3);

		tinkDel1.process(tinkFilt1,random(0.9),random(0.5),random(500,2000))
		tinkDel1.process(tinkFilt2,random(0.9),random(0.5),random(500,2000))
		tinkDel1.process(tinkFilt3,random(0.9),random(0.5),random(500,2000))

		let tinkMaster = new p5.Gain()
		tinkMaster.connect()
		tinkFilt1.disconnect()
		tinkFilt2.disconnect()
		tinkFilt3.disconnect()
		tinkDel1.disconnect()
		tinkDel2.disconnect()
		tinkDel3.disconnect()
		tinkDel1.connect(tinkMaster)
		tinkDel2.connect(tinkMaster)
		tinkDel3.connect(tinkMaster)
		tinkFilt1.connect(tinkMaster)
		tinkFilt2.connect(tinkMaster)
		tinkFilt3.connect(tinkMaster)
		tinkMaster.amp(0.25)
	}
}