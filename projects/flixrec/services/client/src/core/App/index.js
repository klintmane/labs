import React, { memo } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Icon } from "~/components";
import { useAsync } from "~/utils";
import * as api from "~/api";
import Logo from "~/assets/logo.png";

import snitchr from "~/snitchr";

import List from "./List";
import MovieLink from "./MovieLink";
import MovieDetails from "./MovieDetails";
import Genres from "./Genres";
import * as Style from "./style";

window.snitchr = window.snitchr || snitchr();

const Home = props => {
  const genres = useAsync(api.getGenres)();

  return (
    <React.Fragment>
      <Genres loading={genres.loading} genres={genres.value.data} />
      <List title="Top" handler={api.getTopMovies} component={MovieLink} />
      {/* <List title="Recommended For You" /> */}
      <List
        title="Latest"
        handler={api.getMovies}
        component={MovieLink}
        wrap={true}
      />
    </React.Fragment>
  );
};

const App = memo(props => {
  return (
    <div className={Style.Container}>
      <nav className={Style.Nav}>
        <div>
          <Icon name="menu" />
        </div>
        <img src={Logo} />
        <div>
          <Icon name="search" />
        </div>
      </nav>
      <main className={Style.Main}>
        <BrowserRouter>
          <React.Fragment>
            <Home />
            <Switch>
              <Route path="/movie/:id" component={MovieDetails} />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </main>
    </div>
  );
});

export default App;
