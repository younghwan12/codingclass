const tetrisWrap = document.querySelector(".tetris__wrap");
const game = tetrisWrap.querySelector(".playground");
const playground = tetrisWrap.querySelector(".playground > ul");
const tetrisHeader = tetrisWrap.querySelector(".tetris__header");
const tetrisStart = tetrisWrap.querySelector(".tetris__start");
const tetrisScore = tetrisWrap.querySelector(".tetris__score");
const tetrisRestart = tetrisWrap.querySelector(".tetris__restart");
const tetrisText = tetrisWrap.querySelector(".tetris__text");



// variables
let rows = 15;
let cols = 10;
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

// 블록 정보
const movingItem = {
    type: "",
    direction: 0,       //블록 모양
    top: 0,
    left: 0
}

// 블록의 좌표값
const blocks = {
    Tmino : [
        [[2,1],[0,1],[1,0],[1,1]],      //Tmino 기본 모양
        [[1,2],[0,1],[1,0],[1,1]],      //Tmino 기본 모양2
        [[1,2],[0,1],[2,1],[1,1]],      //Tmino 기본 모양3
        [[2,1],[1,2],[1,0],[1,1]],      //Tmino 기본 모양4
    ],
    Imino : [
        [[0,0],[0,1],[0,2],[0,3]],
        [[0,0],[1,0],[2,0],[3,0]],
        [[0,0],[0,1],[0,2],[0,3]],
        [[0,0],[1,0],[2,0],[3,0]],
    ],
    Omino : [
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
    ],
    Zmino : [
        [[0,0],[1,0],[1,1],[2,1]],
        [[1,0],[0,1],[1,1],[0,2]],
        [[0,0],[1,0],[1,1],[2,1]],
        [[1,0],[0,1],[1,1],[0,2]],
    ],
    Smino : [
        [[1,0],[2,0],[0,1],[1,1]],
        [[0,0],[0,1],[1,1],[1,2]],
        [[1,0],[2,0],[0,1],[1,1]],
        [[0,0],[0,1],[1,1],[1,2]],
    ],
    Jmino : [
        [[0,2],[1,0],[1,1],[1,2]],
        [[0,0],[0,1],[1,1],[2,1]],
        [[0,0],[1,0],[0,1],[0,2]],
        [[0,0],[1,0],[2,0],[2,1]],
    ],
    Lmino : [
        [[0,0],[0,1],[0,2],[1,2]],
        [[0,0],[1,0],[2,0],[0,1]],
        [[0,0],[1,0],[1,1],[1,2]],
        [[0,1],[1,1],[2,0],[2,1]],
    ]
}

// console.log(tempMovingItem)
// 시작하기
function init(){
    
    tempMovingItem = {...movingItem};
    
    for( let i = 0; i<rows; i++){
        prependNewLine();       //블록 라인 만들기
    }    
    // renderBlocks();         //블록 출력하기
    generateNewBlock();     //블록 만들기
}

// 블록 만들기
function prependNewLine(){
    
        const li = document.createElement("li");
        const ul = document.createElement("ul");

        for(let j = 0; j<cols; j++){
            const matrix = document.createElement("li");
            ul.prepend(matrix);
        }

        li.prepend(ul);
        playground.prepend(li);
    
}


// 블록 출력하기
function renderBlocks(moveType = ""){
    // const ty = tempMovingItem.type;
    // const di = tempMovingItem.direction;
    // const to = tempMovingItem.top;
    // const le = tempMovingItem.left;

    // 블록의 각 정보 출력
    const {type, direction, top, left} = tempMovingItem;

    // console.log(blocks[type][direction])

    // 블록 움직일 때 클래스 제거
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach((moving) => {
        moving.classList.remove(type, "moving");
    })

    // x축에 블록의 배열 첫번째 + left ,  y축에 블록의 배열 두번째 + top값 추가
    blocks[type][direction].some(block => {
        const x = block[0] + left;     //2 0 1 1
        const y = block[1] + top;     //1 1 0 1

        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        const isAvailable = checkEmpty(target);

        if(isAvailable){
            // 일치시 moving 클래스 추가
            target.classList.add(type, "moving");
        } else {
            // 불 일치시 전 값으로 초기화
            tempMovingItem = {...movingItem};

            if (moveType === "end") {
                clearInterval(downInterval);
                tetrisHeader.style.display = "block";
                tetrisText.innerText = "GAME OVER";
                tetrisScore.innerText = `점수: ${score} 점`;
            }

            // 함수 안에 함수가 들어가므로 재귀함수 무한을 막기위해 setTimeout
            setTimeout(()=>{
                renderBlocks("end");

                // 맨밑 블록 감지
                if(moveType === "top"){
                    seizeBlock();
                }
            },0)
            
            return true;
        }        

        // console.log({playground})
    });

    // 계속 갱신
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
}

// 빈칸 확인하기
function checkEmpty(target){
    if(!target || target.classList.contains("seized")){
        return false;
    }
    return true;
}

// 블록 감지하기
function seizeBlock(){
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving =>{
        moving.classList.remove("moving");
        moving.classList.add("seized");
    })
    checkMatch();
}



// 한줄 제거하기
function checkMatch(){
    const childNodes = playground.childNodes;
    childNodes.forEach(child => {
        let matched = true;
        child.children[0].childNodes.forEach(li => {
            if(!li.classList.contains("seized")){
                matched = false;
            }
        })

        if(matched){
            child.remove();
            prependNewLine();
            score++;
            tetrisScore.innerText = `점수: ${score} 점`;
        }
    })
    generateNewBlock()
}

// 새로운 블럭 만들기
function generateNewBlock(){
    
    // 셋인터벌 중첩되는거 초기화하기
    clearInterval(downInterval);
    
    downInterval = setInterval(()=>{
        moveBlock("top" , 1)
    }, duration);
    
    const blockArray = Object.entries(blocks);
    const randomIndex = Math.floor(Math.random() * blockArray.length);
    movingItem.type = blockArray[randomIndex][0];
    
    tempMovingItem = {...movingItem};
    movingItem.top = 0;
    movingItem.left = 5;
    movingItem.direction = 0;

}


// 블록 움직이기
function moveBlock(moveType, amount){
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType);
}

// 모양 바꾸기
function changeDirection(){
    const direction = tempMovingItem.direction;
    direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1;
    renderBlocks();
}

// 빨리 내려가기
function dropBlock(){
    clearInterval(downInterval);
    downInterval = setInterval(()=>{
        moveBlock("top", 1);
    }, 5 )
}

// 키보드 이벤트
document.addEventListener("keydown", e => {
    switch(e.keyCode){

        // 오른쪽 키보드
        case 39 : 
            moveBlock("left", 1);
            break;
        // 왼쪽 키보드
        case 37 : 
            moveBlock("left", -1);
            break;
        // 아래 키보드
        case 40 : 
            moveBlock("top", 1);
            break;
        case 38 :
            changeDirection();
            break;
        case 32 :
            dropBlock();
            break;
        default :
            break;
            
    }
    // console.log(e)
})



// 시작버튼
tetrisStart.addEventListener("click", ()=>{
    tetrisHeader.classList.remove("show");
    game.style.display = "block";
    tetrisHeader.style.display = "none";
    tetrisStart.style.display = "none";
    tetrisRestart.style.display = "block";
    // tetrisStart.style.display;
    init();
})

// 재시작버튼
tetrisRestart.addEventListener("click", () => {
    playground.innerHTML = "";
    tetrisHeader.style.display = "none";
    init();
});