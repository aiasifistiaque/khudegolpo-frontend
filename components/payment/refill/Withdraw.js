import React, { useState } from 'react';
import styles from './Refill.module.css';
import TextInput from '../../utilities/textinput/TextInput';
import LongButton from '../../utilities/button/LongButton';
import ErrorText from '../../utilities/text/ErrorText';
import { useDispatch, useSelector } from 'react-redux';
import createWithdrawAction from '../../../store/actions/payment/createWithdrawAction';
import SuccessText from '../../utilities/text/SuccessText';
import LoadingButton from '../../utilities/button/LoadingButton';
import PageCard from './PageCard';

const Withdraw = () => {
	const [amount, setAmount] = useState();
	const [name, setName] = useState();
	const [account, setAccount] = useState();
	const [bank, setBank] = useState();
	const [branch, setBranch] = useState();
	const [err, setErr] = useState();
	const [submit, setSubmit] = useState(false);

	const dispatch = useDispatch();
	const { error, success, doc, loading } = useSelector(state => state.withdraw);

	const onSubmit = e => {
		setSubmit(true);
		e.preventDefault();
		setErr(false);
		if (amount < 2000) {
			setErr('Minimum amount must be 2000 BDT');
			return;
		}
		const withdraw = { name, amount, account, bank, branch };
		dispatch(createWithdrawAction(withdraw));
		// setAccount();
		// setAmount();
		// setBranch();
		// setBank();
		// setName();
	};

	return (
		<PageCard>
			<h5>Withdraw money</h5>
			<br />
			<form onSubmit={onSubmit}>
				<TextInput
					label='Enter an amount (minimum 2000 BDT)'
					placeholder='2000'
					value={amount}
					onChange={e => setAmount(e)}
					type='number'
					required
					min={2000}
				/>
				<TextInput
					label='Name on Bank Account'
					value={name}
					onChange={e => setName(e)}
					required
				/>
				<TextInput
					label='Account Number'
					value={account}
					onChange={e => setAccount(e)}
					required
				/>
				<TextInput
					label='Bank'
					value={bank}
					onChange={e => setBank(e)}
					required
				/>
				<TextInput
					label='Phone Number (Optional)'
					value={branch}
					onChange={e => setBranch(e)}
					type='number'
				/>

				{submit && success ? (
					<SuccessText>Withdraw request successful</SuccessText>
				) : error ? (
					<ErrorText>{error}</ErrorText>
				) : (
					err && <ErrorText>{err}</ErrorText>
				)}
				{loading ? <LoadingButton /> : <LongButton submit>Confirm</LongButton>}
			</form>
		</PageCard>
	);
};

export default Withdraw;
