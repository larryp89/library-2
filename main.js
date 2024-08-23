const myLibrary = [];

function Book(title, author, isRead) {
  this.title = title;
  this.author = author;
  this.isRead = isRead;
}

function addBooktoLibrary(book) {
  myLibrary.push(book);
}

// get DOM elements
dialog = document.querySelector(".dialog");
addButton = document.querySelector(".add");
addButton.addEventListener("click", function () {
  dialog.showModal();
});
