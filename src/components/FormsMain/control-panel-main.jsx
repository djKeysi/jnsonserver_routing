import { MDBBtn } from 'mdb-react-ui-kit';
import styles from './control-panel-main.module.css';

export const ControlPanelMain = ({
	handleMain,
	valueMain,
	handleReset,
	setValueMain,
	flagButton = true,
	placeholders,
	childrens,
	childrenFlag,
}) => (
	<form
		style={{
			margin: 'auto',
			padding: '15px',
			maxWidth: '1000px',
			alignContent: 'center',
		}}
		className="d-flex input-group w-auto"
		onSubmit={handleMain}
	>
		<input
			type="text"
			className="form-control"
			placeholder={placeholders}
			value={valueMain}
			onChange={(e) => {
				setValueMain(e.target.value);
			}}
		/>

		<MDBBtn type="submit" color="dark">
			{childrens}
		</MDBBtn>
		{flagButton && (
			<MDBBtn className="mx-2" color="info" onClick={() => handleReset()}>
				{childrenFlag}
			</MDBBtn>
		)}
	</form>
);
