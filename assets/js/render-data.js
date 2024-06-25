import { emptyResults,removeElements } from "./util.js"

let headlineContainer
let headlineCard
let defaultContainer
let defaultCard

export const renderData = (data) => {
    headlineContainer = document.querySelector('.headline__card-container')
    headlineCard = document.querySelector('#headline__card')
    defaultContainer = document.querySelector('.default__news-container')
    defaultCard = document.querySelector('#default__news-card')

    if (emptyResults(data)) {
        return;
    }

    removeElements(headlineContainer)
    removeElements(defaultContainer)

    defineSlice(data)
}

const template = (headlineResults,defaultResults) => {
    headlineResults.forEach(result => {
        const cardClone = headlineCard.content.cloneNode(true)
        cardClone.querySelector('.headline__card').style.cssText = `background-image:linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${result.image_url != null ? result.image_url : `images/defaults/no-image.jpg`});`
        cardClone.querySelector('.headline__description > a').textContent = result.title
        cardClone.querySelector('.headline__description > a').setAttribute('href', result.link)
        cardClone.querySelector('.headline__source > a').textContent = result.source_id
        cardClone.querySelector('.headline__source > a').setAttribute('href', result.source_url)
        cardClone.querySelector('.headline__source > img').setAttribute('src', result.source_icon != null ? result.source_icon : `images/logo/favicon.png`)
        headlineContainer.appendChild(cardClone)
    })

    defaultResults.forEach(result => {
        const cardClone = defaultCard.content.cloneNode(true)
        cardClone.querySelector('.default__news-header').style.cssText = `background-image:linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),url(${result.image_url != null ? result.image_url : `images/defaults/no-image.jpg`});`
        cardClone.querySelector('.default__news-headline>a').textContent = result.title
        cardClone.querySelector('.default__news-headline > a').setAttribute('href', result.link)

        cardClone.querySelector('.default__news-source > a').textContent = result.source_id
        cardClone.querySelector('.default__news-source > a').setAttribute('href', result.source_url)
        cardClone.querySelector('.default__news-source>img').setAttribute('src', result.source_icon != null ? result.source_icon : `images/logo/favicon.png`)

        defaultContainer.appendChild(cardClone)
    })
}

const defineSlice = (data) => {
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

    template(headlineResults,defaultResults)

}