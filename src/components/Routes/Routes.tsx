/* eslint-disable no-extra-boolean-cast */
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as RoutesGroup,
} from "react-router-dom";
import { GlobalStore } from "../../store/store.global";
import Layout from "../Layout/Layout";
import CreateAccount from "../pages/CreateAccount/CreateAccount";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import { ProtectedRoute } from "./ProtectedRoutes";
import Category from "../pages/Category/Category";
import { SessionStore } from "../../store/store.session";

function Routes() {
  const { session } = SessionStore();
  const { isSession } = GlobalStore();

  return (
    <BrowserRouter>
      <RoutesGroup>
        <Route
          element={
            <ProtectedRoute
              isAllowed={isSession ? false : true}
              redirectTo="/home"
            />
          }
        >
          <Route path={`/login`} element={<Login />} />
          <Route path={`/create-account`} element={<CreateAccount />} />
        </Route>

        <Route
          element={
            <ProtectedRoute
              isAllowed={!!session?.access_token ? true : false}
              redirectTo="/login"
            />
          }
        >
          <Route
            path={`/home`}
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path={`/categories`}
            element={
              <Layout>
                <Category />
              </Layout>
            }
          />
          <Route
            path="/"
            element={
              <Layout>
                <Navigate to={`/home`} replace />
              </Layout>
            }
          />
        </Route>
      </RoutesGroup>
    </BrowserRouter>
  );
}

export default Routes;
