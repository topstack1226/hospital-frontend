import Ember from 'ember';
export default Ember.Handlebars.makeBoundHelper(function(lhs, rhs) {
    return lhs === rhs;
});
