(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{422:function(t,e,i){},522:function(t,e,i){"use strict";i(422)},534:function(t,e,i){"use strict";i.r(e);i(12);var a=i(365),s=i(467),n=new(i.n(s).a),r=n.renderer.rules.link_open||function(t,e,i,a,s){return s.renderToken(t,e,i)};n.renderer.rules.link_open=function(t,e,i,a,s){var n=t[e].attrIndex("target");return n<0?t[e].attrPush(["target","_blank"]):t[e].attrs[n][1]="_blank",r(t,e,i,a,s)};var o={github:"https://github.com/",linkedin:"https://www.linkedin.com/in/",facebook:"https://www.facebook.com/",twitter:"https://www.twitter.com/",zhihu:"https://www.zhihu.com/people/",weibo:"http://weibo.com/",email:"mailto:"},l={github:"ri-github-fill",linkedin:"ri-linkedin-box-fill",facebook:"ri-facebook-box-fill",twitter:"ri-twitter-fill",zhihu:"ri-zhihu-line",weibo:"ri-weibo-fill",email:"hi-mail",telegram:"co-telegram-plane"},c={components:{Common:a.a},data:function(){return{bio:""}},mounted:function(){var t=this;fetch("/md/about.md").then((function(t){return t.text()})).then((function(e){return t.bio=n.render(e)})).catch((function(t){return console.error(t)}))},methods:{snsLink:function(t,e){return o[e]+t},snsIcon:function(t){return l[t]}}},u=(i(522),i(362),i(55)),m=Object(u.a)(c,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("Common",{staticClass:"about-wrapper"},[i("div",{staticClass:"profile"},[i("div",{staticClass:"profile__content"},[i("div",{staticClass:"profile__basic col-md-4"},[i("img",{staticClass:"avatar",attrs:{src:t.$withBase(t.$page.frontmatter.avatar)}}),t._v(" "),i("h3",{staticClass:"title"},[t._v(t._s(t.$page.frontmatter.name))]),t._v(" "),i("p",{staticClass:"subname"},[t._v(t._s(t.$page.frontmatter.subname))]),t._v(" "),i("div",{staticClass:"sns"},[t.$page.frontmatter.github?i("div",{staticClass:"sns__item"},[i("a",{attrs:{href:t.$page.frontmatter.github}},[i("v-icon",{attrs:{name:"ri-github-fill",scale:"1.82"}})],1)]):t._e(),t._v(" "),t.$page.frontmatter.telegram?i("div",{staticClass:"sns__item"},[i("a",{attrs:{href:t.$page.frontmatter.telegram}},[i("v-icon",{attrs:{name:"co-telegram-plane",scale:"1.82"}})],1)]):t._e(),t._v(" "),t.$page.frontmatter.email?i("div",{staticClass:"sns__item"},[i("a",{attrs:{href:t.$page.frontmatter.email}},[i("v-icon",{attrs:{name:"hi-mail",scale:"1.82"}})],1)]):t._e()])]),t._v(" "),i("div",{staticClass:"profile__info col-md-8"},[i("h3",{staticClass:"title"},[t._v("Biography")]),t._v(" "),i("div",{staticClass:"bio-info",domProps:{innerHTML:t._s(this.bio)}}),t._v(" "),i("div",{staticClass:"personal-info"},[i("div",{staticClass:"col-md-5 interests"},[i("p",{staticClass:"subtitle"},[t._v("Interests")]),t._v(" "),i("ul",t._l(t.$page.frontmatter.interests,(function(e,a){return i("li",{key:"interests-"+a},[i("p",{staticClass:"item",domProps:{innerHTML:t._s(e)}},[t._v(t._s(e))])])})),0)]),t._v(" "),i("div",{staticClass:"col-md-7 education"},[i("p",{staticClass:"subtitle"},[t._v("Education")]),t._v(" "),i("ul",t._l(t.$page.frontmatter.education,(function(e,a){return i("li",{key:"education-"+a},[i("p",{staticClass:"degree"},[t._v("\n                                    "+t._s(e.degree)+", "+t._s(e.year)+"\n                                ")]),t._v(" "),i("p",{staticClass:"school"},[t._v(t._s(e.school))])])})),0)])])])])]),t._v(" "),i("Content",{staticClass:"theme-content"})],1)}),[],!1,null,null,null);e.default=m.exports}}]);