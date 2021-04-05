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

const letsFuckinGo = (coordinates: CanvasCoords[]) => {
    coordinates.map(drawDot)

    for (let i = 0; i < coordinates.length; i++) {
        const dot1 = coordinates[i]
        ctx.beginPath()
        ctx.moveTo(dot1.x, dot1.y)

        for (let j = 0; j < coordinates.length; j++) {
            const dot2 = coordinates[j]
            const dist = Math.sqrt((dot1.x - dot2.x) ** 2 + (dot1.y - dot2.y) ** 2)

            if (dist <= 200) {
                ctx.lineTo(dot2.x, dot2.y)
                ctx.strokeStyle = `rgba(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256}, 1)`
                ctx.stroke()
            }
        }
    }
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

const coords = fillCoordsArray(10000)

console.log(coords)

letsFuckinGo(coords)