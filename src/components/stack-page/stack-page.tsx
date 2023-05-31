import React, {ChangeEvent, useMemo, useState} from "react";
import styles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import Stack from "../../utils/classes/stack";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {

  const [value, setValue] = useState<string>("");
  const [refresh, setRefresh] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false)
  const stack = useMemo(()=>{
   return new Stack(20)
  }, [])

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
    setIsAdding(true)
    setTimeout(()=>{
      head.status = ElementStates.Default
      setIsAdding(false)
    }, SHORT_DELAY_IN_MS)
    setValue("")
  }

  const removeFromStack = ()=>{
    const head = stack.get();
    head!.status = ElementStates.Changing
    setIsRemoving(true)
    setTimeout(()=>{
      stack.pop();
      setIsRemoving(false)
    }, SHORT_DELAY_IN_MS)
  }

  const clearStack = () =>{
    stack.clear()
    setRefresh(refresh+1)
  }

  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const isAddDisabled = value === "" || stack.size >= stack.maxLength || isAdding || isRemoving ? true : false;

  const isRemoveAndClearDisabled = stack.store.length === 0 || isAdding || isRemoving ? true : false;
  return (
    <SolutionLayout title="Стек">
     <div className={styles.content}>
        <div className={styles.controls}>
        <div className={styles.options}>
          <Input onChange={onChange} value={value} maxLength={4} isLimitText={true}/>
          <Button onClick={addToStack} text="Добавить" disabled={isAddDisabled} isLoader={isAdding}/>
          <Button onClick={removeFromStack} text="Удалить" disabled={isRemoveAndClearDisabled} isLoader={isRemoving}/>
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
