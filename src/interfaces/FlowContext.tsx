import { FlowType } from "./FlowTypes";

interface FlowContextType {
    nodeValues: FlowType,
    addOrUpdateNodeValues: (id:string, value:string) => void,
    setNodeValues: (value:FlowType) => void,
    editNodeMode: boolean,
    setEditNodeMode: (value:boolean) => void,
    editNodeId: string,
    setEditNodeId: (value:string) => void
};

export type{FlowContextType};