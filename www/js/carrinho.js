var localCarrinho = localStorage.getItem('carrinho');

if(localCarrinho){
    var carrinho = JSON.parse(localCarrinho);
    if(carrinho.length > 0){
        //tem itens no carrinho 
        //renderizar o carrinho 
        renderizarCarrinho();
        //somar totais dos produtos 
        calcularTotal();


    }else{
        //mostrar carrinho vazio
    }
} else {
    //mostrar carrinho vazio 
    carrinhoVazio();
}

function renderizarCarrinho(){
    //Esvaziar a area dos itens
    $("#listaCarrinho").empty();

    //Percorer o carrinho e alimentar a area 

    $.each(carrinho, function(index, itemCarrinho){
        var itemDiv = `
        <div class="item-carrinho" data-index""${index}>
            <div class="area-img">
                <img src="${itemCarrinho.item.imagem}">
            </div>
            <div class="area-details">
                <div class="sup">
                    <span class="name-prod">
                    ${itemCarrinho.item.nome}
                    </span>
                    <a data-index="${index}" class="delete-item" href="#">
                        <i class="mdi mdi-close"></i>
                    </a>
                </div>
                <div class="middle">
                    <span>${itemCarrinho.item.principal_caracteristica}</span>
                </div>
                <div class="preco-quantidade">
                    <span>${itemCarrinho.item.preco_promocional.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL' })}</span>
                    <div class="count">
                        <a class="minus" data-index"${index}" href="#">-</a>
                        <input readonly class="qtd-item" type="text" value="${itemCarrinho.quantidade}">
                        <a class="plus" data-index"${index}" href="#">+</a>
                    </div>
                </div>
                </div>
        </div>
        
        `;

        $("#listaCarrinho").append(itemDiv);
    });

    $(".delete-item").on('click', function(){
         var index = $(this).data('index');
         app.dialog.confirm('Tem certeza que quer remover este item', 'Remover', function(){    

            carrinho.splice(index, 1);
            //atualizar o carrnho com o item removido 
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            //atualizar a pagina 
            app.views.main.router.refreshPage();
        });
    });

    $(".minus").on('click', function() {
        var index = $(this).data('index');
        if (index >= 0 && index < carrinho.length) {
            // Access carrinho[index] safely
            // Your logic here
        } else {
            console.error("Invalid index:", index);
        }
    });
    

   $(".plus").on('click', function(){

        var index = $(this).data('index');
        console.log('O indice é: ', index);

        //Se tem mais de um item na quantidade
        carrinho[index].quantidade++;
        carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        

    });

}

function calcularTotal(){
    var totalCarrinho = 0;
    $.each(carrinho, function(index, itemCarrinho){
        totalCarrinho += itemCarrinho.total_item;
    });
    //mostrar o toral 
    $("#subtotal").html(totalCarrinho.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL' }));
}

function carrinhoVazio(){
    console.log('carrinho esta vazio');

    //esvaziar lista do carrinho 

    $("#listaCarrinho").empty();

    //sumir os itens de baixo botão e totais 

    $("#toolbarTotais").addClass('display-none');
    $("#toolbarCheckout").addClass('display-none');

    //mostrar sacolinha vazua 

    $("#listaCarrinho").html(
        `<div class="text-align-center">
            <img width="300" src="img/empty.gif">

            <br><span class="color-gray">Nada por enquanto</span></br>
        </div>`
    )
}

$("#esvaziar").on('click', function(){
    app.dialog.confirm('Tem certeza que quer esvaziar o carrinho', '<strong>ESVAZIAR</strong>', function(){
        //apagar o localstorege do carrinho 

        localStorage.removeItem('carrinho');
        app.views.main.router.refreshPage();

    });
});

