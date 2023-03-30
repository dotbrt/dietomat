import type { NextApiRequest, NextApiResponse } from "next";

export default async function getData(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const inputData = req.body.formData;
    const prompt = `Jestem ${inputData.gender} w wieku ${inputData.age} lat. Mam ${inputData.height} cm wzrostu i ważę ${inputData.weight} kg. Mój cel to ${inputData.goal}.`;
    console.log(prompt);
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (req.query.useDummyData === "true") {
        res.status(200).json(inputData.goal);
        return;
    }

    const openaiUrl = "https://api.openai.com/v1/chat/completions";

    try {
        const response = await fetch(openaiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    { role: "user", content: prompt },
                    {
                        role: "system",
                        content:
                            "Jesteś konsultantem dietetycznym. Dostajesz dane na temat osoby i odpowiadasz podając plan zywieniowy na cały dzień. Używaj tylko systemu metrycznego. Odpowiadaj tylko planem żywieniowym w formatowaniu Markdown",
                    },
                ],
                max_tokens: 500,
                temperature: 0.7,
            }),
        });
        const data = await response.json();
        console.time(data);
        res.status(200).json(data.choices[0]?.message.content);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching data from OpenAI API.");
    }
}
