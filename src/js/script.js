// selectors

const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const formSubmit = document.getElementById('submit');
const postsContainer = document.getElementById('container');

// variables

let postsArr = [];

// printing posts on the page

function printPosts(arr){
  postsContainer.innerHTML = '';
  arr.map(elem => {
    postsContainer.innerHTML +=
              `<article class="article">
                <h2 class="post-title">${elem.title}</h2>
                <p class="post-id">Id posta: ${elem.id}</p>
                <p class="post-author">Id autora: ${elem.userId}</p>
                <p>${elem.body}</p>
              </article>`
  })
}

//fetch the posts from API

function fetchPosts(){
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    postsArr = data;
    printPosts(postsArr);
  });
}

//filter posts

function listenForm(){
  formSubmit.addEventListener('click', (event) => {
    event.preventDefault();

    const postAuthors = document.querySelectorAll('.post-author');
    const postTitles = document.querySelectorAll('.post-title');
    const filteredPosts = [];

    //console.log(postsArr)
    //console.log(inputTitle.value, inputAuthor.value)
    //console.log(postAuthors, postTitles);
  })
}


//app init

function initApp(){
  fetchPosts();
  listenForm();
}

initApp();
