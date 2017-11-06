const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const eslint = require("gulp-eslint");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

const webpack = require("webpack-stream");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const connectHistoryApiFallback = require("connect-history-api-fallback");
const path = require("path");
const tmp = require("tmp");

const plumberOptions = {};
const jsFiles = ["src/js/**/*.{js,jsx}"];
const tmpDir = tmp.dirSync({ prefix: "idle-game-" });

const assetsDir = "assets";
const isDev = true;

gulp.task("eslint", () =>
  gulp
    .src(jsFiles)
    .pipe(
      eslint({
        baseConfig: {
          ecmaFeatures: {
            jsx: true
          }
        },
        configFile: ".eslintrc.js"
      })
    )
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task("concat-js", ["eslint"], () =>
  gulp
    .src(jsFiles)
    .pipe(
      webpack({
        devtool: "source-map",
        module: {
          loaders: [
            {
              test: /.jsx?$/,
              loader: "babel-loader",
              exclude: /node_modules/
            },
            {
              test: /.json$/,
              loader: "json-loader"
            }
          ]
        },
        output: {
          filename: "idle-game.js"
        },
        resolve: {
          extensions: [".js", ".json", ".jsx"]
        },
        plugins: isDev
          ? [
              new BundleAnalyzerPlugin({
                analyzerMode: "static",
                reportFilename: path.join(assetsDir, "bundle-analysis.html"),
                openAnalyzer: false
              })
            ]
          : {}
      })
    )
    .pipe(gulp.dest(path.join(assetsDir, "js")))
);

gulp.task("sass", () => {
  const autoprefixerOptions = {
    browsers: ["last 2 versions"]
  };

  const sassOptions = {
    includePaths: ["./node_modules/bootstrap/scss", "./src/scss"]
  };

  return gulp
    .src("src/scss/idle-game.scss")
    .pipe(plumber(plumberOptions))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(tmpDir.name));
});

gulp.task("concat-css", ["sass"], () =>
  gulp
    .src([path.join(tmpDir.name, "**", "*.css")])
    .pipe(sourcemaps.init())
    .pipe(concat("idle-game.css"))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(path.join(assetsDir, "css")))
);

gulp.task("copy-index-html", () =>
  gulp.src("src/html/index.html").pipe(gulp.dest(assetsDir))
);

gulp.task("serve", () =>
  browserSync.init({
    server: {
      baseDir: assetsDir
    },
    open: false,
    online: false,
    notify: false,
    middleware: [
      connectHistoryApiFallback({
        disableDotRule: true,
        htmlAcceptHeaders: ["text/html"]
      })
    ]
  })
);

gulp.task("js-watch", ["concat-js"], done => {
  browserSync.reload();
  done();
});

gulp.task("css-watch", ["concat-css"], done => {
  browserSync.reload();
  done();
});

gulp.task("watch", () => {
  gulp.watch(jsFiles, ["js-watch"]);
  gulp.watch("src/scss/**/*.scss", ["css-watch"]);
});

gulp.task("build", ["sass", "concat-js", "concat-css", "copy-index-html"]);
gulp.task("default", ["build", "serve", "watch"]);
