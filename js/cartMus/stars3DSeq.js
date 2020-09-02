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

let strings
let drums
let pos1 = 0
let pos2 = 0
let pos3 = 0
let bpmPos = 0
let len
let placeInt
let bpms = []
let masterBPM
let wonkyBPM
let wonkyInt
let stringInt
let funnyMessage

let frags = ["xe","us","den","tal","arc","lak","tuus","eck","ten","lam","gi","zlo","cran"]
let poss = []
let typ
let starName
let infoBox

let loadImg
let loadText
let loadStep
let structure = 0

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
    angleX = 0
    angleY = 0

    numDots = 12   

    xWidth = 300
    cx = -xWidth

    for(i=0;i<200;i++){
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

    masterBPM = random(40,60)
    bpms = [masterBPM,masterBPM*2,masterBPM*2.5,masterBPM*0.75]
    wonkyBPM = masterBPM*0.85
    wonkyInt = (masterBPM/wonkyBPM)*1000

    strings = new aphex(loops,random(30,48),masterBPM,8)//loops, midi oct, pace, rhythm length
    strings.startUp()
    posLen = strings.length()-1
    len = strings.length()
    let thisString = strings.string()

    drums = new board(8,masterBPM)

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
}

function mousePressed(){
    if(starMove>numMoves){
        starName = markov()
        numMoves = Math.round(Math.random()*12)+4
        starMove = 0
        structure++
        if(structure === 2){
            strings.section()
        } else if(structure === 5){
            strings.section()
            setTimeout(function(){               
                strings.stop(1)
                strings.stop(3)
                drums.stop(0)                
                drums.stop(2)                
                structure = 6
                funnyMessage.style("display","block")
            },random(10000,30000))

            setTimeout(function(){
                strings.stop(0)
                strings.stop(2)
                drums.stop(1)
                drums.stop(3)
            },random(30000,60000))
        }
    }

    if(structure === 0){
         if(mouseButton === LEFT){
            starMove++
            strings.fmChange(map(mouseY,0,height,10,2000),map(mouseY,0,height,-10,10))
            strings.play(0)         
            strings.play(2)          
        } else if(mouseButton === RIGHT){
            strings.fmChange(map(mouseY,0,height,10,2000),map(mouseY,0,height,-10,10))
            strings.play(0)
            strings.play(1)
            strings.play(2)
            drums.play(0)
            drums.play(1)
        }
    } else if (structure === 1){
         if(mouseButton === LEFT){
            strings.pos(random([0,1,2]))
            starMove++
            strings.fmChange(map(mouseY,0,height,10,2000),map(mouseY,0,height,-10,10))
            strings.play(0)
            strings.play(1)
            strings.play(2)
        } else if(mouseButton === RIGHT){
            strings.fmChange(map(mouseY,0,height,10,2000),map(mouseY,0,height,-10,10))
            strings.play(0)
            strings.play(1)
            strings.play(2)
            drums.play(0)
            drums.play(1)
            drums.play(2)
        }        
    } else if (structure === 2){
         if(mouseButton === LEFT){
            strings.pos(random([0,1,2]))
            starMove++
            strings.fmChange(map(mouseY,0,height,10,2000),map(mouseY,0,height,-10,10))
            strings.play(0)
            strings.play(1)
            strings.play(2)
            drums.play(0)
            drums.play(1)
            drums.play(2)
            drums.play(3)
        } else if(mouseButton === RIGHT){
            strings.tuneBPM(masterBPM)
            strings.bpm(masterBPM)
            drums.add(random([0,2]))
            strings.fmChange(map(mouseY,0,height,10,2000),map(mouseY,0,height,-10,10))
            strings.play(0)
            strings.play(1)
            strings.play(2)
            strings.play(3)
            drums.play(0)
            drums.play(1)
        }         
    } else if (structure === 3){
         if(mouseButton === LEFT){
            strings.pos(random([0,1,2]))
            starMove++
            strings.fmChange(map(mouseY,0,height,10,2000),map(mouseY,0,height,-10,10))
            strings.play(0)
            strings.play(1)
            strings.play(2)
            strings.play(3)
            drums.play(0)
            drums.play(1)
            drums.play(2)
        } else if(mouseButton === RIGHT){
            drums.add(random([0,2]))
            strings.fmChange(map(mouseY,0,height,10,2000),map(mouseY,0,height,-10,10))
            strings.stop(1)
            placeInt = setInterval(function(){
                strings.tuneBPM(bpms[bpmPos])
                bpmPos++
                if(bpmPos === 3){bpmPos = 0}
            },random(1000,2000))
        }           
    } else if (structure === 4){
         if(mouseButton === LEFT){
            drums.add(random([0,2]))           
            drums.altPat(2,1)
            starMove++
            strings.nextNote(0)
            strings.nextNote(2)
            drums.nextNote(0)
            drums.nextNote(2)
        } else if(mouseButton === RIGHT){
            stringInt = setInterval(function(){
                strings.nextNote(0)
                strings.nextNote(2)
            },wonkyInt)
           
            drums.play(0)
            drums.play(1)
            drums.play(2)
            drums.play(3)
            
        }           
    } else if (structure === 5){
        clearInterval(stringInt)
        if(mouseButton === LEFT){
            strings.tuneBPM(masterBPM)
            strings.altStringer(1)
            drums.altPat(2,1)    
            strings.pos(random([0,1,2]))
            strings.bpm(wonkyBPM)       
            strings.play(0)
            strings.play(1)
            strings.play(2)
            strings.play(3)
            drums.play(0)
            drums.play(1)
        } else if(mouseButton === RIGHT){ 
            strings.altStringer(0)
            drums.altPat(2,0)
            strings.bpm(masterBPM)           
            strings.play(0)
            strings.play(2)
            strings.play(3)
            drums.play(0)
            drums.play(1)
            drums.play(2)
            drums.play(3)
            
            placeInt = setInterval(function(){
                strings.tuneBPM(bpms[bpmPos])
                bpmPos++
                if(bpmPos === 3){bpmPos = 0}
            },random(1000,2000))
        }           
    }
}

function mouseDragged(){
    let mouseEnv = map(mouseX,0,width,0.1,1)
    constrain(mouseEnv, 0.1, 1)
    strings.envChange(mouseEnv)
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
        strings.bpm(map(mouseY,0,height,20,120))

    } else if(mouseButton === RIGHT){
        angleY = map(mouseX,0,width,-180,180)
        angleX = map(mouseY,0,height,-180,180)
    } 
}

function mouseReleased(){
    clearInterval(placeInt)
    if(structure === 0 || structure === 1 || structure === 2){
        if(mouseButton === LEFT){
            strings.stop(0)
            strings.stop(1)
            strings.stop(2)
            drums.stop(0)
            drums.stop(1)
            drums.stop(2)
            drums.stop(3)
            strings.stop(3)
        }else if(mouseButton === RIGHT){
            strings.stop(0)
            strings.stop(1)
            strings.stop(2)
            strings.stop(3)
            drums.stop(0)
            drums.stop(1)
            drums.stop(2)
            drums.stop(3)
            strings.stop(3)
        }
    } else if(structure === 3){
        if(mouseButton === LEFT){
            return null
        }else if(mouseButton === RIGHT){
            clearInterval(placeInt)
            strings.tuneBPM(masterBPM)
        }
    } else if(structure === 4){
        if(mouseButton === LEFT){
            strings.stop(0)
            strings.stop(1)
            strings.stop(2)
            strings.stop(3)
            drums.stop(0)
            drums.stop(1)
            drums.stop(2)
        }else if(mouseButton === RIGHT){
            strings.stop(0)
            strings.stop(1)
            strings.stop(2)
            strings.stop(3)
            drums.stop(0)
            drums.stop(1)
        }
    }else if(structure === 5){
        if(mouseButton === LEFT){
            strings.stop(1)
            strings.stop(3)
        }else if(mouseButton === RIGHT){
            clearInterval(placeInt)
            strings.stop(3)
            drums.stop(2)
        }
    }
}

function mouseWheel(event){
    let s = map(event.delta,-150,150,-0.05,0.05)
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


function infoOn(){

    setTimeout(function(){
        infoBox.html(randInfoMess[round(random(randInfoMess.length-1))])
    },2000)
    
}

function infoOff(){
    infoBox.html("info")
}
