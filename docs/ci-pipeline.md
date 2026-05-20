# CI Pipeline

This repository uses GitHub Actions workflow `.github/workflows/ci.yml` to enforce continuous integration checks for all changes.

## Workflow Triggers

The CI workflow runs on:

- `push` to any branch
- `pull_request` targeting any branch

This ensures both direct branch updates and pull request updates are validated.

## Jobs and Steps

The workflow runs on `ubuntu-latest` with Node.js 20 and exposes two required-check friendly jobs:

- `Lint`
- `Build`

### Lint Job

The `Lint` job performs:

1. Checkout repository source.
2. Setup Node.js 20.
3. Restore/save npm cache.
4. Install dependencies with `npm ci`.
5. Run lint checks with `npm run lint`.

### Build Job

The `Build` job depends on `Lint` and performs:

1. Checkout repository source.
2. Setup Node.js 20.
3. Restore/save npm cache.
4. Install dependencies with `npm ci`.
5. Run type checks with `npm run type-check`.
6. Run application build with `npm run build`.

If any command fails, the job fails and the workflow fails.

## Caching Strategy

Caching is implemented with `actions/cache@v4` using:

- Cache path: `~/.npm`
- Cache key: `${{ runner.os }}-npm-${{ hashFiles('ai-automation-landing/package-lock.json') }}`
- Restore key prefix: `${{ runner.os }}-npm-`

This speeds up dependency installation while keeping cache invalidation tied to lockfile changes.

## Branch Protection Integration

Branch protection can require these exact check names:

- `Lint`
- `Build`

Because the workflow job names are explicitly set to those values, branch protection required status checks can enforce both code quality and build validity before merge.

## Permissions

The workflow uses minimal permissions:

- `contents: read`

No write scopes are needed for CI validation in this pipeline.
