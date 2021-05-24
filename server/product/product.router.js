const express = require('express');
const passport = require('passport');
const {param, validationResult} = require('express-validator');
const router = express.Router();


const Product = require('./product.model');

const {createProduct, updateProduct, findProductByPage, findAllProduct, findOneProduct} = require('./product.controller');

//cho customer




//cho admin

//bat buoc phai co session false o day
router.get('/', async (req, res) => {
    try{
        const products = await findAllProduct();
        return  res.status(200).json(products);
    }catch (err){
        return res.status(400).json({err});
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const product = await findOneProduct(id);
    return res.status(200).json(product);
});

//check gia tri truyen len trc
router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    //kiem tra dau vao, xem cac gia tri co ton tai khong
    try{
        const product = await createProduct(req.body, String(req.user._id));
        return res.status(200).json(product);
    }catch (err){
        return res.status(401).json({msg: err});
    }
});


//update by id
router.put('/:id', async (req, res) => {
    //kiem tra xem id co dung khong
    const {id} = req.params;
    try{
        const productNeedUpdate = await Product.findOne({_id: id});
        if(!productNeedUpdate){
            return res.status(400).json({error: 'san pham khong ton tai'});
        }

        const productAfterUpdate = await updateProduct(id, req.body);
        return  res.status(200).json(productAfterUpdate);
    }
    catch (error){
        return  res.status(401).json({error})
    }

});

module.exports = router;
