import "./styles/style.scss";
import "./styles/fonts.scss";
import Alpine from "alpinejs";
import upvote from "./upvote";
// @ts-ignore
import tocbot from "tocbot";

window.Alpine = Alpine;

// @ts-ignore
Alpine.data("upvote", upvote);

Alpine.start();

export function generateToc() {
  const content = document.getElementById("content");
  const titles = content?.querySelectorAll("h1, h2, h3, h4");
  const toc = document.querySelector(".toc") as HTMLElement;
  if (!titles || titles.length === 0) {
    toc.style.display = "none";
    toc.remove();
    return;
  } else {
    toc.style.display = "block";
  }
  if (typeof tocbot !== 'undefined') {
    tocbot.destroy();
    tocbot.init({
      tocSelector: ".toc",
      contentSelector: "#content",
      headingSelector: "h1, h2, h3, h4",
      extraListClasses: "toc-list",
      extraLinkClasses: "toc-link",
      headingsOffset: 96,
      scrollSmoothOffset: -96,
      scrollSmooth: true,
    });
  }
}

export function locateToc() {
  const content = document.getElementById("content");
  const toc = document.querySelector(".toc") as HTMLElement;
  const contentRight = content?.getBoundingClientRect().right;
  if (toc && contentRight) {
    toc.style.left = `${contentRight}px`;
  }
}

export function destroyToc() {
  const toc = document.querySelector(".toc") as HTMLElement;
  toc.style.display = "none";
  toc.remove();
  if (typeof tocbot !== 'undefined') {
    tocbot.destroy();
  }
}