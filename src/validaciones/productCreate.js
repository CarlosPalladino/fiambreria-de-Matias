let { body } = require('express-validator')

const productCreate = [
    body("nombre")
        .notEmpty()
        .withMessage("Complete los campos")
        .bail()
        .isLength({ min: 5 })
        .withMessage("El nombre debe contener minimo cinco caracteres")
        .bail()
        .isLength({ max: 50 })
        .withMessage("El nombre debe contener maximo 50 caracteres")
        .bail(),

    body('categoria').custom((value, { req }) => {
        if (!req.body.categoria) {
            throw new Error('Seleccionar Categoria')

        }
        return true
    }),
    body("marca")
        .notEmpty()
        .withMessage("Complete los campos")
        .bail()
        .isLength({ min: 2 })
        .withMessage("La marca debe contener minimo dos caracteres")
        .bail()
        .isLength({ max: 16 })
        .withMessage("La marca debe contener maximo 16 caracteres")
        .bail(),

    body("peso")
        .notEmpty()
        .withMessage("Complete los campos")
        .bail(),

    body("precio")
        .notEmpty()
        .withMessage("Complete los campos")
        .bail(),

    body("descripcion").notEmpty()
        .withMessage("la descripcion no pede estar vacia"),


    body('imagenProducto').custom((value, { req }) => {
        let archivos = req.files
        if (!archivos || archivos.length == 0) {
            throw new Error('No se subio ninguna imagen')
        }
        let extensiones = ['.svg', '.png', '.jpg', '.jpeg', '.webp']
        let imagenProducto = archivos[0]
        let extension = extname(imagenProducto.filename)

        if (!extensiones.includes(extension)) {
            deleteImage(imagenProducto.filename)
            throw new Error('La imagen no tiene una extension valida')
        }

        if (imagenProducto.size > 2097152) {
            deleteImage(imagenProducto.filename)
            throw new Error('La imagen supera el peso de 2MB')
        }

        return true
    })


]
module.exports = productCreate