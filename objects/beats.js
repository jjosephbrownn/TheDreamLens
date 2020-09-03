let beatKicks = [
  "/soundz/soundrecs/drums/kick1.wav"
  "/soundz/soundrecs/drums/kick2.wav"
  "/soundz/soundrecs/drums/kick3.wav"
]

let beatSnares = [
  "/soundz/soundrecs/drums/snare1.wav"
  "/soundz/soundrecs/drums/snare2.wav"
  "/soundz/soundrecs/drums/snare3.wav"
  "/soundz/soundrecs/drums/snare4.wav"
  "/soundz/soundrecs/drums/snare5.wav"
]
let beatHats = [
  "/soundz/soundrecs/drums/hat1.wav"
  "/soundz/soundrecs/drums/hat2.wav"
  "/soundz/soundrecs/drums/hat3.wav"
]


function beater(pace){

    let k,sn,hh,sb,oh
    k = loadSound(beatKicks[round(random(beatKicks.length-1))])
    sn = loadSound(beatSnares[round(random(beatSnares.length-1))])
    hh = loadSound(beatHats[round(random(beatHats.length-1))])
    sb = loadSound("/soundz/soundrecs/drums/808sb.wav")
    oh = loadSound("/soundz/soundrecs/drums/808oh.wav")

    let kPats = [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]  
    let snPats = [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0] 
    let hPats = [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0] 
    let sbPats = [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0] 
    let ohPats = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] 
    let hPatAlt = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] 

    ohPats[round(random(ohPats.length-1))] = 1
   
    let start1Pat = kPats
    let start2Pat = snPats
    let start3Pat = hPats
    let start4Pat = sbPats
    let start5Pat = ohPats

    let voice1 = new p5.Phrase("voice1", seq1, kPats);
    let voice2 = new p5.Phrase("voice2", seq2, snPats);
    let voice3 = new p5.Phrase("voice3", seq3, hPats);
    let voice4 = new p5.Phrase("voice4", seq4, sbPats); 
    let voice5 = new p5.Phrase("voice5", seq5, ohPats); 

    let kVoice = new p5.Part();
    kVoice.addPhrase(voice1);
    kVoice.setBPM(pace);

    let snVoice = new p5.Part();
    snVoice.addPhrase(voice2);
    snVoice.setBPM(pace);

    let hhVoice = new p5.Part();
    hhVoice.addPhrase(voice3);
    hhVoice.setBPM(pace);

    let sbVoice = new p5.Part();
    sbVoice.addPhrase(voice4);
    sbVoice.setBPM(pace);

    let ohVoice = new p5.Part();
    ohVoice.addPhrase(voice5);
    ohVoice.setBPM(pace/2);

    let drumFilt = new p5.LowPass()
    drumFilt.freq(1500)
    drumFilt.res(10)
    k.disconnect()
    sn.disconnect()
    hh.disconnect()
    sb.disconnect()
    oh.disconnect()
    k.connect(drumFilt)
    sn.connect(drumFilt)
    hh.connect(drumFilt)
    sb.connect(drumFilt)
    sb.connect(drumFilt)

    let drumMaster = new p5.Gain()
    drumFilt.disconnect()
    drumFilt.connect(drumMaster)
    drumMaster.connect()
    drumMaster.amp(0.75)

    this.play = function(src){
      if(src === 0){
        kVoice.loop()
      }else if(src === 1){
       snVoice.loop()
      }else if(src === 2){
       hhVoice.loop()
      }else if(src === 3){
       sbVoice.loop()
      }else if(src === 4){
       ohVoice.loop()
      }
    }

    this.add = function(src){
      if(src === 0){
        kPats[round(random(kPats.length-1))] = 1
        sbPats = kPats
      }else if(src === 1){
       snPats[round(random(snPats.length-1))] = 1
      }else if(src === 2){
       hPats[round(random(hPats.length-1))] = 1
      }else if(src === 3){
       sbPats[round(random(hPats.length-1))] = 1
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

    this.oldPat = function(){
      kPats = start1Pat
      snPats = start2Pat
      hPats = start3Pat
      sbPats = start4Pat
      ohPats = start5Pat
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

        sbVoice.stop();
      }else if(src === 4){

        ohVoice.stop();
      }

    }   

    function seq1(){
     k.play(0,1)
    }

    function seq2(){
      sn.play(0,1,0.5)
    }

    function seq3(){
     hh.play()
    }

    function seq4(){
     sb.play()
    }

    function seq5(){
     oh.play()
    }
}

