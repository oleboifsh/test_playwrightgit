import { APIRequestContext, expect, request, test } from '@playwright/test'
import { StorePage } from '../../pages/storepage';
import { injectAxe, checkA11y } from 'axe-playwright';
//import { customer } from './setup.setup';

export const customer = 'VipClient'
let apiContext: APIRequestContext;
test.beforeAll('Setup api context', async ()=> {
    apiContext = await request.newContext({
        //baseURL: "https://hoff.is/store2",
        baseURL: "https://hoff.is",        
        extraHTTPHeaders: {
            'content-type': 'application/json',
          }
    })
})

test('Test1 Positive UI test. Make a purchase and check debiting', async ({ page }) => {
    const storePage = new StorePage(page);
    const product = {
      id: 8,
      price: 29,
      vat: 5.8,
      name: "Cup of coffee"
    }  
    const quantity = 2;
  
    // Navigate to the store page
    await storePage.navigate(customer, 'consumer');
  
    // Add first product to the cart
    await storePage.addProductToCart('1', '5');
  
    // Remove the first product from the cart
    await storePage.removeProductFromCart();
  
    // Add second product to the cart
    await storePage.addProductToCart(product.id.toString(), quantity.toString());
  
    // Complete the purchase
    await storePage.completePurchase(customer, 'Sunbyberg, Kungsgatan 67');

    // Check a charge to the account and its a right person account is debited
    expect(await storePage.userName.textContent()).toBe(`User: ${customer}`); 

    //Comment for Markus: I don't quite understnd how rounding of VAT is count in the program, its a bit different with 
    //different products and quantity so am taking it this way:
    const vat = Math.floor(product.vat*quantity); 
    //const vat = product.vat*quantity; 
    console.log(vat);
    expect(await storePage.currentBalance.textContent(), 'Money on the account after the purchase should be:').toBe(`${10000 - product.price*quantity - vat}`);
  
    // Add another product after purchase
    await storePage.addProductToCart('9', '5');

    //Check that it is in the cart, but money weren't debited from the person account:
    expect(await storePage.firstProductInCart.textContent(), 'No changes on amount of accounts money should be done').toBe('Chair');
    expect(await storePage.currentBalance.textContent(), 'Money on the account after the purchase should be:').toBe(`${10000 - product.price*quantity - vat}`);

  });

  test('Test2 Negative UI test. Try to make a purchase for an amount greater than money in a wallet.', async ({ page }) => {
    const storePage = new StorePage(page);
    const product = {
      id: 6,
      price :4999,
      vat: 999.8,
      name:"Samsung S6"
   } 
    const quantity = 3;
  
    // Navigate to the store page
    await storePage.navigate(customer, 'consumer');
  
    // Add products which price is greater than money in a wallet to the cart
    await storePage.addProductToCart(product.id.toString(), quantity.toString());
  
    // Check that it wasn't any charge to the account and a right notification message is shown
    expect(await storePage.buyMessage.textContent()).toBe(`Insufficient funds!`); 
    expect(await storePage.currentBalance.textContent(), 'Money on the account after the purchase should be:').toBe(`10000`);

  })  

const testList = [
    {productName: 'Bicycle', productPrice: 899, productId: 5},
    {productName: 'Cup of coffee', productPrice: 29, productId: 8}
]
testList.forEach(({productName, productPrice, productId }) => {
  test(`Test3 Positive API test. Show a product details: ${productName}`, async () => 
    {     
        //GET store2/api/v1/price/{productId} 
        //Comment for Markus: couldn't find any solution to fix problem with getting 404 with using
        //baseUrl: https://hoff.is/store2 and endpoint: api/v1/price/1
        //with execution url loosing its part and became equal to: https://hoff.is/api/v1/price/1
        //Chat GPT says that the Playwright APIRequestContext.get() method resolves the path with 
        //ignoring all after the leading slash 

        //Get product details using GET
        const responseGet = await apiContext.get(`store2/api/v1/price/${productId}`)
        const responseGetJson = await responseGet.json()
        console.log(responseGetJson)

        //Validate the result 
        expect(responseGetJson.price).toBe(productPrice);
    })
  })

  test('Test4 Positive API test. Check tha all products for purchase have ID and name', async () => 
    {      
        //GET store2/api/v1/product/list'

        //Get list of products using GET
        const responseGet = await apiContext.get(`store2/api/v1/product/list`)
        const responseGetJson = await responseGet.json()
        console.log(responseGetJson)

        //Validate that parameters of each element in the list will have some values
        responseGetJson.products.forEach((product) => {
          expect(Number.isInteger(product.id)).toBeTruthy();
          expect(product.name).not.toBeNull();         
          console.log(product.id, product.name)});
    })


  test('Test5 Perform Axe accessibility test', async ({ page }) => 
    {
        const storePage = new StorePage(page);

        // Navigate to the store page
        await storePage.navigate(customer, 'consumer');
      
        // Inject Axe for accessibility testing
        await injectAxe(page);
      
        // Run Axe accessibility checks
        await checkA11y(page, undefined, {
          detailedReport: true,
          detailedReportOptions: { html: true },
        });
      });

      