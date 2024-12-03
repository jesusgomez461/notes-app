/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { t } from "i18next";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { checkRequirements, START_ICON_LIGHT } from "../../../global";
import {
  ContainerCreateAccount,
  ContainerIRequirementsPassword,
} from "../../../global/Styles";
import { mutationFetchRegister } from "../../../hooks";
import { IFormikCreateAccount } from "./CreateAccount.interface";

function CreateAccount() {
  const navigate = useNavigate();
  const [requirementsMet, setRequirementsMet] = useState({
    lowercase: false,
    uppercase: false,
    numeric: false,
    minLength: false,
    specialChar: false,
  });

  const [
    requirementsMetPasswordConfirmation,
    setRequirementsMetPasswordConfirmation,
  ] = useState({
    lowercase: false,
    uppercase: false,
    numeric: false,
    minLength: false,
    specialChar: false,
  });

  const formik = useFormik({
    initialValues: {
      document: "",
      full_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validate: (values: IFormikCreateAccount) => {
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

      if (!values.password_confirmation) {
        errors.password_confirmation = t("requiredField");
      }

      if (values.password !== values.password_confirmation) {
        errors.password_confirmation = t("passwordsDoNotMatch");
      }

      if (!values.document) {
        errors.document = t("requiredField");
      }

      if (!values.full_name) {
        errors.full_name = t("requiredField");
      }

      return errors;
    },
    onSubmit: async (values: IFormikCreateAccount) => {
      try {
        toast.loading(t("creatingAccount"), {
          description: t("pleaseWait"),
          duration: 3000000,
        });
        await fetchCreateAccount(values);
      } catch (error) {
        console.log(error);

        toast.dismiss();
      } finally {
        toast.dismiss();
      }
    },
  });

  useEffect(() => {
    if (formik.values.password) {
      setRequirementsMet(checkRequirements(formik.values.password));
    }
  }, [formik.values.password]);

  useEffect(() => {
    if (formik.values.password_confirmation) {
      setRequirementsMetPasswordConfirmation(
        checkRequirements(formik.values.password_confirmation)
      );
    }
  }, [formik.values.password_confirmation]);

  const {
    mutateAsync: fetchCreateAccount,
    isPending: isPendingFetchCreateAccount,
  } = useMutation({
    mutationFn: mutationFetchRegister,
    onSuccess: async (res) => {
      if (res.status === 200) {
        toast.success(t("createdAccountSuccess"), {
          duration: 4000,
        });
        formik.resetForm();
        navigate("/login");
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

  const header = <div className="font-bold mb-3">{t("pickAPassword")}</div>;
  const footer = (
    <>
      <Divider />
      <p className="mt-2">{t("requirements")}</p>
      <ul className="pl-0 mt-0 line-height-3">
        <ContainerIRequirementsPassword $isComplete={requirementsMet.lowercase}>
          <i
            className={`${START_ICON_LIGHT}${
              requirementsMet.lowercase ? "check-circle" : "times-circle"
            }`}
          ></i>
          {t("atLeastOneLowercase")}
        </ContainerIRequirementsPassword>
        <ContainerIRequirementsPassword $isComplete={requirementsMet.uppercase}>
          <i
            className={`${START_ICON_LIGHT}${
              requirementsMet.uppercase === true
                ? "check-circle"
                : "times-circle"
            }`}
          ></i>
          {t("atLeastOneUppercase")}
        </ContainerIRequirementsPassword>
        <ContainerIRequirementsPassword $isComplete={requirementsMet.numeric}>
          <i
            className={`${START_ICON_LIGHT}${
              requirementsMet.numeric ? "check-circle" : "times-circle"
            }`}
          ></i>
          {t("atLeastOneNumeric")}
        </ContainerIRequirementsPassword>
        <ContainerIRequirementsPassword $isComplete={requirementsMet.minLength}>
          <i
            className={`${START_ICON_LIGHT}${
              requirementsMet.minLength ? "check-circle" : "times-circle"
            }`}
          ></i>
          {t("minimum8Characters")}
        </ContainerIRequirementsPassword>
        <ContainerIRequirementsPassword
          $isComplete={requirementsMet.specialChar}
        >
          <i
            className={`${START_ICON_LIGHT}${
              requirementsMet.specialChar ? "check-circle" : "times-circle"
            }`}
          ></i>
          {t("minimumOneSpecialCharacter")}
        </ContainerIRequirementsPassword>
      </ul>
    </>
  );

  const footerPasswordConfirmation = (
    <>
      <Divider />
      <p className="mt-2">{t("requirements")}</p>
      <ul className="pl-0 mt-0 line-height-3">
        <ContainerIRequirementsPassword
          $isComplete={requirementsMetPasswordConfirmation.lowercase}
        >
          <i
            className={`${START_ICON_LIGHT}${
              requirementsMetPasswordConfirmation.lowercase
                ? "check-circle"
                : "times-circle"
            }`}
          ></i>
          {t("atLeastOneLowercase")}
        </ContainerIRequirementsPassword>
        <ContainerIRequirementsPassword
          $isComplete={requirementsMetPasswordConfirmation.uppercase}
        >
          <i
            className={`${START_ICON_LIGHT}${
              requirementsMetPasswordConfirmation.uppercase === true
                ? "check-circle"
                : "times-circle"
            }`}
          ></i>
          {t("atLeastOneUppercase")}
        </ContainerIRequirementsPassword>
        <ContainerIRequirementsPassword
          $isComplete={requirementsMetPasswordConfirmation.numeric}
        >
          <i
            className={`${START_ICON_LIGHT}${
              requirementsMetPasswordConfirmation.numeric
                ? "check-circle"
                : "times-circle"
            }`}
          ></i>
          {t("atLeastOneNumeric")}
        </ContainerIRequirementsPassword>
        <ContainerIRequirementsPassword
          $isComplete={requirementsMetPasswordConfirmation.minLength}
        >
          <i
            className={`${START_ICON_LIGHT}${
              requirementsMetPasswordConfirmation.minLength
                ? "check-circle"
                : "times-circle"
            }`}
          ></i>
          {t("minimum8Characters")}
        </ContainerIRequirementsPassword>
        <ContainerIRequirementsPassword
          $isComplete={requirementsMetPasswordConfirmation.specialChar}
        >
          <i
            className={`${START_ICON_LIGHT}${
              requirementsMetPasswordConfirmation.specialChar
                ? "check-circle"
                : "times-circle"
            }`}
          ></i>
          {t("minimumOneSpecialCharacter")}
        </ContainerIRequirementsPassword>
      </ul>
    </>
  );

  return (
    <ContainerCreateAccount>
      <div className="help">
        <img
          src="/src/assets/create-user-illustration.png"
          alt="Login illustration"
        />
      </div>
      <div className="create-account-form">
        <div className="title-subtitle">
          <span className="title">{t("hello")}</span>
          <span className="subtitle">{t("startWidthApp")}</span>
        </div>
        <div className="content">
          <span className="login-account">{t("create")}</span>
          <form onSubmit={formik.handleSubmit} className="w-full">
            <div className="grid-container formgrid grid">
              <div className="content-input lg:col-6 md:col-12">
                <label htmlFor="document">{t("document")}</label>
                <InputText
                  type="text"
                  id="document"
                  placeholder={t("document")}
                  name="document"
                  onChange={(e) =>
                    formik.setFieldValue("document", e.target.value)
                  }
                  value={formik.values.document}
                />
                {formik.errors.document ? (
                  <span className="error">{formik.errors.document}</span>
                ) : null}
              </div>
              <div className="content-input lg:col-6 md:col-12">
                <label htmlFor="full_name">{t("fullName")}</label>
                <InputText
                  type="text"
                  id="full_name"
                  placeholder={t("fullName")}
                  name="full_name"
                  onChange={(e) =>
                    formik.setFieldValue("full_name", e.target.value)
                  }
                  value={formik.values.full_name}
                />
                {formik.errors.full_name ? (
                  <span className="error">{formik.errors.full_name}</span>
                ) : null}
              </div>
            </div>
            <div className="grid-container formgrid grid">
              <div className="content-input lg:col-6 md:col-12">
                <label htmlFor="email">{t("email")}</label>
                <InputText
                  type="email"
                  id="email"
                  placeholder={t("email")}
                  name="email"
                  onChange={(e) =>
                    formik.setFieldValue("email", e.target.value)
                  }
                  value={formik.values.email}
                />
                {formik.errors.email ? (
                  <span className="error">{formik.errors.email}</span>
                ) : null}
              </div>
              <div className="content-input lg:col-6 md:col-12">
                <label htmlFor="password">{t("password")}</label>
                <Password
                  toggleMask
                  placeholder={t("password")}
                  name="password"
                  inputId="password"
                  onChange={(e) =>
                    formik.setFieldValue("password", e.target.value)
                  }
                  header={header}
                  footer={footer}
                  value={formik.values.password}
                />
                {formik.errors.password ? (
                  <span className="error">{formik.errors.password}</span>
                ) : null}
              </div>
            </div>
            <div className="grid-container formgrid grid">
              <div className="content-input lg:col-6 md:col-12">
                <label htmlFor="password_confirmation">
                  {t("confirmPassword")}
                </label>
                <Password
                  toggleMask
                  placeholder={t("confirmPassword")}
                  name="password_confirmation"
                  inputId="password_confirmation"
                  onChange={(e) =>
                    formik.setFieldValue(
                      "password_confirmation",
                      e.target.value
                    )
                  }
                  header={header}
                  footer={footerPasswordConfirmation}
                  value={formik.values.password_confirmation}
                />
                {formik.errors.password_confirmation ? (
                  <span className="error">
                    {formik.errors.password_confirmation}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="flex flex-column button-span">
              <Button
                icon={START_ICON_LIGHT + "user-plus"}
                type="submit"
                label={t("createAccount")}
                loading={isPendingFetchCreateAccount}
              />
              <span
                className="flex align-items-center justify-content-center create-account"
                onClick={() => navigate("/login")}
              >
                {t("login")}
              </span>
            </div>
          </form>
        </div>
      </div>
    </ContainerCreateAccount>
  );
}

export default CreateAccount;
