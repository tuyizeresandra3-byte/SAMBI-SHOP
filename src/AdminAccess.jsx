import React, { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient.js";

function AdminAccess({ children }) {
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        setMessage(error.message);
      }

      setSession(data?.session || null);
      setLoading(false);
    }

    checkSession();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (mounted) {
        setSession(newSession);
        setRole(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    async function checkAdminRole() {
      if (!session) {
        setRole(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (!mounted) return;

      if (error) {
        setMessage("Could not verify admin access: " + error.message);
        setRole(null);
      } else {
        setRole(data.role);
      }

      setLoading(false);
    }

    checkAdminRole();

    return () => {
      mounted = false;
    };
  }, [session]);

  async function handleLogin(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
    }
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setMessage(error.message);
    }
  }

  if (loading) {
    return <p style={{ padding: "30px" }}>Checking admin access...</p>;
  }

  if (!session) {
    return (
      <div style={{
        maxWidth: "420px",
        margin: "60px auto",
        padding: "30px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
      }}>
        <h2 style={{ textAlign: "center" }}>Sambi-shop Admin Login</h2>
        <p style={{ textAlign: "center" }}>
          Sign in to manage your store.
        </p>

        <form onSubmit={handleLogin}>
          <label>Email address</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Admin email"
            style={{ width: "100%", padding: "12px", margin: "8px 0 16px" }}
          />

          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Your password"
            style={{ width: "100%", padding: "12px", margin: "8px 0 16px" }}
          />

          {message && (
            <p style={{ color: "red" }}>{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              background: "#c04a83",
              color: "white",
              border: "none",
              borderRadius: "7px",
              cursor: "pointer"
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }

  if (role !== "admin") {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Access denied</h2>
        <p>This account does not have admin permission.</p>
        {message && <p>{message}</p>}
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    );
  }

  return (
    <>
      <div style={{ textAlign: "right", padding: "10px 20px" }}>
        <span>Admin: {session.user.email} </span>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
      {children}
    </>
  );
}

export default AdminAccess;
