// Todas tienen q pasarpor la validacion JWT
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middleware/validar-jwt');
const {
	validarCampos,
} = require('../middleware/validar-campo');
const {
	getEventos,
	crearEvento,
	actualizarEvento,
	eliminarEvento,
} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use(validarJWT);

//Obtener eventos
router.get('/', getEventos);

// Crear un nuevoEvento
router.post(
	'/',
	[
		check('title', 'El titulo es obligatorio')
			.not()
			.isEmpty(),
		check(
			'start',
			'La fecha de inicio es obligatoria',
		).custom(isDate),
		check('end', 'La fecha final es obligatoria').custom(
			isDate,
		),
		validarCampos,
	],
	crearEvento,
);

// ActualizarEvento
router.put('/:id', actualizarEvento);

// Eliminar un evento
router.delete('/:id', eliminarEvento);

module.exports = router;
