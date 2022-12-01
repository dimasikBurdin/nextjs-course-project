import { Test } from "../../types/test";

export const test: Test = {
    title: "РУСЬ И ЗОЛОТАЯ ОРДА",
    timeLimit: 3600,
    questions: [
        {
            type: 'radio',
            timeLimit: 60,
            title: "С именем какого князя связано объединение Галицкого и Волынского княжеств?",
            options: [
                {
                    title: "Романа Мстиславича",
                    valid: true
                },
                {
                    title: "Андрея Боголюбского",
                    valid: false
                },
                {
                    title: "Александра Невского",
                    valid: false
                },
                {
                    title: "Юрия Долгорукого",
                    valid: false
                },
            ]
        },
        {
            type: 'radio',
            timeLimit: 60,
            title: "Второй вопрос",
            options: [
                {
                    title: "<answer>",
                    valid: true
                },
                {
                    title: "<answer>",
                    valid: false
                },
                {
                    title: "<answer>",
                    valid: false
                },
                {
                    title: "<answer>",
                    valid: false
                },
            ]
        }
    ]
}