import { test } from '@playwright/test'

test('Get student from API', async () => {
    const response = await fetch('https://test-379574553568.us-central1.run.app/student', 
        { 
            headers: {'api_key': 'olesias_key'}
        })
        const responsejson = await response.json()
        console.log(responsejson)
})

test('Add a new student with API', async () => {
    const student = {
        age: '55',
        grade: 'G',
        name: 'Lolo'
    }
    const responsePost = await fetch('https://test-379574553568.us-central1.run.app/student', 
        { 
            method: 'POST',
            body: JSON.stringify(student),
            headers: {'api_key': 'olesias_key',
                'Content-type': 'application/json'
            }
        })
        const responsejson = await responsePost.json()   
        const addedStudent = await fetch(`https://test-379574553568.us-central1.run.app/student/${responsejson.student_id}`,  
            { 
                headers: {'api_key': 'olesias_key'}
            })
        console.log(addedStudent)
        const response = await fetch('https://test-379574553568.us-central1.run.app/student', 
            { 
                headers: {'api_key': 'olesias_key'}
            })
        const responsejsonget = await response.json()
        console.log(responsejsonget)

})

test('Update a student with API', async () => {
    const student = {
        age: '25',
        grade: 'A',
        name: 'Didi'
    }
    const responsePost = await fetch('https://test-379574553568.us-central1.run.app/student', 
        { 
            method: 'POST',
            body: JSON.stringify(student),
            headers: {'api_key': 'olesias_key',
                'Content-type': 'application/json'
            }
        })
    const responsepostjson = await responsePost.json()  
    const studentId = responsepostjson.student_id
    student.name = 'Olga'
    student.age = '12'
    student.grade = 'B'


    const responsePut = await fetch(`https://test-379574553568.us-central1.run.app/student/${studentId}`, 
        { 
            method: 'PUT',
            body: JSON.stringify(student),
            headers: {'api_key': 'olesias_key',
                'Content-type': 'application/json'
            }
        })
    const responseputjson = await responsePut.json()  
    console.log(responseputjson) 
    }
)