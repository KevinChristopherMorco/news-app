import { fetchData } from "./fetch-api.js"
import { categoryList, sortBtn } from "./global-dom.js"
import { handleURL } from "./url.js"

export const emptyResults = (data) => {
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
        Array.from(mainContainer.children).forEach(x => x.removeAttribute('style'))
    }
}

const handleCategory = (e) => {
    if (e.target.tagName === 'A') {
        Array.from(categoryList.children).forEach(x => {
            x.classList.remove('active')
        })
        e.target.closest('li').classList.add('active')

        const previousURL = window.location.hash.slice(1)
        setTimeout(() => {
            const currentURL = window.location.hash.slice(1)
            handleURL(e, currentURL, previousURL)
            fetchData(e, currentURL)
            localStorage.setItem('activeCategory', currentURL)
        }, 100)
    }
}
categoryList.addEventListener('click', (e) => handleCategory(e))

export const removeElements = (element) => {
    if (Array.from(element.children).length > 0) {
        Array.from(element.children).forEach(x => x.remove())
    }
}
sortBtn.addEventListener('click', (e) => {
    const sortChoices = document.querySelector('.sort__choices')
    sortChoices.classList.toggle('unmount')
})

const choicesContainer = document.querySelector('.sort__choices')


const setElementState = () => {
    const category = localStorage.getItem('activeCategory')

    Array.from(categoryList.children).forEach(element => {
        element.classList.remove('active')
        if (element.querySelector('a').hash === `#${category}`) {
            element.classList.add('active')
        }
    })

    const locale = localStorage.getItem('locale')
    Array.from(choicesContainer.children).forEach(element => {
        element.classList.remove('active')
        if (element.dataset.value === locale) {
            element.classList.add('active')
        }
    })
}
window.addEventListener('load', setElementState)

const handleNewsLocale = (e) => {
    const userQuery = localStorage.getItem('currentURL')
    const choices = document.querySelectorAll('.sort__choices > li')

    if (e.target.tagName === 'LI') {
        choices.forEach(x => {
            x.classList.remove('active')
        })
        e.target.classList.add('active')
    }
    const locale = Array.from(choices).find(x => x.classList.contains('active'));
    localStorage.setItem('locale', locale.dataset.value)
    fetchData(e, userQuery, locale.dataset.value)
}
choicesContainer.addEventListener('click', (e) => handleNewsLocale(e))

const arrowContainer = document.querySelector('.arrow-container')
let currentIndex = 0
const arrows = (e) => {
    const container = document.querySelector('.headline__card-container')
    const cards = container.querySelectorAll('.headline__card');
    if (e.target.tagName === 'I' && e.target.classList.contains('fa-arrow-right')) {
        if (currentIndex >= cards.length - 1) {
            return;
        }

        const card = cards[currentIndex];
        let sum = card.offsetLeft;
        
        if (currentIndex === 0) {
            sum += cards[currentIndex + 1].offsetLeft;
        }

        if (currentIndex < cards.length - 1) {
            sum += cards[currentIndex].offsetLeft;
        }

        container.scrollTo({
            left: sum,
            behavior: 'smooth'
        });

        currentIndex++;
    }

    if (e.target.tagName === 'I' && e.target.classList.contains('fa-arrow-left')) {
        if (currentIndex === 0) {
            return; // If we've reached the end of cards, exit
        }

        const card = cards[currentIndex];
        let diff = card.offsetLeft;

        if (currentIndex > 1) {
            diff = cards[currentIndex].offsetLeft - cards[currentIndex - 1].offsetLeft;
        }

        if (currentIndex === 1) {
            diff = cards[currentIndex].offsetLeft - cards[currentIndex + 1].offsetLeft;
        }

        container.scrollTo({
            left: diff,
            behavior: 'smooth'
        });
        currentIndex--;
        console.log(currentIndex)
    }
}
arrowContainer.addEventListener('click', (e) => arrows(e))