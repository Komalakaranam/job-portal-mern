import { useEffect, useState } from "react";
import axios from "axios";

export default function MockInterview({ jobId, token }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // 🔹 Fetch interview questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `https://job-portal-mern-6.onrender.com/api/ai/mock-interview/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQuestions(res.data.questions);
      } catch (err) {
        console.error(err);
        alert("Failed to load interview questions");
      }
    };

    fetchQuestions();
  }, [jobId, token]);

  // 🔹 Submit answer for evaluation
  const handleSubmit = async () => {
    if (!answer.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post(
  `https://job-portal-mern-6.onrender.com/api/ai/mock-interview/${jobId}/evaluate`,
        {
          question: questions[currentIndex],
          answer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Evaluation failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Next Question
  const handleNext = () => {
    setAnswer("");
    setResult(null);
    setCurrentIndex((prev) => prev + 1);
  };
  const startVoiceInput = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition not supported in this browser");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.start();

  recognition.onstart = () => {
    console.log("Voice recognition started...");
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setAnswer(transcript);
  };

  recognition.onerror = (event) => {
    console.error("Voice error:", event.error);
  };

  recognition.onend = () => {
    console.log("Voice recognition ended.");
  };
};
  if (!questions.length) return <p>Loading questions...</p>;

  if (currentIndex >= questions.length)
    return <h3>🎉 Interview Completed!</h3>;

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">
        Question {currentIndex + 1} of {questions.length}
      </h2>

      <p className="mb-4">{questions[currentIndex]}</p>

      <textarea
        rows="5"
        className="w-full border p-2 rounded"
        placeholder="Type your answer..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      {!result && (
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Evaluating..." : "Submit Answer"}
        </button>
      )}

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-bold text-lg mb-2">
            ⭐ Total Score: {result.totalScore}/10
          </h3>

          <div className="mb-2">
            <strong>Rubric Breakdown:</strong>
            <ul className="list-disc ml-5">
              <li>Technical Accuracy: {result.rubric.technicalAccuracy}</li>
              <li>Depth: {result.rubric.depth}</li>
              <li>Clarity: {result.rubric.clarity}</li>
              <li>Examples: {result.rubric.examples}</li>
            </ul>
          </div>

          <div className="mb-2">
            <strong>Strengths:</strong>
            <ul className="list-disc ml-5">
              {result.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="mb-2">
            <strong>Improvements:</strong>
            <ul className="list-disc ml-5">
              {result.improvements.map((i, index) => (
                <li key={index}>{i}</li>
              ))}
            </ul>
          </div>

          <p className="mt-2">
            <strong>Explanation:</strong> {result.explanation}
          </p>

          <p className="mt-2">
            <strong>Confidence:</strong> {result.confidence}
          </p>

          <button
            onClick={handleNext}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Next Question →
          </button>
          <button
  onClick={startVoiceInput}
  className="mt-2 bg-purple-600 text-white px-3 py-2 rounded"
>
  {isListening ? "Listening..." : "🎤 Speak Answer"}
</button>
        </div>
      )}
    </div>
    
  );
}