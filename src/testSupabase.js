
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient.js";

function SupabaseTest() {
  const [message, setMessage] = useState("Testing Supabase...");

  useEffect(() => {
    async function checkConnection() {
      try {
        const { error } = await supabase.auth.getSession();

        if (error) {
          setMessage("Connection error: " + error.message);
        } else {
          setMessage("Supabase client is working!");
        }
      } catch (error) {
        setMessage("Unexpected error: " + error.message);
      }
    }

    checkConnection();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Supabase Connection Test</h1>
      <p>{message}</p>
    </div>
  );
}

export default SupabaseTest;
