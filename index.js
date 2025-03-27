const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors())

const sqlite3 = require('sqlite3').verbose();


app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});



const db = new sqlite3.Database('movies.db', (err) => {
    if (err) {
        console.error('❌ Database connection error:', err.message);
    } else {
        console.log('✅ Connected to SQLite database.');
    }
});

//영화목록

app.get('/movies', (req, res) => {
    const query = "SELECT ID, Title, Poster_Path, Vote_Average FROM movies";
    console.log(" Executing query:", query); // 쿼리 실행 로그 추가

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(" Database error:", err.message); // 에러 로그 추가
            res.status(500).json({ error: err.message });
            return;
        }
        console.log(" Query result:", rows); // 결과 로그 추가
        res.json(rows);
    });
});






//영화 상세글
//대충 다 보여주면 될듯듯