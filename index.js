let comments = [{ text: "Here is a comment", replies: [], id: "0" }];
let replyingToCommentRef = null;

function generateComment(comment, indentationLevel) {
  let elem = document.createElement("div");
  elem.className = "commentCard";
  elem.style.marginLeft = `${indentationLevel * 20}px`;
  elem.innerHTML = `<p>${comment.text}</p>
  <div class="replyButtonContainer">
    <span onclick="addReplyBox(event)" class="reply">Reply</span>      
  </div>
  <div class="replyContainer"></div>`;

  elem.getElementsByClassName("reply")[0].addEventListener("click", () => {
    replyingToCommentRef = comment;
  });

  return elem;
}

function addReplyBox(e) {
  e.target
    .closest(".commentCard")
    .getElementsByClassName("replyContainer")[0].innerHTML = renderReplyInput();
}

function renderReplyInput() {
  return `<div class='replyWrapper'>
    <textarea class="replyTextarea" rows="3" placeholder="Add a reply" id="reply"></textarea>
      <div class="addCommentButtonWrapper">
        <button id="addReply" onclick="addReply()" class="button addNewCommentButton">Add comment</button>
      </div>
    </div>`;
}

function addReply(e) {
  let elem = document.getElementById("reply");
  let value = elem.value;

  if (value.trim() !== "") {
    replyingToCommentRef.replies.push({ text: value, replies: [] });
  }

  replyingToCommentRef = null;
  elem.closest(".replyContainer").innerHTML = "";

  renderComments();
}

function getCommentsRecursively(indentationLevel, comment, elem) {
  elem.appendChild(generateComment(comment, indentationLevel));
  comment.replies.forEach((r) =>
    getCommentsRecursively(++indentationLevel, r, elem)
  );
}

function renderCommentStack(comment) {
  let elem = document.createElement("div");

  getCommentsRecursively(0, comment, elem);
  return elem;
}

function renderComments() {
  console.log(comments);
  let element = document.getElementById("commentsContainer");
  element.innerHTML = "";
  comments.map((comment) => {
    element.appendChild(renderCommentStack(comment));
  });
}

window.addEventListener("load", () => {
  renderComments();

  document.getElementById("addnewComment").addEventListener("click", () => {
    let newCommentElement = document.getElementById("newComment");
    if (newCommentElement.value.trim() !== "") {
      comments.push({ text: newCommentElement.value.trim(), replies: [] });
    }
    newCommentElement.value = "";
    renderComments();
  });
});
