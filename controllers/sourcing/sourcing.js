//Source variables 
let key = '89a6a144-2cde-46b0-b396-b1363d883fe1';
var soap = require('soap');

//Show the parentl pages 

let products;
var requestUrl = 'https://stagingapi.twenty7tec.com/sourcing.svc?wsdl';
var args =  {
    licenseKey: '89a6a144-2cde-46b0-b396-b1363d883fe1',
    input: {
      CompanyId: "IMOU85",
      SiteId: "USSCB2",

      Term: "40",
      ExpectedValuation: "200000",
      LoanRequired: "190000",
      MortgageType: "Standard",
      PaymentMethod: "Repayment",

      ReasonForMortgage: "Purchase",
      MortgageType: "Standard",
      PaymentMethod: "Repayment",
      PostCode: "XI",
      NumberOfItems: 2
    }
};

let requestedPage;

exports.getProducts = (req, res, next) => {

    soap.createClient(requestUrl, function(err, client) {
        client.RunSource(args, function(err, result) {
          if(err){
            console.log(err)
          }else{
              console.log(result.RunSourceResult.Results.Results)

            products = result.RunSourceResult.Results.Results;
            res.render("sourcing/sourcing-home")
          }
        });
      }) 
}

exports.updateProducts = (req, res, next) => {
    console.log("route hit")

    const url = req.originalUrl;
    soap.createClient(requestUrl, function(err, client) {
        client.RunSource(args, function(err, result) {
          if(err){
            console.log(err)
          }else{

            products = result.RunSourceResult.Results.Results;

            res.status(200).json({
                ExpectedValuation: "200000", 
                products : result.RunSourceResult.Results.Results
            })
          }
        });
      })
}