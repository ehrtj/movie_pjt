const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors())

app.use(express.json());

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

// 영화 상세정보를 가져오는 API
// 영화 상세정보를 가져오는 API
app.get('/movie-detail/:movieId', (req, res) => {
    const movieId = req.params.movieId;
    
    const query = 'SELECT * FROM movies WHERE id = ?';
    db.query(query, [movieId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('영화 정보를 가져오는 데 실패했습니다.');
        }
        if (result.length === 0) {
            return res.status(404).send('영화를 찾을 수 없습니다.');
        }
        res.json(result[0]);  // 영화 상세 정보를 응답
    });
});


app.get('/movie-detail/:movieId', (req, res) => {
    // 오류 발생: movies가 정의되지 않음
    res.json(movies);  // movies 변수가 정의되지 않아서 오류 발생
});



// Express에서 정적 파일을 제공하는 코드
app.use(express.static('public'));  // 'public' 폴더 내의 파일 제공




db.connect((err) => {
    if (err) {
      console.error('DB 연결 실패!');
      if (err.code === 'ECONNREFUSED') {
        console.error('MySQL 서버가 실행되고 있는지 확인해주세요. 연결이 거부되었습니다.');
      } else if (err.code === 'ENOTFOUND') {
        console.error('MySQL 서버 주소를 찾을 수 없습니다. 호스트명을 확인해주세요.');
      } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
        console.error('사용자 인증 실패! 사용자명이나 비밀번호를 확인해주세요.');
      } else if (err.code === 'ER_BAD_DB_ERROR') {
        console.error('지정한 데이터베이스가 존재하지 않습니다. 데이터베이스 이름을 확인해주세요.');
      } else {
        console.error(`기타 오류: ${err.message}`);
      }
      return;
    }
    console.log('DB 연결 성공!');
  });
  