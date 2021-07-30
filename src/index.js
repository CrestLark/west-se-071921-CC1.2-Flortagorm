const fgTitle = el("fg-title");
const fgImage = el("fg-image");
const fgLikes = el("fg-likes");
const fgComments = el("fg-comments");
const commentForm = el("comment-form");
const likeButton = el("like-button");

let likes = 0;

likeButton.addEventListener('click', incrementLikes);

function incrementLikes () {
    likes = likes + 1;
    renderLikes();
} 

fetch('https://distinct-vaulted-freesia.glitch.me/image')
    .then ((res) => res.json())
    .then (renderPage);

function renderPage(data) {
    fgTitle.innerText = data.title;
    fgImage.src = data.image;
    likes = data.likes; 
    renderLikes();
    setComments(data.comments);

}

function renderLikes() {
    fgLikes.innerText = `${likes} likes`;
}

function setComments(comments) {
    fgComments.innerHTML = ' ';
    comments.map(e => e.content).forEach(addComment);
}

function addComment(comment) {
    const li =document.createElement('li');
    li.innerText = comment; 
    fgComments.append(li);
}

function el(id) {
    return document.getElementById(id);
}
commentForm.addEventListener("submit",(e) => {
    e.preventDefault();
    addComment(e.target.comment.value);
    e.target.comment.value = ' ';
});

//I nearly threw my computer across the room because I accidentally
//added another () after value in line 50. 
//After I struggled for almost a solid hour with the fact that my submit
//wasn't working. I had spelled submit "submnit".