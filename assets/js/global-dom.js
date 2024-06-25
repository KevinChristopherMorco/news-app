export const keywordInput = document.querySelector('#keyword-search')
export const categoryList = document.querySelector('.news__category-container')
export const sortBtn = document.querySelector('.sort__button')
export const apiTemplate = document.querySelector('#api__notice')

const date = new Date()
export const serverTime = new Date(date.toISOString())