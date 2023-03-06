//Element du DOM

const divVies =  document.querySelector('.vies');
const message = document.getElementById("message");
const formulaire = document.getElementById('inputBox');
const input = document.getElementById('number');
const essayerbtn = document.getElementById('essayerBtn');
const rejouebtn = document.getElementById('rejouer');
const body = document.getElementsByTagName ('body')[0];

// modèle des coeurs

const coeurvide =  '<ion-icon name="heart-outline"></ion-icon>'
const coeurplein = '<ion-icon name="heart"></ion-icon>'

//fond

const froid = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
const tiede = 'linear-gradient(to top, #fddb92 0%, #d1fdff 100%)';
const chaud = 'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)';
const treschaud = 'linear-gradient(to top, #ff0844 0%, #ffb199 100%)';

const win = ' linear-gradient(to right, #f83600 0%, #f9d423 100%)';
const loose = ' linear-gradient(to top, #e6b980 0%, #eacda3 100%)';

//PLay

const play = () => {
const randomNumber = Math.floor(Math.random() * 151);
const totalVies = 8;
let vies = totalVies;
console.log(randomNumber);

// Actualisation à chaque essaie
    formulaire.addEventListener('submit', (e) =>{
    e.preventDefault();
    const valeurInput = parseInt(input.value);

    if(valeurInput < 0 || valeurInput > 151) return;

    if(valeurInput === randomNumber){
        body.style.backgroundImage = win;
        message.textContent = `Bravo! Le nombre était bien ${randomNumber}.`;
        rejouebtn.style.display = "block";
        essayerbtn.setAttribute("disabled", "");
    }

    if (valeurInput !== randomNumber) {
        if(randomNumber < valeurInput + 3 && randomNumber > valeurInput -3){
            body.style.backgroundImage = treschaud;
            message.textContent = "C'est brulant!!!🔥🔥🔥";
        } else if (randomNumber < valeurInput + 6 && randomNumber > valeurInput -6){
            body.style.backgroundImage = chaud;
            message.textContent = "C'est Chaud!🔥";
        } else if (randomNumber < valeurInput + 11 && randomNumber > valeurInput -11){
            body.style.backgroundImage = tiede;
            message.textContent = "C'est tiède😑";
        } else  {
            body.style.backgroundImage = froid;
            message.textContent = "C'est froid🥶";
        }
        vies--;
        verifyLoose();
    }

        actualiseCoeurs(vies);

})

    const verifyLoose = () => {
        if(vies === 0){
            body.style.backgroundImage = loose;
            body.style.color = '#990000';
            essayerbtn.setAttribute("disabled", "");
            message.textContent = `Vous avez perdu, le nombre était ${randomNumber}.`;
            rejouebtn.style.display = "block";
        }
    }  

    const actualiseCoeurs = (vies) => {
        divVies.innerHTML = "";
        let tableauVies = [];
        for(let i = 0; i < vies; i++){
            tableauVies.push(coeurplein);
        }
        for(let i = 0; i < totalVies - vies; i++){
            tableauVies.push(coeurvide);
        }
        tableauVies.forEach(coeur => {
            divVies.innerHTML += coeur;
        })
    }
    actualiseCoeurs(vies);

    rejouebtn.addEventListener('click', () =>{
        message.style.display = "block";
        document.location.reload(true);
    })
}

play();