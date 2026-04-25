let inputElement;
let sizeSlider;
let jumpButton;
let siteSelect;
let iframeDiv;
let iframeElement;
let isJumping = false;
let colors = ['#FF0000', '#FF8C00', '#FFFF00', '#7FFF00', '#00FF00']; // 紅色與綠色的漸變

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(LEFT, CENTER);

  // 1. 建立文字輸入框 (高度 50px, 文字大小 30px)
  inputElement = createInput('Hello');
  inputElement.position(20, 20);
  inputElement.size(200, 50);
  inputElement.style('font-size', '30px');

  // 2. 建立滑桿 (範圍 15 到 80，預設值 30)
  sizeSlider = createSlider(15, 80, 30);
  sizeSlider.position(240, 35); // 放在 input 右邊 20px，高度置中

  // 3. 建立跳動開關按鈕
  jumpButton = createButton('跳動開關');
  jumpButton.position(sizeSlider.x + sizeSlider.width + 20, 35); 
  jumpButton.mousePressed(() => isJumping = !isJumping);

  // 4. 建立下拉式選單 (位於按鈕右邊 20px)
  siteSelect = createSelect();
  siteSelect.position(jumpButton.x + jumpButton.width + 20, 35);
  siteSelect.option('淡江教科系', 'https://www.et.tku.edu.tw');
  siteSelect.option('淡江大學', 'https://www.tku.edu.tw');
  siteSelect.changed(changeSite);

  // 5. 產生中央的 DIV 與 iframe
  iframeDiv = createDiv('');
  iframeDiv.position(100, 100);
  iframeDiv.size(windowWidth - 200, windowHeight - 200);
  iframeDiv.style('opacity', '0.95'); // 透明度為 95%
  iframeDiv.style('background-color', 'white'); // 增加背景色讓內容較易閱讀

  iframeElement = createElement('iframe');
  iframeElement.attribute('src', 'https://www.et.tku.edu.tw');
  iframeElement.size(windowWidth - 200, windowHeight - 200);
  iframeElement.style('border', 'none');
  iframeElement.parent(iframeDiv);
}

function draw() {
  background(240);
  let txt = inputElement.value();
  let currentSize = sizeSlider.value();
  textSize(currentSize);

  if (txt.length > 0) {
    let spacing = 20;
    let textW = textWidth(txt) + spacing;
    let lineSpacing = 50; // 排與排間隔 50px

    // y 從 100 開始，填滿整個視窗
    for (let y = 100; y < height; y += lineSpacing) {
      let colorCounter = 0;
      for (let x = 0; x < width; x += textW) {
        // 設定色票顏色循環
        fill(colors[colorCounter % colors.length]);
        
        let drawX = x;
        let drawY = y;

        if (isJumping) {
          // 隨著時間與位置不同有不同的跳動距離
          drawX += sin(frameCount * 0.1 + x * 0.1) * 10;
          drawY += cos(frameCount * 0.1 + y * 0.1) * 10;
        }

        text(txt, drawX, drawY);
        colorCounter++;
      }
    }
  }
}

function changeSite() {
  let selectedUrl = siteSelect.value();
  iframeElement.attribute('src', selectedUrl);
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小以維持全螢幕
  resizeCanvas(windowWidth, windowHeight);
  iframeDiv.size(windowWidth - 200, windowHeight - 200);
  iframeElement.size(windowWidth - 200, windowHeight - 200);
}
