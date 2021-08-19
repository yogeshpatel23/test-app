import React, { useState, useRef, useCallback } from 'react'
import './App.css';
import useBookSearch from './useBookSearch';

function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const { loading, books, error, hasMore } = useBookSearch(query, pageNumber)

  const observer = useRef()
  const lastBookElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })

    if (node) observer.current.observe(node)
  }, [loading, hasMore])


  function handleInput(e) {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  return (
    <div className="app">
      <input type="text" value={query} onChange={handleInput} />
      {books.map((book, index) => {
        if (books.length === index + 1) {
          return <div className="book" ref={lastBookElementRef} key={book} >{book}</div>
        } else {
          return <div className="book" key={book} >{book}</div>
        }
      })}
      <div>{loading && <div className="loading">loading...</div>}</div>
      <div>{error && 'Error..'}</div>
    </div>
  );
}

export default App;
