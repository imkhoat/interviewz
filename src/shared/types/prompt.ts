export interface Prompt {
  id: string;
  role: "system" | "user";
  content: string;
}