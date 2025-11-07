# Use Playwright image so we have browsers and deps
FROM mcr.microsoft.com/playwright:v1.48.0-jammy

# install Java (OpenJDK 17) so Allure can run
RUN apt-get update && \
    apt-get install -y openjdk-17-jre-headless && \
    rm -rf /var/lib/apt/lists/*
# Set workdir
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install ALL deps (we need devDeps for tests)
RUN npm ci

# Copy the rest of the project
COPY . .

# Make sure the reports folder exists
RUN mkdir -p reports/allure-results

# Default command: run tests in container mode
CMD ["npm", "run", "test:full"]
