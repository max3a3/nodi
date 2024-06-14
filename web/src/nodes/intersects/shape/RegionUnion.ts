
import clipper from 'clipper-lib';
import { AccessTypes } from '../../../data/AccessTypes';
import { DataAccess } from '../../../data/DataAccess';
import { DataTree } from '../../../data/DataTree';
import { DataTypes } from '../../../data/DataTypes';
import { InputManager } from '../../../io/InputManager';
import { OutputManager } from '../../../io/OutputManager';
import { NCurve } from '../../../math/geometry/curve/NCurve';
import { RegionCSGNode } from './RegionCSGNode';

export class RegionUnion extends RegionCSGNode {
  get displayName (): string {
    return 'Region Union';
  }

  public registerInputs (manager: InputManager): void {
    manager.add('c', 'Planar closed curves to union', DataTypes.CURVE, AccessTypes.LIST);
    manager.add('n', 'Non-polyline curve resolution', DataTypes.NUMBER, AccessTypes.ITEM).setDefault(new DataTree().add([64]));
  }

  public registerOutputs (manager: OutputManager): void {
    manager.add('R', 'Curve union result', DataTypes.CURVE, AccessTypes.LIST);
  }

  public solve (access: DataAccess): void {
    const curves = access.getDataList(0) as NCurve[];
    const resolution = access.getData(1) as number;

    if (!this.validatePlanarClosedCurves(curves)) {
      throw new Error('Non planar closed curve included in inputs');
    }

    const result = this.union(curves, resolution);
    access.setDataList(0, result);
  }

  private union (curves: NCurve[], resolution: number): NCurve[] {
    const region = this.getCurvePaths(curves, resolution);
    const clip = new clipper.Clipper();
    region.paths.forEach((path: any, i: number) => {
      if (i === 0) {
        clip.AddPaths([path], clipper.PolyType.ptSubject, true);
      } else {
        clip.AddPaths([path], clipper.PolyType.ptClip, true);
      }
    });
    const solution = new clipper.Paths();
    clip.Execute(clipper.ClipType.ctUnion, solution, clipper.PolyFillType.pftNonZero, clipper.PolyFillType.pftNonZero);
    return this.getSolutionPolylines(solution, region.plane);
  }
}
