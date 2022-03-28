let name = prompt('Ваше имя');
let age = prompt('Ваш возраст');
let city = prompt('Ваш город проживания');
let phone = prompt('Ваш номер телефона');
let email = prompt('Ваш email');
let company = prompt('Где вы работаете');

document.write('<h3>Создайте переменные: name, age, city, phone, email, company; и получите через ф-цию prompt() соответствующие значения: ваше имя, возраст, город проживания и т.д. Выведите на экран фразу: «Меня зовут %Имя%. Мне %Возраст% лет. Я проживаю в городе %Город% и работаю в компании %Компания%. Мои контактные данные: %Телефон%, %Почта%.».</h3>');

document.write(`<p>Меня зовут ${name}. Мне ${age} лет. Я проживаю в городе ${city} и работаю в компании ${company}. Мои контактные данные: ${phone}, ${email}</p>`);

document.write('<h3>Определите по введенному возрасту (исп. значение из задания 1) год рождения. Выведите на экран «%Имя% родился в %Год% году.».</h3>');

document.write(`<p>${name} родился в `+ (2022 - age) +` году.</p>`);

document.write('<h3>Дана строка из 6-ти цифр(211112). Проверьте, что сумма первых трех цифр равняется сумме вторых трех цифр. Если это так - выведите "да", в противном случае выведите "нет".</h3>')

let numbers = '211112';

if(Number(numbers[0]) + Number(numbers[1]) + Number(numbers[2]) === Number(numbers[3]) + Number(numbers[4]) + Number(numbers[5]))
    document.write(`Да`);
else
    document.write('Нет');

document.write('<h3>Если переменная a больше нуля, то выведите "Верно", иначе выведите "Неверно". Проверьте работу скрипта при a, равном 1, 0, -3.</h3>');

let a = [1,0,-3];

for (val of a){
    if(val > 0)
        document.write('<p>Верно</p>');
    else
        document.write('<p>Неверно</p>');
}

document.write('<h3>Создайте переменные a=10 и b=2. Выведите их сумму, разность, произведение, частное, а также, если сумма этих чисел больше 1, то возведите полученную сумму в квадрат.</h3>');

a = 10;
let b = 2;
let sum = a + b;

document.write('Сумма ' + sum + ', разность ' + (a - b) + ', произведение ' + (a * b) + ', частное ' + (a / b) + '</p>');
if (sum > 1) document.write('<p>Квадрат суммы:'+ sum**2 + '</p>');

document.write('<h3>Если переменная a (из задания 5) больше 2 и меньше 11, или переменная b (из задания 5) больше или равна 6 и меньше 14, то выведите "Верно", в противном случае выведите "Неверно".</h3>');

if((2 < a && a < 11) || ( 6 <= b && b < 14))
    document.write('<p>Верно</p>');
else
    document.write('<p>Неверно</p>');

document.write('<h3>В переменной n лежит число от 0 до 59. Определите в какую четверть часа попадает это число (в первую, вторую, третью или четвертую).</h3>');

let n = Math.round(Math.random() * 59);
const quarters = ['Первая', 'Вторая', 'Третья', 'Четвертая'];

let quarter = quarters[Math.ceil(n/15)-1];

document.write(`<p>${n} - ${quarter} четверть</p>`);

document.write('<h3>В переменной day лежит число из интервала от 1 до 31. Определите в какую декаду месяца попадает это число (в первую, вторую или третью).</h3>');

let day = Math.round(Math.random() * (31 - 1) + 1);

quarter = quarters[Math.ceil(day/10)-1];

document.write(`<p>${day} - ${quarter} декада</p>`);

document.write('<h3>Напишите скрипт, который переводит дни в года (условно 1г = 365дн), в месяцы (условно 1м = 31день), в недели, в часы, в минуты и в секунды. Дробные результаты вычислений принимаются. Если кол-ва дней не хватает до полного года, месяца, недели, вывести сообщение «Меньше года», «Меньше месяца» и «Меньше недели»,соответственно.</h3>');

let days = 10258;

let years = days / 365;
let months = days / 31;
let weeks = days / 7;
let hours = days * 24;
let minutes = hours * 60;
let seconds = minutes * 60;

document.write(`<p>${days} дней => Лет: ${years>1?years:'Меньше года'}, Месяцев: ${months>1?months:'Меньше месяца'}, Недель: ${weeks>1?weeks:'Меньше недели'}, ${hours} часов, ${minutes} минут, ${seconds} секунд</p>`)

document.write('<h3>Напишите скрипт, который по введенному дню (исп. значение переменной из 8 задания) в году (например, 256) определит месяц (от 1 до 12) и пору года (зима, лето и т.д.). Скрипт определения поры года написать через switch.</h3>');

day = Math.round(Math.random() * (365 - 1) + 1);

month = Math.ceil(day/31);
document.write(`День: ${day}, Месяц: ${month}. `);

switch (month){
    case 12:
    case 1:
    case 2:
        document.write('Зима');
        break;
    
    case 3:
    case 4:
    case 5:
        document.write('Весна');
        break;

    case 6:
    case 7:
    case 8:
        document.write('Лето');
        break;

    case 9:
    case 10:
    case 11:
        document.write('Осень');
        break;
}

