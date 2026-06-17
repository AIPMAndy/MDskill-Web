# Contributing to MDskill-Web

感谢你考虑为 MDskill-Web 做出贡献！

## 🚀 快速开始

### 开发环境设置

1. Fork 并克隆仓库
```bash
git clone https://github.com/YOUR_USERNAME/MDskill-Web.git
cd MDskill-Web
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 访问 http://localhost:5173

## 📝 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` Bug 修复
- `docs:` 文档更新
- `style:` 代码格式（不影响代码运行的变动）
- `refactor:` 重构（既不是新增功能，也不是修复 bug）
- `perf:` 性能优化
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

示例：
```bash
feat: add dark mode support
fix: correct template rendering issue
docs: update CLI usage examples
```

## 🔄 工作流程

1. 创建新分支
```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

2. 进行修改并提交
```bash
git add .
git commit -m "feat: your feature description"
```

3. 推送到你的 fork
```bash
git push origin feature/your-feature-name
```

4. 创建 Pull Request

## 🎯 代码规范

- 使用 TypeScript 编写代码
- 遵循项目现有的代码风格
- 运行 `npm run lint` 确保代码通过类型检查
- 确保 `npm run build` 能成功构建

## 🧪 测试

在提交 PR 之前：

1. 确保开发服务器正常运行
2. 测试所有主题的渲染效果
3. 验证导出功能（HTML 和 PNG）
4. 检查命令行工具是否正常工作

## 📋 PR 检查清单

提交 PR 前确保：

- [ ] 代码遵循项目风格
- [ ] 通过 TypeScript 类型检查
- [ ] 构建成功
- [ ] 功能已在本地测试
- [ ] 更新了相关文档（如需要）
- [ ] 提交信息符合规范

## 🎨 添加新主题

如果你想贡献新主题：

1. 在 `src/templates/` 目录下创建新主题文件
2. 遵循现有主题的结构
3. 在 `src/templates/index.ts` 中注册主题
4. 更新文档说明新主题的特点和适用场景

## 🐛 报告 Bug

提交 Issue 时请包含：

- 问题描述
- 重现步骤
- 预期行为
- 实际行为
- 浏览器/Node.js 版本
- 截图（如适用）

## 💡 功能建议

我们欢迎新功能建议！请先创建 Issue 讨论：

- 功能描述
- 使用场景
- 可能的实现方案
- 是否愿意实现该功能

## 📜 许可证

通过提交代码，你同意你的贡献将在 Apache-2.0 许可证下发布。

## 🙏 行为准则

- 尊重所有贡献者
- 提供建设性的反馈
- 关注代码质量和项目目标
- 保持友好和专业的沟通

## 📮 联系方式

- 微信: AIPMAndy
- GitHub: [@AIPMAndy](https://github.com/AIPMAndy)

---

再次感谢你的贡献！🎉
