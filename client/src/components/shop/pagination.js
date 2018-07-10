import React from 'react'
import { Pagination } from 'react-bootstrap'
// import { browserHistory } from 'react-router'
import $ from 'jquery'

export const getPage = (search, pageVar = 'page') => {
  const searchParams = new URLSearchParams(search)
  let page = 1
  if (searchParams.has(pageVar)) {
    try {
      page = parseInt(searchParams.get(pageVar), 10)
    } catch (e) {
      console.log('invalid page')
    }
  }
  return page
}

export const getPagination = (router, count, limit, offset, pageVar = 'page') => {
  const items = Math.ceil(count / limit)
  const activePage = Math.floor(offset / limit) + 1
  const onSelect = (e) => {
    const { history, location } = router
    const { pathname } = location
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('page',e)
    history.push({ pathname, search: searchParams.toString()})
    $('html, body').animate({
      // scrollTop: $("#elementtoScrollToID").offset().top
      scrollTop: 0
    }, 300)
  }
  return { items, activePage, onSelect, offset, count }
}

export const getOffset = (limit, page) => {
  return Math.abs(page - 1) * limit
}

const PaginationIndex = ({pagination}) => {
  return <Pagination
    bsSize="medium"
    items={ pagination.items }
    activePage={ pagination.activePage }
    onSelect={ pagination.onSelect }
    className='pagi'
    boundaryLinks={true}
    maxButtons={10}
  />
}

export default PaginationIndex