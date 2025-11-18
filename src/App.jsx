import AdminDashboard from './components/Admin/AdminDashboard';
import AdminLoginPage from './components/Admin/AdminLoginPage';
import Chart from './components/Admin/Chart';
import Home from './pages/Home';
import { HashRouter, Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { UserData } from './Dataprovider/ShareData';
import EditPanel from './components/Admin/EditPanel.jsx';


const App = () =>{
  const { data ="Logged In" } =UserData()
  console.log('Token data in App:', data);

  return (


 <HashRouter>   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/admin" element={data?.message === "Logged In" ? <Navigate to="/admindashboard" /> : <AdminLoginPage />} />
    <Route path="/admin" element={<Navigate to="/admindashboard" />}  />

    <Route path="/admindashboard" element={data?.message === "Logged In" ? <AdminDashboard /> : <Navigate to="/admin" />}>

      <Route path="chart" element={data?.message === "Logged In" ? <Chart /> : <Navigate to="/admin" />} />

      <Route path="EditPanel" element={<EditPanel />} />
      
    </Route>
  </Routes>
</HashRouter>



  );
};

export default App;