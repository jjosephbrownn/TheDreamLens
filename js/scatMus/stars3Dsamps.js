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

let frac
let fdur1,fdur2,sdur1,sdur2
let s1len,s2len
let range
let int1,int2,int3 
let meller

let song
let infoBox
let structure = 0

let loadImg
let loadText
let loadStep

function preload(){
    typ = loadFont("/fonts/PfefferMediaeval.otf")
}

function setup(){	
    createCanvas(windowWidth,windowHeight,WEBGL)

    let td = select("#loader")

    td.class("loaded")
    angleMode(DEGREES) 
    angleX = 0
    angleY = 0


    let genPrint = sessionStorage.getItem("prevPlace")
    if(genPrint === "scatter"){
        frac = new fracture(2)//facture sounds
        song = new songer(round(random(15)))//simple sounds
        frac.params()
    } else if (genPrint === "repurpose"){
        frac = new fracture(0,random([0,1,2]))
        song = new songer(round(random(15)))
        frac.params()
    }   

    setTimeout(function(){
        fdur1 = frac.dur1()
        fdur2 = frac.dur2()
        sdur1 = song.dur(0)
        sdur2 = song.dur(1)
    },5000)


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
        numMoves = Math.round(Math.random()*12)+4
        starMove = 0
        structure++
        frac.shuf()
        frac.clear()
        if(structure === 2){
            song.songStop(0)
            song.songStop(1)
        }else if(structure === 3){
            structure = 0;
        }
    }

}

function mousePressed(){
    if(structure === 0){
        if(mouseButton === LEFT){
            let place1 = map(mouseX,0,width,0,fdur1)
            let place2 = map(mouseY,0,height,0,fdur2)
            frac.add(0,place1)
            frac.add(1,place2)
            frac.add(2,0)
            song.alter(round(random(0,15)),round(random()))
            song.songBegin(0)
            song.songBegin(1)
            starMove++
        } else if(mouseButton === RIGHT){
           frac.fracBegin(0)
           frac.fracBegin(1)
        } 

    } else if(structure === 1){
        if(mouseButton === LEFT){
            frac.fracBegin(2)
            let place1 = map(mouseX,0,width,0,fdur1)
            let place2 = map(mouseY,0,height,0,fdur2)
            frac.add(0,place1)
            frac.add(1,place2)
            song.alter(round(random(0,15)),round(random()))
            song.songBegin(0)
            song.songBegin(1)
            starMove++
        } else if(mouseButton === RIGHT){
            frac.samplePlayCont(0,random(-1,1))
            frac.samplePlayCont(1,random(-1,1))  
        } 
    } else if(structure === 2){
        if(mouseButton === LEFT){
            frac.fracBegin(2)
            let place1 = map(mouseX,0,width,0,fdur1)
            let place2 = map(mouseY,0,height,0,fdur2)
            frac.add(0,place1)
            frac.add(1,place2)
            starMove++
        } else if(mouseButton === RIGHT){
            frac.fracBegin(0)
            frac.fracBegin(1)  
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
        if(structure === 1){
            frac.sweep(map(mouseY,0,height,0,5000))
        }
    } else if(mouseButton === RIGHT){
        angleY = map(mouseX,0,width,-180,180)
        angleX = map(mouseY,0,height,-180,180)
    } 
}

function mouseReleased(){
    if(structure === 0){
        frac.fracStop(2)
        frac.patterns()
        if(mouseButton === RIGHT){
            frac.fracStop(0)
            frac.fracStop(1)
        }
    }else if(structure === 1){
        if(mouseButton === LEFT){
            frac.fracStop(2)
        }else if(mouseButton === RIGHT){
            frac.samplePause(0)
            frac.samplePause(1)
        }
    }else if(structure === 2){
        if(mouseButton === RIGHT){
            frac.fracStop(0)
            frac.fracStop(1)
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
