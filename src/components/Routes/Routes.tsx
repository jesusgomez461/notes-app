import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as RoutesGroup,
} from "react-router-dom";
import { SessionStore } from "../../store/store.session";
import { ProtectedRoute } from "./ProtectedRoutes";
import Login from "../pages/Login/Login";
import CreateAccount from "../pages/CreateAccount/CreateAccount";
import Home from "../pages/Home/Home";
import Layout from "../Layout/Layout";

function Routes() {
  const { session } = SessionStore();

  return (
    <BrowserRouter>
      <RoutesGroup>
        <Route
          element={
            <ProtectedRoute
              isAllowed={session ? false : true}
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
              isAllowed={session ? true : false}
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
