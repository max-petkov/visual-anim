visualBuiltAI();

function visualBuiltAI() {
  const svg = document.querySelector("svg.left-side");
  const logo = document.querySelector(".logo");
  const circles = document.querySelectorAll(".masked-lines .circle");
  const imgs = document.querySelectorAll(".right-side img");
  const icons = document.querySelectorAll(".icons [data-icon]");
  let complete = 0;

  setPosition(icons, svg);
  onResize(function() {
    setPosition(icons, svg);
  });

  animateIcons();
  animateCircles({
    stagger: 0.1,
    duration: 1.6,
  });

  function animateIcons() {
    const tl = gsap.timeline();

    tl.fromTo(icons, {autoAlpha:0}, {autoAlpha: 1});
    return tl;
  }
  
  function animateCircles(config) {
    const tl = gsap.timeline({repeat: -1});
    tl
    .fromTo(
          circles,
          {
            autoAlpha: 0,
            attr: {
              cx: (i, circle) => Number(circle.getAttribute("cx"))
            },
          },
          {
            autoAlpha: 1,
            stagger: config.stagger,
            attr: {
              cx: (i, circle) => Number(circle.getAttribute("cx")) + (32 / 2)
            },
          })
    .to(
        circles,
        {
          duration: config.duration,
          ease: Power2.easeInOut,
          stagger: config.stagger,
          motionPath: {
            path: (i, circle) => {
              const id = circle.parentElement.getAttribute("mask").slice(0, -1).split("url(#").join("");
              const line = document.querySelector(`.masked-lines [id="${id}"] path`);
              return line;
            },
            align: (i, circle) => {
              const id = circle.parentElement.getAttribute("mask").slice(0, -1).split("url(#").join("");
              const line = document.querySelector(`.masked-lines [id="${id}"] path`);
              return line;
            },
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            start: 1,
            end: 0,
          },
        }, "<25%")
        .fromTo(circles, {
          autoAlpha: 1
        }, {
          stagger: config.stagger, 
          autoAlpha: 0,
        }, "<70%")
        .to(logo, {
          y: -10, 
          duration: 1.2, 
          ease: Back.easeOut.config(1.6),
          onComplete: function(){
            complete++
            imgs.forEach(img => img.classList.toggle("visible"));
          },
        }, "-=1.05")
        .to(logo, {y: 0, duration: 0.8, ease: Back.easeOut.config(1.2)});
    return tl;
  }
}

function getRect(el) {
  const rect = el.getBoundingClientRect();
  return { 
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      bottom: rect.bottom + window.scrollY,
      right: rect.right + window.scrollX,
      width: rect.width,
      height: rect.height,
  }
}

function onResize(cb) {
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  window.addEventListener("resize", function() {
      if(windowWidth !== window.innerWidth || windowHeight !== window.innerHeight) {
          windowWidth = window.innerWidth;
          windowHeight = window.innerHeight;
          cb();
      }
  });
}

function setPosition(imgs, svg) {
  imgs.forEach(img => {
      const path = svg.querySelector(`[data-icon='${img.getAttribute("data-icon")}']`);
      
      img.style.position = "absolute";
      img.style.top = getRect(path).top + "px";
      img.style.left = getRect(path).left + "px";
      img.style.width = getRect(path).width + "px";
      img.style.height = getRect(path).height + "px";
  });
}