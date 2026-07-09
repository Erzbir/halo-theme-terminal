NODE_MODS := node_modules
DIST_DIR := dist
NAME := $(shell grep '^[[:space:]]*name:' theme.yaml | head -n1 | cut -d ':' -f2 | xargs)
VERSION := $(shell grep '^[[:space:]]*version:' theme.yaml | head -n1 | cut -d ':' -f2 | xargs)
THEME := $(NAME)-$(VERSION)
ARCHIVE := $(THEME).zip

all: install build test

$(NODE_MODS): package.json pnpm-lock.yaml
	pnpm install

$(DIST_DIR)/$(ARCHIVE): $(NODE_MODS) theme.yaml settings.yaml build.js templates
	pnpm build

install: $(NODE_MODS)

build: $(DIST_DIR)/$(ARCHIVE)

test: build
	@unzip $(DIST_DIR)/$(ARCHIVE) -d $(DIST_DIR)/$(NAME)

.PHONY: all install build clean test

clean:
	@rm -rf $(DIST_DIR)
	@rm -rf $(NODE_MODS)
	@rm -rf templates/assets/$(DIST_DIR)