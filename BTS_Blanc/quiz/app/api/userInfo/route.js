import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import mysql from "mysql2/promise";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ error: "Non autorisé" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "dbquiz",
    });

    const [rows] = await connection.execute(
      "SELECT Nom, Prenom, Email FROM Utilisateurs WHERE Email = ?",
      [session.user.email]
    );
    await connection.end();

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: "Utilisateur non trouvé" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(rows[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}