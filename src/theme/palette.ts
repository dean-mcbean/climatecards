import { css } from "@emotion/react";
import Color from "colorjs.io";

function shadeOf(color: string, shade: number, opacity?: number) {
  const colorObj = new Color(color);
  colorObj.alpha = opacity || 1;

  let black = new Color("#020010");
  let white = new Color("#fffdfc");

  let cssColor = ``;
  if (shade === 500) {
    cssColor = colorObj.toString();
  } else if (shade < 500) {
    const shift = (500 - shade) / 500;
    cssColor = colorObj.range(white, { space: "lch" })(shift * 0.9).lighten(shift * 0.1).toString();
  } else {
    const shift = (shade - 500) / 500;
    cssColor = colorObj.range(black, { space: "lch" })(shift * 0.7).darken(shift * 0.3).toString();
  }

  // Mix filter color if filterStrength is set
  if (palette.filter && palette.filterStrength > 0) {
    const filterColor = palette.filter;
    const mixColor = new Color(cssColor);
    cssColor = mixColor.mix(filterColor, palette.filterStrength).toString();
  }

  return cssColor;
}


class Palette {
  filter: Color | null = null;
  filterStrength: number = 0;

  primary(shade: number = 500, opacity?: number) {
    return shadeOf("#444266", shade, opacity);
  }
  secondary(shade: number = 500, opacity?: number) {
    return shadeOf("#69cbc4", shade, opacity);
  }

  orange(shade: number = 500, opacity?: number) {
    return shadeOf("#fca067", shade, opacity);
  }
  pink(shade: number = 500, opacity?: number) {
    return shadeOf("#eb9cbf", shade, opacity);
  }
  lightBlue(shade: number = 500, opacity?: number) {
    return shadeOf("#d1eddd", shade, opacity);
  }
  blue(shade: number = 500, opacity?: number) {
    return shadeOf("#71cdc5", shade, opacity);
  }
  grey(shade: number = 500, opacity?: number) {
    return shadeOf("#888", shade, opacity);
  }
  green(shade: number = 500, opacity?: number) {
    return shadeOf("#c7d699", shade, opacity);
  }
  brown(shade: number = 500, opacity?: number) {
    return shadeOf("#ac5a5e", shade, opacity);
  }
  yellow(shade: number = 500, opacity?: number) {
    return shadeOf("#f5d491", shade, opacity);
  }
  red(shade: number = 500, opacity?: number) {
    return shadeOf("#d45d79", shade, opacity);
  }

  setFilter(color: string, strength: number) {
    this.filter = new Color(color);
    this.filterStrength = strength;
  }
  clearFilter() {
    this.filter = null;
    this.filterStrength = 0;
  }

  get gradient() {
    return {
      etherealPrimary: () => `linear-gradient(to right, #4d5778, #585174, #684e73)`,
      skyBlue: () => `linear-gradient(to top, #70cfc8, #c4ead6, #abe4d4)`,
    }
  }
}

export const palette = new Palette();