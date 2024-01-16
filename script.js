'use strict'
const textEl = document.querySelector('.text')
const timeEl = document.querySelector('.time')

const isLetter = sign => /^[a-zA-Z\s]$/.test(sign)

const randIndex = arrLength => Math.floor(Math.random() * arrLength)
function generateText(length, ...letters) {
  let text = []
  letters.push('_')
  for (let i = 0; i < length; i++) {
    if (i === 0 || i === length - 1 || text[i - 1] === ' ') {
      text.push(letters[randIndex(letters.length - 1)])
    } else {
      text.push(letters[randIndex(letters.length)])
    }
  }
  return text
}
async function startGame(gameContainer) {
  const quizLength = 20
  const letters = ['k', 'l', 'm']
  let mistakeCount = 0
  let letterToGuess = 0
  let time = 0
  const text = generateText(quizLength, ...letters).map(e => {
    const el = document.createElement('span')
    el.textContent = e
    gameContainer.append(el)
    return el
  })
  const timeInterval = setInterval(
    () => (timeEl.textContent = `${Math.trunc(++time / 10)}.${time % 10}`),
    100
  )
  while (letterToGuess < quizLength) {
    const key = await getKey()
    if (
      key === text[letterToGuess].textContent ||
      (key === ' ' && text[letterToGuess].textContent === '_')
    ) {
      text[letterToGuess].classList.add('correct-letter')
      letterToGuess++
    } else if (isLetter(key)) {
      text[letterToGuess].classList.add('incorrect-letter')
      mistakeCount++
    }
  }
  clearInterval(timeInterval)
  console.log(mistakeCount)
  console.log(Number(timeEl.textContent))
}
const getKey = () => {
  return new Promise(resolve => {
    document.addEventListener('keypress', e => {
      resolve(e.key)
    })
  })
}
const resultModal = (time, text) => {
  const modal = document.createElement('div')
  const blur = document.createElement('div')
}
// #f4f0f0
startGame(textEl)
