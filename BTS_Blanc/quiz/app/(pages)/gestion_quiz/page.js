"use client";
import { useEffect, useState } from "react";

export default function GestionQuizPage() {
    const [quizzes, setQuizzes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(""); // "add" | "edit" | "category"
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [categoryName, setCategoryName] = useState("");
    const [form, setForm] = useState({
        idCategorie: "",
        Question: "",
        Choix1: "",
        Choix2: "",
        Choix3: "",
        Reponse: "",
        Difficulty: "",
    });

    // Fetch quizzes and categories
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

    // Open modal for add/edit/category
    const openModal = (type, question = null, catId = "") => {
        setModalType(type);
        setShowModal(true);
        setCurrentQuestion(question);
        if (type === "edit" && question) {
            setForm({ ...question, idCategorie: catId });
        } else if (type === "add") {
            setForm({
                Question: "",
                Choix1: "",
                Choix2: "",
                Choix3: "",
                Reponse: "",
                Difficulty: "",
                idCategorie: catId,
            });
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentQuestion(null);
        setCategoryName("");
        setForm({
            Question: "",
            Choix1: "",
            Choix2: "",
            Choix3: "",
            Reponse: "",
            Difficulty: "",
            idCategorie: "",
        });
    };

    // Handle form changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Add or edit question
    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = modalType === "edit" ? "PUT" : "POST";
        const url = modalType === "edit"
            ? `/api/questions/${currentQuestion.idQuestion}`
            : "/api/questions";
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        if (res.ok) {
            window.location.reload();
        }
    };

    // Delete question
    const handleDelete = async (idQuestion) => {
        if (!confirm("Supprimer cette question ?")) return;
        const res = await fetch(`/api/questions/${idQuestion}`, { method: "DELETE" });
        if (res.ok) window.location.reload();
    };

    // Add category
    const handleAddCategory = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Nom: categoryName }),
        });
        if (res.ok) window.location.reload();
    };

    return (
        <div className="bg-white p-8">
            <h1 className="text-4xl mb-8">Gestion des quizzes</h1>
            <form onSubmit={handleAddCategory} className="flex gap-2 mb-8">
                <input
                    type="text"
                    value={categoryName}
                    onChange={e => setCategoryName(e.target.value)}
                    placeholder="Nouvelle catégorie"
                    className="border p-2 rounded"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Ajouter Catégorie
                </button>
            </form>
            <div className="flex flex-col gap-8">
                {quizzes.map((cat) => (
                    <div key={cat.idCategorie}>
                        <div className="flex items-center mb-2">
                            <h2 className="text-2xl">{cat.categorie}</h2>
                            <button
                                className="ml-4 bg-green-500 text-white px-3 py-1 rounded"
                                onClick={() => openModal("add", null, cat.idCategorie)}
                            >
                                + Question
                            </button>
                        </div>
                        <div className="flex overflow-x-auto gap-4 pb-4">
                            {cat.questions.length > 0 ? (
                                cat.questions.map((q) => (
                                    <div
                                        key={q.idQuestion}
                                        className="min-w-[300px] bg-blue-100 p-4 rounded shadow relative"
                                    >
                                        <div className="font-bold mb-2">{q.Question}</div>
                                        <div className="text-sm mb-1">Difficulté: {q.Difficulty}</div>
                                        <div className="text-sm mb-1">1) {q.Choix1}</div>
                                        <div className="text-sm mb-1">2) {q.Choix2}</div>
                                        <div className="text-sm mb-1">3) {q.Choix3}</div>
                                        <div className="text-xs text-gray-500 mb-2">Réponse: {q.Reponse}</div>
                                        <button
                                            className="absolute bottom-1/4 right-2 bg-yellow-400 text-white px-2 py-1 rounded"
                                            onClick={() => openModal("edit", q, cat.idCategorie)}
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            className="absolute bottom-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={() => handleDelete(q.idQuestion)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500">Aucune question</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for add/edit question */}
            {showModal && (modalType === "add" || modalType === "edit") && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-8 rounded shadow-lg max-w-lg w-full relative flex flex-col gap-4"
                    >
                        <button
                            type="button"
                            onClick={closeModal}
                            className="absolute top-2 right-4 text-2xl font-bold text-gray-500 hover:text-gray-800"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl mb-2">
                            {modalType === "add" ? "Ajouter une question" : "Modifier la question"}
                        </h2>
                        <input
                            type="text"
                            name="Question"
                            value={form.Question}
                            onChange={handleChange}
                            placeholder="Question"
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="text"
                            name="Choix1"
                            value={form.Choix1}
                            onChange={handleChange}
                            placeholder="Choix 1"
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="text"
                            name="Choix2"
                            value={form.Choix2}
                            onChange={handleChange}
                            placeholder="Choix 2"
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="text"
                            name="Choix3"
                            value={form.Choix3}
                            onChange={handleChange}
                            placeholder="Choix 3"
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="text"
                            name="Reponse"
                            value={form.Reponse}
                            onChange={handleChange}
                            placeholder="Réponse correcte"
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="text"
                            name="Difficulty"
                            value={form.Difficulty}
                            onChange={handleChange}
                            placeholder="Difficulté"
                            className="border p-2 rounded"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            {modalType === "add" ? "Ajouter" : "Enregistrer"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}