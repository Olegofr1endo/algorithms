import React, {ChangeEvent, useState} from "react";
import styles from "./queue-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { IQueue, IStack, TStackNode } from "../../types/data";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import Queue from "../../utils/classes/queue";

export const QueuePage: React.FC = () => {
  const [stack, setStack] = useState<IQueue<TStackNode<string>>>(new Queue(7));
  const [value, setValue] = useState<string>("");
  const [refresh, setRefresh] = useState(1)

  const result = stack.store.map((item, index)=>{
    if(!item){
      return <Circle key={index} letter="" state={ElementStates.Default} />
    }
    const head = stack.startIndex%stack.store.length === index ? "head" : "";
    const tail = (stack.endIndex-1)%stack.store.length === index ? "tail" : "";
    return <Circle key={index} index={index} letter={item.value} state={item.status} tailType="element" head={head} tail={tail}/>
  })


  const addToStack = ()=>{
    if(value === ""){
      return
    }
    const head = {value: value, status: ElementStates.Changing}
    stack.enqueue(head);
    setTimeout(()=>{
      head.status = ElementStates.Default
      setRefresh(refresh + 1)
    }, SHORT_DELAY_IN_MS)
    setValue("")
  }

  const removeFromStack = ()=>{
    const head = stack.get();
    if(!head){
      return
    }
    head!.status = ElementStates.Changing
    setRefresh(refresh + 1)
    setTimeout(()=>{
      stack.dequeue();
      setRefresh(refresh + 2)
    }, SHORT_DELAY_IN_MS)
  }

  const clearStack = () =>{
    stack.clear();
    setRefresh(refresh + 1)
  }

  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const isAddDisabled = value === "" || stack.size >= stack.length ? true : false;

  const isRemoveAndClearDisabled = stack.store.find(item=> item) ? false : true;
  return (
    <SolutionLayout title="Очереь">
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
