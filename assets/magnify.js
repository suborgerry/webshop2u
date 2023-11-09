/** Shopify CDN: Minification failed

Line 25:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 26:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 27:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 28:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 29:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 30:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 38:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 45:2 Transforming const to the configured target environment ("es5") is not supported yet

**/
// create a container and set the full-size image as its background
function createOverlay(image) {
  overlay = document.createElement('div');
  overlay.setAttribute('class', 'image-magnify-full-size');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.style.backgroundImage = `url('${image.src}')`;
  image.parentElement.insertBefore(overlay, image);
  return overlay;
};

function moveWithHover(image, event, zoomRatio) {
  // calculate mouse position
  const ratio = image.height / image.width;
  const container = event.target.getBoundingClientRect();
  const xPosition = event.clientX - container.left;
  const yPosition = event.clientY - container.top;
  const xPercent = `${xPosition / (overlay.clientWidth / 100)}%`;
  const yPercent = `${yPosition / ((overlay.clientWidth * ratio) / 100)}%`;

  // determine what to show in the frame
  overlay.style.backgroundPosition = `${xPercent} ${yPercent}`;
  overlay.style.backgroundSize = `${image.width * zoomRatio}px`;
};

function magnify(image, zoomRatio) {
  const overlay = createOverlay(image);
  overlay.onclick = () => overlay.remove();
  overlay.onmousemove = (event) => moveWithHover(image, event, zoomRatio);
  overlay.onmouseleave = () => overlay.remove();
}

function enableZoomOnHover(zoomRatio) {
  const images = document.querySelectorAll('.image-magnify-hover');
  images.forEach(image => {
    image.onclick = (event) => {
      magnify(image, zoomRatio);
      moveWithHover(image, event, zoomRatio);
    };
  });
}

enableZoomOnHover(2);
