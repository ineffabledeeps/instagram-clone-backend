const multer = require("multer");

//config multer
const storage = multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,"public/images");
    },
    filename: function(req,file,cb){
      const filename = file.mimetype.includes('image') ? `${file.fieldname}-${Date.now()}.jpg` : `${file.fieldname}-${Date.now()}.mp4`
      cb(null,filename);
    }
  })
  
  const upload = multer({storage:storage});

  module.exports = upload;