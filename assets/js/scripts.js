/*
Theme Name: IAMX
Author: Trendy Theme
Author URL: trendytheme.net
*/

/*
    = Preloader (WELCOME / PORTFOLIO / SEO YOUNGJU)
    = Animated scrolling / Scroll Up
    = Full Screen Slider
    = Sticky Menu & Navigation spy
    = Back To Top
    = Countup
    = Progress Bar
    = More skill & easyPieChart
    = Shuffle (Portfolio filter Grid)
    = Magnific Popup
    = Stellar Parallax & WOW.js
    = Section 2: GSAP Mouse trail & About Text Reveal / Underline
    = Section 3: Falling Hashtag Animation
    = Section 5: SNS Swiper & Camera character
    = Section 6: Artwork GSAP 3D Wheel Rotator
    = Section 7: Video Swiper, PC hover & Mobile play/pause logic (Center Align + Swiper autoplay protection)
    = Section 8: Resume Timeline trigger
    = Section 12: Scroll-Up character bubble trigger
*/

jQuery(function ($) {

    'use strict';

    /* ==========================================================================
       0. Core Init & Preloader Loading Screen
       ========================================================================== */
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


    /* ==========================================================================
       1. Home Section (#home)
       ========================================================================== */
    (function () {
        $(".tt-fullHeight").height($(window).height());

        $(window).resize(function () {
            $(".tt-fullHeight").height($(window).height());
        });
    }());


    /* ==========================================================================
       2. Navigation Section (.header)
       ========================================================================== */
    (function () {
        $('.header').sticky({
            topSpacing: 0
        });

        $('body').scrollspy({
            target: '.navbar-custom',
            offset: 70
        });
    }());

    $(window).scroll(function () {
        var aboutTop = $('#about').offset().top;
        var scroll = $(window).scrollTop();

        if (scroll >= aboutTop) {
            $(".header").addClass("sticky-nav");
        } else {
            $(".header").removeClass("sticky-nav");
        }
    });

    (function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });
    }());


    /* ==========================================================================
       3. About Me Section (#about) & GSAP Core Registrations
       ========================================================================== */
    if (typeof gsap !== "undefined") {
        gsap.registerPlugin(ScrollTrigger, Flip);
    }

    // A. 마우스 물결 트랙킹 효과
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

    // B. 글자별 스며드는 등장 효과 (.reveal-text)
    $(document).ready(function () {
        const $target = $('.reveal-text');
        if ($target.length > 0 && typeof gsap !== "undefined") {
            const textContent = $target.html().trim();

            let splitHTML = "";
            textContent.split(/<br\s*\/?>/i).forEach((line, index) => {
                if (index > 0) splitHTML += "<br>";
                splitHTML += line.split("").map(char => {
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

    // C. 형광펜 하이라이터 드로잉 (2초 딜레이 추가)
    $(document).ready(function () {
        if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
            if ($(".animated-bg-bar").length > 0) {
                gsap.to(".animated-bg-bar", {
                    scrollTrigger: {
                        trigger: ".hl-trigger-container",
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    scaleX: 1,
                    duration: 0.8,
                    delay: 2,
                    ease: "power2.out"
                });
            }
        }
    });

    // D. 해시태그 무작위 공중 낙하 탄성 애니메이션
    $(document).ready(function () {
        if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
            const $headline = $(".hashtag-headline");

            if ($headline.length > 0) {
                gsap.set($headline, { opacity: 1 });
                const $tagWords = $headline.find(".tag-word");

                gsap.from($tagWords, {
                    scrollTrigger: {
                        trigger: ".hashtag-split-zone",
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    y: -100,
                    opacity: 0,
                    rotation: "random(-80, 80)",
                    stagger: 0.1,
                    duration: 1,
                    ease: "back.out(1.7)"
                });
            }
        }
    });


    /* ==========================================================================
       4. Portfolio Section (#portfolio)
       ========================================================================== */
    (function () {
        var $grid = $('#grid');
        if ($grid.length > 0) {
            $grid.shuffle({
                itemSelector: '.portfolio-item'
            });

            $('#filter a').click(function (e) {
                e.preventDefault();
                $('#filter a').removeClass('active');
                $(this).addClass('active');
                var groupName = $(this).attr('data-group');
                $grid.shuffle('shuffle', groupName);
            });
        }
    }());

    (function () {
        $('.image-link').magnificPopup({
            gallery: {
                enabled: true
            },
            removalDelay: 300,
            mainClass: 'mfp-with-zoom',
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

    $(document).ready(function () {
        // 호버 시 영상 재생 (Video 섹션과 완벽 분리)
        $('#portfolio .blog-post-wrapper').on('mouseenter', function () {
            const $video = $(this).find('.hover-video');
            if ($video.length > 0) {
                $video.show().css('opacity', '1');
                $video[0].play();
            }
        }).on('mouseleave', function () {
            const $video = $(this).find('.hover-video');
            if ($video.length > 0) {
                $video[0].pause();
                $video[0].currentTime = 0;
                $video.hide().css('opacity', '0');
            }
        });
    });


    /* ==========================================================================
       5. SNS-design Section (#sns-design)
       ========================================================================== */
    $(document).ready(function () {
        if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
            gsap.to(".camera-char", {
                scrollTrigger: {
                    trigger: "#sns-design",
                    start: "top 30%",
                    toggleActions: "play none none reverse"
                },
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "back.out(2)"
            });
        }
    });
    $(document).ready(function () {
        if ($('.snsSwiper').length > 0) {
            const snsSwiper = new Swiper('.snsSwiper', {
                // 변경된 부분: 슬라이드 개수 명시
                slidesPerView: 2.2, // 2개는 완전히, 3번째 슬라이드는 0.2만큼 보이게 설정
                spaceBetween: 30,
                loop: false,
                grabCursor: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: true,
                },
                // 브레이크포인트 추가 (모바일 대응)
                breakpoints: {
                    768: {
                        slidesPerView: 2.2
                    },
                    320: {
                        slidesPerView: 1.2
                    }
                }
            });
        }
    });


    /* ==========================================================================
       6. Artwork Section (#artwork) - GSAP 3D Wheel Rotator
       ========================================================================== */
    $(document).ready(function () {
        if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
            const $rotatorCards = $(".rotator-card-item");
            let lastIndex = -1;

            if ($rotatorCards.length > 0) {
                let clamp = gsap.utils.clamp(-4, 4);

                $rotatorCards.each(function (index, card) {
                    gsap.set(card, {
                        rotation: index * -65,
                        x: -1000
                    });
                });

                const rotationTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: "#artwork",
                        start: "top top",
                        end: "+=4000",
                        scrub: 1,
                        pin: true,
                        onUpdate: (self) => {
                            let velocity = self.getVelocity();
                            let skewAmount = clamp(velocity / -1200);

                            gsap.to($rotatorCards, {
                                skewY: skewAmount,
                                duration: 0.3,
                                ease: "power1.out",
                                overwrite: "auto"
                            });

                            let progress = self.progress;
                            let currentIndex = Math.round(progress * ($rotatorCards.length - 1));

                            if (currentIndex !== lastIndex && currentIndex >= 0 && currentIndex < $rotatorCards.length) {
                                lastIndex = currentIndex;

                                const $activeCard = $rotatorCards.eq(currentIndex);
                                const newTitle = $activeCard.data("title");
                                const newDesc = $activeCard.data("desc");

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

                rotationTimeline.to($rotatorCards, {
                    rotation: "+=" + (($rotatorCards.length - 1) * 65),
                    ease: "none"
                });
            }
        }
    });


    /* ==========================================================================
   7. Video Section (#video-section) - 클릭 재생 전용 로직
   ========================================================================== */
    /* 7. Video Section (#video-section) - 클릭 재생 & 호버 설명 표시 로직 */
    $(document).ready(function () {
        // A. Swiper 초기화
        if ($('.videoSwiper').length > 0) {
            new Swiper('.videoSwiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                navigation: { nextEl: '.video-swiper-next', prevEl: '.video-swiper-prev' },
                effect: 'fade',
                fadeEffect: { crossFade: true }
            });
        }

        // B. Video 섹션 호버 및 클릭 로직
        $('#video-section .portfolio').on('mouseenter', function () {
            // 호버 시 설명 영역 애니메이션
            const $desc = $(this).closest('.video-content-layout').find('.video-right-desc');
            if ($desc.length > 0 && typeof gsap !== "undefined" && window.innerWidth >= 768) {
                gsap.to($desc, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", overwrite: "auto" });
            }
        }).on('mouseleave', function () {
            // 호버 해제 시 설명 영역 애니메이션
            const $desc = $(this).closest('.video-content-layout').find('.video-right-desc');
            if ($desc.length > 0 && typeof gsap !== "undefined" && window.innerWidth >= 768) {
                gsap.to($desc, { opacity: 0, x: -50, duration: 0.4, ease: "power2.in", overwrite: "auto" });
            }
        });

        // 클릭 시 재생/정지
        $('#video-section .portfolio').on('click', function () {
            const $video = $(this).find('.hover-video');
            const videoEl = $video[0];
            if (!videoEl) return;

            if (videoEl.paused) {
                $('video.hover-video').each(function () {
                    this.pause(); this.currentTime = 0; $(this).hide().css('opacity', '0');
                });
                $video.show().css('opacity', '1');
                videoEl.play();
            } else {
                videoEl.pause();
                $video.hide().css('opacity', '0');
            }
        });

        // C. 영상 끝 반복 및 슬라이드 변경 시 정리
        $('video.hover-video').on('ended', function () { this.currentTime = 0; this.play(); });
        $('.swiper').on('slideChange', function () {
            $('video.hover-video').each(function () { this.pause(); this.currentTime = 0; $(this).hide().css('opacity', '0'); });
        });
    });
    /* ==========================================================================
       8. Resume Section (#resume)
       ========================================================================== */
    $(document).ready(function () {
        if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
            gsap.to(".resume-item", {
                scrollTrigger: {
                    trigger: ".resume-section",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });
        }
    });
    /* Video 섹션 말풍선 등장 애니메이션 */
    $(document).ready(function () {
        if (typeof gsap !== "undefined") {
            gsap.from(".video-bubble", {
                scrollTrigger: {
                    trigger: "#video-section",
                    start: "top 70%"
                },
                scale: 0,
                opacity: 0,
                duration: 0.8,
                delay: 0.5,
                ease: "back.out(2)"
            });
        }
    });

    /* ==========================================================================
       9. Skills Section (#skills) & Inview Triggers
       ========================================================================== */
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

    $('.skill-progress').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $.each($('div.progress-bar'), function () {
                $(this).css('width', $(this).attr('aria-valuenow') + '%');
            });
            $(this).unbind('inview');
        }
    });

    $('.more-skill').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $('.chart').easyPieChart({
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


    /* ==========================================================================
       10. Interview Section (#interview) & Stellar, WOW Init
       ========================================================================== */
    (function () {
        $(".video-container").fitVids();
    }());

    $(window).load(function () {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // Mobile exception
        } else {
            $.stellar({
                horizontalScrolling: false,
                responsive: true
            });
        }
    });

    (function () {
        new WOW({
            mobile: false
        }).init();
    }());


    /* ==========================================================================
       12. Scroll-Up Section (.scroll-up) & Character Balloon Animations
       ========================================================================== */
    $(document).ready(function () {
        const $scrollUp = $(".scroll-up");
        const $bubble = $(".top-bubble");

        if ($scrollUp.length > 0 && typeof gsap !== "undefined") {
            $scrollUp.on("mouseenter", function () {
                gsap.to($bubble, {
                    opacity: 1,
                    y: -10,
                    duration: 0.4,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            });

            $scrollUp.on("mouseleave", function () {
                gsap.to($bubble, {
                    opacity: 0,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.in"
                });
            });
        }
    });

});
