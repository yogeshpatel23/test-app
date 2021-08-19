import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css';
import PokemonList from './PokemonList';
import Pagination from './Pagination';

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setcurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageUrl, setnextPageUrl] = useState()
  const [prePageUrl, setprePageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res => {
        setPokemon(res.data.results.map(p => p.name))
        setnextPageUrl(res.data.next)
        setprePageUrl(res.data.previous)
        setLoading(false)
      })

    return () => cancel()

  }, [currentPageUrl])

  function gotoNextPage() {
    setcurrentPageUrl(nextPageUrl)
  }

  function gotoPrePage() {
    setcurrentPageUrl(prePageUrl)
  }

  if (loading) return 'Loading...'

  return (
    <div className="app">
      <PokemonList pokemon={pokemon} />

      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrePage={prePageUrl ? gotoPrePage : null}
      />
    </div>
  );
}

export default App;
