import {test, request, APIRequestContext, expect} from '@playwright/test'
import { StudentPage } from '../pages/studentpage';

let apiContext: APIRequestContext;
const api_key = 'olesia_many_api_keys'
test.beforeAll('Setup api context', async ()=> {
    apiContext = await request.newContext({
        baseURL: 'https://test-379574553568.us-central1.run.app',
        extraHTTPHeaders: {
            'api_key': api_key,
            'content-type': 'application/json'
        }
    })
    await apiContext.delete("/student_delete_all");
})

test('Student page interactions', async ({ page }) => {

    const studentPage = new StudentPage(page);
 
    // Navigate to the page and set API key

    await studentPage.navigateToPageAndSetApiKey(api_key);
 
    // Add a new student

    await studentPage.addStudent('olesia_student_name', '18', 'A+');
 
    // Edit the student

    await studentPage.editStudent('1', 'olesia_student_name_new', '19', 'C');
    await page.waitForTimeout(1000);
 
    //Get newly added student using GET
    const responseGet = await apiContext.get(`/student/1`)
    const responseGetJson = await responseGet.json()

    //Check expected fields
    expect(responseGetJson.age).toBe('19')
    expect(responseGetJson.name).toBe('olesia_student_name_new')
    expect(responseGetJson.grade).toBe('C')

});