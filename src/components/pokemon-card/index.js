import React from 'react'

const PokemonCard = ({ id, name, isFlipped, index, flipCard}) => {
    return(
        <button className={`pokemon-card ${isFlipped ? 'flipped': ''}`}   onClick={() => {if(!isFlipped) flipCard(index)}}>
            <div className="inner">
                <div className="front">
                    <img
                        src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
                        alt={name}
                        width='100'
                    />
                </div>
                <div className="back">?</div>
            </div>
        </button>
    )
}

export default PokemonCard