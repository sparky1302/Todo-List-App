const clear = document.querySelector(".clear");
let dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";
let options = {weekday:'long', month:'short', day:'numeric'};
let today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);
function addTodo(todo, id, done, trash){
    if(trash){
        return;
    }
    const DONE = done ? CHECK:UNCHECK;
    const LINE = done ? LINE_THROUGH: "";
    const item = `<li class="item">
                <i class="fa ${DONE}" aria-hidden="true" job="complete" id="${id}"></i>
                <p class="text ${LINE}">${todo}</p>
                <i class="fa fa-trash-o" aria-hidden="true" job="delete" id="${id}"></i>
                </li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}
let LIST = [];
let id = 0;
//get item from localstorage
let data = localStorage.getItem("TODO");
//check if the data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last one in the list
    loadList(LIST); //load the list to the user interface
}else{
    //if data is not empty
    LIST  = [];
    id = 0;
}
//load item to the user interface
function loadList(array){
    array.forEach(function(item){
        addTodo(item.name, item.id, item.done, item.trash);
    });
}
//clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const todo = input.value;
        if(todo){
            addTodo(todo, id, false, false);
            LIST.push(
                {
                    name: todo,
                    id: id,
                    done: false,
                    trash: false
                }
            );
            //add item to localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));

            input.value="";

            id++;

        }
        
    }
});
//complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}
// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//target the element created dynamically
list.addEventListener("click", function(event){
    const element = event.target; //retrun the clicked element inside the list
    const elementJob = element.attributes.job.value; //complete or delete
    if(elementJob=="complete"){
        completeToDo(element);
    }else if(elementJob=="delete"){
        removeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));

});



