import { incrementCustomProperty, setCustomProperty, getCustomProperty, } from "./updateCustomProperty.js"

const heroElem = document.querySelector("[data-hero]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const HERO_FRAME_COUNT = 2
const FRAME_TIME = 100
let isJumping
let heroFrame
let currentFrameTime
let yVelocity

export function setupHero() {
    isJumping = false
    heroFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(heroElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
}

export function updateHero(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
}

export function getHeroRect(){
    return heroElem.getBoundingClientRect()
}

export function setHeroLose(){
    heroElem.src = "imgs/hero-lose.png"
}

function handleRun(delta, speedScale) {
    if (isJumping) {
        heroElem.src = `imgs/hero-stationary.png`
        return
    }

    if (currentFrameTime >= FRAME_TIME) {
        heroFrame = (heroFrame + 1) % HERO_FRAME_COUNT
        heroElem.src = `imgs/hero-run-${heroFrame}.png`
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
}

function handleJump(delta) {
    if (!isJumping) return
    incrementCustomProperty(heroElem, "--bottom", yVelocity * delta)
    if (getCustomProperty(heroElem, "--bottom") <= 0) {
        setCustomProperty(heroElem, "--bottom", 0)
        isJumping = false
    }

    yVelocity -= GRAVITY * delta
}

function onJump(e) {
    if (e.code !== "Space" || isJumping) return
    yVelocity = JUMP_SPEED
    isJumping = true
}