import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Menu } from '../Menu/menu';
import {
	MDBTable,
	MDBTableHead,
	MDBTableBody,
	MDBRow,
	MDBCol,
	MDBContainer,
	MDBBtn,
} from 'mdb-react-ui-kit';
import { ControlPanelMain } from '../FormsMain/control-panel-main';

export const TodosPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	//const todo = todos.find((todo) => todo.id === Number(id));

	//console.log(todo);

	const [todos, setTodos] = useState([]);
	const [edit, setEdit] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		loadedTodos();
	}, []);

	const loadedTodos = async () => {
		setIsLoading(true);
		try {
			if (id !== undefined) {
				const response = await axios.get(`http://localhost:3001/todos/${id}`);
				setTodos(response.data);
			}

			setIsLoading(false);
		} catch (error) {
			setError(error.message);
		}
	};
	// // const todo = todos.find((todo) => todo.id === Number(id));
	// // console.log(todo);
	const handleDelete = async () => {
		setIsLoading(true);
		try {
			await axios.delete(`http://localhost:3001/todos/${id}`);
			setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
			setIsLoading(false);
			navigate('/');
		} catch (error) {
			setError(error.message);
		}
	};

	const handleBack = async () => {
		navigate(-1);
	};
	const handleEdit = async () => {
		//e.preventDefault();
		try {
			await axios.patch(`http://localhost:3001/todos/${id}`, {
				title: edit,
			});

			setTodos((prevTodos) =>
				prevTodos.map((todo) =>
					todo.id === id ? { ...todo, title: edit } : todo,
				),
			);
			//loadedTodos();
			// navigate(`http://localhost:3001/todos/${id}`);
		} catch (error) {
			setError(error.message);
		}
	};
	if (isLoading) {
		return <h1>Loading....</h1>;
	}
	if (error) {
		return <h1>Error:{error}</h1>;
	}

	return (
		<>
			<MDBContainer>
				<Menu />
				<div style={{ marginTop: '100px' }}>
					<h2 className="text-center">Список дел</h2>

					<MDBRow>
						<MDBCol size="12">
							<MDBTable>
								<MDBTableHead dark>
									<tr>
										<th scope="col" className="text-center">
											Дело уголовное или административное решать
											тебе))
										</th>
										{/* <th scope="col">Выполнение</th> */}
									</tr>
								</MDBTableHead>

								<MDBTableBody className="align-center mb-0">
									<tr>
										<td colSpan={8} className="text-center mb-0">
											{todos.title}
											<ControlPanelMain
												handleMain={handleEdit}
												valueMain={edit}
												setValueMain={setEdit}
												handleReset={handleDelete}
												flagButton={true}
												placeholders={todos.title}
												childrens={'Редактировать'}
												childrenFlag={'Удалить'}
											/>
										</td>
									</tr>
									<tr>
										<td>
											{' '}
											<MDBBtn
												className="mx-2"
												color="secondary"
												onClick={handleBack}
											>
												Назад
											</MDBBtn>
										</td>
									</tr>
								</MDBTableBody>
							</MDBTable>
						</MDBCol>
					</MDBRow>
				</div>
			</MDBContainer>
		</>
	);
};
