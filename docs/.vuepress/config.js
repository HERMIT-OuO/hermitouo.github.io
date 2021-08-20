module.exports = {
    title: "HERMIT",
    description: "Every era is chaotic.",
    head: [
        ["link", { rel: "icon", href: "/img/logo.svg" }],
        [
          "meta",
          {
            name: "viewport",
            content: "width=device-width,initial-scale=1,user-scalable=no"
          }
        ]
      ],
    theme: "gungnir",
    themeConfig: {
        editLinks: true,
        lastUpdated: true,
        nav: [
            {
                text: "Home",
                link: "/",
                icon: "fa-fort-awesome",
            },
            {
                text: "About",
                link: "/about/",
                icon: "fa-regular-user",
            },
            {
                text: "Tags",
                link: "/tags/",
                icon: "fa-tag",
            },
            {
                text: "Links",
                link: "/links/",
                icon: "fa-satellite-dish",
            },
        ],
        personalInfo: {
            // 必须：名称，将在首页、移动端侧边栏和文章作者信息处显示
            name: "HERMIT",

            // 必须：头像，将在首页和移动端侧边栏显示
            avatar: "/img/avatar.png",

            // 必须：个人简介，将在首页显示
            description: "每个时代都是乱世",

            // 可选：社交平台账号，将在首页和移动端侧边栏显示
            sns: {
                github: "HERMIT-OuO", // Github
                email: "ruoliangty@gmail.com", // 邮箱
                customize: [
                    // 添加其他的社交平台
                      {
                        icon: "co-telegram-plane",  // 社交平台的图标
                        link: "https://t.me/HERMIT_CHAT_BOT"  // 主页链接
                      },
                ],
            },
        },
        homeHeaderImages: {
            // 可选：首页本地封面图路径和蒙版
            local: [
                {
                    path: "/img/index_bg/bg1.jpg",
                },
                {
                    path: "/img/index_bg/bg2.jpg",
                },
                {
                    path: "/img/index_bg/bg3.png",
                },
                {
                    path: "/img/index_bg/bg4.jpg",
                    mask: "rgba(52, 45, 50, .4)",
                },
            ],
        },
        pages: {
            // 标签页配置
            tags: {
                // 可选：标签页副标题
                subtitle: "Every era is chaotic.",

                // 可选：标签页封面图路径和蒙版
                bgImage: {
                    path: "/img/page/bg1.jpg",
                    // mask: 'rgba(211, 136, 37, .5)'
                },
            },

            // 链接页配置
            links: {
                // 可选：链接页副标题
                subtitle: "Every era is chaotic.",

                // 可选：链接页封面图路径和蒙版
                bgImage: {
                    path: "/img/page/bg2.jpg",
                    // mask: 'rgba(64, 118, 190, 0.5)'
                },
            },
        },
        search: true, // 可选：是否启用搜索，默认：true
        searchMaxSuggestions: 10, // 可选：搜索的最大结果数，默认：10
        searchPlaceholder: "$ grep ...", // 可选：搜索栏占位文本，默认："$ grep ..."
        searchIcon: "ri-search-2-line", // 可选：搜索图标
        mdPlus: {
            all: true, // 全部启用
        },
        footer: `&copy; <a href="https://github.com/HERMIT-OuO" target="_blank">HERMIT</a> 2021 <br> 
                Powered by <a href="https://vuepress.vuejs.org" target="_blank">VuePress</a> &
                <a href="https://github.com/Renovamen/vuepress-theme-gungnir" target="_blank">Gungnir</a>`,
        // katex: true,  //公示渲染
        // chartjs: true,  // 图表
        // mermaid: true,  // 流程图、状态图、时序图、甘特图
        // markmap: true,  // 思维导图
    },
    plugins: ["@renovamen/vuepress-plugin-katex", "@vuepress/medium-zoom"],
};
