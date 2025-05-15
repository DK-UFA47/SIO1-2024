import mysql from "mysql2/promise";

export async function GET() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbquiz",
  });

  const [categories] = await connection.execute("SELECT idCategorie, Nom FROM Categories");

  const quizzes = [];
  for (const cat of categories) {
    const [questions] = await connection.execute(
      "SELECT idQuestion, Question, Difficulty, Choix1, Choix2, Choix3, Reponse FROM Questions WHERE idCategorie = ?",
      [cat.idCategorie]
    );
    quizzes.push({
      idCategorie: cat.idCategorie,
      categorie: cat.Nom,
      questions,
    });
  }

  await connection.end();

  return new Response(JSON.stringify(quizzes), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}