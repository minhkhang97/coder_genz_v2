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

const ChartPage = () => {
  const [daonhSo, setDoanhSo] = useState();
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [tieuChi, setTieuChi] = useState();

  const [slsp, setSlsp] = useState([]);
  const [dateStart2, setDateStart2] = useState();
  const [dateEnd2, setDateEnd2] = useState();
  const [tieuChi2, setTieuChi2] = useState();

  useEffect(() => {
    (async () => {
      let d = new Date(Date.now());
      const dt = new Date(Date.now());
      d = d.toISOString().split("T")[0];
      let temp1 = dt.setDate(dt.getDate() - 10);
      console.log(temp1);
      //setDateEnd(d);

      //const dateFormat = data.map(el => ({name: el._id, uv: el.total}))
      //setDoanhSo(dateFormat)
    })();
  }, []);

  return (
    <div>
      <div>
        <h2>Thong ke doanh so ban hang</h2>
        <div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              console.log(dateStart, dateEnd, tieuChi);
              const res = await apiHandler.post("/order/thongkedoanhso", {
                start: dateStart,
                end: dateEnd,
                type: tieuChi,
              });
              const data = res.data;
              console.log(data);
              let dataFormat = data.map((el) => ({
                name: el._id,
                uv: el.total,
              }));
              setDoanhSo(dataFormat);
            }}
          >
            <input
              type="date"
              onChange={(e) => {
                setDateStart(e.target.value);
                console.log(typeof dateStart);
              }}
            />
            <input
              type="date"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
            />
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

      <div>
        <h2>Thống kê số lượng sản phẩm </h2>
        <div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const res = await apiHandler.post("/order/thongkesanpham", {
                start: dateStart2,
                end: dateEnd2,
                type: tieuChi2,
              });
              const data = res.data;
              console.log(data);
              let result = [];
              data.forEach((element) => {
                let temp = {};
                temp.name = element.date;
                element.value.forEach((el) => {
                  temp[el.product.name] = el.totalQuantity;
                });

                result = [...result, temp];
              });
              console.log(result);
              setSlsp(data);
            }}
          >
            <input
              type="date"
              onChange={(e) => {
                setDateStart2(e.target.value);
                console.log(typeof dateStart);
              }}
            />
            <input type="date" onChange={(e) => setDateEnd2(e.target.value)} />
            <select
              defaultValue="day"
              onChange={(e) => setTieuChi2(e.target.value)}
            >
              <option value="day">day</option>
              <option value="month">month</option>
              <option value="year">year</option>
            </select>
            <input type="submit" value="submit" />
          </form>
        </div>
        <div>
          {slsp.map((el, index) => (
            <div key={index} className="my-2">
              <p className="uppercase font-medium">{el.date}</p>
              <div className="flex font-medium uppercase bg-white rounded-md px-2 py-1 shadow-md my-2">
                <p className="w-1/2">tên sản phẩm</p>
                <p className="w-1/2">số lượng bán</p>
              </div>
              <div className="bg-white rounded-md shadow-md capitalize">
                {el.value.map((el2, index2) => (
                  <div
                    key={index2}
                    className="flex px-2 py-1"
                  >
                    <p className="w-1/2">{el2.product.name}</p>
                    <p className="w-1/2 font-semibold">{el2.totalQuantity}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
