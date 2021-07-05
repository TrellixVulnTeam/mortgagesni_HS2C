//Source variables 
let key = '89a6a144-2cde-46b0-b396-b1363d883fe1';
var soap = require('soap');

//Show the parentl pages 

let products;
var requestUrl = 'https://reapext.assureweb.co.uk/Ape2/EnhancedProtectionComparisonService.svc?singleWsdl';
var args =  {
    Header: "application/vnd.api+json",
    EnhancedProtectionComparisonQuoteRequest: {
        TransactionHeaders: "",
        PolicyBasis: {
            FirstLife : {
                Title: "",
                Forename : "",
                Surname: "",
                DateOfBirth: 24-02-1984,
                Gender: "Male",
                Occupation: "",
                Smoker: false,
                Salary: 20000
            },

        },
        QuotationBasis: "SumAssured", //Page 28
        NumberOfBenefitsChosen: 1,
        PremiumFrequency: "Monthly",
        RequestPremiumType: "Guaranteed",
        CommissionOptions: {

        },
        ProvidersRequested:{

        }
    }
};

let requestedPage;

exports.getProducts = (req, res, next) => {

    soap.createClient(requestUrl, function(err, client) {
        if(err){
            console.log(err)
        }else{
            client.SubmitComparisonQuoteRequest(args, function(err, result){
                if(err){
                    console.log(err)
                }else{
                    console.log(result)
                }
            })
        }
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

