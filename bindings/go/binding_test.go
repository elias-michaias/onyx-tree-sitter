package tree_sitter_onyx_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_onyx "github.com/elias-michaias/onyx-tree-siter/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_onyx.Language())
	if language == nil {
		t.Errorf("Error loading Onyx grammar")
	}
}
