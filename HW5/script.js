document.write('<h3>Сделайте функцию, которая отнимает от первого числа второе и делит на третье. Числа передаются параметром.</h3>');

function minusAndDevide(num1, num2, num3){
    return num1-num2/num3;
}

document.write(minusAndDevide(2,3,2));

document.write('<h3>Сделайте функцию, которая возвращает куб числа и его квадрат. Число передается параметром.</h3>');

function qubeAndSquare(num){
    return {"qube":num**3,"square":num**2};
}

document.write("Куб=" + qubeAndSquare(2).qube + " Квадрат=" + qubeAndSquare(2).square);

document.write('<h3>Напишите функции min и max, которые возвращают меньшее и большее из чисел a и b.</h3>');

function min(num1, num2){
    return num1>num2?num2:num1;
}

function max(num1, num2){
    return num1<num2?num2:num1;
}

document.write(min(2,3) + " " + max(2,3));

document.write('<h3>Напишите две функции: первая ф-ция должна возвращать массив с числовыми значениями, диапазон которых должен вводиться пользователем с клавиатуры; вторая – выводить полученный массив.</h3>');

function createArray(from, to){
    let array = [];
    for(from; from<=to;from++)
        array.push(from);
    return array;
}

function displayArray(arr){
    for(let i=0; i < arr.length; i++)
        document.writeln(arr[i]);
}

displayArray(createArray(prompt('Начало массива'),prompt('Конец массива')));

document.write('<h3>Сделайте функцию isEven() (even - это четный), которая параметром принимает целое число и проверяет: четное оно или нет. Если четное - пусть функция возвращает true, если нечетное — false.</h3>');

function isEven(num){
    return num % 2 === 0;
}

document.writeln(isEven(5));
document.writeln(isEven(8));

document.write('<h3>Напишите ф-цию, в которую передается массив с целыми числами. Верните новый массив, где останутся лежать только четные из этих чисел. Для этого используйте вспомогательную функцию isEven из предыдущей задачи.</h3>');

function evenArray(arr){
    return arr.filter(n => isEven(n))
}
document.writeln('<br/>');
document.writeln(evenArray([8,8,0,0,2,5,5,3,5,3,5]));

document.write('<h3>Напишите ф-цию, которая рисует следующую пирамидку (исп. вложенные циклы):</h3>');

function pyramid(rows){
    for (let i = 1; i <= rows; i++){
        let line = '';
        for (let j = 0; j < i; j++)
            line+=i;
        document.write(line + "<br/>");
    }
}

pyramid(5);

function triangle(height){
    let string = '<div style="text-align:center;">';
    for (let i = 0; i < height; i++){
        let line = '';
        for(let j = 0; j <= 2*height-1; j++){
            if (j >= height - i && j < ((height - i) + (2*i+1)) )
                line += '*';
            else
                line += '&nbsp;';
        }
        string += line + "<br/>";
    }
    string += '</div>';
    return string;
}


function triangleReverse(height){
    let string = '<div style="text-align:center;">';
    for (let i = height-1; i >= 0; i--){
        let line = '';
        for(let j = 0; j <= 2*height-1; j++){
            if (j >= height - i && j < ((height - i) + (2*i+1)) )
                line += '*';
            else
                line += '&nbsp;';
        }
        string += line + "<br/>";
    }
    string += '</div>';
    return string;
}

document.write(triangle(5));
document.write(triangleReverse(8));

document.write('<h3>Напишите ф-цию, которая возвращает массив заполненный числами Фибоначи от 0 до 1000.</h3>');

function fib(num){
    if (num === 1) 
        return 0;
    else if (num === 2)
        return 1;

    let sum = 0;
    let a = 0;
    let b = 1;

    for (let i = 3; i <= num; i++){
        sum = a + b;
        a = b;
        b = sum;
    }
    return sum;
}

function fibArray(){
    let num = 0;
    let arr = [];
    do{
        arr.push(fib(num));
        num++;
    }while(fib(num)<1000)
    return arr;
}

document.write(displayArray(fibArray()));

document.write('<h3>Дано число. Сложите его цифры. Если сумма получилась более 9-ти, опять сложите его цифры. И так, пока сумма не станет однозначным числом (9 и менее). Исп. Рекурсию.</h3>');

let num = 88002553535;

function summAllNumbers(num){
    let temp = String(num).split('').reduce((prev, cur) => Number(prev) + Number(cur),0);

    return String(temp).length > 1?summAllNumbers(temp):temp;
}

document.write(summAllNumbers(num));

document.write('<h3>Дан массив с числами (передается параметром). Выведите последовательно его элементы, используя рекурсию и не используя цикл.</h3>');

function displayArrayRecursion(array){
    document.writeln(array[n])
    n++

    if (n < array.length) displayArrayRecursion(array)
}

let n = 0;

displayArrayRecursion([8,8,0,0,2,5,5,3,5,3,5]);

document.write('<h3>Напишите ф-цию, запрашивающую имя, фамилия, отчество и номер группы студента и выводящую введённые данные.</h3>');

function badge(name, surname, patronymic, group){
    let max_str = max(max(name.length + surname.length + patronymic.length + 6, 31), group.length + 25);
    let line = '';
    console.log(max_str);
    let spacing2 = spacing3 = spacing4 = "";
    for(let i = 0; i < max_str; i++){
        line += "*";
        if (i > 30)
            spacing2+= " ";
        if (i >= (25 + group.length))
            spacing3+= " ";
        if (i >= (6 + name.length + surname.length + patronymic.length))
            spacing4+= " ";
    }
    console.log(line);
    console.log('* Домашняя работа: «Функции» ' + spacing2 + ' *');
    console.log('* Выполнил: студент гр.' + group + spacing3 +' *');
    console.log('* ' + surname  + ' ' + name + ' ' + patronymic +  spacing4 + ' *');
    console.log(line);
} 

badge('Илья', 'Хоронеко', 'Александрович', 'FE117');

document.write('<h3>Напишите ф-цию, которая должна проверить правильность ввода адреса эл. почты, неиспользуя регулярные выражения.</h3>');

function emailValidation(email){
    let chars = email.toLowerCase().split('');
    let cyrillic = ['а','б','в','г','д','е','ё','ж','з','и','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я'];
    let numbers = [0,1,2,3,4,5,6,7,8,9];
    for (let char of chars)
        if (cyrillic.includes(char))
            return false;
    if (numbers.includes(chars[0]) || chars.indexOf('@') < 2 || chars.length - chars.lastIndexOf('.') - 1 < 2 || chars.length - chars.lastIndexOf('.') - 1 > 11)
        return false;
    return true;
}

console.log(emailValidation('wor3post@yandex.ru'));
console.log(emailValidation('wsadsadasd asdasdasds'));
console.log(emailValidation('workпost@yandex.ru'));
console.log(emailValidation('3orkпost@yandex.ru'));