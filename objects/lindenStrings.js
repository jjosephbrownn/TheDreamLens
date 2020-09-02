function linden(loops,oct,atk,dec,param){

  let mode = JSON.parse(sessionStorage.getItem("mode"))//getting mode from nav info

  let oct1 = oct
  let oct2 = oct
  let oct3 = oct

  let innerPos = 0

  let initAtk = atk
  let initDec = dec
  let altAtk,altDec

  let currFreq1;
  let currFreq2;
  let currFreq3;

  let voice11 = new p5.Oscillator("square")
  let voice21 = new p5.Oscillator("square")
  let voice31 = new p5.Oscillator("square")
  let voice12 = new p5.Oscillator("square")
  let voice22 = new p5.Oscillator("square")
  let voice32 = new p5.Oscillator("square")

  let fm1 = new p5.Oscillator("sawtooth")
  let fm2 = new p5.Oscillator("sawtooth")
  let fm3 = new p5.Oscillator("sawtooth")

  fm1.disconnect()
  fm2.disconnect()
  fm3.disconnect()

  fm1.freq(20)
  fm2.freq(20)
  fm3.freq(20)

  fm1.amp(-50)
  fm2.amp(-50)
  fm3.amp(-50)

  let env1 = new p5.Envelope();
  let env2 = new p5.Envelope();
  let env3 = new p5.Envelope();
  voice11.amp(env1)
  voice21.amp(env2)
  voice31.amp(env3)
  voice12.amp(env1)
  voice22.amp(env2)
  voice32.amp(env3)

  voice11.freq(fm1)
  voice11.freq(fm2)
  voice11.freq(fm3)
  voice12.freq(fm1)
  voice12.freq(fm2)
  voice12.freq(fm3)

  let filt1 = new p5.LowPass();
  let filt2 = new p5.LowPass();
  let filt3 = new p5.LowPass();
  voice11.disconnect()
  voice21.disconnect()
  voice31.disconnect()
  voice12.disconnect()
  voice22.disconnect()
  voice32.disconnect()

  voice11.connect(filt1)
  voice21.connect(filt2)
  voice31.connect(filt3)
  voice12.connect(filt1)
  voice22.connect(filt2)
  voice32.connect(filt3)

  let del1 = new p5.Delay();
  let del2 = new p5.Delay();
  let del3 = new p5.Delay();

  del1.process(filt1,0.1,0.1,500)
  del2.process(filt2,0.1,0.1,500)
  del3.process(filt3,0.1,0.1,500) 

  let env1pat = [],env2pat = [],env3pat = []
  let filt1pat = [],filt2pat = [],filt3pat = []
  let del1pat = [],del2pat = [],del3pat = []
  let fdbk1pat = [],fdbk2pat = [],fdbk3pat = []
  let pan1pat = [],pan2pat = [],pan3pat = []


  // LINDENMAYER STUFF (L-SYSTEMS)
  let thestring = '1'; // "axiom" or start of the string
  let numloops = loops; // how many iterations to pre-compute
  let therules = []; // array for rules
  let stringMel = []
  therules[0] = ['1', '45']; // semi
  therules[1] = ['2', '76']; // tone
  therules[2] = ['5', '53']; // fourth
  therules[3] = ['7', '32']; // fifth
  therules[4] = ['3', '46']; // min third
  therules[5] = ['4', '17']; // maj third
  therules[6] = ['6', '32']; // maj third

  this.startUp = function(){
    for (let i = 0; i < numloops; i++) {
      thestring = lindenmayer(thestring);
    }
    stringConv()
  }

  // interpret an L-system
  function lindenmayer(s) {
    let outputstring = ''; // start a blank output string

    // iterate through 'therules' looking for symbol matches:
    for (let i = 0; i < s.length; i++) {
      let ismatch = 0; // by default, no match
      for (let j = 0; j < therules.length; j++) {
        if (s[i] == therules[j][0])  {
          outputstring += therules[j][1]; // write substitution
          ismatch = 1; // we have a match, so don't copy over symbol
          break; // get outta this for() loop
        }
      }
      // if nothing matches, just copy the symbol over.
      if (ismatch == 0) outputstring+= s[i];
    }

    return outputstring; // send out the modified string
  }

  function stringConv(){
    for(i=0;i<thestring.length;i++){
      stringMel[i] = parseInt(thestring[i], 10)
    }
    for(i=0;i<stringMel.length;i++){ // creating cantus by mapping melody primitive to stored mode (0,1,2 in mel = 0,2,4 ionian or 0,1,3 phrygian)
      let n = stringMel[i]
      stringMel[i] = mode[n]
    }
    params(param)
  }

  this.length = function(){
    return(stringMel.length)
  }


  this.chainer = function(pos){
    return(thestring[pos])  
  }


  this.begin = function(){
    voice11.start()
    voice21.start()
    voice31.start() 
    voice12.start()
    voice22.start()
    voice32.start()  
  }

  this.stop = function(){
    env1.triggerRelease()
    env2.triggerRelease()
    env3.triggerRelease()
  }

  this.nextNote = function(){
    let midiVal1 = midiToFreq(stringMel[round(random(stringMel.length-1))] + oct1)
    let midiVal2 = midiToFreq(stringMel[round(random(stringMel.length-1))] + oct2)
    let midiVal3 = midiToFreq(stringMel[round(random(stringMel.length-1))] + oct3)
    voice11.freq(midiVal1)
    voice12.freq(midiVal1*1.5)
    env1.play()
    voice21.freq(midiVal2)
    voice22.freq(midiVal2*1.5)
    env2.play()
    voice31.freq(midiVal2)
    voice32.freq(midiVal2*1.5)
    env3.play()
    innerPos++
    if(innerPos === stringMel.length-1){innerPos = 0}
  }

  this.play1 = function(pos,detune){

    let midiVal = midiToFreq(stringMel[pos]+oct1)
    filt1.freq(filt1pat[pos])
    del1.process(filt1, del1pat[pos], fdbk1pat[pos],750)
    del1.process(voice12, del1pat[pos], fdbk1pat[pos],750)
    voice11.pan(pan1pat[pos])
    voice12.pan(pan1pat[pos])
    voice11.freq(midiVal + detune)
    voice12.freq(midiVal + detune + midiVal/2)
    env1.play()
  }

  this.play2 = function(pos,detune){
    let midiVal = midiToFreq(stringMel[pos]+oct2)
    filt2.freq(filt2pat[pos])
    del2.process(voice21, del2pat[pos], fdbk2pat[pos],750)
    del2.process(voice22, del2pat[pos], fdbk2pat[pos],750)
    voice21.pan(pan2pat[pos])
    voice22.pan(pan2pat[pos])
    voice21.freq(midiVal + detune)
    voice22.freq(midiVal + detune + midiVal/2)
    env2.play()
  }
  
  this.play3 = function(pos,detune){
    let midiVal = midiToFreq(stringMel[pos]+oct3)
    del3.process(voice31, del3pat[pos], fdbk3pat[pos],750)
    del3.process(voice32, del3pat[pos], fdbk3pat[pos],750)
    voice31.pan(pan3pat[pos])
    voice32.pan(pan3pat[pos])
    voice31.freq(midiVal + detune)
    voice32.freq(midiVal + detune + midiVal/2)
    env3.play()
  }

  this.delay = function(src,delInc,fInc){
    if(src === 0){
      for(i=0;i<stringMel.length;i++)
        del1pat[i] = delInc
        fdbk1pat[i] = fInc
    } else if(src === 1){
       for(i=0;i<stringMel.length;i++)
        del2pat[i] = delInc
        fdbk2pat[i] = fInc
    } else if(src === 2){
       for(i=0;i<stringMel.length;i++)
        del2pat[i] = delInc
        fdbk2pat[i] = fInc
    }
  }

  function params(src){//src 0 = strings, src 1 = plucks
    if(src === 0){
      for(i=0;i<stringMel.length;i++){

      filt1pat[i] = random(100,250)
      del1pat[i] = random(0.9)
      fdbk1pat[i] = random(0.5)
      pan1pat[i] = random(-1,1)

      filt2pat[i] = random(100,250)
      del2pat[i] = random(0.9)
      fdbk2pat[i] = random(0.5)
      pan2pat[i] = random(-1,1)

      filt3pat[i] = random(100,250)
      del3pat[i] = random(0.9)
      fdbk3pat[i] = random(0.5)
      pan3pat[i] = random(-1,1)
      }
      env1.setADSR(atk,dec,0.25,1)
      env2.setADSR(atk,dec,0.25,1)
      env3.setADSR(atk,dec,0.25,1)
      env1.setRange(0.1,0)
      env2.setRange(0.1,0)
      env3.setRange(0.1,0)
    } else if (src === 1){
      for(i=0;i<stringMel.length;i++){

      filt1pat[i] = random(100,250)
      del1pat[i] = 0
      fdbk1pat[i] = 0
      pan1pat[i] = random(-1,1)

      filt2pat[i] = random(100,250)
      del2pat[i] = 0
      fdbk2pat[i] = 0
      pan2pat[i] = random(-1,1)

      filt3pat[i] = random(100,250)
      del3pat[i] = 0
      fdbk3pat[i] = 0
      pan3pat[i] = random(-1,1)
      }
      env1.setADSR(atk,dec,0.25,1)
      env2.setADSR(atk,dec,0.25,1)
      env3.setADSR(atk,dec,0.25,1)
      env1.setRange(0.1,0)
      env2.setRange(0.1,0)
      env3.setRange(0.1,0)
    }    
  }

  this.atkChange = function(newAtk){
    env1.setADSR(newAtk,dec,0.25,1)
    env2.setADSR(newAtk,dec,0.25,1)
    env3.setADSR(newAtk,dec,0.25,1)
    altAtk = newAtk
  }

  this.decChange = function(newDec){
    env1.setADSR(atk,newDec,0.25,1)
    env2.setADSR(atk,newDec,0.25,1)
    env3.setADSR(atk,newDec,0.25,1)
    altDec = newDec
  }

  this.paramInit = function(){
    env1.setADSR(initAtk,initDec,0.25,1)
    env2.setADSR(initAtk,initDec,0.25,1)
    env3.setADSR(initAtk,initDec,0.25,1)
    env1.setRange(0.1,0)
    env2.setRange(0.1,0)
    env3.setRange(0.1,0)
  }
}

