const {check} = require('express-validator');

const registerValid = [
    check('email').exists().withMessage('vui long nhap email'),
    check('email').isEmail().withMessage('email khong hop le'),
    check('password').exists().withMessage('vui long nhap mat khau'),
    check('password').isLength({min: 8, max: 30}).withMessage('do dai mat khau khong dung'),
    check('passwordConfiguration').exists().withMessage('vui long nhap mat khau xac nhan'),
    check('passwordConfiguration').isLength({min: 8, max: 30}).withMessage('do dai mat khau xac nhan khong dung'),
    check('passwordConfiguration').custom((value, {req}) => {
        if(value !== req.body.password)
            throw new Error('mat khau xac thuc khong khop');
        return true;
    }),
];

const loginValid = [
    check('email').exists().withMessage('vui long nhap email'),
    check('email').isEmail().withMessage('email khong hop le'),
    check('password').exists().withMessage('vui long nhap mat khau'),
    check('password').isLength({min: 8, max: 30}).withMessage('do dai mat khau khong dung'),
];

module.exports = {registerValid, loginValid};