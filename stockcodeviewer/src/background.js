
/******************
 * Reference:
 * https://developer.chrome.com/docs/extensions/mv3/getstarted/
 ******************/

chrome.runtime.onInstalled.addListener(function (details) {
	const parent = chrome.contextMenus.create({
		id: "finance",
		title: "株価サイトを表示",
		contexts: ["selection"],
	});
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
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
	let baseurl = '';
	switch (info.menuItemId) {
		case "kabutanChart":
			baseurl = 'https://kabutan.jp/stock/chart?code=';
			break;
		case "yjfChart":
			baseurl = 'https://finance.yahoo.co.jp/search/?query=';
			break;
	}
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: gotoStockChart,
		args: [baseurl],
	});
});

function gotoStockChart(baseurl) {
	let text = String(document.getSelection());
	text = text.trim();
	let url = baseurl + text;
	url = encodeURI(url);
	window.open(url, '_blank');
}

