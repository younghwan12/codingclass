// 01 HTTML / CSS 디자인 구성

// 02 클릭한 카드 뒤집기

// 03 두개의 카드 뒤집기 확인하기(첫번째 두번째)


const memoryWrap = document.querySelector(".memory__wrap");
const memoryCards = memoryWrap.querySelectorAll(".cards li");

const memoryFront = document.querySelector(".memory__header");
const startBtn = document.querySelector(".memory__header .start");
const chance = memoryWrap.querySelector(".card__header .chance");
const memoryScore = memoryWrap.querySelector(".memory__card .score");
const memoryResult = memoryWrap.querySelector(".memory__result");
const ResultScore = memoryWrap.querySelector(".memory__result .resultScore");

const resultRestart = memoryWrap.querySelector(".result__restart");
const clearRestart = memoryWrap.querySelector(".clear__restart");





// 시작버튼 클릭
startBtn.addEventListener("click",() => {
    memoryFront.style.display="none";
    shuffleCard()
})

let cardOne, cardTwo;

let disableDeck = false;
let matchedCard = 0;
let missedCard = 0;
let sound = [
    "../assets/audio/Success.m4a",
    "../assets/audio/fail.mp3",
    "../assets/audio/up.mp3"
]
let Hiscore = 100;

// 재시작버튼 클릭
resultRestart.addEventListener("click", ()=>{
    memoryResult.classList.remove("show")
    shuffleCard()
})



let soundMatch = new Audio(sound[0]);
let soundUnMatch = new Audio(sound[1]);
let soundSuccess = new Audio(sound[2]);

// 카드 뒤집기
function flipCard(e){
    let clickedCard = e.target;

    if(clickedCard !== cardOne && !disableDeck){
        clickedCard.classList.add("flip");

        // 카드1이 아니면 카드1값에 clickCard넣기
        if(!cardOne){
            return cardOne = clickedCard;
        }        
        cardTwo = clickedCard;
        disableDeck = true;
        // 결국 카드1, 카드2 클릭하면 matchCard로 두개의 이미지 src값만 나오게 설정


        let cardOneImg = cardOne.querySelector(".back img ").src;
        let cardTwoImg = cardTwo.querySelector(".back img ").src;

        matchCards(cardOneImg, cardTwoImg)
    }

    // console.log(cardOneImg)
    // console.log(cardTwoImg)
}

// 카드 확인(두개의 이미지 비교)
function matchCards(img1, img2){
    if(img1 == img2){
        // 같을 경우
        matchedCard++;
        memoryScore.innerText = matchedCard;

        // 정답맞춘 오디오
        soundMatch.play();

        if(matchedCard == 8){
            // alert("게임 오버")
            soundSuccess.play();

            ResultScore.innerHTML = ` ${Hiscore - missedCard * 33}점 입니다!`;

            memoryResult.classList.add("show");

        }
        // 이벤트 제거하고 초기화하는 과정
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        disableDeck = false;
    } else {
        missedCard++;
        
        
        // 일치하지 않는 경우(틀린음악, 이미지가 좌우로 흔들림)
        setTimeout(()=>{
            cardOne.classList.add("shakeX");
            cardTwo.classList.add("shakeX");
            // 틀렸을때 음악재생
            soundUnMatch.play();
            chance.innerText = missedCard + "회";
        }, 500);
        
        setTimeout(()=>{
            cardOne.classList.remove("shakeX", "flip");
            cardTwo.classList.remove("shakeX", "flip");

            cardOne = cardTwo = "";
            disableDeck = false;

            if(missedCard == 3){
                // alert("gameover")
                memoryResult.classList.add("show")  
                
                
                ResultScore.innerHTML = ` ${matchedCard * 12}점 입니다!`;


            }
        }, 1500)

        
    }
}



// 카드 섞기
function shuffleCard(){
    // 초기화
    cardOne = cardTwo = "";
    disableDeck = false;
    matchedCard = missedCard = 0;
    disableDeck = false;
    memoryScore.innerText = matchedCard;
    chance.innerText = missedCard;
    

    let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];

    // 0.5보다 큰경우 1 아닌경우 -1
    let result = arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    memoryCards.forEach((card, index) => {
        card.classList.remove("flip");
        
        setTimeout((e)=>{
            card.classList.add("flip");
        }, 200 * index);

        setTimeout(()=> {
            card.classList.remove("flip");
            card.classList.remove("shakeX");
        }, 4000)

        let ImgTag = card.querySelector(".back img");
        ImgTag.src = `../assets/img/memory_icon0${arr[index]}.png`
    })
}
// 카드 클릭
memoryCards.forEach(card => {
    card.addEventListener("click", flipCard);
})