import { ObjectId } from 'mongodb';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Header } from '../../components/Header/Header';
import { SideMenu } from '../../components/SideMenu/SideMenu';
import { TaskContainer } from '../../components/TaskContainer/TaskContainer';
// import { test as testData } from '../../test-moks/test/test';
import { Test } from '../../types/test';
import styles from './[id].module.css';

export default function DinamicPage(props: {testData?: Test}) {
  // const { testData } = props;
  const [testData, setTestData] = useState<Test>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClickOtherTask = (taskNumber: number) => {
    router.push(`/test/${taskNumber}`);
    setTestData(undefined);
  }
  const goToNextTask = async () => {
    if(+router.query.id!.toString() + 1 > testData!.questions.length) {
      const checkRes = await fetch('http://localhost:3000/api/getAnswers');
      const { questions } = await checkRes.json() as {questions: Array<{valid: number}>};
      const resultsRes = await fetch('http://localhost:3000/api/getResults');
      const sendedAnswers = await resultsRes.json() as Array<{ questNumber: number, resNumber: number}>;
      const totalAns = questions.length;
      let currentAns = 0;
      for(let {questNumber, resNumber} of sendedAnswers) {
        if(questions[questNumber].valid === resNumber) {
          currentAns++;
        }
      }
      // alert(`Тест пройден! \n Ваши баллы ${currentAns}/${totalAns}`);
      // router.push('/');
      router.push('/resultPage/resultPage');
    } else {
      router.push(`/test/${+router.query.id!.toString() + 1}`)
      setTestData(undefined);
    }    
  }

  const onClickSubmitAnswer = async (testId: ObjectId, questNumber: number, resNumber: number) => {
    const res = await fetch('http://localhost:3000/api/sendResult', {
      method: "POST",
      body: JSON.stringify({
        testId,
        questNumber,
        resNumber,
      })
    });
    goToNextTask();
  }

  useMemo(() => {
    const getTestData = async () => {
      setIsLoading(true)
      const response = await fetch('http://localhost:3000/api/hello');
      const result = await response.json() as Array<Test>;
      setTestData(result[0]);
      setIsLoading(false)
    }

    getTestData();
  }, [router.query.id])

  if(!testData || isLoading) {
    return "Loading...";
  }

  const getLeftTime = ({ remainingTime }: { remainingTime: number }) => {
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60
  
    return `${minutes}:${seconds}`
  }

  const { timeLimit, questions, title, _id} = testData;
  const { options, timeLimit: currentAnswerTime, title: currentAnswerTitle } = questions[+(router.query.id as string) - 1];
 

  return (
    <div className={styles.main}>
      <SideMenu 
        answers={[1,2]}
        onClickTask={onClickOtherTask}
      />
      <div className={styles.mainPart}>
        <Header
          title={title}
          currentAnswer={+(router.query.id as string)}
          totalAnswers={questions.length}
          timeLeft={getLeftTime({remainingTime: timeLimit})}
        />
        <div className={styles.mainContainer}>
          <CountdownCircleTimer
            isPlaying
            duration={currentAnswerTime}
            onComplete={() => {
              alert('Вы не успели ответить на данный вопрос!');
              goToNextTask();
            }}
            colors='#00EAD9'
            trailColor="#FFFFFF"
            size={120}
            strokeWidth={2}
          >
            {getLeftTime}
          </CountdownCircleTimer>
          <TaskContainer 
            answers={options}
            title={currentAnswerTitle}
            onClickSkip={() => {}}
            onClickSubmit={(activeNumber) => onClickSubmitAnswer(_id, +(router.query.id as string) - 1, activeNumber)}
          />
        </div>
      </div>
    </div>
  )
}

// export async function getServerSideProps(context: any) {
//   const response = await fetch('http://localhost:3000/api/hello');
//   const result = await response.json() as Array<Test>;
//   return {
//     props: {
//       testData: result[0]
//     },
//   }
// }