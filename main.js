function Book(title, author, status) {
  this.title = title;
  this.author = author;
  this.status = status;
  this.toggleStatus = function () {
    this.status = this.status === "Read" ? "Unread" : "Read";
  };
}

const myLibrary = [];

function addBooktoLibrary(book) {
  myLibrary.push(book);
}

function checkDuplicate(newBook) {
  for (let book of myLibrary) {
    if (book.title === newBook) {
      return true;
    }
  }
}

function calculateBooksRead(arr) {
  let counter = 0;
  for (let book of arr) {
    if (book.status === "Read") {
      counter += 1;
    }
  }
  booksReadSpan.textContent = counter;
}

function updateBookStatuses(bookname) {
  for (let book of myLibrary) {
    if (book.title === bookname) {
      book.toggleStatus();
    }
  }
}

function clearForm() {
  titleInput.value = "";
  authorInput.value = "";
}

function deleteBook(bk) {
  for (let i in myLibrary) {
    if (myLibrary[i].title === bk) {
      myLibrary.splice(i, 1);
      break;
    }
  }
}

function addBookToTable(book) {
  let newRow = document.createElement("tr");

  let titleCell = document.createElement("td");
  titleCell.textContent = book.title;
  newRow.appendChild(titleCell);

  let authorCell = document.createElement("td");
  authorCell.textContent = book.author;
  newRow.appendChild(authorCell);

  let statusCell = document.createElement("td");
  let statusButton = document.createElement("button");
  statusButton.className = "read-status";
  statusButton.textContent = book.status;

  if (statusButton.textContent === "Read") {
    statusButton.classList.add("has-read");
  } else {
    statusButton.classList.add("unread");
  }

  statusCell.append(statusButton);
  newRow.appendChild(statusCell);

  let deleteCell = document.createElement("td");
  let deleteButton = document.createElement("button");
  deleteButton.className = "del-button";
  deleteButton.textContent = "Delete";
  deleteCell.appendChild(deleteButton);
  newRow.appendChild(deleteCell);

  tableBody.appendChild(newRow);
}

function toggleReadStatus(statusButton) {
  if (statusButton.textContent === "Unread") {
    statusButton.textContent = "Read";
    statusButton.classList.replace("unread", "has-read");
  } else {
    statusButton.textContent = "Unread";
    statusButton.classList.replace("has-read", "unread");
  }
}

// get DOM elements
dialog = document.querySelector(".dialog");
addButton = document.querySelector(".add");
submitButton = document.querySelector(".submit");
cancelButton = document.querySelector(".cancel");
tableBody = document.querySelector(".tbody");

let titleInput = document.querySelector("#title");
let authorInput = document.querySelector("#author");
let isReadSelect = document.querySelector("#status");
let booksReadSpan = document.querySelector(".books-read");

addButton.addEventListener("click", function () {
  dialog.showModal();
});

cancelButton.addEventListener("click", clearForm);

submitButton.addEventListener("click", function () {
  if (!titleInput.value || !authorInput.value) {
    alert("Please fill in all fields");
    return;
  }
  let book = new Book(titleInput.value, authorInput.value, isReadSelect.value);
  if (checkDuplicate(book.title)) {
    alert("Book already in Library");
    clearForm()
    return;
  }
  addBooktoLibrary(book);
  clearForm();
  addBookToTable(book);
  calculateBooksRead(myLibrary);
});

tableBody.addEventListener("click", function (event) {
  const target = event.target;
  const row = target.closest("tr");
  const bookname = row.querySelector("td").textContent;

  if (target.matches(".del-button")) {
    deleteBook(bookname);
    row.remove();
    calculateBooksRead(myLibrary);
  } else if (target.matches(".read-status")) {
    updateBookStatuses(bookname);
    toggleReadStatus(target);
    calculateBooksRead(myLibrary);
  }
});

tableBody.addEventListener("click", function (event) {
  if (event.target && event.target.matches(".del-button")) {
    let row = event.target.closest("tr");
    let bookname = row.querySelector("td").textContent;
    deleteBook(bookname);
    row.remove();
  }
});

// add pre-existing books to array
let mobyDick = new Book("Moby Dick", "Robert Louis Stevenson", "Unread");
let LOTR = new Book(
  "Lord of the Rings: The Fellowship of the Ring",
  "J.R.R Tolkien",
  "Read"
);
myLibrary.push(mobyDick);
myLibrary.push(LOTR);
addBookToTable(mobyDick);
addBookToTable(LOTR);
calculateBooksRead(myLibrary);
