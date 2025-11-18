import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ScrollableBarChart = () => {

  const {data} = useQuery({
    queryKey:['userchart'],
    queryFn:async function(){
     const data =  await axios.get('https://softechbackend-2.onrender.com/admin/userdata', { withCredentials: true })
     return data
     
    },
    
    

  },
)
  // Aggregate data by country
  const countryMap = {};
  data?.data?.userdata.forEach((user) => {
    const country = user.Country || "Unknown";
    countryMap[country] = (countryMap[country] || 0) + 1;
  });

  const chartData = Object.entries(countryMap).map(([name, value]) => ({
    name,
    value,
  }));
console.log(data?.data?.userdata,'is the data')
  return (
    <div className="w-full overflow-x-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold text-center mb-4">Users by Country</h2>
      <div style={{ width: chartData.length * 50, minWidth: "100%" }}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              interval={0}
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#006DEE" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Usage
const Chart = () => {
  return (
    <div className=" sm:flex sm:flex-col sm:items-center">
      <ScrollableBarChart  />
    </div>
  );
};

export default Chart;
