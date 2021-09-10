import React, { Component } from "react";
import Slider from "react-slick";
import { isMobile } from 'react-device-detect';
import renderHTML from 'react-render-html';
import { Checkbox } from 'semantic-ui-react';

import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

import styled from 'styled-components';

import 'semantic-ui-css/components/icon.css';
import 'semantic-ui-css/components/button.css';
import 'semantic-ui-css/components/checkbox.css';

const StyledTable = styled.table`
tr > th, td {
	padding: 0.5rem 0;
}
`

export default class BasketSliderComponent extends Component {
	state = {
		activeSlide: this.props.data.length - 1,
		isOpen: true
	};

	numberWithCommas = (x) => {
		let returnValue = x;
		if (x.isInteger) {
			returnValue = x.toFixed(2);
		}
		return returnValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	render() {
		const { activeSlide, isOpen } = this.state;
		const { data } = this.props;
		const monthNamesShort = ["", "Jan.", "Feb.", "Mar.", "Apr.", "May", "June",
			"July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."
		];
		const monthNamesLong = ["", "January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];
		const monthNames = isMobile ?
			monthNamesShort
			:
			monthNamesLong;

		const slidesToShow = 2;

		const settings = {
			focusOnSelect: true,
			dots: false,
			infinite: true,
			speed: 150,
			initialSlide: data.length - 1,
			// slidesToShow: data.length,
			slidesToShow: window.innerWidth > 500 ? 3 : slidesToShow,
			centerMode: true,
			slidesToScroll: 1,
			// beforeChange: (current, next) => this.setState({ activeSlide: -1 }),
			afterChange: current => this.setState({ activeSlide: current })
		};

		const expenses = this.props.data[activeSlide].Expenses.split(';');
		let totalExpensesLocal = 0;
		let totalExpensesUSD = 0;

		const income = this.props.data[activeSlide].Income.split(';');
		let totalIncomeLocal = 0;
		let totalIncomeUSD = 0;

		const expensesTable = expenses.map((exp, i) => (
			<tr key={'expenses-row-' + i} className={isOpen ? 'visible' : 'invisible'}>
				<td>{exp.split(', ')[0]}</td>
				<td style={{textAlign: 'right'}}>{this.numberWithCommas(exp.split(', ')[1])}</td>
				<td style={{textAlign: 'right'}}>{this.numberWithCommas(exp.split(', ')[2])}</td>
			</tr>
		));

		for (let i = 0; i < expenses.length; i++) {
			const usdCurrency = parseFloat(expenses[i].split(',')[1]);
			const localCurrency = parseFloat(expenses[i].split(',')[2]);
			totalExpensesLocal = totalExpensesLocal + parseFloat(localCurrency);
			totalExpensesUSD = totalExpensesUSD + parseFloat(usdCurrency);
		}

		const incomeTable = income.map((inc, i) => (
			<tr key={'income-row-' + i} className={isOpen ? 'visible' : 'invisible'}>
				<td>{inc.split(', ')[0]}</td>
				<td style={{textAlign: 'right'}}>{this.numberWithCommas(inc.split(', ')[1])}</td>
				<td style={{textAlign: 'right'}}>{this.numberWithCommas(inc.split(', ')[2])}</td>
			</tr>
		));

		for (let i = 0; i < income.length; i++) {
			const usdCurrencyIncome = parseFloat(income[i].split(',')[1]);
			const localCurrencyIncome = parseFloat(income[i].split(',')[2]);
			totalIncomeLocal = totalIncomeLocal + localCurrencyIncome;
			totalIncomeUSD = totalIncomeUSD + usdCurrencyIncome;
		}

		return (
			<div style={{overflowX: 'hidden'}}>
				<div className={'basket-container'}>

					{data.length > 1 &&
					<h2 style={{textAlign: 'center'}}>
						<i className={'icon calendar alternate'} />Choose a month and explore the family's diary entries:
					</h2>
					}

					<Slider {...settings} className={'basket-slider'}>
						{data.map((el, i) => (
							<div className={'unselectable basket-month-container wobble-hor-bottom'}>
								<div style={{padding: '.8rem 0', textAlign: 'center'}}>
									<h3 style={{paddingTop: '.75rem', fontSize: '110%', textAlign: 'center'}}>
										{ monthNames[parseFloat(el.Month)] }
										{ isMobile ? ( <br /> ) : ( ' ' ) }
										{el.Year}
									</h3>
									{ this.props.data[activeSlide].Month === el.Month &&  this.props.data[activeSlide].Year === el.Year ? (
										<span className={`ui medium big icon basic label ${totalIncomeUSD - totalExpensesUSD < 0 ? 'red' : 'green'}`} style={{background: "transparent", marginTop: '1rem'}}>
											Balance: {totalIncomeUSD - totalExpensesUSD > 0 ? '+' : '-'}{Math.abs(totalIncomeUSD - totalExpensesUSD).toFixed(2)} $
										</span>
										) : (
										<span className={`ui medium big basic icon label ${totalIncomeUSD - totalExpensesUSD < 0 ? 'red' : 'green'}`} style={{marginTop: '1rem'}}>
											Show entry
										</span>
									)
									}
								</div>
							</div>
						))}
					</Slider>

					<div className={'text-box'}>

						<h2 style={{margin: '1rem auto 2rem auto', display: 'none'}}>
							Diary entry:
						</h2>
						{this.props.data[activeSlide].Text &&
						<div className={'event-text flow'}>
							<span className={'label'}>Diary entry</span>
							{renderHTML(this.props.data[activeSlide].Text)}
						</div>
						}

						<h2 style={{marginBottom: 0, textAlign: 'center'}}>
							<i className={'icon shopping basket'} />{ monthNamesLong[parseFloat(this.props.data[activeSlide].Month)] } { this.props.data[activeSlide].Year } shopping basket:
						</h2>

						<div className="ui center aligned small header">
							<Checkbox
								toggle
								fitted
								checked={isOpen}
								onChange={() => this.setState({isOpen: !isOpen})}
							/>
							<br />
							{isOpen ?
								(
									<span
										style={{
											fontFamily: 'roboto, sans-serif',
											opacity: 1,
										}}
										onClick={() => this.setState({isOpen: !isOpen})}
									>
									Hide details
								</span>
								) : (
									<span
										style={{
											fontFamily: 'roboto, sans-serif',
											opacity: 0.8,
										}}
										onClick={() => this.setState({isOpen: !isOpen})}
									>
									Show details
								</span>
								)
							}
						</div>
						<div className={'text-box income-box'}>
							<StyledTable
								className={'ui very basic compact unstackable small table'}
								style={{
									fontSize: isMobile ? '80%' : '100%'
								}}
							>
								<thead>
								<tr>
									<th>
										Income
									</th>
									<th style={{textAlign: 'right'}}>US Dollar</th>
									<th style={{textAlign: 'right'}}>Local currency</th>
								</tr>
								</thead>
								<tbody>
								{ incomeTable }
								<tr style={{fontWeight: '800'}} className={'active'}>
									<td></td>
									<td style={{textAlign: 'right'}}>{this.numberWithCommas(totalIncomeUSD)} $</td>
									<td style={{textAlign: 'right'}}>{this.numberWithCommas(totalIncomeLocal)} {this.props.data[activeSlide].LocalCurrency}</td>
								</tr>
								</tbody>
							</StyledTable>
						</div>
						<div className={'text-box expenses-box'}>
							<StyledTable
								className={'ui very basic compact unstackable small table'}
								style={{
									fontSize: isMobile ? '80%' : '100%'
								}}
							>
								<thead>
								<tr>
									<th colSpan={2}>
										Expenses
									</th>
								</tr>
								</thead>
								<tbody>
								{ expensesTable }
								<tr style={{fontWeight: '800'}} className={'active'}>
									<td></td>
									<td style={{textAlign: 'right'}}>{this.numberWithCommas(totalExpensesUSD.toFixed(2))} $</td>
									<td style={{textAlign: 'right'}}>{this.numberWithCommas(totalExpensesLocal.toFixed(2))} {this.props.data[activeSlide].LocalCurrency}</td>
								</tr>
								</tbody>
							</StyledTable>
						</div>
						<div className={'text-box balance-box'}>
							<StyledTable
								className={`ui very basic compact unstackable black table`}
								style={{
									fontSize: isMobile ? '80%' : '100%'
								}}
							>
								<thead>
								<tr>
									<th
										colSpan={2}
									>
										Monthly balance
									</th>
								</tr>
								</thead>
								<tbody>
								<tr style={{fontWeight: '800'}} className={`${totalIncomeUSD - totalExpensesUSD < 0 ? 'negative' : 'positive'}`}>
									<td>Total</td>
									<td style={{textAlign: 'right'}}>{totalIncomeUSD - totalExpensesUSD > 0 ? '+' : '-'} {this.numberWithCommas(Math.abs(totalIncomeUSD - totalExpensesUSD).toFixed(2))} $</td>
									<td style={{textAlign: 'right'}}>{totalIncomeUSD - totalExpensesUSD > 0 ? '+' : '-'}  {this.numberWithCommas(Math.abs(totalIncomeLocal - totalExpensesLocal.toFixed(2)))} {this.props.data[activeSlide].LocalCurrency}</td>
								</tr>
								</tbody>
							</StyledTable>
							{this.props.data[activeSlide].TextPostTable &&
							<div className={'event-text flow small'} style={{marginTop: '4rem'}}>
								<span className={'label'}>Notes</span>
								{renderHTML(this.props.data[activeSlide].TextPostTable)}
							</div>
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
