
import { addLikes, disLikes } from "../api.js";
import { getToken, goToPage, posts, user } from "../index.js"
import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";

// renderHeaderComponent
export function renderUserPostPageComponent({ appEl }) {

  const getUserPosts = posts.map((date) => {
    let time = new Date(date.createdAt)
    return `<li class="post">
      <div class="post-header" data-user-id="${date.user.id}">
        <img src="${date.user.imageUrl}" class="post-header__user-image">
          <p class="post-header__user-name">${date.user.name}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${date.imageUrl}">
      </div>
      <div class="post-likes">
        <button data-post-id="${date.id}" data-post-liked="${date.isLiked}" class="like-button">
        <img src="./assets/images/like-${!date.isLiked ? "not-" : ""}active.svg">
        </button>
        <p class="post-likes-text">
        Нравится: ${date.likes.length > 0 ? `${date.likes[0].name} ${date.likes.length > 1 ? `и еще ${date.likes.length - 1}` : ""}` : `${date.likes.length}`} 
        </p>
      </div>
      <p class="post-text">
        <span class="user-name">${date.user.name}</span>
        ${date.description}
      </p>
      <p class="post-date">
        ${time.toLocaleString()}
      </p>
    </li>`

  }).join(' ')

  let userposts = `<div class="page-container">
    <div class="header-container"></div>
    <ul class="posts">
    ${getUserPosts}
    </ul>
  </div>`;
  appEl.innerHTML = userposts
  renderHeaderComponent({ element: document.querySelector(".header-container") })
  buttonListeners()
}

export function buttonListeners () { const likeButtons = document.querySelectorAll(".like-button")

for (let likeButton of likeButtons) {
  likeButton.addEventListener("click", () => {
    if (!user){
      alert("Авторизируйтесь")
      return
    }
    if (likeButton.dataset.postLiked === "true") {
      disLikes({ token: getToken(), id: likeButton.dataset.postId }).then((post) => {
        renderLikes({ likeButton, post })

      })
    } else {
      addLikes({ token: getToken(), id: likeButton.dataset.postId }).then((post) => {
        renderLikes({ likeButton, post })
      })
    }

  })
}
}
export const renderLikes = ({ likeButton, post }) => {
  const postUser = likeButton.closest(".post")
  let time = new Date(post.createdAt)
  postUser.innerHTML = ` <div class="post-header" data-user-id="${post.user.id}">
  <img src="${post.user.imageUrl}" class="post-header__user-image">
    <p class="post-header__user-name">${post.user.name}</p>
</div>
<div class="post-image-container">
  <img class="post-image" src="${post.imageUrl}">
</div>
<div class="post-likes">
  <button data-post-id="${post.id}" data-post-liked="${post.isLiked}" class="like-button">
  <img src="./assets/images/like-${!post.isLiked ? "not-" : ""}active.svg">
  </button>
  <p class="post-likes-text">
  Нравится: ${post.likes.length > 0 ? `${post.likes[0].name} ${post.likes.length > 1 ? `и еще ${post.likes.length - 1}` : ""}` : `${post.likes.length}`} 
  </p>
</div>
<p class="post-text">
  <span class="user-name">${post.user.name}</span>
  ${post.description}
</p>
<p class="post-date">
  ${time.toLocaleString()}
</p>`
buttonListeners()
}