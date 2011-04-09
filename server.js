(function() {
    var app, express, pub;
    express = require('express');
    pub = __dirname + '/public';
    Post = require('./models/post');
    app = express.createServer(express.compiler({
        src: pub,
        enable: ['sass']
    }), express.static(pub), express.bodyParser(), express.logger(), express.errorHandler({
        dumpExceptions: true,
        showStack: true
    })).set('view engine', 'jade');

    app.get('/', function(req, res) {
        res.redirect('/posts')
    });

    app.get('/posts', function(req, res) {
        Post.find({}, [],  { sort: ['date', 'ascending'] }, function(err, posts) {
            res.render('posts/index.jade', {
                locals: { posts: posts }
            });
        });
    });

    app.get('/posts/new', function(req, res) {
        return res.render('posts/new', {
            locals: { post : req.body && req.body.post || new Post() }
        });
    });

    app.get('/posts/:id', function(req, res, next) {
        Post.findOne({ _id: req.params.id }, function(err, d) {
            if (!d) return next(new NotFound('Post not found'));
            res.render('posts/show.jade', {
                locals: { d: d }
            });
        });
    });

    app.post('/posts', function(req, res) {
        var post = new Post(req.body.post);
        post.save(function() {
            res.redirect('/posts')
        });
    });
    app.listen(process.env.PORT || 8000);
})();
