const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: 'mysql-341bc838-project-xiaoxun.c.aivencloud.com',
  port: 26278,
  user: 'avnadmin',
  password: 'AVNS_DWp8brXYdTsWB5Dkwqk',
  database: 'defaultdb',
  ssl: { rejectUnauthorized: true }
});

app.post('/api/insert', (req, res) => {
  const data = req.body;
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const sql = `INSERT INTO lost_found_records 
    (type, item_name, color, brand, mark, location, time, 
     contact_name, contact_student_id, contact_class, contact_phone, 
     item_location_status, register_time, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 'pending')`;
  
  pool.execute(sql, [
    data.type, data.item_name, data.color, data.brand,
    data.mark, data.location, data.time, data.contact_name,
    data.contact_student_id, data.contact_class, data.contact_phone,
    data.item_location_status
  ], (err, result) => {
    if (err) {
      res.json({ success: false, message: err.message });
    } else {
      res.json({ success: true, insert_id: result.insertId });
    }
  });
});

app.listen(3000, () => console.log('API running'));
