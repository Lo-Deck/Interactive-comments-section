# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments


### Screenshot

![screenshot mobile](https://github.com/Lo-Deck/Interactive-comments-section/blob/main/screenshot/Interactive%20comments%20section-mobile.png).
![screenshot desktop](https://github.com/Lo-Deck/Interactive-comments-section/blob/main/screenshot/Interactive%20comments%20section-dektop.png).
![screenshot desktop-delete](https://github.com/Lo-Deck/Interactive-comments-section/blob/main/screenshot/Interactive%20comments%20section%20delete.png).


### Links

- Solution URL: [Repositories](https://github.com/Lo-Deck/Interactive-comments-section).
- Live Site URL: [Website](https://lo-deck.github.io/Interactive-comments-section/).


## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow


### What I learned

I learned how to fetch data and display it with :

```js
fetchData().then( (data) => {
     currentUser.name = data.currentUser.username;

     for(let i = 0; i < data.comments.length; i++){

          const containerCommentAndReply = document.createElement('div');
          containerCommentAndReply.classList.add('container-comment-and-reply');

          const section = document.createElement('section');
          section.classList.add('container-comment');

...

```

How to display some content using :

```js

document.addEventListener('DOMContentLoaded', () => {

    const mainContainer = document.querySelector('.main-container');
    mainContainer.addEventListener('click', (event) => {

        if(event.target.closest('.button-plus')){
            let score = Number(event.target.closest('.container-upvote').querySelector('.numberOfVote').textContent);
            score++;
            event.target.closest('.container-upvote').querySelector('.numberOfVote').textContent = score;
            event.target.closest('.button-plus').disabled = true;
            event.target.closest('.container-upvote').querySelector('.button-minus').disabled = false;
            sortComment();
        }

...

```

### Continued development

Learning from each challenge, I will continue to make website with JS and learning from different challenge from Front-end Mentor.


### Useful resources

- [Mozilla mdn](https://developer.mozilla.org/) - Very useful.
- [FreeCodeCamp](https://www.freecodecamp.org/) - I've been learning a lot.
- [Utopia](https://utopia.fyi/) - To have a better responsive design.


## Author

- Frontend Mentor - [@Lo-deck](https://www.frontendmentor.io/profile/Lo-Deck)


## Acknowledgments

Thanks to Front-end Mentor and its community.
