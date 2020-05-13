# 总结

## 结构化程序设计

- 使用 OC 模拟 js 引擎执行过程
  - while(true) 来形成 event loop
  - OC 的 evaluate/call JS 代码会形成宏任务， JS 脚本内代码为微任务，then 会创建新的微任务

- JS 执行角度介绍事件队列
