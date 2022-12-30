
// Файлы connect-get-db.js и add-documents.js те же, что и в предыдущем примере
// Файл connect-get-db.js тот же, что и в предыдущем примере
// 📁 index.js
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT ?? 3000;

app.use(express.static(path.join(path.resolve(), 'site')));

app.get('/add-note', (req, res) => {
    fs.appendFile(path.join(path.resolve(), "notes.txt"), "Запись\n", error => {
        if (error) {
            throw error;
        }
        res.send("Запись добавлена");
    })
})
app.get('/get-notes', (req, res) => {
    fs.readFile(path.join(path.resolve(), "notes.txt"), "utf-8", (error, data) => {
        if (error) {
            throw error;
        }
        res.send(data);
    })
})
app.get('/clear', (req, res) => {
    fs.writeFile(path.join(path.resolve(), "notes.txt"), "", error => {
        if (error) {
            throw error;
        }
        res.send("Записи стёрты");
    })
})

// ↓ запустить сервер на порте PORT
app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
})










// let name = ["David", "Adam", "Henry", "James", "John", "Lily", "Alice", "Daniel", "Kevin" ]
// let surname = ["Hill", "Cliff", "King", "Cloud", 'Smith', ]
/*
finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
 */






/* ↑ Выведет:

*/
// <pre style="word-wrap: break-word; white-space: pre-wrap;"></pre>
// let fruit = ['Персик', 'Банан', 'Яблоко', 'Апельсин', 'Груша', 'Ананас', 'Абрикос'];
// let name = ["David", "Adam", "Henry", "James", "John", "Lily", "Alice", "Daniel", "Kevin" ]
// let surname = ["Hill", "Cliff", "King", "Cloud", 'Smith', ]
// ↑ ↓ 📁
// let pathToChrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';