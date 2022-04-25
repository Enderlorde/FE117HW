class Todo{
    #list = [];

    constructor(list){
        if (list[0] instanceof Task){
        this.#list = list;
        }
    }

    addTask(task){
        if(task instanceof Task){
            this.#list.push(task);
        }else{
            return new Error ('Provide instance of class Task');
        }
    }

    removeTask(index){
        if (index > 0 && index<this.#list.length){
            this.#list.splice(index,1);
        }else{
            return new Error(`Index ${index.toString()} not exist`);
        } 
    }

    getList(){
        return this.#list;
    }  
}

class Task{
    #fields = {};
    state = false;

    constructor(fields){
        if (typeof fields == 'object' && Object.keys(fields).includes('text') && Object.keys(fields).includes('date')){
            this.#fields = fields;
        }else{
            return new Error ('You must provide object with "text" and "date" fields');
        }
    }

    edit(data){
        this.#fields = {...this.#fields, ...data};
    }

    setComplete(){
        this.state = true;
        console.log('BOOP');
        return 'status set to completed';
    }

    isComplete(){
        return this.state;
    }

    getDate(){
        return this.#fields.date;
    }

    getText(){
        return this.#fields.text;
    }

    getFields(){
        return this.#fields;
    }
}

class View{

}

class TodoView{
    #todo
    constructor(todo){
        this.#todo = todo;
    }

    display(){
        let widget = document.createElement('div');
        widget.className = "todo";
        widget.innerHTML = `
            <h2>ToDo List</h2>
            <input type="text">
            <ul class="todo__tasks tasks">
            </ul>
        `;

        this.#todo.getList().forEach(task => {
            let taskElement = document.createElement('li');
            if (task.isComplete){
                taskElement.className = 'tasks__task';
            }else{
                taskElement.className = 'tasks__task tasks__task_deactivated';
            };
            let taskCheckbox = document.createElement('input');
            taskCheckbox.setAttribute('type', 'checkbox');
            taskCheckbox.checked = task.isComplete();
            taskElement.innerHTML = `
                <p>${task.getText()}</p>
            `;
            taskElement.appendChild(taskCheckbox);
            widget.querySelector('.todo__tasks').appendChild(taskElement);
        });
        document.querySelector('body').appendChild(widget);
    }

    hide(){

    }
}

class TaskEditorView{
    #task
    constructor(task){
        this.#task = task;
    }

    display(){
        
    }

    hide(){
        
    }
}

let todo = new Todo([
    new Task(
        {
            text: 'test',
            date: Date.now()
        }
    ),
    new Task(
        {
            text: 'test2',
            date: Date.now()
        }
    )
]);

let todoView = new TodoView(todo);
todoView.display();

console.log(todo.getList());