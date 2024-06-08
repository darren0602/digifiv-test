import { useFormikContext } from "formik";
import { PropsWithChildren } from "react";
import BackgroundButton from "../button/background-button.component";
import BorderButton from "../button/border-button.component";

interface Props {
  variant?: "contained" | "outlined";
  disabled?: boolean;
}

function FormSubmitButton({
  children,
  variant = "contained",
  disabled = false,
}: PropsWithChildren<Props>) {
  const { handleSubmit } = useFormikContext();

  return variant === "contained" ? (
    <BackgroundButton onClick={handleSubmit} disabled={disabled}>
      {children}
    </BackgroundButton>
  ) : (
    <BorderButton onClick={handleSubmit} disabled={disabled}>
      {children}
    </BorderButton>
  );
}

export default FormSubmitButton;
