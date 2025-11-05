function Book(title, author, pages, read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}
Book.prototype.info=function(){
    let readStr="";

    if(this.read===true)
        readStr="read";
    else
        readStr="not read";

    return this.title+" by "+this.author+", "+this.pages+" pages, "+readStr+".";
}
Book.prototype.switchRead=function(){
    this.read=!this.read;
}

const myLibrary=[];

const myLibraryDOM=document.getElementById("myLibrary");
const newBookButton=document.getElementById("newBookButton");
const form=document.getElementById("bookForm");
const dialog=document.getElementById("bookDialog");
const closeButton=document.getElementById("closeDialog");
const addBook=document.getElementById("addBook");

function createBook(info, id){
    const book=document.createElement("div");
    book.classList.add("book");
    book.setAttribute("data-id",id)

    const bookInfo=document.createElement("span");
    bookInfo.classList.add("book-info");
    bookInfo.textContent=info;
    book.appendChild(bookInfo);

    const readButton=document.createElement("button");
    readButton.type="button";
    readButton.textContent="read switch";
    readButton.classList.add("read-switch")

    const deleteButton=document.createElement("button");
    deleteButton.type="button";
    deleteButton.textContent="delete";
    deleteButton.classList.add("delete-button");

    const buttonContainer=document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonContainer.appendChild(readButton);
    buttonContainer.appendChild(deleteButton);

    book.appendChild(buttonContainer);

    return book;
}

function renderBooks(){
    myLibraryDOM.innerHTML="";
    myLibrary.forEach( b =>{
        myLibraryDOM.appendChild(createBook(b.book.info(), b.id));
    })
}

newBookButton.addEventListener("click", ()=>{
    dialog.showModal();
})
/*addBook.addEventListener("click", (event)=>{
    event.preventDefault();
    console.log(form);
    const data=new FormData(form);
    console.log(data);
    dialog.close();
    form.reset();
})*/
form.addEventListener("submit", (event)=>{
    event.preventDefault();
    console.log("form submited");
    const data=new FormData(form);
    const read=data.get("read")==="on";
    addBookToLibrary(data.get("title"), data.get("author"), data.get("pages"), read);
    dialog.close();
})
closeButton.addEventListener("click", ()=>{
    dialog.close();
})

console.log(myLibraryDOM)

function addBookToLibrary(title, author, pages, read){
    const book=new Book(title, author, pages, read);
    const id=crypto.randomUUID();
    myLibrary.push({book, id });
    renderBooks();
}
function removeBookFromlibrary(id){
    myLibrary.splice(myLibrary.findIndex(book => book.id===id),1);
    renderBooks();
}
function switchReadById(id){
    const book=myLibrary.find(book => book.id===id);
    book.book.switchRead();
    renderBooks();
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien",295, false);

myLibraryDOM.addEventListener("click", (event) => {
    if (event.target.tagName==="BUTTON"){
        const clickedButton=event.target;
        const bookDOM=clickedButton.parentElement.parentElement;
        if (clickedButton.classList.contains("delete-button")){
            removeBookFromlibrary(bookDOM.getAttribute("data-id"));
        }
        if (clickedButton.classList.contains("read-switch")){
            switchReadById(bookDOM.getAttribute("data-id"));
        }
    }
})