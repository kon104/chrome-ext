
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
	switch (info.menuItemId) {
		case "kabutanChart":
			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				function: kabutanChart,
			});
			break;
		case "yjfChart":
			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				function: yjfChart,
			});
			break;
	}
});

function kabutanChart() {
	let baseurl = "https://kabutan.jp/stock/chart?code=";
	let text = String(document.getSelection());
	text = text.trim();
	let url = baseurl + text;
	url = encodeURI(url);
	window.open(url, '_blank');
}

function yjfChart() {
	let baseurl = "https://finance.yahoo.co.jp/search/?query=";
	let text = String(document.getSelection());
	text = text.trim();
	let url = baseurl + text;
	url = encodeURI(url);
	window.open(url, '_blank');
}

