
var music = ["--Select a Region--", "American", "Asian", "European"];

music['American'] = ["--Select Your Artist--", "Taylor_Swift", "Rihanna", "Katy_Perry", "Madonna"];
music['American']['Taylor_Swift'] = ["--Select a Song--", "You belong with me", "Blank Space", "I knew you were trouble", "Stay"];
music['American']['Rihanna'] = ["--Select a Song--", "Love on the Brain", "Where have you been", "Don't Stop the Music", "Fool in Love"];
music['American']['Katy_Perry'] = ["--Select a Song--", "Last Friday Night", "Thinking of You", "Peacock", "Use Your Love"];
music['American']['Madonna'] = ["--Select a Song--", "Like a Prayer", "Vogue", "Papa dont Preach"];

music['European'] = ["--Select Your Artist--", "Adele", "Zayn_Malik", "Leona_Lewis"];
music['European']['Adele'] = ["--Select a Song--", "Water Under the Bridge", "Million Years Ago", "I Miss You", "Crazy For You", "Hello", "Turning Tables", "Right as rain", "First Love"];
music['European']['Zayn_Malik'] = ["--Select a Song--", "Pillow Talk", "Like I Would", "wRoNg", "TiO", "I Don't Wanna Live Forever"];
music['European']['Leona_Lewis'] = ["--Select a Song--", "Bleeding Love", "Yesterday", "Take a Bow", "I Am", "Better in Time", "I'm you"];

music['Asian'] = ["--Select Your Artist--", "Shreya_Ghoshal", "Psy"];
music['Asian']['Shreya_Ghoshal'] = ["--Select a song--", "Radha", "Khabar Nahi", "Agar Tum Mil Jao"];
music['Asian']['Psy'] = ["--Select a song--", "Gentleman", "Gangnam Style", "Life is suffering"];


var today = new Date();
//expires in a year....
var expiry = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

//this slide is used in the upgrade page asking the user to update the browser
function slide() {
    console.log('Tying to slide something');
    var slider = document.getElementById('slider');
    console.log('got to slider');
    if (parseInt(slider.style.left) < 1000) {
        slider.style.left = parseInt(slider.style.left) + 1 + 'px';
        setTimeout(function () { slide(); }, 10);
    }
}

function getCookie(userName) {
    var name = userName + "=";
    var length = name.length;
    var cookieLength = document.cookie.length;
    var i = 0;
    while (i < cookieLength) {
        var j = i + length;
        if (document.cookie.substring(i, j) == name) {
            return getCookieVal(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}

function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) { endstr = document.cookie.length; }
    return unescape(document.cookie.substring(offset, endstr));
}


function setCookie(name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
}



//storing user information in cookies
function existingUser() {
    console.log('existing user function');
    
    if (!navigator.cookieEnabled) {
        existingUserLocal();
        return;
    }

    if (getCookie('user_name') == null) {
        var head = document.getElementById('pageHeader');
        var headText = document.createTextNode("Welcome to My Music");
        head.appendChild(headText);
    } else {
        var getUserName = getCookie('user_name');
        var getPrevMusic = getCookie('prev_music');
        var head = document.getElementById('pageHeader');
        var headText = document.createTextNode("Welcome back " + getUserName + "! We are happy to see you again.");
        var addHead = document.getElementById('addText');
        var addText = document.createTextNode("Your selected song '" + getPrevMusic + "' is a great pick. Do you want to check out more songs?");
        head.appendChild(headText);
        addHead.appendChild(addText);
    }
}
//Details from the local storage
function existingUserLocal() {
    console.log('local storage started');
    if (window.localStorage) {
        if (localStorage.getItem('user_name')) {
            var getUserName = localStorage.getItem('user_name');
            var getPrevMusic = localStorage.getItem('prev_music');

            var head = document.getElementById('pageHeader');
            var headText = document.createTextNode("Hey " + getUserName + "! It'headText good to have you back at The Car Portal");
            head.appendChild(headText);

            var addHead = document.getElementById('addText');
            var add = document.createTextNode("Your last choice was " + getPrevMusic + ".");
            addHead.appendChild(addText);

        } else {
            var head = document.getElementById('pageHeader');
            var headText = document.createTextNode("Welcome to The Car Portal!");
            head.appendChild(s);
        }
    }
}
//to set the values in the cookie
function newUser() {
    console.log('just got into new user function');
    if (!navigator.cookieEnabled) {
        newUserDetails();
        return;
    }
    var getUserName = document.getElementById('nameInput').value;
    var getPrevMusic = document.getElementById('hiddenItem').value;
    var getEmail = document.getElementById('emailInput').value;
    if (getCookie('user_name') == null || getCookie('email_id') != getEmail) {
        setCookie('user_name', getUserName);
        setCookie('prev_music', getPrevMusic);
        setCookie('email_id', getEmail);
    } else {
        setCookie('prev_music', getPrevMusic);
    }

    window.location.href = "lastPage.html";
    console.log('works till here');
    return false;
}
//setting the user datails in local storage
function newUserDetails() {
    console.log("local storage setting");
    if (window.localStorage) {
        var getUserName = document.getElementById('nameInput').value;
        var getPrevMusic = document.getElementById('hiddenItem').value;
        var getEmail = document.getElementById('emailInput').value;
        if (localStorage.getItem('user_name') == null || localStorage.getItem('email_id') != getEmail) {
            localStorage.setItem('user_name', getUserName);
            localStorage.setItem('prev_music', getPrevMusic);
            localStorage.setItem('email_id', getEmail);
        } else {
            localStorage.setItem('last_choice', getPrevMusic);
        }

        window.location.href = "lastPage.html";
        return false;
    }
}

function begin() {
    var audio = new Audio('style.m4a');
    audio.play();
    
    console.log('application loaded');
    existingUser();
    redirect();
    console.log('yesssssss');

    var dropDownDiv = document.getElementById('dropDown');
    var dropOne = document.createElement('select');
    dropOne.setAttribute('id', '0');
    dropOne.setAttribute('onclick', 'createSelect(this)');
    dropOne.setAttribute('value', 'music');
    dropDownDiv.appendChild(dropOne);
    var length = music.length;
    for (var i = 0; i < length; i++) {
        var opt = document.createElement('option');
        opt.text = music[i];
        opt.value = i;
        dropOne.options.add(opt);
    }
}

function createSelect(here) {
    console.log('got into self create function');
    var selectID = here.id;
    var selectCount = document.getElementsByTagName('select').length;
    console.log(selectCount);
    var selected = document.getElementById(selectID);
    var selectedText = selected.options[selected.selectedIndex].text;
    console.log(selectedText);
    var intID = parseInt(selected.getAttribute('id'));
    var exact = document.getElementsByTagName('select');

    //To remove the select that is not needed at the stage
    
    while (exact.length > intID + 1) {
        exact[intID + 1].parentNode.removeChild(exact[intID + 1]);
    }
    var deleteSelect = document.getElementById('forForm');
    if (deleteSelect != null)
        deleteSelect.parentElement.removeChild(deleteSelect);
    console.log('remove successful');
    //to delete the underlying drop doens when the user selects the first drop down
    if (parseInt(selected.options[selected.selectedIndex].value) == 0) {
        console.log('at 0 now');
        return;
    }

    var musicOption = music;
    for (var i = 0; i <= intID; i++) {
        var currentSelect = document.getElementsByTagName('select')[i];
        var currentText = currentSelect.options[currentSelect.selectedIndex].text;

        console.log(musicOption[currentText]);
        musicOption = musicOption[currentText];
    }

    //last selection done
    if (typeof musicOption == 'undefined') {
        var cDiv = document.getElementById('contents');
        var insertDiv = document.createElement('div');
        insertDiv.setAttribute('id', 'forForm');
        cDiv.appendChild(insertDiv);

        var newEntry = here.options[here.selectedIndex].text;
        insertForm(newEntry);
        return;
    } else {
        var removeDiv = document.getElementById('forForm');
        if (removeDiv != null)
            removeDiv.parentElement.removeChild(removeDiv);
    }

    //creating new select
    var dropDownDiv = document.getElementById('dropDown');
    var newSelect = document.createElement('select');
    newSelect.setAttribute('id', intID + 1);
    newSelect.setAttribute('onclick', 'createSelect(this)');
    dropDownDiv.appendChild(newSelect);

    console.log(musicOption);
    var musLength = musicOption.length;
    console.log('length of music array'+ musLength);
    for (var i = 0; i < musLength; i++) {
        var opt = document.createElement('option');
        opt.text = musicOption[i];
        opt.value = i;
        newSelect.options.add(opt);
    }
    var url = 'images/' + currentText + '.jpg';
    //var music = 'music/' + edSheeran + '.mp3';
    
    document.getElementById("myBody").style.backgroundImage = 'url(' + url + ')';

}

function insertForm(newEntry) {
    console.log('creating the form');
    var formHere = document.getElementById('forForm');
    var createForm = document.createElement('form');  
    createForm.setAttribute('onSubmit', 'return newUser()');
    formHere.appendChild(createForm);
    var heading = document.createElement('h3');
    //Heading of the form 
    var headText = document.createTextNode("Let us know who you are to save '" + newEntry+"' for your next visit");
    heading.appendChild(headText);
    //To ask for users name
    var name = document.createElement('label');
    var nameText = document.createTextNode("Your Name: ");
    name.appendChild(nameText);
    // To input name of the user
    var nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('id', 'nameInput');
    nameInput.setAttribute('name', 'formName');
    //To ask for email id of the user
    var email = document.createElement('label'); 
    var emailText = document.createTextNode("Your Email: ");
    email.appendChild(emailText);
    // To input email id of the user
    var emailInput = document.createElement('input'); 
    emailInput.setAttribute('type', 'text');
    emailInput.setAttribute('id', 'emailInput');
    emailInput.setAttribute('name', 'formEmail');
    //To submit the details
    var submit = document.createElement('input'); // Append Submit Button
    submit.setAttribute('type', 'submit');
    submit.setAttribute('name', 'formSubmit');
    submit.setAttribute('value', 'Submit');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('id', 'hiddenItem');
    hiddenInput.setAttribute('value', newEntry);

    createForm.appendChild(heading);
    createForm.appendChild(document.createElement('hr'));
    createForm.appendChild(document.createElement('br'));    
    createForm.appendChild(name);    
    createForm.appendChild(nameInput);
    createForm.appendChild(document.createElement('br'));    
    createForm.appendChild(email);    
    createForm.appendChild(emailInput);
    createForm.appendChild(document.createElement('br'));  
    createForm.appendChild(submit);
    createForm.appendChild(hiddenInput);
    console.log('done done done');
    if (navigator.cookieEnabled) {
        if (getCookie('user_name') != null) {
            var getUserName = getCookie('user_name');
            var getEmail = getCookie('email_id');
            document.getElementById('nameInput').value = getUserName;
            document.getElementById('emailInput').value = getEmail;
        }
    } else {
        if (window.localStorage) {
            if (localStorage.getItem('user_name') != null) {
                var getUserName = localStorage.getItem('user_name');
                var getEmail = localStorage.getItem('email_id');
                document.getElementById('nameInput').value = getUserName;
                document.getElementById('emailInput').value = getEmail;
            }
        }
    }

}

function redirect() {
    console.log('directing to upgrade page');
    if (!document.createElement || !document.getElementsByTagName || !document.getElementById) {
        window.location = "upgrade.html"
    }
}
//var x = document.getElementById("myAudio");

/*function playAudio() {
    console.log('audio check on fleek');
    x.play();
    console.log("got to play here");
}

function pauseAudio() {
    x.pause();
}
*/