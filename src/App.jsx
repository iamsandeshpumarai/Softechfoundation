import AdminDashboard from './components/Admin/AdminDashboard';
import AdminLoginPage from './components/Admin/AdminLoginPage';
import Chart from './components/Admin/Chart';
import Home from './pages/Home';
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserData } from './Dataprovider/ShareData';


const App = () =>{
  const { data } =UserData()
  console.log('Token data in App:', data);

  return (

<HashRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/admin" element={data?.message === "Logged In" ? <Navigate to="/admindashboard" /> : <AdminLoginPage />} />
    <Route path="/admindashboard" element={data?.message === "Logged In" ? <AdminDashboard /> : <Navigate to="/admin" />}>
      <Route path="chart" element={data?.message === "Logged In" ? <Chart /> : <Navigate to="/admin" />} />
    </Route>
  </Routes>
</HashRouter>

  );
};

export default App;