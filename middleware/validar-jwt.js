const { response } = require('express');
var jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
	// x-token headers
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'No hay token en la peticion',
		});
	}

	try {
		const { uid, name } = jwt.verify(
			token,
			process.env.SECRET_JWT_SECRET,
		);

		req.uid = uid;
		req.name = name;
	} catch (err) {
		console.log(err);
		res.status(401).json({
			ok: false,
			msg: 'Token no valido',
		});
	}

	next();
};

module.exports = {
	validarJWT,
};
