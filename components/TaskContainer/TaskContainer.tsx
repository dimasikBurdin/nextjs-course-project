import React, { useState } from "react";
import type { FC } from "react";
import styles from './TaskContainer.module.css';
import { Button } from "../Button/Button";
import type { Option } from "../../types/answer";
import { RadioButton } from "../RadioButton/RadioButton";

type Props = {
    title: string;
    answers: Array<Option>;
    onClickSkip: () => void;
    onClickSubmit: (answerNumber: number) => void;
}

export const TaskContainer: FC<Props> = ({ answers, onClickSkip, onClickSubmit, title }) => {
    const [activeRadioButton, setActiveRadioButton] = useState(-1);

    const submitTask = () => {
        onClickSubmit(activeRadioButton);
        // if(answers[activeRadioButton].valid) {
        //     onClickSubmit();
        // } else {
        //     alert("Неверный ответ")
        //      onClickSubmit();
        // }
    }

    const onClick = (activeNumber: number) => {
        setActiveRadioButton(activeNumber);
    }
    return <div className={styles.main}>
       <div className={styles.title}>{title}</div>
       <div className={styles.answers}>
            {answers?.map(({ title }, index) => {
                return <RadioButton 
                    key={title + index} 
                    title={title} 
                    type="radio" 
                    isActive={index === activeRadioButton}
                    onClick={() => onClick(index)}    
                />
            })}
       </div>
       <div className={styles.buttons}>
            <Button title="Пропустить" onClick={onClickSkip}/>
            <Button title="Ответить" onClick={submitTask} isDisabled={activeRadioButton === -1}/>
       </div>
    </div>
}