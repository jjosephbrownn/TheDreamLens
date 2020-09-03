let possKicks = [
  "/soundz/soundrecs/drums/kick1.wav",
  "/soundz/soundrecs/drums/kick2.wav",
  "/soundz/soundrecs/drums/kick3.wav"
]

let possSnares = [
  "/soundz/soundrecs/drums/snare1.wav",
  "/soundz/soundrecs/drums/snare2.wav",
  "/soundz/soundrecs/drums/snare3.wav",
  "/soundz/soundrecs/drums/snare4.wav",
  "/soundz/soundrecs/drums/snare5.wav"
]
let possHats = [
  "/soundz/soundrecs/drums/hat1.wav",
  "/soundz/soundrecs/drums/hat2.wav",
  "/soundz/soundrecs/drums/hat3.wav"
]



function board(len,pace){

    let k,sn,hh
    let rateState = false
    k = loadSound(possKicks[round(random(possKicks.length-1))])
    sn = loadSound(possSnares[round(random(possSnares.length-1))])
    hh = loadSound(possHats[round(random(possHats.length-1))])
    oh = loadSound("/soundz/soundrecs/drums/oh.wav")

    let ost1 = loadSound("/soundz/soundrecs/purpSamps/archGuitar.mp3")
    let ost2 = loadSound("/soundz/soundrecs/purpSamps/archGuitar.mp3")
    let rate = random(0.5,0.75)
    ost1.pan(-0.5)
    ost2.pan(0.5)

    let kPats = [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]  
    let snPats = [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0] 
    let hPats = [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0] 
    let ohPats = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] 
    let hPatAlt = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] 

    ohPats[round(random(ohPats.length-1))] = 1

    let start1Pat = kPats
    let start2Pat = snPats
    let start3Pat = hPats

    let voice1 = new p5.Phrase("voice1", seq1, kPats);
    let voice2 = new p5.Phrase("voice2", seq2, snPats);
    let voice3 = new p5.Phrase("voice3", seq3, hPats);
    let voice4 = new p5.Phrase("voice4", seq4, ohPats); 

    let kVoice = new p5.Part();
    kVoice.addPhrase(voice1);
    kVoice.setBPM(pace);

    let snVoice = new p5.Part();
    snVoice.addPhrase(voice2);
    snVoice.setBPM(pace);

    let hhVoice = new p5.Part();
    hhVoice.addPhrase(voice3);
    hhVoice.setBPM(pace);

    let ohVoice = new p5.Part();
    ohVoice.addPhrase(voice4);
    ohVoice.setBPM(pace/2);

    let drumFilt = new p5.LowPass()
    drumFilt.freq(2000)
    drumFilt.res(10)
    k.disconnect()
    sn.disconnect()
    hh.disconnect()
    oh.disconnect()
    k.connect(drumFilt)
    sn.connect(drumFilt)
    hh.connect(drumFilt)
    oh.connect(drumFilt)

    let ostFilt = new p5.HighPass()
    ostFilt.freq(1000)
    ostFilt.res(10)
    ost1.disconnect()
    ost1.connect(ostFilt)
    ost2.disconnect()
    ost2.connect(ostFilt)

    let drumMaster = new p5.Gain()
    drumFilt.disconnect()
    drumFilt.connect(drumMaster)
    drumMaster.connect()
    drumMaster.amp(0.5)

    let ostMaster = new p5.Gain()
    ostFilt.disconnect()
    ostFilt.connect(ostMaster)
    ostMaster.connect()
    ostMaster.amp(0.5)


    this.play = function(src){
      if(src === 0){
        kVoice.loop()
      }else if(src === 1){
       snVoice.loop()
      }else if(src === 2){
       hhVoice.loop()
      }else if(src === 3){
       ohVoice.loop()
      }
    }

    this.ostPlay = function(){
      if(ost1.isPlaying() === false){
        ost1.loop(0,rate,0.5)
        ost2.loop(0,rate*1.5,0.5)
      }else {
        return null
      }
     
    }

    this.ostStop = function(){
      if(ost1.isPlaying() === true){
        ost1.pause()
        ost2.pause()
      }else {
        return null
      }
    }

    this.add = function(src){
      if(src === 0){
        kPats[round(random(kPats.length-1))] = 1
      }else if(src === 1){
       snPats[round(random(snPats.length-1))] = 1
      }else if(src === 2){
       hPats[round(random(hPats.length-1))] = 1
      }
    }

    this.nextNote = function(src){
      if(src === 0){
        k.play(0,1)
      }else if(src === 1){
        sn.play(0,1,0.5)
      }else if(src === 2){
        hh.play(0,1)
      }
    }

    this.partial = function(src){
      if(src === 0){
        let tempK = []
        let tempLen = round(random(2,8))
        for(i=0;i<tempLen;i++){
          tempK[i] = kPats[i]
        }
        kVoice.replaceSequence("voice1",tempK)
        kVoice.start()
      }else if(src === 1){
        let tempSn = []
        let tempLen = round(random(2,8))
        for(i=0;i<tempLen;i++){
          tempSn[i] = snPats[i]
        }
        snVoice.replaceSequence("voice2",tempSn)
        snVoice.start()
      }else if(src === 2){
        let tempH = []
        let tempLen = round(random(2,8))
        for(i=0;i<tempLen;i++){
          tempH[i] = hPats[i]
        }
        hhVoice.replaceSequence("voice3",tempH)
        hhVoice.start()
      }
    }

    this.altPat = function(src,alt){
      if(alt === 0){
        if(src === 0){
          return null
        }else if(src === 1){
          return null
        }else if(src === 2){
          hhVoice.replaceSequence("voice3",hPats)
        }
      } else if(alt === 1){
        if(src === 0){
          return null
        }else if(src === 1){
          return null
        }else if(src === 2){
          hhVoice.replaceSequence("voice3",hPatAlt)
        }
      }     
    }

    this.stop = function(src){
      if(src === 0){

        kVoice.stop()

      } else if(src === 1){

       snVoice.stop()

      } else if(src === 2){

        hhVoice.stop();
      }else if(src === 3){

        ohVoice.stop();
      }

    }   

    this.rate = function(onoff){
      if(onoff === 1){
        rateState = true
      } else {
        rateState = false
      }
    }

    this.bpm = function(bpm){
      leftVoice.setBPM(bpm)
      midVoice.setBPM(bpm)
      rightVoice.setBPM(bpm)
    }

    function seq1(){
      if(rateState === false){
         k.play(0,1)
       } else if(rateState === true){
        let randSpeed = random([0,1,2])
          if(randSpeed === 0){
            kVoice.setBPM(pace*2)
          } else {
            kVoice.setBPM(pace)
          }
          k.pan(random(-1,1))
          k.play(0,random(0.25,2))
       }
    
    }

    function seq2(){
      if(rateState === false){
         sn.play(0,1)
       } else if(rateState === true){
        let randSpeed = random([0,1,2])
          if(randSpeed === 0){
            snVoice.setBPM(pace*2)
          } else {
            snVoice.setBPM(pace)
          }
         sn.pan(random(-1,1))
          sn.play(0,random(0.25,2))
       }
    }

    function seq3(){
     if(rateState === false){
         hh.play(0,1)
       } else if(rateState === true){
          let randSpeed = random([0,1,2])
          if(randSpeed === 0){
            hhVoice.setBPM(pace*2)
          } else {
            hhVoice.setBPM(pace)
          }
          hh.pan(random(-1,1))
          hh.play(0,random(0.25,2))
       }
    }

    function seq4(){
     if(rateState === false){
         oh.play(0,1)
       } else if(rateState === true){
          oh.play(0,random(0.25,1.5))
       }
    }
}

