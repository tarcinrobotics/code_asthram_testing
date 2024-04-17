import Blockly from 'blockly';
import 'blockly/python';

Blockly.Blocks['controls_if_else'] = {
  init: function() {
    this.setColour(210);
    this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField("if");
    this.appendStatementInput("IF_BODY")
        .setCheck(null)
        .appendField("do");
    this.appendStatementInput("ELSE_BODY")
        .setCheck(null)
        .appendField("else");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("If the condition is true, do the first block of commands. Otherwise, do the second block of commands.");
  }
};

Blockly.Python['controls_if_else'] = function(block) {
  var condition = Blockly.Python.valueToCode(block, 'CONDITION', Blockly.Python.ORDER_NONE) || 'False';
  var ifBody = Blockly.Python.statementToCode(block, 'IF_BODY');
  var elseBody = Blockly.Python.statementToCode(block, 'ELSE_BODY');
  var code = 'if ' + condition + ':\n';
  code += Blockly.Python.prefixLines(ifBody, '  ');
  code += 'else:\n';
  code += Blockly.Python.prefixLines(elseBody, '  ');
  return code;
};



Blockly.Blocks['arithmetic_operator'] = {
  init: function() {
    this.setColour(210);
    this.setOutput(true, 'Number');
    this.appendDummyInput()
        .appendField('')
        .appendField(new Blockly.FieldTextInput('0'), 'A');
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['ADD', '+'], 
          ['SUB', '-'], 
          ['MUL', '*'], 
          ['DIV', '/'], 
          ['MOD', '%']
        ]), 'OP');
    this.appendDummyInput()
        .appendField('')
        .appendField(new Blockly.FieldTextInput('0'), 'B');
    this.setInputsInline(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['comparison_operator'] = {
  init: function() {
    this.setColour(210);
    this.setOutput(true, 'Boolean');
    this.appendDummyInput()
        .appendField('')
        .appendField(new Blockly.FieldTextInput('0'), 'A')
        .appendField(new Blockly.FieldDropdown([
          ['EQ', '='], 
          ['NEQ', '!='], 
          ['LT', '<'], 
          ['LTE', '<='], 
          ['GT', '>'], 
          ['GTE', '>=']
        ]), 'OP');
    this.appendDummyInput()
        .appendField('')
        .appendField(new Blockly.FieldTextInput('0'), 'B');
    this.setInputsInline(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['logical_operator'] = {
  init: function() {
    this.setColour(210);
    this.setOutput(true, 'Number');
    
    // Dropdown options for true/false
    var trueFalseOptions = [
      ['true', 'true'],
      ['false', 'false']
    ];

    // Input 'A' with dropdown
    this.appendDummyInput()
        .appendField('')
        .appendField(new Blockly.FieldDropdown(trueFalseOptions), 'A')
        .appendField(new Blockly.FieldDropdown([
          ['AND', 'and'], 
          ['OR', 'or'], 
          ['NOT', 'not']
        ]), 'OP');

    // Input 'B' with dropdown
    this.appendDummyInput()
        .appendField('')
        .appendField(new Blockly.FieldDropdown(trueFalseOptions), 'B');

    this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['bitwise_operator'] = {
  init: function() {
    this.setColour(210);
    this.setOutput(true, 'Number');
    this.appendDummyInput()
        .appendField('')
        .appendField(new Blockly.FieldTextInput('0'), 'A');
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['AND', '&'], 
          ['OR', '|'], 
          ['XOR', '^'], 
          ['NOT', '~']
        ]), 'OP');
    this.appendDummyInput()
        .appendField('')
        .appendField(new Blockly.FieldTextInput('0'), 'B');
    this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['assignment_operator'] = {
  init: function() {
    this.setColour(210);
    this.setOutput(true, null); // Changed output type to 'any'
    this.appendDummyInput()
        .appendField('')
        .appendField(new Blockly.FieldTextInput('0'), 'A')
        .appendField(new Blockly.FieldDropdown([
          ['=', '='],
          ['+=', '+='],
          ['-=', '-='],
          ['*=', '*='],
          ['/=', '/='],
          ['%=', '%='],
          ['&=', '&='],
          ['|=', '|='],
          ['^=', '^='],
          ['<<=', '<<='],
          ['>>=', '>>='],
          ['!=<', '!<'],
          ['!>', '!>']
        ]), 'OP');
    this.appendDummyInput()
        .appendField('')
        .appendField(new Blockly.FieldTextInput('0'), 'B');
    this.setInputsInline(true);
    this.setTooltip('Assignment Operator');
  }
};

Blockly.Python['assignment_operator'] = function(block) {
  var valueA = block.getFieldValue('A') || '0';
  var operator = block.getFieldValue('OP');
  var valueB = block.getFieldValue('B') || '0';
  return valueA + ' ' + operator + ' ' + valueB + '\n';
};



Blockly.Blocks['membership_operator'] = {
  init: function() {
    this.setColour(210);
    this.setOutput(true, 'Boolean');
    this.appendValueInput('A')
        .setCheck('Variable')
        .appendField('Is');
    this.appendValueInput('B')
        .setCheck('List')
        .appendField('in');
    this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Python['arithmetic_operator'] = function(block) {
  var value_a = block.getFieldValue('A') || '0';
  var dropdown_op = block.getFieldValue('OP');
  var value_b = block.getFieldValue('B') || '0';
  var code = value_a + ' ' + dropdown_op + ' ' + value_b;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['comparison_operator'] = function(block) {
  var value_a = block.getFieldValue('A') || '0';
  var dropdown_op = block.getFieldValue('OP');
  var value_b = block.getFieldValue('B') || '0';
  var code = value_a + ' ' + dropdown_op + ' ' + value_b;
  return [code, Blockly.Python.ORDER_RELATIONAL];
};

Blockly.Python['logical_operator'] = function(block) {
  var value_a = block.getFieldValue('A') || 'False';
  var dropdown_op = block.getFieldValue('OP');
  var value_b = block.getFieldValue('B') || 'False';
  var code = value_a + ' ' + dropdown_op + ' ' + value_b;
  return [code, Blockly.Python.ORDER_LOGICAL];
};

Blockly.Python['bitwise_operator'] = function(block) {
  var value_a = block.getFieldValue('A') || '0';
  var dropdown_op = block.getFieldValue('OP');
  var value_b = block.getFieldValue('B') || '0';
  var code = value_a + ' ' + dropdown_op + ' ' + value_b;
  return [code, Blockly.Python.ORDER_BITWISE];
};


Blockly.Python['identity_operator'] = function(block) {
  var value_a = Blockly.Python.valueToCode(block, 'A', Blockly.Python.ORDER_ATOMIC) || '0';
  var value_b = Blockly.Python.valueToCode(block, 'B', Blockly.Python.ORDER_ATOMIC) || '0';
  var code = value_a + ' == ' + value_b;
  return [code, Blockly.Python.ORDER_RELATIONAL];
};

Blockly.Python['membership_operator'] = function(block) {
  var variable = Blockly.Python.valueToCode(block, 'A', Blockly.Python.ORDER_ATOMIC) || 'var';
  var list = Blockly.Python.valueToCode(block, 'B', Blockly.Python.ORDER_ATOMIC) || '[]';
  var code = variable + ' in ' + list;
  return [code, Blockly.Python.ORDER_RELATIONAL];
};

