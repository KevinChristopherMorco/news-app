import { serverTime } from "./global-dom.js";
import { renderData } from "./render-data.js";

export const fetchData = (e, userQuery, filter) => {
    const currentURL = localStorage.getItem('currentURL');
    const previousURL = localStorage.getItem('previousURL');
    const apiData = localStorage.getItem('apiData');
    const currentMinutes = serverTime.getMinutes();
    const locale = localStorage.getItem('locale')
    console.log(userQuery, filter)

    // const data = localStorage.getItem('apiData')
    // renderData(JSON.parse(data))

    if (e.type === 'load' || e.type === 'keydown' && currentURL === previousURL && apiData != null && currentMinutes != 0) {
        console.log(true)
        const data = localStorage.getItem('apiData')
        renderData(JSON.parse(data))
        return;
    }
    fetch(`https://newsdata.io/api/1/latest?apikey=pub_467909f9f75c0eac02b1dd15de92ddcfd29e4&country=${filter === undefined ? locale : filter}&language=en&q=${userQuery === undefined ? 'philippines' : userQuery}`).then(response => response.json()).then(data => {
        const storeData = data
        localStorage.setItem('apiData', JSON.stringify(storeData))
        renderData(data)
    })
}