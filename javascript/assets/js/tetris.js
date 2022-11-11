// 선택자
const tetrisWrap = document.querySelector(".tetris__wrap");
const playGround = tetrisWrap.querySelector(".playground > ul");
const TstartBtn = tetrisWrap.querySelector(".tetris__start");
const Tmsg = tetrisWrap.querySelector(".tetris__msg");


// 변수설정
let rows = 15; // 가로줄 만들기
let cols = 10; // 세로줄 만들기
let Tscore = 0;
let duration = 500;
let downInterval;
let tempMovingItem;
let tID = 0;
let gameover = false;

let Tsound = [
  "../assets/audio/music_audio02.mp3",
  "../assets/audio/Success.m4a",
  "../assets/audio/fail.mp3",
];
let TsoundBg = new Audio(Tsound[0]);
let TsoundMatch = new Audio(Tsound[1]);
let TsoundUnMatch = new Audio(Tsound[2]);

// 블록정보
const movingItem = {
  type: "",
  direction: 0, // 블록 모양
  top: 0,
  left: 0,
};

// 블록의 좌표값
const blocks = {
  Tmino: [
    [
      [2, 1],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [1, 2],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [1, 2],
      [0, 1],
      [2, 1],
      [1, 1],
    ],
    [
      [2, 1],
      [1, 2],
      [1, 0],
      [1, 1],
    ],
  ],
  Imino: [
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
  ],
  Omino: [
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
  ],
  Zmino: [
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [0, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [0, 2],
    ],
  ],
  Smino: [
    [
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
    [
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
  ],
  Jmino: [
    [
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
    ],
  ],
  Lmino: [
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 0],
      [2, 1],
    ],
  ],
};

// 시작하기
function init() {
  gameover = false;
  TsoundBg.play();
  playGround.innerHTML = "";
  tempMovingItem = { ...movingItem };
  for (let i = 0; i < rows; i++) {
    prependNewLine(); // 라인 만들기
  }
  generateNewBlock(); // 블럭만들기

  TstartBtn.removeEventListener("click", init);
  Tmsg.classList.remove("show");
}

// 블록 만들기
function prependNewLine() {
  const li = document.createElement("li");
  const ul = document.createElement("ul");
  for (let j = 0; j < cols; j++) {
    const matrix = document.createElement("li");

    ul.prepend(matrix);
  }

  li.prepend(ul);
  playGround.prepend(li);
}

// 블록 출력하기
function renderBlocks(moveType = "") {
  if (gameover) return;
  const { type, direction: dir, left, top } = tempMovingItem;
  const movingBlocks = document.querySelectorAll(".moving");
  movingBlocks.forEach((moving) => {
    moving.classList.remove(type, "moving");
  });

  blocks[type][dir].some((block) => {
    const x = block[0] + left;
    const y = block[1] + top;

    target = playGround.children[y]
      ? playGround.children[y].children[0].children[x]
      : null;
    const isAvailable = checkEmpty(target);

    if (isAvailable) target.classList.add(type, "moving");
    else {
      // 끝에 닿았다
      tempMovingItem = { ...movingItem };
      tID = setTimeout(() => {
        renderBlocks();
        if (moveType === "top") {
          clearTimeout(tID);
          seizeBlock();
        }
      }, 0);
      return true;
    }
  });

  movingItem.left = left;
  movingItem.top = top;
  movingItem.direction = dir;
}

// 블록 감지하기
function seizeBlock() {
  clearTimeout(tID);
  const movingBlocks = document.querySelectorAll(".moving");
  movingBlocks.forEach((moving) => {
    moving.classList.remove("moving");
    moving.classList.add("seized");
  });

  // 겜 졌는가 판단
  checkLose();

  // 점수 계산
  checkMatch();
}

// 졌는가
function checkLose() {
  const childNodes = Array.from(playGround.children)[0].querySelectorAll(
    "ul li"
  );
  childNodes.forEach((ch) => {
    if (ch.classList.contains("seized")) {
      gameover = true;
      TsoundUnMatch;
    }
  });
}

// 한줄 제거하기
function checkMatch() {
  const childNodes = Array.from(playGround.children);
  childNodes.forEach((child) => {
    let matched = true;
    child.children[0].childNodes.forEach((li) => {
      if (!li.classList.contains("seized")) {
        matched = false;
      }
    });
    if (matched) {
      child.remove();
      prependNewLine();
      Tscore++;
      TsoundMatch.play();
    }
  });
  generateNewBlock();
}

// 새로운 블럭 만들기
function generateNewBlock() {
  if (gameover) {
    TsoundBg.pause();
    Tmsg.classList.add("show");
    Tmsg.innerHTML = `
       당신의 점수 : ${Tscore}점
      `;
    TstartBtn.addEventListener("click", init);
    // TstartBtn.onclick(init);
    return;
  }
  clearInterval(downInterval);
  downInterval = setInterval(() => {
    moveBlock("top", 1);
  }, duration);

  const blockArray = Object.entries(blocks);
  const randomIndex = Math.floor(Math.random() * blockArray.length);
  movingItem.type = blockArray[randomIndex][0];
  movingItem.top = 0;
  movingItem.left = 4;
  movingItem.direction = 0;
  tempMovingItem = { ...movingItem };
  renderBlocks();
}

// 빈칸 확인하기
function checkEmpty(target) {
  if (!target || target.classList.contains("seized")) {
    return;
  }
  return true;
}

// 블록 움직이기
function moveBlock(moveType, amount) {
  tempMovingItem[moveType] += amount;
  renderBlocks(moveType);
}

// 방향 바꾸기
function changeDirection() {
  const direction = tempMovingItem.direction;
  direction === 3 ? (tempMovingItem.direction = 0) : tempMovingItem.direction++;
  renderBlocks();
}

// 빨리 내리기
function dropBlock() {
  clearInterval(downInterval);
  downInterval = setInterval(() => {
    moveBlock("top", 1);
  }, 10);
  renderBlocks();
}
// 이벤트
document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 32:
      dropBlock();
      break;
    case 37:
      moveBlock("left", -1);
      break;

    case 38:
      changeDirection();
      break;

    case 39:
      moveBlock("left", 1);
      break;

    case 40:
      moveBlock("top", 1);
      break;

    default:
      break;
  }
});
