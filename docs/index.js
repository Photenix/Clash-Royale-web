const buttonBefore = document.getElementById("before")
const buttonAfter = document.getElementById("after")

const pjImg = document.getElementById("pj-image")
const pjButton = document.getElementById("pj-button")

const pjImgInfo = document.getElementById("pj-image-info")

const pjNameInfo = document.getElementById("info-name")
//const pjTextInfo = document.getElementById("info-text")
const pjTextInfo = document.querySelector("#info-text")

let pjNum = 0

let pjName = []

let imagen = [
    "golem.png",
    "Pekka.webp",
    "caballero.png",
    "bruja.png",
    "los-pillos.png",
    "goblin.webp",
    "arquero.png",
    "montaPuercos.webp",
    "Miner_info.webp",
    "principe.png",
]

buttonAfter.addEventListener("click",function(event){
    if(pjNum > 0) {
        pjNum--
        //console.log(pjName[pjNum])
        createCard(pjName[pjNum])
        buttonBefore.className = "button-able"
    }
    if(pjNum == 0){
        buttonAfter.className = "button-disable"
    }
})

buttonBefore.addEventListener("click",function(event){
    if(pjNum < pjName.length-1) {
        pjNum++
        //console.log(pjName[pjNum])
        createCard(pjName[pjNum])
        buttonAfter.className = "button-able"
    }
    if(pjNum == pjName.length-1){
        buttonBefore.className = "button-disable"
    }
})

function createCard(name){
    pjImg.setAttribute("src","./img/"+imagen[pjNum])
    pjImgInfo.setAttribute("src","./img/"+imagen[pjNum])

    pjButton.innerText = name
    let {pjName, text} = getInLocalStorage(name)

    pjNameInfo.innerText = pjName
    pjTextInfo.innerText = text

}

function getInLocalStorage(name){
    let pjText = localStorage.getItem(name)
    return {
        pjName : name,
        text : pjText
    }
}


function ReadDocx(){
    fetch("./utils/Data.txt")
        .then(response => response.text())
        .then(data => {
            // Do something with your data
            //console.log(data);

            let re = /\* [A-Za-z áéóúí]+: [A-Za-z !¡",.ñáéóúí\d]+/g;
            let myArray = data.match(re);
            myArray.forEach(element => {
                //console.log(element)
                
                let mach = /\* ([A-Za-z áéóúí]+): ([A-Za-z !¡",.ñáéóúí\d]+)/.exec(element)

                mach.splice(0,1)

                pjName.push(mach[0])

                localStorage.setItem(mach[0],mach[1])

                //console.log(mach)
            })
            createCard(pjName[0])
            buttonAfter.className = "button-disable"
        })
        .catch(error => console.log(error))
}

ReadDocx()

