import React, { useState, useEffect } from "react";
import apiHandler from "../../api/apiHandler";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
const data = [
  {
    name: "Page A",
    uv: 5000,
  },
  {
    name: "Page B",
    uv: 3000,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
  },
  {
    name: "Page E",
    uv: 1890,
  },
  {
    name: "Page F",
    uv: 2390,
  },
  {
    name: "Page G",
    uv: 3490,
  },
];

const ChartPage = () => {
  const [daonhSo, setDoanhSo] = useState();
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [tieuChi, setTieuChi] = useState();

  useEffect(() => {
    (async () => {
        let d = Date;
        d = d.toString();
        console.log(d);
      const res = await apiHandler.get("/order/thongkedoanhso");
      const data = res.data;
      console.log(data);
      const dateFormat = data.map(el => ({name: el._id, uv: el.total}))
      setDoanhSo(dateFormat)
    })();
  }, []);


  return (
    <div>
      <h1>Thong ke doanh so ban hang</h1>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(dateStart, dateEnd, tieuChi);
          }}
        >
          <input
            type="date"
            onChange={(e) => {
              setDateStart(e.target.value);
              console.log(typeof dateStart);
            }}
          />
          <input type="date" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} />
          <select
            defaultValue="day"
            onChange={(e) => setTieuChi(e.target.value)}
          >
            <option value="day">day</option>
            <option value="month">month</option>
            <option value="year">year</option>
          </select>
          <input type="submit" value="submit" />
        </form>
      </div>
      <BarChart
        width={500}
        height={300}
        data={daonhSo}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default ChartPage;
