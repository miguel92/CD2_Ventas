from models import *


def buscar_todos():
    datos = select_all()
    return datos

def listado_clients(pagina):
    datos = listado_clientes(pagina)
    return datos

def compras_por_categoria():
    datos = compras_categoria()
    return datos

def items_cliente_por_categoria():
    datos = items_cliente_categoria()
    return datos

def listado_productos_por_categoria():
    datos = listado_productos_categoria()
    return datos
    
def listado_productos_por_departamento():
    datos = listado_productos_departamento()
    return datos

def productos_maxvendidos_por_categoria():
    datos = productos_maxvendidos_categoria()
    return datos

def productos_maxvendidos_por_departamento():
    datos = productos_maxvendidos_departamento()
    return datos

def productos_maxcaros_por_categoria():
    datos = productos_maxcaros_categoria()
    return datos

def productos_maxcaros_por_departamento():
    datos = productos_maxcaros_departamento()
    return datos

def productos_maxvendidos_por_fecha():
    datos = productos_maxvendidos_fecha()
    return datos

def items_comprado_cliente_por_fecha():
    datos = items_comprado_cliente_fecha()
    return datos

def total_ventas_por_zona():
    datos = total_ventas_zona()
    return datos