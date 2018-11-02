import Seer, { comp } from "seer";

const Header = (props, content) => (
  <div>
    <h1>{props.title}</h1>
    <p>{content}</p>
  </div>
);

export default Header;
