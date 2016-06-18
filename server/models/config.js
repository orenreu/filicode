/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 13/06/2016
 * Time: 17:03
 */


const db = 'filicode'

var config = {
    rethinkdb: {
        host: "localhost",
        port: 28015,
        authKey: "Oren1979",
        db: db
    },
    express: {
        port: 3000
    }
};

module.exports = config;