
// Файлы connect-get-db.js и add-documents.js те же, что и в предыдущем примере
// Файл connect-get-db.js тот же, что и в предыдущем примере
// 📁 index.js
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.resolve(), '/uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
})
const upload = multer();
  
const PORT = process.env.PORT ?? 3000;

app.use(express.static(path.join(path.resolve(), 'site')));

app.get("/get-filenames", (req, res) => {
    fs.readdir(path.join(path.resolve(), 'uploads'), (err, files) => {
        console.log("/get-filenames:");
        console.log(files);
        res.send(files.join(","));
    })
});
app.patch("/get-file", (req, res, next) => {
    express.text({
        limit: parseInt(req.get("content-length"))
    })(req, res, next);
}, (req, res) => {
    console.log("/get-file:");
    console.log(req.body);
    fs.readFile(path.join(path.resolve(), 'uploads', req.body), (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })    
});
app.post("/send-file", multer({storage: storage}).single("file-input"), (req, res) => {
    console.log("/send-file:");
    console.log(req.file);
    console.log("file-name (header):");
    console.log(req.get("file-name"));
    res.send("Файл добавлен");
});
app.delete("/delete-all-files", (req, res) => {
    new Promise((resolve, reject) => {
        fs.readdir(path.join(path.resolve(), 'uploads'), (err, files) => {
            resolve(files);
        })
    }).then(files => {
        files.forEach(async file => {
            if (file !== ".gitkeep") {
                await new Promise((resolve, reject) => {
                    fs.rm(path.join(path.resolve(), 'uploads', file), (err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve();
                    })
                })
            }
        })
        res.send("Файлы удалены");
    })
});

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