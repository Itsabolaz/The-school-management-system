import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = ["#2139DE", "#F22829"];

function CustomLegend(props) {
  const { payload } = props;

  return (
    <ul className="mb-20 flex justify-around text-center">
      {payload.map((entry, index) => (
        <li
          className="flex flex-col"
          key={`item-${index}`}
          style={{
            borderTop: `5px solid ${entry.color}`,
            borderRadius: "2px",
            paddingTop: "8px",
            width: "22%",
          }}
        >
          <span className="my-1 text-sm text-third-gray">{entry.value}</span>
          <span className="font-medium text-black">{entry.payload.value}</span>
        </li>
      ))}
    </ul>
  );
}

function GenderStatsPie({ users, isLoading, userType }) {
  if (isLoading) return null;

  // filter users data and get number of male and female users:
  const numberOfMaleUsers = users.reduce(
    (count, user) => (user.gender === "male" ? count + 1 : count),
    0,
  );
  const numberOfFemaleUsers = users.reduce(
    (count, user) => (user.gender === "female" ? count + 1 : count),
    0,
  );

  const data = [
    { name: "Male", value: numberOfMaleUsers },
    { name: "Female", value: numberOfFemaleUsers },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={800} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy={170}
          innerRadius={userType !== "students" ? 80 : undefined}
          outerRadius={userType !== "students" ? 110 : undefined}
          fill="#8884d8"
          paddingAngle={userType !== "students" ? 2 : undefined}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: "5px" }} />
        <Legend
          content={CustomLegend}
          verticalAlign="bottom"
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default GenderStatsPie;
