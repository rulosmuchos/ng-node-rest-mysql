const mysql = require('mysql2/promise');/*from 'promise-mysql';*/

import keys from './keys';

const pool = mysql.createPool(keys.database);

// For pool initialization, see above
pool.getConnection(
    function(err, conn) {
      // Don't forget to release the connection when finished!
        var a = pool.releaseConnection(conn);
});


export default pool;
