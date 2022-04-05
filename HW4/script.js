document.write('<h3>Дан массив с элементами [1, 2, 3, 4, 5]. С помощью цикла for выведите все эти элементы на экран.</h3>');

let array = [1,2,3,4,5];

for(let i = 0; i<array.length;i++)
    document.writeln(array[i]);

document.write('<h3>Дан массив с числами [-2, -1, -3, 15, 0, -4, 2, -5, 9, -15, 0, 4, 5, -6, 10, 7]. Числа могут быть положительными и отрицательными. Выведите на экран только отрицательные числа, которые больше -10, но меньше -3.</h3>');

array = [-2, -1, -3, 15, 0, -4, 2, -5, 9, -15, 0, 4, 5, -6, 10, 7];

for(let i = 0; i<array.length;i++)
    if(array[i] > -10 && array[i]<-3)    
        document.writeln(array[i]);

document.write('<h3>Создайте новый массив и заполните его значениями от 23 до 57, используя цикл for и while. Выведите оба массива. С помощью цикла for найдите сумму элементов этого массива. Запишите ее в переменную result и выведите.</h3>');

array = [];
let absolutelyUnnecessaryVariable = 23;
let result = 0;

for (let i = absolutelyUnnecessaryVariable; i <= 57; i++){
    array.push(i);
    result+=i;
    document.writeln(i);
}

document.write('<br/>');

array = []
while(absolutelyUnnecessaryVariable <= 57){
    array.push(absolutelyUnnecessaryVariable);
    document.writeln(absolutelyUnnecessaryVariable);
    absolutelyUnnecessaryVariable++;
}

document.write('<br/> result=' + result);

document.write('<h3>Дан массив числами (строчного типа), например: [‘10’, ‘20’, ‘30’, ‘50’, ‘235’, ‘3000’]. Выведите на экран только те числа из массива, которые начинаются на цифру 1, 2 или 5.</h3>');

array = ['10', '20', '30', '50', '235', '3000'];

for (let i = 0; i < array.length; i++){
    if (array[i][0] === '1' || array[i][0] === '2' || array[i][0] === '5')
        document.writeln(array[i]);
}

document.write('<h3>Составьте массив дней недели (ПН, ВТ, СР и т.д.). С помощью цикла for выведите все дни недели, а выходные дни выведите жирным.</h3>');

array = ['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'];

for (let i = 0; i < array.length; i++){
    if (array[i] === 'СБ' || array[i] === 'ВС')
        document.writeln("<strong>" + array[i] + "</strong>");
    else
        document.writeln(array[i]);
}

document.write('<h3>Создайте массив с произвольными данными. Добавьте в конец массива любой элемент, и получите последний элемент массива, используя свойство length.</h3>');

array.push('last element');

document.writeln(array[array.length-1]);

document.write('<h3>Запросите у пользователя по очереди числовые значения при помощи prompt и сохраните их в массив. Собирайте числа до тез пор пока пользователь не введет пустое значение. Выведите получившийся массив на экран. Выполните сортировку чисел массива, и выведите его на экран.</h3>');

array = [];

do{
    input = prompt('Введите число');
    if(isNaN(input)) 
        alert("Ошибка ввода: Введите число!");
    else if(input !== '') {
        array.push(input);
    }
}
while(input !== '');

document.write("До сортировки:<br/>");
for (let i = 0; i < array.length; i++){
    document.writeln(array[i]);
}

let iter = array.length;

while(iter>0){
    console.log(array);
    for (let i = 1; i < iter; i++){
        let temp
        if (+array[i-1]>+array[i]){
            temp = +array[i];
            array[i] = +array[i-1];
            array[i-1] = +temp;
        }
    }
    iter--;
}

document.write("<br/>После сортировки:<br/>");
for (let i = 0; i < array.length; i++){
    document.writeln(array[i]);
}

document.write('<h3>Переверните массив [12, false, ‘Текст’, 4, 2, -5, 0] (выведите в обратном порядке), используя цикл while и метод reverse.</h3>');

array = [12, false, 'Текст', 4, 2, -5, 0];
iter = array.length-1;
while(iter>=0){
    document.writeln(array[iter]);
    iter--;
}

document.writeln('<br/>');

array.reverse();
for (let i = 0; i < array.length; i++){
    document.writeln(array[i]);
}

document.write('<h3>Напишите скрипт, считающий количество нулевых (пустых) элементов в заданном целочисленном массиве [5, 9, 21, , , 9, 78, , , , 6].</h3>');

array = [5, 9, 21, , , 9, 78, , , , 6];
let num = 0;

for (let i = 0; i < array.length; i++){
    if(array[i] === null || array[i] === undefined)
        num++;
}

document.write(num + ' пустых элементов');

document.write('<h3>Найдите сумму элементов массива между двумя нулями (первым и последним нулями в массиве). Если двух нулей нет в массиве, то выведите ноль. В массиве может быть более 2х нулей. Пример массива: [48,9,0,4,21,2,1,0,8,84,76,8,4,13,2] или [1,8,0,13,76,8,7,0,22,0,2,3,2].</h3>');

array = [1,8,0,13,76,8,7,0,22,0,2,3,2];
sum = 0;
let index = [0,0];

for (let i = 0; i < array.length; i++){
    if(array[i] === 0){
        index[0] = i;
        break;
    }
}

for (let i = array.length-1; i >=0 ; i--){
    if(array[i] === 0){
        index[1] = i;
        break;
    }
}

if(index[0] === index[1])
    sum = 0;
else{
    for (let i = index[0]; i<=index[1];i++)
        sum+=array[i];
}
document.write("Сумма=" + sum);

document.write('<h3>Нарисовать равнобедренный треугольник из символов ^. Высоту выбирает пользователь. Например: высота = 5, на экране:</h3>');

array = []
let height = prompt('Введите высоту треугольника');

document.write('<div style="text-align:center;">');
for (let i = 0; i < height; i++){
    let line = '';
    for(let j = 0; j <= 2*height-1; j++){
        if (j >= height - i && j < ((height - i) + (2*i+1)) )
            line += '^';
        else
            line += '&nbsp;';
    }
    array.push(line);
    document.write(array[i] + "<br/>");
}
document.write('</div>');