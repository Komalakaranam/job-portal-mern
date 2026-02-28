import fetch from "node-fetch";
import fs from "fs";

/* ================= GEMINI CALL FUNCTION ================= */

const callGemini = async (prompt) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,   // Lower randomness for scoring consistency
          topP: 0.8
        }
      }),
    }
  );

  const data = await response.json();

  console.log("Gemini raw response:", JSON.stringify(data, null, 2));

  let text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  // Remove markdown formatting if present
  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return text;
};


/* ================= 🎭 GENERATE INTERVIEW QUESTIONS ================= */

export const generateInterviewQuestions = async (
  jobTitle,
  jobSkills,
  companyName
) => {
  const prompt = `
Generate 5 interview questions for the role of ${jobTitle} at ${companyName}.
Focus on these skills: ${jobSkills.join(",")}.

Return ONLY JSON:
{
  "questions": []
}
`;

  const text = await callGemini(prompt);

  try {
    return JSON.parse(text);
  } catch (err) {
    return { questions: ["AI response parsing failed. Check console."] };
  }
};


/* ================= 📝 EVALUATE ANSWER WITH RUBRIC ================= */

export const evaluateInterviewAnswer = async (question, answer) => {
  const prompt = `
You are a senior technical interviewer.

Evaluate the candidate's answer using the following rubric:

1. Technical Accuracy (0-4)
2. Depth of Explanation (0-3)
3. Clarity & Structure (0-2)
4. Use of Examples (0-1)

Maximum total score: 10.

Question: ${question}
Answer: ${answer}

Return ONLY JSON in this format:

{
  "totalScore": number,
  "rubric": {
    "technicalAccuracy": number,
    "depth": number,
    "clarity": number,
    "examples": number
  },
  "strengths": [],
  "improvements": [],
  "explanation": "Explain why this score was given.",
  "confidence": "Low | Medium | High"
}
`;

  const text = await callGemini(prompt);

  try {
    return JSON.parse(text);
  } catch (err) {
    return {
      totalScore: 0,
      rubric: {
        technicalAccuracy: 0,
        depth: 0,
        clarity: 0,
        examples: 0,
      },
      strengths: [],
      improvements: ["AI parsing failed. Check console."],
      explanation: "Parsing error occurred.",
      confidence: "Low"
    };
  }
};



export const simulateAtsScore = async (resumePath, jobSkills) => {
  try {
    // ✅ dynamic import for CommonJS package
    const pdfParseModule = await import("pdf-parse");
    const pdfParse = pdfParseModule.default;

    const buffer = fs.readFileSync(resumePath);
    const data = await pdfParse(buffer);

    const resumeText = data.text;

    const prompt = `
You are an ATS system.

Job required skills:
${jobSkills.join(", ")}

Resume content:
${resumeText}

Return ONLY JSON:
{
  "atsScore": number,
  "matchedSkills": [],
  "missingSkills": [],
  "improvementSuggestions": []
}
`;

    const text = await callGemini(prompt);
    return JSON.parse(text);

  } catch (error) {
    console.error("ATS Error:", error.message);
    return {
      atsScore: 0,
      matchedSkills: [],
      missingSkills: [],
      improvementSuggestions: ["Failed to analyze resume"]
    };
  }
};

    