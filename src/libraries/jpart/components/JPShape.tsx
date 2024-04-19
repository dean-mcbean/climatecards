//TODO add animations to points
type PathPointAnimation = {
  type: 'linear' | 'sine';
  start: number;
  end: number;
  repeats?: number;
  alternate?: boolean;
  attribute: 'x' | 'y' | 'controlPoint1.x' | 'controlPoint2.x' | 'controlPoint1.y' | 'controlPoint2.y' | 'radius';
};

type PathPoint = {
  index: number;
  x: number;
  y: number;
  type: 'sharp' | 'round' | 'bezier';
  radius?: number;
  controlPoint1?: {x: number, y: number};
  controlPoint2?: {x: number, y: number};
  animations?: PathPointAnimation[];
  [key: string]: any;
};

const pathPointAnimatableAttributes = ['x', 'y', 'controlPoint1.x', 'controlPoint2.x', 'controlPoint1.y', 'controlPoint2.y', 'radius'];

type JPShapeStyle = {
  fill: string;
  stroke: string;
  strokeWidth: number;
  strokeDashArray?: string;
  strokeDashOffset?: string;
  strokeLineCap?: string;
  strokeLineJoin?: string;
  strokeMiterLimit?: string;
  strokeOpacity?: string;
  fillOpacity?: string;
};

class JPShape {
  path: PathPoint[] = [];
  animatedPath: PathPoint[][] = [];
  frames: number = 0;
  parentX: number = 0;
  parentY: number = 0;

  style: JPShapeStyle = {
    fill: 'transparent',
    stroke: 'black',
    strokeWidth: 1,
  };

  constructor({style} : {style?: Partial<JPShapeStyle>}) {
    this.path = [];
    this.style = {...this.style, ...style};
  }

  setParentPosition(x: number, y: number) {
    this.parentX = x;
    this.parentY = y;
    this.updateAnimatedPath();
  }

  setParentFrames(frames: number) {
    this.frames = frames;
    this.updateAnimatedPath();
  }

  setPoint(pathPoint: PathPoint) {
    this.path[pathPoint.index] = pathPoint;
    this.updateAnimatedPath();
  }

  updateAnimatedPath() {

    const processPath = (points: PathPoint[]) => {
      return points.map(point => {
        point.x = point.x + this.parentX;
        point.y = point.y + this.parentY;
        if (point.controlPoint1) {
          point.controlPoint1 = {
            x: point.controlPoint1.x + this.parentX,
            y: point.controlPoint1.y + this.parentY
          }
        }
        if (point.controlPoint2) {
          point.controlPoint2 = {
            x: point.controlPoint2.x + this.parentX,
            y: point.controlPoint2.y + this.parentY
          }
        }
        return point;
      })
    }
    
    if (this.frames < 2) {
      this.animatedPath = [processPath(this.path)];
      return;
    }

    this.animatedPath = [];
    for (let i = 0; i < this.frames; i++) {
      const frame: PathPoint[] = [];
      for (let pointOrNull of this.path) {
        if (pointOrNull !== null) {
          let point = pointOrNull as PathPoint;
          frame[point.index] = {...point};
          if (point.animations) {
            point.animations.forEach(animation => {
              const attribute_keys = animation.attribute.split('.');
              const attribute_value: number | undefined = attribute_keys.reduce((acc, key) => {
                return acc ? acc[key] : undefined;
              }, point) as unknown as number | undefined;
              if (attribute_value === undefined || !pathPointAnimatableAttributes.includes(animation.attribute)) return;
              const anim_value = this.interpolate(animation, i, attribute_value);

              //frame[point.index][animation.attribute] = this.interpolate(animation, i, attribute_value);
              // recursively set the attribute value
              let current_point = frame[point.index];
              let key_index = 0;
              while (key_index < attribute_keys.length - 1) {
                const key = attribute_keys[key_index];
                current_point[key] = {...current_point[key]};
                current_point = current_point[key];
                key_index++;
              }
              current_point[attribute_keys[key_index]] = anim_value;
            });
          }
        }
      }
      this.animatedPath.push(processPath(frame));
    }
  }

  interpolate(animation: PathPointAnimation, frame: number, start_value: number) {
    // we don't use the interpolate function here, we just redefine the same calculations
    const delta = animation.end - animation.start;
    const animation_position = frame / this.frames;
    if (animation.type === 'linear') {
      return start_value + animation.start + delta * animation_position;
    } else if (animation.type === 'sine') {
      return start_value + animation.start + Math.sin(animation_position * Math.PI * 2) * delta / 2 + delta / 2;
    }
    return 0;
  }

  draw(ctx: CanvasRenderingContext2D, frame: number) {
    if (!this.path.length) return;

    ctx.beginPath();

    const drawPoint = (lastPoint: PathPoint, point: PathPoint, nextPoint: PathPoint) => {
      if (point.type === 'sharp') {
        ctx.lineTo(point.x, point.y);
      } else if (point.type === 'round') {
        ctx.arcTo(point.x, point.y, nextPoint.x, nextPoint.y, point.radius !== undefined ? point.radius : 10);
      } else if (point.type === 'bezier' && point.controlPoint1 && point.controlPoint2) {
        ctx.bezierCurveTo(point.controlPoint1.x, point.controlPoint1.y, point.controlPoint2.x, point.controlPoint2.y, point.x, point.y);
      }
    }
    
    let renderedPath = this.path;
    if (this.frames > 1) {
      renderedPath = this.animatedPath[frame % this.frames];
    }
    let lastPoint: PathPoint = renderedPath[this.path.length - 1];
    ctx.moveTo(lastPoint.x, lastPoint.y);
    for (let i = 0; i < renderedPath.length; i++) {
      const point = renderedPath[i];
      if (point) {
        const nextPoint = i + 1 < renderedPath.length ? renderedPath[i + 1] : renderedPath[0];
        if (lastPoint && nextPoint) {
          drawPoint(lastPoint, point, nextPoint);
        }
        lastPoint = point;
      }
    }

    ctx.closePath();
    ctx.fillStyle = this.style.fill;
    ctx.fill();
    ctx.strokeStyle = this.style.stroke;
    ctx.lineWidth = this.style.strokeWidth;
    ctx.stroke();
  }
}

export default JPShape;