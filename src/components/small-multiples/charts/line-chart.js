import React, { useContext } from "react"
import ContentContext from '../context/content-context'
import styled from 'styled-components'
import { ResponsiveLine } from '@nivo/line'

import 'semantic-ui-css/components/grid.min.css'
import '../../../css/src/main.scss'

function LineChartComponent(props) {
	const {
		// active,
		data,
		// setContentDetails
	} = useContext(ContentContext)

	console.log(props.data)

	const LineChartWrapper = styled.div`
		display: block;
		height: 250px;
		h1 {
			font-family: 'GT Sectra', serif;
		}
		.ui.message {
			border-radius: 0;
			font-family: 'Roboto', sans-serif;
		}
	`

	console.log(data)

	return (
		<LineChartWrapper className="four wide doubling column">
			<ResponsiveLine
				data={[props.chartData]}
				margin={{ top: 10, right: 15, bottom: 60, left: 45 }}
				yScale={{ type: 'linear', min: props.minMaxExtent[0], max: props.minMaxExtent[1] * 1.1, stacked: true, reverse: false }}
				xScale={{ format: "%Y-%m-%d", type: "time" }}
				xFormat="time:%Y-%m-%d"
				axisBottom={{
					tickValues: "every 2 year",
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					format: "%Y",
					legend: "year",
					legendOffset: 36,
					legendPosition: "middle"
				}}
				axisTop={null}
				axisRight={null}
				axisLeft={{
					orient: 'left',
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'percent',
					legendOffset: -40,
					legendPosition: 'middle'
				}}
				colors={props.chartData.color}
				pointSize={2}
				pointColor={props.chartData.color}
				pointBorderWidth={0}
				pointBorderColor={props.chartData.color}
				pointLabel={'y'}
				pointLabelYOffset={-12}
				useMesh={true}
				color={d => d.color}
				legends={[
					{
						anchor: 'bottom-right',
						direction: 'column',
						justify: true,
						translateX: 100,
						translateY: 0,
						itemsSpacing: 0,
						itemDirection: 'left-to-right',
						itemWidth: 80,
						itemHeight: 20,
						itemOpacity: 0.75,
						symbolSize: 12,
						symbolShape: 'circle',
						symbolBorderColor: 'rgba(0, 0, 0, .5)',
						effects: [
							{
								on: 'hover',
								style: {
									itemBackground: 'rgba(0, 0, 0, .03)',
									itemOpacity: 1
								}
							}
						]
					}
				]}
			/>
		</LineChartWrapper>
	);
}

export default LineChartComponent;
