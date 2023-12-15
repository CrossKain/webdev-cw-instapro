const personalKey = "prod";
const baseHost = "https://wedev-api.sky.pro";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

const getPost = async () => {
    const response = await fetch(postsHost)
    const data = await response.json()
    console.log(data)
    return data.posts


}

const renderPosts = async () => {
    let posts = await getPost()
    let post = posts.map((element) => {
        return `<div class="debil2">${element.description}</div>`
    }).join(' ')
    const app = document.querySelector(".app");
    app.innerHTML = post

}

