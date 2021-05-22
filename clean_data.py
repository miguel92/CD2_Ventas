from pymongo import MongoClient
import pandas as pd
from bson.json_util import dumps
from credentials import *

# Requires the PyMongo package.
# https://api.mongodb.com/python/current

client = MongoClient(servidor_url)
filter={}

result = client['Tienda']['Ventas'].find(filter=filter)
list_cur = list(result)
json_data = dumps(list_cur)

dataFrame = pd.read_json(json_data)

#Borrado de columnas no necesarias
dataFrame.drop('Order Priority',inplace=True, axis=1)
dataFrame.drop('Discount',inplace=True, axis=1)
dataFrame.drop('Order Quantity',inplace=True, axis=1)
dataFrame.drop('Sales',inplace=True, axis=1)
dataFrame.drop('Profit',inplace=True, axis=1)
dataFrame.drop('Shipping Cost',inplace=True, axis=1)
dataFrame.drop('Product Base Margin',inplace=True, axis=1)
dataFrame.drop('Container',inplace=True, axis=1)
dataFrame.drop('Region',inplace=True, axis=1)
dataFrame.drop('State',inplace=True, axis=1)
dataFrame.drop('City',inplace=True, axis=1)
dataFrame.drop('Postal Code',inplace=True, axis=1)
dataFrame.drop('Ship Mode',inplace=True, axis=1)
dataFrame.drop('SubRegion',inplace=True, axis=1)
dataFrame.drop('Row',inplace=True, axis=1)


#Correción del formato del ID
for index, row in dataFrame.iterrows():
    dataFrame.at[index,'_id'] = dataFrame.iloc[index]['_id']['$oid']

#Encontrar duplicados: NO HAY
dataFrame.duplicated()

#Comprobar Outliers en las variables numéricas
dataFrame.describe()

#Renombrar Columnas para quitar espacios y que sean más accesibles
dataFrame.rename(columns={"Order Date": "Order_Date"},inplace=True)
dataFrame.rename(columns={"Unit Price": "Unit_Price"},inplace=True)
dataFrame.rename(columns={"Customer ID": "Customer_ID"},inplace=True)
dataFrame.rename(columns={"Customer Name": "Customer_Name"},inplace=True)
dataFrame.rename(columns={"Customer Segment": "Customer_Segment"},inplace=True)
dataFrame.rename(columns={"Ship Date": "Ship_Date"},inplace=True)
dataFrame.rename(columns={"Country / Region": "Country_Region"},inplace=True)

#Quitar los ?
dataFrame["Item"]=dataFrame["Item"].astype(str)

dataFrame["Department"] = dataFrame["Department"].str.replace(u"\uFFFD", '')
dataFrame["Category"] = dataFrame["Category"].str.replace(u"\uFFFD", '')
dataFrame["Item"] = dataFrame["Item"].str.replace(u"\uFFFD", '')
dataFrame["Customer_Segment"] = dataFrame["Customer_Segment"].str.replace(u"\uFFFD", '')
dataFrame["Customer_Name"] = dataFrame["Customer_Name"].str.replace(u"\uFFFD", '')
dataFrame["Country_Region"] = dataFrame["Country_Region"].str.replace(u"\uFFFD", '')

#Conversión de vuelta a JSON para guardarla en un colección de MongoDB
dataJSON = dataFrame.to_dict("records")
collectionCleaned = client['Tienda']['Ventas_Cleaned']
collectionCleaned.insert_many(dataJSON)