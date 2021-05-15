from models import *


def buscar_todos():
    datos = select_all()
    return datos

def listado_clients(pagina):
    datos = listado_clientes(pagina)
    return datos

def listado_clients_recomendador():
    datos = listado_clientes_recomendador()
    return datos    

def compras_por_categoria(pagina):
    datos = compras_categoria(pagina)
    return datos

def items_cliente_por_categoria(pagina):
    datos = items_cliente_categoria(pagina)
    return datos

def listado_productos_por_categoria(pagina):
    datos = listado_productos_categoria(pagina)
    return datos
    
def listado_productos_por_departamento(pagina):
    datos = listado_productos_departamento(pagina)
    return datos

def productos_maxvendidos_por_categoria(pagina):
    datos = productos_maxvendidos_categoria(pagina)
    return datos

def productos_maxvendidos_por_departamento(pagina):
    datos = productos_maxvendidos_departamento(pagina)
    return datos

def productos_maxcaros_por_categoria(pagina):
    datos = productos_maxcaros_categoria(pagina)
    return datos

def productos_maxcaros_por_departamento(pagina):
    datos = productos_maxcaros_departamento(pagina)
    return datos

def productos_maxvendidos_por_fecha(pagina):
    datos = productos_maxvendidos_fecha(pagina)
    return datos

def items_comprado_cliente_por_fecha(pagina):
    datos = items_comprado_cliente_fecha(pagina)
    return datos

def total_ventas_por_zona(pagina):
    datos = total_ventas_zona(pagina)
    return datos

def items_comprado_cliente_por_id(customerID):
    datos = items_comprado_cliente_id(customerID)
    return datos

def productos_categoria_recomendar_cliente(category, product):
    datos = productos_categoria_recomendar(category, product)
    return datos

def get_name_by_id(customerID):
    datos = get_nombre_by_id(customerID)
    return datos

def zona_max_compra(pagina):
    datos = zona_max_compras(pagina)
    return datos


def lista_consulta(consulta, pagina, filtro = None):
    consulta = int(consulta)
    if consulta == 0: # Listado Clientes
        return listado_clients(pagina)
    elif consulta == 1: # Compras por categoria
        return compras_por_categoria(pagina)
    elif consulta == 2:
        return items_cliente_por_categoria(pagina)
    elif consulta == 3:
        return listado_productos_categoria(pagina, filtro)
    elif consulta == 4:
        return listado_productos_departamento(pagina,filtro)
    elif consulta == 5:
        return productos_maxvendidos_categoria(pagina,filtro)
    elif consulta == 6:
        return productos_maxvendidos_departamento(pagina,filtro)
    elif consulta == 7:
        return productos_maxcaros_categoria(pagina)
    elif consulta == 8:
        return productos_maxcaros_departamento(pagina)
    elif consulta == 9:
        return productos_maxvendidos_fecha(pagina)
    elif consulta == 10:
        return items_comprado_cliente_fecha(pagina)
    elif consulta == 11:
        return total_ventas_por_zona(pagina)
    elif consulta == 12: # Total de ventas por zona
        return zona_max_compras(pagina)

