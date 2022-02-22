import React, { useState, useEffect } from 'react';
import styles from './LockedChapter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import LoadingInnerPage from '../../utilities/page/LoadingInnerPage';
import Alert from '../../alert/Alert';
import LongButton from '../../utilities/button/LongButton';
import LoadingButton from '../../utilities/button/LoadingButton';
import DangerButton from '../../utilities/button/ButtonOutlinedLongDanger';
import { alertOffAction } from '../../../store/actions/util/alertAction';
import LockedBookInfo from './LockedBookInfo';
import unlockChapterAction from '../../../store/actions/unlock/unlockChapterAction';
import ErrorText from '../../utilities/text/ErrorText';

const LockedChapter = () => {
	const { chapter, loading, error } = useSelector(state => state.chapter);
	const [showAlert, setShowAlert] = useState(false);
	const dispatch = useDispatch();
	const { alert } = useSelector(state => state.alert);
	const unlock = useSelector(state => state.unlock);
	const [restart, setRestart] = useState(true);

	useEffect(() => {
		setShowAlert(alert);
		if (!alert) {
			setRestart(true);
		}
	}, [alert]);

	if (loading) return <LoadingInnerPage />;
	else
		return (
			<>
				<LockedBookInfo
					chapter={chapter}
					onAlertClick={() => setShowAlert(true)}
					unlock={unlock}
				/>

				<Alert open={showAlert} close={alert}>
					<Details chapter={chapter} />
					<h5>Confirm unlock?</h5>
					{unlock.loading ? (
						<LoadingButton />
					) : unlock.error && !restart ? (
						<>
							<ErrorText>{unlock.error}</ErrorText>
							<DangerButton
								onClick={() => {
									dispatch(alertOffAction());
									setShowAlert(false);
									setRestart(true);
								}}>
								Close
							</DangerButton>
						</>
					) : (
						<>
							<LongButton
								rounded
								onClick={() => {
									setRestart(false);
									dispatch(unlockChapterAction(chapter._id));
								}}>
								Confirm
							</LongButton>
							<DangerButton
								rounded
								onClick={() => {
									dispatch(alertOffAction());
									setShowAlert(false);
									setRestart(true);
								}}>
								Cancel
							</DangerButton>
						</>
					)}
				</Alert>
			</>
		);
};

const Details = ({ chapter }) => {
	return (
		<div className={styles.alertInfo}>
			<h5>{chapter.book.title}</h5>
			<p>Chpater: {chapter.title}</p>
			<h6>Price: {chapter.price} BDT</h6>
		</div>
	);
};

export default LockedChapter;
