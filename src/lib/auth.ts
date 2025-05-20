
// Simple authentication system (in production this should connect to a secure backend)
export interface User {
  id: string;
  name: string;
  email: string;
  role: "ethics_officer" | "investigator" | "admin";
  avatar?: string;
}

// Demo users for the application
export const DEMO_USERS: User[] = [
  {
    id: "ethics-1",
    name: "Emma Johnson",
    email: "ethics@aegiswhisle.com",
    role: "ethics_officer",
    avatar: "https://i.pravatar.cc/150?u=ethics1",
  },
  {
    id: "inv-1",
    name: "David Lee",
    email: "investigator@aegiswhisle.com",
    role: "investigator",
    avatar: "https://i.pravatar.cc/150?u=inv1",
  },
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@aegiswhisle.com",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?u=admin1",
  },
];

// Password is 'password123' for all demo accounts
const DEMO_PASSWORD = "password123";

export const login = (email: string, password: string): User | null => {
  // In a real app, this would validate against a secure backend
  const user = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
  
  if (user && password === DEMO_PASSWORD) {
    // Store user in localStorage for persistence
    localStorage.setItem("aegis_current_user", JSON.stringify(user));
    return user;
  }
  
  return null;
};

export const logout = (): void => {
  localStorage.removeItem("aegis_current_user");
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem("aegis_current_user");
  if (userJson) {
    return JSON.parse(userJson) as User;
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};
