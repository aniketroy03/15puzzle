"use strict";

const boxes = [[], [], [], []];

for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    const box = document.getElementById(`box${i}${j}`);
    boxes[i][j] = box;
  }
}

function shuffle() {
  let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// Timer function
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

let timer;
let running = false;
let seconds = 0;
let minutes = 0;

// Function to update the stopwatch display
function updateDisplay() {
  secondsElement.textContent = seconds.toString().padStart(2, "0");
  minutesElement.textContent = minutes.toString().padStart(2, "0");
}

// Function to reset the stopwatch
function reset() {
  clearInterval(timer);
  running = false;
  seconds = 0;
  minutes = 0;
  updateDisplay();
}

// Function to start or stop the stopwatch
function toggleStartStop() {
  if (running) {
    clearInterval(timer);
  } else {
    timer = setInterval(() => {
      seconds += 1;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
      }
      updateDisplay();
    }, 1000);
  }
  running = !running;
}

// Event listeners
// startStopBtn.addEventListener("click", toggleStartStop);
// resetBtn.addEventListener("click", reset);

// init
const init = function () {
  reset();
  const shuffledBoxes = shuffle();

  let index = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (!shuffledBoxes[index]) {
        document.getElementById(`box${i}${j}`).textContent = "";
        document.getElementById(`box${i}${j}`).classList.add("empty");
      } else {
        document.getElementById(`box${i}${j}`).textContent = shuffledBoxes[index];
      }
      index += 1;
    }
  }
  toggleStartStop();
};
init();
//

const isValidPos = function (i, j, n, m) {
  if (i < 0 || j < 0 || i > n - 1 || j > m - 1) return false;
  return true;
};

const getAdjacent = function (arr, i, j) {
  let n = arr.length;
  let m = arr[0].length;

  let adj = [];

  if (isValidPos(i - 1, j, n, m)) adj.push([i - 1, j]);
  if (isValidPos(i, j - 1, n, m)) adj.push([i, j - 1]);
  if (isValidPos(i, j + 1, n, m)) adj.push([i, j + 1]);
  if (isValidPos(i + 1, j, n, m)) adj.push([i + 1, j]);

  return adj;
};

/*
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    console.log(boxes[i][j]);
  }
}
*/

for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    boxes[i][j].addEventListener("click", function () {
      const clickedBox = boxes[i][j];
      const adjBoxes = getAdjacent(boxes, i, j);
      for (let i = 0; i < adjBoxes.length; i++) {
        // boxes[adjBoxes[i][0]][adjBoxes[i][1]];
        const emptyBox = boxes[adjBoxes[i][0]][adjBoxes[i][1]];
        if (emptyBox.classList.contains("empty")) {
          emptyBox.classList.remove("empty");
          emptyBox.textContent = clickedBox.textContent;

          clickedBox.classList.add("empty");
          clickedBox.textContent = "";
        }
      }

      // Check for winning
      let count = 1;
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          // console.log(boxes[j][i].textContent);
          if (Number(boxes[j][i].textContent) === count) {
            count++;
          } else {
            break;
          }
        }
      }
      if (count - 1 === 15) {
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            if (i === 3 && j === 4) break;
            boxes[i][j].classList.add("win");
          }
        }
        toggleStartStop();
      }
    });
  }
}

// Rollback
