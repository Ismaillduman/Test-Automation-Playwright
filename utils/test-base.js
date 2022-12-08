const  base  = require("@playwright/test");


exports.coustomtest = base.test.extend(
{
    testDataForOrder:
    {

        username : "ismaildumann@web.de",
        password:"HKNclb8318.",
        productsName :"zara coat 3"
    
    }
}
)
// That's the another way to Parameterization.
// How to pass test data as fixture by extend test annotation behaviour