
import test from "@playwright/test";
import { LoginPage } from "../pages/loginpage";


let password: string
test('Login with Markus', async ({page}) => {
    const loginPage = new LoginPage(page)
    await page.goto("https://hoff.is/login")
    if (process.env.PASSWORD !== undefined) {
        password = process.env.PASSWORD
    }
    await loginPage.login("Markus", password)
});