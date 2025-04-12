import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function BreweryStateChart({ data }) {
  const stateCounts = {};

  data.forEach(brewery => {
    if (brewery.state) {
      stateCounts[brewery.state] = (stateCounts[brewery.state] || 0) + 1;
    }
  });

  const chartData = Object.keys(stateCounts).map(state => ({
    name: state,
    value: stateCounts[state]
  }));

  return (
    <BarChart width={500} height={300} data={chartData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
}
