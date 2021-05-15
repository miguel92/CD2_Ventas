    asignarEventoDos();
    function asignarEventoDos(){
    $(".consulta_dos").on("click",function(evt){
				evt.preventDefault();
                var fd = new FormData();
		        var pagina = $(this).attr("data-page");
                fd.append('pagina',pagina);

		        $.ajax({
		            url: '/consulta_dos',
		            type: 'post',
                    data: fd,
		            contentType: false,
		            processData: false,
		            success: function(response){
		                if(response != 0){
                            var obj = JSON.parse(response)
                            console.log(obj);

                            html = '<table class="table"><thead><tr><th scope="col">#</th><th scope="col">Categoria</th><th scope="col">Numero de ventas</th></thead>';
                            html += '<tbody>';
                            console.log(Object.keys(obj.datos[0]))
                            for(var i = 0; i < obj.datos.length;i++){
                                html += '<tr><th scope="row">'+i+'</th><td>'+obj.datos[i].Category+'</td><td>'+obj.datos[i].Num_sales+'</td></tr>';
                            }
                            html +='</tbody></table>';

                            if(obj.datos.length>25){
                                html +='<nav aria-label="..."><ul class="pagination pagination-sm">';
                                if(parseInt(obj.cur_pagina) == 0){
                                    html +='<li class="page-item disabled"><a class="page-link consulta_dos" href="#" tabindex="-1" data-page="'+(parseInt(obj.cur_pagina)-1)+'">Anterior</a></li>'
                                }else{
                                    html +='<li class="page-item"><a class="page-link consulta_dos" href="#" tabindex="-1" data-page="'+(parseInt(obj.cur_pagina)-1)+'">Anterior</a></li>'
                                }
                                html +='<li class="page-item"><a class="page-link consulta_dos" href="#" tabindex="-1" data-page="'+(parseInt(obj.cur_pagina))+'">'+ (parseInt(obj.cur_pagina)+parseInt(1)) +'</a></li>';
                                html +='<li class="page-item"><a class="page-link consulta_dos" href="#" data-page="'+(parseInt(obj.cur_pagina)+parseInt(1))+'">'+(parseInt(obj.cur_pagina)+parseInt(2))+'</a></li>';
                                html +='<li class="page-item"><a class="page-link consulta_dos" href="#" data-page="'+(parseInt(obj.cur_pagina)+parseInt(2))+'">'+(parseInt(obj.cur_pagina)+parseInt(3))+'</a></li>';
                                if(parseInt(obj.cur_pagina) < parseInt(obj.max_pagina)){
                                html +='<li class="page-item"><a class="page-link consulta_dos" href="#" data-page="'+(parseInt(obj.cur_pagina)+1)+'">Siguiente</a></li>';
                                }else{
                                    html +='<li class="page-item disabled"><a class="page-link consulta_dos" href="#" data-page="'+(parseInt(obj.cur_pagina)+1)+'">Siguiente</a></li>';
                                }
                                html +='</ul></nav>';
                            }
                            $('#contenido_consulta').html(html);
                            var actual = parseInt(obj.cur_pagina);
                            $("[data-page="+actual+"]").parent().addClass("active")
                            asignarEventoDos();
		                }else{
		                	alert("Error");
		                }
		            },
		        });
	    	})
    }