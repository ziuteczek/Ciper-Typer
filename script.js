'use strict'
const textEl = document.querySelector('.text')
const timeEl = document.querySelector('.time')

async function startGame(gameContainer) {
  const quizLength = 20
  const letters = ['k', 'l', 'm']
  let mistakeCount = 0
  let letterToGuess = 0
  let time = 0

  const textArr = generateText(quizLength, ...letters)
  const text = textArr.map(e => {
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
    } else if (key === 'Backspace') {
      if (text[letterToGuess - 1].classList.contains('incorrect-letter')) {
        text[letterToGuess - 1].classList.remove('incorrect-letter')
        mistakeCount--
      } else {
        text[letterToGuess - 1].classList.remove('correct-letter')
      }
      letterToGuess--
    } else if (isLetter(key)) {
      text[letterToGuess].classList.add('incorrect-letter')
      letterToGuess++
      mistakeCount++
    }
  }
  clearInterval(timeInterval)
  const totalTime = Number(timeEl.textContent)
  const words =
    textArr.reduce(
      (spaceCount, sign) => (sign === '_' ? spaceCount + 1 : spaceCount),
      0
    ) + 1
  const wpm = Math.round((words / totalTime) * 100)
  // endGame(totalTime, words, wpm)
}
const getKey = () => {
  return new Promise(resolve => {
    document.addEventListener('keydown', e => {
      resolve(e.key)
    })
  })
}
const isLetter = sign => /^[a-zA-Z\s]$/.test(sign)

const randIndex = arrLength => Math.floor(Math.random() * arrLength)
function generateText(length, ...letters) {
  let text = []
  letters.push('_')
  for (let i = 0; i < length; i++) {
    if (i === 0 || i === length - 1 || text[i - 1] === '_') {
      text.push(letters[randIndex(letters.length - 1)])
    } else {
      text.push(letters[randIndex(letters.length)])
    }
  }
  return text
}
// #f4f0f0
startGame(textEl)
