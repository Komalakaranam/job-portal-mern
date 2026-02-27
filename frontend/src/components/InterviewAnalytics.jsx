import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function InterviewAnalytics({ token }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/ai/interview/history",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const formatted = res.data.map((item, index) => ({
        attempt: index + 1,
        score: item.totalScore,
      }));

      setData(formatted);
    };

    fetchHistory();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">📊 Interview Performance</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="attempt" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#4f46e5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}