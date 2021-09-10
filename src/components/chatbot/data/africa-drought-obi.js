import React from "react";
import ImageBubble from '../image-bubble'
import RichText from '../rich-text'
// import TagManager from 'react-gtm-module'
// import Avatar from '../imgs/humanitaribot'

const triggerAndTrack = (nextStep, steps) => {
	// Changes URL according to "next step"
	window.history.replaceState(null, "Drought Series Chatbot", "/chatbot/africa-drought/step/" + nextStep)
	return nextStep
}

const data = {
	image: require('../imgs/chatbot.svg').default,
	name: 'HumanitariBot',
	steps: [
		{
			id: '1',
			hideInput: true,
			message: "Hi, I’m HumanitariBot. So you’re wondering what drought looks like to families on the ground in Africa – and how locusts, the ‘F-word’ (famine), and COVID-19 link up? Let’s talk. Where shall we start?",
			trigger: '2',
		},
		{
			id: '2',
			hideInput: true,
			options: [
				{ value: 0, label: '❓ What are the Drought Diaries?',
					trigger: (({steps}) => triggerAndTrack('400', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 1, label: '🚰 When did the drought start and how bad is it?',
					trigger: (({steps}) => triggerAndTrack('500', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 2, label: '🦗 What’s the deal with locusts?',
					trigger: (({steps}) => triggerAndTrack('600', steps)),
					metadata: {type: 'userClick'}
				},
				/*{ value: 3, label: '💭 Meet the families',
					trigger: (({steps}) => triggerAndTrack('800', steps)),
					metadata: {type: 'userClick'}
				},*/
				{ value: 4, label: "📔 What did the families say?",
					trigger: (({steps}) => triggerAndTrack('700', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 5, label: '🦠 How badly has Africa been hit by COVID-19?',
					trigger: (({steps}) => triggerAndTrack('900', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 6, label: '❓ What about the F-word — will there be famine?',
					trigger: (({steps}) => triggerAndTrack('990', steps)),
					metadata: {type: 'userClick'}
				},
			],
		},
		{
			id: '3',
			hideInput: true,
			message: "I'm sorry, I haven't been told any details about this topic, yet...",
			trigger: '2',
		},
		{
			id: '400',
			hideInput: true,
			message: "The Drought Diaries followed six families in three countries – Kenya, Somalia, and Zimbabwe – over six months from late 2019 til mid 2020. The families told us how their lives changed (or didn’t) as food prices shifted, along with jobs and living expenses.",
			trigger: '401',
		},
		{
			id: '401',
			hideInput: true,
			delay: 2000,
			component: (
				<RichText
					text={"<p> We started the project after we published a story in June 2019 with this headline, “Drought in Africa leaves 45 million in need across 14 countries.” It left us wondering about the lives behind such huge numbers. <a href='https://www.thenewhumanitarian.org/special-report/2020/diary-drought-africa' target='_blank'>Read the diaries here</a>.</p>"}
				/>
			),
			trigger: '999',
		},
		{
			id: '500',
			hideInput: true,
			message: "A scorching drought hit southern and eastern Africa in 2019. What made it so bad for farmers and pastoralists alike was that this was the third season in a row of failed rains.",
			trigger: '501'
		},
		{
			id: '501',
			hideInput: true,
			delay: 2000,
			message: "By mid-2019, tens of millions of people were in desperate trouble – a combination of poor harvests, the crash in livestock prices, and rising food costs. Then, in 2020, COVID-19 came along. That didn’t help things.",
			trigger: '502',
		},
		{
			id: '502',
			hideInput: true,
			options: [
				{ value: 1, label: '🇰🇪 What happened in Kenya?',
					trigger: (({steps}) => triggerAndTrack('510', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 2, label: '🇸🇴 What happened in Somalia?',
					trigger: (({steps}) => triggerAndTrack('520', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 3, label: "🇿🇼 What happened in Zimbabwe?",
					trigger: (({steps}) => triggerAndTrack('530', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 3, label: '❓ What else can you tell me?',
					trigger: (({steps}) => triggerAndTrack('2', steps)),
					metadata: {type: 'userClick'}
				}
			],
		},
		{
			id: '503',
			hideInput: true,
			options: [
				{ value: 1, label: '🌍 What happened in the other countries?',
					trigger: (({steps}) => triggerAndTrack('502', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 2, label: '❓ What else can you tell me?',
					trigger: (({steps}) => triggerAndTrack('2', steps)),
					metadata: {type: 'userClick'}
				},
			],
		},
		// KENYA
		{
			id: '510',
			hideInput: true,
			options: [
				{ value: 1, label: '🇰🇪 Why were so many Kenyans going hungry?',
					trigger: (({steps}) => triggerAndTrack('511', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 2, label: '🇰🇪 If it rains in Kenya, will all be well?',
					trigger: (({steps}) => triggerAndTrack('512', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 3, label: '🌍 What happened in the other countries?',
					trigger: (({steps}) => triggerAndTrack('502', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 4, label: '❓ What else can you tell me?',
					trigger: (({steps}) => triggerAndTrack('2', steps)),
					metadata: {type: 'userClick'}
				},
			],
		},
		{
			id: '511',
			hideInput: true,
			message: "Kenya faced its worst drought in almost four decades in 2019. The rainy season, usually from March to May, failed in the north and northeast. Farmers lost crops they had planted, and the lack of water and pasture led to large-scale livestock deaths. All told, an estimated 2.5 million people had insufficient food to eat.",
			trigger: '510',
		},
		{
			id: '512',
			hideInput: true,
			component: (
				<RichText
					text={"<p>The March to May rains <a href='https://reliefweb.int/report/kenya/kenya-food-security-outlook-update-june-2020-january-2021' target='_blank'>were good this year</a> and led to decent harvests even in areas where harvests are usually lower. Healthy livestock meant pastoralists were able to charge above-average prices for their animals. But the good news may not last. The forecast is for poor rains for the October-December season and the <a href='https://reliefweb.int/report/kenya/kenya-food-security-outlook-update-june-2020-january-2021' target='_blank'>possibility of another drought</a> in 2021.</p>"}
				/>
			),
			trigger: '510',
		},
		// SOMALIA
		{
			id: '520',
			hideInput: true,
			options: [
				{ value: 1, label: '🇸🇴 Too little or too much rain in Somalia?',
					trigger: (({steps}) => triggerAndTrack('521', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 2, label: '🇸🇴 Is drought the only threat in Somalia?',
					trigger: (({steps}) => triggerAndTrack('522', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 3, label: '🌍 What happened in the other countries?',
					trigger: (({steps}) => triggerAndTrack('502', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 4, label: '❓ What else can you tell me?',
					trigger: (({steps}) => triggerAndTrack('2', steps)),
					metadata: {type: 'userClick'}
				},
			],
		},
		{
			id: '521',
			hideInput: true,
			message: "In 2019, the April to June rains failed and 2.2 million people were going hungry and in need of aid. The most desperate left their rural areas to shelter in towns and cities. But at the end of the year, the normal rainy season went into overdrive, causing floods that affected more than half a million people.",
			trigger: '520',
		},
		{
			id: '522',
			hideInput: true,
			component: (
				<RichText
					text={"<p>Flood damage to farmland, followed by arid spells, is expected to cut food production <a href='https://reliefweb.int/report/somalia/fsnau-fews-net-2019-post-gu-technical-release-21-million-people-somalia-face-acute' target='_blank'>by 40 percent in 2020</a>. Desert locusts have been an additional challenge, munching their way through crops and pasture land –  a threat that will last <a href='https://reliefweb.int/sites/reliefweb.int/files/resources/IPC_Somalia_AcuteFoodInsecurity_2020JulySept_Snapshot.pdf' target='_blank'>until the end of the year</a>. COVID-19 is also having an impact. <a href='https://blogs.lse.ac.uk/crp/2020/04/07/remittances-affect-the-somali-covid-19-response/#:~:text=Remittances%20from%20Somalis%20abroad%20are,to%20receive%20these%20funds%20directly.' target='_blank'>More than a third of Somali households</a> are supported by remittances, but that flow has slowed as a result of the economic downturn in Western countries.</p>"}
				/>
			),
			trigger: '520',
		},
		// ZIMBABWE
		{
			id: '530',
			hideInput: true,
			options: [
				{ value: 1, label: '🇿🇼 How many Zimbabweans are short of food?',
					trigger: (({steps}) => triggerAndTrack('531', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 2, label: '🇿🇼 What’s behind the food shortage in Zimbabwe?',
					trigger: (({steps}) => triggerAndTrack('532', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 3, label: '🌍 What happened in the other countries?',
					trigger: (({steps}) => triggerAndTrack('502', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 4, label: '❓ What else can you tell me?',
					trigger: (({steps}) => triggerAndTrack('2', steps)),
					metadata: {type: 'userClick'}
				},
			],
		},
		{
			id: '531',
			hideInput: true,
			message: "Drought and an economic meltdown last year combined to push Zimbabwe to the brink of humanitarian catastrophe. The supposed rainy season in 2019 was the driest in 40 years, and the maize harvest less than half that of the previous year. As a result, 8.6 million people – 60 percent of the population – will be short of food in both rural and urban areas.",
			trigger: '530',
		},
		{
			id: '532',
			hideInput: true,
			component: (
				<RichText
					text={"<p>Zimbabwe is rated as one of the world’s <a href='https://www.unicef.org/zimbabwe/press-releases/zimbabwe-rated-one-worlds-top-global-food-crises-new-united-nations-report' target='_blank'>worst food emergencies</a>. Zimbabwe’s farmers have been hit by their third successive drought, the inflation rate is over 800 percent, and the coronavirus lockdown has deepened already extreme poverty.</p>"}
				/>
			),
			trigger: '530',
		},
		{
			id: '600',
			hideInput: true,
			message: "The end-of-year 2019 rains were initially welcomed in Kenya and Somalia after a hard drought. But the damp soil and sprouting green shoots created the perfect breeding conditions for desert locusts. This led to the worst outbreak in decades as the voracious pests devoured crops and pasture. A swarm can travel up to 150 kilometres in 24 hours and munch through as much food as 35,000 people can eat in a day. One super-swarm in northeast Kenya covered 2,400 square kilometres.",
			trigger: '601',
		},
		{
			id: '601',
			hideInput: true,
			delay: 8000,
			component: (
				<ImageBubble
					title={'COVID-19 hampers response as ‘perfect storm’ of locusts builds in East Africa'}
					photo={'https://assets.irinnews.org/s3fs-public/styles/responsive_large/public/east-africa-locusts-update.jpeg?X2u6GeDEkbEkBXnqKXvdfW8R8h3W5akE&itok=mBvFyDRf'}
					credit={'A spraying operation to combat locust swarms on 4 April in Seren village near South Horr. A second generation of the pest is swarming just as a new crop season gets underway. (Sven Torfinn/FAO)'}
					link={'https://www.thenewhumanitarian.org/feature/2020/04/28/locusts-Africa-Kenya-Uganda-Ethiopia-Somalia'}
				/>
			),
			trigger: '602',
		},
		{
			id: '602',
			hideInput: true,
			options: [
				{ value: 604, label: '🦗 Are the locust swarms getting smaller?',
					trigger: (({steps}) => triggerAndTrack('605', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 2, label: '❓ What else can you tell me?',
					trigger: (({steps}) => triggerAndTrack('2', steps)),
					metadata: {type: 'userClick'}
					},
			],
		},
		{
			id: '605',
			hideInput: true,
			// delay: 10000,
			component: (
				<RichText
					text={"<p>Despite aerial and ground spraying, the <a href='http://www.fao.org/ag/locusts/en/info/info/index.html' target='_blank'>locust threat is not over</a>. Large swarms have been reported in northern Somalia, and with the prevailing winds in October, there is a threat of swarm migration into central Somalia, and could reach Kenya by November 2020.</p>"}
				/>
			),
			trigger: '999',
		},
		{
			id: '700',
			hideInput: true,
			message: "The Drought Diaries followed six families in three countries over six months. Which country’s families would you like to hear more about?",
			trigger: '701',
		},
		{
			id: '701',
			hideInput: true,
			options: [
				{ value: 1, label: '🇰🇪 Kenya',
					trigger: (({steps}) => triggerAndTrack('702', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 2, label: '🇸🇴 Somalia',
					trigger: (({steps}) => triggerAndTrack('703', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 3, label: '🇿🇼 Zimbabwe',
					trigger: (({steps}) => triggerAndTrack('704', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 4, label: '❓ What else can you tell me?',
					trigger: (({steps}) => triggerAndTrack('2', steps)),
					metadata: {type: 'userClick'}
				},
			],
		},
		{
			id: '702',
			hideInput: true,
			options: [
				{ value: 1, label: '🇰🇪 How has Benjamin coped?',
					trigger: (({steps}) => triggerAndTrack('710', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 2, label: '🇰🇪 Marlvin thinks drought is good for business?',
					trigger: (({steps}) => triggerAndTrack('720', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 3, label: '❓ What else can you tell me?',
					trigger: (({steps}) => triggerAndTrack('2', steps)),
					metadata: {type: 'userClick'}
				},
			],
		},
		{
			id: '703',
			hideInput: true,
			options: [
				{ value: 1, label: '🇸🇴 How did drought affect Madina?',
					trigger: (({steps}) => triggerAndTrack('730', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 2, label: '🇸🇴 What does Aadan think the problem is?',
					trigger: (({steps}) => triggerAndTrack('740', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 3, label: '❓ What else can you tell me?',
					trigger: (({steps}) => triggerAndTrack('2', steps)),
					metadata: {type: 'userClick'}
				}
			],
		},
		{
			id: '704',
			hideInput: true,
			options: [
				{ value: 1, label: '🇿🇼 Ganda: How does drought affect people in the cities?',
					trigger: (({steps}) => triggerAndTrack('750', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 2, label: '🇿🇼 Can Loveness make it?',
					trigger: (({steps}) => triggerAndTrack('760', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 3, label: '❓ What else can you tell me?',
					trigger: (({steps}) => triggerAndTrack('2', steps)),
					metadata: {type: 'userClick'}
				}
			],
		},
		{
			id: '705',
			hideInput: true,
			options: [
				{ value: 604, label: '🔙 Read about another family',
					trigger: (({steps}) => triggerAndTrack('701', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 2, label: '❓ What else can you tell me?',
					trigger: (({steps}) => triggerAndTrack('2', steps)),
					metadata: {type: 'userClick'}
				}
			],
		},
		{
			id: '710',
			hideInput: true,
			message: "As pasture dried up, Benjamin moved his livestock south. When his animals returned at the beginning of the year, they were fatter, but then succumbed to foot-and-mouth disease – an epidemic that hit other pastoralists in his Laisamis area.",
			trigger: '711',
		},{
			id: '711',
			hideInput: true,
			delay: 2000,
			message: 'Livestock keepers needed to invest in expensive medicine to keep their animals alive. Benjamin runs a general-purpose store in the small town. He found that more and more of his neighbours were being forced to buy on credit as they struggled to cope.',
			trigger: '712',
		},
		{
			id: '712',
			hideInput: true,
			delay: 10000,
			component: (
				<ImageBubble
					title={'Click here to explore Benjamin’s drought diary'}
					photo={'https://assets.irinnews.org/styles/responsive_large/s3/header-kenya_0.jpg?xnXx6yw3Zb5RR5EKab97qwuQsgfNcYq8&itok=HLYfCtU6'}
					credit={'Benjamin Galwaha and his wife, Faith, run a small shop and rent out rooms in a property they own.'}
					link={'https://www.thenewhumanitarian.org/special-report/2020/diary-drought-east-africa-kenya-benjamin'}
				/>
			),
			trigger: '705',
		},
		{
			id: '720',
			hideInput: true,
			message: 'As the drought hit and livestock struggled to survive, pastoralists began selling off their surviving animals to redeem some value. As a butcher, Marlvin benefited from the inevitable market glut. “We get the meat at a cheaper price,” Marlvin said, unable to suppress a smile. “That’s why we love drought a lot, on our side.”',
			trigger: '721',
		},{
			id: '721',
			hideInput: true,
			delay: 2000,
			message: '“We get the meat at a cheaper price,” Marlvin said, unable to suppress a smile. “That’s why we love drought a lot, on our side.”',
			trigger: '722',
		},
		{
			id: '722',
			hideInput: true,
			delay: 10000,
			component: (
				<ImageBubble
					title={'Click here to explore Marlvin’s drought diary'}
					photo={'https://assets.irinnews.org/styles/responsive_large/s3/header-kenya-mar.jpg?jDZDp125dSaNRgf8DBSLKnjKJi8KETQ_&itok=ynflkhGN'}
					credit={'Marlvin Mwaura in Nkoroi, Kajiado County (TNH)'}
					link={'https://www.thenewhumanitarian.org/special-report/2020/diary-drought-east-africa-kenya-marlvin'}
				/>
			),
			trigger: '705',
		},
		{
			id: '730',
			hideInput: true,
			message: "Madina said successive droughts have driven people from the countryside into Mogadishu looking for work.",
			trigger: '731',
		},{
			id: '731',
			hideInput: true,
			delay: 2000,
			message: '“This means employers can only pay poor salaries,” but prices in the market keep rising, said her husband, Yahye.',
			trigger: '732',
		},
		{
			id: '732',
			hideInput: true,
			delay: 5000,
			component: (
				<ImageBubble
					title={'Click here to explore Madina’s drought diary'}
					photo={'https://assets.irinnews.org/styles/responsive_large/s3/header-somalia-madina.jpg?A01J_IA4KeRHLYyv0XTSPyBfkN2aCvxJ&itok=0mVA9FiW'}
					credit={'Madina Yacqub in Mogadishu (TNH)'}
					link={'https://www.thenewhumanitarian.org/special-report/2020/diary-drought-east-africa-somalia-madina'}
				/>
			),
			trigger: '705',
		},
		{
			id: '740',
			hideInput: true,
			message: "Recurring drought and the ongoing war between the government and the jihadist group al-Shabab are Somalia’s twin problems, Aadan said.",
			trigger: '741',
		},{
			id: '741',
			hideInput: true,
			delay: 2000,
			message: '“If there had not been a war, the impact of the drought would not have been so bad, as the government could have prepared the people and helped them,” he said. “But there [effectively] is no government.”',
			trigger: '742',
		},
		{
			id: '742',
			hideInput: true,
			delay: 10000,
			component: (
				<ImageBubble
					title={'Click here to explore Aadan’s drought diary'}
					photo={'https://assets.irinnews.org/styles/responsive_large/s3/header-somalia-aadan.jpg?UzwfM0lUDYpNTt3_whMwTsvDV6lC2nTZ&itok=Z9R2HzS6'}
					credit={'Aadan Mohammed in Mogadishu (TNH)'}
					link={'https://www.thenewhumanitarian.org/special-report/2020/diary-drought-east-africa-somalia-mohammed'}
				/>
			),
			trigger: '705',
		},
		{
			id: '750',
			hideInput: true,
			message: "Ganda works in the capital, Harare, and hasn’t been directly affected by drought. What has hit him hard is Zimbabwe’s long and deep economic crisis.",
			trigger: '751',
		},{
			id: '751',
			hideInput: true,
			delay: 2000,
			message: 'Alongside 2.2 million other urban Zimbabweans, he is struggling to put food on the table as a result of an inflation rate of 800 percent and a steadily depreciating local currency.',
			trigger: '752',
		},
		{
			id: '752',
			hideInput: true,
			delay: 10000,
			component: (
				<ImageBubble
					title={'Click here to explore Ganda’s drought diary'}
					photo={'https://assets.irinnews.org/styles/responsive_large/s3/header-zimbabwe-ganda.jpg?ILOR.ysoCvL2dSoSiWI5j1eLkpdsCTC8&itok=q6WGLLj4'}
					credit={'Ganda Farayi in Chitungwiza (TNH)'}
					link={'https://www.thenewhumanitarian.org/special-report/2020/diary-drought-southern-africa-zimbabwe-ganda'}
				/>
			),
			trigger: '705',
		},
		{
			id: '760',
			hideInput: true,
			message: "When we first met Loveness, her family was already on only two meals a day. Her well had dried up, her maize crop had failed, and she had lost her three cattle to red water disease. She was really worried another poor rainy season would tip her family into disaster.",
			trigger: '761',
		},{
			id: '761',
			hideInput: true,
			delay: 2000,
			message: 'Instead, the rains came on time and her garden of maize flourished. But with Zimbabwe’s economy in freefall, the harvest won’t totally rescue her family from hardship, although it will be a big help.',
			trigger: '762',
		},
		{
			id: '762',
			hideInput: true,
			delay: 10000,
			component: (
				<ImageBubble
					title={'Click here to explore Loveness’ drought diary'}
					photo={'https://assets.irinnews.org/styles/responsive_large/s3/header-zimbabwe-loveness.jpg?rPRvv9ExzlBS.JUDClyZSuBNYodYcPJf&itok=Um5YeG_k'}
					credit={'Loveness January, Seke communal lands (TNH)'}
					link={'https://www.thenewhumanitarian.org/special-report/2020/diary-drought-southern-africa-zimbabwe-loveness'}
				/>
			),
			trigger: '705',
		},
		/*{
			id: '800',
			hideInput: true,
			message: "Our drought diaries followed six families in three countries over six months. About the families in which of these countries would like to hear more about?",
			trigger: '801',
		},
		{
			id: '801',
			hideInput: true,
			options: [
				{ value: 1, label: '🇰🇪 Kenya',
					trigger: (({steps}) => triggerAndTrack('802', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 2, label: '🇸🇴 Somalia',
					trigger: (({steps}) => triggerAndTrack('803', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 3, label: '🇿🇼 Zimbabwe',
					trigger: (({steps}) => triggerAndTrack('804', steps)),
					metadata: {type: 'userClick'}
					},
			],
		},
		{
			id: '802',
			hideInput: true,
			options: [
				{ value: 1, label: '🇰🇪 Benjamin Galwaha',
					trigger: (({steps}) => triggerAndTrack('810', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 2, label: '🇰🇪 Marlvin Mwaura',
					trigger: (({steps}) => triggerAndTrack('820', steps)),
					metadata: {type: 'userClick'}
				},
			],
		},
		{
			id: '803',
			hideInput: true,
			options: [
				{ value: 1, label: '🇸🇴 Madina Yacqub',
					trigger: (({steps}) => triggerAndTrack('830', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 2, label: '🇸🇴 Aadan Mohammed',
					trigger: (({steps}) => triggerAndTrack('840', steps)),
					metadata: {type: 'userClick'}
				},
			],
		},
		{
			id: '804',
			hideInput: true,
			options: [
				{ value: 1, label: '🇿🇼 Ganda Farayi',
					trigger: (({steps}) => triggerAndTrack('850', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 2, label: '🇿🇼 Loveness January',
					trigger: (({steps}) => triggerAndTrack('860', steps)),
					metadata: {type: 'userClick'}
				},
			],
		},
		{
			id: '805',
			hideInput: true,
			options: [
				{ value: 604, label: '🔙 Read about another family',
					trigger: (({steps}) => triggerAndTrack('801', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 2, label: '❓ What else can you tell me?',
					trigger: (({steps}) => triggerAndTrack('2', steps)),
					metadata: {type: 'userClick'}
				},
			],
		},
		{
			id: '810',
			hideInput: true,
			message: "It has been a tough six months for Benjamin – his income has more than halved. When we started the diary in November, he was celebrating the end of the drought. His livestock were fattening as pasture recovered with the rains, his shop was doing well, and he was renting out rooms to tenants.",
			trigger: '711',
		},
		{
			id: '811',
			hideInput: true,
			delay: 2000,
			message: 'Then Benjamin suffered a series of knocks. His father became ill and he had to cover the medical bills; his livestock were then infected with foot-and-mouth disease and the medicine they needed was expensive; people living in his rooms absconded without settling their bills; and then, finally, when Benjamin hoped he could sell some of his livestock to raise capital, COVID-19 closed the regional market.',
			trigger: '712',
		},
		{
			id: '812',
			hideInput: true,
			delay: 2000,
			message: 'In his last diary entry, Benjamin finally had a stroke of luck, getting a job on a road-building project that passed close to his Laisamis home. But he no longer seemed the confident, optimistic man we first met at the beginning of the series.',
			trigger: '805',
		},
		{
			id: '820',
			hideInput: true,
			message: "Marlvin had his ups and downs over the course of the diary series, but finally landed on his feet. He initially worked in a small butchery, but dreamt of becoming a meat supplier, feeding a network of local butcheries. But the butchery closed, and he had to hustle, trading meat out of the back of a van. He nevertheless made connections and was gradually expanding.",
			trigger: '821',
		},
		{
			id: '821',
			hideInput: true,
			delay: 2000,
			message: 'Then he got his biggest break: It entailed a complete change of profession and location, with a job as a shipping clerk in the coastal city of Mombasa, earning far more money than he ever had as a butcher. He now earns the equivalent of $425, the most of all the six people we followed.',
			trigger: '822',
		},
		{
			id: '822',
			hideInput: true,
			delay: 2000,
			message: '“My family is not struggling like it used to,” was his satisfied assessment.',
			trigger: '805',
		},
		{
			id: '830',
			hideInput: true,
			message: "Madina has shrugged off a painful, undiagnosed stomach problem to keep working as a house cleaner. The family’s budget got a substantial boost when their 17-year-old daughter got a job as a waitress in a restaurant near the airport.",
			trigger: '831',
		},
		{
			id: '831',
			hideInput: true,
			delay: 2000,
			message: 'A month later she lost it when the government closed international flights in response to COVID-19. But the setback was temporary. Another daughter, their eldest, also found restaurant work – although earned less.',
			trigger: '832',
		},
		{
			id: '832',
			hideInput: true,
			delay: 2000,
			message: 'The family does reasonably well in comparison to everyone else in the survey, but at the end of the diary series had fallen into debt.',
			trigger: '805',
		},
		{
			id: '840',
			hideInput: true,
			message: 'Aadan and his family have really struggled. The poorest in our survey, they live in a camp for displaced people in Mogadishu, and Aadan doesn’t earn much as a market porter.',
			trigger: '741',
		},
		{
			id: '841',
			hideInput: true,
			delay: 2000,
			message: 'Along with the odd bit of market trading one of his two wives does, his eldest daughter began selling peanuts on the streets, which helped. Then Aadan’s brother got sick and he travelled to Baidoa, a town in the centre of the country, to nurse him.',
			trigger: '842',
		},
		{
			id: '842',
			hideInput: true,
			delay: 2000,
			message: 'He was away for three months, and the family had to manage as best they could without his salary. When Aadan got back to Mogadishu he was able to pick up work again, but the impact of COVID-19 has meant a worrying economic decline, which is affecting business in the market.',
			trigger: '805',
		},
		{
			id: '850',
			hideInput: true,
			message: 'Ganda is an angry man. He should be heading to a comfortable retirement but instead is struggling to find part-time work as a forklift operator – although when he does work, he earns relatively well compared to our other families.',
			trigger: '851',
		},
		{
			id: '851',
			hideInput: true,
			delay: 2000,
			message: "But he’s had to make a string of difficult decisions. First, the boarding school his straight-A daughter attended hiked their fees and he had to send her to a cheaper, day school, where standards are lower.",
			trigger: '852',
		},
		{
			id: '852',
			hideInput: true,
			delay: 2000,
			message: 'Then, when the time came to enroll his son into secondary school – he passed his entrance exams with flying colours – his hours were cut at work. Unable to afford the fees, he pulled his son out of school entirely – and Ganda had seen him as the future hope for the family. To save money, Ganda moved to his rural home in Wedza. Just when things were at their bleakest, Ganda got a new job in Harare, but because of the lockdown, his start date has been delayed.',
			trigger: '805',
		},
		{
			id: '860',
			hideInput: true,
			message: 'Bringing up two teenage sons as a widow hasn’t been easy for Loveness – but she has clung on, just about managing to stay afloat. She got a salary raise in January that really helped, although the increase was partially swallowed by Zimbabwe’s sky-high inflation rate.',
			trigger: '861',
		},
		{
			id: '861',
			hideInput: true,
			delay: 2000,
			message: 'There was relief when the rains came at the beginning of the year, boosting her wilting maize, although she couldn’t afford fertiliser to maximize the crop yield. She planted every inch of available space in her yard in Seke, about 50 kilometres from Harare, and hopes to cover at least half her food needs.',
			trigger: '862',
		},
		{
			id: '862',
			hideInput: true,
			delay: 2000,
			message: 'But Loveness worries about the future. Her deepest fear is that the local solar power company where she works can’t stay open through Zimbabwe’s economic crisis and she loses her job. She doesn’t have a Plan B.',
			trigger: '805',
		},*/
		{
			id: '900',
			hideInput: true,
			message: "Africa was among the last regions of the world to be affected by the coronavirus – which gave governments a little extra time to prepare. When the first imported cases began to appear, governments responded with lockdowns, which included business closures, curfews, and travel restrictions. The impact has been disproportionately felt by the urban poor working in the informal economy. But in terms of actual COVID-19 infection, Africa’s coronavirus cases have been relatively few so far.",
			trigger: '901',
		},
		{
			id: '901',
			hideInput: true,
			options: [
				{ value: 1, label: '🇰🇪 How did COVID-19 affect Benjamin and Marlvin in Kenya?',
					trigger: (({steps}) => triggerAndTrack('910', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 2, label: '🇸🇴 How did COVID-19 affect Aadan and Madina in Somalia?',
					trigger: (({steps}) => triggerAndTrack('920', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 3, label: '🇿🇼 How did COVID-19 affect Ganda and Loveness in Zimbabwe?',
					trigger: (({steps}) => triggerAndTrack('930', steps)),
					metadata: {type: 'userClick'}
				},
			],
		},
		{
			id: '910',
			hideInput: true,
			message: 'The economic slowdown as a result of COVID-19 hurt Benjamin’s business. It also led to the cancellation of the April livestock auction in Isiolo, northern Kenya, where he had hoped to sell some of his animals. Marlvin also felt the impact of the coronavirus. In March, he started a new job as a shipping clerk in Mombasa, but the downturn in international trade means he now works only a few days a week.',
			trigger: '911',
		},
		{
			id: '911',
			hideInput: true,
			component: (
				<RichText
					text={'<p>For more from Benjamin and Marlvin, check out <a href="https://www.thenewhumanitarian.org/special-report/2020/10/14/drought-diaries-coronavirus-covid-19" target="_blank">Drought Diaries: The Covid-19 edition</a></p>'}
				/>
			),
			trigger: '950',
		},
		{
			id: '920',
			hideInput: true,
			message: 'Aadan works as a market porter, but the drop in trade has reduced the amount of work he can find. Meanwhile, a government-imposed evening curfew cut the hours Madina’s daughter, Asli Isaac, could work as a waitress. Her income was a big help to the family budget.',
			trigger: '921',
		},
		{
			id: '921',
			hideInput: true,
			component: (
				<RichText
					text={'<p>For more from Aadan and Madina, check out <a href="https://www.thenewhumanitarian.org/special-report/2020/10/14/drought-diaries-coronavirus-covid-19" target="_blank">Drought Diaries: The Covid-19 edition</a></p>'}
				/>
			),
			trigger: '950',
		},
		{
			id: '930',
			hideInput: true,
			message: 'Ganda and Loveness have both struggled with the economic impact of the lockdown. It got so bad that Ganda left Harare and headed to his rural home in Wedza, 130 kilometres south of the city, where life is cheaper. The government tried to impose a price freeze, but with shop owners increasingly diverting goods to the more expensive black market, Loveness complained that even basics are still unaffordable.',
			trigger: '931',
		},
		{
			id: '931',
			hideInput: true,
			component: (
				<RichText
					text={'<p>For more from Ganda and Loveness, check out <a href="https://www.thenewhumanitarian.org/special-report/2020/10/14/drought-diaries-coronavirus-covid-19" target="_blank">Drought Diaries: The Covid-19 edition</a></p>'}
				/>
			),
			trigger: '950',
		},
		{
			id: '950',
			hideInput: true,
			options: [
				{ value: 1, label: '🔙 Read about the other countries',
					trigger: (({steps}) => triggerAndTrack('901', steps)),
					metadata: {type: 'userClick'}
				},
				{ value: 3, label: '❓ What else can you tell me?',
					trigger: (({steps}) => triggerAndTrack('2', steps)),
					metadata: {type: 'userClick'}
				},
			],
		},
		{
			id: '951',
			hideInput: true,
			delay: 50000,
			component: (
				<ImageBubble
					title={'COVID-19 policies not backed by data do more harm than good'}
					photo={'https://assets.irinnews.org/s3fs-public/styles/responsive_large/public/coronavirus-vaccination-data.jpg?.tlmFmdn3RhyKhb4oMcfrcfDdhOYtmMT&itok=mXjHwvfN'}
					credit={'TNH)'}
					link={'https://www.thenewhumanitarian.org/opinion/2020/06/18/COVID-19-policy-data-economy-health'}
				/>
			),
			trigger: '999',
		},
		{
			id: '990',
			hideInput: true,
			message: "No, it’s not likely, but there certainly will be hunger.",
			trigger: '991',
		},
		{
			id: '991',
			hideInput: true,
			delay: 2000,
			component: (
				<RichText
					text={"<p>🇿🇼 In Zimbabwe, an estimated <a href='https://insight.wfp.org/coronavirus-destroys-everything-urban-hunger-grips-zimbabwe-facec41f3ff9' target='_blank'>8.6 million people</a> – 60 percent of the population – will be short of food as a result of the combined effects of drought and economic crisis. That includes 3.3 million people in the cities unable to afford all their food needs. Good rains are forecast from October, but the food crisis is <a href='https://reliefweb.int/report/zimbabwe/zimbabwe-key-message-update-relaxation-covid-19-restriction-measures-expected' target='_blank'>expected to last into 2021</a>.</p>"}
				/>
			),
			trigger: '992',
		},
		{
			id: '992',
			hideInput: true,
			delay: 3000,
			component: (
				<RichText
					text={"<p>🇸🇴 In Somalia, flooding has added to the country’s <a href='https://www.unocha.org/somalia' target='_blank'>complex emergency</a> – displacing and further impoverishing people. And with the rains have come <a href='https://reliefweb.int/report/somalia/outbreak-update-cholera-somalia-27-september-2020' target='_blank'>outbreaks of cholera</a>. The spread of <a href='http://www.fao.org/ag/locusts/en/info/info/index.html' target='_blank'>locust swarms</a> south are an additional threat.</p>"}
				/>
			),
			trigger: '993',
		},
		{
			id: '993',
			hideInput: true,
			delay: 6000,
			component: (
				<RichText
					text={"<p>🇰🇪 In Kenya, good rains earlier in the year <a href='https://reliefweb.int/report/kenya/kenya-situation-report-10-sep-2020' target='_blank'>cut the number of people living in poverty</a> in the country’s remote northern regions. However, the rains due to fall from October are projected to be below average. <a href='http://www.fao.org/ag/locusts/en/info/info/index.html' target='_blank'>New locust swarms</a> are expected to arrive in Kenya from November.</p>"}
				/>
			),
			trigger: '999',
		},
		/* ENDING SEQUENCE HERE */
		{
			id: '999',
			hideInput: true,
			delay: 8000,
			message: "Is there anything else you'd like to know more about?",
			trigger: '2'
		},
	]
}

export default data;
