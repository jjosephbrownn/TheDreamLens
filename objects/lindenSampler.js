function linden(loops,atk,dec){

  let initAtk = atk
  let initDec = dec

  let s11 = loadSound("/soundz/soundrecs/string1.mp3")//have string sample here
  let s21 = loadSound("/soundz/soundrecs/string1.mp3")
  let s31 = loadSound("/soundz/soundrecs/string1.mp3")
  let s12 = loadSound("/soundz/soundrecs/string1.mp3")
  let s22 = loadSound("/soundz/soundrecs/string1.mp3")
  let s32 = loadSound("/soundz/soundrecs/string1.mp3")

  let filt1pat = [],filt2pat = [],filt3pat = []
  let del1pat = [],del2pat = [],del3pat = []
  let fdbk1pat = [],fdbk2pat = [],fdbk3pat = []
  let pan1pat = [],pan2pat = [],pan3pat = []

  let env1 = new p5.Envelope()
  let env2 = new p5.Envelope()
  let env3 = new p5.Envelope()

  let filt1 = new p5.LowPass()
  let filt2 = new p5.LowPass()
  let filt3 = new p5.LowPass()

  let del1 = new p5.Delay()
  let del2 = new p5.Delay()
  let del3 = new p5.Delay()

  let disto = new p5.Distortion()
  let comp = new p5.Compressor()
  comp.attack(0.01)
  comp.ratio(2)
  comp.release(1)
  comp.amp(0.2)

  s11.disconnect()
  s21.disconnect()
  s31.disconnect()
  s12.disconnect()
  s22.disconnect()
  s32.disconnect()

  s11.connect(filt1)
  s21.connect(filt2)
  s31.connect(filt3)
  s12.connect(filt1)
  s22.connect(filt2)
  s32.connect(filt3)

  s11.amp(env1)
  s21.amp(env2)
  s31.amp(env3)
  s12.amp(env1)
  s22.amp(env2)
  s32.amp(env3)

  let pluckMaster = new p5.Gain()
  pluckMaster.connect()
  filt1.disconnect()
  filt2.disconnect()
  filt3.disconnect()
  filt1.connect(pluckMaster)
  filt2.connect(pluckMaster)
  filt3.connect(pluckMaster)
  pluckMaster.amp(0.75)


  // LINDENMAYER STUFF (L-SYSTEMS)
  let thestring = '1'; // "axiom" or start of the string
  let numloops = loops; // how many iterations to pre-compute
  let therules = []; // array for rules
  let rate = []
  therules[0] = ['1', '35']; // semi
  therules[1] = ['2', '74']; // tone
  therules[2] = ['3', '12']; // fourth
  therules[3] = ['4', '37']; // fifth
  therules[4] = ['5', '42']; // min third
  therules[5] = ['6', '16']; // maj third
  therules[5] = ['7', '63']; // maj third

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

  function stringConv(){ // convert to numbers, normalise 
    for(i=0;i<thestring.length;i++){
      rate[i] = parseInt(thestring[i], 10)
    }
    let ratio = Math.max.apply(Math,rate)
    for(i=0;i<rate.length;i++){
      rate[i] = rate[i] / ratio
    }
    params()
  }

  this.length = function(){
    return(rate.length)
  }

  this.duration = function(){
    return s11.duration()
  }

  this.stop = function(){
    env1.triggerRelease()
    env2.triggerRelease()
    env3.triggerRelease()

    s11.stop()
    s21.stop()
    s31.stop()
    s12.stop()
    s22.stop()
    s32.stop()
  }

  this.play1 = function(pos, detune,oct){
    env1.triggerRelease()
    s11.rate(rate[pos] + 0.5 * oct)
    s12.rate(rate[pos] + 0.5 + detune)
    filt1.freq(filt1pat[pos])
    del1.process(s11,del1pat[pos], fdbk1pat[pos])
    del1.process(s12,del1pat[pos], fdbk1pat[pos])
    env1.triggerAttack()
    s11.play()
    s12.play()
    
  }

  this.play2 = function(pos,detune,oct){
    env2.triggerRelease()
    s21.rate(rate[pos] + 0.5 * oct)
    s22.rate(rate[pos] + 0.5 + detune)
    filt2.freq(filt2pat[pos])
    del2.process(s21,del2pat[pos], fdbk2pat[pos])
    del2.process(s22,del2pat[pos], fdbk2pat[pos])
    env2.triggerAttack()
    s21.play()
    s22.play()
   
  }
  
  this.play3 = function(pos,detune,oct){
    env3.triggerRelease()
    s31.rate(rate[pos] + 0.5 * oct)
    s32.rate(rate[pos] + 0.5 + detune)
    filt3.freq(filt3pat[pos])
    del3.process(s31,del3pat[pos], fdbk3pat[pos])
    del3.process(s32,del3pat[pos], fdbk3pat[pos])
    env3.triggerAttack()
    s31.play()
    s32.play()
    
  }

  this.droner = function(src,pos,detune,cue,end){
    if(src === 0){
       s11.pan(-1)
       s12.pan(-1)
       env1.triggerAttack()
       filt1.freq(filt1pat[pos])
       s11.loop(0,rate[pos],0.25,cue,end)
       s12.loop(0,rate[pos] + 0.5 + detune,0.1,cue,end)
    }else if(src === 1){
       env2.triggerAttack()
       filt2.freq(filt2pat[pos])
       s21.loop(0,rate[pos],0.25,cue,end)
       s22.loop(0,rate[pos] + 0.5 + detune,0.1,cue,end)
    }else if(src === 2){
       s31.pan(1)
       s32.pan(1)
      env3.triggerAttack()
      filt3.freq(filt3pat[pos])
      s31.loop(0,rate[pos],0.25,cue,end)
      s32.loop(0,rate[pos] + 0.5 + detune,0.1,cue,end)
    }
  }

  this.droneStop = function(src){
   if(src === 0){
       env1.triggerRelease()
       s11.pause()
       s12.pause()
    }else if(src === 1){
       env2.triggerRelease()
       s21.pause()
       s22.pause()
    }else if(src === 2){
      env3.triggerRelease()
      s31.pause()
       s32.pause()
    }
  }

  this.delay = function(src,time,fdbk){
    if(src === 0){
      del1.process(filt1,time,fdbk,500);
    } else if(src === 1){
      del2.process(filt2,time,fdbk,500);
    } else if(src === 2){
      del3.process(filt3,time,fdbk,500);
    }
  }

  this.panner = function(src,p){
    if(src === 0){
      s11.pan(p)
      s12.pan(p)
    } else if(src === 1){
      s21.pan(p)
      s22.pan(p)
    }else if(src === 2){
      s31.pan(p)
      s32.pan(p)
    }
  }

  this.distSet = function(src){
    if(src === 0){
      disto.process(s11)
      disto.process(s12)
      disto.disconnect()
      disto.connect(comp)
    } else if(src === 1){
      disto.process(s21)
      disto.process(s22)
       disto.disconnect()
      disto.connect(comp)
    }else if(src === 2){
      disto.process(s31)
      disto.process(s32)
       disto.disconnect()
      disto.connect(comp)
    }
  }

  this.distortion = function(src,dist,over){
    if(src === 0){
      disto.set(dist,over)
      disto.amp(0.1)
    } else if(src === 1){
      disto.set(dist,over)
      disto.amp(0.1)
    }else if(src === 2){
      disto.set(dist,over)
      disto.amp(0.1)
    }
  }

  function params(){
    for(i=0;i<rate.length;i++){

      filt1pat[i] = random(500,5000)
      del1pat[i] = random(0.9)
      fdbk1pat[i] = random(0.5)
      pan1pat[i] = random(-1,1)

      filt2pat[i] = random(500,5000)
      del2pat[i] = random(0.9)
      fdbk2pat[i] = random(0.5)
      pan2pat[i] = random(-1,1)

      filt3pat[i] = random(500,5000)
      del3pat[i] = random(0.9)
      fdbk3pat[i] = random(0.5)
      pan3pat[i] = random(-1,1)
    }
    env1.setADSR(atk,dec,0.75,1)
    env2.setADSR(atk,dec,0.75,1)
    env3.setADSR(atk,dec,0.75,1)
    env1.setRange(0.25,0)
    env2.setRange(0.25,0)
    env3.setRange(0.25,0)
    disto
  }

  this.paramChange = function(src,atk,dec){
    if(src === 0){
       env1.setADSR(atk,dec,0.75,0.25)
    }else if(src === 1){
       env2.setADSR(atk,dec,0.75,0.25)
    }else if(src === 2){
       env1.setADSR(atk,dec,0.75,0.25)
       env2.setADSR(atk,dec,0.75,0.25)
       env3.setADSR(atk,dec,0.75,0.25)
    }
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

