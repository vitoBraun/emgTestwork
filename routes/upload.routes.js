const {Router} = require('express')
const File = require('../models/File')
const router = Router()
const fs = require('fs')
const auth = require('../middleware/auth.middleware')
const allowedTypes = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']
const sizeLimit = 5000000

uploadFile = async (req,res)=>{
    try {
        if (!req.files.image){
            return res.send({success: false, message:'нет файла'})
        }
        const file = req.files.image
        const text = req.body.text
        const fileName = file.name.replace(/ /g, '-')
        const path = 'client/build/images/' + fileName

        if(!allowedTypes.includes(file.mimetype)){
            return res.send({success: false, message:'Недопустимый формат файла'})
        }
        if(file.size > sizeLimit){
            return res.send({success: false, message:'Недопустимый размер файла'})
        }
        
        const fileInfo = {
            name: fileName,
            size: file.size,
            type: file.mimetype,
            path,
            text:text
        }
        file.mv(path)

        const fileDb = new File({
            text: text, 
            link: '/images/'+fileName
        })
        await fileDb.save()

        return res.status(201).send({success: true, fileInfo})
    } catch (error) {
       res.send({success: false, message:'Ошибка на сервере'})
    }
}
router.post('/', auth, uploadFile)

module.exports = router