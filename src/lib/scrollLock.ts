/**
 * Cross-browser scroll lock utility (including iOS Safari).
 *
 * iOS Safari ignores `overflow: hidden` on body — it requires
 * `position: fixed` + saving/restoring scroll position.
 */

let scrollY = 0;

export const lockBodyScroll = () => {
  scrollY = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.overflow = "hidden";
  document.body.style.width = "100%";
};

export const unlockBodyScroll = () => {
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.overflow = "";
  document.body.style.width = "";
  window.scrollTo({ top: scrollY, behavior: "instant" as ScrollBehavior });
};
