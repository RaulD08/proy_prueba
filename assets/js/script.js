$(document).ready(function () {

    // Botón del navbar izquierdo
    $("#boton1").click(function(){
        if ($("#navIzq").hasClass("expand")) {
            $("#navIzq").removeClass("expand");
        } else {
            $("#navIzq").addClass("expand");
        }

        if ($(".latDer").hasClass("expand")) {
            $(".latDer").removeClass("expand");
        } else {
            $(".latDer").addClass("expand");
        }
        
    })
    $("#navIzq").mouseleave(function () { 
        $("#navIzq").removeClass("expand");
        $(".latDer").removeClass("expand");
    });

    // Carga las tarjetas en el div2
    $.getJSON("assets/docs/datos.json", function(data) {
        
        var contenedor = document.querySelector("#contTarjetas")
        for (let item of data.personajes) {
            // obtiene el index del personaje para asignarlo como id oculto en la tarjeta
            let index = data.personajes.indexOf(item);
            contenedor.innerHTML+=`
            
            <div class="tarjeta ${(item.element)} ${(item.weapon)}">
                <div class="contImg ${(item.element).toLowerCase()}">
                    <img src="${item.icon}" alt="" class="imgTarjeta">
                </div>
                <div class="cuerpoTarjeta">
                    <div class="nombreTarjeta">${item.name}</div>
                </div>

                <div style="display: none;" id="idPj">${index}</div>

            </div>

            `
        }

        // Abre el overlay y muestra la tarjeta clickeada

        $(".tarjeta").click(function () { 
            console.log("prueba")
            $(".overlay").fadeIn(300);
            $(".overlay").css("display","block")
            $(".contGen").css("filter","blur(3px)")

            // obtiene el id asignado para consultar los datos al .json
            let indexPj = $(this).find('#idPj').html();
            console.log(indexPj)

            let pjSel = data.personajes[indexPj]
            console.log(pjSel)

            $("#overlayTarjeta").html(`

            <div class="tarjeta activa">
                <div class="tarjetaDiv1">
                    <div class="contImg ${(pjSel.element).toLowerCase()} contImgActiva">
                        <img src="${pjSel.icon}" alt="" class="imgTarjeta imgTarjetaActiva">
                    </div>
                    <div class="cuerpoTarjeta">
                        <div class="nombreTarjeta nombreTarjetaActiva">${pjSel.name}</div>
                    </div>
                </div>
                <div class="tarjetaDiv2">
                    <div class="ulCont">
                        <ul>
                        <li class="liItem">Elemento: ${pjSel.element}</li>
                        <li class="liItem">Arma: ${pjSel.weapon}</li>
                        <li class="liItem">Rareza: ${pjSel.rarity}</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            `)
        });
    
        // cierra el overlay al hacer click sobre él
        $(".overlayBoton").click(function(){
            $(".overlay").css("display","none")
            $(".contGen").css("filter","none")
        })


    })

    // search-box
    $('#search-box').keyup(function() {
        var searchValue = $(this).val().toLowerCase();
        $('#contTarjetas .tarjeta').filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(searchValue) > -1);
        });
      });  

    $('#search-box').val('');

      // usar esto para la tarjeta en el overlay
    var htmlHijo = $('.tarjeta').find('.contImg').attr("class");
    console.log(htmlHijo);

    // lista filtro
    $('.category-list li').on('click', function() {
        var category = $(this).data('category');
        
        if (category === 'all') {
            $('.tarjeta').fadeIn(500);
        } else {
            $('.tarjeta').hide();
            $('.tarjeta.' + category).fadeIn(500);  // reemplazado el .show() original por fadeIn()
        }
      });
      


});




/* 

probar hacer este toggle en el navbar:

$('#toggle').click(function() {
  $('.navbar').toggleClass('collapsed');
});

*/