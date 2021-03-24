import React from 'react';
import Svg from 'react-native-svg';
import radar from './radar';

const noSmoothing = (points) => {
  let d = 'M' + points[0][0].toFixed(4) + ',' + points[0][1].toFixed(4);
  for (let i = 1; i < points.length; i++) {
    d += 'L' + points[i][0].toFixed(4) + ',' + points[i][1].toFixed(4);
  }
  return d + 'z';
};

const setViewBox = (options) =>
  `-${options.captionMargin} 0 ${options.size + options.captionMargin * 2} ${
    options.size
  }`;

const defaultOptions = {
  size: 300,
  axes: true, // show axes?
  scales: 3, // show scale circles?
  captions: true, // show captions?
  dots: false, // show dots?
  zoomDistance: 1.2, // where on the axes are the captions?
  smoothing: noSmoothing, // shape smoothing function
  captionMargin: 10,
  setViewBox,
  axisProps: () => ({ className: 'axis' }),
  scaleProps: () => ({ className: 'scale', fill: 'none' }),
  shapeProps: () => ({ className: 'shape' }),
  dotProps: () => ({
    className: 'dot',
  }),
  captionProps: () => ({
    className: 'caption',
    textAnchor: 'middle',
    fontSize: 10,
    fontFamily: 'sans-serif',
  }),
};

const RadarChart = (props) => {
  const { data, captions, options, size = defaultOptions.size, id } = props;

  const chartOptions = {
    ...defaultOptions,
    ...options,
    size,
  };

  const { setViewBox } = chartOptions;
  const chart = radar(captions, data, chartOptions);

  return (
    <Svg width={size} height={size}>
      {chart}
    </Svg>
  );
};

export default RadarChart;
