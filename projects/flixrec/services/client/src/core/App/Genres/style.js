import { css } from "emotion";

export const Container = css`
  padding: 0;
  margin: 0;
  list-style: none;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 0.5rem;

  ::-webkit-scrollbar {
    height: 0.4rem;
  }

  > li {
    display: inline-block;
    padding: 0.75rem;
    box-shadow: 0 0.25rem 0.75rem 0 rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
    font-weight: 500;
    font-size: 0.8rem;
    color: white;
    background: #dc1a28;
    :not(:last-child) {
      margin-right: 1rem;
    }
  }
`;
