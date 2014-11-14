var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Task 7' });
});

module.exports = router;

// Ниже создать 

exports.saveAddresses = function(req, res, next) {
  UrlModel = mongoose.model("address");
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