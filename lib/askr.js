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
 * @file Askr
 * @author Romain Francez
 *   {@link https://github.com/romainfrancez|@romainfrancez}
 */
(function () {
  'use strict';

  var
    blackhole = require('blackhole'),
    mustache = require('mustache'),
    readline = require('readline'),

    ask,
    getCaseInsensitiveMatch;

  /**
   * @param {Array} array the different values to match against
   * @param {String} value the value to match
   * @returns {String} the value of array that matches value
   */
  getCaseInsensitiveMatch = function (array, value) {
    var
      l = array.length,
      lowerCaseValue = value.toLowerCase();

    while (l) {
      l -= 1;
      if (array[l].toLowerCase() === lowerCaseValue) {
        return array[l];
      }
    }
  };

  /**
   * Asks questions and call callback on completion
   * @param {Object} questions questions to ask
   * @param {Object} answers if some answers are already answered, will skip them
   * @param {Function} callback the function to call on completion
   */
  ask = function (questions, answers, callback) {
    var
      askOne,
      keys = Object.keys(questions),
      l = keys.length,
      next,
      rl;
    
    if (typeof answers === 'function') {
      callback = answers;
      answers = {};
    }

    callback = callback || blackhole;

    if (l === 0) {
      return callback(null, answers);
    }

    /**
     * Asks a question and processes the answer
     * @param {Number} i the question number that is asked
     * @param {Function} [callback] the function to execute after
     *   the question has been replied
     */
    askOne = function (i, callback) {
      var
        hasDefault = false,
        hasOptions = false,
        key = keys[i],
        optionsSeparator = '/',
        question = questions[key],
        questionDisplay = question.text,
        vars = {};

      callback = callback || blackhole;

      if (answers[key] !== undefined) {
        return callback(null, i + 1);
      }

      if (question.default !== undefined) {
        hasDefault = true;
        vars.default = question.default;
      }
      if (question.options !== undefined) {
        hasOptions = true;
        vars.options = question.options.join(question.optionsSeparator ||
          optionsSeparator);
      }

      if (questionDisplay.indexOf('{{options}}') === -1 && hasOptions) {
        questionDisplay = questionDisplay.trim() + ' ({{{options}}}) ';
      }
      if (questionDisplay.indexOf('{{default}}') === -1 && hasDefault) {
        questionDisplay = questionDisplay.trim() + ' [{{{default}}}] ';
      }

      rl.question(mustache.render(questionDisplay, vars), function (answer) {
        if (answer === undefined || answer.length === 0) {
          if (hasDefault) {
            answer = question.default;
          } else if (question.required) {
            return callback('required', i);
          }
        }

        if (hasOptions) {
          answer = getCaseInsensitiveMatch(question.options, answer);
          if (answer === undefined) {
            return callback('no_match', i);
          }
        }

        answers[key] = answer;
        callback(null, i + 1);
      });
    };

    /**
     * Callback for the next iteration
     * @param {Object} err
     * @param {Number} i the index of the next question
     */
    next = function (err, i) {
      if (i < l) {
        if (err === null || err === undefined) {
          console.log();
        }
        askOne(i, next);
      } else {
        rl.close();
        callback(null, answers);
      }
    };

    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    askOne(0, next);
  };

  exports.ask = ask;
}());