export const runDvd = (dvd) => {
  let x = 0;
  let y = 0;
  let dirX = 1;
  let dirY = 1;
  const speed = 4;
  const dvdWidth = dvd.clientWidth;
  const dvdHeight = dvd.clientHeight;

  function getNewRandomColor() {
    return `${Math.floor(Math.random() * (360 - 0 + 1) + 0)}deg`;
  }
  function animate() {
    const screenHeight = document.body.clientHeight;
    const screenWidth = document.body.clientWidth;

    if (y + dvdHeight >= screenHeight || y < 0) {
      dirY *= -1;
      dvd.style.filter = `hue-rotate(${getNewRandomColor()})`;
    }
    if (x + dvdWidth >= screenWidth || x < 0) {
      dirX *= -1;
      dvd.style.filter = `hue-rotate(${getNewRandomColor()})`;
    }
    x += dirX * speed;
    y += dirY * speed;
    dvd.style.left = `${x}px`;
    dvd.style.top = `${y}px`;
    window.requestAnimationFrame(animate);
  }

  window.requestAnimationFrame(animate);
};
