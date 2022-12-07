const {expect} = require('@playwright/test');
class APIUtils 

{
  constructor(apiContext,loginPayLoad)
  
  {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }
  async getToken()
   {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayLoad
      }
    );

    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    console.log(token);
    return token;
  }
  async createOrder(orderPayLoad) {
    let response = {};
    response.token= await this.getToken();
    const orderResponse = await this.apiContext.post(
      "https://www.rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayLoad,
        headers: {
          //call and create one order
          'Autohorization': response.token,
          "Content-Type": 'application/json'
        }
      }
    );
    const orderResponsJson = await orderResponse.json();
    console.log(orderResponsJson);
     const orderId = orderResponsJson.orders[0];
    response.orderId=orderId;
    return response;
  }
}
module.exports = { APIUtils };
