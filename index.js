const express    = require('express');
const app        = express();
const fs         = require('fs');
const path       = require('path');
const {format}     = require('date-fns');
const PORT       = process.env.port || 2000;
const folderPath = path.join(__dirname,'files');

app.post('/create',(req,res)=>{
    const currentTimestamp = format(new Date(),'dd-MM-yyyy-HH-mm-ss');
    const fileName = `${currentTimestamp}.txt`;
    const filePath = path.join(folderPath, fileName); 
    
    fs.writeFile(filePath,currentTimestamp,'utf-8',(err)=>{
        if (err) {
            console.error(err);
            res.status(500).send('Error creating file');
        } else {
            console.log('File created successfully');
            res.status(201).send('File created successfully');
        }        
    })
})

app.get('/getAllFiles',(req,res)=>{
    fs.readdir(folderPath,(err,files)=>{
        if (err) {
            console.log(err)
            res.status(500).send('Error Retrirving the Files')
        } else {
            console.log('Files loaded Successfully')
            const textFiles = files.filter(file => file.endsWith('.txt'));
            res.status(200).json(textFiles)
        }
    })
})

app.listen(PORT,()=>console.log(`App is listening in ${PORT}`));
