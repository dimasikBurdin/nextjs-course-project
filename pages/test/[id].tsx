import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
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
  const goToNextTask = () => {
    if(+router.query.id!.toString() + 1 > testData!.questions.length) {
      alert('Тест пройден!');
      router.push('/');
    } else {
      router.push(`/test/${+router.query.id!.toString() + 1}`)
      setTestData(undefined);
    }    
  }

  useEffect(() => {
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

  const { timeLimit, questions, title } = testData
  const {options, timeLimit: currentAnswerTime, title: currentAnswerTitle} =questions[+(router.query.id as string) - 1];

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
            onClickSubmit={goToNextTask}
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