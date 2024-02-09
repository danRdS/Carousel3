const progress = document.getElementById('progress');
const indiceImagem = document.getElementById('indiceImagem');
let tempoDecorrido, inicioIntervalo, intervalo, contador = 0;

const calcularTempo = () => {
    const agora = new Date().getTime();
    tempoDecorrido = agora - inicioIntervalo;
    progress.value = tempoDecorrido;
}

function percorrerBarraMaisSlide() {
    clearInterval(intervalo);
    progress.value = 0;
    inicioIntervalo = new Date().getTime();
    setInterval(() => calcularTempo(), 1);
    intervalo = setInterval(() => verProximo(), 4000);
}

const areaInputs = document.querySelector('.area-inputs');
const fotos = document.querySelectorAll('img');
indiceImagem.textContent = `${contador + 1}/${fotos.length}`;

const mostrarSlides = () => {
    areaInputs.innerHTML = '';

    fotos.forEach((foto, indice) => {
        foto.style.transform = `translateX(-${contador * 100}%)`;
        indiceImagem.textContent = `${contador + 1}/${fotos.length}`;

        const inputRadio = document.createElement('input');
        inputRadio.type = 'radio';
        inputRadio.name = 'imagem';
        inputRadio.id = indice;

        inputRadio.addEventListener('click', () => {
            radioSelecionado(indice);
        });

        setTimeout(() => inputRadio.checked = indice === contador, 10);        
        areaInputs.appendChild(inputRadio);
    });
}

const verProximo = () => {
    const ultimoSlide = contador == fotos.length - 1;
    ultimoSlide ? contador = 0 : contador++;
    executarAcoesSlide();
}

const verAnterior = () => {    
    !contador ? contador = fotos.length - 1 : contador--;
    executarAcoesSlide();
}

const radioSelecionado = indice => {
    contador = indice;
    executarAcoesSlide();
}

const executarAcoesSlide = () => {
    mostrarSlides();
    percorrerBarraMaisSlide();
}
executarAcoesSlide();

// TEXTO ANIMADO
const palavras = ['linda', 'varoa valorosa', 'princesa', 'garota'];
let intervaloDigitar, intervaloApagar, indexCaractere, indexPalavras = 0;
const spanTexto = document.getElementById('texto');

function digitarTexto() {
    indexCaractere = 0;
    const texto = palavras[indexPalavras];
    spanTexto.classList.remove('aumentar-texto');
    
    intervaloDigitar = setInterval(() => {
        if(indexCaractere < texto.length) {
            spanTexto.innerText += texto.charAt(indexCaractere);
            indexCaractere++;
        } else {
            clearInterval(intervaloDigitar);
            let tempoParaApagar = 1000;
            tempoParaApagar = indexPalavras == 3 ? 3000 : 1000;
            indexPalavras == 3 ? spanTexto.classList.add('aumentar-texto') : null;
            setTimeout(() => {
                intervaloApagar = setInterval(() => {
                    if(indexCaractere >= 0) {
                        spanTexto.innerText = texto.slice(0, indexCaractere);
                        indexCaractere--;
                    } else {
                        clearInterval(intervaloApagar);
                        indexPalavras = (indexPalavras + 1) % palavras.length;
                        setTimeout(() => digitarTexto(), 500);
                    }
                }, 50);
            }, tempoParaApagar);
        }
    }, 100);
};
digitarTexto();