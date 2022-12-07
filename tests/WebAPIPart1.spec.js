const { test, expect, request} = require("@playwright/test");
const loginPayLoad= {userEmail: "ismaildumann@web.de", userPassword: "HKNclb8318."}
const orderPayLoad = {orders: [{country: "India", 
productOrderedId: "6262e95ae26b7e1a10e89bf0"}]};

let token;
let orderId;
test.beforeAll(async()=>
{
    const apiContext = await request.newContext();
    const loginResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data: loginPayLoad
    })
    expect (loginResponse.ok()).toBeTruthy();
    const loginResponseJson= await loginResponse.json();
     token= loginResponseJson.token;
    console.log(token);



    const orderResponse= await apiContext.post("https://www.rahulshettyacademy.com/api/ecom/order/create-order",
    { data: orderPayLoad,
        headers: {
//call and create one order
            'Autohorization': token,
            'Content-Type': 'application/json'
            
        },
    
    } )
    const orderResponsJson= await orderResponse.json();
    console.log(orderResponsJson);
    orderId= orderResponsJson.orders[0];

});

test.beforeEach(()=>{


})
test("place the order", async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },token);

 
  await page.goto("https://rahulshettyacademy.com/client/");

//   await username.type("ismaildumann@web.de");
//   await password.fill("HKNclb8318.");
//   await loginBtn.click();

  //await page.waitForLoadState("networkidle"); // for Server based Application
  //console.log(await products.first().textContent());
  
 

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator('tbody').waitFor();
  const rows= await page.locator("tbody tr");

  for (let i = 0; i < await rows.count(); i++) {
    const rowOrderId =await rows.nth(i).locator('th').textContent();
    
    if(orderId.includes(rowOrderId)){
      await rows.nth(i).locator('button').first().click();
      break;
    }
    
  }
const orderIdDetails= await page.locator('.col-text').textContent();
await page.pause();
 expect(orderId.includes(orderIdDetails)).toBeTruthy();
});