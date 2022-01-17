import React, { useState } from 'react';
import styles from './Refill.module.css';
import TextInput from '../../utilities/textinput/TextInput';
import Link from 'next/link';
import { PaystackButton } from 'react-paystack';
import btnStyle from '../../utilities/button/Button.module.css';
import { useSelector, useDispatch } from 'react-redux';
import paystackRechargeAction from '../../../store/actions/payment/paystackRechargeAction';
import { useRouter } from 'next/router';
import PageCard from './PageCard';
import TextButton from '../../utilities/button/TextButton';
import Row from '../../utilities/container/Row';
import Button from '../../utilities/button/Button';

const Refill = () => {
	const { user } = useSelector(state => state.user);
	const reference = new Date().getTime().toString();
	const dispatch = useDispatch();
	const router = useRouter();

	const [amount, setAmount] = useState();

	const handlePaystackSuccessAction = reference => {
		// Implementation for whatever you want to do with reference and after success call.
		//console.log(reference);
		const refill = {
			amount: parseInt(amount),
			type: 'paystack',
			target: 'self',
			from: reference.reference,
		};
		dispatch(paystackRechargeAction(refill));
		router.replace('/dashboard/info');
	};

	// you can call this function anything
	const handlePaystackCloseAction = () => {
		// implementation for  whatever you want to do when the Paystack dialog closed.
		console.log('closed');
	};
	const componentProps = {
		...{
			reference: new Date().getTime().toString(),
			email: user ? user.email : 'user@getBookAction.com',
			amount: amount * 100,
			publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
		},
		text: (
			<p style={{ letterSpacing: 1, fontWeight: 600, fontSize: 14 }}>
				Continue
			</p>
		),
		onSuccess: reference => handlePaystackSuccessAction(reference),
		onClose: handlePaystackCloseAction,
	};
	return (
		<PageCard>
			<h5>Refill your account</h5>
			<br />
			<TextInput
				label='Enter an amount (NGN)'
				placeholder='example: 2000'
				value={amount}
				onChange={e => setAmount(e)}
				type='Number'
			/>
			<TextInput
				label='Select Payment Gateway'
				placeholder='Gateway(Paystack)'
				disabled
			/>
			{!amount ? (
				<Button disabled>Continue</Button>
			) : (
				<PaystackButton className={btnStyle.button} {...componentProps} />
			)}

			<br />
			<h5>Alternate Methods</h5>
			<Row style={{ marginTop: 8 }}>
				<Link href='/banktransfer'>
					<TextButton bg>Use Bank Transfer</TextButton>
				</Link>
				<Link href='/airtime'>
					<TextButton bg>Pay With Airtime </TextButton>
				</Link>
			</Row>
		</PageCard>
	);
};

export default Refill;
