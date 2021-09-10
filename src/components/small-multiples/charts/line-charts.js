import React, { useContext, useEffect } from "react"
import ContentContext from '../context/content-context'
import styled from 'styled-components'
import * as d3array from 'd3-array'
import LineChartComponent from "./line-chart";
import 'semantic-ui-css/components/message.min.css'
import '../../../css/src/main.scss'

function LineChartsComponent(props) {
	const {
		setContentDetails
	} = useContext(ContentContext)

	useEffect(() => {
		setContentDetails({data: props.data})
	}, [props.data, setContentDetails])

	const LineChartsWrapper = styled.section`
		display: block;
		h1 {
			font-family: 'GT Sectra', serif;
		}
		.ui.message {
			border-radius: 0;
			font-family: 'Roboto', sans-serif;
		}
	`

	let chartDataArray = []
	let allNumbers = []

	const settings = props.googleData.settings.elements[0]
	const chartData = props.googleData.chartData

	const dataGroupedByWord = Array.from(d3array.group(chartData.elements, d => d.word))

	console.log(dataGroupedByWord.length)

	for (let i = 0; i < dataGroupedByWord.length; i++) {
		chartDataArray.push({
			title: dataGroupedByWord[i][0],
			id: dataGroupedByWord[i][0],
			color: "#413c78",
			data: []
		})
	}

	console.log(chartDataArray)

	for (let i = 0; i < dataGroupedByWord.length; i++) {
		for (let ii = 0; ii < dataGroupedByWord[i][1].length; ii++) {
			chartDataArray[i].data.push({
				x: dataGroupedByWord[i][1][ii]['job_year'] + '-01-01',
				y: isNaN(parseFloat(dataGroupedByWord[i][1][ii]['percent_of_year'])) ? null : parseFloat(dataGroupedByWord[i][1][ii]['percent_of_year'])
			})
			allNumbers.push(isNaN(parseFloat(dataGroupedByWord[i][1][ii]['percent_of_year'])) ? null : parseFloat(dataGroupedByWord[i][1][ii]['percent_of_year']))
		}
	}

	console.log(chartDataArray)

	// console.log(chartDataArray)

	return (
		<LineChartsWrapper>
			{ settings.Title &&
			<h1> { settings.Title }</h1>
			}
			{ settings.Intro &&
			<p className={'ui basic message'}> { settings.Intro }</p>
			}
			<div className={'ui stackable grid'}>
				{ chartDataArray.length > 0 &&
				chartDataArray.map((el,i) => (
					<LineChartComponent
						key={`linechart-${i}`}
						chartData={el}
						minMaxExtent={d3array.extent(allNumbers)}
					/>
				))
				}
			</div>
		</LineChartsWrapper>
	);
}

export default LineChartsComponent;
