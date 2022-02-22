import React, { useState } from 'react';
import styles from './Refill.module.css';
import TextInput from '../../utilities/textinput/TextInput';
import Caption from '../../utilities/text/Caption';
import { useDispatch, useSelector } from 'react-redux';
import paystackRechargeAction from '../../../store/actions/payment/paystackRechargeAction';
import LoadingButton from '../../utilities/button/LoadingButton';
import LongButton from '../../utilities/button/LongButton';

const BankTransfer = () => {
	const dispatch = useDispatch();
	const { success, loading, error } = useSelector(state => state.refill);

	const [amount, setAmount] = useState();
	const [name, setName] = useState();
	const [target, setTarget] = useState();
	const [fromBank, setFromBank] = useState();
	const [transferDate, setTransferDate] = useState();
	const [submit, setSubmit] = useState(false);

	const submitForm = e => {
		e.preventDefault();

		const refill = {
			amount,
			name,
			target,
			type: 'bank',
			from: fromBank,
			date: transferDate,
		};
		dispatch(paystackRechargeAction(refill));
		setSubmit(true);
		setAmount();
		setName();
		setTarget();
		setFromBank();
		setTransferDate();
	};

	return (
		<div className={styles.layout}>
			<div className={styles.card}>
				<h5>Bank Transfer</h5>
				<p style={{ margin: '1rem 0' }}>
					Pay into{' '}
					<strong>Zenith Bank, 1220077999, Khudegolpo PUBLISHERS</strong> then
					fill the form below. Please include your username in the narration.
					<br />
					for assistance call 09031774742
				</p>
				<form onSubmit={submitForm}>
					<TextInput
						label='Amount Paid (min: 100BDT)'
						placeholder='Example: 2000 BDT'
						value={amount}
						onChange={e => setAmount(e)}
						required
						type='number'
						min={100}
					/>
					<TextInput
						label='Name used for transfer/deposit'
						value={name}
						onChange={e => setName(e)}
						required
					/>
					<TextInput
						label='Transferred Time'
						value={fromBank}
						onChange={e => setFromBank(e)}
						required
					/>
					<TextInput
						label='Name of Bank'
						value={target}
						onChange={e => setTarget(e)}
						required
					/>
					<TextInput
						label='Date of deposit'
						transferDate={transferDate}
						onChange={e => setTransferDate(e)}
						required
					/>
					{loading ? <LoadingButton /> : <LongButton submit>Submit</LongButton>}
				</form>
				<br />
				{submit && !loading && success && <h5>Request successfully sent</h5>}
				<Caption>
					By proceeding, you certify that you have made the bank transfer
				</Caption>
			</div>
		</div>
	);
};

export default BankTransfer;
