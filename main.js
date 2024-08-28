class Book {
  constructor(title, author, status) {
    this.title = title;
    this.author = author;
    this.status = status;
  }
  toggleStatus() {
    this.status = this.status === "Read" ? "Unread" : "Read";
  }
}

class Shelf {
  constructor() {
    this.myLibrary = [];
  }
  addBooktoLibrary(book) {
    this.myLibrary.push(book);
  }

  checkDuplicate(newBook) {
    for (let book of this.myLibrary) {
      if (book.title === newBook) {
        return true;
      }
    }
    return false;
  }

  calculateBooksRead() {
    let counter = 0;
    for (let book of this.myLibrary) {
      if (book.status === "Read") {
        counter += 1;
      }
    }
    document.querySelector(".books-read").textContent = counter;
  }

  updateBookStatuses(bookname) {
    for (let book of this.myLibrary) {
      if (book.title === bookname) {
        book.toggleStatus();
      }
    }
  }

  deleteBook(bk) {
    for (let i in this.myLibrary) {
      if (this.myLibrary[i].title === bk) {
        this.myLibrary.splice(i, 1);
        break;
      }
    }
  }
}

class ShelfManager {
  constructor() {
    this.titleInput = document.querySelector("#title");
    this.authorInput = document.querySelector("#author");
    this.isReadSelect = document.querySelector("#status");
    this.tableBody = document.querySelector("tbody");
  }

  clearForm() {
    this.titleInput.value = "";
    this.authorInput.value = "";
  }

  addBookToTable(book) {
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

    this.tableBody.appendChild(newRow);
  }

  toggleReadStatus(statusButton) {
    if (statusButton.textContent === "Unread") {
      statusButton.textContent = "Read";
      statusButton.classList.replace("unread", "has-read");
    } else {
      statusButton.textContent = "Unread";
      statusButton.classList.replace("has-read", "unread");
    }
  }
}

class UIManager {
  constructor() {
    // create instances
    this.shelf = new Shelf();
    this.shelfManager = new ShelfManager();

    // get DOM elements & add event listeners
    this.dialog = document.querySelector(".dialog");
    this.addButton = document
      .querySelector(".add")
      .addEventListener("click", () => {
        this.dialog.showModal();
      });
    this.submitButton = document
      .querySelector(".submit")
      .addEventListener("click", () => {
        if (
          !this.shelfManager.titleInput.value ||
          !this.shelfManager.authorInput.value
        ) {
          alert("Please fill in all fields");
          return;
        }
        let book = new Book(
          this.shelfManager.titleInput.value,
          this.shelfManager.authorInput.value,
          this.shelfManager.isReadSelect.value
        );
        if (this.shelf.checkDuplicate(book.title)) {
          alert("Book already in Library");
          this.shelfManager.clearForm();
          return;
        }
        this.shelf.addBooktoLibrary(book);
        this.shelfManager.clearForm();
        this.shelfManager.addBookToTable(book);
        this.shelf.calculateBooksRead(this.shelf.myLibrary);
      });
    this.cancelButton = document
      .querySelector(".cancel")
      .addEventListener("click", () => {
        this.shelfManager.clearForm();
      });
    this.tableBody = document
      .querySelector(".tbody")
      .addEventListener("click", (event) => {
        const target = event.target;
        const row = target.closest("tr");
        const bookname = row.querySelector("td").textContent;

        if (target.matches(".del-button")) {
          this.shelf.deleteBook(bookname);
          row.remove();
          this.shelf.calculateBooksRead(this.shelf.myLibrary);
        } else if (target.matches(".read-status")) {
          this.shelf.updateBookStatuses(bookname);
          this.shelfManager.toggleReadStatus(target);
          this.shelf.calculateBooksRead(this.shelf.myLibrary);
        } else if (event.target && event.target.matches(".del-button")) {
          let row = event.target.closest("tr");
          let bookname = row.querySelector("td").textContent;
          this.shelf.deleteBook(bookname);
          row.remove();
        }
      });
  }
}

// Initialize the UIManager which will create the shelf and shelfManager instances
const uiManager = new UIManager();

// Add pre-existing books to the shelf managed by uiManager
let mobyDick = new Book("Moby Dick", "Herman Melville", "Unread");
let LOTR = new Book(
  "Lord of the Rings: The Fellowship of the Ring",
  "J.R.R Tolkien",
  "Read"
);

// Add books to the shelf managed by uiManager and update the UI
uiManager.shelf.addBooktoLibrary(mobyDick);
uiManager.shelf.addBooktoLibrary(LOTR);
uiManager.shelfManager.addBookToTable(mobyDick);
uiManager.shelfManager.addBookToTable(LOTR);

// Calculate and display the number of books read
uiManager.shelf.calculateBooksRead();
