
from flask import Flask, render_template, request, redirect, url_for, session
from views import *


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
    datos = buscar_todos()
    return render_template('todos.html', datos=datos)      


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
