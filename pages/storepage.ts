import { Locator, Page } from '@playwright/test';

export class StorePage {
  private readonly page: Page;

  // Locators
  readonly selectProductDropdown: Locator;
  readonly amountInput: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly buyButton: Locator;
  readonly nameInput: Locator;
  readonly addressInput: Locator;
  readonly confirmPurchaseButton: Locator;
  readonly closeButton: Locator;
  readonly userName: Locator;
  readonly currentBalance: Locator;
  readonly firstProductInCart: Locator;
  readonly header: Locator;
  readonly buyMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.selectProductDropdown = page.getByTestId('select-product');
    this.amountInput = page.getByLabel('Amount');
    this.addToCartButton = page.getByTestId('add-to-cart-button');
    this.removeButton = page.getByTestId('Apple-remove-button'); // Assuming 'Apple-remove-button' is static
    this.buyButton = page.getByRole('button', { name: 'Buy' });
    this.nameInput = page.getByLabel('Name:');
    this.addressInput = page.getByLabel('Address:');
    this.confirmPurchaseButton = page.getByRole('button', { name: 'Confirm Purchase' });
    this.closeButton = page.getByText('Close');
    this.userName = page.getByTestId('username');
    this.header = page.locator('h1');
    this.currentBalance = page.getByTestId('money');
    this.firstProductInCart = page.locator('xpath=//*[@id="cartItems"]/tr/td[1]');
    this.buyMessage = page.getByTestId('buy-message')

  }

    // Navigate to the store page
    async navigate(username: string, role: string) {
      const url = `https://hoff.is/store2/?username=${username}&role=${role}`;
      await this.page.goto(url);
    }
  
    // Add a product to the cart
    async addProductToCart(productId: string, amount: string) {
      await this.selectProductDropdown.selectOption(productId);
      await this.amountInput.fill(amount);
      await this.addToCartButton.click();
    }
  
    // Remove a product from the cart
    async removeProductFromCart() {
      await this.removeButton.click();
    }
  
    // Complete a purchase
    async completePurchase(name: string, address: string) {
      await this.buyButton.click();
      await this.nameInput.fill(name);
      await this.addressInput.fill(address);
      await this.confirmPurchaseButton.click();
      await this.closeButton.click();
    }

    async getUsername() {
      this.page.waitForTimeout(200);
      return this.userName.textContent();
    }
}