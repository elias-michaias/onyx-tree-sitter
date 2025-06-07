; Onyx syntax highlighting queries

; Keywords
[
  "struct"
  "enum"
  "use"
  "if"
  "elif"
  "else"
  "for"
  "while"
  "in"
  "return"
  "defer"
] @keyword

; Statement keywords
(break_statement) @keyword
(continue_statement) @keyword

; Function declaration keywords
"::" @keyword.function

; Operators
[
  "="
  "=="
  "!="
  "<"
  ">"
  "<="
  ">="
  "&&"
  "||"
  "!"
  "+"
  "-"
  "*"
  "/"
  "%"
  "&"
  "|>"
  "=>"
  "->"
  ".."
] @operator

; Punctuation
[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
  ";"
  ":"
  ","
  "."
] @punctuation.delimiter

; Comments
(line_comment) @comment
(block_comment) @comment

; String literals
(string_literal) @string

; Numeric literals
(integer_literal) @number
(float_literal) @number

; Boolean literals
(boolean_literal) @constant.builtin

; Enum literals
(enum_literal) @constant

; Function definitions
(function_declaration
  (identifier) @function)

; Function calls
(call_expression
  (expression) @function)

; Struct names
(struct_declaration
  (identifier) @type)

; Enum names
(enum_declaration
  (identifier) @type)

; Type annotations
(type_annotation (identifier) @type)

; Parameters
(parameter
  (identifier) @variable.parameter
  (type_annotation) @type)

; Variable declarations
(variable_declaration
  (identifier) @variable)

; Field names in struct definitions
(struct_field
  (identifier) @property)

; Field access
(field_access
  (identifier) @property)

; Enum variants
(enum_variant
  (identifier) @constant)

; Generic types
(generic_type
  "$" @keyword
  (identifier) @type)

; Directives
(load_directive "#load" @keyword.import)

; Use statements
(use_statement "use" @keyword.import)

; Module paths
(module_path) @namespace

; Tag annotations
(tag_annotation "@" @attribute)
(tag_value (identifier) @attribute)

; Tag declarations
(tag_declaration "#tag" @attribute)

; Struct attributes
(struct_attribute "#align" @attribute)

; Identifiers (fallback)
(identifier) @variable