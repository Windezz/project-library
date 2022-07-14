// Select the HTML document
const btnOpenDialog = document.querySelector('.addBook');  // btn to open the dialog box to input new book
const btnCloseDialog = document.querySelector('.btnClose')  // btn to close the dialog box to input new book

const bookShelf = document.querySelector('.bookShelf');
const bookCard = document.querySelector('.card');
const dialog = document.querySelector('.addbook-dialog');   // dialog box to input a new book
const btnAddBook = document.querySelector('.btnAddBook'); // btn to submit the new book information
// let btnDelete = document.querySelector('.delete');

// input elements
const bookName = document.querySelector('#bookname');
const bookAuthor = document.querySelector('#bookauthor');
const bookPage = document.querySelector('#bookpages'); 

// Array to store all the book objects
let myLibrary = [];

function Book(name, author, numberOfPages) {
    // the constructor
    this.name = name;
    this.author = author;
    this.pages = numberOfPages;
    this.read = false;
}

let deleteCount = 0

function addBookToLibrary(name, author, numberOfPages) {
    // take user's input and store the new book objects into an array
    let newBook = new Book(name, author, numberOfPages);

    myLibrary.push(newBook);
    // window.localStorage.setItem('myLibrary', myLibrary);    

    // Make a copy of the existing card from the DOM
    let bookCardClone = bookCard.cloneNode(true);
    
    // Enter the new book's information into the existing card
    bookCardClone.children[0].textContent = newBook.name;
    bookCardClone.children[1].textContent = newBook.author;
    bookCardClone.children[2].textContent = newBook.pages;
    bookCardClone.dataset.index =  myLibrary.indexOf(newBook);
    bookCardClone.className = `card card${myLibrary.indexOf(newBook)}`;
    bookCardClone.setAttribute("style", "display: block")
    
    // Add the new book card into the bookShelf
    bookShelf.appendChild(bookCardClone);
    
    // select the delete button in the bookCardClone
    let delButton = bookCardClone.children[3].children[1];
    delButton.className = `delete delete${myLibrary.indexOf(newBook)}`;
    
    delButton.addEventListener('click', (event) => {
        let cardIndex = (delButton.parentElement).parentElement.className;
        
        cardIndex = cardIndex.split(" ");

        let removeCard = document.querySelector(`.${cardIndex[1]}`);
        console.log(cardIndex[1]);
        myLibrary.splice(parseInt(cardIndex[1][4])-deleteCount,1);    
        removeCard.remove();
        console.log(myLibrary);
        deleteCount += 1;
    })

    let readButton = bookCardClone.children[3].children[0];
    console.log(readButton);
    readButton.addEventListener('click', (event) => {

        if(!(newBook.read)){
            newBook.read = true;
            readButton.style.backgroundColor = "green";
            console.log(myLibrary);
        } else {
            newBook.read = false;
            readButton.style.backgroundColor = "rgb(220, 0, 0)";
        }
    
    })

    readButton.addEventListener('mouseover', (event) => {
        if(!(newBook.read)) {
            readButton.style.backgroundColor = "greenyellow";
            readButton.style.color = "black";
        } else {
            readButton.style.backgroundColor = "rgb(141, 0, 0)";
            readButton.style.color = "white";
        }
    })

    readButton.addEventListener('mouseout', (event) => {
        if(!(newBook.read)) {
            readButton.style.backgroundColor = "rgb(220, 0, 0)";
            readButton.style.color = "white";
        } else {
            readButton.style.backgroundColor = "green";
            readButton.style.color = "white";
        }
    })

    
    // window.localStorage.setItem(`${myLibrary.indexOf(newBook)}`, bookCardClone);
    console.log(myLibrary);
}

btnOpenDialog.addEventListener('click', (event) => {
    dialog.style.display = "flex";
})

btnCloseDialog.addEventListener('click', (event) => {
    dialog.style.display = "none";
    bookName.value = "";
    bookAuthor.value = "";
    bookPage.value = "";
})

btnAddBook.addEventListener('click', (event) => {
    addBookToLibrary(bookName.value, bookAuthor.value, bookPage.value);
    dialog.style.display = "none";
    bookName.value = "";
    bookAuthor.value = "";
    bookPage.value = "";
}
)

// const deleteButs = document.querySelector('.delete');
// console.log((deleteButs.parentElement).parentElement);
