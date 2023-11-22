import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
//const sass = require("gulp-sass")(require("sass"));
import rename from "gulp-rename";
import cleancss from "gulp-clean-css";
import babel from "gulp-babel";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import autoprefixer from "gulp-autoprefixer";

import { deleteAsync } from "del";
const paths = {
  styles: {
    src: ["src/styles/**/*.sass", "src/styles/**/*.scss"],
    dest: "dist/css/",
  },
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "dist/js",
  },
};

export function styles() {
  return (
    gulp
      .src(paths.styles.src)
      // .pipe(sass.sync({ outputStyle: "compressed" }))
      .pipe(sass().on("error", sass.logError))
      .pipe(
        autoprefixer({
          cascade: false,
        })
      )
      .pipe(cleancss())
      .pipe(
        rename({
          basename: "main",
        })
      )

      .pipe(gulp.dest(paths.styles.dest))
  );
}
export function scripts() {
  return gulp
    .src(paths.scripts.src, {
      sourcemaps: true,
    })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat("main.js"))
    .pipe(gulp.dest(paths.scripts.dest));
}
export function clean() {
  return deleteAsync(["dist"]);
}
export function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
}
export const build = gulp.series(clean, gulp.parallel(scripts, styles), watch);
