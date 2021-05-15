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
                                html +='<th scope="col">Customer_ID</th>';
                                html +='<th scope="col">Category</th>';
                                html +='<th scope="col">Items</th>';
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
                            }else if (obj.consulta == 3){
                                html +='<th scope="col">Category</th>';
                                html +='<th scope="col">Items</th>';
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
                                html +='<th scope="col">Departament</th>';
                                html +='<th scope="col">Items</th>';
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
                            }
                            else if (obj.consulta == 10){
                                html +='<th scope="col">Customer_ID</th>';
                                html +='<th scope="col">Items</th>';
                                html +='</tr></thead>';
                                html += '<tbody>';

                                for(var i = 0; i < obj.datos.length;i++){
                                        html += '<tr>'
                                        html += '<th scope="row">'+i+'</th>'
                                        html += '<td scope="row">'+obj.datos[i].Customer_ID+'</td>';
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

                if(consulta == 3){
                                var filtro = prompt("Introduce la categoria");
                                console.log(filtro);
                                fd.append('filtro', filtro);
                }else if(consulta == 4){
                                var filtro = prompt("Introduce el departamento");
                                console.log(filtro);
                                fd.append('filtro', filtro);
                }


                $.ajax({
		            url: '/consultas_filter',
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

                            if (obj.consulta == 3){
                                html +='<th scope="col">Category</th>';
                                html +='<th scope="col">Items</th>';
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
                                html +='<th scope="col">Departament</th>';
                                html +='<th scope="col">Items</th>';
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
                            $('#contenido_consulta').html(html);
                            var actual = parseInt(obj.cur_pagina);
                            $("[data-page="+actual+"]").parent().addClass("active")
                            asignarEvento();
		                }else{
		                	alert("Error");
		                }
		            },
		        });

    }) }