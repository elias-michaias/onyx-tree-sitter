; Onyx locals and scope queries

; Function definitions create scopes
(function_declaration
  (function_signature
    (parameter_list)
    (block) @local.scope)) @local.scope

; Struct definitions create scopes
(struct_declaration
  (identifier) @local.definition.type
  (struct_body) @local.scope) @local.scope

; Enum definitions create scopes
(enum_declaration
  (identifier) @local.definition.type
  (enum_body
    (enum_variant
      (identifier) @local.definition.constant)) @local.scope) @local.scope

; Variable declarations
(variable_declaration
  (identifier) @local.definition.variable)

; Lambda expressions create scopes
(lambda_expression
  (parameter
    (identifier) @local.definition.parameter)? @local.scope
  (_) @local.scope) @local.scope

; For loops create scopes for iteration variables
(for_expression
  (identifier) @local.definition.variable
  (block) @local.scope) @local.scope

; Use statements bring symbols into scope
(use_statement
  (use_block
    (identifier) @local.definition.import
    (use_alias
      (identifier) @local.definition.import)?))

; Block statements create scopes
(block) @local.scope

; Control flow blocks create scopes
(if_expression
  (_)
  (block) @local.scope
  (elif_clause
    (_)
    (block) @local.scope)*
  (else_clause
    (block) @local.scope)?)

; References to identifiers
(identifier) @local.reference