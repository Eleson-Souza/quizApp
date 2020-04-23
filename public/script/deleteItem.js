function confirmarDelecaoPergunta(event, form) {
    var result = confirm('Você realmente deseja excluir essa pergunta?');
    if(result == true) {
        form.submit();
    } else {
        event.preventDefault();
    }
}

function confirmarDelecaoCategoria(event, form) {
    var result = confirm('Você realmente deseja excluir essa categoria?');
    if(result == true) {
        form.submit();
    } else {
        event.preventDefault();
    }
}