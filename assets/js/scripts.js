/*
Theme Name: IAMX
Author: Trendy Theme
Author URL: trendytheme.net
*/

/*
    = Preloader
    = Animated scrolling / Scroll Up
    = Full Screen Slider
    = Sticky Menu
    = Back To Top
    = Countup
    = Progress Bar
    = More skill
    = Shuffle
    = Magnific Popup
    = Vidio auto play
    = Fit Vids
    = Google Map

*/

jQuery(function ($) {

    'use strict';

    /* ---------------------------------------------- /*
     * Preloader
    /* ---------------------------------------------- 

    $(window).ready(function() {
        $('#pre-status').fadeOut();
        $('#tt-preloader').delay(350).fadeOut('slow');
    });*/


    $(window).on('load', function () {
        const tl = gsap.timeline();

        // 1. 텍스트 변환 애니메이션
        tl.to(".preload-text", { duration: 0.5, text: "WELCOME" })
            .to(".preload-text", { duration: 0.5, text: "PORTFOLIO" })
            .to(".preload-text", { duration: 0.5, text: "SEO YOUNGJU" })
            // 2. 프리로더 페이드 아웃
            .to("#tt-preloader", {
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                    $("#tt-preloader").remove();
                }
            });
    });

    // -------------------------------------------------------------
    // Animated scrolling / Scroll Up
    // -------------------------------------------------------------

    (function () {
        $('a[href*=#]').bind("click", function (e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top
            }, 1000);
            e.preventDefault();
        });
    }());

    $(document).ready(function () {
        const $scrollUp = $(".scroll-up");
        const $bubble = $(".top-bubble");

        if ($scrollUp.length > 0 && typeof gsap !== "undefined") {

            // 마우스가 버튼 영역에 들어왔을 때 (Hover In)
            $scrollUp.on("mouseenter", function () {
                gsap.to($bubble, {
                    opacity: 1,
                    y: -10, // 아래에서 위로 슬라이딩하며 나타나는 효과
                    duration: 0.4,
                    ease: "power2.out",
                    overwrite: "auto" // 모션 충돌 방지
                });
            });

            // 마우스가 버튼 영역을 벗어났을 때 (Hover Out)
            $scrollUp.on("mouseleave", function () {
                gsap.to($bubble, {
                    opacity: 0,
                    y: 0, // 원래 위치로 리셋하며 사라짐
                    duration: 0.3,
                    ease: "power2.in"
                });
            });
        }
    });



    // -------------------------------------------------------------
    // Full Screen Slider
    // -------------------------------------------------------------
    (function () {
        $(".tt-fullHeight").height($(window).height());

        $(window).resize(function () {
            $(".tt-fullHeight").height($(window).height());
        });

    }());


    // -------------------------------------------------------------
    // Sticky Menu
    // -------------------------------------------------------------

    (function () {
        $('.header').sticky({
            topSpacing: 0
        });

        $('body').scrollspy({
            target: '.navbar-custom',
            offset: 70
        })
    }());




    // -------------------------------------------------------------
    // Back To Top
    // -------------------------------------------------------------

    (function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });
    }());


    // -------------------------------------------------------------
    // Countup
    // -------------------------------------------------------------
    $('.count-wrap').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $(this).find('.timer').each(function () {
                var $this = $(this);
                $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
            $(this).unbind('inview');
        }
    });


    // -------------------------------------------------------------
    // Progress Bar
    // -------------------------------------------------------------

    $('.skill-progress').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $.each($('div.progress-bar'), function () {
                $(this).css('width', $(this).attr('aria-valuenow') + '%');
            });
            $(this).unbind('inview');
        }
    });

    // -------------------------------------------------------------
    // More skill
    // -------------------------------------------------------------
    $('.more-skill').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $('.chart').easyPieChart({
                //your configuration goes here
                easing: 'easeOut',
                delay: 3000,
                barColor: '#333',
                trackColor: '#ccc',
                scaleColor: false,
                lineWidth: 8,
                size: 140,
                animate: 2000,
                onStep: function (from, to, percent) {
                    this.el.children[0].innerHTML = Math.round(percent);
                }

            });
            $(this).unbind('inview');
        }
    });


    // -------------------------------------------------------------
    // Shuffle
    // -------------------------------------------------------------

    (function () {

        var $grid = $('#grid');

        $grid.shuffle({
            itemSelector: '.portfolio-item'
        });

        /* reshuffle when user clicks a filter item */
        $('#filter a').click(function (e) {
            e.preventDefault();

            // set active class
            $('#filter a').removeClass('active');
            $(this).addClass('active');

            // get group name from clicked item
            var groupName = $(this).attr('data-group');

            // reshuffle grid
            $grid.shuffle('shuffle', groupName);
        });


    }());


    // -------------------------------------------------------------
    // Magnific Popup
    // -------------------------------------------------------------

    (function () {
        $('.image-link').magnificPopup({

            gallery: {
                enabled: true
            },
            removalDelay: 300, // Delay in milliseconds before popup is removed
            mainClass: 'mfp-with-zoom', // this class is for CSS animation below
            type: 'image'
        });

    }());



    (function () {
        $('.popup-video').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-with-zoom',
            removalDelay: 300,
            preloader: false,
            fixedContentPos: false
        });
    }());





    // -------------------------------------------------------------
    // Fit Vids
    // -------------------------------------------------------------
    (function () {
        $(".video-container").fitVids();
    }());



    // -------------------------------------------------------------
    // Vidio auto play
    // -------------------------------------------------------------
    /* (function () {
     
      Vimeo API: http://developer.vimeo.com/player/js-api
     
         var iframe = document.getElementById('nofocusvideo');
         // $f == Froogaloop
         var player = $f(iframe);
 
         $('.modal').on('hidden.bs.modal', function () {
         player.api('pause');
         })
 
         $('.modal').on('shown.bs.modal', function () {
         player.api('play');
         })
     }());
  */


    // -------------------------------------------------------------
    // STELLAR FOR BACKGROUND SCROLLING
    // -------------------------------------------------------------

    $(window).load(function () {

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

        } else {
            $.stellar({
                horizontalScrolling: false,
                responsive: true
            });
        }

    });


    // -------------------------------------------------------------
    // WOW JS
    // -------------------------------------------------------------

    (function () {

        new WOW({

            mobile: false

        }).init();

    }());

});


$(document).ready(function () {
    // Portfolio의 post-thumbnail과 Video 영역의 portfolio 클래스를 모두 타겟팅합니다.
    $('.post-thumbnail, .portfolio').on('mouseenter', function () {
        // 내부에 있는 비디오 태그를 탐색합니다.
        const $video = $(this).find('.hover-video');

        if ($video.length > 0) {
            $video.show(); // 비디오 노출
            $video[0].play(); // 제이쿼리 객체에서 네이티브 DOM을 꺼내어 재생 처리
        }
    }).on('mouseleave', function () {
        const $video = $(this).find('.hover-video');

        if ($video.length > 0) {
            $video[0].pause(); // 일시정지
            $video[0].currentTime = 0; // 재생 위치 초기화
            $video.hide(); // 비디오 숨김 (다시 이미지가 보이도록 처리)
        }
    });
});



// ===== GSAP 플러그인 초기 등록 구역 =====
// 스크립트 최상단이나 공통 플러그인 등록 위치에 안전하게 선언합니다.
if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, Flip);
}

// 1. 마우스 물결 백그라운드 트레일 효과
$(document).ready(function () {
    const $waveBg = $(".mouse-wave-bg");

    if ($waveBg.length > 0 && typeof gsap !== "undefined") {
        gsap.set($waveBg, { xPercent: -50, yPercent: -50, scale: 4 });

        const xTo = gsap.quickTo($waveBg, "x", { duration: 0.6, ease: "power3.out" });
        const yTo = gsap.quickTo($waveBg, "y", { duration: 0.6, ease: "power3.out" });

        $(document).on("mousemove", function (e) {
            xTo(e.clientX);
            yTo(e.clientY);
        });
    }
});

// 2. About Me 타이틀 글자별 스며드는 등장 효과
$(document).ready(function () {
    const $target = $('.reveal-text');
    if ($target.length > 0 && typeof gsap !== "undefined") {
        const textContent = $target.html().trim();

        let splitHTML = "";
        textContent.split(/<br\s*\/?>/i).forEach((line, index) => {
            if (index > 0) splitHTML += "<br>";
            splitHTML += line.split("").map(char => {
                // 공백 문자일 경우 단순 공백 텍스트 노드가 밀리지 않도록 고정 공백(&nbsp;) 처리로 보완
                if (char === " ") return "&nbsp;";
                return `<span class="char">${char}</span>`;
            }).join("");
        });
        $target.html(splitHTML);

        gsap.from(".reveal-text .char", {
            scrollTrigger: {
                trigger: ".reveal-text",
                start: "top 85%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 30,
            rotateX: -60,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.04
        });
    }
});

$(document).ready(function () {
    // GSAP Core 및 ScrollTrigger 플러그인이 정상 작동하는 환경인지 확인
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {

        // [과제 2 수정] 형광펜 밑줄 애니메이션 (진입 후 2초 딜레이 추가)
        if ($(".animated-bg-bar").length > 0) {
            gsap.to(".animated-bg-bar", {
                scrollTrigger: {
                    trigger: ".hl-trigger-container",
                    start: "top 85%", // 화면에 글자가 안정적으로 들어오는 시점 감지
                    toggleActions: "play none none none" // 한 번만 깔끔하게 실행되도록 제어
                },
                scaleX: 1, // 가로 폭을 100%로 확장
                duration: 0.8, // 선이 슥 그어지는 시간 (0.8초)
                delay: 2, // ⭐ 핵심: 스크롤 감지 후 완전히 2초 대기한 다음 모션 시작
                ease: "power2.out"
            });
        }

        // [과제 3 해결] 레퍼런스 리소스를 커스텀 이식한 해시태그 떨어지기 애니메이션
        const $headline = $(".hashtag-headline");

        if ($headline.length > 0) {
            // 폰트 및 구조 준비가 완료되면 요소를 시각화 (레퍼런스의 fonts.ready 기능 보완)
            gsap.set($headline, { opacity: 1 });

            // 레퍼런스의 SplitText.create 문법을 대체하여 내부 자식 단어들을 타겟팅합니다.
            const $tagWords = $headline.find(".tag-word");

            // 레퍼런스에 포함된 gsap.from 애니메이션 속성을 100% 매칭하여 구현
            gsap.from($tagWords, {
                scrollTrigger: {
                    trigger: ".hashtag-split-zone",
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: -100, // 위에서 아래로 떨어지는 궤적 (레퍼런스 준수)
                opacity: 0, // 투명도 교차
                rotation: "random(-80, 80)", // 레퍼런스의 무작위 회전값 이식
                stagger: 0.1, // 단어별 순차적 딜레이 간격 (레퍼런스 준수)
                duration: 1, // 재생 시간 1초 (레퍼런스 준수)
                ease: "back.out(1.7)" // 통통 튀는 탄성 효과 구현 (레퍼런스 백이즈 준수)
            });
        }
    }
});

// artwork
$(document).ready(function () {
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {

        const $rotatorCards = $(".rotator-card-item");
        let lastIndex = -1; // 현재 활성화된 인덱스를 저장할 변수

        if ($rotatorCards.length > 0) {
            // GSAP 효과가 너무 크지 않도록 최댓값을 엄격하게 제한 (-4도 ~ 4도)
            let clamp = gsap.utils.clamp(-4, 4);

            // 1. 초기 세팅: 카드 간 각도차를 65도로 크게 벌려 서로 절대 겹치지 않게 합니다.
            $rotatorCards.each(function (index, card) {
                gsap.set(card, {
                    rotation: index * -65, // 간격을 대폭 넓힘
                    x: -1000 // transform-origin 위치에 매칭
                });
            });

            // 2. 메인 회전 및 스크롤 고정 타임라인
            const rotationTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: "#artwork",
                    start: "top top",
                    end: "+=4000", // 한 작품씩 천천히 감상하도록 깊이 확보
                    scrub: 1,
                    pin: true,
                    onUpdate: (self) => {
                        // [왜곡 제어] 속도 수치를 대폭 낮추어 미세하고 정갈하게만 비틀어지도록 수정
                        let velocity = self.getVelocity();
                        let skewAmount = clamp(velocity / -1200);

                        gsap.to($rotatorCards, {
                            skewY: skewAmount,
                            duration: 0.3,
                            ease: "power1.out",
                            overwrite: "auto"
                        });

                        // [중앙 카드 탐색 및 오퍼시티/텍스트 제어]
                        // 스크롤 진행도(0 ~ 1)를 바탕으로 현재 정중앙에 올 카드의 인덱스를 매초 연산합니다.
                        let progress = self.progress;
                        let currentIndex = Math.round(progress * ($rotatorCards.length - 1));

                        // 활성화 인덱스가 변경되었을 때만 좌측 텍스트를 자연스럽게 교체
                        if (currentIndex !== lastIndex && currentIndex >= 0 && currentIndex < $rotatorCards.length) {
                            lastIndex = currentIndex;

                            const $activeCard = $rotatorCards.eq(currentIndex);
                            const newTitle = $activeCard.data("title");
                            const newDesc = $activeCard.data("desc");

                            // 왼쪽 텍스트 페이드 전환 모션 인터랙션
                            gsap.to(".artwork-text-switcher", {
                                opacity: 0,
                                x: -10,
                                duration: 0.2,
                                onComplete: () => {
                                    $("#art-title").text(newTitle);
                                    $("#art-desc").html(`<p>${newDesc}</p>`);
                                    gsap.to(".artwork-text-switcher", {
                                        opacity: 1,
                                        x: 0,
                                        duration: 0.3,
                                        ease: "power2.out"
                                    });
                                }
                            });
                        }

                        // [오퍼시티 제어] 현재 정중앙 카드만 선명하게(1), 지나갔거나 대기 중인 카드는 흐리게(0.15) 처리
                        $rotatorCards.each(function (index, card) {
                            if (index === currentIndex) {
                                gsap.to(card, { opacity: 1, duration: 0.3, overwrite: "auto" });
                            } else {
                                gsap.to(card, { opacity: 0.15, duration: 0.3, overwrite: "auto" });
                            }
                        });
                    }
                }
            });

            // 3. 아래로 스크롤할 때 카드가 위로 올라가도록 순방향 회전 매칭
            rotationTimeline.to($rotatorCards, {
                rotation: "+=" + (($rotatorCards.length - 1) * 65), // 카드 개수만큼 총 회전각 정밀 연산
                ease: "none"
            });
        }
    }
});

// sns-design
$(document).ready(function () {
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        
        // 마지막 sns-item에 도달했을 때 캐릭터 등장
        gsap.to(".camera-char", {
            scrollTrigger: {
                trigger: ".sns-section", // 섹션에 도달하면 시작
                start: "top 30%",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "back.out(2)" // 살짝 튀어 오르며 등장
        });
    }
});