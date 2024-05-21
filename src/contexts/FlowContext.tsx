
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { FlowType } from "@/interfaces/FlowTypes";
import { FlowContextType } from "@/interfaces/FlowContext";

const defaultContextValue:FlowContextType = {
    nodeValues: {},
    addOrUpdateNodeValues: () => {},
    setNodeValues: () => {},
    editNodeMode: false,
    setEditNodeMode: () => {},
    editNodeId: '',
    setEditNodeId: () => {}
}

const FlowContext = createContext<FlowContextType>(defaultContextValue);

export const FlowContextProvider:React.FC<{ children: ReactNode }> = ({children}) => {

    const [nodeValues, setNodeValues] = useState<FlowType>({});
    const [editNodeMode, setEditNodeMode] = useState<boolean>(false);
    const [editNodeId, setEditNodeId]  = useState<string>('');

    const addOrUpdateNodeValues = (id:string, value:string) => {
        setNodeValues({...nodeValues, [id]: {value}});
    }

    useEffect(() => {
        if (window !== undefined) {
            const savedNodeValues = JSON.parse(localStorage.getItem('nodeValues') ?? '{}');
            setNodeValues(savedNodeValues);
        }
    }, [])



    return <FlowContext.Provider value={{nodeValues, addOrUpdateNodeValues, setNodeValues, editNodeMode, setEditNodeMode, editNodeId, setEditNodeId }}>
            {children}
        </FlowContext.Provider>
}

export const useFlowContext = () => {
    return useContext(FlowContext);
}

