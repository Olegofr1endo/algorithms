import React, {ChangeEvent, FormEvent, FormEventHandler, useEffect, useState} from "react";
import styles from "./string.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TValueAndStatus } from "../../types/data";
import { cleanup } from "@testing-library/react";


type TStateTtype = {
  string: string,
  result: TValueAndStatus<string>[],
  inProgress: boolean,
  visible: boolean
}
const initState = {string: "", result:[], inProgress: false, visible: false}

export const StringComponent: React.FC = () => {
  const [settings, setSettings] = useState<TStateTtype>(initState);

  const result = settings.result.map((item, index)=>{
    return <Circle key={index} state={item.status} letter={item.value} />
  });


  useEffect(()=>{
    if(settings.inProgress){
      const res = settings.result
      const {length} = res;
      let firtsIndex = 0
      let lastIndex = length - 1;
      let buf = res[lastIndex];
      setTimeout(()=>{
        if(res.length === 1){
          res[0].status = ElementStates.Modified
          setSettings({...initState,result:res, visible: true})
          return
        }
        res[firtsIndex].status = ElementStates.Changing
        res[lastIndex].status = ElementStates.Changing
        setSettings({...settings, result: res})
        const interval = setInterval(()=>{
          if(firtsIndex < lastIndex){
          buf = res[firtsIndex];
          res[firtsIndex] = res[lastIndex]
          res[lastIndex] = buf;
          res[firtsIndex].status = ElementStates.Modified;
          res[lastIndex].status = ElementStates.Modified;
          if(res[firtsIndex + 1].status !== ElementStates.Modified){
            res[firtsIndex + 1].status = ElementStates.Changing;
          }
          if(res[lastIndex - 1].status !== ElementStates.Modified){
            res[lastIndex - 1].status = ElementStates.Changing;
          }
          firtsIndex++;
          lastIndex--;
          setSettings({...settings, result:res})
          if(firtsIndex >= lastIndex){
            res[firtsIndex].status = ElementStates.Modified
            clearInterval(interval)
            setSettings({...initState,result:res, visible: true})
          }
          }
        }, DELAY_IN_MS)
        return ()=>{
          cleanup()
        }
      }, DELAY_IN_MS)
    }
  }, [settings.inProgress])

  const onChange = (e:ChangeEvent<HTMLInputElement>) =>{
    setSettings({...settings, string: e.target.value})
  }

  const onClick = () => {
    setSettings({...settings, result: settings.string.split("").map(item=>({value: item, status:ElementStates.Default})), inProgress: true, visible: true})
  }

  const buttonStyle = {
    disabled: settings.string === "" ? true : false
  }


  return (
    <SolutionLayout title="Строка">
      <div className={styles.content}>
        <div className={styles.controls}>
        <Input value={settings.inProgress ? "" : settings.string} onChange={onChange} placeholder="Введите текст" maxLength={11} isLimitText={true}/>
        <Button type="button" text="Развернуть" onClick={onClick} isLoader={settings.inProgress} {...buttonStyle} />
        </div>
        <div className={styles.result}>
          {settings.visible ? result : null}
        </div>
      </div>
    </SolutionLayout>
  );
};
