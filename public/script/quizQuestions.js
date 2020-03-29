let questoes = [];
// Função Factory - Fabrica um objeto. Objeto este, com a pergunta, as alternativas e a questão correta.
// Objetos sendo inseridos em um array/vetor.
function gerarPergunta(pergunta, questA, questB, questC, questD, questCerta) {
    questoes.push({
        pergunta: pergunta,
        alternativas: {
            a: questA,
            b: questB,
            c: questC,
            d: questD  
        },
        alternCorreta: questCerta
    });
}

// Criação dos objetos
gerarPergunta(
    'Quantos Estados tem o Brasil?', 
    '20', 
    '23', 
    '26', 
    '30', 
    'c'
);
gerarPergunta(
    'Qual é a capital da Bahia?', 
    'Brasília', 
    'Belo Horizonte', 
    'Vitória da Conquista', 
    'Salvador', 
    'd'
);
gerarPergunta(
    'Qual o maior animal do mundo?', 
    'Elefante', 
    'Girafa', 
    'Hipopótamo', 
    'Baleia', 
    'd'
);
gerarPergunta(
    'Qual é o maior rio do Brasil?', 
    'Rio São Francisco', 
    'Rio Amazonas', 
    'Rio Tietê', 
    'Rio Branco', 
    'b'
);
gerarPergunta(
    'Qual é a maior e mais populosa cidade do Brasil?', 
    'Rio de Janeiro', 
    'São Paulo', 
    'Salvador', 
    'Belo Horizonte', 
    'b'
);

// FOR IN
/* for(let i in questoes) {
    console.log(questoes[i].pergunta);
} */

// FOR EACH
/* const perg = questoes.forEach((p) => {
    console.log(p.pergunta);
}); */

const idUsuario = document.getElementById('idUsuario').value;
const pergunta = document.getElementById('pergunta');
const altA = document.getElementById('alt_a');
const altB = document.getElementById('alt_b');
const altC = document.getElementById('alt_c');
const altD = document.getElementById('alt_d');
// Inicializando o quiz de perguntas
const cardPrincipal = document.querySelector('.card-principal').style;
const btnProximo = document.querySelector('.btn-proximo').style;
const btnInicio = document.querySelector('.btn-iniciar').style;

// Essa função passa para a próxima pergunta, pegando um novo objeto do array de perguntas e mandando para o frontend.
let cont = -1, quantAcertos = 0;

function definirDisplay(element, valor) {
    element.display = valor;
}

function proxima() {
    //console.log(`cont = ${cont} | array = ${questoes.length}`);
    let quantQuestoes = questoes.length;
    if(cont == quantQuestoes - 1) {
        window.location.href = `/resultado/${idUsuario}/${quantAcertos}/${quantQuestoes}`;
    } else {
        limpar();
        cont++;

        pergunta.innerText = `${cont + 1}. ${questoes[cont].pergunta}`;
        altA.innerText = questoes[cont].alternativas.a;
        altB.innerText = questoes[cont].alternativas.b;
        altC.innerText = questoes[cont].alternativas.c;
        altD.innerText = questoes[cont].alternativas.d;
    }
}

function iniciarQuiz() {
    cardPrincipal.display = 'block';
    btnProximo.display = 'block';
    proxima();
}

const questionA = document.getElementsByClassName('option-question-a')[0];
const questionB = document.getElementsByClassName('option-question-b')[0];
const questionC = document.getElementsByClassName('option-question-c')[0];
const questionD = document.getElementsByClassName('option-question-d')[0];

// Esta função verifica se a opção escolhida está correta e faz as devidas formatações de estilo.
function escolherOpcao(element, alternEscolhida) {
    console.log(questoes[cont]);
    console.log(cont);
    let alternCorreta = questoes[cont].alternCorreta;
    if(alternEscolhida == alternCorreta) {
        element.classList.add('correta');
        quantAcertos++;
        desabilitarCampos(alternCorreta);
    } else {
        element.classList.add('errada');
        desabilitarCampos(alternCorreta);
    }
}

// Desabilitando os campos e colorindo campo da resposta correta.
function desabilitarCampos(altCorreta) {
    switch(altCorreta) {
        case 'a':
            questionA.classList.add('correta');
            questionB.classList.add('desabilita-campo');
            questionC.classList.add('desabilita-campo');
            questionD.classList.add('desabilita-campo');
            break;
        case 'b':
            questionA.classList.add('desabilita-campo');
            questionB.classList.add('correta');
            questionC.classList.add('desabilita-campo');
            questionD.classList.add('desabilita-campo');
            break;
        case 'c':
            questionA.classList.add('desabilita-campo');
            questionB.classList.add('desabilita-campo');
            questionC.classList.add('correta');
            questionD.classList.add('desabilita-campo');
            break;
        case 'd':
            questionA.classList.add('desabilita-campo');
            questionB.classList.add('desabilita-campo');
            questionC.classList.add('desabilita-campo');
            questionD.classList.add('correta');
            break;
    }
}

// Limpa as formatações, removendo as classes, para passar para a próxima pergunta.
function limpar() {
    questionA.classList.remove('desabilita-campo', 'correta', 'errada');
    questionB.classList.remove('desabilita-campo', 'correta', 'errada');
    questionC.classList.remove('desabilita-campo', 'correta', 'errada');
    questionD.classList.remove('desabilita-campo', 'correta', 'errada');
}