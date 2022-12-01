import React from "react";
import type { FC } from "react";
import { useRouter } from "next/router";
import styles from './SideMenu.module.css';

type Props = {
    answers: Array<number>;
    onClickTask: (taskNumber: number) => void;
}

export const SideMenu: FC<Props> = ({ answers, onClickTask }) => {
    const router = useRouter();
    const routeToHome = () => {
        router.push(`/`);
    }

    return <div className={styles.main}>
        <div className={styles.backIcon} onClick={routeToHome}></div>
        <div className={styles.answers}>
            {answers.map((value, index) => {
                return <div key={value + index} >
                    <div 
                        className={styles.answerCell}
                        onClick={() => onClickTask(value)}
                    >{value}</div>
                    <div className={styles.divideLine}></div>
                </div>
            })}
        </div>
    </div>
}