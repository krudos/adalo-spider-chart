import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import RadarChart from "./RadarChart";

class SpiderChartOne extends Component {
	render() {
		const {
			lineColor,
			titleColor,
			_width,
			title,
			spokeTitle1,
			spokeTitle2,
			spokeTitle3,
			spokeTitle4,
			spokeTitle5,
			spokeValue1,
			spokeValue2,
			spokeValue3,
			spokeValue4,
			spokeValue5,
		} = this.props;
		const max = Math.max(
			spokeValue1,
			spokeValue2,
			spokeValue3,
			spokeValue4,
			spokeValue5
		);
		return (
			<View style={styles.wrapper}>
				<Text style={{ color: titleColor }}>{title}</Text>
				<RadarChart
					captions={{
						// columns
						spoke1: spokeTitle1,
						spoke2: spokeTitle2,
						spoke3: spokeTitle3,
						spoke4: spokeTitle4,
						spoke5: spokeTitle5,
					}}
					data={[
						// data
						{
							data: {
								spoke1: spokeValue1 / max,
								spoke2: spokeValue2 / max,
								spoke3: spokeValue3 / max,
								spoke4: spokeValue4 / max,
								spoke5: spokeValue5 / max,
							},
							meta: { color: lineColor },
						},
					]}
					size={_width}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default SpiderChartOne;
