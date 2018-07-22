document.getElementById("my-form").addEventListener("submit",saveBookmark);

function saveBookmark(e){
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;

    //input validation


    if(!validateForm(siteName,siteUrl)){
        return false;
    }
    let bookmark = {
        name:siteName,
        url:siteUrl
    }


    //clear the form

    document.getElementById('my-form').reset();
//local storage
    // localStorage.setItem(siteName,siteUrl);
    // console.log(localStorage.getItem(siteName));
    // localStorage.removeItem(siteName);

//Init local localStorage

    if(localStorage.getItem('bookmarks') === null){
        //Init array
        let bookmarks =[];
        //Add to array
        bookmarks.push(bookmark);
        //Set to localStorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    }else{
        //Get bookmark from localStorage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Add bookmark to array
        bookmarks.push(bookmark);
        //Re-set back to localStorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    }
    fetchBookmarks();
    e.preventDefault();
}

//Fetch bookmarksResult
function fetchBookmarks(){
    //Get bookmark from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    console.log(bookmarks);

    //Get Output ID
    let bookmarksResults = document.getElementById('bookmarksResults');

    //Build Output
    bookmarksResults.innerHTML = '';

    for(let i = 0; i < bookmarks.length; i++){
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;
        bookmarksResults.innerHTML += '<div>'+
                                      '<h3 class = "header-site">'+name+
                                      '<a class="btn hvr-pop" target="_blank" href="'+url+'">Visit</a> '+
                                      '<a onclick="deleteBookmark(\''+url+'\')" class="btn-del hvr-pop" href="#">Del</a> '+
                                      '</h3>'+
                                      '</div>';
    }
}

function deleteBookmark(url){
    //Get bookmark from local localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(let i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            //remove from array
            bookmarks.splice(i,1);

        }
    }
    //rest localStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    //re-fetch bookmarks
    fetchBookmarks();
}


function validateForm(siteName,siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form!');
        return false;
        let expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        let regex = new RegExp(expression);
    }
    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please Enter A Valid URL!');
        return false;
    }

    return true;
}
