//--------------------- global ---------------------

let wrapper = document.getElementById("wrapper")
let header = document.getElementById("head")
let section = document.createElement("section")

let jumpSound = new Audio('./assets/jump2.mp3')
let hitSound = new Audio('./assets/hit2.mp3')
let soundOn = true;
allScores = []


document.body.addEventListener("keyup", (e) => {
    if (e.code === 'Enter') {
        renderGame()
    }
}, { once: true })


//--------------------- game ---------------------

function renderGame() {
    let soundBtn = document.createElement("button")
    let icon = document.createElement("i")
    soundBtn.classList.add("invisibleBtn")
    !soundOn ? soundBtn.classList.add("grey") : ""
    icon.classList.add("fa-solid", "fa-volume-high", "fa-lg")
    soundBtn.append(icon)

    let h1 = document.createElement("h1")
    h1.innerText = "Watch out for the bump!"

    let gameFrame = document.createElement("div")
    gameFrame.classList.add("gameFrame")

    let character = document.createElement("div")
    character.classList.add("character")

    let bump = document.createElement("div")
    bump.classList.add("bump")

    setTimeout(function () {
        bump.classList.add("moving")
    }, 500)

    let img = document.createElement("img")
    img.setAttribute("src", "assets/test.png")
    img.classList.add("img")

    let scoreSpan = document.createElement("span")
    let bestscoreSpan = document.createElement("span")

    wrapper.innerText = ""

    character.append(img)
    gameFrame.append(character, bump)
    wrapper.append(h1, gameFrame, scoreSpan, bestscoreSpan)
    header.innerHTML = ""
    header.append(soundBtn)

    soundBtn.addEventListener("click", () => {
        soundOn ? soundBtn.classList.add("grey") : soundBtn.classList.remove("grey")
        soundOn ? soundOn = false : soundOn = true
    })

    bestScore(allScores, bestscoreSpan)
    gameFunction(scoreSpan, character, bump, bestscoreSpan)
}

function gameFunction(scoreSpan, character, bump, bestscoreSpan) {
    let playerIsAlive = true
    let counter = 0
    scoreSpan.innerHTML = `Score: ${counter}`

    window.addEventListener("keydown", async (e) => {
        let isGrounded = true
        let bumpLeft = parseInt(window.getComputedStyle(bump).getPropertyValue("left"))
        parseInt(window.getComputedStyle(character).getPropertyValue("bottom")) > 40 ? isGrounded = false : ""
        if (e.code === 'Space' && playerIsAlive && isGrounded) {
            soundOn ? jumpSound.play() : ""
            character.classList.add("jump")
            setTimeout(() => {
                character.classList.remove("jump")
                playerIsAlive && bumpLeft < 270 ? counter = scorePoint(counter, scoreSpan) : ""
            }, 500);
        }
    })

    let intervalId = setInterval(function () {
        let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"))
        let bumpLeft = parseInt(window.getComputedStyle(bump).getPropertyValue("left"))
        if (bumpLeft > 90 && bumpLeft < 190 && characterBottom <= 50) {
            playerIsAlive = false
            soundOn ? hitSound.play() : ""

            bump.style.animation = "none"
            bump.style.left = bumpLeft + "px"
            character.style.bottom = characterBottom + "px"
            
            clearInterval(intervalId)
            allScores.push(counter)
            bestScore(allScores, bestscoreSpan)
            renderInfo()
        }
    }, 5);
}


//--------------------- score ---------------------

function bestScore(arr, elem) {
    let sortedArr = [...arr].sort((a, b) => { return a - b })
    elem.innerText = `Best score: ${sortedArr.slice(-1)}`
}

function scorePoint(counter, elem) {
    counter++
    elem.innerText = `Score: ${counter}`
    return counter
}


//--------------------- info ---------------------

function renderInfo() {
    let h2 = document.createElement("h2");
    h2.innerText = "Game over!"

    let reloadBtn = createBtn("try again")
    let infoBtn = createBtn("info")
    wrapper.append(h2, reloadBtn, infoBtn)

    reloadBtn.addEventListener("click", () => { renderGame() })

    infoBtn.addEventListener("click", () => {
        section.innerHTML = `<p>Hello! My name is Sofia, I'm a frontend developer student at Nackademin in Stockholm. Checkout my cv and portfolio at <a href="https://sofiaje.github.io/">sofiaje.github.io</a> or try again with the game, I think you'll get a hang of it pretty soon ;)</p>`
        wrapper.append(section)
    })
}


//--------------------- helping function ---------------------

function createBtn(text) {
    let btn = document.createElement("button")
    btn.classList.add("btn")
    btn.innerText = `${text}`
    return btn;
}