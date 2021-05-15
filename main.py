from bson import json_util
from flask import Flask, render_template, request, redirect, url_for, session
from views import *
import json
from bson.json_util import dumps


app = Flask(__name__, static_url_path='/static')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/todos')
def todos():
    datos = items_cliente_por_categoria()
    return render_template('todos.html', datos=datos)


@app.route('/consulta')
def consulta():
    #datos = buscar_todos()

    return render_template('ListaConsultas.html')


@app.route('/recomendador')
def recomendador():
    datos = listado_clients_recomendador()

    return render_template('recomendador.html', datos=datos)


@app.route('/seleccionar/customerID=<customerID>', methods=['POST', 'GET'])
def seleccionar(customerID):  
    productos = items_comprado_cliente_id(customerID)
    return render_template('productos.html', datos=productos)


@app.route('/recomendar/customerID=<customerID>/category=<Category>/product=<Item>', methods=['POST', 'GET'])
def recomendar(customerID, Category, Item):  
    productos = productos_categoria_recomendar_cliente(Category, Item)
    return render_template('recomendarLista.html', datos=productos)


@app.route('/consulta_uno', methods=['POST', 'GET'])
def consulta_uno():
    response = {"estado": False}

    if request.form:
        pagina = request.form['pagina']
        response = listado_clients(pagina)
        list_cur = list(response)
    obj = {"datos": list_cur,"cur_pagina":pagina, "max_pagina":672}
    response = json.dumps(obj)
    print(obj)
    return response


@app.route('/consulta_dos', methods=['POST', 'GET'])
def consulta_dos():
    response = {"estado": False}

    if request.form:
        pagina = request.form['pagina']
        response = compras_por_categoria(pagina)
        list_cur = list(response)
    obj = {"datos": list_cur,"cur_pagina":pagina, "max_pagina":672}
    response = json.dumps(obj)

    return response


@app.route('/consultas', methods=['POST', 'GET'])
def consultas():
    response = {"estado": False}

    if request.form:
        pagina = request.form['pagina']
        consulta = request.form['consulta']
        response = lista_consulta(consulta,pagina)
        list_cur = list(response)
    obj = {"datos": list_cur,"cur_pagina":pagina, "consulta": consulta, "max_pagina":672}
    response = json.dumps(obj, default=json_util.default)

    return response


@app.route('/consultas_filter', methods=['POST', 'GET'])
def consultas_filter():
    response = {"estado": False}

    if request.form:
        pagina = request.form['pagina']
        consulta = request.form['consulta']
        filtro = None

        filtro = request.form['filtro']
        filtro2 = request.form['filtro2']
        response = lista_consulta(consulta,pagina,filtro)
        list_cur = list(response)
    obj = {"datos": list_cur,"cur_pagina":pagina, "consulta": consulta, "max_pagina":672}
    response = json.dumps(obj, default=json_util.default)

    return response


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8090, debug=True)
