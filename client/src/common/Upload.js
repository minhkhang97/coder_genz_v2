import axios from "axios";
import { useEffect } from "react";
import { useState, useRef } from "react";
import shortid from "shortid";
import MoonLoader from "react-spinners/MoonLoader";
import { css } from "@emotion/react";

const Upload = ({onChange, value}) => {
  const [files, setFiles] = useState([...value]);
  const [error, setError] = useState(false);
  const [file, setFile] = useState({
    img: {},
    id: shortid.generate(),
  });

  useEffect(() => {
    onChange(files);
  }, [files])

  const overide = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  const [loading, setLoading] = useState(false);

  return (
    <div className="">
      {error && (
        <div className="fixed py-2 px-4 rounded-md bg-red-600 text-white">
          tai anh khong thanh cong{" "}
          <span onClick={() => setError(false)}>x</span>{" "}
        </div>
      )}
      <div className="flex">
        {files.map((el, index) => (
          <div
            key={index}
            className={`group overflow-hidden relative w-20 h-20 bg-white border border-solid p-1 border-indigo-200 rounded-lg`}
          >
            <img src={el.url} alt="shjadgjhas" className="w-20 h-20" />
            <span className="absolute top-0 left-0 flex justify-center bg-gray-900 items-center w-20 h-20 opacity-0 group-hover:opacity-60">
              <i
                className="far fa-trash-alt text-white cursor-pointer"
                onClick={() => {
                  //xoa trong filesprivew va files

                  //xoa files trong files
                  setFiles([...files.filter((file) => file.id !== el.id)]);
                }}
              ></i>
            </span>
          </div>
        ))}
        <div
          htmlFor="1"
          className="overflow-hidden bg-white group hover:border-indigo-700 w-20 h-20 border border-solid border-indigo-200 rounded-lg flex justify-center items-center"
        >
          {!loading ? (
            <label htmlFor="1" className="cursor-pointer">
              <i className="fas fa-plus text-3xl text-indigo-300 group-hover:text-indigo-700"></i>
            </label>
          ) : (
            <div>
              <MoonLoader
                color={'#000000'}
                css={overide}
                loading={loading}
                size={30}
              />
            </div>
          )}
        </div>
      </div>

        <input
          type="file"
          id="1"
          className="invisible"
          onChange={async (e) => {
            setFile({ id: shortid.generate(), img: e.target.files[0] });
            try {
              setLoading(true);
              let formData = new FormData();
              formData.append("photo", e.target.files[0]);
              const res = await axios.post(
                "http://localhost:5000/upload",
                formData,
                {
                  onUploadProgress: (progressEvent) => {
                    console.log(progressEvent);
                  },
                }
              );
              const data = await res.data;
              console.log(data);
              setFiles([...files, { id: shortid.generate(), url: data.url }]);
            } catch (error) {
              //console.log(error);
              setError(true);
              setLoading(false);
              setFile({id: shortid.generate(), img: {}});
            }
            setFile({id: shortid.generate(), img: {}});
            setLoading(false);

            //dispatch o day
          }}
        />
    </div>
  );
};

export default Upload;
