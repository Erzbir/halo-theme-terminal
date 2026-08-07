import {terminal} from "../terminal.js";
import {registerColorSchemePicker} from "./color-scheme-picker.js";
import {registerHeaderActions} from "./header-actions.js";

terminal.registerInitFunc(registerHeaderActions);
terminal.registerInitFunc(registerColorSchemePicker);
