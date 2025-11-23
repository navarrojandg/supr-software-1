FROM node:18.20.8-alpine AS base

RUN apk update

RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# ---
FROM base AS prepare

# Install turborepo
RUN npm install -g turbo@^2.6.0

COPY . .

# Add lockfile and package.json's of isolated subworkspace
# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "web" is the name entered in the project's package.json: { name: "web" }
RUN turbo prune arena --docker

# ---
FROM base AS builder

# First install the dependencies (as they change less often)
COPY --from=prepare /app/out/json/ .

RUN npm install

# Build the project

COPY --from=prepare /app/out/full/ .

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM
 
# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN
 
RUN npm run build

# ---
FROM base AS runner

# Don't run production as root for security reasons
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 arena
USER arena

COPY --from=builder --chown=arena:nodejs /app/ ./
 
CMD ["node", "apps/arena/index.js"]