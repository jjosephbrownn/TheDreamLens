function aphex(numloops,oct,pace,rhythm){

  let mode = JSON.parse(sessionStorage.getItem("mode"))//getting mode from nav info

  let aphK = loadSound("/soundz/soundrecs/drums/k.wav")
  let aphSn = loadSound("/soundz/soundrecs/drums/808sn.wav")
  let aphH = loadSound("/soundz/soundrecs/drums/808ch.wav")
  let aphO = loadSound("/soundz/soundrecs/drums/808oh.wav")

  let sampleState = false

  let notes1 = []
  let notes2 = []
  let notes3 = []
  let notes4 = []
  let notes5 = [0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1]
  let bpmPat = []
  let stringSec = []
  let altString = [1,1,1,1,1,1,1,1]

  let atk,dec,initAtk,initDec

  let pos1 = 0
  let pos2 = 0
  let pos3 = 0
  let pos4 = 0

  let oct1 = oct
  let oct2 = oct
  let oct3 = oct
  let oct4 = oct

  let currFreq1;
  let currFreq2;
  let currFreq3;

  let left1 = new p5.Oscillator("sawtooth")
  let left2 = new p5.Oscillator("square")
  let mid1 = new p5.Oscillator("sawtooth")
  let mid2 = new p5.Oscillator("square")
  let right1 = new p5.Oscillator("sawtooth")
  let right2 = new p5.Oscillator("square")

  let tune1 = new p5.Oscillator("sawtooth")
  let tune2 = new p5.Oscillator("sawtooth")

  left1.pan(-1)
  left2.pan(-1)
  mid1.pan(0)
  mid2.pan(0)
  right1.pan(1)
  right2.pan(1)

  let fm1 = new p5.Oscillator("square")
  let fm2 = new p5.Oscillator("square")
  let fm3 = new p5.Oscillator("square")
  let fm4 = new p5.Oscillator("sine")

  fm1.disconnect()
  fm2.disconnect()
  fm3.disconnect()
  fm4.disconnect()

  let env1 = new p5.Envelope();
  let env2 = new p5.Envelope();
  let env3 = new p5.Envelope();
  let env4 = new p5.Envelope()
  left1.amp(env1)
  left2.amp(env1)
  mid1.amp(env2)
  mid2.amp(env2)
  right1.amp(env3)
  right2.amp(env3)
  tune1.amp(env4)
  tune2.amp(env4)

  left1.freq(fm1)
  left2.freq(fm1)
  mid1.freq(fm2)
  mid2.freq(fm2)
  right1.freq(fm3)
  right2.freq(fm3)
  tune1.freq(fm4)
  tune2.freq(fm4)

  let filt1 = new p5.LowPass();
  let filt2 = new p5.LowPass();
  let filt3 = new p5.LowPass();
  let filt4 = new p5.LowPass();
  left1.disconnect()
  left2.disconnect()
  mid1.disconnect()
  mid2.disconnect()
  right1.disconnect()
  right2.disconnect()
  tune1.disconnect()
  tune2.disconnect()

  left1.connect(filt1)
  left2.connect(filt1)
  mid1.connect(filt2)
  mid2.connect(filt2)
  right1.connect(filt3)
  right2.connect(filt3)
  tune1.connect(filt4)
  tune2.connect(filt4)

  let filtEnv1 = new p5.Envelope();
  let filtEnv2 = new p5.Envelope();
  let filtEnv3 = new p5.Envelope();
  let filtEnv4 = new p5.Envelope();
  filt1.freq(filtEnv1)
  filt2.freq(filtEnv2)
  filt3.freq(filtEnv3)
  filt4.freq(filtEnv4)
  filt4.res(10)

  let del1 = new p5.Delay();
  let del2 = new p5.Delay();
  let del3 = new p5.Delay();
  del1.filter(750)
  del2.filter(750)
  del3.filter(750)

  // del1.process(filt1,0.1,0.1,500)
  // del2.process(filt2,0.1,0.1,500)
  // del3.process(filt3,0.1,0.1,500) 

  let env1pat = [],env2pat = [],env3pat = []
  let filt1pat = [],filt2pat = [],filt3pat = []

  let voice1 = new p5.Phrase("voice1", seq1, notes1);
  let voice2 = new p5.Phrase("voice2", seq2, notes2);
  let voice3 = new p5.Phrase("voice3", seq3, notes3); 
  let voice4 = new p5.Phrase("voice4", seq4, notes4);
  let voice5 = new p5.Phrase("voice5", snSeq, notes5); 

  let leftVoice = new p5.Part();
  leftVoice.addPhrase(voice1);
  leftVoice.setBPM(pace);

  let midVoice = new p5.Part();
  midVoice.addPhrase(voice2);
  midVoice.setBPM(pace);

  let rightVoice = new p5.Part();
  rightVoice.addPhrase(voice3);
  rightVoice.setBPM(pace);

  let tuneVoice = new p5.Part();
  tuneVoice.addPhrase(voice4);
  tuneVoice.setBPM(pace*2);

  let snVoice = new p5.Part();
  snVoice.addPhrase(voice5);
  snVoice.setBPM(pace);

  let aphFilt = new p5.LowPass()
  aphFilt.freq(2000)
  aphFilt.res(10)
  aphK.disconnect()
  aphSn.disconnect()
  aphH.disconnect()
  aphO.disconnect()
  aphK.connect(aphFilt)
  aphSn.connect(aphFilt)
  aphH.connect(aphFilt)
  aphO.connect(aphFilt)


  // LINDENMAYER STUFF (L-SYSTEMS)
  let thestring = '1'; // "axiom" or start of the string
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
    left1.start()
    left2.start()
    mid1.start() 
    mid2.start()
    right1.start()
    right2.start()
    tune1.start()
    tune2.start()  
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

    for(i=0;i<altString.length;i++){ // creating cantus by mapping melody primitive to stored mode (0,1,2 in mel = 0,2,4 ionian or 0,1,3 phrygian)
      let n = altString[i]
      altString[i] = mode[n]
    }


    params()
  }

  this.length = function(){
    return(stringMel.length-1)
  }

  this.sampler = function(onoff){
    if(onoff === 0){
      sampleState = false
    } else if(onoff === 1){
      sampleState = true
    }
  }

  this.string = function(){
    return(stringMel)
  }

  this.chainer = function(pos){
    return(thestring[pos])  
  }

  this.play = function(src){
    if(src === 0){
      leftVoice.loop()
    }else if(src === 1){
      midVoice.loop()
    }else if(src === 2){
      rightVoice.loop()
    }else if(src === 3){
      tuneVoice.loop()
    }else if(src === 4){
      snVoice.loop()
    }
  }

  this.stop = function(src){
    if(src === 0){
      // env1.triggerRelease()
      // filtEnv1.triggerRelease()
      leftVoice.stop()
    }else if(src === 1){
      // env2.triggerRelease()
      // filtEnv2.triggerRelease()
      midVoice.stop()
    }else if(src === 2){
      // env3.triggerRelease()
      // filtEnv3.triggerRelease()
      rightVoice.stop()
    } else if(src === 3){
      // env3.triggerRelease()
      // filtEnv3.triggerRelease()
      tuneVoice.stop()
    }  else if(src === 4){
      snVoice.stop()
    }  
  }

  this.posChange = function(src,pos){
    if(src === 0){
      pos1 = pos
    }else if(src === 1){
      pos2 = pos
    }else if(src === 2){
      pos3 = pos
    }
    
  }

  this.nextNote = function(src){
     if(src === 0){
          seq1()
          pos1++
          if(pos1 === stringMel.length-1){pos1 = 0}
        }else if(src === 1){
          seq2()
          pos2++
          if(pos2 === stringMel.length-1){pos2 = 0}
        }else if(src === 2){
          seq3()
          pos3++
          if(pos3 === stringMel.length-1){pos3 = 0}
        }
  }

  this.bpm = function(bpm){
    leftVoice.setBPM(bpm)
    midVoice.setBPM(bpm)
    rightVoice.setBPM(bpm)
  }

  this.pos = function(src){
    if(src === 0){
      pos1++
      if(pos1 === stringMel.length-1){pos1 = 0}
    }else if(src === 1){
      pos2++
      if(pos2 === stringMel.length-1){pos2 = 0}
    }else if(src === 2){
      pos3++
      if(pos3 === stringMel.length-1){pos3 = 0}
    }
  }
  
  this.tuneBPM = function(bpm){
    tuneVoice.setBPM(bpm)
  }

  this.section = function(){
    let r = round(random(stringMel.length-9))
    for(i=0;i<8;i++){
      stringSec[i] = stringMel[i+r]
    }
    seqNotes = stringSec
  }

  this.altStringer = function(onoff){
    if(onoff === 0){
      seqNotes = stringSec
    } else if(onoff === 1){
      seqNotes = altString
    }
  }

  function seq1(){
    if(sampleState === false){
      let midiVal = midiToFreq(stringMel[pos1]+oct1)
      left1.freq(midiVal)
      left2.freq(midiVal*1.5)
      filtEnv1.play()
      env1.play()
    } else if(sampleState === true){
      let midiVal = midiToFreq(stringMel[pos1]+oct1)
      left1.freq(midiVal)
      left2.freq(midiVal*1.5)
      filtEnv1.play()
      env1.play()
      aphK.play(0,1,0.5)
    }

  }

 function seq2(){
  if(sampleState === false){
    let midiVal = midiToFreq(stringMel[pos2]+oct2)
    mid1.freq(midiVal)
    mid2.freq(midiVal*1.5)
    filtEnv2.play()
    env2.play()
  }else if(sampleState === true){
    let midiVal = midiToFreq(stringMel[pos2]+oct2)
    mid1.freq(midiVal)
    mid2.freq(midiVal*1.5)
    filtEnv2.play()
    env2.play()
    aphH.play(0,1,0.5)
  }
    
  }
  
  function seq3(){
    if(sampleState === false){
      let midiVal = midiToFreq(stringMel[pos3]+oct3)
      right1.freq(midiVal)
      right2.freq(midiVal*1.5)
      filtEnv3.play()
      env3.play()
    }else if(sampleState === true){
      let midiVal = midiToFreq(stringMel[pos3]+oct3)
      right1.freq(midiVal)
      right2.freq(midiVal*1.5)
      filtEnv3.play()
      env3.play()
    }
  }

  function seq4(){
    let midiVal = midiToFreq(seqNotes[pos4]+oct4)
    tune1.freq(midiVal)
    tune2.freq(midiVal*1.5)
    console.log(pos4,midiVal)
    filtEnv4.play()
    env4.play()
    pos4++
    if(pos4 === seqNotes.length-1){pos4 = 0}
  }

  function snSeq(){
    aphSn.play(0,1,0.5)
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

  function params(){
      for(i=0;i<rhythm;i++){
        notes1[i] = random([0,0,1])
        notes2[i] = random([0,0,1])
        notes3[i] = random([0,0,1])
      }
      for(i=0;i<stringMel.length;i++){
        notes4[i] = 1
      }
      for(i=0;i<2;i++){
        notes5[round(random(0,notes5.length-1))] = 1
      }
      let plonkMaster = new p5.Gain()
      plonkMaster.connect()

      let tuneMaster = new p5.Gain()
      tuneMaster.connect()
 
      env1.setADSR(0.001,0.1,0,0.1)
      env2.setADSR(0.001,0.1,0,0.1)
      env3.setADSR(0.001,0.1,0,0.1)
      env4.setADSR(0.001,0.2,0,0.1)
      env1.setRange(0.1,0)
      env2.setRange(0.1,0)
      env3.setRange(0.1,0)
      env4.setRange(0.1,0)

      filtEnv1.setADSR(0.001,0.1,0,0.1)
      filtEnv2.setADSR(0.001,0.1,0,0.1)
      filtEnv3.setADSR(0.001,0.1,0,0.1)
      filtEnv4.setADSR(0.001,0.1,0,0.1)
      filtEnv1.setRange(1000,0)
      filtEnv2.setRange(1000,0)
      filtEnv3.setRange(1000,0)
      filtEnv4.setRange(3000,0)

      fm1.freq(2000)
      fm2.freq(2000)
      fm3.freq(2000)
      fm4.freq(100)

      fm1.amp(100)
      fm2.amp(100)
      fm3.amp(100)
      fm4.amp(10)

      atk = 0.001
      dec = 0.1
      initAtk = atk
      initDec = dec

      filt1.disconnect()
      filt2.disconnect()
      filt3.disconnect()
      filt4.disconnect()
      filt1.connect(plonkMaster)
      filt2.connect(plonkMaster)
      filt3.connect(plonkMaster)
      filt4.connect(tuneMaster)
      plonkMaster.amp(0.3)
      tuneMaster.amp(0.3)
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

  this.fmChange = function(fmf,fma){
    console.log(fmf,fma)
    fm1.freq(fmf)
    fm2.freq(fmf)
    fm3.freq(fmf)

    fm1.amp(10)
    fm2.amp(10)
    fm3.amp(10)
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

