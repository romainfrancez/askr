askr [![Build Status](https://travis-ci.org/romainfrancez/askr.png?branch=master)](https://travis-ci.org/romainfrancez/askr) [![Code Climate](https://codeclimate.com/github/romainfrancez/askr.png)](https://codeclimate.com/github/romainfrancez/askr)
====

A simple utility to ask questions on the command line with node.js

Example
-------
```javascript
var
  ask = require('askr').ask,
  questions;

questions = {};

// Simple required question
//
// Hello there!
// What's your name?
questions.name = {
  text: 'Hello there!\nWhat\'s you name? ',
  required: true
};

// This question won't be called as the answer is already provided
// Useful when you gather some data before hand and want to ask more questions
// to fill in missing answers.
questions.age = {
  text: 'How old are you?'
};

// A question with options
// Will output the options at the end of the question into parenthesis
// separated by a comma.
// {{{options}}} in the text of the question to customise the display of the
// options.
// optionsSeparator to change the separator.
//
// Would you rather live in Paris or San Francisco?
questions.travel = {
  text: 'Would you rather live in {{{options}}}? ',
  optionsSeparator: ' or ',
  options: [
    'Paris',
    'San Francisco'
  ]
};

// A question with a default answer
// Will output the default at the end of the questions into brackets unless you
// provide a template with {{{default}}} in the text of the question.
//
// Do you like askr? [yes]
questions.like = {
  text: 'Do you like askr?',
  default: 'yes'
};
  
ask(questions, {age: 24}, function (err, answers) {
  // Do something with the answers
});
```

Usage
-----
### Questions
Questions are setup in a dictionary and answers are provided in another dictionary with the same keys as the questions.
```javascript
var questions = {
  q1: { ... },
  q2: { ... },
  ...
};
```

### Question
A question is an object with various keys.

 * `text` (required, string): the body of the question,
 * `required` (boolean): whether the question is required; will keep asking the question until it gets an answer,
 * `optionsSeparator` (string): the separator for displaying the options list,
 * `options` (array): the options list from which to choose an answer; will keep asking the question until it gets an answer matching one of the options,
 * `default` (string): the default value when there is no answer provided.

```javascript
var question = {
  text: 'Question body ',
  required: true,
  optionsSeparator: ',',
  options: ['y', 'n'],
  default: 'n'
};
```

### Options and default
Control the display of the options and default.  
By default options are displayed at the end of the question into parenthesis.  
The placement of the options can be changed using `{{{options}}}` in the question text.  
The options are automatically concatenated using a comma. This can be changed by providing the option `optionsSeparator` to the question dictionary.  
By default default is displayed at the end of the question into brackets.  
The placement of the default can be changed using `{{{default}}}` in the question text.  

Then this is the default question template when options and default are provided
```javascript
'Question body ({{{options}}) [{{{default}}}] ';
```

### Already answered questions
If some answers are already answered, they can be provided as the second argument of the `ask` function.

### Ask questions
```javascript
ask(questions, callback);
ask(questions, givenAnswers, callback);
```
The callback takes two arguments:
```javascript
var callback = function (err, answers) {
  ...
};
```