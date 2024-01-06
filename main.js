let input = document.querySelector(".container .input input");
let addBtn = document.querySelector(".container .input button");

let contNote = document.querySelector(".container .your-list");




// Global Array
let arrayOfTaskes = new Array();


if(window.localStorage.getItem("note") == ""){
    window.localStorage.clear()
}

// window.localStorage.clear()

document.addEventListener('click', function(event){

    if(event.target.classList.contains("del-button")){
        
        let delNoteName = event.target.dataset.note; 

        let myNote = window.localStorage.getItem("note").split(',');
        
        
        if (myNote.indexOf(delNoteName) != -1){
            
            myNewNote = myNote.splice(myNote.indexOf(delNoteName),1);
        }

        window.localStorage.setItem("note", myNote);
        window.location.reload()
    }
})

// On Load Get Data From LocalStorage
window.onload = function(){
     
    // Clear Array
    arrayOfTaskes = [];
    
    // Get Data From LocalStorage
    if(window.localStorage.length <= 0){
        document.querySelector(".container h3").innerHTML = "you not have note";
    }
    else{
        document.querySelector(".container h3").innerHTML = "your note";
        let data = window.localStorage.getItem("note").split(",");
        data.forEach((ele) => {
            arrayOfTaskes.push(ele);
            createNote(ele)
        });
    }
}

// On Click To Add Button
addBtn.onclick = function(){
    if (input.value !== ""){
        createNote(input.value)
        
        // Function Add Value In Local Storage
        addToLocalStorage(input.value);

        input.value = ""
    }
} 

// Create Element To Page
function createNote(inputValue){

    let myDiv = document.createElement("div");
    myDiv.setAttribute("data-note", inputValue)
    myDiv.classList.add("note");
    
    let mySpan = document.createElement("span");
    mySpan.appendChild(document.createTextNode(inputValue));
    
    let myButton = document.createElement("button");
    myButton.classList.add("del-button");
    myButton.setAttribute("data-note", inputValue)
    myButton.appendChild(document.createTextNode('delete'));

    myDiv.appendChild(mySpan);
    myDiv.appendChild(myButton);

    contNote.appendChild(myDiv);
}

// Function Add Value In Local Storage
function addToLocalStorage(inputValue){

    arrayOfTaskes.push(inputValue);

    window.localStorage.setItem("note", arrayOfTaskes)
}