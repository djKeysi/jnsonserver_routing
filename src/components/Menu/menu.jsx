import { MDBNavbar, MDBContainer } from 'mdb-react-ui-kit';
import { ExtendedLink } from './extended_link';

export const Menu = () => (
	<MDBNavbar light bgColor="dark">
		<MDBContainer fluid>
			<ul className="navbar-nav me-auto mb-3 mb-lg-2" style={{ color: 'white' }}>
				<ExtendedLink to="/">Главная</ExtendedLink>
				{/* <li>fdfgfg</li> */}
			</ul>
		</MDBContainer>
	</MDBNavbar>
);
