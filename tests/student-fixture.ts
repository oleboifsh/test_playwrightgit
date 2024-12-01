import { test as base, expect, request } from '@playwright/test';

// Extend base test with a custom fixture for student management
const test = base.extend<{
  studentId: string; // To store the created student's ID
}>({
  // Define the fixture
  studentId: async ({}, use) => {
    const apiContext = await request.newContext({
      baseURL: 'https://test-379574553568.us-central1.run.app',
      extraHTTPHeaders: {
        'api_key': 'Olesia_1',
        'content-type': 'application/json',
      },
    });

    // Create a student
    const createResponse = await apiContext.post('/student', {
      data: {
        name: 'TestStudent',
        age: '20',
        grade: 'A',
      },
    });
    

    // Ensure the student was created successfully
    const createData = await createResponse.json();
    const studentId = createData.id; // Assuming response includes `id`
    console.log(`Created student with ID: ${studentId}`);

    // Provide the student ID to the test
    await use(studentId);

    // Delete the student after the test
    if (studentId) {
      const deleteResponse = await apiContext.delete(`/students/${studentId}`);
      console.log(`Deleted student with ID: ${studentId}, Status: ${deleteResponse.status()}`);
    }

    // Dispose the API context
    await apiContext.dispose();
  },
});

export { test, expect };
