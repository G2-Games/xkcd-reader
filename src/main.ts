import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";

let comicTitle: HTMLElement | null;
let comicImage: HTMLImageElement | null;
let comicNumber: HTMLElement | null;

function setLoading() {
    comicTitle.textContent = "Loading...";
    comicImage.classList.add("loading");
    comicImage.src = "https://media.tenor.com/I6kN-6X7nhAAAAAi/loading-buffering.gif";
    comicNumber.style.display = "none";
}

function finishedLoading(targetComic: Object) {
    comicTitle.textContent = targetComic["title"];
    appWindow.setTitle(targetComic["title"]);

    comicImage.src = "";
    comicImage.src = targetComic["img"];
    comicImage.classList.remove("loading");
    comicNumber.textContent = "#" + targetComic["num"];
    comicNumber.style.display = "block";
}

async function latestComic() {
    setLoading();
    let next = await invoke("latest_comic", {}) as Object;
    finishedLoading(next);
}

async function nextComic() {
    setLoading();
    let next = await invoke("step_comic", { stepBy: 1 }) as Object;
    finishedLoading(next);
}

async function prevComic() {
    setLoading();
    let prev = await invoke("step_comic", { stepBy: -1 }) as Object;
    finishedLoading(prev);
}

async function randComic() {
    setLoading();
    let random = await invoke("random_comic", {}) as Object;
    finishedLoading(random);
}

window.addEventListener("DOMContentLoaded", () => {
    comicTitle = document.querySelector("#title");
    comicImage = document.querySelector("#comic");
    comicNumber = document.querySelector("#number");

    console.log("Getting latest comic...");
    latestComic();
});

document.querySelector("#prev").addEventListener("click", () => {
    prevComic();
});

document.querySelector("#next").addEventListener("click", () => {
    nextComic();
});

document.querySelector("#random").addEventListener("click", () => {
    randComic();
});
