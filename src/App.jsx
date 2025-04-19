//json-server -p 3001 --watch ./db.json
//npm i axios mdb-react-ui-kit
//npm i mdb-react-ui-kit --legacy-peer-deps
//npm i axios
//npm install react-router-dom --legacy-peer-deps

import { MainPage, TodosPage } from './components';
import { Navigate, Route, Routes } from 'react-router-dom';

export const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="task/:id" element={<TodosPage />} />

				<Route path="/404" element={<div>404 (страница ненайдена)</div>} />
				<Route path="*" element={<Navigate to="/404" />} />
			</Routes>
			{/* <MainPage
				handleSearch={handleSearch}
				valueSearch={valueSearch}
				setValueSearch={setValueSearch}
				handleReset={handleReset}
				handleAdd={handleAdd}
				valueAdd={valueAdd}
				setValueAdd={setValueAdd}
				todos={todos}
				handleSort={handleSort}
				valueSort={valueSort}
				sortOptions={sortOptions}
			/> */}
			{/* <TodosPage todos={todos} /> */}
		</>
	);
};
