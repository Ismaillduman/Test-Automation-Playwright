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
  await page.locator("button[routerlink*='myorders']").click();
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6390f39b03841e9c9a4cd14d",
  route=>route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6391100703841e9c9a4cdd21'})

  )
await page.locator("button:has-text('View')").first().click();
await page.pause();
 
});
