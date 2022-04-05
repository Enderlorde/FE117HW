document.write("<h3>Выведите числа от 1 до 50 и от 35 до 8.</h3>");

for (let i = 1; i<=50; i++){
    document.writeln(i);
}

document.write('<br/>');

for (let i = 35; i>=8; i--){
    document.writeln(i);
}

document.write("<h3>Выведите столбец чисел от 89 до 11 - воспользуйтесь циклом while и отделите числа тегом br / друг от друга, чтобы получить столбец, а не строку.</h3>");

let n = 89;

while(n>=11){
    document.write(n + "<br/>");
    n--;
}

document.write("<h3>С помощью цикла найдите сумму чисел от 0 до 100.</h3>");

let sum = 0;

for (let i = 0; i<=100; i++){
    sum+=i;
}

document.write(sum);

document.write("<h3>Выведите чётные числа от 8 до 56. Решить задание через while и for.</h3>");

for (let i = 8; i<=56; i++){
    if(i % 2 === 0){
        document.writeln(i);
    }
}

document.write("<h3>Необходимо вывести на экран полную таблицу умножения (от 2 до 10)</h3>");

for (let i = 1; i<=10; i++){
    for (let j = 1; j<=10; j++){
        document.write(i + "*" + j + "=" + (i*j) + "<br/>");
    }
    document.write('<br/>');
}

document.write("<h3>Дано число n=1000. Делите его на 2 столько раз, пока результат деления не станет меньше 50. Какое число получится? Посчитайте количество итераций, необходимых для этого (итерация - это проход цикла), и запишите его в переменную num.</h3>");

let num = 0;

n = 1000;
while(n>50){
    n /= 2;
    num++;
}

document.write('n=' + n + ' за ' + num + ' итераций');

document.write("<h3>Запустите цикл, в котором пользователю предлагается вводить число с клавиатуры, до тех пор, пока не будет введена пустая строка или 0. После выхода из цикла выведите общую сумму и среднее арифметическое введённых чисел. Если пользователь ввел не число, то вывести сообщение об ошибке ввода. При подсчете учесть, что пользователь может ввести отрицательное значение.</h3>");

let input = 0;
sum = 0;
num = 0;

do{
    input = prompt('Введите число');
    if (input === '') 
        break;
    else if(isNaN(input)) 
        alert("Ошибка ввода: Введите число!");
    else {
        sum+=+input;
        num++;
    }
}
while(input!=0)
document.write('Сумма = ' + sum + ' Среднее арифметическое = ' + sum/num);

document.write("<h3>Дана строка с числами разделенными пробелами «4 98 4 6 1 32 4 65 4 3 5 7 89 7 10 1 36 8 57». Найдите самое большое и самое маленькое число в строке,используя цикл.</h3>");

let string = "4 98 4 6 1 32 4 65 4 3 5 7 89 7 10 1 36 8 57";
let cursor = 0;
let min = +string[cursor], max= +string[cursor];
let temp = '';

do{
    if (string[cursor] !== ' ')
        temp+=string[cursor];
    else{
        if (+temp < min)
            min = +temp;
        else if (+temp > max)
            max = +temp;
        temp = '';
    }
    cursor++;
}
while(cursor < string.length);

document.write('min=' + min + ' max=' + max);

document.write("<h3>Дано произвольное целое число n. Написать программу, которая: a. разбивает число n на цифры и выводит их на экран; b. подсчитывает сколько цифр в числе n; c. находит сумму цифр числа n; d. меняет порядок цифр числа n на обратный.</h3>");

n = 88002553535;
string = n+"";
sum = 0;

document.write('a:<br/>');
for(let i = 0; i<string.length; i++){
    document.writeln(string[i]);
    sum+=+string[i];
}

document.write('<br/>b:' + string.length + '<br/>');
document.write('<br/>c:' + sum + '<br/>');

document.write('<br/>d:<br/>');
for(let i = string.length-1; i>=0; i--){
    document.writeln(string[i]);
}

