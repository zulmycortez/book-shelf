// var books = [
//   {
//     title: 'Harry Potter',
//     author: 'J.K. Rowling',
//     imageURL: 'https://books.google.com/books/content?id=WV8pZj_oNBwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
//     isbn: '9781921479311',
//     pageCount: 268
//   }
// ];
debugger;

var books = [];


var addBooks = function (data) {

  for (var i = 0; i < data.items.length; i++) {
    var bookData = data.items[i];

    var author = function () {
      if (bookData.volumeInfo.authors) {
        return bookData.volumeInfo.authors[0];
      } else {
        return null;
      }
    };

    var imageURL = function () {
      if (bookData.volumeInfo.imageLinks) {
        return bookData.volumeInfo.imageLinks.thumbnail;
      } else {
        return null;
      }
    };

    var isbn = function () {
      if (bookData.volumeInfo.industryIdentifiers) {
        return bookData.volumeInfo.industryIdentifiers[0].identifier;
      } else {
        return null;
      }
    };

    var pageCount = function () {
      if (bookData.volumeInfo.pageCount) {
        return bookData.volumeInfo.pageCount;
      } else {
        return null;
      }
    };

    var title = function () {
      if (bookData.volumeInfo.title) {
        return bookData.volumeInfo.title;
      } else {
        return null;
      }
    };

    var book = {
      title: title(),
      author: author(),
      imageURL: imageURL(),
      pageCount: pageCount(),
      isbn: isbn()
    };

    books.push(book);
  }

  renderBooks();
};



var $searchQuery = $('#search-query').val();
$searchQuery = $searchQuery.replace(/\s/g, "+");




var fetch = function (query) {
  $.ajax({
    method: "GET",
    url: "https://www.googleapis.com/books/v1/volumes?q=" + "$searchQuery",
    dataType: "json",
    success: function(data) {
      addBooks(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};

var renderBooks = function (books) {
  $('.books').empty();
  var source = $('#book-template').html();
  var template = Handlebars.compile(source);
  // var newHTML = template({title: books.title, author: books.author, pageCount: books.pageCount, isbn: books.isbn, imageURL: books.imageURL})

  for (var i = 0; i < books.length; i++) {
    // create HTML and append to .books
    var book = template({title: books[i].title, author: books[i].author, pageCount: books[i].pageCount, isbn: books[i].isbn, imageURL: books[i].imageURL})
    $('.books').append(book);

  }
};


// $('#theButton').on('click', function (e) {
//   e.preventDefault();
//   renderBooks(books);


$('.search').on('click', function () {
  var search = $('#search-query').val();
  fetch(search);
  renderBooks(books);
});

var addBooks = function (data) {
  books.push(data)
  }

// });
