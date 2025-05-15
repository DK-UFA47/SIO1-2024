import mysql from "mysql2/promise";

export async function POST(request) {
  const body = await request.json();
  const { Nom } = body;
  if (!Nom) {
    return new Response(JSON.stringify({ error: "Nom manquant." }), { status: 400 });
  }

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbquiz",
  });

  await connection.execute("INSERT INTO Categories (Nom) VALUES (?)", [Nom]);
  await connection.end();

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}