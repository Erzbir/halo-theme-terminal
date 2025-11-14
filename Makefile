NODE_MODS := node_modules
DIST_DIR := dist
NAME := $(shell grep '^[[:space:]]*name:' theme.yaml | head -n1 | cut -d ':' -f2 | xargs)
VERSION := $(shell grep '^[[:space:]]*version:' theme.yaml | head -n1 | cut -d ':' -f2 | xargs)
THEME := $(NAME)-$(VERSION)
ARCHIVE := $(THEME).zip

all: install build test

$(NODE_MODS): package.json
	pnpm install

$(DIST_DIR): $(NODE_MODS) theme.yaml settings.yaml build.js templates
	pnpm build

install: $(NODE_MODS)

build: $(DIST_DIR)

test: $(DIST_DIR)/$(ARCHIVE)
	@unzip $(DIST_DIR)/$(ARCHIVE) -d $(DIST_DIR)/$(NAME)

.PHNOY: clean
clean:
	@rm -rf $(DIST_DIR)
	@rm -rf $(BUILD_DIR)
	@rm -rf $(NODE_MODS)
	@rm -rf templates/assets/$(DIST_DIR)