class EventEmitter{
    #events = {};
    constructor(){
        this.#events 
    }

    on(event, listener){
        (this.#events[event] || (this.#events[event] = [])).push(listener);
        return this;
    }

    emit(event, args){
        (this.#events[event] || []).slice().forEach(listener => listener(args));
    }
}

class TodoModel extends EventEmitter{
    #list = [];

    constructor(list){
        super();
        if (list[0] instanceof TaskModel){
            this.#list = list;
        }
    }

    addTask(task){
        if(task instanceof TaskModel){
            this.#list.push(task);
            this.emit('taskAdded', task);
        }else{
            return new Error ('Provide instance of class Task');
        }
    }

    removeTask(index){
        if (index > 0 && index<this.#list.length){
            this.#list.splice(index,1);
            this.emit('taskRemoved',index);
        }else{
            return new Error(`Index ${index.toString()} not exist`);
        } 
    }

    getList(){
        return this.#list;
    }  
}

class TaskModel extends EventEmitter{
    #fields = {};
    state = false;

    constructor(fields){
        super();
        if (typeof fields == 'object' && Object.keys(fields).includes('text') && Object.keys(fields).includes('date')){
            this.#fields = fields;
        }else{
            return new Error ('You must provide object with "text" and "date" fields');
        }
    }

    edit(data){
        this.#fields = {...this.#fields, ...data};
        this.emit('taskEdited',this.#fields);
    }

    setComplete(){
        this.state = true;
        this.emit('taskCompleted',this);
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

class TodoView extends EventEmitter{
    #todoModel;
    constructor(model){
        super();
        this.#todoModel = model;

        model.on('taskAdded',() => this.display());
    }

    display(){
        let widget = document.createElement('div');
        widget.className = "todo";
        widget.innerHTML = `
            <h2>ToDo List</h2>
            <ul class="todo__tasks tasks">
            </ul>
        `;

        let input = document.createElement('input');
        input.setAttribute('type','text');
        input.addEventListener('change',evnt => this.emit('inputChanged', evnt.target.value));
        widget.querySelector('h2').appendChild(input);

        this.#todoModel.getList().forEach(task => {
            let taskElement = document.createElement('li');
            if (task.isComplete){
                taskElement.className = 'tasks__task';
            }else{
                taskElement.className = 'tasks__task tasks__task_deactivated';
            };
            let taskCheckbox = document.createElement('input');
            taskCheckbox.addEventListener('change', evnt => this.emit('flagSwitched',task));
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

class TaskView extends EventEmitter{
    #model;
    constructor(model){
        this.#model = model;
    }
}

class TaskEditorView extends EventEmitter{
    #task
    constructor(task){
        super();
        this.#task = task;
    }

    display(){
        
    }

    hide(){
        
    }
}

class TodoController extends EventEmitter{
    #model;
    constructor(model,view){
        super();
        this.#model = model;

        view.on('flagSwitched',(arg) => console.log(arg));
        view.on('inputChanged',(arg) => model.addTask(new TaskModel({text:arg, date:Date.now()})));
    }
}

let todoModel = new TodoModel([
    new TaskModel(
        {
            text: 'test',
            date: Date.now()
        }
    ),
    new TaskModel(
        {
            text: 'test2',
            date: Date.now()
        }
    )
]);

let todoView = new TodoView(todoModel);
let todoController = new TodoController(todoModel, todoView);
todoView.display();