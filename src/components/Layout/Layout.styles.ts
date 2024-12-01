import styled from 'styled-components'

export const ContainerLayout = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  .top-bar {
    width: 100%;
    height: 7%;
    background-color: ${({ theme }) => theme.backgroundColor};
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
    color: ${({ theme }) => theme.textColor};
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo-show-hide-sidebar {
      width: 14.375rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 9px;

      i {
        font-size: 16px;
        color: ${({ theme }) => theme.grayColor};
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.mainColor};
        }
      }
    }

    .content-top-bar {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      padding-left: 0.9375rem;
      padding-right: 9px;

      div {
        display: flex;
        align-items: center;
        gap: 5px;

        &:last-of-type {
          .notifications.p-badge.p-component {
            min-width: 17.5px;
            height: 17.5px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${({ theme }) => theme.whiteColor};
          }
        }
      }
    }
  }

  .new-access {
    cursor: pointer;

    i {
      font-size: 19px;
      color: ${({ theme }) => theme.grayColor};

      &:hover {
        color: ${({ theme }) => theme.mainColor};
      }
    }
  }

  .main-sidebar {
    width: 100%;
    height: calc(100% - 7%);
    display: flex;
    overflow: hidden;

    .sidebar {
      width: 53px;
      border-right: 1px solid ${({ theme }) => theme.borderColor};
      background-color: ${({ theme }) => theme.backgroundColor};
      color: ${({ theme }) => theme.textColor};
    }

    .body {
      width: calc(100% - 53px);
      height: 100%;
      /* padding: 15px; */
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: ${({ theme }) => theme.containerColor};
      overflow-y: scroll;

      .footer {
        display: flex;
        align-items: center;
        justify-items: center;
        justify-content: center;
      }
    }
  }
`
