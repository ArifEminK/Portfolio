export interface Education {
    id: number;
    title: string;
    institution: string;
    period: string;
    description: string;
    type: "education" | "certificate";
}