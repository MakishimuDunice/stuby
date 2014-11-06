mongoose = require("mongoose");
/*
 * GET home page.
 */

exports.index = function(req, res){
  UrlModel = require('../app').UrlModel;
  UrlModel.find(function(err, entries) {
    if (err) return console.error(err);
    res.render('index', {title: 'Get short URL right now! It\'s here only! ', entries: entries});

  });
};

exports.saveUrls = function(req, res, next) {
  UrlModel = mongoose.model("url");
  console.log("Get request from ", req.url);
  console.log(req.body);

  newUrl = new UrlModel(req.body);
  newUrl.save(function(err, urlInst) {
    if(err) {
      console.error("Error saving model", err);

      return res.json(500, {
        status : "ERROR",
        modelId: "",
        message: err.message
      });
    }

    if(!urlInst) {
      console.error("No url saved");
      return res.json(500, {
        status : "ERROR",
        modelId: "",
        message: "There aren't the model you are looking for"
      });
    }

    console.log('ADD NEW URL');
    res.json(200, urlInst.toJSON());
  });
};
exports.delUrl = function(req, res) {
  UrlModel = mongoose.model("url");
  var elemId = req.body.id;
  var elem = UrlModel.find({_id: elemId});
  elem.remove(function(err, entry) {
    if (err)
      return res.json(500, {
        error: err
      });

    console.log(entry);
    return res.json(200, {});
  });

}