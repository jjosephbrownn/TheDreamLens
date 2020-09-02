//SIMPLE ORGANUM - ONE PATTERN IN TEN AND ALT WITH CHANGING voxMel

let orgVoice1,orgVoice2;//phrase
let vox1 = [],vox2 = []
let voxMel = []
let voxPos1 = 0
let voxPos2 = 0
let bpms = []

let altVoxModes = [ //melodic minor modes
	[0,2,3,5,7,9,11,12],
	[0,1,3,5,7,9,10,12],
	[0,2,4,6,8,9,11,12],
	[0,2,4,6,7,9,10,12],
	[0,2,4,5,7,8,10,12],
	[0,2,3,5,6,8,10,12],
	[0,1,3,4,6,8,10,12],
]

let voxSongs = [
	"/soundz/soundrecs/songs/inton1.mp3",
	"/soundz/soundrecs/songs/barleycorn.mp3",
	"/soundz/soundrecs/songs/silkie.mp3",
	"/soundz/soundrecs/songs/worm.mp3",
	"/soundz/soundrecs/songs/song1.mp3",
	"/soundz/soundrecs/songs/song2.mp3",
	"/soundz/soundrecs/songs/song3.mp3"
]

function vocoder(bpm){//mode === parallel or organum

	let voxSamp1 = loadSound(voxSongs[round(random(voxSongs.length-1))]);
	let voxSamp2 = loadSound(voxSongs[round(random(voxSongs.length-1))]);
	voxSamp1.pan(-1)
	voxSamp2.pan(1)

	let voxEnv1 = new p5.Envelope()
	let voxEnv2 = new p5.Envelope()
	voxEnv1.setADSR(0.5,1,1,0.5)
	voxEnv2.setADSR(0.5,1,1,0.5)
	voxEnv1.setRange(0.6,0)
	voxEnv2.setRange(0.6,0)
	voxSamp1.amp(voxEnv1)
	voxSamp2.amp(voxEnv2)

	let voxMaster = new p5.Gain()
	voxSamp1.disconnect()
	voxSamp2.disconnect()
	voxMaster.connect()
	voxSamp1.connect(voxMaster)
	voxSamp2.connect(voxMaster)
	voxMaster.amp(0.25)


	let voxMode = JSON.parse(sessionStorage.getItem("mode"))//getting mode from nav info
	let seshMel = JSON.parse(sessionStorage.getItem("melody"))//getting melody primitives from session (primitive = placeholder in array ie 0-7 which can be converted to any mode)

	for(i=0;i<seshMel.length;i++){ // creating voxMel by mapping melody primitive to stored mode (0,1,2 in mel = 0,2,4 ionian or 0,1,3 phrygian)
		let n = seshMel[i]
		voxMel[i] = voxMode[n]
	}

	let ratio = Math.max.apply(Math,voxMel)
    for(i=0;i<voxMel.length;i++){
      voxMel[i] = voxMel[i] / ratio
    }

	let pace = bpm
	bpms[0] = pace
	bpms[1] = pace/4
	bpms[2] = pace*1.5

	del1 = new p5.Delay()
	del2 = new p5.Delay()
	del3 = new p5.Delay()

	orgVoice1 = new p5.Phrase("vox1", seq1, vox1);
	orgVoice2 = new p5.Phrase("vox2", seq2, vox2);

	vox1Part = new p5.Part();
	vox1Part.addPhrase(orgVoice1);
	vox1Part.setBPM(pace);

	vox2Part = new p5.Part();
	vox2Part.addPhrase(orgVoice2);
	vox2Part.setBPM(pace);

	this.startup = function(mode){
		userStartAudio();
		if(mode === 0){//ORGANUM
			for(i=0;i<voxMel.length;i++){//chooses notes from cantus
				vox1[i] = voxMel[Math.floor(Math.random()*voxMel.length)];
				vox2[i] = voxMel[Math.floor(Math.random()*voxMel.length)];
			};
			for(i=0;i<voxMel.length/2;i++){//adds spaces
				vox1.push(" ");
		 		vox2.push(" ");
		 	}
		 	for (let i = vox1.length - 1; i > 0; i--) {//shuffle it up dude
		    	let j = Math.floor(Math.random() * (i + 1));
		    	let k = Math.floor(Math.random() * (i + 1));   
		    	[vox1[i], vox1[j]] = [vox1[j], vox1[i]];
		    	[vox2[i], vox2[j]] = [vox2[j], vox2[i]];
		 	}
		 	vox1Part.replaceSequence("vox1", vox1)
		 	vox2Part.replaceSequence("vox2", vox2)

		}else if(mode === 1){//PARALLEL
			for(i=0;i<voxMel.length;i++){//adds spaces
				vox1[i] = voxMel[i]
				vox2[i] = voxMel[i]+0.5
		 	}
			for(i=0;i<voxMel.length/2;i++){//adds spaces
				vox1.push(" ");
				vox2.push(" ");
		 	}
			for (let i = vox1.length - 1; i > 0; i--) {//shuffle it up dude
		    	let j = Math.floor(Math.random() * (i + 1));
		    	let k = Math.floor(Math.random() * (i + 1));   
		    	[vox1[i], vox1[j]] = [vox1[j], vox1[i]];
		    	[vox2[i], vox2[j]] = [vox2[j], vox2[i]];
		 	}
		vox1Part.replaceSequence("vox1",vox1)
		vox2Part.replaceSequence("vox2",vox2)
		} 
	}

	this.begin = function(src){
		if(src === 0){
			vox1Part.loop()
			voxSamp1.loop()
		}else if(src === 1){
			vox2Part.loop()
			voxSamp2.loop()
		}		
	}

	this.stop = function(src){
		if(src === 0){
			vox1Part.stop()
			voxSamp1.stop()
		}else if(src === 1){
			vox2Part.stop()
			voxSamp2.stop()
		}		
	}

	this.inton = function(src){
		if(src === 0){
			vox1Part.stop()
			voxEnv1.triggerAttack()
			voxSamp1.loop()
		}else if(src === 1){
			vox2Part.stop()
			voxEnv2.triggerAttack()
			voxSamp2.loop()
		}
	}

	this.intonStop = function(src){
		if(src === 0){
			voxSamp1.pause()
			voxEnv1.triggerRelease()
		}else if(src === 1){
			voxSamp2.pause()
			voxEnv2.triggerRelease()
		}
	}

	this.intonPitch = function(src){
		if(src === 0){
			voxPos1++
			voxSamp1.rate(voxMel[voxPos1]+0.5)
			if(voxPos1 === voxMel.length-1){voxPos1 = 0}
		}else if(src === 1){
			voxPos2++
			voxSamp2.rate(voxMel[voxPos2]+1)
			if(voxPos2 === voxMel.length-1){voxPos2 = 0}
		}
	}

	this.pedBPM = function(bpm){
		ped.setBPM(bpm)
	}

	this.nextNote = function(src,pos){
		if(src === 0){
		}else if(src === 1){
		}else if(src === 2){
		}
		
	}

	this.voxPan = function(src,p){
		if(src === 0){
			vox1.pan(p)
		} else if(src ===1){
			vox2.pan(p)
		}
	}

	function seq1(time,note){
		if(note !== " "){
			voxSamp1.pause()
			voxSamp1.rate(note+0.5)
			voxSamp1.play()
			voxEnv1.triggerAttack()
		} else{
			voxEnv1.triggerRelease()
			voxSamp1.pause()
		}
	};

	function seq2(time,note){
		if(note !== " "){
			voxSamp2.pause()
			voxSamp2.rate(note+0.5)
			voxSamp2.play()
			voxEnv2.triggerAttack()
		} 
		else{
			voxEnv2.triggerRelease()
			voxSamp2.pause()
		}
	};
}