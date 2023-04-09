var item = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
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
//Coloca tudo em maiúsculo para facilitar a validação
randomElement = randomElement.toUpperCase();
//Ao clicar no botão velida se a resposta está certa
for (let i = 0; i <= 3; i++) {
    document.querySelector('#option' + i).addEventListener("click", (e) => {
        var targetId = e.target.id
        var nome = document.querySelector('#option' + i).innerText
        if (nome == randomElement) {
            document.getElementById(targetId).style.backgroundColor = "#16d70b";
            disableAll();
            soundCorrect();
            setTimeout(() => {
                soundTrue();
            }, "1000")
        } else {
            document.getElementById(targetId).style.backgroundColor = "#d70b1c";
            e.target.disabled = true;
            soundFalse();
        }
    });
};

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