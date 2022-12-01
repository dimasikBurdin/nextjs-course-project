import React from "react";
import type { FC } from "react";
import cx from 'classnames';
import styles from './RadioButton.module.css';

type Props = {
    type: "radio" | 'checkbox';
    title: string;
    isDisabled?: boolean;
    isActive?: boolean;
    onClick: () => void;
}

export const RadioButton: FC<Props> = ({ title, isDisabled, type , isActive, onClick}) => {
    return <div
        onClick={onClick} 
        className={cx(styles.main, {
            [styles.isDisabled]: isDisabled,
            [styles.isActive]: isActive,
        })}
    >
        <div className={styles.icon}></div>
        <div className={styles.title}>{title}</div>
    </div>
}