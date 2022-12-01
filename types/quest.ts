import { Option } from "./answer";

export type Quest = {
    title: string;
    timeLimit: number;
    type: "radio" | "checkbox";
    options: Array<Option>;
}