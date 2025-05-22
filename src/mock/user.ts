export default [
  {
    url: "/api/user/login",
    method: "post",
    response: () => ({
      code: 0,
      message: "success",
      data: {
        token: "token-20250519",
        username: ["admin", "operator"][Math.floor(Math.random() * 2)],
      },
    }),
  },
  {
    url: "/api/user/login1",
    method: "post",
    response: () => ({
      code: -1,
      message: "fail",
      data: "登录失败",
    }),
  },
  {
    url: "/api/user/getDetail",
    method: "post",
    response: () => ({
      code: 0,
      message: "success",
      data: {
        power: ["1", "2"][Math.floor(Math.random() * 2)],
        menus: [
          {
            name: "系统管理",
            key: "001",
            icon: "el-icon-monitor",
            children: [
              {
                name: "配置1",
                key: "00101",
                icon: "el-icon-star",
                url: "/home/analysis/overview",
              },
              {
                name: "配置2",
                key: "00102",
                icon: "el-icon-star",
                url: "/home/analysis/statistic",
              },
            ],
          },
          {
            name: "商品管理",
            key: "002",
            icon: "el-icon-monitor",
            children: [
              {
                name: "商品管理页",
                key: "00201",
                icon: "el-icon-star",
                url: "/home/system/role",
              },
              {
                name: "商品2",
                key: "00202",
                icon: "el-icon-star",
                url: "/home/system/userConfig",
              },
            ],
          },
        ],
      },
    }),
  },
  {
    url: "/api/user/setting",
    method: "get",
    response: () => ({
      code: 0,
      message: "success",
      data: {
        test: "xxxxxx",
      },
    }),
  },
];
