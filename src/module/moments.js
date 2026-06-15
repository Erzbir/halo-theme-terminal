import {terminal} from "../terminal.js";

const RESOURCE_KEY = "moment";
const RESOURCE_GROUP = "moment.halo.run";
const RESOURCE_PLURAL = "moments";
const UPVOTED_NAMES_STORAGE_KEY = `walker.upvoted.${RESOURCE_KEY}.names`;
const UPVOTE_BUTTON_SELECTOR = ".moment-upvote-btn";
const UPVOTE_COUNT_SELECTOR = `.upvote-count[data-${RESOURCE_KEY}-name]`;
const MOMENT_ACTION_SELECTOR = "[data-moment-action]";
const UPVOTE_API = "/apis/api.halo.run/v1alpha1/trackers/upvote";
const MOMENT_ACTIONS = {
    upvote: "upvote",
    toggleComment: "toggle-comment"
};

let upvotedNames = readUpvotedNames();
let actionListenerRegistered = false;

function readUpvotedNames() {
    try {
        const names = JSON.parse(localStorage.getItem(UPVOTED_NAMES_STORAGE_KEY) || "[]");
        return Array.isArray(names) ? names : [];
    } catch {
        return [];
    }
}

function saveUpvotedNames() {
    localStorage.setItem(UPVOTED_NAMES_STORAGE_KEY, JSON.stringify(upvotedNames));
}

function upvoted(id) {
    return upvotedNames.includes(id);
}

function recordUpvote(name) {
    if (upvoted(name)) return;
    upvotedNames = [...upvotedNames, name];
    saveUpvotedNames();
}

function findUpvoteCountNode(name) {
    return [...document.querySelectorAll(UPVOTE_COUNT_SELECTOR)]
        .find(node => node.dataset[`${RESOURCE_KEY}Name`] === name);
}

function incrementUpvoteCount(name) {
    const upvoteNode = findUpvoteCountNode(name);
    if (!upvoteNode) return;

    const upvoteCount = Number.parseInt(upvoteNode.textContent || "0", 10) || 0;
    upvoteNode.textContent = String(upvoteCount + 1);
}

function syncUpvotedButtons() {
    document.querySelectorAll(UPVOTE_BUTTON_SELECTOR).forEach(btn => {
        btn.classList.toggle("active", upvoted(btn.dataset.momentName));
    });
}

function handleUpvote(name) {
    if (!name) return;
    if (upvoted(name)) return;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", UPVOTE_API);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
        if (xhr.status < 200 || xhr.status >= 300) return;
        recordUpvote(name);
        incrementUpvoteCount(name);
        syncUpvotedButtons();
    };

    xhr.onerror = function () {
        alert("Network Error");
    };

    xhr.send(JSON.stringify({group: RESOURCE_GROUP, plural: RESOURCE_PLURAL, name: name}));
}

function showComment(name) {
    const section = document.getElementById(`${name}`);

    if (!section) return;

    const show = section.classList.contains("active");

    if (show) {
        section.classList.remove("active");
    } else {
        section.classList.add("active");
    }
}

function handleMomentAction(event) {
    const actionNode = event.target.closest(MOMENT_ACTION_SELECTOR);
    if (!actionNode) return;

    const action = actionNode.dataset.momentAction;
    if (action === MOMENT_ACTIONS.upvote) {
        handleUpvote(actionNode.dataset.momentName);
        return;
    }

    if (action === MOMENT_ACTIONS.toggleComment) {
        showComment(actionNode.dataset.commentTarget);
    }
}

function registerMomentActions() {
    if (actionListenerRegistered) return;

    document.addEventListener("click", handleMomentAction);
    actionListenerRegistered = true;
}

terminal.registerInitFunc(registerMomentActions);
terminal.registerRefresh(syncUpvotedButtons);
