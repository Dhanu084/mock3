const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const FILE_PATH= path.join('/uploads/files/csv_files');

const fileSchema  = new mongoose.Schema({
    file:{// the path of the uploaded file to be stored
        type:String,
    },
}
,{
    timestamps:true
});
//setting up multer
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',FILE_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'.csv')
    }
  })
   
fileSchema.statics.uploadedFile = multer({
    storage:storage,
    fileFilter : function(req, file, callback) { //file filter to allow only xls ,xlsx and csv format files(bonus part)
        if (['xls', 'xlsx','csv'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('csvfile');
fileSchema.statics.file_path = FILE_PATH;

var upload = multer({ dest: 'uploads/' })
const File = mongoose.model('File',fileSchema);
module.exports = File;