const API_URL = "http://localhost:5000/api/v1/auth/";

class AuthService {
  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      data.user &&
        localStorage.setItem("cookbook-user", JSON.stringify(data.user));

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async register(email, password, repeatPassword) {
    try {
      const response = await fetch(`${API_URL}register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const { message } = await response.json();

      switch (response.status) {
        case 201:
          return message;
        case 400:
          throw new Error(message);
        case 500:
          throw new Error("server error - please try again later");
        default:
          console.log("unhandled");
          break;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async logout() {
    try {
      localStorage.removeItem("cookbook-user");
      await fetch(`${API_URL}logout`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async notAuthenticated() {
    try {
      localStorage.removeItem("cookbook-user");
      return;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default AuthService;
