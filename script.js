

/* FETCH DATA */

async function fetchData () {

    try{

        response = await fetch('./data.json', {
            method: 'GET',
            mode: 'cors',
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok){
            throw(`Error loading data : ${response.status}`);
        }

        const data = await response.json();

        return data;

    }
    catch(error){
        console.error('Error: ', error);
    }

}


function sortComment(){

    let sortArray = [];

    document.querySelectorAll('.container-comment-and-reply').forEach( (item) => {

        sortArray.push(item);

        sortArray.sort((a, b) => {
            return Number(b.querySelector('.numberOfVote').textContent) - Number(a.querySelector('.numberOfVote').textContent);
        });

        for(let i = sortArray.length-1; i >= 0; i--){
            document.querySelector('.main-container').insertAdjacentElement("afterbegin", sortArray[i]);   
        }
        
    });


    document.querySelectorAll('.reply').forEach( (replyElement) => {

        const sortArraySubComment = [];
        const containerComments = replyElement.querySelectorAll('.container-comment');
    
        containerComments.forEach( (item) => {
            sortArraySubComment.push(item);
        });
    
        sortArraySubComment.sort((a, b) => {
            return Number(b.querySelector('.numberOfVote').textContent) - Number(a.querySelector('.numberOfVote').textContent);
        });
    
        for(let i = sortArraySubComment.length-1; i >= 0; i--){
            replyElement.insertAdjacentElement("afterbegin", sortArraySubComment[i]);
        }

    });
    

}


let currentUser = {};

const saveCommentStorage = 'saveComment';

function saveComment() {
    
    let objSaveComment = {};
    objSaveComment.comments = []; 

    const mainComment = document.querySelectorAll('.container-comment-and-reply');

    mainComment.forEach((item, index) => {

        // objSaveComment.comments[index] = [

        objSaveComment.comments.push(//add here

            {
            id: index,
            content: item.querySelector('.container-comment .text').textContent,
            createdAt: item.querySelector('.container-comment .posted-time').textContent,
            score: item.querySelector('.container-comment .numberOfVote').textContent,
            user: {
                image: { 
                png: `./images/avatars/image-${item.querySelector('.container-comment .user').textContent}.png`,
                web: `./images/avatars/image-${item.querySelector('.container-comment .user').textContent}.webp`
                },
                username: item.querySelector('.container-comment .user').textContent
            },

            replies: item.querySelector('.reply') ? Array.from( item.querySelectorAll('.reply .container-comment') ).map( (subItem, subIndex) => ({
                
                    id: subIndex,
                    content: subItem.querySelector('.text').textContent,
                    createdAt: subItem.querySelector('.posted-time').textContent,
                    score: subItem.querySelector('.numberOfVote').textContent,
                    replyingTo: subItem.querySelector('.user').textContent,
                    user: {
                        image: { 
                        png: `./images/avatars/image-${subItem.querySelector('.user').textContent}.png`,
                        web: `./images/avatars/image-${subItem.querySelector('.user').textContent}.webp`
                        },
                        username: subItem.querySelector('.user').textContent
                    }

                })

            ) : []
            
            },

        // ]
        );// add here

        });

    const saveJSONStorage = JSON.stringify(objSaveComment.comments);
    sessionStorage.setItem(saveCommentStorage, saveJSONStorage);

}


function loadComment(array){

    for(let i = 0; i < array.length; i++){

        const containerCommentAndReply = document.createElement('div');
        containerCommentAndReply.classList.add('container-comment-and-reply');

        const section = document.createElement('section');
        section.classList.add('container-comment');

        section.innerHTML = `
        
            <h2 class="title-comment">
                <picture class="container-image-avatar">
                    <source scrset="${array[i].user.image.webp}" type="image/webp">
                    <img class="image-avatar" src="${array[i].user.image.png}" alt="amyrobson">
                </picture>
                <span class="user text-rubik-medium">${array[i].user.username}</span>
                <span class="posted-time text-rubik-regular">${array[i].createdAt}</span>
            </h2>
            <p class="text text-rubik-regular">${array[i].content}</p>
            <div class="container-reply">
                <div class="container-upvote">
                    <button class="button button-upvote button-plus"><svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"/>
                    </svg></button>
                    <span class="numberOfVote text-rubik-medium">${array[i].score}</span>
                    <button class="button button-upvote button-minus" disabled><svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" />
                    </svg></button>
                </div>
                <button class="button button-reply"><svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/>
                </svg><span class="text-rubik-medium">Reply</span></button>
            </div>
        
        `;

        containerCommentAndReply.insertAdjacentElement('afterbegin', section);
        document.querySelector('.add-comment').insertAdjacentElement('beforebegin', containerCommentAndReply);


        if(array[i].replies.length !== 0){

            const reply = document.createElement('div');
            reply.classList.add('reply');
            section.insertAdjacentElement('afterend', reply);

            for(let j = 0; j < array[i].replies.length; j++){

                const sectionReply = document.createElement('section');
                sectionReply.classList.add('container-comment');

                sectionReply.innerHTML = `

                        <h2 class="title-comment">
                            <picture class="container-image-avatar">
                                <source scrset="${array[i].replies[j].user.image.webp}" type="image/webp">
                                <img class="image-avatar" src="${array[i].replies[j].user.image.png}" alt="amyrobson">
                            </picture>
                            <span class="user text-rubik-medium">${array[i].replies[j].user.username}</span>
                            ${ currentUser.name === array[i].replies[j].user.username ? `<span class="ifUser text-rubik-medium">you</span>` : `` }
                            <span class="posted-time text-rubik-regular">${array[i].replies[j].createdAt}</span>
                        </h2>
                        <p class="text text-rubik-regular">${array[i].replies[j].content}</p>
                        <div class="container-reply">
                            <div class="container-upvote">
                                <button class="button button-upvote button-plus"><svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"/>
                                </svg></button>
                                <span class="numberOfVote text-rubik-medium">${array[i].replies[j].score}</span>
                                <button class="button button-upvote button-minus" disabled><svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"/>
                                </svg></button>
                            </div>
                            ${ currentUser.name === array[i].replies[j].user.username ?
                                `<div class="container-edit-message">
                                    <button class="button button-delete text-rubik-medium"><img src="./images/icon-delete.svg" alt="delete">Delete</button>
                                    <button class="button button-edit text-rubik-medium"><img src="./images/icon-edit.svg" alt="edit">Edit</button>
                                </div>`
                                :
                                `<button class="button button-reply"><svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                                <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/>
                                </svg><span class="text-rubik-medium">Reply</span></button>`
                            }
                        </div>
                    
                `;

                reply.insertAdjacentElement('beforeend', sectionReply);
                                    
            }

        }

    }

}




const main = document.querySelector('.main-container');

// // let currentUser = {};

// window.addEventListener('load', () => {

//     if(sessionStorage.getItem('isRefreshing') === 'true') {

//       sessionStorage.removeItem('isRefreshing'); // Clear the flag
//     //   console.log("Page was refreshed");
//       const user = sessionStorage.getItem(saveUser);
//     //   console.log(user);
//       currentUser.name = user;
//       const dataStorage = sessionStorage.getItem(saveCommentStorage);
//     //   console.log(dataStorage);
//       const dataStorageArray = JSON.parse(dataStorage);
//       console.log(dataStorageArray);
//       loadComment(dataStorageArray);

//       sessionStorage.clear();

//     } 
//     else {

//       console.log("Page was loaded normally");


// if(sessionStorage.getItem('isRefreshing') !== 'true'){


fetchData().then( (data) => {

        currentUser.name = data.currentUser.username;
 
        for(let i = 0; i < data.comments.length; i++){

            const containerCommentAndReply = document.createElement('div');
            containerCommentAndReply.classList.add('container-comment-and-reply');

            const section = document.createElement('section');
            section.classList.add('container-comment');

            section.innerHTML = `
            
                <h2 class="title-comment">
                    <picture class="container-image-avatar">
                        <source scrset="${data.comments[i].user.image.webp}" type="image/webp">
                        <img class="image-avatar" src="${data.comments[i].user.image.png}" alt="amyrobson">
                    </picture>
                    <span class="user text-rubik-medium">${data.comments[i].user.username}</span>
                    <span class="posted-time text-rubik-regular">${data.comments[i].createdAt}</span>
                </h2>
                <p class="text text-rubik-regular">${data.comments[i].content}</p>
                <div class="container-reply">
                    <div class="container-upvote">
                        <button class="button button-upvote button-plus"><svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"/>
                        </svg></button>
                        <span class="numberOfVote text-rubik-medium">${data.comments[i].score}</span>
                        <button class="button button-upvote button-minus" disabled><svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" />
                        </svg></button>
                    </div>
                    <button class="button button-reply"><svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/>
                    </svg><span class="text-rubik-medium">Reply</span></button>
                </div>
            
            `;

            containerCommentAndReply.insertAdjacentElement('afterbegin', section);
            document.querySelector('.add-comment').insertAdjacentElement('beforebegin', containerCommentAndReply);


            if(data.comments[i].replies.length !== 0){

                const reply = document.createElement('div');
                reply.classList.add('reply');
                section.insertAdjacentElement('afterend', reply);

                for(let j = 0; j < data.comments[i].replies.length; j++){

                    const sectionReply = document.createElement('section');
                    sectionReply.classList.add('container-comment');

                    sectionReply.innerHTML = `

                            <h2 class="title-comment">
                                <picture class="container-image-avatar">
                                    <source scrset="${data.comments[i].replies[j].user.image.webp}" type="image/webp">
                                    <img class="image-avatar" src="${data.comments[i].replies[j].user.image.png}" alt="amyrobson">
                                </picture>
                                <span class="user text-rubik-medium">${data.comments[i].replies[j].user.username}</span>
                                ${ data.currentUser.username === data.comments[i].replies[j].user.username ? `<span class="ifUser text-rubik-medium">you</span>` : `` }
                                <span class="posted-time text-rubik-regular">${data.comments[i].replies[j].createdAt}</span>
                            </h2>
                            <p class="text text-rubik-regular"><span class="messTo">@${data.comments[i].user.username}</span> ${data.comments[i].replies[j].content}</p>
                            <div class="container-reply">
                                <div class="container-upvote">
                                    <button class="button button-upvote button-plus"><svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"/>
                                    </svg></button>
                                    <span class="numberOfVote text-rubik-medium">${data.comments[i].replies[j].score}</span>
                                    <button class="button button-upvote button-minus" disabled><svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"/>
                                    </svg></button>
                                </div>
                                ${ data.currentUser.username === data.comments[i].replies[j].user.username ?
                                    `<div class="container-edit-message">
                                        <button class="button button-delete text-rubik-medium"><img src="./images/icon-delete.svg" alt="delete">Delete</button>
                                        <button class="button button-edit text-rubik-medium"><img src="./images/icon-edit.svg" alt="edit">Edit</button>
                                    </div>`
                                    :
                                    `<button class="button button-reply"><svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/>
                                    </svg><span class="text-rubik-medium">Reply</span></button>`
                                }
                            </div>
                        
                    `;

                    reply.insertAdjacentElement('beforeend', sectionReply);
                                        
                }

            }

        }


        document.querySelector('#myForm').addEventListener('submit', (event) => {

            if( document.querySelector('#myForm')[0].textLength !== 0 ){

                const containerCommentAndReply = document.createElement('div');
                containerCommentAndReply.classList.add('container-comment-and-reply');
                const section = document.createElement('section');
                section.classList.add('container-comment');

                section.innerHTML = `
                
                    <h2 class="title-comment">
                        <picture class="container-image-avatar">
                            <source scrset="${data.currentUser.image.webp}" type="image/webp">
                            <img class="image-avatar" src="${data.currentUser.image.png}" alt="amyrobson">
                        </picture>
                        <span class="user text-rubik-medium">${data.currentUser.username}</span>
                        <span class="ifUser text-rubik-medium">you</span>
                        <span class="posted-time text-rubik-regular">0 min</span>
                    </h2>
                    <p class="text text-rubik-regular">${document.querySelector('#myForm')[0].value}</p>
                    <div class="container-reply">
                        <div class="container-upvote">
                            <button class="button button-upvote button-plus"><svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"/>
                            </svg></button>
                            <span class="numberOfVote text-rubik-medium">0</span>
                            <button class="button button-upvote button-minus" disabled><svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" />
                            </svg></button>
                        </div>

                        <div class="container-edit-message">
                            <button class="button button-delete text-rubik-medium"><img src="./images/icon-delete.svg" alt="delete">Delete</button>
                            <button class="button button-edit text-rubik-medium"><img src="./images/icon-edit.svg" alt="edit">Edit</button>
                        </div>

                    </div>
                
                `;
         
                containerCommentAndReply.insertAdjacentElement('afterbegin', section);
                document.querySelector('.add-comment').insertAdjacentElement('beforebegin', containerCommentAndReply);
 
            }

            event.preventDefault();

        });

        sortComment();

    }
    
)

// }

// }//add

// });//add



document.addEventListener('DOMContentLoaded', () => {

    const mainContainer = document.querySelector('.main-container');

    mainContainer.addEventListener('click', (event) => {

        if(event.target.closest('.button-plus')){

            console.log('plus');
            let score = Number(event.target.closest('.container-upvote').querySelector('.numberOfVote').textContent);
            score++;
            event.target.closest('.container-upvote').querySelector('.numberOfVote').textContent = score;
            event.target.closest('.button-plus').disabled = true;
            event.target.closest('.container-upvote').querySelector('.button-minus').disabled = false;
            sortComment();

        }


        if(event.target.closest('.button-minus')){

            console.log('minus');
            let score = Number(event.target.closest('.container-upvote').querySelector('.numberOfVote').textContent);
            score--;
            event.target.closest('.container-upvote').querySelector('.numberOfVote').textContent = score;
            event.target.closest('.button-minus').disabled = true;
            event.target.closest('.container-upvote').querySelector('.button-plus').disabled = false;
            sortComment();

        }



        if(event.target.closest('.button-reply')){

            if(!event.target.closest('.main-container').querySelector('.reply-mess')){//if you click twice on edit dont open a new box, close it

                const nameReply = event.target.closest('.container-comment').querySelector('.title-comment .user').innerText;

                const reply = document.createElement('div');
                reply.classList.add('reply-mess');

                reply.innerHTML = `
                    <form class="add-comment" id="" action="./index.html" novalidate>
                        <textarea class="text-rubik-regular" name="comment" id="comment-user" placeholder="Add a comment..." required>@${nameReply}</textarea>
                        <picture class="container-image-avatar">
                            <source scrset="./images/avatars/image-juliusomo.webp" type="image/webp">
                            <img class="image-avatar" src="./images/avatars/image-juliusomo.png" alt="amyrobson">
                        </picture>
                        <button class="button button-submit button-submit-reply text-rubik-medium">Reply</button>
                    </form>
                `;

                event.target.closest('.container-comment').insertAdjacentElement('afterend', reply);

            }

            else if(event.target.closest('.main-container').querySelector('.reply-mess')){
                event.target.closest('.container-comment').nextElementSibling.remove();
            }

        }

        if(event.target.closest('.button-submit-reply')){

            event.target.closest('.add-comment').addEventListener('submit', (event) => {


                let comment = event.target.closest('.add-comment').querySelector('textarea').value;

                comment = comment.split(' ');
                comment.shift();
                comment = comment.join(' ');

                if(comment !== ''){

                    let reply;

                    if( event.target.closest('.container-comment-and-reply').querySelector('.reply') ){
                        reply = event.target.closest('.container-comment-and-reply').querySelector('.reply');
                    }

                    else{
                        reply = document.createElement('div');
                        reply.classList.add('reply');
                        event.target.closest('.reply-mess').previousElementSibling.insertAdjacentElement('afterend', reply);
                    }

                    const sectionReply = document.createElement('section');
                    sectionReply.classList.add('container-comment');          
                               

                    sectionReply.innerHTML = `
                        <h2 class="title-comment">
                            <picture class="container-image-avatar">
                                <source scrset="./images/avatars/image-juliusomo.webp" type="image/webp">
                                <img class="image-avatar" src="./images/avatars/image-juliusomo.webp" alt="amyrobson">
                            </picture>
                            <span class="user text-rubik-medium">juliusomo</span>
                            <span class="ifUser text-rubik-medium">you</span>
                            <span class="posted-time text-rubik-regular">0 minutes</span>
                        </h2>
                        <p class="text text-rubik-regular"><span class="messTo">@${event.target.closest('.container-comment-and-reply').querySelector('.title-comment .user').innerText}</span> ${comment}</p> 
                        <div class="container-reply">
                            <div class="container-upvote">
                                <button class="button button-upvote button-plus"><svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"/>
                                </svg></button>
                                <span class="numberOfVote text-rubik-medium">0</span>
                                <button class="button button-upvote button-minus" disabled><svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"/>
                                </svg></button>
                            </div>
                            <div class="container-edit-message">
                                <button class="button button-delete text-rubik-medium"><img src="./images/icon-delete.svg" alt="delete">Delete</button>
                                <button class="button button-edit text-rubik-medium"><img src="./images/icon-edit.svg" alt="edit">Edit</button>
                            </div>
                        </div>
                    `;

                    reply.insertAdjacentElement('beforeend', sectionReply);

                }

                event.target.closest('.reply-mess').remove();
                event.preventDefault();

            });

        }


        if(event.target.closest('.button-delete')){

            document.querySelector('.delete-box').style.display = 'block';
            document.querySelector('.background').style.display = 'block';

            window.scrollTo(0, 0);

            document.querySelector('.delete-box .button-cancel').addEventListener('click', () => {
                document.querySelector('.delete-box').style.display = 'none';
                document.querySelector('.background').style.display = 'none';
            });

            document.querySelector('.delete-box .button-confirm').addEventListener('click', () => {
                event.target.closest('.container-comment').remove();     
                document.querySelector('.delete-box').style.display = 'none';
                document.querySelector('.background').style.display = 'none';
            });

        }


        if(event.target.closest('.button-edit')){
            event.target.closest('.button-edit').disabled = true;
            const textarea = document.createElement('textarea');
            textarea.classList.add('text-rubik-regular');
            textarea.classList.add('edit-textarea');
            textarea.classList.name = 'comment';
            textarea.required = true;
            textarea.value = event.target.closest('.container-comment').querySelector('.text').innerText;
            event.target.closest('.container-comment').querySelector('.text').style.display = 'none';
            event.target.closest('.container-comment').querySelector('.text').insertAdjacentElement('afterend', textarea);
            event.target.closest('.container-comment').querySelector('.text').style.display = 'none';
            const buttonSubmit = document.createElement('button');
            buttonSubmit.classList.add('button', 'button-submit', 'button-update','text-rubik-medium');
            buttonSubmit.textContent = 'update';
            event.target.closest('.container-comment').querySelector('textarea').insertAdjacentElement('afterend', buttonSubmit);
        }

        if(event.target.closest('.button-update')){

            event.target.closest('.container-comment').querySelector('.button-edit').disabled = false;

            if( event.target.closest('.container-comment-and-reply').querySelector('.reply') ){

                let updateComment = event.target.closest('.container-comment').querySelector('textarea').value;
                console.log(updateComment);
                updateComment = updateComment.split(' ');
                updateComment.shift();
                updateComment = updateComment.join(' ');
                console.log(updateComment);
                event.target.closest('.container-comment').querySelector('.text').innerHTML = ` <span class="messTo">@${event.target.closest('.container-comment-and-reply').querySelector('.title-comment .user').innerText}</span> ${updateComment}`;

            }
            else{

                event.target.closest('.container-comment').querySelector('.text').textContent = event.target.closest('.container-comment').querySelector('textarea').value;   

            }

            event.target.closest('.container-comment').querySelector('.text').style.display = 'block';
            event.target.closest('.container-comment').querySelector('textarea').remove();
            event.target.closest('.container-comment').querySelector('.button-update').remove();

        }

    });

})





// const saveUser = 'userKey'; 


// window.addEventListener('beforeunload', () => {

//     sessionStorage.setItem('isRefreshing', 'true');

//     console.log('before unload');

//     const userStorage = currentUser.name;
//     // console.log(currentUser.name);

//     sessionStorage.setItem(saveUser, userStorage);

//     saveComment();

// });



// window.addEventListener('load', () => {

//     if(sessionStorage.getItem('isRefreshing') === 'true') {

//       sessionStorage.removeItem('isRefreshing'); // Clear the flag
//     //   console.log("Page was refreshed");

//       const user = sessionStorage.getItem(saveUser);
//     //   console.log(user);

//       currentUser.name = user;

//       const dataStorage = sessionStorage.getItem(saveCommentStorage);
//     //   console.log(dataStorage);

//       const dataStorageArray = JSON.parse(dataStorage);
//       console.log(dataStorageArray);

//       loadComment(dataStorageArray);

//     //   sessionStorage.clear();

//     } 
    
//     else {

//       console.log("Page was loaded normally");

//     }

// });
