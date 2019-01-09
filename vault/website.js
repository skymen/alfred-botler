
require('pretty-error').start();

const documentation = require('./vault/routes/documentation');
const donation      = require('./vault/routes/donation');
const api           = require('./vault/routes/bot');
const hook          = require('./vault/routes/hook');
const commands      = require('./vault/routes/commands');
const dashboard     = require('./vault/routes/dashboard');

const Raven = require('raven');
Raven.config('https://d27747b9414d435ab6dae396ce61a4d2:caaa873cdb824239b3f422e0e2c76d1a@sentry.io/260708').install();

const app = express();

const isDev = process.env.NODE_ENV === 'development';

const port = process.env.PORT || (isDev ? 5555 : 80);
const ip   = process.env.IP || (isDev ? 'localhost' : '0.0.0.0');

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

let bot;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(Raven.requestHandler());
app.use(Raven.errorHandler());

const passport        = require('passport');
const refresh         = require('passport-oauth2-refresh');
const DiscordStrategy = require('passport-discord').Strategy;

const scopes = ['identify', 'email', 'guilds'];

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

const discordStrat = new DiscordStrategy({
  clientID    : CONSTANTS.BOT.CLIENT_ID,
  clientSecret: CONSTANTS.BOT.CLIENT_SECRET,
  callbackURL : isDev ? 'http://localhost:80/bot/discord/callback' : 'https://alfred.armaldio.xyz/bot/discord/callback',
  scope       : scopes
}, (accessToken, refreshToken, profile, done) => {
  profile.refreshToken = refreshToken; // store this for later refreshes
  process.nextTick(function () {
    return done(null, profile);
  });
});
passport.use(discordStrat);
refresh.use(discordStrat);

console.log('temp directory', os.tmpdir());

let filestore = new FileStore({
  path: os.tmpdir()
});

let memorystore = new MemoryStore({
  checkPeriod: 86400000
});

app.use(session({
  resave           : true,
  saveUninitialized: true,
  store            : isDev ? filestore : memorystore,
  secret           : 'alfred is awesome'
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.bot   = bot;
  res.locals.guild = bot.guilds.get(CONSTANTS.GUILD_ID);
  next();
});

function checkAuth (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function empty (a, b, next) {
  next();
}

/* GET home page. */
app.get('/', function (req, res) {
  res.render('home');
});
app.get('/login', passport.authenticate('discord', {scope: scopes}), function (req, res) {
  res.locals.bot   = bot;
  res.locals.guild = res.locals.bot.guilds.get(CONSTANTS.GUILD_ID);
});
app.use('/doc', documentation);
app.use('/donation', donation);
app.use('/bot', api);
app.use('/hook', hook);
app.use('/commands', checkAuth, commands);
app.use('/dashboard', checkAuth, dashboard);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err    = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});