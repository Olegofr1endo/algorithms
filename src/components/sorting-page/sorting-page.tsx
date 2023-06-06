import React, {ChangeEvent, useEffect, useState} from "react";
import styles from "./sorting-page.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { bubbleSort, selectionSort, randomArr } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { TValueAndStatus } from "../../types/data";
import { cleanup } from "@testing-library/react";

type TState = {
  sortDirection: Direction | null,
  result: TValueAndStatus<number>[],
  radio: string,
  onSort: boolean
}

export const SortingPage: React.FC = () => {

  const [settings, setSettings] = useState<TState>({
    sortDirection: null,
    result: [],
    radio: "",
    onSort: false
  })

  useEffect(()=>{
    genNewArr()
  }, []);

  const sortCallback = (arr: TValueAndStatus<number>[]) =>{
    setSettings({...settings, result: arr})
  }

  useEffect(()=>{
    if(settings.onSort && settings.sortDirection){
      if(settings.radio === "selection"){
        selectionSort([...settings.result], settings.sortDirection, true, sortCallback).then(res=>{
          setSettings({...settings, result: res, onSort: false, sortDirection: null})
        })
      } else {
        bubbleSort([...settings.result], settings.result.length ,0 ,settings.sortDirection, true, sortCallback).then(res=>{
          setSettings({...settings, result: res, onSort: false, sortDirection: null})
        })
      }
    }
    return ()=>{
      cleanup()
    }
  }, [settings.onSort])
  
  const result = settings.result.map((item, index) =>{
    return <Column key={index} state={item.status} index={item.value} />
  })

  const genNewArr = () => {
    setSettings({...settings, result: randomArr(3, 17, 100).map(item=>({value: +item, status:ElementStates.Default}))})
  }

  const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSettings({...settings, radio: e.target.value})
  }

  const onAscending = () => {
    setSettings({...settings, sortDirection: Direction.Ascending, result: settings.result.map(item=>({value: item.value, status:ElementStates.Default})), onSort: true})
  }

  const onDescending = () => {
    setSettings({...settings, sortDirection: Direction.Descending,result: settings.result.map(item=>({value: item.value, status:ElementStates.Default})), onSort: true})
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.content}>
        <div className={styles.controls}>
          <div className={styles.checkboxes}>
            <RadioInput checked={settings.radio === "selection"} onChange={onRadioChange} value="selection" label="Выбор"/><RadioInput checked={settings.radio === "bubble"} onChange={onRadioChange} value="bubble" label="Пузырёк"/>
          </div>
          <div className={styles.buttons}>
            <div className={styles.sortButtons}>
            <Button isLoader={settings.sortDirection === Direction.Ascending} sorting={Direction.Ascending} onClick={onAscending} linkedList="big" text="По возрастанию" disabled={settings.onSort || !settings.radio}/>
            <Button isLoader={settings.sortDirection === Direction.Descending} sorting={Direction.Descending} onClick={onDescending} linkedList="big" text="По убыванию" disabled={settings.onSort || !settings.radio}/>
            </div>
            <Button onClick={genNewArr} linkedList="big" text="Новый массив" disabled={settings.onSort}/>
          </div>
        </div>
        <div className={styles.result}>
          {result}
        </div>
      </div>
    </SolutionLayout>
  );
};
