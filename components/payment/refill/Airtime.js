import React, { useState } from 'react';
import styles from './Refill.module.css';
import TextInput from '../../utilities/textinput/TextInput';
import Caption from '../../utilities/text/Caption';
import { useDispatch, useSelector } from 'react-redux';
import paystackRechargeAction from '../../../store/actions/payment/paystackRechargeAction';
import LoadingButton from '../../utilities/button/LoadingButton';
import LongButton from '../../utilities/button/LongButton';
import SuccessText from '../../utilities/text/SuccessText';
import PageCard from './PageCard';
import Select from '../../utilities/textinput/Select';
import { colors } from '../../../constants/styles';

const Airtime = () => {
	const dispatch = useDispatch();
	const { success, loading, error } = useSelector(state => state.refill);

	const networkData = ['MTN', 'AIRTEL', 'GLO', '9MOBILE'];

	const [amount, setAmount] = useState();
	const [target, setTarget] = useState();
	const [fromBank, setFromBank] = useState();
	const [submit, setSubmit] = useState(false);
	const [network, setNetwork] = useState(networkData[0]);

	const submitForm = e => {
		e.preventDefault();

		const refill = {
			amount,
			target: network,
			type: 'airtime',
			from: fromBank,
		};
		dispatch(paystackRechargeAction(refill));
		setSubmit(true);
		setAmount('');
		setFromBank('');
	};

	return (
		<PageCard>
			<h5>Airtime Transfer</h5>

			<p style={{ margin: '.25rem 0', fontSize: 14, color: colors.primary }}>
				Rate Charge{`'`}s Apply for Airtime transaction, please contact us to
				know rates for your network provider, <br />
				WhatsApp: 09031774742.
			</p>

			<form onSubmit={submitForm} style={{ margin: '1rem 0' }}>
				<Select
					label='Select Network'
					value={network}
					onChange={e => setNetwork(e)}
					data={['MTN', 'AIRTEL', 'GLO', '9MOBILE']}
				/>
				<AirtimeTransfer network={network} />
				<TextInput
					label='Transferred Amount (min: 100NGN)'
					placeholder='Example: 2000'
					value={amount}
					onChange={e => setAmount(e)}
					required
					type='number'
					min={100}
				/>
				<TextInput
					label='What Number are you transferring from'
					value={fromBank}
					onChange={e => setFromBank(e)}
					required
				/>
				{submit && !loading && success && (
					<SuccessText>Request successfully sent</SuccessText>
				)}
				{loading ? <LoadingButton /> : <LongButton submit>Submit</LongButton>}
			</form>
			<br />

			<Caption>By proceeding, you certify that you have made transfer</Caption>
		</PageCard>
	);
};

const AirtimeTransfer = ({ network }) => {
	if (network == 'MTN')
		return (
			<Details network={network} no='09031774742'>
				*600*09031774742*Amount*PIN#
			</Details>
		);
	if (network == 'AIRTEL')
		return (
			<Details network={network} no='09011728434'>
				*432*09011728434*Amount#
			</Details>
		);
	if (network == 'GLO')
		return (
			<Details network={network} no='09153734925'>
				*131*09153734925*Amount*PIN#
			</Details>
		);
	if (network == '9MOBILE')
		return (
			<Details network={network} no='09096489647'>
				*223*PIN*Amount*09096489647#
			</Details>
		);
	return null;
};

const Details = ({ children, network, no }) => {
	return (
		<div className={styles.airtimeDetails}>
			<p>
				{network} Transfer to {no}
			</p>
			<p>How to transfer?</p>
			<h6>Dial {children}</h6>
		</div>
	);
};

export default Airtime;
