document.querySelector('html').setAttribute('lang','en');
let title = document.createElement('title');
title.innerText = 'Homework 8';
document.querySelector('head').appendChild(title);
let metaAuthor = document.createElement('meta');
metaAuthor.setAttribute('name', 'author');
metaAuthor.setAttribute('content', 'Ilya_Horoneko');
let metaCharset = document.createElement('meta');
metaCharset.setAttribute('charset', 'UTF-8');
let metaViewport = document.createElement('meta');
metaViewport.setAttribute('name', 'viewport');
metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
document.querySelector('head').appendChild(metaAuthor);
document.querySelector('head').appendChild(metaCharset);
document.querySelector('head').appendChild(metaViewport);

let style = document.createElement('style');
style.setAttribute('type','text/css');
style.innerText = `
    @font-face{
        font-family: "Montserrat";
        src: url("fonts/Montserrat-VariableFont_wght.ttf");
    }

    @font-face{
        font-family: "Open Sans";
        src: url("fonts/OpenSans-VariableFont_wdth.ttf");
    }

    @font-face{
        font-family: "Arvo";
        src: url("fonts/Arvo-Regular.ttf");
    }

    *{
        margin: 0;
        padding: 0;
    }

    body{
        padding:60px;
        display:flex;
        justify-content: center;
    }
    
    .widget{
        font-family: "Open Sans";
        font-size: 14px;
        text-align: center;
        color: #9FA3A7;
    }
    
    .widget>h2{
        font-family: "Arvo";
        font-weight: 500;
        font-size: 36px;
        color: #212121;
        margin-bottom: 20px;
    }
    
    .widget>p{
        margin-bottom: 80px;
    }
    
    .container{
        display: flex;
        border-radius: 5px;
        overflow: hidden;
    }
    
    .container__item{
        padding: 100px;
        border: 1px solid #E8E9ED;
        color: #9FA3A7;
    }
    
    .container__item:hover{
        background-color: #8F75BE;
        border-color: #8F75BE;
        color: #fff;
    }
    
    .container__item .label{
        margin-bottom: 20px;
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 12px;
        letter-spacing: 2.4px;
        text-transform: uppercase;
    }
    
    .container__item:hover .label{
        color: #FFC80A;
    }
    
    .container__item h3{
        margin-bottom: 25px;
        color: #212121;
        font-family: 'Arvo';
        font-size: 36px;
    }
    
    .container__item:hover h3{
        color: #fff;
    }
    
    .container__item p{
        margin-bottom: 50px;
    }
    
    .container__item button{
        padding: 15px;
        border-radius: 30px;
        border: 3px solid#FFC80A;
        background-color: transparent;
        font-family: "Montserrat";
        font-weight: bold;
        font-size: 12px;
        letter-spacing: 2.4px;
        text-transform: uppercase;
        color: #212121;
    }
    
    .container__item button:hover{
        background-color: #FFC80A;
    }
    
    .container__item:hover button{
        color: #fff;
    }
    
    
`;
document.querySelector('head').appendChild(style);
let widget = document.createElement('div');
widget.className = 'widget';

widget.innerHTML = `<h2>Choose Your Option</h2>
            
    <p>But I must explain to you how all this mistaken idea of denouncing</p>
`;

let widgetContainer = document.createElement('div');
widgetContainer.className = 'widget__container container';
let widgetItem1 = document.createElement('div');
widgetItem1.className = 'container__item';
widgetItem1.innerHTML = `
    <h3>Initially designed to</h3>

    <p>But I must explain to you how all this mistaken idea of denouncing</p>

    <button>start here</button>
`;
let label1 = document.createElement('div');
label1.className = 'label';
label1.innerText = 'FREELANCER';
widgetItem1.querySelector('h3').before(label1);


let widgetItem2 = document.createElement('div');
widgetItem2.className = 'container__item';
widgetItem2.innerHTML = `
    <h3>Initially designed to</h3>

    <p>But I must explain to you how all this mistaken idea of denouncing</p>

    <button>start here</button>
`;
let label2 = document.createElement('div');
label2.className = 'label';
label2.innerText = 'STUDIO';
widgetItem2.querySelector('h3').before(label2);

widget.appendChild(widgetContainer);

widgetContainer.appendChild(widgetItem1);
widgetContainer.appendChild(widgetItem2);
document.querySelector('body').appendChild(widget);
