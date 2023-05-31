import React, {useState, useEffect, ChangeEvent} from "react";
import styles from "./fibonacci-page.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { getFibonacciNumbers } from "../../utils/utils";
import { cleanup } from "@testing-library/react";

type TStateTtype = {
  string: string,
  fib: number[],
  result: number[],
  inProgress: boolean,
  visible: boolean
}
const initState = {string: "", fib: [], result:[], inProgress: false, visible: false}

export const FibonacciPage: React.FC = () => {

  const [settings, setSettings] = useState<TStateTtype>(initState);
  const result = settings.result.map((item, index)=><Circle key={index} letter={item.toString()} index={index}/>)

  useEffect(()=>{
    if(settings.inProgress){
      const res: number[] = []
      const interval = setInterval(()=>{
        if(res.length < settings.fib.length){
          res.push(settings.fib[res.length])
          setSettings({...settings, result: res})
        } else {
          setSettings({...initState, result: res, visible: true})
          clearInterval(interval)
        }
      }, SHORT_DELAY_IN_MS)
      return ()=>{
        cleanup()
      }
    }
  }, [settings.inProgress])

  const onChange = (e:ChangeEvent<HTMLInputElement>) =>{
    setSettings({...settings, string: e.target.value})
  }

  const onClick = () => {
    setSettings({...settings, fib: getFibonacciNumbers(+settings.string), result:[], inProgress: true, visible: true})
  }

  const buttonStyle = {
    disabled: (settings.string === "" || Number(settings.string) < 1 || Number(settings.string) > 19) ? true : false
  }


  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <div className={styles.content}>
        <div className={styles.controls}>
        <Input value={settings.inProgress ? "" : settings.string} onChange={onChange} placeholder="Введите текст" type="number" max={19} isLimitText={true}/>
        <Button linkedList="small" type="button" text="Развернуть" onClick={onClick} isLoader={settings.inProgress} {...buttonStyle} />
        </div>
        <div className={styles.result}>
        {settings.visible ? result : null}
        </div>
      </div>
    </SolutionLayout>
  );
};
