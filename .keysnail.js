// ========================== KeySnail Init File =========================== //

// You can preserve your code in this area when generating the init file using GUI.
// Put all your code except special key, set*key, hook, blacklist.
// ========================================================================= //
//{{%PRESERVE%

// http://d.hatena.ne.jp/mooz/20091123/p1 :

ext.add("list-closed-tabs", function () {
    const fav = "chrome://mozapps/skin/places/defaultFavicon.png";
    var ss   = Cc["@mozilla.org/browser/sessionstore;1"].getService(Ci.nsISessionStore);
    var json = Cc["@mozilla.org/dom/json;1"].createInstance(Ci.nsIJSON);
    var closedTabs = [[tab.image || fav, tab.title] for each (tab in json.decode(ss.getClosedTabData(window)))];

    if (!closedTabs.length)
        return void display.echoStatusBar("最近閉じたタブが見つかりませんでした", 2000);

    prompt.selector(
        {
            message    : "select tab to undo:",
            collection : closedTabs,
            flags      : [ICON | IGNORE, 0],
            callback   : function (i) { if (i >= 0) window.undoCloseTab(i); }
        });
}, "List closed tabs");

plugins.options["content_focus.white_list"] = [
//  'http://www.prisjakt.nu',
  'https://signin\.ebay\.ie',
  'https://.*skandiabanken\.se',
  'http://192\.168\.0\.',
  'about:blank'
//  '^[^h]'
];

plugins.options["linkdownloads.direcotry_path"] = "~/Downloads";

//}}%PRESERVE%
// ========================================================================= //

// ========================= Special key settings ========================== //

key.quitKey              = "C-g";
key.helpKey              = "<f1>";
key.escapeKey            = "C-q";
key.macroStartKey        = "Not defined";
key.macroEndKey          = "Not defined";
key.universalArgumentKey = "C-u";
key.negativeArgument1Key = "C--";
key.negativeArgument2Key = "C-M--";
key.negativeArgument3Key = "M--";
key.suspendKey           = "<f2>";

// ================================= Hooks ================================= //


hook.setHook('KeyBoardQuit', function (aEvent) {
    if (key.currentKeySequence.length) {
        return;
    }
    command.closeFindBar();
    var marked = command.marked(aEvent);
    if (util.isCaretEnabled()) {
        if (marked) {
            command.resetMark(aEvent);
        } else {
            if ("blur" in aEvent.target) {
                aEvent.target.blur();
            }
            gBrowser.focus();
            _content.focus();
        }
    } else {
        goDoCommand("cmd_selectNone");
    }
    if (KeySnail.windowType === "navigator:browser" && !marked) {
        key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_ESCAPE, true);
    }
});


// ============================= Key bindings ============================== //

key.setGlobalKey('M-x', function (aEvent, aArg) {
    ext.select(aArg, aEvent);
}, 'List exts and execute selected one');


// HoK

key.setViewKey('f', function (aEvent, aArg) {
    ext.exec("hok-start-foreground-mode", aArg);
}, 'Hok - Foreground hint mode', true);

key.setViewKey('F', function (aEvent, aArg) {
    ext.exec("hok-start-background-mode", aArg);
}, 'HoK - Background hint mode', true);

key.setViewKey(';', function (aEvent, aArg) {
    ext.exec("hok-start-extended-mode", aArg);
}, 'HoK - Extented hint mode', true);

key.setViewKey(['C-c', 'C-e'], function (aEvent, aArg) {
    ext.exec("hok-start-continuous-mode", aArg);
}, 'Start continuous HaH', true);


// bmany

key.setViewKey([':', 'b'], function (ev, arg) {
    ext.exec("bmany-list-all-bookmarks", arg, ev);
}, 'bmany - List all bookmarks');

key.setViewKey([':', 'B'], function (ev, arg) {
    ext.exec("bmany-list-bookmarklets", arg, ev);
}, "bmany - List all bookmarklets");

key.setViewKey([':', 'k'], function (ev, arg) {
    ext.exec("bmany-list-bookmarks-with-keyword", arg, ev);
}, "bmany - List bookmarks with keyword");


// K2Emacs

key.setEditKey(["C-c", "e"], function (ev, arg) {
    ext.exec("edit_text", arg, ev);
}, "外部エディタで編集", true);

plugins.options [ "K2Emacs.editor"  ] = "/usr/bin/emacsclient";

// tanything
key.setViewKey("a", function (ev, arg) {
                   ext.exec("tanything", arg);
               }, "view all tabs", true);



key.setViewKey(['u', 'c'], function () {
    ext.exec("list-closed-tabs");
}, 'List closed tabs');

key.setViewKey(['u', 't'], function () {
    undoCloseTab();
}, 'Undo closed tab');


// My own creations ..

key.setViewKey(',', function (aEvent, aArg) {
    ext.exec("back", aArg);
}, 'My Back', true);

key.setViewKey('.', function (aEvent, aArg) {
    ext.exec("forward", aArg);
}, 'My Forward', true);

key.setViewKey('r', function (aEvent, aArg) {
    ext.exec("reload-the-page", aArg);
}, 'My Reload', true);

// not working:
key.setViewKey('DEL', function (aEvent, aArg) {
    ext.exec("page-up", aArg);
}, 'My Pageup', true);

key.setViewKey('g', function (aEvent, aArg) {
    ext.exec("focus-to-the-location-bar", aArg);
}, 'My Focus to Location Bar', true);

// key.setViewKey(["C-x", "l"],
//                function () {
//                    command.focusToById('urlbar');
//                },
//                "Focus to the location bar", true);


key.setViewKey('j', function (aEvent, aArg) {
    ext.exec("focus-to-prompt", aArg);
}, 'My Focus to Keysnail prompt', true);


key.setViewKey('t', function (aEvent, aArg) {
    ext.exec("open-the-new-tab", aArg);
//    ext.exec("focus-to-content", aArg);
    ext.exec("focus-to-the-location-bar", aArg);
}, 'New tab', true);

key.setViewKey('T', function (aEvent, aArg) {
    ext.exec("open-the-new-tab", aArg);
    ext.exec("focus-to-content", aArg);
}, 'New tab', true);

key.setViewKey('q', function (aEvent, aArg) {
    ext.exec("close-tab-window", aArg);
}, 'Close tab', true);

key.setViewKey('Q', function (aEvent, aArg) {
    ext.exec("close-the-window", aArg);
}, 'Close window', true);



// stop searching by hit Enter on search box
// gFindBar.getElement("findbar-textbox")
//     .addEventListener("keypress", emacslike_search, false);

// function emacslike_search(ev){
//     if(ev.ctrlKey && ev.charCode == 115){ // C-s
//         gFindBar.onFindAgainCommand(false);
//     }
//     if(ev.keyCode == 13){ // Enter
//         gFindBar.onFindAgainCommand(true);
//         gFindBar.close();
//     }
//TODO: save searching start point and back to it when searching is finished with C-g
//}

//gconftool-2 -s /desktop/gnome/url-handlers/org-protocol/command '/usr/bin/emacsclient %s' --type String
//gconftool-2 -s /desktop/gnome/url-handlers/org-protocol/enabled --type Boolean true


key.setViewKey('S', function (aEvent, aArg) {
    var orgProtoString = 'org-protocol://store-link://'+
        encodeURIComponent(gBrowser.currentURI.spec) + '/' +
        encodeURIComponent(gBrowser.contentWindow.document.title) + '/' +
        encodeURIComponent(gBrowser.contentWindow.getSelection());

    gBrowser.loadURI(orgProtoString);
}, 'Org Store Link', true);


key.setViewKey('C', function (aEvent, aArg) {
    var orgProtoString = 'org-protocol://capture://'+
//    var orgProtoString = 'org-protocol://remember://'+
        encodeURIComponent(gBrowser.currentURI.spec) + '/' +
        encodeURIComponent(gBrowser.contentWindow.document.title) + '/' +
        encodeURIComponent(gBrowser.contentWindow.getSelection());

    gBrowser.loadURI(orgProtoString);
}, 'Org Capture', true);


// key.setViewKey('B', function (aEvent, aArg) {
//     isInstalled=function(){return 'Plugin';};initAuthenticatePlugin();document.getElementById('ctl00_cphMainContentWide_rbtnBankID').click();BankIDActivate();void(0)
// }, 'Fribid BankID activation', true);



key.defineKey([key.modes.VIEW, key.modes.CARET],
              'N',
              function (ev) {
                  ext.exec("noscript-selector");
              }, 'NoScript - selector');

key.defineKey([key.modes.VIEW, key.modes.CARET],
              ['C-c', 'C-n'],
              function (ev) {
                  ext.exec("noscript-show-popup");
              }, 'NoScript - popup menu');
