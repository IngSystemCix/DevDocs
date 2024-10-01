import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ request }) => {
  const contentType = request.headers.get('content-type') || '';

  if (!contentType.includes('application/x-www-form-urlencoded')) {
    return new Response("Content-Type no soportado. Use application/x-www-form-urlencoded", { status: 400 });
  }

  const formData = await request.formData();
  const email = formData.get("correo")?.toString();

  if (!email) {
    return new Response("Correo no encontrado", { status: 400 });
  }

  try {
    const db = getFirestore(app);
    await db.collection("DevDocs").add({ email });

    const url = new URL(request.url);
    const redirectUrl = `${url.origin}/DevDocs/home`;

    return Response.redirect(redirectUrl, 302);
  } catch (error) {
    console.error(error);
    return new Response("Error al guardar el correo", { status: 500 });
  }
};
