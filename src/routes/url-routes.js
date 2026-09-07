const express = require('express');

module.exports =(urlController)=>{
    const router = express.Router();

    router.post('/shorten-url', async (req, res, next) => {

        try {
            await urlController.shortenUrl(req, res);
        } catch (error) {
            next(error);
        }
    });

    router.get('/:shortCode', async(req,res,next)=>{
        
        try{
            await urlController.redirect(req,res);
        }catch(error){
            next(error);
        }
    });


    return router;
} 