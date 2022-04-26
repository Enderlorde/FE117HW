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
    status = false;

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

    changeStatus(){
        this.status = !this.status;
        this.emit('taskStatusChanged',this);
    }

    isComplete(){
        return this.status;
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
    #model;
    #view;
    constructor(model){
        super();
        this.#model = model;

        this.#view = document.createElement('div');
        this.#view.className = "todo";
        this.#view.innerHTML = `
            <h2>ToDo List</h2>
            <ul class='todo__tasks'>
            </ul>
        `;

        let input = document.createElement('input');
        input.setAttribute('type','text');
        input.addEventListener('change',evnt => this.emit('inputChanged', evnt.target.value));
        this.#view.querySelector('h2').appendChild(input);

      
        model.on('taskAdded',() => this.updateList());

    }

    updateList(){
        let listElement = document.createElement('ul');
        listElement.className = 'todo__tasks';
        this.#model.getList().forEach(task => {
            task.on('taskStatusChanged', () => this.updateList());
            let taskView = new TaskView(task);
            let taskController = new TaskController(task, taskView);
            return listElement.appendChild(taskView.get());
        });
        this.#view.replaceChild(listElement, this.#view.querySelector('.todo__tasks'));
        this.display()
    }

    display(){        
        document.querySelector('body').appendChild(this.#view);
    }

                

    hide(){

    }
}

class TaskView extends EventEmitter{
    #model;
    #template;
    constructor(model){
        super();

        this.#model = model;

        this.#template = document.createElement('li');
        this.#template.className = `tasks__task tasks__task_${model.isComplete()?'deactive':'active'}`;

        let checkbox = document.createElement('input');
        checkbox.setAttribute('type','checkbox');
        checkbox.addEventListener('change', () => this.emit('flagChanged',this));
        checkbox.checked = this.#model.isComplete();
        this.#template.appendChild(checkbox);
        
        let text = document.createElement('p');
        text.innerText = this.#model.getText();
        this.#template.appendChild(text);
    }

    render(){

    }

    get(){
        return this.#template;
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
todoView.display();