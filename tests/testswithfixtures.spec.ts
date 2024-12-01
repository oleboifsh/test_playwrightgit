import {test, request, APIRequestContext, expect} from './fixtures'


const testList = [
    {age: "100", name: "Anna", grade: "B"},
    {age: "12", name: "Olga", grade: "C"},
    {age: "34", name: "Daniel", grade: "A+"},
]
testList.forEach(({age, name, grade }) => {
    test(`Create a student using API with parametrizationandfixtures: ${name}`, async ({apiContext})=> {
        const student = {
            age: age,
            grade: name, 
            name: grade
            }
            console.log(age, name, grade)
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
})



  
  