# CI/CD Setup Guide

## GitHub Actions Setup

1. **Workflow Configuration**
   ```yaml
   name: Playwright Tests
   on:
     push:
       branches: [ main ]
     pull_request:
       branches: [ main ]
   
   jobs:
     test:
       timeout-minutes: 60
       runs-on: ubuntu-latest
       steps:
       - uses: actions/checkout@v3
       - uses: actions/setup-node@v3
         with:
           node-version: 18
       - name: Install dependencies
         run: npm ci
       - name: Install Playwright Browsers
         run: npx playwright install --with-deps
       - name: Run Playwright tests
         run: npm run test
       - uses: actions/upload-artifact@v3
         if: always()
         with:
           name: playwright-report
           path: playwright-report/
           retention-days: 30
   ```

2. **Environment Setup**
   ```yaml
   env:
     BASE_URL: ${{ secrets.BASE_URL }}
     API_KEY: ${{ secrets.API_KEY }}
     ENV: staging
   ```

## Jenkins Pipeline

1. **Jenkinsfile Configuration**
   ```groovy
   pipeline {
       agent any
       
       environment {
           NODE_VERSION = '18'
           BASE_URL = credentials('base-url')
           API_KEY = credentials('api-key')
       }
       
       stages {
           stage('Setup') {
               steps {
                   sh 'npm ci'
                   sh 'npx playwright install --with-deps'
               }
           }
           
           stage('Test') {
               steps {
                   sh 'npm run test'
               }
           }
           
           stage('Report') {
               steps {
                   sh 'npm run report'
                   publishHTML([
                       allowMissing: false,
                       alwaysLinkToLastBuild: true,
                       keepAll: true,
                       reportDir: 'allure-report',
                       reportFiles: 'index.html',
                       reportName: 'Allure Report'
                   ])
               }
           }
       }
   }
   ```

## Docker Setup

1. **Dockerfile**
   ```dockerfile
   FROM mcr.microsoft.com/playwright:v1.42.1-focal
   
   WORKDIR /app
   
   # Copy project files
   COPY package*.json ./
   COPY playwright.config.ts ./
   COPY tsconfig.json ./
   COPY src ./src
   COPY tests ./tests
   
   # Install dependencies
   RUN npm ci
   
   # Run tests
   CMD ["npm", "test"]
   ```

2. **Docker Compose**
   ```yaml
   version: '3'
   services:
     tests:
       build: .
       environment:
         - BASE_URL=${BASE_URL}
         - API_KEY=${API_KEY}
         - ENV=staging
       volumes:
         - ./reports:/app/reports
   ```

## Environment Configuration

1. **Environment Variables**
   ```bash
   # .env.staging
   BASE_URL=https://staging.example.com
   API_KEY=your-api-key
   LOG_LEVEL=info
   ```

2. **Secret Management**
   - Use GitHub Secrets
   - Jenkins Credentials
   - Docker secrets

## Test Execution

1. **Local Development**
   ```bash
   # Run tests locally
   npm test
   
   # Run with specific configuration
   ENV=staging npm test
   ```

2. **CI Environment**
   ```bash
   # Install dependencies
   npm ci
   
   # Install browsers
   npx playwright install --with-deps
   
   # Run tests
   npm run test:ci
   ```

## Reporting Configuration

1. **Allure Setup**
   ```yaml
   - name: Generate Allure Report
     if: always()
     run: |
       npm run report
       
   - name: Deploy Report
     if: always()
     uses: peaceiris/actions-gh-pages@v3
     with:
       github_token: ${{ secrets.GITHUB_TOKEN }}
       publish_dir: ./allure-report
   ```

2. **Custom Reports**
   - Configure report generation
   - Set up report hosting
   - Configure notifications

## Monitoring

1. **Test Results**
   - Track test execution
   - Monitor flaky tests
   - Performance metrics

2. **Resource Usage**
   - CPU/Memory monitoring
   - Network usage
   - Browser instances

## Security Considerations

1. **Access Control**
   - Repository permissions
   - Environment access
   - Secret management

2. **Network Security**
   - VPN configuration
   - IP whitelisting
   - SSL certificates

## Troubleshooting

1. **Common Issues**
   - Browser installation
   - Network timeouts
   - Resource constraints
   - Permission issues

2. **Debug Steps**
   - Check logs
   - Verify configurations
   - Test locally
   - Review permissions 