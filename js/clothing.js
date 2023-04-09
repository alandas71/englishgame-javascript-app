var item = [
    "hoodie",
    "flip flops",
    "tie",
    "pants",
    "blouse",
    "skirt",
    "dress",
    "shoes",
    "boots",
    "gloves",
    "cap",
    "jacket",
    "t-shirt",
    "shirt"
];

//Faz um array com 4 números sorteados aleatórios para as opções
var max = 4;

var i, randomNmb = [];
for (i = 0; i < max; i++) {
    randomNmb[i] = i;
}

var t, m, tmt;
for (t = randomNmb.length; t;) {
    m = Math.random() * t-- | 0;
    tmt = randomNmb[m];
    randomNmb[m] = randomNmb[t];
    randomNmb[t] = tmt;
}

var arrayElement = [];

//Monta o array com itens aleatórios
for (let i = 0; i <= 3; i++) {
    var randomElement = item[Math.floor(Math.random() * item.length)];
    arrayElement.push(randomElement);
}

//exclui itens repetidos
var arrUnicos = new Set();
arrayElement.forEach((arrNome) => {
    arrUnicos.add(arrNome);
})
newArr = [...arrUnicos.values()];

//Enquanto a quantidade de array for menor de 4 ele vai procurar itens que não são repetidos
while (newArr.length < 4) {
    var randomElement = item[Math.floor(Math.random() * item.length)];
    if (newArr.indexOf(randomElement) === -1) {
        newArr.push(randomElement)
    }
}

//Monta o nome das opções
newArr.forEach((i, index) => {
    document.querySelector("#option" + randomNmb[index]).innerHTML = i.toUpperCase();
})

//Monta a imagem 
var imagem = document.querySelector('.figure').style.backgroundImage = `url('../img/${randomElement}.jpg')`;

//Reseta o emoji de desempenho
document.querySelector('#face').addEventListener("click", (e) => {
    localStorage.removeItem("face");
    face = 0;
    document.getElementById('face').src = `../img/${face}.png`;
    localStorage.setItem("face", 0);
});

//Armazena um valor no local storage para o emoji
var face = 0;
var maxCount = 5;
var minCount = -4;
if (localStorage.face >= 0 || localStorage.face <= 0) {
    face = localStorage.face;
}
montaFace();

//Coloca tudo em maiúsculo para facilitar a validação
randomElement = randomElement.toUpperCase();
//Ao clicar no botão velida se a resposta está certa
for (let i = 0; i <= 3; i++) {
    document.querySelector('#option' + i).addEventListener("click", (e) => {
        var targetId = e.target.id
        var nome = document.querySelector('#option' + i).innerText
        if (nome == randomElement) {
            if (face < maxCount) {
                face++
                montaFace();
            }
            document.getElementById(targetId).style.backgroundColor = "#16d70b";
            disableAll();
            soundCorrect();
            setTimeout(() => {
                localStorage.setItem("face", face);
                soundTrue();
            }, "1000")
        } else {
            if (face > minCount) {
                face--
                montaFace();
            }
            document.getElementById(targetId).style.backgroundColor = "#d70b1c";
            e.target.disabled = true;
            soundFalse();
        }
    });
};

function montaFace() {
    document.getElementById('face').src = `../img/${face}.png`;
}


function disableAll() {
    for (let i = 0; i <= 3; i++) {
        document.querySelector('#option' + i).disabled = true;
    }
};

function soundTrue() {
    function playSound() {
        let audio = new Audio();
        audio.src = `../sound/${randomElement}.mp3`;
        audio.loop = false;
        audio.play();
    }
    playSound();
    setTimeout(() => {
        location.reload();
    }, "3000")
};

function soundFalse() {
    function playSound() {
        let audio = new Audio();
        audio.src = "../sound/resposta_errada.mp3";
        audio.loop = false;
        audio.play();
    }
    playSound();

};

function soundCorrect() {
    function playSound() {
        let audio = new Audio();
        audio.src = "../sound/resposta_certa.mp3";
        audio.loop = false;
        audio.play();
    }
    playSound();
}