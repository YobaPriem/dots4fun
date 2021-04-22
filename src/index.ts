import * as dat from 'dat.gui'

const gui = new dat.GUI()
const canvas = <HTMLCanvasElement>document.getElementById('app')
const ctx = canvas.getContext('2d')
interface Props {
    dotsNum: number,
    isRepel: boolean,
    isCut: boolean
}

let props: Props = {
    dotsNum: 100,
    isRepel: false,
    isCut: false
}

gui.add(props, 'dotsNum', 1, 1000, 1).onChange((value) => {
    props.dotsNum = value

    const throttledFunc = throttle(init, 500)
}).listen()

gui.add(props, 'isRepel').onChange((value) => {
    props.isRepel = value
})

gui.add(props, 'isCut').onChange((value) => {
    props.isCut = value
})

type CanvasDot = {
    x: number,
    y: number,
    vx: number,
    vy: number,
    kvx: number,
    kvy: number
}

const blankDot: CanvasDot = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    kvx: 0,
    kvy: 0
}

let newDot: CanvasDot = blankDot

type CursorDot = {
    x: number,
    y: number,
    prevX: number,
    prevY: number,
    t: number
}

let mouse: CursorDot = {
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    t: 0 
}

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const render = (dots: CanvasDot[]) => {
    if (newDot.x !== 0) {
        dots.push(newDot)
        props.dotsNum = dots.length
        newDot = blankDot
    }

    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "#212121";
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    dots.map(drawDot)

    dots.forEach(dot1 => {
        ctx.beginPath()
        ctx.moveTo(dot1.x, dot1.y)

        dot1.kvx = normalizeK(dot1.kvx)
        dot1.kvy = normalizeK(dot1.kvy)

        if (distance(dot1, mouse) <= 150) {
            ctx.lineTo(mouse.x, mouse.y)
            ctx.fillStyle = '#eeeeee'
            ctx.stroke()
        }
        
        if (props.isRepel && distance(dot1, mouse) <= 50) {
            const kv = getKV()

            if (kv > 1) {
                dot1.kvx = kv
                dot1.kvy = kv

                if (mouse.x < mouse.prevX) {
                    dot1.kvx = -kv
                }
    
                if (mouse.y < mouse.prevY) {
                    dot1.kvy = -kv
                }
            }
        }

        dots.forEach(dot2 => {
            if (distance(dot1, dot2) <= 150) {
                if (!props.isCut || !ctx.isPointInPath(mouse.x, mouse.y)) {
                    ctx.lineTo(dot2.x, dot2.y)
                    // ctx.strokeStyle = `rgba(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256}, 1)`
                    ctx.strokeStyle = '#bcbcbc'
                    ctx.stroke()
                }
            }
        })
    })
}

const normalizeK = (k: number) => {
    let normalizedK = 1

    if (k > 1) {
        normalizedK = k- 0.15
    } else if (k < 1) {
        normalizedK = k + 0.15
    }

    return normalizedK
}

const getKV = () =>  {
    let kv: number = 200 * Math.abs(mouse.x - mouse.prevX) / (mouse.t / 86400 ** 2)

    return kv > 15 ? 15 : kv
}

const distance = (dot1: CursorDot | CanvasDot, dot2: CursorDot | CanvasDot, ) => {
    return Math.sqrt((dot1.x - dot2.x) ** 2 + (dot1.y - dot2.y) ** 2)
}

const drawDot = (dot: CanvasDot) => {
    ctx.beginPath()
    ctx.arc(dot.x, dot.y, 2, 0, 2 * Math.PI, true)
    ctx.fillStyle = '#fff'
    ctx.fill()
}

const fillCoordsArray = (num: number) => {
    const dots: CanvasDot[] = []

    for (let i = 0; i < num; i++) {
        dots.push(generateCoords())
    }

    return dots
}

const generateCoords = () => {
    const [
        x,
        y,
        vx,
        vy,
        kvx,
        kvy
    ]: number[] = [
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.floor(Math.random() * 60) - 30,
        Math.floor(Math.random() * 60) - 30,
        1,
        1
    ]

    return {x, y, vx, vy, kvx, kvy}
}

const move = (dots: CanvasDot[]) => {
    dots.forEach(dot => {
        if (dot.x < 0 || dot.x > canvas.width) {
            dot.vx = -dot.vx
        }

        if (dot.y < 0 || dot.y > canvas.height) {
            dot.vy = -dot.vy
        }

        dot.x += dot.vx * dot.kvx / 30;
        dot.y += dot.vy * dot.kvy / 30;
    })
}

const letsFuckinGo = (dots: CanvasDot[]) => {
    render(dots)
    move(dots)
    requestAnimationFrame(()=>letsFuckinGo(dots))
}

const init = () => {
    const dots = fillCoordsArray(props.dotsNum)
    letsFuckinGo(dots)
}

init()

canvas.addEventListener('mousemove', e => {
    mouse.prevX = mouse.x
    mouse.prevY = mouse.y
    mouse.x = e.clientX
    mouse.y = e.clientY
    mouse.t = Date.now() - e.timeStamp
})

canvas.addEventListener('click', e => {
    newDot = {
        x: e.clientX,
        y: e.clientY,
        vx: Math.floor(Math.random() * 60) - 30,
        vy: Math.floor(Math.random() * 60) - 30,
        kvx: 1,
        kvy: 1
    }
})

function throttle(func: any, ms: number) {
    let timeout: ReturnType<typeof setTimeout>

    function exec() {
        func.apply()
    }

    function clear() {
        timeout == undefined ? null : clearTimeout(timeout)
    }
    if(func !== undefined && ms !== undefined) {
        timeout = setTimeout(exec, ms)
    } else {
        console.error('callback function and the timeout must be supplied')
    }
    // API to clear the timeout
}