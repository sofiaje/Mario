let wrapper = document.getElementById("wrapper");
let startGameBtn = document.querySelector(".startGame")
let section = document.createElement("section")
let header = document.getElementById("head")

let jumpSound = new Audio('./assets/jump2.mp3')
let hitSound = new Audio('./assets/hit2.mp3')


let soundOn = true;

document.body.addEventListener("keyup", (e) => {
    if (e.code === 'Enter') {
        renderGame()
    }
}, { once: true })

function renderGame() {
    let soundBtn = document.createElement("button")
    let icon = document.createElement("i")
    soundBtn.classList.add("invisibleBtn")
    !soundOn ? soundBtn.classList.add("grey") : ""
    icon.classList.add("fa-solid", "fa-volume-high", "fa-lg")
    // fa-volume-xmark
    // fa-volume-low
    soundBtn.append(icon)

    let h1 = document.createElement("h1")
    h1.innerText = "Watch out for the bump!";

    let gameFrame = document.createElement("div")
    gameFrame.classList.add("gameFrame")

    let character = document.createElement("div")
    character.classList.add("character")

    let bump = document.createElement("div")
    bump.classList.add("bump")

    let img = document.createElement("img")
    img.setAttribute("src", "assets/test.png")
    img.classList.add("img")

    let score = document.createElement("p")
    score.classList.add("score")

    wrapper.innerText = ""

    character.append(img)
    gameFrame.append(character, bump)
    wrapper.append(h1, gameFrame, score)
    header.innerHTML = ""
    header.append(soundBtn)

    soundBtn.addEventListener("click", () => {
        soundOn ? soundBtn.classList.add("grey") : soundBtn.classList.remove("grey")
        soundOn ? soundOn = false : soundOn = true
    })

    gameFunction(score, character, bump)
}

function gameFunction(score, character, bump) {
    let playerIsAlive = true
    let counter = 0
    score.innerHTML = `Score: ${counter}`


    window.addEventListener("keydown", async (e) => {
        let isGrounded = true
        parseInt(window.getComputedStyle(character).getPropertyValue("bottom")) > 40 ? isGrounded = false : "" 
        if (e.code === 'Space' && playerIsAlive && isGrounded) {
            soundOn ? jumpSound.play() : ""
            character.classList.add("jump")
            setTimeout(() => {
                character.classList.remove("jump")
                playerIsAlive ? scorePoint() : ""
            }, 500);

        }

    })

    function scorePoint() {
        counter++
        score.innerText = `Score: ${counter}`
    }

    let intervalId = setInterval(function () {
        let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
        let bumpLeft = parseInt(window.getComputedStyle(bump).getPropertyValue("left"));
        if (bumpLeft > 90 && bumpLeft < 190 && characterBottom <= 50) {
            playerIsAlive = false
            soundOn ? hitSound.play() : ""

            bump.style.animation = "none"
            bump.style.left = bumpLeft + "px"
            character.style.bottom = characterBottom + "px"
            clearInterval(intervalId)
            renderInfo()
        }
    }, 5);

}

function renderInfo() {
    let h2 = document.createElement("h2");
    h2.innerText = "Game over!"

    let reloadBtn = createBtn("try again")
    let infoBtn = createBtn("info")
    wrapper.append(h2, reloadBtn, infoBtn)

    reloadBtn.addEventListener("click", () => {
        renderGame()
    })

    infoBtn.addEventListener("click", () => {
        section.innerHTML = `<p>Hello! My name is Sofia, I'm a frontend developer student at Nackademin in Stockholm. Checkout my cv and portfolio at <a href="https://sofiaje.github.io/">sofiaje.github.io</a> or try again with the game, I think you'll get a hang of it pretty soon ;)</p>`
        wrapper.append(section)
    })
}

//helping function
function createBtn(text) {
    let btn = document.createElement("button")
    btn.classList.add("btn")
    btn.innerText = `${text}`
    return btn;
}



