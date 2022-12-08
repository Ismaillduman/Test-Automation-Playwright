
const {LoginPage}= require('./LoginPage.spec');
const {DashboardPage}=require('./DashboardPage.spec');
// when i defined like above i need to write in actual test file 
// like this const {POMManager}= require('../POM/POMManager.spec');
//then you have create a object inside test block const poManager=new POMManager();
 // and dont forget to write  (page) in constructor and new POMManager(page) 
//inside actual test creat that const loginPage= poManager.getloginPage
//and all the other page have to declair like this loginPage= poManager.getloginPage();
const {OrdersHistoryPage} = require('./OrdersHistoryPage');
const {OrdersReviewPage} = require('./OrdersReviewPage');
const {CartPage} = require('./CartPage');

 class POMManager
{
    constructor(page)
    {this.page=page;
        this.loginPage= new LoginPage(page);
        this.dashboardPage= new DashboardPage(page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
    this.ordersReviewPage = new OrdersReviewPage(this.page);
    this.cartPage = new CartPage(this.page);
    }
    getLoginPage(){

        return this.loginPage;
    }

    getDashboardPage(){

        return this.dashboardPage;
    }

    getCartPage()
{
    return this.cartPage;
}

getOrdersHistoryPage()
{
    return this.ordersHistoryPage;
}

getOrdersReviewPage()
{
    return this.ordersReviewPage;
}
}
module.exports={POMManager};