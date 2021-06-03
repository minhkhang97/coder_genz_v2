const express = require('express');
const passport = require('passport');
const {validationResult, param} = require('express-validator');
const router = express.Router();

const {createCategory, findOneCategory, findAllCategory, updateCategory} = require ('./category.controller');
const Category = require('./category.model');
const Product = require('../product/product.model');

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
        return res.status(200).json({error: ['Thêm danh mục sản phẩm không thành công']});
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
        return res.status(200).json({error: ['cập nhật sản phẩm không thành công']});
    }


})

router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const { id } = req.params;
      console.log(id);
      try {
        const categoryNeedDelate = await Category.findOne({ _id: id });
        const productsId = categoryNeedDelate.products;
        if (!categoryNeedDelate) {
          return res
            .status(200)
            .json({ error: ["danh mục sản phẩm không tồn tại"] });
        }
        await Category.findByIdAndDelete(id);
        //xoa cac category chua san pham nay
        await Product.updateMany(
          { _id: { $in: productsId } },
          { $pull: { categories: id } }
        );
        return res.status(200).json({success: true});
      } catch (error) {
          console.log(error);
        return res.status(200).json({ error: ["xoá danh mục sản phẩm không thành công"] });
      }
    }
  );

module.exports = router;