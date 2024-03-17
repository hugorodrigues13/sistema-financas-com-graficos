import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* Adicione estilos globais aqui */
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  body {
    background: var(--white);
  }

  body, input, textarea, select, button {
    font: 400 1rem sans-serif; /* 1rem = 16px */
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%; /* 14px */
    }
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%; /* 15px */
    }
  }
`;