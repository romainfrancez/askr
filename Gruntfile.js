// Copyright (c) 2014 Romain Francez and other askr contributors.
//
// This file is part of askr.
//
// askr is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 3 of the License.
//
// askr is distributed in the hope that it will be useful,
// but WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
// NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
// THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE. See the GNU General Public License
// for more details.
//
// You should have received a copy of the GNU General Public License
// along with askr. If not, see <http://www.gnu.org/licenses/gpl-3.0.txt>.

(function () {
  'use strict';

  var
    grunt;

  grunt = function (grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      jshint: {
        files: ['Gruntfile.js', 'lib/**/*.js', 'spec/**/*.js'],
        options: {
          jshintrc: '.jshintrc'
        }
      },
      watch: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'nodeunit:module']
      },
      jsdoc : {
        dist : {
          src: ['lib/**/*.js'],
          options: {
            destination: 'doc'
          }
        }
      },
      clean: {
        doc: {
          src: ['doc']
        },
        dist: {
          src: ['js']
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jsdoc');
    
    grunt.registerTask('test', ['jshint']);
    
    grunt.registerTask('distribute', ['clean:dist',
                                      'test']);

    grunt.registerTask('doc', ['clean:doc', 'jsdoc']);

    grunt.registerTask('default', ['distribute',
                                   'doc']);

  };

  module.exports = grunt;

}());