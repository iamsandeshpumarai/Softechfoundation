import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Use your dummyUsers array here
const dummyUsers = [
  { FirstName: "John", LastName: "Doe", CompanyName: "TechCorp", BusinessEmail: "john.doe@techcorp.com", Jobtitle: "Developer", PhoneNumber: "+1-202-555-0143", Country: "USA" },
  { FirstName: "Alice", LastName: "Smith", CompanyName: "InnovateX", BusinessEmail: "alice.smith@innovatex.com", Jobtitle: "Manager", PhoneNumber: "+44-20-7946-0011", Country: "UK" },
  { FirstName: "Raj", LastName: "Sharma", CompanyName: "GlobalTech", BusinessEmail: "raj.sharma@globaltech.com", Jobtitle: "Analyst", PhoneNumber: "+91-98765-43210", Country: "India" },
  { FirstName: "Maria", LastName: "Lopez", CompanyName: "SoftSolutions", BusinessEmail: "maria.lopez@softsolutions.com", Jobtitle: "Designer", PhoneNumber: "+34-912-345-678", Country: "Spain" },
  // ...add more or generate 200 entries
];


const ScrollableBarChart = ({ users }) => {
  // Aggregate data by country
  const countryMap = {};
  users.forEach((user) => {
    const country = user.Country || "Unknown";
    countryMap[country] = (countryMap[country] || 0) + 1;
  });

  const chartData = Object.entries(countryMap).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="w-full overflow-x-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold text-center mb-4"></h2>
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
const Card = () => {
  return (
    <div className="md:hidden sm:flex sm:flex-col sm:items-center">
      <ScrollableBarChart users={dummyUsers} />
    </div>
  );
};

export default Card
