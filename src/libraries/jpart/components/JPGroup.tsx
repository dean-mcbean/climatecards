import JPShape from "./JPShape";

class JPGroup {
  children: (JPShape | JPGroup)[] = [];
  relativeX: number = 0;
  relativeY: number = 0;
  parentX: number = 0;
  parentY: number = 0;
  parentFrames: number = 0;

  get x() {
    return this.parentX + this.relativeX;
  }

  get y() {
    return this.parentY + this.relativeY;
  }

  get frames(): number {
    return this.parentFrames;
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

  setParentFrames(frames: number) {
    this.parentFrames = frames;
    for (let child of this.children) {
      child.setParentFrames(frames);
    }
  }

  addChild(child: JPShape | JPGroup) {
    child.setParentPosition(this.x, this.y);
    child.setParentFrames(this.frames);
    this.children.push(child);
  }
  
  draw(ctx: CanvasRenderingContext2D, frame: number) {
    this.children.forEach(child => {
      child.draw(ctx, frame);
    });
  }
}

export default JPGroup;