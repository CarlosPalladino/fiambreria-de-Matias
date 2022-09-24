let { body } = require('express-validator')
const {extname,resolve} = require('path')
const {unlinkSync} = require('fs')

const productEdit = [
    body("name")
        .notEmpty()
        .withMessage("Complete los campos")
        .bail()
        .isLength({ min: 5 })
        .withMessage("El nombre debe contener minimo cinco caracteres")
        .bail()
        .isLength({ max: 50 })
        .withMessage("El nombre debe contener maximo 50 caracteres")
        .bail(),

    body('category').custom((value, { req }) => {
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
        .isLength({ max: 20 })
        .withMessage("La marca debe contener maximo 20 caracteres")
        .bail(),

    body("peso")
        .notEmpty()
        .withMessage("Complete los campos")
        .bail(),

    body("price")
        .notEmpty()
        .withMessage("Complete los campos")
        .bail(),

    body("description").notEmpty()
        .withMessage("la descripcion no pede estar vacia"),


    body('image').custom((value, { req }) => {
        let archivos = req.files
        if (archivos || archivos.length > 0) {
            let extensiones = ['.svg', '.png', '.jpg', '.jpeg', '.webp']
        let imagenProducto = archivos[0]
        let extension = extname(imagenProducto.filename)

        if (!extensiones.includes(extension)) {
            unlinkSync(resolve(__dirname, '../../public/images/','product-images',imagenProducto.filename))
            throw new Error('La imagen no tiene una extension valida')
        }

        if (imagenProducto.size > 2097152) {
            unlinkSync(resolve(__dirname, '../../public/images/','product-images',imagenProducto.filename))
            throw new Error('La imagen supera el peso de 2MB')
        }

        return true
            
        } else{
            return true
        }
        
    })


]
module.exports = productEdit