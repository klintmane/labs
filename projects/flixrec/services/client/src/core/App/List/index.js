import React, { useState, memo } from "react";
import { useAsync } from "~/utils";
import VisibilitySensor from "react-visibility-sensor";
import * as Style from "./style";

const List = memo(props => {
  const { title, handler, component: Comp, wrap } = props;

  const items = useAsync(handler, {
    callOnMount: false,
    mapValues: (values, old) => ({
      data: [...(old.data || []), ...(values.data || [])]
    })
  })();

  const [page, setPage] = useState(0);
  const getItems = () => {
    if (!items.loading) {
      items.call(page);
      setPage(page + 1);
    }
  };

  return (
    <React.Fragment>
      {title && <header className={Style.Header}>{title}</header>}
      <ul className={Style.Container(props)}>
        {items.value.data &&
          items.value.data.map((item, i) => <Comp key={i} {...item} />)}
        {page < 4 ? (
          <VisibilitySensor onChange={visible => visible && getItems()}>
            <span>.</span>
          </VisibilitySensor>
        ) : (
          <button onClick={() => getItems()}>Get&nbsp;more</button>
        )}
      </ul>
    </React.Fragment>
  );
});

export default List;
