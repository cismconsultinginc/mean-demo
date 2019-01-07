// exports.render = function(req, res) {
//     res.status(200).send('Hello world');
// }
// The above code also works. 
// But it is better to use module.exports over exports

module.exports.render = function(req, res) {
    if (req.session.lastVisit) {
        console.log(req.session.lastVisit);
    }

    req.session.lastVisit = new Date();

    res.render('index', { 
        title: 'Hello world'
    });
}