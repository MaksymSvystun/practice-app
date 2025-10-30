# 📊 Accessing Playwright Test Reports

After your workflow completes, test reports are automatically published to GitHub Pages.

## 🌐 View Reports Online

**Main Dashboard:**
```
https://maksymsvystun.github.io/practice-app/
```

**Specific Run Report:**
```
https://maksymsvystun.github.io/practice-app/reports/[RUN_NUMBER]/
```

Replace `[RUN_NUMBER]` with the GitHub Actions run number (visible in the Actions tab).

## 🔧 Setup (One-time)

Before the first workflow run, enable GitHub Pages:

1. Go to your repository settings
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` / `root`
4. Click **Save**

The reports will be available within 1-2 minutes after the workflow completes.

## 📁 Report Organization

- `/` - Main index page with links to latest report
- `/reports/[run-number]/` - Individual test reports by run number
- Reports persist across workflow runs (not deleted)

## 💡 Features

- ✅ Interactive HTML reports with test results
- ✅ Screenshots and traces for failed tests
- ✅ Historical reports preserved
- ✅ Direct browser access (no download needed)
- ✅ Shareable URLs for team collaboration

## 🔍 Finding Run Numbers

Run numbers are visible in:
- GitHub Actions workflow list
- Workflow run URL: `github.com/.../actions/runs/[RUN_NUMBER]`
- The main dashboard page (shows latest run)
