const router = require("express").Router();
const Product = require("../models/Product");
const {verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const CryptoJS = require("crypto-js")


//CREATE

router.post("/",async(req,res)=>{
 const newProduct = new Product(req.body)

 try {
    const savedProduct = await newProduct.save()
    res.status(200).json(savedProduct) 
}catch(err){
    res.status(500).json(err)
 }

})




//UPDATE


  router.put('/:id',verifyTokenAndAdmin, async(req,res)=>{

    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
            $set: req.body},{
              new:true
            }
        );
        res.status(200).json(updatedProduct);
    }catch(err){
     res.status(500).json(err)       
    }
    
    
    })


    //DELETE

    router.delete('/:id',verifyTokenAndAdmin,async(req,res)=>{
          try{
                await Product.findByIdAndDelete(req.params.id);
                res.status(200).json("product has been deleted");
          }catch(err){
             res.status(500).json(err);
          }

    })

    //GET PRODUCT

    router.get('/find/:id',async(req,res)=>{
        try{
            console.log("fetching single product")
             const product = await Product.findById(req.params.id);
            
             res.status(200).json(product)
        }catch(err){
           res.status(500).json(err);
        }

  });

      //GET ALL PRODUCTS

      router.get('/',async(req,res)=>{
             console.log("this area 1 is working")
        const qNew= req.query.new; 
             const qcategory =req.query.category;

        try{
            console.log("this area 2 is working")
            let products;
         
if(qNew){
    console.log("this area 3 is working")
    products =await Product.find().sort({createdAt: -1}).limit(5)
}
 else if (qcategory){
    console.log("this area 4 is working")
    products = await Product.find({
        
        categories: {

        $in :[qcategory],

        },
    
    
    });
 }else{
    console.log("this area 5 is working")
    products= await Product.find( )
 }


             res.status(200).json(products)
        }catch(err){
            console.log(err)
           res.status(500).json(err);
        }
    
  })





module.exports =router;

