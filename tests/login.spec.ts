
import test from "@playwright/test";
import { LoginPage } from "../pages/loginpage";

test('Login with Markus', async ({page}) => {
    const loginPage = new LoginPage(page)
    await page.goto("https://hoff.is/login")
    await loginPage.login("Markus", "sup3rs3cr3t")

});