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
              `<article>
                <h2 class="post-title">${elem.title}</h2>
                <p class="post-id">Id posta: ${elem.id}</p>
                <p class="post-author">Id autora: ${elem.userId}</p>
                <p>${elem.body}</p>
              </article>`;
  });
  (arr.length == 0 && postsArr.length > 0) ? postsContainer.innerHTML += `<p>Brak postów spełniających kryteria</p>` : postsContainer.innerHTML;
  postsArr != arr ? postsContainer.innerHTML += `<button class="button" onclick="printPosts(postsArr)">pokaż wszystkie posty</button>` : postsContainer.innerHTML;
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
    })
    .catch((error) => {
      console.error('Error:', error);
      postsContainer.innerHTML += `<p>Coś poszło nie tak :( <br>Spróbuj odświeżyć stronę</p>`;
    });
}

//filter posts

function listenForm(){
  formSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    const filteredArr = [];

    if(inputTitle.value || inputAuthor.value){

      if(inputTitle.value && inputAuthor.value){
        for(let post of postsArr){
          if(inputAuthor.value == post.userId && (post.title.indexOf(inputTitle.value) > -1)){
            filteredArr.push(post);
          }
        }
      }

      else if(inputTitle.value){
        for(let post of postsArr){
          if(post.title.indexOf(inputTitle.value) > -1){
            filteredArr.push(post);
          }
        }
      }

      else if(inputAuthor.value){
        for(let post of postsArr){
          if(inputAuthor.value == post.userId){
            filteredArr.push(post);
          }
        }
      }
      printPosts(filteredArr);
    }
  });
}


//app init

function initApp(){
  fetchPosts();
  listenForm();
}

initApp();
