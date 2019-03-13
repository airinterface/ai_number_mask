const fs        = require('fs');
const path      = require('path');
let _path       = path.resolve(__dirname, 'require.json')
let _required   = require(_path);
let _requiredjs = _required.map( (f) => { return path.join(__dirname, 'src', f); });


var initializeTmpDir = ( dir )=>{
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
}
initializeTmpDir( 'build' );



module.exports = function( grunt ) {
  const package = grunt.file.readJSON('package.json');
  console.log( "package name ===== " + package.name );

  if ( !grunt.option( "filename" ) ) {
    grunt.option( "filename", package.name + ".js" );
  }

  grunt.initConfig({
    pkg: package,
    browserify: {
      build: {
        files: {
          'build/<%= pkg.name %>.js': _requiredjs,
          'build/<%= pkg.name %>-test.js': [ path.join(__dirname, 'test', 'test.js' ) ] 
        }
      },
      options : {
        browserifyOptions: { debug: true },
        transform: [
          [ 
            "babelify", 
            { 
              presets: [
                "@babel/preset-env", 
              ],
              plugins: ["@babel/plugin-proposal-class-properties"],
              sourceMaps: true
            }
          ]
        ]
      }
    }    
  });

  grunt.loadNpmTasks('grunt-browserify');

  //Default task(s).
  grunt.registerTask('default', [
    'browserify'
  ]);

}

