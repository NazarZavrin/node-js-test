

// 📁 index.js
const express = require('express');
const app = express();
// ↓ подключить модуль path
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT ?? 3000;

// ↓ обрабатываем get-запрос, получающий текущую страницу
app.get('/', (req, res) => {
    // ↓ отправить файл main.html из папки site, которая находится в текущей папке
    res.send(fs.readFileSync(path.join(path.resolve(), "site", "main.html"), {"encoding": "utf8"}));
})

// ↓ обрабатываем get-запрос, читающий файл
app.get('/read', (req, res) => {
    // ↓ отправить файл manual.html из папки site, которая находится в текущей папке
    fs.readFile(path.join(path.resolve(), "notes.txt"), {"encoding": "utf8"}, (error, content) => {
        if (error) {
            res.send("Error: " + error);
        } else {
            res.send(`<div>${content}</div><a href='/'>На главную</a>`);// отослать строку-содержимое файла как ответ
        }
    })
})

// ↓ обрабатываем get-запрос, добавляющий в файл
app.get('/append', (req, res) => {
    // ↓ отправить файл manual.html из папки site, которая находится в текущей папке
    fs.appendFile(path.join(path.resolve(), "notes.txt"), "Запись ", (error) => {
        if (error) {
            res.send("Error: " + error);
        } else {
            res.send("<div>Запись добавлена</div><a href='/'>На главную</a>");
        }
    })
})

// ↓ обрабатываем get-запрос, стирающий содержимое файла
app.get('/erase', (req, res) => {
    // ↓ отправить файл manual.html из папки site, которая находится в текущей папке
    fs.writeFile(path.join(path.resolve(), "notes.txt"), "", (error) => {
        if (error) {
            res.send("Error: " + error);
        } else {
            res.send("<div>Содержимое файла стёрто</div><a href='/'>На главную</a>");
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
})












/* ↑ Выведет:

*/
// let fruit = ['Персик', 'Банан', 'Яблоко', 'Апельсин', 'Груша', 'Ананас', 'Абрикос'];
// let name = ["David", "Adam", "Henry", "James", "John", "Lily", "Alice", "Daniel", ]
// let surname = ["Hill", "Cliff", "King", "Cloud", 'Smith', ]
// ↑ ↓ 📁
// let pathToChrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';