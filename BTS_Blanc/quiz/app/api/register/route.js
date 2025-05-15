import mysql from 'mysql2/promise';

export async function POST(request) {
  const body = await request.json();
  const { Role, Nom, Prenom, Email, Password } = body;

  if (!Role || !Nom || !Prenom || !Email || !Password) {
    return new Response(JSON.stringify({ error: 'Champs manquants.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'dbQuiz',
    });

    await connection.execute(
      'INSERT INTO Utilisateurs (Role, Nom, Prenom, Email, Password) VALUES (?, ?, ?, ?, ?)',
      [Role, Nom, Prenom, Email, Password]
    );
    await connection.end();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la création du compte.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}