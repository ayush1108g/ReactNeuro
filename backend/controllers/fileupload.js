require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const dotenv = require("dotenv");
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const KEYFILEPATH = path.join(__dirname, "../authfile.json");

const oauth2client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
)
oauth2client.setCredentials({refresh_token: REFRESH_TOKEN})
const driveService = google.drive({ version: "v3",auth : oauth2client});

const uploadfile = async (req,res)=>{
  console.log(req.file)
  try{
    file= req.file;
    await fs.promises.rename(
      file.destination + "/" + file.filename,
      file.destination + "/" + file.originalname
    );
    const metaData = {
      name: file.originalname.substring(
        0,
        file.originalname.lastIndexOf(".")
      ),
      parents: [process.env.FOLDER_ID], 
    };
    const media = {
      mimeType: file.mimeType,
      body: fs.createReadStream(file.destination + "/" + file.originalname), // the file sent through multer will be uploaded to Drive
    };
    const response = await driveService.files.create({
      resource: metaData,
      media: media,
      fields: "id",
    });
    console.log("ID:", response.data.id);
    const fileID = response.data.id;
    await driveService.permissions.create({
        fileId: fileID,
        requestBody:{
          role:'reader',
          type:'anyone'
        }
      })
      const result = await driveService.files.get({
        fileId : fileID,
        fields : 'webViewLink , webContentLink'
      })
      console.log(result.data)
    res.status(201).json({
      status: "success",
      data:result.data
    });
  }catch(err){
    console.log("Error:", err);
    res.status(404).json({
      status: "fail",
      massage: "invalid request",
  })
}
}
module.exports = {
  uploadFile: uploadfile,
};