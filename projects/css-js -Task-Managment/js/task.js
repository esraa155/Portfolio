let inputTitle = document.getElementById('input-title');
let Submit = document.getElementById('task-input-btn');
let TaskList = document.getElementById('task-list');
let Task = document.getElementById('task');
let ListTasks=[];

console.log(inputTitle,Submit);

if(localStorage.getItem('Tasks') != null)
    ListTasks = JSON.parse(localStorage.getItem('Tasks'));

Submit.onclick = function(){
    let taskTitle = inputTitle.value;
    TaskDetail = {
        bgColor : 'none',
        title :taskTitle,
    }
    if(taskTitle !=""){
        ListTasks.push(TaskDetail);
        localStorage.setItem('Tasks',JSON.stringify(ListTasks));
        alert("Task Added");
    }
    ShowDataTable();
}
ShowDataTable();
function ShowDataTable(){
    let Table=[];
    for(let i=0;i<ListTasks.length;i++){
        if(ListTasks[i].bgColor === 'green'){
            Table+=`
            <div class="task mb-2 bg-success">
                <h5 id="task-title">[${i+1}] ${ListTasks[i].title}</h5>
                <div class="task-btn">
                    <button id="delete-btn" onclick="Delete(${i})" class="btn btn-danger"></button>
                    <button id="accept-btn" onclick="Accept(${i})"class="btn" hidden></button>
                </div>
            </div>`
        }
        else{
            Table+=`
                <div class="task mb-2">
                    <h5 id="task-title">[${i+1}] ${ListTasks[i].title}</h5>
                    <div class="task-btn">
                        <button id="delete-btn" onclick="Delete(${i})" class="btn btn-danger"></button>
                        <button id="accept-btn" onclick="Accept(${i})"class="btn btn-success"></button>
                    </div>
                </div>`
        }
    }
    document.getElementById('task').innerHTML = Table;
}
// Delete Button Function
function Delete(i){
    ListTasks.splice(i,1);
    localStorage.Tasks = JSON.stringify(ListTasks);
    ShowDataTable();
}
// Accept Button Function
function Accept(i){
    ListTasks[i].bgColor = 'green';
    localStorage.Tasks = JSON.stringify(ListTasks);
    ShowDataTable()
}