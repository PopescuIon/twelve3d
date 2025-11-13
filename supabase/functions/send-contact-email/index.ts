import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, subject, message }: ContactEmailRequest = await req.json();
    
    console.log("Received contact form submission:", { name, email, phone, subject });

    // TODO: Implement email sending with Resend
    // const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    // 
    // if (!RESEND_API_KEY) {
    //   throw new Error("RESEND_API_KEY is not configured");
    // }
    //
    // const response = await fetch("https://api.resend.com/emails", {
    //   method: "POST",
    //   headers: {
    //     "Authorization": `Bearer ${RESEND_API_KEY}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     from: "Twelve <onboarding@resend.dev>",
    //     to: ["twelve.ceasuri.perete@gmail.com"],
    //     subject: subject || "Mesaj nou de pe site-ul Twelve",
    //     html: `
    //       <h2>Mesaj nou de contact</h2>
    //       <p><strong>Nume:</strong> ${name}</p>
    //       <p><strong>Email:</strong> ${email}</p>
    //       <p><strong>Telefon:</strong> ${phone}</p>
    //       ${subject ? `<p><strong>Subiect:</strong> ${subject}</p>` : ''}
    //       <p><strong>Mesaj:</strong></p>
    //       <p>${message}</p>
    //       <hr>
    //       <p><small>Data: ${new Date().toLocaleString('ro-RO')}</small></p>
    //     `,
    //   }),
    // });

    return new Response(
      JSON.stringify({ success: true, message: "Email placeholder - configure RESEND_API_KEY to enable" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
