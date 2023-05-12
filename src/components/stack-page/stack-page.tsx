import React, {ChangeEvent, useState} from "react";
import styles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { IStack, TStackNode } from "../../types/data";
import Stack from "../../utils/classes/stack";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {

  const [stack, setStack] = useState<IStack<TStackNode<string>>>(new Stack(20));
  const [value, setValue] = useState<string>("");
  const [refresh, setRefresh] = useState(1)

  const result = stack.store.map((item, index)=>{
    const head = index === stack.store.length - 1 ? "head" : ""
    return <Circle key={index} index={index} letter={item.value} state={item.status} head={head} />
  })


  const addToStack = ()=>{
    if(value === ""){
      return
    }
    const head = {value: value, status: ElementStates.Changing}
    stack.push(head);
    setTimeout(()=>{
      head.status = ElementStates.Default
      setRefresh(refresh + 1)
    }, SHORT_DELAY_IN_MS)
    setValue("")
  }

  const removeFromStack = ()=>{
    const head = stack.get();
    head!.status = ElementStates.Changing
    setRefresh(refresh + 1)
    setTimeout(()=>{
      stack.pop();
      setRefresh(refresh + 2)
    }, SHORT_DELAY_IN_MS)
  }

  const clearStack = () =>{
    setStack(new Stack(20))
  }

  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const isAddDisabled = value === "" || stack.size >= stack.maxLength ? true : false;

  const isRemoveAndClearDisabled = stack.store.length ? false : true;
  return (
    <SolutionLayout title="Стек">
     <div className={styles.content}>
        <div className={styles.controls}>
        <div className={styles.options}>
          <Input onChange={onChange} value={value} maxLength={4} isLimitText={true}/>
          <Button onClick={addToStack} text="Добавить" disabled={isAddDisabled}/>
          <Button onClick={removeFromStack} text="Удалить" disabled={isRemoveAndClearDisabled}/>
        </div>
        <div className={styles.clear}>
          <Button onClick={clearStack} text="Очистить" disabled={isRemoveAndClearDisabled}/>
        </div>
        </div>
        <div className={styles.result}>
          {result}
        </div>
      </div>
    </SolutionLayout>
  );
};
