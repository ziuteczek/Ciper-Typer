"use strict";
const textEl = document.querySelector(".text");

const randIndex = (arrLength) => Math.floor(Math.random() * arrLength);
function generateText(length, ...letters) {
  let text = [];
  letters.push(" ");
  for (let i = 0; i < length; i++) {
    if (i === 0 || i === length - 1 || text[i - 1] === " ") {
      text.push(letters[randIndex(letters.length - 1)]);
    } else {
      text.push(letters[randIndex(letters.length)]);
    }
  }
  return text;
}
async function startGame(gameContainer) {
  const text = generateText(20, "k", "l", "m").map((e) => {
    const el = document.createElement("span");
    el.textContent = e;
    gameContainer.append(el);
    return el;
  });
  let letterToGuess = 0;
  while (true) {
    const key = await getKey();
    if (key === text[letterToGuess].textContent) {
      if (key === " ") {
        text[letterToGuess].textContent = "_";
      }
      text[letterToGuess].style.color = "red";
      letterToGuess++;
    }
  }
}
const getKey = () => {
  return new Promise((resolve) => {
    document.addEventListener("keyup", (e) => {
      resolve(e.key);
    });
  });
};
// #f4f0f0
startGame(textEl);
