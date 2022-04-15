/* Дана строка 'aaa@bbb@ccc'. Замените все @ на ! с помощью глобального поиска и замены. */

let str = 'aaa@bbb@ccc';
console.log(str.replaceAll('@','!'));

/* В переменной date лежит дата в формате 2025-12-31. Преобразуйте эту дату в формат 31/12/2025. */

let date = '2025-12-31';
console.log(date.split('-').reverse().join('/'));

/* Дана строка «Я учу javascript!». Вырежете из нее слово «учу» и слово «javascript» тремя разными способами (через substr, substring, slice). */

let str2 = 'Я учу javascript!';
console.log(`${str.substr(2,3)} ${str.substr(6,10)}`);
console.log(`${str.substring(2,5)} ${str.substring(6,16)}`);
console.log(`${str.slice(2,5)} ${str.slice(6,16)}`);

/* Дан массив с элементами 4, 2, 5, 19, 13, 0, 10. Найдите квадратный корень из суммы кубов его элементов. Для решения воспользуйтесь циклом for. */

let arr = [4,2,5,19,13,0,10];
let sumOfCubes = 0;
for (elem of arr){
    sumOfCubes += Math.pow(elem,3);
}
console.log(Math.sqrt(sumOfCubes));

/* Даны переменные a и b. Отнимите от a переменную b и результат присвойте переменной c. Сделайте так, чтобы в любом случае в переменную c записалось положительное значение. Проверьте работу скрипта при a и b, равных соответственно 3 и 5, 6 и 1. */

let a = 3;
let b = 5;
let c = 0;

c = Math.abs(a - b);
console.log(c);

a = 6;
b = 1;

c = Math.abs(a - b);
console.log(c);

/* Выведите на экран текущую дату-время в формате 12:59:59 31.12.2014. Для решения этой задачи напишите функцию, которая будет добавлять 0 перед днями и месяцами, которые состоят из одной цифры (из 1.9.2014 сделает 01.09.2014). */

let today = new Date();

const formateDate = function (value){
    return value<10?`0${value}`:`${value}`;
}

console.log(`${formateDate(today.getHours())}:${formateDate(today.getMinutes())}:${formateDate(today.getSeconds())} ${today.toLocaleDateString("ru")}`);

/* Дана строка 'aa aba abba abbba abca abea'. Напишите регулярку, которая найдет строки aba, abba, abbba по шаблону: буква 'a', буква 'b' любое количество раз, буква 'a'. */

let str3 = 'aa aba abba abbba abca abea';
let rexp1 = new RegExp('ab+a','g');

console.log(str3.match(rexp1));

/* Напишите ф-цию строгой проверки ввода номер телефона в международном формате (<код страны> <код города или сети> <номер телефона>). Функция должна возвращать true или false. Используйте регулярные выражения. */

const phoneValidation = function (phone){
    let rexp2 = new RegExp('^\\+?(\\d+\\s\\(?\\d+\\)?\\s(\\d+|\\d+(\\-|\\s)?\\d+(\\-|\\s)?\\d+)|\\d+)$');
    if (phone.match(/\d/g).length > 13 || phone.match(/\d/g).length < 9 ) return false;
    return rexp2.test(phone);
}

console.log(phoneValidation('+8800 2553535'));
console.log(phoneValidation('88002553535'));
console.log(phoneValidation('8 800 255 35 35'));
console.log(phoneValidation('375447521202'));
console.log(phoneValidation('+375 44 7521202'));
console.log(phoneValidation('+375 (44) 7521202'));
console.log(phoneValidation('+375 (44) 752-12-02'));
console.log(phoneValidation('375 (44) 752-12-02'));
console.log(phoneValidation('8 800 255-35-35'));
console.log(phoneValidation('+375 (44) 752-12-02'));
console.log(phoneValidation('+375 (44) 5 148 148'));
console.log(phoneValidation('+375 (44) 5 148 148'));
console.log(phoneValidation('+375213123 (41234) 5213321 148 148'));

/* Напишите ф-цию строгой проверки адреса эл. почты с учетом следующих условия:
- весь адрес не должен содержать русские буквы и спецсимволы, кроме
одной «собачки», знака подчеркивания, дефиса и точки;
- имя эл. почты (до знака @) должно быть длиной более 2 символов, причем
имя может содержать только буквы, цифры, но не быть первыми и
единственными в имени;
- после последней точки и после @, домен верхнего уровня (ru, by, com и т.п.)
не может быть длиной менее 2 и более 11 символов. */

const emailValidation = function (email){
    let rexp2 = new RegExp ('^[a-z,A-Z]+[\\w,\\d,\\.,\\.,\\-,\\_]{2,}@\\w+\\.\\w{2,11}$');
    return rexp2.test(email);
}

console.log(emailValidation('madel.laboratories@yandex.by'));
console.log(emailValidation('notvalidemail.ru'));
console.log(emailValidation('notvalid@emailr.u'));
console.log(emailValidation('n@otvalidemail.ru'));
console.log(emailValidation('2notvalid@email.ru'));
console.log(emailValidation('absolutely.valid_email@example.com'));
console.log(emailValidation('valid2email3_valid@example.com'));

/* Напишите ф-цию, которая из полного адреса с параметрами и без, например: https://tech.onliner.by/2018/04/26/smart-do-200/?utm_source=main_tile&utm_medium=smartdo200#zag3 , получит адрес доменного имени (https://tech.onliner.by), остальную часть адреса без параметров (/2018/04/26/smart-do-200/), параметры (utm_source=main_tile&utm_medium=smartdo200) и хеш (#zag3). В адресе может и не быть каких-либо составляющих. Ф-ция должна возвращать массив. */

const parseURL = function (url){
    let rexp2 = RegExp ('^(https?\\:\\/\\/[\\w,\\.,\\_,\\-,\\d]+)(\\/[\\w,\\d,\\/,\\_,\\-]+)?(\\?[\\w,\\d,\\_,\\&,\\=]+)?(#[\\w]+)?');
    return url.match(rexp2);
}

console.log(parseURL("https://tech.onliner.by/2018/04/26/smart-do-200/?utm_source=main_tile&utm_medium=smartdo200#zag3"));
console.log(parseURL("http://ya.ru"));
console.log(parseURL("https://drive.google.com/drive/folders/1-bobs5eyYLpph23jkqOuarNkBTOpqaK5"));
console.log(parseURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley'));