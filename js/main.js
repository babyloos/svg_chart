$(function() {
    // 初期設定
    cameraX = 0;
    candleCount = 30;
    areaHeight = $('.chart-box').height();
    areaWidth = $('.chart-box').width();

    drawChart(cameraX, candleCount);
});

// 現在表示しているローソクの最大値、最小値を返す。
function getHighLow(chartData, cameraX, candleWidth, candleClearance, candleCount) {
    // 現在表示しているローソクを調べる
    // 先頭のローソク
    var firstCandle = (Math.floor(cameraX / (candleWidth + candleClearance))) * -1 - 1;
    if(firstCandle < 0) firstCandle = 0;
    // 末尾のローソク
    // var areaWidth = $('.chart-box').width();
    var lastCandle = Math.floor((areaWidth - cameraX) / (candleWidth + candleClearance));
    // 最大値を調べる
    var invesArray = chartData.slice(firstCandle, lastCandle+1);
    // それぞれの最大値を集めた配列を作成
    var maxArray = [];
    for(var i=0; i<invesArray.length; i+=1) {
        // 日付部分を除外
        var invesMax = invesArray[i].slice(1, 5)
        maxArray.push(Math.max.apply(null, invesMax));
    }
    var max = Math.max.apply(null, maxArray);
    // 最小値を調べる
    var invesArray = chartData.slice(firstCandle, lastCandle+1);
    // それぞれの最小値を集めた配列を作成
    var minArray = [];
    for(var i=0; i<invesArray.length; i+=1) {
        // 日付部分を除外
        var invesMin = invesArray[i].slice(1, 5)
        minArray.push(Math.min.apply(null, invesMin));
    }
    var min = Math.min.apply(null, minArray);

    // console.log(firstCandle);
    console.log(lastCandle);
    // var min = Math.min.apply(null, );
    // console.log(max);
    // console.log(min);
    return {min: min, max: max};
}

// マウス移動イベント
$('#candle-chart-svg').hover(
        function() {
        },
        function() {
            $('#candle-chart-svg .mouseLineX, #candle-chart-svg .mouseLineY').remove();
        }
    );
$('#candle-chart-svg').mousemove(function(e) {
    var mouseX = e.offsetX;
    var mouseY = e.offsetY;
    drawMouseLine(mouseX, mouseY);
});

// マウスレーダー表示
function drawMouseLine(mouseX, mouseY) {
    console.log(mouseX);
    console.log(mouseY);
    var lineX = document.createElementNS("http://www.w3.org/2000/svg", "line");
    var lineY = document.createElementNS("http://www.w3.org/2000/svg", "line");
    lineX.setAttribute('x1', 0);
    lineX.setAttribute('y1', mouseY);
    lineX.setAttribute('x2', areaWidth);
    lineX.setAttribute('y2', mouseY);
    lineY.setAttribute('x1', mouseX);
    lineY.setAttribute('y1', 0);
    lineY.setAttribute('x2', mouseX);
    lineY.setAttribute('y2', areaHeight);
    lineX.setAttribute('class', 'mouseLineX');
    lineY.setAttribute('class', 'mouseLineY');
    // 描画
    $('#candle-chart-svg .mouseLineX, #candle-chart-svg .mouseLineY').remove();
    $('#candle-chart-svg').append(lineX);
    $('#candle-chart-svg').append(lineY);
    $('.mouseLineX').attr({'stroke': 'gray'});
    $('.mouseLineY').attr({'stroke': 'gray'});
}

var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    $('#candle-chart-svg').on(mousewheelevent,function(e){
        e.preventDefault();
        var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
        if (delta < 0){
            // 下スクロール
            console.log('した');
            candleCount -= 3;
            drawChart(cameraX, candleCount);
        } else {
            // 上スクロール
            console.log('うえ');
            candleCount += 3;
            drawChart(cameraX, candleCount);
        }
    });
$('#candle-chart-svg').mousedown(function(e) {
    if(e.button != 0) return false;
        console.log("マウスダウン！！");
        var bx = e.offsetX;
        var by = e.offsetY;
        $(document).on("mousemove.move", function(e) {
            // console.log("move!!");
            // var moveX = Number(bx) - e.offsetX;
            var moveX = e.offsetX - Number(bx);
            // console.log(moveX);
            cameraX += moveX;
            drawChart(cameraX, candleCount);
            bx = e.offsetX;
        }).one('mouseup', function() {
                // console.log("マウスアップ!!");
                $(document).off('mousemove.move');
            });
            return false;
});

// チャート描画
function drawChart(cameraX, candleCount) {
    //　チャート生成
    // 初期設定
    // キャンバスを初期化
    $('#candle-chart-svg').text("");
    // var candleWidth = 10;

    // var lowerLine = 500;

    // 日付、始値、高値、安値、終値
    var chartData = [
        ['5/17', 4500, 11000, 4500, 3500],
        ['5/18', 4500, 4500, 1100, 2500],
        ['5/19', 2500, 8000, 1500, 1500],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/21', 1500, 10000, 1200, 2400],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100, 2500],
        ['5/20', 1500, 2000, 1100, 1232],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/20', 1500, 2000, 1100,1000],
        ['5/22', 27000, 30000, 10000, 15000],
    ];
    // console.log(chartData);

    // 描画

    // -----座標の考え方-----
    // 値0 = 720px
    // 値max = 0px
    // カメラ座標 = cameraX
    // 表示方法： x + cameraX;
    // ズーム：　表示するローソクの数を増減させる
    // 初期設定
    // 表示領域のサイズ
    // var areaHeight = $('.chart-box').height();
    // var areaWidth = $('.chart-box').width();
    // 表示させるローソクの数
    // var candleCount = 30;
    var candleCount = candleCount;
    // キャンドル同士の隙間
    var candleClearance = 1;
    // キャンドルの幅
    var candleWidth = areaWidth / candleCount - candleClearance;
    // カメラ座標
    var cameraX = cameraX;
    console.log(candleCount);
    var highLow = getHighLow(chartData, cameraX, candleWidth, candleClearance, candleCount);
    // 現在の最高値
    var hightVal = highLow.max;
    // 現在の最低値
    var lowestVal = highLow.min;
    // 真ん中の値
    // var centerVal = (hightVal - lowestVal) / 2;
    var range = hightVal - lowestVal;
    for(var i=0; i<chartData.length; i++) {
        if(chartData[i][1] > chartData[i][4]) {
            var rectTop = chartData[i][1];
            var rectBottom = chartData[i][4];
            var chartType = 'down';
        } else {
            var rectTop = chartData[i][4];
            var rectBottom = chartData[i][1];
            var chartType = 'up';
        }
        var rectX = i * candleWidth + candleClearance * i + cameraX; // ボックスx座標
        var lineX = i * candleWidth + candleClearance * i + candleWidth / 2 // ラインx座標
        // var rectY =  areaHeight - (areaHeight * (centerVal / chartData[i][1] * 0.01 * 50)); // ボックス上点座標
        var rectY =  areaHeight - (areaHeight * ((rectTop - lowestVal) / range)); // ボックス上点座標
        var rectLowest =  areaHeight - (areaHeight * ((rectBottom - lowestVal) / range)); // ボックス下点座標
        var rectHeight = Math.abs(rectY - rectLowest);
        // var rectHeight = rectY - rectLowest;
        var lineM = areaHeight - (areaHeight * ((chartData[i][2] - lowestVal) / range)); // ライン上点座標
        var lineL = areaHeight - (areaHeight * ((chartData[i][3] - lowestVal) / range)); // ライン下点座標
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute('x', rectX);
        rect.setAttribute('y', rectY);
        rect.setAttribute('width', candleWidth);
        rect.setAttribute('height', rectHeight);
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute('d', "M" + (rectX + candleWidth / 2) + "," + lineM + "L" + (rectX + candleWidth / 2) + "," + lineL);
        var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        $(g).append(path);
        $(g).append(rect);
        if(chartType == 'down') g.setAttribute('class', 'candle-down');
        else g.setAttribute('class', 'candle-up');
        $('#candle-chart-svg').append(g);
        // console.log(g);
    }
    // 色設定
    $('.candle-up').attr({'fill': 'white'});
    $('.candle-up').attr({'stroke': 'green'});
    $('.candle-down').attr({'fill': 'red'});
    $('.candle-down > path').attr({'stroke': 'red'});


    // グラフ内文字列描画

    // 価格帯

    // 最高値
    var hightValText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    hightValText.setAttribute('dy', ".32em");
    hightValText.setAttribute('x', areaWidth - 50);
    hightValText.setAttribute('y', 10);
    hightValText.textContent = hightVal;
    var lowestValText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    lowestValText.setAttribute('dy', ".32em");
    lowestValText.setAttribute('x', areaWidth - 50);
    lowestValText.setAttribute('y', areaHeight - 10);
    lowestValText.textContent = lowestVal;
    $('#candle-chart-svg').append(hightValText);
    $('#candle-chart-svg').append(lowestValText);
    // debug
    // console.log(rectX);
}