import type { APIRoute } from 'astro';
import { Resend } from 'resend';


export const prerender = false;

export const GET: APIRoute = async (context) => {
    const urlParams = new URL(context.url);
    const apiKey = urlParams.searchParams.get("apiKey");
    const fromEmail = urlParams.searchParams.get("fromEmail");
    const toEmail = urlParams.searchParams.get("toEmail");
    const subject = urlParams.searchParams.get("subject");
    const content = decodeURIComponent(urlParams.searchParams.get("content") || "");

    console.log(apiKey, fromEmail, toEmail, subject, content);

    if (!apiKey || !fromEmail || !toEmail || !subject || !content) {
        return new Response("Bad Request", { status: 400 });
    }

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        subject: subject,
        html: content
    });
    console.log(data, error);

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
    
    
};
