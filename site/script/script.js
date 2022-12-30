// 📁 site/script/script.js
console.log("js");
const divs = document.querySelectorAll('div');

for (let i = 0; i < divs.length; i++) {
    let div = divs[i];
    let url;
    if (i === 0) {
        url = "/add-note";
    } else if (i === 1) {
        url = "/get-notes";
    } else if (i === 2) {
        url = "/clear";
    }

    div.addEventListener('click', async event => {
        try {
            let response = await fetch(url);
            let result = await response.text();
            document.body.innerHTML = result + "<div><a href='/'>На главную</a></div>";
        } catch (error) {
            console.error(error);
        }
    })
}


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