# PRÁCTICA DE SUBIDA DE ARCHIVOS # 

En este trabajo se realiza un servidor en el que se pueden cargar productos e imagenes de los mismos utilizando la librería multer

## Contexto:
>Una tienda de productos necesita un servidor básico que permita a los empleados
agregar nuevos productos y adjuntar una imagen que se guardará en el servidor. El
sistema no utiliza una base de datos, los productos se guardarán temporalmente en
memoria dentro de un array de objetos. Al agregar un producto, se deberá retornar el
producto creado con la URL de la imagen adjunta.

### Instalación de Dependencias

```
cd frontend

npm i
```

```
cd backend

npm i
```

Funcionamiento de almacenado local con multer:

![Carga de imágenes con multer](/frontend/src/assets/img/imagenes_cargadas.png)

## Estructura del producto almacenado:

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "price": "number",
  "imageUrl": "string"
}
```

