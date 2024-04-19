import JPGroup from "./JPGroup";
import JPShape from "./JPShape";

class JPAnimationGroup {
  children: (JPShape | JPGroup)[] = [];
  relativeX: number = 0;
  relativeY: number = 0;
  parentX: number = 0;
  parentY: number = 0;
  frames: number = 0;

  constructor(frames: number) {
    this.frames = frames;
  }

  get x() {
    return this.parentX + this.relativeX;
  }

  get y() {
    return this.parentY + this.relativeY;
  }

  setPosition(x: number, y: number) {
    this.relativeX = x;
    this.relativeY = y;
    for (let child of this.children) {
      child.setParentPosition(this.x, this.y);
    }
  }

  setParentPosition(x: number, y: number) {
    this.parentX = x;
    this.parentY = y;
    for (let child of this.children) {
      child.setParentPosition(this.x, this.y);
    }
  }

  addChild(child: JPShape | JPGroup) {
    child.setParentFrames(this.frames);
    child.setParentPosition(this.x, this.y);
    this.children.push(child);
  }
  
  draw(ctx: CanvasRenderingContext2D, frame: number) {
    this.children.forEach(child => {
      child.draw(ctx, frame);
    });
  }
}

export default JPAnimationGroup;