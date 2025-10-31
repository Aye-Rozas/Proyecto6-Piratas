# API de Piratas y Barcos #

API REST para la gestión de piratas y barcos, desarrollada con Node.js, Express y MongoDB.

**Descripción**

Esta API permite administrar información sobre piratas y barcos, incluyendo la asignación de piratas a barcos específicos. Implementa operaciones CRUD completas y relaciones entre colecciones usando referencias de MongoDB.

**Tecnologías Utilizadas**

Node.js 
Express 
MongoDB
Mongoose

 **URL Base http://localhost:3000/api/v1**
 
 **Ejecución**
 npm run dev
 
 **Seed de Piratas**
1) se ejecuta segun el  script "npm run seed"
La semilla va a cargar los datos de los piratas y borrar las colecciones que hubiera mostrando por log: conectado a MongoDB ,colección limpiada ,8 piratas insertados
2) se obtiene el id de los piratas con get
3) cargar los barcos manualmente por Insomnia, Ej:
```sh
  {
    "name": "Thousand Sunny",
    "imgUrl": "https://static.wikia.nocookie.net/onepiece/images/b/b1/Thousand_Sunny_Infobox.png/revision/latest?cb=20200314124830&path-prefix=es ",
    "piratas": ["id_pirata"],
    "capitan": "Monkey D. Luffy",
    "material": "Adam Wood",
    "velas": 2,
  }(en el Schema de barcos estan los que utilizo para subir comentados)
<<<<<<< HEAD
  ```
  
  **ENDPOINTS - PIRATAS** 
|Metodo | Endpoint   | Descripción|
| ------ | ------ |----------|
|GET    | /piratas                   |  Obtener todos los piratas|
|GET    | /piratas/recompensa/:valor | Filtrar piratas por recompensa (menor o igual al valor)|
|POST    |/piratas                   | Crear un nuevo pirata|
|PUT     |/piratas/:id               | Actualizar un pirata por ID|
|DELETE  |/piratas/:id               |Eliminar un pirata por ID|

**POST** http://localhost:3000/api/v1/piratas
Crea un nuevo pirata
```sh
{
  "name": "Monkey D. Luffy",
  "imgUrl": "https://static.wikia.nocookie.net/onepiece/images/a/af/Monkey_D._Luffy_Anime_Dos_A%C3%B1os_Despu%C3%A9s_Infobox.png/revision/latest?cb=20200616015904&path-prefix=es",
  "recompensa": 3000000000,
  "poder": "Gear 5 (Nika)",
  "barco": "Thousand Sunny",
  "rol": "Capitán",
  "fruta": true
} 
```
**PUT** http://localhost:3000/api/v1/piratas/id
Necesitamos para la ruta el id del pirata que vamos a modificar o actualizar.
```sh
{
		"recompensa": 1100000000
}
```


**ENDPOINT - BARCOS**

|Metodo	|Endpoint	|Descripción|
| ------ | ------ |----------|
|GET	|/barcos  |	Obtener todos los barcos (con piratas populados)|
|POST	|/barcos |	Crear un nuevo barco|
|PUT	|/barcos/:id |	Actualizar datos del barco y agregar piratas sin duplicar|
|PUT	|/barcos/:id/piratas |Eliminar uno o varios piratas del barco|
|DELETE	|/barcos/:id |	Eliminar un barco por ID|
=======

###Barcos
>>>>>>> 818fc45884058a8bc263bcf00f83a8d91d0b8a23

**POST** http://localhost:3000/api/v1/barcos
Crear un nuevo barco
```sh
{"name": "Big Top",
    "imgUrl": " https://static.wikia.nocookie.net/onepiece/images/a/aa/Big_Top.png/revision/latest?cb=20210130225147&path-prefix=es ",
    "capitan": "Buggy el Payaso",
    "material": "Madera tradicional",
    "velas": 2
  }
  ```
  
**DELETE PIRATA** http://localhost:3000/api/v1/barcos/:id/piratas
para eliminar piratas se utiliza esta ruta y en el body con formato json se agrega el/los piratas a eliminar
```sh
{
  "piratas": ["68ff97855b5be48579db0cd8", "id_otro_pirata"]
}
```

