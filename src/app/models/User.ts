export interface User {
  uid: string;
  email: string;
  name: string;
  rol: string;
  password: string;
  displayName?: string;
  photoURL?: string;
  emailVerified?: boolean;
}
