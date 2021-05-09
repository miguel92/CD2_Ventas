from pymongo import MongoClient
from credentials import *

client = MongoClient(servidor_url)


def select_all():
    filter = {}
    result = client['Tienda']['Ventas_Cleaned'].find(filter=filter).limit(10)

    return result

