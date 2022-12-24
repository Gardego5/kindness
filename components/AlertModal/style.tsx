import styled from "@emotion/styled";

const component = "AlertModal";

const classes = {
  veil: `${component}-veil`,
  modal: `${component}-modal`,
  wrapper: `${component}-wrapper`,
  content: `${component}-content`,
  container: `${component}-container`,
  confirmation: `${component}-confirmation`,
};

const Root = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00008811;
  z-index: 5;

  .${classes.modal} {
    margin: auto;
    margin-top: 15vh;
    width: calc(100% - 2rem);
    max-width: 50ch;
    padding: 1rem;
    background-color: var(--white);

    display: grid;
    gap: 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--lt-gray);

    .${classes.wrapper} {
      border: 1px solid var(--lt-gray);
      padding: 0.5rem;
      border-radius: 0.5rem;
      overflow: hidden;

      // This section describes how rendered markdown appears.
      .${classes.content} {
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          margin-block: 0.5em;
        }

        h1 {
          font-size: xx-large;
          font-weight: 800;
        }
        h2 {
          font-size: x-large;
          font-weight: 700;
        }
        h3 {
          font-size: larger;
          font-weight: 700;
        }
        h4 {
          font-size: large;
          font-weight: 600;
        }
        h5 {
          font-size: large;
          font-weight: 400;
        }
        h6 {
          font-size: large;
          font-weight: 200;
        }

        strong {
          font-weight: bolder;
        }
        em {
          font-style: italic;
        }
      }
    }

    .${classes.confirmation} {
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 1rem;

      button {
        padding: 0.25rem 0.75rem;
        border-radius: 0.25rem;
        border: 1px solid var(--lt-gray);
        background: var(--white);
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 600;
        box-shadow: inset 0 -1px 6px -1px var(--lt-gray);
        color: var(--black);

        :hover {
          border: 1px solid var(--md-gray);
        }

        :active {
          box-shadow: none;
        }

        :disabled {
          background: repeating-linear-gradient(
            125deg,
            #eee,
            #eee 3px,
            #fff 5px,
            #fff 8px,
            #eee 10px
          );
          border: 1px solid var(--lt-gray);
          color: var(--md-gray);
          cursor: not-allowed;
        }
      }
    }
  }
`;

export { Root, classes };
