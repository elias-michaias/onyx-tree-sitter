; Onyx indentation queries

; Increase indentation after opening braces
[
  (block)
  (struct_body)
  (enum_body)
  (use_block)
] @indent

; Decrease indentation for closing braces
[
  "}"
] @outdent

; Align with opening parentheses
[
  (parameter_list)
  (argument_list)
  (array_literal)
] @indent @extend

; Special handling for function signatures
(function_signature
  (parameter_list) @indent @extend
  (block) @indent)

; Control flow structures
[
  (if_expression)
  (elif_clause)
  (else_clause)
  (for_expression)
  (while_expression)
] @indent

; Comments don't affect indentation
(comment) @ignore