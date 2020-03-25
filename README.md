# 需求说明

## API说明

- 根据客户端传递过来的不同参数（状态、页码）查询任务列表
- 实现 新增一个任务 功能
  - 名称
  - 截止日期
  - 内容
- 编辑功能：根据客户端传递的 任务对象（已经存在的数据）进行编辑
  - 名称
  - 截至日期
  - 内容
  - id
- 删除任务（id)
- 修改任务状态
  - id
  - 状态值（待办/完成)

## API 实现

### 数据库操作

#### 数据库初始化

- 创建数据库

- 使用 `sequelize cli` 初始化项目数据库配置信息

  ```shell
  npx sequelize init
  ```

- 生成模型文件

  - migrate 文件
  - model 文件

  ```shell
  npx sequelize model:generate --name Todo	--attributes name:string,deadline:timestamp,content:string
  ```

- 持久化模型对应的表

  ```shell
  npx sequelize db:migrate
  ```

#### API中使用ORM模型

### 项目发布运维

pm2

