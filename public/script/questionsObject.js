/* let questoes = [
    {
        pergunta: "Quantos estados tem o Brasil?",
        alternativas: [
            { a: '26' },
            { b: '25' },
            { c: '24' },
            { d: '23' }
        ],
        alternCorreta: 'a'
    }
]; */
let questoes = [];
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

exports = questoes;