import React, {ChangeEvent, useMemo, useState} from "react";
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

  const [value, setValue] = useState<string>("");
  const [refresh, setRefresh] = useState(1)
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const queue = useMemo(()=> new Queue(7), [])

  const result = queue.store.map((item, index)=>{
    if(!item){
      return <Circle key={index} letter="" state={ElementStates.Default} />
    }
    const head = queue.startIndex%queue.store.length === index ? "head" : "";
    const tail = (queue.endIndex-1)%queue.store.length === index ? "tail" : "";
    return <Circle key={index} index={index} letter={item.value} state={item.status} tailType="element" head={head} tail={tail}/>
  })


  const addToStack = ()=>{
    if(value === ""){
      return
    }
    const head = {value: value, status: ElementStates.Changing}
    setIsAdding(true)
    queue.enqueue(head);
    setTimeout(()=>{
      head.status = ElementStates.Default
      setIsAdding(false)
    }, SHORT_DELAY_IN_MS)
    setValue("")
  }

  const removeFromStack = ()=>{
    const head = queue.get();
    if(!head){
      return
    }
    head!.status = ElementStates.Changing
    setIsRemoving(true)
    setTimeout(()=>{
      queue.dequeue();
      setIsRemoving(false)
    }, SHORT_DELAY_IN_MS)
  }

  const clearStack = () =>{
    queue.clear();
    setRefresh(refresh + 1)
  }

  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const isAddDisabled = value === "" || queue.size >= queue.length || isAdding || isRemoving ? true : false;

  const isRemoveAndClearDisabled = !queue.store.find(item=> item) || isAdding || isRemoving ? true : false;
  return (
    <SolutionLayout title="Очередь">
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
