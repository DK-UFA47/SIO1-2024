"use client";
import { useEffect, useState } from "react";

export default function QuizPage() {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        async function fetchQuizzes() {
            const res = await fetch("/api/questions");
            if (res.ok) {
                const data = await res.json();
                setQuizzes(data);
            }
        }
        fetchQuizzes();
    }, []);

    return (
        <div className="bg-white p-8">
            <h1 className="text-4xl mb-8">Quiz par catégorie</h1>
            <div className="flex flex-col gap-8">
                {quizzes.map((cat) => (
                    <div key={cat.idCategorie}>
                        <h2 className="text-2xl mb-2">{cat.categorie}</h2>
                        <div className="flex overflow-x-auto gap-4 pb-4">
                            {cat.questions.length > 0 ? (
                                cat.questions.map((q) => (
                                    <div
                                      key={q.idQuestion}
                                      className="min-w-[300px] bg-blue-100 p-4 rounded shadow"
                                    >
                                      {q.Question}
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500">Aucune question</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}