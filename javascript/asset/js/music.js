const allMusic = [
    {
        name : "1. Cottonmouth -",
        artist : "Whole Other",
        img: "img01",
        audio: "music_audio01"
    },
    {
        name : "2. Down With Your Getup -",
        artist : "Mini Vandals",
        img: "img02",
        audio: "music_audio02"
    },
    {
        name : "3. Hey There -",
        artist : "half.cool",
        img: "img03",
        audio: "music_audio03"
    },
    {
        name : "4. Keep On Movin' -",
        artist : "King Canyon",
        img: "img04",
        audio: "music_audio04"
    },
    {
        name : "5. Kind of a Party -",
        artist : "Mini Vandals",
        img: "img05",
        audio: "music_audio05"
    },
    {
        name : "6. Love the Messenger -",
        artist : "Freedom Trail Studio",
        img: "img06",
        audio: "music_audio06"
    },
    {
        name : "7. No Doubt -",
        artist : "Yung Logos",
        img: "img07",
        audio: "music_audio07"
    },
    {
        name : "8. South Street Strut -",
        artist : "The Great North Sound Society",
        img: "img08",
        audio: "music_audio08"
    },
    {
        name : "9. The Monuments and Tunnels -",
        artist : "Bail Bonds",
        img: "img09",
        audio: "music_audio09"
    },
    {
        name : "10. Yes and No at the Same Time -",
        artist : "half.cool",
        img: "img10",
        audio: "music_audio10"
    }
]

const musicWrap = document.querySelector(".music__wrap");
const musicView = musicWrap.querySelector(".music__view .img img");
const musicName = musicWrap.querySelector(".music__view .title h3"); 
const musicArtist = musicWrap.querySelector(".music__view .title p");
const musicAudio = musicWrap.querySelector("#main-audio");
const musicPlay = musicWrap.querySelector("#control-play");
const musicPrevBtn = musicWrap.querySelector("#control-prev");
const musicNextBtn = musicWrap.querySelector("#control-next");
const musicProgress = musicWrap.querySelector(".progress");
const musicProgressBar = musicWrap.querySelector(".music__control .progress .bar");
const musicProgressCurrent = musicWrap.querySelector(".music__control .timer .current");
const musicProgressDuration = musicWrap.querySelector(".music__control .timer .duration");
const musicRepeat = musicWrap.querySelector("#control-repeat");
const musicListBtn = musicWrap.querySelector("#control-list");
const musicList = musicWrap.querySelector(".music__list");
const musicListUl = musicWrap.querySelector(".music__list ul");
const closeBtn = musicWrap.querySelector(".music__list .close_btn");

let musicIndex = 1;         // 현재 음악 인덱스

// 음악 재생
function loadMusic(num){
    musicName.innerText = allMusic[num-1].name;             // 뮤직 이름 로드
    musicArtist.innerText = allMusic[num-1].artist;         // 뮤직 아티스트 로드
    musicView.src = `../assets/img/${allMusic[num-1].img}.png`;     // 뮤직 이미지 로드
    musicView.alt = allMusic[num-1].name;                           // 뮤직 이미지 alt태그 로드
    musicAudio.src = `../assets/audio/${allMusic[num-1].audio}.mp3` // 뮤직 로드
}

// 재생 버튼
function playMusic(){
    musicWrap.classList.add("paused");
    musicPlay.setAttribute('title', '정지');
    musicPlay.setAttribute('class', 'stop');
    musicAudio.play();
};

// 정지 버튼
function pauseMusic(){
    musicWrap.classList.remove("paused");
    musicPlay.setAttribute('title', '재생');
    musicPlay.setAttribute('class', 'play');
    musicAudio.pause();
};

// 이전곡 듣기
function prevMusic(){
    musicIndex == 1 ? musicIndex = allMusic.length : musicIndex--;
    loadMusic(musicIndex);
    playMusic();
    playListMusic();
};

// 다음곡 듣기
function nextMusic(){
    musicIndex == allMusic.length ? musicIndex = 1 : musicIndex++;
    loadMusic(musicIndex);
    playMusic();
    playListMusic();
};


// 뮤직 진행바
musicAudio.addEventListener("timeupdate", e => {
    const currentTime = e.target.currentTime;             //현재 재생되는 시간
    const duration = e.target.duration;                   //오디오 총 길이
    let progressWidth = (currentTime/duration) * 100;     //전체 길이에서 현재 진행되는 시간을 백분위로 나눈값
    
    musicProgressBar.style.width = `${progressWidth}%`;

    // 전체 시간
    musicAudio.addEventListener("loadeddata", ()=>{
        let audioDuration = musicAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);                         //전체 시간(초)을 분단위로 쪼갬
        let totalSec = Math.floor(audioDuration % 60);                         //남은 초를 저장
        if(totalSec < 10) totalSec = `0${totalSec}`;                           //초가 한자릿수일때 앞에 0을 붙임
        musicProgressDuration.innerText = `${totalMin}:${totalSec}`;           //완성된 시간 문자열 출력
    })

    // 진행시간
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10) currentSec = `0${currentSec}`;
    musicProgressCurrent.innerText = `${currentMin}:${currentSec}`;

});

// 진행 버튼 클릭
musicProgress.addEventListener("click", (e) => {
    let progressWidth = musicProgress.clientWidth; // 진행바 전체 길이
    let clickedOffsetX = e.offsetX; // 진행바 기준으로 측정되는 X 좌표값
    let songDuration = musicAudio.duration; // 오디오 전체 길이
    musicAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration; // 백분위로 나눈 숫자에 다시 전체 길이를 곱해서 현재 재생값으로 바꿈
});

// 반복 버튼 클릭
musicRepeat.addEventListener("click",()=>{
    let getAttr = musicRepeat.getAttribute("class");

    switch(getAttr){
        case "repeat" :
            musicRepeat.setAttribute("class", "repeat-one");
            musicRepeat.setAttribute("title", "한곡 반복");
        break;
        case "repeat-one":
            musicRepeat.setAttribute("class", "shuffle");
            musicRepeat.setAttribute("title", "랜덤 반복");
        break;
        case "shuffle":
            musicRepeat.setAttribute("class", "repeat");
            musicRepeat.setAttribute("title", "전체 반복");
        break;
    }

})

// 오디오 끝나면
musicAudio.addEventListener("ended", ()=> {
    let getAttr = musicRepeat.getAttribute("class");

    switch(getAttr){
        case "repeat" :
            nextMusic();
        break;
        case "repeat-one" :
            playMusic();
        break;
        case "shuffle" :
            let randomIndex = Math.floor(Math.random() * allMusic.length + 1 );     //랜덤 인덱스 생성

            do {
                randomIndex = Math.floor(Math.random() * allMusic.length + 1 );
            } while ( musicIndex == randomIndex )
            musicIndex = randomIndex;           // 현재 인덱스를 랜덤 인덱스 변경
            loadMusic(musicIndex);              // 랜덤 인덱스가 반영된 현재 인덱스 값으로 음악을 다시 로드
            playMusic();                        // 로드한 음악을 재생
        break;
    }
    playListMusic();        //재생목록 업데이트
})

// 플레이 버튼
musicPlay.addEventListener("click", ()=>{
    const isMusicPaused = musicWrap.classList.contains("paused");     //음악이 재생중
    isMusicPaused ? pauseMusic() : playMusic();
})

// 정지 버튼
musicPlay.addEventListener("click", ()=>{
})

// 다음곡 버튼
musicNextBtn.addEventListener("click", ()=>{
    nextMusic();
})

// 이전곡 버튼
musicPrevBtn.addEventListener("click", ()=>{
    prevMusic();
})



// 뮤직 리스트 버튼
musicListBtn.addEventListener("click", ()=>{
    musicList.classList.toggle("show");
})
closeBtn.addEventListener("click", ()=>{
    musicList.classList.remove("show");
})

// 뮤직 리스트 구현하기
for(let i = 0; i < allMusic.length; i++){
    let li = `
            <li data-index="${i+1}">
                <strong>${allMusic[i].name}</strong>
                <em>${allMusic[i].artist}</em>
                <audio class="${allMusic[i].audio}" src ="../assets/audio/${allMusic[i].audio}.mp3"></audio>
                <span class="audio-duration" id="${allMusic[i].audio}">재생시간</span>
            </li> 
    `;

    // musicListUl.innerHTML += li;         // 한번에 로딩되어서 인식이 잘 안됌
    musicListUl.insertAdjacentHTML("beforeend", li);    // 하나씩 넣어져서 인식

    // 리스트에 음악 시간 불러오기

    let liAudioDuration = musicListUl.querySelector(`#${allMusic[i].audio}`);     // li 리스트에서 시간을 표시할 선택자를 가져옴
    let liAudio = musicListUl.querySelector(`.${allMusic[i].audio}`);             // li 리스트에서 오디오를 가져옴
    liAudio.addEventListener("loadeddata", ()=>{
        let audioDuration = liAudio.duration;                       // 오디오 전체 길이
        let totalMin = Math.floor(audioDuration / 60);              // 전체 길이를 분 단위로 쪼갬
        let totalSec = Math.floor(audioDuration % 60);              // 초 계산
        if(totalSec < 10) totalSec = `0${totalSec}`;                // 일 자리에 0 추가
        liAudioDuration.innerText = `${totalMin}:${totalSec}`;      //문자열 출력
        liAudioDuration.setAttribute("data-duration", `${totalMin}:${totalSec}`);
        
    });
}


// 뮤직 리스트를 클릭하면 재생
function playListMusic(){
    const musicListAll = musicListUl.querySelectorAll("li");        // 뮤직 리스트 목록
    for(let i=0; i<musicListAll.length; i++){
        let audioTag = musicListAll[i].querySelector(".audio-duration");

        if(musicListAll[i].classList.contains("playing")){          // 플레잉 클래스 존재 여부 확인
            musicListAll[i].classList.remove("playing");            // 플레잉 클래스 제거
            let adDuration = audioTag.getAttribute("data-duration");    //데이터 듀레이션 값 가져오기
            audioTag.innerText = adDuration;                            // 오디오 태그에 데이터 듀레이션값 출력
        }

        if(musicListAll[i].getAttribute("data-index") == musicIndex){       //현재 실행중인 데이터 인덱스값과 뮤직 인덱스값이 같을 경우
            musicListAll[i].classList.add("playing");       // 플레잉 클래스 추가
            audioTag.innerText = "재생중"                   // 재생중일 경우 텍스트 '재생중' 출력
        }


        musicListAll[i].setAttribute("onclick", "clicked(this)");
    }
}


// 뮤직 리스트 클릭하면...
function clicked(el){
    let getliIndex = el.getAttribute("data-index"); // 클릭한 리스트의 인덱스값 저장
    musicIndex = getliIndex;                        // 클릭한 인덱스 값을 뮤직 인덱스에 저장
    loadMusic(musicIndex);                          // 해당 인덱스 뮤직 로드
    playMusic();                                    // 음악 재생
    playListMusic();                                // 음악 리스트 업데이트
}


window.addEventListener("load", ()=> {
    loadMusic(musicIndex);  // 음악 재생
    playListMusic();        // 리스트 초기화
})


// 볼륨 조절
const audio = document.getElementById("main-audio");
const audioVolume = document.getElementById("volume-control");
const volumeIcon = document.querySelector(".volume_icon");
const volumeOffIcon = document.querySelector(".volumeOff_icon");

audioVolume.addEventListener("change", function (e) {
    audio.volume = this.value / 10;
    if (this.value == 0) {
        volumeIcon.classList.add("hide");
        volumeOffIcon.classList.add("show");
    } else {
        volumeIcon.classList.remove("hide");
        volumeOffIcon.classList.remove("show");
    }
});
