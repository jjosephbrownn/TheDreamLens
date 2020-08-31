

function stringQuartet(){

	let currFreq1;
	let currFreq2;
	let currFreq3;

	let voice1 = new p5.Oscillator("sawtooth")
	let voice2 = new p5.Oscillator("sawtooth")
	let voice3 = new p5.Oscillator("sawtooth")

	let mod1 = new p5.Oscillator("sine")
	let mod2 = new p5.Oscillator("sine")
	let mod3 = new p5.Oscillator("sine")
	mod1.disconnect()
	mod2.disconnect()
	mod3.disconnect()

	mod1.freq(50)
	mod2.freq(50)
	mod3.freq(50)

	mod1.amp(-100)
	mod2.amp(100)
	mod3.amp(100)

	voice1.freq(mod1)
	voice2.freq(mod2)
	voice3.freq(mod3)

	let env1 = new p5.Envelope();
	let env2 = new p5.Envelope();
	let env3 = new p5.Envelope();
	voice1.amp(env1)
	voice2.amp(env2)
	voice3.amp(env3)

	let filt1 = new p5.LowPass();
	let filt2 = new p5.LowPass();
	let filt3 = new p5.LowPass();
	voice1.disconnect()
	voice2.disconnect()
	voice3.disconnect()

	voice1.connect(filt1)
	voice2.connect(filt2)
	voice3.connect(filt3)
	filt1.disconnect()
	filt2.disconnect()
	filt3.disconnect()

	voice1.pan(-1)
	voice2.pan(0)
	voice3.pan(1)

	// let del1 = new p5.Delay();
	// let del2 = new p5.Delay();
	// let del3 = new p5.Delay();

	// del1.process(filt1,0.1,0.1,500)
	// del2.process(filt2,0.1,0.1,500)
	// del3.process(filt3,0.1,0.1,500)	

	let master = new p5.Gain()
	master.connect()
	filt1.connect(master)
	filt2.connect(master)
	filt3.connect(master)
	master.amp(0.15)


	this.begin = function(){
		voice1.start()
		voice2.start()
		voice3.start()	
	}

	this.stop = function(){
		env1.triggerRelease(voice1)
		env2.triggerRelease(voice2)
		env3.triggerRelease(voice3)
	}

	this.play1 = function(f,fil){
		currFreq1 = f
		f = midiToFreq(f)
		voice1.freq(f);
		env1.triggerAttack(voice1)	
		filt1.freq(fil);
	}

	this.play2 = function(f,fil){
		currFreq2 = f
		env2.triggerRelease(voice2)		
		f = midiToFreq(f)
		voice2.freq(f);
		env2.triggerAttack(voice2)	
		filt2.freq(fil);
	}
	
	this.play3 = function(f,fil){
		currFreq3 = f
		env3.triggerRelease(voice3)		
		f = midiToFreq(f)
		voice3.freq(f);
		env3.triggerAttack(voice3)	
		filt3.freq(fil);
	}

	this.getFreq1 = function(){
		return(currFreq1)
	}
	this.getFreq2 = function(){
		return(currFreq2)
	}
	this.getFreq3 = function(){
		return(currFreq3)
	}


	this.adsr = function(a,d,s,r){
		env1.setADSR(a,d,s,r)
		env2.setADSR(a,d,s,r)
		env3.setADSR(a,d,s,r)
	}

	this.paramChange = function(atk,dec){
		env1.setADSR(atk,dec,0.25,0.25)
		env2.setADSR(atk,dec,0.25,0.25)
		env3.setADSR(atk,dec,0.25,0.25)
	}

	this.range = function(lvl1,lvl2){
		env1.setRange(lvl1,lvl2)
		env2.setRange(lvl1,lvl2)
		env3.setRange(lvl1,lvl2)
	}

	this.filter = function(f){
		filt1.freq(f);
		filt2.freq(f);
		filt3.freq(f);
	}

	this.res = function(q){
		filt1.res(q);
		filt2.res(q);
		filt3.res(q);
	}

	// this.amMod = function(f1,f2,f3,d1,d2,d3){
	// 	am1.freq(f1)
	// 	am2.freq(f2)
	// 	am3.freq(f3)

	// }

	this.delay = function(src,time,fdbk){
		if(src === 0){
			del1.process(filt1,time,fdbk,500);
		} else if(src === 1){
			del2.process(filt2,time,fdbk,500);
		} else if(src === 2){
			del3.process(filt3,time,fdbk,500);
		}
	}

	this.preset = function(){}
		env1.setADSR(2,6,0.5,2)
		env1.setRange(0.25,0)	
		filt1.res(0.5);
	
		
		env2.setADSR(2,6,0.5,2)
		env2.setRange(0.25,0)
		filt2.res(0.5);
	
		
		env3.setADSR(2,6,0.5,2)
		env3.setRange(0.25,0)	
		filt3.res(0.5);
	
}
