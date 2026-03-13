import mysql from 'mysql2';

export const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'applicant',
    // socketPath: '/var/run/mysqld/mysqld.sock', // force socket, not TCP
});

connection.connect((err) => {
    if (err) {
        console.error('DB connection failed:', err.message);
        return;
    }
    console.log('Connected to MySQL');
});

// export const getPageData = (callback) => {
//     connection.query(
//         'SELECT * FROM applicants ORDER BY id DESC LIMIT 2',
//         (err, results) => {
//             if (err) return console.error(err);

//             const lastSeenValue = results[results.length - 1].id;
//             console.log('cursor for next page:', lastSeenValue);

//             // next page query using cursor
//             connection.query(
//                 'SELECT * FROM applicants WHERE id < ? ORDER BY id DESC LIMIT 2',
//                 [lastSeenValue],
//                 (err, nextResults) => {
//                     if (err) return console.error(err);

//                     callback(null, {
//                         firstPage: results,
//                         nextPage: nextResults,
//                         cursor: lastSeenValue
//                     });
//                 }
//             );
//         },
//     );
// };

export const getPageData = (params, callback) => {
    const { page, rowsPerPage, sortMode, orderBy, offset } = params;

    connection.query(
        `SELECT * FROM applicants ORDER BY ${orderBy} ${sortMode} LIMIT ? OFFSET ?`,
        [rowsPerPage, offset],
        (err, results) => {
            if (err) return callback(err);

            callback(null, results);
        },
    );
};

export const getApplicantCount = (callback) => {
    connection.query('SELECT count(*) AS total FROM applicants', 
        (err, results) => {
            if (err) return callback(err);

            callback(null, results[0].total);
            // return results
        }
    );
};
