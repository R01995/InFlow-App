// import {v2 as cloudinary} from 'cloudinary';
const cloudinary = require('cloudinary').v2
          
cloudinary.config({ 
  cloud_name: 'dtvqbccri', 
  api_key: '648785727179431', 
  api_secret: 'IfJh5mRCIBXwoiKWXlGjitY3Rr4' 
});


module.exports = cloudinary