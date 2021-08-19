import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LaunchIcon from "@material-ui/icons/Launch";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CarouselModal from "./CarouselModal";

// todo: Move all inline styles to classes
// add loading states (skeletons) to pokemon images on card view

function PokemonCardItem({ pokemon }: any) {
  return (
    <>
      <Link to={`/details/${pokemon.id}`}>
        <Card className="pokemon-card">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              English Name: {pokemon.name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Image ID: {pokemon.id}
              <br />
              <img
                src={pokemon.picture}
                alt={pokemon.name}
                style={{ maxHeight: 200 }}
              />
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </>
  );
}

function PokemonListItem({ pokemon }: any) {
  return (
    <div className="list-container">
      <Link to={`/details/${pokemon.id}`}>
        <div className="pokemon">
          <div id="pokemon-info">
            English Name: {pokemon.name} <br />
            Image ID: {pokemon.id}
            <br />
            <img
              src={pokemon.picture}
              alt={pokemon.name}
              style={{ maxHeight: 50, marginTop: 10 }}
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

function usePagination(data: Array, size: any) {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [items, setItems] = useState([]);
  const goNextPage = () => setCurrentPage((x) => x + 1);
  const goPreviousPage = () => setCurrentPage((x) => x - 1);

  useEffect(() => {
    setItems(data);
    setPageSize(size);

    setTotalPages(Math.ceil(data.length / size));
    setCurrentPage(1);
  }, [data, size]);

  const currentPageData = useMemo(() => {
    const startOffset = (currentPage - 1) * pageSize;
    const endOffset = startOffset + pageSize;

    return items
      .map((x, i) => ({ x, i }))
      .filter((x) => x.i >= startOffset && x.i <= endOffset)
      .map((x) => x.x);
  }, [currentPage, items, pageSize]);

  return {
    currentPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 0,
    totalPages,
    currentPageData,
    goNextPage,
    goPreviousPage,
  };
}

const PAGE_SIZES = [5, 10, 15, 20];

function Home() {
  const [pokemonData, setPokemonData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [isList, setIsList] = useState(true);

  const paged = usePagination(pokemonData, pageSize);

  useEffect(() => {
    axios.get(`http://pokemon.test.dormzi.com/pokemon`).then((res) => {
      setPokemonData(res.data);
    });
  }, []);

  return (
    <>
      {modalOpen && (
        <CarouselModal data={pokemonData} setModalOpen={setModalOpen} />
      )}
      <div className="carousel-modal-button-container">
        <div className="button" onClick={() => setModalOpen(true)}>
          {" "}
          Open Image Carousel <LaunchIcon style={{ marginLeft: 5 }} />
        </div>
      </div>
      <div className="container">
        <div
          className="switch-view-button"
          onClick={() => setIsList((x) => !x)}
        >
          {" "}
          Switch view to {isList ? "Card" : "List"} View{" "}
        </div>

        <h2>Pokemon Data</h2>
        <div style={{ display: "flex" }}>
          Display results:
          <select
            style={{ marginLeft: 10 }}
            value={pageSize}
            onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
          >
            {PAGE_SIZES.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
          <div style={{ marginLeft: 10 }}>
            Page {paged.currentPage} of {paged.totalPages}
            <button
              onClick={paged.goPreviousPage}
              disabled={!paged.hasPreviousPage}
              style={{ marginLeft: 10, marginRight: 5 }}
            >
              Prev
            </button>
            <button onClick={paged.goNextPage} disabled={!paged.hasNextPage}>
              Next
            </button>
          </div>
        </div>
        <div>
          {isList ? (
            paged.currentPageData.map((x: any) => (
              <PokemonListItem key={x.id} pokemon={x} />
            ))
          ) : (
            <>
              <Grid container spacing={2}>
                {paged.currentPageData.map((x: any) => (
                  <Grid item lg={3}>
                    <PokemonCardItem key={x.id} pokemon={x} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
