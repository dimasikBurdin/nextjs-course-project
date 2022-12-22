import { FC, useMemo, useState } from "react";
import { Header } from "../../components/Header/Header";
import { SideMenu } from "../../components/SideMenu/SideMenu";
import styles from './resultPage.module.css';

export default function ResultPage() {
    const [values, setValues] = useState<{
        totalResult: string,
            resultItems:  Array<{answerNumber: number, expectRes: number, currentRes: number}>,
    }>({resultItems: [], totalResult: ''})
    useMemo(async () => {
        const checkRes = await fetch('http://localhost:3000/api/getAnswers');
        const { questions } = await checkRes.json() as {questions: Array<{valid: number}>};
        const resultsRes = await fetch('http://localhost:3000/api/getResults');
        const sendedAnswers = await resultsRes.json() as Array<{ questNumber: number, resNumber: number}>;
        const totalAns = questions.length;
        let currentAns = 0;
        let summary: Array<{answerNumber: number, expectRes: number, currentRes: number}> = []
        for(let {questNumber, resNumber} of sendedAnswers) {
            if(questions[questNumber].valid === resNumber) {
                currentAns++;
            }
            summary.push({
                answerNumber: questNumber,
                currentRes: resNumber,
                expectRes: questions[questNumber].valid,
            })
        }
        setValues({
            totalResult: `${currentAns}/${questions.length}`,
            resultItems: summary,
        })
    }, [])
    return <div className={styles.main}>
    <SideMenu 
      answers={[]}
      onClickTask={() => {}}
    />
    <div className={styles.mainPart}>
      <Header 
        title='Результаты'
        currentAnswer={0}
        timeLeft="0"
        totalAnswers={0}
      />
      <div className={styles.content}>
        {values.resultItems.map(({answerNumber, currentRes, expectRes}) => {
            return <div className={styles.item}>
                <div>Вопрос: {answerNumber}</div>
                <div>
                    <div>Ваш ответ: {currentRes}</div>
                    <div>Правильный ответ: {expectRes}</div>
                </div>
            </div>
        })}
        <div style={{alignSelf: 'flex-end'}}>Ваш результат: {values.totalResult}</div>
      </div>
    </div>
  </div>
}