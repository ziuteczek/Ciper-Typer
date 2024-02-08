'use strict'
const textEl = document.querySelector('.text')
const timeEl = document.querySelector('.time')

async function startGame(gameContainer, gameText = ['k', 'l', 'm']) {
  const quizLength = gameText.length
  let letterToGuess = 0
  let time = 0

  const textArr =
    typeof gameText === 'string'
      ? gameText.split('')
      : generateText(50, ...gameText)
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

  while (letterToGuess < 50) {
    console.log(quizLength)
    const key = await getKey()
    switch (key) {
      case ' ':
        if (text[letterToGuess].textContent !== '_') break
      case text[letterToGuess].textContent:
        text[letterToGuess].classList.add('correct-letter')
        letterToGuess++
        break
      case 'Backspace':
        if (letterToGuess === 0) break
        if (text[letterToGuess - 1].classList.contains('incorrect-letter')) {
          text[letterToGuess - 1].classList.remove('incorrect-letter')
        } else {
          text[letterToGuess - 1].classList.remove('correct-letter')
        }
        letterToGuess--
        break
      default:
        if (isLetter(key)) {
          text[letterToGuess].classList.add('incorrect-letter')
          letterToGuess++
        }
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
  // return gameScore
}
const getKey = () => {
  return new Promise(resolve => {
    document.addEventListener('keydown', e => {
      if (e.key === 'backspace') e.preventDefault()
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
