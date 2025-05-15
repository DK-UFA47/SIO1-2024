"use client";
import { useEffect, useState } from "react";

export default function QuizPage() {
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [toast, setToast] = useState({ show: false, correct: false });

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

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
        setSelectedAnswer(null);
        setToast({ show: false, correct: false });
    };

    const closeModal = () => {
        setSelectedQuestion(null);
        setSelectedAnswer(null);
        setToast({ show: false, correct: false });
    };

    const handleAnswerClick = (answer) => {
        if (selectedAnswer) return;
        setSelectedAnswer(answer);
        const isCorrect = answer === selectedQuestion.Reponse;
        setToast({ show: true, correct: isCorrect });
        setTimeout(() => setToast({ show: false, correct: false }), 3000);
    };

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
                                        className="min-w-[300px] bg-blue-100 p-4 rounded shadow cursor-pointer hover:bg-blue-200 transition"
                                        onClick={() => handleQuestionClick(q)}
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

            {/* Modal */}
            {selectedQuestion && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-4 text-2xl font-bold text-gray-500 hover:text-gray-800"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl mb-4">{selectedQuestion.Question}</h2>
                        <div
                            className={`mb-2 p-2 rounded cursor-pointer border ${
                                selectedAnswer === selectedQuestion.Choix1
                                    ? selectedAnswer === selectedQuestion.Reponse
                                        ? "bg-green-200 border-green-500"
                                        : "bg-red-200 border-red-500"
                                    : "hover:bg-blue-50"
                            }`}
                            onClick={() => handleAnswerClick(selectedQuestion.Choix1)}
                        >
                            <strong>1) </strong> {selectedQuestion.Choix1}
                        </div>
                        <div
                            className={`mb-2 p-2 rounded cursor-pointer border ${
                                selectedAnswer === selectedQuestion.Choix2
                                    ? selectedAnswer === selectedQuestion.Reponse
                                        ? "bg-green-200 border-green-500"
                                        : "bg-red-200 border-red-500"
                                    : "hover:bg-blue-50"
                            }`}
                            onClick={() => handleAnswerClick(selectedQuestion.Choix2)}
                        >
                            <strong>2) </strong> {selectedQuestion.Choix2}
                        </div>
                        <div
                            className={`mb-2 p-2 rounded cursor-pointer border ${
                                selectedAnswer === selectedQuestion.Choix3
                                    ? selectedAnswer === selectedQuestion.Reponse
                                        ? "bg-green-200 border-green-500"
                                        : "bg-red-200 border-red-500"
                                    : "hover:bg-blue-50"
                            }`}
                            onClick={() => handleAnswerClick(selectedQuestion.Choix3)}
                        >
                            <strong>3) </strong> {selectedQuestion.Choix3}
                        </div>
                        {/* <div className="mb-2">
                            <strong>Difficulté:</strong> {selectedQuestion.Difficulty}
                        </div> */}
                        {/* Toast */}
                        {toast.show && (
                            <div
                                className={`absolute left-1/2 -translate-x-1/2 bottom-4 px-6 py-2 rounded text-white font-bold shadow-lg ${
                                    toast.correct ? "bg-green-600" : "bg-red-600"
                                }`}
                            >
                                {toast.correct ? "Bonne réponse !" : "Mauvaise réponse. La bonne réponse est : " + selectedQuestion.Reponse}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}