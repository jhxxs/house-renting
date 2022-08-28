import Konva from "konva";
import { Group } from "konva/lib/Group";
import "normalize.css";
import "./style.css";

// const width = document.body.clientWidth;
// const height = document.body.clientHeight;

const app = document.getElementById("app")!;
const container = document.createElement("div");

app.appendChild(container);
const wn = 5,
  hn = 10,
  brickSize = 60,
  gap = 0.5,
  heightDis = 4,
  width = wn * (brickSize + gap) - gap,
  height = hn * (brickSize + gap) - gap - heightDis;
Konva.pixelRatio = window.devicePixelRatio;

const stage = new Konva.Stage({ container, width, height });

const layer = new Konva.Layer({});
stage.add(layer);

for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 10; j++) {
    console.log("ddd");
    const rect = new Konva.Rect({
      width: brickSize,
      height: brickSize,
      fill: "#fff",
      x: i * (brickSize + gap),
      y: j * (brickSize + gap),
    });
    layer.add(rect);
  }
}

// 左墙
const left = brickSize / 2;
const leftWidth = brickSize - left;

// 厕所
const washroom = new Konva.Rect({
  x: left,
  y: 0,
  width: leftWidth + brickSize + 7 + gap * 2,
  height: brickSize * 2 + gap,
  fill: "#bef7df",
});
layer.add(washroom);
const washroomText = new Konva.Text({
  text: "厕所",
  x: washroom.x() + washroom.width() / 2,
  y: washroom.height() / 2,
  fill: "#000",
});
washroomText.offsetX(washroomText.width() / 2);
washroomText.offsetY(washroomText.height() / 2);
layer.add(washroomText);

const bedExtra = 19,
  bedDiss = brickSize - bedExtra;

const bedGroup = new Konva.Group({
  // draggable: true,
});
// 床
const bed = new Konva.Rect({
  width: leftWidth + brickSize * 2 + gap * 3 + 8,
  height: bedExtra + (brickSize + gap) * 3,
  x: left,
  y: washroom.height() + bedDiss,
  fill: "#969690",
  stroke: "#fff",
  strokeWidth: 0.5,
});
bedGroup.add(bed);
const bedText = new Konva.Text({
  text: "床",
  x: bed.width() / 2 + bed.x(),
  y: bed.height() / 2 + bed.y(),
  fill: "#fff",
  fontSize: 20,
});
bedText.offsetX(bedText.width() / 2);
bedText.offsetY(bedText.height() / 2);
bedGroup.add(bedText);
layer.add(bedGroup);

const wallBg = "#213547";
const leftWall = new Konva.Rect({
  x: 0,
  y: 0,
  width: left,
  height: height,
  fill: wallBg,
});
leftWall.on("mouseover", () => {
  stage.container().style.cursor = "not-allowed";
});
leftWall.on("mouseout", () => {
  stage.container().style.cursor = "default";
});

layer.add(leftWall);
"左侧墙壁".split("").forEach((v, i) => {
  const text = new Konva.Text({
    fill: "#fff",
    text: v,
    x: leftWall.x() + leftWall.width() / 2,
    y: (i + 1) * (16 + brickSize * 2) - brickSize,
    fontSize: 14,
    fontFamily: "monospace",
  });

  text.offsetX(text.width() / 2);
  layer.add(text);
});

const doorLeftGap = 9.5,
  doorRightGap = 16,
  doorWidth = brickSize - doorLeftGap - doorRightGap,
  doorHeight = 5,
  wallWidth = 10;

const doorLeftWall = new Konva.Rect({
  x: width - 10,
  y: 0,
  width: 10,
  height: doorLeftGap,
  fill: wallBg,
});
layer.add(doorLeftWall);
const door = new Konva.Rect({
  y: doorLeftGap,
  x: doorLeftWall.x(),
  width: doorHeight,
  height: doorWidth,
  fill: "#969690",
});
const doorText = new Konva.Text({
  y: doorLeftGap + door.height() / 2,
  x: door.x() - 8,
  text: "门",
});

doorText.offsetX(doorText.width() / 2);
doorText.offsetY(doorText.height() / 2);

layer.add(door);
layer.add(doorText);

const rbw = 10,
  rww = brickSize - rbw;
const doorRightWall = new Konva.Rect({
  width: doorLeftWall.width(),
  height: doorRightGap,
  x: doorLeftWall.x(),
  y: doorLeftWall.height() + door.height(),
  fill: wallBg,
});
layer.add(doorRightWall);

const rightWall = new Konva.Line({
  points: [
    // 0
    width,
    doorRightWall.y() + doorRightWall.height() + left / 2,
    // 1
    width - brickSize + left / 2,
    doorRightWall.y() + doorRightWall.height() + left / 2,
    // 2
    width - brickSize + left / 2,
    height,
  ],
  strokeWidth: left,
  stroke: wallBg,
});
layer.add(rightWall);

const nextDoorTop =
  doorLeftWall.height() + door.height() + doorRightWall.height();
const nextDoorRest = height - nextDoorTop;
"隔壁房间".split("").forEach((v, i, arr) => {
  const text = new Konva.Text({
    text: v,
    x: width - left,
    y: nextDoorTop + left + brickSize + (i * nextDoorRest) / arr.length,
  });
  text.offsetX(-text.width() / 1.5);
  layer.add(text);
});

const twoWindow = new Konva.Rect({
  width: width - brickSize - left - gap,
  height: 9,
  x: left + gap,
  y: height - 9,
  fill: washroom.fill(),
});
layer.add(twoWindow);
const windowText = new Konva.Text({
  text: "窗户",
  x: twoWindow.x() + twoWindow.width() / 2,
  y: twoWindow.y(),
});
windowText.offsetY(windowText.height());
windowText.offsetX(windowText.width() / 2);
layer.add(windowText);

const table = new Konva.Rect({
  name: "table",
  width: 100,
  height: 60,
  x: left + left,
  y: bed.y() + bed.height(),
  fill: "#ffce46",
  draggable: true,
});
// const tableGroup = new Konva.Group({
//   draggable: true,
// });
const tableText = new Konva.Text({
  name: "tableText",
  text: "桌子",
  x: table.x() + table.width() / 2,
  y: table.y() + table.height() / 2,
  fill: "#fff",
  draggable: true,
});
tableText.offsetX(tableText.width() / 2);
tableText.offsetY(tableText.height() / 2);
layer.add(table);
layer.add(tableText);
// layer.add(tableGroup);

const kitchen = new Konva.Rect({
  width: 50,
  height: 120,
  x: left,
  y: twoWindow.y() - 120,
  fill: "#98958c",
});
const kitchenText = new Konva.Text({
  text: "橱柜",
  x: kitchen.x() + kitchen.width() / 2,
  y: kitchen.y() + kitchen.height() / 2,
  fill: "#fff",
});
kitchenText.offsetX(tableText.width() / 2);
kitchenText.offsetY(kitchenText.height() / 2);
layer.add(kitchen);
layer.add(kitchenText);

const transformer = new Konva.Transformer({
  draggable: true,
  resizeEnabled: false,
});

stage.on("click", (e) => {
  e.evt.preventDefault();
  // e.evt.stopPropagation();
  const name = e.target.name();
  if (name == "table" || name == "tableText") {
    transformer.nodes([table, tableText]);
  } else if (name == "chair" || name == "chairText") {
    transformer.nodes([chair, chairText]);
  } else if (name == "boot" || name == "bootText") {
    transformer.nodes([boot, bootText]);
  } else {
    transformer.nodes([]);
  }
});
layer.add(transformer);

const chair = new Konva.Circle({
  radius: 34,
  fill: "#fff",
  stroke: "#1b1b1b",
  draggable: true,
  name: "chair",
  x: table.x() + table.width() / 2 + 10,
  y: table.y() + table.height() + 5 + 34,
});

const chairText = new Konva.Text({
  text: "办公椅",
  x: chair.x(),
  y: chair.y(),
  draggable: true,
  name: "chairText",
});
chairText.offsetX(chairText.width() / 2);
chairText.offsetY(chairText.height() / 2);
layer.add(chair);
layer.add(chairText);

const boot = new Konva.Rect({
  cornerRadius: 4,
  width: 40,
  height: 20,
  x: twoWindow.x() + twoWindow.width(),
  y: height - twoWindow.height() - 40 - brickSize - brickSize,
  fill: "#000",
  name: "boot",
  draggable: true,
});
const bootText = new Konva.Text({
  text: "行李箱",
  fontSize: 9,
  fill: "#fff",
  x: boot.x() + boot.width() / 2,
  y: boot.y() + boot.height() / 2,
  name: "bootText",
  draggable: true,
});
bootText.offsetX(bootText.width() / 2);
bootText.offsetY(bootText.height() / 2);
const bootGroup = new Konva.Group({
  // x: boot.x(),
  // y: boot.y(),
  width: boot.width(),
  height: boot.height(),
});
bootGroup.add(boot);
bootGroup.add(bootText);
layer.add(bootGroup);
