import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function BreweryTypeChart({ data }) {
  const typeCounts = {};

  data.forEach(brewery => {
    typeCounts[brewery.brewery_type] = (typeCounts[brewery.brewery_type] || 0) + 1;
  });

  const chartData = Object.keys(typeCounts).map(type => ({
    name: type,
    value: typeCounts[type]
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill="#82ca9d" />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
