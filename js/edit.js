const bodyEl = document.querySelector('#text')
const reportId = location.hash.substring(1)
const reports = getSavedReports();
const report = reports.find(function(report){
    return report.id === reportId
})

bodyEl.value = report.Report

bodyEl.addEventListener('input', function(e) {
    report.Report = e.target.value
    saveReports(reports)
})