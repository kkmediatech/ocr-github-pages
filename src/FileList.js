import React, { useEffect, useState } from "react";
import axios from "axios";

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL ของ API
  const apiUrl = "http://z235048-2n17gm.ps04.zwhhosting.com/api-ocr/files";

  useEffect(() => {
    // ดึงข้อมูลจาก API
    const fetchFiles = async () => {
      try {
        const response = await axios.get(apiUrl);
        setFiles(response.data); // ตั้งค่าข้อมูลที่ได้จาก API
      } catch (err) {
        setError(err.message); // จัดการข้อผิดพลาด
      } finally {
        setLoading(false); // หยุดสถานะ loading
      }
    };

    fetchFiles();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>File List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Filename</th>
            <th>Original Name</th>
            <th>Size (KB)</th>
            <th>Upload Date</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td>{file.filename}</td>
              <td>{file.originalName}</td>
              <td>{(file.size / 1024).toFixed(2)}</td>
              <td>{new Date(file.uploadDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;
