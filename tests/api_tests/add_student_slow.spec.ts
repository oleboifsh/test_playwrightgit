import { expect, test } from '../fixtures'

test('Test slow api', async ({apiContext}) => {
    const student = {
        age: "19",
        name: "slow_add",
        grade: "A"
    }

    const response = await apiContext.post('/student', {data: student});
    expect(response).toBeTruthy();



})