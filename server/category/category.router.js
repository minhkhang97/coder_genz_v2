const express = require('express');
const passport = require('passport');
const {validationResult, param} = require('express-validator');
const router = express.Router();

const {createCategory, findOneCategory, findAllCategory, updateCategory} = require ('./category.controller');

router.get('/', async (req, res) => {
    try{
        const categories = await findAllCategory();
        return res.status(200).json(categories);
    }
    catch (err){
        return res.json(401).json({msg: err});
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const product = await findOneCategory(id);
    return res.status(200).json(product);
})

router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const category = await createCategory(req.body, String(req.user._id));
        return res.status(200).json(category);
    }catch (err){
        return res.status(401).json({msg: err});
    }
});

router.put('/:id',  async (req, res) => {
    const {id} = req.params;
    try{
        let category = await findOneCategory(id);

        if(!category){
            return res.status(401).json({msg: 'id khong dung'});
        }

        category = await updateCategory(id, req.body);
        return  res.status(200).json(category);
    }catch (e) {
        return res.status(401).json({mes: e});
    }


})

module.exports = router;