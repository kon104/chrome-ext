
/******************
 * Reference:
 * https://developer.chrome.com/docs/extensions/mv3/getstarted/
 ******************/

chrome.runtime.onInstalled.addListener(function (details) {
	const parent = chrome.contextMenus.create({
		id: "gmap",
		title: "Google マップ",
		contexts: ["selection"],
	});
/*
	chrome.contextMenus.create({
		parentId: parent,
		id: "kabutanChart",
		title: "株探：チャート",
		contexts: ["all"],
	});
	chrome.contextMenus.create({
		parentId: parent,
		id: "yjfChart",
		title: "Yahoo! ファイナンス",
		contexts: ["all"],
	});
*/
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
	let baseurl = '';
	switch (info.menuItemId) {
		case "gmap":
			baseurl = 'https://www.google.com/maps/search/?api=1&query=';
			break;
		case "kabutanChart":
			baseurl = 'https://kabutan.jp/stock/chart?code=';
			break;
		case "yjfChart":
			baseurl = 'https://finance.yahoo.co.jp/search/?query=';
			break;
	}
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: gotoUrlWithDraggedText,
		args: [baseurl],
	});
});

function gotoUrlWithDraggedText(baseurl) {
	let text = String(document.getSelection());
	text = text.trim();
	let url = baseurl + text;
	url = encodeURI(url);
	window.open(url, '_blank');
}

