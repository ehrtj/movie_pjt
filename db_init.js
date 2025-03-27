const sqlite3 = require('sqlite3').verbose();
const xlsx = require('xlsx');
const fs = require('fs');

// 엑셀 파일 로드
const workbook = xlsx.readFile('movies.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet);

// SQLite 데이터베이스 연결
const db = new sqlite3.Database('movies.db', (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// 테이블 생성
const createTableQuery = `
CREATE TABLE IF NOT EXISTS movies (
    ID INTEGER PRIMARY KEY,
    Title TEXT,
    Original_Title TEXT,
    Overview TEXT,
    Release_Date TEXT,
    Poster_Path TEXT,
    Backdrop_Path TEXT,
    Popularity REAL,
    Vote_Average REAL,
    Vote_Count INTEGER
);`;

db.run(createTableQuery, (err) => {
    if (err) {
        console.error('Error creating table:', err.message);
    } else {
        console.log('Movies table created or already exists.');
    }

    // 데이터 삽입
    const insertQuery = `INSERT INTO movies (ID, Title, Original_Title, Overview, Release_Date, Poster_Path, Backdrop_Path, Popularity, Vote_Average, Vote_Count)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    data.forEach((row) => {
        db.run(insertQuery, [
            row.ID,
            row.Title,
            row['Original Title'],
            row.Overview,
            row['Release Date'],
            row['Poster Path'],
            row['Backdrop Path'],
            row.Popularity,
            row['Vote Average'],
            row['Vote Count']
        ], (err) => {
            if (err) {
                console.error('Error inserting data:', err.message);
            } else {
                console.log(`Inserted movie: ${row.Title}`);
            }
        });
    });

    // 데이터베이스 닫기
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
    });
});


