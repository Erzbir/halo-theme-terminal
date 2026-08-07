NODE_MODULES := node_modules
INSTALL_STAMP := $(NODE_MODULES)/.install-stamp
DIST_DIR := dist
ASSET_DIR := templates/assets/dist

NAME := $(shell grep '^[[:space:]]*name:' theme.yaml | head -n1 | cut -d ':' -f2 | xargs)
VERSION := $(shell grep '^[[:space:]]*version:' theme.yaml | head -n1 | cut -d ':' -f2 | xargs)
THEME := $(NAME)-$(VERSION)
ARCHIVE := $(THEME).zip
ARCHIVE_PATH := $(DIST_DIR)/$(ARCHIVE)
EXTRACT_DIR := $(DIST_DIR)/$(NAME)

SOURCE_ROOTS := src templates i18n
SOURCE_FILES := $(shell find $(SOURCE_ROOTS) -type f \
	! -path '$(ASSET_DIR)/*' \
	! -name '.DS_Store')
SOURCE_DIRS := $(shell find $(SOURCE_ROOTS) -type d \
	! -path '$(ASSET_DIR)' \
	! -path '$(ASSET_DIR)/*')
BUILD_INPUTS := Makefile build.js package.json pnpm-lock.yaml theme.yaml settings.yaml \
	README.md LICENSE $(SOURCE_FILES) $(SOURCE_DIRS)

all: test

$(INSTALL_STAMP): package.json pnpm-lock.yaml
	pnpm install
	@touch "$@"

$(ARCHIVE_PATH): $(INSTALL_STAMP) $(BUILD_INPUTS)
	pnpm build

install: $(INSTALL_STAMP)

build: $(ARCHIVE_PATH)

test: build
	@test -n "$(NAME)" && test "$(EXTRACT_DIR)" != "$(DIST_DIR)"
	@rm -rf "$(EXTRACT_DIR)"
	@unzip -q "$(ARCHIVE_PATH)" -d "$(EXTRACT_DIR)"

clean:
	@rm -rf "$(DIST_DIR)" "$(NODE_MODULES)" "$(ASSET_DIR)"

.PHONY: all install build test clean
