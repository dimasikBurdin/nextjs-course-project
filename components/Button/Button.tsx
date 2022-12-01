import React from "react";
import type { FC } from "react";
import cx from 'classnames';
import styles from './Button.module.css';

type Props = {
   title: string;
   isDisabled?: boolean;
   onClick: () => void;
}

export const Button: FC<Props> = ({ title, isDisabled, onClick }) => {
    return <div onClick={onClick} className={cx(styles.main, {
        [styles.isDisabled]: isDisabled
    })}>{title}</div>
}