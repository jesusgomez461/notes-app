import { createGlobalStyle } from "styled-components";

export const Styles = createGlobalStyle`
    span, label, p, h1, h2, h3, h4, i {
        color: ${({ theme }) => theme.textColor};
    }

    i {
      font-size: 19px;

      &:hover {
        color: ${({ theme }) => theme.mainColor};
      }
    }
`;
