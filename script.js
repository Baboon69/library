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

function addBookToLibrary(title, author, pages, read){
    const book=new Book(title, author, pages, read);
    const id=crypto.randomUUID();
    myLibrary.push({book, id });
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien",295, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien",295, false);
console.log(myLibrary);

const myLibraryDom=document.getElementById("myLibrary");

function createBook(info, id){
    const book=document.createElement("div");
    book.classList.add("book");

    const bookInfo=document.createElement("span");
    bookInfo.classList.add("book-info");
    bookInfo.textContent=info;
    book.appendChild(bookInfo);

    const readButton=document.createElement("button");
    readButton.type="button";
    readButton.textContent="read switch";

    const deleteButton=document.createElement("button");
    deleteButton.type="button";
    deleteButton.textContent="delete";

    const buttonContainer=document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonContainer.appendChild(readButton);
    buttonContainer.appendChild(deleteButton);

    book.appendChild(buttonContainer);

    return book;
}

function renderBooks(){
    myLibrary.innerHtml="";
    myLibrary.forEach( b =>{
        myLibraryDom.appendChild(createBook(b.book.info(), 0));
    })
}

renderBooks();

console.log(myLibraryDom)