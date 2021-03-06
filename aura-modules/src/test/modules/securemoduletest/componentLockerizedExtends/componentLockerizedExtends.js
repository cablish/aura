import { LightningElement, api } from 'lwc';
import * as testUtil from 'securemoduletest/testUtil';

export default class ComponentLockerizedExtends extends LightningElement {
    @api COMPONENT = 'ComponentLockerizedExtends { NS: "securemoduletest" }';
    @api NAME = 'Lockerized! [ParentClass]';

    @api BOOLEAN = false;
    @api NULL = null;
    @api UNDEFINED = undefined;
    @api NUMBER = 100;
    @api STRING = 'Hello!';
    @api SYMBOL = Symbol('ABC');

    @api BOOLEAN_OVERRIDE = 'true';
    @api NULL_OVERRIDE = undefined;
    @api UNDEFINED_OVERRIDE = null;
    @api NUMBER_OVERRIDE = 100;
    @api STRING_OVERRIDE = 'Hello!';
    @api SYMBOL_OVERRIDE = Symbol('ABC');

    @api WINDOW = window;
    @api DOCUMENT = document;
    @api ELEMENT = document.createElement('DIV');

    @api OBJECT = {
        'win': window,
        'doc': document,
        'el': document.createElement('DIV'),
        'winFunction': function() { return window; },
        'docFunction': function() { return document; },
        'elFunction': function() { return document.createElement('DIV'); },
        'winThisContextFunction': function() { return this.win },
        'docThisContextFunction': function() { return this.doc },
        'elThisContextFunction': function() { return this.el }
    };

    getWindow() {
        testUtil.assertEquals('SecureWindow: [object Window]{ key: {"namespace":"secureModuleTest"} }', window.toString(), 'Function "window" not lockerized! [ParentClass]');
        return window;
    }
    getDocument() {
        testUtil.assertEquals('SecureDocument: [object HTMLDocument]{ key: {"namespace":"secureModuleTest"} }', document.toString(), 'Function "document" not lockerized! [ParentClass]');
        return document;
    }
    getElement() {
        testUtil.assertEquals('SecureElement: [object HTMLDivElement]{ key: {"namespace":"secureModuleTest"} }', document.createElement('DIV').toString(), 'Function "element" not lockerized! [ParentClass]');
        return document.createElement('DIV');
    }
    getWindowOverride() {
        return window;
    }
    getDocumentOverride() {
        return document;
    }
    getElementOverride() {
        return document.createElement('DIV');
    }
    getWindowThisContext() {
        testUtil.assertEquals('SecureWindow: [object Window]{ key: {"namespace":"secureModuleTest"} }', this.WINDOW.toString(), 'Function this context "window" not lockerized! [ParentClass]');
        return this.WINDOW;
    }
    getDocumentThisContext() {
        testUtil.assertEquals('SecureDocument: [object HTMLDocument]{ key: {"namespace":"secureModuleTest"} }', this.DOCUMENT.toString(), 'Function this context "document" not lockerized! [ParentClass]');
        return this.DOCUMENT;
    }
    getElementThisContext() {
        testUtil.assertEquals('SecureElement: [object HTMLDivElement]{ key: {"namespace":"secureModuleTest"} }',this.ELEMENT.toString(), 'Function this context "element" not lockerized! [ParentClass]');
        return this.ELEMENT;
    }
    getWindowReturn(win) {
        this.win = win;
        testUtil.assertEquals('SecureWindow: [object Window]{ key: {"namespace":"secureModuleTest"} }', this.win.toString(), 'Function return "window" not lockerized! [ParentClass]');
        return this.win;
    }
    getDocumentReturn(doc) {
        this.doc = doc;
        testUtil.assertEquals('SecureDocument: [object HTMLDocument]{ key: {"namespace":"secureModuleTest"} }', this.doc.toString(), 'Function return "document" not lockerized! [ParentClass]');
        return this.doc;
    }
    getElementReturn(el) {
        this.el = el;
        testUtil.assertEquals('SecureElement: [object HTMLDivElement]{ key: {"namespace":"secureModuleTest"} }', this.el.toString(), 'Function return "element" not lockerized! [ParentClass]');
        return this.el;
    }
    getWindowReturnFunction(winFunc) {
        this.win = winFunc();
        testUtil.assertEquals('SecureWindow: [object Window]{ key: {"namespace":"secureModuleTest"} }', this.win.toString(), 'Function return function "window" not lockerized! [ParentClass]');
        return this.win;
    }
    getDocumentReturnFunction(docFunc) {
        this.docFunc = docFunc();
        testUtil.assertEquals('SecureDocument: [object HTMLDocument]{ key: {"namespace":"secureModuleTest"} }', this.docFunc.toString(), 'Function return function "document" not lockerized! [ParentClass]');
        return this.docFunc;
    }
    getElementReturnFunction(elFunc) {
        this.elFunc = elFunc();
        testUtil.assertEquals('SecureElement: [object HTMLDivElement]{ key: {"namespace":"secureModuleTest"} }', this.elFunc.toString(), 'Function return function "element" not lockerized! [ParentClass]');
        return this.elFunc;
    }

    @api
    testBaseComponentPrimitives() {
        testUtil.assertEquals(false, this.BOOLEAN_OVERRIDE);
        testUtil.assertEquals(null, this.NULL_OVERRIDE);
        testUtil.assertEquals(undefined, this.UNDEFINED_OVERRIDE);
        testUtil.assertEquals(999, this.NUMBER_OVERRIDE);
        testUtil.assertEquals('Override!', this.STRING_OVERRIDE);
        testUtil.assertEquals('Symbol(XYZ)', this.SYMBOL_OVERRIDE.toString());
    }

    @api
    testBaseComponentObjects() {
        testUtil.assertEquals('SecureWindow: [object Window]{ key: {"namespace":"secureModuleTest"} }', this.WINDOW.toString(), 'Property "window" not lockerized! [ParentClass]');
        testUtil.assertEquals('SecureDocument: [object HTMLDocument]{ key: {"namespace":"secureModuleTest"} }', this.DOCUMENT.toString(), 'Property "document" not lockerized! [ParentClass]');
        testUtil.assertEquals('SecureElement: [object HTMLDivElement]{ key: {"namespace":"secureModuleTest"} }', this.ELEMENT.toString(), 'Property "element" not lockerized! [ParentClass]');

        testUtil.assertEquals('SecureWindow: [object Window]{ key: {"namespace":"secureModuleTest"} }', this.OBJECT.win.toString(), 'Object "window" not lockerized! [ParentClass]');
        testUtil.assertEquals('SecureDocument: [object HTMLDocument]{ key: {"namespace":"secureModuleTest"} }', this.OBJECT.doc.toString(), 'Object "document" not lockerized! [ParentClass]');
        testUtil.assertEquals('SecureElement: [object HTMLDivElement]{ key: {"namespace":"secureModuleTest"} }', this.OBJECT.el.toString(), 'Object "element" not lockerized! [ParentClass]');

        testUtil.assertEquals('SecureWindow: [object Window]{ key: {"namespace":"secureModuleTest"} }', this.OBJECT.winFunction().toString(), 'Object function "window" not lockerized! [ParentClass]');
        testUtil.assertEquals('SecureDocument: [object HTMLDocument]{ key: {"namespace":"secureModuleTest"} }', this.OBJECT.docFunction().toString(), 'Object function "document" not lockerized! [ParentClass]');
        testUtil.assertEquals('SecureElement: [object HTMLDivElement]{ key: {"namespace":"secureModuleTest"} }', this.OBJECT.elFunction().toString(), 'Object function "element" not lockerized! [ParentClass]');

        testUtil.assertEquals('SecureWindow: [object Window]{ key: {"namespace":"secureModuleTest"} }', this.OBJECT.winThisContextFunction().toString(), 'Object this context "window" not lockerized! [ParentClass]');
        testUtil.assertEquals('SecureDocument: [object HTMLDocument]{ key: {"namespace":"secureModuleTest"} }', this.OBJECT.docThisContextFunction().toString(), 'Object this context "document" not lockerized! [ParentClass]');
        testUtil.assertEquals('SecureElement: [object HTMLDivElement]{ key: {"namespace":"secureModuleTest"} }', this.OBJECT.elThisContextFunction().toString(), 'Object this context "element" not lockerized! [ParentClass]');
    }

    @api
    testBaseComponentFunctions() {
        testUtil.assertEquals('SecureWindow: [object Window]{ key: {"namespace":"secureModuleTest"} }', this.getWindow().toString(), 'Function "window" not lockerized! [ChildClass]');
        testUtil.assertEquals('SecureDocument: [object HTMLDocument]{ key: {"namespace":"secureModuleTest"} }', this.getDocument().toString(), 'Function "document" not lockerized! [ChildClass]');
        testUtil.assertEquals('SecureElement: [object HTMLDivElement]{ key: {"namespace":"secureModuleTest"} }', this.getElement().toString(), 'Function "element" not lockerized! [ChildClass]');

        testUtil.assertEquals('SecureWindow: [object Window]{ key: {"namespace":"secureModuleTest"} }', this.getWindowOverride().toString(), 'Function override "window" not lockerized!');
        testUtil.assertEquals('SecureDocument: [object HTMLDocument]{ key: {"namespace":"secureModuleTest"} }', this.getDocumentOverride().toString(), 'Function override "document" not lockerized!');
        testUtil.assertEquals('SecureElement: [object HTMLDivElement]{ key: {"namespace":"secureModuleTest"} }',this.getElementOverride().toString(), 'Function override "element" not lockerized!');

        testUtil.assertEquals('SecureWindow: [object Window]{ key: {"namespace":"secureModuleTest"} }', this.getWindowThisContext().toString(), 'Function this context "window" not lockerized! [ChildClass]');
        testUtil.assertEquals('SecureDocument: [object HTMLDocument]{ key: {"namespace":"secureModuleTest"} }', this.getDocumentThisContext().toString(), 'Function this context "document" not lockerized! [ChildClass]');
        testUtil.assertEquals('SecureElement: [object HTMLDivElement]{ key: {"namespace":"secureModuleTest"} }',this.getElementThisContext().toString(), 'Function this context "element" not lockerized! [ChildClass]');

        testUtil.assertEquals('SecureWindow: [object Window]{ key: {"namespace":"secureModuleTest"} }', this.getWindowReturn(window).toString(), 'Function return "window" not lockerized! [ChildClass]');
        testUtil.assertEquals('SecureDocument: [object HTMLDocument]{ key: {"namespace":"secureModuleTest"} }', this.getDocumentReturn(document).toString(), 'Function return "document" not lockerized! [ChildClass]');
        testUtil.assertEquals('SecureElement: [object HTMLDivElement]{ key: {"namespace":"secureModuleTest"} }', this.getElementReturn(document.createElement('DIV')).toString(), 'Function return "element" not lockerized! [ChildClass]');

        testUtil.assertEquals('SecureWindow: [object Window]{ key: {"namespace":"secureModuleTest"} }', this.getWindowReturnFunction(function() { return window; }).toString(), 'Function return function "window" not lockerized! [ChildClass]');
        testUtil.assertEquals('SecureDocument: [object HTMLDocument]{ key: {"namespace":"secureModuleTest"} }', this.getDocumentReturnFunction(function() { return document; }).toString(), 'Function return function "document" not lockerized! [ChildClass]');
        testUtil.assertEquals('SecureElement: [object HTMLDivElement]{ key: {"namespace":"secureModuleTest"} }', this.getElementReturnFunction(function() { return document.createElement('DIV'); }).toString(), 'Function return function "element" not lockerized! [ChildClass]');
    }

    @api
    testBaseComponentCreatedPrimitives() {
        testUtil.assertEquals(false, this.BOOLEAN_SUPER);
        testUtil.assertEquals(null, this.NULL_SUPER);
        testUtil.assertEquals(undefined, this.UNDEFINED_SUPER);
        testUtil.assertEquals(200, this.NUMBER_SUPER);
        testUtil.assertEquals('Super!', this.STRING_SUPER);
        testUtil.assertEquals('Symbol(QWERTY)', this.SYMBOL_SUPER.toString());
    }

    @api
    testBaseComponentCreatedObjects() {
        testUtil.assertEquals('SecureWindow: [object Window]{ key: {"namespace":"secureModuleTest"} }', this.winSuper.toString(), '[Super] Property "window" not lockerized!');
        testUtil.assertEquals('SecureDocument: [object HTMLDocument]{ key: {"namespace":"secureModuleTest"} }', this.docSuper.toString(), '[Super] Property "document" not lockerized!');
        testUtil.assertEquals('SecureElement: [object HTMLDivElement]{ key: {"namespace":"secureModuleTest"} }', this.elSuper.toString(), '[Super] Property "element" not lockerized!');

        testUtil.assertEquals('SecureWindow: [object Window]{ key: {"namespace":"secureModuleTest"} }', this.objSuper.win.toString(), '[Super] Object "window" not lockerized!');
        testUtil.assertEquals('SecureDocument: [object HTMLDocument]{ key: {"namespace":"secureModuleTest"} }', this.objSuper.doc.toString(), '[Super] Object  "document" not lockerized!');
        testUtil.assertEquals('SecureElement: [object HTMLDivElement]{ key: {"namespace":"secureModuleTest"} }', this.objSuper.el.toString(), '[Super] Object "element" not lockerized!');

        testUtil.assertEquals('SecureWindow: [object Window]{ key: {"namespace":"secureModuleTest"} }', this.objSuper.winFunction().toString(), '[Super] Object function "window" not lockerized!');
        testUtil.assertEquals('SecureDocument: [object HTMLDocument]{ key: {"namespace":"secureModuleTest"} }', this.objSuper.docFunction().toString(), '[Super] Object function "document" not lockerized!');
        testUtil.assertEquals('SecureElement: [object HTMLDivElement]{ key: {"namespace":"secureModuleTest"} }', this.objSuper.elFunction().toString(), '[Super] Object function  "element" not lockerized!');

        testUtil.assertEquals('SecureWindow: [object Window]{ key: {"namespace":"secureModuleTest"} }', this.objSuper.winThisContextFunction().toString(), '[Super] Object this context "window" not lockerized!');
        testUtil.assertEquals('SecureDocument: [object HTMLDocument]{ key: {"namespace":"secureModuleTest"} }', this.objSuper.docThisContextFunction().toString(), '[Super] Object this context "document" not lockerized!');
        testUtil.assertEquals('SecureElement: [object HTMLDivElement]{ key: {"namespace":"secureModuleTest"} }', this.objSuper.elThisContextFunction().toString(), '[Super] Object this context "element" not lockerized!');
    }

    @api
    testBaseComponentCreatedFunctions() {
        testUtil.assertEquals('SecureWindow: [object Window]{ key: {"namespace":"secureModuleTest"} }', this.getWinSuper().toString(), '[Super] Function "window" not lockerized! [ChildClass]');
        testUtil.assertEquals('SecureDocument: [object HTMLDocument]{ key: {"namespace":"secureModuleTest"} }', this.getDocSuper().toString(), '[Super] Function "document" not lockerized! [ChildClass]');
        testUtil.assertEquals('SecureElement: [object HTMLDivElement]{ key: {"namespace":"secureModuleTest"} }', this.getElSuper().toString(), '[Super] Function "element" not lockerized! [ChildClass]');

        testUtil.assertEquals('SecureWindow: [object Window]{ key: {"namespace":"secureModuleTest"} }', this.getWinThisContextSuper().toString(), '[Super] Function this context "window" not lockerized! [ChildClass]');
        testUtil.assertEquals('SecureDocument: [object HTMLDocument]{ key: {"namespace":"secureModuleTest"} }', this.getDocThisContextSuper().toString(), '[Super] Function this context "document" not lockerized! [ChildClass]');
        testUtil.assertEquals('SecureElement: [object HTMLDivElement]{ key: {"namespace":"secureModuleTest"} }',this.getElThisContextSuper().toString(), '[Super] Function this context "element" not lockerized! [ChildClass]');

        testUtil.assertEquals('SecureWindow: [object Window]{ key: {"namespace":"secureModuleTest"} }', this.getWinReturnSuper(window).toString(), '[Super] Function return "window" not lockerized! [ChildClass]');
        testUtil.assertEquals('SecureDocument: [object HTMLDocument]{ key: {"namespace":"secureModuleTest"} }', this.getDocReturnSuper(document).toString(), '[Super] Function return "document" not lockerized! [ChildClass]');
        testUtil.assertEquals('SecureElement: [object HTMLDivElement]{ key: {"namespace":"secureModuleTest"} }', this.getElReturnSuper(document.createElement('DIV')).toString(), '[Super] Function return "element" not lockerized! [ChildClass]');

        testUtil.assertEquals('SecureWindow: [object Window]{ key: {"namespace":"secureModuleTest"} }', this.getWinReturnFuncSuper(function() { return window; }).toString(), '[Super] Function return function "window" not lockerized! [ChildClass]');
        testUtil.assertEquals('SecureDocument: [object HTMLDocument]{ key: {"namespace":"secureModuleTest"} }', this.getDocReturnFuncSuper(function() { return document; }).toString(), '[Super] Function return function "document" not lockerized! [ChildClass]');
        testUtil.assertEquals('SecureElement: [object HTMLDivElement]{ key: {"namespace":"secureModuleTest"} }', this.getElReturnFuncSuper(function() { return document.createElement('DIV'); }).toString(), '[Super] Function return function "element" not lockerized! [ChildClass]');
    }
}
