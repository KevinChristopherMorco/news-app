const headlineContainer = document.querySelector('.headline__card-container')
const headlineCard = document.querySelector('#headline__card')
const defaultContainer = document.querySelector('.default__news-container')
const defaultCard = document.querySelector('#default__news-card')
const keywordInput = document.querySelector('#keyword-search')
const categoryList = document.querySelector('.news__category-container')
const sortBtn = document.querySelector('.sort__button')
const sortChoices = document.querySelector('.sort__choices')


const date = new Date()
const serverTime = new Date(date.toISOString())


const fetchData = (e, userQuery) => {
    const currentURL = localStorage.getItem('currentURL');
    const previousURL = localStorage.getItem('previousURL');
    const apiData = localStorage.getItem('apiData');
    const currentMinutes = serverTime.getMinutes();
    console.log(userQuery)

    const data = localStorage.getItem('apiData')
    renderData(JSON.parse(data))

    // if (e.type === 'load' || e.type === 'keydown' && currentURL === previousURL && apiData != null && currentMinutes != 0) {
    //     console.log(true)
    //     const data = localStorage.getItem('apiData')
    //     renderData(JSON.parse(data))
    //     return;
    // }
    // fetch(`https://newsdata.io/api/1/latest?apikey=pub_467909f9f75c0eac02b1dd15de92ddcfd29e4&country=ph&language=en&q=${userQuery === undefined ? 'philippines' : userQuery}`).then(response => response.json()).then(data => {
    //     const storeData = data
    //     localStorage.setItem('apiData', JSON.stringify(storeData))
    //     renderData(data)
    // })
}

const renderData = (data) => {
    if (emptyResults(data)) {
        return;
    }
    const results = data.results
    console.log(results)
    results.slice(0, 3).forEach(result => {
        const cardClone = headlineCard.content.cloneNode(true)
        cardClone.querySelector('.headline__card').style.cssText = `background:linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${result.image_url != null ? result.image_url : `images/defaults/flag.jpg`}); background-size: cover;
        background-repeat: no-repeat;`
        cardClone.querySelector('.headline__description > a').textContent = result.title
        cardClone.querySelector('.headline__description > a').setAttribute('href', result.link)
        cardClone.querySelector('.headline__source > a').textContent = result.source_id
        cardClone.querySelector('.headline__source > a').setAttribute('href', result.source_url)
        cardClone.querySelector('.headline__source > img').setAttribute('src', result.source_icon != null ? result.source_icon : `images/logo/favicon.png`)
        headlineContainer.appendChild(cardClone)
    })

    const defaultResults = data.results
    defaultResults.slice(4).forEach(result => {
        const cardClone = defaultCard.content.cloneNode(true)
        cardClone.querySelector('.default__news-header').style.cssText = `background:linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),url(${result.image_url != null ? result.image_url : `images/defaults/flag.jpg`}); background-size: cover;
        background-repeat: no-repeat;`
        cardClone.querySelector('.default__news-headline>a').textContent = result.title
        cardClone.querySelector('.default__news-headline > a').setAttribute('href', result.link)

        cardClone.querySelector('.default__news-source > a').textContent = result.source_id
        cardClone.querySelector('.default__news-source > a').setAttribute('href', result.source_url)
        cardClone.querySelector('.default__news-source>img').setAttribute('src', result.source_icon != null ? result.source_icon : `images/logo/favicon.png`)

        defaultContainer.appendChild(cardClone)
    })
}

keywordInput.addEventListener('keydown', (e) => getSearchResults(e))

const getSearchResults = (e) => {
    if (e.target.value === '') {
        return
    }
    if (e.key === 'Enter') {
        [...defaultContainer.children].forEach(x => {
            x.remove()
        })
        const userQuery = keywordInput.value
        setURL(userQuery, window.location.hash.slice(1))
        handleURL()
        fetchData(e, userQuery)
    }

}

sortBtn.addEventListener('click', (e) => {
    sortChoices.classList.toggle('unmount')
})

const handleURL = (e) => {
    const currentURL = window.location.hash.slice(1)
    const resultURL = currentURL != '' ? currentURL : 'philippines'
    localStorage.setItem('currentURL', resultURL)
}

window.addEventListener('hashchange', (e) => handleURL(e))
// window.addEventListener('load', (e) => handleURL(e))


const setURL = (data, previousURL) => {
    localStorage.setItem('previousURL', previousURL === '' ? 'philippines' : previousURL)
    if (window.location.hash) {
        window.location.hash = ''
    }
    window.location.hash = data
}

const getURL = (e) => {
    const userQuery = localStorage.getItem('currentURL')
    Array.from(defaultContainer.children).forEach(x => {
        x.remove()
    })
    fetchData(e, userQuery)
}
window.addEventListener('hashchange', (e) => getURL(e))
window.addEventListener('load', (e) => getURL(e))


const emptyResults = (data) => {
    if (document.querySelector('.empty__notice') != null) {
        document.querySelector('.empty__notice').remove()
    }

    if (data.totalResults === 0) {
        setTimeout(() => {
            const mainContainer = document.querySelector('main')
            const emptyNotice = document.querySelector('#empty__notice')
            const emptyNotices = emptyNotice.content.cloneNode(true)
            Array.from(mainContainer.children).forEach(x => x.style.display = 'none')
            mainContainer.appendChild(emptyNotices)
        }, 1000)
        return true
    } else {
        const mainContainer = document.querySelector('main')
        Array.from(mainContainer.children).forEach(x => x.style.display = 'block')
    }
}

const handleCategory = (e) => {
    if (e.target.tagName === 'A') {
        Array.from(categoryList.children).forEach(x => {
            x.classList.remove('active')
        })
        e.target.closest('li').classList.add('active')
    }
}
categoryList.addEventListener('click', (e) => handleCategory(e))

const handleOutlets = (e) => {
    console.log(e.target.id)
}



