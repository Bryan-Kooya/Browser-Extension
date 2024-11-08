import React, { useEffect, useState } from "react";
import { observeAuthState, loginUser, logoutUser, registerUser } from "./authService";

const App = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    // Observe authentication state and update the user state
    const unsubscribe = observeAuthState((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setError("");
      await loginUser(email, password);
    } catch (error) {
      setError("Invalid credentials. Don't have an account? Register below.");
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      setError("");
      await registerUser(email, password);
      setIsRegistering(false); // Switch back to login after successful registration
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {user ? (
        // Show welcome message and logout button if user is logged in
        <div>
          <h1>Welcome, {user.email}</h1>
          <button onClick={logoutUser}>Logout</button>
        </div>
      ) : (
        // Show login or registration form based on `isRegistering` state
        <div>
          {isRegistering ? (
            // Registration Form
            <form onSubmit={handleRegister}>
              <h2>Register</h2>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button type="submit">Register</button>
              <p>
                Already have an account?{" "}
                <span onClick={() => setIsRegistering(false)} style={{ color: "blue", cursor: "pointer" }}>
                  Login here
                </span>
              </p>
            </form>
          ) : (
            // Login Form
            <form onSubmit={handleLogin}>
              <h2>Login</h2>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button type="submit">Login</button>
              {error && (
                <p>
                  Don't have an account?{" "}
                  <span onClick={() => setIsRegistering(true)} style={{ color: "blue", cursor: "pointer" }}>
                    Register here
                  </span>
                </p>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default App;