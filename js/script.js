const reports = getSavedReports();


const filters = {
    searchText: '',
    sortBy: 'byNewest'
}

renderReports(reports, filters)

document.querySelector('#new-report').addEventListener('submit', function (e) {
    
    const id = uuidv4()
    const timestamp = moment().valueOf()
    console.log(timestamp)
    const d = moment().format('MMMM Do YYYY, h:mm:ss a')
    reports.push({
        id:  id,
        Time: d.toString(),
        Date: moment(e.target.elements.date.value).format('L').toString(),
        Shift: e.target.elements.shift.value,
        Period: e.target.elements.period.value,
        Duty: e.target.elements.duty.value,
        Report: e.target.elements.report.value,
        createdAt: timestamp
    })
    saveReports(reports)
    location.assign(`./edit.html#${id}`)
})
document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderReports(reports, filters)
})

document.querySelector('#filter-by').addEventListener('change', function (e) {
    filters.sortBy = e.target.value
    renderReports(reports, filters)
})

// document.querySelector('#removeOldLog').addEventListener('change', function (e) {
//     filters.sortBy = e.target.value
//     renderReports(reports, filters)
// })