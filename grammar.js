/**
 * @file Grammar for the Onyx programming language.
 * @author Elias Michaias <emskeirik@gmail.com>
 * @license MIT
 */


// @ts-check

module.exports = grammar({
  name: "onyx",

  extras: $ => [
    $.comment,
    /\s/,
    /\n/,
  ],

  conflicts: $ => [
    [$.type_annotation, $.expression],
  ],

  rules: {
    source_file: $ => repeat($._top_level_item),

    _top_level_item: $ => choice(
      $.function_declaration,
      $.variable_declaration,
      $.struct_declaration,
      $.enum_declaration,
      $.use_statement,
      $.load_directive,
      $.tag_declaration,
      $.comment,
    ),

    // Comments
    comment: $ => choice(
      $.line_comment,
      $.block_comment,
    ),

    line_comment: $ => token(seq('//', /.*/)),

    block_comment: $ => token(seq(
      '/*',
      /[^*]*\*+([^/*][^*]*\*+)*/,
      '/'
    )),

    // Load directives
    load_directive: $ => seq(
      '#load',
      choice(
        $.string_literal,
        $.load_path,
      ),
    ),

    load_path: $ => /[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z_][a-zA-Z0-9_]*)*/,

    // Use statements
    use_statement: $ => seq(
      'use',
      $.module_path,
      optional($.use_block),
    ),

    module_path: $ => /[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z_][a-zA-Z0-9_]*)*/,

    use_block: $ => seq(
      '{',
      commaSep(choice(
        $.identifier,
        $.use_alias,
        '*',
      )),
      '}',
    ),

    use_alias: $ => seq(
      $.identifier,
      '::',
      $.identifier,
    ),

    // Function declarations
    function_declaration: $ => seq(
      optional($.tag_annotation),
      $.identifier,
      '::',
      choice(
        $.function_signature,
        $.lambda_expression,
      ),
    ),

    function_signature: $ => seq(
      $.parameter_list,
      optional(seq('->', $.type_annotation)),
      $.block,
    ),

    parameter_list: $ => seq(
      '(',
      commaSep($.parameter),
      ')',
    ),

    parameter: $ => seq(
      $.identifier,
      ':',
      $.type_annotation,
    ),

    // Variable declarations
    variable_declaration: $ => seq(
      $.identifier,
      choice(
        seq(':', $.type_annotation, '=', $.expression),
        seq(':=', $.expression),
      ),
    ),

    // Struct declarations
    struct_declaration: $ => seq(
      $.identifier,
      '::',
      'struct',
      optional($.struct_attributes),
      $.struct_body,
    ),

    struct_attributes: $ => repeat1($.struct_attribute),

    struct_attribute: $ => choice(
      seq('#align', $.integer_literal),
    ),

    struct_body: $ => seq(
      '{',
      repeat($.struct_field),
      '}',
    ),

    struct_field: $ => choice(
      seq($.identifier, ':', $.type_annotation),
      seq('use', $.identifier, ':', $.type_annotation),
    ),

    // Enum declarations
    enum_declaration: $ => seq(
      $.identifier,
      '::',
      'enum',
      optional($.type_annotation),
      $.enum_body,
    ),

    enum_body: $ => seq(
      '{',
      commaSep($.enum_variant),
      '}',
    ),

    enum_variant: $ => seq(
      $.identifier,
      optional(seq('=', $.expression)),
    ),

    // Tag declarations and annotations
    tag_declaration: $ => seq(
      '#tag',
      $.tag_value,
      $.function_declaration,
    ),

    tag_annotation: $ => prec(1, seq(
      '@',
      $.tag_value,
    )),

    tag_value: $ => choice(
      $.identifier,
      seq($.identifier, '.', '{', commaSep(choice($.identifier, $.enum_literal)), '}'),
    ),

    tag_argument: $ => $.identifier,

    // Type annotations
    type_annotation: $ => choice(
      $.identifier,
      $.pointer_type,
      $.array_type,
      $.slice_type,
      $.function_type,
      $.generic_type,
    ),

    pointer_type: $ => prec(2, seq('&', $.type_annotation)),

    array_type: $ => prec(3, seq('[', $.expression, ']', $.type_annotation)),

    slice_type: $ => seq('[]', $.type_annotation),

    function_type: $ => seq(
      '(',
      commaSep($.type_annotation),
      ')',
      '->',
      $.type_annotation,
    ),

    generic_type: $ => seq(
      '$',
      $.identifier,
      optional(seq('/', $.type_constraint)),
    ),

    type_constraint: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    // Expressions
    expression: $ => choice(
      $.identifier,
      $.literal,
      $.binary_expression,
      $.unary_expression,
      $.call_expression,
      $.field_access,
      $.index_access,
      $.pipe_expression,
      $.lambda_expression,
      $.defer_statement,
      $.if_expression,
      $.for_expression,
      $.while_expression,
      $.parenthesized_expression,
    ),

    binary_expression: $ => choice(
      prec.left(1, seq($.expression, '||', $.expression)),
      prec.left(2, seq($.expression, '&&', $.expression)),
      prec.left(3, seq($.expression, '==', $.expression)),
      prec.left(3, seq($.expression, '!=', $.expression)),
      prec.left(4, seq($.expression, '<', $.expression)),
      prec.left(4, seq($.expression, '>', $.expression)),
      prec.left(4, seq($.expression, '<=', $.expression)),
      prec.left(4, seq($.expression, '>=', $.expression)),
      prec.left(5, seq($.expression, '+', $.expression)),
      prec.left(5, seq($.expression, '-', $.expression)),
      prec.left(6, seq($.expression, '*', $.expression)),
      prec.left(6, seq($.expression, '/', $.expression)),
      prec.left(6, seq($.expression, '%', $.expression)),
      prec.left(7, seq($.expression, '=', $.expression)),
    ),

    unary_expression: $ => choice(
      prec(8, seq('!', $.expression)),
      prec(8, seq('-', $.expression)),
      prec(9, seq('&', $.expression)),
      prec(8, seq('*', $.expression)),
    ),

    call_expression: $ => prec(10, seq(
      $.expression,
      $.argument_list,
    )),

    argument_list: $ => seq(
      '(',
      commaSep($.expression),
      ')',
    ),

    field_access: $ => prec(10, seq(
      $.expression,
      choice('.', '->'),
      $.identifier,
    )),

    index_access: $ => prec(12, seq(
      $.expression,
      '[',
      $.expression,
      ']',
    )),

    pipe_expression: $ => prec.left(0, seq(
      $.expression,
      '|>',
      $.expression,
    )),

    lambda_expression: $ => prec.right(1, seq(
      choice(
        seq('(', commaSep($.parameter), ')'),
        $.identifier,
      ),
      '=>',
      choice($.expression, $.block),
    )),

    defer_statement: $ => prec(11, seq(
      'defer',
      $.expression,
    )),

    if_expression: $ => seq(
      'if',
      $.expression,
      $.block,
      repeat($.elif_clause),
      optional($.else_clause),
    ),

    elif_clause: $ => seq(
      'elif',
      $.expression,
      $.block,
    ),

    else_clause: $ => seq(
      'else',
      $.block,
    ),

    for_expression: $ => seq(
      'for',
      choice(
        seq($.identifier, 'in', $.expression),
        seq($.identifier, 'in', $.expression, '..', $.expression),
        $.expression,
      ),
      $.block,
    ),

    while_expression: $ => seq(
      'while',
      $.expression,
      $.block,
    ),

    parenthesized_expression: $ => seq(
      '(',
      $.expression,
      ')',
    ),

    // Literals
    literal: $ => choice(
      $.integer_literal,
      $.float_literal,
      $.string_literal,
      $.boolean_literal,
      $.enum_literal,
      $.array_literal,
      $.struct_literal,
    ),

    integer_literal: $ => /\d+/,

    float_literal: $ => /\d+\.\d+/,

    string_literal: $ => seq(
      '"',
      repeat(choice(
        /[^"\\]/,
        /\\./,
      )),
      '"',
    ),

    boolean_literal: $ => choice('true', 'false'),

    enum_literal: $ => seq('.', $.identifier),

    array_literal: $ => prec(2, seq(
      '[',
      commaSep($.expression),
      ']',
    )),

    struct_literal: $ => prec(1, seq(
      $.type_annotation,
      '.',
      '{',
      commaSep($.expression),
      '}',
    )),

    // Statements and blocks
    statement: $ => prec.right(choice(
      $.expression,
      $.variable_declaration,
      $.return_statement,
      $.break_statement,
      $.continue_statement,
    )),

    return_statement: $ => prec.right(seq(
      'return',
      optional($.expression),
    )),

    break_statement: $ => 'break',

    continue_statement: $ => 'continue',

    block: $ => seq(
      '{',
      repeat(seq($.statement, optional(choice(';', '\n')))),
      '}',
    ),

    // Identifiers
    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,
  }
});

function commaSep(rule) {
  return optional(seq(rule, repeat(seq(',', rule))));
}