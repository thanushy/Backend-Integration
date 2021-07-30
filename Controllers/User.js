const { asyncMiddleWare } = require('../Delegates/asyncMiddleware');
const router = require('express').Router();
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const User = require('../Models/User');

router.post('/register', asyncMiddleWare(async(req, res) => {
    console.log(req.body);
    const [doesExist] = await User.checkUser(req.body.email);
    if(doesExist && doesExist.length) throw createErro.Conflict(`${req.body.email} is already exists`);
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const user = new User(req.body);
    const [saveUser] = await user.saveUser(req.body);
    if(saveUser) res.status(200).send({msg: "User saved Successfully"});
    else throw createError[500]
}))

router.get('/login', asyncMiddleWare(async(req, res)=> {
    const [[checkUser]] = await User.checkUser(req.body.email);
    if(!checkUser) throw createError.Conflict(`${req.body.email} is not registered`);
    const checkPassword = await encryptDecryptPassword.decryptPassword(checkUser.password, req.body.password);
    if(!checkPassword) throw createError.NotFound('User id or Password is invalid');
    res.status(200).send({ msg: 'Login successs'});
}))

router.get('/getUserProducts', asyncMiddleWare(async(req, res) => {
    const [getUserProducts] = await User.getUserProducts(req.query.id);
    if(getUserProducts) res.status(200).send({products: getUserProducts});
    throw createError[500];
}))

module.exports = router;