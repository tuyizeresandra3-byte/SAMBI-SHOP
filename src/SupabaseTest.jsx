import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient.js";

function SupabaseTest() {
  const [message, setMessage] = useState("Testing Supabase...");

  useEffect(() => {
    async function checkConnection() {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          setMessage("Error: " + error.message);
          return;
        }

        setMessage("Supabase client is working!");
        console.log("Current session:", data.session);
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
