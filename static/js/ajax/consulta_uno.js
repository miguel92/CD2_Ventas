    asignarEventoUno();
    function asignarEventoUno(){
    $(".consulta_uno").on("click",function(evt){
				evt.preventDefault();
                var fd = new FormData();
		        var pagina = $(this).attr("data-page");
                fd.append('pagina',pagina);

		        $.ajax({
		            url: '/consulta_uno',
		            type: 'post',
                    data: fd,
		            contentType: false,
		            processData: false,
		            success: function(response){
		                if(response != 0){
                            var obj = JSON.parse(response)
                            console.log(obj);

                            html = '<table class="table"><thead><tr><th scope="col">Id</th><th scope="col">Nombre Cliente</th><th scope="col">Segmento</th></tr></thead>';
                            html += '<tbody>';
                            for(var i = 0; i < obj.datos.length;i++){
                                html += '<tr><th scope="row">'+obj.datos[i].customerID+'</th><td>'+obj.datos[i].customerName+'</td><td>'+obj.datos[i].customerSegment+'</td></tr>';
                            }
                            html +='</tbody></table>';
                            html +='<nav aria-label="..."><ul class="pagination pagination-sm">';
                            if(parseInt(obj.cur_pagina) == 0){
                                html +='<li class="page-item disabled"><a class="page-link consulta_uno" href="#" tabindex="-1" data-page="'+(parseInt(obj.cur_pagina)-1)+'">Anterior</a></li>'
                            }else{
                                html +='<li class="page-item"><a class="page-link consulta_uno" href="#" tabindex="-1" data-page="'+(parseInt(obj.cur_pagina)-1)+'">Anterior</a></li>'
                            }
                            html +='<li class="page-item"><a class="page-link consulta_uno" href="#" tabindex="-1" data-page="'+(parseInt(obj.cur_pagina))+'">'+ (parseInt(obj.cur_pagina)+parseInt(1)) +'</a></li>';
                            html +='<li class="page-item"><a class="page-link consulta_uno" href="#" data-page="'+(parseInt(obj.cur_pagina)+parseInt(1))+'">'+(parseInt(obj.cur_pagina)+parseInt(2))+'</a></li>';
                            html +='<li class="page-item"><a class="page-link consulta_uno" href="#" data-page="'+(parseInt(obj.cur_pagina)+parseInt(2))+'">'+(parseInt(obj.cur_pagina)+parseInt(3))+'</a></li>';
                            if(parseInt(obj.cur_pagina) < parseInt(obj.max_pagina)){
                            html +='<li class="page-item"><a class="page-link consulta_uno" href="#" data-page="'+(parseInt(obj.cur_pagina)+1)+'">Siguiente</a></li>';
                            }else{
                                html +='<li class="page-item disabled"><a class="page-link consulta_uno" href="#" data-page="'+(parseInt(obj.cur_pagina)+1)+'">Siguiente</a></li>';
                            }
                            html +='</ul></nav>';
                            $('#contenido_consulta').html(html);
                            var actual = parseInt(obj.cur_pagina);
                            $("[data-page="+actual+"]").parent().addClass("active")
                            asignarEventoUno();
		                }else{
		                	alert("Error");
		                }
		            },
		        });
	    	})
    }