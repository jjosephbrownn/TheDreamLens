//3D star map with moving bits, name changes


let dots = []
let stars = []
let numDots = 0
let numStars = 0
let angleX,angleY
let mouseState = true
let loadState = false
let e1 = []
let cz1,cz2

let starMove = 0
let numMoves

let scalar = 1

let frags = ["xe","us","den","tal","arc","lak","tuus","eck","ten","lam","gi","zlo","cran"]
let poss = []
let typ
let starName

let voice
let word
let org
let bpm
let orgState = false
let s1len,s2len
let range
let int1,int2,int3 
let pat1,pat2
let smpDur1,smpDur2
let addState = false
let rand
let structure = 0
let mouseCount = 0
let melLen
let melPos = 0

let infoBox

let loadImg
let loadText
let loadStep

function preload(){
    loadStep = sessionStorage.getItem("footsteps")
    typ = loadFont("/fonts/PfefferMediaeval.otf")
}

function setup(){	
    createCanvas(windowWidth,windowHeight,WEBGL)

    let td = select("#loader")

    clear()
    td.class("loaded")
    angleMode(DEGREES) 
    angleX = 0
    angleY = 0

    bpm = random(40)+20,
    org = new organa(bpm, round(random([24,36,48,60])),random([0,1,2]))
    org.startup()
    org.floral()
    melLen = org.cantLen()
    voice = new fracture(2,1,1)//facture vocals FIRST ARG SHOULD BE 2  
    voice.params()
    word = new fracture(1,1,1)

    rand = round(random(6,18))

    numDots = 12   

    xWidth = 300
    cx = -xWidth

    for(i=0;i<200;i++){
        // stars[i] = createVector(((Math.random()*width)-width/2),((Math.random()*height)-height/2),((Math.random()*400)-200))        
        stars[i] = createVector(random(-width*2,width*2),random(-height*2,height*2),random(-1000,1000))        
    }

    for(i=0;i<numDots;i++){        
        let cz = Math.round(Math.random()*400)-200
        let cy = random((windowHeight/2)-50,(-windowHeight/2)+50)
        dots[i] = createVector(cx,cy,cz)
        e1[i] = createVector((cx+random(50)),(cy+random(50)),(cz+random(50)))
        cx += 50            
    }
   
    for(i=0;i<100;i++){
        poss[i] = frags[Math.round(Math.random()*frags.length)]
    }

    starName = markov()
    numMoves = Math.round(Math.random()*12)+4
    
    infoBox = createDiv("info")
    infoBox.class("info")
    infoBox.style("display", "none")
    infoBox.position(15,15)
    infoBox.mouseOver(infoOn)
    infoBox.mouseOut(infoOff)
    setTimeout(function(){
        infoBox.style("display", "block")
    },120000)

    setTimeout(function(){
        smpDur1 = voice.dur1()
        smpDur2 = voice.dur2()
        addState = true
    },5000)
}

function draw(){
    clear()
    background(0)   

    rotateX(angleX)
    rotateY(angleY)
    scale(scalar)

    textFont(typ)
    textSize(width/50)
    text(starName,-500,100,-100)

    for(i=0;i<200;i++){
        stroke(255)
        strokeWeight(5)
        point(stars[i].x,stars[i].y,stars[i].z)
    }

    stroke(255)
    strokeWeight(10)   

    for(m=0;m<numDots-1;m++){//draws tris
        strokeWeight(2)
        line(dots[m].x,dots[m].y,dots[m].z,dots[m+1].x,dots[m+1].y,dots[m+1].z)//tri dots
        line(dots[m].x,dots[m].y,dots[m].z,e1[m].x,e1[m].y,e1[m].z)
    } 

    if(starMove>numMoves){
        starName = markov()
        story(random(9000)+1000)
        numMoves = Math.round(Math.random()*12)+4
        starMove = 0
        org.modeChange()
        org.floral()
    }

}

function mousePressed(){
    mouseCount++
    if(orgState === false){
        org.begin()
        orgState = true
    }
    if(structure === 0){
        if(mouseButton === LEFT){
            if(addState === true){
                voice.add(0,random(0,smpDur1))
                voice.add(1,random(0,smpDur2))
            }
            starMove++
        } else if(mouseButton === RIGHT){
            let q = random([0,1,2])
            let bpm = random([30,60,90,120])
            if(q === 0){
                voice.fracBegin(0)
                voice.fracBPM(0,bpm)
            } else if(q === 1){
                voice.fracBegin(1)
                voice.fracBPM(1,bpm)
            } else if(q === 2){
                voice.fracBegin(0)
                voice.fracBegin(1)
                voice.fracBPM(0,bpm)
                voice.fracBPM(1,bpm)
            }    
        } 
    } else if(structure === 1){
        if(mouseButton === LEFT){
            org.nextNote(0,melPos)
            org.nextNote(1,melPos)
            org.nextNote(2,melPos)
            melPos++
            if(melPos === melLen){
                melPos = 0
            }
        } else if(mouseButton === RIGHT){
            voice.samplePlayCont(0,-1)
            voice.samplePlayCont(1,1)
        }
       
    }
    
    if(mouseCount === rand){
        structure++
        mouseCount = 0
        rand = round(random(6,18))
        if(structure === 1){
            org.stop(0)
            org.stop(1)
            org.stop(2)
        }
        if(structure === 2){
            structure = 0
        }
    }
}

function mouseDragged(){
    if(mouseButton === LEFT){
        let x1 = mouseX-width/2
        let y1 = mouseY-height/2
      
        for(i=0;i<dots.length;i++){
            let d = dist(x1,y1,dots[i].x,dots[i].y)
            if(d < 50){
                dots[i].x = x1
                dots[i].y = y1
            }
        }
        let dec = map(mouseX,0,width,0.05,1)
        // org.envChange(dec)
    } else if(mouseButton === RIGHT){
        angleY = map(mouseX,0,width,-180,180)
        angleX = map(mouseY,0,height,-180,180)
        org.pedBPM(bpm += 0.001)
        let nfreq = map(mouseY,0,height,100,10000)
        // org.freqChange(nfreq)
    } 
}

function mouseReleased(){
    if(structure === 0){
        if(mouseButton === RIGHT){
            voice.fracStop(0)
            voice.fracStop(1)
        } 
    }else if(structure === 1){
        if(mouseButton === RIGHT){
            voice.samplePause(0)
            voice.samplePause(1)
        } 
    }
    
}

function mouseWheel(event){
    let s = map(event.delta,-150,150,-0.05,0.05)
    if(event.delta === -150){
        org.voices(0,1)
        org.voices(1,0)
    } else if(event.delta === 150){
        org.voices(0,0)
        org.voices(1,1)
    } else {
        org.voices(0,0)
        org.voices(1,0)
    }
    scalar += s
    return false
}

function markov(){
  let result = []
  for(i=0;i<6;i++){
    let next = poss[Math.round(Math.random()*poss.length)]
    result[i] = next
  }
  let space = Math.round(Math.random()*result.length)
  result.splice(space,0," ")
  let output = result.join("")

  return(output)
}

function story(time){    
    let q = round(random())
    if(q === 0){
       word.samplePlayCont(0,random(-1,1))
       setTimeout(function(){
            word.samplePause(0)
        },time)
    } else if(q === 1){
        word.samplePlayCont(1,random(-1,1))
        setTimeout(function(){
            word.samplePause(1)
        },time)
    }  
}


function infoOn(){
    setTimeout(function(){
        infoBox.html("have you tried pressing keys?")
    },2000)
    
}

function infoOff(){
    infoBox.html("info")
}
