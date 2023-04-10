var Ie = Object.defineProperty
var Pe = (a, t, r) =>
  t in a
    ? Ie(a, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
    : (a[t] = r)
var b = (a, t, r) => (Pe(a, typeof t != "symbol" ? t + "" : t, r), r)
import {
  r as c,
  C as J,
  u as ue,
  j as e,
  N as xe,
  a as m,
  P as Ne,
  E as Re,
  L as te,
  T as Me,
  M as Le,
  S as _e,
  b as Q,
  c as je,
  G as Oe,
  d as Be,
  e as Ke,
  f as He,
  F as se,
  g as Ge,
  h as Ue,
  B as Fe,
  i as $e,
  A as ze,
  k as B,
  R as $,
  l as pe,
  m as I,
  D as W,
  n as V,
  I as ae,
  o as Ye,
  p as Ve,
  q as E,
  s as p,
  t as U,
  v as fe,
  O as qe,
  w as ge,
  x as D,
  y as Je,
  z as me,
  H as G,
  J as Qe,
  K as We,
  Q as F,
  U as ye,
  V as Xe,
  W as Ze,
  X as et,
  Y as tt,
  Z as rt,
  _ as st,
  $ as at,
  a0 as nt,
  a1 as ot,
  a2 as M,
  a3 as L,
  a4 as _,
  a5 as re,
  a6 as k,
  a7 as it,
  a8 as ct,
  a9 as we,
  aa as lt,
  ab as ne,
  ac as dt,
  ad as ht,
  ae as ut,
  af as xt,
  ag as oe,
  ah as jt,
  ai as pt,
  aj as K,
  ak as ft,
  al as gt,
} from "./vendor-2035d85f.js"
;(function () {
  const t = document.createElement("link").relList
  if (t && t.supports && t.supports("modulepreload")) return
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) s(n)
  new MutationObserver((n) => {
    for (const o of n)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && s(i)
  }).observe(document, { childList: !0, subtree: !0 })
  function r(n) {
    const o = {}
    return (
      n.integrity && (o.integrity = n.integrity),
      n.referrerPolicy && (o.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : n.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    )
  }
  function s(n) {
    if (n.ep) return
    n.ep = !0
    const o = r(n)
    fetch(n.href, o)
  }
})()
function mt(a, t) {
  const r =
      "111141277106458227980240276844959103223194531487196222630920778908889714447117",
    [s, n] = c.useState(() => {
      try {
        const i = window.localStorage.getItem(a)
        if (i) {
          const l = J.AES.decrypt(i, r)
          return JSON.parse(l.toString(J.enc.Utf8))
        }
      } catch (i) {
        console.error(`Error loading "${a}" from localStorage: `, i)
      }
      return t
    })
  return [
    s,
    (i) => {
      try {
        const l = J.AES.encrypt(JSON.stringify(i), r).toString()
        window.localStorage.setItem(a, l), n(i)
      } catch (l) {
        console.error(`Error saving "${a}" to localStorage: `, l)
      }
    },
  ]
}
const Ee = c.createContext({
    token: null,
    login: async () => {},
    logout: () => {},
  }),
  yt = ({ children: a }) => {
    const [t, r] = mt("auth", null),
      s = ue(),
      n = async (l) => {
        r(l), s("/loading")
      },
      o = () => {
        r(null), s("/loading", { replace: !0 })
      },
      i = c.useMemo(() => ({ token: t, login: n, logout: o }), [t])
    return e.jsx(Ee.Provider, { value: i, children: a })
  },
  w = () => c.useContext(Ee),
  Ce = "/assets/logo-bcefc5fa.svg",
  wt = ({ expand: a, onChange: t }) => (
    w(),
    e.jsx(xe, {
      className: "nav-toggle",
      children: e.jsx(m, {
        pullRight: !0,
        children: e.jsx(m.Item, {
          onClick: t,
          style: { width: 56, textAlign: "center" },
          children: a
            ? e.jsx(Ne, {})
            : e.jsx(Re, { style: { fontSize: 25, color: "#34c3ff" } }),
        }),
      }),
    })
  ),
  Et = ({ to: a, children: t, ...r }, s) =>
    e.jsx(te, { ref: s, to: a, ...r, children: t }),
  q = c.forwardRef(Et),
  Ct = () =>
    e.jsxs(m.Menu, {
      trigger: "hover",
      title: "Reports",
      icon: e.jsx(Me, {}),
      placement: "rightStart",
      children: [
        e.jsx(m.Item, {
          as: q,
          to: "/Reports/EftList",
          children: "Pending EFT",
        }),
        e.jsx(m.Item, { as: q, to: "/Reports/EftList", children: "Statement" }),
      ],
    }),
  Tt = () =>
    e.jsxs(m.Menu, {
      trigger: "hover",
      title: "Applications",
      icon: e.jsx(Le, {}),
      placement: "rightStart",
      children: [
        e.jsx(m.Item, {
          as: q,
          to: "/Reports/EftList",
          children: "Pending EFT",
        }),
        e.jsx(m.Item, { as: q, to: "/Reports/EftList", children: "Statement" }),
      ],
    }),
  X = {
    sidenav: {
      position: "relative",
      display: "fixed",
      height: "100%",
      flexDirection: "column",
    },
    logo: {
      padding: 30,
      marginBottom: 20,
      display: "flex",
      alignItems: "center",
      justifyItems: "center",
      justifyContent: "center",
      color: " #fff",
      whiteSpace: "nowrap",
    },
    img: {
      display: "flex",
      alignItems: "center",
      justifyItems: "center",
      justifyContent: "center",
      height: 50,
    },
  },
  bt = ({ expand: a, setExpand: t, modelHandleOpen: r }) =>
    e.jsx(_e, {
      width: a ? 200 : 56,
      collapsible: !0,
      children: e.jsx(Q, {
        expanded: a,
        defaultOpenKeys: ["3"],
        style: X.sidenav,
        children: e.jsxs(Q.Body, {
          children: [
            e.jsx(Q.Header, {
              children: e.jsx("div", {
                style: X.logo,
                children: e.jsx("a", {
                  href: "/",
                  children: e.jsx("img", {
                    src: Ce,
                    style: X.img,
                    alt: "Logo",
                  }),
                }),
              }),
            }),
            e.jsxs(m, {
              children: [
                e.jsx(m.Item, {
                  eventKey: "1",
                  icon: e.jsx(je, {}),
                  onClick: r,
                  children: "Search",
                }),
                e.jsx(m.Menu, {
                  eventKey: "2",
                  trigger: "hover",
                  title: "Registration",
                  icon: e.jsx(Oe, {}),
                  placement: "rightStart",
                  children: e.jsx(m.Item, {
                    eventKey: "3-1",
                    children: e.jsx(te, {
                      to: "/registration/customer",
                      children: "Customer",
                    }),
                  }),
                }),
                e.jsx(Tt, {}),
                e.jsx(Ct, {}),
                e.jsx(wt, { expand: a, onChange: () => t(!a) }),
              ],
            }),
          ],
        }),
      }),
    })
const Te = c.createContext(void 0),
  St = ({ children: a }) => {
    const [t, r] = c.useState(() => {
        const o = localStorage.getItem("theme")
        return o || "dark"
      }),
      n = {
        theme: t,
        setMode: () => {
          const o = t === "light" ? "dark" : "light"
          r(o), localStorage.setItem("theme", o)
        },
      }
    return (
      c.useEffect(() => {
        const o = (i) => {
          if (i.key === "theme") {
            const l = i.newValue
            r(l)
          }
        }
        return (
          window.addEventListener("storage", o),
          () => {
            window.removeEventListener("storage", o)
          }
        )
      }, []),
      e.jsx(Te.Provider, {
        value: n,
        children: e.jsx(Be, { theme: t, children: a }),
      })
    )
  },
  z = () => {
    const a = c.useContext(Te)
    if (a === void 0)
      throw new Error("useTheme must be used within a ThemeProvider")
    return a
  },
  vt = ({ notificationCount: a, setOpenNotification: t }) => {
    const { logout: r } = w(),
      { theme: s, setMode: n } = z(),
      o = () => {
        r()
      },
      i = () => {
        t(!0)
      }
    return e.jsxs(xe, {
      appearance: "subtle",
      children: [
        e.jsx(m, {
          children: e.jsx(m.Item, {
            icon: e.jsx(Ke, {}),
            href: "http://10.140.8.127",
            active: !0,
            children: "Old Server",
          }),
        }),
        e.jsxs(m, {
          pullRight: !0,
          children: [
            e.jsx(m.Item, {
              onClick: n,
              children: e.jsx(He, {
                "arial-label": "Switch",
                checked: s !== "light",
                size: "lg",
                unCheckedChildren: e.jsx(se, { icon: Ge }),
                checkedChildren: e.jsx(se, { icon: Ue }),
              }),
            }),
            e.jsx(m.Item, {
              onClick: i,
              children: e.jsx(Fe, {
                content: a,
                children: e.jsx($e, { style: { width: 20, height: 20 } }),
              }),
            }),
            e.jsx(m.Menu, {
              title: e.jsx(ze, {
                circle: !0,
                src: "https://avatars.githubusercontent.com/u/8225666",
                alt: "@superman66",
              }),
              children: e.jsx(m.Item, { onClick: o, children: "Sign out" }),
            }),
          ],
        }),
      ],
    })
  },
  H = "http://10.140.8.126:3000"
class S {
  constructor(t) {
    b(this, "auth")
    b(this, "useLogin", async (t) => {
      const r = { "Content-Type": "application/json" }
      try {
        const s = await B.post(H + "/api/login/auth", t, { headers: r })
        return (
          console.log("Login", s.data), { status: s.status, response: s.data }
        )
      } catch (s) {
        const n = s.response || { status: 500, data: "Unknown error" }
        return { status: n.status, response: n.data }
      }
    })
    b(this, "useApi", async (t = "GET", r, s = null) => {
      const { token: n } = this.auth
      if ((console.log("api input: ", t, r, s), console.log(n), !n))
        throw new Error("No token found")
      if (!r) throw new Error("No path found")
      const o = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + n.token,
      }
      try {
        return (
          await B({ method: t, url: H + "/api" + r, data: s, headers: o })
        ).data
      } catch (i) {
        if (i.response && i.response.status === 401)
          if ((console.log("401 found"), await this.useRefreshToken())) {
            const x = {
              "Content-Type": "application/json",
              Authorization: "Bearer " + n.token,
            }
            try {
              const j = await B({
                method: t,
                url: H + "/api" + r,
                data: s,
                headers: x,
              })
              return console.log("api reply: ", j.data), j.data
            } catch (j) {
              throw (
                (console.error("Error in useApi, Path:" + r + " Error: ", j), j)
              )
            }
          } else throw new Error("Token Error R")
        else
          throw (console.error("Error in useApi, Path:" + r + " Error: ", i), i)
      }
    })
    b(this, "useBlopApi", async (t, r, s = "pdf", n = null) => {
      if (!this.auth.token) throw new Error("No token found")
      if (!r) throw new Error("No path found")
      const o = {
        "Content-Type": `application/${s}`,
        Authorization: "Bearer " + this.auth.token.token,
      }
      try {
        return (
          await B({
            method: t,
            responseType: "blob",
            url: `${H}/api${r}`,
            data: n,
            headers: o,
          })
        ).data
      } catch (i) {
        if (i.response && i.response.status === 401)
          try {
            if (await this.useRefreshToken()) {
              const x = {
                ...o,
                Authorization: "Bearer " + this.auth.token.token,
              }
              return (
                await B({
                  method: t,
                  responseType: "blob",
                  url: `${H}/api${r}`,
                  data: n,
                  headers: x,
                })
              ).data
            } else throw new Error("Token Error R")
          } catch (l) {
            throw (
              (console.error(`Error in useBlopApi, Path: ${r}, Error: ${l}`), l)
            )
          }
        else
          throw (
            (console.error(`Error in useBlopApi, Path: ${r}, Error: ${i}`), i)
          )
      }
    })
    b(this, "useRefreshToken", async () => {
      const { token: t, login: r } = this.auth
      if (t.token && t.refreshToken) {
        const s = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + t.token,
          },
          n = { refreshToken: t.refreshToken }
        try {
          const i = (
            await B.post(H + "/api/login/refreshToken", n, { headers: s })
          ).data.token
          return r({ token: i, refreshToken: t.refreshToken }), !0
        } catch (o) {
          throw (console.log("Error in useRefreshToken: ", o), o)
        }
      } else
        throw (
          (this.auth.logout(),
          new Error(
            "Error in useRefreshToken: No token found. Token: " +
              t.token +
              ", Refresh token: " +
              t.refreshToken
          ))
        )
    })
    this.auth = t
  }
}
const ie = $.forwardRef(({ type: a = "info", body: t = void 0, ...r }, s) =>
    e.jsx(pe, {
      ref: s,
      ...r,
      type: a,
      header: a,
      children: t || e.jsx(I.Paragraph, { style: { width: 320 }, rows: 3 }),
    })
  ),
  At = ({
    open: a,
    setOpen: t,
    notificationCount: r,
    setNotificationCount: s,
  }) => {
    const [n, o] = c.useState([]),
      [i, l] = c.useState(Date.now()),
      x = w(),
      j = c.useMemo(() => new S(x), [x])
    return (
      c.useEffect(() => {
        const u = async () => {
            try {
              const d = await j.useApi("GET", "/notification/maturity"),
                f = d.map(({ MPHONE: g, ID: y }, v) =>
                  e.jsx(
                    ie,
                    {
                      style: { width: "100%" },
                      type: "info",
                      body: `Account ${g} witch is ${
                        y === "RECURRING" ? "Recurring" : "Demand"
                      } product have been mature at unknown Date. Please run close process.`,
                    },
                    v
                  )
                )
              o(f), s(d.length)
            } catch {
              o([e.jsx(ie, { type: "info" }, 0)]), s(0)
            }
          },
          h = setInterval(() => {
            l(Date.now())
          }, 36e5)
        return u(), () => clearInterval(h)
      }, [j, i, o, s]),
      e.jsxs(W, {
        open: a,
        onClose: () => t(!1),
        children: [
          e.jsx(W.Header, {
            children: e.jsx(W.Title, { children: "Notification" }),
          }),
          n,
        ],
      })
    )
  },
  { HeaderCell: Dt, Cell: kt, Column: It } = E,
  Z = [
    { key: "CUST_ID", label: "Id", fixed: !0, resizable: !0 },
    { key: "STATUS", label: "Status", flexGrow: 1 },
    { key: "MPHONE", label: "Account No", resizable: !0 },
    { key: "PMPHONE", label: "Agent", resizable: !0 },
    { key: "NAME", label: "Name", resizable: !0 },
    { key: "FATHER_NAME", label: "Father Name", resizable: !0 },
    { key: "MOTHER_NAME", label: "Mother Name", resizable: !0 },
    { key: "SPOUSE_NAME", label: "Spouse Name", resizable: !0 },
    { key: "NID_NO", label: "Photo ID", resizable: !0 },
    { key: "DOB", label: "Date of Birth" },
    { key: "CON_MOB", label: "Agent" },
    { key: "EMAIL", label: "Email", resizable: !0 },
    { key: "REG_DATE", label: "Reg Date" },
    { key: "REG_STATUS", label: "Reg Status" },
    { key: "CUST_ID_TYPE", label: "Customer ID Type" },
  ],
  Pt = ({ modelOpen: a, modelHandleClose: t }) => {
    const r = w(),
      s = new S(r),
      [n, o] = c.useState(void 0),
      [i, l] = $.useState(Z.map((h) => h.key)),
      x = (h) =>
        e.jsx(kt, {
          ...h,
          style: { padding: 4 },
          children:
            h.dataKey === "CUST_ID"
              ? e.jsx(te, {
                  to: `/customer/${h.rowData.CUST_ID}`,
                  children: h.rowData.CUST_ID,
                })
              : h.rowData.dataKey,
        }),
      j = (h) => e.jsx(Dt, { ...h, style: { padding: 4 } }),
      u = (h) => {
        const d = h.target.value
        s.useApi("POST", "/customer/search", { params: d + "%" }).then((f) => {
          o(f)
        })
      }
    return e.jsxs(V, {
      backdrop: "static",
      role: "alertdialog",
      size: "lg",
      open: a,
      onChange: u,
      onClose: t,
      children: [
        e.jsx(V.Header, { children: e.jsx(V.Title, { children: "Search" }) }),
        e.jsxs(V.Body, {
          children: [
            e.jsxs(ae, {
              inside: !0,
              children: [
                e.jsx(Ye, {}),
                e.jsx(ae.Addon, { children: e.jsx(je, {}) }),
              ],
            }),
            n
              ? e.jsxs(e.Fragment, {
                  children: [
                    e.jsx("br", {}),
                    e.jsx(Ve, {
                      data: Z,
                      labelKey: "label",
                      valueKey: "key",
                      value: i,
                      onChange: l,
                      cleanable: !1,
                    }),
                    e.jsx("hr", {}),
                    e.jsx(E, {
                      virtualized: !0,
                      data: n,
                      children: Z.map((h) => {
                        const { key: d, label: f, ...g } = h
                        return c.createElement(
                          It,
                          { ...g, key: d },
                          e.jsx(j, { children: f }),
                          e.jsx(x, { dataKey: d })
                        )
                      }),
                    }),
                  ],
                })
              : e.jsx(p, { children: e.jsx(I.Paragraph, {}) }),
          ],
        }),
      ],
    })
  },
  be = "/assets/haxeriB-90a94755.svg",
  Se = "/assets/haxeriL-3c0a3587.svg",
  Nt = ({ children: a }) => {
    const { theme: t } = z(),
      [r, s] = c.useState(!1),
      [n, o] = c.useState(0),
      [i, l] = c.useState(!1),
      [x, j] = c.useState(!1),
      u = () => j(!0),
      h = () => j(!1)
    return e.jsx(e.Fragment, {
      children: e.jsxs(U, {
        children: [
          e.jsx(bt, { expand: r, setExpand: s, modelHandleOpen: u }),
          e.jsx(Pt, { modelOpen: x, modelHandleClose: h }),
          e.jsxs(U, {
            children: [
              e.jsx(vt, { notificationCount: n, setOpenNotification: l }),
              e.jsx(At, {
                open: i,
                setOpen: l,
                notificationCount: n,
                setNotificationCount: o,
              }),
              e.jsx(fe, { children: e.jsx(qe, {}) }),
              e.jsxs(ge, {
                children: [
                  e.jsx("br", {}),
                  e.jsx(p, {
                    children: e.jsxs(D, {
                      justify: "center",
                      align: "middle",
                      children: [
                        e.jsx("p", {
                          style: { marginRight: 5 },
                          children: "Power by",
                        }),
                        t != "light"
                          ? e.jsx("img", { src: Se, height: 20 })
                          : e.jsx("img", { src: be, height: 20 }),
                        e.jsx("a", {
                          style: { marginLeft: 5 },
                          href: "http://www.haxeri.com/",
                          children: "haxeri.com",
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    })
  },
  ve = ({ errorMassage: a }) =>
    e.jsxs("div", {
      id: "error-page",
      children: [
        e.jsx("h1", { children: "Oops!" }),
        e.jsx("p", { children: "Sorry, an unexpected error has occurred." }),
        e.jsx("p", { children: a ? a.toString() : "Unknown Error" }),
      ],
    }),
  Rt = ({ children: a }) => {
    const { token: t } = w()
    if (t) {
      if (t.refreshToken !== null && t.token !== null)
        return console.log("Auth Valid"), e.jsx(Nt, { children: a })
    } else
      return (
        console.log("Auth invalid"), e.jsx(Je, { to: "/login", replace: !0 })
      )
    return e.jsx(ve, {})
  },
  { StringType: ce } = me.Types,
  Mt = me.Model({
    username: ce().isRequired("This field is required."),
    password: ce().isRequired("This field is required."),
  }),
  le = (a) => {
    const { name: t, label: r, accepter: s, ...n } = a
    return e.jsxs(G.Group, {
      controlId: `${t}-3`,
      children: [
        e.jsxs(G.ControlLabel, { children: [r, " "] }),
        e.jsx(G.Control, {
          errorMessage: a.errorMessage,
          name: t,
          accepter: s,
          ...n,
        }),
        a.tooltip
          ? e.jsx(G.HelpText, { tooltip: !0, children: a.tooltip })
          : e.jsx(e.Fragment, {}),
      ],
    })
  }
function Lt() {
  const [a, t] = c.useState(""),
    [r, s] = c.useState(""),
    [n, o] = c.useState(),
    i = w(),
    { theme: l } = z(),
    x = new S(i),
    j = (d, f) => {
      f.preventDefault(),
        console.log(a + r),
        (async () => {
          try {
            const y = await x.useLogin({ username: a, password: r })
            if ((console.log("response", y.status), y.status === 500))
              o(y.response)
            else {
              const { token: v, refreshToken: C } = y.response
              i.login({ token: v, refreshToken: C })
            }
          } catch (y) {
            y.response && y.response.status === 500
              ? (F.error(y.response.data.toString()), o("has-error"))
              : (console.log(y),
                F.error("Something went wrong. Please try again later."))
          }
        })()
    },
    u = (d) => t(d),
    h = (d) => s(d)
  return e.jsx("div", {
    className: "show-fake-browser login-page",
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100vh",
    },
    children: e.jsx(U, {
      children: e.jsx(fe, {
        children: e.jsx(D, {
          justify: "center",
          children: e.jsx(D.Item, {
            children: e.jsxs(p, {
              header: e.jsxs("h3", {
                children: [
                  e.jsx("img", {
                    src: Ce,
                    alt: "Logo",
                    width: "50",
                    height: "40",
                    style: { marginRight: "20px" },
                  }),
                  "Login",
                ],
              }),
              bordered: !0,
              children: [
                e.jsxs(G, {
                  onSubmit: j,
                  model: Mt,
                  children: [
                    e.jsx(le, {
                      name: "name",
                      label: "Username",
                      value: a,
                      tooltip: "Use your agent banking user id",
                      autoComplete: "on",
                      onChange: u,
                    }),
                    e.jsx(le, {
                      name: "password",
                      label: "password",
                      errorMessage: n,
                      type: "password",
                      value: r,
                      onChange: h,
                    }),
                    e.jsx(G.Group, {
                      children: e.jsx(Qe, {
                        children: e.jsx(We, {
                          appearance: "primary",
                          type: "submit",
                          children: "Sign in",
                        }),
                      }),
                    }),
                  ],
                }),
                e.jsx(ge, {
                  children: e.jsx(p, {
                    children: e.jsxs(D, {
                      justify: "center",
                      align: "middle",
                      children: [
                        e.jsx("p", {
                          style: { marginRight: 5 },
                          children: "Power by",
                        }),
                        l != "light"
                          ? e.jsx("img", { src: Se, height: 20 })
                          : e.jsx("img", { src: be, height: 20 }),
                        e.jsx("a", {
                          style: { marginLeft: 5 },
                          href: "http://www.haxeri.com/",
                          children: "haxeri.com",
                        }),
                      ],
                    }),
                  }),
                }),
              ],
            }),
          }),
        }),
      }),
    }),
  })
}
const _t = () => {
    const a = ue(),
      { token: t } = w()
    return (
      c.useEffect(() => {
        if ((console.log(t), t !== void 0)) {
          const r = setTimeout(() => {
            console.log("Navigate to home"), a("/")
          }, 500)
          return () => clearTimeout(r)
        } else
          setTimeout(() => {
            console.log("Navigate to home"), a("/login")
          }, 500)
      }, []),
      e.jsx(p, { header: "Loading", children: e.jsx(I.Paragraph, {}) })
    )
  },
  Ot = (a) => {
    const t = []
    for (let r = 0; r < a; r++) {
      let s = "#" + Math.floor(Math.random() * 16777215).toString(16)
      for (; s.length < 7; ) s += "0"
      t.push(s)
    }
    return t
  },
  Bt = 4,
  Kt = ({ setTotalBalance: a }) => {
    const t = w(),
      r = new S(t),
      { theme: s } = z(),
      n = s === "light" ? "#000000" : "#ffffff",
      [o, i] = c.useState(),
      [l, x] = c.useState(!1),
      [j, u] = c.useState(),
      h = c.useCallback(async () => {
        try {
          const d = await r.useApi("GET", "/dashboard/charts/balanceChart"),
            f = []
          let g = 0
          d.forEach(({ BALANCE: v, TYPE: C }) => {
            ;(g += v), f.push([C, v])
          })
          const y = Ot(f.length + 1)
          a(g), i(y), x(!1), f.unshift(["Type", "Balance"]), u(f)
        } catch (d) {
          console.error("Error retrieving balance chart", d), x(!0)
        }
      }, [r])
    return (
      c.useEffect(() => {
        const d = setInterval(() => {
          h()
        }, Bt * 60 * 1e3)
        return h(), () => clearInterval(d)
      }, [t.token]),
      e.jsx("section", {
        children: l
          ? e.jsx("p", { children: "Error loading data" })
          : e.jsx(ye, {
              chartType: "PieChart",
              data: j,
              options: {
                backgroundColor: "transparent",
                colors: o,
                legend: { textStyle: { color: n } },
                chartArea: {
                  backgroundColor: { fill: "#FF0000", fillOpacity: 0.1 },
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                },
              },
            }),
      })
    )
  },
  de = async (a) =>
    await a.useApi("GET", "/dashboard/charts/TotalDebitCreditCurrent"),
  Ht = async (a) =>
    await a.useApi("GET", "/dashboard/charts/TotalDebitCreditPrevious"),
  ee = async (a, t, r) => {
    try {
      if (typeof a == "function") {
        const s = [],
          n = []
        ;(await a()).forEach(({ CR: i, DR: l }) => {
          s.push(i), n.push(l)
        }),
          t(s),
          r(n)
      }
    } catch (s) {
      console.error(`Error fetching ${a}: `, s)
    }
  },
  Gt = () => {
    const a = w(),
      t = new S(a),
      [r, s] = c.useState([0]),
      [n, o] = c.useState([0]),
      [i, l] = c.useState([0]),
      [x, j] = c.useState([0])
    return (
      c.useEffect(() => {
        const u = setInterval(async () => {
          await ee(() => de(t), s, o)
        }, 3e4)
        return (
          (async () => {
            await ee(() => de(t), s, o), await ee(() => Ht(t), l, j)
          })(),
          () => clearInterval(u)
        )
      }, [a.token]),
      { currentCr: r, currentDr: n, pastCr: i, pastDr: x }
    )
  }
Xe.register(Ze, et, tt, rt, st, at, nt)
const Ut = () => {
    const a = new Date().getHours(),
      t = Array.from({ length: a - 8 }, (u, h) => {
        const d = h + 9
        if (d < 12) return d.toString() + " AM"
        if (d === 12) return "12 PM"
        if (d < 19) return (d - 12).toString() + " PM"
      }).filter((u) => u !== void 0),
      [r, s] = c.useState([]),
      [n, o] = c.useState(!1),
      { currentCr: i, currentDr: l, pastCr: x, pastDr: j } = Gt()
    return (
      c.useEffect(() => {
        if (i && l && x && j) {
          const u = t.map((h, d) => ({
            labels: t[d],
            currentCr: i[d],
            pastCr: x[d],
            currentDr: l[d],
            pastDr: j[d],
          }))
          console.log(u), s(u), o(!1)
        } else o(!0)
      }, [i, l, x, j]),
      e.jsx("div", {
        children: t.length
          ? e.jsx(ot, {
              data: {
                labels: r.map((u) => u.labels),
                datasets: [
                  {
                    label: "Current Credit",
                    data: r.map((u) => u.currentCr),
                    borderColor: "#0763CC",
                    fill: !1,
                  },
                  {
                    label: "Past Credit",
                    data: r.map((u) => u.pastCr),
                    borderColor: "#9A60FE",
                    fill: !1,
                  },
                  {
                    label: "Current Debit",
                    data: r.map((u) => u.currentDr),
                    borderColor: "#CD0601",
                    fill: !1,
                  },
                  {
                    label: "Past Debit",
                    data: r.map((u) => u.pastDr),
                    borderColor: "#F49B91",
                    fill: !1,
                  },
                ],
              },
            })
          : e.jsx("p", { children: "Loading..." }),
      })
    )
  },
  Ft = () => {
    const a = w(),
      t = new S(a),
      [r, s] = c.useState(!0),
      [n, o] = c.useState(),
      i = c.useCallback(async () => {
        try {
          const l = await t.useApi("GET", "/dashboard/tables/event")
          s(!1), o(l)
        } catch (l) {
          return (
            s(!0),
            console.error("Error retrieving balance chart" + l),
            e.jsx("div", { children: "Error" })
          )
        }
      }, [])
    return (
      c.useEffect(() => {
        const l = setInterval(() => {
          i()
        }, 78e4)
        return i(), () => clearInterval(l)
      }, []),
      e.jsx(e.Fragment, {
        children: r
          ? e.jsx("div", { children: "Error" })
          : e.jsxs(E, {
              cellBordered: !0,
              autoHeight: !0,
              data: n,
              children: [
                e.jsxs(M, {
                  flexGrow: 1,
                  children: [
                    e.jsx(L, { children: "Count" }),
                    e.jsx(_, { dataKey: "NO" }),
                  ],
                }),
                e.jsxs(M, {
                  flexGrow: 2,
                  children: [
                    e.jsx(L, { children: "Event" }),
                    e.jsx(_, { dataKey: "PARTICULAR" }),
                  ],
                }),
                e.jsxs(M, {
                  flexGrow: 2,
                  children: [
                    e.jsx(L, { children: "Amount" }),
                    e.jsx(_, { dataKey: "AMT" }),
                  ],
                }),
              ],
            }),
      })
    )
  },
  $t = () => {
    const a = w(),
      t = new S(a),
      [r, s] = c.useState(!0),
      [n, o] = c.useState(void 0),
      i = c.useCallback(async () => {
        try {
          const l = await t.useApi("GET", "/dashboard/tables/pendingEvent")
          s(!1), o(l)
        } catch (l) {
          s(!0), console.error("Error retrieving balance chart" + l)
        }
      }, [a.token])
    return (
      c.useEffect(() => {
        const l = setInterval(() => {
          i()
        }, 24e4)
        return () => clearInterval(l)
      }, []),
      c.useEffect(() => {
        i()
      }, [i]),
      e.jsx(e.Fragment, {
        children: r
          ? e.jsx(I.Paragraph, {})
          : e.jsxs(E, {
              cellBordered: !0,
              fillHeight: !0,
              data: n,
              children: [
                e.jsxs(M, {
                  flexGrow: 2,
                  children: [
                    e.jsx(L, { children: "Event" }),
                    e.jsx(_, { dataKey: "EVENT" }),
                  ],
                }),
                e.jsxs(M, {
                  flexGrow: 2,
                  children: [
                    e.jsx(L, { children: "Status" }),
                    e.jsx(_, { dataKey: "STATUS" }),
                  ],
                }),
                e.jsxs(M, {
                  flexGrow: 1,
                  children: [
                    e.jsx(L, { children: "Number" }),
                    e.jsx(_, { dataKey: "TOTAL" }),
                  ],
                }),
                e.jsxs(M, {
                  flexGrow: 1,
                  children: [
                    e.jsx(L, { children: "Amount" }),
                    e.jsx(_, { dataKey: "AMT" }),
                  ],
                }),
              ],
            }),
      })
    )
  },
  zt = 4,
  Yt = () => {
    const a = w(),
      t = new S(a),
      { theme: r } = z(),
      s = r === "light" ? "#000000" : "#ffffff",
      [n, o] = c.useState(!1),
      [i, l] = c.useState(!0),
      [x, j] = c.useState(),
      u = c.useCallback(async () => {
        try {
          const h = await t.useApi("GET", "/dashboard/charts/balanceDifference")
          h && l(!1)
          const d = h[0].CURRENT_BALANCE,
            f = h[0].LAST_DAY_BALANCE,
            g = [["Balance Type", "Amount", { role: "style" }]]
          g.push(["Current Balance", d, "#0763CC"]),
            g.push(["Last Day Balance", f, "#9A60FE"]),
            o(!1),
            j(g)
        } catch (h) {
          console.error("Error retrieving balance chart", h), o(!0)
        }
      }, [t])
    return (
      c.useEffect(() => {
        const h = setInterval(() => {
          u()
        }, zt * 60 * 1e3)
        return u(), () => clearInterval(h)
      }, [a.token]),
      e.jsx("section", {
        children:
          !n && !i
            ? e.jsx(ye, {
                chartType: "BarChart",
                data: x,
                options: {
                  backgroundColor: "transparent",
                  legend: { position: "none" },
                  chartArea: {
                    backgroundColor: { fillOpacity: 0.1 },
                    left: 50,
                    top: 20,
                    width: "90%",
                    height: "50%",
                  },
                  hAxis: { textStyle: { color: s } },
                  vAxis: { textStyle: { color: s } },
                },
              })
            : n
            ? e.jsx("p", { children: "Error loading data" })
            : e.jsx(I.Paragraph, { rows: 4, active: !0 }),
      })
    )
  },
  he = (a) =>
    e.jsx(p, { ...a, header: "Card title", children: e.jsx(I.Paragraph, {}) }),
  Vt = ({ totalBalance: a }) =>
    e.jsxs(re, {
      children: [
        e.jsxs(k, {
          sm: 6,
          children: [
            e.jsx(p, {
              header: "Total Balance",
              children: e.jsxs("h4", {
                children: [" ", a ? a.toFixed(2) : "NAN", " BDT"],
              }),
            }),
            e.jsx("br", {}),
            e.jsx(he, {}),
          ],
        }),
        e.jsxs(k, {
          sm: 6,
          children: [
            e.jsx(p, { header: "Balance Difference", children: e.jsx(Yt, {}) }),
            e.jsx("br", {}),
            e.jsx(he, {}),
          ],
        }),
        e.jsx(k, {
          sm: 12,
          children: e.jsx(p, {
            header: "Transaction Chart",
            bodyFill: !0,
            children: e.jsx(Ut, {}),
          }),
        }),
      ],
    }),
  qt = ({ setTotalBalance: a }) =>
    e.jsxs(re, {
      className: "show-grid",
      children: [
        e.jsx(k, {
          xs: 16,
          children: e.jsx("div", {
            style: { paddingTop: "2rem" },
            children: e.jsxs(it, {
              accordion: !0,
              children: [
                e.jsx(p, {
                  header: "Pending Events",
                  bodyFill: !0,
                  defaultExpanded: !0,
                  children: e.jsx($t, {}),
                }),
                e.jsx(p, {
                  header: "Events",
                  bodyFill: !0,
                  defaultExpanded: !0,
                  children: e.jsx(Ft, {}),
                }),
              ],
            }),
          }),
        }),
        e.jsx(k, {
          xs: 8,
          children: e.jsx(p, {
            header: "Balance Chart",
            bodyFill: !0,
            children: e.jsx(Kt, { setTotalBalance: a }),
          }),
        }),
      ],
    }),
  Jt = () => {
    const [a, t] = c.useState(0)
    return e.jsxs(U, {
      children: [
        e.jsx(Vt, { totalBalance: a }),
        e.jsx("br", {}),
        e.jsx(qt, { setTotalBalance: t }),
      ],
    })
  },
  Qt = () =>
    e.jsx(U, {
      children: e.jsx("div", {
        style: { padding: "1rem" },
        children: e.jsx(Jt, {}),
      }),
    }),
  Wt = async (a) => {
    try {
      return await a.useApi("GET", "/eft/summery")
    } catch (t) {
      return F("Error" + t), t
    }
  },
  Xt = async (a) => {
    try {
      return await a.useApi("GET", "/eft/list")
    } catch (t) {
      return F("Error" + t), t
    }
  },
  Zt = async (a) => {
    try {
      return await a.useApi("GET", "/eft/return")
    } catch (t) {
      return F("Error" + t), t
    }
  },
  er = async (a) => {
    try {
      const t = new Date(),
        r = await a.useBlopApi("GET", "/eft/report.pdf", "pdf"),
        s = new Blob([r], { type: "application/pdf" }),
        n = `EFT_Report_${t}.pdf`
      return ct.saveAs(s, n), !1
    } catch (t) {
      return F("Error" + t), !1
    }
  },
  tr = ({ detailList: a }) => {
    const { Column: t, HeaderCell: r, Cell: s } = E,
      n = (o) => e.jsx(s, { ...o, style: { padding: 6 } })
    return e.jsx(p, {
      header: "List",
      bordered: !0,
      bodyFill: !0,
      children: e.jsxs(E, {
        loading: !a,
        data: a,
        rowHeight: 30,
        virtualized: !0,
        affixHeader: !0,
        affixHorizontalScrollbar: !0,
        children: [
          e.jsxs(t, {
            width: 50,
            align: "center",
            fixed: !0,
            children: [
              e.jsx(r, { children: "Id" }),
              e.jsx(n, { dataKey: "index" }),
            ],
          }),
          e.jsxs(t, {
            width: 110,
            align: "center",
            fullText: !0,
            fixed: !0,
            children: [
              e.jsx(r, { children: "Account No" }),
              e.jsx(n, { dataKey: "ACTNUM" }),
            ],
          }),
          e.jsxs(t, {
            width: 150,
            fullText: !0,
            children: [
              e.jsx(r, { children: "Titel" }),
              e.jsx(n, { dataKey: "ABS_AC_TITEL" }),
            ],
          }),
          e.jsxs(t, {
            width: 150,
            fullText: !0,
            children: [
              e.jsx(r, { children: "Reciver" }),
              e.jsx(n, { dataKey: "RECIVER" }),
            ],
          }),
          e.jsxs(t, {
            width: 50,
            fullText: !0,
            children: [
              e.jsx(r, { children: "Match" }),
              e.jsx(n, { dataKey: "match" }),
            ],
          }),
          e.jsxs(t, {
            width: 150,
            fullText: !0,
            children: [
              e.jsx(r, { children: "Sender" }),
              e.jsx(n, { dataKey: "SENDER" }),
            ],
          }),
          e.jsxs(t, {
            width: 120,
            fullText: !0,
            children: [
              e.jsx(r, { children: "Orgin Branch" }),
              e.jsx(n, { dataKey: "ORIG_BRANCH_NAME" }),
            ],
          }),
          e.jsxs(t, {
            width: 120,
            fullText: !0,
            children: [
              e.jsx(r, { children: "Orgin Bank" }),
              e.jsx(n, { dataKey: "ORIG_BANK_NAME" }),
            ],
          }),
          e.jsxs(t, {
            width: 100,
            align: "right",
            fullText: !0,
            children: [
              e.jsx(r, { children: "Amount" }),
              e.jsx(n, { dataKey: "AMOUNT" }),
            ],
          }),
          e.jsxs(t, {
            width: 80,
            children: [
              e.jsx(r, { children: "Status" }),
              e.jsx(n, { dataKey: "HONOURED" }),
            ],
          }),
          e.jsxs(t, {
            width: 150,
            fullText: !0,
            children: [
              e.jsx(r, { children: "Remarks" }),
              e.jsx(n, { dataKey: "NOTE" }),
            ],
          }),
        ],
      }),
    })
  },
  rr = ({ summeryList: a }) => {
    const { Column: t, HeaderCell: r, Cell: s } = E
    return e.jsx("div", {
      style: { marginRight: "1rem" },
      children: e.jsx(p, {
        header: "Summery",
        bordered: !0,
        bodyFill: !0,
        children: e.jsxs(E, {
          loading: !a,
          data: a,
          autoHeight: !0,
          children: [
            e.jsxs(t, {
              flexGrow: 2,
              align: "center",
              children: [
                e.jsx(r, { children: "Products" }),
                e.jsx(s, { dataKey: "TYPE" }),
              ],
            }),
            e.jsxs(t, {
              flexGrow: 1,
              children: [
                e.jsx(r, { children: "Total" }),
                e.jsx(s, { dataKey: "COUNT" }),
              ],
            }),
            e.jsxs(t, {
              flexGrow: 1,
              children: [
                e.jsx(r, { children: "Amount" }),
                e.jsx(s, { dataKey: "SUM" }),
              ],
            }),
            e.jsxs(t, {
              flexGrow: 1,
              children: [
                e.jsx(r, { children: "Status" }),
                e.jsx(s, { dataKey: "HONOURED" }),
              ],
            }),
          ],
        }),
      }),
    })
  },
  { Column: P, HeaderCell: N, Cell: sr } = E,
  R = (a) => e.jsx(sr, { ...a, style: { padding: 6 } }),
  ar = () => {
    const a = w(),
      t = new S(a),
      [r, s] = c.useState(),
      [n, o] = c.useState(),
      [i, l] = c.useState(),
      [x, j] = c.useState(!1),
      u = () => {
        ;(async () => {
          j(!0)
          const d = await er(t)
          j(d)
        })()
      }
    return (
      c.useEffect(() => {
        ;(async () => {
          const d = await Wt(t)
          s(d)
          const f = await Xt(t)
          o(f)
          const g = await Zt(t)
          l(g)
        })()
      }, []),
      e.jsx(e.Fragment, {
        children: e.jsx(U, {
          children: e.jsxs(p, {
            header: "List of Electronic Funds Transfer (EFT)",
            children: [
              e.jsx(we, {
                color: "blue",
                appearance: "primary",
                icon: e.jsx(lt, {}),
                size: "lg",
                onClick: u,
                loading: x,
                children: "Download",
              }),
              e.jsx(ne, {}),
              e.jsx(D, {
                children: e.jsx(D.Item, {
                  colspan: 24,
                  children: e.jsx(tr, { detailList: n }),
                }),
              }),
              e.jsx(ne, {}),
              e.jsxs(D, {
                children: [
                  e.jsx(D.Item, {
                    colspan: 8,
                    children: e.jsx(rr, { summeryList: r }),
                  }),
                  e.jsx(D.Item, {
                    colspan: 16,
                    children: e.jsx(p, {
                      header: "Return",
                      bordered: !0,
                      bodyFill: !0,
                      children: e.jsxs(E, {
                        loading: !i,
                        data: i,
                        autoHeight: !0,
                        virtualized: !0,
                        children: [
                          e.jsxs(P, {
                            width: 70,
                            align: "center",
                            fixed: !0,
                            children: [
                              e.jsx(N, { children: "Id" }),
                              e.jsx(R, { dataKey: "id" }),
                            ],
                          }),
                          e.jsxs(P, {
                            width: 200,
                            fixed: !0,
                            children: [
                              e.jsx(N, { children: "Account No" }),
                              e.jsx(R, { dataKey: "name" }),
                            ],
                          }),
                          e.jsxs(P, {
                            width: 200,
                            children: [
                              e.jsx(N, { children: "Reciver" }),
                              e.jsx(R, { dataKey: "city" }),
                            ],
                          }),
                          e.jsxs(P, {
                            width: 300,
                            children: [
                              e.jsx(N, { children: "Titel" }),
                              e.jsx(R, { dataKey: "email" }),
                            ],
                          }),
                          e.jsxs(P, {
                            width: 300,
                            children: [
                              e.jsx(N, { children: "Origin" }),
                              e.jsx(R, { dataKey: "email" }),
                            ],
                          }),
                          e.jsxs(P, {
                            width: 300,
                            children: [
                              e.jsx(N, { children: "Amount" }),
                              e.jsx(R, { dataKey: "email" }),
                            ],
                          }),
                          e.jsxs(P, {
                            width: 300,
                            children: [
                              e.jsx(N, { children: "Status" }),
                              e.jsx(R, { dataKey: "email" }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
      })
    )
  }
class nr {
  constructor(t) {
    b(this, "api")
    b(this, "fatchCustomerData", async (t, r) => {
      try {
        const s = await this.api.useApi("POST", "/customer/search", {
          params: r,
        })
        return t(s[0]), s[0]
      } catch (s) {
        throw new Error(s)
      }
    })
    b(this, "fetchProfilePicture", async (t, r) => {
      try {
        const s = await this.api.useApi("POST", "/customer/getImage", {
          params: r,
        })
        if (!s[0].IMG) {
          console.log("No image found")
          return
        }
        const o = `data:image/jpeg;base64,${s[0].IMG}`
        t(o)
      } catch (s) {
        throw new Error("Error fetching  profile picture. Error: ", s)
      }
    })
    b(this, "fetchImgData", async (t) => {
      try {
        const r = [],
          s = await this.api.useApi("POST", "/customer/getImageData", {
            params: t,
          })
        if (Array.isArray(s))
          s.forEach(({ SL_NO: n, IMG: o, IMAGE_TYPE_ID: i }) => {
            try {
              const x = `data:image/jpeg;base64,${o}`
              r.push({ sl: n, type: i, img: x })
            } catch (l) {
              throw new Error("Error fetching  pictures Error: ", l)
            }
          })
        else if (s && typeof s == "object")
          try {
            const o = `data:image/jpeg;base64,${s.IMG}`
            r.push({ sl: s.SL_NO, type: s.IMAGE_TYPE_ID, img: o })
          } catch (n) {
            throw new Error("Error fetching  pictures Error: ", n)
          }
        return r
      } catch (r) {
        console.error(r)
        return
      }
    })
    b(this, "fatchMiniStatment", async (t, r) => {
      try {
        const s = await this.api.useApi("POST", "/trReportRoute/ministatment", {
          mphone: r,
        })
        t(s)
      } catch (s) {
        throw new Error(s)
      }
    })
    this.api = t
  }
}
const or = () => {
    const a = w(),
      t = new S(a),
      r = new nr(t),
      [s, n] = c.useState(void 0),
      [o, i] = c.useState(void 0),
      [l, x] = c.useState(void 0),
      [j, u] = c.useState([]),
      [h, d] = c.useState(2),
      { id: f } = dt(),
      { Column: g, HeaderCell: y, Cell: v } = E,
      C = (A) => e.jsx(y, { ...A, style: { padding: 1 } }),
      O = (A) => e.jsx(v, { ...A, style: { padding: 1 } }),
      Ae = ({ data: A }) =>
        A
          ? A.length === 0
            ? e.jsx("div", { children: "No images found." })
            : e.jsx(jt, {
                shape: "bar",
                autoplay: !0,
                placement: "left",
                activeIndex: h,
                onSelect: (T) => {
                  d(T)
                },
                children: A.map(({ sl: T, type: Y, img: ke }) =>
                  e.jsx("img", { src: ke, height: "250" }, T)
                ),
              })
          : e.jsx("div", { children: "No images found." }),
      De = () => {
        n(void 0),
          x(void 0),
          i(void 0),
          u([]),
          (async () => {
            const T = await r.fatchCustomerData(n, f),
              Y = await r.fetchImgData(T.MPHONE)
            r.fatchMiniStatment(i, T.MPHONE),
              r.fetchProfilePicture(x, T.MPHONE),
              u(Y)
          })()
      }
    return (
      c.useEffect(() => {
        n(void 0),
          x(void 0),
          i(void 0),
          u([]),
          (async () => {
            const T = await r.fatchCustomerData(n, f),
              Y = await r.fetchImgData(T.MPHONE)
            r.fatchMiniStatment(i, T.MPHONE),
              r.fetchProfilePicture(x, T.MPHONE),
              u(Y)
          })()
      }, [f]),
      e.jsxs(p, {
        header: e.jsxs(ht, {
          justifyContent: "space-between",
          children: [
            e.jsx("h3", { children: f }),
            e.jsx(we, {
              circle: !0,
              onClick: De,
              icon: e.jsx(ut, {}),
              appearance: "primary",
            }),
          ],
        }),
        children: [
          e.jsx("hr", {}),
          s
            ? e.jsx(xt, {
                fluid: !0,
                children: e.jsxs(re, {
                  className: "show-grid",
                  children: [
                    e.jsxs(k, {
                      xs: 24,
                      md: 12,
                      children: [
                        e.jsxs(p, {
                          bordered: !0,
                          children: [
                            e.jsx(k, {
                              xs: 24,
                              md: 12,
                              children: e.jsx(p, {
                                header: e.jsx("h5", {
                                  style: { color: "cornflowerblue" },
                                  children: "Account Information",
                                }),
                                children: e.jsxs("p", {
                                  children: [
                                    "Account No: ",
                                    s.MPHONE,
                                    " ",
                                    e.jsx("br", {}),
                                    "Agent: ",
                                    s.PMPHONE,
                                    " ",
                                    e.jsx("br", {}),
                                    "Reg Status: ",
                                    s.REG_STATUS === "P"
                                      ? e.jsx("span", {
                                          style: { color: "green" },
                                          children: "Active",
                                        })
                                      : s.REG_STATUS === "R"
                                      ? e.jsx("span", {
                                          style: { color: "red" },
                                          children: "Reject",
                                        })
                                      : s.REG_STATUS === "L"
                                      ? e.jsx("span", {
                                          style: { color: "blue" },
                                          children: "Pending",
                                        })
                                      : e.jsx("span", { children: "Unknown" }),
                                    " ",
                                    e.jsx("br", {}),
                                    "Status: ",
                                    s.STATUS === "A"
                                      ? e.jsx("span", {
                                          style: { color: "green" },
                                          children: "Active",
                                        })
                                      : s.STATUS === "C"
                                      ? e.jsx("span", {
                                          style: { color: "red" },
                                          children: "Close",
                                        })
                                      : s.STATUS === "F"
                                      ? e.jsx("span", {
                                          style: { color: "blue" },
                                          children: "Cold",
                                        })
                                      : e.jsx("span", { children: "Unknown" }),
                                    " ",
                                    e.jsx("br", {}),
                                    "Register Date: ",
                                    oe(s.REG_DATE).format("MMMM Do YYYY"),
                                    " ",
                                    e.jsx("br", {}),
                                  ],
                                }),
                              }),
                            }),
                            e.jsx(k, {
                              xs: 24,
                              md: 12,
                              children: e.jsx(p, {
                                header: e.jsx("h5", {
                                  style: { color: "cornflowerblue" },
                                  children: "Account Holder Photo",
                                }),
                                children: l
                                  ? e.jsx("img", { src: l })
                                  : e.jsx(I.Paragraph, { graph: "image" }),
                              }),
                            }),
                          ],
                        }),
                        e.jsx("br", {}),
                        e.jsx(p, {
                          bordered: !0,
                          header: e.jsx("h5", {
                            style: { color: "cornflowerblue" },
                            children: "Personal Information",
                          }),
                          children: e.jsxs("p", {
                            children: [
                              "Name: ",
                              s.NAME,
                              " ",
                              e.jsx("br", {}),
                              "Father Name: ",
                              s.FATHER_NAME,
                              " ",
                              e.jsx("br", {}),
                              "Mother name: ",
                              s.MOTHER_NAME,
                              " ",
                              e.jsx("br", {}),
                              "Photo ID: ",
                              s.NID_NO,
                              " ",
                              e.jsx("br", {}),
                              "Date of Birth: ",
                              oe(s.DOB).format("MMMM Do YYYY"),
                              " ",
                              e.jsx("br", {}),
                            ],
                          }),
                        }),
                        e.jsx("br", {}),
                        e.jsx(p, {
                          bordered: !0,
                          header: e.jsx("h5", {
                            style: { color: "cornflowerblue" },
                            children: "Photo",
                          }),
                          children: e.jsx(Ae, { data: j }),
                        }),
                      ],
                    }),
                    e.jsx(k, {
                      xs: 24,
                      md: 12,
                      xsHidden: !0,
                      children: e.jsx(p, {
                        bordered: !0,
                        header: e.jsx("h5", {
                          style: { color: "cornflowerblue" },
                          children: "Recent Transactions",
                        }),
                        children: e.jsxs(E, {
                          virtualized: !0,
                          height: 400,
                          data: o,
                          children: [
                            e.jsxs(g, {
                              width: 30,
                              align: "center",
                              fullText: !0,
                              fixed: !0,
                              children: [
                                e.jsx(C, { children: "SL" }),
                                e.jsx(O, { dataKey: "SL" }),
                              ],
                            }),
                            e.jsxs(g, {
                              width: 120,
                              fullText: !0,
                              fixed: !0,
                              children: [
                                e.jsx(C, { children: "Timestamp" }),
                                e.jsx(O, { dataKey: "TRANS_DATE" }),
                              ],
                            }),
                            e.jsxs(g, {
                              width: 120,
                              fullText: !0,
                              children: [
                                e.jsx(C, { children: "No" }),
                                e.jsx(O, { dataKey: "TRANS_NO" }),
                              ],
                            }),
                            e.jsxs(g, {
                              width: 70,
                              align: "right",
                              fullText: !0,
                              children: [
                                e.jsx(C, { children: "Debit" }),
                                e.jsx(O, { dataKey: "DR_AMT" }),
                              ],
                            }),
                            e.jsxs(g, {
                              width: 70,
                              align: "right",
                              fullText: !0,
                              children: [
                                e.jsx(C, { children: "Credit" }),
                                e.jsx(O, { dataKey: "CR_AMT" }),
                              ],
                            }),
                            e.jsxs(g, {
                              width: 70,
                              align: "right",
                              fullText: !0,
                              children: [
                                e.jsx(C, { children: "Balance" }),
                                e.jsx(v, { dataKey: "BALANCE" }),
                              ],
                            }),
                            e.jsxs(g, {
                              width: 150,
                              fullText: !0,
                              children: [
                                e.jsx(C, { children: "Remarks" }),
                                e.jsx(O, { dataKey: "PARTICULAR" }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    }),
                  ],
                }),
              })
            : e.jsx(I.Paragraph, { rows: 50, graph: "image" }),
        ],
      })
    )
  },
  ir = () =>
    e.jsxs(pt, {
      children: [
        e.jsxs(K, {
          path: "/",
          element: e.jsx(Rt, { children: void 0 }),
          children: [
            e.jsx(K, { path: "/", element: e.jsx(Qt, {}) }),
            e.jsx(K, { path: "/Reports/EftList", element: e.jsx(ar, {}) }),
            e.jsx(K, { path: "/customer/:id", element: e.jsx(or, {}) }),
          ],
        }),
        e.jsx(K, { path: "/loading", element: e.jsx(_t, {}) }),
        e.jsx(K, { path: "/login", element: e.jsx(Lt, {}) }),
      ],
    }),
  cr = $.createContext({ addToast: () => {} }),
  lr = ({ children: a }) => {
    const [t, r] = c.useState([]),
      s = (n) => {
        r((o) => [...o, n])
      }
    return e.jsxs(cr.Provider, {
      value: { addToast: s },
      children: [
        a,
        t.map((n) =>
          e.jsx(
            pe,
            {
              type: n.type,
              header: n.title,
              closable: !0,
              children: n.description,
            },
            n.id
          )
        ),
      ],
    })
  },
  dr = () =>
    e.jsx(ft, {
      children: e.jsx(yt, {
        children: e.jsx(St, {
          children: e.jsx(lr, { children: e.jsx(ir, {}) }),
        }),
      }),
    }),
  hr = ({ children: a }) => {
    const [t, r] = c.useState(!1),
      [s, n] = c.useState()
    return t
      ? e.jsx(ve, { errorMassage: s })
      : e.jsx($.Fragment, { children: a })
  }
gt.createRoot(document.getElementById("root")).render(
  e.jsx($.StrictMode, { children: e.jsx(hr, { children: e.jsx(dr, {}) }) })
)
