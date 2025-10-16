# New-Student-Enrollment-System

这是一款基于新生入学前的系统开发，旨在了解学校的一些规定要求，通过新生答题的方式，从大一到大四整个流程能够讲明白的。

## 数据模型概览


### 后端（Spring Boot + MySQL）
- `UserInfo`：使用关系型表存储微信 openid、角色、昵称、头像、性别和入学年份等信息。
- `ContentDisplay`：使用关系型表存储面向不同角色的内容，包括标题、正文、发布时间和作者。


### 前端（Vue.js）
- TypeScript 类型定义（`frontend/src/types/index.ts`）描述用户信息与内容模型。
- `frontend/src/services/api.ts` 提供访问后端 REST API 的基础封装。

### 微信小程序（云开发）
- 云数据库集合 Schema 位于 `miniprogram/cloud/database/collections/`，用于同步用户信息和内容展示的数据结构。
