CREATE TABLE bd007.ordenes_articulos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_orden INT NOT NULL,
  num_articulo INT NOT NULL,
  id_articulo INT NOT NULL,
  producto_nombre VARCHAR(100) NOT NULL,
  producto_descripcion VARCHAR(200) NOT NULL,
  cantidad FLOAT NOT NULL,
  precio FLOAT NOT NULL,
  total FLOAT NOT NULL,
  created_at DATETIME NULL,
  updated_at DATETIME NULL
  )
