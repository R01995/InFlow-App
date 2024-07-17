const express = require("express");
const router = express.Router();
const TestControllar = require("../controllar/TestControllar");

const UsersControllar = require("../controllar/UsersControllar")
//create before profile-Detels
const AuthVerifyMiddlewer = require("../middlewae/AuthVerifyMiddleware")
const BrandController = require("../controllar/BrandsControllar")
//catagoty
const CategoryController = require("../controllar/CategoryController")
//Customer
const CustomerController = require("../controllar/CustomerController")
//Suppliers
const SupplierController = require("../controllar/SuppliersController")
//product
const ProductController = require("../controllar/ProductControllar")
//ExpenseTypeController
const ExpenseTypeController = require("../controllar/ExpenseTypeController")
//ExpensesController
const ExpensesController = require("../controllar/ExpensesController")
//Purchases
const PurchaseController = require("../controllar/PurchaseController")
//sales
const SalesController = require("../controllar/SalesController")
//Return
const ReturnController = require("../controllar/ReturnsController")
//report
const ReportController = require("../controllar/ReportController")
//Summary
const SummaryController = require("../controllar/SummaryController")



//test router

router.get("/test", TestControllar.test);

//users router
router.post("/registation", UsersControllar.Registration);
router.post("/login", UsersControllar.Login);
//users router end

//Export AuthVerifyMiddlewer
router.get("/profile-Detels", AuthVerifyMiddlewer, UsersControllar.profileDetails);
router.post("/update-profile", AuthVerifyMiddlewer, UsersControllar.UpdateUser)
//Export AuthVerifyMiddlewer end

//email-verify
router.get("/email-verify/:email", UsersControllar.EmailVerify)
router.get("/otp-verify/:email/:otp", UsersControllar.OtpVerify)
router.post("/reset-password", UsersControllar.ResetPassword)
//email-verify

//Brand-Controllar start
router.post("/create-brand", AuthVerifyMiddlewer, BrandController.CreateBrand)
router.get("/brand-details/:id", AuthVerifyMiddlewer, BrandController.BrandDetailsById)
router.post("/brand-update/:id", AuthVerifyMiddlewer, BrandController.UpdateBrand)
router.get("/brand-dropdown", AuthVerifyMiddlewer, BrandController.BrandDropDown)
router.get("/brand-list/:pageNumber/:perPage/:searchText", AuthVerifyMiddlewer, BrandController.BrandList)
router.get("/brand-delete/:id", AuthVerifyMiddlewer, BrandController.BrandDelete)
//Brand-Controllar end

//category -Api start
router.post("/create-category", AuthVerifyMiddlewer, CategoryController.CreateCategory)
router.get("/category-details/:id", AuthVerifyMiddlewer, CategoryController.CategoryDetailsById)
router.post("/update-category/:id", AuthVerifyMiddlewer, CategoryController.CategoryUpdate)
router.get("/category-dropdown", AuthVerifyMiddlewer, CategoryController.CategoryDropdown)
router.get("/category-list/:pageNumber/:perPage/:searchText", AuthVerifyMiddlewer, CategoryController.CategoryList)
router.get("/category-delete/:id", AuthVerifyMiddlewer, CategoryController.CategoryDelete)
//category -Api end

//Customer api start
router.post("/create-customer", AuthVerifyMiddlewer, CustomerController.CreateCustomer)
router.get("/customer-details/:id", AuthVerifyMiddlewer, CustomerController.CustomerDetailsById)
router.post("/customer-update/:id", AuthVerifyMiddlewer, CustomerController.CustomerUpdate)
router.get("/customer-dropdown", AuthVerifyMiddlewer, CustomerController.CustomerDropdown)
router.get("/customer-list/:pageNumber/:perPage/:searchText", AuthVerifyMiddlewer, CustomerController.CustomerList)
router.get("/customer-delete/:id", AuthVerifyMiddlewer, CustomerController.CustomerDelete)

//create-customer api end

//Supplier api start
router.post("/create-supplier", AuthVerifyMiddlewer, SupplierController.CreateSupplier)
router.get("/supplier-details/:id", AuthVerifyMiddlewer, SupplierController.SupplierDetailsById)
router.post("/supplier-update/:id", AuthVerifyMiddlewer, SupplierController.SupplierUpdate)
router.get("/supplier-dropdown", AuthVerifyMiddlewer, SupplierController.SupplierDropdown)
router.get("/supplier-list/:pageNumber/:perPage/:searchText", AuthVerifyMiddlewer, SupplierController.SupplierList)
router.get("/supplier-delete/:id", AuthVerifyMiddlewer, SupplierController.SupplierDelete)
//create-supplier api end

//Product Api start
router.post("/create-product", AuthVerifyMiddlewer, ProductController.CreateProduct)
router.get("/product-details/:id", AuthVerifyMiddlewer, ProductController.ProductDetailsById)
router.post("/product-update/:id", AuthVerifyMiddlewer, ProductController.UpdateProduct)
router.get("/product-dropdown", AuthVerifyMiddlewer, ProductController.ProductDropdown)
router.get("/product-list/:pageNumber/:perPage/:searchText", AuthVerifyMiddlewer, ProductController.ProductDetails)
//Product Api end

// Expense Type api start
router.post("/create-expense-type", AuthVerifyMiddlewer, ExpenseTypeController.CreateExpenseType)
router.get("/expense-type-details/:id", AuthVerifyMiddlewer, ExpenseTypeController.ExpenseTypeDetailsById)
router.post("/expense-type-update/:id", AuthVerifyMiddlewer, ExpenseTypeController.ExpenseTypeUpdate)
router.get("/expense-type-dropdown", AuthVerifyMiddlewer, ExpenseTypeController.ExpenseTypeDropDown)
router.get("/expense-type-list/:pageNumber/:perPage/:searchText", AuthVerifyMiddlewer, ExpenseTypeController.ExpenseTypeList)
router.get("/expense-type-delete/:id", AuthVerifyMiddlewer, ExpenseTypeController.DeleteExpenseType)
// Expense Type api end     

// Expense  api start
router.post("/create-expense", AuthVerifyMiddlewer, ExpensesController.CreateExpense)
router.get("/expense-details/:id", AuthVerifyMiddlewer, ExpensesController.ExpenseDetailsById)
router.post("/expense-update/:id", AuthVerifyMiddlewer, ExpensesController.ExpenseUpdate)
router.get("/expense-delete/:id", AuthVerifyMiddlewer, ExpensesController.ExpenseDelete)
router.get("/expense-list/:pageNumber/:perPage/:searchText", AuthVerifyMiddlewer, ExpensesController.ExpenseList)
 
// Expense  api end

// purchase api start
router.post("/create-purchase", AuthVerifyMiddlewer, PurchaseController.CreatePurchase)
router.get("/purchase-list/:pageNumber/:perPage/:searchText", AuthVerifyMiddlewer, PurchaseController.PurchaseList)
router.get("/purchase-delete/:id", AuthVerifyMiddlewer, PurchaseController.PurchaseDelete)
// purchase api end

//Sales api start
router.post("/create-sales", AuthVerifyMiddlewer, SalesController.CreateSales)
router.get("/sales-list/:pageNumber/:perPage/:searchText", AuthVerifyMiddlewer, SalesController.SalesList)
router.get("/sales-delete/:id", AuthVerifyMiddlewer, SalesController.SalesDelete)
//Sales api start

//Return api start
router.post("/create-return", AuthVerifyMiddlewer, ReturnController.CreateReturn)
router.get("/return-list/:pageNumber/:perPage/:searchText", AuthVerifyMiddlewer, ReturnController.ReturnList)
router.get("/return-delete/:id", AuthVerifyMiddlewer, ReturnController.ReturnDelete)
//Return api end

//Repoet api start
router.post("/expense-repoet", AuthVerifyMiddlewer, ReportController.ExpenseReportByDate)
router.post("/purchase-repoet", AuthVerifyMiddlewer, ReportController.PurchaseReportByDate)
router.post("/sales-repoet", AuthVerifyMiddlewer, ReportController.SalesReportByDate)
router.post("/return-repoet", AuthVerifyMiddlewer, ReportController.ReturnReportByDate)
//Repoet api end

//Sumamry api start
router.get("/expense-summary", AuthVerifyMiddlewer, SummaryController.ExpenseSumamry)
router.get("/purchase-summary", AuthVerifyMiddlewer, SummaryController.PurchaseSummary)
router.get("/return-summary", AuthVerifyMiddlewer, SummaryController.ReturnsSummary)
router.get("/sales-summary", AuthVerifyMiddlewer, SummaryController.SelesSummary)
//Sumamry api end

module.exports = router


