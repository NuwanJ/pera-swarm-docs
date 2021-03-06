(() => {
    function t(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, a = new Array(e); n < e; n++) a[n] = t[n];
        return a
    }

    function e(t) {
        var e = $(".toctree").find('[href="'.concat(decodeURI(t), '"]'));
        if (e.length > 0) {
            $(".toctree .current").removeClass("current"), e.addClass("current"), e.closest(".level-1").parent().addClass("current");
            for (var n = 1; n <= 11; n++) e.closest(".level-".concat(n)).addClass("current")
        }
    }

    function n(t, e) {
        return localStorage.setItem(t, e)
    }

    function a(t) {
        return localStorage.getItem(t) || !1
    }

    function r() {
        console.debug.apply(console, arguments)
    }
    var o, s, c, l;
    $(window).bind("hashchange", (function() {
        return e(location.hash || location.pathname)
    })), $(document).on("scroll", (function() {
        var t = $(this).scrollTop() + 5,
            n = [];
        $(".markdown-body").find("h1,h2,h3,h4,h5,h6").each((function() {
            n.push({
                offset: $(this).offset().top,
                id: this.id,
                level: parseInt(this.tagName.slice(1))
            })
        }));
        for (var a = 0; a < n.length; a++) t > n[a].offset && (a < n.length - 1 ? t < n[a + 1].offset && (1 == n[a].level ? e(location.pathname) : e("#" + n[a].id)) : e("#" + n[a].id))
    })), $("#toggle").click((function() {
        $(".sidebar-wrap,.content-wrap,.addons-wrap").toggleClass("shift")
    })), $(".status").click((function() {
        $(".addons").toggleClass("d-none")
    })), location.pathname == "".concat(ui.baseurl, "/search.html") && $.ajax("".concat(ui.baseurl, "/data.json")).done((function(e) {
        var n = new URL(location.href).searchParams.get("q");
        new URL(location.href).searchParams.get("lang") || ui.lang, $("input[name='q']").val(n);
        var a = [],
            o = new RegExp;
        try {
            o = new RegExp(n, "im")
        } catch (t) {
            return $(".search-results .content").empty(), $(".search-results .summary").html(ui.i18n.search_results_not_found), $(".search-results h2").html(ui.i18n.search_results), r(t.message)
        }

        function s(t, e, n) {
            return t.slice(e, n).replace(o, (function(t) {
                return '<span class="bg-yellow">'.concat(t, "</span>")
            }))
        }
        var c, l = function(e, n) {
            var a;
            if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
                if (Array.isArray(e) || (a = function(e, n) {
                        if (e) {
                            if ("string" == typeof e) return t(e, n);
                            var a = Object.prototype.toString.call(e).slice(8, -1);
                            return "Object" === a && e.constructor && (a = e.constructor.name), "Map" === a || "Set" === a ? Array.from(e) : "Arguments" === a || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a) ? t(e, n) : void 0
                        }
                    }(e)) || n && e && "number" == typeof e.length) {
                    a && (e = a);
                    var r = 0,
                        o = function() {};
                    return {
                        s: o,
                        n: function() {
                            return r >= e.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: e[r++]
                            }
                        },
                        e: function(t) {
                            throw t
                        },
                        f: o
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var s, c = !0,
                l = !1;
            return {
                s: function() {
                    a = e[Symbol.iterator]()
                },
                n: function() {
                    var t = a.next();
                    return c = t.done, t
                },
                e: function(t) {
                    l = !0, s = t
                },
                f: function() {
                    try {
                        c || null == a.return || a.return()
                    } finally {
                        if (l) throw s
                    }
                }
            }
        }(e);
        try {
            for (l.s(); !(c = l.n()).done;) {
                page = c.value;
                var i = null,
                    u = null;
                try {
                    page.title ? i = page.title.match(o) : "/" == page.url ? page.title = ui.title : page.title = page.url
                } catch (t) {
                    r(t.message)
                }
                try {
                    page.content && (page.content = $("<div/>").html(page.content).text(), u = page.content.match(o))
                } catch (t) {
                    r(t.message)
                }
                if (i || u) {
                    var h = ['<a href="'.concat(ui.baseurl).concat(page.url, "?highlight=").concat(n, '">').concat(page.title, "</a>")];
                    if (u) {
                        var f = u.index - 100,
                            d = u.index + 100,
                            p = "...",
                            g = "...";
                        f < 0 && (p = "", f = 0), d > page.content.length && (g = "", d = page.content.length), h.push('<p class="text-gray">'.concat(p).concat(s(page.content, f, d)).concat(g, "</p>"))
                    }
                    a.push('<li class="border-top py-4">'.concat(h.join(""), "</li>"))
                }
            }
        } catch (t) {
            l.e(t)
        } finally {
            l.f()
        }
        a.length > 0 && n.length > 0 ? ($(".search-results .content").html(a.join("")), $(".search-results .summary").html(ui.i18n.search_results_found.replace("#", a.length))) : ($(".search-results .content").empty(), $(".search-results .summary").html(ui.i18n.search_results_not_found)), $(".search-results h2").html(ui.i18n.search_results)
    })).fail((function(t, e) {
        return r(e)
    })), $(".toctree li.current").append('<ul class="content-toc"></ul>').html((function() {
        var t = parseInt(this.dataset.level),
            e = 0,
            n = [$(this).find(".content-toc")];
        $(".markdown-body").find("h2,h3,h4,h5,h6").each((function() {
            var a = $("<a/>").addClass("d-flex flex-items-baseline").text($(this).text()).attr("href", "#".concat(this.id)),
                r = parseInt(this.tagName.slice(1)) - 1;
            if (r > e) {
                var o = n[0].children("li:last")[0];
                o && n.unshift($("<ul/>").appendTo(o))
            } else n.splice(0, Math.min(e - r, Math.max(n.length - 1, 0)));
            e = r, $("<li/>").addClass("toc level-".concat(t + r)).append(a).appendTo(n[0])
        })), n[0].html() || n[0].remove()
    })), e(location.pathname), e(location.hash), o = a("scroll"), s = a("scrollTime"), c = a("scrollHost"), o && s && c && c == location.host && Date.now() - s < 6e5 && $(".sidebar").scrollTop(o), $(".sidebar").scroll((function() {
        n("scroll", this.scrollTop), n("scrollTime", Date.now()), n("scrollHost", location.host)
    })), (l = new URL(location.href).searchParams.get("highlight")) && ($(".markdown-body").find("*").each((function() {
        try {
            this.outerHTML.match(new RegExp(l, "im")) && ($(this).addClass("search-result"), $(this).parentsUntil(".markdown-body").removeClass("search-result"))
        } catch (t) {
            r(t.message)
        }
    })), $(".search-result").each((function() {
        $(this).html((function(t, e) {
            return e.replace(l, '<span class="bg-yellow">'.concat(l, "</span>"))
        }))
    })), $(".search input").val(l)), $(".toc ul").siblings("a").each((function() {
        var t = $(this),
            e = $('<i class="fa fa-plus-square-o"></i>');
        e.on("click", (function(e) {
            return e.stopPropagation(),
                function(t) {
                    var e = t.closest("li");
                    e.siblings("li.current").removeClass("current"), e.siblings().find("li.current").removeClass("current"), e.find("> ul li.current").removeClass("current"), e.toggleClass("current")
                }(t), !1
        })), t.prepend(e)
    })), $(".markdown-body :header").append((function() {
        return '<a href="#'.concat(this.id, '" class="anchor"><i class="octicon-link fa fa-link text-blue"></i></a>')
    })), $("div.highlighter-rouge").each((function() {
        var t = $(this).attr("class").match(/language-(\w+)/);
        t && $(this).attr("data-lang", t[1])
    })), "serviceWorker" in navigator ? navigator.serviceWorker.register("".concat(ui.baseurl, "/sw.caches.js")) : r("Service Worker not supported!")
})();
