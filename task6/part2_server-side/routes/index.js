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
    UrlModel.find(function(err, entries) {
      if (err) return console.error(err);
      console.log('ADD NEW URL');
      res.render('list', {entries: entries});
    });

    // return res.send(200, {
    //   status : "OK",
    //   modelId: urlInst._id
    // });
  });
};
exports.delUrl = function(req, res) {
  UrlModel = mongoose.model("url");
  var elemId = req.body.id;
  var elem = UrlModel.find({_id: elemId});
  elem.remove(function(err, entry) {
    if (err) return console.error(err);

      UrlModel.find(function(err, entries) {
        if (err) return console.error(err);
        res.render('list', { entries: entries});
  });
  });

}