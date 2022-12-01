import { useRouter } from 'next/router';
import { Header } from '../components/Header/Header';
import { SideMenu } from '../components/SideMenu/SideMenu';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();

  const onClickOtherTask = (taskNumber: number) => {
    router.push(`/test/${taskNumber}`);
  }
  return (
    <div className={styles.main}>
      <SideMenu 
        answers={[1,2]}
        onClickTask={onClickOtherTask}
      />
      <div className={styles.mainPart}>
        <Header 
          title='Выберите вопрос'
          currentAnswer={0}
          timeLeft="0"
          totalAnswers={0}
        />
      </div>
    </div>
  )
}
