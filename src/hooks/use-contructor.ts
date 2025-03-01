import { useRef } from "react";

export function useConstructor(callBack = () => { }) {
  const hasBeenCalled = useRef(false);
  if (hasBeenCalled.current)
    return;
  callBack();
  hasBeenCalled.current = true;
}