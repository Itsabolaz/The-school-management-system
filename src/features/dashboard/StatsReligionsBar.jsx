import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {useStudents} from '../students/useStudents';

const COLORS = ["#4FE397", "#2139DE", "#F22829", "#757576"];

// function CustomTooltip ({ active, payload, label }) {
//   if (active && payload && payload.length) {
//     return (
//       <div className="custom-tooltip">
//         <p className="label">{`${label} : ${payload[0].value}`}</p>
//         {/* <p className="intro">{getIntroOfPage(label)}</p> */}
//         <p className="desc">Anything you want can be displayed here.</p>
//       </div>
//     );
//   }
// }

function StatsReligionsBar() {
  const { students, isLoading } = useStudents();
  
  if(isLoading) return null;

  const religionCounts = students.reduce((acc, student) => {
    acc[student.religion] = (acc[student.religion] || 0) + 1;
    return acc;
  }, {});

  const data = [
    {name: "Islam" , number: religionCounts.islam},
    {name: "Christianity" , number: religionCounts.christianity},
    {name: "Judaism" , number: religionCounts.judaism},
    {name: "Other" , number: religionCounts.other},
  ]


  return (
    <div className="flex justify-center h-full">
      <ResponsiveContainer width="90%" height="80%">
      <BarChart
        width={100}
        height={40}
        data={data}
        barSize={30}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Bar
          dataKey="number"
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip cursor={false}/>
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}

export default StatsReligionsBar;
