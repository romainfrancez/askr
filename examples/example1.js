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

/**
 * @file Example file #1
 * @author Romain Francez
 *   {@link https://github.com/romainfrancez|@romainfrancez}
 */
(function () {
  'use strict';

  var
    ask = require('../').ask,
    util = require('util'),

    questions = {
      name: {
        text: 'Hello there!\nWhat\'s you name? ',
        required: true
      },
      age: {
        text: 'How old are you?'
      },
      travel: {
        text: 'Would you rather live in {{{options}}}? ',
        optionsSeparator: ' or ',
        options: [
          'Paris',
          'San Francisco'
        ]
      },
      like: {
        text: 'Do you like askr?',
        default: 'yes',
        options: ['yes', 'no']
      },
      f: {}
    };
  
  ask(questions, {age: 24}, function (err, answers) {
    console.log(util.inspect(answers));
  });
}());