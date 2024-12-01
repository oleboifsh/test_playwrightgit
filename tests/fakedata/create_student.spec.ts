import { getPersonnummer } from '../../utils/personnummer'
import { expect, request, test } from '../fixtures'
import { faker } from '@faker-js/faker'

test('Test random data api', async ({apiContext}) => {
    const student = {
        age: faker.number.float(),
        name: faker.person.fullName(),
        grade: await getPersonnummer()
    }
    console.log(student)

    const response = await apiContext.post('/student', {data: student});
    expect(response).toBeTruthy();

})