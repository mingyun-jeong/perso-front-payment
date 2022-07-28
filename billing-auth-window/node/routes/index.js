var express = require("express");
var got = require("got");
var uuid = require("uuid").v4;

var router = express.Router();

var secretKey = "test_ak_ZORzdMaqN3wQd5k6ygr5AkYXQGwy";

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/billing_confirm", function (req, res) {
  got
    .post("https://api.tosspayments.com//v1/billing/authorizations/issue", {
      headers: {
        Authorization:
          "Basic " + Buffer.from(secretKey + ":").toString("base64"),
        "Content-Type": "application/json",
      },
      json: {
        authKey: req.query.authKey,
        customerKey: req.query.customerKey,
      },
      responseType: "json",
    })
    .then(function (response) {
      console.log(response.body);

      res.render("success", {
        isSuccess: true,
        responseJson: response.body,
      });
    })
    .catch(function (error) {
      res.render("success", {
        isSuccess: false,
        responseJson: error.response.body,
      });
    });
});

router.get("/fail", function (req, res) {
  res.render("fail", {
    message: req.query.message,
    code: req.query.code,
  });
});

module.exports = router;
