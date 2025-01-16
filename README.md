# Playwright Test Automation Framework

A modern, maintainable test automation framework built with Playwright and TypeScript, following ISTQB standards and best practices.

## Features

- Page Object Model design pattern
- Cross-browser testing support
- Parallel test execution
- Allure reporting with detailed steps and attachments
- Screenshot and video capture on failure
- Environment management
- API testing support
- TypeScript type safety
- Comprehensive logging
- Custom test fixtures
- Data-driven testing with CSV support
- Behavior-driven test organization with Allure labels

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Supported browsers (Chrome, Firefox, Safari)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd playwright-framework
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install --with-deps
```

## Configuration

1. Environment Variables:
   Create a `.env.{environment}` file (e.g., `.env.dev`, `.env.staging`) with:
```env
BASE_URL=<your-application-url>
API_KEY=<your-api-key>
LOG_LEVEL=info
```

2. Update test data in:
   - `src/data/constants.ts` for static test data
   - `tests/data/*.csv` for data-driven tests

## Running Tests

```bash
# Run all tests
npm test

# Run tests with UI mode
npm run test:ui

# Run tests in headed mode
npm run test:headed

# Run specific test file
npm test tests/e2e/login.spec.ts

# Run tests with specific tag
npm run test:smoke
npm run test:regression

# Run tests in specific browser
npm test -- --project=chromium
npm test -- --project=firefox
npm test -- --project=webkit

# Generate and open Allure report
npm run report
```

## Project Structure

```
playwright-framework/
├── src/
│   ├── pages/          # Page Object Models
│   ├── fixtures/       # Custom test fixtures
│   ├── helpers/        # Helper functions
│   ├── data/          # Test data and constants
│   └── utils/         # Utility functions
├── tests/
│   ├── e2e/           # End-to-end tests
│   ├── api/           # API tests
│   └── data/          # Test data files (CSV, JSON)
├── config/            # Configuration files
├── docs/             # Documentation
└── reports/          # Test reports
```

## Test Organization

1. **Test Categories**
   - E2E Tests: `@e2e`
   - API Tests: `@api`
   - Smoke Tests: `@smoke`
   - Regression Tests: `@regression`

2. **Allure Labels**
   - Epic: High-level feature area
   - Feature: Specific feature
   - Story: User story or test scenario

## Best Practices

1. Follow Page Object Model pattern
2. Write descriptive test names
3. Use data-testid for element selectors
4. Keep tests independent
5. Use appropriate waiting strategies
6. Handle errors gracefully
7. Document new features and changes
8. Use Allure steps for better reporting
9. Implement data-driven tests where applicable
10. Add TypeScript type checking in CI pipeline

## Playwright Tools

1. **VS Code Extension**
   - Install the Playwright VS Code extension for better development experience
   - Use the test generator to create tests
   - Debug tests directly in VS Code

2. **Trace Viewer**
   - View test execution timeline
   - Inspect DOM snapshots
   - Analyze network requests
   - Debug test failures

3. **UI Mode**
   - Interactive test development
   - Time travel debugging
   - Watch mode for tests

## Documentation

- [Contributing Guidelines](CONTRIBUTING.md)
- [Technical Design](docs/TECHNICAL_DESIGN.md)
- [Testing Standards](docs/TESTING_STANDARDS.md)
- [Maintenance Guide](docs/MAINTENANCE_GUIDE.md)
- [CI/CD Setup](docs/CI_CD_SETUP.md)

## Support

For support, please open an issue in the repository. 