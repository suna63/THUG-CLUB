$(document).ready(function(){

  //메인배너------------------------------------
  let $img = $(".changeimg ul li"),
    $text = $(".changeimg ul li .des"),
    $indicator = $(".fade-indicator a"),
    oldImg = 0,
    newImg = 0,
    oldText = 0,
    newText = 0,
    count = $img.length;

  // 이미지 전환
  function changeImg(newImg){
    if (oldImg !== newImg) {
      $img.eq(oldImg).removeClass("imgVisible");
      $img.eq(newImg).addClass("imgVisible");
    }
    oldImg = newImg;
  }

  // 텍스트 전환
  function changeText(newText){
    if (oldText !== newText) {
      $text.removeClass("textVisible");
      setTimeout(() => {
        $text.eq(newText).addClass("textVisible");
      }, 100);
      oldText = newText;
    }
  }

  // indicator 전환
  function changeIndicator(index) {
    $indicator.removeClass("active");
    $indicator.eq(index).addClass("active");
  }

  // 자동 전환
  function autoImg(){
    newImg++;
    if (newImg > count - 1) {
      newImg = 0;
    }
    changeImg(newImg);
    changeIndicator(newImg); // 항상 실행되게
  }
  function autoText(){
    newText++;
    if (newText > count - 1) {
      newText = 0;
    }
    changeText(newText);
  }

  let timerImg = setInterval(autoImg, 6000);
  let timerText = setInterval(autoText, 6000);

  // 인디케이터 클릭 시 수동 전환
  $indicator.click(function(e){
    e.preventDefault();
    let index = $(this).index();
    changeImg(index);
    changeText(index);
    changeIndicator(index);
    newImg = index;
    newText = index;
  });
  

  //menu----------------------------------------
  const symbolMenu = document.querySelector(".symbol1");
  const sectionMenu = document.querySelector(".category");

  if (symbolMenu && sectionMenu) {
    const observerMenu = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          symbolMenu.classList.remove("show");
          void symbolMenu.offsetWidth; // 리플로우 유도
          symbolMenu.classList.add("show");
        } else {
          symbolMenu.classList.remove("show");
        }
      });
    }, {
      root: null,
      threshold: 0.3
    });

    observerMenu.observe(sectionMenu);
  }

  
  //best----------------------------------------
  let bannerWidth = $(".items ul li").outerWidth(); // 개별 li 크기
  let gap = parseInt($(".items ul").css("gap")); // gap 값 가져오기
  bannerWidth += gap; // gap을 포함한 총 이동 거리

  // 마지막 li를 앞으로 보내고 ul의 left 초기 위치 설정
  $(".items ul li:last").prependTo(".items ul");
  $(".items ul").css("left", -(bannerWidth * 1.5) + "px"); // 정확한 중앙 정렬

  // 자동 슬라이드 함수
  function bannerAuto(){
    $(".items ul").stop().animate({left: "-=" + bannerWidth + "px"}, 500, function(){
      $(".items ul li:first").appendTo(".items ul");
      $(this).css("left", -(bannerWidth * 1.5) + "px");
    });
  }

  let bannerTimer = setInterval(bannerAuto, 4000);

  // 이전 버튼 클릭
  $(".left-btn").click(function(){
    $(".items ul").stop().animate({left: "+=" + bannerWidth + "px"}, 500, function(){
      $(".items ul li:last").prependTo(".items ul");
      $(this).css("left", -(bannerWidth * 1.5) + "px");
    });
  });

  // 다음 버튼 클릭
  $(".right-btn").click(function(){
    $(".items ul").stop().animate({left: "-=" + bannerWidth + "px"}, 500, function(){
      $(".items ul li:first").appendTo(".items ul");
      $(this).css("left", -(bannerWidth * 1.5) + "px");
    });
  });

  // 마우스 호버 시 자동 슬라이드 멈춤
  $(".weekly-best").hover(
    function() {
      clearInterval(bannerTimer);
    },
    function() {
      bannerTimer = setInterval(bannerAuto, 4000);
    }
  );

  //심볼
  const symbol = document.querySelector(".weekly-best .symbol");
  const section = document.querySelector(".weekly-best");

  if (!symbol || !section) {
    console.log("대상 요소 없음");
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 클래스 리셋 후 다시 추가하여 애니메이션 재생
            symbol.classList.remove("show");
            void symbol.offsetWidth; // 강제 리플로우
            symbol.classList.add("show");
          } else {
            // 뷰포트에서 벗어나면 클래스 제거
            symbol.classList.remove("show");
          }
        });
      },
      {
        root: null,
        threshold: 0.1
      }
    );

  observer.observe(section);
}



//new-----------------------------------
  $(function () {
    let $track = $(".slide-track");
    let $slides = $(".slide");
    let slideWidth = $slides.outerWidth(true); // 220 + gap
    let slideCount = $slides.length;

    // 슬라이드 복제
    $track.append($slides.clone());

    let totalWidth = slideWidth * slideCount * 2;
    $track.width(totalWidth);

    let currentLeft = 0;

    function moveSlide() {
      currentLeft -= 1;
      if (Math.abs(currentLeft) >= slideWidth * slideCount) {
        currentLeft = 0;
      }
      $track.css("transform", `translateX(${currentLeft}px)`);
    }

    let slideTimer = setInterval(moveSlide, 10);

    // 슬라이드 하나라도 hover하면 멈추고, 벗어나면 다시 시작
    $(".slide-track").on("mouseenter", ".slide", function () {
      clearInterval(slideTimer);
    });
  
    $(".slide-track").on("mouseleave", ".slide", function () {
      slideTimer = setInterval(moveSlide, 10);
    });
    
  });


});