const reportEl = document.querySelector('#text')
const dateEl = document.querySelector('#date')
const dutyEl = document.querySelector('#duty')
const periodEl = document.querySelector('#period')
const shiftEl = document.querySelector('#shift')

const reportId = location.hash.substring(1)
const reports = getSavedReports();
const report = reports.find(function(report){
    return report.id === reportId
})
dateEl.value = report.Date;
dutyEl.value = report.Duty;
periodEl.value = report.Period;
shiftEl.value = report.Shift;
reportEl.value = report.Report;

dateEl.addEventListener('input', function(e) {
    report.Date = moment(e.target.value).format('L').toString(),
    saveReports(reports)
})
dutyEl.addEventListener('input', function(e) {
    report.Duty = e.target.value
    saveReports(reports)
})
periodEl.addEventListener('input', function(e) {
    report.Period = e.target.value
    saveReports(reports)
})
reportEl.addEventListener('input', function(e) {
    report.Report = e.target.value
    saveReports(reports)
})