
import { AccessTypes } from '../../../data/AccessTypes';
import { DataAccess } from '../../../data/DataAccess';
import { DataTypes } from '../../../data/DataTypes';
import { InputManager } from '../../../io/InputManager';
import { OutputManager } from '../../../io/OutputManager';
import { NodeBase } from '../../NodeBase';

export class FlipMatrix extends NodeBase {
  public get displayName (): string {
    return 'Flip';
  }

  public registerInputs (manager: InputManager): void {
    manager.add('d', 'Data tree to flip', DataTypes.ANY, AccessTypes.TREE);
  }

  public registerOutputs (manager: OutputManager): void {
    manager.add('R', 'Flatten data tree', DataTypes.ANY, AccessTypes.TREE);
  }

  public solve (access: DataAccess): void {
    const tree = access.getDataTree(0);
    access.setDataTree(0, tree.flip());
  }
}
