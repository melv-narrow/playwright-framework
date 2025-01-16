# Testing Standards

## Test Organization

1. **Test Structure**
   ```typescript
   test.describe('Feature', () => {
     test.beforeEach(async () => {
       await allure.epic('Feature Area');
       await allure.feature('Specific Feature');
     });

     test('should do something @smoke', async ({ page }) => {
       await allure.story('User Story');
       await allure.description(`
         Detailed test description
         with expected behavior
       `);
       
       // Arrange
       // Act
       // Assert
     });
   });
   ```

2. **Naming Conventions**
   - Test files: `*.spec.ts`
   - Test descriptions: Should be clear and descriptive
   - Page objects: `*.page.ts`
   - Fixtures: `*.fixture.ts`
   - Data files: `*.csv`, `*.json`

3. **Test Categories and Labels**
   - Test Types:
     - E2E Tests: `@e2e`
     - API Tests: `@api`
     - Smoke Tests: `@smoke`
     - Regression Tests: `@regression`
   
   - Allure Labels:
     - Epic: High-level feature area
     - Feature: Specific feature
     - Story: User story or scenario
     - Custom labels for better organization

4. **Data-Driven Testing**
   ```typescript
   // Using CSV files
   const testCases = parse(fs.readFileSync('test-data.csv'), {
     columns: true,
     skip_empty_lines: true
   });

   for (const testCase of testCases) {
     test(`${testCase.description}`, async ({ page }) => {
       // Test implementation
     });
   }
   ```

## Best Practices

1. **Test Independence**
   - Each test should be independent
   - Clean up test data
   - Don't rely on other tests
   - Use test fixtures for setup/teardown

2. **Element Selectors**
   - Prefer data-testid attributes
   - Use role-based selectors when appropriate
   - Avoid brittle selectors (like CSS or XPath)
   - Document complex selectors

3. **Assertions**
   - Use explicit assertions
   - Assert one thing per test
   - Use meaningful error messages
   - Add custom error messages for clarity

4. **Test Data**
   - Use constants for static test data
   - Implement data-driven tests for multiple scenarios
   - Use test data generators for dynamic data
   - Separate test data from test logic

5. **Error Handling**
   - Handle expected errors
   - Log unexpected errors
   - Use try-catch appropriately
   - Add screenshots and traces on failure

## Playwright Best Practices

1. **Use Built-in Tools**
   - VS Code Extension for test development
   - Codegen for test recording
   - Trace Viewer for debugging
   - UI Mode for interactive testing

2. **Test Debugging**
   ```typescript
   // Enable debugging
   test.only('debug this test', async ({ page }) => {
     await page.pause(); // Add breakpoint
   });

   // Use trace viewer
   test.use({ trace: 'on' });
   ```

3. **Performance Optimization**
   - Run tests in parallel
   - Use test sharding in CI
   - Implement retry logic for flaky tests
   - Optimize resource usage

## Allure Reporting

1. **Test Steps**
   ```typescript
   await allure.step('Step description', async () => {
     // Step implementation
   });
   ```

2. **Attachments**
   ```typescript
   // Add screenshots
   await allure.attachment(
     'screenshot',
     await page.screenshot(),
     'image/png'
   );

   // Add logs
   await allure.attachment(
     'logs',
     'Log content',
     'text/plain'
   );
   ```

3. **Test Categories**
   - Define custom categories in config
   - Use labels for better organization
   - Add environment information
   - Include test metadata

## Test Types

1. **E2E Tests**
   - Cover critical user paths
   - Test full user workflows
   - Verify UI interactions
   - Include visual testing

2. **API Tests**
   - Test all endpoints
   - Verify response formats
   - Handle error cases
   - Test API integrations

3. **Component Tests**
   - Test individual components
   - Verify component states
   - Check component interactions
   - Test accessibility

4. **Performance Tests**
   - Response time checks
   - Load testing scenarios
   - Resource usage monitoring
   - Browser performance metrics

## Documentation

1. **Test Documentation**
   - Clear test descriptions
   - Step-by-step instructions
   - Expected results
   - Test data requirements

2. **Code Documentation**
   - JSDoc comments
   - Type definitions
   - Complex logic explanation
   - Usage examples 