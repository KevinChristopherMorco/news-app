import { serverTime,apiTemplate } from "./global-dom.js";
import { renderData } from "./render-data.js";

export const fetchData = (e, userQuery, filter) => {
    const currentURL = localStorage.getItem('currentURL');
    const previousURL = localStorage.getItem('previousURL');
    const apiData = localStorage.getItem('apiData');
    const currentMinutes = serverTime.getMinutes();
    let locale = localStorage.getItem('locale')

    if (currentURL === previousURL) {
        const data = localStorage.getItem('apiData')
        renderData(JSON.parse(data))
        return;
    }

    if (e.type === 'load' && apiData != null && currentMinutes != 0) {
        const data = localStorage.getItem('apiData')
        renderData(JSON.parse(data))
        return;
    }

    locale = locale === null ? 'ph' : locale
    fetch(`https://newsdata.io/api/1/latest?apikey=pub_467909f9f75c0eac02b1dd15de92ddcfd29e4&country=${filter === undefined ? locale : filter}&language=en&q=${userQuery === undefined ? 'philippines' : userQuery}`).then(response =>{
        console.log(`https://newsdata.io/api/1/latest?apikey=pub_467909f9f75c0eac02b1dd15de92ddcfd29e4&country=${filter === undefined ? locale : filter}&language=en&q=${userQuery === undefined ? 'philippines' : userQuery}`)
        if(response.status === 429){
            const mainContainer = document.querySelector('main')
            if (document.querySelector('.api__notice') != null) {
                document.querySelector('.api__notice').remove()
            }
            const apiNotice = apiTemplate.content.cloneNode(true)
            mainContainer.appendChild(apiNotice)
            return;
        }
        return response.json()
    }).then(data => {
        const storeData = data
        localStorage.setItem('apiData', JSON.stringify(storeData))
        renderData(data)
    })
}