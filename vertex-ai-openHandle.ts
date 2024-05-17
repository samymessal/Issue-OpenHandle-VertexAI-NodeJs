import { VertexAI } from '@google-cloud/vertexai';

export async function callVertexAiApi(projectId: string, prompt: string) {
  const vertex_ai = new VertexAI({
    project: projectId,
    location: 'europe-west9',
  });
  const model = 'gemini-1.5-pro-preview-0514';
  const generativeModel = vertex_ai.preview.getGenerativeModel({
    model: model,
    generationConfig: {
      maxOutputTokens: 8192,
      temperature: 1,
      topP: 0.95,
    },
  });

  const promptFormat = {
    text: prompt,
  };

  const req = {
    contents: [{ role: 'user', parts: [promptFormat] }],
  };

  const streamingResp = await generativeModel.generateContent(req);
  const response =
    streamingResp.response.candidates?.[0]?.content?.parts?.[0]?.text;
  return response ? response : undefined;
}
