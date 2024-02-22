function updateIrisPosition(x, y) {
  const eye = document.querySelector(".eye");
  const iris = document.querySelector(".iris");
  const eyeRect = eye.getBoundingClientRect();


  const eyeX = eyeRect.left + eyeRect.width / 2;
  const eyeY = eyeRect.top + eyeRect.height / 2;


  const deltaX = x - eyeX;
  const deltaY = y - eyeY;

  const angle = Math.atan2(deltaY, deltaX);

  const eyeRadius = eyeRect.width / 2;
  const irisRadius = iris.offsetWidth / 2;
  const maxMove = eyeRadius - irisRadius / 8;

  const distance = Math.min(
    Math.sqrt(deltaX * deltaX + deltaY * deltaY),
    maxMove
  );

  const irisX = distance * Math.cos(angle);
  const irisY = distance * Math.sin(angle);

  iris.style.transform = `translate(${irisX}px, ${irisY}px)`;
}

document.addEventListener("mousemove", function (event) {
  updateIrisPosition(event.clientX, event.clientY);
});

document.addEventListener("touchmove", function (event) {
  const touch = event.touches[0];
  updateIrisPosition(touch.clientX, touch.clientY);
});

document.addEventListener(
  "touchmove",
  function (event) {
    event.preventDefault();
  },
  { passive: false }
);
