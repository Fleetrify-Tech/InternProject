export interface User {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  role: "Super Admin" | "Admin" | "Support";
}
