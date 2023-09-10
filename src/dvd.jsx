export const runDvd = (dvd, cb) => {
  let x = 0;
  let y = 0;
  let dirX = 1;
  let dirY = 1;
  let speed = 4;
  const dvdWidth = dvd.clientWidth;
  const dvdHeight = dvd.clientHeight;
  dvd.addEventListener('mouseover', () => {
    speed += 0.25;
  });

  function getNewRandomColor() {
    return `${Math.floor(Math.random() * (360 - 0 + 1) + 0)}deg`;
  }
  function animate() {
    const screenHeight = document.body.clientHeight;
    const screenWidth = document.body.clientWidth;

    if (y + dvdHeight >= screenHeight || y < 0) {
      dirY *= -1;
      dvd.style.filter = `hue-rotate(${getNewRandomColor()})`;
      cb();
    }
    if (x + dvdWidth >= screenWidth || x < 0) {
      dirX *= -1;
      dvd.style.filter = `hue-rotate(${getNewRandomColor()})`;
      cb();
    }
    x += dirX * speed;
    y += dirY * speed;
    dvd.style.animation = `spin ${16 / speed}s linear infinite`;
    dvd.style.left = `${x}px`;
    dvd.style.top = `${y}px`;
    window.requestAnimationFrame(animate);
  }

  window.requestAnimationFrame(animate);
};
