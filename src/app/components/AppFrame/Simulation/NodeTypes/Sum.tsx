import { NodeBase, BlockType } from './index';
import type { Signal } from './Signal';

export class Sum extends NodeBase {
    sumSigns: Map<string, "+" | "-"> = new Map();

    constructor(id: string, x: number, y: number, displayName = "Sum", width = 50, height = 50) {
        super(id, displayName, x, y, BlockType.SUM, width, height);
    }

    execute(u: Signal[]): Signal {
        let tmp = 0;

        for (const sig of u) {
            const sign = this.sumSigns.get(sig.src.id);
            if (sign == "+") tmp += sig.y;
            else if (sign == "-") tmp -= sig.y;
        }

        return {
            y: tmp,
            t: u[0]?.t ?? 0,
            src: this
        };
    }

    setSign(nodeId: string, sign: "+" | "-") {
        this.sumSigns.set(nodeId, sign);
    }

    getSign() {
        return this.sumSigns;
    }

    static defaultWidth = 50;
    static defaultHeight = 50;
    style = 'bg-red-600';
}