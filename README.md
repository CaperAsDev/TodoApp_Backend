# Como levantar esta wea?

1. instalar docker y toa esa monda
2. revisar que haya coherencia entre los datos de la tabla en el archivo docker-compose.yml y las variables de entorno del .env :
   `.env de ejemplo
NODE_ENV = "development"
PORT= 3000
DATABASE_URL = ""
DB_USER= "pepito"
DB_PASSWORD = "admin4ever"
DB_HOST= "localhost"
DB_NAME= "LPMQLP"
DB_PORT= "5432"
`
3. Si los datos coinciden vamos por buen camino, yo sufri tres dias porque tenia una letra mal :sad:
4. levantar contenedores de docker usando **docker compose up -d**
5. confirmar que levantaron viendo en docker desktop o con el comando **docker ps**
6. Si lo anterior muestra en la lista los contenedores es porque estamos bien.
7. levanta el servidor y reza porque no hayan errores. Si los hay preguntale a la IA.

# Testear conexiones

## Desde psql en el contenedor de docker

Si docker levanto los contenedores con exito deberias poder acceder a la base de datos desde la terminal con el comando :

- `docker exec -it todoapp_backend-postgres-1 psql -U pepito -d LPMQLP`

donde :

- **docker exec -it** es el comando de docker para ejecutar comando dentro de sus contenedores, el flag -i es de interactivo y el flag -t es de TTY (no se que es pero el tuto decia que lo usara)
- **todoapp_backend-postgres-1** es el nombre del contenedor, usa el comando **docker network inspect todoapp_backend_my_network** para ver la informacion de la red
- **psql -U pepito -d LPTMQLP** es la parte de psql donde -U indica que el siguiente parametro es el nombre de usuario y -d que indica que sigue el nombre de la base de datos.

Si todo funciona deberia iniciar la linea de comando de psql, si no funciona es porque alguno de los datos esta mal o porque la base de datos no se levanto. para acceder desde psql no necesitamos la contraseña de la base de datos.

Entrado a psql podemos ver los detalles de la conexion con el comando **\conninfo**, este comando te dira que usuario esta conectado a que base de datos en que puerto. Si este comando funciona es seguro que la conexion se realizo con exito.

## Desde pgAdmin

En el caso de este repo, pgAdmin se levanto en un contenedor tambien, asi que si vamos al puerto que indica ya sea el comando ps de docker o la interfaz de docker desktop veremos la interfaz de pgAdmin. luego es cuestion de logearse con los datos puestos en el docker-compose.yml :

``
environment:

- PGADMIN_DEFAULT_EMAIL=admin@email.com
- PGADMIN_DEFAULT_PASSWORD=root
  ``
  Luego debemos crear un servidor para conectar con la base de datos, en el host ponemos el nombre de contenedor de postgres que ya vimos que era **todoapp_backend-postgres-1** segun la IA se puede usar la direccion ip pero que era mejor usar el nombre del contenedor de postgres en docker.

una ves iniciado podemos crear una tabla de prueba desde psql y si se ve reflejada en pgadmin luego de actualizar las tablas es porque funciona bien.

## Desde Sequelize

Mientras la configuracion se haya echo bien sin errores tipograficos y en coherencia con la información puesta en docker-compose, deberia funcionar. en Host use localhost, la IA decia que en host ponia tambien el nombre del contenedor de postgres pero eso es cuando el backend se levanta desde docker tambien, como yo lo tengo en local pues uso localhost con el puerto al que mapea docker nuestra base de datos:

ports:

- 5432:5432

Si es el mismo puerto deberia no deberia ponerse otro en la conexion.

# Comandos adicionales

## Docker

- docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' todoapp_backend-postgres-1 : para ver la ip de un contenedor

## psql

- \l : para listar bases de datos
- \dt : para listar tablas

# MVC

Como vamos a manejar la aplicacion? por partes XD

## Carpetas

- Schemas: validaran la informacion que envia la vista (usuario) antes de llegar al controlador.
- routes: Solo se encargan de redirigir la peticion al controlador segun la ruta, ademas administran las validaciones previas en forma de middleware.
- controllers: recibe la informacion y le pide al modelo una accion especifica, recibe el resultado y dependiendo de este le envia la respueta a la vista de vuelta.
- modelo: segun la accion que el controlador solicite realizara logica de negocio, modificando datos, filtrando y demas.
