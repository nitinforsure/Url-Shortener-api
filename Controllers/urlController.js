const Url = require("../models/urlModel");
const {nanoid} = require("nanoid");
//creating a short url
const createShortUrl = async(req , res) =>{
    //object destructuring  
    const {originalUrl}= req.body;
    if(!originalUrl) {
        return res.status(400).json({message: "url is required"});
    }
    const shortCode = nanoid(6);
    const newUrl = await Url.create({
        originalUrl,
        shortCode
    });
    res.json({
        shortUrl: `${shortCode}`
    });
};
/*redirect
Url → Mongoose Model

url → One document (a record from MongoDB) */
const redirectUrl = async(req,res)=> {
    const {shortCode} = req.params;
    //debugging 
    console.log("Params:", req.params);

    //creating the document from model 
    const url = await Url.findOne({shortCode});
    if(!url){
        return res.status(404).json({message:"url not found"});
    }
    url.clicks++;
    await url.save();
    res.redirect(url.originalUrl);
   res.json({ originalUrl: url.originalUrl });


};
module.exports = {createShortUrl, redirectUrl};

