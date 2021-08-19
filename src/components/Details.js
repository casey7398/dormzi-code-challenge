import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// todo: Move all inline styles to classes
// todo: fix the error 404 to make it look prettier, not enough time

function Details(props) {
  const pokemon = parseInt(props.match.params.id, 10);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [pokemonDetail, setPokemonDetail] = useState();
  const [error, setError] = useState(0);

  const prevPokemon = pokemon !== 0 ? pokemon - 1 : 0;
  const nextPokemon = pokemon + 1;

  const hasPrev = pokemon > 1;
  const linkPrev = `/details/${prevPokemon}`;
  const linkNext = `/details/${nextPokemon}`;

  useEffect(() => {
    const handler = ({ code }) => {
      switch (code) {
        case "ArrowLeft":
          if (hasPrev) history.push(linkPrev);
          break;
        case "ArrowRight":
          history.push(linkNext);
          break;
        default:
          break;
      }
    };
    window.addEventListener("keyup", handler);

    return () => {
      window.removeEventListener("keyup", handler);
    };
  }, [hasPrev, history, linkNext, linkPrev]);

  useEffect(() => {
    axios
      .get(`http://pokemon.test.dormzi.com/pokemon/${pokemon}`)
      .then((res) => {
        console.log("res.data", res.data);
        if (res.data) {
          setPokemonDetail(res.data);
        } else {
          setError(404);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pokemon]);

  if (error) {
    return <div>Error {error}</div>;
  }

  return (
    <>
      <div className="detail-header">
        <Link to="/">
          <div className="prev-next-button">Home </div>
        </Link>
      </div>
      {!loading ? (
        <>
          <div className="pokemon-detail-container">
            <Link to={linkPrev}>
              <div className="prev-next-button">
                <ArrowBackIcon style={{ marginRight: 5 }} /> Previous
              </div>
            </Link>
            <div>
              <span className="hint"> hint!</span>{" "}
              <span style={{ color: "#b57614", fontSize: 14 }}>
                use arrow keys to navigate
              </span>
              <h2>
                Details for{" "}
                <span className="pokemon-name">{pokemonDetail.name}</span>
              </h2>
              <img
                src={pokemonDetail.picture}
                style={{ maxWidth: 200 }}
                alt={pokemonDetail.name}
              />
              <br />
              {/* Make this a table if time allows */}
              English Name: {pokemonDetail.name} <br />
              Chinese Name: {pokemonDetail.cname} <br />
              Japanese Name: {pokemonDetail.jname} <br />
              Image ID: {pokemonDetail.id}
              <h2>Skills:</h2>
              {Object.entries(pokemonDetail.skills).map(([key, values]) => {
                return (
                  <>
                    <h3>{key}</h3>
                    {values.map((value) => {
                      return (
                        <>
                          {value}
                          <br />
                        </>
                      );
                    })}
                  </>
                );
              })}
            </div>
            <Link to={linkNext}>
              <div className="prev-next-button">
                Next <ArrowForwardIcon style={{ marginLeft: 5 }} />
              </div>
            </Link>
          </div>
        </>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <h4>Please wait...</h4>
        </div>
      )}
    </>
  );
}

export default Details;
