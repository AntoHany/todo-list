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

document.addEventListener('click', function(event){

    // if click 
    if(event.target.classList.contains("active-btn")){

        // put class active
        event.target.classList.toggle("active")
        
        // put done line into (through) span
        let preEle = event.target.previousElementSibling
        if(event.target.classList.contains("active")){
            preEle.style.textDecoration = "line-through"
        }else {
            preEle.style.textDecoration = "none"
        }
    }
})

// On Load Get Data From LocalStorage
window.onload = function(){
     
    // Clear Array
    arrayOfTaskes = [];
    
    // Get Data From LocalStorage
    if(window.localStorage.length <= 0){
        document.querySelector(".container h3").innerHTML = "you not have note";
        contNote.style.display = "none";
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
    
    // create text node
    let mySpan = document.createElement("span");
    mySpan.appendChild(document.createTextNode(inputValue));
    
    // create delete btn
    let myButton = document.createElement("button");
    myButton.classList.add("del-button");
    myButton.setAttribute("data-note", inputValue)
    myButton.appendChild(document.createTextNode('delete'));
    
    // create done btn
    let myDoneBtn = document.createElement("button");
    myDoneBtn.classList.add("active-btn");
    myDoneBtn.setAttribute("data-done", inputValue)
    myDoneBtn.appendChild(document.createTextNode('done'));

    myDiv.appendChild(mySpan);
    myDiv.appendChild(myDoneBtn);
    myDiv.appendChild(myButton);

    contNote.appendChild(myDiv);
}

// Function Add Value In Local Storage
function addToLocalStorage(inputValue){
    arrayOfTaskes.push(inputValue);

    window.localStorage.setItem("note", arrayOfTaskes)
}