//   Rutas Usuarios / auth
//   host + /aspi/auth

const { Router } = require('express');
const { check } = require('express-validator');
const {
	validarCampos,
} = require('../middleware/validar-campo');
const {
	crearUsuario,
	loginUsuario,
	revalidarToken,
} = require('../controllers/auth');
const { validarJWT } = require('../middleware/validar-jwt');
const router = Router();

router.post(
	'/new',
	[
		//middleware
		check('name', 'Elnombre es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		check(
			'password',
			'La contraseña es obligatoria, minimo 6 caracteres',
		).isLength({ min: 6 }),
		validarCampos,
	],
	crearUsuario,
);

router.post(
	'/',
	[
		check('email', 'El email es obligatorio').isEmail(),
		check(
			'password',
			'La contraseña es obligatoria, minimo 6 caracteres',
		).isLength({ min: 6 }),
		validarCampos,
	],
	loginUsuario,
);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;
