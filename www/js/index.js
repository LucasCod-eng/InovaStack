fetch('js/backend.json')
.then(response => response.json())
.then(data=> {
    //Slavar os dados vindo do backend localmente 
    //vmaos Utilizar localstorage
    localStorage.setItem('produtos', JSON.stringify(data));
    console.log('dados do produto');
    
    //Simular carregamento online
    setTimeout(() =>{

        //esvaziar a área de produtos 
        $("#produtos").empty();


        data.forEach(produto =>{
            var produtoHTML = `
            <div class="item-card">
                <a data-id="${produto.id}" href="#" class="item">
                    <div class="img-container">
                        <img src="${produto.imagem}">
                    </div>
                    <div class="nome-rating">
                        <span class="color-gray">Air Pod</span>
                        <span class="bold margin-right">
                            <i class="mdi mdi-star"></i>
                            4.8
                        </span>
                    </div>
                    <div class="price ">${produto.preco_promocional.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL' })}</div>
                </a>  
            </div> 
            `; 

        $("#produtos").append(produtoHTML);
    });

    $(".item").on('click', function(){
        var id = $(this).attr('data-id');
        localStorage.setItem('detalhe', id);
        app.views.main.router.navigate('/detalhes/');
    });

    },1600);

    
})
.catch(error => console.error('Erro ao fazer fetch dos dados: ' +error));

// Ver quantos itens tem dentro do carrinho

setTimeout(() =>{
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // alimentar o contador da sacola

    $('.btn-cart').attr('data-count', carrinho.length);
},300);