CREATE TABLE bd007.ordenes (
  id_orden INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT NOT NULL,
  total FLOAT NOT NULL,
  tipo_operacion VARCHAR(10) NULL DEFAULT 'venta',
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  email_cliente VARCHAR(100) NULL,
  sub_total FLOAT NULL,
  impuestos FLOAT NULL,
  nombre_cliente VARCHAR(100) NULL,
  apellido_cliente VARCHAR(100) NULL,
  domicilio VARCHAR(200) NULL,
  usuario_cliente VARCHAR(100) NULL,
  pais VARCHAR(100) NULL
  )