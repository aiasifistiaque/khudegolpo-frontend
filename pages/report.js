import React, { useEffect, useState } from 'react';
import Page from '../components/utilities/page/Page';
import PageCard from '../components/payment/refill/PageCard';
import { useRouter } from 'next/router';
import TextInput from '../components/utilities/textinput/TextInput';
import TextBox from '../components/utilities/textinput/TextBox';
import LoadingButton from '../components/utilities/button/LoadingButton';
import LongButton from '../components/utilities/button/LongButton';
import { useDispatch, useSelector } from 'react-redux';
import { reportAction, reportInitializeAction } from '../store/mix/reportStore';
import ErrorText from '../components/utilities/text/ErrorText';
import SuccessText from '../components/utilities/text/SuccessText';
import TextButton from '../components/utilities/button/TextButton';

const ReportPage = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const { target, type } = router.query;

	const { loading, error, success } = useSelector(state => state.report);

	const [category, setCategory] = useState();
	const [details, setDetails] = useState();

	useEffect(() => {
		dispatch(reportInitializeAction());
	}, []);

	const submitForm = e => {
		e.preventDefault();

		const report = {
			type,
			target,
			category,
			details,
		};
		dispatch(reportAction(report));
	};

	return (
		<Page>
			<PageCard>
				<h5>Report</h5>
				<form onSubmit={submitForm} style={{ margin: '1rem 0' }}>
					<TextInput label='Type' disabled value={type} />
					<TextInput label={`${type} id`} disabled value={target} />
					<TextInput
						label='Subject'
						value={category}
						placeholder='eg. Offensive'
						required
						onChange={e => setCategory(e)}
					/>
					<TextBox
						label='Details'
						value={details}
						required
						onChange={e => setDetails(e)}
					/>
					{success ? (
						<>
							<SuccessText>Report Submitted Successfully</SuccessText>
							<TextButton onClick={() => router.back()}>Go back</TextButton>
						</>
					) : loading ? (
						<LoadingButton />
					) : (
						<LongButton submit>Submit</LongButton>
					)}
				</form>
				{error && <ErrorText>{error}</ErrorText>}
			</PageCard>
		</Page>
	);
};

export default ReportPage;
