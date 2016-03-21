//Problem: User interface not functional
//Solution: add interactivty with JavaScript

//initial variables
var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//new task list item
var createNewTaskElement = function(taskString) {
    //create list items
    var listItem = document.createElement("li");
    //input (checkbox)
    var checkbox = document.createElement("input"); //checkbox
    //label
    var label = document.createElement("label");
    //input (text)
    var editInput = document.createElement("input"); //text
    //button.edit
    var editButton = document.createElement("button");
    //button.delete
    var deleteButton = document.createElement("button");
    //each element needs to be modified 
    
    checkbox.type = "checkbox";
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    
    label.innerText = taskString;
    
    //Append each
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    
    document.getElementById("new-task").value = "";
    
    return listItem;
}

//Add new task
var addTask = function(){
   var error = document.getElementById("error");
    //create new list item w/ new task
    if (taskInput.value == null || taskInput.value == ""){
        error.style.display = "block";
        document.getElementById("new-task").onfocus = function(){error.style.display = "none";};
    } else {
    var listItem = createNewTaskElement(taskInput.value);
    
    //append listItem to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);  
    }
}


//Edit existing task
var editTask = function(){
        
    var listItem = this.parentNode;
    
    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    var containsClass = listItem.classList.contains("editMode");
    //if class of parent is .editMode
    if(containsClass){
        label.innerText = editInput.value;
    } else {
        editInput.value = label.innerText;
    }
            //switch from .editMode
            //label text become the input's value
        //else
            //switch to .editMode
            //input value becomes label's text
        //toggle .editMode on listItem
    listItem.classList.toggle("editMode");
}


//Delete Task
var deleteTask = function(){
        
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
        //remove parent list item from ul
    ul.removeChild(listItem);
}

var taskCompleted = function (){
    //Mark task complete
        //append task to #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


//Mark task incomplete
var taskIncomplete = function () {
    //when checkbox unchecked
        //append task to #incomplete
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkboxEventHandler){
    //select its children
    var checkbox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");
        
        //bind editTask to edit button
    editButton.onclick = editTask;
        //bind deleteTask to delete button
    deleteButton.onclick = deleteTask;
        //bind checkboxEventHandler to checkbox
    checkbox.onchange = checkboxEventHandler;
}

//Set click handler to addTask function
addButton.onclick = ("click", addTask);
//cycle over incompleteTasksHolder ul list items
for(var i = 0; i < incompleteTasksHolder.children.length; i++){
    //bind events to list item's children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
        
    

//cycle over completedTasksHolder ul list items
for(var i = 0; i < completedTasksHolder.children.length; i++){
    //bind events to list item's children (taskCompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}












