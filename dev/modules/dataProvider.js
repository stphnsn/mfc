var mongo = require('mongodb'),
    errors = require('./errors'),
    MongoClient = require('mongodb').MongoClient,
    DB_URL = process.env.DB_URL || 'mongodb://mfc:5iH61C6n313a8uC@ds021979.mlab.com:21979/mfc',
    db,
    DB_TABLE = 'bookings',
    ObjectID = mongo.ObjectID;

exports.connect = function () {
    MongoClient.connect(DB_URL, function (err, database) {
        if (!err) {
            db = database;
            db.on('close', function() {
                if (this._callBackStore) {
                    for(var key in this._callBackStore._notReplied) {
                        this._callHandler(key, null, 'Connection Closed!');
                    }
                }
            });
            console.log('Connected to MongoDB for ' + DB_TABLE);
            db.collection(DB_TABLE, {strict: true}, function (err, collection) {
                if (err) {
                    console.log('The ' + DB_TABLE + ' collection doesn’t exist. Add some data.');
                }
            });
        } else {
            console.log('No connection');
        }
    });
};

exports.findByCottageAndStart = function (cottage, start, callback) {
    if (db) {
        console.log('Retrieving bookings by cottage: ' + cottage + ' and start: ' + start);
        db.collection(DB_TABLE, function (err, collection) {
            if (err) {
                err = errors.formatError(err);
                console.log('Error: ' + err);
            } else {
                collection.find({'start': { '$gte': start }, 'cottage': cottage}).toArray(function (err, items) {
                    if (err) {
                        err = errors.formatError(err);
                        console.log('Error: ' + err);
                    }
                    callback(items);
                });
            }
        });
    } else {
        // Return empty array if there ar no bookings of if db connection fails
        callback([]);
    }
};
