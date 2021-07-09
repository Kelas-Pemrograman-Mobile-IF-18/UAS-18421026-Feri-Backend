const kopi = require('../model/Kopi.js')
const response = require('../config/response')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

// INPUT //
exports.inputDataKopi = (data, gambar) =>
    new Promise( async (resolve, reject)=> {

        const kopiBaru = new kopi({
            kodeKopi : data.kodeKopi,
            jenisKopi: data.jenisKopi,
            hargaKopi: data.hargaKopi,
            gambar: gambar
        })

        await kopi.findOne({kodeKopi: data.kodeKopi})
            .then(kopi => {
                if(kopi){
                    reject(response.commonErrorMsg('Kode Kopi Sudah Ada'))
                }else{
                    kopiBaru.save()
                    .then(r=>{
                        resolve(response.commonSuccessMsg('Berhasil Input Data'))
                    }).catch(err =>{
                        reject(response.commonErrorMsg('Gagal Input Data'))
                    })
                }
            }).catch(err => {
                reject(response.commonErrorMsg('Terjadi Kesalahan Pada Server'))
            })
    })


// LIHAT BANYAK DATA//
exports.lihatDataKopi = () =>
    new Promise(async (resolve, reject) => {
        await kopi.find({})
            .then(result => {
                resolve(response.commonResult(result))
            }).catch(() => 
                reject(response.commonErrorMsg('Terjadi Kesalahan Pada Server')))
    })

// LIHAT SATU DATA//
exports.lihatdetailDataKopi = (kodeKopi) =>
    new Promise(async (resolve, reject) => {
        await kopi.findOne({kodeKopi: kodeKopi})
            .then(result => {
                resolve(response.commonResult(result))
            }).catch(() => 
                reject(response.commonErrorMsg('Terjadi Kesalahan Pada Server')))
    })


// UPDATE UBAH DATA
exports.updateKopi = (id, data, gambar) => 
    new Promise(async (resolve, reject)=>{
        await kopi.updateOne(
            {_id : ObjectId(id)},
            {
                $set: {
                    kodeKopi : data.kodeKopi,
                    jenisKopi: data.jenisKopi,
                    hargaKopi: data.hargaKopi,
                    gambar: gambar
                }
            }
        ).then(kopi => {
            resolve(response.commonSuccessMsg('Berhasil Mengubah Data'))
        }).catch(err => {
            reject(response.commonErrorMsg('Terjadi Kesalahan Pada Server'))
        })
    })


// HAPUS DATA
exports.hapusKopi = (_id) =>
    new Promise(async(resolve, reject)=>{
        await kopi.remove({_id: ObjectId(_id)})
            .then(() => {
                resolve(response.commonSuccessMsg('Berhasil Menghapus Data'))
            }).catch(() => {
                reject(response.commonErrorMsg('Terjadi Kesalahan Pada Server'))
            })
    })