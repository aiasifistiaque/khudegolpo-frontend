import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingButton from '../../utilities/button/LoadingButton';
import LongButton from '../../utilities/button/LongButton';
import DangerButton from '../../utilities/button/ButtonOutlinedLongDanger';
import addToLibraryAction from '../../../store/actions/library/addToLibraryAction';
import Alert from '../../alert/Alert';
import { alertOffAction } from '../../../store/actions/util/alertAction';
import Row from '../../utilities/container/Row';

const AddToLibraryButton = ({ id }) => {
	const { loading, found, error } = useSelector(state => state.inLibrary);
	const dispatch = useDispatch();
	const [showAlert, setShowAllert] = useState(false);
	const { alert } = useSelector(state => state.alert);

	useEffect(() => {
		setShowAllert(alert);
	}, [alert]);

	if (error || id == undefined) return null;
	else if (loading) return <LongButton loading noMargin bottomRounded />;
	else if (!loading && found == 1)
		return (
			<>
				<LongButton
					noMargin
					bottomRounded
					danger
					onClick={() => setShowAllert(true)}>
					Remove From Library
				</LongButton>

				<Alert open={showAlert} close={alert}>
					<h5>Are You Sure?</h5>
					<br />
					<Row column>
						<LongButton
							rounded
							onClick={() => {
								dispatch(addToLibraryAction({ book: id, status: 'Removed' }));
								dispatch(alertOffAction());
							}}>
							Confirm
						</LongButton>
						<DangerButton rounded onClick={() => dispatch(alertOffAction())}>
							Cancel
						</DangerButton>
					</Row>
				</Alert>
			</>
		);
	else
		return (
			<>
				<LongButton
					noMargin
					bottomRounded
					onClick={() => {
						//dispatch(alertOnAction());
						dispatch(addToLibraryAction({ book: id }));
					}}>
					Add To Library
				</LongButton>
			</>
		);
};

export default AddToLibraryButton;
