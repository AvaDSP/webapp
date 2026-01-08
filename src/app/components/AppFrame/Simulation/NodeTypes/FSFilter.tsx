import { NodeBase, BlockType } from './index';
import { Signal } from './Signal';

export class FSFilter extends NodeBase {
  y_buffer: number[];
  x_buffer: number[];
  den: number[] = [1];
  num: number[] = [1];
  static defaultWidth = 100;
  static defaultHeight = 50;
  style = 'bg-teal-600';

  constructor(
    id: string,
    x: number,
    y: number,
    den: number[] = [1],
    num: number[] = [1],
    displayName = "Filter",
    width = FSFilter.defaultWidth,
    height = FSFilter.defaultHeight
  ) {
    super(id, displayName, x, y, BlockType.FSFILTER, width, height);
    this.den = den;
    this.num = num;

    this.init();
  }

  init() {
    this.y_buffer = new Array(this.den.length - 1).fill(0);
    this.x_buffer = new Array(this.num.length).fill(0);
  }

  execute(u: Signal[]): Signal {

    for (let i = this.x_buffer.length - 1; i > 0; i--) {
      this.x_buffer[i] = this.x_buffer[i - 1];
    }
    this.x_buffer[0] = u[0].y;


    let x_sum = 0;
    for (let i = 0; i < this.num.length; i++) {
      x_sum += this.num[i] * this.x_buffer[i];
    }


    let y_sum = 0;
    for (let i = 1; i < this.den.length; i++) {
      y_sum += this.den[i] * this.y_buffer[i - 1];
    }

    const output = x_sum - y_sum;

    // Shift buffer
    for (let i = this.y_buffer.length - 1; i > 0; i--) {
      this.y_buffer[i] = this.y_buffer[i - 1];
    }
    if (this.y_buffer.length > 0) this.y_buffer[0] = output; // Check den's length is at least 1 (filter is not pure FIR)
    return {y: output, t: u[0].t, src: this};
  }
}
