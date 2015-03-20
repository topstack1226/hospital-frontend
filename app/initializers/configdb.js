import Ember from 'ember';

export default {
    after: 'authentication',
    name: 'configdb',    
    
    initialize: function(container, application) {
        var configDB;
        
        function _initCouchDB() {
            return new Ember.RSVP.Promise(function(resolve, reject){
                configDB = new PouchDB('config', function(err, db){
                    if(err){
                        Ember.run(null, reject, err);
                    } else {
                        var dbUrl =  document.location.protocol+'//'+document.location.host+'/db/';
                        var remoteDB = dbUrl + 'config';
                        db.replicate.from(remoteDB, {
                            complete: function() {
                                Ember.run(null, resolve, {success:true});                    
                            }
                        }, function(err) {
                            Ember.run(null, resolve, {
                                error: err,
                                success: false                
                            });            
                        });                        
                    }
                });                
            });
        }
        
        application.deferReadiness();
        _initCouchDB().then(function() {
            application.register('couchdb:configdb', configDB, {instantiate: false});
            application.inject('controller:pouchdb', 'configDB', 'couchdb:configdb');
            
            var options = {
                include_docs: true,
                keys: [
                    'config_consumer_key',
                    'config_consumer_secret',
                    'config_oauth_token',
                    'config_token_secret',
                    'config_use_google_auth'
                ]
            };
            
            configDB.allDocs(options, function(err, response) { 
                if (err) {
                    console.log('Could not get configDB configs:', err);
                    throw err;
                } else {
                    var configs = {};
                    for (var i=0;i<response.rows.length;i++) {
                        if (!response.rows[i].error) {
                            configs[response.rows[i].id] = response.rows[i].doc.value;
                        }
                    }
                    var pouchDBController = container.lookup('controller:pouchdb');
                    pouchDBController.setupMainDB(configs).then(function(dbInfo) {
                        application.register('pouchdb:maindb', dbInfo.mainDB, {instantiate: false});
                        application.register('pouchdb:localdb', dbInfo.localDB, {instantiate: false});
                        application.inject('adapter:application', 'db', 'pouchdb:maindb');
                        application.inject('adapter:application', 'localDB', 'pouchdb:localdb');
                        application.advanceReadiness();
                    }, function() {
                        application.advanceReadiness();
                    });                    
                }
            }.bind(this));                                    
        });
    }
};