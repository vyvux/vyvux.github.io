const input = document.querySelector('input')
const text = document.querySelector('#text-display')
const redoButton = document.querySelector('#redo')
let wordOrder = 0
let point = 0
let theWord
let randomWords
let wordLength = 25
// setup typing 50 typing words
let str = 'be and off a in to have too it I that for you he with on do say this they at but we his from that not can by she or as what go their who get if would her all my make take about know will one time there year so think when which them some me people out into just see him your come could now than like other how then its our two more these want look first also because day more use no find man here thing give many well only those tell through woman back even very down may should call world school ask need feel three when state never become between high really something most another much family own out leave old while mean on keep student great let group big same seem country help talk where turn start hand might show part against place over'
let words = str.split(" ")
let firstWord = true
let startTime, endTime, wpm

start(wordLength)

// assess correctness of each character
input.addEventListener('input', function () {
    checkOngoingSpelling()
})

// assess full word spelling
input.addEventListener('keydown', function (e) {
    try {
        if (firstWord) {
            startTime = new Date().getTime()
            firstWord = false
        }
        if (e.code === 'Space' || e.code === 'Enter') {
            e.preventDefault()
            if (wordOrder < randomWords.length) {
                // textHighlight()
                checkFinishedSpelling(input.value)
                document.querySelector('#score').innerText = `Your score: ${point}/${wordLength}`
                input.value = ''
                wordOrder++
                if (wordOrder === randomWords.length) {
                    countAccuracy()
                    countWordPerMinute()
                }
                else textHighlight()
            }
        }
    } catch (error) {
        if (error instanceof TypeError) { logMyErrors(error)}
    }

})

redoButton.addEventListener('click', () => start(wordLength))

const short = document.querySelector('#short')
const medium = document.querySelector('#medium')
const long = document.querySelector('#long')
short.addEventListener('click', function () {
    wordLength = 25
    start(wordLength)
    short.classList.add('selected')
    medium.classList.remove('selected')
    long.classList.remove('selected')
})
medium.addEventListener('click', function () {
    wordLength = 50
    start(wordLength)
    short.classList.remove('selected')
    medium.classList.add('selected')
    long.classList.remove('selected')
})
long.addEventListener('click', function () {
    wordLength = 100
    start(wordLength)
    short.classList.remove('selected')
    medium.classList.remove('selected')
    long.classList.add('selected')
})


/**
 * check the finished input
    word turns orange if correct
    otherwise turns grey
 * @param {*} theWord to check
 */
function checkFinishedSpelling(theWord) {
    if (theWord === randomWords[wordOrder].innerText) {
        randomWords[wordOrder].style.color = '#eba834'
        point++
    } else {
        randomWords[wordOrder].style.color = 'grey'
    }
}

/**
 * check ongoing spelling
 * input field turns red background and white color when incorrect
 * otherwise as normal
 */

function checkOngoingSpelling() {
    if (input.value !== null && input.value !== randomWords[wordOrder].innerText.slice(0, input.value.length)) {
        incorrectInputStyle()
    } else {
        correctInputStyle()
    }
}

/**
 * highlight the current word on the run
 */
function textHighlight() {
    randomWords[wordOrder].style.color = 'red'
}

/**
 * start or restart, refresh word list
 * @param {*} number the size of word list
 */
function start(number) {
    input.value = ''
    correctInputStyle()
    wordOrder = 0
    point = 0
    firstWord = true
    text.innerHTML = ''
    for (let i = 0; i < number; i++) {
        text.innerHTML += `<span>${words[Math.floor(Math.random() * words.length)]}</span>` + ' '
    }
    randomWords = document.querySelectorAll('span')
    textHighlight()
    document.querySelector('#score').innerText = `Your score: ${point}/${wordLength}`
}

/**
 * display accuracy at when all the words are checked
 */
function countAccuracy() {
    document.querySelector('#acc').innerText = `Accuracy: ${(point / wordLength) * 100}%`
}

/**
 * count and display wpm
 */
function countWordPerMinute() {
    endTime = new Date().getTime()
    duration = (endTime-startTime)/60000
    wpm = point/duration
    document.querySelector('#wpm').innerText = `WPM: ${Math.round(point/duration)}`
}

/**
 * change input field style to correct
 */
function correctInputStyle() {
    input.style.backgroundColor = 'white'
    input.style.color = 'rosybrown'
}

/**
 * change input field style to incorrect
 */
function incorrectInputStyle() {
    input.style.backgroundColor = '#ff9999'
    input.style.color = 'white'
}

const wordSize = document.querySelectorAll('div button')


