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
      "SELECT idQuestion, Question, Choix1, Choix2, Choix3, Reponse, Difficulty FROM Questions WHERE idCategorie = ?",
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

export async function POST(request) {
  const body = await request.json();
  const { idCategorie, Question, Choix1, Choix2, Choix3, Reponse, Difficulty } = body;
  if (!idCategorie || !Question || !Choix1 || !Choix2 || !Choix3 || !Reponse || !Difficulty) {
    return new Response(JSON.stringify({ error: "Champs manquants." }), { status: 400 });
  }

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbquiz",
  });

  await connection.execute(
    "INSERT INTO Questions (idCategorie, Question, Choix1, Choix2, Choix3, Reponse, Difficulty) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [idCategorie, Question, Choix1, Choix2, Choix3, Reponse, Difficulty]
  );
  await connection.end();

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}