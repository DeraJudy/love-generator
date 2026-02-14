import { templates } from "../data/templates";

export function generatePoem({ name, nickname, mood }) {
  if (!name || !nickname) {
    return "Love begins with a name and a spark.";
  }

  const safeMood =
    mood && templates[mood]
      ? mood
      : "Romantic"; // fallback mood

  const moodTemplates = templates[safeMood];

  if (!moodTemplates || moodTemplates.length === 0) {
    return "Love is quietly blooming.";
  }

  const randomIndex = Math.floor(Math.random() * moodTemplates.length);
  const selected = moodTemplates[randomIndex];

  return selected
    .replaceAll("{name}", name)
    .replaceAll("{nickname}", nickname);
}