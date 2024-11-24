import {test, request, APIRequestContext, expect} from '@playwright/test'

let apiContext: APIRequestContext;
test.beforeAll('Setup api context', async ()=> {
    apiContext = await request.newContext({
        baseURL: 'https://test-379574553568.us-central1.run.app',
        extraHTTPHeaders: {
            'api_key': 'Olesia_1',
            'content-type': 'application/json'
        }
    })
})

test('Create a student using API', async ()=> {
    const student = {
        age: '13',
        grade: 'A', 
        name: 'Peter'
        }
    //Create a new student using POST
    const response = await apiContext.post("/student", {data: student} )
    const responsejson = await response.json()
    console.log(responsejson)
    const studentId = responsejson.student_id

    //Get newly added student using GET
    const responseGet = await apiContext.get(`/student/${studentId}`)
    const responseGetJson = await responseGet.json()

    //Check expected age
    expect(responseGetJson.age).toBe(student.age)
})


