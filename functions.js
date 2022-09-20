function htmlToJSON(html) {
    const items = html.split('<li class="ui-search-layout__item">');
    let json = items
        .map((item) => ({
            title: getBetweenString(item, '<h2 class="ui-search-item__title">', "</h2>").trimStart().trimEnd(),
            img: getBetweenString(item, 'data-src="', '"'),
            priceString: getBetweenString(item, '><span class="price-tag-text-sr-only">', "</span>").trimStart().trimEnd(),
            price: `$${getBetweenString(item, '<span class="price-tag-fraction">', "</span>")}, ${getBetweenString(
                item,
                '<span class="price-tag-cents">',
                "</span>"
            )}`.trim(),
            url: getBetweenString(item, '<a href="', '"'),
        }))
        .filter((el) => el.title !== "undefined");
    return json;
}

function jsonToStringMsg(json, limit) {
    let string = "";
    for (let i = 0; i < json.length && i < limit; i++) {
        const item = json[i];
        string += `🚀#*${i + 1}.* _${item.title}_\n*${item.price}*\n${item.url}\n\n`;
    }
    return string;
}

function getBetweenString(string, strStart, strEnd) {
    return (string.split(strStart, 2)[1] + "").split(strEnd, 2)[0] + "";
}

module.exports = {
    htmlToJSON,
    jsonToStringMsg,
};
