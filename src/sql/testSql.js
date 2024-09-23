
import initSqlJs  from 'sql.js';
// or if you are in a browser:
// const initSqlJs = window.initSqlJs;
import sqliteUrl from "../assets/sql-wasm.wasm?url"

const SQL = await initSqlJs({
  // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
  // You can omit locateFile completely when running in node
  locateFile: ()=> sqliteUrl
});

// Create a database
const db = new SQL.Database();
// NOTE: You can also use new SQL.Database(data) where
// data is an Uint8Array representing an SQLite database file


// Execute a single SQL string that contains multiple statements
let sqlstr = "CREATE TABLE hello (a int, b char); \
INSERT INTO hello VALUES (0, 'hello'); \
INSERT INTO hello VALUES (1, 'world');";

db.exec(sqlstr);
console.log(db.exec("SELECT * FROM hello"));
