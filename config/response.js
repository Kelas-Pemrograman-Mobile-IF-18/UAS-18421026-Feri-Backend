module.exports = {
    
    commonError:{
        error: true,
        msg : 'Terjadi Kesalahan Pada Server'
    },
    commonErrorMsg: (msg) => {
         return {
             error: true,
             msg: msg
         }
    },
    commonSuccess: {
        error: false,
        msg : 'Berhasil Memuat permintaan'
    },
    commonSuccessMsg: (msg) => {
        return {
            error: false,
            msg: msg
        }
    },
    commonResult: (data) => {
        return {
            error : false,
            msg: 'Berhasil Memuat data',
            data : data
        }
    }

};