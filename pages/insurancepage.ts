import { Page, Locator, expect } from '@playwright/test';

export class InsurancePage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly apartmentSizeInput: Locator;
  readonly adultsInput: Locator;
  readonly kidsInput: Locator;
  readonly calculateButton: Locator;
  readonly monthlyPrice: Locator;
  readonly yearlyPrice: Locator;
  readonly coverageSelect: Locator;
  readonly coverageText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First name');
    this.lastNameInput = page.getByPlaceholder('Last name');
    this.addressInput = page.getByPlaceholder('Main St');
    this.apartmentSizeInput = page.getByPlaceholder('Apartment size');
    this.adultsInput = page.getByLabel('Adults');
    this.kidsInput = page.getByLabel('Kids');
    this.calculateButton = page.getByRole('button', { name: 'Calculate price' });
    this.monthlyPrice = page.locator('#monthly');
    this.yearlyPrice = page.locator('#yearly');
    this.coverageSelect = page.locator('#inputCoverage');
    this.coverageText = page.locator('#coverage');
  }

  async goToPage() {
    await this.page.goto('https://hoff.is/insurance');
  }

  async fillInsuranceForm(firstName: string, lastName: string, address: string, size: string, 
    adults: string, kids: string, coverage: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.addressInput.fill(address);
    await this.apartmentSizeInput.fill(size);
    await this.adultsInput.fill(adults);
    await this.kidsInput.fill(kids);
    await this.coverageSelect.selectOption(coverage);
  }  

 
  async clickCalculate() {
    await this.calculateButton.click();
  }

  async getMonthlyPriceText() {
    return this.monthlyPrice;
  }

  async getYearlyPriceText() {
    return this.yearlyPrice;
  }

  async getCoverageText() {
    return this.coverageText;
  }

  async verifyPrices(monthly: string, yearly: string) {
    await expect(this.monthlyPrice).toContainText(monthly);
    await expect(this.yearlyPrice).toContainText(yearly);
  }

  async verifyCoverageText(coverage: string) {
    await expect(this.coverageText).toContainText(coverage);
  }
}