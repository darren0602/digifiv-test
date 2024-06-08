import { Formik, FormikHelpers } from "formik";
import { PropsWithChildren } from "react";

interface Props {
  initialValues: any;
  onSubmit: (values: any, formikHelpers?: FormikHelpers<any>) => void;
  validationSchema: any;
  innerRef?: any;
}

function Form({
  initialValues,
  onSubmit,
  validationSchema,
  innerRef,
  children,

  ...props
}: PropsWithChildren<Props>) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      innerRef={innerRef}
      validateOnMount={true}
      validateOnChange={true}
      {...props}
    >
      {children}
    </Formik>
  );
}

export default Form;
