import React from "react";
import { usePopper } from "react-popper";

export function useMenu(offset?: number) {
  let [referenceElem, setReferenceElem] = React.useState();
  let [floatingElement, setFloatingElement] = React.useState();
  let { styles, attributes } = usePopper(referenceElem, floatingElement, {
    placement: "bottom-end",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, offset === undefined ? 12 : offset]
        }
      }
    ]
  });

  return {
    styles,
    attributes,
    setReferenceElem,
    setFloatingElement
  };
}




export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
  return balance
}

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex)
  return chainIdNum
}

export const formatAddress = (addr: string) => {
  const upperAfterLastTwo = addr.slice(0, 2) + addr.slice(2)
  return `${upperAfterLastTwo.substring(0, 5)}...${upperAfterLastTwo.substring(39)}`
}
