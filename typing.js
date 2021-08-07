const input = document.querySelector('input')
const text = document.querySelector('#text-display')
const redoButton = document.querySelector('#redo')
let wordOrder = 0
let point = 0
let theWord
let randomWords
let wordLength = 50
// setup typing 50 typing words
let str = 'be and off a in to have too it I that for you he with on do say this they at but we his from that not can by she or as what go their who get if would her all my make take about know will one time there year so think when which them some me people out into just see him your come could now than like other how then its our two more these want look first also because day more use no find man here thing give many well only those tell through woman back even very down may should call world school ask need feel three when state never become between high really something most another much family own out leave old while mean on keep student great let group big same seem country help talk where turn start hand might show part against place over'
let words = str.split(" ") 

start(wordLength)

// assess correctness of each character
input.addEventListener('input', function () {
    checkOngoingSpelling()
})

// assess full word spelling
input.addEventListener('keydown', function (e) {
    if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault()
        if (wordOrder < randomWords.length){
            textHighlight()
            checkFinishedSpelling(input.value)
            document.querySelectorAll('h3')[1].innerText = `Your score: ${point}/50`
            input.value = ''
            wordOrder++
            if (wordOrder === randomWords.length) countAccuracy()
        } 
        
    }
})

redoButton.addEventListener('click', () => start(wordLength))

const short = document.querySelector('#short')
const medium = document.querySelector('#medium')
const long = document.querySelector('#long')
short.addEventListener('click', function() {
    wordLength = 25
    start(wordLength)
    short.classList.add('underline')
    medium.classList.remove('underline')
    long.classList.remove('underline')
})
medium.addEventListener('click', function() {
    wordLength = 50
    start(wordLength)
    short.classList.remove('underline')
    medium.classList.add('underline')
    long.classList.remove('underline')
})
long.addEventListener('click', function() {
    wordLength = 100
    start(wordLength)
    short.classList.remove('underline')
    medium.classList.remove('underline')
    long.classList.add('underline')
})



function checkFinishedSpelling(theWord) {
    if (theWord === randomWords[wordOrder].innerText) {
        randomWords[wordOrder].style.color = 'gold'
        point++
    } else {
        randomWords[wordOrder].style.color = 'grey'
    }
}

function checkOngoingSpelling() {
    if (input.value !== null && input.value !== randomWords[wordOrder].innerText.slice(0, input.value.length)) {
        incorrectInputStyle()
    } else {
        correctInputStyle()
    }
}

function textHighlight(){
    randomWords[wordOrder].style.color = 'red'
}

function start(number){
    input.value = ''
    correctInputStyle()
    wordOrder = 0
    point = 0
    text.innerHTML = ''
    for (let i = 0; i < number; i++) {
        text.innerHTML += `<span>${words[Math.floor(Math.random() * words.length)]}</span>` + ' '
    }
    randomWords = document.querySelectorAll('span')
    textHighlight()
    document.querySelectorAll('h3')[1].innerText = `Your score: ${point}/50`
}

function countAccuracy(){
    document.querySelectorAll('h3')[2].innerText = `Accuracy: ${(point/50)*100}%`
}

function correctInputStyle(){
    input.style.backgroundColor = 'white'
        input.style.color = 'olive'
}
    
function incorrectInputStyle(){
    input.style.backgroundColor = '#ff9999'
    input.style.color = 'white'
}

const wordSize = document.querySelectorAll('div button')


