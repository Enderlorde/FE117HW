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
        this.emit('taskChanged',this.#fields);
        console.log(`TaskModel.edit: ${this} text changed`);
    }

    changeStatus(){
        this.#status = !this.#status;
        this.emit('taskChanged',this);
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
        let today = new Date(Date.now());
        let tasks = this.#todoModel.getList();
        let appElement = document.createElement('div');
        appElement.className = 'todo';

        let headerElement = document.createElement('div');
        headerElement.className = 'todo__header header';
        headerElement.innerHTML = `
            <div class='header__date date'>
                <div class='date__item date__item_day'>
                    ${today.getDay()}
                </div>
                <div class='date__item date__item_vertical'>
                    <div>
                        ${new Intl.DateTimeFormat('en-US', { month: 'short'}).format(today)}
                    </div>
                    <div>
                        ${today.getFullYear()}
                    </div>
                </div>
            </div>

            <div class='header__day'>
                ${new Intl.DateTimeFormat('en-US', { weekday: 'long'}).format(today)}
            </div>
        `

        let inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.className = 'todo__input';
        inputElement.placeholder = 'Type new task here';
        inputElement.addEventListener('change',e => {
            let newTask = new TaskModel({text:e.target.value, date: Date.now()}, tasks.length);
            this.#todoModel.addTask(newTask);
            this.render();
        });

        let clearButton = document.createElement('button');
        clearButton.className = 'todo__btn btn'
        clearButton.innerHTML = `
            <img src='img/trash.svg' alt='delete all'>
        `;
        clearButton.addEventListener('click',e => {
            this.#todoModel.flushTasks();
            this.render();
        });


        let listElement = document.createElement('ul');
        listElement.className = 'todo__tasks tasks';

        tasks.forEach(taskModel => {
            let taskView = new TaskView(taskModel);
            taskView.on('taskChanged', () => this.render())
            taskView.render(listElement);
        })

        appElement.appendChild(headerElement);
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

    taskEditorShow(text){
        let editedText = prompt(`Edit task "${text}"`);
        this.#taskModel.edit({text: editedText, date: Date.now()});
        this.emit('taskChanged');
    }

    render(parent){
        let listItemElement = document.createElement('li');
        listItemElement.className = `tasks__task task task_${this.#status?'inactive':'active'}`;

        let listItemCheckbox = document.createElement('input');
        listItemCheckbox.type = 'checkbox';
        listItemCheckbox.checked = this.#status;
        listItemCheckbox.addEventListener('change', () => {
            this.#taskModel.changeStatus();
            this.emit('taskChanged');
            this.render(parent);
        });

        let listItemText = document.createElement('p');
        listItemText.innerText = this.#text;

        let editButton = document.createElement('button');
        editButton.className = 'task__btn btn btn_size_small btn_bg_clear'
        editButton.innerHTML = `
            <img src='img/pencil.svg'>
        `;

        editButton.addEventListener('click', () => this.taskEditorShow(this.#taskModel.getText()));

        listItemElement.appendChild(listItemCheckbox);
        listItemElement.appendChild(listItemText);
        listItemElement.appendChild(editButton);

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


let task1 = new TaskModel({text: 'Buy iphone', date: Date.now()});
let task2 = new TaskModel({text: 'Buy ipad', date: Date.now()});
let task3 = new TaskModel({text: 'Buy apple pipin', date: Date.now()});

task2.changeStatus();

let todoModel = new TodoModel([task1,task2,task3]);

let todoView = new TodoView(todoModel);
let todoController = new TodoController(todoModel, todoView);
todoView.render();