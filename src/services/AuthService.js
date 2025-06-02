class AuthService {
  constructor() {
    this.baseUrl = "https://3715-50-226-153-6.ngrok-free.app";
  }

  async login(email, password) {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        
        // Handle different HTTP status codes
        if (response.status === 401) {
          throw new Error(error.detail || "Invalid email or password");
        } else if (response.status === 422) {
          throw new Error(error.detail || "Please check your email and password");
        } else if (response.status >= 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(error.detail || "Login failed");
        }
      }

      return response.json();
    } catch (error) {
      // Handle network errors (when backend is not running)
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your connection.');
      }
      // Re-throw other errors
      throw error;
    }
  }

 async register(username, email, password) {
  const response = await fetch(`${this.baseUrl}/api/v1/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.log("Full error response:", error);
    
    const errorMessage = error.detail?.[0]?.msg || "Registration failed";
    throw new Error(errorMessage);
  }

  return response.json();
}


  async getProtectedData(token) {
    const response = await fetch(`${this.baseUrl}/api/v1/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch protected data");
    }

    return response.json();
  }
}

export default new AuthService();
