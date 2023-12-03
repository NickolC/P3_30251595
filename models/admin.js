const db = require('../database/conection');

module.exports = {
    //Hace el reporte de las 3 tablas (categorias, productos e imagenes)
    obteneradmin() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT productos.nombre AS productoNombre, productos.precio, productos.codigo, productos.descripcion, productos.marca, productos.tono, categorias.nombre AS categoriaNombre, imagenes.url, imagenes.destacado FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id INNER JOIN imagenes ON productos.id = imagenes.producto_id';
            db.all(sql, (err, resultados) => {
                if (err) reject(err);
                else {
                    console.log(JSON.stringify(resultados, null, 4));
                    resolve(resultados)
                };
            });
        });
    },
    //Busqueda usuarios por nombre
    obtenerprdPorNombre(nombre) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT productos.nombre AS productoNombre, productos.precio, productos.codigo, productos.descripcion, productos.marca, productos.tono, categorias.nombre AS categoriaNombre, imagenes.url, imagenes.destacado FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id INNER JOIN imagenes ON productos.id = imagenes.producto_id WHERE productos.nombre = ?'
            db.all(sql, [nombre], (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            })
        })
    },
    //Busqueda usuarios por descripcion
    obtenerprdPorDescripcion(descripcion) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT productos.nombre AS productoNombre, productos.precio, productos.codigo, productos.descripcion, productos.marca, productos.tono, categorias.nombre AS categoriaNombre, imagenes.url, imagenes.destacado FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id INNER JOIN imagenes ON productos.id = imagenes.producto_id WHERE productos.descripcion = ?'
            db.all(sql, [descripcion], (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            })
        })
    },
    //Filtrado categoria
    filtradoctg(categoria) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT productos.nombre AS productoNombre, productos.precio, productos.codigo, productos.descripcion, productos.marca, productos.tono, categorias.nombre AS categoriaNombre, imagenes.url, imagenes.destacado FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id INNER JOIN imagenes ON productos.id = imagenes.producto_id WHERE categorias.nombre = ?'
            db.all(sql, [categoria], (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            })
        })
    },
    //Filtrado marca
    filtradomarca(marca) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT productos.nombre AS productoNombre, productos.precio, productos.codigo, productos.descripcion, productos.marca, productos.tono, categorias.nombre AS categoriaNombre, imagenes.url, imagenes.destacado FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id INNER JOIN imagenes ON productos.id = imagenes.producto_id WHERE productos.marca = ?'
            db.all(sql, [marca], (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            })
        })
    },
    //Filtrado tono
    filtradotn(tono) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT productos.nombre AS productoNombre, productos.precio, productos.codigo, productos.descripcion, productos.marca, productos.tono, categorias.nombre AS categoriaNombre, imagenes.url, imagenes.destacado FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id INNER JOIN imagenes ON productos.id = imagenes.producto_id WHERE productos.tono = ?'
            db.all(sql, [tono], (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            })
        })
    },
    
    //Obtiene solamente la tabla de categorias
    obtenerctg() {
        return new Promise((resolve, reject) => {
            const sql = 'Select * FROM categorias';
            db.all(sql, (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    //Obtiene la tabla categorias por id
    obtenerctgPorId(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM categorias where id = ?'
            db.get(sql, [id], (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },

    //Agrega una categorias
    insertarctg(nombre) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO categorias (nombre) VALUES (?)';
            db.run(sql, [nombre], (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    //Actualiza una categoria
    actualizarctg(nombre, id) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE categorias SET nombre = ? WHERE id = ?'
            db.run(sql, [nombre, id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },
    //Elimina una categoria
    eliminarctg(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM categorias WHERE id = ?'
            db.run(sql, [id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },
    //Obtiene solamente la tabla productos
    obtenerprd() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * from productos';
            db.all(sql, (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    //Obtiene la tabla productos por id
    obtenerprdPorId(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM productos WHERE id = ?';
            db.get(sql, [id], (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    //Agrega un nuevo producto
    insertarprd(nombre, precio, codigo, descripcion, marca, tono, categoria_id) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO productos (nombre, precio, codigo, descripcion, marca, tono, categoria_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
            db.run(sql, [nombre, precio, codigo, descripcion, marca, tono, categoria_id], (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    //Actualiza un producto
    actualizarprd(nombre, precio, codigo, descripcion, marca, tono, id) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE productos SET nombre = ?, precio = ?, codigo = ?, descripcion = ?, marca = ?, tono = ? WHERE id = ?';
            db.run(sql, [nombre, precio, codigo, descripcion, marca, tono, id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },
    //Elimina un producto
    eliminarprd(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM productos WHERE id = ?';
            db.run(sql, [id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },
    //Obtiene solamente la tabla imagenes
    obtenerimg() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM imagenes';
            db.all(sql, (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    //Obtiene la tabla imagenes por id
    obtenerimgPorId(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM imagenes WHERE id = ?';
            db.get(sql, [id], (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    //Agrega una nueva imagen
    insertarimg(url, destacado, producto_id) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO imagenes (url, destacado, producto_id) VALUES (?, ?, ?)';
            db.run(sql, [url, destacado, producto_id], (err, resultados) => {
                if (err) reject(err);
                else {
                    console.log(JSON.stringify(resultados, null, 4));
                    resolve(resultados)
                };
            });
        });
    },
    //Actualiza una imagen
    actualzarimg(url, destacado, id) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE imagenes SET url = ?, destacado = ? WHERE id = ?';
            db.run(sql, [url, destacado, id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },
    //Borra una imagen
    eliminarimg(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM imagenes WHERE id = ?';
            db.run(sql, [id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },
};