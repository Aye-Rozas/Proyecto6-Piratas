#Proyecto6-Piratas 
Api sencilla que contiene 2 colecciones **piratas** y **barcos**
-------------------------------------------------------------
##Endpoints principales

###Piratas
**POST** http://localhost:3000/api/v1/piratas
Crea un nuevo pirata
{
  "name": "Monkey D. Luffy",
  "imgUrl": "https://static.wikia.nocookie.net/onepiece/images/a/af/Monkey_D._Luffy_Anime_Dos_A%C3%B1os_Despu%C3%A9s_Infobox.png/revision/latest?cb=20200616015904&path-prefix=es",
  "recompensa": 3000000000,
  "poder": "Gear 5 (Nika)",
  "barco": "Thousand Sunny",
  "rol": "Capitán",
  "fruta": true
}

**GET**  http://localhost:3000/api/v1/piratas
Obtiene todos los piratas de la colección

**getPiratasByRecompensa** http://localhost:3000/api/v1/piratas/recompensa/:recompensa (en numeros)
Obtiene todos los piratas con recompensa menor o igual a la indicada en la ultima parte de la ruta

**PUT** http://localhost:3000/api/v1/piratas/id
Necesitamos para la ruta el id del pirata que vamos a modificar o actualizar.
No es necesario poner la informacion completa, solo el dato que queremos cambiar, por ejemplo:
{
		"recompensa": 1100000000
}

**DELETE** http://localhost:3000/api/v1/piratas/id
Elimina un pirata que hayamos elegido por su id

**SEED**
1) se ejecuta segun el  script "npm run seed"
La semilla va a cargar los datos de los piratas y borrar las colecciones que hubiera mostrando por log: conectado a MongoDB ,colección limpiada ,8 piratas insertados
2) se obtiene el id de los piratas con get
3) cargar los barcos manualmente por Insomnia, Ej:
  {
    "name": "Thousand Sunny",
    "imgUrl": "https://static.wikia.nocookie.net/onepiece/images/b/b1/Thousand_Sunny_Infobox.png/revision/latest?cb=20200314124830&path-prefix=es ",
    "piratas": ["id_pirata"],
    "capitan": "Monkey D. Luffy",
    "material": "Adam Wood",
    "velas": 2,
  }(en el Schema de barcos estan los que utilizo para subir comentados)
###Barcos

**POST** http://localhost:3000/api/v1/barcos
Crear un nuevo barco
{"name": "Big Top",
    "imgUrl": " https://static.wikia.nocookie.net/onepiece/images/a/aa/Big_Top.png/revision/latest?cb=20210130225147&path-prefix=es ",
    "capitan": "Buggy el Payaso",
    "material": "Madera tradicional",
    "velas": 2
  }

**GET** http://localhost:3000/api/v1/barcos
Obtiene todos los barcos de la colección

**PUT** http://localhost:3000/api/v1/barcos/id
Aquí podemos actualizar la info del barco tambien agredando el id a la ruta, como vamos a unir los piratas a cada barco, sumando de a uno al array es necesario el uso de [] (en caso que usemos populate para unir colecciones con array) 
EJ
http://localhost:3000/api/v1/barcos/68eeb982ee56112278d3d996
{
	"piratas":["68eea4985f4ccbc2c0b2e521"]
}
Se realiza una modificacion a la funcion, que es lo de agregar una verificacion para duplicados con  .toString que nos va a permitir hacer las comparaciones del objeto Id

**DELETE** http://localhost:3000/api/v1/barcos/id
Elimina el barco seleccionado según su id


