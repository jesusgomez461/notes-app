import styled, { createGlobalStyle } from "styled-components";
import { IPropsColorRequirementsPassword } from "./Styles.interface";

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

    button {
      border-color: ${({ theme }) => theme.mainColor};
    }

    input, textarea {
      background-color: ${({ theme }) => theme.backgroundColor};
      color: ${({ theme }) => theme.textColor};
      &:hover {
        border-color: ${({ theme }) => theme.mainColor};
      }

      &:focus {
        border-color: ${({ theme }) => theme.mainColor};
        box-shadow: 0.3px 0.8px 0.6px 0.6px ${({ theme }) =>
          theme.mainColorLight};
      }
    }

    .p-password.p-component {
      .p-icon-field {
        width: 100%;
      }
    }

    .p-button.p-component {
      background-color: ${({ theme }) => theme.mainColor};

      span {
        color: ${({ theme }) => theme.whiteColor};
      }
    }

    .element-pointer:hover {
      span, i {
        color: ${({ theme }) => theme.redColor};
      }
    }

    .p-avatar.p-component {
      background-color: ${({ theme }) => theme.mainColor};
      span, i {
        color: ${({ theme }) => theme.whiteColor};
      }
    }

    .p-overlaypanel.p-component {
      .p-overlaypanel-content {
        background-color: ${({ theme }) => theme.backgroundColor};
      }
    }

    nav {
      ul {
        li {
          list-style: none !important;

          &:hover {
            a {
              .container-create-element-menu {
                display: flex;
                visibility: visible;
              }
            }
          }
          
          a {
            i {
              font-size: 21px;
            }

            span {
              font-size: 15px;
            }

            .container-create-element-menu {
              display: none;
              visibility: hidden;
            }
          }
          
          .active {
            span, i {
              color: ${({ theme }) => theme.mainColor};
            }
          }
        }

        .active-parent {
          .menu-header {
            span, i {
              color: ${({ theme }) => theme.mainColor};
            }
          }
        }

        .subitem-content-li {
          margin-top: 10px;
        }
      }

      .subitem-content-ul {
        padding-top: 0px !important;
      }
    }
    
    .actions-body {
      i {
        cursor: pointer;
        &:hover { 
          color: ${({ theme }) => theme.mainColor};
        }
      }
    }

    .p-confirm-dialog.p-dialog.p-component {
      max-width: 40%;
      min-width: 30%;
      .p-dialog-footer {
        button:first-of-type {
          background-color: transparent;
          border-color: transparent;
          span {
            color: ${({ theme }) => theme.redColor};
          }

          &:hover {
            background-color: ${({ theme }) => theme.redColor};
            span {
              color: ${({ theme }) => theme.whiteColor};
            }
          }
        }
      }
    }

    .text-main-color {
      color: ${({ theme }) => theme.mainColor};
    }

    .border-button-add-element {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      border: 1px solid ${({ theme }) => theme.mainColor};
      border-radius: 5px;
      padding: 7px 10px;
      cursor: pointer;

      span, i {
        font-size: 15px;
        color: ${({ theme }) => theme.mainColor};
      }

      i {
        font-size: 14px;
        margin-top: 1px;
      }

      &:hover {
        background-color: ${({ theme }) => theme.mainColor};
        span, i {
          color: ${({ theme }) => theme.whiteColor};
        }
      }
    }

    .button-container {
      display: flex;
      gap: 20px;

      button:first-of-type {
          background-color: transparent;
          border-color: transparent;
          span {
            color: ${({ theme }) => theme.redColor};
          }

          &:hover {
            background-color: ${({ theme }) => theme.redColor};
            span {
              color: ${({ theme }) => theme.whiteColor};
            }
          }
        }
    }

    .error {
      color: ${({ theme }) => theme.errorColor} !important;
      font-size: 0.8125rem;
    }

    .p-card.p-component {
      background-color: ${({ theme }) => theme.backgroundColor};

      .p-datatable.p-component {
        .p-datatable-header {
          background-color: ${({ theme }) => theme.backgroundColor};
        }
        .p-datatable-wrapper {
          .p-datatable-table {
            background-color: ${({ theme }) => theme.backgroundColor};

            tr {
              th {
                background-color: ${({ theme }) => theme.backgroundColor};
                color: ${({ theme }) => theme.textColor};

                span {
                  font-weight: 400;
                }

                span:last-of-type {
                  svg {
                    width: 12px;
                    height: 12px;
                  }
                }

                &.p-highlight {
                  .p-column-header-content {
                    span:last-of-type {
                      svg {
                        color: ${({ theme }) => theme.mainColor};
                      }
                    }
                  }
                }
              }

              td {
                background-color: ${({ theme }) => theme.backgroundColor};
                color: ${({ theme }) => theme.textColor};
              }
            }
          }
        }

        .p-paginator-bottom { 
          background-color: ${({ theme }) => theme.backgroundColor};
        }
      }
    }

    .p-dialog.p-component {
      .p-dialog-header {
        background-color: ${({ theme }) => theme.containerColor};
        color: ${({ theme }) => theme.textColor};

        .p-dialog-header-icons {
          button {
            color: ${({ theme }) => theme.textColor};
          }
        }
      }
    }

    .p-dialog .p-dialog-content {
      background-color: ${({ theme }) => theme.containerColor};
      color: ${({ theme }) => theme.textColor};

      input, textarea, .p-dropdown.p-component {
        background-color: ${({ theme }) => theme.containerColor};
      }
    }

    .p-dialog-footer {
      background-color: ${({ theme }) => theme.containerColor};
      color: ${({ theme }) => theme.textColor};

      button {
        background-color: ${({ theme }) => theme.mainColor};
        color: ${({ theme }) => theme.whiteColor};

        &:hover {
          background-color: ${({ theme }) => theme.mainColorLight};
        }
      }
    }

    .p-dropdown-panel.p-component {
      background-color: ${({ theme }) => theme.backgroundColor};
      color: ${({ theme }) => theme.textColor};

      .p-dropdown-items-wrapper {
        .p-dropdown-item.p-focus {
          background-color: ${({ theme }) => theme.mainColorLight};
          color: ${({ theme }) => theme.whiteColor};
        }

        .p-dropdown-item.p-highlight {
          background-color: ${({ theme }) => theme.mainColor};
          color: ${({ theme }) => theme.whiteColor};
        }
      }
    }

    .p-column-filter-overlay {
      background-color: ${({ theme }) => theme.containerColor};

      li {
        color: ${({ theme }) => theme.textColor};

        &.p-highlight {
          background-color: ${({ theme }) => theme.mainColor};
          color: ${({ theme }) => theme.whiteColor};   
        }

        &:hover {
          background-color: ${({ theme }) => theme.mainColorLight};
          color: ${({ theme }) => theme.whiteColor};
        }
      }
    }

    .p-column-filter-menu-button {
      svg {
        width: 15px;
        height: 15px;
      }

      &:hover {
        background-color: ${({ theme }) => theme.mainColor};
        svg {
          color: ${({ theme }) => theme.whiteColor};
        }
      }
    }
`;

export const ContainerLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .help {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.mainColor};

    img {
      width: 90%;
      height: 90%;
      object-fit: contain;
    }
  }

  .login {
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0px 50px;
    gap: 50px;
    background-color: ${({ theme }) => theme.backgroundColor};

    .title-subtitle {
      display: flex;
      flex-direction: column;

      .title {
        font-size: 2.5rem;
        font-weight: 700;
        color: ${({ theme }) => theme.mainColor};
      }

      .subtitle {
        font-size: 1.5rem;
        font-weight: 500;
        color: ${({ theme }) => theme.textColor};
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .login-account {
        font-size: 1.4375rem;
        font-weight: 400;
        color: ${({ theme }) => theme.textColor} !important;
        margin-bottom: 20px;
      }

      form {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 30px;

        div {
          display: flex;
          flex-direction: column;
          gap: 5px;

          input {
            width: 100%;
          }

          .error {
            color: ${({ theme }) => theme.errorColor} !important;
            font-size: 0.8125rem;
          }
        }

        .button-span {
          .create-account {
            font-size: 14px;
            color: ${({ theme }) => theme.textColor} !important;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;

            &:hover {
              color: ${({ theme }) => theme.mainColor} !important;
            }
          }
        }
      }
    }
  }

  @media (max-width: 930px) {
    .help {
      visibility: hidden;
      display: none !important;
    }

    .login {
      width: 100%;
    }
  }
`;

export const ContainerCreateAccount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;

  .help {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.mainColor};

    img {
      width: 70%;
      height: 70%;
      object-fit: contain;
    }
  }

  .create-account-form {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px 50px;
    gap: 50px;
    overflow: auto;
    background-color: ${({ theme }) => theme.backgroundColor};

    .title-subtitle {
      display: flex;
      flex-direction: column;

      .title {
        font-size: 2.5rem;
        font-weight: 700;
        color: ${({ theme }) => theme.mainColor};
      }

      .subtitle {
        font-size: 1.5rem;
        font-weight: 500;
        color: ${({ theme }) => theme.textColor};
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .login-account {
        font-size: 1.4375rem;
        font-weight: 400;
        color: ${({ theme }) => theme.textColor} !important;
        margin-bottom: 20px;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 5px;

        .grid-container {
          .content-input {
            label {
              margin-bottom: 5px;
            }

            display: flex;
            flex-direction: column;

            .error {
              color: ${({ theme }) => theme.errorColor} !important;
              font-size: 0.8125rem;
            }
          }
        }

        input {
          width: 100%;
        }

        .button-span {
          margin-top: 15px;
          .create-account {
            font-size: 14px;
            color: ${({ theme }) => theme.textColor} !important;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;

            &:hover {
              color: ${({ theme }) => theme.mainColor} !important;
            }
          }
        }
      }
    }
  }

  /* Media Query para ocultar .help en pantallas pequeñas */
  @media (max-width: 830px) {
    .help {
      visibility: hidden;
      display: none !important;
    }

    .create-account-form {
      width: 100%; /* Usar el 100% del ancho disponible */
    }
  }
`;

export const ContainerIRequirementsPassword = styled.li<IPropsColorRequirementsPassword>`
  display: flex;
  gap: 4px;
  font-size: 14px;
  align-items: center;

  color: ${({ $isComplete, theme }) =>
    $isComplete ? theme.successColor : theme.redColor};

  i {
    color: ${({ $isComplete, theme }) =>
      $isComplete ? theme.successColor : theme.redColor};
    font-size: 14px;
    margin-top: 1px;
  }
`;

export const Container = styled.div`
  width: 98%;
  height: 100%;
  margin: 17px 20px;
  border-radius: 10px;
  padding: 20px;
  background-color: ${({ theme }) => theme.backgroundColor};
  border: 1px solid ${({ theme }) => theme.borderLightColor};
`;
