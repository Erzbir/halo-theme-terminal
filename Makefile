NODE_MODS := node_modules
BUILD_DIR := build
DIST_DIR := templates/assets/dist
NAME := $(shell grep '^[[:space:]]*name:' theme.yaml | head -n1 | cut -d ':' -f2 | xargs)
VERSION := $(shell grep '^[[:space:]]*version:' theme.yaml | head -n1 | cut -d ':' -f2 | xargs)
ARCHIVE := $(NAME)-$(VERSION).zip

all: install build release

$(BUILD_DIR):
	@mkdir -p $(BUILD_DIR)

$(NODE_MODS): package.json
	pnpm install

$(DIST_DIR): $(NODE_MODS) theme.yaml settings.yaml build.js
	pnpm make

$(BUILD_DIR)/$(ARCHIVE): $(DIST_DIR) $(BUILD_DIR)
	@mkdir $(BUILD_DIR)/$(NAME)
	cp -r templates $(BUILD_DIR)/$(NAME)/
	cp -r i18n $(BUILD_DIR)/$(NAME)/
	cp settings.yaml $(BUILD_DIR)/$(NAME)/
	cp theme.yaml $(BUILD_DIR)/$(NAME)/
	zip -r $@ $(BUILD_DIR)/$(NAME) -x "*.DS_Store" -x "*.git*" -x "$(ARCHIVE)"

install: $(NODE_MODS)

build: $(DIST_DIR)

release: $(BUILD_DIR)/$(ARCHIVE)

.PHNOY: clean
clean:
	@rm -rf $(DIST_DIR)
	@rm -rf $(BUILD_DIR)
	@rm -rf $(NODE_MODS)
	@rm -rf dist