const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';


let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){ // list에 있는 모든 item을 위한 함수를 사용한다 
        return toDo.id !== parseInt(li.id) ;
    });
    toDos = cleanToDos
    saveToDos();

}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}


function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "X";
    delBtn.addEventListener("click",deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li); 
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parasedToDos = JSON.parse(loadedToDos);
        parasedToDos.forEach(function(toDo) { // toDo 안에 있는 내가 해야 될 항목들이 각각 text 형식으로 출력을 할 수 있게 forEach 해준다 
            paintToDo(toDo.text);
        });
    } // 정리 : function loadToDos는 toDos를 불러와서 parse(변환) 자바스크립트 object로 이후 각각 forEach를 사용한 항목에 대하여 paintToDo를 실행
}  

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}
 
init();