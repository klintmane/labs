import React, { memo, useEffect } from "react";
import { useAsync } from "~/utils";
import * as api from "~/api";
import { PopupPage } from "~/components";
import * as Style from "./style";

const MovieDetails = memo(props => {
  const { history, match } = props;
  const { params } = match;

  const details = useAsync(api.getMovieDetails)(params.id);
  const { loading, value, error } = details;
  const {
    title,
    genres = [],
    tagline = "",
    overview = "",
    vote_average,
    runtime,
    backdrop_path,
    release_date,
    production_countries = []
  } = value;

  useEffect(() => {
    window.snitchr.snitch("openMovie", { id: params.id });
    return () => {};
  }, []);

  return (
    <PopupPage history={history} title={<span>{title || "Movie"}</span>}>
      {loading ? (
        "Loading..."
      ) : (
        <div className={Style.Container}>
          <img src={`//image.tmdb.org/t/p/w500${backdrop_path}`} />
          <div data-id="content">
            <header>{title}</header>
            <p>
              {genres.map((g, i) => (
                <small>{i === 0 ? g.name : `, ${g.name}`}</small>
              ))}
            </p>
            <ul>
              <li>
                <header>Release</header>
                <div>{release_date}</div>
              </li>
              <li>
                <header>Contries</header>
                <div>
                  {production_countries.map((c, i) => (
                    <span>{i === 0 ? c.iso_3166_1 : `, ${c.iso_3166_1}`}</span>
                  ))}
                </div>
              </li>
              <li>
                <header>Runtime</header>
                <div>{runtime} minutes</div>
              </li>
            </ul>
            <p>
              <em>{tagline}</em>
            </p>
            <p>{overview}</p>
          </div>
        </div>
      )}
    </PopupPage>
  );
});

export default MovieDetails;
