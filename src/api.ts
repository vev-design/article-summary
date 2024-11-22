const SYSTEM_PROMPT =
  "You are given all the text in an news article in the form of HTML. You should summarize the article according to the user prompt to JSON. The output language should be the language the article is written in.";

export async function generateSummary(text: string, apiKey: string) {
  const USER_PROMPT = `Summarize this article into 5 points: ${text}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: USER_PROMPT,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "summary_schema",
          schema: {
            type: "object",
            properties: {
              points: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            required: ["points"],
          },
        },
      },
    }),
  });

  if (response.ok) {
    const chatResponse = await response.json();
    return JSON.parse(chatResponse.choices[0].message.content);
  } else {
    const errorMessage = await response.text();
    throw Error(`Could not summarize: ${errorMessage}`);
  }
}
