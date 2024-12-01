import { test, expect } from './student-fixture'; // Path to the fixture file

test('Verify student creation and deletion', async ({ studentId }) => {
  console.log(`Using student ID: ${studentId}`);

  // Perform your assertions or UI interactions here
  // Example: Check student exists in UI or verify related API responses
  expect(studentId).toBeTruthy(); // Ensure the student ID was provided
});
