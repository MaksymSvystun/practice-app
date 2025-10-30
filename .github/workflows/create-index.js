// Create an index page for test reports
const fs = require('fs');
const path = require('path');

const runNumber = process.env.GITHUB_RUN_NUMBER || '1';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'practice-app';
const repoOwner = process.env.GITHUB_REPOSITORY?.split('/')[0] || 'MaksymSvystun';

const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Playwright Test Reports - ${repoName}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
        }
        .report-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .report-card h2 {
            color: #2980b9;
            margin-top: 0;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background: #3498db;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background 0.3s;
        }
        .btn:hover {
            background: #2980b9;
        }
        .latest {
            background: #27ae60;
        }
        .latest:hover {
            background: #229954;
        }
        .info {
            color: #7f8c8d;
            font-size: 14px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <h1>🎭 Playwright Test Reports</h1>
    
    <div class="report-card">
        <h2>Latest Report - Run #${runNumber}</h2>
        <p>View the most recent test execution results.</p>
        <a href="./reports/${runNumber}/index.html" class="btn latest">View Latest Report</a>
        <p class="info">Generated: ${new Date().toUTCString()}</p>
    </div>

    <div class="report-card">
        <h2>Repository</h2>
        <p>Repository: <strong>${repoOwner}/${repoName}</strong></p>
        <a href="https://github.com/${repoOwner}/${repoName}" class="btn">View on GitHub</a>
        <a href="https://github.com/${repoOwner}/${repoName}/actions" class="btn">View Actions</a>
    </div>

    <div class="report-card">
        <h2>All Reports</h2>
        <p>Reports are organized by run number in the <code>/reports/</code> directory.</p>
        <p class="info">Reports are preserved across builds. Navigate to <code>/reports/[run-number]/</code> to view older reports.</p>
    </div>
</body>
</html>
`;

// Write the index.html file
fs.writeFileSync('index.html', indexHtml);
console.log('Index page created successfully!');
