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
            this.emit('taskListUpdated', task);
            console.log('todo.addTask: ' + task + ' added');
        }else{
            return new Error ('Provide instance of class Task');
        }
    }

    removeTask(index){
        if (index > 0 && index<this.#list.length){
            this.#list.splice(index,1);
            this.emit('taskListUpdated',index);
        }else{
            return new Error(`Index ${index.toString()} not exist`);
        } 
    }

    flushTasks(){
        this.#list = [];
        this.emit('taskListUpdated');
    }

    getList(){
        return this.#list;
    }  
}

class TaskModel extends EventEmitter{
    #fields = {};
    #status = false;
    #id = 0;

    constructor(fields, id=0){
        super();
        if (typeof fields == 'object' && Object.keys(fields).includes('text') && Object.keys(fields).includes('date')){
            this.#fields = fields;
            this.#id = id;
        }else{
            return new Error ('You must provide object with "text" and "date" fields');
        }
    }

    edit(data){
        this.#fields = {...this.#fields, ...data};
        this.emit('taskEdited',this.#fields);
    }

    changeStatus(){
        this.#status = !this.#status;
        this.emit('taskStatusChanged',this);
        console.log(`TaskModel.changeStatus: ${this} status changed`);
    }

    isComplete(){
        return this.#status;
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

    getId(){
        return this.#id;
    }
}

class TodoView extends EventEmitter{
    #todoModel = {};
    constructor(todoModel){
        super();
        
        this.#todoModel = todoModel;
        todoModel.on('taskListUpdated', () => this.render());
    }

    render(){
        let tasks = this.#todoModel.getList();
        let appElement = document.createElement('div');
        appElement.className = 'todo';

        let titleElement = document.createElement('h2');
        titleElement.innerText = 'Todo list';

        let inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.addEventListener('change',e => {
            let newTask = new TaskModel({text:e.target.value, date: Date.now()}, tasks.length);
            this.#todoModel.addTask(newTask);
            this.render();
        });

        let clearButton = document.createElement('button');
        clearButton.innerText = 'Clear';
        clearButton.addEventListener('click',e => {
            this.#todoModel.flushTasks();
            this.render();
        });


        let listElement = document.createElement('ul');
        listElement.className = 'todo__tasks tasks';

        tasks.forEach(taskModel => {
            let taskView = new TaskView(taskModel);
            taskView.on('taskStatusChanged', () => this.render())
            taskView.render(listElement);
        })

        appElement.appendChild(titleElement);
        appElement.appendChild(inputElement);
        appElement.appendChild(clearButton);
        appElement.appendChild(listElement);

        document.querySelector('body').replaceChild(appElement,document.querySelector('.todo'));
    }
}

class TaskView extends EventEmitter{
    #status = false;
    #text = '';
    #taskModel = {};
    #id = 0;
    constructor(taskModel){
        super();

        this.#status = taskModel.isComplete();
        this.#text = taskModel.getText();
        this.#id = taskModel.getId();
        this.#taskModel = taskModel;
    }

    render(parent){
        let listItemElement = document.createElement('li');
        listItemElement.id = `task_${this.#id}`;
        listItemElement.className = `tasks__task tasks__task_${this.#status?'inactive':'active'}`;

        let listItemCheckbox = document.createElement('input');
        listItemCheckbox.type = 'checkbox';
        listItemCheckbox.checked = this.#status;
        listItemCheckbox.addEventListener('change', () => {
            this.#taskModel.changeStatus();
            this.emit('taskStatusChanged');
            this.render(parent);
        });

        let listItemText = document.createElement('p');
        listItemText.innerText = this.#text;

        listItemElement.appendChild(listItemCheckbox);
        listItemElement.appendChild(listItemText);

        parent.appendChild(listItemElement);
    }
}

class TodoController extends EventEmitter{
    #model;
    constructor(model,view){
        super();
        this.#model = model;
        view.on('inputChanged',(arg) => model.addTask(new TaskModel({text:arg, date:Date.now()})));
    }


}

class TaskController extends EventEmitter{
    constructor(model,view){
        super();

        view.on('flagChanged',() => model.changeStatus()); 
    }
}


let todoModel = new TodoModel([]);

let todoView = new TodoView(todoModel);
let todoController = new TodoController(todoModel, todoView);
todoView.render();