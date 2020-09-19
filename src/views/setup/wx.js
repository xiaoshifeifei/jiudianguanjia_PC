/*
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-08-12 16:23:49
 * @LastEditors: ldh
 * @LastEditTime: 2020-08-12 16:23:55
 */
!(function(a, b, c) { function d(a) { let c = 'default'; a.self_redirect === !0 ? c = 'true' : a.self_redirect === !1 && (c = 'false'); let d = b.createElement('iframe'), e = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + a.appid + '&scope=' + a.scope + '&redirect_uri=' + a.redirect_uri + '&state=' + a.state + '&login_type=jssdk&self_redirect=' + c + '&styletype=' + (a.styletype || '') + '&sizetype=' + (a.sizetype || '') + '&bgcolor=' + (a.bgcolor || '') + '&rst=' + (a.rst || ''); e += a.style ? '&style=' + a.style : '', e += a.href ? '&href=' + a.href : '', d.src = e, d.frameBorder = '0', d.allowTransparency = 'true', d.scrolling = 'no', d.width = '300px', d.height = '400px'; let f = b.getElementById(a.id); f.innerHTML = '', f.appendChild(d) }a.WxLogin = d })(window, document)
