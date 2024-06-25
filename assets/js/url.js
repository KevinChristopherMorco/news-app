import { keywordInput } from "./global-dom.js"
import { fetchData } from "./fetch-api.js"

const getSearchResults = (e) => {
    const defaultContainer = document.querySelector('.default__news-container')
    if (e.target.value === '') {
        return
    }
    if (e.key === 'Enter') {
        [...defaultContainer.children].forEach(x => {
            x.remove()
        })
        const userQuery = keywordInput.value
        handleURL(e, userQuery, window.location.hash.slice(1))
        fetchData(e, userQuery)
    }
}

keywordInput.addEventListener('keydown', (e) => getSearchResults(e))

export const handleURL = (e, currentURL, previousURL) => {
    const resultURL = currentURL != '' ||  currentURL != undefined ? currentURL : 'philippines'
    localStorage.setItem('currentURL', resultURL)

    localStorage.setItem('previousURL', previousURL === '' ? 'philippines' : previousURL)
    if (window.location.hash) {
        window.location.hash = ''
    }
    window.location.hash = currentURL
}

export const getURL = (e) => {
    const userQuery = localStorage.getItem('currentURL')
    const defaultContainer = document.querySelector('.default__news-container')
    const resultURL =   userQuery != null ? userQuery : localStorage.setItem('currentURL', 'philippines')

    Array.from(defaultContainer.children).forEach(x => {
        x.remove()
    })
    fetchData(e, resultURL)
}
window.addEventListener('load', (e) => getURL(e))