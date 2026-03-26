npm install 
npm run build:chrome    ：生成 Chrome 专用版本。
npm run build:firefox   ：生成 Firefox 专用版本（会自动配置所需的 background.scripts）。

Firefox：运行 npm run build:firefox，然后在 about:debugging#/runtime/this-firefox 加载生成的 dist/manifest.json。
Chrome：运行 npm run build:chrome，然后在 chrome://extensions/ 加载 dist 文件夹。