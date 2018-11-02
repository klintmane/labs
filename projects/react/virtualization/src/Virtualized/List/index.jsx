import React, { Component } from "react";
import { StyledContainer, StyledInnerContainer, Items } from "./styles";

import Item from "./Item";
import Loading from "./Loading";

const isTop = scTop => scTop === 0;
const isBottom = (height, scHeight, scTop) => scTop + height >= scHeight;

class List extends Component {
  constructor(props) {
    super(props);
    const { height, itemHeight, items, offset, handleTop } = props;
    handleTop();

    this.state = {
      scrollHeight: itemHeight * items.length,
      scrollTop: 0,
      position: { current: 0, min: 0, max: height / itemHeight + offset }
    };
  }

  calculatePosition = () => {
    const { scrollTop } = this.state;
    const { itemHeight, height, offset } = this.props;

    const current = Math.floor(scrollTop / itemHeight);
    const min = current - offset;
    const max = current + height / itemHeight + offset;

    this.setState({ position: { min, max, current } });
  };

  handleScroll = ({ target: { scrollHeight, scrollTop } }) => {
    const { height, handleTop, handleBottom } = this.props;

    isTop(scrollTop) && handleTop();
    isBottom(height, scrollHeight, scrollTop) && handleBottom();

    this.setState({
      scrollTop,
      scrollHeight
    });

    this.calculatePosition();
  };

  shouldRender = i => {
    const { position } = this.state;
    return i >= position.min && i <= position.max;
  };

  render() {
    const { items, height, itemHeight, offset, showLoader } = this.props;

    return (
      <StyledContainer height={height} onScroll={this.handleScroll}>
        <StyledInnerContainer height={itemHeight * items.length}>
          <Items top={-offset * itemHeight}>
            {items.map((item, i) => {
              return this.shouldRender(i) ? (
                <Item key={i} height={itemHeight}>
                  {item + " " + i}
                </Item>
              ) : null;
            })}

            {showLoader && <Loading />}
          </Items>
        </StyledInnerContainer>
      </StyledContainer>
    );
  }
}

export default List;
