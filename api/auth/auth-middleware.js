const { findBy } = require('../users/users-model');

const checkCredetials = (req, res, next) => {
	try {
		if (!req.body.username || !req.body.password) {
			next({ message: 'username and password required' });
		} else {
			next();
		}
	} catch (error) {
		next(error);
	}
};

const checkUsernameExist = async (req, res, next) => {
	try {
		const [user] = await findBy({ username: req.body.username });
		if (user) {
			next({ message: 'username taken' });
		} else {
			req.user = user;
			next();
		}
	} catch (error) {
		next(error);
	}
};
const checkUsernameExistIndb = async (req, res, next) => {
	try {
		const [user] = await findBy({ username: req.body.username });
		if (!user) {
			next({ message: 'invalid credentials' });
		} else {
			req.user = user;
			next();
		}
	} catch (error) {
		next(error);
	}
};
module.exports = {
	checkCredetials,
	checkUsernameExist,
	checkUsernameExistIndb,
};
