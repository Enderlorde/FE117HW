class Contacts {
    #data = [];
    #lastId = 0;

    add(userData){
        userData = {...userData, ...{id: this.#lastId}};
        const user = new User(userData);
        this.#data.push(user);
        this.#lastId+=1;
    }

    edit(id, obj){
        let contact;
        this.#data.forEach((user) => {
            if (user.get().id === id) contact = user;
        });

        contact.edit(obj);
    }

    remove(id){
        this.#data = this.#data.filter((user) => {
            return user.get().id != id;
        });

        console.log(this.#data);
    }

    get(id = -1){
        if (id < 0) return this.#data;
        return this.#data.filter((user) => user.get().id == id);
    }
}

class User {
/*     #data = {
        id:,
        name:,
        email:,
        address,
        phone:,
    } */
    #data = {};

    constructor (obj){
        this.#data = obj;
    }

    edit(obj){
        this.#data = {...this.#data, ...obj};
    }

    get(){
        return this.#data;
    }
}

class ContactsApp extends Contacts{
    #app;
    constructor (){
        super();

        this.update();
    }

    update(){
        if (document.querySelector('#contacts')) document.querySelector('#contacts').remove();

        this.#app = document.createElement('div');
        this.#app.classList.add('contacts');
        this.#app.id = 'contacts';

        const formElement = document.createElement('form');
        formElement.addEventListener('submit',(e) => {
            e.preventDefault();

            const userData =  {
                name: inputNameElement.value,
                email: inputEmailElement.value,
                address: inputAddressElement.value,
                phone: inputPhoneElement.value,
            }

            this.onAdd(userData);
        });
        formElement.classList.add('contacts__form', 'form');

        const inputNameElement = document.createElement('input');
        inputNameElement.classList.add('form__item');
        inputNameElement.type = 'text';
        inputNameElement.name = 'name';
        inputNameElement.placeholder = 'Name';

        const inputEmailElement = document.createElement('input');
        inputEmailElement.classList.add('form__item');
        inputEmailElement.type = 'email';
        inputEmailElement.name = 'email';
        inputEmailElement.placeholder = 'Email';

        const inputAddressElement = document.createElement('input');
        inputAddressElement.classList.add('form__item');
        inputAddressElement.type = 'text';
        inputAddressElement.name = 'address';
        inputAddressElement.placeholder = 'Address';

        const inputPhoneElement = document.createElement('input');
        inputPhoneElement.classList.add('form__item');
        inputPhoneElement.type = 'tel';
        inputPhoneElement.name = 'phone';
        inputPhoneElement.placeholder = 'Phone';

        const addButton = document.createElement('button');
        addButton.classList.add('form__item','btn');
        addButton.innerText = 'Add';

        const contacts = this.get();

        const usersList = document.createElement('ul');
        usersList.classList.add('form__users', 'users');

        contacts.forEach((contact) => {
            const contactData = contact.get();
            const userElement = document.createElement('li');
                Object.keys(contactData).forEach((key) => {
                    if (key != 'id' && contactData[key]){
                        const text = document.createElement('p');
                        text.innerText = `${key}: ${contactData[key]}`;
                        userElement.append(text);
                    };
                })
            //userElement.innerText = `name: ${contactData.name}, address: ${contactData.address}, email: ${contactData.email}, phone: ${contactData.phone}`;
            userElement.classList.add('users__item');

            const removeButton = document.createElement('button');
            removeButton.classList.add('btn');
            removeButton.addEventListener('click', (e) => {
                e.preventDefault();

                this.onRemove(contactData.id);

                this.update();
            })
            removeButton.innerText = 'Remove';
    
            const editButton = document.createElement('button');
            editButton.classList.add('btn');
            editButton.addEventListener('click', (e) => {
                e.preventDefault();


                
                this.onEdit(contactData.id);
            });
            editButton.innerText = 'Edit';

            userElement.append(removeButton,editButton);
            usersList.append(userElement);
        })


        formElement.append(inputNameElement,inputEmailElement,inputAddressElement,inputPhoneElement,addButton);
        this.#app.append(formElement,usersList);
        document.body.append(this.#app);
    }
    showError(error){
        const errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerText = error;
        errorElement.addEventListener('click', () => this.closeError(errorElement));
        this.#app.append(errorElement);
    }

    closeError(element){
        element.remove();
    }

    onAdd(userData){
        if (!userData.name || (!userData.phone && !userData.email && !userData.address)){
            this.showError('All fields is required');

            return;
        }
        
        this.add(userData);

        this.update();
    }

    onEdit(id){

        if (!this.get(id).length > 0) return;
        const user = this.get(id)[0];
        const userData = user.get();

        const editForm = document.createElement('form');
        editForm.classList.add('popup');

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.name = 'name';
        nameInput.placeholder = 'Name';
        nameInput.value = userData.name;

        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.name = 'email';
        emailInput.placeholder = 'Email';
        emailInput.value = userData.email;

        const addressInput = document.createElement('input');
        addressInput.type = 'text';
        addressInput.name = 'address';
        addressInput.placeholder = 'Address';
        addressInput.value = userData.address;

        const phoneInput = document.createElement('input');
        phoneInput.type = 'tel';
        phoneInput.name = 'phone';
        phoneInput.placeholder = 'Phone';
        phoneInput.value = userData.phone;

        const saveButton = document.createElement('button');
        saveButton.classList.add('btn');
        saveButton.addEventListener('click', (e) => {
            e.preventDefault();

            const newUserData = {
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                address: addressInput.value,
            };

            this.edit(id, newUserData);

            this.update();
        });
        saveButton.innerText = 'Save';

        editForm.append(nameInput, emailInput, addressInput, phoneInput, saveButton);
        this.#app.append(editForm);

        //
    }

    onRemove(id){
        this.remove(id);
    }
}

let test = new ContactsApp();
