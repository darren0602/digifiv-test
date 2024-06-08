export interface UserProps {
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface UserFormProps {
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface UserFormValues {
  name: string;
  email: string;
}

export interface UserUpdateFormValues {
  id: number;
  name: string;
  email: string;
}
