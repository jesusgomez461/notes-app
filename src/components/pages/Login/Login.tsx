/* eslint-disable @typescript-eslint/no-explicit-any */
import { t } from "i18next";
import { ContainerLogin } from "../../../global/Styles";
import { useFormik } from "formik";
import { IFormikLogin } from "./Login.interface";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { START_ICON_LIGHT } from "../../../global";
import { mutationFetchLogin } from "../../../hooks";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { SessionStore } from "../../../store/store.session";
import { GlobalStore } from "../../../store/store.global";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setSession } = SessionStore();
  const { setIsSession } = GlobalStore();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values: IFormikLogin) => {
      const errors: Record<string, string> = {};

      if (!values.email) {
        errors.email = t("requiredField");
      }

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = t("invalidEmail");
      }

      if (!values.password) {
        errors.password = t("requiredField");
      }

      return errors;
    },
    onSubmit: async (values: IFormikLogin) => {
      try {
        toast.loading(t("loggingIn"), {
          description: t("pleaseWait"),
          duration: 3000000,
        });
        await fetchLogin(values);
      } catch (error) {
        console.log(error);

        toast.dismiss();
      } finally {
        toast.dismiss();
      }
    },
  });

  const { mutateAsync: fetchLogin, isPending: isPendingFetchLogin } =
    useMutation({
      mutationFn: mutationFetchLogin,
      onSuccess: async (res) => {
        if (res.status === 200) {
          toast.success(t("welcomeUser", { user: res.data.full_name }), {
            duration: 4000,
          });
          setSession(res.data);
          setIsSession(true);
          formik.resetForm();
        } else {
          toast.error(res.data.detail, { duration: 3000 });
        }
      },
      onError: (error: any) => {
        toast.error(t("error"), {
          description: t(error.response?.data.detail ?? "unknownError"),
          duration: 6000,
        });
      },
    });

  return (
    <ContainerLogin>
      <div className="help">
        <img
          src="/src/assets/login-illustration.png"
          alt="Login illustration"
        />
      </div>
      <div className="login">
        <div className="title-subtitle">
          <span className="title">{t("hello")}</span>
          <span className="subtitle">{t("welcomeAgain")}</span>
        </div>
        <div className="content">
          <span className="login-account">{t("loginYourAccount")}</span>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="email">{t("email")}</label>
              <InputText
                type="email"
                id="email"
                placeholder={t("email")}
                name="email"
                onChange={(e) => formik.setFieldValue("email", e.target.value)}
                value={formik.values.email}
              />
              {formik.errors.email ? (
                <span className="error">{formik.errors.email}</span>
              ) : null}
            </div>
            <div>
              <label htmlFor="password">{t("password")}</label>
              <Password
                toggleMask
                placeholder={t("password")}
                name="password"
                inputId="password"
                feedback={false}
                onChange={(e) =>
                  formik.setFieldValue("password", e.target.value)
                }
                value={formik.values.password}
              />
              {formik.errors.password ? (
                <span className="error">{formik.errors.password}</span>
              ) : null}
            </div>
            <div className="flex flex-column button-span">
              <Button
                icon={START_ICON_LIGHT + "user"}
                type="submit"
                label={t("login")}
                loading={isPendingFetchLogin}
              />
              <span
                className="flex align-items-center justify-content-center create-account"
                onClick={() => navigate("/create-account")}
              >
                {t("createAccountSpan")}
              </span>
            </div>
          </form>
        </div>
      </div>
    </ContainerLogin>
  );
}

export default Login;
