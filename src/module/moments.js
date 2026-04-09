import {terminal} from "../terminal.js";

const key = 'moment';
const group = 'moment.halo.run';
const plural = 'moments';

let upvotedNames = JSON.parse(localStorage.getItem('walker.upvoted.' + key + '.names') || '[]')

function upvoted(id) {
    return upvotedNames.includes(id);
}


function handleUpvote(name) {
    if (upvoted(name)) return;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/apis/api.halo.run/v1alpha1/trackers/upvote');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = () => {
        upvotedNames = [...upvotedNames, name];
        localStorage.setItem('walker.upvoted.' + key + '.names', JSON.stringify(upvotedNames));

        const upvoteNode = document.querySelector('[data-' + key + '-name="' + name + '"]');
        if (!upvoteNode) return;

        const upvoteCount = parseInt(upvoteNode.textContent || '0');
        upvoteNode.textContent = upvoteCount + 1 + '';
    };

    xhr.onerror = function () {
        alert('Network Error');
    };

    xhr.send(JSON.stringify({group: group, plural: plural, name: name}));
}

function register_upvoted() {
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.moment-upvote-btn').forEach(btn => {
            const name = btn.dataset.name
            if (upvoted(name)) {
                btn.classList.add('active')
            }
        })
    });
}

function showComment(name) {
    const section = document.getElementById(`${name}`);

    if (!section) return;

    const show = section.classList.contains('active');

    if (show) {
        section.classList.remove('active');
    } else {
        section.classList.add('active');
    }
}

terminal.registerInitFunc(register_upvoted)

window.handleUpvote = handleUpvote;
window.showComment = showComment;