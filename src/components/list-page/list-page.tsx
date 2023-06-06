import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./list-page.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import LinkedList from "../../utils/classes/linked-list";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { addListElement, animateAddition, animateDelition, randomArr, removeListElement } from "../../utils/utils";
import { TListState } from "../../types/data";
import { ListActive } from "../../types/list-active";


const initialState:TListState<string> = {
  value: "",
  byIndexValue: "",
  result: [],
  active: null
}

export const ListPage: React.FC = () => {
  const [state, setState] = useState<TListState<string>>(initialState)
  const [linkedList] = useState(new LinkedList(9, randomArr(3,6,9999)))
  const result = state.result.map((item, index)=>{
    const head = index === 0 ? "head" : ""
    const tail = index === state.result.length - 1 ? "tail" : ""
    return <React.Fragment key={index}>
    <Circle tailType={item.tail ? "element" : "string"} index={index} letter={item.value} head={item.head ? item.head : head} tail={item.tail ? item.tail : tail} state={item.state} />
    {index !== state.result.length - 1 &&<ArrowIcon />}
    </React.Fragment>
  })

  useEffect(()=>{
    setState({...state, result: linkedList.toArray()})
  }, [])

  

  const onChange = (e:ChangeEvent<HTMLInputElement>) =>{
    setState({...state, value:e.target.value})
  }

  const onIndexChange = (e:ChangeEvent<HTMLInputElement>) =>{
    setState({...state, byIndexValue:e.target.value})
  }

  const addToHead = () => {
    addListElement({...state, value: "", active: ListActive.AddH}, setState, linkedList, state.result, state.value , 0)
  }

  const addToTail = () => {
    addListElement({...state, value: "", active: ListActive.AddT}, setState, linkedList, state.result , state.value, state.result.length)
  }

  const deleteTail = () => {
    removeListElement({...state, active: ListActive.RemoveT}, setState, linkedList, state.result, state.result.length - 1)
  }

  const deleteHead = () => {
    removeListElement({...state, active: ListActive.RemoveH}, setState, linkedList, state.result, 0)
  }
  
  const deleteByindex = () => {
    animateDelition({...state, byIndexValue: "", active: ListActive.RemoveI}, setState, linkedList, Number(state.byIndexValue))
  }

  const addByIndex = () => {
    animateAddition({...state, byIndexValue:"", value:"", active: ListActive.AddI}, setState, linkedList, Number(state.byIndexValue), state.value)
  }

  const isAddDisabled = state.value === "" || !!state.active || state.result.length >= linkedList.maxSize;

  const isDeleteDisabled = state.result.length === 0 || !!state.active

  const isDeleteByIndexDisabled = state.result.length === 0 || Number(state.byIndexValue) >= state.result.length || Number(state.byIndexValue) < 0 || state.byIndexValue === "" || !!state.active;

  const isAddByIndexDisabled = Number(state.byIndexValue) > state.result.length  || Number(state.byIndexValue) < 0 || state.byIndexValue === "" || state.value === "" || !!state.active || state.result.length >= linkedList.maxSize;


  return (
    <SolutionLayout title="Связный список">
      <div className={styles.content}>
        <div className={styles.controls}>
          <Input value={state.value} onChange={onChange} maxLength={4} isLimitText={true} placeholder="Введите значение"/>
          <Button onClick={addToHead} text="Добавить в head" disabled={isAddDisabled} isLoader={state.active === ListActive.AddH}/>
          <Button onClick={addToTail} text="Добавить в tail" disabled={isAddDisabled} isLoader={state.active === ListActive.AddT}/>
          <Button onClick={deleteHead} text="Удалить из head" disabled={isDeleteDisabled} isLoader={state.active === ListActive.RemoveH}/>
          <Button onClick={deleteTail} text="Удалить из tail" disabled={isDeleteDisabled} isLoader={state.active === ListActive.RemoveT}/>
          <Input value={state.byIndexValue} onChange={onIndexChange} type="number" placeholder="Введите индекс" />
          <Button onClick={addByIndex} text="Добавить по индексу" extraClass={styles.columns24} disabled={isAddByIndexDisabled} isLoader={state.active === ListActive.AddI}/>
          <Button onClick={deleteByindex} text="Удалить по индексу" extraClass={styles.columns46} disabled={isDeleteByIndexDisabled} isLoader={state.active === ListActive.RemoveI}/>
        </div>
        <div className={styles.result}>
          {result}
        </div>
      </div>
    </SolutionLayout>
  );
};
