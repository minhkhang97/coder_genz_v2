const {check} = require('express-validator');
const voca = require('voca');

const registerValid = [
    check('email').exists().withMessage('vui lòng nhập email'),
    check('email').isEmail().withMessage('địa chỉ email không hợp lệ'),
    check('password').exists().withMessage('vui lòng nhập mật khẩu'),
    check('password').isLength({min: 5, max: 30}).withMessage('độ dài mật khẩu quá ngắn'),
    check('passwordConfiguration').exists().withMessage('vui long nhap mat khau xac nhan'),
    check('passwordConfiguration').isLength({min: 8, max: 30}).withMessage('do dai mat khau xac nhan khong dung'),
    check('passwordConfiguration').custom((value, {req}) => {
        if(value !== req.body.password)
            throw new Error('mat khau xac thuc khong khop');
        return true;
    }),
];

const loginValid = [
    check('email').exists().withMessage('vui lòng nhập email'),
    check('email').isEmail().withMessage('địa chỉ email không hợp lệ'),
    check('password').exists().withMessage('vui lòng nhập mật khẩu'),
    check('password').isLength({min: 5, max: 30}).withMessage('độ dài mật khẩu không đúng'),
];

const validProduct = [
    check('name').exists().withMessage('vui lòng nhập tên sản phẩm'),
    check('name').isLength({min: 5}).withMessage('tên sản phẩm quá ngắn'),
    check('price').exists().withMessage('vui lòng nhập giá sản phẩm'),
    check('price').custom(value => {
        if(Number(value) === 0)
            throw new Error('vui lòng nhập giá sản phẩm')
        return true;
    })
];

function is_phonenumber(phonenumber) {
    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if(phonenumber.match(phoneno)) {
      return true;
    }  
    else {  
      return false;
    }
  }

const validOrder = [
    check('contact').exists().withMessage('vui lòng nhập địa chỉ'),
    check('cart').exists().withMessage('giỏ hàng không tồn tại'),
    check('contact').custom(value => {
        if(voca.isEmpty(value.fullname))
            throw new Error('vui lòng nhập họ và tên')
        if(voca.isEmpty(value.specific_address))
            throw new Error('vui lòng nhập địa chỉ')
        if(!is_phonenumber(value.phone))
            throw new Error('số điện thoại không chính xác')
        return true;
    }),
    // checck('cart').custom(value => {
    //     if(value.length < 1)
    //         throw new Error('vui lòng thêm sản phẩm vào giỏ hàng')
    //     return true;
    // })
];

const emailValid = [check('email').exists().withMessage('vui long nhap email'),
check('email').isEmail().withMessage('email khong hop le')];

module.exports = {validOrder, registerValid, loginValid, emailValid, validProduct};