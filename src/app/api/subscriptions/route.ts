import { createClient } from "../../utils/supabase/client";
export async function GET() {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase.from("Subscriptions").select("*");

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch subscriptions" }),
      { status: 500 }
    );
  }
}
