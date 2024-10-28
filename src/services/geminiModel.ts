import { app } from "./firebaseConfig";
import { getVertexAI, getGenerativeModel } from "firebase/vertexai-preview";

const MODEL = "gemini-1.5-flash";

const vertexAI = getVertexAI(app);
const geminiModel = getGenerativeModel(vertexAI, { model: MODEL });

export { geminiModel };
