# rimworld-xml-tool

## 这是什么？

这个工具帮助 Rimworld 模组开发者从 mod 内 "Defs" 文件夹中提取 `ThingDef` 标签定义的数据，用于后续的处理。

## 怎么使用？

前提：确保本地已经安装了 [Node.js](https://nodejs.org/en)。

1. "Code" -> "Download ZIP"，下载压缩包到本地；
2. 解压缩；
3. 终端打开文件夹，或将终端目录切换到该文件夹下；
4. 终端输入 `node ./index.js` 或 `npm run start`;

如果一切顺利，提取结果将输出至 "output/bundle.json" 中。

输出的结果是 json 格式，是一个对象数组，示例如下：

```json
[
    {
    "defName": "Chi_Tangyuan",
    "label": "汤圆",
    "texPath": "Meals/TangYuan",
    "description": "一碗经过精心烹调的汤圆，需要在传统炉灶上制作…………",
    "stats": {
      "Beauty": "1",
      "Mass": "0.3",
      "MarketValue": "25",
      "WorkToMake": "250",
      "Nutrition": "0.95"
    }
  }
]
```

上面的例子来自神州文化 mod，内容有做删减。
