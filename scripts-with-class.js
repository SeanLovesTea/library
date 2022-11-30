const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const isRead = document.getElementById("isRead");
const display = document.querySelector(".main");
const form = document.querySelector(".modal");
const cards = document.querySelectorAll(".card");

const submitBtn = document.querySelector("#submit-btn");
submitBtn.addEventListener("click", getBook);

const exitBtn = document.querySelector(".exit-btn");
exitBtn.addEventListener("click",closeForm);

const openBtn= document.querySelector(".open-form");
openBtn.addEventListener("click",openForm);

const checkBox = document.querySelectorAll(".check-box");

let myLibrary =[];

class Book{

    constructor(title, author, pages, isRead, id) {
        this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = Math.floor(Math.random() * 1000000)
    }
    
}

function getBook(){
  let inputTitle = form.querySelector('#input-title').value;
  let inputAuthor = form.querySelector('#input-author').value;
  let inputPages = form.querySelector('#input-pages').value;
  let inputCheckbox =form.querySelector('#input-checkbox').checked;
  
  addBooktoLibrary(inputTitle, inputAuthor, inputPages, inputCheckbox);
  renderBookCard();
  form.reset();
  closeForm();
}

function addBooktoLibrary(title, author, pages, isRead){
    let book = new Book(title, author, pages, isRead);
    myLibrary.push(book)
}

addBooktoLibrary('The Hobbit', 'J.R.R Tolkien', '250');
addBooktoLibrary('Game of Thrones', 'G.R.R Martin' , '750');

function renderBookCard(){
  removeBooks();
  myLibrary.forEach(myLibrary => {

    const card = document.createElement('div');
    card.classList.add("card");
    card.setAttribute("data-index", myLibrary.id)
    display.appendChild(card);

    const closeIcon = document.createElement('img');
    closeIcon.src = "img/alpha-x-box-outline.svg";
    closeIcon.classList.add("close-card-btn");
    closeIcon.setAttribute("data-index", myLibrary.id)
    card.appendChild(closeIcon);
    
    const title = document.createElement('p');
    title.classList.add("title")
    title.textContent = (`Title: ${myLibrary.title}`);
    card.appendChild(title);

    const author = document.createElement('p');
    author.classList.add("author");
    author.textContent = (`Author: ${myLibrary.author}`)
    card.appendChild(author);

    const pages = document.createElement('p');
    pages.classList.add("pages");
    pages.textContent = (`Pages: ${myLibrary.pages}`)
    card.appendChild(pages);

    const checkContainer = document.createElement('div');
    checkContainer.textContent =("Read:");
    checkContainer.style.display ="flex";
    checkContainer.style.alignItems ="center";
    
    card.appendChild(checkContainer);
    const checkBox = document.createElement('div');
    checkBox.classList.add("check-box");
    checkBox.setAttribute("data-index", myLibrary.id)
    checkBox.style.cursor = "pointer";
    checkBox.style.marginLeft = "10px";
    checkBox.style.width = "10px";
    checkBox.style.height = "10px";
    checkBox.style.backgroundColor = "red";
    checkBox.style.borderRadius = "1px";
  
    console.log("checkbox test : ", myLibrary.isRead);

    if (myLibrary.isRead == true){
      checkBox.style.backgroundColor = "green";
      card.style.borderLeft ="4px solid green"
    }
    checkContainer.appendChild(checkBox);
  })
  addEventList();
  console.log(myLibrary)
}

function removeBooks(){
  let cards = document.querySelectorAll(".card")
  cards.forEach((div) => div.remove());
    return;
}

function closeForm(){
  form.style.display = 'none'
}

function openForm(){
  form.style.display = 'flex';
}


function addEventList(){
  const checkBox = document.querySelectorAll(".check-box");
  checkBox.forEach((div) => {
    div.addEventListener("click",toggleRead)
  })
  const closeCardBtn = document.querySelectorAll(".close-card-btn");
  closeCardBtn.forEach((img) => {
    img.addEventListener("click",deleteBook)
  })
 };

function toggleRead(){
  const checkBox = document.querySelectorAll(".check-box");
  for(let i=0; myLibrary.length > i; i++){
    if (myLibrary[i].id == this.getAttribute("data-index")){
      if (myLibrary[i].isRead == true){
        myLibrary[i].isRead = false;
      }else  if (myLibrary[i].isRead == false){
        myLibrary[i].isRead = true;
      }
    }
  }
  removeBooks();
  renderBookCard(); 
}
function deleteBook(){
 for(let i=0; myLibrary.length > i; i++){
  if (myLibrary[i].id == this.getAttribute("data-index")){
    myLibrary.splice([i],1)
  }
  removeBooks();
  renderBookCard(); 
 }
}
renderBookCard();
addEventList();

