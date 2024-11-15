import { Locator, Page } from "@playwright/test";
 
export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator | undefined;
 
    constructor(page: Page){
        this.page=page;
        this.usernameInput = page.getByLabel("Username")
        this.passwordInput = page.getByLabel("Password")
        this.submitButton = page.getByRole('button', {name: "Login"})
    }
 
    async login(username: string, password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password)
        await this.submitButton.click()
    }
}