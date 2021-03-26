import React, { useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import RadarChart from './RadarChart';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const SimpleSpiderChart = (props) => {
  const {
    chartTitle,
    chartTitleColor,
    _width,
    titles,
    dataset1,
    dataset2,
    scale,
  } = props;

  const { manualScaleEnable, manualScaleValue } = scale;
  const {
    spokeTitle1,
    spokeTitle2,
    spokeTitle3,
    spokeTitle4,
    spokeTitle5,
  } = titles;
  const {
    dataset1LineColor,
    dataset1SpokeValue1,
    dataset1SpokeValue2,
    dataset1SpokeValue3,
    dataset1SpokeValue4,
    dataset1SpokeValue5,
  } = dataset1;

  const {
    enabled: enableDataset2,
    dataset2LineColor,
    dataset2SpokeValue1,
    dataset2SpokeValue2,
    dataset2SpokeValue3,
    dataset2SpokeValue4,
    dataset2SpokeValue5,
  } = dataset2;

  const max = useMemo(() => {
    if (manualScaleEnable) {
      return manualScaleValue;
    }
    const values = [
      dataset1SpokeValue1,
      dataset1SpokeValue2,
      dataset1SpokeValue3,
      dataset1SpokeValue4,
      dataset1SpokeValue5,
    ];

    if (enableDataset2) {
      values.push(
        dataset2SpokeValue1,
        dataset2SpokeValue2,
        dataset2SpokeValue3,
        dataset2SpokeValue4,
        dataset2SpokeValue5,
      );
    }
    return Math.max(...values);
  }, [dataset1, dataset2, manualScaleEnable, manualScaleValue]);

  const charData = useMemo(() => {
    const tempData = [
      {
        data: {
          spoke1: dataset1SpokeValue1 / max,
          spoke2: dataset1SpokeValue2 / max,
          spoke3: dataset1SpokeValue3 / max,
          spoke4: dataset1SpokeValue4 / max,
          spoke5: dataset1SpokeValue5 / max,
        },
        meta: { color: dataset1LineColor },
      },
    ];
    if (enableDataset2) {
      tempData.push({
        data: {
          spoke1: dataset2SpokeValue1 / max,
          spoke2: dataset2SpokeValue2 / max,
          spoke3: dataset2SpokeValue3 / max,
          spoke4: dataset2SpokeValue4 / max,
          spoke5: dataset2SpokeValue5 / max,
        },
        meta: { color: dataset2LineColor },
      });
    }
    return tempData;
  }, [dataset1, dataset2]);

  const captions = useMemo(() => {
    return {
      spoke1: spokeTitle1 || '',
      spoke2: spokeTitle2 || '',
      spoke3: spokeTitle3 || '',
      spoke4: spokeTitle4 || '',
      spoke5: spokeTitle5 || '',
    };
  }, [titles]);

  return (
    <View style={styles.wrapper}>
      <Text style={{ color: chartTitleColor }}>{chartTitle}</Text>
      <RadarChart captions={captions} data={charData} size={_width} />
    </View>
  );
};
