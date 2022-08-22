console.log('this is index.js');

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    add(book) {
        let libBooks = localStorage.getItem('libBooks');
        let libBooksObj;
        if (libBooks == null) {
            libBooksObj = [];
        } else {
            libBooksObj = JSON.parse(libBooks);
        }
        libBooksObj.push(book);
        localStorage.setItem('libBooks', JSON.stringify(libBooksObj));
        console.log('adding to UI');
    }

    validate(book) {
        if (book.name.length != 0 && book.author.length != 0) {
            return true;
        }
        else {
            return false;
        }
    }

    static status(type,message)
    {
        console.log('status called');
        let alert = document.getElementById('message');
            alert.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <strong>Message: </strong>${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`
            setTimeout(() => {
                alert.innerHTML = '';
            }, 2500);
    }

    static show() {
            
        let libBooks = localStorage.getItem('libBooks');
        let libBooksObj;
        if (libBooks == null) {
            libBooksObj = [];
        } else {
            libBooksObj = JSON.parse(libBooks);
        }
        let books = document.getElementById('books');
        let table1= document.getElementById('table1');
        let tablebody = document.getElementById('tablebody');
        if (libBooksObj.length == 0) {
            books.innerHTML = "No books present in library";
            tablebody.innerHTML="";
            table1.style.visibility='hidden';
        }
        else {
            table1.style.visibility='visible';
            books.innerHTML = "Your books";
            let html = "";
            libBooksObj.forEach(function (element, index) {
                html += `
            <tr class="tableRow">
            <!-- <th scope="row">1</th> -->
            <td>${element.name}</td>
            <td>${element.author}</td>
            <td>${element.type}</td>
            <td><button type="button" class="btn btn-outline-danger" onclick="deleteLib(this.id)" id="${index}">Delete</button></td>
            </tr>`;
            });
            tablebody.innerHTML = html;
        }
    }
}

function deleteLib(id) {
    let libBooks = localStorage.getItem('libBooks');
    let libBooksObj = JSON.parse(libBooks);
    libBooksObj.splice(id, 1);
    localStorage.setItem('libBooks', JSON.stringify(libBooksObj));
    Display.show();
}

//---------USING PROTOTYPE--------
// function Book(name, author, type) {
//     this.name = name;
//     this.author = author;
//     this.type = type;
// }

// function Display() {

// }

// Display.prototype.add = function (book) {
//     console.log('adding to UI');
//     let tablebody = document.getElementById('tablebody');
//     let uiString = `
//                     <tr>
//                         <!-- <th scope="row">1</th> -->
//                         <td>${book.name}</td>
//                         <td>${book.author}</td>
//                         <td>${book.type}</td>
//                     </tr>`
//     tablebody.innerHTML += uiString;
// }

// Display.prototype.clear = function () {
//     let libraryForm = document.getElementById('libraryForm');
//     libraryForm.reset();
// }

// Display.prototype.validate = function (book) {
//     if (book.name.length != 0 && book.author.length != 0) {
//         return true;
//     }
//     else {
//         return false;
//     }
// }

// Display.prototype.show = function (type, message) {

//     let alert = document.getElementById('message');
//     alert.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
//         <strong>Message: </strong>${message}
//         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//       </div>`
//     setTimeout(() => {
//         alert.innerHTML = '';
//     }, 2500);
// }


//add submit eventlistner to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('form submitted');
    e.preventDefault();
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let fiction = document.getElementById('fiction');

    let type;

    if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    }
    else {
        type = fiction.value;
    }

    let book = new Book(name, author, type);
    console.log(book);
    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        Display.status('success', 'Your book has been added successfully');
        Display.show();
    }
    else {
        Display.status('danger', 'Sorry Your book was unable to add');
    }
}
window.onload = Display.show();

//ADDING SEARCH FEATURE IN THE LIBRARY
let search = document.getElementById('searchText');
search.addEventListener('input', function () {
    let inputVal = search.value;

    //CODE TO HIDE THE MAGIC NOTES INPUT FROM THE SCREEN
    let tableRow = document.getElementsByClassName('tableRow');
    console.log(tableRow);
    let toHide = document.getElementsByClassName('hide');
    Array.from(toHide).forEach(function (element) {
        element.style.display = 'none';
    }
    );

    //IN ORDER TO MAKE THE COMPARISON BETWEEN TEXT IN THE SEARCH BUTTON AND THE NOTES CASE INSENSITIVE AND SPACE INSENSITIVES BY MAKING WHOLE TEXT TO LOWERCASE AND REMOVING THE SPACE IN STARTING AND ENDING OF THE TEXT USING TRIM()
    inputVal = inputVal.toLowerCase();
    inputVal = inputVal.trim();


    //RUNNING FOR EACH NOTESCARD ELEMENT
    Array.from(tableRow).forEach(function (element) {
        let bookName = element.getElementsByTagName("td")[0].innerText;
        let author = element.getElementsByTagName("td")[1].innerText;
        console.log(bookName, author);

    //     //IN ORDER TO MAKE THE COMPARISON BETWEEN TEXT IN THE SEARCH BUTTON AND THE NOTES CASE INSENSITIVE AND SPACE INSENSITIVE
        bookName = bookName.toLowerCase();
        bookName = bookName.trim();
       author =author.toLowerCase();
       author =author.trim();

        if (bookName.includes(inputVal)) {
            element.className = "tableRow";
        }
        else if (author.includes(inputVal)) {
            element.className = "tableRow";
        }
        else {
            element.className = "tableRow d-none";
        }
    })
});



function onblurfun()
{
    let toHide = document.getElementsByClassName('hide');
    Array.from(toHide).forEach(function (element) {
        element.style.display = 'block';
    }
    );
    let tableRow = document.getElementsByClassName('tableRow');
    Array.from(tableRow).forEach(function (element) {
        element.className = "tableRow";
    })
}