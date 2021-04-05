const canvas = <HTMLCanvasElement>document.getElementById('app')
const ctx = canvas.getContext('2d')

type CanvasCoords = {
    x: number,
    y: number
}

// canvas.width = document.body.clientWidth
// canvas.height = document.body.clientHeight

canvas.width = window.innerWidth
canvas.height = window.innerWidth

const render = (coordinates: CanvasCoords[]) => {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    coordinates.map(drawDot)

    coordinates.forEach(dot1 => {
        ctx.beginPath()
        ctx.moveTo(dot1.x, dot1.y)

        coordinates.forEach(dot2 => {
            const dist = Math.sqrt((dot1.x - dot2.x) ** 2 + (dot1.y - dot2.y) ** 2)
        
            if (dist <= 150) {
                ctx.lineTo(dot2.x, dot2.y)
                ctx.strokeStyle = `rgba(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256}, 1)`
                ctx.stroke()
            }
        })
    })
}

const drawDot = (set: CanvasCoords) => {
    ctx.beginPath()
    ctx.arc(set.x, set.y, 2, 0, 2 * Math.PI, true)
    ctx.fill()
}

const fillCoordsArray = (num: number = 100) => {
    const coords: CanvasCoords[] = []

    for (let i = 0; i < num; i++) {
        coords.push(generateCoords())
    }

    return coords
}

const generateCoords = () => {
    let [x, y]: number[] = [0, 0]

    x = Math.random() * canvas.width
    y = Math.random() * canvas.height

    return {x, y}
}

const move = (coordinates: CanvasCoords[]) => {
    coordinates.forEach(dot => {
        let vx: number = Math.floor(Math.random() * 60) - 30
        let vy: number = Math.floor(Math.random() * 60) - 30
        
        if (dot.x < 0 || dot.x > canvas.width) {
            vx = -vx
        }

        if (dot.y < 0 || dot.y > canvas.height) {
            vy = -vy
        }
        
        dot.x += vx / 60;
        dot.y += vy / 60;
    })
}

const letsFuckinGo = (coordinates: CanvasCoords[]) => {
    render(coordinates)
    move(coordinates)
    requestAnimationFrame(()=>letsFuckinGo(coordinates))
}

const coords = fillCoordsArray(500)

letsFuckinGo(coords)