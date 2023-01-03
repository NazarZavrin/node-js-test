// 📁 site/script/script.js
console.log("js");
const divs = document.querySelectorAll('div');
const getFileInput = document.getElementsByName('get-file')[0];
const sendFileInput = document.getElementsByName('file-input')[0];
const myForm = document.getElementById('myForm');

// Получить имена загруженных файлов
divs[0].addEventListener('click', async event => {
    try {
        let response = await fetch("/get-filenames");
        let result = await response.text();
        document.body.innerHTML = result + "<div><a href='/'>На главную</a></div>";
    } catch (error) {
        console.error(error);
    }
})
// Получить файл
divs[1].addEventListener('click', async event => {
    let fileName = getFileInput.value;
    console.log(fileName);
    try {
        let response = await fetch("/get-file", {
            method: "PATCH",
            body: fileName
        });
        let blob = await response.blob();
        console.log(blob);
        console.log(await blob.text());// получение текстового содержимого файла
        let img = document.createElement("img");
        img.src = URL.createObjectURL(blob);
        console.log(img.src);
        img.style.maxWidth = "250px";
        let extension = fileName.split(".").pop();
        if (extension === "txt") {
            fileContent = await blob.text();
            document.body.insertAdjacentHTML("beforeend", `<span>${fileContent}</span>`);
        } else {
            document.body.append(img);
        }
    } catch (error) {
        console.error(error);
    }
})
// Отправить файл
divs[2].addEventListener('click', async event => {
    console.log("sendFileInput state:");
    console.log(sendFileInput.files[0]);
    console.log(sendFileInput.files[0].name);
    let requestBody = new FormData();
    requestBody.append("file-input", sendFileInput.files[0], sendFileInput.files[0].name);
    console.log("FormData:");
    for (const [name, value] of requestBody) {
        console.log(name + ":", value);
    }
    try {
        let response = await fetch("/send-file", {
            method: "POST",
            body: requestBody,
            headers: {"file-name": sendFileInput.files[0].name}
        });
        let result = await response.text();
        document.body.innerHTML = result + "<div><a href='/'>На главную</a></div>";
    } catch (error) {
        console.error(error);
    }
})
// Удалить все загруженные файлы
divs[3].addEventListener('click', async event => {
    try {
        let response = await fetch("/delete-all-files", {
            method: "DELETE",
        });
        let result = await response.text();
        document.body.innerHTML = result + "<div><a href='/'>На главную</a></div>";
    } catch (error) {
        console.error(error);
    }
})


/*let myForm = document.querySelector('form');
myForm.style = `display: inline-flex; 
flex-direction: column; 
justify-content: center;
align-items: center;
background: lightgray`;

myForm.addEventListener('submit', async event => {
    event.preventDefault();
    let formData = new FormData(myForm);
    let file = formData.get("photo");
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", async event => {
        formData.set("photo", event.target.result);
        let requestBody = {};
        for (const [name, value] of formData) {
            requestBody[name] = value;
        }
        let response = await fetch("/profile", {
            method: 'POST',
            body: JSON.stringify(requestBody),
        })
        let user = await response.json();
        document.body.insertAdjacentHTML("beforeend", `<div>
            name: ${user.name}, surname: ${user.surname}
        </div>`);
        let img = document.createElement("img");
        img.src = user.photo;
        img.style.maxWidth = "250px";
        document.body.append(img);
    })
})*/
/*
const view = document.querySelector('#view');
view.addEventListener('click', event => {
    let html, profileExists = true;
    fetch("/profile", {method: "GET"})
    .then(response => response.json())
    .then(json => {
        if (typeof json.name === "undefined") {
            profileExists = false;
            document.body.innerHTML = "<div>Профиль не создан</div>";
            return;
        }
        html = `<div>Имя: ${json.name}</div>`;
        html += `<div>Фамилия: ${json.surname}</div>`;
        html += `<div>Время последнего изменения: ${json.lastModified}</div>`;
        document.body.innerHTML = html;
    })
    .then(() => fetch("/photo"), {method: "GET"})
    .then(response => response.blob())
    .then(blob => {
        if (profileExists === true) {
            
        }
        document.body.insertAdjacentHTML('beforeend', `<div>
            <a href="/">На главную страницу</a>
        </div>`);
    })
    .catch(error => {
        console.error(error);
        alert("Ошибка");
        location.reload();
    })
})
*/