// import { NodeBase } from "./NodeBase";
import { NodeConstructorType } from "../NodeConstructorType";
import { NodeDictionary } from "./NodeDictionary";

const getNodeConstructorName = function (constructor: NodeConstructorType): string | undefined {
  const entries = Object.values(NodeDictionary);
  const found = entries.find(e => {
    return e.entity === constructor;
  });
  return found?.name;
};

const getNodeConstructorNameOfInstance = function (instance: Object): string | undefined {
  return getNodeConstructorName(instance.constructor as NodeConstructorType);
};

export {
  getNodeConstructorName,
  getNodeConstructorNameOfInstance,
};
