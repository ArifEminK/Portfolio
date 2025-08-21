export interface Skill {
    id: number;
    title: string;
    type: "language" | "tool" | "program";
    level: "beginner" | "intermediate" | "advanced" | "expert";
}