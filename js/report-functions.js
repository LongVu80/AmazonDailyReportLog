const getSavedReports = function () {
    const reportJSON = localStorage.getItem('reports');
    if (reportJSON !== null){
        return JSON.parse(reportJSON)
    } else {
        return []
    }
}

const saveReports = function (reports) {
    localStorage.setItem('reportLogs', JSON.stringify(reports))
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
    if (report.Duty.length > 0) {
        aEl.innerHTML = '<button>Edit</button>'
        textEl.innerHTML = `Wrote on: ${report.Time} <hr> Report Date: ${report.Date}<br> Shift:<strong> ${report.Shift} </strong> || Period: <strong>${report.Period}</strong> || Duty: <strong>${report.Duty}</strong> <br> Log: ${report.Report}<hr>`
    } else {
        textEl.textContent = 'No report logged'
    }
    aEl.setAttribute('href', `./edit.html#${report.id}`)
    
    reportEl.appendChild(textEl)
    reportEl.appendChild(aEl)
    return reportEl
}



const renderReports = function(reports, filters){
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