var express = require('express');
var router = express.Router();
mongoose = require("mongoose");

/* GET home page. */
router.get('/', function(req, res) {


  res.render('index', {
    entries: [
      {
        latitude_value: 1,
        longitude_value: 1,
        address: 1
      },
      {latitude_value: 2},
      {latitude_value: 3}
    ],
    title: 'Task 7'
  });
});

router.post("/save", function(req, res, next) {
  AddressModel = mongoose.model("address");
  console.log("Get request from ", req.url);
  console.log(req.body);

  newAddress = new AddressModel(req.body);
  newAddress.save(function(err, AddressInst) {
    if(err) {
      console.error("Error saving model", err);

      return res.json(500, {
        status : "ERROR",
        modelId: "",
        message: err.message
      });
    }

    if(!AddressInst) {
      console.error("No url saved");
      return res.json(500, {
        status : "ERROR",
        modelId: "",
        message: "There aren't the model you are looking for"
      });
    }

    console.log('ADD NEW URL');
    res.json(200, AddressInst.toJSON());
  });
});
 // Вместо saveUrls - искать в роутах

router.post("/del", function(req, res) {
  AddressModel = mongoose.model("url");
  var elemId = req.body.id;
  var elem = AddressModel.find({_id: elemId});
  elem.remove(function(err, entry) {
    if (err)
      return res.json(500, {
        error: err
      });

    console.log(entry);
    return res.json(200, {});
  });

});     // Аналогично, поправить под это задание по аналогии с Task6


module.exports = router;

// Ниже создать модели и функции сохранения данных в БД
// UrlModel - заменили на AddressModel
// Аналогично заменим в модели из Task6 все "Url"  на "Address"


//exports.saveAddresses = function(req, res, next) {
//  AddressModel = mongoose.model("address");
//  console.log("Get request from ", req.url);
//  console.log(req.body);
//
//  newAddress = new AddressModel(req.body);
//  newAddress.save(function(err, AddressInst) {
//    if(err) {
//      console.error("Error saving model", err);
//
//      return res.json(500, {
//        status : "ERROR",
//        modelId: "",
//        message: err.message
//      });
//    }
//
//    if(!AddressInst) {
//      console.error("No url saved");
//      return res.json(500, {
//        status : "ERROR",
//        modelId: "",
//        message: "There aren't the model you are looking for"
//      });
//    }
//
//    console.log('ADD NEW URL');
//    res.json(200, AddressInst.toJSON());
//  });
//};
//exports.delAddress = function(req, res) {
//  AddressModel = mongoose.model("url");
//  var elemId = req.body.id;
//  var elem = AddressModel.find({_id: elemId});
//  elem.remove(function(err, entry) {
//    if (err)
//      return res.json(500, {
//        error: err
//      });
//
//    console.log(entry);
//    return res.json(200, {});
//  });
//
//}