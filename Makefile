NODE_MODS := node_modules
BUILD_DIR := build
DIST_DIR := templates/assets/dist

all: install build release

$(BUILD_DIR):
	@mkdir -p $(BUILD_DIR)

$(NODE_MODS):
	pnpm install

$(DIST_DIR): $(NODE_MODS)
	pnpm build

install: $(NODE_MODS)

build: $(DIST_DIR)

release: $(DIST_DIR)
	cp -r templates $(BUILD_DIR)/
	cp -r i18n $(BUILD_DIR)/
	cp settings.yaml $(BUILD_DIR)/
	cp theme.yaml $(BUILD_DIR)/

.PHNOY: clean
clean:
	@rm -rf $(DIST_DIR)
	@rm -rf $(BUILD_DIR)
	@rm -rf $(NODE_MODS)