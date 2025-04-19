import {
	MDBTable,
	MDBTableHead,
	MDBTableBody,
	MDBRow,
	MDBCol,
	MDBContainer,
} from 'mdb-react-ui-kit';
import { ControlPanelMain } from '../FormsMain/control-panel-main';
import { ExtendedLink } from '../Menu/extended_link';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const MainPage = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const [valueSearch, setValueSearch] = useState('');
	const [valueSort, setValueSort] = useState('');

	const [valueAdd, setValueAdd] = useState('');

	const sortOptions = ['title', 'completed'];

	useEffect(() => {
		loadedTodos();
	}, []);

	const loadedTodos = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get('http://localhost:3001/todos');
			setTodos(response.data);
			setIsLoading(false);
		} catch (error) {
			setError(error.message);
		}
	};

	const handleReset = () => {
		loadedTodos();
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const search = todos.filter((todo) =>
				todo.title.toLowerCase().trim().includes(valueSearch.toLowerCase()),
			);
			setValueSearch('');
			setIsLoading(false);
			setTodos(search);
		} catch (error) {
			setError(error.message);
		}

		// setIsLoading(true);
		// e.preventDefault();
		// try {
		// 	const response = await axios.get(
		// 		`http://localhost:3001/todos?q=${valueSearch}`, //не работает поиск почему то
		// 	);
		// 	setTodos(response.data);
		// 	//setValueSearch('');
		// 	setIsLoading(false);
		// } catch (error) {
		// 	setError(error.message);
		// }
	};
	//console.log(todos[0].id);

	const handleSort = async (e) => {
		let valueSorted = e.target.value;
		setValueSort(valueSorted);

		try {
			const response = await axios.get(
				`http://localhost:3001/todos?_sort=${valueSorted}&order=asc`,
			);
			setTodos(response.data);
			//setValueSearch('');
			setIsLoading(false);
		} catch (error) {
			setError(error.message);
		}
	};

	const handleAdd = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await axios.post('http://localhost:3001/todos', {
				title: valueAdd,
			});
			setTodos([...todos, response.data]);
			setIsLoading(false);
		} catch (error) {
			setError(error.message);
		}
		setValueAdd('');
	};

	if (isLoading) {
		return <h1>Loading....</h1>;
	}
	if (error) {
		return <h1>Error:{error}</h1>;
	}
	return (
		<MDBContainer>
			{/* <Menu /> */}

			<ControlPanelMain
				handleMain={handleSearch}
				valueMain={valueSearch}
				setValueMain={setValueSearch}
				handleReset={handleReset}
				flagButton={true}
				placeholders="Поиск ..."
				childrens={'Поиск'}
				childrenFlag={'Сброс'}
			/>

			<ControlPanelMain
				handleMain={handleAdd}
				valueMain={valueAdd}
				setValueMain={setValueAdd}
				flagButton={false}
				placeholders="Введите название дела ..."
				childrens={'Добавить'}
			/>

			<div style={{ marginTop: '100px' }}>
				<h2 className="text-center">Список дел</h2>
				<MDBRow>
					<MDBCol size="12">
						<MDBTable>
							<MDBTableHead dark>
								<tr>
									<th scope="col">№</th>
									<th scope="col">Дело</th>
									{/* <th scope="col">Выполнение</th> */}
								</tr>
							</MDBTableHead>
							{todos.length === 0 ? (
								<MDBTableBody className="align-center mb-0">
									<tr>
										<td colSpan={8} className="text-center mb-0">
											Нет данных
										</td>
									</tr>
								</MDBTableBody>
							) : (
								todos.map((item, index) => (
									<MDBTableBody key={index}>
										<tr>
											<th scope="row">{index + 1}</th>
											<td>
												<ExtendedLink to={`task/${item.id}`}>
													{item.title}
												</ExtendedLink>
											</td>

											{/* <td>
												<input
													type="checkbox"
													checked={item.completed}
												/>
											</td> */}
										</tr>
										{/* <Outlet /> */}
									</MDBTableBody>
								))
							)}
						</MDBTable>
					</MDBCol>
				</MDBRow>
			</div>
			<MDBRow>
				<MDBCol size="8">
					<h5>Сортировка:</h5>
					<select
						style={{ width: '50%', borderRadius: '2px', height: '35px' }}
						onChange={handleSort}
						value={valueSort}
					>
						<option>Выберите по чему сортировать:</option>
						{sortOptions.map((item, index) => (
							<option key={index} value={item}>
								{item === 'title' ? 'Дело' : 'Отменить сортировку'}
							</option>
						))}
					</select>
				</MDBCol>
				{/* <MDBCol size="4">
					<h5>Выполнение</h5>
				</MDBCol> */}
			</MDBRow>
		</MDBContainer>
	);
};
