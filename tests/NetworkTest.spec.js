const { test, expect, request} = require("@playwright/test");
const {APIUtils} =require('../utils/APIUtils');
const loginPayLoad= {userEmail: "ismaildumann@web.de", userPassword: "HKNclb8318."};
const orderPayLoad= {orders: [{country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]};
const fakePayLoadOrders= {data:[],message:"No Orders"};

let response;
test.beforeAll(async()=>
{
    const apiContext = await request.newContext();
   const apiUtils= new APIUtils(apiContext,loginPayLoad);
   response =await apiUtils.createOrder(orderPayLoad);
  })
   
   

test("place the order", async ({ page }) => {

  
    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },response.token);

 
  await page.goto("https://rahulshettyacademy.com/client/");

  page.route("https://rahulshettyacademy.com/api/ecom/user/get-cart-count/638daa7603841e9c9a4a5fb6",
  async route=>
  {
    //So we are switching our browser based mode to API testing helper mode.
    const response= await page.request.fetch(route.request());
    let body=fakePayLoadOrders;
    route.fulfill(
      
      {
        response,
        body,


    });
//intercepting response _ API response ->playwright fakerresponse->browser->render data on front end

  }
  );
  await page.pause();
  await page.locator("button[routerlink*='myorders']").click();
  

 
});
