import { AccessTypes } from '../../../data/AccessTypes';
import { DataAccess } from '../../../data/DataAccess';
import { DataTypes } from '../../../data/DataTypes';
import { InputManager } from '../../../io/InputManager';
import { OutputManager } from '../../../io/OutputManager';
import { NodeBase } from '../../NodeBase';

export class SquareRoot extends NodeBase {
  get displayName (): string {
    return '√x';
  }

  public registerInputs (manager: InputManager): void {
    manager.add('i', 'Input value', DataTypes.NUMBER, AccessTypes.ITEM);
  }

  public registerOutputs (manager: OutputManager): void {
    manager.add('o', 'Output square root of value', DataTypes.NUMBER, AccessTypes.ITEM);
  }

  public solve (access: DataAccess): void {
    const n = access.getData(0) as number;
    access.setData(0, Math.sqrt(n));
  }
}
