const reports = getSavedReports();


const filters = {
    searchText: ''
}

renderReports(reports, filters)
// dasboardReport(reports)

document.querySelector('#new-report').addEventListener('submit', function (e) {
    
    const id = uuidv4()
    const timestamp = moment().valueOf()
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

const refresh = function(){
    setTimeout(function(){
        location.reload()}, 1000)
}

// const sort = function(){
//     reports.Time.sort(function(a, b){
//         if(a > b){return -1}
//         if(a < b){return 1}
//         return 0
//     })
//     renderReports(reports, filters)
// }