const axios = require('axios');
const telegram = require('./telegram-client')
const config = require('./config')
const listIgnore = ['ncloc','ncloc_language_distribution','reliability_rating','security_rating','security_review_rating','sqale_rating'];
async function send(request){
    let responseObj = {};
    if(request.project.name){
        response =await axios.get(`${config.SERVER_HOST}/api/measures/search?projectKeys=${request.project.name}&metricKeys=alert_status%2Cbugs%2Creliability_rating%2Cvulnerabilities%2Csecurity_rating%2Csecurity_hotspots_reviewed%2Csecurity_review_rating%2Ccode_smells%2Csqale_rating%2Cduplicated_lines_density%2Ccoverage%2Cncloc%2Cncloc_language_distribution%2Cprojects`);
        response.data.measures.map(data=>{
            if(!listIgnore.includes(data.metric)){
            responseObj[data.metric] = data.value;
        }
        })
        responseObj['project'] = response.data.measures[0].component;
        let message = '';
        message += `\n----- Project : ${responseObj.project} -----`
                    +  "\nBranch:\t" + request.branch.name
                    +  "\nStatus:\t" + responseObj.alert_status
                    +  "\nBugs:\t" + responseObj.bugs
                    +  "\nCode Smells\t" + responseObj.code_smells
                    +  "\nCoverage:\t" + responseObj.coverage + '%'
                    +  "\nDuplicated Lines Density:\t" + responseObj.duplicated_lines_density + '%'
                    +  "\nSecurity Hotspots Reviewed: \t" + responseObj.security_hotspots_reviewed + '%'
                    +  "\nVulnerabilities: \t" + responseObj.vulnerabilities
                    +  `\n   ---------   End   ---------   `
                    
        telegram.send(message);
        return {
            code : 200,
            data : responseObj
        }
    }
    console.log(request)
}
module.exports = {
    send
}