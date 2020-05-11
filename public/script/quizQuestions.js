if(!localStorage.quantAcertos) {
    localStorage.quantAcertos = 0;
}

const questionA = document.getElementById('alt_a');
const questionB = document.getElementById('alt_b');
const questionC = document.getElementById('alt_c');
const questionD = document.getElementById('alt_d');
const questionCorreta = document.getElementById('altCorreta').value;
const questionAtual = Number(document.getElementById('questaoAtual').value);

if(questionAtual == 1) {
    localStorage.quantAcertos = 0;
}

// Esta função verifica se a opção escolhida está correta e faz as devidas formatações de estilo.
function escolherOpcao(element, alternEscolhida) {
    if(alternEscolhida == questionCorreta) {
        element.classList.add('correta');
        localStorage.quantAcertos = parseInt(localStorage.quantAcertos) + 1;
    } else {
        element.classList.add('errada');
    }
    desabilitarCampos(questionCorreta);
    document.getElementById('acertos').value = localStorage.quantAcertos;
}

// Desabilitando os campos e colorindo campo da resposta correta.
function desabilitarCampos(altCorreta) {
    switch(altCorreta) {
        case 'A':
            questionA.classList.add('correta');
            questionB.classList.add('desabilita-campo');
            questionC.classList.add('desabilita-campo');
            questionD.classList.add('desabilita-campo');
            break;
        case 'B':
            questionA.classList.add('desabilita-campo');
            questionB.classList.add('correta');
            questionC.classList.add('desabilita-campo');
            questionD.classList.add('desabilita-campo');
            break;
        case 'C':
            questionA.classList.add('desabilita-campo');
            questionB.classList.add('desabilita-campo');
            questionC.classList.add('correta');
            questionD.classList.add('desabilita-campo');
            break;
        case 'D':
            questionA.classList.add('desabilita-campo');
            questionB.classList.add('desabilita-campo');
            questionC.classList.add('desabilita-campo');
            questionD.classList.add('correta');
            break;
    }
}