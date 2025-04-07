$(document).ready(function () {



  
//   //메인배너_____________________________
//   let $img = $(".changeimg ul li"),
//   $text = $(".changeimg ul li .des"),
//   oldImg=0,
//   newImg=0,
//   oldText=0,
//   newText=0,
//   count = $img.length;

// //이미지 전환효과 함수
// function changeImg(newImg){
// if(oldImg != newImg){
//   $img.eq(oldImg).removeClass("imgVisible");
//   $img.eq(newImg).addClass("imgVisible");
// };
// oldImg = newImg;
// };

// // 텍스트 전환효과 함수
// function changeText(newText){
//   if (oldText !== newText) {
//     console.log("텍스트 변경됨: ", newText); // 디버깅용 로그

//     // 모든 텍스트 숨기기 (초기화)
//     $text.removeClass("textVisible");

//     // 새로운 텍스트 보이게 설정
//     setTimeout(() => {
//       $text.eq(newText).addClass("textVisible");
//     }, 100); // 약간의 지연을 줘서 부드럽게 전환

//     oldText = newText;
//   }
// }

// //자동함수 생성
// function autoImg(){
// newImg++;
// if(newImg>count-1){ 
//   newImg=0;
// }
// changeImg(newImg);
// }; 
// function autoText(){
// newText++;
// if(newText>count-1){ 
//   newText=0;
// }
// changeText(newText);
// };
// timerImg = setInterval(autoImg,4000); 
// timerText = setInterval(autoText,4000);




//   //_____________________________
//   fadeIndicator = fadeContainer.find(".fade-indicator a"),
//   oldidx = 0,
//   idx = 0,
//   fadeCount = fadeImage.length,
//   interval = 4000;

// //Indicator(슬라이드버튼)
// fadeIndicator.click(function(){
// idx = $(this).index();
// fadeAni(idx);
// });





  // 텍스트 무한 복제______________
  const rotateText = document.querySelector('.rotate-text p');
const rotateTextContainer = document.querySelector('.rotate-text');

// 텍스트 복제 (3~4번 복제해서 길이를 충분히 늘림)
for (let i = 0; i < 3; i++) {
  let cloneText = rotateText.cloneNode(true);
  rotateTextContainer.appendChild(cloneText);
}

// 애니메이션 재시작 시 위치 조정
rotateText.addEventListener('animationiteration', () => {
  rotateText.style.transform = 'translateX(0)';
});








  


  // GNB 메뉴 hover 효과
  $(".gnb .main").hover(
    function () {
      $(this).find(".sub").stop().fadeIn();
    },
    function () {
      $(this).find(".sub").stop().fadeOut();
    }
  );

  // Weekly Best 슬라이드 기능
  let currentIndex = 0;
  const items = $(".weekly-best .items img");
  const totalItems = items.length;

  function slideItems(direction) {
    if (direction === "left") {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    } else {
      currentIndex = (currentIndex + 1) % totalItems;
    }

    const translateValue = -currentIndex * 160 + "px";
    $(".weekly-best .items").css("transform", "translateX(" + translateValue + ")");
  }

  $(".weekly-best button:first-of-type").click(function () {
    slideItems("left");
  });

  $(".weekly-best button:last-of-type").click(function () {
    slideItems("right");
  });



//New 슬라이드 무한
let $slider = $(".slide-list"),
      $slides = $(".slide-list li"),
      slideWidth = $slides.outerWidth(true), // 개별 슬라이드 너비 (마진 포함)
      slideCount = $slides.length,
      currentIdx = 0,
      speed = 1000, // 애니메이션 속도
      interval = 3000; // 자동 슬라이드 시간

  // 슬라이드 복제 (무한 슬라이드 만들기)
  $slider.append($slides.clone());

  function moveSlide() {
    currentIdx++;

    $slider.animate({ left: `-${slideWidth * currentIdx}px` }, speed, function(){
      // 마지막 슬라이드까지 이동하면, 첫 번째 슬라이드 위치로 리셋
      if (currentIdx >= slideCount) {
        $slider.css("left", "0px");
        currentIdx = 0;
      }
    });
  }

  // 자동 슬라이드 실행
  let slideTimer = setInterval(moveSlide, interval);

  // 호버 시 정지, 벗어나면 다시 실행
  $(".slider").hover(
    function() { clearInterval(slideTimer); },
    function() { slideTimer = setInterval(moveSlide, interval); }
  );
});