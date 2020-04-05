const File = require('../models/files');
const fs = require('fs');
const path = require('path');
const parse = require('csv-parse');//library to parse the csv data

var csvData = [];//array to store the csv data

module.exports.home = async function (req,res){//module to render home with elements in the db
    try{
        let f = await File.find({});
        res.render('home.ejs',{
            title:"home",
            file:f,
            data:csvData
        })
    }
    catch(e){
        console.log(e);
    }
    
}

module.exports.upload = async function (req,res){//function to upload the file and add its path in the db
    
    var filePath="";
    try{
        await File.uploadedFile(req,res, async function(err){
            if(err){
                console.log(err);
                return;
            }
            filePath = File.file_path+'/'+req.file.filename;
            
            
            try{
                let f = await File.create({file:filePath},function(err){
                    console.log(err);
                });
            }
            catch(e){
                console.log(e);
            }
            console.log("f",f);
        });
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
    res.redirect('back');
}


module.exports.read = async function (req,res){//fuction to read the csv file and push all the elements in to the csv array
    //let filePath = req.params.filepath;
    //console.log(req.params);
    try{
        let csvfile = await File.findById(req.params.id);
        //console.log(path.join(__dirname,'..',csvfile.file));
        let p = path.join(__dirname,'..',csvfile.file)
        csvData=[]
        fs.createReadStream(p).pipe(
            parse({
                delimiter:','//split the data with , as delimiter
            })
            .on('data',function (dataRow){
                csvData.push(dataRow);//push data to the csv array
            })
            .on('end',function (){
                //console.log(csvData);
            })
        )
        
    }
    catch(e){
        console.log('error',e);
    }
    return res.redirect('back');
}

