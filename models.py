from pymongo import MongoClient
from credentials import *
from bson.json_util import dumps
import json

client = MongoClient(servidor_url)


def select_all():
    filter = {}
    result = client['Tienda']['Ventas_Cleaned'].find(filter=filter).limit(10)

    return result

def listado_clientes(pagina):
    result = client['Tienda']['Ventas_Cleaned'].aggregate([
    {
        '$group': {
            '_id': {
                'Customer_ID': '$Customer_ID', 
                'Customer_name': '$Customer_Name', 
                'Customer_segment': '$Customer_Segment'
            }
        }
    }, {
        '$project': {
            '_id': 0, 
            'customerID': '$_id.Customer_ID', 
            'customerName': '$_id.Customer_name', 
            'customerSegment': '$_id.Customer_segment'
        }
    }, {
        '$sort': {
            'customerID':1
        }
    }, {
                '$skip': int(pagina)*25
            },
        {
            '$limit': 25
        }
    ])
    return result 

def listado_clientes_recomendador():
    result = client['Tienda']['Ventas_Cleaned'].aggregate([
    {
        '$group': {
            '_id': {
                'Customer_ID': '$Customer_ID', 
                'Customer_name': '$Customer_Name'
            }
        }
    }, {
        '$project': {
            '_id': 0, 
            'customerID': '$_id.Customer_ID', 
            'customerName': '$_id.Customer_name'
        }
    }, {
        '$sort': {
            'customerID':1
        }
    }
    ])
    return result 

def compras_categoria():
    result = client['Tienda']['Ventas_Cleaned'].aggregate([
    {
        '$group': {
            '_id': '$Category', 
            'Num_sales': {
                '$sum': 1
            }
        }
    }, {
        '$project': {
            '_id': 0, 
            'Category': '$_id', 
            'Num_sales': 1
        }
    }, {
        '$sort': {
            'Category': 1
        }
    }
    ])
    return result

def items_cliente_categoria():
    result = client['Tienda']['Ventas_Cleaned'].aggregate([
    {
        '$project': {
            'Category': 1, 
            'Customer_Name': 1, 
            'Item': 1, 
            'Customer_ID': 1
        }
    }, {
        '$group': {
            '_id': {
                'Customer_ID': '$Customer_ID', 
                'Category': '$Category'
            }, 
            'Items': {
                '$push': '$$ROOT'
            }
        }
    }
    ])
    return result 

def listado_productos_categoria():
    result = client['Tienda']['Ventas_Cleaned'].aggregate([
    {
        '$project': {
            'Category': 1, 
            'Item': 1
        }
    }, {
        '$group': {
            '_id': {
                'Category': '$Category'
            }, 
            'Items': {
                '$push': '$$ROOT'
            }
        }
    }
    ])
    return result

def listado_productos_departamento():
    result = client['Tienda']['Ventas_Cleaned'].aggregate([
    {
        '$project': {
            'Department': 1, 
            'Item': 1
        }
    }, {
        '$group': {
            '_id': {
                'Departament': '$Department'
            }, 
            'Items': {
                '$push': '$$ROOT'
            }
        }
    }
    ])
    return result

def productos_maxvendidos_categoria():
    result = client['Tienda']['Ventas_Cleaned'].aggregate([
    {
        '$match': {
            'Category': 'Storage & Organization'
        }
    }, {
        '$group': {
            '_id': {
                'Item': '$Item'
            }, 
            'number': {
                '$sum': 1
            }
        }
    }, {
        '$project': {
            '_id': 0, 
            'Item': '$_id.Item', 
            'number': 1
        }
    }, {
        '$sort': {
            'number': -1
        }
    }, {
        '$limit': 1
    }
    ])
    return result

def productos_maxvendidos_departamento():
    result = client['Tienda']['Ventas_Cleaned'].aggregate([
    {
        '$match': {
            'Department': 'Office Supplies'
        }
    }, {
        '$group': {
            '_id': {
                'Item': '$Item'
            }, 
            'number': {
                '$sum': 1
            }
        }
    }, {
        '$project': {
            '_id': 0, 
            'Item': '$_id.Item', 
            'number': 1
        }
    }, {
        '$sort': {
            'number': -1
        }
    }, {
        '$limit': 1
    }
    ])
    return result

def productos_maxcaros_categoria():
    result = client['Tienda']['Ventas_Cleaned'].aggregate([
    {
        '$group': {
            '_id': {
                'Category': '$Category'
            }, 
            'Items': {
                '$push': '$$ROOT'
            }
        }
    }, {
        '$sort': {
            'Items.Unit Price': -1
        }
    }
    ])
    return result

def productos_maxcaros_departamento():
    result = client['Tienda']['Ventas_Cleaned'].aggregate([
    {
        '$group': {
            '_id': {
                'Department': '$Department'
            }, 
            'Items': {
                '$push': '$$ROOT'
            }
        }
    }, {
        '$sort': {
            'Items.Unit Price': -1
        }
    }
    ])
    return result

def productos_maxvendidos_fecha():
    result = client['Tienda']['Ventas_Cleaned'].aggregate([
    {
        '$addFields': {
            'Fecha_ISO': {
                '$dateFromString': {
                    'dateString': '$Order_Date', 
                    'format': '%d/%m/%Y'
                }
            }
        }
    }, {
        '$match': {
            'Fecha_ISO': {
                '$gt': datetime(2011, 8, 11, 0, 0, 0, tzinfo=timezone.utc)
            }
        }
    }, {
        '$group': {
            '_id': {
                'Item': '$Item'
            }, 
            'number': {
                '$sum': 1
            }
        }
    }, {
        '$project': {
            '_id': 0, 
            'Item': '$_id.Item', 
            'number': 1
        }
    }, {
        '$sort': {
            'number': -1
        }
    }, {
        '$limit': 1
    }
    ])
    return result

def items_comprado_cliente_fecha():
    result = client['Tienda']['Ventas_Cleaned'].aggregate([
    {
        '$addFields': {
            'Fecha_ISO': {
                '$dateFromString': {
                    'dateString': '$Order_Date', 
                    'format': '%d/%m/%Y'
                }
            }
        }
    }, {
        '$match': {
            'Fecha_ISO': {
                '$gt': datetime(2011, 8, 11, 0, 0, 0, tzinfo=timezone.utc)
            }
        }
    }, {
        '$group': {
            '_id': {
                'Customer_ID': '$Customer_ID'
            }, 
            'Items': {
                '$push': '$$ROOT'
            }
        }
    }, {
        '$project': {
            '_id': 0, 
            'Customer_ID': '$_id.Customer_ID', 
            'Items': 1
        }
    }, {
        '$sort': {
            'Customer_ID': -1
        }
    }
    ])
    return result

def total_ventas_zona():
    result = client['Tienda']['Ventas_Cleaned'].aggregate([
    {
        '$group': {
            '_id': '$Country_Region', 
            'Num_sales': {
                '$sum': 1
            }
        }
    }, {
        '$project': {
            '_id': 0, 
            'Region': '$_id', 
            'Num_sales': 1
        }
    }, {
        '$sort': {
            'Num_sales': -1
        }
    }
    ])
    return result

def zona_max_compras():
    result = client['Tienda']['Ventas_Cleaned'].aggregate([
    {
        '$group': {
            '_id': '$Country_Region', 
            'Num_sales': {
                '$sum': 1
            }
        }
    }, {
        '$project': {
            '_id': 0, 
            'Region': '$_id', 
            'Num_sales': 1
        }
    }, {
        '$sort': {
            'Num_sales': -1
        }
    }, {
        '$limit': 3
    }
    ])
    return result     

def items_comprado_cliente_id(customerID):
    result = client['Tienda']['Ventas_Cleaned'].aggregate([{
        '$match': {
            'Customer_ID': int(customerID)
        }
    }, {
        '$group': {
            '_id': {
                'Customer_ID': '$Customer_ID'
            }, 
            'Items': {
                '$push': '$$ROOT'
            }
        }
    }, {
        '$project': {
            '_id': 0,  
            'Items': 1
        }
    }, {
        '$sort': {
            'Customer_ID': -1
        }
    }
    ])
    return result

def productos_categoria_recomendar(category, product):
    result = client['Tienda']['Ventas_Cleaned'].aggregate([
    {
        '$match': {
            'Category': category, 
            'Item': {
                '$ne': product
            }
        }
    }, {
        '$group': {
            '_id': '$Item'
        }
    },{
        '$project': {
            'Item': '$_id'
        }
    }, {
        '$limit': 5
    }
])
    return result

def get_nombre_by_id(customerID):
    filter={
    'Customer_ID': int(customerID)
    }
    project={
        'Customer_Name': 1
    }
    limit=1

    result = client['Tienda']['Ventas_Cleaned'].find(
    filter=filter,
    projection=project,
    limit=limit
    )
    list_cur = list(result)
    return list_cur