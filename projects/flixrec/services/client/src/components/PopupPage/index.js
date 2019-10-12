import React, { useState, useEffect } from "react";
import { Link, Icon } from "~/components";
import * as Style from "./style";

export const useBodyOverflow = (condition = true) => {
  useEffect(() => {
    if (condition) document.body.style.overflow = "hidden";
    return () => {
      if (condition) document.body.style.overflow = "unset";
    };
  }, []);
};

export const PopupPage = props => {
  const { children, title, background, history, left, right } = props;
  const [transitioned, setTransitioned] = useState(false);
  useBodyOverflow(document.body.style.overflow !== "hidden");
  !transitioned && setTimeout(() => setTransitioned(true), 20);

  return (
    <div className={Style.Container({ transitioned, background })}>
      {title ? (
        <PopupPage.Header
          history={history}
          title={title}
          left={left}
          right={right}
        />
      ) : null}
      {children}
    </div>
  );
};

PopupPage.Header = props => {
  const {
    children,
    title = "Page",
    closeIcon = "chevron_left",
    history,
    left,
    right
  } = props;

  const closePage = e => {
    if (history.goBack) {
      e.preventDefault();
      history.push("/");
    }
  };

  const handleKey = e => {
    if (e.code === "Escape") {
      closePage(e);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <header className={Style.Header}>
      {left || (
        <Link to="/" onClick={closePage}>
          <Icon name={closeIcon} />
        </Link>
      )}
      {children || title}
      {right || <div />}
    </header>
  );
};
