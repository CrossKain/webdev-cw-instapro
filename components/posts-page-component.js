import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken } from "../index.js";
import { addLikes, disLikes } from "../api.js";
import { buttonListeners } from "./user-posts-page-component.js";


export function renderPostsPageComponent({ appEl }) {

  const dateMap = posts.map((date) => {

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


  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                ${dateMap}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  buttonListeners()


}






