# Contributing to MDskill-Web

感谢你考虑为 MDskill-Web 做出贡献！🎉

## 🤝 如何贡献

### 报告 Bug

如果你发现了 bug，请[创建 Issue](https://github.com/AIPMAndy/MDskill-Web/issues/new)并包含：
- Bug 的详细描述
- 复现步骤
- 期望的行为
- 实际的行为
- 截图（如果可能）
- 浏览器和操作系统信息

### 提议新功能

有好的想法？[创建 Feature Request](https://github.com/AIPMAndy/MDskill-Web/issues/new)并描述：
- 功能的用途和价值
- 期望的行为
- 可能的实现方案
- 相关的截图或原型

### 贡献代码

1. **Fork 项目**
   ```bash
   git clone https://github.com/YOUR_USERNAME/MDskill-Web.git
   cd MDskill-Web
   ```

2. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

4. **开发和测试**
   ```bash
   npm run dev      # 启动开发服务器
   npm run lint     # 检查代码规范
   npm run build    # 构建项目
   ```

5. **提交代码**
   ```bash
   git add .
   git commit -m "feat: 添加新功能"
   # 或
   git commit -m "fix: 修复某个 bug"
   ```

   提交信息格式：
   - `feat:` 新功能
   - `fix:` Bug 修复
   - `docs:` 文档更新
   - `style:` 代码格式调整
   - `refactor:` 重构
   - `test:` 测试相关
   - `chore:` 构建/工具相关

6. **推送并创建 PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   
   然后在 GitHub 上创建 Pull Request

## 🎨 贡献主题

我们非常欢迎新的主题贡献！

### 主题开发步骤

1. **在 `src/templates/index.ts` 中添加主题**
   ```typescript
   export const yourTheme: Template = {
     id: 'your-theme',
     name: '你的主题名称',
     description: '主题描述',
     category: 'creative', // creative/tech/minimal/business/story
     icon: '🎨',
     isPro: false, // 免费主题设为 false
     styles: {
       backgroundColor: '#ffffff',
       maxWidth: '680px',
       padding: '40px 32px',
       // ... 其他样式配置
     }
   }
   ```

2. **将主题添加到 `allTemplates` 数组**
   ```typescript
   export const allTemplates: Template[] = [
     // ... 其他主题
     yourTheme,
   ]
   ```

3. **测试主题**
   - 启动开发服务器
   - 在侧边栏选择你的主题
   - 测试不同的 Markdown 元素（标题、列表、代码块、表格等）
   - 截图保存

4. **提交 PR**
   - PR 标题：`feat: 添加 [主题名称] 主题`
   - 附上主题预览截图
   - 说明主题的设计理念和适用场景

### 主题设计建议

- **配色和谐**：选择协调的颜色组合
- **对比度**：确保文字清晰可读
- **微信适配**：测试在微信公众号中的显示效果
- **响应式**：在不同屏幕尺寸下测试
- **参考现有**：查看现有主题的实现方式

## 📝 代码规范

### TypeScript
- 使用 TypeScript，定义清晰的类型
- 避免使用 `any`
- 导出的接口和类型要有注释

### React
- 使用函数组件和 Hooks
- 组件职责单一
- Props 要有类型定义

### 样式
- 优先使用 Tailwind CSS
- 避免内联样式（主题样式除外）
- 保持类名简洁

### 命名
- 文件名：PascalCase（组件）或 camelCase（工具函数）
- 组件：PascalCase
- 函数/变量：camelCase
- 常量：UPPER_SNAKE_CASE

## 🧪 测试

在提交 PR 前，请确保：
- [ ] `npm run lint` 无错误
- [ ] `npm run build` 构建成功
- [ ] 在浏览器中手动测试功能
- [ ] 测试不同主题的显示效果
- [ ] 测试微信公众号复制功能

## 📄 文档

如果你的贡献涉及用户可见的变更：
- 更新 README.md
- 更新 CHANGELOG.md
- 添加必要的注释

## 🎯 优先级

我们特别欢迎以下贡献：
1. 🎨 新的主题设计
2. 🐛 Bug 修复
3. 📱 移动端优化
4. ♿ 无障碍改进
5. 🌍 国际化支持
6. 📖 文档改进

## ❓ 有问题？

- 查看 [FAQ](https://github.com/AIPMAndy/MDskill-Web/wiki/FAQ)
- 在 [Discussions](https://github.com/AIPMAndy/MDskill-Web/discussions) 提问
- 联系维护者：微信 AIPMAndy

---

感谢你的贡献！🙏
