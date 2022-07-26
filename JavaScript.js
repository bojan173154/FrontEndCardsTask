const url = 'data.json'
let count = 0
let data;

async function jsonData() {
    const response = await fetch(url);
    data = await response.json();
    console.log(data)
    addCards()
}

function addCards() {
    let html = ``;
    let temp = count + 3;
    for (let i = count; i <= temp; i++) {
        if (temp > 16) {
            document.getElementById("btn").style.display="none"
        }
        html = ``;
        html += `<img src="${data[i].profile_image}" class="profiles">`
        if (data[i].source_type == "facebook") {
            html += `<a href="${data[i].source_link}"><img src="facebook.svg" class="socials"></a>`
        } else {
            html += `<a href="${data[i].source_link}"><img src="instagram-logo.svg" class="socials"></a>`
        }
        html += `
        <h3 class="header">${data[i].name}</h3>
        <p class="header">${data[i].date}</p>
        <div class="contentContainer">
        <img src="${data[i].image}"class="img">
        <p class="para">${data[i].caption}</p>
        </div>
        <div class="line"></div>
        <div class="footerContainer">
        <div class="footer" onclick="changeColor(${i},change_${i}, ${data[i].likes})"><object id="${i}" type="image/svg+xml" data="heart.svg"></object></div>
        <p id="change_${i}" class="footer">${data[i].likes}</p>
        </div>
        `
        let newDiv = document.createElement("div");
        newDiv.classList.add("cards");
        newDiv.innerHTML += html;
        document.getElementById("main").appendChild(newDiv);
    }
    count += 4;
}
function changeColor(color, text, likes)
{
    let x = document.getElementById(color);

    let y = parseInt(likes);
    if (x.contentDocument.documentElement.style.fill != "red") {
        y++;
        x.contentDocument.documentElement.style.fill = "red";
        text.innerHTML = y;
        return;
    }
    if(x.contentDocument.documentElement.style.fill == "red") {
        x.contentDocument.documentElement.style.fill = "none";
        text.innerHTML = y;
        return;
    }
}

jsonData()

