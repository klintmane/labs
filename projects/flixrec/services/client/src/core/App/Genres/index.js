import React, { memo } from "react";
import * as Style from "./style";

const Genres = memo(props => {
  const { genres = [], loading } = props;

  return loading ? (
    "Loading..."
  ) : (
    <ul className={Style.Container}>
      {genres.map((g, i) => g.genre && <li key={i}>{g.genre}</li>)}
    </ul>
  );
});

export default Genres;
