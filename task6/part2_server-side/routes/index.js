mongoose = require("mongoose");

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Get short URL right now! It\'s here only! WOOOOOOW!!! ' })
};

exports.saveUrls = function(req, res, next) {
  UrlModel = mongoose.model("url");

  console.log("Get request from ", req.url);
  console.log(req.body);

  // здесь должны быть проверки на наличие всех полей и их валидность.

  newUrl = new UrlModel(req.body);
  newUrl.save(function(err, urlInst) {
    if(err) {
      console.error("Error saving model", err);

      return res.send(200, {
        status : "ERROR",
        modelId: "",
        message: err.message
      });
    }

    if(!urlInst) {
      console.error("No url saved");
      return res.send(200, {
        status : "ERROR",
        modelId: "",
        message: "There aren't the model you are looking for"
      });
    }

    return res.send(200, {
      status : "OK",
      modelId: urlInst._id
    });
  });
};