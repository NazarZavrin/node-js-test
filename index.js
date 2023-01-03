
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
      cb(null, path.join(process.cwd(), '/uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
})

// if there isn't uploads/.gitkeep, then mkdir() and create .gitkeep file 
  
const PORT = process.env.PORT ?? 3000;

app.use(express.static(path.join(process.cwd(), 'site')));

app.get("/get-filenames", (req, res) => {
    fs.readdir(path.join(process.cwd(), 'uploads'), (err, files) => {
        console.log("/get-filenames:");
        console.log(files);
        console.log("cwd:", process.cwd());
        console.log("path.resolve():", path.resolve());
        files = files.join(",");
        res.send("cwd:" + process.cwd() + "|path.resolve():" + path.resolve() + "|files:" + files);
    })
});
app.patch("/get-file", (req, res, next) => {
    express.text({
        limit: parseInt(req.get("content-length"))
    })(req, res, next);
}, (req, res) => {
    console.log("/get-file:");
    console.log(req.body);
    fs.readFile(path.join(process.cwd(), 'uploads', req.body), (err, data) => {
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
        fs.readdir(path.join(process.cwd(), 'uploads'), (err, files) => {
            resolve(files);
        })
    }).then(files => {
        files.forEach(async file => {
            if (file !== ".gitkeep") {
                await new Promise((resolve, reject) => {
                    fs.rm(path.join(process.cwd(), 'uploads', file), (err) => {
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