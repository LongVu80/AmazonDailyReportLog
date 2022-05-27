const getSavedReports = function () {
    const reportJSON = localStorage.getItem('reports');
    if (reportJSON !== null){
        return JSON.parse(reportJSON)
    } else {
        return []
    }
}

const saveReports = function (reports) {
    localStorage.setItem('reports', JSON.stringify(reports))
}

const removeReport = function (id) {
    const reportIndex = reports.findIndex(function (report) {
        return report.id === id
    })

    if (reportIndex > -1) {
        reports.splice(reportIndex, 1)
    }
}

const generateReportDOM = function (report) {
    const reportEl = document.createElement('div')
    reportEl.id = 'result';
    const textEl = document.createElement('p')
    const aEl = document.createElement('a')
    const button = document.createElement('button')
    
    // Setup the remove note button
    button.textContent = 'Remove'
    reportEl.appendChild(button) 
    button.addEventListener('click', function () {
        removeReport(report.id)
        saveReports(reports)
        renderReports(reports, filters)
    })

    // Setup the note title text
    if (report.Duty.length > 0 && report.Date.length > 0 && report.Report.length > 0) {
        aEl.innerHTML = '<button>Edit</button>'
        textEl.innerHTML = `<a location.href='#search'>Add Report</a>`
        textEl.innerHTML = `Wrote on: ${report.Time} <hr> Report Date: ${report.Date}<br> Shift:<strong> ${report.Shift} </strong> || Period: <strong>${report.Period}</strong> || Duty: <strong>${report.Duty}</strong> <br> Log: ${report.Report}<hr> <a onclick="location.href='#search'" class = "top">Back to Top</a>`
    } else{
        aEl.innerHTML = '<button>Edit</button>'
        textEl.innerHTML = `Wrote on: ${report.Time} <hr><p style = "color: red">Alert!! Missing fields.</p> Click Edit button to check and fill in the missing information <hr><a onclick="location.href='#search'" class = "top">Back to Top</a>`
    }
    aEl.setAttribute('href', `./edit.html#${report.id}`)
    
    reportEl.appendChild(textEl)
    reportEl.appendChild(aEl)
    return reportEl
}

// const sortReports = function (reports, sortBy) {
//     if (sortBy === 'newestLog') {
//         return reports.sort(function (a, b) {
//             if (a.createdAt > b.createdAt) {
//                 return -1
//             } else if (a.createdAt < b.createdAt) {
//                 return 1
//             } else {
//                 return 0
//             }
//         })
//     } else if (sortBy === 'latestLog') {
//         return reports.sort(function (a, b) {
//             if (a.createdAt < b.createdAt) {
//                 return -1
//             } else if (a.createdAt < b.createdAt) {
//                 return 1
//             } else {
//                 return 0
//             }
//         })
//     } else {
//         return reports
//     }
// }

const renderReports = function(reports, filters){
    // reports = sortReports(reports, filters.sortBy)
    const filterReports = reports.filter(function(report){
        return report.Date.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        report.Duty.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    document.querySelector('#log').innerHTML = '';

    filterReports.forEach(function(report){
        
        const reportEl = generateReportDOM(report)
        document.querySelector('#log').appendChild(reportEl)
    })
}

// const sort = function(){
//     reports.Time.sort(function(a, b){
//         if(a.createdAt < b.createdAt){return -1}
//         if(a.createdAt > b.createdAt){return 1}
//         return 0
//     })
//     renderReports(reports, filters)
// }

// const removeOldLog = function(id){
//     var hours = 1; 
//     var now = new Date().getTime();
//     // let created = reports.createdAt
//     reports.forEach(function(report){
//         if(now - report.createdAt > hours*30000) {
//             if(report.id > -1){
//                 reports.splice(report.id, 2)
//             }
//         }
//     })
//     saveReports(reports)
//     renderReports(reports, filters)
// }



