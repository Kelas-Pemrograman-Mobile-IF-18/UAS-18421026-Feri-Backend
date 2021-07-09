const kopi = require('../model/Kopi')
const response = require('../config/response')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.inputDataKopi = (data, gambar) =>
    new Promise(async (resolve, reject) => {

        const kopiBaru = new kopi({
            kodeKopi : data.kodeKopi,
            jenisKopi: data.jenisKopi,
            hargaKopi: data.hargaKopi,
            gambar: gambar
        })

        await kopi.findOne({ kodeKopi: data.kodeKopi })
            .then(kopi => {
                if (kopi) {
                    reject(response.commonErrorMsg('Kode Kopi Sudah Ada'))
                } else {
                    kopiBaru.save()
                        .then(r => {
                            resolve(response.commonSuccesrMsg('Berhasil menginput data'))
                        }).catch(err => {
                            reject(response.commonErrorMsg('Mohon Maaf Input Spartpart gagal'))
                        })
                }
            }).catch(err => {
                reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan pada Server kami'))
            })
    })
exports.lihatDataKopi = () =>
    new Promise(async (resolve, reject) => {
        await kopi.find({})
            .then(result => {
                resolve(response.commonResult(result))
            })

            .catch(() => reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan pada Server kami')))
    })

exports.lihatdetailDataKopi = (kodeKopi) =>
    new Promise(async (resolve, reject) => {
        await kopi.findOne({kodeKopi: kodeKopi})
            .then(result => {
                resolve(response.commonResult(result))
            })

            .catch(() => reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan pada Server kami')))
    })

exports.updateKopi = (id, data, gambar) =>
    new Promise(async (resolve, reject) => {
        await kopi.updateOne(
            { _id: ObjectId(id) },
            {
                $set: {
                    kodeKopi : data.kodeKopi,
                    jenisKopi: data.jenisKopi,
                    hargaKopi: data.hargaKopi,
                    gambar: gambar
                }
            }
        ).then(kopi => {
            resolve(response.commonSuccesrMsg('Berhasil mengubah data'))
        }).catch(err => {
            reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan pada Server kami'))

        })
    })

exports.hapusKopi = (_id) =>
    new Promise(async (resolve, reject) => {
        await kopi.remove({ _id: ObjectId(_id) })
            .then(() => {
                resolve(response.commonSuccesrMsg('Berhasil menghapus data'))
            }).catch(() => {
                reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan pada Server kami'))
            })
    })