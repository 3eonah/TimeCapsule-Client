// 모듈 가져오기
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
// Express 앱 설정
const app = express();
const port = 3001;

// CORS, express.json() 미들웨어 사용
app.use(cors());
app.use(express.json());

// DB연결
const db = new sqlite3.Database(':memory'); // 메모리에 DB 생성
db.serialize(() => {
  // 더미 테이블 생성
  db.run(
    'CREATE TABLE data (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)'
  );

  // 유저 테이블
  db.run(
    `CREATE TABLE user (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      name TEXT
    `
  );

  // 캡슐 테이블
  db.run(`CREATE TABLE capsules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    writer TEXT,
    writtendate TEXT,
    arrivaldate TEXT,
    music TEXT.
    theme TEXT,
    isChecked INTEGER,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES user(id)
  )`);

  // 카드 테이블
  db.run(`CREATE TABLE cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT,

  )`);
});

// API 정의
app.get('/api/data', (req, res) => {
  db.all('SELECT * FROM data', (err, rows) => {
    if (err) {
      console.error('데이터 조회 오류', err);
      res.status(500).send('서버 에러');
    } else {
      res.json(rows);
    }
  });
});

app.post('/api/data', (req, res) => {
  const newData = req.body;
  db.run(
    'INSERT INTO data (message) VALUES (?)',
    [newData.message],
    function (err) {
      if (err) {
        console.error('데이터 생성 오류', err);
        res.status(500).send('서버 에러');
      } else {
        res.json({ id: this.lastID, message: newData.message });
      }
    }
  );
});

// 서버 실행
app.listen(port, () => {
  console.log('서버 실행중');

  // 프로그램 종료시 DB 닫음
  process.on('exit', () => {
    db.close();
    console.log('DB closed');
  });
});
