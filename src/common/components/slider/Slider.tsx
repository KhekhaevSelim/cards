import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import style from "./Slider.module.css";
import { useAppDispatch, useDebounce } from "../../hooks";
import { packsActions } from "../../../features/packs/packs.slice";
import { useEffect } from "react";


const minDistance = 1;
type MySliderPropsType = {
  min : number
  max : number
}
export default function MySlider(props : MySliderPropsType) {
  // const [value1, setValue1] = React.useState<number[]>([props.min, props.max ]);
const dispatch = useAppDispatch()
  // const debouncedValue = useDebounce<number | number[]>([props.min,props.max], 500)
  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      dispatch(packsActions.changeSliderMin( { min : Math.min(newValue[0], props.max - minDistance)}));
    } else {
      dispatch(packsActions.changeSliderMax( { max : Math.max(newValue[1], props.min + minDistance)}))
      // setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };
  // useEffect(() => {
  // }, [debouncedValue])


  return (
    <Box sx={{ width: 300 }} className={style.box}>
      <span className={style.packsCount}>{props.min}</span>
      <Slider
        value={[props.min, props.max ]}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        disableSwap
        max={110}
      />
      <span className={style.packsCount}>{props.max}</span>
    </Box>
  );
}

