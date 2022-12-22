import { ObjectId } from "mongodb";
import { Quest } from "./quest";

export type Test = {
    _id: ObjectId;
    title: string;
    timeLimit: number;
    questions: Array<Quest>;
}