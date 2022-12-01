import React from "react";
import type { FC } from "react";
import styles from './Header.module.css';
import { InfoContainer } from "./components/InfoContainer";

type Props = {
    title: string;
    currentAnswer: number;
    totalAnswers: number;
    timeLeft: string;
}

export const Header: FC<Props> = ({ title, currentAnswer, timeLeft, totalAnswers }) => {
    return <div className={styles.main}>
        <div className={styles.infoPart}>
            <InfoContainer type="answers" answers={{current: currentAnswer, total: totalAnswers}}/>
            <InfoContainer type="time" time={timeLeft}/>
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.logo}></div>
    </div>
}