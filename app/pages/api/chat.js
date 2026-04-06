export default async function handler(req, res) {
  const { message } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are Menmex AI, a smart, friendly and confident assistant created by Idris (Menmex). Always respond clearly and helpfully."
        },
        {
          role: "user",
          content: message
        }
      ]
    })
  });

  const data = await response.json();

  res.status(200).json({
    reply: data.choices[0].message.content
  });
}
