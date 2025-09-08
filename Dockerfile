# Use Node 22 as base
FROM node:22

# Install Tesseract OCR
RUN apt-get update && apt-get install -y tesseract-ocr && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json yarn.lock* package-lock.json* ./

# Install dependencies
RUN yarn install --frozen-lockfile || npm install

# Copy project files
COPY . .

# Build TypeScript
RUN yarn build

# Expose port (change if not 8080)
EXPOSE 8080

# Start app
CMD ["yarn", "start"]
