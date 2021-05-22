    asignarEvento();
    function asignarEvento(){
    $(".consulta").on("click",function(evt){
				evt.preventDefault();
                var fd = new FormData();
		        var pagina = $(this).attr("data-page");
		        var consulta = $(this).attr("data-consulta");
                fd.append('pagina',pagina);
                fd.append('consulta',consulta);

		        $.ajax({
		            url: '/consultas',
		            type: 'post',
                    data: fd,
		            contentType: false,
		            processData: false,
		            success: function(response){
		                if(response != 0){
		                console.log(response)
                            var obj = JSON.parse(response)
                            console.log(obj);
                            html = '<table class="table"><thead><tr>';
                            html += '<th scope="row">#</th>'

                            if (obj.consulta == 2){
                                html +='<th scope="col">ID_cliente</th>';
                                html +='<th scope="col">Categoria</th>';
                                html +='<th scope="col">Productos</th>';
                                html +='</tr></thead>';
                                html += '<tbody>';

                                for(var i = 0; i < obj.datos.length;i++){
                                        html += '<tr>'
                                        html += '<th scope="row">'+i+'</th>'
                                        html += '<td scope="row">'+obj.datos[i]._id.Customer_ID+'</td>';
                                        html += '<td scope="row">'+obj.datos[i]._id.Category+'</td>';
                                        html +='<td><ul>';
                                        for(var j = 0; j < obj.datos[i].Items.length;j++){
                                            html += '<li>' +obj.datos[i].Items[j].Item + ' </li>';
                                        }
                                        html +='</ul></td>'
                                        html +='</tr>'
                                }
                            }                            
                            else{
                                for(var i = 0; i < Object.keys(obj.datos[0]).length;i++){
                                    html +='<th scope="col">'+Object.keys(obj.datos[0])[i]+'</th>';
                                }
                                html +='</tr></thead>';
                                html += '<tbody>';

                                for(var i = 0; i < obj.datos.length;i++){
                                        html += '<tr>'
                                        html += '<th scope="row">'+i+'</th>'
                                        for (let [key, value] of Object.entries(obj.datos[i])) {
                                            html += '<td scope="row">'+value+'</td>';
                                        }
                                        html +='</tr>'
                                }
                            }

                            html +='</tbody></table>';
                            html +='<nav aria-label="..."><ul class="pagination pagination-sm">';
                            if(obj.datos.length > 24){
                                if(parseInt(obj.cur_pagina) == 0){
                                    html +='<li class="page-item disabled"><a class="page-link consulta" href="#" tabindex="-1" data-consulta="'+ obj.consulta+'" data-page="'+(parseInt(obj.cur_pagina)-1)+'">Anterior</a></li>'
                                }else{
                                    html +='<li class="page-item"><a class="page-link consulta" href="#" tabindex="-1" data-consulta="'+ obj.consulta+'" data-page="'+(parseInt(obj.cur_pagina)-1)+'">Anterior</a></li>'
                                }
                                html +='<li class="page-item"><a class="page-link consulta" href="#" tabindex="-1" data-consulta="'+ obj.consulta+'" data-page="'+(parseInt(obj.cur_pagina))+'">'+ (parseInt(obj.cur_pagina)+parseInt(1)) +'</a></li>';
                                html +='<li class="page-item"><a class="page-link consulta" href="#" data-consulta="'+ obj.consulta+'" data-page="'+(parseInt(obj.cur_pagina)+parseInt(1))+'">'+(parseInt(obj.cur_pagina)+parseInt(2))+'</a></li>';
                                html +='<li class="page-item"><a class="page-link consulta" href="#" data-consulta="'+ obj.consulta+'" data-page="'+(parseInt(obj.cur_pagina)+parseInt(2))+'">'+(parseInt(obj.cur_pagina)+parseInt(3))+'</a></li>';
                                if(parseInt(obj.cur_pagina) < parseInt(obj.max_pagina)){
                                html +='<li class="page-item"><a class="page-link consulta" href="#" data-consulta="'+ obj.consulta+'" data-page="'+(parseInt(obj.cur_pagina)+1)+'">Siguiente</a></li>';
                                }else{
                                    html +='<li class="page-item disabled"><a class="page-link consulta" href="#" data-consulta="'+ obj.consulta+'" data-page="'+(parseInt(obj.cur_pagina)+1)+'">Siguiente</a></li>';
                                }
                                html +='</ul></nav>';
                            }
                            $('#contenido_consulta').html(html);
                            var actual = parseInt(obj.cur_pagina);
                            $("[data-page="+actual+"]").parent().addClass("active")
                            asignarEvento();
		                }else{
		                	alert("Error");
		                }
		            },
		        });
	    	})
    }
    asignarEventoFilter();
    function asignarEventoFilter(){
    $(".consulta_filter").on("click",function(evt){
    		    evt.preventDefault();
                var fd = new FormData();
		        var pagina = $(this).attr("data-page");
		        var consulta = $(this).attr("data-consulta");
                fd.append('pagina',pagina);
                fd.append('consulta',consulta);
                var filtro = $('#filtro').val();
                var filtro2 = ""

                if (consulta == 9 || consulta == 10){
                    filtro2 = $('#filtro2').val();
                }

                fd.append('filtro', filtro);
                fd.append('filtro2', filtro2);

                $.ajax({
		            url: '/consultas_filter',
		            type: 'post',
                    data: fd,
		            contentType: false,
		            processData: false,
		            success: function(response){
		                if(response != 0){
                            var obj = JSON.parse(response)
                            console.log(obj);

                            html = '<table class="table"><thead><tr>';
                            html += '<th scope="row">#</th>'

                            if (obj.consulta == 3){
                                html +='<th scope="col">Categoria</th>';
                                html +='<th scope="col">Productos</th>';
                                html +='</tr></thead>';
                                html += '<tbody>';

                                for(var i = 0; i < obj.datos.length;i++){
                                        html += '<tr>'
                                        html += '<th scope="row">'+i+'</th>'
                                        html += '<td scope="row">'+obj.datos[i]._id.Category+'</td>';
                                        html +='<td><ul>';
                                        for(var j = 0; j < obj.datos[i].Items.length;j++){
                                            html += '<li>' +obj.datos[i].Items[j].Item + ' </li>';
                                        }
                                        html +='</ul></td>'
                                        html +='</tr>'
                                }
                            }
                            else if (obj.consulta == 4){
                                html +='<th scope="col">Departamento</th>';
                                html +='<th scope="col">Productos</th>';
                                html +='</tr></thead>';
                                html += '<tbody>';

                                for(var i = 0; i < obj.datos.length;i++){
                                        html += '<tr>'
                                        html += '<th scope="row">'+i+'</th>'
                                        html += '<td scope="row">'+obj.datos[i]._id.Departament+'</td>';
                                        html +='<td><ul>';
                                        for(var j = 0; j < obj.datos[i].Items.length;j++){
                                            html += '<li>' +obj.datos[i].Items[j].Item + ' </li>';
                                        }
                                        html +='</ul></td>'
                                        html +='</tr>'
                                }
                            }else if (obj.consulta == 6){
                                html +='<th scope="col">Numero Ventas</th>';
                                html +='<th scope="col">Departamento</th>';
                                html +='<th scope="col">Producto</th>';
                                html +='</tr></thead>';
                                html += '<tbody>';

                                for(var i = 0; i < obj.datos.length;i++){
                                        html += '<tr>'
                                        html += '<th scope="row">'+i+'</th>'
                                        html += '<th scope="row">'+obj.datos[i].num_ventas+'</th>'
                                        html += '<td scope="row">'+obj.datos[i].Departamento+'</td>';
                                        html +='<td><ul>';
                                        html += '<li>' +obj.datos[i].Item + ' </li>';
                                        html +='</ul></td>'
                                        html +='</tr>'
                                }
                            }else if (obj.consulta == 5){
                                html +='<th scope="col">Numero Ventas</th>';
                                html +='<th scope="col">Categoria</th>';
                                html +='<th scope="col">Producto</th>';
                                html +='</tr></thead>';
                                html += '<tbody>';

                                for(var i = 0; i < obj.datos.length;i++){
                                        html += '<tr>'
                                        html += '<th scope="row">'+i+'</th>'
                                        html += '<th scope="row">'+obj.datos[i].num_ventas+'</th>'
                                        html += '<td scope="row">'+obj.datos[i].Categoria+'</td>';
                                        html +='<td><ul>';
                                        html += '<li>' +obj.datos[i].Item + ' </li>';
                                        html +='</ul></td>'
                                        html +='</tr>'
                                }
                            }
                            else if (obj.consulta == 9){
                                html +='<th scope="col">Numero Ventas</th>';
                                html +='<th scope="col">Producto</th>';
                                html +='</tr></thead>';
                                html += '<tbody>';

                                for(var i = 0; i < obj.datos.length;i++){
                                        html += '<tr>'
                                        html += '<th scope="row">'+i+'</th>'
                                        html += '<th scope="row">'+obj.datos[i].number+'</th>'
                                        html += '<td scope="row">'+obj.datos[i].Item+'</td>';
                                        html +='</tr>'
                                }
                            }else if (obj.consulta == 10){
                                html +='<th scope="col">ID Cliente</th>';
                                html +='<th scope="col">Productos</th>';
                                html +='</tr></thead>';
                                html += '<tbody>';

                                for(var i = 0; i < obj.datos.length;i++){
                                        html += '<tr>'
                                        html += '<th scope="row">'+i+'</th>'
                                        html += '<th scope="row">'+obj.datos[i].Customer_ID+'</th>'
                                        html +='<td><ul>';
                                        for(var j = 0; j < obj.datos[i].Items.length;j++){
                                            html += '<li>' +obj.datos[i].Items[j].Item + ' </li>';
                                        }
                                        html +='</ul></td>'
                                        html +='</tr>'
                                }
                            }


                            html +='</tbody></table>';
                            html +='<nav aria-label="..."><ul class="pagination pagination-sm">';
                            if(obj.datos.length > 24){
                                if(parseInt(obj.cur_pagina) == 0){
                                    html +='<li class="page-item disabled"><a class="page-link consulta_filter" href="#" tabindex="-1" data-consulta="'+ obj.consulta+'" data-page="'+(parseInt(obj.cur_pagina)-1)+'">Anterior</a></li>'
                                }else{
                                    html +='<li class="page-item"><a class="page-link consulta_filter" href="#" tabindex="-1" data-consulta="'+ obj.consulta+'" data-page="'+(parseInt(obj.cur_pagina)-1)+'">Anterior</a></li>'
                                }
                                html +='<li class="page-item"><a class="page-link consulta_filter" href="#" tabindex="-1" data-consulta="'+ obj.consulta+'" data-page="'+(parseInt(obj.cur_pagina))+'">'+ (parseInt(obj.cur_pagina)+parseInt(1)) +'</a></li>';
                                html +='<li class="page-item"><a class="page-link consulta_filter" href="#" data-consulta="'+ obj.consulta+'" data-page="'+(parseInt(obj.cur_pagina)+parseInt(1))+'">'+(parseInt(obj.cur_pagina)+parseInt(2))+'</a></li>';
                                html +='<li class="page-item"><a class="page-link consulta_filter" href="#" data-consulta="'+ obj.consulta+'" data-page="'+(parseInt(obj.cur_pagina)+parseInt(2))+'">'+(parseInt(obj.cur_pagina)+parseInt(3))+'</a></li>';
                                if(parseInt(obj.cur_pagina) < parseInt(obj.max_pagina)){
                                html +='<li class="page-item"><a class="page-link consulta_filter" href="#" data-consulta="'+ obj.consulta+'" data-page="'+(parseInt(obj.cur_pagina)+1)+'">Siguiente</a></li>';
                                }else{
                                    html +='<li class="page-item disabled"><a class="page-link consulta_filter" href="#" data-consulta="'+ obj.consulta+'" data-page="'+(parseInt(obj.cur_pagina)+1)+'">Siguiente</a></li>';
                                }
                                html +='</ul></nav>';
                            }
                            $('#contenido_consulta_filter').html(html);
                            var actual = parseInt(obj.cur_pagina);
                            $("[data-page="+actual+"]").parent().addClass("active")
                            asignarEvento();
		                }else{
		                	alert("Error");
		                }
		            },
		        });

    }) }

    function eventoFormulario (){$('.consulta_filter_pre').click(function(evt){
        evt.preventDefault();
        var consulta = $(this).attr('data-consulta')
        var fd = new FormData();
        fd.append('consulta',consulta);

        $.ajax({
		            url: '/info_select',
		            type: 'post',
		            data: fd,
		            contentType: false,
		            processData: false,
		            success: function(response){
                        var obj = JSON.parse(response);
                        console.log(obj);

                                var html = "<form>"
                                html +='<div class="row">'

                                if (consulta == 10 || consulta == 9){
                                    html += '<div class="col-lg-5">'
                                    html +='    <input id="filtro2" class="form-control" type="date" value="" id="example-datetime-local-input">'
                                    html +='</div>'
                                }

                                if(consulta != 9 && consulta != 10){
                                    html +='<div class="col-lg-5">'
                                    html +=' <select id="filtro" class="form-select" aria-label=".form-select-sm example">'
                                    for(var i = 0; i < obj.datos.length;  i++){
                                    html +='<option>'+obj.datos[i]._id+'</option>'
                                    }
                                    html +='</select>'
                                    html +='</div>'
                                }else{
                                    html +='<div class="col-lg-5">'
                                    html +=' <select id="filtro" class="form-select" aria-label=".form-select-sm example">'
                                    for(var i = 0; i < obj.datos.length;  i++){
                                    html +='<option value="'+obj.datos[i]._id.Customer_ID+'">'+obj.datos[i]._id.Customer_Name+'</option>'
                                    }
                                    html +='</select>'
                                    html +='</div>'
                                }
                                html +='<div class="col-lg-2">'
                                html +='<input class="consulta_filter btn btn-info" data-consulta="'+consulta+'" data-page="0" type="submit" value="Lanzar">'
                                html +='</div>'
                                html += '</form>'
                                html +='</div>'
                                html += '<div id="contenido_consulta_filter"></div>'
                                $('#contenido_consulta').html(html);
                                asignarEventoFilter();
		            }
		            });


    })}

    eventoFormulario()