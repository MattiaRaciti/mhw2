const CHECKED_IMAGE_URL = 'images/checked.png';
const UNCHECKED_IMAGE_URL = 'images/unchecked.png';

let celle_opacizzate = [];
const spunte = [];

const celle = document.querySelectorAll('.choice-grid div');
for (const cella of celle)
{
	cella.addEventListener("click", seleziona);
}

let risultati = [0, 0, 0, 0, 0, 0, 0, 0, 0]; 

let nDomandeCompletate = 0;

let risposteDate = [0, 0, 0];

function seleziona(event)
{
	const container = event.currentTarget;
	let nDomanda = 0;

	let celle_opacizzate = document.querySelectorAll('.riquadro');
	let spunte = document.querySelectorAll('.checkbox');
	let indiceDaSegnare = parseInt(container.dataset.index);
	let indiceRisposteDate;
	
	if(indiceDaSegnare <= 8){
		nDomanda = 0;
	}
	
	if(indiceDaSegnare > 8 && indiceDaSegnare <= 17){
		nDomanda = 9;
	}
	
	if(indiceDaSegnare > 17 && indiceDaSegnare <= 26){
		nDomanda = 18;
	}
  
    for(let i = 0 + nDomanda; i < 9 + nDomanda; i++){
		celle_opacizzate[i].classList.remove('opacizza');
		celle_opacizzate[i].classList.remove('evidenzia');
		spunte[i].remove();
		
		if(container != celle_opacizzate[i]){
			const image = document.createElement('img');
			image.classList.add('checkbox');
			image.src = UNCHECKED_IMAGE_URL;
			celle_opacizzate[i].appendChild(image);	
		}
	}  
	
	if(nDomanda == 0){
		risposteDate[0] = 1;
	}
	
	if(nDomanda == 9){
		risposteDate[1] = 1;
	}
	
	if(nDomanda == 18){
		risposteDate[2] = 1;
	}

    for(let i = 0 + nDomanda; i < 9 + nDomanda; i++){
		if(i != indiceDaSegnare) {
			celle_opacizzate[i].classList.add('opacizza');
		}
		else{
				celle_opacizzate[i].classList.add('evidenzia');
				spunte[i].remove();
				if(nDomanda == 0){
					risultati[indiceDaSegnare-nDomanda] += 1.1;
				}
				else{
					risultati[indiceDaSegnare-nDomanda] += 1;
				}
			}
	}

	const image = document.createElement('img');
	image.classList.add('checkbox');
	image.src = CHECKED_IMAGE_URL;
	container.appendChild(image);
	
	if(risposteDate[0] == 1 &&
	   risposteDate[1] == 1 &&
	   risposteDate[2] == 1) {
		   visualizzaRisultati();
		   for (const cella of celle){
			cella.removeEventListener("click", seleziona);
			}
	   }
}

function visualizzaRisultati(){
	const resultContainer = document.querySelector('.results');
	
	let max = -1;
	let scelta;
	let tipologia;
	
	for(let i = 0; i < 9; i++){
		if(risultati[i] > max){
			scelta = i;
			max = risultati[i];
		}
	}
	
	if(scelta == 0){
		tipologia = "blep";
	}
	
	if(scelta == 1){
		tipologia = "burger";
	}

	if(scelta == 2){
		tipologia = "cart";
	}

	if(scelta == 3){
		tipologia = "dopey";
	}

	if(scelta == 4){
		tipologia = "happy";
	}

	if(scelta == 5){
		tipologia = "nerd";
	}

	if(scelta == 6){
		tipologia = "shy";
	}

	if(scelta == 7){
		tipologia = "sleeping";
	}

	if(scelta == 8){
		tipologia = "sleepy";
	}
	
	const header = document.createElement('h1');
	header.textContent = RESULTS_MAP[tipologia].title;
	resultContainer.appendChild(header);
	header.classList.add('headerDescription');
	
	const description = document.createElement('div');
	description.textContent = RESULTS_MAP[tipologia].contents;
	resultContainer.appendChild(description);
	description.classList.add('desc');
	
	const restart = document.createElement('button');
	restart.textContent = "Ricomincia il quiz";
	resultContainer.appendChild(restart);
	restart.classList.add('ricomincia');
	
	const bottone = document.querySelector('.ricomincia');
	bottone.addEventListener("click", riparti);
}


function riparti(event){
	
	risultati = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	risposteDate = [0, 0, 0];
	
	let spazi = document.querySelectorAll('.riquadro');
	let spunte = document.querySelectorAll('.checkbox');
	let header = document.querySelector('.headerDescription');
	let description = document.querySelector('.desc');
	let restart = document.querySelector('.ricomincia');
	
	header.remove();
	description.remove();
	restart.remove();
	
	for(let i = 0; i < 27; i++){
		spazi[i].classList.remove('opacizza');
		spazi[i].classList.remove('evidenzia');
		spunte[i].remove();
		
		const image = document.createElement('img');
		image.classList.add('checkbox');
		image.src = UNCHECKED_IMAGE_URL;
		spazi[i].appendChild(image);
	}
	
	for (const cella of celle){
		cella.addEventListener("click", seleziona);
	}
}
