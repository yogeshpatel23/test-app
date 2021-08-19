import React from 'react'

function PokemonList({ pokemon }) {
    return (
        <div className="pokemonlist">
            {pokemon.map(p => (
                <div key={p} >{p}</div>
            ))}
        </div>
    )
}

export default PokemonList
