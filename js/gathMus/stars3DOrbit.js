//3D star map with moving bits, name changes
let randInfoMess = [
    "do you have any idea whats going on?", 
    "what are you looking at?", 
    "go away", 
    "you're nearly there", 
    "what now?", 
    "there's bound to be something round the next corner", 
    "keep searching",
    "what",
    "nothing here",
    "yep, same thing again",
    "no help here",
    "this looks good on our CV",
    "floating info boxes rule",
    "stop getting distracted",
    "worked it out yet?",
    "one of these days...",
    "behind you!",
    "no",
    "hi",
    "nah",
    "internet > real life",
    "apple is not good",
    "Musk will not save you",
    "eat the rich"
]

let dots = []
let stars = []
let numDots = 0
let numStars = 0
let angleX,angleY
let mouseState = true
let e1 = []
let cz1,cz2

let starMove = 0
let numMoves

let scalar = 1

let len
let funnyMessage
let inc1,inc2
let cPos1 = 0
let cPos2 = 0

let frags = ["xe","us","den","tal","arc","lak","tuus","eck","ten","lam","gi","zlo","cran"]
let poss = []
let typ
let starName
let infoBox
let mouseAtk
let mouseDec
let mouseFreq
let drumState = false
let allBPM
let wonkState = true
let chordSeq
let tenLen
let tinker

let loadImg
let loadText
let loadStep
let wonkCount = 0
let rand
let tinkState = false


function preload(){
    loadStep = sessionStorage.getItem("footsteps")
    typ = loadFont("/fonts/PfefferMediaeval.otf")
}

function setup(){   
    createCanvas(windowWidth,windowHeight,WEBGL)

    let loops = Number(sessionStorage.getItem("numLoops"))

    let td = select("#loader")
    td.html(loadText)
    
    clear()
    td.class("loaded")
    angleMode(DEGREES) 

    allBPM = random(40,120)
    chord = new organa(allBPM/2,48,4)
    len = chord.cantLen()
    chord.floral()
    tenLen = chord.voiceLen()
    // chord.altSeq()
    chord.startup()

    drum = new board(15,allBPM)

    tinker = new tink(random(120,160))
    tinker.patterns()
    tinker.startup()

    rand = round(random(2,6))

    angleX = 0
    angleY = 0
    numDots = 12
    xWidth = 300
    cx = -xWidth

    for(i=0;i<200;i++){
        stars[i] = createVector(random(-width*2,width*2),random(-height*2,height*2),random(-1000,1000))        
    }

    for(i=0;i<numDots;i++){        
        let cz = Math.round(Math.random()*800)-200
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

    setInterval(changer, 250)

    funnyMessage = createDiv("pipe down and stop screwing with our solar system!")
    funnyMessage.class("stupidDiv")
    funnyMessage.position((width/2)-(width*0.2),height/8)
    funnyMessage.style("display", "none")
    funnyMessage.style("color","white")

    infoBox = createDiv("info")
    infoBox.class("info")
    infoBox.style("display", "none")
    infoBox.position(15,15)
    infoBox.mouseOver(infoOn)
    infoBox.mouseOut(infoOff)
    setTimeout(function(){
        infoBox.style("display", "block")
    },120000)

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

    inc1 = map(pmouseX,0,width,0,2)-1
    inc2 = map(pmouseY,0,height,0,2)-1
    angleY += inc1
    angleX += inc2

    if(scalar > 0){
        wonkState = true
        tinkState = false
    } else if(scalar < 0){
        wonkState = false
    }

    if(scalar < 0.2 && scalar > -0.2 ){
        drumState = true
        for(i=0;i<199;i++){
            stroke(255)
            strokeWeight(0.25)
            line(stars[i].x,stars[i].y,stars[i].z,stars[i+1].x,stars[i+1].y,stars[i+1].z)
        }
    } else {
        drumState = false
    }

    if(wonkCount === rand){
        tinkState = true
        wonkCount = 0
        rand = round(random(2,6))
        tinker.begin()
    }
}

function mouseDragged(){
    mouseAtk = map(mouseX, 0, width, 0.001, 2)
    mouseDec = map(mouseY, 0, height, 0.02, 2)
    mouseFreq = map(mouseY, 0, height, 100, 2000)
}

function mouseReleased(){
    if(mouseButton === LEFT){
        chord.envChange(mouseDec)
        chord.swell(mouseAtk)
        drum.add(1)
        drum.add(2)
    }
    if(mouseButton === RIGHT){
        chord.freqChange(mouseFreq)
        drum.add(0)
    }
}

function changer(){
    let x1 = mouseX-width/2
    let y1 = mouseY-height/2
    for(i=0;i<dots.length;i++){
        let d = dist(x1,y1,dots[i].x,dots[i].y)
        if(d < 50){
            let j = Math.floor(Math.random() * (i + 1));  
            [dots[i], dots[j]] = [dots[j], dots[i]];
            [e1[i], e1[j]] = [e1[j], e1[i]];
            chorder()
        }
    }
}

function chorder(){
    print(wonkState,drumState,tinkState)
    if(wonkState === true){
        clearInterval(chordSeq)
        drum.rate(0)
        chord.chord(0,cPos1)
        chord.chord(1,cPos1)
        chord.chord(2,cPos1)
        chord.chordStop()
        if(drumState === true){
            drum.partial(0)
            drum.partial(1)
            drum.partial(2)
            wonkCount++
        } else if(drumState === false){
            drum.stop(0)
            drum.stop(1)
            drum.stop(2)
        }
        cPos1++
        if(cPos1 === len){
            cPos1 = 0
        }
    } else if(wonkState === false){
        drum.rate(1)
        if(drumState === true){
            drum.play(0)
            drum.play(1)
            drum.play(2)
            clearInterval(chordSeq)
            chordSeq = setInterval(function(){
                chord.nextNote(0,cPos1)
                chord.nextNote(1,cPos2)
                chord.nextNote(2,cPos2)
            }, random(250,2000))
            wonkCount++
        } else if(drumState == false){
            chord.chord(0,cPos1)
            chord.chord(1,cPos1)
            chord.chord(2,cPos1)
            drum.stop(0)
            drum.stop(1)
            drum.stop(2)

        }
        cPos1++
        if(cPos1 === len){
            cPos1 = 0
        }

        cPos2++
        if(cPos2 === tenLen){
            cPos2 = 0
        }
        print(cPos2)
    }

    if(tinkState === false){
        tinker.stop()
    }
}


function mouseWheel(event){
    let s = map(event.delta,-150,150,-0.05,0.05)
    scalar += s
    print(scalar)
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


function infoOn(){
    console.log("on")
    setTimeout(function(){
        infoBox.html(randInfoMess[round(random(randInfoMess.length-1))])
    },2000) 
}

function infoOff(){
    infoBox.html("info")
}
