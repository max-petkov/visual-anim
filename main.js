const logo = document.querySelector(".logo");
const lines = document.querySelectorAll(".masked-lines mask");
const mask = (el) => {
  return {
    line: el.firstElementChild,
    circle: document.querySelector(`[mask="url(#${el.id})"]`).firstElementChild
  }
};

animateCircle(mask(lines[0]));
animateCircle(mask(lines[1]));
animateCircle(mask(lines[2]), start = 0, end = 1);
animateCircle(mask(lines[3]));
animateCircle(mask(lines[4]));

// animateLogo();

function animateCircle(el, start = 1, end = 0) {
  const tl = gsap.timeline();
  const circle = el.circle;
  const line = el.line;
  const w = circle.getBoundingClientRect().width * 2;
  const cxCircle = circle.getAttribute("cx");  
  tl
  .fromTo(
        circle,
        {
          autoAlpha: 0,
          attr: {
            cx: () => cxCircle,
          },
        },
        {
          autoAlpha: 1,
          attr: {
            cx: () => Number(cxCircle) + (Number(w) / 2),
          },
        }, "0"
      )
  .to(
      circle,
      {
        duration: 1.28,
        ease: Power3.easeInOut,
        motionPath: {
          path: line,
          align: line,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
          start: start,
          end: end,
        },
      }, "<25%")
      .fromTo(circle, {autoAlpha: 1}, {autoAlpha: 0}, "<75%");
  return tl.repeat(-1);
}

function animateLogo() {
  const tl = gsap.timeline();

  gsap.set(logo, {transformOrigin: "center"});

  tl.fromTo(logo, {scale: 1, y: 0}, {y: -8, scale: 1.02, delay: 0.9, ease: Circ.easeInOut})

  return tl;
}