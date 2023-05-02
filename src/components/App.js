import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.log(error));
  }, []);

  function handleAddQuestion(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((data) => setQuestions([...questions, data]))
      .catch((error) => console.log(error));
  }

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => setQuestions(questions.filter((q) => q.id !== id)))
      .catch((error) => console.log(error));
  }

  function handleUpdateQuestion(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    })
      .then((res) => res.json())
      .then((data) =>
        setQuestions(
          questions.map((q) => (q.id === id ? { ...q, correctIndex } : q))
        )
      )
      .catch((error) => console.log(error));
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList questions={questions} 
        onDeleteQuestion={handleDeleteQuestion}
        onUpdateQuestion={handleUpdateQuestion}/>
      )}
    </main>
  );
}

export default App;
