import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import axios from 'axios';
import React, { useState } from 'react';
function CarouselModal(props) {

    const [pokemon, setPokemon] = useState(1);
    const [loading, setLoading] = useState(true);
    const [pokemonDetail, setPokemonDetail] = useState({});

    const goNext = () => setPokemon(x => x + 1);
    const goPrev = () => setPokemon(x => x - 1);


    React.useEffect(() => {
        axios.get(`http://pokemon.test.dormzi.com/pokemon/${pokemon}`)
            .then(res => {
                setPokemonDetail(res.data);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [pokemon]);


    if (loading) {
        return <div />
    }


    return (
        <>
            <div className="modal-bg-overlay" />
            <div className="modal">
                <div className="modal-header">
                    <CancelPresentationIcon onClick={() => props.setModalOpen(false)} style={{ cursor: 'pointer' }} className="close-button"/>
                </div>

                <div>
                    <h2>Image of <span className="pokemon-name">{pokemonDetail.name}</span></h2>
                    <img src={pokemonDetail.picture} style={{ maxWidth: 400 }} alt={pokemonDetail.name} />
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                        <div className="prev-next-button" onClick={goPrev} disabled={pokemon <= 1} style={{ marginRight: 10 }}><ArrowBackIcon style={{ marginRight: 5 }} /> Previous</div>
                        <div className="prev-next-button" onClick={goNext} ><ArrowForwardIcon style={{ marginRight: 5 }} /> Next</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CarouselModal;