import { Quest } from "./quest";

export type Test = {
    title: string;
    timeLimit: number;
    questions: Array<Quest>;
}