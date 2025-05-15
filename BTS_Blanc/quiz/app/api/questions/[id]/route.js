import mysql from "mysql2/promise";

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  const { Question, Choix1, Choix2, Choix3, Reponse, Difficulty } = body;

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbquiz",
  });

  await connection.execute(
    "UPDATE Questions SET Question=?, Choix1=?, Choix2=?, Choix3=?, Reponse=?, Difficulty=? WHERE idQuestion=?",
    [Question, Choix1, Choix2, Choix3, Reponse, Difficulty, id]
  );
  await connection.end();

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function DELETE(request, { params }) {
  const { id } = params;

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbquiz",
  });

  await connection.execute("DELETE FROM Questions WHERE idQuestion=?", [id]);
  await connection.end();

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}