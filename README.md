# asteroid
A more comprehensive management system developed on the basis of iview-admin.

这是一个基于iview-admin2.0开发的管理系统，修复了ivew-admin中的一些bug，修改了一下框架结构，并向其中加入了我自己的工具库，目前新增了日历组件、tinymce富文本编辑器组件、二维码示例、g2图表示例、聊天室示例，更多功能持续更新中。。。

## Introduction

点击查看项目文档[https://inspiration1.github.io/asteroid-doc/#/home](https://inspiration1.github.io/asteroid-doc/#/home)

### 登录

![https://raw.githubusercontent.com/Inspiration1/markdown-photos/master/asteroid/login.png](https://raw.githubusercontent.com/Inspiration1/markdown-photos/master/asteroid/login.png)

提供两个可供登录的账号，super_admin和admin，任意密码即可登录，两个账号权限不同，可访问的路由不同，super_admin拥有最高权限，而admin不可访问设置了权限拦截的路由。

### 首页

![https://raw.githubusercontent.com/Inspiration1/markdown-photos/master/asteroid/homepage.png](https://raw.githubusercontent.com/Inspiration1/markdown-photos/master/asteroid/homepage.png)

登录之后进入到首页，显示问候语，根据一天中的时间点不同显示不同的问候语，导航栏变更为伸缩式导航。

### 新增组件

#### tinymce富文本编辑器

#### fullcalendar日历

### 新增功能

#### 二维码名片

#### 聊天室

#### G2图表

## Getting started
```bush
# clone the project
git clone https://github.com/Inspiration1/asteroid.git

// install dependencies
npm install

// develop
npm run dev
```

## Build
```bush
npm run build
```