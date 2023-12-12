import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";
  const render = () => {
    
    const appHtml = `
    <div class="page-container">

      <div class="header-container"></div>
      Cтраница добавления поста
      <div class="upload__container"></div>
      <textarea class="input__text" placeholder="Введите описание"></textarea>
      <button class="button" id="add-button">Добавить</button>
    </div>
  `
  ; 

    appEl.innerHTML = appHtml;
    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    })
    renderUploadImageComponent({element: document.querySelector(".upload__container"), 
    onImageUrlChange (newImageUrl){
      imageUrl = newImageUrl;
      
    }
   })
   
    document.getElementById("add-button").addEventListener("click", () => {
      const imageInput = document.querySelector(".file-upload-input")
      if (imageInput && !imageInput.value){
        alert("Добавьте изображение")
        return
      };
      const textInput = document.querySelector(".input__text");
      if (!textInput.value){
        alert("Введите описание")
        return
      }
      onAddPostClick({
        description: document.querySelector(".input__text").value.replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;"),
        imageUrl: imageUrl,
      });
    });
  };

  render();
}
