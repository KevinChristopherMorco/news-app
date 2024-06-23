import { emptyResults,removeElements } from "./util.js"

export const renderData = (data) => {
    const headlineContainer = document.querySelector('.headline__card-container')
    const headlineCard = document.querySelector('#headline__card')
    const defaultContainer = document.querySelector('.default__news-container')
    const defaultCard = document.querySelector('#default__news-card')
    if (emptyResults(data)) {
        return;
    }

    let headlineSlice
    let defaultSlice

    if (data.results.length < 5) {
        headlineSlice = data.results.slice(0, 1)
        defaultSlice = data.results.slice(1)
    } else {
        headlineSlice = data.results.slice(0, 3)
        defaultSlice = data.results.slice(3)
    }

    const headlineResults = headlineSlice
    const defaultResults = defaultSlice

    removeElements(headlineContainer)
    removeElements(defaultContainer)

    headlineResults.forEach(result => {
        const cardClone = headlineCard.content.cloneNode(true)
        cardClone.querySelector('.headline__card').style.cssText = `background:linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${result.image_url != null ? result.image_url : `images/defaults/no-image.jpg`}); background-size: cover;
        background-repeat: no-repeat;`
        cardClone.querySelector('.headline__description > a').textContent = result.title
        cardClone.querySelector('.headline__description > a').setAttribute('href', result.link)
        cardClone.querySelector('.headline__source > a').textContent = result.source_id
        cardClone.querySelector('.headline__source > a').setAttribute('href', result.source_url)
        cardClone.querySelector('.headline__source > img').setAttribute('src', result.source_icon != null ? result.source_icon : `images/logo/favicon.png`)
        headlineContainer.appendChild(cardClone)
    })

    defaultResults.forEach(result => {
        const cardClone = defaultCard.content.cloneNode(true)
        cardClone.querySelector('.default__news-header').style.cssText = `background:linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),url(${result.image_url != null ? result.image_url : `images/defaults/no-image.jpg`}); background-size: cover;
        background-repeat: no-repeat;`
        cardClone.querySelector('.default__news-headline>a').textContent = result.title
        cardClone.querySelector('.default__news-headline > a').setAttribute('href', result.link)

        cardClone.querySelector('.default__news-source > a').textContent = result.source_id
        cardClone.querySelector('.default__news-source > a').setAttribute('href', result.source_url)
        cardClone.querySelector('.default__news-source>img').setAttribute('src', result.source_icon != null ? result.source_icon : `images/logo/favicon.png`)

        defaultContainer.appendChild(cardClone)
    })
}