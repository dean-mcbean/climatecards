import { createContext, useContext, useRef, useState } from "react";
import { MoneyNotif, MoneyNotifProps } from "../../components/atoms/MoneyNotif";


export type VFXContextType = {
  createMoneyNotif: (amount: number, tileRef: React.RefObject<HTMLDivElement>) => void;
};

export const defaultVFXContextValues: VFXContextType = {
  createMoneyNotif: () => {}
};

// Create the VFXContext
export const VFXContext = createContext(defaultVFXContextValues);




// Create the VFXContextProvider component
export const VFXContextProvider = ({ children }: {children: React.ReactNode }) => {
  const vfxIndex = useRef(0)

  const [moneyNotifs, setMoneyNotifs] = useState<{[key: number | string]: MoneyNotifProps}>({});
  const createMoneyNotif = (amount: number, tileRef: React.RefObject<HTMLDivElement>) => {
    if (!tileRef.current) return;
    const rect = tileRef.current.getBoundingClientRect();
    const x = rect.x + rect.width / 2;
    const y = rect.y + rect.height / 2;

    const newMoneyNotif = {id: vfxIndex.current, amount, x, y, handleAnimationEnd: (id: string | number) => {
      setMoneyNotifs((prev) => {
        const newNotifs = {...prev};
        delete newNotifs[id];
        return newNotifs;
      });
    }};
    vfxIndex.current++;
    setMoneyNotifs((prev) => {
      const newNotifs = {...prev};
      newNotifs[newMoneyNotif.id] = newMoneyNotif;
      return newNotifs;
    });
  }

  const contextValue: VFXContextType = {
    createMoneyNotif
  };

  return (
    <VFXContext.Provider value={contextValue}>
      {children}
      {Object.keys(moneyNotifs).map((key) => {
        return <MoneyNotif key={key} {...moneyNotifs[key]} />
      })}
    </VFXContext.Provider>
  );
};


export const useVFXContext = () => {
  return useContext(VFXContext);
}