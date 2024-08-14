
const cloudinary = require("../utility/cloudinary");
const ProductsModel = require("../models/Product/ProductModel");
const multer = require('multer');
const DetailsServiceById = require("../services/common/DetailsServiceById");
const DropDownService = require("../services/common/DropDownService");
const ListTwoJoinService = require("../services/common/ListTwoJoinService");
const { default: mongoose } = require("mongoose");
const ReturnsProductModel = require("../models/Returns/ReturnProductsModel");
const PurchaseProductModel = require("../models/Purchases/PurchaseProductModel");
const SalesProductModel = require("../models/Sales/SalesProductModel");



// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.', 400), false);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10 // 10MB file size limit
  }
}).array('images', 5); // Allow up to 5 images to be uploaded

exports.CreateProduct = async (req, res) => {
  try {
    // Handle form data using multer
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ status: 'fail', message: err.message });
      }
      
      // Extract form data and files
      const body = req.body;
      const images = req.files.map(file => file.path);
      
      // Upload images to Cloudinary
      const promises = images.map(imagePath => {
        return cloudinary.uploader.upload(imagePath, {
          folder: "productsimages" // Specify the folder name
        });
      });
      const uploadedImages = await Promise.all(promises);

      // Create new product with Cloudinary image URLs
      let email = req.headers.email
      const product = await ProductsModel.create({
        userEmail: email,
        name: body.name,
        unit: body.unit,
        details: body.details,
        images: uploadedImages.map(img => img.secure_url), // Store image URLs in an array
        categoryId: body.categoryId,
        brandId: body.brandId,
      });

      return res.status(200).json({ status: 'success', data: product });
    });
  } 
  
  catch (error) {
    res.status(200).json({ status: 'fail', data: error });
  }
};

// Details by id
exports.ProductDetailsById = async (req, res) => {
    let result = await DetailsServiceById (req, ProductsModel)
    res.status(200).json(result)
}

// Dropdown 
exports.ProductDropdown = async (req, res) => {
    let result = await DropDownService(req, ProductsModel, {_id: 1, name: 1})
    res.status(200).json(result)
}

exports.UpdateProduct = async (req, res) => {
  try {
    // Handle form data using multer
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ status: 'fail', message: err.message });
      }
      
      // Extract form data and files
      const { name, unit, details, categoryId, brandId } = req.body;
      const images = req.files.map(file => file.path);
      const userEmail = req.headers.email;
      const id = req.params.id;
      
      // Find the existing product by ID and userEmail
      const product = await ProductsModel.findOne({ _id: id, userEmail: userEmail });
      if (!product) {
        return res.status(404).json({ status: 'fail', message: 'Product not found' });
      }

      // Delete old images from Cloudinary if new images are uploaded
      if (images.length > 0 && product.images && product.images.length > 0) {
        const deletePromises = product.images.map(imageUrl => {
          const publicId = imageUrl.split('/').pop().split('.')[0];
          return cloudinary.uploader.destroy(`productsimages/${publicId}`);
        });
        await Promise.all(deletePromises);

        // Upload new images to Cloudinary
        const uploadPromises = images.map(imagePath => {
          return cloudinary.uploader.upload(imagePath, {
            folder: "productsimages" // Specify the folder name
          });
        });
        const uploadedImages = await Promise.all(uploadPromises);
        product.images = uploadedImages.map(img => img.secure_url);
      }

      // Update product with new data
      product.name = name;
      product.unit = unit;
      product.details = details;
      product.categoryId = categoryId;
      product.brandId = brandId;

      await product.save();

      return res.status(200).json({ status: 'success', data: product });
    });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

// product details with tow join

exports.ProductDetails = async (req, res) => {
  let searchRegex = {"$regex": req.params.searchText, "$options": "i"};

  let JoinStageOne = {$lookup: {from:"brands", localField:"brandId", foreignField:"_id", as:"brand"}};
  let JoinStageTwo = {$lookup: {from:"categories", localField:"categoryId", foreignField:"_id", as:"category"}};
  let array = [{name: searchRegex},{unit: searchRegex},{details: searchRegex},{'brand.name': searchRegex},{'category.name': searchRegex}];
  let result = await ListTwoJoinService(req, ProductsModel,array, JoinStageOne, JoinStageTwo );
  res.status(200).json(result);
}


// ListTwoJoinService

//Delete product by id

exports.DeleteProduct = async (req, res) => {
 try {
  let deleteId = req.params.id;
  const ObjectId = mongoose.Types.ObjectId;

  let ReturnAssociationCheck = await AssocialteVerificationService({ productId: new ObjectId(deleteId) }, ReturnsProductModel);
  let PurchaseAssociationCheck = await AssocialteVerificationService({ productId: new ObjectId(deleteId) }, PurchaseProductModel);
  let SalesAssociationCheck = await AssocialteVerificationService({ productId: new ObjectId(deleteId) }, SalesProductModel);

  if (ReturnAssociationCheck) {
    return res.status(200).json({ status: "associate", data: "Product is associated with return" });
  } else if (PurchaseAssociationCheck) {
    return res.status(200).json({ status: "associate", data: "Product is associated with purchase" });
  } else if (SalesAssociationCheck) {
    return res.status(200).json({ status: "associate", data: "Product is associated with sales" });
  } else {
    let product = await ProductsModel.findById(deleteId);
    if (!product) {
      return res.status(404).json({ status: 'fail', message: 'Product not found' });
    }
  }
  //delete image from cloudinary
  if (product.images && product.images.length > 0) {
    const deletePromises = product.images.map(imageUrl => {
      // Extract public_id from image URL
      const publicId = imageUrl.split('/').pop().split('.')[0];
      return cloudinary.uploader.destroy(`productsimages/${publicId}`);
    });
    await Promise.all(deletePromises);
  }
  //delete product from database
  let result = await DeleteService(req, ProductsModel);
  res.status(200).json(result);
 }
 catch (error) {
  res.status(500).json({ status: 'fail', data: error });
 }
}


// exports.DeleteProduct = async (req, res) => {
//   try {
//     const deleteId = req.params.id;
//     const ObjectId = mongoose.Types.ObjectId;

//     // Function to check associations
//     const checkAssociations = async (id) => {
//       const ReturnAssociationCheck = await AssocialteVerificationService({ productId: new ObjectId(id) }, ReturnsProductModel);
//       const PurchaseAssociationCheck = await AssocialteVerificationService({ productId: new ObjectId(id) }, PurchaseProductModel);
//       const SalesAssociationCheck = await AssocialteVerificationService({ productId: new ObjectId(id) }, SalesProductModel);

//       if (ReturnAssociationCheck) return "return";
//       if (PurchaseAssociationCheck) return "purchase";
//       if (SalesAssociationCheck) return "sales";
//       return null;
//     };

//     // Check associations
//     const associationType = await checkAssociations(deleteId);
//     if (associationType) {
//       return res.status(200).json({ status: "associate", data: `Product is associated with ${associationType}` });
//     }

//     // Find the product by ID
//     const product = await ProductsModel.findById(deleteId);
//     if (!product) {
//       return res.status(404).json({ status: 'fail', message: 'Product not found' });
//     }

//     // Delete images from Cloudinary
//     if (product.images && product.images.length > 0) {
//       const deletePromises = product.images.map(imageUrl => {
//         const publicId = imageUrl.split('/').pop().split('.')[0];
//         return cloudinary.uploader.destroy(`productsimages/${publicId}`);
//       });
//       await Promise.all(deletePromises);
//     }

//     // Delete the product from the database
//     const result = await DeleteService(req, ProductsModel);
//     return res.status(200).json(result);

//   } catch (error) {
//     return res.status(500).json({ status: 'fail', data: error.message });
//   }
// };