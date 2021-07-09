const multer = require('multer')
const fs = require('fs')
const router = require('express').Router()
const kopi = require('../controller/Kopi.js')

var storage = multer.diskStorage({
    filename: function (req, file, cb){
        let ext = file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length
        )
        cb(null, Date.now() + ext);
    },
    destination: function (req, file, cb) {
        cb(null, './gambar')
    }
})

var upload = multer({storage}).single("gambar")

// INPUT DATA
router.post("/input", upload, (req, res) => {
    kopi.inputDataKopi(req.body, req.file.filename)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

// LIHAT BANYAK DATA 
router.get("/datakopi", (req, res) =>{
    kopi.lihatDataKopi()
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

// LIHAT SATU DATA 
router.get("/datakopi/:id", (req, res) =>{
    kopi.lihatdetailDataKopi(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

// UPDATE DATA
router.put("/ubah/:id", upload, (req, res) =>{
    let fileName;
    if (req.body.gambar){
        fileName = req.body.gambar;     
    }else {
        fileName = req.file.filename;
    }
    kopi.updateKopi(req.params.id, req. body, fileName)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

// HAPUS DATA
router.delete("/hapus/:id", (req, res) =>{
    kopi.hapusKopi(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})
module.exports = router