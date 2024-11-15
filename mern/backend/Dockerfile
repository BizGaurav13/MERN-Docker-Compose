# Use Node.js base image
FROM node:22.11.0-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Copy package files to install dependencies
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# Install dependencies based on the preferred package manager
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Final image for production
FROM node:22.11.0-alpine AS runner
WORKDIR /app

# Copy application code and node_modules
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Add a non-root user for security
RUN adduser -D -H -s /bin/sh appuser

# Switch to non-root user
USER appuser

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app
CMD [ "npm", "start" ]
