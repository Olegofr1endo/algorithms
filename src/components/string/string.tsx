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
import { reverseString } from "../../utils/utils";


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

  const reverseCallback = (arr:TValueAndStatus<string>[])=>{
    setSettings({...settings, result: arr})
  }


  useEffect(()=>{
    if(settings.inProgress){
      reverseString(settings.result, true, reverseCallback).then((res)=>{
        setSettings({...settings, result: res, inProgress: false, string: ""})
      })
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
