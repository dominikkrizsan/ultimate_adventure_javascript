import { updateGround, setupGround } from './ground.js'
import { updateHero, setupHero, getHeroRect, setHeroLose} from './hero.js'
import { updateMonster, setupMonster, getMonsterRects } from './monster.js'

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const worldElem = document.querySelector('[data-world]')
const scoreElem = document.querySelector('[data-score]')
const startScreenElem = document.querySelector('[data-start-screen]')

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })

let lastTime
let speedScale
let score
function update(time) {
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }
    const delta = time - lastTime

    updateGround(delta, speedScale)
    updateHero(delta, speedScale)
    updateMonster(delta, speedScale)
    updateSpeedScale(delta)
    updateScore(delta)

    if(checkLose()) return handleLose()

    lastTime = time
    window.requestAnimationFrame(update)

}

function checkLose(){
    const heroRect = getHeroRect()
    return getMonsterRects().some(rect => isCollosion(rect, heroRect))
}

function isCollosion(rect1, rect2){
    return (rect1.left < rect2.right && rect1.top < rect2.bottom && rect1.right > rect2.left && rect1.bottom > rect2.top)
}

function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
    score += delta * 0.01
    scoreElem.textContent = Math.floor(score)
}

function handleStart() {
    lastTime = null
    speedScale = 1
    score = 0
    setupGround()
    setupHero()
    setupMonster()
    startScreenElem.classList.add("hide")
    window.requestAnimationFrame(update)
}

function handleLose(){
    setHeroLose()
    setTimeout(() => {
        document.addEventListener("keydown", handleStart, { once: true })
        startScreenElem.classList.remove("hide")
    }, 100);
    $.ajax({
        type: 'post',
        data: 'score=' + score,
        url: 'gameover.php',
        success: function (data) {
            console.log(data)
        }
    });
}

function setPixelToWorldScale() {
    let worldToPixelScale
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT
    }

    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
    worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}

