import React from 'react';
import styles from './Fonts.module.css';

const Fonts = () => {
	return (
		<div>
			<h1>Registers</h1>
			<h2>Registers</h2>
			<h3>Register</h3>
			<h4>Register</h4>
			<h5>Register</h5>
			<h6>Register</h6>
			<p>Register</p>
			<div className={styles.cInput}>
				<label>label</label>
				<input
					type='text'
					placeholder='placeholder'
					//value='value'
					//onChange={e => onChange(e.target.value)}
				/>
			</div>
		</div>
	);
};

export default Fonts;
