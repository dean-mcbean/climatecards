
class SVGPathBuilder {
  pathString: string;
  _fillColor: string;
  _strokeColor: string;
  _strokeWidth: number;
  _strokeLinecap: string;
  _strokeLinejoin: string;
  _strokeDasharray: string;
  _strokeDashoffset: string;
  _fillRule: string;
  
  constructor() {
    this.pathString = '';
    this._fillColor = '';
    this._strokeColor = '';
    this._strokeWidth = 0;
    this._strokeLinecap = '';
    this._strokeLinejoin = '';
    this._strokeDasharray = '';
    this._strokeDashoffset = '';
    this._fillRule = '';
  }

  // Add a Move To (M) command
  moveTo(x: number, y: number) {
    this.pathString += `M ${x} ${y} `;
    return this;
  }

  // Add a Line To (L) command
  lineTo(x: number, y: number) {
    this.pathString += `L ${x} ${y} `;
    return this;
  }

  // Add an Arc (A) command
  arc(rx: number, ry: number, xAxisRotation: number, largeArcFlag: number, sweepFlag: number, x: number, y: number) {
    this.pathString += `A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x} ${y} `;
    return this;
  }

  // Add a quadraticBezier
  quadraticBezier(x1: number, y1: number, x: number, y: number) {
    this.pathString += `Q ${x1} ${y1} ${x} ${y} `;
    return this;
  }

  // Add a cubicBezier
  cubicBezier(x1: number, y1: number, x2: number, y2: number, x: number, y: number) {
    this.pathString += `C ${x1} ${y1} ${x2} ${y2} ${x} ${y} `;
    return this;
  }

  // Add a close path command
  closePath() {
    this.pathString += `Z `;
    return this;
  }
  
  fillColor(color: string) {
    this._fillColor = color;
    return this;
  }

  strokeColor(color: string) {
    this._strokeColor = color;
    return this;
  }

  strokeWidth(width: number) {
    this._strokeWidth = width;
    return this;
  }

  strokeLinecap(linecap: string) {
    this._strokeLinecap = linecap;
    return this;
  }

  strokeLinejoin(linejoin: string) {
    this._strokeLinejoin = linejoin;
    return this;
  }

  strokeDasharray(dasharray: string) {
    this._strokeDasharray = dasharray;
    return this;
  }

  strokeDashoffset(dashoffset: string) {
    this._strokeDashoffset = dashoffset;
    return this;
  }

  fillRule(fillRule: string) {
    this._fillRule = fillRule;
    return this;
  }




  // Get the final SVG path string
  getPathString() {
    return this.pathString.trim();
  }

  // Get the final SVG string
  getSVGString() {
    return <path d={this.pathString} fill={this._fillColor} stroke={this._strokeColor} stroke-width={this._strokeWidth} stroke-linecap={this._strokeLinecap} stroke-linejoin={this._strokeLinejoin} stroke-dasharray={this._strokeDasharray} stroke-dashoffset={this._strokeDashoffset} fill-rule={this._fillRule} />;
  }
}

export function svgPathBuilder () {
  return new SVGPathBuilder();
}