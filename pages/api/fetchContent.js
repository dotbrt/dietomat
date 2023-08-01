import { templateBMC_GPT4 } from "./templates";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// export const config = {
//     runtime: "edge",
// };
export default async function handler(req, res) {
    const caller = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo-16k",
            temperature: 1,
            messages: [
                { role: "system", content: templateBMC_GPT4 },
                { role: "user", content: req.body },
            ],
        }),
    });
    const data = await caller.json();
    console.log(data);
    const text = await data.choices[0]?.message.content;
    try {
        const parsed = JSON.parse(text);
        console.log(parsed);
        return res.json(parsed);
    } catch (e) {
        return res.status(502);
    }
}
