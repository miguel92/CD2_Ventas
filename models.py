import pymongo as pymongo
from credentials import *

client = MongoClient(servidor_url)
filter={}

result = client['Tienda']['Ventas_Cleaned'].find(filter=filter)



