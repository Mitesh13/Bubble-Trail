const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

let bubbles = []
const maxArraySize = 200

canvas.height = window.innerHeight-5
canvas.width = window.innerWidth
let startFlag = false
const randomColors = [
    "#aa33ff",
    "#22ea55",
    "#23ccef",
    "#ff2344",
]

let mouse = {
    x:null,
    y:null
}

class Bubble
{
    constructor(e)
    {
        this.x = ((Math.random()-0.5)*50)+mouse.x
        this.y = ((Math.random()-0.5)*50)+mouse.y
        this.radius = 30
        this.maxRadius = 40
        this.color = randomColors[Math.floor(Math.random()*randomColors.length)]
    }

    draw()
    {
        c.fillStyle = this.color
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,360,false)
        c.fill()
        c.closePath()
    }
    update()
    {
        if(this.x<mouse.x+70 && this.x>mouse.x && this.y<mouse.y+70 && this.y>mouse.y)
        {
            if(this.radius<this.maxRadius)
                this.radius+=2
        }
        else
        {
            if(this.radius>0)
                this.radius-=0.5
        }
        this.draw()
    }
}

window.addEventListener('mousemove',(e)=>{
    
    mouse.x = e.x
    mouse.y = e.y
    // console.log(bubbles.length);
    // console.log(mouse.x);
    if(!startFlag)
    {
        animate()
        startFlag = true
    }
})

function animate()
{
    requestAnimationFrame(animate)
    c.clearRect(0,0,innerWidth,innerHeight)
    const bubble = new Bubble()
    bubbles.unshift(bubble)
    
    for(let i=0;i<bubbles.length;i++)
    {
        bubbles[i].update()
    }
    
    if(bubbles.length>maxArraySize-5)
    {
        for(let i=0;i<5;i++)
        {
            bubbles.pop()
        }
    }
    
}
