import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Program from './pages/Program';
import AdminDashboard from './pages/AdminDashboard';
import Stock from './pages/Stock';
import Users from './pages/AllUser';
import ProfilePage from './pages/ProfilePage';
import ProfileForm from './myComponents/ProfileForm';
import HomePage from './pages/HomePage';
import { AuthContextProvider } from './context/AuthContext';
import RequestPage from './pages/RequestPage';
import Transaction from './pages/Transaction';
import LeaderLayout from './pages/LeaderLayout';
import LeaderProgram from './pages/LeaderProgram';
import LeaderStock from './pages/LeaderStock';
import CitizenLayout from './pages/CitizenLayout';
import CitizenDashboard from './pages/CitizenDashboard';
import CitizensProgramTable from './myComponents/Tables/CitizensProgramTable';
import PendingStockTable from './myComponents/Tables/PendingStockTable';

const routes = [
	{
		path: '/Admin',
		element:<AuthContextProvider><Layout /></AuthContextProvider> ,
		children: [
			{ path: 'Programs/', element: <Program /> },
		    { path: "Dashboard/", element: <AdminDashboard/>},
			{path: "Stocks", element: <Stock/>},
			{path: "Users", element: <Users/>},
			{path: "Programs/:id/Request/", element: <RequestPage/>}
		],
	},
	{
		path: '/Leader',
		element:<AuthContextProvider><LeaderLayout/></AuthContextProvider> ,
		children: [
			{ path: 'Programs/', element: <LeaderProgram/> },
			{path: "Stocks", element: <LeaderStock/>},
			{path: "Programs/:id/Request/", element: <RequestPage/>}
		],
	},
	{
		path: '/Citizens',
		element:<AuthContextProvider><CitizenLayout/></AuthContextProvider> ,
		children: [
			{ path: 'Dashboard', element: <CitizenDashboard /> },
			{ path: 'Programs/', element: <CitizensProgramTable/> },
			{path: "Stocks/", element: <PendingStockTable/>},
		],
	},
	{
		path: '/',
		element: <ProfilePage/>,
		children: [
			{ path: "/", element: <HomePage/>},
			{ path: 'Profile/', element: <AuthContextProvider><ProfileForm /></AuthContextProvider> },
			{ path: "Transactions" , element:<Transaction/>},
		],

	},
];
const router = (
	<BrowserRouter>
		<Routes>
			{routes.map((route) => (
				<Route key={route.path} path={route.path} element={route.element}>
					{route.children.map((child) => (
						<Route key={child.path} path={child.path} element={child.element} />
					))}
				</Route>
			))}
		</Routes>
	</BrowserRouter>
);
const App = () => {
	return router;
};

export default App;
