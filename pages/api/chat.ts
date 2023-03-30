import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";
// const templateFood = `return the same string you're given`;
const templateFood = `Jesteś konsultantem dietetycznym. Dostajesz dane na temat osoby i odpowiadasz podając plan zywieniowy na jeden posiłek. Używaj tylko systemu metrycznego. Odpowiadaj tylko planem żywieniowym w formatowaniu Markdown`;
// const templateFood = `Jesteś konsultantem dietetycznym. Dostajesz dane na temat osoby i odpowiadasz podając plan zywieniowy na cały dzień. Używaj tylko systemu metrycznego. Odpowiadaj tylko planem żywieniowym w formatowaniu Markdown`;
type RequestData = {
    currentModel: string;
    message: string;
};

if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing env var from OpenAI");
}

export const runtime = "edge";

export default async function handler(request: Request) {
    const { message } = (await request.json()) as RequestData;
    console.log(message);
    if (!message) {
        return new Response("No message in the request", { status: 400 });
    }

    const payload: OpenAIStreamPayload = {
        model: "gpt-3.5-turbo",
        // model: `${currentModel}`,
        messages: [
            { role: "user", content: message },
            { role: "system", content: templateFood },
        ],
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 600,
        stream: true,
        n: 1,
    };

    const stream = await OpenAIStream(payload);
    return new Response(stream);
    // const res =
    //     "Witaj! Oto plan żywieniowy na jeden posiłek dla Ciebie, który pomoże Ci zmniejszyć masę ciała:\n\n### Śniadanie\n\n- Owsianka z płatków owsianych, mleka odtłuszczonego i wody (40g płatków owsianych, 100ml mleka odtłuszczonego, 100ml wody)\n- Tarta z jajkiem, szpinakiem i pomidorami (1 jajko, 50g szpinaku, 50g pomidorów)\n- Herbata z cytryną\n\nOwsianka to idealne śniadanie dla osób, które chcą schudnąć. Zawiera dużo błonnika, który daje uczucie sytości na długo. Tarta z jajkiem, szpinakiem i pomidorami dostarczy Ci białka i warzyw, które są niezbędne w diecie odchudzającej. Herbata z cytryną pobudzi Twój metabolizm i dodatkowo nawodni organizm.\n\nPamiętaj, że dieta odchudzająca powinna być zbilansowana i bogata w składniki odżywcze. Nie zapomnij też o regularnej aktywności fizycznej!";

    // return new Response(res);
}
