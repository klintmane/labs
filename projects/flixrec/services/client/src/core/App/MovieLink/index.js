import React, { memo } from "react";
import { Icon, Link } from "~/components";
import { useAsync } from "~/utils";
import * as api from "~/api";
import * as Style from "./style";

const Overlay = memo(props => {
  const { id, title = "", genres = [], overview = "", vote_average } = props;

  return (
    <Link
      to={`/movie/${id}`}
      className={Style.Overlay}
      data-id="overlay"
      onPointerEnter={e => e.stopPropagation()}
    >
      <header>{title}</header>
      <p>
        {genres.map((g, i) => (
          <small>{i === 0 ? g.name : `, ${g.name}`}</small>
        ))}
      </p>
      <p>{overview.substr(0, 50)}...</p>
      <p>
        <Icon name="star" size={0.75} />
        &nbsp;{vote_average}
      </p>
    </Link>
  );
});

const MovieLink = memo(props => {
  const { id } = props;

  const details = useAsync(api.getMovieDetails)(id);
  const { loading, value, error } = details;
  const { poster_path, title } = value;

  return (
    <li
      className={Style.Container}
      onPointerEnter={e => window.snitchr.snitch("hoverMovie", { id })}
    >
      {!loading && <Overlay {...value} title={title || props.title} id={id} />}
      {loading ? (
        "Loading..."
      ) : poster_path ? (
        <img src={`//image.tmdb.org/t/p/w200/${poster_path}`} />
      ) : (
        <header>{title || props.title}</header>
      )}
    </li>
  );
});

export default MovieLink;
