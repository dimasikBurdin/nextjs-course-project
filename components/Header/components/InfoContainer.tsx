import React from "react";
import type { FC } from "react";
import cx from 'classnames';
import styles from './InfoContainer.module.css';

type Props = {
    type: 'answers' | 'time';
    answers?: {
        total: number,
        current: number,
    }
    time?: string;
}

export const InfoContainer: FC<Props> = ({ type, answers, time }) => {
    return <div className={styles.main}>
        <div className={cx(styles.icon, {
            [styles.answersIcon]: type === 'answers',
            [styles.timeIcon]: type === 'time',
        })}></div>
        {type === 'answers' && (
            <div className={styles.answersContainer}>
                <div>{answers?.current || '-'}</div>
                <div>/</div>
                <div>{answers?.total || '-'}</div>
            </div>
        )}
        {type === 'time' && (
            <div>{time}</div>
        )}
    </div>
}