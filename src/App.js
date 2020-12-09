import React, {useState, useEffect} from 'react';
import shuffle from 'lodash.shuffle'
import PokemonCard from "./components/pokemon-card";
import pokemon from './services'
import './App.css';

const pokemonShuffle = shuffle([...pokemon, ...pokemon])

const App = () => {
    const [opened, setOpened] = useState([])
    const [matched, setMatched] = useState([])
    const [moves, setMoves] = useState(0)
    const [win, setWin] = useState(false)

    useEffect(() => {
        if (opened.length === 2) setTimeout(() => setOpened([]), 800)
    }, [opened])

    useEffect(() => {
        if (opened.length < 2) return;
        const firstPokemon = pokemonShuffle[opened[0]]
        const secondPokemon = pokemonShuffle[opened[1]]

        if (firstPokemon.name === secondPokemon.name && matched.includes(firstPokemon.id) === false) {
            setMatched(() => ([...matched, firstPokemon.id]))
        }
    }, [opened])

    useEffect(() => {
        if (matched.length === pokemon.length) setWin(true)
    }, [matched])

    const flipCard = (index) => {
        setMoves(moves => moves + 1)
        setOpened(opened => [...opened, index])
    }

    const restart = () => {
        setOpened([])
        setMatched([])
        setMoves(0)
        setWin(false)
    }
    return (
        <div className="app">
            <p>{moves} <strong>moves</strong></p>
            <div className="cards">
                {pokemonShuffle.map((pokemon, index) => {
                    let isFlipped = false
                    if (opened.includes(index)) isFlipped = true
                    if (matched.includes(pokemon.id)) isFlipped = true
                    return (
                        <PokemonCard
                            key={index}
                            id={pokemon.id}
                            name={pokemon.name}
                            isFlipped={isFlipped}
                            index={index}
                            flipCard={flipCard}
                        />
                    )
                })}
            </div>

            {win &&
            <div className='app__popup'>
                <button className='restart-button' onClick={() => restart()}>Restart Game</button>
            </div>
            }
        </div>
    )
}

export default App;
