var libraries;
var modules = function(System) {
  var e = this.require,
      n = this.exports,
      r = this.module;
  libraries = getLibraries(System);
  libraries.npmModules();
  (function () {
    var e = System.amdDefine;
    !function (t, i) {
      "function" == typeof e && e.amd ? e("2", [], i) : "object" == typeof n ? r.exports = i() : t.returnExports = i()
    }(this, libraries.es6)
  })();
  (function () {
    var e = System.amdDefine;
    e("3", ["2"], function (t) {
      return t
    })
  }());
  System.registerDynamic("4", [], !1, function(e, n, r) {
    var i = System.get("@@global-helpers").prepareGlobal(r.id, null, null);
    return function() {
      window.performance = window.performance || Date;
      try {
        "getGamepads" in navigator || (navigator.getGamepads = function() {
          return []
        })
      } catch (t) {}
    }(),
        i()
  });
  System.registerDynamic("b", [getCodeName("BlueBird")], !0, function(t, e, n) {
    "use strict";

    function r(t, e) {
      void 0 === e && (e = function(t) {
        return console.error(t)
      });
      var n, r, o = !1,
          a = i.resolve(t.load()).then(function() {
            function i(i, o) {
              o && (n = requestAnimationFrame(s)),
                  r = setTimeout(a, 100),
                  c++,
              i - l > 1e3 && (f = 1e3 * c / (i - l),
                  c = 0,
                  l = i);
              try {
                t.fps = f,
                    t.update((i - u) / 1e3),
                o && t.draw()
              } catch (t) {
                e(t)
              }
              u = i
            }

            function a() {
              i(performance.now(), !1)
            }

            function s(t) {
              clearTimeout(r),
                  i(t, !0)
            }

            if (o)
              throw new Error("cancelled");
            t.init();
            var u = performance.now(),
                l = u,
                c = 0,
                f = 0;
            n = requestAnimationFrame(s)
          }),
          s = function() {
            cancelAnimationFrame(n),
                clearTimeout(r),
                o = !0
          };
      return {
        promise: a,
        cancel: s
      }
    }

    var i = t(getCodeName("BlueBird"));
    return e.start = r,
        n.exports
  });
  System.registerDynamic("d", [], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      return t.map(function(t) {
        return "string" == typeof t ? t : t[0]
      })
    }

    function i(t) {
      return t.map(function(t) {
        return "string" != typeof t && t[1].ignore ? t[0] : null
      }).filter(function(t) {
        return !!t
      })
    }

    function o(t) {
      var e = {};
      return t.forEach(function(t) {
        "string" != typeof t && t[1].binary && (e[t[0]] = t[1].binary)
      }),
          e
    }

    return e.getNames = r,
        e.getIgnore = i,
        e.getBinary = o,
        n.exports
  });
  System.registerDynamic("e", [getCodeName("Lodash")], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      for (var e = "", n = 0; n < t; n++)
        e += s[Math.floor(Math.random() * s.length)];
      return e
    }

    function i(t) {
      var e = /^(\d+)\/(\d+)?([smh])$/.exec(t);
      if (!e)
        throw new Error("Invalid rate limit value");
      var n = +e[1],
          r = +(e[2] || "1") * u[e[3]];
      return {
        limit: n,
        frame: r
      }
    }

    function o(t, e) {
      var n = e[t];
      if (n) {
        var r = Date.now(),
            i = r - n.frame;
        if (a.remove(n.calls, function(t) {
              return t < i
            }),
            n.calls.length >= n.limit)
          return !1;
        n.calls.push(r)
      }
      return !0
    }

    var a = t(getCodeName("Lodash")),
        s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
    e.randomString = r;
    var u = {
      s: 1e3,
      m: 6e4,
      h: 36e5
    };
    return e.parseRateLimit = i,
        e.checkRateLimit = o,
        n.exports
  });
  System.registerDynamic("10", [], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      return !t.some(function(t) {
        return 10 === t || 9 === t || Array.isArray(t)
      })
    }

    function i(t, e, n) {
      if (t instanceof Array) {
        if (r(t))
          return "writer.measureSimpleArray(" + e + ", " + t.reduce(function(t, e) {
                return t + c[e]
              }, 0) + ")";
        var o = "",
            a = 0;
        if (1 === t.length) {
          var s = i(t[0], "item", n + "\t");
          isNaN(s) ? o += "\n" + n + "\t+ " + s : a += s
        } else
          for (var u = 0; u < t.length; u++) {
            var s = i(t[u], "item[" + u + "]", n + "\t");
            isNaN(s) ? o += "\n" + n + "\t+ " + s : a += s
          }
        return "writer.measureArray(" + e + ", function (item) { return " + a + o + "; })"
      }
      return 10 === t || 9 === t ? "writer.measure" + f[t] + "(" + e + ")" : c[t]
    }

    function o(t, e, n, r) {
      if (e instanceof Array)
        if (1 === e.length)
          t.code += r + "writer.writeArray(" + n + ", function (item) {\n",
              o(t, e[0], "item", r + "\t"),
              t.code += r + "});\n";
        else {
          t.code += r + "writer.writeArray(" + n + ", function (item) {\n";
          for (var i = 0; i < e.length; i++)
            o(t, e[i], "item[" + i + "]", r + "\t");
          t.code += r + "});\n"
        }
      else
        t.code += r + "writer.write" + f[e] + "(" + n + ");\n"
    }

    function a(t) {
      for (var e = {
        code: "",
        size: 1
      }, n = 0; n < t.length; n++) {
        var r = i(t[n], "args[" + n + "]", "\t\t");
        isNaN(r) ? e.code += "\t\tsize += " + r + ";\n" : e.size += r
      }
      e.code += "\t\twriter.init(size);\n",
          e.code += "\t\twriter.writeUint8(id);\n";
      for (var n = 0; n < t.length; n++)
        o(e, t[n], "args[" + n + "]", "\t\t");
      return "function (writer, id, args) {\n\t\tvar size = " + e.size + ";\n" + e.code + "\t}"
    }

    function s(t, e) {
      if (t instanceof Array) {
        var n = "";
        if (1 === t.length)
          n += "\n" + e + "\t" + s(t[0], e + "\t") + "\n" + e;
        else {
          n += "[\n";
          for (var r = 0; r < t.length; r++)
            n += e + "\t" + s(t[r], e + "\t") + ",\n";
          n += e + "]"
        }
        return "reader.readArray(function () { return " + n.trim() + "; })"
      }
      return "reader.read" + f[t] + "()"
    }

    function u(t) {
      for (var e = "", n = 0; n < t.length; n++)
        e += "\t\tresult.push(" + s(t[n], "\t\t") + ");\n";
      return "function (reader, result) {\n" + e + "\t}"
    }

    function l(t, e) {
      var n = Object.keys(t).map(function(e) {
            return e + ": " + a(t[e])
          }),
          r = Object.keys(e).map(function(t) {
            return t + ": " + u(e[t])
          }),
          i = "var write = {\n\t" + n.join(",\n\t") + "\n};\n\nvar read = {\n\t" + r.join(",\n\t") + "\n};\n\nreturn { write: write, read: read };";
      return new Function(i)()
    }

    var c = [];
    c[1] = 1,
        c[0] = 1,
        c[3] = 2,
        c[2] = 2,
        c[5] = 4,
        c[4] = 4,
        c[6] = 4,
        c[7] = 8,
        c[8] = 1;
    var f = [];
    return f[1] = "Uint8",
        f[0] = "Int8",
        f[3] = "Uint16",
        f[2] = "Int16",
        f[5] = "Uint32",
        f[4] = "Int32",
        f[6] = "Float32",
        f[7] = "Float64",
        f[8] = "Boolean",
        f[9] = "String",
        f[10] = "Object",
        e.createHandlers = l,
        n.exports
  });
  System.registerDynamic("11", [], !0, function(t, e, n) {
    "use strict";
    e.defaultHandleFunction = function(t, e, n, r, i) {
      return n.apply(r, i)
    };
    var r = function() {
      function t(t, e, n, r, i) {
        this.readNames = t,
            this.remoteNames = e,
            this.packetWriter = n,
            this.packetReader = r,
            this.supportsBinary = !1,
            this.lastWriteBinary = !1,
            this.writeHandlers = i.write,
            this.readHandlers = i.read
      }

      return t.prototype.write = function(t, e, n, r) {
        var i = this.writeHandlers[e];
        if (this.supportsBinary && i) {
          i(this.packetWriter, n, r);
          var o = this.packetWriter.getBuffer();
          return t.send(o),
              this.lastWriteBinary = !0,
          o.byteLength || o.length || 0
        }
        r.unshift(n);
        var a = JSON.stringify(r);
        return t.send(a),
            a.length
      },
          t.prototype.read = function(t) {
            if ("string" == typeof t)
              return JSON.parse(t);
            this.packetReader.setBuffer(t);
            var e = this.packetReader.readUint8(),
                n = this.readNames[e],
                r = this.readHandlers[n],
                i = [e];
            if (!r)
              throw new Error("Missing packet handler for: " + n + " (" + e + ")");
            return r(this.packetReader, i),
                i
          },
          t.prototype.getFuncName = function(t, e) {
            return 255 === t ? "*version" : 253 === t ? "*reject:" + this.remoteNames[e.shift()] : 254 === t ? "*resolve:" + this.remoteNames[e.shift()] : this.readNames[t]
          },
          t.prototype.send = function(t, e, n, r) {
            try {
              return this.write(t, e, n, r)
            } catch (t) {
              return 0
            }
          },
          t.prototype.recv = function(t, n, r, i) {
            void 0 === i && (i = e.defaultHandleFunction);
            var o = this.read(t);
            try {
              var a = o.shift(),
                  s = this.getFuncName(a, o),
                  u = s && "*" === s[0],
                  l = u ? r : n,
                  c = l[s]
            } catch (t) {
              a = 0,
                  s = "",
                  u = !1,
                  l = {},
                  c = void 0
            }
            return c && i(a, s, c, l, o),
            t.length || t.byteLength || 0
          },
          t
    }();
    return e.PacketHandler = r,
        n.exports
  });
  System.registerDynamic("12", ["11"], !0, function(t, e, n) {
    "use strict";
    var r = this && this.__extends || function(t, e) {
              function n() {
                this.constructor = t
              }

              for (var r in e)
                e.hasOwnProperty(r) && (t[r] = e[r]);
              t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
                  new n)
            },
        i = t("11"),
        o = function(t) {
          function e(e, n, r, i, o, a, s) {
            t.call(this, e, n, r, i, o),
                this.ignorePackets = a,
                this.log = s
          }

          return r(e, t),
              e.prototype.send = function(t, e, n, r) {
                var i = this.write(t, e, n, r);
                if (this.ignorePackets.indexOf(e) === -1) {
                  var o = this.lastWriteBinary ? "bin" : "str";
                  this.log("SEND [" + i + "] (" + o + ")", e, r)
                }
                return i
              },
              e.prototype.recv = function(t, e, n, r) {
                void 0 === r && (r = i.defaultHandleFunction);
                var o = this.read(t),
                    a = o.shift(),
                    s = this.getFuncName(a, o);
                s || this.log("invalid message id: " + a);
                var u = s && "*" === s[0],
                    l = u ? n : e,
                    c = l[s],
                    f = t.length || t.byteLength;
                if (this.ignorePackets.indexOf(s) === -1) {
                  var p = "string" != typeof t ? "bin" : "str";
                  this.log("RECV [" + f + "] (" + p + ")", s, o)
                }
                return c ? r(a, s, c, l, o) : this.log("invalid message: " + s, o),
                    f
              },
              e
        }(i.PacketHandler);
    return e.DebugPacketHandler = o,
        n.exports
  });
  System.registerDynamic("13", ["14"], !0, function(t, e, n) {
    "use strict";
    var r = t("14"),
        i = function() {
          function t() {}

          return t.prototype.measureString = function(t) {
            if (null == t)
              return this.measureLength(-1);
            var e = r.stringLengthInBytes(t);
            return this.measureLength(e) + e
          },
              t.prototype.measureObject = function(t) {
                return null == t ? this.measureLength(-1) : this.measureString(JSON.stringify(t))
              },
              t.prototype.measureArray = function(t, e) {
                return null == t ? this.measureLength(-1) : this.measureLength(t.length) + t.reduce(function(t, n) {
                  return t + e(n)
                }, 0)
              },
              t.prototype.measureSimpleArray = function(t, e) {
                return null == t ? this.measureLength(-1) : this.measureLength(t.length) + t.length * e
              },
              t.prototype.measureLength = function(t) {
                return t === -1 ? 2 : t < 127 ? 1 : t < 16383 ? 2 : t < 2097151 ? 3 : 4
              },
              t.prototype.writeBoolean = function(t) {
                this.writeUint8(t ? 1 : 0)
              },
              t.prototype.writeString = function(t) {
                if (null == t)
                  this.writeLength(-1);
                else {
                  var e = r.encodeString(t);
                  this.writeLength(e.length),
                      this.writeBytes(e)
                }
              },
              t.prototype.writeObject = function(t) {
                null == t ? this.writeString(null) : this.writeString(JSON.stringify(t))
              },
              t.prototype.writeArray = function(t, e) {
                null == t ? this.writeLength(-1) : (this.writeLength(t.length),
                    t.forEach(e))
              },
              t.prototype.writeLength = function(t) {
                if (t === -1)
                  this.writeUint8(128),
                      this.writeUint8(0);
                else
                  do
                    this.writeUint8(127 & t | (t >> 7 ? 128 : 0)),
                        t >>= 7;
                  while (t)
              },
              t
        }();
    return e.BasePacketWriter = i,
        n.exports
  });
  System.registerDynamic("15", ["13"], !0, function(t, e, n) {
    "use strict";
    var r = this && this.__extends || function(t, e) {
              function n() {
                this.constructor = t
              }

              for (var r in e)
                e.hasOwnProperty(r) && (t[r] = e[r]);
              t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
                  new n)
            },
        i = t("13"),
        o = function(t) {
          function e() {
            t.apply(this, arguments),
                this.offset = 0
          }

          return r(e, t),
              e.prototype.getBuffer = function() {
                return this.buffer
              },
              e.prototype.init = function(t) {
                this.offset = 0,
                    this.buffer = new ArrayBuffer(t),
                    this.view = new DataView(this.buffer),
                    this.bytes = new Uint8Array(this.buffer)
              },
              e.prototype.writeInt8 = function(t) {
                this.view.setInt8(this.offset, t),
                    this.offset += 1
              },
              e.prototype.writeUint8 = function(t) {
                this.view.setUint8(this.offset, t),
                    this.offset += 1
              },
              e.prototype.writeInt16 = function(t) {
                this.view.setInt16(this.offset, t),
                    this.offset += 2
              },
              e.prototype.writeUint16 = function(t) {
                this.view.setUint16(this.offset, t),
                    this.offset += 2
              },
              e.prototype.writeInt32 = function(t) {
                this.view.setInt32(this.offset, t),
                    this.offset += 4
              },
              e.prototype.writeUint32 = function(t) {
                this.view.setUint32(this.offset, t),
                    this.offset += 4
              },
              e.prototype.writeFloat32 = function(t) {
                this.view.setFloat32(this.offset, t),
                    this.offset += 4
              },
              e.prototype.writeFloat64 = function(t) {
                this.view.setFloat64(this.offset, t),
                    this.offset += 8
              },
              e.prototype.writeBytes = function(t) {
                this.bytes.set(t, this.offset),
                    this.offset += t.length
              },
              e
        }(i.BasePacketWriter);
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = o,
        n.exports
  });
  System.registerDynamic("14", [], !0, function(t, e, n) {
    "use strict";

    function r(t, e) {
      for (var n = 0; n < t.length; n++) {
        var r = t.charCodeAt(n);
        if (r >= 55296 && r <= 56319 && n + 1 < t.length) {
          var i = t.charCodeAt(n + 1);
          56320 === (64512 & i) && (r = ((1023 & r) << 10) + (1023 & i) + 65536,
              n++)
        }
        e(r)
      }
    }

    function i(t) {
      return 0 === (4294967168 & t) ? 1 : 0 === (4294965248 & t) ? 2 : 0 === (4294901760 & t) ? 3 : 4
    }

    function o(t) {
      var e = 0;
      return r(t, function(t) {
        return e += i(t)
      }),
          e
    }

    function a(t) {
      if (null == t)
        return null;
      var e = new Uint8Array(o(t)),
          n = 0;
      return r(t, function(t) {
        var r = i(t);
        1 === r ? e[n++] = t : (2 === r ? e[n++] = t >> 6 & 31 | 192 : 3 === r ? (e[n++] = t >> 12 & 15 | 224,
            e[n++] = t >> 6 & 63 | 128) : (e[n++] = t >> 18 & 7 | 240,
            e[n++] = t >> 12 & 63 | 128,
            e[n++] = t >> 6 & 63 | 128),
            e[n++] = 63 & t | 128)
      }),
          e
    }

    function s(t, e) {
      if (e >= t.length)
        throw Error("Invalid byte index");
      var n = t[e];
      if (128 === (192 & n))
        return 63 & n;
      throw Error("Invalid continuation byte")
    }

    function u(t) {
      if (null == t)
        return null;
      for (var e = "", n = 0; n < t.length;) {
        var r = t[n++],
            i = void 0;
        if (0 === (128 & r))
          i = r;
        else if (192 === (224 & r)) {
          var o = s(t, n++);
          if (i = (31 & r) << 6 | o,
              i < 128)
            throw Error("Invalid continuation byte")
        } else if (224 === (240 & r)) {
          var o = s(t, n++),
              a = s(t, n++);
          if (i = (15 & r) << 12 | o << 6 | a,
              i < 2048)
            throw Error("Invalid continuation byte");
          if (i >= 55296 && i <= 57343)
            throw Error("Lone surrogate U+" + i.toString(16).toUpperCase() + " is not a scalar value")
        } else {
          if (240 !== (248 & r))
            throw Error("Invalid UTF-8 detected");
          var o = s(t, n++),
              a = s(t, n++),
              u = s(t, n++);
          if (i = (15 & r) << 18 | o << 12 | a << 6 | u,
              i < 65536 || i > 1114111)
            throw Error("Invalid continuation byte")
        }
        i > 65535 && (i -= 65536,
            e += String.fromCharCode(i >>> 10 & 1023 | 55296),
            i = 56320 | 1023 & i),
            e += String.fromCharCode(i)
      }
      return e
    }

    return e.stringLengthInBytes = o,
        e.encodeString = a,
        e.decodeString = u,
        n.exports
  });
  System.registerDynamic("16", ["14"], !0, function(t, e, n) {
    "use strict";
    var r = t("14"),
        i = function() {
          function t() {}

          return t.prototype.readBoolean = function() {
            return 1 === this.readUint8()
          },
              t.prototype.readArray = function(t) {
                var e = this.readLength();
                if (e === -1)
                  return null;
                for (var n = new Array(e), r = 0; r < e; r++)
                  n[r] = t();
                return n
              },
              t.prototype.readString = function() {
                var t = this.readLength();
                return t === -1 ? null : r.decodeString(this.readBytes(t))
              },
              t.prototype.readObject = function() {
                var t = this.readString();
                return null == t ? null : JSON.parse(t)
              },
              t.prototype.readLength = function() {
                var t = 0,
                    e = 0,
                    n = 0;
                do {
                  var r = this.readUint8();
                  t |= (127 & r) << e,
                      e += 7,
                      n++
                } while (128 & r);
                return 2 === n && 0 === t ? -1 : t
              },
              t
        }();
    return e.BasePacketReader = i,
        n.exports
  });
  System.registerDynamic("17", ["16"], !0, function(t, e, n) {
    "use strict";
    var r = this && this.__extends || function(t, e) {
              function n() {
                this.constructor = t
              }

              for (var r in e)
                e.hasOwnProperty(r) && (t[r] = e[r]);
              t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
                  new n)
            },
        i = t("16"),
        o = function(t) {
          function e() {
            t.apply(this, arguments),
                this.offset = 0
          }

          return r(e, t),
              e.prototype.setBuffer = function(t) {
                this.offset = 0,
                    this.buffer = t,
                    this.view = new DataView(this.buffer)
              },
              e.prototype.readInt8 = function() {
                return this.offset += 1,
                    this.view.getInt8(this.offset - 1)
              },
              e.prototype.readUint8 = function() {
                return this.offset += 1,
                    this.view.getUint8(this.offset - 1)
              },
              e.prototype.readInt16 = function() {
                return this.offset += 2,
                    this.view.getInt16(this.offset - 2)
              },
              e.prototype.readUint16 = function() {
                return this.offset += 2,
                    this.view.getUint16(this.offset - 2)
              },
              e.prototype.readInt32 = function() {
                return this.offset += 4,
                    this.view.getInt32(this.offset - 4)
              },
              e.prototype.readUint32 = function() {
                return this.offset += 4,
                    this.view.getUint32(this.offset - 4)
              },
              e.prototype.readFloat32 = function() {
                return this.offset += 4,
                    this.view.getFloat32(this.offset - 4)
              },
              e.prototype.readFloat64 = function() {
                return this.offset += 8,
                    this.view.getFloat64(this.offset - 8)
              },
              e.prototype.readBytes = function(t) {
                return this.offset += t,
                    new Uint8Array(this.view.buffer, this.offset - t, t)
              },
              e
        }(i.BasePacketReader);
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = o,
        n.exports
  });
  System.registerDynamic("18", [getCodeName("BlueBird"), getCodeName("Lodash"), "d", "e", "10", "11", "12", "15", "17", getCodeName("BufferForTheBrowser")], !0, function(t, e, n) {
    return function(n) {
      "use strict";

      function r() {
        var t = {};
        return t.promise = new i(function(e, n) {
          t.resolve = e,
              t.reject = n
        }),
            t
      }

      var i = t(getCodeName("BlueBird")),
          o = t(getCodeName("Lodash")),
          a = t("d"),
          s = t("e"),
          u = t("10"),
          l = t("11"),
          c = t("12"),
          f = t("15"),
          p = t("17"),
          h = function() {
            function t(t, e, n, r) {
              var i = this;
              void 0 === n && (n = function(t) {
                return t()
              }),
              void 0 === r && (r = console.log.bind(console)),
                  this.options = t,
                  this.errorHandler = e,
                  this.apply = n,
                  this.log = r,
                  this.client = {},
                  this.server = {},
                  this.sentSize = 0,
                  this.receivedSize = 0,
                  this.isConnected = !1,
                  this.special = {},
                  this.connecting = !1,
                  this.lastPing = 0,
                  this.lastSentId = 0,
                  this.versionValidated = !1,
                  this.beforeunload = function() {
                    if (i.socket)
                      try {
                        i.socket.onclose = function() {},
                            i.socket.close(),
                            i.socket = null
                      } catch (t) {}
                  },
                  this.defers = new Map,
                  this.inProgressFields = {},
                  this.rateLimits = [],
                  this.options.server.forEach(function(t, e) {
                    if ("string" == typeof t)
                      i.createMethod(t, e, {});
                    else {
                      i.createMethod(t[0], e, t[1]);
                      var n = t[1].rateLimit;
                      n && (i.rateLimits[e] = o.assign({
                        calls: []
                      }, s.parseRateLimit(n)))
                    }
                  }),
                  this.special["*version"] = function(t) {
                    t === i.options.hash ? i.versionValidated = !0 : i.client.invalidVersion && i.client.invalidVersion(t, i.options.hash)
                  }
            }

            return t.prototype.getWebsocketUrl = function() {
              var t = this.options,
                  e = t.host || location.host,
                  n = t.path || "/ws",
                  r = t.ssl || "https:" === location.protocol ? "wss://" : "ws://",
                  i = t.token ? "?t=" + t.token : "";
              if (t.requestParams) {
                var o = Object.keys(t.requestParams).map(function(e) {
                  return e + "=" + encodeURIComponent(t.requestParams[e])
                }).join("&");
                i += (i ? "&" : "?") + o
              }
              return r + e + n + i
            },
                t.prototype.connect = function() {
                  var t = this;
                  if (this.connecting = !0, !this.socket) {
                    var e = this.options;
                    this.socket = new WebSocket(this.getWebsocketUrl()),
                        window.addEventListener("beforeunload", this.beforeunload);
                    var r = new p.default,
                        i = new f.default,
                        o = u.createHandlers(a.getBinary(e.server), a.getBinary(e.client)),
                        s = a.getNames(e.server),
                        h = a.getNames(e.client),
                        d = a.getIgnore(e.server).concat(a.getIgnore(e.client));
                    e.debug ? this.packet = new c.DebugPacketHandler(h, s, i, r, o, d, this.log) : this.packet = new l.PacketHandler(h, s, i, r, o),
                        this.packet.supportsBinary = !!this.socket.binaryType,
                        this.socket.binaryType = "arraybuffer",
                        this.socket.onmessage = function(e) {
                          if (e.data)
                            try {
                              t.receivedSize += t.packet.recv(e.data, t.client, t.special)
                            } catch (n) {
                              if (!t.errorHandler)
                                throw n;
                              t.errorHandler.handleRecvError(n, e.data)
                            }
                          else
                            t.sendPing()
                        },
                        this.socket.onopen = function() {
                          e.debug && t.log("socket opened"),
                              t.lastSentId = 0,
                              t.isConnected = !0,
                          t.socket && t.packet.supportsBinary && t.socket.send("undefined" != typeof n ? new n(0) : new ArrayBuffer(0)),
                          t.client.connected && t.client.connected(),
                          e.pingInterval && (t.pingInterval = setInterval(function() {
                            return t.sendPing()
                          }, e.pingInterval))
                        },
                        this.socket.onerror = function(n) {
                          e.debug && t.log("socket error", n)
                        },
                        this.socket.onclose = function(n) {
                          e.debug && t.log("socket closed", n),
                              t.socket = null,
                              t.versionValidated = !1,
                          t.isConnected && (t.isConnected = !1,
                          t.client.disconnected && t.client.disconnected()),
                          t.connecting && (t.reconnectTimeout = setTimeout(function() {
                            t.connect(),
                                t.reconnectTimeout = null
                          }, e.reconnectTimeout)),
                              t.defers.forEach(function(t) {
                                return t.reject(new Error("disconnected"))
                              }),
                              t.defers.clear(),
                              Object.keys(t.inProgressFields).forEach(function(e) {
                                return t.inProgressFields[e] = 0
                              }),
                          t.pingInterval && (clearInterval(t.pingInterval),
                              t.pingInterval = null)
                        }
                  }
                },
                t.prototype.disconnect = function() {
                  this.connecting = !1,
                  this.reconnectTimeout && (clearTimeout(this.reconnectTimeout),
                      this.reconnectTimeout = null),
                  this.pingInterval && (clearInterval(this.pingInterval),
                      this.pingInterval = null),
                  this.socket && (this.socket.close(),
                      this.socket = null),
                      window.removeEventListener("beforeunload", this.beforeunload)
                },
                t.prototype.sendPing = function() {
                  try {
                    var t = Date.now();
                    this.socket && this.versionValidated && t - this.lastPing > this.options.pingInterval && (this.socket.send(""),
                        this.lastPing = Date.now())
                  } catch (t) {}
                },
                t.prototype.createMethod = function(t, e, n) {
                  n.promise ? this.createPromiseMethod(t, e, n.progress) : this.createSimpleMethod(t, e)
                },
                t.prototype.createSimpleMethod = function(t, e) {
                  var n = this;
                  this.server[t] = function() {
                    for (var r = [], i = 0; i < arguments.length; i++)
                      r[i - 0] = arguments[i];
                    return !!s.checkRateLimit(e, n.rateLimits) && (n.sentSize += n.packet.send(n.socket, t, e, r),
                            n.lastSentId++, !0)
                  }
                },
                t.prototype.createPromiseMethod = function(t, e, n) {
                  var o = this;
                  n && (this.inProgressFields[n] = 0,
                      Object.defineProperty(this.server, n, {
                        get: function() {
                          return !!o.inProgressFields[n]
                        }
                      })),
                      this.server[t] = function() {
                        for (var a = [], u = 0; u < arguments.length; u++)
                          a[u - 0] = arguments[u];
                        if (!o.isConnected)
                          return i.reject(new Error("not connected"));
                        if (!s.checkRateLimit(e, o.rateLimits))
                          return i.reject(new Error("rate limit exceeded"));
                        o.sentSize += o.packet.send(o.socket, t, e, a);
                        var l = ++o.lastSentId,
                            c = r();
                        return o.defers.set(l, c),
                        n && o.inProgressFields[n]++,
                            c.promise
                      },
                      this.special["*resolve:" + t] = function(t, e) {
                        var r = o.defers.get(t);
                        r && (o.defers.delete(t),
                        n && o.inProgressFields[n]--,
                            o.apply(function() {
                              return r.resolve(e)
                            }))
                      },
                      this.special["*reject:" + t] = function(t, e) {
                        var r = o.defers.get(t);
                        r && (o.defers.delete(t),
                        n && o.inProgressFields[n]--,
                            o.apply(function() {
                              return r.reject(new Error(e))
                            }))
                      }
                },
                t
          }();
      e.ClientSocket = h
    }(t(getCodeName("BufferForTheBrowser")).Buffer),
        n.exports
  });
  System.registerDynamic("1a", [], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      return void 0 === t && (t = {}),
          function(e, n) {
            var r = l.get(e.constructor) || [];
            r.push({
              name: n,
              options: t
            }),
                l.set(e.constructor, r)
          }
    }

    function i(t) {
      return function(e) {
        c.set(e, t)
      }
    }

    function o(t) {
      return c.get(t)
    }

    function a(t) {
      return l.get(t)
    }

    function s(t) {
      return Object.keys(t).filter(function(e) {
        return "connected" !== e && "disconnected" !== e && "invalidVersion" !== e && "function" == typeof t[e]
      }).map(function(t) {
        return {
          name: t,
          options: {}
        }
      })
    }

    function u(t) {
      return a(t) || s(t.prototype)
    }

    var l = new Map,
        c = new Map;
    return e.Method = r,
        e.Socket = i,
        e.getSocketMetadata = o,
        e.getMethodMetadata = a,
        e.getMethods = u,
        n.exports
  });
  System.registerDynamic("1b", ["d", "18", "1a"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      for (var n in t)
        e.hasOwnProperty(n) || (e[n] = t[n])
    }

    r(t("d"));
    var i = t("18");
    e.ClientSocket = i.ClientSocket;
    var o = t("1a");
    return e.Method = o.Method,
        n.exports
  });
  System.registerDynamic("1c", ["1b"], !0, function(t, e, n) {
    return n.exports = t("1b"),
        n.exports
  });
  System.registerDynamic("1d", ["1e", "1f", "20", "21", "22", "23"], !0, function(t, e, n) {
    "use strict";
    var r = t("1e"),
        i = t("1f"),
        o = t("20"),
        a = t("21"),
        s = t("22"),
        u = t("23"),
        l = Math.floor,
        c = Math.ceil,
        f = Math.round,
        p = function() {
          function t(t, e, n) {
            this.id = t,
                this.x = e,
                this.y = n,
                this.entities = [],
                this.entitiesDrawn = 0,
                this.tiles = new Uint8Array(o.REGION_SIZE * o.REGION_SIZE),
                this.tileIndices = new Int16Array(o.REGION_SIZE * o.REGION_SIZE),
                this.randoms = new Int16Array(o.REGION_SIZE * o.REGION_SIZE);
            for (var r = 0; r < this.tiles.length; r++)
              this.tiles[r] = s.TileType.Dirt,
                  this.tileIndices[r] = -1,
                  this.randoms[r] = Math.floor(1e3 * Math.random())
          }

          return t.prototype.getTiles = function() {
            return this.tiles
          },
              t.prototype.load = function(t) {
                this.tiles = t;
                for (var e = 0; e < this.tiles.length; e++)
                  this.tileIndices[e] = -1
              },
              t.prototype.canWalk = function(t, e) {
                if (t < 0 || e < 0 || t > o.REGION_SIZE || e > o.REGION_SIZE)
                  return !1;
                var n = this.getTile(t, e);
                return n && s.canWalk(n)
              },
              t.prototype.getTile = function(t, e) {
                return this.tiles[(0 | t) + (0 | e) * o.REGION_SIZE]
              },
              t.prototype.setTile = function(t, e, n) {
                this.tiles[l(t) + l(e) * o.REGION_SIZE] = n
              },
              t.prototype.setDirty = function(t, e) {
                this.tileIndices[l(t) + l(e) * o.REGION_SIZE] = -1
              },
              t.prototype.drawEntities2 = function(t, e) {
                var n = this;
                this.entitiesDrawn = 0,
                    this.entities.sort(function(t, e) {
                      return t.y === e.y ? t.x - e.x : t.y - e.y
                    }),
                    this.entities.forEach(function(r) {
                      function a(e, n) {
                        e && t.drawRect(n, f(r.x * o.tileWidth + e.x), f(r.y * o.tileHeight + e.y), f(e.w), f(e.h))
                      }

                      r.draw2 && e.isVisible(r) && (r.draw2(t),
                          n.entitiesDrawn++),
                      i.debugOptions.showHelpers && (t.globalAlpha = .3,
                      r.collider && t.drawRect(u.RED, f((r.x + r.collider.x) * o.tileWidth), f((r.y + r.collider.y) * o.tileHeight), f(r.collider.w * o.tileWidth), f(r.collider.h * o.tileHeight)),
                          a(r.bounds, u.ORANGE),
                          a(r.coverBounds, u.BLUE),
                          a(r.interactBounds, u.PURPLE),
                          t.globalAlpha = 1)
                    })
              },
              t.prototype.drawTiles = function(t, e, n) {
                var r = this.x * o.REGION_SIZE,
                    i = this.y * o.REGION_SIZE;
                if (e.isRectVisible(r * o.tileWidth, i * o.tileHeight, o.REGION_SIZE * o.tileWidth, o.REGION_SIZE * o.tileHeight))
                  for (var s = a.clamp(l(e.x / o.tileWidth - r), 0, o.REGION_SIZE), u = a.clamp(l(e.y / o.tileHeight - i), 0, o.REGION_SIZE), f = a.clamp(c((e.x + e.w) / o.tileWidth - r), 0, o.REGION_SIZE), p = a.clamp(c((e.y + e.h) / o.tileHeight - i), 0, o.REGION_SIZE), h = u; h <= p; h++)
                    for (var d = s; d < f; d++)
                      this.drawMapTile(t, d, h, d + r, h + i, n)
              },
              t.prototype.getTileType = function(t, e, n) {
                return t >= 0 && e >= 0 && t < o.REGION_SIZE && e < o.REGION_SIZE ? this.getTile(t, e) : n.getTile(t + this.x * o.REGION_SIZE, e + this.y * o.REGION_SIZE)
              },
              t.prototype.updateTileIndex = function(t, e, n) {
                var r, i = this.getTile(t, e),
                    a = 0;
                i === s.TileType.Dirt ? r = 47 : i === s.TileType.Grass && (a += this.getTileType(t - 1, e - 1, n) === i ? 1 : 0,
                    a += this.getTileType(t, e - 1, n) === i ? 2 : 0,
                    a += this.getTileType(t + 1, e - 1, n) === i ? 4 : 0,
                    a += this.getTileType(t - 1, e, n) === i ? 8 : 0,
                    a += this.getTileType(t + 1, e, n) === i ? 16 : 0,
                    a += this.getTileType(t - 1, e + 1, n) === i ? 32 : 0,
                    a += this.getTileType(t, e + 1, n) === i ? 64 : 0,
                    a += this.getTileType(t + 1, e + 1, n) === i ? 128 : 0,
                    r = s.TILE_MAP[a]);
                var u = s.TILE_COUNT_MAP[r],
                    l = s.TILE_MAP_MAP[r] + (u > 1 ? this.randoms[t + e * o.REGION_SIZE] % u : 0);
                return this.tileIndices[t + e * o.REGION_SIZE] = l
              },
              t.prototype.drawMapTile = function(t, e, n, i, a, s) {
                var u = this.tileIndices[e + n * o.REGION_SIZE];
                u === -1 && (u = this.updateTileIndex(e, n, s));
                var l = 8,
                    c = u % l,
                    f = Math.floor(u / l),
                    p = c * o.tileWidth,
                    h = f * o.tileHeight;
                t.drawImage(r.tileSprite.tex, null, p, h, o.tileWidth, o.tileHeight, i * o.tileWidth, a * o.tileHeight, o.tileWidth, o.tileHeight)
              },
              t
        }();
    return e.Region = p,
        n.exports
  });
  System.registerDynamic("24", [getCodeName("Lodash"), getCodeName("gl-matrix"), "1e", "25", "21", "20", "26", "23"], !0, function(t, e, n) {
    "use strict";

    function r(t, e, n) {
      return t ? {
        x: t.ox + e,
        y: t.oy + n,
        w: t.w,
        h: t.h
      } : {
        x: 0,
        y: 0,
        w: 0,
        h: 0
      }
    }

    function i(t, e, n) {
      var i = t.color,
          o = t.shadow;
      return i && o ? k.addRects(r(i, -e, -n), r(o, -e, -n)) : i ? r(i, -e, -n) : r(o, -e, -n)
    }

    function o(t, e, n, i, o) {
      if (!O)
        return {};
      var a = t.palette ? o.add(t.palette) : null,
          s = 5 * Math.random();
      return {
        bounds: r(t.frames[0], -n, -i),
        update: function(t) {
          s += t
        },
        draw2: function(r) {
          var o = Math.floor(s * e) % t.frames.length,
              u = t.frames[o],
              l = Math.round(this.x * A.tileWidth - n),
              c = Math.round(this.y * A.tileHeight - i);
          u && r.drawSprite(u, null, a, l, c)
        }
      }
    }

    function a(t, e, n, r, o) {
      if (void 0 === o && (o = D.SHADOW_COLOR), !O)
        return {};
      var a = t.shadow ? r.add(R) : null,
          s = t.palette ? r.add(t.palette) : null;
      return {
        bounds: i(t, e, n),
        draw2: function(r) {
          var i = Math.round(this.x * A.tileWidth - e),
              u = Math.round(this.y * A.tileHeight - n);
          r.drawSprite(t.shadow, o, a, i, u),
              r.drawSprite(t.color, null, s, i, u)
        },
        release: function() {
          T.releasePalette(a),
              T.releasePalette(s)
        }
      }
    }

    function s(t, e, n, i) {
      if (!O)
        return {};
      var o = 1,
          a = 1;
      return {
        lightBounds: r(t, -n, -i),
        update: function(t) {
          var e = .2 * t;
          Math.abs(o - a) < e ? (o = a,
              a = 1 - .05 * Math.random()) : o += o < a ? e : -e
        },
        drawLight: function(r) {
          var a = Math.round(this.x * A.tileWidth),
              s = Math.round(this.y * A.tileHeight);
          S.mat2d.identity(P),
              S.mat2d.translate(P, P, S.vec2.set(j, a, s)),
              S.mat2d.scale(P, P, S.vec2.set(j, o, o)),
              S.mat2d.translate(P, P, S.vec2.set(j, -n, -i)),
              r.transform = P,
              r.drawSprite(t, e, 0, 0),
              r.transform = null
        }
      }
    }

    function u(t) {
      if (!O)
        return {};
      var n = t.add(R),
          i = t.add(M.tree2.palette),
          o = M.tree2.stump,
          a = M.tree2.stumpShadow,
          s = M.tree2.trunk;
      return {
        bounds: k.addRects(k.addRects(r(o, -e.treeOffsetX, -e.treeOffsetY), r(s, -e.treeOffsetX, -e.treeOffsetY)), r(a, -e.treeOffsetX, -e.treeOffsetY)),
        coverBounds: {
          x: -50,
          y: -135,
          w: 110,
          h: 120
        },
        draw2: function(t) {
          var r = Math.round(this.x * A.tileWidth - e.treeOffsetX),
              u = Math.round(this.y * A.tileHeight - e.treeOffsetY);
          t.drawSprite(a, D.SHADOW_COLOR, n, r, u),
              t.drawSprite(o, null, i, r, u),
              t.globalAlpha = 1 - .6 * (this.coverLifting || 0),
              t.drawSprite(s, null, i, r, u),
              t.globalAlpha = 1
        }
      }
    }

    function l(t) {
      if (!O)
        return {};
      var n = t.add(R),
          i = t.add(M.tree2.palette),
          o = M.tree2.crown,
          a = M.tree2.shadow;
      return {
        bounds: k.addRects(r(o, -e.treeOffsetX, -e.treeOffsetY - e.treeOffset), r(a, -e.treeOffsetX, -e.treeOffsetY - e.treeOffset)),
        coverBounds: {
          x: -50,
          y: -135 - e.treeOffset,
          w: 110,
          h: 120
        },
        draw2: function(t) {
          var r = Math.round(this.x * A.tileWidth - e.treeOffsetX),
              s = Math.round(this.y * A.tileHeight - e.treeOffsetY - e.treeOffset);
          t.drawSprite(a, D.SHADOW_COLOR, n, r, s),
              t.globalAlpha = 1 - .6 * (this.coverLifting || 0),
              t.drawSprite(o, null, i, r, s),
              t.globalAlpha = 1
        }
      }
    }

    function c(t, e, n, r) {
      return {
        collider: {
          x: t,
          y: e,
          w: n,
          h: r
        },
        canCollideWith: !0
      }
    }

    function f(t, e, n, r) {
      for (var i = [], o = 4; o < arguments.length; o++)
        i[o - 4] = arguments[o];
      return E.assign.apply(void 0, [{
        type: t,
        id: e,
        x: n,
        y: r
      }].concat(i))
    }

    function p(t, e, n, r) {
      return f("apple", t, e, n, {
        interactive: !0
      }, a(M.apple_2, 4, 4, r), {
        bounds: {
          x: -8,
          y: -8,
          w: 16,
          h: 16
        }
      })
    }

    function h(t, e, n, r, i) {
      return f("sign", t, e, n, {
        interactive: !0
      }, a(M.sign_2, 11, 24, i), r, {
        options: r
      })
    }

    function d(t, e, n, r) {
      return f("rock", t, e, n, c(-.5, -.25, 1, .5), a(M.rock_2, 15, 15, r))
    }

    function m(t, e, n, r) {
      return f("pumpkin", t, e, n, c(-.35, -.25, .7, .5), a(M.pumpkin_2, 11, 15, r))
    }

    function g(t, e, n, r) {
      return f("jacko", t, e, n, c(-.35, -.25, .7, .5), a(M.jacko_2, 11, 15, r), s(M.light3, C.default.parse("99824f"), 64, 47))
    }

    function v(t, e, n, r) {
      return f("tree", t, e, n, c(-.5, 0, 1, .5), u(r))
    }

    function y(t, e, n, r) {
      return f("tree-crown", t, e, n, l(r))
    }

    function b(t, n, r, i) {
      return f("tree-stump", t, n, r, c(-.5, -.1, 1, .5), a(F, e.treeOffsetX, e.treeOffsetY, i))
    }

    function _(t, e, n, r) {
      return f("butterfly", t, e, n, o(M.butterfly2, 8, 5, 65, r))
    }

    function w(t, e, n, r) {
      return f("bat", t, e, n, o(M.bat2, 8, 10, 65, r))
    }

    function x(t, e, n, r) {
      var o = M.cloud.shadow,
          s = o.w / 2,
          u = o.h;
      return f("cloud", t, e, n, {
        vx: -.5,
        vy: 0
      }, {
        bounds: i(M.cloud, s, u)
      }, a(M.cloud_2, s, u, r, D.CLOUD_SHADOW_COLOR))
    }

    function $(t, e, n, r, i, o) {
      return "cloud" === t ? x(e, n, r, o) : "apple" === t ? p(e, n, r, o) : "rock" === t ? d(e, n, r, o) : "sign" === t ? h(e, n, r, i, o) : "tree" === t ? v(e, n, r, o) : "tree-crown" === t ? y(e, n, r, o) : "tree-stump" === t ? b(e, n, r, o) : "pumpkin" === t ? m(e, n, r, o) : "jacko" === t ? g(e, n, r, o) : "butterfly" === t ? _(e, n, r, o) : "bat" === t ? w(e, n, r, o) : null
    }

    var E = t(getCodeName("Lodash")),
        S = t(getCodeName("gl-matrix")),
        M = t("1e"),
        T = t("25"),
        k = t("21"),
        A = t("20"),
        C = t("26"),
        D = t("23"),
        O = "undefined" != typeof window,
        I = 4294967295,
        R = [0, I],
        F = ({
          color: M.tree.stump,
          shadow: M.tree.stumpShadow
        }, {
          color: M.tree2.stump,
          shadow: M.tree2.stumpShadow,
          palette: M.tree2.palette
        });
    e.treeOffsetX = 72,
        e.treeOffsetY = 162,
        e.treeOffset = 30;
    var P = S.mat2d.create(),
        j = S.vec2.create();
    return e.createApple = p,
        e.createSign = h,
        e.createRock = d,
        e.createPumpkin = m,
        e.createJacko = g,
        e.createTree = v,
        e.createTreeCrown = y,
        e.createTreeStump = b,
        e.createButterfly = _,
        e.createBat = w,
        e.createCloud = x,
        e.createAnEntity = $,
        n.exports
  });
  System.registerDynamic("28", [getCodeName("Lodash"), "1c", "21", "20", "29", "2a", "1d", "24", "2b", "2c"], !0, function(t, e, n) {
    "use strict";
    var r = this && this.__decorate || function(t, e, n, r) {
              var i, o = arguments.length,
                  a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
              if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                a = Reflect.decorate(t, e, n, r);
              else
                for (var s = t.length - 1; s >= 0; s--)
                  (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
              return o > 3 && a && Object.defineProperty(e, n, a),
                  a
            },
        i = this && this.__metadata || function(t, e) {
              if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(t, e)
            },
        o = t(getCodeName("Lodash")),
        a = t("1c"),
        s = t("21"),
        u = t("20"),
        l = t("29"),
        c = t("2a"),
        f = t("1d"),
        p = t("24"),
        h = t("2b"),
        d = t("2c"),
        m = function(t, e) {
          t.player = e,
              t.player.interactive = !1,
              s.setupSetTes(e)
        },
        g = h.default.game,
        v = [5, 9, 10, 6, 6, 6, 6, 1],
        y = function() {
          function t(t, e) {
            this.gameService = t,
                this.$timeout = e
          }

          return t.prototype.connected = function() {
            g.player = null,
                g.map = new c.Map(0, 0),
                this.gameService.joined()
          },
              t.prototype.disconnected = function() {
                this.gameService.disconnected()
              },
              t.prototype.invalidVersion = function() {
                location.reload()
              },
              t.prototype.map = function(t) {
                g.baseTime = Date.now() - t.time,
                    g.map = new c.Map(t.regionsX, t.regionsY)
              },
              t.prototype.subscribeRegion = function(t, e, n) {
                var r = new f.Region(0, t, e);
                r.load(n),
                    g.map.setRegion(t, e, r)
              },
              t.prototype.unsubscribeRegion = function(t, e) {
                g.map.setRegion(t, e, null)
              },
              t.prototype.updateTile = function(t, e, n) {
                g.map.setTile(t, e, n)
              },
              t.prototype.myEntityId = function(t) {
                this.myId = t
              },
              t.prototype.addEntities = function(t) {
                var e = this;
                t.forEach(function(t) {
                  var n = t[0],
                      r = t[1],
                      i = t[2],
                      o = t[3],
                      a = t[4],
                      s = t[5],
                      u = t[6],
                      l = t[7];
                  return e.addEntity(n, r, i, o, a, s, u, l)
                }),
                    g.loaded = !0
              },
              t.prototype.addEntity = function(t, e, n, r, i, a, s, u) {
                var c;
                if ("pony" === e) {
                  var f = n.info,
                      h = n.site,
                      d = this.gameService.account;
                  d.settings.filterSwearWords && f.cmo && t !== this.myId && (f.cm = null),
                      delete n.info,
                      delete n.site,
                      c = new l.Pony(t, f, u, h, g.paletteManager),
                      o.assign(c, n),
                      c.name = this.filterText(d, c.name, t === this.myId)
                } else
                  c = p.createAnEntity(e, t, r, i, n, g.paletteManager);
                c ? (c.id = t,
                    c.x = r,
                    c.y = i,
                    c.vx = a,
                    c.vy = s,
                    g.map.addEntity(c),
                t === this.myId && this.$timeout(function() {
                  return m(g, c)
                })) : console.error("unknown entity type", e)
              },
              t.prototype.removeEntity = function(t) {
                g.map.removeEntity(t),
                g.isSelected(t) && this.$timeout(function() {
                  g.isSelected(t) && g.select(null)
                }, 15e3)
              },
              t.prototype.updateEntity = function(t, e, n, r, i) {
                var o = g.map.findEntityById(t);
                o !== g.player && (o ? (o.x = e,
                    o.y = n,
                    o.vx = r,
                    o.vy = i) : console.error("updateEntity: missing entity", t))
              },
              t.prototype.updateEntities = function(t, e) {
                var n = this;
                t.forEach(function(t) {
                  var e = t[0],
                      r = t[1],
                      i = t[2],
                      o = t[3],
                      a = t[4];
                  return n.updateEntity(e, r, i, o, a)
                }),
                    e.forEach(function(t) {
                      return n.removeEntity(t)
                    })
              },
              t.prototype.updateEntityOptions = function(t, e) {
                var n = g.map.findEntityById(t);
                n ? o.assign(n, e) : console.error("updateEntityOptions: missing entity", t)
              },
              t.prototype.says = function(t, e, n) {
                var r = g.map.findEntityById(t);
                if (r) {
                  var i = r.id === this.myId,
                      o = this.gameService.account;
                  if (!i && o.settings.filterCyrillic && d.containsCyrillic(e))
                    return;
                  if (r.ignored && 2 !== n)
                    return;
                  if (!g.camera.isVisible(r))
                    return;
                  r.says = {
                    message: this.filterText(o, e, i),
                    timer: u.SAYS_TIME,
                    type: n
                  }
                } else
                  console.error("says: missing entity", t)
              },
              t.prototype.left = function() {
                g.player = null,
                    g.map = new c.Map(0, 0),
                    this.gameService.left()
              },
              t.prototype.filterText = function(t, e, n) {
                var r = !n && (t.settings.filterSwearWords || this.gameService.server.filter);
                return r ? d.filterBadWords(e) : e
              },
              r([a.Method(), i("design:type", Function), i("design:paramtypes", [Object]), i("design:returntype", void 0)], t.prototype, "map", null),
              r([a.Method({
                binary: [1, 1, [1]]
              }), i("design:type", Function), i("design:paramtypes", [Number, Number, Array]), i("design:returntype", void 0)], t.prototype, "subscribeRegion", null),
              r([a.Method({
                binary: [1, 1]
              }), i("design:type", Function), i("design:paramtypes", [Number, Number]), i("design:returntype", void 0)], t.prototype, "unsubscribeRegion", null),
              r([a.Method({
                binary: [3, 3, 1]
              }), i("design:type", Function), i("design:paramtypes", [Number, Number, Number]), i("design:returntype", void 0)], t.prototype, "updateTile", null),
              r([a.Method({
                binary: [5]
              }), i("design:type", Function), i("design:paramtypes", [Number]), i("design:returntype", void 0)], t.prototype, "myEntityId", null),
              r([a.Method({
                binary: [v]
              }), i("design:type", Function), i("design:paramtypes", [Array]), i("design:returntype", void 0)], t.prototype, "addEntities", null),
              r([a.Method({
                binary: v
              }), i("design:type", Function), i("design:paramtypes", [Number, String, Object, Number, Number, Number, Number, Number]), i("design:returntype", void 0)], t.prototype, "addEntity", null),
              r([a.Method({
                binary: [
                  [5, 6, 6, 6, 6, 1],
                  [5]
                ]
              }), i("design:type", Function), i("design:paramtypes", [Array, Array]), i("design:returntype", void 0)], t.prototype, "updateEntities", null),
              r([a.Method(), i("design:type", Function), i("design:paramtypes", [Number, Object]), i("design:returntype", void 0)], t.prototype, "updateEntityOptions", null),
              r([a.Method(), i("design:type", Function), i("design:paramtypes", [Number, String, Number]), i("design:returntype", void 0)], t.prototype, "says", null),
              r([a.Method(), i("design:type", Function), i("design:paramtypes", []), i("design:returntype", void 0)], t.prototype, "left", null),
              t
        }();
    return e.ClientActions = y,
        n.exports
  });
  System.registerDynamic("2d", [getCodeName("BlueBird"), getCodeName("Lodash"), "1c", "21", "2e", "b", "2b", "28", "1f"], !0, function(t, e, n) {
    "use strict";
    var r = t(getCodeName("BlueBird")),
        i = t(getCodeName("Lodash")),
        o = t("1c"),
        a = t("21"),
        s = t("2e"),
        u = t("b"),
        l = t("2b"),
        c = t("28"),
        f = t("1f"),
        p = l.default.game,
        h = function() {
          function t(t, e, n) {
            this.$timeout = t,
                this.model = e,
                this.apply = n,
                this.playing = !1,
                this.joining = !1,
                this.offline = !1,
                this.protectionError = !1,
                this.rateLimitError = !1,
                this.servers = [],
                this.initialized = !1,
                this.updateStatus()
          }

          return Object.defineProperty(t.prototype, "selected", {
            get: function() {
              return p.selected
            },
            enumerable: !0,
            configurable: !0
          }),
              Object.defineProperty(t.prototype, "account", {
                get: function() {
                  return this.model.account
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "canPlay", {
                get: function() {
                  return !!this.model.pony && !!this.model.pony.name && !this.joining && this.server && !this.server.offline && !this.rateLimitError
                },
                enumerable: !0,
                configurable: !0
              }),
              t.prototype.updateStatus = function() {
                var t = this;
                r.resolve().then(function() {
                  return t.joining || t.playing || !t.account ? null : t.model.status().then(function(e) {
                    t.initialized = !0,
                        t.offline = !1,
                        t.version = e.version,
                        i.merge(t.servers, e.servers), !t.server && t.account.settings.defaultServer && (t.server = t.servers.find(function(e) {
                      return e.id === t.account.settings.defaultServer
                    }),
                    f.debugOptions.autoJoin && setTimeout(function() {
                      return t.join(t.model.pony.id)
                    }))
                  }).catch(function(e) {
                    t.offline = e.message === a.OFFLINE_ERROR,
                        t.protectionError = e.message === a.PROTECTION_ERROR
                  })
                }).then(function() {
                  return setTimeout(function() {
                    return t.updateStatus()
                  }, t.initialized ? 5e3 : 500)
                })
              },
              t.prototype.join = function(t) {
                var e = this;
                return this.playing || this.joining ? r.resolve() : (this.joining = !0,
                    this.model.join(this.server.id, t).then(function(t) {
                      if (!e.joining)
                        return null;
                      var n = new o.ClientSocket(t);
                      n.client = new c.ClientActions(e, e.$timeout),
                          n.connect(),
                          p.startup(n, e.apply);
                      var r = u.start(p, function(t) {
                            e.leave(),
                                e.error = t.message,
                                console.error(t),
                                s.reportError(t)
                          }),
                          i = r.promise,
                          a = r.cancel;
                      return e.cancelGameLoop = a,
                          i
                    }).catch(function(t) {
                      throw t.status && t.status > 500 && t.status < 500 && (e.rateLimitError = !0,
                          e.$timeout(function() {
                            return e.rateLimitError = !1
                          }, 5e3)),
                          e.left(),
                          t
                    }))
              },
              t.prototype.leave = function() {
                p.socket && (p.socket.isConnected ? p.socket.server.leave() : p.socket.disconnect()),
                    this.left()
              },
              t.prototype.joined = function() {
                var t = this;
                this.$timeout.cancel(this.disconnectedTimeout),
                    this.$timeout(function() {
                      t.joining = !1,
                          t.playing = !0
                    })
              },
              t.prototype.left = function() {
                var t = this;
                this.cancelGameLoop && (this.cancelGameLoop(),
                    this.cancelGameLoop = null),
                    this.$timeout.cancel(this.disconnectedTimeout),
                    this.$timeout(function() {
                      t.joining = !1,
                          t.playing = !1
                    }),
                    p.release()
              },
              t.prototype.disconnected = function() {
                var t = this;
                this.$timeout.cancel(this.disconnectedTimeout),
                    this.disconnectedTimeout = this.$timeout(function() {
                      return t.left()
                    }, 1e4)
              },
              t.$inject = ["$timeout", "model", "applyCallback"],
              t
        }();
    return e.GameService = h,
        n.exports
  });
  System.registerDynamic("2e", [], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      "undefined" != typeof Rollbar && Rollbar.configure({
        payload: {
          person: t
        }
      })
    }

    function i(t, e) {
      console.error(t),
      "undefined" != typeof Rollbar && Rollbar.error(t, e)
    }

    return e.configureUser = r,
        e.reportError = i,
        n.exports
  });
  System.registerDynamic("2f", [getCodeName("BlueBird"), getCodeName("Lodash"), "30", "21", "2e", "1f", "2c"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      return t.length ? t[0] : u.createDefaultPony()
    }

    function i(t, e) {
      return e.lastUsed && t.lastUsed ? e.lastUsed.localeCompare(t.lastUsed) : 0
    }

    function o() {
      try {
        return window.self !== window.top ? window.top.location : ""
      } catch (t) {
        return "error"
      }
    }

    var a = t(getCodeName("BlueBird")),
        s = t(getCodeName("Lodash")),
        u = t("30"),
        l = t("21"),
        c = t("2e"),
        f = t("1f"),
        p = t("2c"),
        h = {
          id: null,
          name: "none",
          url: null,
          icon: null,
          color: "#222"
        },
        d = function() {
          function t(t) {
            var e = this;
            this.$http = t,
                this.loading = !0,
                this.ponies = [],
                this.saving = !1,
                this.sites = [h],
                this._pony = u.createDefaultPony(),
                this.accountPromise = this.getAccount().tap(function(t) {
                  c.configureUser({
                    id: t.id,
                    username: t.name,
                    custom: {
                      iframe: o()
                    }
                  }),
                      e.account = t,
                      e.sites = [h].concat(t.sites.map(p.toSocialSiteInfo)),
                      e.ponies = t.ponies.map(u.decompressPonyInfo).sort(i),
                      e.selectPony(r(e.ponies))
                }).catch(function(t) {
                  "Access denied" !== t.message && console.error(t)
                }).finally(function() {
                  return e.loading = !1
                })
          }

          return Object.defineProperty(t.prototype, "pony", {
            get: function() {
              return this._pony
            },
            enumerable: !0,
            configurable: !0
          }),
              t.prototype.selectPony = function(t) {
                this._pony = s.cloneDeep(t)
              },
              t.prototype.getAccount = function() {
                return l.toPromise(this.$http.post("/api/account", {}))
              },
              t.prototype.updateAccount = function(t) {
                var e = this;
                return l.toPromise(this.$http.post("/api/account-update", {
                  account: t
                })).tap(function(t) {
                  return s.merge(e.account, t)
                })
              },
              t.prototype.saveSettings = function(t) {
                var e = this;
                return l.toPromise(this.$http.post("/api/account-settings", {
                  settings: t
                })).tap(function(t) {
                  return s.merge(e.account, t)
                })
              },
              t.prototype.savePony = function(t) {
                var e = this;
                return this.saving ? a.reject(new Error("Saving in progress")) : (this.saving = !0,
                    l.toPromise(this.$http.post("/api/pony/save", {
                      pony: t
                    })).then(u.decompressPonyInfo).tap(function(n) {
                      s.remove(e.ponies, function(e) {
                        return e.id === t.id
                      }),
                          e.ponies.push(n),
                          e.ponies.sort(i),
                      e.pony === t && e.selectPony(n)
                    }).finally(function() {
                      return e.saving = !1
                    }))
              },
              t.prototype.removePony = function(t) {
                var e = this;
                return l.toPromise(this.$http.post("/api/pony/remove", {
                  id: t.id
                })).then(function() {
                  s.remove(e.ponies, function(e) {
                    return e.id === t.id
                  }),
                  e.pony === t && e.selectPony(r(e.ponies))
                })
              },
              t.prototype.status = function() {
                return l.toPromise(this.$http.get("/api2/game/status"))
              },
              t.prototype.join = function(t, e) {
                return l.toPromise(this.$http.post("/api/game/join", {
                  serverId: t,
                  ponyId: e,
                  version: f.version
                }))
              },
              t.$inject = ["$http"],
              t
        }();
    return e.Model = d,
        n.exports
  });
  System.registerDynamic("31", ["21"], !0, function(t, e, n) {
    "use strict";
    var r = t("21"),
        i = {
          left: 0,
          top: 0
        },
        o = function() {
          function t(t) {
            this.rect = i,
                this.scrollLeft = 0,
                this.scrollTop = 0,
                this.startX = 0,
                this.startY = 0,
                this.button = 0,
                this.dragging = !1,
                window.navigator.pointerEnabled ? this.setupEvents(t, "pointerdown", "pointermove", "pointerup") : (this.setupEvents(t, "mousedown", "mousemove", "mouseup"),
                    this.setupEvents(t, "touchstart", "touchmove", "touchend"))
          }

          return t.prototype.setupEvents = function(t, e, n, o) {
            var a = this;
            t.addEventListener(e, function(e) {
              if (!a.dragging) {
                "self" === a.relative ? (a.rect = t.getBoundingClientRect(),
                    a.scrollLeft = -window.scrollX,
                    a.scrollTop = -window.scrollY) : "parent" === a.relative ? (a.rect = t.parentElement.getBoundingClientRect(),
                    a.scrollLeft = t.parentElement.scrollLeft,
                    a.scrollTop = t.parentElement.scrollTop) : (a.rect = i,
                    a.scrollLeft = 0,
                    a.scrollTop = 0),
                    a.dragging = !0,
                    a.button = r.getButton(e),
                    a.startX = r.getX(e),
                    a.startY = r.getY(e),
                    a.send(e, "start");
                var s, u = e,
                    l = function(t) {
                      u = t,
                          t.preventDefault(),
                          a.send(t, "drag")
                    },
                    c = function(t) {
                      r.getButton(t) === a.button && (r.isTouch(t) || (u = t),
                          s())
                    };
                s = function() {
                  a.send(u, "end"),
                      window.removeEventListener(n, l),
                      window.removeEventListener(o, c),
                      window.removeEventListener("blur", s),
                      a.dragging = !1
                },
                    window.addEventListener(n, l),
                    window.addEventListener(o, c),
                    window.addEventListener("blur", s),
                    e.stopPropagation(),
                a.prevent && e.preventDefault()
              }
            })
          },
              t.prototype.send = function(t, e) {
                if (this.drag) {
                  var n = r.getX(t),
                      i = r.getY(t);
                  this.drag({
                    $event: {
                      event: t,
                      type: e,
                      x: n - this.rect.left + this.scrollLeft,
                      y: i - this.rect.top + this.scrollTop,
                      dx: n - this.startX,
                      dy: i - this.startY
                    }
                  })
                }
              },
              t
        }();
    return e.AgDrag = o,
        Object.defineProperty(e, "__esModule", {
          value: !0
        }),
        e.default = ["$parse", "applyCallback", function(t, e) {
          return {
            restrict: "A",
            compile: function(n, r) {
              var i = t(r.agDrag);
              return function(t, n) {
                var a = new o(n[0]);
                a.drag = function(n) {
                  return e(function() {
                    i(t, n)
                  })
                },
                    a.relative = r.agDragRelative,
                    a.prevent = "true" === r.agDragPrevent
              }
            }
          }
        }],
        n.exports
  });
  System.registerDynamic("32", [], !0, function(t, e, n) {
    return n.exports = '<div ng-class="{ disabled: vm.isDisabled }" class="color-picker"><div ng-style="{ background: vm.bg }" class="color-picker-box"></div><div class="input-group"><input type="text" ng-focus="vm.focus($event)" ng-blur="vm.close()" ng-model="vm.inputColor" ng-disabled="vm.isDisabled" spellcheck="false" ng-change="vm.inputChanged()" class="form-control color-picker-input"><div ng-class="{ open: vm.isOpen }" class="input-group-btn"><button ng-mousedown="vm.toggleOpen()" ng-disabled="vm.isDisabled" class="btn btn-default dropdown-toggle"><span class="caret"></span></button><div uib-dropdown-menu ng-mousedown="vm.stopEvent($event)" class="dropdown-menu dropdown-menu-right color-picker-menu"><div class="color-picker-content"><div ag-drag="vm.dragSV($event)" ag-drag-relative="self" ag-drag-prevent="true" class="color-picker-sv"><div ng-style="{ background: vm.hue }" class="color-picker-sv-bg"><div class="color-picker-sv-overlay-white"><div class="color-picker-sv-overlay-black"></div></div></div><div ng-style="{ left: vm.svLeft + \'%\', top: vm.svTop + \'%\' }" class="color-wheel-circle-sv"><div></div></div></div><div ag-drag="vm.dragHue($event)" ag-drag-relative="self" ag-drag-prevent="true" class="color-picker-hue"><div ng-style="{ top: vm.hueTop + \'%\' }" class="color-wheel-circle-hue"><div></div></div></div></div></div></div></div></div>',
        n.exports
  });
  System.registerDynamic("33", ["21", "26", "32"], !0, function(t, e, n) {
    "use strict";
    var r = t("21"),
        i = t("26"),
        o = 175,
        a = function() {
          function t(t, e) {
            var n = this;
            this.$timeout = t,
                this.$document = e,
                this.s = 0,
                this.v = 0,
                this.h = 0,
                this.lastColor = "",
                this.closeHandler = function() {
                  return n.close()
                }
          }

          return Object.defineProperty(t.prototype, "inputColor", {
            get: function() {
              return this.isDisabled && this.disabledColor ? this.disabledColor : this.color
            },
            set: function(t) {
              this.isDisabled || (this.color = t)
            },
            enumerable: !0,
            configurable: !0
          }),
              Object.defineProperty(t.prototype, "bg", {
                get: function() {
                  return i.default.parseWithAlpha(this.inputColor, 1).css()
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "svLeft", {
                get: function() {
                  return this.updateHsv(),
                  100 * this.s
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "svTop", {
                get: function() {
                  return this.updateHsv(),
                  100 * (1 - this.v)
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "hueTop", {
                get: function() {
                  return this.updateHsv(),
                  100 * this.h / 360
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "hue", {
                get: function() {
                  return this.updateHsv(),
                      i.default.fromHsva(this.h, 1, 1, 1).css()
                },
                enumerable: !0,
                configurable: !0
              }),
              t.prototype.focus = function(t) {
                this.isOpen = !0,
                    t.target.select()
              },
              t.prototype.dragSV = function(t) {
                var e = t.event,
                    n = t.x,
                    i = t.y;
                e.preventDefault(),
                    this.updateHsv(),
                    this.s = r.clamp(n / o, 0, 1),
                    this.v = 1 - r.clamp(i / o, 0, 1),
                    this.updateColor()
              },
              t.prototype.dragHue = function(t) {
                var e = t.event,
                    n = t.y;
                e.preventDefault(),
                    this.updateHsv(),
                    this.h = r.clamp(360 * n / o, 0, 360),
                    this.updateColor()
              },
              t.prototype.updateHsv = function() {
                if (this.lastColor !== this.color) {
                  var t = i.default.parseWithAlpha(this.color, 1).hsva(this.h),
                      e = t.h,
                      n = t.s,
                      r = t.v;
                  this.h = e,
                      this.s = n,
                      this.v = r,
                      this.lastColor = this.color
                }
              },
              t.prototype.updateColor = function() {
                var t = this,
                    e = i.default.fromHsva(this.h, this.s, this.v, 1).css(),
                    n = this.color !== e;
                this.lastColor = this.color = e,
                n && this.$timeout(function() {
                  t.changed && t.changed({
                    $value: e
                  })
                })
              },
              t.prototype.inputChanged = function() {
                var t = this;
                this.$timeout(function() {
                  t.changed && t.changed({
                    $value: t.color
                  })
                })
              },
              t.prototype.stopEvent = function(t) {
                t.stopPropagation(),
                    t.preventDefault()
              },
              t.prototype.open = function() {
                var t = this;
                this.isOpen || this.$timeout(function() {
                  t.isOpen = !0,
                      t.$document.bind("mousedown", t.closeHandler),
                      t.$document.bind("touchstart", t.closeHandler)
                })
              },
              t.prototype.close = function() {
                var t = this;
                this.isOpen && (this.$timeout(function() {
                  return t.isOpen = !1
                }),
                    this.$document.unbind("mousedown", this.closeHandler),
                    this.$document.unbind("touchstart", this.closeHandler))
              },
              t.prototype.toggleOpen = function() {
                this.isOpen ? this.close() : this.open()
              },
              t.$inject = ["$timeout", "$document"],
              t
        }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          bindings: {
            color: "=",
            isDisabled: "<",
            disabledColor: "<",
            changed: "&"
          },
          controller: a,
          controllerAs: "vm",
          template: t("32")
        },
        n.exports
  });
  System.registerDynamic("34", [], !0, function(t, e, n) {
    "use strict";
    var r = function() {
      function t() {}

      return t.prototype.toggle = function() {
        this.disabled || (this.checked = !this.checked,
        this.changed && this.changed({
          $value: this.checked
        }))
      },
          t
    }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          bindings: {
            checked: "=",
            disabled: "<",
            icon: "@",
            changed: "&"
          },
          controller: r,
          controllerAs: "vm",
          template: '\n\t\t<div class="check-box" ng-class="{ disabled: vm.disabled }" ng-click="vm.toggle()">\n\t\t\t<i class="fa fa-fw fa-lg" ng-if="vm.checked" ng-class="vm.icon || \'fa-check\'"></i>\n\t\t</div>\n\t'
        },
        n.exports
  });
  System.registerDynamic("35", [], !0, function(t, e, n) {
    return n.exports = '<div class="row form-group"><div class="col-sm-4"><check-box ng-if="vm.hasLock &amp;&amp; !vm.nonLockable" checked="vm.locked" icon="fa-lock" changed="vm.lockChanged($value)" title="Automatic color" class="lock-box"></check-box><label class="control-label text-muted">{{vm.label || \'Color\'}}</label></div><div class="col-sm-8"><color-picker color="vm.fill" is-disabled="vm.locked" changed="vm.fillChanged($value)"></color-picker></div></div><div ng-if="!vm.outlineHidden" class="row form-group"><div class="col-sm-4"><check-box checked="vm.outlineLocked" icon="fa-lock" changed="vm.outlineLockChanged($value)" title="Automatic outline" class="lock-box"></check-box><label class="control-label text-muted">Outline</label></div><div class="col-sm-8"><color-picker color="vm.outline" is-disabled="vm.outlineLocked"></color-picker></div></div>',
        n.exports
  });
  System.registerDynamic("36", ["37", "35"], !0, function(t, e, n) {
    "use strict";
    var r = t("37"),
        i = function() {
          function t() {}

          return t.prototype.fillChanged = function(t) {
            this.outlineLocked && (this.outline = r.fillToOutline(t))
          },
              t.prototype.lockChanged = function(t) {
                t && (this.fill = this.base,
                    this.outlineLockChanged(this.outlineLocked))
              },
              t.prototype.outlineLockChanged = function(t) {
                t && (this.outline = r.fillToOutline(this.fill))
              },
              t.prototype.$onChanges = function(t) {
                this.locked && t.base && (this.fill = t.base.currentValue,
                    this.outlineLockChanged(this.outlineLocked))
              },
              t
        }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          bindings: {
            label: "@",
            base: "<",
            fill: "=",
            locked: "=",
            hasLock: "@locked",
            nonLockable: "<",
            outline: "=",
            outlineLocked: "=",
            outlineHidden: "<"
          },
          controller: i,
          controllerAs: "vm",
          template: t("35")
        },
        n.exports
  });
  System.registerDynamic("38", ["21", "26", "30", "39"], !0, function(t, e, n) {
    "use strict";

    function r(t, e) {
      if (e && 0 !== e.w && 0 !== e.h)
        if (0 === t.w || 0 === t.h)
          t.x = e.ox,
              t.y = e.oy,
              t.w = e.w,
              t.h = e.h;
        else {
          var n = Math.min(t.x, e.ox),
              r = Math.min(t.y, e.oy);
          t.w = Math.max(t.x + t.w, e.ox + e.w) - n,
              t.h = Math.max(t.y + t.h, e.oy + e.h) - r,
              t.x = n,
              t.y = r
        }
    }

    function i(t, e) {
      r(t, e.color),
          r(t, e.extra)
    }

    function o(t, e, n, r, i, o, a) {
      var s = Math.round((o - i.w) / 2 - i.x),
          u = Math.round((a - i.h) / 2 - i.y);
      t.drawSprite(e.color, null, n, s, u),
          t.drawSprite(e.extra, null, r, s, u)
    }

    var a, s = t("21"),
        u = t("26"),
        l = t("30"),
        c = t("39"),
        f = 52,
        p = 2,
        h = function() {
          function t(t, e) {
            var n = this;
            this.$element = e,
                t.$watch("vm.sprite", function() {
                  return n.redraw()
                }),
                t.$watch("vm.circle", function() {
                  return n.redraw()
                });
            for (var r = 0; r < 6; r++)
              t.$watch("vm.fill[" + r + "]", function() {
                return n.redraw()
              }),
                  t.$watch("vm.outline[" + r + "]", function() {
                    return n.redraw()
                  })
          }

          return t.prototype.redraw = function() {
            var t = this;
            clearTimeout(this.timeout),
                this.timeout = setTimeout(function() {
                  var e = t.$element[0].firstChild;
                  e.width === f && e.height === f || (e.width = f,
                      e.height = f);
                  var n = e.getContext("2d");
                  n.save(),
                      n.clearRect(0, 0, e.width, e.height);
                  var r = t.sprite;
                  if (r) {
                    t.circle && (n.fillStyle = u.default.parse(t.circle).css(),
                        n.beginPath(),
                        n.arc(e.width / 2, e.height / 2, e.width / 3, 0, 2 * Math.PI),
                        n.fill());
                    var h = {
                          x: 0,
                          y: 0,
                          w: 0,
                          h: 0
                        },
                        d = f / p,
                        m = a || (a = s.createCanvas(d, d)),
                        g = new c.ContextSpriteBatch(m);
                    g.clear(),
                        g.start();
                    var v = Array.isArray(t.fill) ? t.fill : [t.fill],
                        y = Array.isArray(t.outline) ? t.outline : [t.outline],
                        b = l.toColorList(l.getColors(v, y)),
                        _ = l.mockPaletteManager.add(b),
                        w = r.palette ? l.mockPaletteManager.add(r.palette) : null;
                    i(h, r),
                        o(g, r, _, w, h, d, d),
                        g.end(),
                        s.disableImageSmoothing(n),
                        n.scale(p, p),
                        n.drawImage(m, 0, 0)
                  }
                  n.restore()
                })
          },
              t.prototype.$onInit = function() {
                this.redraw()
              },
              t.prototype.$onChanges = function() {
                this.redraw()
              },
              t.$inject = ["$scope", "$element"],
              t
        }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          bindings: {
            sprite: "<",
            fill: "<",
            outline: "<",
            circle: "<"
          },
          controller: h,
          controllerAs: "vm",
          template: '<canvas class="pixelart"></canvas><i ng-if="!vm.sprite" class="fa fa-fw fa-times"></i>'
        },
        n.exports
  });
  System.registerDynamic("3a", [], !0, function(t, e, n) {
    return n.exports = '<div class="selection-list"><div class="selection-list-content"><sprite-box ng-repeat="i in vm.sprites track by $index" ng-class="{ active: vm.selected === $index }" ng-click="vm.selected = $index" sprite="i" fill="vm.fill" outline="vm.outline" circle="vm.circle" class="selection-item"></sprite-box></div></div>',
        n.exports
  });
  System.registerDynamic("3b", ["3a"], !0, function(t, e, n) {
    "use strict";
    var r = function() {
      function t() {}

      return t
    }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          bindings: {
            selected: "=",
            sprites: "<",
            fill: "<",
            outline: "<",
            circle: "<"
          },
          controller: r,
          controllerAs: "vm",
          template: t("3a")
        },
        n.exports
  });
  System.registerDynamic("3c", [], !0, function(t, e, n) {
    return n.exports = '<div ng-if="vm.compact"><div class="row form-group"><div class="col-sm-4"><label class="control-label">{{vm.label}}</label></div><div class="col-sm-8"><sprite-selection selected="vm.set.type" sprites="vm.sprites" fill="vm.set.fills" outline="vm.set.outlines"></sprite-selection></div></div></div><div ng-if="!vm.compact"><div class="row form-group"><div class="col-sm-12 text-center"><label class="control-label text-muted">{{vm.label}}</label></div></div><div class="row form-group"><div class="col-sm-12"><sprite-selection selected="vm.set.type" sprites="vm.sprites" fill="vm.set.fills" outline="vm.set.outlines"></sprite-selection></div></div></div><div ng-if="vm.set.type &amp;&amp; vm.sets[vm.set.type].length &gt; 1"><div class="row form-group"><div class="col-sm-12 text-center"><label class="control-label text-muted">Color pattern</label></div></div><div class="row form-group"><div class="col-sm-12"><sprite-selection selected="vm.set.pattern" sprites="vm.sets[vm.set.type]" fill="vm.exampleFills" outline="vm.exampleOutlines"></sprite-selection></div></div></div><fill-outline ng-repeat="c in vm.set.fills track by $index" ng-if="vm.patternColors &gt; $index" label="Color {{$index + 1}}" base="vm.base" outline-hidden="vm.outlineHidden" fill="vm.set.fills[$index]" locked="vm.set.lockFills[$index]" non-lockable="$index === 0 &amp;&amp; vm.nonLockable" outline="vm.set.outlines[$index]" outline-locked="vm.set.lockOutlines[$index]"></fill-outline>',
        n.exports
  });
  System.registerDynamic("3d", ["3c"], !0, function(t, e, n) {
    "use strict";
    var r = function() {
      function t() {
        this.exampleFills = ["Orange", "DodgerBlue", "LimeGreen", "Orchid", "crimson", "Aquamarine"],
            this.exampleOutlines = ["Chocolate", "SteelBlue", "ForestGreen", "DarkOrchid", "darkred", "DarkTurquoise"]
      }

      return Object.defineProperty(t.prototype, "patternColors", {
        get: function() {
          var t = this.set && this.sets && this.sets[this.set.type] && this.sets[this.set.type][this.set.pattern];
          return t && !t.colors ? 0 : t ? Math.floor((t.colors - 1) / 2) : this.nonLockable ? 1 : 0
        },
        enumerable: !0,
        configurable: !0
      }),
          t.prototype.$onChanges = function() {
            this.sprites = this.sets ? this.sets.map(function(t) {
              return t ? t[0] : null
            }) : null
          },
          t
    }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          bindings: {
            label: "@",
            base: "<",
            set: "<",
            sets: "<",
            outlineHidden: "<",
            nonLockable: "<",
            compact: "<"
          },
          controller: r,
          controllerAs: "vm",
          template: t("3c")
        },
        n.exports
  });
  System.registerDynamic("3e", ["26"], !0, function(t, e, n) {
    "use strict";
    var r = t("26"),
        i = function() {
          function t() {}

          return t.prototype.$onChanges = function(t) {
            if (t.width || t.height) {
              this.rows = [];
              for (var e = 0; e < this.height; e++) {
                this.rows[e] = [];
                for (var n = 0; n < this.width; n++)
                  this.rows[e][n] = n + this.width * e
              }
            }
          },
              t.prototype.draw = function(t) {
                this.bitmap && ("eraser" === this.tool ? this.bitmap[t] = "" : "brush" === this.tool ? this.bitmap[t] = r.default.parse(this.bitmap[t]).equal(r.default.parse(this.color)) ? "" : this.color : "eyedropper" === this.tool && (this.color = this.bitmap[t]))
              },
              t.prototype.colorAt = function(t) {
                return this.bitmap[t] ? r.default.parse(this.bitmap[t]).css() : ""
              },
              t
        }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          bindings: {
            tool: "=",
            color: "=",
            bitmap: "<",
            width: "<",
            height: "<"
          },
          controller: i,
          controllerAs: "vm",
          template: '<div class="bitmap-box">\n\t\t<div class="bitmap-box-row clearfix" ng-repeat="row in vm.rows">\n\t\t\t<div class="bitmap-box-cell" ng-repeat="cell in row" ng-style="{ background: vm.colorAt(cell) }" ng-mousedown="vm.draw(cell)"></div>\n\t\t</div>\n\t</div>'
        },
        n.exports
  });
  System.registerDynamic("3f", ["21", "30", "26", "40", "41", "42", "39"], !0, function(t, e, n) {
    "use strict";
    var r = t("21"),
        i = t("30"),
        o = t("26"),
        a = t("40"),
        s = t("41"),
        u = t("42"),
        l = t("39"),
        c = o.default.parse("LightGreen"),
        f = function() {
          function t(t) {
            this.$element = t,
                this.scale = 3
          }

          return t.prototype.$onInit = function() {
            var t = this;
            return this.canvas = this.$element[0].querySelector("canvas"),
                this.interval = setInterval(function() {
                  return t.draw()
                }, 1e3 / 24),
                u.loadSpriteSheets()
          },
              t.prototype.$onDestroy = function() {
                clearInterval(this.interval)
              },
              t.prototype.draw = function() {
                var t = this.scale * r.getPixelRatio();
                a.resizeCanvasToElementSize(this.canvas);
                var e = Math.round(this.canvas.width / t),
                    n = Math.round(this.canvas.height / t);
                this.buffer || (this.buffer = r.createCanvas(e, n),
                    this.batch = new l.ContextSpriteBatch(this.buffer)),
                    a.resizeCanvas(this.buffer, e, n);
                var o = Math.round(e / 2),
                    u = Math.round(n / 2 + 28);
                if (this.pony) {
                  var f = i.toPalette(this.pony);
                  this.batch.clear(this.noBackground ? null : c),
                      this.batch.start(),
                      s.drawPonyGL2(this.batch, f, this.state || s.createDefaultPonyState(), o, u, {
                        shadow: !this.noShadow
                      }),
                      this.batch.end()
                }
                var p = this.canvas.getContext("2d");
                if (this.noBackground && p.clearRect(0, 0, this.canvas.width, this.canvas.height),
                        p.save(),
                        r.disableImageSmoothing(p),
                        p.scale(t, t),
                    this.pony && this.noShadow && this.noBackground) {
                  for (var h = -1; h <= 1; h++)
                    for (var d = -1; d <= 1; d++)
                      p.drawImage(this.buffer, h, d);
                  p.globalCompositeOperation = "source-in",
                      p.fillStyle = c.css(),
                      p.fillRect(0, 0, p.canvas.width, p.canvas.height),
                      p.globalCompositeOperation = "source-over"
                }
                p.drawImage(this.buffer, 0, 0),
                    p.restore()
              },
              t.$inject = ["$element"],
              t
        }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          controller: f,
          controllerAs: "vm",
          bindings: {
            pony: "<",
            state: "<",
            noBackground: "<",
            noShadow: "<"
          },
          template: '<canvas class="character-preview"></canvas>'
        },
        n.exports
  });
  System.registerDynamic("43", [], !0, function(t, e, n) {
    return n.exports = '<div class="chat-box"><i ng-click="vm.toggle()" class="fa fa-fw fa-comment chat-open-button game-button"></i><div ng-show="vm.isOpen" class="chat-input-box"><input ng-model="vm.message" ng-keydown="vm.keydown($event)" maxlength="{{::vm.maxSayLength}}" class="chat-input"><i ng-click="vm.send()" class="fa fa-fw fa-angle-double-right chat-send-button game-button"></i></div></div>',
        n.exports
  });
  System.registerDynamic("44", ["20", "2b", "43"], !0, function(t, e, n) {
    "use strict";
    var r = t("20"),
        i = t("2b"),
        o = t("43"),
        a = i.default.game,
        s = function() {
          function t(t, e) {
            var n = this;
            this.maxSayLength = r.SAY_MAX_LENGTH,
                this.isOpen = !1,
                this.input = e[0].querySelector(".chat-input"),
                a.onChat = function() {
                  return t(function() {
                    return n.chat()
                  })
                },
                a.onCommand = function() {
                  return t(function() {
                    return n.command()
                  })
                },
                a.onCancel = function() {
                  return !!n.isOpen && !!t(function() {
                        return n.close()
                      })
                }
          }

          return t.prototype.send = function() {
            var t = (this.message || "").trim();
            this.close(),
            a.player && t && a.socket.server.say(t)
          },
              t.prototype.keydown = function(t) {
                13 === t.keyCode ? this.send() : 27 === t.keyCode && this.close()
              },
              t.prototype.chat = function() {
                this.isOpen ? this.send() : this.open()
              },
              t.prototype.command = function() {
                this.isOpen || (this.chat(),
                    this.message = "/",
                    this.input.selectionStart = this.input.selectionEnd = 1e4)
              },
              t.prototype.open = function() {
                var t = this;
                this.isOpen || (this.isOpen = !0,
                    setTimeout(function() {
                      return t.input.focus()
                    }))
              },
              t.prototype.close = function() {
                this.isOpen && (this.input.blur(),
                    this.isOpen = !1,
                    this.message = null)
              },
              t.prototype.toggle = function() {
                this.isOpen ? this.close() : this.open()
              },
              t.$inject = ["$timeout", "$element"],
              t
        }();
    return e.ChatBox = s,
        Object.defineProperty(e, "__esModule", {
          value: !0
        }),
        e.default = {
          controller: s,
          controllerAs: "vm",
          template: o
        },
        n.exports
  });
  System.registerDynamic("45", [], !0, function(t, e, n) {
    return n.exports = '<div uib-dropdown is-open="vm.dropdownOpen" class="settings-box"><span id="clock" class="settings-clock">00:00</span><i uib-dropdown-toggle class="fa fa-fw fa-gear game-button"></i><ul uib-dropdown-menu ng-if="vm.dropdownOpen" class="dropdown-menu pull-right settings-box-menu"><li class="dropdown-header">{{vm.server}}</li><li ng-mouseup="$event.stopPropagation(); $event.preventDefault();" ng-click="$event.stopPropagation(); $event.preventDefault();"><a ng-click="vm.changeScale()"><i class="fa fa-fw fa-search"></i> Change scale (x{{vm.scale}})</a></li><li class="divider"></li><li><a ng-click="vm.leave()"><i class="fa fa-fw fa-sign-out"></i> Leave</a></li></ul></div>',
        n.exports
  });
  System.registerDynamic("46", ["2b", "45"], !0, function(t, e, n) {
    "use strict";
    var r = t("2b"),
        i = r.default.game,
        o = function() {
          function t(t, e) {
            var n = this;
            this.$timeout = t,
                this.gameService = e,
                this.touchstart = function() {
                  n.dropdownOpen && n.$timeout(function() {
                    return n.dropdownOpen = !1
                  })
                }
          }

          return Object.defineProperty(t.prototype, "scale", {
            get: function() {
              return i.scale
            },
            enumerable: !0,
            configurable: !0
          }),
              Object.defineProperty(t.prototype, "server", {
                get: function() {
                  return this.gameService.server.name
                },
                enumerable: !0,
                configurable: !0
              }),
              t.prototype.$onInit = function() {
                document.getElementById("canvas").addEventListener("touchstart", this.touchstart)
              },
              t.prototype.$onDestroy = function() {
                document.getElementById("canvas").removeEventListener("touchstart", this.touchstart)
              },
              t.prototype.leave = function() {
                this.gameService.leave()
              },
              t.prototype.changeScale = function() {
                i.changeScale()
              },
              t.$inject = ["$timeout", "gameService"],
              t
        }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          controller: o,
          controllerAs: "vm",
          template: t("45")
        },
        n.exports
  });
  System.registerDynamic("47", [], !0, function(t, e, n) {
    return n.exports = '<li ng-if="vm.model.account" uib-dropdown><a uib-dropdown-toggle class="cursor-pointer">{{vm.model.account.name}} <span class="caret"></span></a><ul uib-dropdown-menu><li><a href="/account">Account settings</a></li><li><a href="/auth/sign-out" target="_self" class="cursor-pointer">Sign out</a></li></ul></li>',
        n.exports
  });
  System.registerDynamic("48", ["47"], !0, function(t, e, n) {
    "use strict";
    var r = function() {
      function t(t, e) {
        this.model = e,
            t.addClass("account-button")
      }

      return t.$inject = ["$element", "model"],
          t
    }();
    return e.AccountButton = r,
        Object.defineProperty(e, "__esModule", {
          value: !0
        }),
        e.default = {
          controller: r,
          controllerAs: "vm",
          template: t("47")
        },
        n.exports
  });
  System.registerDynamic("49", [], !0, function(t, e, n) {
    return n.exports = '<nav class="navbar navbar-inverse"><div class="navbar-header navbar-main"><button ng-click="vm.menuExpanded = !vm.menuExpanded" class="navbar-toggle collapsed"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a ng-if="vm.logo &amp;&amp; !vm.isActive(\'/\')" href="/" class="pixelart main-logo-small hidden-xs"><img src="/images/logo-small.png" width="287" height="65"></a></div><div uib-collapse="!vm.menuExpanded" class="collapse navbar-collapse"><div ng-if="vm.model.loading" style="font-size: 20px; padding: 10px 20px;" class="navbar-right text-muted"><i class="fa fa-fw fa-spin fa-spinner"></i></div><form ng-if="!vm.model.loading &amp;&amp; !vm.model.account" class="navbar-form navbar-right"><div uib-dropdown class="button-group"><button uib-dropdown-toggle class="btn btn-default">Sign in <span class="caret"></span></button><ul uib-dropdown-menu><li ng-repeat="p in vm.providers"><a ng-href="{{p.url}}" target="_self"><i ng-class="p.icon" class="fa fa-fw"></i> {{p.name}}</a></li></ul></div></form><ul class="nav navbar-nav navbar-right"><ng-transclude></ng-transclude><li ng-repeat="i in vm.items" ng-class="{ active: vm.isActive(i.href) }" class="navbar-link"><a ng-href="{{i.href}}">{{i.name}}</a></li><li ng-if="vm.model.account" uib-dropdown><a uib-dropdown-toggle class="cursor-pointer">{{vm.model.account.name}} <span class="caret"></span></a><ul uib-dropdown-menu><li><a href="/account">Account settings</a></li><li><a href="/auth/sign-out" target="_self" class="cursor-pointer">Sign out</a></li></ul></li></ul></div></nav>',
        n.exports
  });
  System.registerDynamic("4a", ["1f", "49"], !0, function(t, e, n) {
    "use strict";
    var r = t("1f"),
        i = function() {
          function t(t) {
            this.$location = t,
                this.items = [],
                this.providers = r.oauthProviders.filter(function(t) {
                  return !t.disabled
                })
          }

          return t.prototype.isActive = function(t) {
            return t === this.$location.absUrl().substr(8).replace(/^[^\/]+/, "")
          },
              t.$inject = ["$location"],
              t
        }(),
        o = function() {
          function t() {}

          return t.prototype.$onInit = function() {
            this.menuBar.items.push(this)
          },
              t.prototype.$onDestroy = function() {
                this.menuBar.items.splice(this.menuBar.items.indexOf(this), 1)
              },
              t
        }();
    return e.menuBar = {
      transclude: !0,
      bindings: {
        logo: "<",
        model: "<"
      },
      controller: i,
      controllerAs: "vm",
      template: t("49")
    },
        e.menuItem = {
          require: {
            menuBar: "^menuBar"
          },
          bindings: {
            href: "@",
            name: "@"
          },
          controller: o,
          controllerAs: "vm"
        },
        n.exports
  });
  System.registerDynamic("4b", [], !0, function(t, e, n) {
    return n.exports = '<div class="sign-in-box center-block"><div class="text-center"><p class="lead">Sign in with your social site account</p><div class="sign-in-box-providers"><a ng-repeat="p in vm.providers" ng-href="{{p.url}}" target="_self" title="{{p.name}}" ng-style="{ borderBottomColor: p.disabled ? \'#666\' : p.color }" ng-class="{ disabled: p.disabled }" class="btn btn-lg btn-provider"><i ng-class="p.icon" class="fa fa-fw fa-lg"></i></a></div></div></div>',
        n.exports
  });
  System.registerDynamic("4c", ["1f", "4b"], !0, function(t, e, n) {
    "use strict";
    var r = t("1f"),
        i = function() {
          function t() {
            this.providers = r.oauthProviders
          }

          return t
        }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          controller: i,
          controllerAs: "vm",
          template: t("4b")
        },
        n.exports
  });
  System.registerDynamic("4d", [], !0, function(t, e, n) {
    return n.exports = '<div class="play-box"><div uib-dropdown class="form-group btn-group dropdown"><button ng-if="!vm.joining" ng-click="vm.play()" ng-disabled="!vm.canPlay" type="button" class="btn btn-lg btn-success play-box-btn"><span ng-if="vm.server"><strong>{{vm.label || \'Play\'}}</strong> on<span> {{vm.server.name}}</span></span><span ng-if="!vm.server" class="text-faded">select server to play</span></button><button ng-if="vm.joining" ng-click="vm.cancel()" type="button" class="btn btn-lg btn-success play-box-btn"><i class="fa fa-spinner fa-spin"></i> Cancel</button><button uib-dropdown-toggle class="btn btn-lg btn-success"><span class="caret"></span></button><ul uib-dropdown-menu style="width: 100%;" class="dropdown-menu"><li ng-repeat="s in vm.servers"><a ng-click="vm.server = s"><div ng-if="s.offline" class="pull-right text-unsafe">offline</div><div ng-if="!s.offline" class="pull-right text-muted">online ({{s.online}})</div><strong>{{s.name}}</strong><div class="text-muted text-wrap">{{s.desc}}</div></a></li></ul></div><div ng-if="vm.server.offline" class="form-group"><div class="alert alert-info">Selected server is offline, try again later</div></div><div ng-if="vm.offline" class="form-group"><div class="alert alert-info">Server is offline, try again later</div></div><div ng-if="vm.invalidVersion &amp;&amp; !vm.offline" class="form-group"><div class="alert alert-info">Your client version is outdated, <a ng-click="vm.reload()" class="alert-link">reload</a> to be able to play.</div></div><div ng-if="vm.protectionError &amp;&amp; !vm.offline" class="form-group"><div class="alert alert-info">DDOS protection error, <a ng-click="vm.reload()" class="alert-link">reload</a> to continue.</div></div><div ng-if="vm.error" class="form-group"><div class="alert alert-danger">{{vm.error}}</div></div><div ng-if="vm.server" class="form-group text-left"><h4>Server rules</h4><p class="text-muted">{{vm.server.desc}}</p></div></div>',
        n.exports
  });
  System.registerDynamic("4e", ["1f", "4d"], !0, function(t, e, n) {
    "use strict";
    var r = t("1f"),
        i = t("4d"),
        o = function() {
          function t(t, e) {
            this.gameService = t,
                this.model = e
          }

          return Object.defineProperty(t.prototype, "error", {
            get: function() {
              return this.gameService.error
            },
            set: function(t) {
              this.gameService && (this.gameService.error = t)
            },
            enumerable: !0,
            configurable: !0
          }),
              Object.defineProperty(t.prototype, "server", {
                get: function() {
                  return this.gameService.server
                },
                set: function(t) {
                  this.gameService.server = t
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "servers", {
                get: function() {
                  return this.gameService.servers
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "offline", {
                get: function() {
                  return this.gameService.offline
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "invalidVersion", {
                get: function() {
                  return this.gameService.version && this.gameService.version !== r.version
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "protectionError", {
                get: function() {
                  return this.gameService.protectionError
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "joining", {
                get: function() {
                  return this.gameService.joining
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "canPlay", {
                get: function() {
                  return this.server && this.gameService.canPlay
                },
                enumerable: !0,
                configurable: !0
              }),
              t.prototype.play = function() {
                var t = this;
                this.canPlay && (this.gameService.error = null,
                    this.model.savePony(this.model.pony).then(function(e) {
                      return t.gameService.join(e.id)
                    }).catch(function(e) {
                      return t.gameService.error = e
                    }))
              },
              t.prototype.cancel = function() {
                this.gameService.leave()
              },
              t.prototype.reload = function() {
                location.reload(!0)
              },
              t.$inject = ["gameService", "model"],
              t
        }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          bindings: {
            label: "@",
            error: "=?"
          },
          controller: o,
          controllerAs: "vm",
          template: i
        },
        n.exports
  }),
      (function () {
        var i = System.amdDefine;
        !function (t, e) {
          "object" == typeof n && "undefined" != typeof r ? r.exports = e() : "function" == typeof i && i.amd ? i("4f", [], e) : t.moment = e()
        }(this, libraries.momentJS)
      })();
  (function () {
    var e = System.amdDefine;
    e("50", ["4f"], function (t) {
      return t
    })
  })();
  System.registerDynamic("51", [], !0, function(t, e, n) {
    "use strict";
    ! function(t) {
      t[t.None = 0] = "None",
          t[t.Ignore = 1] = "Ignore",
          t[t.Unignore = 2] = "Unignore"
    }(e.PlayerAction || (e.PlayerAction = {}));
    e.PlayerAction;
    ! function(t) {
      t[t.None = 0] = "None",
          t[t.Report = 1] = "Report",
          t[t.Mute = 2] = "Mute",
          t[t.Unmute = 3] = "Unmute",
          t[t.Shadow = 4] = "Shadow",
          t[t.Unshadow = 5] = "Unshadow",
          t[t.Timeout = 6] = "Timeout"
    }(e.ModAction || (e.ModAction = {}));
    e.ModAction;
    return n.exports
  });
  System.registerDynamic("29", [getCodeName("gl-matrix"), "21", "20", "41", "30", "26", "55"], !0, function(t, e, n) {
    "use strict";
    var r = t(getCodeName("gl-matrix")),
        i = t("21"),
        o = t("20"),
        a = t("41"),
        s = t("30"),
        u = t("26"),
        l = t("55"),
        c = r.mat2d.create(),
        f = r.vec2.create(),
        p = (u.default.parse("6fc4cf"),
            function() {
              function t(t, e, n, r, o) {
                this.id = t,
                    this.site = r,
                    this.type = "pony",
                    this.x = 0,
                    this.y = 0,
                    this.vx = 0,
                    this.vy = 0,
                    this.canCollide = !0,
                    this.collisions = !0,
                    this.collider = {
                      x: -.4,
                      y: -.2,
                      w: .8,
                      h: .4
                    },
                    this.interactive = !0,
                    this.selected = !1,
                    this.right = !1,
                    this.walking = !1,
                    this.nextBlink = 0,
                    this.time = 5 * Math.random(),
                    this.state = a.createDefaultPonyState();
                var u = a.PONY_WIDTH,
                    l = a.PONY_HEIGHT;
                this.bounds = {
                  x: -u / 2,
                  y: -l,
                  w: u,
                  h: l + 5
                },
                    this.interactBounds = {
                      x: -20,
                      y: -50,
                      w: 40,
                      h: 50
                    };
                var c = s.decompressPonyInfo(e);
                this.tag = c.tag,
                    this.pal = s.toPalette(c, o),
                    this.right = i.hasFlag(n, 1)
              }

              return t.prototype.update = function(t) {
                this.time += t,
                this.time - this.nextBlink > 1 && (this.nextBlink = this.time + 2 * Math.random() + 3),
                    this.walking = !(!this.vx && !this.vy),
                    this.right = i.isFacingRight(this.vx, this.right);
                var e = Math.floor((this.time - this.nextBlink) * o.frameTime);
                this.state.blinkFrame = a.BLINK_FRAMES[e] || 1,
                    this.state.animation = this.walking ? l.trot : l.stand,
                    this.state.animationFrame = Math.floor(this.time * o.frameTime) % this.state.animation.frames
              },
                  t.prototype.getTransform = function() {
                    return r.mat2d.identity(c),
                        r.mat2d.translate(c, c, r.vec2.set(f, Math.round(this.x * o.tileWidth), Math.round(this.y * o.tileHeight))),
                        r.mat2d.scale(c, c, r.vec2.set(f, this.right ? -1 : 1, 1)),
                        c
                  },
                  t.prototype.draw = function(t) {},
                  t.prototype.draw2 = function(t) {
                    t.transform = this.getTransform(),
                        a.drawPonyGL2(t, this.pal, this.state, 0, 0, {
                          flipped: this.right,
                          selected: this.selected,
                          shadow: !0
                        }),
                        t.transform = null
                  },
                  t.prototype.drawHead2 = function(t, e, n) {
                    a.drawPonyGL2(t, this.pal, {
                      animation: l.stand,
                      animationFrame: 0,
                      blinkFrame: 0
                    }, e, n, {
                      flipped: !0,
                      onlyHead: !0
                    })
                  },
                  t.prototype.release = function() {
                    s.releasePalettes(this.pal)
                  },
                  t
            }());
    return e.Pony = p,
        n.exports
  });
  System.registerDynamic("2a", [getCodeName("Lodash"), "20", "21", "22"], !0, function(t, e, n) {
    "use strict";

    function r(t, e) {
      if (!t.interactive)
        return !1;
      var n = t.interactBounds || t.bounds;
      return s.contains(t.x, t.y, n, e)
    }

    function i(t, e, n) {
      return (!n || "pony" !== t.type) && r(t, e)
    }

    var o = t(getCodeName("Lodash")),
        a = t("20"),
        s = t("21"),
        u = t("22"),
        l = function() {
          function t(t, e) {
            this.regionsX = t,
                this.regionsY = e,
                this.regions = [],
                this.minRegionX = 0,
                this.minRegionY = 0,
                this.maxRegionX = 0,
                this.maxRegionY = 0,
                this.updateMinMaxRegion()
          }

          return Object.defineProperty(t.prototype, "width", {
            get: function() {
              return this.regionsX * a.REGION_SIZE
            },
            enumerable: !0,
            configurable: !0
          }),
              Object.defineProperty(t.prototype, "height", {
                get: function() {
                  return this.regionsY * a.REGION_SIZE
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "entities", {
                get: function() {
                  return this.regions[0] ? this.regions[0].entities : []
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "entitiesDrawn", {
                get: function() {
                  var t = 0;
                  return this.forEachRegion(function(e) {
                    return t += e.entitiesDrawn
                  }),
                      t
                },
                enumerable: !0,
                configurable: !0
              }),
              t.prototype.findEntityById = function(t) {
                return this.findEntity(function(e) {
                  return e.id === t
                })
              },
              t.prototype.findClosestEntity = function(t, e) {
                var n, r = 0;
                return this.forEachEntity(function(i) {
                  if (!e || e(i)) {
                    var o = s.distance(i, t);
                    (o < r || !n) && (n = i,
                        r = o)
                  }
                }),
                    n
              },
              t.prototype.addEntity = function(t) {
                this.regions[0] && this.regions[0].entities.push(t)
              },
              t.prototype.removeEntity = function(t) {
                this.forEachRegion(function(e) {
                  var n = o.remove(e.entities, function(e) {
                    return e.id === t
                  })[0];
                  return !n || (n.release && n.release(), !1)
                })
              },
              t.prototype.pickEntity = function(t, e) {
                return this.findEntity(function(n) {
                  return i(n, t, e)
                })
              },
              t.prototype.pickEntities = function(t, e) {
                return this.findEntities(function(n) {
                  return i(n, t, e)
                }).reverse()
              },
              t.prototype.getTotalEntities = function(t) {
                var e = 0;
                return this.forEachRegion(function(n) {
                  return e += t ? n.entities.reduce(function(e, n) {
                    return e + (t(n) ? 1 : 0)
                  }, 0) : n.entities.length
                }),
                    e
              },
              t.prototype.findEntity = function(t) {
                var e = null;
                return this.forEachRegion(function(n) {
                  return !(e = n.entities.find(t))
                }),
                    e
              },
              t.prototype.findEntities = function(t) {
                var e = [];
                return this.forEachRegion(function(n) {
                  return e.push.apply(e, n.entities.filter(t))
                }),
                    e
              },
              t.prototype.updateMinMaxRegion = function() {
                this.minRegionX = this.regionsX,
                    this.minRegionY = this.regionsY,
                    this.maxRegionX = 0,
                    this.maxRegionY = 0;
                for (var t = 0; t < this.regionsY; t++)
                  for (var e = 0; e < this.regionsX; e++)
                    this.getRegion(e, t) && (this.minRegionX = Math.min(e, this.minRegionX),
                        this.minRegionY = Math.min(t, this.minRegionY),
                        this.maxRegionX = Math.max(e, this.maxRegionX),
                        this.maxRegionY = Math.max(t, this.maxRegionY))
              },
              t.prototype.setRegion = function(t, e, n) {
                t >= 0 && e >= 0 && t < this.regionsX && e < this.regionsY && (this.regions[t + e * this.regionsX] = null,
                    this.setDirty(t * a.REGION_SIZE - 1, e * a.REGION_SIZE - 1, a.REGION_SIZE + 2, a.REGION_SIZE + 2),
                    this.regions[t + e * this.regionsX] = n,
                    this.updateMinMaxRegion())
              },
              t.prototype.getRegion = function(t, e) {
                return t >= 0 && e >= 0 && t < this.regionsX && e < this.regionsY ? this.regions[t + e * this.regionsX] : null
              },
              t.prototype.getRegionGlobal = function(t, e) {
                var n = Math.floor(t / a.REGION_SIZE),
                    r = Math.floor(e / a.REGION_SIZE);
                return this.getRegion(n, r)
              },
              t.prototype.getTile = function(t, e) {
                var n = this.getRegionGlobal(t, e);
                return n ? n.getTile(t - n.x * a.REGION_SIZE, e - n.y * a.REGION_SIZE) : u.TileType.None
              },
              t.prototype.doRelativeToRegion = function(t, e, n) {
                var r = this.getRegionGlobal(t, e);
                if (r) {
                  var i = Math.floor(t - r.x * a.REGION_SIZE),
                      o = Math.floor(e - r.y * a.REGION_SIZE);
                  n(r, i, o)
                }
              },
              t.prototype.setTile = function(t, e, n) {
                this.doRelativeToRegion(t, e, function(t, e, r) {
                  return t.setTile(e, r, n)
                }),
                    this.setDirty(t - 1, e - 1, 3, 3)
              },
              t.prototype.setDirty = function(t, e, n, r) {
                for (var i = 0; i < r; i++)
                  for (var o = 0; o < n; o++)
                    this.doRelativeToRegion(o + t, i + e, function(t, e, n) {
                      return t.setDirty(e, n)
                    })
              },
              t.prototype.isCollision = function(t, e, n) {
                var r = this.getTile(e, n);
                if (!u.canWalk(r))
                  return !0;
                if (!t.collider)
                  return !1;
                var i = !1;
                return this.forEachEntity(function(r) {
                  return !(r !== t && r.canCollideWith && r.collider && s.collidersIntersect(e, n, t.collider, r.x, r.y, r.collider)) || (i = !0, !1)
                }),
                    i
              },
              t.prototype.update = function(t) {
                var e = this;
                this.forEachRegion(function(n) {
                  n.entities.forEach(function(n) {
                    if (n.update && n.update(t),
                        n.vx || n.vy)
                      if (n.canCollide) {
                        var r = n.x + n.vx * t,
                            i = n.y + n.vy * t;
                        e.isCollision(n, r, i) ? e.isCollision(n, n.x, i) ? e.isCollision(n, r, n.y) || (n.x = r) : n.y = i : (n.x = r,
                            n.y = i)
                      } else
                        n.x += n.vx * t,
                            n.y += n.vy * t;
                    if (n.set && n.set(),
                        n.says && (n.says.timer -= t,
                        n.says.timer < 0 && (n.says.timer = 0,
                            n.says = null)),
                            n.coverBounds) {
                      var o = n.coverLifting || 0;
                      n.coverLifted && o < 1 ? n.coverLifting = Math.min(o + 2 * t, 1) : !n.coverLifted && o > 0 && (n.coverLifting = Math.max(o - 2 * t, 0))
                    }
                  })
                })
              },
              t.prototype.drawTiles = function(t, e) {
                var n = this;
                this.forEachRegion(function(r) {
                  return r.drawTiles(t, e, n)
                })
              },
              t.prototype.drawEntities2 = function(t, e) {
                this.forEachRegion(function(n) {
                  return n.drawEntities2(t, e)
                })
              },
              t.prototype.forEachRegion = function(t) {
                for (var e = this.minRegionY; e <= this.maxRegionY; e++)
                  for (var n = this.minRegionX; n <= this.maxRegionX; n++) {
                    var r = this.getRegion(n, e);
                    if (r && t(r) === !1)
                      return
                  }
              },
              t.prototype.forEachEntity = function(t) {
                this.forEachRegion(function(e) {
                  return e.entities.forEach(t)
                })
              },
              t
        }();
    return e.Map = l,
        n.exports
  });
  System.registerDynamic("56", ["20", "21"], !0, function(t, e, n) {
    "use strict";
    var r = t("20"),
        i = t("21"),
        o = function() {
          function t() {
            this.x = 0,
                this.y = 0,
                this.w = 100,
                this.h = 100
          }

          return t.prototype.update = function(t, e) {
            var n = this.w,
                o = this.h,
                a = e.width * r.tileWidth,
                s = e.height * r.tileHeight,
                u = a - n,
                l = s - o,
                c = t.x * r.tileWidth,
                f = t.y * r.tileHeight,
                p = Math.floor(.3 * n),
                h = Math.floor(.3 * o),
                d = i.clamp(c - (p + (n - p) / 2), 0, u),
                m = i.clamp(c - (n - p) / 2, 0, u),
                g = i.clamp(f - (h + (o - h) / 2), 0, l),
                v = i.clamp(f - (o - h) / 2, 0, l);
            this.x = Math.floor(i.clamp(this.x, d, m)),
                this.y = Math.floor(i.clamp(this.y, g, v))
          },
              t.prototype.isVisible = function(t) {
                return this.isBoundVisible(t.bounds, t.x, t.y)
              },
              t.prototype.isBoundVisible = function(t, e, n) {
                return !t || this.isRectVisible(t.x + e * r.tileWidth, t.y + n * r.tileHeight, t.w, t.h)
              },
              t.prototype.isRectVisible = function(t, e, n, r) {
                return this.x <= t + n && this.x + this.w >= t && this.y <= e + r && this.y + this.h >= e
              },
              t.prototype.screenToCamera = function(t) {
                return t ? {
                  x: Math.round(t.x + this.x),
                  y: Math.round(t.y + this.y)
                } : null
              },
              t.prototype.screenToWorld = function(t) {
                return t ? {
                  x: (t.x + this.x) / r.tileWidth,
                  y: (t.y + this.y) / r.tileHeight
                } : null
              },
              t.prototype.worldToScreen = function(t) {
                return t ? {
                  x: Math.round(t.x * r.tileWidth - this.x),
                  y: Math.round(t.y * r.tileHeight - this.y)
                } : null
              },
              t
        }();
    return e.Camera = o,
        n.exports
  });
  System.registerDynamic("22", [], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      return t !== o.None
    }

    function i(t) {
      return t >= o.Dirt && t <= o.Grass
    }

    ! function(t) {
      t[t.None = 0] = "None",
          t[t.Dirt = 1] = "Dirt",
          t[t.Grass = 2] = "Grass"
    }(e.TileType || (e.TileType = {}));
    var o = e.TileType;
    e.TILE_COUNTS = [
      [0, 4],
      [2, 3],
      [4, 3],
      [6, 3],
      [8, 3],
      [13, 3],
      [14, 3],
      [47, 4]
    ],
        e.TILE_COUNT_MAP = [],
        e.TILE_MAP_MAP = [],
        e.TILE_COUNTS.forEach(function(t) {
          var n = t[0],
              r = t[1];
          return e.TILE_COUNT_MAP[n] = r
        });
    for (var a = 0, s = 0; s <= 47; s++)
      e.TILE_MAP_MAP[s] = a,
          a += e.TILE_COUNT_MAP[s] || 1;
    return e.canWalk = r,
        e.isValidTile = i,
        e.TILE_MAP = [46, 46, 22, 22, 46, 46, 22, 22, 21, 21, 17, 11, 21, 21, 17, 11, 19, 19, 18, 18, 19, 19, 12, 12, 14, 14, 24, 28, 14, 14, 30, 6, 46, 46, 22, 22, 46, 46, 22, 22, 21, 21, 17, 11, 21, 21, 17, 11, 19, 19, 18, 18, 19, 19, 12, 12, 14, 14, 24, 28, 14, 14, 30, 6, 20, 20, 13, 13, 20, 20, 13, 13, 16, 16, 23, 32, 16, 16, 23, 32, 15, 15, 25, 25, 15, 15, 34, 34, 26, 26, 45, 41, 26, 26, 42, 36, 20, 20, 13, 13, 20, 20, 13, 13, 10, 10, 31, 4, 10, 10, 31, 4, 15, 15, 25, 25, 15, 15, 34, 34, 27, 27, 43, 37, 27, 27, 35, 5, 46, 46, 22, 22, 46, 46, 22, 22, 21, 21, 17, 11, 21, 21, 17, 11, 19, 19, 18, 18, 19, 19, 12, 12, 14, 14, 24, 28, 14, 14, 30, 6, 46, 46, 22, 22, 46, 46, 22, 22, 21, 21, 17, 11, 21, 21, 17, 11, 19, 19, 18, 18, 19, 19, 12, 12, 14, 14, 24, 28, 14, 14, 30, 6, 20, 20, 13, 13, 20, 20, 13, 13, 16, 16, 23, 32, 16, 16, 23, 32, 9, 9, 33, 33, 9, 9, 8, 8, 29, 29, 44, 39, 29, 29, 38, 7, 20, 20, 13, 13, 20, 20, 13, 13, 10, 10, 31, 4, 10, 10, 31, 4, 9, 9, 33, 33, 9, 9, 8, 8, 2, 2, 40, 3, 2, 2, 1, 0],
        n.exports
  });
  System.registerDynamic("57", [getCodeName("Lodash"), "26", "23"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      for (var e = t % d, n = 24 * e / d, r = 1; r < h.length; r++)
        if (h[r] >= n) {
          var i = h[r - 1],
              o = h[r],
              u = p[r - 1],
              l = p[r];
          return a.default.lerp(u, l, (n - i) / (o - i))
        }
      return s.WHITE
    }

    function i(t) {
      var e = t % d,
          n = 1440,
          r = Math.floor(e * n / d),
          i = r % 60,
          a = Math.floor(r / 60);
      return o.padStart(a.toFixed(), 2, "0") + ":" + o.padStart(i.toFixed(), 2, "0")
    }

    var o = t(getCodeName("Lodash")),
        a = t("26"),
        s = t("23"),
        u = "ffffff",
        l = "d4ab64",
        c = "3e489e",
        f = "cfcc7e",
        p = [c, c, f, u, u, l, c, c].map(a.default.parse),
        h = [0, 4, 4.75, 5.5, 19.5, 20.25, 21, 24],
        d = 288e4;
    return e.getLight = r,
        e.formatHourMinutes = i,
        n.exports
  });
  System.registerDynamic("58", ["59"], !0, function(t, e, n) {
    "use strict";

    function r(t, e, n, r, i, a, s, u) {
      return s = o.setXY(t, e, a, s, u),
          a[s++] = n,
          a[s++] = r,
          a[s++] = i,
          s
    }

    var i = this && this.__extends || function(t, e) {
              function n() {
                this.constructor = t
              }

              for (var r in e)
                e.hasOwnProperty(r) && (t[r] = e[r]);
              t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
                  new n)
            },
        o = t("59"),
        a = 5,
        s = 4,
        u = function(t) {
          function e(e) {
            t.call(this, e, 256, 1e4, 4 * a)
          }

          return i(e, t),
              e.prototype.drawImage = function(t, e, n, i, o, a, s, u, l, c) {
                var f = this.getColorFloat(e),
                    p = this.setupTexture(t),
                    h = p[0],
                    d = p[1],
                    m = s + l,
                    g = u + c,
                    v = n / h,
                    y = i / d,
                    b = (n + o) / h,
                    _ = (i + a) / d,
                    w = this.vertices,
                    x = this.transform,
                    $ = this.index;
                $ = r(s, u, v, y, f, w, $, x),
                    $ = r(m, u, b, y, f, w, $, x),
                    $ = r(m, g, b, _, f, w, $, x),
                    $ = r(s, g, v, _, f, w, $, x),
                    this.index = $,
                    this.spritesCount++,
                    this.tris += 2
              },
              e.prototype.drawRect = function(t, e, n, r, i) {
                if (r && i) {
                  var o = this.rectSprite;
                  o ? this.drawImage(o.tex, t, o.x, o.y, o.w, o.h, e, n, r, i) : this.drawImage(null, t, 0, 0, 1, 1, e, n, r, i)
                }
              },
              e.prototype.drawSprite = function(t, e, n, r) {
                t && t.w && t.h && t.tex && this.drawImage(t.tex, e, t.x, t.y, t.w, t.h, n + t.ox, r + t.oy, t.w, t.h)
              },
              e.prototype.getAttributes = function() {
                var t = a * s;
                return [{
                  name: "position",
                  buffer: this.vertexBuffer,
                  size: 2,
                  stride: t
                }, {
                  name: "texcoord0",
                  buffer: this.vertexBuffer,
                  size: 2,
                  offset: 2 * s,
                  stride: t
                }, {
                  name: "color",
                  buffer: this.vertexBuffer,
                  size: 4,
                  stride: t,
                  offset: 4 * s,
                  type: this.gl.UNSIGNED_BYTE,
                  normalized: !0
                }]
              },
              e
        }(o.BaseSpriteBatch);
    return e.SpriteBatch = u,
        n.exports
  });
  System.registerDynamic("59", [getCodeName("gl-buffer"), getCodeName("gl-texture2d"), getCodeName("gl-vao"), "64", "21", "23", "65"], !0, function(t, e, n) {
    "use strict";

    function r(t, e) {
      return u.colorToFloat(t.r, t.g, t.b, t.a * e * 255)
    }

    function i(t, e, n, r, i) {
      if (i) {
        var o = t;
        t = i[0] * o + i[2] * e + i[4],
            e = i[1] * o + i[3] * e + i[5]
      }
      return n[r++] = t,
          n[r++] = e,
          r
    }

    var o = t(getCodeName("gl-buffer")),
        a = t(getCodeName("gl-texture2d")),
        s = t(getCodeName("gl-vao")),
        u = t("64"),
        l = t("21"),
        c = t("23"),
        f = t("65");
    e.setXY = i;
    var p = r(c.WHITE, 1),
        h = function() {
          function t(t, e, n, r) {
            this.gl = t,
                this.initialCapacity = e,
                this.maxCapacity = n,
                this.floatsPerSprite = r,
                this.tris = 0,
                this.globalAlpha = 1,
                this.transform = null,
                this.index = 0,
                this.spritesCount = 0,
                this.spritesCapacity = 0,
                this.ensureCapacity(e);
            var i = l.createCanvas(1, 1),
                o = i.getContext("2d");
            o.fillStyle = "white",
                o.fillRect(0, 0, 1, 1),
                this.defaultTexture = a(t, i)
          }

          return t.prototype.dispose = function() {
            this.defaultTexture = l.dispose(this.defaultTexture),
                this.disposeBuffers()
          },
              t.prototype.disposeBuffers = function() {
                this.vertexBuffer = l.dispose(this.vertexBuffer),
                    this.indexBuffer = l.dispose(this.indexBuffer),
                    this.vao = l.dispose(this.vao)
              },
              t.prototype.begin = function(t) {
                t.bind(),
                    this.texture = this.defaultTexture,
                    this.vao.bind()
              },
              t.prototype.end = function() {
                this.flush(),
                    this.vao.unbind()
              },
              t.prototype.getColorFloat = function(t) {
                return t || 1 !== this.globalAlpha ? r(t || c.WHITE, this.globalAlpha) : p
              },
              t.prototype.setupTexture = function(t) {
                return t = t || this.defaultTexture,
                this.texture !== t && this.flush(),
                    this.ensureCapacity(this.spritesCount + 1),
                    this.texture = t,
                    t.shape
              },
              t.prototype.bind = function() {
                this.texture.bind(0)
              },
              t.prototype.flush = function() {
                if (this.index && this.texture) {
                  var t = this.vertices.subarray(0, this.index);
                  this.vertexBuffer.update(t, 0),
                      this.bind(),
                      this.vao.draw(this.gl.TRIANGLES, 6 * this.spritesCount, 0),
                      this.texture = null,
                      this.spritesCount = 0,
                      this.index = 0
                }
              },
              t.prototype.ensureCapacity = function(t) {
                if (!(this.spritesCapacity > t)) {
                  this.flush();
                  var e = 2 * this.spritesCapacity || this.initialCapacity;
                  e > this.maxCapacity || (this.disposeBuffers(),
                      this.spritesCapacity = e,
                      this.vertices = new Float32Array(this.spritesCapacity * this.floatsPerSprite),
                      this.indices = f.createIndices(this.spritesCapacity),
                      this.vertexBuffer = o(this.gl, this.vertices, this.gl.ARRAY_BUFFER, this.gl.STATIC_DRAW),
                      this.indexBuffer = o(this.gl, this.indices, this.gl.ELEMENT_ARRAY_BUFFER, this.gl.STATIC_DRAW),
                      this.vao = s(this.gl, this.getAttributes(), this.indexBuffer),
                      this.vao.bind())
                }
              },
              t
        }();
    return e.BaseSpriteBatch = h,
        n.exports
  });
  System.registerDynamic("66", ["23", "59"], !0, function(t, e, n) {
    "use strict";

    function r(t, e, n, r, i, o, s, u, l, c, f) {
      return c = a.setXY(t, e, l, c, f),
          l[c++] = n,
          l[c++] = r,
          l[c++] = i,
          l[c++] = o,
          l[c++] = s,
          l[c++] = u,
          c
    }

    var i = this && this.__extends || function(t, e) {
              function n() {
                this.constructor = t
              }

              for (var r in e)
                e.hasOwnProperty(r) && (t[r] = e[r]);
              t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
                  new n)
            },
        o = t("23"),
        a = t("59"),
        s = 8,
        u = 4,
        l = function(t) {
          function e(e) {
            t.call(this, e, 256, 1e4, 4 * s),
                this.defaultDepth = 0
          }

          return i(e, t),
              e.prototype.drawImage = function(t, e, n, i, a, s, u, l, c, f, p) {
                var h = (e || o.WHITE).toFloat(this.globalAlpha),
                    d = n || this.defaultPalette,
                    m = this.setupTexture(t),
                    g = m[0],
                    v = m[1],
                    y = l + f,
                    b = c + p,
                    _ = this.defaultDepth,
                    w = i / g,
                    x = a / v,
                    $ = (i + s) / g,
                    E = (a + u) / v,
                    S = d ? d.u : 0,
                    M = d ? d.v : 0,
                    T = this.vertices,
                    k = this.transform,
                    A = this.index;
                A = r(l, c, _, w, x, S, M, h, T, A, k),
                    A = r(y, c, _, $, x, S, M, h, T, A, k),
                    A = r(y, b, _, $, E, S, M, h, T, A, k),
                    A = r(l, b, _, w, E, S, M, h, T, A, k),
                    this.index = A,
                    this.spritesCount++,
                    this.tris += 2
              },
              e.prototype.drawRect = function(t, e, n, r, i) {
                if (r && i) {
                  var o = this.rectSprite;
                  o ? this.drawImage(o.tex, t, null, o.x, o.y, o.w, o.h, e, n, r, i) : this.drawImage(null, t, null, 0, 0, 1, 1, e, n, r, i)
                }
              },
              e.prototype.drawSprite = function(t, e, n, r, i) {
                t && t.w && t.h && t.tex && this.drawImage(t.tex, e, n, t.x, t.y, t.w, t.h, r + t.ox, i + t.oy, t.w, t.h)
              },
              e.prototype.bind = function() {
                t.prototype.bind.call(this),
                this.palette && this.palette.bind(1)
              },
              e.prototype.getAttributes = function() {
                var t = s * u;
                return [{
                  name: "position",
                  buffer: this.vertexBuffer,
                  size: 3,
                  stride: t
                }, {
                  name: "texcoord0",
                  buffer: this.vertexBuffer,
                  size: 2,
                  offset: 3 * u,
                  stride: t
                }, {
                  name: "texcoord1",
                  buffer: this.vertexBuffer,
                  size: 2,
                  offset: 5 * u,
                  stride: t
                }, {
                  name: "color",
                  buffer: this.vertexBuffer,
                  size: 4,
                  stride: t,
                  offset: 7 * u,
                  type: this.gl.UNSIGNED_BYTE,
                  normalized: !0
                }]
              },
              e
        }(a.BaseSpriteBatch);
    return e.PaletteSpriteBatch2 = l,
        n.exports
  });
  System.registerDynamic("67", [getCodeName("gl-texture2d")], !0, function(t, e, n) {
    "use strict";

    function r(t, e) {
      e.forEach(function(e) {
        e.tex = o(t, e.img),
            e.tex.originalImage = e.img,
            e.sprites.filter(function(t) {
              return !!t
            }).forEach(function(t) {
              return t.tex = e.tex
            })
      })
    }

    function i(t) {
      t.forEach(function(t) {
        t.tex && (t.tex.dispose(),
            t.tex = null),
            t.sprites.filter(function(t) {
              return !!t
            }).forEach(function(t) {
              return t.tex = null
            })
      })
    }

    var o = t(getCodeName("gl-texture2d"));
    return e.createTexturesForSpriteSheets = r,
        e.releaseTexturesForSpriteSheets = i,
        n.exports
  });
  System.registerDynamic("65", [getCodeName("gl-matrix")], !0, function(t, e, n) {
    "use strict";

    function r(t, e) {
      for (var n = Math.max(t, e), r = 256; r < n;)
        r *= 2;
      return r
    }

    function i(t) {
      var e = {
            alpha: !1,
            premultipliedAlpha: !1
          },
          n = t.getContext("webgl", e) || t.getContext("experimental-webgl", e);
      if (!n)
        throw new Error("Failed to create WebGL context");
      return n
    }

    function o(t) {
      for (var e = 6 * t, n = new Uint16Array(e), r = 0, i = 0; r < e; i += 4)
        n[r++] = i + 0,
            n[r++] = i + 1,
            n[r++] = i + 2,
            n[r++] = i + 0,
            n[r++] = i + 2,
            n[r++] = i + 3;
      return n
    }

    function a(t, e, n, r, i, o) {
      return void 0 === r && (r = 1),
      void 0 === i && (i = 0),
      void 0 === o && (o = 0),
          u.mat4.identity(t),
          u.mat4.translate(t, t, u.vec3.fromValues(-1, 1, 0)),
          u.mat4.scale(t, t, u.vec3.fromValues(2 / e, -2 / n, 1)),
          u.mat4.scale(t, t, u.vec3.fromValues(r, r, 1)),
          u.mat4.translate(t, t, u.vec3.fromValues(i, o, 0)),
          t
    }

    function s(t, e, n, r, i, o) {
      return void 0 === r && (r = 1),
      void 0 === i && (i = 0),
      void 0 === o && (o = 0),
          u.mat4.identity(t),
          u.mat4.translate(t, t, u.vec3.fromValues(-1, -1, 0)),
          u.mat4.scale(t, t, u.vec3.fromValues(2 / e, 2 / n, 1)),
          u.mat4.scale(t, t, u.vec3.fromValues(r, r, 1)),
          u.mat4.translate(t, t, u.vec3.fromValues(i, o, 0)),
          t
    }

    var u = t(getCodeName("gl-matrix"));
    return e.getRenderTargetSize = r,
        e.getWebGLContext = i,
        e.createIndices = o,
        e.createViewMatrix = a,
        e.createViewMatrix2 = s,
        n.exports
  });
  System.registerDynamic("8d", [getCodeName("gl-shader")], !0, function(t, e, n) {
    "use strict";

    function r(t, e) {
      var n = t.gl;
      n.useProgram(t.program);
      for (var r = 0; r < e; r++)
        n.uniform1i(n.getUniformLocation(t.program, "sampler" + (r + 1)), r);
      return n.useProgram(null),
          t
    }

    function i(t) {
      return l(t, "\n\t\tattribute vec2 position;\n\t\tattribute vec2 texcoords;\n\n\t\tuniform mat4 transform;\n\n\t\tvarying vec2 textureCoord;\n\n\t\tvoid main() {\n\t\t\ttextureCoord = texcoords;\n\t\t\tgl_Position = transform * vec4(position, 0, 1);\n\t\t}\n\t", "\n\t\tprecision mediump float;\n\n\t\tuniform sampler2D sampler1;\n\n\t\tvarying vec2 textureCoord;\n\n\t\tvoid main() {\n\t\t\tgl_FragColor = texture2D(sampler1, vec2(textureCoord.x, textureCoord.y));\n\t\t}\n\t")
    }

    function o(t) {
      return l(t, "\n\t\tattribute vec2 position;\n\t\tattribute vec2 texcoords;\n\t\tattribute vec4 vertexColor;\n\n\t\tuniform mat4 transform;\n\t\tuniform vec4 lighting;\n\n\t\tvarying vec2 textureCoord;\n\t\tvarying vec4 vColor;\n\n\t\tvoid main() {\n\t\t\ttextureCoord = texcoords;\n\t\t\tvColor = vertexColor * lighting;\n\t\t\tgl_Position = transform * vec4(position, 0, 1);\n\t\t}\n\t", "\n\t\tprecision mediump float;\n\n\t\tuniform sampler2D sampler1;\n\n\t\tvarying vec2 textureCoord;\n\t\tvarying vec4 vColor;\n\n\t\tvoid main() {\n\t\t\tgl_FragColor = texture2D(sampler1, vec2(textureCoord.x, textureCoord.y)) * vColor;\n\t\t}\n\t")
    }

    function a(t) {
      return l(t, "\n\t\tattribute vec3 position;\n\t\tattribute vec2 texcoords;\n\t\tattribute vec4 vertexColor;\n\n\t\tuniform mat4 transform;\n\n\t\tvarying vec2 textureCoord;\n\t\tvarying vec4 vColor;\n\n\t\tvoid main() {\n\t\t\ttextureCoord = texcoords;\n\t\t\tvColor = vertexColor;\n\t\t\tgl_Position = transform * vec4(position, 1);\n\t\t}\n\t", "\n\t\tprecision mediump float;\n\n\t\tuniform sampler2D sampler1;\n\n\t\tvarying vec2 textureCoord;\n\t\tvarying vec4 vColor;\n\n\t\tvoid main() {\n\t\t\tgl_FragColor = texture2D(sampler1, vec2(textureCoord.x, textureCoord.y)) * vColor;\n\t\t}\n\t")
    }

    function s(t) {
      return r(l(t, "\n\t\tattribute vec2 position;\n\t\tattribute vec2 texcoords;\n\t\tattribute vec2 texcoords1;\n\t\tattribute vec4 vertexColor;\n\n\t\tuniform mat4 transform;\n\t\tuniform vec4 lighting;\n\n\t\tvarying vec2 textureCoord;\n\t\tvarying vec2 paletteCoord;\n\t\tvarying vec4 vColor;\n\n\t\tvoid main() {\n\t\t\ttextureCoord = texcoords;\n\t\t\tpaletteCoord = texcoords1;\n\t\t\tvColor = vertexColor * lighting;\n\t\t\tgl_Position = transform * vec4(position, 0, 1);\n\t\t}\n\t", "\n\t\tprecision mediump float;\n\n\t\tuniform sampler2D sampler1; // sprite\n\t\tuniform sampler2D sampler2; // palette\n\t\tuniform float pixelSize;\n\n\t\tvarying vec2 textureCoord;\n\t\tvarying vec2 paletteCoord;\n\t\tvarying vec4 vColor;\n\n\t\tvoid main() {\n\t\t\tvec4 sprite = texture2D(sampler1, vec2(textureCoord.x, textureCoord.y));\n\t\t\tvec4 palette = texture2D(sampler2, vec2(paletteCoord.x + sprite.x * pixelSize, paletteCoord.y));\n\t\t\tgl_FragColor = vec4(palette.xyz * sprite.y, palette.w) * vColor;\n\t\t}\n\t"), 2)
    }

    function u(t) {
      return r(l(t, "\n\t\tattribute vec3 position;\n\t\tattribute vec2 texcoords;\n\t\tattribute vec2 texcoords1;\n\t\tattribute vec4 vertexColor;\n\n\t\tuniform mat4 transform;\n\t\tuniform vec4 lighting; // TODO: remove ?\n\n\t\tvarying vec2 textureCoord;\n\t\tvarying vec2 paletteCoord;\n\t\tvarying vec4 vColor;\n\n\t\tvoid main() {\n\t\t\ttextureCoord = texcoords;\n\t\t\tpaletteCoord = texcoords1;\n\t\t\tvColor = vertexColor * lighting;\n\t\t\tgl_Position = transform * vec4(position, 1);\n\t\t}\n\t", "\n\t\tprecision mediump float;\n\n\t\tuniform sampler2D sampler1; // sprite\n\t\tuniform sampler2D sampler2; // palette\n\t\tuniform float pixelSize;\n\n\t\tvarying vec2 textureCoord;\n\t\tvarying vec2 paletteCoord;\n\t\tvarying vec4 vColor;\n\n\t\tvoid main() {\n\t\t\tvec4 sprite = texture2D(sampler1, vec2(textureCoord.x, textureCoord.y));\n\t\t\tvec4 palette = texture2D(sampler2, vec2(paletteCoord.x + sprite.x * pixelSize, paletteCoord.y));\n\t\t\tvec4 color = vec4(palette.xyz * sprite.y, palette.w) * vColor;\n\n\t\t\tgl_FragColor = color;\n\n\t\t\tif (color.a < 0.01)\n\t\t\t\tdiscard; \n\t\t}\n\t"), 2)
    }

    var l = t(getCodeName("gl-shader"));
    return e.createBasicShader = i,
        e.createSpriteShader = o,
        e.createSpriteShader2 = a,
        e.createPaletteShader = s,
        e.createPaletteShader2 = u,
        n.exports
  });
  System.registerDynamic("8e", [], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      return t.target && /^(input|textarea|select)$/i.test(t.target.tagName)
    }

    var i = function() {
      function t(t) {
        this.manager = t
      }

      return t.prototype.initialize = function() {
        var t = this;
        this.initialized || (this.initialized = !0,
            window.addEventListener("keydown", function(e) {
              !r(e) && t.manager.setValue(e.keyCode, 1) && (e.preventDefault(),
                  e.stopPropagation())
            }),
            window.addEventListener("keyup", function(e) {
              t.manager.setValue(e.keyCode, 0) && (e.preventDefault(),
                  e.stopPropagation())
            }),
            window.addEventListener("blur", function() {
              t.manager.clear()
            }))
      },
          t.prototype.update = function() {},
          t
    }();
    return e.KeyboardController = i,
        n.exports
  });
  System.registerDynamic("8f", [], !0, function(t, e, n) {
    "use strict";
    var r = [1002, 1004, 1003],
        i = function() {
          function t(t) {
            this.manager = t
          }

          return t.prototype.initialize = function() {
            var t = this;
            if (!this.initialized) {
              this.initialized = !0;
              var e = document.getElementById("canvas");
              e.addEventListener("mousemove", function(e) {
                t.manager.setValue(1e3, Math.floor(e.clientX)),
                    t.manager.setValue(1001, Math.floor(e.clientY))
              }),
                  e.addEventListener("mousedown", function(e) {
                    t.manager.setValue(r[e.button], 1)
                  }),
                  e.addEventListener("mouseup", function(e) {
                    t.manager.setValue(r[e.button], 0)
                  }),
                  e.addEventListener("contextmenu", function(t) {
                    t.preventDefault(),
                        t.stopPropagation()
                  }),
                  window.addEventListener("blur", function() {
                    t.manager.setValue(1002, 0)
                  })
            }
          },
              t.prototype.update = function() {},
              t
        }();
    return e.MouseController = i,
        n.exports
  });
  System.registerDynamic("90", ["21"], !0, function(t, e, n) {
    "use strict";

    function r(t, e) {
      for (var n = 0; n < t.changedTouches.length; ++n) {
        var r = t.changedTouches.item(n);
        if (r.identifier === e)
          return r
      }
      return null
    }

    var i = t("21"),
        o = 15,
        a = 100,
        s = function() {
          function t(t) {
            this.manager = t,
                this.touchId = -1,
                this.touchStartTime = 0,
                this.touchStart = {
                  x: 0,
                  y: 0
                },
                this.touchCurrent = {
                  x: 0,
                  y: 0
                },
                this.originShown = !1,
                this.positionShown = !1
          }

          return t.prototype.initialize = function() {
            var t = this;
            if (!this.initialized) {
              this.initialized = !0,
                  this.origin = document.getElementById("touch-origin"),
                  this.position = document.getElementById("touch-position");
              var e = document.getElementById("canvas");
              e.addEventListener("touchstart", function(e) {
                if (e.preventDefault(),
                        e.stopPropagation(),
                    t.touchId === -1) {
                  var n = e.changedTouches.item(0);
                  t.touchId = n.identifier,
                      t.touchStartTime = Date.now(),
                      t.touchStart = t.touchCurrent = {
                        x: n.clientX,
                        y: n.clientY
                      }
                }
              }),
                  e.addEventListener("touchmove", function(e) {
                    e.preventDefault(),
                        e.stopPropagation();
                    var n = r(e, t.touchId);
                    n && (t.touchCurrent = {
                      x: n.clientX,
                      y: n.clientY
                    },
                        t.updateInput())
                  }),
                  e.addEventListener("touchend", function(e) {
                    e.preventDefault(),
                        e.stopPropagation();
                    var n = r(e, t.touchId);
                    n && (t.touchIsDrag || (t.manager.setValue(1e3, t.touchStart.x),
                        t.manager.setValue(1001, t.touchStart.y),
                        t.manager.setValue(1002, 1)),
                        t.resetTouch())
                  }),
                  window.addEventListener("touchend", function() {
                    return t.resetTouch()
                  }),
                  window.addEventListener("blur", function() {
                    return t.resetTouch()
                  })
            }
          },
              t.prototype.update = function() {
                var t = this.touchIsDrag && this.touchId !== -1,
                    e = this.touchId !== -1;
                if (this.originShown !== t && (this.originShown = t,
                        this.origin.style.display = t ? "block" : "none"),
                    this.positionShown !== e && (this.positionShown = e,
                        this.position.style.display = e ? "block" : "none"),
                        t) {
                  var n = "translate3d(" + (this.touchStart.x - 50) + "px, " + (this.touchStart.y - 50) + "px, 0px)";
                  this.originTransform !== n && (this.originTransform = n,
                      i.setTransform(this.origin, n))
                }
                if (e) {
                  var n = "translate3d(" + (this.touchCurrent.x - 25) + "px, " + (this.touchCurrent.y - 25) + "px, 0px)";
                  this.positionTransform !== n && (this.positionTransform = n,
                      i.setTransform(this.position, n))
                }
              },
              t.prototype.resetTouch = function() {
                this.touchId = -1,
                    this.touchStart = this.touchCurrent = {
                      x: 0,
                      y: 0
                    },
                    this.touchIsDrag = !1,
                    this.updateInput()
              },
              t.prototype.updateInput = function() {
                var t = this.touchStart.y - this.touchCurrent.y,
                    e = this.touchStart.x - this.touchCurrent.x,
                    n = Math.atan2(t, e),
                    r = Math.sqrt(t * t + e * e);
                if (r > o) {
                  var i = Math.min((r - o) / (a - o), 1);
                  this.touchIsDrag = !0,
                      this.manager.setValue(2e3, -Math.cos(n) * i),
                      this.manager.setValue(2001, -Math.sin(n) * i)
                } else
                  this.manager.setValue(2e3, 0),
                      this.manager.setValue(2001, 0)
              },
              t
        }();
    return e.TouchController = s,
        n.exports
  });
  System.registerDynamic("91", [getCodeName("Lodash")], !0, function(t, e, n) {
    "use strict";
    var r = t(getCodeName("Lodash")),
        i = .2,
        o = function() {
          function t(t) {
            this.manager = t,
                this.gamepadIndex = -1
          }

          return t.prototype.initialize = function() {
            var t = this;
            this.initialized || (this.initialized = !0,
                window.addEventListener("gamepadconnected", function(e) {
                  t.gamepadIndex = e.gamepad.index
                }),
                window.addEventListener("gamepaddisconnected", function(e) {
                  t.gamepadIndex === e.gamepad.index && t.scanGamepads()
                }),
                this.scanGamepads())
          },
              t.prototype.update = function() {
                if (this.gamepadIndex !== -1) {
                  var t = navigator.getGamepads(),
                      e = t[this.gamepadIndex];
                  if (!e)
                    return void this.scanGamepads();
                  var n = "(null) (null) (Vendor: 045e Product: 0289)" === e.id || "045e-0289-Microsoft X-Box pad v2 (US)" === e.id,
                      r = n ? 4 : 3,
                      o = Math.sqrt(e.axes[0] * e.axes[0] + e.axes[1] * e.axes[1]);
                  if (o > i) {
                    this.zeroed = !1;
                    var a = Math.min((o - i) / (1 - i), 1),
                        s = Math.atan2(e.axes[1], e.axes[0]);
                    this.manager.setValue(2e3, Math.cos(s) * a),
                        this.manager.setValue(2001, Math.sin(s) * a)
                  } else
                    this.zeroed || (this.manager.setValue(2e3, 0),
                        this.manager.setValue(2001, 0),
                        this.zeroed = !0);
                  this.manager.setValue(3003, e.buttons[r] && e.buttons[r].pressed ? 1 : 0)
                }
              },
              t.prototype.scanGamepads = function() {
                var t = r.find(navigator.getGamepads(), function(t) {
                  return !!t
                });
                this.gamepadIndex = t ? t.index : -1
              },
              t
        }();
    return e.GamePadController = o,
        n.exports
  });
  System.registerDynamic("92", [getCodeName("Lodash"), "8e", "8f", "90", "91"], !0, function(t, e, n) {
    "use strict";
    var r = t(getCodeName("Lodash")),
        i = t("8e"),
        o = t("8f"),
        a = t("90"),
        s = t("91"),
        u = function() {
          function t() {
            this.inputs = [],
                this.actions = []
          }

          return Object.defineProperty(t.prototype, "axisX", {
            get: function() {
              var t = this.getRange(2e3),
                  e = this.getState(37, 65, 3014),
                  n = this.getState(39, 68, 3015),
                  i = t + (e ? -1 : n ? 1 : 0);
              return r.clamp(i, -1, 1)
            },
            enumerable: !0,
            configurable: !0
          }),
              Object.defineProperty(t.prototype, "axisY", {
                get: function() {
                  var t = this.getRange(2001),
                      e = this.getState(38, 87, 3012),
                      n = this.getState(40, 83, 3013),
                      i = t + (e ? -1 : n ? 1 : 0);
                  return r.clamp(i, -1, 1)
                },
                enumerable: !0,
                configurable: !0
              }),
              t.prototype.initialize = function() {
                this.controllers = [new i.KeyboardController(this), new o.MouseController(this), new a.TouchController(this), new s.GamePadController(this)],
                    this.controllers.forEach(function(t) {
                      return t.initialize()
                    })
              },
              t.prototype.update = function() {
                this.controllers.forEach(function(t) {
                  return t.update()
                })
              },
              t.prototype.onPressed = function(t, e) {
                this.onAction(t, function(t, n) {
                  1 === n && e()
                })
              },
              t.prototype.onReleased = function(t, e) {
                this.onAction(t, function(t, n) {
                  0 === n && e()
                })
              },
              t.prototype.isPressed = function() {
                for (var t = [], e = 0; e < arguments.length; e++)
                  t[e - 0] = arguments[e];
                return this.getState.apply(this, t)
              },
              t.prototype.onAction = function(t, e) {
                var n = this,
                    r = Array.isArray(t) ? t : [t];
                r.forEach(function(t) {
                  n.actions[t] || (n.actions[t] = []),
                      n.actions[t].push(e)
                })
              },
              t.prototype.getAction = function() {
                for (var t = this, e = [], n = 0; n < arguments.length; n++)
                  e[n - 0] = arguments[n];
                return e.reduce(function(e, n) {
                  var r = !!t.inputs[n];
                  return t.inputs[n] = 0,
                  e || r
                }, !1)
              },
              t.prototype.getState = function() {
                for (var t = this, e = [], n = 0; n < arguments.length; n++)
                  e[n - 0] = arguments[n];
                return e.some(function(e) {
                  return !!t.inputs[e]
                })
              },
              t.prototype.getRange = function() {
                for (var t = this, e = [], n = 0; n < arguments.length; n++)
                  e[n - 0] = arguments[n];
                return e.reduce(function(e, n) {
                  return e + (t.inputs[n] || 0)
                }, 0)
              },
              t.prototype.setValue = function(t, e) {
                return !((this.inputs[t] || 0) === e || (this.inputs[t] = e, !this.actions[t])) && (this.actions[t].forEach(function(n) {
                      return n(t, e)
                    }), !0)
              },
              t.prototype.clear = function() {
                this.inputs = []
              },
              t
        }();
    return e.InputManager = u,
        n.exports
  });
  System.registerDynamic("40", ["21"], !0, function(t, e, n) {
    "use strict";

    function r(t, e, n) {
      t.width === e && t.height === n || (t.width = e,
          t.height = n)
    }

    function i(t) {
      var e = t.getBoundingClientRect(),
          n = a.getPixelRatio(),
          i = Math.round(e.width * n),
          o = Math.round(e.height * n);
      r(t, i, o)
    }

    function o(t, e, n) {
      return t = t || a.createCanvas(e, n),
          r(t, e, n),
          t
    }

    var a = t("21");
    return e.resizeCanvas = r,
        e.resizeCanvasToElementSize = i,
        e.createOrResizeCanvas = o,
        n.exports
  });
  System.registerDynamic("93", [getCodeName("gl-matrix"), getCodeName("gl-fbo"), "21", "20", "29", "2a", "56", "23", "22", "57", "58", "66", "25", "67", "65", "39", "1e", "8d", "92", "94", "40", "1f", "95", "42"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      t.player && t.player.tes && t.player.tes()
    }

    function i() {
      return s.clamp(0 | +T.getItem("game-scale") || (s.getPixelRatio() > 1 ? 3 : 2), 1, 4)
    }

    var o = t(getCodeName("gl-matrix")),
        a = t(getCodeName("gl-fbo")),
        s = t("21"),
        u = t("20"),
        l = t("29"),
        c = t("2a"),
        f = t("56"),
        p = t("23"),
        h = t("22"),
        d = t("57"),
        m = t("58"),
        g = t("66"),
        v = t("25"),
        y = t("67"),
        b = t("65"),
        _ = t("39"),
        w = t("1e"),
        x = t("8d"),
        $ = t("92"),
        E = t("94"),
        S = t("40"),
        M = t("1f"),
        T = t("95"),
        k = t("42"),
        A = [1, 1, 1, 1],
        C = function() {
          function t() {
            this.loaded = !1,
                this.fps = 0,
                this.map = new c.Map(0, 0),
                this.scale = i(),
                this.baseTime = 0,
                this.camera = new f.Camera,
                this.failedToCreateWebGL = !1,
                this.apply = function(t) {
                  return t()
                },
                this.paletteManager = new v.PaletteManager,
                this.input = new $.InputManager,
                this.timeSize = 0,
                this.lastStats = 0,
                this.sent = 0,
                this.recv = 0,
                this.textJump = 0,
                this.hideText = !1,
                this.hideObjects = !1,
                this.hover = {
                  x: 0,
                  y: 0
                },
                this.lightingEnabled = !1,
                this.viewMatrix = o.mat4.create(),
                this.fboMatrix = o.mat4.create(),
                this.fboToScreen = o.mat2d.create(),
                this.initialized = !1
          }

          return t.prototype.changeScale = function() {
            this.scale = this.scale % 4 + 1,
                T.setItem("game-scale", this.scale.toString())
          },
              t.prototype.isSelected = function(t) {
                return this.selected && this.selected.id === t
              },
              t.prototype.select = function(t) {
                var e = this;
                this.selected !== t && this.apply(function() {
                  e.selected && (e.selected.selected = !1),
                      e.selected = t,
                  e.selected && (e.selected.selected = !0)
                })
              },
              t.prototype.load = function() {
                return k.loadSpriteSheets()
              },
              t.prototype.init = function() {
                var t = this;
                this.initialized || (this.initialized = !0,
                    this.defaultPalette = this.paletteManager.add([0, 4294967295]),
                    this.canvas = document.getElementById("canvas"),
                    this.stats = document.getElementById("stats"),
                    this.clock = document.getElementById("clock"),
                    this.input.initialize(),
                    this.input.onReleased([80, 3003], function() {
                      return t.changeScale()
                    }),
                    this.input.onPressed(13, function() {
                      return t.onChat()
                    }),
                    this.input.onPressed(27, function() {
                      t.onCancel() || t.select(null)
                    }),
                    this.input.onPressed(191, function() {
                      return t.onCommand()
                    }),
                    this.input.onPressed(113, function() {
                      return t.hideText = !t.hideText
                    }),
                    this.input.onPressed(115, function() {
                      return t.hideObjects = !t.hideObjects
                    }),
                M.debug && (this.input.onReleased(84, function() {
                  return t.lightingEnabled = !t.lightingEnabled
                }),
                    this.input.onReleased(219, function() {
                      return t.baseTime -= 12e4
                    }),
                    this.input.onReleased(221, function() {
                      return t.baseTime += 12e4
                    })),
                    window.addEventListener("resize", function() {
                      return t.resizeCanvas()
                    })),
                    this.resizeCanvas(),
                this.gl || this.initWebGL()
              },
              t.prototype.initWebGL = function() {
                try {
                  this.updateCamera();
                  var t = this.gl = b.getWebGLContext(this.canvas),
                      e = b.getRenderTargetSize(this.camera.w, this.camera.h);
                  this.frameBuffer = a(t, [e, e], {
                    depth: !0
                  }),
                      this.spriteShader = x.createSpriteShader(t),
                      this.spriteShader2 = x.createSpriteShader2(t),
                      this.spriteBatch = new m.SpriteBatch(t),
                      this.paletteShader = x.createPaletteShader(t),
                      this.paletteShader = x.createPaletteShader2(t),
                      this.paletteBatch = new g.PaletteSpriteBatch2(t),
                      y.createTexturesForSpriteSheets(t, w.spriteSheets),
                      this.spriteBatch.rectSprite = w.pixel,
                      this.paletteBatch.rectSprite = w.rectSprite
                } catch (t) {
                  throw console.error(t),
                      this.releaseWebGL(),
                      t
                }
              },
              t.prototype.releaseWebGL = function() {
                this.gl = null,
                    this.frameBuffer = s.dispose(this.frameBuffer),
                    this.spriteShader = s.dispose(this.spriteShader),
                    this.paletteShader = s.dispose(this.paletteShader),
                    this.spriteBatch = s.dispose(this.spriteBatch),
                    this.paletteBatch = s.dispose(this.paletteBatch),
                    s.dispose(this.paletteManager),
                    y.releaseTexturesForSpriteSheets(w.spriteSheets)
              },
              t.prototype.updateCamera = function() {
                var t = this.scale * s.getPixelRatio();
                this.camera.w = Math.ceil(this.canvas.width / t),
                    this.camera.h = Math.ceil(this.canvas.height / t)
              },
              t.prototype.release = function() {
                this.loaded = !1,
                    this.selected = null,
                this.socket && (this.socket.disconnect(),
                    this.socket = null),
                    s.dispose(this.paletteManager),
                    this.releaseWebGL()
              },
              t.prototype.startup = function(t, e) {
                this.selected = null,
                    this.socket = t,
                    this.apply = e
              },
              t.prototype.update = function(t) {
                var e = this;
                if (this.socket && this.socket.isConnected) {
                  var n = this.camera,
                      i = this.player,
                      o = this.map;
                  if (r(this),
                          this.input.update(),
                          this.updateCamera(),
                      i && o && this.loaded) {
                    var a = this.input.axisX,
                        l = this.input.axisY,
                        c = s.length(a, l),
                        f = c < .5 || this.input.isPressed(16),
                        p = s.vectorToDir(a, l),
                        d = a || l ? s.dirToVector(p) : {
                          x: 0,
                          y: 0
                        },
                        m = a || l ? f ? 1 : 2 : 0,
                        g = s.flagsToSpeed(m),
                        v = d.x * g,
                        y = d.y * g;
                    if (i.vx !== v || i.vy !== y) {
                      var b = s.encodeMovement(i.x, i.y, p, m),
                          _ = b[0],
                          w = b[1];
                      this.socket.server.update(_, w)
                    }
                    if (i.vx = v,
                            i.vy = y,
                            n.update(i, o),
                            this.input.getAction(1002)) {
                      var x = this.scale,
                          $ = n.screenToWorld({
                            x: this.input.getRange(1e3) / x,
                            y: this.input.getRange(1001) / x
                          }),
                          E = o.pickEntities($, this.input.isPressed(16)),
                          S = E[(E.indexOf(this.selected) + 1) % E.length];
                      if (S)
                        "pony" === S.type ? this.select(S) : this.socket.server.interact(S.id);
                      else if (this.selected)
                        this.select(null);
                      else {
                        var M = this.map.getTile(0 | $.x, 0 | $.y) === h.TileType.Grass ? h.TileType.Dirt : h.TileType.Grass;
                        this.socket.server.changeTile(0 | $.x, 0 | $.y, M)
                      }
                    }
                    o.update(t);
                    var T = i.x * u.tileWidth,
                        k = i.y * u.tileHeight;
                    o.forEachEntity(function(t) {
                      t.coverBounds && (t.coverLifted = e.hideObjects || s.containsPoint(t.x * u.tileWidth, t.y * u.tileHeight, t.coverBounds, T, k))
                    }),
                        this.hover = this.camera.screenToWorld({
                          x: this.input.getRange(1e3) / this.scale,
                          y: this.input.getRange(1001) / this.scale
                        })
                  }
                  this.timeSize += t,
                      this.textJump += 4 * t,
                  this.timeSize > 1 && (this.sent = 8 * this.socket.sentSize / this.timeSize / 1024,
                      this.recv = 8 * this.socket.receivedSize / this.timeSize / 1024,
                      this.socket.sentSize = 0,
                      this.socket.receivedSize = 0,
                      this.timeSize = 0)
                }
              },
              t.prototype.draw = function() {
                var t = this;
                if (this.gl) {
                  var e = this.gl,
                      n = this.camera,
                      r = n.w,
                      i = n.h,
                      a = this.scale * s.getPixelRatio(),
                      u = d.getLight(this.getTime()).toFloatArray();
                  this.initializeFrameBuffer(r, i);
                  var l = this.fboToScreen;
                  o.mat2d.identity(l),
                      o.mat2d.translate(l, l, o.vec2.fromValues(0, i)),
                      o.mat2d.scale(l, l, o.vec2.fromValues(1, -1));
                  var c = b.createViewMatrix(this.viewMatrix, n.w, n.h, 1, -n.x, -n.y),
                      f = b.createViewMatrix(this.fboMatrix, this.canvas.width, this.canvas.height, a);
                  if (this.frameBuffer.bind(),
                          e.clearColor(p.BG_COLOR.floatR, p.BG_COLOR.floatG, p.BG_COLOR.floatB, 1),
                          e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT),
                          e.enable(e.SCISSOR_TEST),
                          e.scissor(0, 0, r, i),
                          e.viewport(0, 0, r, i),
                          e.enable(e.DEPTH_TEST),
                          e.depthFunc(e.LEQUAL),
                          e.enable(e.BLEND),
                          e.blendEquation(e.FUNC_ADD),
                          e.blendFunc(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA),
                          this.map) {
                    var h = this.lightingEnabled ? A : u;
                    this.paletteManager.commit(this.gl),
                        this.paletteBatch.palette = this.paletteManager.texture,
                        this.spriteBatch.begin(this.spriteShader),
                        this.spriteShader.uniforms.transform = c,
                        this.spriteShader.uniforms.lighting = h,
                        this.map.drawTiles(this.spriteBatch, n),
                        this.spriteBatch.end(),
                        this.paletteBatch.begin(this.paletteShader),
                        this.paletteShader.uniforms.transform = c,
                        this.paletteShader.uniforms.lighting = h,
                        this.paletteShader.uniforms.pixelSize = this.paletteManager.pixelSize,
                        this.map.drawEntities2(this.paletteBatch, n),
                        this.paletteBatch.end()
                  }
                  if (e.bindFramebuffer(e.FRAMEBUFFER, null),
                          e.viewport(0, 0, this.canvas.width, this.canvas.height),
                          e.disable(e.SCISSOR_TEST),
                          e.disable(e.DEPTH_TEST),
                          e.disable(e.BLEND),
                          this.spriteBatch.begin(this.spriteShader),
                          this.spriteShader.uniforms.transform = f,
                          this.spriteShader.uniforms.lighting = A,
                          this.spriteBatch.transform = l,
                          this.spriteBatch.drawImage(this.frameBuffer.color[0], null, 0, 0, r, i, 0, 0, r, i),
                          this.spriteBatch.transform = null,
                          this.spriteBatch.end(),
                      this.lightingEnabled && (this.frameBuffer.bind(),
                          e.clearColor(u[0], u[1], u[2], u[3]),
                          e.clear(e.COLOR_BUFFER_BIT),
                          e.enable(e.SCISSOR_TEST),
                          e.scissor(0, 0, r, i),
                          e.viewport(0, 0, r, i),
                          e.enable(e.BLEND),
                          e.blendEquation(e.FUNC_ADD),
                          e.blendFunc(e.ONE, e.ONE),
                      this.map && (this.spriteBatch.begin(this.spriteShader),
                          this.spriteShader.uniforms.transform = c,
                          this.spriteShader.uniforms.lighting = A,
                          this.map.forEachEntity(function(e) {
                            e.drawLight && t.camera.isBoundVisible(e.lightBounds || e.bounds, e.x, e.y) && e.drawLight(t.spriteBatch)
                          }),
                          this.spriteBatch.end()),
                          e.bindFramebuffer(e.FRAMEBUFFER, null),
                          e.viewport(0, 0, this.canvas.width, this.canvas.height),
                          e.disable(e.SCISSOR_TEST),
                          e.disable(e.DEPTH_TEST),
                          e.enable(e.BLEND),
                          e.blendEquation(e.FUNC_ADD),
                          e.blendFunc(e.DST_COLOR, e.ZERO),
                          this.spriteBatch.begin(this.spriteShader),
                          this.spriteShader.uniforms.transform = f,
                          this.spriteShader.uniforms.lighting = A,
                          this.spriteBatch.transform = l,
                          this.spriteBatch.drawImage(this.frameBuffer.color[0], null, 0, 0, r, i, 0, 0, r, i),
                          this.spriteBatch.transform = null,
                          this.spriteBatch.end()),
                          e.enable(e.BLEND),
                          e.blendEquation(e.FUNC_ADD),
                          e.blendFunc(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA),
                          this.spriteBatch.begin(this.spriteShader),
                          this.drawChatAndNames(),
                          this.socket && this.socket.isConnected ? this.loaded || this.drawMessage(this.spriteBatch, "Loading...") : this.drawMessage(this.spriteBatch, "Connecting..."),
                          M.debugOptions.showPalette) {
                    var m = this.paletteManager;
                    this.spriteBatch.drawRect(p.GRAY, 10, 10, m.textureSize, m.textureSize),
                        this.spriteBatch.drawImage(m.texture, null, 0, 0, m.textureSize, m.textureSize, 10, 10, m.textureSize, m.textureSize)
                  }
                  this.spriteBatch.end(),
                      this.updateStats()
                }
              },
              t.prototype.getTime = function() {
                return this.baseTime + Date.now()
              },
              t.prototype.resizeCanvas = function() {
                var t = window.innerWidth,
                    e = window.innerHeight,
                    n = s.getPixelRatio(),
                    r = Math.round(t * n),
                    i = Math.round(e * n);
                S.resizeCanvas(this.canvas, r, i)
              },
              t.prototype.initializeFrameBuffer = function(t, e) {
                var n = b.getRenderTargetSize(t, e);
                if (n !== this.frameBuffer.shape[0]) {
                  var r = this.gl.getParameter(this.gl.MAX_RENDERBUFFER_SIZE);
                  if (n > r)
                    return void this.scale++;
                  this.frameBuffer.shape = [n, n]
                }
              },
              t.prototype.drawChatAndNames = function() {
                var t = this;
                this.hideText || this.map.forEachEntity(function(e) {
                  var n = e.interactBounds || e.bounds;
                  if (e !== t.player && e.name && n && s.contains(e.x, e.y, n, t.hover)) {
                    var r = t.camera.worldToScreen(e);
                    t.drawNamePlate(t.spriteBatch, e.name, r.x, r.y + n.y - 12, e.tag)
                  }
                  if (e.says) {
                    var i = t.camera.worldToScreen(e),
                        o = i.x,
                        a = i.y;
                    _.drawSpeechBaloon(t.spriteBatch, e.says, o, a + n.y - 18, t.camera)
                  }
                })
              },
              t.prototype.updateStats = function() {
                var t = Date.now();
                if (t - this.lastStats > 1e3) {
                  var e = this.spriteBatch.tris + this.paletteBatch.tris,
                      n = this.sent.toFixed(),
                      r = this.recv.toFixed(),
                      i = this.map ? this.map.entitiesDrawn : 0,
                      o = this.map ? this.map.getTotalEntities() : 0,
                      a = this.map ? this.map.getTotalEntities(function(t) {
                        return t instanceof l.Pony
                      }) : 0,
                      s = this.lightingEnabled ? "light" : "",
                      u = M.debug ? "(" + i + "/" + o + ") " + e + " tris" : "";
                  this.stats.textContent = s + " " + this.fps.toFixed(0) + " fps " + n + "/" + r + " kb/s " + a + " ponies " + u,
                      this.lastStats = t,
                      this.clock.textContent = d.formatHourMinutes(this.getTime())
                }
                this.spriteBatch.tris = 0,
                    this.paletteBatch.tris = 0
              },
              t.prototype.drawMessage = function(t, e) {
                var n = 100,
                    r = Math.round((this.camera.h - n) / 2);
                t.drawRect(p.MESSAGE_COLOR, 0, r, this.camera.w, n),
                    E.font.drawTextAligned(t, e, p.WHITE, {
                      x: 0,
                      y: r,
                      w: this.camera.w,
                      h: n
                    }, "center", "middle")
              },
              t.prototype.drawNamePlate = function(t, e, n, r, i) {
                var o = E.font.measureText(e),
                    a = n - Math.round(o.w / 2),
                    s = r - o.h + 8;
                E.font.drawText(t, e, p.BLACK, a, s);
                var u = "mod" === i ? w.mod : "dev" === i ? w.dev : null;
                t.drawSprite(u, p.WHITE, a + o.w + 2, s - 1)
              },
              t
        }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = C,
        n.exports
  });
  System.registerDynamic("2b", ["93"], !0, function(t, e, n) {
    "use strict";
    var r, i = t("93"),
        o = "undefined" != typeof document;
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          get game() {
            return o ? r ? r : r = new i.default : null
          }
        },
        n.exports
  });
  System.registerDynamic("96", [], !0, function(t, e, n) {
    return n.exports = '<script type="text/ng-template" id="pony-box-note-popover.html"><textarea cols="20" rows="6" ag-auto-focus ng-model="vm.pony.note" style="font-size: smaller;" ng-keydown="vm.keydown($event)" ng-blur="vm.blur()" class="form-control pony-box-note-editor"></textarea></script><div class="pony-box"><div class="pony-box-rect"><span ng-if="vm.pony.tag" ng-class="\'label-\' + vm.pony.tag" class="label pony-box-tag">{{vm.pony.tag}}</span><div class="pony-box-name">{{vm.name}}</div><div class="pony-box-buttons"><div class="btn-group"><button uib-tooltip="{{vm.pony.ignored ? \'Unignore player\' : \'Ignore player\'}}" ng-click="vm.toggleIgnore()" ng-class="{ \'btn-danger\': vm.pony.ignored }" class="btn btn-xs btn-default"><i class="fa fa-ban"></i></button></div> <a ng-if="vm.site" ng-href="{{vm.site.url}}" target="_blank" class="pony-box-site"><i ng-class="vm.site.icon" ng-style="{ color: vm.site.color }" class="fa fa-fw fa-lg"></i><b> {{vm.site.name}}</b></a></div><div ng-if="vm.isMod" class="btn-group pony-box-buttons-mod"><button ng-click="vm.report()" uib-tooltip="Report" class="btn btn-xs btn-default"><i class="fa fa-flag"></i></button><button uib-tooltip="{{vm.isNoteOpen ? null : vm.pony.note}}" tooltip-placement="bottom" tooltip-class="tooltip-notes" uib-popover-template="\'pony-box-note-popover.html\'" popover-placement="bottom" popover-is-open="vm.isNoteOpen" ng-class="{ \'btn-danger\': !!vm.pony.note, \'pointer-none\': vm.isNoteOpen }" class="btn btn-xs btn-default"><i class="fa fa-sticky-note"></i></button><div uib-dropdown ng-if="vm.isMod" uib-tooltip="{{vm.timeoutTooltip}}" class="btn-group dropdown"><button uib-dropdown-toggle ng-class="{ \'btn-danger\': vm.hasTimeout }" class="btn btn-xs btn-default"><i class="fa fa-clock-o"></i></button><ul uib-dropdown-menu class="dropdown-menu pull-right"><li ng-repeat="t in vm.timeouts"><a ng-click="vm.timeout(t.value)">{{t.label}}</a></li></ul></div><button ng-click="vm.toggleMute()" uib-tooltip="{{vm.pony.muted ? \'Unmute\' : \'Mute\'}}" ng-class="{ \'btn-danger\': vm.pony.muted }" class="btn btn-xs btn-default"><i class="fa fa-microphone-slash"></i></button><button ng-click="vm.toggleShadow()" uib-tooltip="{{vm.pony.shadow ? \'Unshadow\' : \'Shadow\'}}" ng-class="{ \'btn-danger\': vm.pony.shadow }" class="btn btn-xs btn-default"><i class="fa fa-eye-slash"></i></button></div></div><div class="pony-box-avatar"><canvas width="100" height="100"></canvas><div class="pony-box-avatar-cover"></div></div></div>',
        n.exports
  });
  System.registerDynamic("97", ["50", "20", "51", "21", "98", "2b", "2c", "39", "96"], !0, function(t, e, n) {
    "use strict";
    var r = t("50"),
        i = t("20"),
        o = t("51"),
        a = t("21"),
        s = t("98"),
        u = t("2b"),
        l = t("2c"),
        c = t("39"),
        f = t("96"),
        p = u.default.game,
        h = 3,
        d = 100,
        m = Math.ceil(d / h),
        g = function() {
          function t(t, e) {
            this.model = e,
                this.timeouts = i.TIMEOUTS,
                this.canvas = t.find("canvas")[0],
                this.buffer = a.createCanvas(m, m)
          }

          return Object.defineProperty(t.prototype, "isMod", {
            get: function() {
              return s.isMod(this.model.account)
            },
            enumerable: !0,
            configurable: !0
          }),
              Object.defineProperty(t.prototype, "hasTimeout", {
                get: function() {
                  return new Date(this.pony.timeout) > new Date
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "timeoutTooltip", {
                get: function() {
                  return this.hasTimeout ? r(this.pony.timeout).fromNow(!0) : "Timeout"
                },
                enumerable: !0,
                configurable: !0
              }),
              t.prototype.$onChanges = function(t) {
                if (t.pony) {
                  this.name = l.replaceEmotes(this.pony.name),
                      this.site = this.pony.site ? l.toSocialSiteInfo(this.pony.site) : null;
                  var e = this.canvas.getContext("2d");
                  if (e.save(),
                          e.fillStyle = "#444",
                          e.fillRect(0, 0, this.canvas.width, this.canvas.height),
                          this.pony) {
                    var n = new c.ContextSpriteBatch(this.buffer);
                    n.clear(),
                        n.start(),
                        this.pony.drawHead2(n, 25, 54),
                        n.end(),
                        a.disableImageSmoothing(e),
                        e.scale(-h, h),
                        e.drawImage(this.buffer, -m, 0)
                  }
                  e.restore()
                }
              },
              t.prototype.report = function() {
                this.isMod && this.modAction(o.ModAction.Report)
              },
              t.prototype.timeout = function(t) {
                var e = this;
                this.isMod && this.modAction(o.ModAction.Timeout, t).then(function() {
                  return e.pony.timeout = a.fromNow(t).toISOString()
                })
              },
              t.prototype.toggleIgnore = function() {
                this.playerAction(this.pony.ignored ? o.PlayerAction.Unignore : o.PlayerAction.Ignore),
                    this.pony.ignored = !this.pony.ignored
              },
              t.prototype.toggleMute = function() {
                var t = this;
                this.isMod && this.modAction(this.pony.muted ? o.ModAction.Unmute : o.ModAction.Mute).then(function() {
                  return t.pony.muted = !t.pony.muted
                })
              },
              t.prototype.toggleShadow = function() {
                var t = this;
                this.isMod && this.modAction(this.pony.shadow ? o.ModAction.Unshadow : o.ModAction.Shadow).then(function() {
                  return t.pony.shadow = !t.pony.shadow
                })
              },
              t.prototype.blur = function() {
                this.isMod && (p.socket.server.setNote(this.pony.id, this.pony.note),
                    this.isNoteOpen = !1)
              },
              t.prototype.keydown = function(t) {
                27 === t.keyCode && this.blur()
              },
              t.prototype.playerAction = function(t) {
                p.socket.server.playerAction(this.pony.id, t)
              },
              t.prototype.modAction = function(t, e) {
                return void 0 === e && (e = 0),
                    p.socket.server.modAction(this.pony.id, t, e)
              },
              t.$inject = ["$element", "model"],
              t
        }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          bindings: {
            pony: "<"
          },
          controller: g,
          controllerAs: "vm",
          template: f
        },
        n.exports
  });
  System.registerDynamic("99", [getCodeName("BlueBird"), "50", "2d", "2f", "31", "33", "34", "36", "38", "3b", "3d", "3e", "3f", "44", "46", "48", "4a", "4c", "4e", "97"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      t.run(["$rootScope", function(t) {
        i.setScheduler && i.setScheduler(function(e) {
          t.$evalAsync(e)
        })
      }]),
          t.config(["$uibTooltipProvider", function(t) {
            t.options({
              appendToBody: !0
            })
          }]),
          t.filter("fromNow", function() {
            var t = function(t, e) {
              return o(t).fromNow(e)
            };
            return t.$stateful = !0,
                t
          }),
          t.service("gameService", a.GameService),
          t.service("model", s.Model),
          t.service("applyCallback", ["$rootScope", function(t) {
            return function(e) {
              t.$$phase ? e() : t.$apply(e)
            }
          }]),
          t.directive("agDrag", u.default),
          t.directive("agAutoFocus", function() {
            return {
              restrict: "A",
              link: function(t, e) {
                setTimeout(function() {
                  return e[0].focus()
                }, 100)
              }
            }
          }),
          t.directive("a", function() {
            return {
              restrict: "E",
              link: function(t, e, n) {
                !n.target && n.href && /^https?:/.test(n.href) && (e[0].setAttribute("target", "_blank"),
                    e[0].setAttribute("rel", "noopener noreferrer"))
              }
            }
          }),
          t.directive("fixToTop", ["$parse", function(t) {
            return {
              restrict: "A",
              link: function(e, n, r) {
                function i() {
                  var t = n[0].getBoundingClientRect().top;
                  s !== t < o && (s = t < o,
                      s ? n.addClass("fixed-to-top") : n.removeClass("fixed-to-top"),
                  a && e.$apply(function() {
                    return a(e, {
                      fixed: s
                    })
                  }))
                }

                var o = r.fixToTopOffset ? +r.fixToTopOffset : 0,
                    a = r.fixToTop ? t(r.fixToTop) : null,
                    s = !1;
                window.addEventListener("scroll", i),
                    e.$on("$destroy", function() {
                      return window.removeEventListener("scroll", i)
                    })
              }
            }
          }]),
          t.component("colorPicker", l.default),
          t.component("checkBox", c.default),
          t.component("fillOutline", f.default),
          t.component("spriteBox", p.default),
          t.component("spriteSelection", h.default),
          t.component("spriteSetSelection", d.default),
          t.component("bitmapBox", m.default),
          t.component("characterPreview", g.default),
          t.component("chatBox", v.default),
          t.component("settingsBox", y.default),
          t.component("accountButton", b.default),
          t.component("menuBar", _.menuBar),
          t.component("menuItem", _.menuItem),
          t.component("signInBox", w.default),
          t.component("playBox", x.default),
          t.component("ponyBox", $.default)
    }

    var i = t(getCodeName("BlueBird")),
        o = t("50"),
        a = t("2d"),
        s = t("2f"),
        u = t("31"),
        l = t("33"),
        c = t("34"),
        f = t("36"),
        p = t("38"),
        h = t("3b"),
        d = t("3d"),
        m = t("3e"),
        g = t("3f"),
        v = t("44"),
        y = t("46"),
        b = t("48"),
        _ = t("4a"),
        w = t("4c"),
        x = t("4e"),
        $ = t("97");
    return e.init = r,
        n.exports
  });
  System.registerDynamic("9a", [], !0, function(t, e, n) {
    return n.exports = '<div ng-init="vm.init()" class="app"><div ng-style="{ display: vm.playing ? \'block\' : \'none\' }" class="app-game"><canvas id="canvas"></canvas><span id="stats"></span><settings-box></settings-box><chat-box></chat-box><pony-box id="pony-box" pony="vm.selected" ng-if="vm.selected"></pony-box><div id="touch-origin"></div><div id="touch-position"></div></div><div ng-if="!vm.playing" class="app-cover"><div class="container"><menu-bar logo="true" model="vm.model"><menu-item href="/" name="Home"></menu-item><menu-item href="/about" name="About"></menu-item><menu-item href="/character" name="Characters" ng-if="vm.model.account"></menu-item></menu-bar><div><div ng-view class="app-view"></div></div><footer class="app-footer clearfix"><div class="pull-left text-muted text-nowrap">version <b>0.16.2-alpha</b></div><div class="pull-right text-muted text-nowrap">&copy; 2016 <a href="https://twitter.com/Agamnentzar" class="text-muted">Agamnentzar</a> | <a href="http://agamnentzar.deviantart.com/" title="DeviantArt" class="text-muted"><i class="fa fa-fw fa-deviantart"></i></a><a href="http://agamnentzar.tumblr.com/" title="Tumblr" class="text-muted"><i class="fa fa-fw fa-tumblr"></i></a><a href="https://twitter.com/Agamnentzar" title="Twitter" class="text-muted"><i class="fa fa-fw fa-twitter"></i></a><a href="https://github.com/Agamnentzar" title="Github" class="text-muted"><i class="fa fa-fw fa-github"></i></a> <a href="mailto:agamnentzar&#64;gmail.com" target="_blank" title="Email" class="text-muted"><i class="fa fa-fw fa-envelope"></i></a></div></footer></div></div></div>',
        n.exports
  });
  System.registerDynamic("98", [getCodeName("Lodash")], !0, function(t, e, n) {
    "use strict";

    function r(t, e) {
      return t && s.includes(t.roles, e)
    }

    function i(t) {
      return r(t, "admin") || r(t, "superadmin")
    }

    function o(t) {
      return r(t, "mod") || i(t)
    }

    function a(t) {
      return r(t, "dev")
    }

    var s = t(getCodeName("Lodash"));
    return e.hasRole = r,
        e.isAdmin = i,
        e.isMod = o,
        e.isDev = a,
        n.exports
  });
  System.registerDynamic("42", ["1e", "94"], !0, function(t, e, n) {
    "use strict";

    function r() {
      return i || (i = a.loadSpriteSheets(o.spriteSheets, "/images/").then(a.createSpriteUtils))
    }

    var i, o = t("1e"),
        a = t("94");
    return e.loadSpriteSheets = r,
        n.exports
  });
  System.registerDynamic("95", [], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      if (a)
        return a[t];
      try {
        return localStorage.getItem(t)
      } catch (t) {
        return
      }
    }

    function i(t, e) {
      try {
        localStorage.setItem(t, e),
            a = null
      } catch (n) {
        a || (a = {}),
            a[t] = e
      }
    }

    function o(t) {
      if (a)
        delete a[t];
      else
        try {
          localStorage.removeItem(t)
        } catch (t) {}
    }

    var a = null;
    return e.getItem = r,
        e.setItem = i,
        e.removeItem = o,
        n.exports
  });
  System.registerDynamic("9b", ["21", "2c"], !0, function(t, e, n) {
    "use strict";
    var r = t("21"),
        i = t("2c"),
        o = " ".charCodeAt(0),
        a = "\t".charCodeAt(0),
        s = "?".charCodeAt(0),
        u = "\n".charCodeAt(0),
        l = "\r".charCodeAt(0),
        c = function() {
          function t(t) {
            var e = this;
            this.lineSpacing = 2,
                this.characterSpacing = 1,
                this.chars = new Map,
                this.emotePictures = new Map,
                t.forEach(function(t) {
                  t && e.chars.set(t.code, t.sprite)
                });
            var n = this.chars.get(0),
                r = 3;
            this.height = n.h,
                this.chars.set(o, {
                  x: 0,
                  y: 0,
                  w: r,
                  h: n.h,
                  ox: 0,
                  oy: 0
                }),
                this.chars.set(a, {
                  x: 0,
                  y: 0,
                  w: 4 * r,
                  h: n.h,
                  ox: 0,
                  oy: 0
                })
          }

          return t.prototype.getChar = function(t) {
            return this.chars.get(t) || this.chars.get(s)
          },
              t.prototype.forEachChar = function(t, e) {
                t = i.replaceEmotes(t);
                for (var n = 0; n < t.length; n++) {
                  var o = n,
                      a = t.charCodeAt(n);
                  r.isSurrogate(a) && n + 1 < t.length && (a = r.fromSurrogate(a, t.charCodeAt(n + 1)),
                      n++),
                      console,
                  a !== l && e(a, o)
                }
              },
              t.prototype.addEmoticon = function(t, e) {
                var n = t.charCodeAt(0);
                r.isSurrogate(n) && t.length > 1 && (n = r.fromSurrogate(n, t.charCodeAt(1))),
                e && this.emotePictures.set(n, e)
              },
              t.prototype.measureChar = function(t) {
                return (this.emotePictures.get(t) || this.getChar(t)).w
              },
              t.prototype.drawChar = function(t, e, n, r, i) {
                var o = this.emotePictures.get(e);
                if (o)
                  return t.drawSprite(o, null, r, i - 1),
                      o.w;
                var a = this.getChar(e);
                return t.drawSprite(a, n, r, i),
                    a.w
              },
              t.prototype.measureText = function(t) {
                var e = this,
                    n = 0,
                    r = 1,
                    i = 0;
                return this.forEachChar(t, function(t) {
                  t === u ? (n = Math.max(n, i),
                      i = 0,
                      r++) : (i && (i += e.characterSpacing),
                      i += e.measureChar(t))
                }), {
                  w: Math.max(n, i),
                  h: r * this.height + (r - 1) * this.lineSpacing
                }
              },
              t.prototype.drawText = function(t, e, n, r, i) {
                var o = this;
                r = Math.round(r),
                    i = Math.round(i);
                var a = r;
                this.forEachChar(e, function(e) {
                  e === u ? (a = r,
                      i += o.height + o.lineSpacing) : a += o.drawChar(t, e, n, a, i) + o.characterSpacing
                })
              },
              t.prototype.drawTextJumping = function(t, e, n, r, i, o) {
                var a = this;
                r = Math.round(r),
                    i = Math.round(i);
                var s = r;
                this.forEachChar(e, function(e, l) {
                  e === u ? (s = r,
                      i += a.height + a.lineSpacing) : s += a.drawChar(t, e, n, s, o && o.indexOf(l) !== -1 ? i - 1 : i) + a.characterSpacing
                })
              },
              t.prototype.drawTextAligned = function(t, e, n, r, i, o) {
                void 0 === i && (i = "left"),
                void 0 === o && (o = "top");
                var a = r.x,
                    s = r.y;
                if ("left" !== i || "top" !== o) {
                  var u = this.measureText(e);
                  "left" !== i && (a += "center" === i ? (r.w - u.w) / 2 : r.w - u.w),
                  "top" !== o && (s += "middle" === o ? (r.h - u.h) / 2 : r.h - u.h)
                }
                this.drawText(t, e, n, a, s)
              },
              t
        }();
    return e.SpriteFont = c,
        n.exports
  });
  System.registerDynamic("94", [getCodeName("BlueBird"), "21", "9b", "1e", "2c"], !0, function(t, e, n) {
    "use strict";

    function r() {
      e.font = new d.SpriteFont(m.font),
          g.emotes.forEach(function(t) {
            return e.font.addEmoticon(t.symbol, t.sprite)
          })
    }

    function i(t, e) {
      var n = Object.keys(t).reduce(function(e, n) {
        var r = t[n];
        if (r) {
          var i = e[r.src] || [];
          i.push(r),
              e[r.src] = i
        }
        return e
      }, {});
      return p.map(Object.keys(n), function(t) {
        return h.loadImage(e + t).then(function(e) {
          return n[t].forEach(function(t) {
            return t.img = e
          })
        })
      })
    }

    function o(t, e) {
      return h.loadImage(e + t.src).then(function(e) {
        t.img = e,
            t.sprites.filter(function(t) {
              return !!t
            }).forEach(function(t) {
              return t.img = e
            })
      })
    }

    function a(t, e) {
      return p.map(t, function(t) {
        return o(t, e)
      }).then(function() {})
    }

    function s(t, e, n, r, i, o, a, s, u, l) {
      e && t.drawImage(e, n, r, i, o, a, s, u, l)
    }

    function u(t, e, n, r) {
      e && e.w && e.h && s(t, e.img, e.x, e.y, e.w, e.h, n + e.ox, r + e.oy, e.w, e.h)
    }

    function l(t, e) {
      return v = v || h.createCanvas(t, e),
      (v.width < t || v.height < e) && (v.width = Math.max(v.width, t),
          v.height = Math.max(v.height, e)),
          v.getContext("2d")
    }

    function c(t, e, n, r, i, o, a, s, u, c, f, p) {
      if (void 0 === p && (p = 1),
              e) {
        var h = l(o, a);
        h.fillStyle = "#" + n.toHexRGB(),
            h.globalCompositeOperation = "source-over",
            h.fillRect(0, 0, o, a),
            h.globalCompositeOperation = "destination-in",
            h.drawImage(e, r, i, o, a, 0, 0, o, a),
            h.globalCompositeOperation = "multiply",
            h.drawImage(e, r, i, o, a, 0, 0, o, a);
        var d = t.globalAlpha;
        t.globalAlpha = d * n.a * p,
            t.drawImage(h.canvas, 0, 0, o, a, s, u, c, f),
            t.globalAlpha = d
      }
    }

    function f(t, e, n, r, i, o) {
      void 0 === o && (o = 1),
      e && c(t, e.img, n, e.x, e.y, e.w, e.h, r + e.ox, i + e.oy, e.w, e.h, o)
    }

    var p = t(getCodeName("BlueBird")),
        h = t("21"),
        d = t("9b"),
        m = t("1e"),
        g = t("2c");
    e.createSpriteUtils = r,
        e.loadSprites = i,
        e.loadSpriteSheets = a,
        e.drawImage = s,
        e.drawSprite = u;
    var v;
    return e.drawColoredImage = c,
        e.drawColoredSprite = f,
        n.exports
  });
  System.registerDynamic("39", ["21", "23", "20", "1e", "94"], !0, function(t, e, n) {
    "use strict";

    function r(t, e, n, r, i, o, a) {
      if (e.h && e.w) {
        var s = Math.min(e.w, o),
            u = Math.min(e.h, a);
        t.drawImage(e.tex || e.img, n, e.x, e.y, s, u, r, i, o, a)
      }
    }

    function i(t, e, n, i, o, a, s) {
      var u = e.border,
          l = i + a - u,
          c = o + s - u,
          f = a - 2 * u,
          p = s - 2 * u;
      t.drawSprite(e.topLeft, n, i, o),
          t.drawSprite(e.topRight, n, l, o),
          t.drawSprite(e.bottomLeft, n, i, c),
          t.drawSprite(e.bottomRight, n, l, c),
          r(t, e.top, n, i + u, o, f, u),
          r(t, e.left, n, i, o + u, u, p),
          r(t, e.bg, n, i + u, o + u, f, p),
          r(t, e.right, n, i + a - u, o + u, u, p),
          r(t, e.bottom, n, i + u, o + s - u, f, u)
    }

    function o(t, e, n, r, o) {
      var a = e.message,
          s = e.type,
          h = e.timer;
      if (p.font) {
        var d = p.font.measureText(a);
        if (u.intersect(0, 0, o.w, o.h, n - d.w / 2, r - d.h / 2, d.w, d.h)) {
          var m = .2,
              g = (c.SAYS_TIME - h) / m,
              v = h / m,
              y = [3, 2, 1, 0, -1, 0],
              b = [-4, -3, -2, -1],
              _ = g * y.length,
              w = v * b.length,
              x = u.clamp(Math.round(_), 0, y.length - 1),
              $ = u.clamp(Math.round(w), 0, b.length);
          r += $ < b.length ? b[$] : y[x];
          var E = Math.min(g, v, 1),
              S = 4,
              M = n - Math.round(d.w / 2),
              T = r - d.h;
          t.globalAlpha = .6 * E,
              i(t, f.bubble, l.BLACK, M - S, T - S, d.w + 2 * S, d.h + 2 * S),
              t.drawSprite(f.nipple, l.BLACK, n - Math.round(f.nipple.w / 2), r + S),
              t.globalAlpha = E,
              p.font.drawText(t, a, l.getMessageColor(s), M, T),
              t.globalAlpha = 1
        }
      }
    }

    function a(t) {
      if (t && t.width && t.height) {
        if (t instanceof HTMLImageElement) {
          var e = u.createCanvas(t.width, t.height),
              n = e.getContext("2d");
          return n.drawImage(t, 0, 0),
              n.getImageData(0, 0, t.width, t.height)
        }
        return t.getContext("2d").getImageData(0, 0, t.width, t.height)
      }
      return null
    }

    function s(t) {
      if (!t)
        return null;
      var e = t.originalImage || t;
      return e.imageData || (e.imageData = a(e))
    }

    var u = t("21"),
        l = t("23"),
        c = t("20"),
        f = t("1e"),
        p = t("94");
    e.drawSpriteBorder = i,
        e.drawSpeechBaloon = o;
    var h = function() {
      function t(t) {
        this.canvas = t,
            this.pixelSize = 1,
            this.globalAlpha = 1,
            this.transform = null
      }

      return t.prototype.start = function() {
        this.canvas && this.canvas.width && this.canvas.height && (this.data = this.canvas.getContext("2d").getImageData(0, 0, this.canvas.width, this.canvas.height))
      },
          t.prototype.clear = function(t) {
            if (this.data)
              throw new Error("Cannot clean after start");
            var e = this.canvas.getContext("2d");
            t ? (e.fillStyle = t.css(),
                e.fillRect(0, 0, this.canvas.width, this.canvas.height)) : e.clearRect(0, 0, this.canvas.width, this.canvas.height)
          },
          t.prototype.drawSprite = function(t, e, n, r, i) {
            t && this.drawImage(t.tex || t.img, e, n, t.x, t.y, t.w, t.h, r + t.ox, i + t.oy, t.w, t.h)
          },
          t.prototype.drawImage = function(t, e, n, r, i, o, a, u, c, f, p) {
            if (o !== f || a !== p)
              throw new Error("Different dimentions not supported");
            var h = s(t),
                d = this.data;
            if (h && d && n) {
              this.transform && (u = Math.round(u + this.transform[4]),
                  c = Math.round(c + this.transform[5]));
              var m = o,
                  g = a,
                  v = Math.min(0, r, u);
              m += v,
                  u -= v,
                  r -= v;
              var y = Math.min(0, i, c);
              if (g += y,
                      c -= y,
                      i -= y,
                      m += Math.min(0, h.width - (r + m), d.width - (u + m)),
                      g += Math.min(0, h.height - (i + g), d.height - (c + g)), !(m <= 0 && g <= 0))
                for (var b = e || l.WHITE, _ = b.r, w = b.g, x = b.b, $ = b.a, E = this.globalAlpha * $ * 255 | 0, S = n.colors, M = 0; M < g; M++)
                  for (var T = 0; T < m; T++) {
                    var k = 4 * (r + T + (i + M) * h.width),
                        A = h.data[k + 0],
                        C = S[A],
                        D = (255 & C) * E >> 8;
                    if (D) {
                      var O = h.data[k + 1],
                          I = (C >>> 24 & 255) * _ * O >> 16,
                          R = (C >>> 16 & 255) * w * O >> 16,
                          F = (C >>> 8 & 255) * x * O >> 16,
                          P = 4 * (u + T + (c + M) * d.width);
                      if (255 === D)
                        d.data[P + 0] = I,
                            d.data[P + 1] = R,
                            d.data[P + 2] = F,
                            d.data[P + 3] = D;
                      else {
                        var j = 255 - D;
                        d.data[P + 0] = (I * D >> 8) + (d.data[P + 0] * j >> 8),
                            d.data[P + 1] = (R * D >> 8) + (d.data[P + 1] * j >> 8),
                            d.data[P + 2] = (F * D >> 8) + (d.data[P + 2] * j >> 8),
                            d.data[P + 3] = Math.min(255, D + (d.data[P + 3] * j >> 8))
                      }
                    }
                  }
            }
          },
          t.prototype.drawRect = function(t, e, n, r, i) {},
          t.prototype.end = function() {
            this.canvas.getContext("2d").putImageData(this.data, 0, 0),
                this.data = null
          },
          t
    }();
    return e.ContextSpriteBatch = h,
        n.exports
  });
  System.registerDynamic("9c", [getCodeName("Lodash"), "20", "21", "41", "30", "98", "26", "1e", "42", "55", "1f", "95", "39"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      return t && t.fills && t.fills[0]
    }

    var i = t(getCodeName("Lodash")),
        o = t("20"),
        a = t("21"),
        s = t("41"),
        u = t("30"),
        l = t("98"),
        c = t("26"),
        f = t("1e"),
        p = t("42"),
        h = t("55"),
        d = t("1f"),
        m = t("95"),
        g = t("39"),
        v = f.ponNoses[0],
        y = function() {
          function t(t, e, n, r, i) {
            var l = this;
            this.$location = e,
                this.$timeout = n,
                this.gameService = r,
                this.model = i,
                this.tags = [{
                  id: null,
                  name: "no tag"
                }],
                this.maxNameLength = o.PLAYER_NAME_MAX_LENGTH,
                this.state = s.createDefaultPonyState(),
                this.saved = [],
                this.brushType = "brush",
                this.brush = "orange",
                this.horns = f.ponHorns,
                this.manes = f.ponManes,
                this.backManes = f.ponBackManes,
                this.tails = f.ponTails,
                this.facialHair = f.ponFacialHair,
                this.wings = f.ponWings,
                this.headAccessories = f.ponHeadAccessories,
                this.earAccessories = f.ponEarAccessories,
                this.faceAccessories = f.ponFaceAccessories,
                this.neckAccessories = f.ponNeckAccessories,
                this.frontLegAccessories = f.ponFrontLegAccessoriesStand[0],
                this.backLegAccessories = f.ponBackLegAccessoriesStand[0],
                this.frontHooves = [null, [f.ponFetlocksFrontStand[0]]],
                this.backHooves = [null, [f.ponFetlocksBackStand[0]]],
                this.animations = h.animations,
                this.activeAnimation = 0,
                this.muzzles = f.ponNoses.map(function(t) {
                  return {
                    color: t.muzzle,
                    colors: 2,
                    extra: t.mouth,
                    palette: u.DEFAULT_PALETTE
                  }
                }),
                this.freckles = f.ponFreckles.map(function(t) {
                  return t ? {
                    color: t,
                    colors: 2,
                    extra: v.muzzle,
                    palette: u.DEFAULT_PALETTE
                  } : null
                }),
                this.fangs = [null, {
                  color: v.muzzle,
                  colors: 2,
                  extra: v.fangs,
                  palette: u.DEFAULT_PALETTE
                }],
                this.loaded = !1,
                this.playAnimation = !0,
                this.cmSize = o.CM_SIZE,
                this.deleting = !1,
                this.fixed = !1,
                this.nextBlink = 0,
                this.blinkFrames = s.BLINK_FRAMES,
                this.blinkFrame = -1,
                this.handleError = a.errorHandler(this),
                this.destroyed = !1,
                this.savingLocked = !1,
                t.$on("$destroy", function() {
                  return l.destroy()
                }),
                t.$watch("vm.pony.coatOutline", function(t) {
                  var e = [0, 0, c.default.parseWithAlpha(t, 1).toInt()];
                  l.freckles.filter(function(t) {
                    return !!t
                  }).forEach(function(t) {
                    return t.palette = e
                  })
                })
          }

          return Object.defineProperty(t.prototype, "customOutlines", {
            get: function() {
              return this.pony.customOutlines
            },
            enumerable: !0,
            configurable: !0
          }),
              Object.defineProperty(t.prototype, "ponies", {
                get: function() {
                  return this.model.ponies
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "pony", {
                get: function() {
                  return this.model.pony
                },
                set: function(t) {
                  this.model.selectPony(t)
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "activeTab", {
                get: function() {
                  return 0 | parseInt(m.getItem("character-active-tab"), 10)
                },
                set: function(t) {
                  m.setItem("character-active-tab", t)
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "activeAccessoryTab", {
                get: function() {
                  return 0 | parseInt(m.getItem("character-active-accessory-tab"), 10)
                },
                set: function(t) {
                  m.setItem("character-active-accessory-tab", t)
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "baseHairColor", {
                get: function() {
                  return r(this.pony.mane)
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "baseCoatColor", {
                get: function() {
                  return this.pony.coatFill
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "baseHeadAccessoryColor", {
                get: function() {
                  return r(this.pony.headAccessory)
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "baseNeckAccessoryColor", {
                get: function() {
                  return r(this.pony.neckAccessory)
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "baseEarAccessoryColor", {
                get: function() {
                  return r(this.pony.earAccessory)
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "baseFaceAccessoryColor", {
                get: function() {
                  return r(this.pony.faceAccessory)
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "baseFrontLegAccessoryColor", {
                get: function() {
                  return r(this.pony.frontLegAccessory)
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "baseBackLegAccessoryColor", {
                get: function() {
                  return r(this.pony.backLegAccessory)
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "canExport", {
                get: function() {
                  return d.debug
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "sites", {
                get: function() {
                  return this.model.sites
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "site", {
                get: function() {
                  var t = this;
                  return this.sites.find(function(e) {
                        return e.id === t.pony.site
                      }) || this.sites[0]
                },
                set: function(t) {
                  this.pony.site = t.id
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "tag", {
                get: function() {
                  var t = this;
                  return this.tags.find(function(e) {
                        return e.id === t.pony.tag
                      }) || this.tags[0]
                },
                set: function(t) {
                  this.pony.tag = t.id
                },
                enumerable: !0,
                configurable: !0
              }),
              t.prototype.init = function() {
                var t = this;
                if (this.model.accountPromise.then(function(e) {
                      e ? (l.hasRole(e, "mod") && t.tags.push({
                        id: "mod",
                        name: "mod"
                      }),
                      l.hasRole(e, "dev") && t.tags.push({
                        id: "dev",
                        name: "dev"
                      })) : t.$location.url("/")
                    }),
                        d.debug) {
                  var e, n;
                  window.addEventListener("keydown", function(r) {
                    71 === r.keyCode && (n || e || (n = t.pony.backLegAccessory,
                        e = t.pony.frontLegAccessory,
                        t.pony.backLegAccessory = null,
                        t.pony.frontLegAccessory = null))
                  }),
                      window.addEventListener("keyup", function(r) {
                        71 === r.keyCode && (t.pony.backLegAccessory = n,
                            t.pony.frontLegAccessory = e,
                            n = null,
                            e = null)
                      })
                }
                var r = Date.now();
                return p.loadSpriteSheets().then(function() {
                  t.destroyed || (t.loaded = !0,
                      t.interval = setInterval(function() {
                        var e = Date.now();
                        t.update(e - r),
                            r = e
                      }, 1e3 / 24))
                })
              },
              t.prototype.destroy = function() {
                this.destroyed = !0,
                    clearInterval(this.interval)
              },
              t.prototype.update = function(t) {
                var e = Date.now();
                this.state.animation = this.animations[this.activeAnimation],
                this.playAnimation && (this.state.animationFrame = (this.state.animationFrame + 1) % this.state.animation.frames),
                    this.blinkFrame === -1 ? this.nextBlink < e && (this.blinkFrame = 0) : (this.blinkFrame++,
                    this.blinkFrame >= this.blinkFrames.length && (this.nextBlink = e + 2e3 * Math.random() + 3e3,
                        this.blinkFrame = -1)),
                    this.state.blinkFrame = this.blinkFrame === -1 ? 1 : this.blinkFrames[this.blinkFrame]
              },
              t.prototype.clearCM = function() {
                i.fill(this.pony.cm, "")
              },
              t.prototype.eyeColorLockChanged = function(t) {
                t && (this.pony.eyeColorLeft = this.pony.eyeColorRight)
              },
              t.prototype.eyeOpennessChanged = function(t) {
                t && (this.pony.eyeOpennessLeft = this.pony.eyeOpennessRight)
              },
              Object.defineProperty(t.prototype, "canNew", {
                get: function() {
                  return this.ponies.length < o.PONY_LIMIT
                },
                enumerable: !0,
                configurable: !0
              }),
              t.prototype.new = function() {
                this.canNew && (this.deleting = !1,
                    this.pony = u.createDefaultPony())
              },
              t.prototype.select = function(t) {
                t && (this.deleting = !1,
                    this.pony = t)
              },
              Object.defineProperty(t.prototype, "canSave", {
                get: function() {
                  return !(this.model.saving || !this.pony || !this.pony.name || this.savingLocked)
                },
                enumerable: !0,
                configurable: !0
              }),
              t.prototype.save = function() {
                var t = this;
                this.canSave && (this.error = null,
                    this.deleting = !1,
                    this.savingLocked = !0,
                    this.model.savePony(this.pony).catch(this.handleError).finally(function() {
                      return t.$timeout(function() {
                        return t.savingLocked = !1
                      }, 2e3)
                    }))
              },
              Object.defineProperty(t.prototype, "canRevert", {
                get: function() {
                  var t = this;
                  return !!this.pony.id && this.ponies.some(function(e) {
                        return e.id === t.pony.id
                      })
                },
                enumerable: !0,
                configurable: !0
              }),
              t.prototype.revert = function() {
                this.canRevert && this.select(a.findById(this.ponies, this.pony.id))
              },
              Object.defineProperty(t.prototype, "canDelete", {
                get: function() {
                  return !!this.pony.id
                },
                enumerable: !0,
                configurable: !0
              }),
              t.prototype.delete = function() {
                this.canDelete && (this.error = null,
                    this.deleting = !1,
                    this.model.removePony(this.pony).catch(this.handleError))
              },
              Object.defineProperty(t.prototype, "canDuplicate", {
                get: function() {
                  return this.canNew
                },
                enumerable: !0,
                configurable: !0
              }),
              t.prototype.duplicate = function() {
                this.canDuplicate && (this.deleting = !1,
                    this.pony = i.cloneDeep(this.pony),
                    this.pony.name = "",
                    delete this.pony.id)
              },
              t.prototype.export = function(t) {
                var e = 80,
                    n = 80,
                    r = null == t ? this.animations : [this.animations[t]],
                    i = r.reduce(function(t, e) {
                      return t + e.frames
                    }, 0),
                    o = a.createCanvas(e * i, n),
                    l = new g.ContextSpriteBatch(o),
                    c = u.toPalette(this.pony),
                    f = 0;
                l.start(),
                    r.forEach(function(t) {
                      for (var r = 0; r < t.frames; r++,
                          f++) {
                        var i = {
                          animation: t,
                          animationFrame: r,
                          blinkFrame: 1
                        };
                        s.drawPonyGL2(l, c, i, f * e + e / 2, n - 10, {})
                      }
                    }),
                    l.end(),
                    window.open(o.toDataURL())
              },
              t.$inject = ["$scope", "$location", "$timeout", "gameService", "model"],
              t
        }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = y,
        n.exports
  });
  System.registerDynamic("9d", [getCodeName("Lodash"), "20", "2c", "21"], !0, function(t, e, n) {
    "use strict";
    var r = t(getCodeName("Lodash")),
        i = t("20"),
        o = t("2c"),
        a = t("21"),
        s = function() {
          function t(t, e, n) {
            var r = this;
            this.$location = e,
                this.model = n,
                this.nameMinLength = i.ACCOUNT_NAME_MIN_LENGTH,
                this.nameMaxLength = i.ACCOUNT_NAME_MAX_LENGTH,
                this.settings = {},
                this.handleError = a.errorHandler(this),
                t.$watchCollection("[vm.settings.filterSwearWords, vm.settings.filterCyrillic]", function() {
                  return r.saveSettings()
                })
          }

          return t.prototype.init = function() {
            var t = this;
            this.model.accountPromise.then(function(e) {
              e ? (t.settings = r.clone(e.settings),
                  t.sites = e.sites.map(o.toSocialSiteInfo),
                  t.data = {
                    name: e.name
                  }) : t.$location.url("/")
            })
          },
              Object.defineProperty(t.prototype, "canSubmit", {
                get: function() {
                  return this.data && this.data.name && !!this.data.name.trim().length
                },
                enumerable: !0,
                configurable: !0
              }),
              t.prototype.submit = function() {
                this.canSubmit && (this.error = null,
                    this.model.updateAccount(this.data).catch(this.handleError))
              },
              t.prototype.saveSettings = function() {
                this.model.account && !r.isEqual(this.settings, this.model.account.settings) && this.model.saveSettings(this.settings).catch(this.handleError)
              },
              t.$inject = ["$scope", "$location", "model"],
              t
        }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = s,
        n.exports
  });
  System.registerDynamic("2c", [getCodeName("Lodash"), "1e", "1f"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      return t.replace(/:[a-z0-9_]+:/gi, function(t) {
        return e.emotesMap.get(t) || t
      })
    }

    function i(t, e) {
      return void 0 === e && (e = function(t) {
        return s.repeat("*", t.length)
      }),
          t.replace(f, e)
    }

    function o(t) {
      return /[\u0400-\u04FF]/.test(t)
    }

    function a(t) {
      var e = t.id,
          n = t.name,
          r = t.url,
          i = t.provider,
          o = l.oauthProviders.find(function(t) {
            return t.id === i
          });
      return {
        id: e,
        name: n,
        url: r,
        icon: o && o.icon,
        color: o && o.color
      }
    }

    var s = t(getCodeName("Lodash")),
        u = t("1e"),
        l = t("1f");
    e.emotes = [{
      name: "apple",
      symbol: "🍎"
    }, {
      name: "green_apple",
      symbol: "🍏"
    }, {
      name: "heart",
      symbol: "❤"
    }, {
      name: "pumpkin",
      symbol: "🎃"
    }, {
      name: "pizza",
      symbol: "🍕"
    }, {
      name: "rock",
      symbol: "⽯"
    }, {
      name: "face",
      symbol: "ツ"
    }, {
      name: "derp",
      symbol: "シ"
    }, {
      name: "angry",
      symbol: "😠"
    }],
        e.emotesMap = new Map,
        e.emotes.forEach(function(t) {
          var n = u.emotes.find(function(e) {
            return e.name === t.name
          });
          t.sprite = n && n.sprite,
              e.emotesMap.set(":" + t.name + ":", t.symbol)
        }),
        e.replaceEmotes = r;
    var c = ["all?ahu?", "aids", "akbar", "alt ?[+-] ?f4", "anal", "anus", "(bitch)?ass(fuck|hole|hat|licker|wipe)?", "autis(ts?|ms?|tic)", "bitch(e?s)?", "(blow|hoof|foot|hand|rim) ?jobs?", "boners?", "boob(s|ie|ies)?", "buttplugs?", "can[cs]er(s|ous)?", "(horse|mare)?cocks?", "clit(oris)?", "(ctrl|control) ?[+-]? ?w", "cum(s|ming)?", "cumdump(sters?)?", "cunts?", "deepthroat(ing)?", "(horse)?dicks?", "dildos?", "fap(p?ing)?", "foalcon", "(brony|furry?|gay|horse|pony|nigg?er)?fag(s|g?[oi]t(s|ry)?)?", "(brony|furry?|gay|horse|pony|nigg?er|butt|mother)?fu(c|k|cc|ck)(ed|er|ing?|able|face|balls|toy)?", "fck(ed|er|ing)?", "gang ?bang(ed|ing)?", "hitlers?", "(in|self)cest", "jizz(ed|ing)?", "lubed?", "masturbat(e|tion|ing)?", "milfs?", "molest(ation|ing|ed|ia)?", "nazi(s|sm|sts?)?", "negros?", "nigg?as?", "nigg?[e3](rs?|st)?", "norm(y|ies?)", "orgasms?", "org(y|ies)", "piss(ing)?", "penis(es)?", "porno?", "prostitutes?", "(octo|horse|pony)?puss(y|ies)?(juice)?", "raep", "rap(e|ed|es|ing)", "retards?", "sieg ?h[ea]il", "semen", "(anal|butt)?(sex|secks|secs|seks)", "(bull)?shit(s|ting)?", "slut(s|ty)?", "spunk", "(cock)?suck(ing|er)?", "tampon", "tit(s|ty|ties?)?", "tranny", "wank(ing|ers?)?", "whores?", "vaginas?", "vulva"],
        f = new RegExp("\\b(" + c.join("|") + ")\\b", "gi");
    return e.filterBadWords = i,
        e.containsCyrillic = o,
        e.toSocialSiteInfo = a,
        n.exports
  });
  System.registerDynamic("9e", ["2c"], !0, function(t, e, n) {
    "use strict";
    var r = t("2c"),
        i = function() {
          function t() {
            this.emotes = r.emotes
          }

          return t
        }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = i,
        n.exports
  });
  System.registerDynamic("25", [getCodeName("Lodash"), getCodeName("gl-texture2d"), "21"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      t && t.refs && t.refs--
    }

    var i = t(getCodeName("Lodash")),
        o = t(getCodeName("gl-texture2d")),
        a = t("21"),
        s = 256,
        u = 1024;
    e.releasePalette = r;
    var l = function() {
      function t(t) {
        void 0 === t && (t = s),
            this.size = t,
            this.palettes = [],
            this.dirty = [],
            this.dirtyMinY = 0,
            this.dirtyMaxY = -1,
            this.lastX = 0,
            this.lastY = 0,
        "undefined" != typeof window && (window.paletteManager = this)
      }

      return Object.defineProperty(t.prototype, "textureSize", {
        get: function() {
          return this.size
        },
        enumerable: !0,
        configurable: !0
      }),
          Object.defineProperty(t.prototype, "pixelSize", {
            get: function() {
              return 256 / this.size
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.add = function(t) {
            var e = t.map(function(t) {
                  return t >>> 0
                }),
                n = i.find(this.palettes, function(t) {
                  return a.arraysEqual(t.colors, e)
                });
            if (n)
              return n.refs++,
                  n;
            var r = {
              x: 0,
              y: 0,
              u: 0,
              v: 0,
              refs: 1,
              colors: e
            };
            return this.palettes.push(r),
                this.dirty.push(r),
                r
          },
          t.prototype.commit = function(t) {
            if (this.texture || this.initializeTexture(t, this.size),
                    this.dirty.length) {
              if (!this.arrange(this.dirty))
                for (this.cleanupPalettes(); !this.arrange(this.dirty);) {
                  if (!(this.size < u))
                    throw new Error("Exceeded maximum palettes limit");
                  this.initializeTexture(t, 2 * this.size)
                }
              this.updateTexture(),
                  this.dirty = []
            }
          },
          t.prototype.dispose = function() {
            this.texture && (this.texture.dispose(),
                this.texture = null),
                this.size = s,
                this.palettes = [],
                this.resetPalettes()
          },
          t.prototype.resetPalettes = function() {
            this.dirty = this.palettes,
                this.lastX = 0,
                this.lastY = 0
          },
          t.prototype.cleanupPalettes = function() {
            this.palettes = this.palettes.filter(function(t) {
              return t.refs > 0
            }),
                this.resetPalettes()
          },
          t.prototype.initializeTexture = function(t, e) {
            try {
              this.texture ? this.texture.shape = [e, e] : this.texture = o(t, e, e, t.RGBA, t.UNSIGNED_BYTE)
            } catch (t) {
              throw new Error("Failed to create/resize canvas (" + e + "): " + t.stack)
            }
            this.size = e,
                this.resetPalettes()
          },
          t.prototype.arrange = function(t) {
            if (!t)
              return !0;
            for (var e = this.size, n = this.lastX, r = this.lastY, i = -1, o = -1, a = 0; a < t.length; a++) {
              var s = t[a];
              if (e - n < s.colors.length && (n = 0,
                      r++,
                  r >= e))
                return !1;
              s.x = n,
                  s.y = r,
                  s.u = (n + .5) / e,
                  s.v = (r + .5) / e,
                  n += s.colors.length,
                  i = i === -1 ? r : i,
                  o = Math.max(o, r)
            }
            return this.lastX = n,
                this.lastY = r,
                this.dirtyMinY = i,
                this.dirtyMaxY = o, !0
          },
          t.prototype.updateTexture = function() {
            if (!(this.dirtyMinY > this.dirtyMaxY)) {
              for (var t = this.size, e = this.dirtyMaxY - this.dirtyMinY + 1, n = new Uint8Array(t * e * 4), r = this.palettes, i = 0; i < r.length; i++) {
                var o = r[i],
                    a = o.x,
                    s = o.y,
                    u = o.colors;
                if (!(s < this.dirtyMinY || s > this.dirtyMaxY))
                  for (var l = 4 * (a + (s - this.dirtyMinY) * t), c = 0; c < u.length; c++) {
                    var f = u[c];
                    n[l++] = f >> 24 & 255,
                        n[l++] = f >> 16 & 255,
                        n[l++] = f >> 8 & 255,
                        n[l++] = f >> 0 & 255
                  }
              }
              this.texture.bind(),
                  this.texture.gl.texSubImage2D(this.texture.gl.TEXTURE_2D, 0, 0, this.dirtyMinY, t, e, this.texture.format, this.texture.type, n),
                  this.dirtyMinY = 0,
                  this.dirtyMaxY = -1
            }
          },
          t
    }();
    return e.PaletteManager = l,
        n.exports
  });
  System.registerDynamic("37", ["26"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      var e = a.default.parseWithAlpha(t, 1).hsva();
      return e.v *= .7,
          e.s = Math.min(1.3 * e.s, 1),
          a.default.fromHsvaObject(e).css()
    }

    function i(t) {
      return o(t, .8)
    }

    function o(t, e) {
      var n = a.default.parseWithAlpha(t, 1).hsva();
      return n.v *= e,
          a.default.fromHsvaObject(n).css()
    }

    var a = t("26");
    return e.fillToOutline = r,
        e.colorToFar = i,
        e.darkenColor = o,
        n.exports
  });
  System.registerDynamic("30", [getCodeName("Lodash"), "1e", "25", "21", "37", "20", "26"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      return M.mergeWith({}, o(), M.cloneDeep(t), function(t, e) {
        if (null == e)
          return t
      })
    }

    function i(t, e, n) {
      void 0 === e && (e = !0),
      void 0 === n && (n = "gold");
      var r = [n, "dodgerblue", "limegreen", "orchid", "crimson", "aquamarine"],
          i = r.map(C.fillToOutline);
      return {
        type: t,
        pattern: 0,
        fills: r,
        outlines: i,
        lockFills: [e, !1, !1, !1, !1, !1],
        lockOutlines: [!0, !0, !0, !0, !0, !0]
      }
    }

    function o() {
      return {
        id: null,
        name: "",
        site: null,
        tag: null,
        horn: i(0, !0, "red"),
        wings: i(0, !0, "red"),
        frontHooves: i(0, !1, "orange"),
        backHooves: i(0, !1, "orange"),
        mane: i(2, !1),
        backMane: i(1),
        tail: i(1),
        facialHair: i(0),
        headAccessory: i(0, !1, "violet"),
        earAccessory: i(0, !1, "gray"),
        faceAccessory: i(0, !1, "black"),
        neckAccessory: i(0, !1, "violet"),
        frontLegAccessory: i(0, !1, "violet"),
        backLegAccessory: i(0, !1, "violet"),
        lockBackLegAccessory: !0,
        coatFill: "red",
        coatOutline: "darkred",
        lockCoatOutline: !0,
        eyelashes: 0,
        eyeColorLeft: "goldenrod",
        eyeColorRight: "goldenrod",
        eyeWhites: "white",
        eyeOpennessLeft: 1,
        eyeOpennessRight: 1,
        eyeshadow: !1,
        eyeshadowColor: "black",
        lockEyes: !0,
        lockEyeColor: !0,
        fangs: 0,
        muzzle: 0,
        freckles: 0,
        frecklesColor: "darkred",
        cm: M.range(0, D.CM_SIZE * D.CM_SIZE).map(function() {
          return ""
        }),
        cmFlip: !1,
        customOutlines: !1
      }
    }

    function a(t) {
      return t.map(function(t) {
        return t ? t.map(function(t) {
          return t.length;
        }) : [0]
      })
    }

    function s(t) {
      return t ? O.default.parse(t).toHexRGB() : ""
    }

    function u(t) {
      return Object.keys(t).forEach(function(e) {
        null == t[e] && delete t[e]
      }),
          t
    }

    function l(t) {
      return t ? 1 : 0
    }

    function c(t) {
      return !!+t
    }

    function f(t, e) {
      return t.slice(0, e).map(l).join(" ")
    }

    function p(t) {
      return t && t.split ? t.split(" ").map(c) : null
    }

    function h(t, e) {
      return t.slice(0, e).map(s).join(" ")
    }

    function d(t) {
      return t && t.split ? t.split(" ") : null
    }

    function m(t, e, n, r) {
      if (void 0 === n && (n = !0),
          void 0 === r && (r = 0), !t || n && 0 === t.type)
        return null;
      var i = e ? a(e) : null,
          o = Math.max(i ? A.at(A.at(i, t.type), t.pattern) : 6, r);
      return [t.type, t.pattern, h(t.fills, o), h(t.outlines, o), f(t.lockFills, o), f(t.lockOutlines, o)]
    }

    function g(t) {
      return t ? {
        type: t[0],
        pattern: t[1],
        fills: d(t[2]),
        outlines: d(t[3]),
        lockFills: p(t[4]),
        lockOutlines: p(t[5])
      } : null
    }

    function v(t) {
      var e = {
        name: t.name,
        site: t.site,
        tag: t.tag,
        h: m(t.horn, T.ponyHorns),
        w: m(t.wings, T.ponyWings),
        fh: m(t.frontHooves, null),
        bh: m(t.backHooves, null),
        m: m(t.mane, T.ponyManes, !1, 1),
        bm: m(t.backMane, T.ponyBackManes, !1),
        t: m(t.tail, T.ponyTails, !1),
        fac: m(t.facialHair, T.ponyFacialHair),
        ha: m(t.headAccessory, T.ponyHeadAccessories),
        ea: m(t.earAccessory, T.ponyEarAccessories),
        fa: m(t.faceAccessory, T.ponyFaceAccessories),
        na: m(t.neckAccessory, T.ponyNeckAccessories),
        fla: m(t.frontLegAccessory, T.ponyFrontLegAccessoriesStand[0]),
        bla: t.lockBackLegAccessory ? null : m(t.backLegAccessory, T.ponyBackLegAccessoriesStand[0]),
        lbl: l(t.lockBackLegAccessory),
        cf: s(t.coatFill),
        co: s(t.coatOutline),
        lco: l(t.lockCoatOutline),
        el: t.eyelashes,
        ecl: s(t.eyeColorLeft),
        ecr: s(t.eyeColorRight),
        ew: s(t.eyeWhites),
        eol: t.eyeOpennessLeft,
        eor: t.eyeOpennessRight,
        es: l(t.eyeshadow),
        esc: s(t.eyeshadowColor),
        le: l(t.lockEyes),
        lec: l(t.lockEyeColor),
        fan: t.fangs,
        mu: t.muzzle,
        fr: t.freckles,
        frc: t.freckles ? s(t.frecklesColor) : null,
        cm: t.cm && t.cm.some(function(t) {
          return !!t
        }) ? M.dropRightWhile(t.cm.map(s), function(t) {
          return !t
        }) : null,
        cmf: l(t.cmFlip),
        col: l(t.customOutlines)
      };
      return u(e)
    }

    function y(t) {
      var e = {
        id: t.id,
        name: t.name,
        site: t.site,
        tag: t.tag,
        lastUsed: t.lastUsed,
        horn: g(t.h),
        wings: g(t.w),
        frontHooves: g(t.fh),
        backHooves: g(t.bh),
        mane: g(t.m),
        backMane: g(t.bm),
        tail: g(t.t),
        facialHair: g(t.fac),
        headAccessory: g(t.ha),
        earAccessory: g(t.ea),
        faceAccessory: g(t.fa),
        neckAccessory: g(t.na),
        frontLegAccessory: g(t.fla),
        backLegAccessory: g(t.bla),
        lockBackLegAccessory: c(t.lbl),
        coatFill: t.cf,
        coatOutline: t.co,
        lockCoatOutline: c(t.lco),
        eyelashes: t.el,
        eyeColorLeft: t.ecl,
        eyeColorRight: t.ecr,
        eyeWhites: t.ew,
        eyeOpennessLeft: t.eol,
        eyeOpennessRight: t.eor,
        eyeshadow: c(t.es),
        eyeshadowColor: t.esc,
        lockEyes: c(t.le),
        lockEyeColor: c(t.lec),
        fangs: t.fan,
        muzzle: t.mu,
        freckles: t.fr,
        frecklesColor: t.frc,
        cm: t.cm,
        cmFlip: c(t.cmf),
        customOutlines: c(t.col)
      };
      return r(e)
    }

    function b(t, e) {
      for (var n = t || [], r = e || [], i = Math.max(n.length, r.length), o = [], a = 0; a < i; a++)
        o.push(n[a] || "000000"),
            o.push(r[a] || "000000");
      return o
    }

    function _(t) {
      return b(t.fills, t.outlines)
    }

    function w(t) {
      return [0].concat(t.map(O.default.parseFast))
    }

    function x(t, e) {
      var n = t && A.at(e, t.type),
          r = n && A.at(n, t.pattern);
      return r && r.palette
    }

    function $(t, e, n) {
      if (!t)
        return null;
      var r = x(t, e);
      return {
        type: t.type,
        pattern: t.pattern,
        palette: n.add(w(_(t))),
        extraPalette: r ? n.add(r) : null
      }
    }

    function E(t, n) {
      return void 0 === n && (n = e.mockPaletteManager), {
        name: t.name,
        site: t.site,
        tag: t.tag,
        horn: $(t.horn, T.ponHorns, n),
        wings: $(t.wings, T.ponWings, n),
        frontHooves: $(t.frontHooves, [null, [T.ponFetlocksFrontStand[0]]], n),
        backHooves: $(t.backHooves, [null, [T.ponFetlocksBackStand[0]]], n),
        mane: $(t.mane, T.ponManes, n),
        backMane: $(t.backMane, T.ponBackManes, n),
        tail: $(t.tail, T.ponTails, n),
        facialHair: $(t.facialHair, T.ponFacialHair, n),
        headAccessory: $(t.headAccessory, T.ponHeadAccessories, n),
        earAccessory: $(t.earAccessory, T.ponEarAccessories, n),
        faceAccessory: $(t.faceAccessory, T.ponFaceAccessories, n),
        neckAccessory: $(t.neckAccessory, T.ponNeckAccessories, n),
        frontLegAccessory: $(t.frontLegAccessory, T.ponFrontLegAccessoriesStand[0], n),
        backLegAccessory: $(t.lockBackLegAccessory ? t.frontLegAccessory : t.backLegAccessory, T.ponBackLegAccessoriesStand[0], n),
        lockBackLegAccessory: t.lockBackLegAccessory,
        coatPalette: n.add(w([t.coatFill, t.coatOutline])),
        coatFill: null,
        coatOutline: null,
        lockCoatOutline: t.lockCoatOutline,
        eyelashes: t.eyelashes,
        eyePalette: n.add(w([t.eyeWhites, "000000"])),
        eyeColorLeft: n.add(w([t.eyeColorLeft])),
        eyeColorRight: n.add(w([t.eyeColorRight])),
        eyeWhites: null,
        eyeOpennessLeft: t.eyeOpennessLeft,
        eyeOpennessRight: t.eyeOpennessRight,
        eyeshadow: t.eyeshadow,
        eyeshadowColor: n.add(w([t.eyeshadowColor])),
        lockEyes: t.lockEyes,
        lockEyeColor: t.lockEyeColor,
        fangs: t.fangs,
        muzzle: t.muzzle,
        freckles: t.freckles,
        frecklesColor: n.add(w([t.frecklesColor])),
        cm: null,
        cmFlip: t.cmFlip,
        cmPalette: t.cm ? n.add(t.cm.map(function(t) {
          return t ? O.default.parseFast(t) : 0
        })) : null,
        customOutlines: t.customOutlines,
        defaultPalette: n.add(e.DEFAULT_PALETTE)
      }
    }

    function S(t) {
      M.forOwn(t, k.releasePalette)
    }

    var M = t(getCodeName("Lodash")),
        T = t("1e"),
        k = t("25"),
        A = t("21"),
        C = t("37"),
        D = t("20"),
        O = t("26");
    return e.DEFAULT_PALETTE = w(["ffffff", "000000", "721946", "f39f4b"]),
        e.fixPony = r,
        e.createSpriteSet = i,
        e.createDefaultPony = o,
        e.compressPonyInfo = v,
        e.decompressPonyInfo = y,
        e.getColors = b,
        e.toColorList = w,
        e.mockPaletteManager = {
          add: function(t) {
            return {
              colors: t,
              refs: 1,
              x: 0,
              y: 0,
              u: 0,
              v: 0
            }
          }
        },
        e.toPalette = E,
        e.releasePalettes = S,
        n.exports
  });
  System.registerDynamic("20", [], !0, function(t, e, n) {
    "use strict";
    return e.PONY_SPEED_TROT = 4,
        e.PONY_SPEED_WALK = 2,
        e.SAYS_TIME = 6,
        e.REGION_SIZE = 20,
        e.MAP_SIZE = 3,
        e.CM_SIZE = 5,
        e.SAY_MAX_LENGTH = 64,
        e.PLAYER_NAME_MAX_LENGTH = 20,
        e.ACCOUNT_NAME_MIN_LENGTH = 1,
        e.ACCOUNT_NAME_MAX_LENGTH = 32,
        e.PONY_LIMIT = 20,
        e.frameTime = 24,
        e.tileWidth = 32,
        e.tileHeight = 24,
        e.tileCols = 4,
        e.tileRows = 8,
        e.MINUTE = 6e4,
        e.HOUR = 36e5,
        e.TIMEOUTS = [{
          value: 0,
          label: "unmute"
        }, {
          value: 5 * e.MINUTE,
          label: "5 minutes"
        }, {
          value: 10 * e.MINUTE,
          label: "10 minutes"
        }, {
          value: 30 * e.MINUTE,
          label: "30 minutes"
        }, {
          value: 1 * e.HOUR,
          label: "1 hour"
        }, {
          value: 5 * e.HOUR,
          label: "5 hours"
        }, {
          value: 10 * e.HOUR,
          label: "10 hours"
        }, {
          value: 24 * e.HOUR,
          label: "24 hours"
        }],
        n.exports
  });
  System.registerDynamic("21", [getCodeName("BlueBird"), getCodeName("Lodash"), "20"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      return new RegExp("^" + J.escapeRegExp((t || "").trim()) + "$", "i")
    }

    function i(t) {
      var e = new Date;
      return e.setTime(e.getTime() + t),
          e
    }

    function o(t, e) {
      return (t & e) === e
    }

    function a(t, e) {
      return t ? t[s(0 | e, 0, t.length - 1)] : null
    }

    function s(t, e, n) {
      return t > e ? t < n ? t : n : e
    }

    function u(t, e) {
      return t.find(function(t) {
        return t.id === e
      })
    }

    function l(t, e) {
      if (t)
        for (var n = -1;
             (n = t.indexOf(e)) !== -1;)
          t.splice(n, 1)
    }

    function c(t, e) {
      return !!J.remove(t, function(t) {
        return t.id === e
      }).length
    }

    function f(t, e) {
      return t + Math.floor(Math.random() * (e - t))
    }

    function p(t) {
      return t[Math.floor(Math.random() * t.length)]
    }

    function h(t, e) {
      var n = Math.sqrt(t * t + e * e);
      return {
        x: t / n,
        y: e / n
      }
    }

    function d(t, e) {
      if (t.length !== e.length)
        return !1;
      for (var n = 0; n < t.length; n++)
        if (t[n] !== e[n])
          return !1;
      return !0
    }

    function m(t) {
      return t && t.dispose(),
          null
    }

    function g(t) {
      return null == t ? t : t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }

    function v(t, e, n, r) {
      var i = n.x / Q.tileWidth + t,
          o = n.y / Q.tileHeight + e,
          a = n.w / Q.tileWidth,
          s = n.h / Q.tileHeight;
      return r.x > i && r.x < i + a && r.y > o && r.y < o + s
    }

    function y(t, e, n, r, i) {
      var o = n.x + t,
          a = n.y + e,
          s = n.w,
          u = n.h;
      return r > o && r < o + s && i > a && i < a + u
    }

    function b(t, e) {
      return Math.sqrt(t * t + e * e)
    }

    function _(t, e) {
      var n = t.x - e.x,
          r = t.y - e.y;
      return b(n, r)
    }

    function w(t, e) {
      if (!t.bounds || !e.bounds)
        return !1;
      var n = t.x * Q.tileWidth + t.bounds.x,
          r = t.y * Q.tileHeight + t.bounds.y,
          i = e.x * Q.tileWidth + e.bounds.x,
          o = e.y * Q.tileHeight + e.bounds.y;
      return S(n, r, t.bounds.w, t.bounds.h, i, o, e.bounds.w, e.bounds.h)
    }

    function x(t, e) {
      return S(t.x, t.y, t.w, t.h, e.x, e.y, e.w, e.h)
    }

    function $(t, e) {
      var n = Math.min(t.x, e.x),
          r = Math.min(t.y, e.y);
      return {
        x: n,
        y: r,
        w: Math.max(t.x + t.w, e.x + e.w) - n,
        h: Math.max(t.y + t.h, e.y + e.h) - r
      }
    }

    function E(t, e, n, r, i, o) {
      return S(t + n.x, e + n.y, n.w, n.h, r + o.x, i + o.y, o.w, o.h)
    }

    function S(t, e, n, r, i, o, a, s) {
      return t <= i + a && t + n >= i && e <= o + s && e + r >= o
    }

    function M(t) {
      return t >= 55296 && t <= 56319
    }

    function T(t, e) {
      return ((1023 & t) << 10) + (1023 & e) + 65536
    }

    function k(t, e) {
      void 0 === e && (e = !1);
      for (var n = e ? et : tt, r = "", i = 0; i < t; i++)
        r += n[Math.random() * n.length | 0];
      return r
    }

    function A(t, n) {
      return t > 500 && t < 600 ? new Error(e.PROTECTION_ERROR) : 403 === t ? new Error(e.ACCESS_ERROR) : 404 === t ? new Error(e.NOT_FOUND_ERROR) : "string" == typeof n ? new Error(J.truncate(n || e.OFFLINE_ERROR, {
        length: 120
      })) : new Error(n && n.error || e.OFFLINE_ERROR)
    }

    function C(t) {
      var e = t.status,
          n = t.data,
          r = A(e, n);
      throw r.status = e,
          r
    }

    function D(t) {
      return K.resolve(t).catch(C).then(function(t) {
        return t.data
      })
    }

    function O(t) {
      return function(e) {
        t.error = e.message
      }
    }

    function I() {
      return nt || (nt = F(1, 1))
    }

    function R() {
      return "undefined" != typeof window ? window.devicePixelRatio || 1 : 1
    }

    function F(t, e) {
      var n = document.createElement("canvas");
      return n.width = t,
          n.height = e,
          n
    }

    function P(t) {
      return new K(function(e, n) {
        var r = new Image;
        r.addEventListener("load", function() {
          return e(r)
        }),
            r.addEventListener("error", function() {
              return n(new Error("Failed to load image: " + t))
            }),
            r.src = t
      })
    }

    function j(t) {
      "imageSmoothingEnabled" in t ? t.imageSmoothingEnabled = !1 : (t.webkitImageSmoothingEnabled = !1,
          t.mozImageSmoothingEnabled = !1,
          t.msImageSmoothingEnabled = !1)
    }

    function N(t) {
      var e = 3 & t;
      return 2 === e ? Q.PONY_SPEED_TROT : 1 === e ? Q.PONY_SPEED_WALK : 0
    }

    function L(t) {
      var e = rt[(0 | t) % rt.length];
      return {
        x: e[0],
        y: e[1]
      }
    }

    function U(t, e) {
      var n = Math.atan2(t, -e);
      return Math.round((n < 0 ? n + at : n) * st) % rt.length
    }

    function B(t, e, n, r) {
      var i = Math.floor(100 * s(t, 0, 1e5)) | n << 24,
          o = Math.floor(100 * s(e, 0, 1e5)) | r << 24;
      return [i ^ it, o ^ ot]
    }

    function V(t, e) {
      t ^= it,
          e ^= ot;
      var n = (16777215 & t) / 100,
          r = (16777215 & e) / 100,
          i = t >> 24 & 255,
          o = e >> 24 & 255;
      return [n, r, i, o]
    }

    function H(t, e) {
      return !(t < 0) && (t > 0 || e)
    }

    function z(t) {
      var e, n;
      t && (t.set = function() {
        e = t.x,
            n = t.y
      },
          t.tes = function() {
            t.x = e,
                t.y = n
          },
          t.set())
    }

    function Y(t, e) {
      t && ("transform" in t.style ? t.style.transform = e : t.style.webkitTransform = e)
    }

    function q(t) {
      return !!t.pointerType
    }

    function W(t) {
      return !!t.touches
    }

    function G(t) {
      return W(t) ? 0 : t.button
    }

    function X(t) {
      return W(t) ? t.touches[0].pageX : t.pageX
    }

    function Z(t) {
      return W(t) ? t.touches[0].pageY : t.pageY
    }

    var K = t(getCodeName("BlueBird")),
        J = t(getCodeName("Lodash")),
        Q = t("20"),
        tt = "abcdefghijklmnopqrstuvwxyz0123456789_",
        et = tt + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    e.matchString = r,
        e.fromNow = i,
        e.hasFlag = o,
        e.at = a,
        e.clamp = s,
        e.findById = u,
        e.remove = l,
        e.removeById = c,
        e.randomInt = f,
        e.randomItem = p,
        e.normalize = h,
        e.arraysEqual = d,
        e.dispose = m,
        e.encodeHtml = g,
        e.contains = v,
        e.containsPoint = y,
        e.length = b,
        e.distance = _,
        e.entitiesIntersect = w,
        e.rectsIntersect = x,
        e.addRects = $,
        e.collidersIntersect = E,
        e.intersect = S,
        e.isSurrogate = M,
        e.fromSurrogate = T,
        e.randomString = k,
        e.ACCESS_ERROR = "Access denied",
        e.NOT_FOUND_ERROR = "Not found",
        e.OFFLINE_ERROR = "Server is offline",
        e.PROTECTION_ERROR = "DDOS protection error, reload the page to continue",
        e.handleReject = C,
        e.toPromise = D,
        e.errorHandler = O;
    var nt;
    e.getTempCanvas = I,
        e.getPixelRatio = R,
        e.createCanvas = F,
        e.loadImage = P,
        e.disableImageSmoothing = j;
    var rt = [
          [0, -1],
          [.5, -1],
          [1, -1],
          [1, -.5],
          [1, 0],
          [1, .5],
          [1, 1],
          [.5, 1],
          [0, 1],
          [-.5, 1],
          [-1, 1],
          [-1, .5],
          [-1, 0],
          [-1, -.5],
          [-1, -1],
          [-.5, -1]
        ],
        it = 63540507,
        ot = 1026711136,
        at = 2 * Math.PI,
        st = rt.length / at;
    return e.flagsToSpeed = N,
        e.dirToVector = L,
        e.vectorToDir = U,
        e.encodeMovement = B,
        e.decodeMovement = V,
        e.isFacingRight = H,
        e.setupSetTes = z,
        e.setTransform = Y,
        e.isPointer = q,
        e.isTouch = W,
        e.getButton = G,
        e.getX = X,
        e.getY = Z,
        n.exports
  });
  System.registerDynamic("be", [], !0, function(t, e, n) {
    var r = new Int8Array(4),
        i = new Int32Array(r.buffer, 0, 1),
        o = new Float32Array(r.buffer, 0, 1),
        a = function() {};
    return a.intBitsToFloat = function(t) {
      return i[0] = t,
          o[0]
    },
        a.floatToIntBits = function(t) {
          return o[0] = t,
              i[0]
        },
        a.intToFloatColor = function(t) {
          return a.intBitsToFloat(4278190079 & t)
        },
        a.colorToFloat = function(t, e, n, r) {
          var i = r << 24 | n << 16 | e << 8 | t;
          return a.intToFloatColor(i)
        },
        a.isPowerOfTwo = function(t) {
          return 0 === (t & t - 1)
        },
        a.nextPowerOfTwo = function(t) {
          return t--,
              t |= t >> 1,
              t |= t >> 2,
              t |= t >> 4,
              t |= t >> 8,
              t |= t >> 16,
          t + 1
        },
        n.exports = a,
        n.exports
  });
  System.registerDynamic("64", ["be"], !0, function(t, e, n) {
    return n.exports = t("be"),
        n.exports
  });
  System.registerDynamic("26", ["64"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      var e = (0 | t).toString(16);
      return 2 === e.length ? e : "0" + e
    }

    var i = t("64"),
        o = function() {
          function t(t, e, n, r) {
            void 0 === t && (t = 0),
            void 0 === e && (e = 0),
            void 0 === n && (n = 0),
            void 0 === r && (r = 1),
                this.r = 0 | t,
                this.g = 0 | e,
                this.b = 0 | n,
                this.a = +r
          }

          return Object.defineProperty(t.prototype, "floatR", {
            get: function() {
              return this.r / 255
            },
            enumerable: !0,
            configurable: !0
          }),
              Object.defineProperty(t.prototype, "floatG", {
                get: function() {
                  return this.g / 255
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "floatB", {
                get: function() {
                  return this.b / 255
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "floatA", {
                get: function() {
                  return this.a
                },
                enumerable: !0,
                configurable: !0
              }),
              t.prototype.toInt = function() {
                return (this.r << 24 | this.g << 16 | this.b << 8 | 255 * this.a) >>> 0
              },
              t.prototype.toFloat = function(t) {
                return void 0 === t && (t = 1),
                    i.colorToFloat(this.r, this.g, this.b, this.a * t * 255)
              },
              t.prototype.toFloatArray = function() {
                return [this.floatR, this.floatG, this.floatB, this.floatA]
              },
              t.prototype.toHexRGB = function() {
                return r(this.r) + r(this.g) + r(this.b)
              },
              t.prototype.toHexRGBA = function() {
                return r(this.r) + r(this.g) + r(this.b) + r(255 * this.a)
              },
              t.prototype.toRGB = function() {
                return "rgb(" + this.r + "," + this.g + "," + this.b + ")"
              },
              t.prototype.toRGBA = function() {
                return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")"
              },
              t.prototype.complementary = function() {
                var e = this.hsva();
                return e.h += e.h >= 180 ? -180 : 180,
                    t.fromHsvaObject(e)
              },
              t.prototype.css = function() {
                return 1 === this.a ? "#" + this.toHexRGB() : this.toRGBA()
              },
              t.prototype.hsva = function(e) {
                return t.rgb2hsv(this.r, this.g, this.b, this.a, e)
              },
              t.prototype.equal = function(t) {
                return !!t && this.r === t.r && this.g === t.g && this.b === t.b && this.a === t.a
              },
              t.prototype.darken = function(t) {
                this.r *= t,
                    this.g *= t,
                    this.b *= t
              },
              t.compare = function(t, e) {
                if (null === t && null === e)
                  return 0;
                if (null == t || null == e)
                  return 1;
                var n = t.hsva(),
                    r = e.hsva();
                return .25 * (Math.abs(n.h - r.h) / 360) + .25 * Math.abs(n.s - r.s) + .25 * Math.abs(n.v - r.v) + .25 * Math.abs(n.a - r.a)
              },
              t.lerp = function(e, n, r) {
                var i = r,
                    o = 1 - r;
                return new t(e.r * o + n.r * i, e.g * o + n.g * i, e.b * o + n.b * i, e.a * o + n.a * i)
              },
              t.fromHsva = function(e, n, r, i) {
                var o = t.hsv2rgb(e, n, r, i);
                return new t(o.r, o.g, o.b, o.a)
              },
              t.fromHsvaObject = function(e) {
                return t.fromHsva(e.h, e.s, e.v, e.a)
              },
              t.fromInt = function(e) {
                return new t(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (255 & e) / 255)
              },
              t.parseFast = function(e) {
                if ("string" != typeof e)
                  return 0;
                var n = parseInt(e, 16);
                return 6 !== e.length || isNaN(n) || n < 0 ? t.parseWithAlpha(e, 1).toInt() : (n << 8 | 255) >>> 0
              },
              t.parse = function(e) {
                if ("string" != typeof e)
                  return new t(0, 0, 0, 0);
                if (e = e.trim().toLowerCase(),
                    "" === e || "none" === e || "transparent" === e)
                  return new t(0, 0, 0, 0);
                e = t.names[e] || e;
                var n = /(\d+)[ ,]+(\d+)[ ,]+(\d+)(?:[ ,]+(\d*\.?\d+))?/.exec(e);
                if (n)
                  return new t(parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3], 10), n[4] ? parseFloat(n[4]) : 1);
                var r = /[0-9a-f]+/i.exec(e);
                if (r) {
                  var i = r[0];
                  return 3 === i.length ? new t(17 * parseInt(i.charAt(0), 16), 17 * parseInt(i.charAt(1), 16), 17 * parseInt(i.charAt(2), 16)) : new t(parseInt(i.substr(0, 2), 16), parseInt(i.substr(2, 2), 16), parseInt(i.substr(4, 2), 16), i.length >= 8 ? parseInt(i.substr(6, 2), 16) / 255 : 1)
                }
                return new t(0, 0, 0, 1)
              },
              t.parseWithAlpha = function(e, n) {
                var r = t.parse(e);
                return r.a = +n,
                    r
              },
              t.rgb2hex = function(t, e, n, i) {
                return r(t) + r(e) + r(n) + r(255 * i)
              },
              t.rgb2hsv = function(t, e, n, r, i) {
                void 0 === i && (i = 0),
                    t /= 255,
                    e /= 255,
                    n /= 255,
                    i /= 360;
                var o = Math.max(t, e, n),
                    a = Math.min(t, e, n),
                    s = o,
                    u = o - a,
                    l = 0 === o ? 0 : u / o;
                if (o !== a) {
                  switch (o) {
                    case t:
                      i = (e - n) / u + (e < n ? 6 : 0);
                      break;
                    case e:
                      i = (n - t) / u + 2;
                      break;
                    case n:
                      i = (t - e) / u + 4
                  }
                  i /= 6
                }
                return {
                  h: 360 * i,
                  s: l,
                  v: s,
                  a: r
                }
              },
              t.hsv2rgb = function(t, e, n, r) {
                t = Math.max(0, Math.min(360, 360 === t ? 0 : t)),
                    e = Math.max(0, Math.min(1, e)),
                    n = Math.max(0, Math.min(1, n));
                var i = n,
                    o = n,
                    a = n;
                if (0 !== e) {
                  t /= 60;
                  var s = Math.floor(t),
                      u = t - s,
                      l = n * (1 - e),
                      c = n * (1 - e * u),
                      f = n * (1 - e * (1 - u));
                  switch (s) {
                    case 0:
                      i = n,
                          o = f,
                          a = l;
                      break;
                    case 1:
                      i = c,
                          o = n,
                          a = l;
                      break;
                    case 2:
                      i = l,
                          o = n,
                          a = f;
                      break;
                    case 3:
                      i = l,
                          o = c,
                          a = n;
                      break;
                    case 4:
                      i = f,
                          o = l,
                          a = n;
                      break;
                    default:
                      i = n,
                          o = l,
                          a = c
                  }
                }
                return {
                  r: Math.round(255 * i),
                  g: Math.round(255 * o),
                  b: Math.round(255 * a),
                  a: r
                }
              },
              t.h2rgb = function(t) {
                t /= 60;
                var e = 0,
                    n = 0,
                    r = 0,
                    i = Math.floor(t),
                    o = t - i,
                    a = 1 - o,
                    s = 1 - (1 - o);
                switch (i) {
                  case 0:
                    e = 1,
                        n = s;
                    break;
                  case 1:
                    e = a,
                        n = 1;
                    break;
                  case 2:
                    n = 1,
                        r = s;
                    break;
                  case 3:
                    n = a,
                        r = 1;
                    break;
                  case 4:
                    e = s,
                        r = 1;
                    break;
                  default:
                    e = 1,
                        r = a
                }
                return {
                  r: Math.round(255 * e),
                  g: Math.round(255 * n),
                  b: Math.round(255 * r)
                }
              },
              t.random = function() {
                var e = Object.keys(t.names),
                    n = t.names[e[Math.random() * e.length | 0]];
                return t.parse(n)
              },
              t.names = {
                aliceblue: "f0f8ff",
                antiquewhite: "faebd7",
                aqua: "00ffff",
                aquamarine: "7fffd4",
                azure: "f0ffff",
                beige: "f5f5dc",
                bisque: "ffe4c4",
                black: "000000",
                blanchedalmond: "ffebcd",
                blue: "0000ff",
                blueviolet: "8a2be2",
                brown: "a52a2a",
                burlywood: "deb887",
                cadetblue: "5f9ea0",
                chartreuse: "7fff00",
                chocolate: "d2691e",
                coral: "ff7f50",
                cornflowerblue: "6495ed",
                cornsilk: "fff8dc",
                crimson: "dc143c",
                cyan: "00ffff",
                darkblue: "00008b",
                darkcyan: "008b8b",
                darkgoldenrod: "b8860b",
                darkgray: "a9a9a9",
                darkgreen: "006400",
                darkkhaki: "bdb76b",
                darkmagenta: "8b008b",
                darkolivegreen: "556b2f",
                darkorange: "ff8c00",
                darkorchid: "9932cc",
                darkred: "8b0000",
                darksalmon: "e9967a",
                darkseagreen: "8fbc8f",
                darkslateblue: "483d8b",
                darkslategray: "2f4f4f",
                darkturquoise: "00ced1",
                darkviolet: "9400d3",
                deeppink: "ff1493",
                deepskyblue: "00bfff",
                dimgray: "696969",
                dodgerblue: "1e90ff",
                feldspar: "d19275",
                firebrick: "b22222",
                floralwhite: "fffaf0",
                forestgreen: "228b22",
                fuchsia: "ff00ff",
                gainsboro: "dcdcdc",
                ghostwhite: "f8f8ff",
                gold: "ffd700",
                goldenrod: "daa520",
                gray: "808080",
                green: "008000",
                greenyellow: "adff2f",
                honeydew: "f0fff0",
                hotpink: "ff69b4",
                indianred: "cd5c5c",
                indigo: "4b0082",
                ivory: "fffff0",
                khaki: "f0e68c",
                lavender: "e6e6fa",
                lavenderblush: "fff0f5",
                lawngreen: "7cfc00",
                lemonchiffon: "fffacd",
                lightblue: "add8e6",
                lightcoral: "f08080",
                lightcyan: "e0ffff",
                lightgoldenrodyellow: "fafad2",
                lightgrey: "d3d3d3",
                lightgreen: "90ee90",
                lightpink: "ffb6c1",
                lightsalmon: "ffa07a",
                lightseagreen: "20b2aa",
                lightskyblue: "87cefa",
                lightslateblue: "8470ff",
                lightslategray: "778899",
                lightsteelblue: "b0c4de",
                lightyellow: "ffffe0",
                lime: "00ff00",
                limegreen: "32cd32",
                linen: "faf0e6",
                magenta: "ff00ff",
                maroon: "800000",
                mediumaquamarine: "66cdaa",
                mediumblue: "0000cd",
                mediumorchid: "ba55d3",
                mediumpurple: "9370d8",
                mediumseagreen: "3cb371",
                mediumslateblue: "7b68ee",
                mediumspringgreen: "00fa9a",
                mediumturquoise: "48d1cc",
                mediumvioletred: "c71585",
                midnightblue: "191970",
                mintcream: "f5fffa",
                mistyrose: "ffe4e1",
                moccasin: "ffe4b5",
                navajowhite: "ffdead",
                navy: "000080",
                oldlace: "fdf5e6",
                olive: "808000",
                olivedrab: "6b8e23",
                orange: "ffa500",
                orangered: "ff4500",
                orchid: "da70d6",
                palegoldenrod: "eee8aa",
                palegreen: "98fb98",
                paleturquoise: "afeeee",
                palevioletred: "d87093",
                papayawhip: "ffefd5",
                peachpuff: "ffdab9",
                peru: "cd853f",
                pink: "ffc0cb",
                plum: "dda0dd",
                powderblue: "b0e0e6",
                purple: "800080",
                red: "ff0000",
                rosybrown: "bc8f8f",
                royalblue: "4169e1",
                saddlebrown: "8b4513",
                salmon: "fa8072",
                sandybrown: "f4a460",
                seagreen: "2e8b57",
                seashell: "fff5ee",
                sienna: "a0522d",
                silver: "c0c0c0",
                skyblue: "87ceeb",
                slateblue: "6a5acd",
                slategray: "708090",
                snow: "fffafa",
                springgreen: "00ff7f",
                steelblue: "4682b4",
                tan: "d2b48c",
                teal: "008080",
                thistle: "d8bfd8",
                tomato: "ff6347",
                turquoise: "40e0d0",
                violet: "ee82ee",
                violetred: "d02090",
                wheat: "f5deb3",
                white: "ffffff",
                whitesmoke: "f5f5f5",
                yellow: "ffff00",
                yellowgreen: "9acd32"
              },
              t
        }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = o,
        n.exports
  });
  System.registerDynamic("23", ["26"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      return 2 === t ? e.ADMIN_COLOR : 3 === t ? e.MOD_COLOR : 1 === t ? e.SYSTEM_COLOR : e.WHITE
    }

    var i = t("26");
    return e.WHITE = i.default.parse("white"),
        e.BLACK = i.default.parse("black"),
        e.ORANGE = i.default.parse("orange"),
        e.BLUE = i.default.parse("blue"),
        e.GRAY = i.default.parse("#444"),
        e.RED = i.default.parse("red"),
        e.PURPLE = i.default.parse("purple"),
        e.BG_COLOR = i.default.parse("#333"),
        e.ADMIN_COLOR = i.default.parse("HotPink"),
        e.MOD_COLOR = i.default.parse("#b689ff"),
        e.SYSTEM_COLOR = i.default.parse("#999"),
        e.MESSAGE_COLOR = i.default.parse("#333"),
        e.SHADOW_COLOR = new i.default(0, 0, 0, .3),
        e.CLOUD_SHADOW_COLOR = new i.default(0, 0, 0, .2),
        e.SHINES_COLOR = new i.default(255, 255, 255, .4),
        e.FAR_COLOR = i.default.fromHsva(0, 0, .8, 1),
        e.getMessageColor = r,
        n.exports
  });
  System.registerDynamic("c9", [getCodeName("gl-matrix")], !0, function(t, e, n) {
    "use strict";

    function r(t, e, n) {
      return o.mat2d.set(a, 1, 0, Math.tan(n), 1, 0, 0),
          o.mat2d.mul(t, t, a),
          t
    }

    function i(t, e, n) {
      return o.mat2d.set(a, 1, Math.tan(n), 0, 1, 0, 0),
          o.mat2d.mul(t, t, a),
          t
    }

    var o = t(getCodeName("gl-matrix")),
        a = o.mat2d.create();
    return e.skewX = r,
        e.skewY = i,
        n.exports
  });
  System.registerDynamic("ca", [], !0, function(t, e, n) {
    return n.exports = {
      "pony.png": "pony-5f0534a7d2.png",
      "pony2.png": "pony2-92a9914220.png",
      "tiles.png": "tiles-1147a10312.png"
    },
        n.exports
  });
  System.registerDynamic("1e", ["ca"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      return t ? {
        x: t[0],
        y: t[1],
        w: t[2],
        h: t[3],
        ox: t[4],
        oy: t[5],
        src: M
      } : null
    }

    function i(t, e) {
      return {
        x: t,
        y: e
      }
    }

    function o(t, e) {
      return {
        fill: k[t],
        outline: k[e]
      }
    }

    function a(t, e, n) {
      return {
        fill: k[t],
        outline: k[e],
        extra: k[n]
      }
    }

    function s(t, e) {
      return {
        color: k[t],
        shadow: k[e]
      }
    }

    function u(t) {
      return {
        shadow: k[t]
      }
    }

    function l(t, e, n) {
      return {
        mouth: k[t],
        muzzle: k[e],
        fangs: k[n]
      }
    }

    function c(t, e, n, r) {
      return {
        fill: k[t],
        line: k[e],
        iris: k[n],
        lashes: k[r]
      }
    }

    function f(t, e, n, r, i) {
      return {
        stump: k[t],
        trunk: k[e],
        crown: k[n],
        stumpShadow: k[r],
        shadow: k[i]
      }
    }

    function p(t, e, n, r, i, o, a, s, u, l) {
      return {
        border: t,
        topLeft: k[e],
        top: k[n],
        topRight: k[r],
        left: k[i],
        bg: k[o],
        right: k[a],
        bottomLeft: k[s],
        bottom: k[u],
        bottomRight: k[l]
      }
    }

    function h(t, e) {
      return {
        name: t,
        sprite: k[e]
      }
    }

    function d(t) {
      return t ? {
        x: t[0],
        y: t[1],
        w: t[2],
        h: t[3],
        ox: t[4],
        oy: t[5],
        src: T
      } : null
    }

    function m(t, e) {
      return {
        color: A[t],
        colors: e
      }
    }

    function g(t, e) {
      return {
        color: A[t],
        palette: e
      }
    }

    function v(t, e, n, r) {
      return {
        color: A[t],
        colors: e,
        extra: A[n],
        palette: r
      }
    }

    function y(t) {
      return {
        shadow: A[t]
      }
    }

    function b(t, e, n) {
      return {
        color: A[t],
        shadow: A[e],
        palette: n
      }
    }

    function _(t, e, n) {
      return {
        mouth: A[t],
        muzzle: A[e],
        fangs: A[n]
      }
    }

    function w(t, e, n) {
      return {
        normal: A[t],
        lashes: A[e],
        iris: A[n]
      }
    }

    function x(t, e, n, r, i, o) {
      return {
        stump: A[t],
        trunk: A[e],
        crown: A[n],
        stumpShadow: A[r],
        shadow: A[i],
        palette: o
      }
    }

    function $(t, e, n, r, i, o, a, s, u, l) {
      return {
        border: t,
        topLeft: A[e],
        top: A[n],
        topRight: A[r],
        left: A[i],
        bg: A[o],
        right: A[a],
        bottomLeft: A[s],
        bottom: A[u],
        bottomRight: A[l]
      }
    }

    function E(t, e) {
      return {
        frames: t.map(function(t) {
          return A[t]
        }),
        palette: e
      }
    }

    var S = t("ca"),
        M = S["pony.png"],
        T = S["pony2.png"],
        k = [null, [394, 400, 9, 7, 31, 28],
          [360, 414, 12, 6, 29, 30],
          [347, 162, 1, 1, 38, 28], null, [420, 400, 8, 7, 31, 28],
          [372, 414, 12, 6, 29, 30],
          [320, 430, 7, 4, 33, 30],
          [476, 420, 9, 5, 32, 30],
          [438, 414, 9, 6, 31, 29],
          [396, 414, 12, 6, 29, 30],
          [102, 421, 7, 5, 32, 28],
          [511, 163, 1, 1, 40, 30],
          [187, 408, 4, 7, 31, 28],
          [262, 434, 4, 4, 29, 32],
          [494, 414, 7, 6, 33, 28],
          [0, 421, 8, 5, 33, 30],
          [376, 400, 9, 7, 31, 28],
          [360, 414, 12, 6, 29, 30],
          [282, 426, 8, 4, 31, 28], null, [245, 420, 4, 6, 31, 29],
          [506, 430, 6, 4, 29, 32],
          [192, 421, 6, 5, 34, 28],
          [494, 430, 6, 4, 35, 30],
          [394, 400, 9, 7, 31, 28],
          [360, 414, 12, 6, 29, 30],
          [347, 162, 1, 1, 38, 28], null, [420, 400, 8, 7, 31, 28],
          [372, 414, 12, 6, 29, 30],
          [320, 430, 7, 4, 33, 30],
          [476, 420, 9, 5, 32, 30],
          [438, 414, 9, 6, 31, 29],
          [396, 414, 12, 6, 29, 30],
          [102, 421, 7, 5, 32, 28],
          [511, 163, 1, 1, 40, 30],
          [187, 408, 4, 7, 31, 28],
          [262, 434, 4, 4, 29, 32],
          [494, 414, 7, 6, 33, 28],
          [0, 421, 8, 5, 33, 30],
          [376, 400, 9, 7, 31, 28],
          [360, 414, 12, 6, 29, 30],
          [282, 426, 8, 4, 31, 28], null, [245, 420, 4, 6, 31, 29],
          [506, 430, 6, 4, 29, 32],
          [192, 421, 6, 5, 34, 28],
          [494, 430, 6, 4, 35, 30],
          [350, 331, 8, 15, 35, 26],
          [502, 316, 10, 15, 34, 28],
          [291, 168, 2, 1, 37, 26], null, [381, 345, 8, 14, 35, 27],
          [68, 344, 9, 14, 34, 29],
          [347, 372, 8, 11, 35, 26],
          [133, 382, 5, 11, 39, 28],
          [381, 392, 10, 8, 31, 27],
          [326, 392, 12, 8, 30, 28],
          [468, 392, 8, 8, 31, 27],
          [53, 393, 7, 8, 30, 28],
          [508, 414, 4, 6, 37, 29],
          [100, 408, 5, 7, 37, 29],
          [43, 426, 4, 5, 32, 28],
          [30, 426, 5, 5, 31, 29],
          [347, 162, 1, 1, 35, 28],
          [511, 163, 1, 1, 33, 29],
          [242, 434, 4, 4, 32, 29],
          [78, 431, 5, 4, 31, 30],
          [47, 426, 4, 5, 32, 29],
          [159, 401, 5, 7, 31, 29],
          [145, 438, 3, 3, 33, 29],
          [91, 426, 4, 5, 31, 29],
          [46, 438, 4, 3, 32, 31],
          [18, 431, 5, 4, 31, 32],
          [430, 316, 20, 15, 21, 20],
          [91, 295, 22, 17, 20, 19],
          [312, 383, 13, 9, 28, 20],
          [124, 370, 16, 12, 26, 19],
          [317, 346, 20, 13, 21, 22],
          [389, 345, 8, 14, 20, 22],
          [419, 420, 14, 5, 27, 28],
          [503, 169, 6, 1, 27, 33],
          [454, 434, 8, 3, 33, 30],
          [386, 434, 9, 3, 33, 31],
          [390, 316, 20, 15, 21, 20],
          [91, 295, 22, 17, 20, 19],
          [447, 359, 19, 12, 22, 21], null, [206, 328, 12, 15, 21, 20],
          [264, 295, 15, 17, 20, 19],
          [140, 370, 15, 12, 25, 21],
          [273, 317, 15, 15, 26, 19],
          [86, 393, 7, 8, 34, 25],
          [391, 383, 9, 9, 33, 25],
          [450, 316, 20, 15, 21, 20],
          [91, 295, 22, 17, 20, 19],
          [485, 359, 19, 12, 22, 22], null, [86, 344, 3, 11, 21, 24],
          [279, 346, 6, 14, 20, 22],
          [231, 343, 11, 14, 23, 20],
          [240, 328, 11, 15, 24, 19],
          [227, 370, 10, 12, 29, 21],
          [0, 329, 10, 15, 30, 19],
          [214, 392, 7, 9, 34, 23],
          [464, 382, 7, 10, 35, 23],
          [430, 316, 20, 15, 21, 20],
          [91, 295, 22, 17, 20, 19],
          [312, 383, 13, 9, 28, 20],
          [124, 370, 16, 12, 26, 19],
          [317, 346, 20, 13, 21, 22],
          [389, 345, 8, 14, 20, 22],
          [419, 420, 14, 5, 27, 28],
          [503, 169, 6, 1, 27, 33],
          [454, 434, 8, 3, 33, 30],
          [386, 434, 9, 3, 33, 31],
          [390, 316, 20, 15, 21, 20],
          [91, 295, 22, 17, 20, 19],
          [447, 359, 19, 12, 22, 21], null, [206, 328, 12, 15, 21, 20],
          [264, 295, 15, 17, 20, 19],
          [140, 370, 15, 12, 25, 21],
          [273, 317, 15, 15, 26, 19],
          [86, 393, 7, 8, 34, 25],
          [391, 383, 9, 9, 33, 25],
          [450, 316, 20, 15, 21, 20],
          [91, 295, 22, 17, 20, 19],
          [485, 359, 19, 12, 22, 22], null, [86, 344, 3, 11, 21, 24],
          [279, 346, 6, 14, 20, 22],
          [231, 343, 11, 14, 23, 20],
          [240, 328, 11, 15, 24, 19],
          [227, 370, 10, 12, 29, 21],
          [0, 329, 10, 15, 30, 19],
          [214, 392, 7, 9, 34, 23],
          [464, 382, 7, 10, 35, 23],
          [177, 295, 20, 17, 21, 23],
          [294, 241, 22, 21, 20, 22],
          [302, 414, 15, 6, 26, 23],
          [297, 392, 17, 8, 25, 22],
          [170, 343, 13, 14, 21, 25],
          [84, 329, 5, 15, 20, 25],
          [144, 343, 13, 14, 22, 26],
          [182, 370, 12, 12, 22, 31],
          [158, 431, 5, 4, 34, 27],
          [503, 169, 6, 1, 34, 31],
          [216, 421, 6, 5, 35, 26],
          [510, 276, 2, 2, 40, 30],
          [86, 370, 19, 12, 22, 23],
          [444, 331, 21, 14, 21, 22],
          [172, 438, 9, 2, 28, 23],
          [404, 420, 15, 5, 26, 22],
          [267, 414, 18, 6, 22, 24],
          [252, 180, 20, 9, 21, 24],
          [167, 382, 19, 10, 22, 25],
          [277, 392, 20, 8, 22, 28],
          [237, 426, 10, 4, 31, 27],
          [339, 434, 12, 3, 30, 29],
          [221, 440, 4, 2, 37, 29],
          [175, 440, 5, 2, 37, 30],
          [451, 371, 16, 11, 25, 21],
          [86, 357, 18, 13, 24, 20],
          [36, 383, 5, 10, 25, 21],
          [235, 357, 9, 13, 24, 20],
          [86, 382, 7, 11, 27, 21],
          [400, 371, 5, 12, 30, 21],
          [234, 392, 6, 9, 32, 22],
          [368, 132, 6, 10, 33, 22],
          [138, 415, 5, 6, 36, 25],
          [43, 401, 6, 7, 36, 25],
          [406, 359, 21, 12, 21, 21],
          [397, 331, 25, 14, 19, 20],
          [285, 414, 17, 6, 25, 21],
          [256, 392, 21, 8, 23, 20],
          [292, 420, 21, 5, 21, 23],
          [243, 414, 24, 6, 19, 23],
          [267, 408, 21, 6, 21, 26],
          [243, 408, 24, 6, 19, 27],
          [388, 420, 16, 5, 26, 28],
          [334, 420, 19, 5, 24, 29],
          [181, 438, 8, 2, 34, 29],
          [160, 438, 12, 2, 31, 30],
          [427, 359, 20, 12, 28, 20],
          [422, 331, 22, 14, 27, 19],
          [155, 408, 4, 7, 28, 25],
          [271, 144, 5, 10, 27, 23],
          [508, 345, 4, 11, 31, 20],
          [328, 359, 6, 13, 30, 19],
          [167, 392, 8, 9, 35, 22],
          [282, 372, 10, 11, 35, 21],
          [419, 414, 10, 6, 38, 25],
          [349, 392, 11, 8, 38, 24],
          [372, 219, 22, 22, 20, 22],
          [466, 170, 23, 25, 18, 21],
          [403, 400, 9, 7, 33, 22],
          [429, 414, 9, 6, 32, 21],
          [364, 359, 21, 12, 20, 23],
          [272, 332, 19, 14, 18, 22],
          [337, 281, 20, 18, 22, 26],
          [318, 317, 11, 15, 21, 31],
          [413, 434, 9, 3, 33, 29],
          [353, 218, 2, 1, 32, 31],
          [143, 435, 6, 3, 36, 30],
          [279, 438, 6, 2, 34, 31],
          [486, 331, 20, 14, 20, 24],
          [138, 312, 22, 16, 19, 23],
          [89, 415, 6, 6, 34, 25],
          [506, 254, 6, 8, 35, 24],
          [39, 393, 7, 8, 27, 24],
          [263, 382, 8, 10, 27, 23],
          [216, 357, 10, 13, 20, 25],
          [194, 328, 12, 15, 19, 24],
          [163, 408, 4, 7, 24, 32],
          [240, 392, 5, 9, 23, 32],
          [163, 408, 4, 7, 24, 32],
          [240, 392, 5, 9, 23, 32],
          [510, 169, 2, 7, 24, 32],
          [245, 392, 4, 9, 23, 32],
          [286, 420, 3, 6, 25, 32],
          [347, 163, 1, 1, 27, 38],
          [163, 408, 4, 7, 24, 32],
          [240, 392, 5, 9, 23, 32],
          [163, 408, 4, 7, 24, 32],
          [240, 392, 5, 9, 23, 32],
          [163, 408, 4, 7, 24, 32],
          [240, 392, 5, 9, 23, 32],
          [492, 382, 7, 10, 25, 33],
          [237, 370, 9, 12, 24, 32],
          [148, 438, 3, 3, 27, 33],
          [355, 194, 5, 1, 27, 32],
          [429, 382, 7, 10, 25, 33],
          [321, 372, 9, 11, 24, 33],
          [420, 261, 11, 20, 20, 31],
          [480, 240, 13, 22, 19, 30], null, [511, 163, 1, 1, 31, 32],
          [385, 400, 9, 7, 21, 31],
          [337, 383, 11, 9, 20, 30],
          [276, 168, 5, 16, 21, 35],
          [504, 218, 8, 19, 19, 33],
          [59, 426, 4, 5, 20, 46],
          [268, 420, 3, 6, 19, 46],
          [329, 316, 7, 16, 24, 32],
          [507, 195, 5, 16, 27, 33],
          [294, 262, 20, 19, 21, 20],
          [482, 218, 22, 22, 20, 19],
          [312, 383, 13, 9, 28, 20],
          [124, 370, 16, 12, 26, 19],
          [337, 346, 20, 13, 21, 22],
          [389, 345, 8, 14, 20, 22],
          [342, 400, 13, 7, 27, 28],
          [332, 414, 14, 6, 27, 30],
          [320, 430, 7, 4, 33, 30],
          [456, 420, 10, 5, 32, 30],
          [35, 426, 4, 5, 24, 34],
          [133, 415, 5, 6, 23, 35],
          [314, 262, 20, 19, 21, 20],
          [281, 219, 22, 22, 20, 19],
          [197, 295, 19, 17, 22, 21],
          [66, 383, 14, 9, 27, 30],
          [206, 328, 12, 15, 21, 20],
          [264, 295, 15, 17, 20, 19],
          [325, 332, 15, 14, 25, 21],
          [337, 299, 15, 17, 26, 19],
          [175, 392, 8, 9, 33, 25],
          [420, 382, 9, 10, 33, 25],
          [35, 426, 4, 5, 24, 34],
          [133, 415, 5, 6, 23, 35],
          [334, 262, 20, 19, 21, 20],
          [482, 218, 22, 22, 20, 19],
          [466, 359, 19, 12, 22, 22], null, [86, 344, 3, 11, 21, 24],
          [279, 346, 6, 14, 20, 22],
          [231, 343, 11, 14, 23, 20],
          [240, 328, 11, 15, 24, 19],
          [340, 332, 10, 14, 29, 21],
          [419, 299, 11, 17, 29, 19],
          [471, 382, 7, 10, 34, 23],
          [93, 382, 7, 11, 35, 23],
          [35, 426, 4, 5, 24, 34],
          [133, 415, 5, 6, 23, 35],
          [410, 316, 20, 15, 21, 20],
          [135, 295, 22, 17, 20, 19],
          [312, 383, 13, 9, 28, 20],
          [124, 370, 16, 12, 26, 19],
          [337, 346, 20, 13, 21, 22],
          [389, 345, 8, 14, 20, 22],
          [342, 400, 13, 7, 27, 28],
          [332, 414, 14, 6, 27, 30],
          [320, 430, 7, 4, 33, 30],
          [456, 420, 10, 5, 32, 30],
          [370, 316, 20, 15, 21, 20],
          [113, 295, 22, 17, 20, 19],
          [105, 370, 19, 12, 22, 21],
          [511, 163, 1, 1, 40, 30],
          [206, 328, 12, 15, 21, 20],
          [264, 295, 15, 17, 20, 19],
          [325, 332, 15, 14, 25, 21],
          [337, 299, 15, 17, 26, 19],
          [175, 392, 8, 9, 33, 25],
          [420, 382, 9, 10, 33, 25],
          [350, 316, 20, 15, 21, 20],
          [135, 295, 22, 17, 20, 19],
          [466, 359, 19, 12, 22, 22], null, [86, 344, 3, 11, 21, 24],
          [279, 346, 6, 14, 20, 22],
          [231, 343, 11, 14, 23, 20],
          [240, 328, 11, 15, 24, 19],
          [340, 332, 10, 14, 29, 21],
          [419, 299, 11, 17, 29, 19],
          [471, 382, 7, 10, 34, 23],
          [93, 382, 7, 11, 35, 23],
          [354, 241, 22, 20, 21, 23],
          [458, 218, 24, 22, 20, 22],
          [317, 414, 15, 6, 26, 23],
          [297, 392, 17, 8, 25, 22],
          [170, 343, 13, 14, 21, 25],
          [84, 329, 5, 15, 20, 25],
          [183, 343, 13, 14, 22, 26],
          [182, 370, 12, 12, 22, 31],
          [381, 345, 8, 14, 35, 27],
          [59, 344, 9, 14, 34, 29],
          [347, 372, 8, 11, 35, 26],
          [133, 382, 5, 11, 39, 28],
          [443, 382, 7, 10, 25, 33],
          [339, 372, 8, 11, 25, 33],
          [271, 360, 19, 12, 22, 23],
          [465, 331, 21, 14, 21, 22],
          [172, 438, 9, 2, 28, 23],
          [404, 420, 15, 5, 26, 22],
          [267, 414, 18, 6, 22, 24],
          [252, 180, 20, 9, 21, 24],
          [167, 382, 19, 10, 22, 25],
          [277, 392, 20, 8, 22, 28],
          [371, 392, 10, 8, 31, 27],
          [314, 392, 12, 8, 30, 28],
          [508, 414, 4, 6, 37, 29],
          [184, 401, 5, 7, 37, 29],
          [451, 371, 16, 11, 25, 21],
          [86, 357, 18, 13, 24, 20],
          [36, 383, 5, 10, 25, 21],
          [235, 357, 9, 13, 24, 20],
          [86, 382, 7, 11, 27, 21],
          [400, 371, 5, 12, 30, 21],
          [234, 392, 6, 9, 32, 22],
          [368, 132, 6, 10, 33, 22],
          [138, 415, 5, 6, 36, 25],
          [43, 401, 6, 7, 36, 25],
          [385, 359, 21, 12, 21, 21],
          [372, 331, 25, 14, 19, 20],
          [285, 414, 17, 6, 25, 21],
          [256, 392, 21, 8, 23, 20],
          [292, 420, 21, 5, 21, 23],
          [243, 414, 24, 6, 19, 23],
          [267, 408, 21, 6, 21, 26],
          [243, 408, 24, 6, 19, 27],
          [372, 420, 16, 5, 26, 28],
          [353, 420, 19, 5, 24, 29],
          [227, 426, 10, 4, 32, 29],
          [205, 426, 12, 4, 31, 30],
          [427, 359, 20, 12, 28, 20],
          [422, 331, 22, 14, 27, 19],
          [155, 408, 4, 7, 28, 25],
          [271, 144, 5, 10, 27, 23],
          [508, 345, 4, 11, 31, 20],
          [328, 359, 6, 13, 30, 19],
          [167, 392, 8, 9, 35, 22],
          [282, 372, 10, 11, 35, 21],
          [419, 414, 10, 6, 38, 25],
          [349, 392, 11, 8, 38, 24],
          [350, 219, 22, 22, 20, 22],
          [443, 170, 23, 25, 18, 21],
          [403, 400, 9, 7, 33, 22],
          [429, 414, 9, 6, 32, 21],
          [364, 359, 21, 12, 20, 23],
          [272, 332, 19, 14, 18, 22],
          [337, 281, 20, 18, 22, 26],
          [318, 317, 11, 15, 21, 31],
          [395, 434, 9, 3, 33, 29],
          [91, 426, 4, 5, 31, 29],
          [217, 426, 10, 4, 32, 30],
          [247, 426, 9, 4, 31, 32],
          [348, 115, 20, 27, 20, 24],
          [271, 115, 22, 29, 19, 23],
          [89, 415, 6, 6, 34, 25],
          [506, 254, 6, 8, 35, 24],
          [39, 393, 7, 8, 27, 24],
          [263, 382, 8, 10, 27, 23],
          [216, 357, 10, 13, 20, 25],
          [194, 328, 12, 15, 19, 24],
          [276, 168, 5, 16, 21, 35],
          [504, 218, 8, 19, 19, 33],
          [59, 426, 4, 5, 20, 46],
          [268, 420, 3, 6, 19, 46],
          [329, 316, 7, 16, 24, 32],
          [507, 195, 5, 16, 27, 33],
          [148, 382, 5, 11, 39, 35],
          [445, 345, 7, 14, 38, 33],
          [320, 237, 2, 4, 40, 37],
          [163, 426, 3, 5, 38, 37],
          [276, 400, 4, 8, 39, 38],
          [282, 434, 4, 4, 39, 43],
          [181, 426, 3, 5, 41, 35],
          [50, 383, 4, 10, 41, 33],
          [138, 382, 5, 11, 39, 35],
          [445, 345, 7, 14, 38, 33],
          [283, 400, 3, 8, 40, 37], null, [143, 382, 5, 11, 39, 35],
          [487, 345, 7, 14, 38, 33],
          [210, 408, 3, 7, 41, 36],
          [163, 393, 4, 8, 40, 37],
          [158, 382, 5, 11, 39, 35],
          [445, 345, 7, 14, 38, 33],
          [57, 383, 3, 10, 40, 36], null, [153, 382, 5, 11, 39, 35],
          [473, 345, 7, 14, 38, 33],
          [286, 400, 3, 8, 40, 38],
          [63, 383, 3, 10, 40, 37],
          [72, 371, 7, 12, 36, 37],
          [50, 344, 9, 14, 35, 36],
          [369, 407, 5, 7, 36, 40],
          [485, 382, 7, 10, 35, 37],
          [24, 383, 6, 10, 37, 37],
          [213, 440, 4, 2, 36, 46],
          [41, 383, 5, 10, 38, 39],
          [510, 274, 2, 2, 37, 48],
          [280, 400, 3, 8, 40, 41],
          [290, 346, 5, 14, 39, 36],
          [426, 219, 15, 22, 37, 22],
          [276, 144, 17, 24, 36, 21],
          [510, 301, 2, 2, 41, 26],
          [230, 434, 4, 4, 40, 25],
          [429, 437, 5, 3, 42, 22],
          [391, 392, 10, 8, 39, 21],
          [510, 301, 2, 2, 41, 26],
          [230, 434, 4, 4, 40, 25],
          [400, 383, 9, 9, 43, 24],
          [302, 359, 7, 13, 46, 23],
          [295, 359, 7, 13, 44, 25],
          [271, 420, 3, 6, 48, 35],
          [271, 372, 11, 11, 37, 28],
          [159, 357, 12, 13, 36, 28],
          [266, 400, 5, 8, 37, 36],
          [0, 383, 6, 10, 36, 35],
          [100, 382, 7, 11, 40, 33],
          [226, 357, 9, 13, 39, 32],
          [510, 265, 2, 3, 43, 37], null, [113, 415, 5, 6, 42, 33],
          [364, 371, 7, 12, 41, 32],
          [510, 265, 2, 3, 43, 37], null, [505, 371, 7, 11, 40, 33],
          [253, 357, 9, 13, 39, 32],
          [12, 383, 6, 10, 40, 34],
          [18, 371, 8, 12, 39, 33],
          [178, 415, 5, 6, 40, 38],
          [93, 393, 7, 8, 39, 37],
          [35, 313, 10, 16, 37, 29],
          [483, 281, 12, 18, 36, 28],
          [80, 383, 6, 9, 41, 29],
          [50, 371, 8, 12, 40, 28],
          [79, 371, 7, 12, 37, 33],
          [18, 358, 9, 13, 36, 33],
          [103, 328, 14, 15, 30, 35],
          [377, 281, 16, 18, 29, 34],
          [206, 357, 10, 13, 30, 35],
          [229, 328, 11, 15, 29, 34],
          [208, 343, 12, 14, 30, 35],
          [446, 281, 13, 18, 29, 34],
          [118, 343, 13, 14, 30, 36],
          [234, 312, 13, 16, 30, 35],
          [249, 392, 4, 9, 40, 37],
          [65, 371, 7, 12, 38, 36],
          [352, 359, 6, 13, 37, 32],
          [28, 329, 8, 15, 36, 31],
          [135, 408, 4, 7, 39, 32],
          [136, 393, 6, 8, 38, 31],
          [10, 438, 4, 3, 39, 37],
          [422, 430, 6, 4, 38, 36],
          [58, 431, 5, 4, 37, 40],
          [269, 430, 8, 4, 36, 40],
          [458, 430, 6, 4, 37, 41],
          [24, 421, 8, 5, 36, 41],
          [467, 240, 13, 22, 48, 42],
          [496, 145, 15, 24, 47, 41],
          [445, 420, 11, 5, 48, 42],
          [328, 400, 14, 7, 47, 41],
          [212, 382, 11, 10, 48, 44],
          [481, 371, 13, 11, 47, 45],
          [0, 313, 13, 16, 48, 48],
          [178, 312, 15, 16, 47, 49],
          [358, 359, 6, 13, 48, 50],
          [68, 329, 8, 15, 47, 50],
          [281, 241, 13, 22, 48, 42],
          [443, 195, 15, 24, 47, 41],
          [502, 0, 10, 20, 48, 43],
          [347, 158, 1, 2, 47, 47],
          [454, 240, 13, 22, 48, 42],
          [322, 218, 15, 23, 47, 41],
          [502, 20, 10, 20, 48, 44],
          [330, 241, 12, 21, 47, 44],
          [441, 219, 13, 22, 48, 42],
          [496, 145, 15, 24, 47, 41],
          [382, 261, 13, 20, 48, 43], null, [493, 240, 13, 22, 48, 42],
          [496, 121, 15, 24, 47, 41],
          [433, 281, 13, 18, 48, 46],
          [510, 299, 2, 2, 60, 61],
          [253, 343, 11, 14, 48, 42],
          [208, 312, 13, 16, 47, 41],
          [198, 415, 5, 6, 48, 42],
          [471, 414, 8, 6, 47, 41],
          [466, 420, 10, 5, 49, 44],
          [410, 392, 9, 8, 51, 43],
          [199, 392, 8, 9, 49, 47],
          [261, 400, 5, 8, 53, 49],
          [452, 259, 2, 3, 51, 50],
          [280, 420, 3, 6, 50, 49],
          [220, 343, 11, 14, 48, 42],
          [208, 312, 13, 16, 47, 41],
          [234, 382, 10, 10, 48, 44], null, [21, 344, 10, 14, 48, 42],
          [247, 312, 13, 16, 47, 41],
          [338, 392, 11, 8, 48, 45],
          [366, 400, 10, 7, 50, 47],
          [242, 343, 11, 14, 48, 42],
          [221, 312, 13, 16, 47, 41],
          [195, 357, 11, 13, 48, 43],
          [511, 163, 1, 1, 50, 49],
          [0, 344, 11, 14, 48, 42],
          [260, 312, 13, 16, 47, 41],
          [330, 372, 9, 11, 48, 45],
          [511, 163, 1, 1, 55, 48],
          [216, 370, 11, 12, 47, 43],
          [143, 328, 13, 15, 46, 42],
          [370, 383, 11, 9, 47, 43],
          [169, 370, 13, 12, 46, 42],
          [244, 382, 10, 10, 47, 44],
          [355, 400, 11, 7, 46, 48],
          [74, 392, 8, 9, 48, 46],
          [419, 392, 9, 8, 47, 48],
          [101, 415, 6, 6, 49, 47],
          [221, 392, 7, 9, 48, 48],
          [199, 435, 3, 3, 51, 48],
          [477, 425, 5, 5, 49, 48],
          [395, 261, 13, 20, 47, 42],
          [411, 219, 15, 22, 46, 41],
          [433, 420, 12, 5, 47, 42],
          [346, 414, 14, 6, 46, 41],
          [131, 343, 13, 14, 47, 45],
          [193, 312, 15, 16, 46, 45],
          [182, 328, 12, 15, 47, 47],
          [130, 328, 13, 15, 46, 48],
          [436, 382, 7, 10, 47, 49],
          [183, 408, 4, 7, 51, 53],
          [454, 231, 4, 9, 48, 50],
          [46, 383, 4, 10, 47, 50],
          [303, 195, 19, 24, 47, 42],
          [302, 169, 21, 26, 46, 41],
          [484, 262, 14, 19, 52, 42],
          [489, 170, 21, 25, 46, 41],
          [489, 195, 18, 23, 47, 43],
          [347, 158, 1, 2, 46, 47],
          [394, 219, 17, 22, 47, 44],
          [357, 281, 20, 18, 46, 49],
          [354, 261, 14, 20, 48, 46],
          [420, 241, 17, 20, 47, 47],
          [337, 218, 13, 23, 47, 42],
          [496, 96, 16, 25, 46, 41],
          [229, 430, 8, 4, 47, 42],
          [408, 414, 11, 6, 46, 41],
          [325, 383, 12, 9, 47, 44],
          [467, 371, 14, 11, 46, 44],
          [498, 262, 12, 19, 48, 46],
          [367, 299, 14, 17, 47, 48],
          [51, 295, 9, 18, 50, 47],
          [393, 281, 14, 18, 48, 48],
          [283, 420, 3, 6, 50, 48],
          [207, 408, 3, 7, 50, 49],
          [336, 434, 3, 4, 35, 34],
          [452, 245, 2, 4, 28, 34],
          [168, 415, 5, 6, 34, 33],
          [257, 420, 4, 6, 27, 33],
          [452, 253, 2, 3, 35, 35],
          [347, 155, 1, 3, 29, 35],
          [511, 162, 1, 1, 39, 35],
          [511, 162, 1, 1, 26, 35],
          [133, 438, 3, 3, 35, 35],
          [452, 253, 2, 3, 28, 35],
          [422, 425, 5, 5, 34, 34],
          [123, 426, 4, 5, 27, 34],
          [452, 253, 2, 3, 35, 35],
          [347, 155, 1, 3, 29, 35],
          [511, 162, 1, 1, 39, 35],
          [511, 162, 1, 1, 26, 35],
          [256, 440, 3, 2, 35, 36],
          [510, 278, 2, 2, 28, 36],
          [188, 431, 5, 4, 34, 35],
          [314, 434, 4, 4, 27, 35],
          [510, 278, 2, 2, 35, 36],
          [511, 156, 1, 2, 29, 36],
          [511, 162, 1, 1, 39, 35],
          [511, 162, 1, 1, 26, 35],
          [368, 194, 3, 1, 35, 37],
          [291, 168, 2, 1, 28, 37],
          [499, 437, 5, 3, 34, 36],
          [122, 438, 4, 3, 27, 36],
          [291, 168, 2, 1, 35, 37],
          [347, 162, 1, 1, 29, 37],
          [511, 162, 1, 1, 39, 36],
          [511, 162, 1, 1, 26, 36], null, null, [330, 438, 5, 2, 34, 37],
          [233, 440, 4, 2, 27, 37], null, null, [511, 162, 1, 1, 39, 37],
          [511, 162, 1, 1, 26, 37], null, null, [165, 440, 5, 2, 34, 37],
          [205, 440, 4, 2, 27, 37], null, null, [511, 162, 1, 1, 39, 37],
          [511, 162, 1, 1, 26, 37], null, [33, 431, 5, 4, 29, 38],
          [347, 162, 1, 1, 33, 41], null, [352, 425, 5, 5, 29, 38],
          [347, 162, 1, 1, 32, 42], null, [198, 431, 4, 4, 29, 38],
          [347, 162, 1, 1, 32, 42], null, [382, 425, 5, 5, 29, 38],
          [347, 162, 1, 1, 32, 42],
          [510, 305, 2, 1, 31, 42],
          [33, 431, 5, 4, 29, 38],
          [347, 162, 1, 1, 33, 41],
          [86, 355, 3, 2, 31, 41],
          [33, 431, 5, 4, 29, 38],
          [347, 162, 1, 1, 33, 41], null, [113, 431, 5, 4, 29, 38],
          [347, 162, 1, 1, 33, 42],
          [384, 414, 12, 6, 27, 33],
          [501, 414, 7, 6, 29, 33],
          [375, 434, 11, 3, 27, 39],
          [360, 392, 11, 8, 27, 34],
          [347, 162, 1, 1, 36, 40],
          [347, 162, 1, 1, 27, 40],
          [261, 420, 4, 6, 30, 27],
          [100, 393, 6, 8, 29, 25],
          [199, 426, 3, 5, 31, 28],
          [188, 415, 5, 6, 30, 27],
          [479, 414, 8, 6, 38, 48],
          [401, 392, 9, 8, 38, 47],
          [506, 281, 6, 16, 32, 54],
          [329, 300, 8, 16, 31, 55],
          [502, 80, 10, 16, 42, 54],
          [407, 299, 12, 17, 41, 54],
          [160, 312, 18, 16, 31, 41],
          [157, 295, 20, 17, 30, 41],
          [146, 357, 13, 13, 27, 31],
          [487, 316, 15, 15, 26, 30],
          [82, 392, 4, 9, 40, 28],
          [6, 383, 6, 10, 39, 27],
          [131, 426, 4, 5, 27, 28],
          [37, 401, 6, 7, 26, 27],
          [289, 400, 39, 7, 22, 66],
          [271, 383, 41, 9, 21, 65],
          [506, 237, 6, 17, 32, 53],
          [60, 295, 8, 18, 31, 53],
          [368, 115, 6, 17, 34, 53],
          [76, 295, 8, 18, 33, 53],
          [84, 295, 7, 18, 35, 52],
          [303, 281, 9, 19, 34, 52],
          [336, 316, 7, 16, 35, 51],
          [501, 299, 9, 17, 34, 51],
          [358, 331, 7, 15, 35, 51],
          [72, 313, 9, 16, 34, 51],
          [272, 346, 7, 14, 35, 51],
          [10, 329, 9, 15, 34, 51],
          [506, 331, 6, 14, 35, 52],
          [76, 329, 8, 15, 34, 52],
          [309, 359, 7, 13, 34, 53],
          [77, 344, 9, 14, 33, 53],
          [340, 359, 6, 13, 34, 53],
          [397, 345, 8, 14, 33, 53],
          [377, 371, 6, 12, 33, 53],
          [51, 358, 8, 13, 32, 53],
          [114, 382, 7, 11, 31, 52],
          [0, 371, 9, 12, 30, 52],
          [42, 371, 8, 12, 30, 51],
          [11, 344, 10, 14, 29, 50],
          [262, 357, 9, 13, 29, 51],
          [251, 328, 11, 15, 28, 50],
          [430, 299, 11, 17, 27, 51],
          [407, 281, 13, 18, 26, 51],
          [472, 299, 10, 17, 28, 52],
          [459, 281, 12, 18, 27, 52],
          [297, 300, 8, 17, 30, 53],
          [31, 295, 10, 18, 29, 53],
          [104, 357, 15, 13, 42, 51],
          [291, 332, 17, 14, 41, 51],
          [13, 313, 12, 16, 42, 51],
          [381, 299, 14, 17, 41, 51],
          [462, 299, 10, 17, 42, 50],
          [471, 281, 12, 18, 41, 50],
          [305, 300, 8, 17, 42, 49],
          [21, 295, 10, 18, 41, 49],
          [321, 300, 8, 17, 42, 49],
          [11, 295, 10, 18, 41, 49],
          [313, 300, 8, 17, 42, 49],
          [41, 295, 10, 18, 41, 49],
          [68, 295, 8, 18, 42, 50],
          [293, 281, 10, 19, 41, 50],
          [321, 281, 8, 19, 42, 51],
          [502, 40, 10, 20, 41, 51],
          [329, 281, 8, 19, 42, 51],
          [502, 60, 10, 20, 41, 51],
          [312, 281, 9, 19, 42, 51],
          [431, 261, 11, 20, 41, 51],
          [442, 261, 10, 20, 42, 50],
          [342, 241, 12, 21, 41, 50],
          [408, 261, 12, 20, 42, 49],
          [316, 241, 14, 21, 41, 49],
          [281, 263, 12, 19, 42, 49],
          [368, 261, 14, 20, 41, 49],
          [420, 281, 13, 18, 42, 49],
          [469, 262, 15, 19, 41, 49],
          [89, 343, 15, 14, 42, 50],
          [470, 316, 17, 15, 41, 50],
          [357, 346, 15, 13, 42, 51],
          [308, 332, 17, 14, 41, 51],
          [285, 438, 5, 2, 32, 68],
          [224, 438, 7, 2, 31, 69],
          [285, 438, 5, 2, 32, 68],
          [224, 438, 7, 2, 31, 69],
          [249, 438, 6, 2, 34, 68],
          [438, 434, 8, 3, 33, 68],
          [118, 431, 5, 4, 37, 66],
          [130, 421, 7, 5, 36, 66],
          [320, 219, 2, 5, 40, 62],
          [233, 415, 4, 6, 39, 62],
          [320, 219, 2, 5, 40, 61],
          [510, 176, 2, 6, 41, 61],
          [320, 219, 2, 5, 40, 60],
          [510, 176, 2, 6, 41, 60],
          [320, 224, 2, 5, 39, 61],
          [372, 149, 2, 7, 40, 60],
          [320, 224, 2, 5, 39, 61],
          [372, 149, 2, 7, 40, 60],
          [178, 426, 3, 5, 37, 61],
          [183, 415, 5, 6, 36, 61],
          [320, 224, 2, 5, 37, 60],
          [147, 408, 4, 7, 36, 59],
          [66, 438, 4, 3, 32, 60],
          [222, 421, 6, 5, 31, 59],
          [66, 438, 4, 3, 31, 60],
          [440, 430, 6, 4, 30, 60],
          [195, 440, 5, 2, 29, 62],
          [440, 430, 6, 4, 29, 61],
          [185, 440, 5, 2, 27, 66],
          [189, 438, 7, 2, 26, 67],
          [285, 438, 5, 2, 28, 67],
          [217, 438, 7, 2, 27, 68],
          [285, 438, 5, 2, 30, 68],
          [224, 438, 7, 2, 29, 69],
          [249, 438, 6, 2, 46, 68],
          [438, 434, 8, 3, 45, 68],
          [452, 241, 2, 4, 55, 60],
          [233, 415, 4, 6, 54, 59],
          [289, 420, 3, 6, 51, 61],
          [151, 408, 4, 7, 51, 61],
          [143, 431, 5, 4, 47, 63],
          [21, 415, 7, 6, 46, 62],
          [325, 438, 5, 2, 45, 64],
          [476, 430, 6, 4, 45, 63],
          [434, 437, 5, 3, 45, 63],
          [119, 435, 6, 3, 44, 64],
          [464, 430, 6, 4, 44, 62],
          [179, 421, 7, 5, 43, 62],
          [65, 435, 6, 3, 43, 65],
          [253, 430, 8, 4, 42, 65],
          [231, 438, 6, 2, 43, 68],
          [438, 434, 8, 3, 42, 68],
          [231, 438, 6, 2, 43, 68],
          [438, 434, 8, 3, 42, 68],
          [231, 438, 6, 2, 44, 68],
          [438, 434, 8, 3, 43, 68],
          [261, 438, 6, 2, 46, 68],
          [245, 430, 8, 4, 45, 67],
          [5, 438, 5, 3, 48, 66],
          [198, 421, 6, 5, 48, 65],
          [202, 426, 3, 5, 51, 63],
          [509, 407, 3, 7, 52, 62],
          [169, 426, 3, 5, 52, 62],
          [216, 408, 3, 7, 53, 61],
          [175, 426, 3, 5, 54, 59],
          [240, 408, 3, 7, 55, 58],
          [452, 249, 2, 4, 55, 60],
          [237, 415, 4, 6, 54, 59],
          [389, 371, 6, 12, 32, 58],
          [421, 345, 8, 14, 31, 57],
          [271, 440, 3, 2, 35, 58],
          [439, 437, 5, 3, 34, 57],
          [217, 440, 4, 2, 34, 60],
          [125, 435, 6, 3, 33, 59],
          [209, 440, 4, 2, 34, 62],
          [41, 435, 6, 3, 33, 61],
          [295, 438, 5, 2, 33, 64],
          [470, 434, 7, 3, 32, 63],
          [300, 438, 5, 2, 33, 66],
          [484, 434, 7, 3, 32, 65],
          [273, 438, 6, 2, 32, 68],
          [221, 430, 8, 4, 31, 67],
          [316, 359, 6, 13, 32, 57],
          [44, 329, 8, 15, 31, 56],
          [271, 440, 3, 2, 35, 57],
          [379, 437, 5, 3, 34, 56],
          [14, 438, 4, 3, 34, 59],
          [131, 435, 6, 3, 33, 59],
          [209, 440, 4, 2, 34, 62],
          [243, 438, 6, 2, 33, 62],
          [300, 438, 5, 2, 33, 64],
          [203, 438, 7, 2, 32, 64],
          [305, 438, 5, 2, 33, 66],
          [203, 438, 7, 2, 32, 66],
          [273, 438, 6, 2, 32, 68],
          [446, 434, 8, 3, 31, 68],
          [322, 359, 6, 13, 34, 57],
          [60, 329, 8, 15, 33, 56],
          [256, 440, 3, 2, 35, 57],
          [439, 437, 5, 3, 34, 56],
          [18, 438, 4, 3, 35, 59],
          [0, 431, 6, 4, 34, 58],
          [209, 440, 4, 2, 35, 62],
          [41, 435, 6, 3, 34, 61],
          [310, 438, 5, 2, 35, 64],
          [41, 435, 6, 3, 34, 63],
          [305, 438, 5, 2, 35, 66],
          [484, 434, 7, 3, 34, 65],
          [255, 438, 6, 2, 34, 68],
          [205, 430, 8, 4, 33, 67],
          [452, 345, 7, 14, 35, 56],
          [63, 313, 9, 16, 34, 55],
          [130, 438, 3, 3, 35, 56],
          [123, 431, 5, 4, 34, 55],
          [196, 426, 3, 5, 36, 57],
          [357, 425, 5, 5, 35, 57],
          [206, 434, 4, 4, 36, 60],
          [273, 312, 6, 5, 35, 59],
          [290, 434, 4, 4, 37, 62],
          [186, 421, 6, 5, 36, 61],
          [93, 431, 5, 4, 37, 64],
          [428, 430, 6, 4, 36, 64],
          [83, 431, 5, 4, 37, 66],
          [487, 414, 7, 6, 36, 65],
          [58, 371, 7, 12, 35, 55],
          [372, 345, 9, 14, 34, 54],
          [368, 194, 3, 1, 35, 55],
          [315, 438, 5, 2, 34, 54],
          [133, 438, 3, 3, 35, 56],
          [68, 431, 5, 4, 34, 55],
          [327, 434, 3, 4, 36, 58],
          [53, 431, 5, 4, 35, 58],
          [22, 438, 4, 3, 36, 61],
          [446, 430, 6, 4, 35, 60],
          [43, 431, 5, 4, 37, 62],
          [428, 430, 6, 4, 36, 62],
          [26, 438, 4, 3, 38, 64],
          [228, 421, 6, 5, 37, 63],
          [107, 382, 7, 11, 35, 55],
          [0, 358, 9, 13, 34, 54],
          [241, 440, 3, 2, 35, 55],
          [439, 437, 5, 3, 34, 54],
          [136, 438, 3, 3, 35, 56],
          [339, 437, 5, 3, 34, 56],
          [166, 426, 3, 5, 36, 57],
          [357, 425, 5, 5, 35, 57],
          [333, 434, 3, 4, 37, 60],
          [155, 426, 4, 5, 36, 59],
          [159, 426, 4, 5, 37, 61],
          [158, 415, 5, 6, 36, 60],
          [324, 434, 3, 4, 39, 62],
          [118, 415, 5, 6, 38, 61],
          [457, 382, 7, 10, 35, 55],
          [255, 370, 9, 12, 34, 54],
          [350, 218, 3, 1, 36, 55],
          [444, 437, 5, 3, 35, 54],
          [510, 303, 2, 2, 37, 56],
          [320, 438, 5, 2, 35, 56],
          [139, 438, 3, 3, 35, 57],
          [511, 149, 1, 4, 34, 57],
          [344, 437, 5, 3, 35, 59],
          [497, 425, 5, 5, 35, 58],
          [128, 431, 5, 4, 36, 60],
          [158, 415, 5, 6, 36, 59],
          [238, 434, 4, 4, 38, 61],
          [118, 415, 5, 6, 38, 60],
          [121, 382, 6, 11, 35, 55],
          [35, 358, 8, 13, 34, 54],
          [511, 158, 1, 2, 38, 55],
          [73, 431, 5, 4, 35, 54],
          [335, 438, 4, 2, 35, 56],
          [349, 437, 5, 3, 34, 56],
          [253, 440, 3, 2, 35, 58],
          [511, 153, 1, 3, 34, 58],
          [234, 434, 4, 4, 35, 59],
          [340, 425, 6, 5, 34, 59],
          [147, 426, 4, 5, 36, 60],
          [511, 163, 1, 1, 36, 64],
          [193, 426, 3, 5, 38, 61],
          [50, 408, 5, 7, 37, 60],
          [450, 382, 7, 10, 34, 56],
          [9, 371, 9, 12, 33, 55],
          [510, 194, 2, 1, 37, 56],
          [237, 438, 6, 2, 34, 55],
          [414, 437, 5, 3, 34, 57],
          [21, 435, 7, 3, 33, 57],
          [225, 440, 4, 2, 34, 59],
          [510, 274, 2, 2, 33, 60],
          [30, 438, 4, 3, 35, 60],
          [234, 421, 6, 5, 34, 59],
          [103, 426, 4, 5, 36, 60],
          [511, 163, 1, 1, 36, 64],
          [172, 426, 3, 5, 38, 61],
          [50, 408, 5, 7, 37, 60],
          [30, 383, 6, 10, 34, 56],
          [504, 359, 8, 12, 33, 55],
          [347, 162, 1, 1, 36, 56],
          [149, 435, 6, 3, 34, 55],
          [160, 440, 5, 2, 34, 57],
          [0, 435, 7, 3, 33, 57],
          [34, 438, 4, 3, 34, 58],
          [347, 158, 1, 2, 33, 60],
          [302, 434, 4, 4, 34, 59],
          [427, 425, 5, 5, 34, 59],
          [67, 426, 4, 5, 35, 60],
          [457, 425, 5, 5, 35, 60],
          [187, 426, 3, 5, 37, 61],
          [183, 415, 5, 6, 36, 61],
          [18, 383, 6, 10, 33, 55],
          [26, 371, 8, 12, 32, 54],
          [244, 440, 3, 2, 35, 55],
          [500, 430, 6, 4, 33, 54],
          [310, 438, 5, 2, 33, 56],
          [511, 153, 1, 3, 32, 56],
          [38, 438, 4, 3, 33, 58],
          [137, 435, 6, 3, 32, 58],
          [266, 434, 4, 4, 34, 59],
          [347, 158, 1, 2, 33, 61],
          [310, 434, 4, 4, 35, 60],
          [158, 415, 5, 6, 34, 59],
          [324, 434, 3, 4, 36, 61],
          [237, 415, 4, 6, 36, 60],
          [228, 392, 6, 9, 31, 54],
          [355, 372, 8, 11, 30, 53],
          [279, 295, 2, 2, 35, 54],
          [470, 430, 6, 4, 32, 53],
          [42, 438, 4, 3, 32, 54],
          [101, 435, 6, 3, 31, 54],
          [290, 438, 5, 2, 31, 56],
          [196, 438, 7, 2, 30, 56],
          [170, 440, 5, 2, 31, 58],
          [210, 438, 7, 2, 30, 58],
          [384, 437, 5, 3, 31, 59],
          [510, 274, 2, 2, 30, 60],
          [50, 438, 4, 3, 32, 60],
          [222, 421, 6, 5, 31, 59],
          [499, 382, 6, 10, 30, 53],
          [34, 371, 8, 12, 29, 52],
          [54, 438, 4, 3, 32, 53],
          [452, 430, 6, 4, 31, 52],
          [42, 438, 4, 3, 31, 54],
          [101, 435, 6, 3, 30, 54],
          [290, 438, 5, 2, 30, 56],
          [196, 438, 7, 2, 29, 56],
          [180, 440, 5, 2, 30, 58],
          [210, 438, 7, 2, 29, 58],
          [394, 437, 5, 3, 30, 59],
          [347, 158, 1, 2, 29, 60],
          [50, 438, 4, 3, 31, 60],
          [222, 421, 6, 5, 30, 59],
          [478, 382, 7, 10, 29, 54],
          [246, 370, 9, 12, 28, 53],
          [247, 440, 3, 2, 33, 54],
          [108, 431, 5, 4, 32, 53],
          [479, 437, 5, 3, 31, 54],
          [316, 425, 6, 5, 30, 54],
          [179, 435, 5, 3, 30, 56],
          [347, 158, 1, 2, 29, 56],
          [290, 438, 5, 2, 29, 58],
          [196, 438, 7, 2, 28, 58],
          [190, 440, 5, 2, 29, 60],
          [210, 438, 7, 2, 28, 60],
          [389, 437, 5, 3, 29, 61],
          [369, 430, 7, 4, 28, 61],
          [9, 358, 9, 13, 27, 55],
          [218, 328, 11, 15, 26, 54],
          [58, 438, 4, 3, 32, 55],
          [133, 431, 5, 4, 32, 54],
          [62, 438, 4, 3, 31, 57],
          [12, 431, 6, 4, 30, 56],
          [464, 437, 5, 3, 29, 59],
          [498, 434, 7, 3, 28, 59],
          [469, 437, 5, 3, 28, 61],
          [498, 434, 7, 3, 27, 61],
          [77, 435, 6, 3, 27, 63],
          [422, 434, 8, 3, 26, 63],
          [200, 440, 5, 2, 27, 66],
          [397, 430, 7, 4, 26, 65],
          [43, 358, 8, 13, 28, 56],
          [262, 328, 10, 15, 27, 55],
          [250, 440, 3, 2, 33, 56],
          [168, 431, 5, 4, 32, 55],
          [70, 438, 4, 3, 32, 57],
          [89, 435, 6, 3, 31, 57],
          [74, 438, 4, 3, 31, 59],
          [53, 435, 6, 3, 30, 59],
          [184, 435, 5, 3, 30, 61],
          [285, 430, 7, 4, 29, 61],
          [183, 431, 5, 4, 29, 63],
          [299, 430, 7, 4, 28, 63],
          [449, 437, 5, 3, 28, 66],
          [306, 430, 7, 4, 27, 66],
          [67, 358, 7, 13, 30, 57],
          [19, 329, 9, 15, 29, 56],
          [154, 438, 3, 3, 34, 57],
          [153, 431, 5, 4, 33, 56],
          [78, 438, 4, 3, 33, 59],
          [47, 435, 6, 3, 32, 59],
          [184, 435, 5, 3, 32, 61],
          [505, 434, 7, 3, 31, 61],
          [82, 438, 4, 3, 32, 63],
          [47, 435, 6, 3, 31, 63],
          [359, 437, 5, 3, 31, 65],
          [28, 435, 7, 3, 30, 65],
          [273, 438, 6, 2, 30, 68],
          [446, 434, 8, 3, 29, 68],
          [264, 343, 8, 14, 44, 56],
          [441, 299, 11, 17, 42, 54],
          [399, 437, 5, 3, 44, 56],
          [56, 421, 8, 5, 42, 54],
          [210, 434, 4, 4, 46, 57],
          [204, 421, 6, 5, 45, 57],
          [202, 434, 4, 4, 47, 60],
          [273, 312, 6, 5, 46, 59],
          [98, 431, 5, 4, 47, 62],
          [151, 421, 7, 5, 46, 61],
          [459, 437, 5, 3, 47, 65],
          [348, 430, 7, 4, 46, 64],
          [35, 435, 6, 3, 46, 67],
          [80, 421, 8, 5, 45, 66],
          [348, 383, 11, 9, 46, 55],
          [155, 370, 14, 12, 44, 53],
          [504, 437, 5, 3, 46, 55],
          [0, 415, 7, 6, 44, 53],
          [250, 434, 4, 4, 48, 56],
          [128, 415, 5, 6, 48, 55],
          [432, 425, 5, 5, 49, 57],
          [457, 425, 5, 5, 49, 57],
          [246, 434, 4, 4, 51, 59],
          [65, 415, 6, 6, 50, 58],
          [25, 426, 5, 5, 52, 59],
          [173, 415, 5, 6, 52, 59],
          [151, 438, 3, 3, 54, 61],
          [75, 426, 4, 5, 54, 60],
          [312, 372, 9, 11, 45, 56],
          [196, 343, 12, 14, 43, 54],
          [409, 437, 5, 3, 45, 56],
          [144, 421, 7, 5, 43, 54],
          [321, 434, 3, 4, 47, 57],
          [397, 425, 5, 5, 46, 56],
          [99, 426, 4, 5, 48, 58],
          [163, 415, 5, 6, 47, 58],
          [111, 426, 4, 5, 49, 60],
          [61, 401, 6, 7, 48, 59],
          [115, 426, 4, 5, 50, 61],
          [153, 415, 5, 6, 50, 61],
          [318, 434, 3, 4, 51, 63],
          [241, 420, 4, 6, 51, 62],
          [383, 371, 6, 12, 46, 55],
          [31, 344, 10, 14, 43, 54],
          [202, 431, 3, 3, 46, 55],
          [390, 430, 7, 4, 43, 54],
          [222, 434, 4, 4, 46, 56],
          [28, 431, 5, 4, 45, 56],
          [103, 431, 5, 4, 46, 58],
          [14, 415, 7, 6, 45, 57],
          [20, 426, 5, 5, 46, 60],
          [123, 421, 7, 5, 45, 60],
          [38, 431, 5, 4, 47, 62],
          [116, 421, 7, 5, 46, 61],
          [48, 431, 5, 4, 47, 63],
          [158, 421, 7, 5, 46, 63],
          [410, 371, 5, 12, 45, 54],
          [413, 345, 8, 14, 43, 53],
          [265, 440, 3, 2, 46, 54],
          [14, 435, 7, 3, 43, 53],
          [508, 356, 4, 3, 46, 55],
          [41, 435, 6, 3, 45, 55],
          [23, 431, 5, 4, 45, 57],
          [362, 430, 7, 4, 44, 57],
          [88, 431, 5, 4, 45, 59],
          [348, 430, 7, 4, 44, 59],
          [454, 437, 5, 3, 45, 62],
          [334, 430, 7, 4, 44, 61],
          [237, 440, 4, 2, 46, 64],
          [83, 435, 6, 3, 45, 64],
          [395, 371, 5, 12, 45, 54],
          [429, 345, 8, 14, 43, 53],
          [268, 440, 3, 2, 46, 54],
          [416, 430, 6, 4, 43, 53],
          [148, 431, 5, 4, 45, 55],
          [88, 421, 7, 5, 44, 54],
          [173, 431, 5, 4, 45, 56],
          [292, 430, 7, 4, 44, 56],
          [193, 431, 5, 4, 45, 58],
          [348, 430, 7, 4, 44, 58],
          [354, 437, 5, 3, 45, 61],
          [334, 430, 7, 4, 44, 60],
          [369, 437, 5, 3, 45, 63],
          [369, 430, 7, 4, 44, 63],
          [371, 371, 6, 12, 44, 54],
          [405, 345, 8, 14, 43, 53],
          [265, 440, 3, 2, 46, 54],
          [71, 435, 6, 3, 43, 53],
          [508, 356, 4, 3, 46, 55],
          [446, 430, 6, 4, 45, 54],
          [508, 356, 4, 3, 46, 57],
          [167, 435, 6, 3, 45, 56],
          [424, 437, 5, 3, 45, 59],
          [484, 434, 7, 3, 44, 58],
          [113, 435, 6, 3, 44, 61],
          [430, 434, 8, 3, 43, 60],
          [95, 435, 6, 3, 44, 63],
          [16, 421, 8, 5, 43, 62],
          [74, 358, 7, 13, 43, 55],
          [45, 313, 9, 16, 42, 53],
          [229, 440, 4, 2, 45, 55],
          [341, 430, 7, 4, 43, 53],
          [86, 438, 4, 3, 46, 56],
          [107, 435, 6, 3, 45, 56],
          [474, 437, 5, 3, 45, 58],
          [7, 435, 7, 3, 44, 58],
          [489, 437, 5, 3, 45, 60],
          [484, 434, 7, 3, 44, 60],
          [59, 435, 6, 3, 44, 63],
          [261, 430, 8, 4, 43, 62],
          [155, 435, 6, 3, 43, 65],
          [72, 421, 8, 5, 42, 64],
          [501, 345, 7, 14, 43, 56],
          [288, 300, 9, 17, 42, 54],
          [90, 438, 4, 3, 44, 56],
          [109, 421, 7, 5, 42, 54],
          [23, 431, 5, 4, 45, 57],
          [95, 421, 7, 5, 44, 56],
          [88, 431, 5, 4, 45, 59],
          [334, 430, 7, 4, 44, 59],
          [6, 431, 6, 4, 44, 62],
          [213, 430, 8, 4, 43, 62],
          [313, 430, 7, 4, 43, 64],
          [256, 426, 9, 4, 42, 64],
          [477, 434, 7, 3, 43, 67],
          [265, 426, 9, 4, 42, 67],
          [480, 345, 7, 14, 43, 56],
          [492, 299, 9, 17, 42, 54],
          [90, 438, 4, 3, 44, 56],
          [109, 421, 7, 5, 42, 54],
          [94, 438, 4, 3, 46, 57],
          [410, 430, 6, 4, 45, 56],
          [63, 431, 5, 4, 45, 59],
          [376, 430, 7, 4, 44, 59],
          [434, 430, 6, 4, 44, 62],
          [274, 426, 8, 4, 43, 62],
          [313, 430, 7, 4, 43, 64],
          [256, 426, 9, 4, 42, 64],
          [477, 434, 7, 3, 43, 67],
          [265, 426, 9, 4, 42, 67],
          [466, 345, 7, 14, 44, 56],
          [452, 299, 10, 17, 42, 54],
          [0, 438, 5, 3, 44, 56],
          [503, 420, 8, 5, 42, 54],
          [274, 434, 4, 4, 46, 57],
          [488, 430, 6, 4, 45, 57],
          [189, 435, 5, 3, 46, 60],
          [327, 430, 7, 4, 45, 59],
          [434, 430, 6, 4, 45, 62],
          [274, 426, 8, 4, 44, 62],
          [404, 430, 6, 4, 45, 64],
          [277, 430, 8, 4, 44, 64],
          [477, 434, 7, 3, 44, 67],
          [265, 426, 9, 4, 43, 67],
          [52, 329, 8, 15, 44, 55],
          [495, 281, 11, 18, 42, 53],
          [173, 435, 6, 3, 44, 55],
          [494, 420, 9, 5, 42, 53],
          [98, 438, 4, 3, 46, 56],
          [482, 430, 6, 4, 45, 56],
          [102, 438, 4, 3, 47, 58],
          [488, 430, 6, 4, 46, 58],
          [107, 426, 4, 5, 47, 60],
          [334, 425, 6, 5, 46, 60],
          [95, 415, 6, 6, 46, 62],
          [455, 414, 8, 6, 45, 62],
          [328, 425, 6, 5, 46, 65],
          [447, 414, 8, 6, 45, 65],
          [36, 329, 8, 15, 46, 54],
          [281, 282, 11, 18, 44, 52],
          [262, 440, 3, 2, 46, 54],
          [322, 425, 6, 5, 44, 52],
          [163, 431, 5, 4, 47, 55],
          [47, 415, 6, 6, 47, 54],
          [278, 434, 4, 4, 48, 57],
          [310, 425, 6, 5, 47, 57],
          [467, 425, 5, 5, 48, 59],
          [7, 415, 7, 6, 47, 59],
          [304, 425, 6, 5, 48, 62],
          [0, 401, 7, 7, 47, 61],
          [447, 425, 5, 5, 49, 64],
          [465, 400, 7, 7, 48, 63],
          [365, 331, 7, 15, 47, 53],
          [0, 295, 11, 18, 44, 51],
          [509, 437, 3, 3, 47, 53],
          [172, 421, 7, 5, 44, 51],
          [286, 434, 4, 4, 48, 54],
          [298, 425, 6, 5, 47, 53],
          [321, 434, 3, 4, 49, 57],
          [357, 425, 5, 5, 48, 56],
          [175, 408, 4, 7, 49, 58],
          [55, 401, 6, 7, 48, 58],
          [277, 420, 3, 6, 50, 61],
          [35, 408, 5, 7, 49, 60],
          [274, 420, 3, 6, 51, 62],
          [30, 408, 5, 7, 50, 62],
          [437, 345, 8, 14, 47, 53],
          [395, 299, 12, 17, 44, 51],
          [106, 438, 4, 3, 47, 53],
          [463, 414, 8, 6, 44, 51],
          [226, 434, 4, 4, 48, 54],
          [397, 425, 5, 5, 48, 54],
          [110, 438, 4, 3, 49, 57],
          [273, 312, 6, 5, 48, 56],
          [143, 415, 5, 6, 49, 58],
          [53, 415, 6, 6, 48, 58],
          [87, 426, 4, 5, 50, 61],
          [49, 401, 6, 7, 49, 60],
          [238, 434, 4, 4, 51, 63],
          [118, 415, 5, 6, 51, 62],
          [292, 372, 10, 11, 47, 53],
          [104, 343, 14, 14, 44, 51],
          [484, 437, 5, 3, 47, 53],
          [40, 421, 8, 5, 44, 51],
          [494, 437, 5, 3, 48, 54],
          [383, 430, 7, 4, 47, 53],
          [258, 434, 4, 4, 50, 55],
          [210, 421, 6, 5, 49, 55],
          [258, 434, 4, 4, 51, 57],
          [203, 415, 5, 6, 50, 57],
          [306, 434, 4, 4, 52, 59],
          [511, 163, 1, 1, 52, 63],
          [39, 426, 4, 5, 53, 59],
          [5, 408, 5, 7, 53, 58],
          [223, 382, 11, 10, 46, 54],
          [119, 357, 14, 13, 44, 52],
          [364, 437, 5, 3, 46, 54],
          [28, 415, 7, 6, 44, 52],
          [250, 434, 4, 4, 48, 55],
          [128, 415, 5, 6, 48, 54],
          [432, 425, 5, 5, 49, 56],
          [457, 425, 5, 5, 49, 56],
          [246, 434, 4, 4, 51, 58],
          [35, 415, 6, 6, 50, 57],
          [127, 426, 4, 5, 52, 59],
          [259, 440, 3, 2, 52, 63],
          [320, 233, 2, 4, 55, 60],
          [265, 420, 3, 6, 55, 59],
          [281, 168, 10, 1, 27, 38],
          [351, 434, 12, 3, 26, 37], null, [363, 434, 12, 3, 26, 37], null, [496, 169, 7, 1, 28, 38],
          [404, 434, 9, 3, 27, 37], null, [291, 168, 2, 1, 43, 31], null, [510, 271, 2, 3, 43, 30], null, [510, 278, 2, 2, 43, 30], null, [320, 229, 2, 4, 43, 30], null, [402, 425, 5, 5, 41, 31], null, [347, 162, 1, 1, 43, 33], null, [437, 241, 15, 20, 39, 20],
          [303, 219, 17, 22, 38, 19],
          [293, 143, 30, 26, 26, 17],
          [293, 115, 32, 28, 25, 16],
          [303, 317, 15, 15, 41, 18],
          [452, 262, 17, 19, 40, 16],
          [59, 358, 8, 13, 43, 17], null, [186, 382, 15, 10, 41, 19], null, [281, 169, 21, 26, 26, 17],
          [325, 115, 23, 28, 25, 16],
          [288, 317, 15, 15, 41, 17],
          [248, 295, 16, 17, 41, 16],
          [244, 357, 9, 13, 41, 20],
          [25, 313, 10, 16, 40, 19],
          [133, 357, 13, 13, 43, 18], null, [281, 169, 21, 26, 26, 17],
          [325, 115, 23, 28, 25, 16],
          [117, 328, 13, 15, 43, 17],
          [232, 295, 16, 17, 41, 16],
          [244, 357, 9, 13, 41, 20],
          [25, 313, 10, 16, 40, 19],
          [494, 371, 11, 11, 41, 19],
          [114, 438, 4, 3, 49, 28],
          [281, 169, 21, 26, 26, 17],
          [325, 115, 23, 28, 25, 16],
          [281, 195, 22, 24, 32, 12],
          [348, 142, 24, 26, 31, 11],
          [355, 195, 22, 24, 32, 12],
          [347, 168, 24, 26, 31, 11],
          [302, 372, 10, 11, 38, 19],
          [194, 370, 11, 12, 38, 19],
          [421, 195, 22, 24, 32, 12],
          [323, 169, 24, 25, 31, 12],
          [302, 372, 10, 11, 38, 19],
          [194, 370, 11, 12, 38, 19],
          [377, 195, 22, 24, 32, 12],
          [252, 154, 24, 26, 31, 11],
          [156, 328, 13, 15, 41, 12],
          [352, 299, 15, 17, 40, 11],
          [205, 370, 11, 12, 38, 18],
          [183, 357, 12, 13, 38, 18],
          [171, 357, 12, 13, 40, 15],
          [157, 343, 13, 14, 39, 15],
          [89, 328, 14, 15, 32, 21],
          [216, 295, 16, 17, 31, 20],
          [399, 195, 22, 24, 32, 12],
          [323, 143, 24, 26, 31, 11],
          [302, 372, 10, 11, 38, 19],
          [194, 370, 11, 12, 38, 19],
          [169, 328, 13, 15, 40, 12],
          [482, 299, 10, 17, 42, 11],
          [491, 434, 7, 3, 31, 46],
          [485, 420, 9, 5, 30, 45],
          [365, 194, 3, 1, 31, 48],
          [404, 437, 5, 3, 30, 47],
          [506, 297, 6, 2, 32, 46],
          [237, 430, 8, 4, 31, 45],
          [494, 345, 7, 14, 31, 45],
          [279, 300, 9, 17, 30, 44],
          [346, 359, 6, 13, 32, 46],
          [343, 316, 7, 16, 31, 45],
          [264, 370, 7, 12, 31, 45],
          [41, 344, 9, 14, 30, 44],
          [163, 382, 4, 11, 34, 46],
          [81, 358, 5, 13, 33, 45],
          [454, 219, 3, 12, 33, 47],
          [285, 346, 5, 14, 32, 47],
          [254, 434, 4, 4, 31, 46],
          [59, 415, 6, 6, 30, 45],
          [272, 180, 4, 9, 34, 45],
          [505, 382, 6, 10, 33, 44],
          [459, 345, 7, 14, 31, 45],
          [54, 313, 9, 16, 30, 44],
          [334, 359, 6, 13, 32, 46],
          [81, 313, 8, 16, 31, 45],
          [127, 382, 6, 11, 32, 46],
          [27, 358, 8, 13, 31, 45],
          [54, 383, 3, 10, 32, 47],
          [290, 360, 5, 12, 31, 46],
          [504, 237, 2, 3, 36, 46],
          [8, 421, 8, 5, 31, 45],
          [60, 383, 3, 10, 32, 47],
          [405, 371, 5, 12, 31, 46],
          [504, 237, 2, 3, 36, 46],
          [8, 421, 8, 5, 31, 45],
          [510, 182, 2, 6, 32, 50],
          [167, 408, 4, 7, 31, 49],
          [279, 297, 2, 2, 33, 47],
          [218, 434, 4, 4, 32, 46],
          [504, 237, 2, 3, 36, 46],
          [8, 421, 8, 5, 31, 45],
          [347, 164, 1, 1, 33, 50],
          [298, 434, 4, 4, 31, 49],
          [510, 268, 2, 3, 32, 51],
          [63, 426, 4, 5, 31, 50],
          [510, 268, 2, 3, 32, 53],
          [270, 434, 4, 4, 31, 52],
          [511, 156, 1, 2, 33, 55],
          [330, 434, 3, 4, 32, 54],
          [253, 392, 3, 9, 32, 47],
          [415, 371, 5, 12, 31, 46],
          [504, 237, 2, 3, 36, 46],
          [8, 421, 8, 5, 31, 45],
          [510, 188, 2, 6, 32, 51],
          [508, 392, 4, 8, 31, 49],
          [347, 162, 1, 1, 31, 45],
          [142, 438, 3, 3, 30, 44],
          [371, 170, 47, 25, 48, 151],
          [252, 115, 19, 39, 63, 122],
          [252, 0, 122, 115, 17, 9],
          [91, 312, 47, 16, 48, 161],
          [374, 96, 122, 74, 14, 122],
          [191, 392, 8, 9, 0, 0],
          [462, 434, 8, 3, 0, 7],
          [0, 189, 281, 106, 0, 0],
          [398, 241, 22, 20, 0, 0],
          [295, 346, 22, 13, 0, 9],
          [376, 241, 22, 20, 0, 0],
          [295, 346, 22, 13, 0, 9],
          [458, 195, 31, 23, 0, 0],
          [420, 371, 31, 11, 0, 14],
          [418, 170, 25, 25, 1, 1],
          [313, 420, 21, 5, 3, 22],
          [124, 393, 6, 8, 0, 0],
          [8, 393, 8, 8, 0, 0],
          [452, 392, 8, 8, 0, 0],
          [458, 400, 7, 7, 0, 0],
          [493, 400, 7, 7, 0, 0],
          [46, 393, 7, 8, 0, 0],
          [32, 393, 7, 8, 0, 0],
          [214, 434, 4, 4, 0, 2],
          [476, 392, 8, 8, 0, 0],
          [107, 415, 6, 6, 0, 1],
          [484, 392, 8, 8, 0, 0],
          [428, 392, 8, 8, 0, 0],
          [112, 393, 6, 8, 0, 0],
          [444, 392, 8, 8, 0, 0],
          [0, 393, 8, 8, 0, 0],
          [492, 392, 8, 8, 0, 0],
          [444, 400, 7, 7, 0, 0],
          [472, 400, 7, 7, 0, 0],
          [60, 393, 6, 8, 0, 0],
          [31, 401, 6, 7, 0, 0],
          [428, 400, 8, 7, 0, 0],
          [16, 393, 8, 8, 0, 0],
          [161, 435, 6, 3, 0, 4],
          [24, 393, 8, 8, 0, 0],
          [73, 401, 6, 7, 0, 0],
          [13, 401, 6, 7, 0, 0],
          [165, 421, 7, 5, 0, 1],
          [137, 421, 7, 5, 0, 1],
          [355, 430, 7, 4, 0, 2],
          [64, 421, 8, 5, 0, 1],
          [32, 421, 8, 5, 0, 1],
          [48, 421, 8, 5, 0, 1],
          [511, 128, 1, 7, 0, 0],
          [118, 438, 4, 3, 0, 0],
          [439, 407, 5, 7, 0, 0],
          [424, 407, 5, 7, 0, 0],
          [419, 407, 5, 7, 0, 0],
          [414, 407, 5, 7, 0, 0],
          [452, 256, 2, 3, 0, 0],
          [222, 408, 3, 7, 0, 0],
          [231, 408, 3, 7, 0, 0],
          [126, 438, 4, 3, 0, 2],
          [412, 425, 5, 5, 0, 1],
          [347, 155, 1, 3, 0, 5],
          [360, 194, 5, 1, 0, 3],
          [511, 156, 1, 2, 0, 5],
          [409, 407, 5, 7, 0, 0],
          [154, 401, 5, 7, 0, 0],
          [364, 407, 5, 7, 0, 0],
          [334, 407, 5, 7, 0, 0],
          [319, 407, 5, 7, 0, 0],
          [314, 407, 5, 7, 0, 0],
          [309, 407, 5, 7, 0, 0],
          [304, 407, 5, 7, 0, 0],
          [299, 407, 5, 7, 0, 0],
          [294, 407, 5, 7, 0, 0],
          [289, 407, 5, 7, 0, 0],
          [347, 143, 1, 6, 0, 1],
          [511, 135, 1, 7, 0, 1],
          [203, 408, 4, 7, 0, 0],
          [178, 431, 5, 4, 0, 2],
          [199, 408, 4, 7, 0, 0],
          [249, 401, 5, 7, 0, 0],
          [19, 401, 6, 7, 0, 0],
          [229, 401, 5, 7, 0, 0],
          [179, 401, 5, 7, 0, 0],
          [99, 401, 5, 7, 0, 0],
          [149, 401, 5, 7, 0, 0],
          [144, 401, 5, 7, 0, 0],
          [507, 400, 5, 7, 0, 0],
          [90, 408, 5, 7, 0, 0],
          [174, 401, 5, 7, 0, 0],
          [237, 408, 3, 7, 0, 0],
          [25, 408, 5, 7, 0, 0],
          [224, 401, 5, 7, 0, 0],
          [20, 408, 5, 7, 0, 0],
          [494, 407, 5, 7, 0, 0],
          [489, 407, 5, 7, 0, 0],
          [154, 401, 5, 7, 0, 0],
          [444, 407, 5, 7, 0, 0],
          [434, 407, 5, 7, 0, 0],
          [354, 407, 5, 7, 0, 0],
          [349, 407, 5, 7, 0, 0],
          [344, 407, 5, 7, 0, 0],
          [339, 407, 5, 7, 0, 0],
          [329, 407, 5, 7, 0, 0],
          [209, 401, 5, 7, 0, 0],
          [204, 401, 5, 7, 0, 0],
          [169, 401, 5, 7, 0, 0],
          [164, 401, 5, 7, 0, 0],
          [234, 408, 3, 7, 0, 0],
          [129, 401, 5, 7, 0, 0],
          [228, 408, 3, 7, 0, 0],
          [194, 435, 5, 3, 0, 0],
          [360, 194, 5, 1, 0, 7],
          [510, 262, 2, 3, 0, 0],
          [387, 425, 5, 5, 0, 2],
          [124, 401, 5, 7, 0, 0],
          [10, 426, 5, 5, 0, 2],
          [104, 401, 5, 7, 0, 0],
          [417, 425, 5, 5, 0, 2],
          [195, 408, 4, 7, 0, 0],
          [123, 415, 5, 6, 0, 2],
          [94, 401, 5, 7, 0, 0],
          [511, 142, 1, 7, 0, 0],
          [153, 393, 5, 8, 0, 0],
          [191, 408, 4, 7, 0, 0],
          [372, 156, 2, 7, 0, 0],
          [482, 425, 5, 5, 0, 2],
          [276, 184, 5, 5, 0, 2],
          [372, 425, 5, 5, 0, 2],
          [218, 415, 5, 6, 0, 2],
          [223, 415, 5, 6, 0, 2],
          [392, 425, 5, 5, 0, 2],
          [502, 425, 5, 5, 0, 2],
          [219, 408, 3, 7, 0, 0],
          [507, 425, 5, 5, 0, 2],
          [367, 425, 5, 5, 0, 2],
          [377, 425, 5, 5, 0, 2],
          [362, 425, 5, 5, 0, 2],
          [193, 415, 5, 6, 0, 2],
          [407, 425, 5, 5, 0, 2],
          [179, 408, 4, 7, 0, 0],
          [511, 121, 1, 7, 0, 0],
          [171, 408, 4, 7, 0, 0],
          [267, 438, 6, 2, 0, 2],
          [442, 425, 5, 5, 0, 2],
          [158, 393, 5, 8, 0, 0],
          [507, 211, 5, 7, 0, 0],
          [125, 408, 5, 7, 0, 0],
          [120, 408, 5, 7, 0, 0],
          [110, 408, 5, 7, 0, 0],
          [80, 408, 5, 7, 0, 0],
          [65, 408, 5, 7, 0, 0],
          [60, 408, 5, 7, 0, 1],
          [55, 408, 5, 7, 0, 0],
          [504, 407, 5, 7, 0, 0],
          [10, 408, 5, 7, 0, 0],
          [213, 408, 3, 7, 0, 0],
          [499, 407, 5, 7, 0, 0],
          [372, 163, 2, 7, 0, 0],
          [474, 407, 5, 7, 0, 0],
          [459, 407, 5, 7, 0, 0],
          [454, 407, 5, 7, 0, 0],
          [5, 426, 5, 5, 0, 2],
          [449, 407, 5, 7, 0, 0],
          [429, 407, 5, 7, 0, 0],
          [404, 407, 5, 7, 0, 0],
          [399, 407, 5, 7, 0, 0],
          [394, 407, 5, 7, 0, 0],
          [389, 407, 5, 7, 0, 0],
          [148, 393, 5, 8, 0, 0],
          [324, 407, 5, 7, 0, 0],
          [199, 401, 5, 7, 0, 0],
          [148, 415, 5, 6, 0, 2],
          [194, 401, 5, 7, 0, 0],
          [189, 401, 5, 7, 0, 0],
          [157, 438, 3, 3, 0, 2],
          [256, 400, 5, 8, 0, 0],
          [134, 401, 5, 7, 0, 0],
          [372, 142, 2, 7, 0, 0],
          [119, 401, 5, 7, 0, 0],
          [114, 401, 5, 7, 0, 0],
          [89, 401, 5, 7, 0, 0],
          [84, 401, 5, 7, 0, 0],
          [208, 415, 5, 6, 0, 0],
          [213, 415, 5, 6, 0, 0],
          [79, 401, 5, 7, 0, 0],
          [292, 425, 6, 5, 0, 1],
          [374, 437, 5, 3, 0, 3],
          [130, 408, 5, 7, 0, 0],
          [271, 400, 5, 8, 0, 0],
          [347, 149, 1, 6, 0, 1],
          [437, 425, 5, 5, 0, 1],
          [452, 425, 5, 5, 0, 1],
          [229, 401, 5, 7, 0, 0],
          [462, 425, 5, 5, 0, 2],
          [374, 407, 5, 7, 0, 0],
          [244, 401, 5, 7, 0, 0],
          [239, 401, 5, 7, 0, 0],
          [83, 426, 4, 5, 0, 2],
          [143, 408, 4, 7, 0, 0],
          [190, 426, 3, 5, 0, 2],
          [118, 393, 6, 8, 0, 0],
          [228, 415, 5, 6, 0, 2],
          [144, 401, 5, 7, 0, 0],
          [417, 425, 5, 5, 0, 2],
          [144, 401, 5, 7, 0, 0],
          [504, 407, 5, 7, 0, 0],
          [479, 407, 5, 7, 0, 0],
          [0, 426, 5, 5, 0, 2],
          [319, 407, 5, 7, 0, 0],
          [95, 426, 4, 5, 0, 2],
          [469, 407, 5, 7, 0, 0],
          [71, 426, 4, 5, 0, 2],
          [464, 407, 5, 7, 0, 0],
          [139, 408, 4, 7, 0, 0],
          [224, 401, 5, 7, 0, 0],
          [143, 426, 4, 5, 0, 2],
          [219, 401, 5, 7, 0, 0],
          [135, 426, 4, 5, 0, 2],
          [486, 400, 7, 7, 0, 0],
          [15, 426, 5, 5, 0, 2],
          [174, 401, 5, 7, 0, 0],
          [51, 426, 4, 5, 0, 2],
          [154, 401, 5, 7, 0, 0],
          [372, 425, 5, 5, 0, 2],
          [139, 401, 5, 7, 0, 0],
          [151, 426, 4, 5, 0, 2],
          [109, 401, 5, 7, 0, 0],
          [249, 420, 4, 6, 0, 2],
          [99, 401, 5, 7, 0, 0],
          [10, 426, 5, 5, 0, 2],
          [344, 407, 5, 7, 0, 0],
          [184, 426, 3, 5, 0, 2],
          [115, 408, 5, 7, 0, 0],
          [253, 420, 4, 6, 0, 2],
          [105, 408, 5, 7, 0, 0],
          [95, 408, 5, 7, 0, 1],
          [204, 401, 5, 7, 0, 0],
          [362, 425, 5, 5, 0, 2],
          [130, 393, 6, 8, 0, 0],
          [83, 415, 6, 6, 0, 2],
          [384, 407, 5, 7, 0, 0],
          [79, 426, 4, 5, 0, 2],
          [500, 400, 7, 7, 0, 0],
          [487, 425, 5, 5, 0, 2],
          [460, 392, 8, 8, 0, 0],
          [41, 415, 6, 6, 0, 2],
          [359, 407, 5, 7, 0, 0],
          [472, 425, 5, 5, 0, 2],
          [25, 401, 6, 7, 0, 0],
          [346, 425, 6, 5, 0, 2],
          [159, 408, 4, 7, 0, 0],
          [139, 426, 4, 5, 0, 2],
          [234, 401, 5, 7, 0, 0],
          [119, 426, 4, 5, 0, 2],
          [67, 401, 6, 7, 0, 0],
          [492, 425, 5, 5, 0, 2],
          [75, 408, 5, 7, 0, 0],
          [55, 426, 4, 5, 0, 2],
          [106, 393, 6, 8, 0, 0],
          [77, 415, 6, 6, 0, 2],
          [45, 408, 5, 7, 0, 0],
          [45, 408, 5, 7, 0, 0],
          [142, 393, 6, 8, 0, 0],
          [71, 415, 6, 6, 0, 2],
          [15, 408, 5, 7, 0, 0],
          [0, 408, 5, 7, 0, 0],
          [484, 407, 5, 7, 0, 0],
          [484, 407, 5, 7, 0, 0],
          [379, 407, 5, 7, 0, 0],
          [379, 407, 5, 7, 0, 0],
          [214, 401, 5, 7, 0, 0],
          [214, 401, 5, 7, 0, 0],
          [7, 401, 6, 7, 0, 0],
          [225, 408, 3, 7, 0, 0],
          [40, 408, 5, 7, 0, 0],
          [451, 400, 7, 7, 0, 0],
          [85, 408, 5, 7, 0, 0],
          [70, 408, 5, 7, 0, 0],
          [479, 400, 7, 7, 0, 0],
          [510, 278, 2, 2, 0, 3],
          [452, 256, 2, 3, 0, 0],
          [294, 434, 4, 4, 0, 0],
          [412, 400, 8, 7, 0, 0],
          [436, 392, 8, 8, 0, 0],
          [66, 392, 8, 9, 0, 0],
          [323, 194, 32, 24, 0, 0],
          [409, 383, 9, 9, 0, 0],
          [419, 437, 5, 3, 0, 0],
          [138, 431, 5, 4, 0, 0],
          [347, 162, 1, 1, 0, 0],
          [191, 392, 8, 9, 0, 0],
          [183, 392, 8, 9, 0, 0],
          [500, 392, 8, 8, 0, 1],
          [207, 392, 7, 9, 0, 0],
          [381, 383, 10, 9, 0, 0],
          [436, 400, 8, 7, 0, 1],
          [347, 162, 1, 1, 1, 1],
          [511, 156, 1, 2, 0, 0],
          [347, 162, 1, 1, 0, 1],
          [291, 168, 2, 1, 0, 0],
          [347, 162, 1, 1, 0, 0],
          [291, 168, 2, 1, 0, 0],
          [347, 162, 1, 1, 1, 0],
          [511, 156, 1, 2, 0, 0],
          [347, 162, 1, 1, 0, 0],
          [511, 162, 1, 1, 1, 1],
          [511, 160, 1, 2, 0, 0],
          [511, 162, 1, 1, 0, 1],
          [510, 280, 2, 1, 0, 0],
          [347, 162, 1, 1, 0, 0],
          [279, 299, 2, 1, 0, 0],
          [511, 162, 1, 1, 1, 0],
          [347, 160, 1, 2, 0, 0],
          [511, 162, 1, 1, 0, 0],
          [0, 0, 252, 189, 0, 0],
          [374, 0, 128, 96, 0, 0],
          [201, 382, 11, 10, 0, 1],
          [254, 382, 9, 10, 1, 2],
          [201, 382, 11, 10, 0, 1],
          [359, 383, 11, 9, 0, 1]
        ].map(r),
        A = [null, [0, 220, 12, 8, 29, 28],
          [24, 220, 12, 8, 29, 28],
          [185, 222, 12, 8, 29, 28],
          [419, 219, 12, 8, 29, 28],
          [173, 222, 12, 8, 29, 28],
          [12, 220, 12, 8, 29, 28],
          [0, 220, 12, 8, 29, 28],
          [24, 220, 12, 8, 29, 28],
          [185, 222, 12, 8, 29, 28],
          [419, 219, 12, 8, 29, 28],
          [173, 222, 12, 8, 29, 28],
          [12, 220, 12, 8, 29, 28],
          [433, 173, 10, 17, 34, 26],
          [413, 173, 10, 17, 34, 26],
          [380, 219, 12, 9, 30, 27],
          [368, 219, 12, 9, 30, 27],
          [261, 196, 5, 6, 31, 28],
          [135, 223, 5, 6, 31, 28],
          [91, 184, 5, 7, 31, 29],
          [471, 182, 5, 7, 31, 29],
          [335, 171, 22, 17, 20, 19],
          [244, 172, 22, 17, 20, 19],
          [0, 159, 22, 17, 20, 19],
          [269, 171, 22, 17, 20, 19],
          [291, 171, 22, 17, 20, 19],
          [313, 171, 22, 17, 20, 19],
          [335, 171, 22, 17, 20, 19],
          [244, 172, 22, 17, 20, 19],
          [0, 159, 22, 17, 20, 19],
          [269, 171, 22, 17, 20, 19],
          [291, 171, 22, 17, 20, 19],
          [313, 171, 22, 17, 20, 19],
          [426, 134, 22, 21, 20, 22],
          [75, 138, 22, 21, 20, 22],
          [311, 203, 21, 14, 21, 22],
          [205, 196, 21, 14, 21, 22],
          [0, 207, 18, 13, 24, 20],
          [64, 206, 18, 13, 24, 20],
          [0, 193, 25, 14, 19, 20],
          [94, 196, 25, 14, 19, 20],
          [119, 196, 22, 14, 27, 19],
          [141, 196, 22, 14, 27, 19],
          [364, 106, 24, 25, 18, 21],
          [316, 106, 24, 25, 18, 21],
          [137, 180, 22, 16, 19, 23],
          [115, 180, 22, 16, 19, 23],
          [471, 173, 5, 9, 23, 32],
          [507, 133, 5, 9, 23, 32],
          [507, 142, 5, 9, 23, 32],
          [462, 144, 5, 9, 23, 32],
          [471, 173, 5, 9, 23, 32],
          [507, 133, 5, 9, 23, 32],
          [325, 217, 9, 12, 24, 32],
          [196, 210, 9, 12, 24, 32],
          [498, 0, 13, 22, 19, 30],
          [498, 22, 13, 22, 19, 30],
          [358, 131, 22, 22, 20, 19],
          [336, 131, 22, 22, 20, 19],
          [314, 131, 22, 22, 20, 19],
          [292, 131, 22, 22, 20, 19],
          [468, 133, 22, 22, 20, 19],
          [404, 133, 22, 22, 20, 19],
          [66, 159, 22, 17, 20, 19],
          [44, 159, 22, 17, 20, 19],
          [357, 171, 22, 17, 20, 19],
          [22, 159, 22, 17, 20, 19],
          [97, 158, 22, 17, 20, 19],
          [476, 155, 22, 17, 20, 19],
          [244, 131, 24, 22, 20, 22],
          [268, 131, 24, 22, 20, 22],
          [184, 196, 21, 14, 21, 22],
          [163, 196, 21, 14, 21, 22],
          [0, 207, 18, 13, 24, 20],
          [64, 206, 18, 13, 24, 20],
          [44, 192, 25, 14, 19, 20],
          [69, 192, 25, 14, 19, 20],
          [119, 196, 22, 14, 27, 19],
          [141, 196, 22, 14, 27, 19],
          [469, 108, 24, 25, 18, 21],
          [340, 106, 24, 25, 18, 21],
          [422, 0, 22, 29, 19, 23],
          [444, 0, 22, 29, 19, 23],
          [403, 205, 7, 14, 38, 33],
          [410, 205, 7, 14, 38, 33],
          [417, 205, 7, 14, 38, 33],
          [424, 205, 7, 14, 38, 33],
          [431, 205, 7, 14, 38, 33],
          [505, 204, 7, 14, 38, 33],
          [455, 204, 9, 14, 35, 36],
          [298, 204, 9, 14, 35, 36],
          [436, 110, 17, 24, 36, 21],
          [469, 84, 17, 24, 36, 21],
          [82, 206, 9, 13, 39, 32],
          [32, 207, 9, 13, 39, 32],
          [322, 153, 12, 18, 36, 28],
          [310, 153, 12, 18, 36, 28],
          [269, 153, 16, 18, 29, 34],
          [403, 39, 16, 18, 29, 34],
          [399, 190, 8, 15, 36, 31],
          [407, 190, 8, 15, 36, 31],
          [45, 115, 15, 24, 47, 41],
          [0, 115, 15, 24, 47, 41],
          [453, 110, 15, 24, 47, 41],
          [60, 115, 15, 24, 47, 41],
          [30, 115, 15, 24, 47, 41],
          [15, 115, 15, 24, 47, 41],
          [172, 180, 13, 16, 47, 41],
          [159, 180, 13, 16, 47, 41],
          [185, 180, 13, 16, 47, 41],
          [224, 180, 13, 16, 47, 41],
          [211, 180, 13, 16, 47, 41],
          [198, 180, 13, 16, 47, 41],
          [237, 189, 13, 15, 46, 42],
          [358, 188, 13, 15, 46, 42],
          [380, 134, 15, 22, 46, 41],
          [106, 115, 15, 22, 46, 41],
          [448, 84, 21, 26, 46, 41],
          [427, 83, 21, 26, 46, 41],
          [493, 108, 16, 25, 46, 41],
          [388, 109, 16, 25, 46, 41],
          [36, 220, 5, 6, 34, 33],
          [219, 222, 4, 6, 27, 33],
          [213, 222, 6, 6, 34, 33],
          [145, 223, 5, 6, 26, 33],
          [510, 56, 2, 3, 35, 35],
          [511, 0, 1, 3, 29, 35],
          [36, 226, 5, 5, 34, 34],
          [41, 228, 4, 5, 27, 34],
          [0, 228, 6, 5, 34, 34],
          [31, 228, 5, 5, 26, 34],
          [510, 56, 2, 3, 35, 35],
          [511, 0, 1, 3, 29, 35],
          [85, 228, 5, 4, 34, 35],
          [150, 228, 4, 4, 27, 35],
          [51, 228, 6, 4, 34, 35],
          [507, 151, 5, 4, 26, 35],
          [451, 62, 2, 2, 35, 36],
          [511, 7, 1, 2, 29, 36],
          [454, 228, 5, 3, 34, 36],
          [391, 170, 4, 3, 27, 36],
          [217, 228, 6, 3, 34, 36],
          [459, 228, 5, 3, 26, 36],
          [419, 56, 2, 1, 35, 37],
          [511, 9, 1, 1, 29, 37],
          [261, 202, 5, 2, 34, 37],
          [508, 224, 4, 2, 27, 37],
          [395, 153, 6, 2, 34, 37],
          [67, 157, 5, 2, 26, 37],
          [237, 187, 5, 2, 34, 37],
          [508, 186, 4, 2, 27, 37],
          [462, 153, 6, 2, 34, 37],
          [371, 188, 5, 2, 26, 37],
          [110, 192, 5, 4, 29, 38],
          [511, 9, 1, 1, 33, 41],
          [6, 228, 5, 5, 29, 38],
          [511, 9, 1, 1, 32, 42],
          [154, 228, 4, 4, 29, 38],
          [511, 9, 1, 1, 32, 42],
          [26, 228, 5, 5, 29, 38],
          [511, 9, 1, 1, 32, 42],
          [451, 64, 2, 1, 31, 42],
          [110, 192, 5, 4, 29, 38],
          [511, 9, 1, 1, 33, 41],
          [451, 60, 3, 2, 31, 41],
          [110, 192, 5, 4, 29, 38],
          [511, 9, 1, 1, 33, 41],
          [80, 228, 5, 4, 29, 38],
          [511, 9, 1, 1, 33, 42],
          [454, 50, 12, 6, 27, 33],
          [431, 219, 7, 6, 29, 33],
          [206, 228, 11, 3, 27, 39],
          [226, 196, 11, 8, 27, 34],
          [511, 9, 1, 1, 36, 40],
          [511, 9, 1, 1, 27, 40],
          [91, 176, 6, 8, 29, 25],
          [130, 223, 5, 6, 30, 27],
          [197, 222, 9, 8, 38, 47],
          [36, 176, 8, 17, 31, 54],
          [496, 172, 12, 17, 41, 54],
          [476, 172, 20, 17, 30, 41],
          [328, 188, 15, 15, 26, 30],
          [462, 134, 6, 10, 39, 27],
          [237, 180, 6, 7, 26, 27],
          [91, 223, 39, 7, 22, 66],
          [41, 219, 41, 9, 21, 65],
          [11, 228, 5, 5, 0, 0],
          [16, 228, 5, 5, 0, 0],
          [468, 155, 8, 18, 31, 53],
          [67, 139, 8, 18, 33, 53],
          [395, 134, 9, 19, 34, 52],
          [453, 173, 9, 17, 34, 51],
          [284, 188, 9, 16, 34, 51],
          [381, 190, 9, 15, 34, 51],
          [415, 190, 8, 15, 34, 52],
          [289, 204, 9, 14, 33, 53],
          [379, 205, 8, 14, 33, 53],
          [117, 210, 8, 13, 32, 53],
          [205, 210, 9, 12, 30, 52],
          [260, 204, 10, 14, 29, 50],
          [250, 189, 11, 15, 28, 50],
          [285, 153, 13, 18, 26, 51],
          [298, 153, 12, 18, 27, 52],
          [458, 155, 10, 18, 29, 53],
          [25, 193, 17, 14, 41, 51],
          [498, 155, 14, 17, 41, 51],
          [334, 153, 12, 18, 41, 50],
          [448, 155, 10, 18, 41, 49],
          [438, 155, 10, 18, 41, 49],
          [428, 155, 10, 18, 41, 49],
          [259, 153, 10, 19, 41, 50],
          [57, 139, 10, 20, 41, 51],
          [47, 139, 10, 20, 41, 51],
          [36, 139, 11, 20, 41, 51],
          [454, 29, 12, 21, 41, 50],
          [448, 134, 14, 21, 41, 49],
          [22, 139, 14, 20, 41, 49],
          [244, 153, 15, 19, 41, 49],
          [311, 188, 17, 15, 41, 50],
          [332, 203, 17, 14, 41, 51],
          [407, 228, 7, 3, 31, 68],
          [407, 228, 7, 3, 31, 68],
          [380, 131, 8, 3, 33, 68],
          [115, 175, 7, 5, 36, 66],
          [508, 218, 4, 6, 39, 62],
          [419, 46, 3, 6, 40, 61],
          [419, 46, 3, 6, 40, 60],
          [419, 39, 3, 7, 39, 60],
          [419, 39, 3, 7, 39, 60],
          [140, 223, 5, 6, 36, 61],
          [261, 189, 4, 7, 36, 59],
          [506, 227, 6, 5, 31, 59],
          [45, 228, 6, 4, 30, 60],
          [69, 228, 6, 4, 29, 61],
          [393, 228, 7, 3, 26, 66],
          [400, 228, 7, 3, 27, 67],
          [407, 228, 7, 3, 29, 68],
          [380, 131, 8, 3, 45, 68],
          [307, 204, 4, 6, 54, 59],
          [391, 156, 4, 7, 51, 61],
          [206, 222, 7, 6, 46, 62],
          [57, 228, 6, 4, 45, 63],
          [63, 228, 6, 4, 44, 63],
          [493, 227, 7, 5, 43, 62],
          [102, 192, 8, 4, 42, 65],
          [385, 228, 8, 3, 42, 68],
          [385, 228, 8, 3, 42, 68],
          [385, 228, 8, 3, 43, 68],
          [94, 192, 8, 4, 45, 67],
          [500, 227, 6, 5, 48, 65],
          [391, 163, 4, 7, 51, 62],
          [508, 172, 4, 7, 52, 61],
          [508, 179, 4, 7, 54, 58],
          [307, 210, 4, 6, 54, 59],
          [473, 204, 8, 14, 31, 57],
          [481, 204, 8, 14, 31, 57],
          [447, 190, 8, 15, 31, 56],
          [423, 190, 8, 15, 31, 56],
          [431, 190, 8, 15, 33, 56],
          [439, 190, 8, 15, 33, 56],
          [275, 188, 9, 16, 34, 55],
          [302, 188, 9, 16, 34, 55],
          [280, 204, 9, 14, 34, 54],
          [464, 204, 9, 14, 34, 54],
          [91, 210, 9, 13, 34, 54],
          [100, 210, 9, 13, 34, 54],
          [214, 210, 9, 12, 34, 54],
          [307, 217, 9, 12, 34, 54],
          [109, 210, 8, 13, 34, 54],
          [165, 210, 8, 13, 34, 54],
          [343, 217, 9, 12, 33, 55],
          [334, 217, 9, 12, 33, 55],
          [360, 217, 8, 12, 33, 55],
          [247, 218, 8, 12, 33, 55],
          [223, 218, 8, 12, 32, 54],
          [231, 218, 8, 12, 32, 54],
          [438, 218, 8, 11, 30, 53],
          [446, 218, 8, 11, 30, 53],
          [239, 218, 8, 12, 29, 52],
          [352, 217, 8, 12, 29, 52],
          [187, 210, 9, 12, 28, 53],
          [316, 217, 9, 12, 28, 53],
          [482, 189, 11, 15, 26, 54],
          [471, 189, 11, 15, 26, 54],
          [493, 189, 10, 15, 27, 55],
          [371, 190, 10, 15, 27, 55],
          [503, 189, 9, 15, 29, 56],
          [390, 190, 9, 15, 29, 56],
          [391, 173, 11, 17, 42, 54],
          [402, 173, 11, 17, 42, 54],
          [173, 210, 14, 12, 44, 53],
          [498, 44, 14, 12, 44, 53],
          [226, 204, 12, 14, 43, 54],
          [238, 204, 12, 14, 43, 54],
          [250, 204, 10, 14, 43, 54],
          [270, 204, 10, 14, 43, 54],
          [363, 203, 8, 14, 43, 53],
          [395, 205, 8, 14, 43, 53],
          [387, 205, 8, 14, 43, 53],
          [371, 205, 8, 14, 43, 53],
          [497, 204, 8, 14, 43, 53],
          [489, 204, 8, 14, 43, 53],
          [266, 188, 9, 16, 42, 53],
          [293, 188, 9, 16, 42, 53],
          [462, 173, 9, 17, 42, 54],
          [97, 175, 9, 17, 42, 54],
          [106, 175, 9, 17, 42, 54],
          [0, 176, 9, 17, 42, 54],
          [443, 173, 10, 17, 42, 54],
          [423, 173, 10, 17, 42, 54],
          [395, 155, 11, 18, 42, 53],
          [417, 155, 11, 18, 42, 53],
          [346, 153, 11, 18, 44, 52],
          [406, 155, 11, 18, 44, 52],
          [357, 153, 11, 18, 44, 51],
          [368, 153, 11, 18, 44, 51],
          [379, 173, 12, 17, 44, 51],
          [379, 156, 12, 17, 44, 51],
          [349, 203, 14, 14, 44, 51],
          [455, 190, 14, 14, 44, 51],
          [18, 207, 14, 13, 44, 52],
          [438, 205, 14, 13, 44, 52],
          [436, 109, 10, 1, 27, 38],
          [158, 228, 12, 3, 26, 37],
          [388, 106, 12, 3, 26, 37],
          [426, 133, 7, 1, 28, 38],
          [368, 228, 9, 3, 27, 37],
          [419, 56, 2, 1, 43, 31],
          [510, 59, 2, 3, 43, 30],
          [451, 62, 2, 2, 43, 30],
          [419, 52, 2, 4, 43, 30],
          [21, 228, 5, 5, 41, 31],
          [490, 133, 17, 22, 38, 19],
          [454, 56, 32, 28, 25, 16],
          [422, 29, 32, 28, 25, 16],
          [466, 28, 32, 28, 25, 16],
          [466, 0, 32, 28, 25, 16],
          [403, 83, 24, 26, 31, 11],
          [486, 56, 24, 26, 31, 11],
          [403, 57, 24, 26, 31, 11],
          [427, 57, 24, 26, 31, 11],
          [486, 82, 24, 26, 31, 11],
          [419, 227, 9, 5, 30, 45],
          [428, 227, 9, 5, 30, 45],
          [9, 176, 9, 17, 30, 44],
          [18, 176, 9, 17, 30, 44],
          [88, 159, 9, 17, 30, 44],
          [27, 176, 9, 17, 30, 44],
          [125, 210, 8, 13, 31, 45],
          [141, 210, 8, 13, 31, 45],
          [149, 210, 8, 13, 31, 45],
          [157, 210, 8, 13, 31, 45],
          [133, 210, 8, 13, 31, 45],
          [451, 57, 3, 3, 30, 44],
          [244, 106, 47, 25, 48, 151],
          [403, 0, 19, 39, 63, 122],
          [0, 0, 122, 115, 17, 9],
          [44, 176, 47, 16, 48, 161],
          [122, 106, 122, 74, 14, 122],
          [403, 219, 8, 9, 0, 0],
          [377, 228, 8, 3, 0, 7],
          [122, 0, 281, 106, 0, 0],
          [0, 139, 22, 20, 0, 0],
          [42, 206, 22, 13, 0, 9],
          [97, 138, 22, 20, 0, 0],
          [42, 206, 22, 13, 0, 9],
          [75, 115, 31, 23, 0, 0],
          [255, 218, 31, 11, 0, 14],
          [291, 106, 25, 25, 1, 1],
          [150, 223, 21, 5, 3, 22],
          [411, 219, 8, 9, 0, 0],
          [404, 109, 32, 24, 0, 0],
          [82, 219, 9, 9, 0, 0],
          [414, 228, 5, 3, 0, 0],
          [75, 228, 5, 4, 0, 0],
          [511, 10, 1, 1, 0, 0],
          [511, 9, 1, 1, 0, 0],
          [511, 9, 1, 1, 1, 1],
          [511, 7, 1, 2, 0, 0],
          [511, 9, 1, 1, 0, 1],
          [419, 56, 2, 1, 0, 0],
          [511, 9, 1, 1, 0, 0],
          [419, 56, 2, 1, 0, 0],
          [511, 9, 1, 1, 1, 0],
          [511, 7, 1, 2, 0, 0],
          [511, 9, 1, 1, 0, 0],
          [511, 9, 1, 1, 1, 1],
          [511, 5, 1, 2, 0, 0],
          [511, 9, 1, 1, 0, 1],
          [510, 62, 2, 1, 0, 0],
          [511, 11, 1, 1, 0, 0],
          [510, 63, 2, 1, 0, 0],
          [511, 9, 1, 1, 1, 0],
          [511, 3, 1, 2, 0, 0],
          [511, 9, 1, 1, 0, 0],
          [473, 218, 11, 10, 0, 1],
          [484, 218, 9, 10, 1, 2],
          [473, 218, 11, 10, 0, 1],
          [392, 219, 11, 9, 0, 1],
          [286, 218, 19, 11, 0, 3],
          [343, 188, 15, 15, 2, 0],
          [454, 218, 19, 10, 0, 4],
          [493, 218, 15, 9, 2, 4]
        ].map(d);
    return e.ponyFrontManes = [null, [
      [o(1, 2)],
      [, o(3, 4), o(5, 6), o(7, 8)],
      [o(9, 10), o(11, 12)],
      [, o(13, 14), o(15, 16)],
      [o(17, 18), o(19, 20)],
      [, , o(21, 22), o(23, 24)]
    ],
      [
        [o(25, 26)],
        [, o(27, 28), o(29, 30), o(31, 32)],
        [o(33, 34), o(35, 36)],
        [, o(37, 38), o(39, 40)],
        [o(41, 42), o(43, 44)],
        [, , o(45, 46), o(47, 48)]
      ],
      [
        [o(49, 50)],
        [o(51, 52), , , o(53, 54), o(55, 56)]
      ],
      [
        [o(57, 58)],
        [, , , o(59, 60), o(61, 62)]
      ],
      [],
      [
        [o(63, 64)],
        [, , , o(65, 66), o(67, 68)]
      ],
      [],
      [
        [o(69, 70)],
        [, , , o(71, 72), o(73, 74)]
      ],
      []
    ],
        e.ponyTopManes = [null, [
          [o(75, 76)],
          [o(77, 78), o(79, 80), o(81, 82), o(83, 84)],
          [o(85, 86), o(87, 88)],
          [o(89, 90), o(91, 92), o(93, 94)],
          [o(95, 96), o(97, 98)],
          [o(99, 100), o(101, 102), o(103, 104), o(105, 106)]
        ],
          [
            [o(107, 108)],
            [o(109, 110), o(111, 112), o(113, 114), o(115, 116)],
            [o(117, 118), o(119, 120)],
            [o(121, 122), o(123, 124), o(125, 126)],
            [o(127, 128), o(129, 130)],
            [o(131, 132), o(133, 134), o(135, 136), o(137, 138)]
          ],
          [
            [o(139, 140)],
            [o(141, 142), o(143, 144), o(145, 146), o(147, 148), o(149, 150)]
          ],
          [
            [o(151, 152)],
            [o(153, 154), o(155, 156), o(157, 158), o(159, 160), o(161, 162)]
          ],
          [
            [o(163, 164)],
            [o(165, 166), o(167, 168), o(169, 170), o(171, 172)]
          ],
          [
            [o(173, 174)],
            [o(175, 176), o(177, 178), o(179, 180), o(181, 182), o(183, 184)]
          ],
          [
            [o(185, 186)],
            [o(187, 188), o(189, 190), o(191, 192), o(193, 194)]
          ],
          [
            [o(195, 196)],
            [o(197, 198), o(199, 200), o(201, 202), o(203, 204), o(205, 206)]
          ],
          [
            [o(207, 208)],
            [o(209, 210), o(211, 212), o(213, 214)]
          ]
        ],
        e.ponyBehindManes = [null, [
          [o(215, 216)],
          [, , , , o(217, 218)],
          [o(219, 220), o(221, 222)],
          [, , , o(223, 224)],
          [o(225, 226)],
          [, , , , o(227, 228)]
        ],
          [],
          [
            [o(229, 230)],
            [, , o(231, 232), , , o(233, 234)]
          ],
          [],
          [],
          [],
          [],
          [],
          [
            [o(235, 236)],
            [, o(237, 238), o(239, 240), o(241, 242), o(243, 244), o(245, 246)]
          ]
        ],
        e.ponyManes = [null, [
          [o(247, 248)],
          [o(249, 250), o(251, 252), o(253, 254), o(255, 256), o(257, 258)],
          [o(259, 260), o(261, 262)],
          [o(263, 264), o(265, 266), o(267, 268), o(269, 270)],
          [o(271, 272), o(273, 274)],
          [o(275, 276), o(277, 278), o(279, 280), o(281, 282), o(283, 284)]
        ],
          [
            [o(285, 286)],
            [o(287, 288), o(289, 290), o(291, 292), o(293, 294)],
            [o(295, 296), o(297, 298)],
            [o(299, 300), o(301, 302), o(303, 304)],
            [o(305, 306), o(307, 308)],
            [o(309, 310), o(311, 312), o(313, 314), o(315, 316)]
          ],
          [
            [o(317, 318)],
            [o(319, 320), o(321, 322), o(323, 324), o(325, 326), o(327, 328), o(329, 330)]
          ],
          [
            [o(331, 332)],
            [o(333, 334), o(335, 336), o(337, 338), o(339, 340), o(341, 342)]
          ],
          [
            [o(343, 344)],
            [o(345, 346), o(347, 348), o(349, 350), o(351, 352)]
          ],
          [
            [o(353, 354)],
            [o(355, 356), o(357, 358), o(359, 360), o(361, 362), o(363, 364)]
          ],
          [
            [o(365, 366)],
            [o(367, 368), o(369, 370), o(371, 372), o(373, 374)]
          ],
          [
            [o(375, 376)],
            [o(377, 378), o(379, 380), o(381, 382), o(383, 384), o(385, 386)]
          ],
          [
            [o(387, 388)],
            [o(389, 390), o(391, 392), o(393, 394), o(395, 396), o(397, 398), o(399, 400)]
          ]
        ],
        e.ponyBackFrontManes = [null, [
          [o(401, 402)],
          [o(403, 404), o(405, 406), o(407, 408)],
          [o(409, 410), o(411, 412)],
          [o(413, 414), o(415, 416)],
          [o(417, 418), o(419, 420)],
          [o(421, 422), o(423, 424)]
        ],
          [],
          [
            [o(425, 426)],
            [o(427, 428), o(429, 430), o(431, 432), o(433, 434)]
          ],
          [],
          [],
          [],
          []
        ],
        e.ponyBackBehindManes = [null, [],
          [
            [o(435, 436), o(437, 438)],
            [o(439, 440), o(441, 442), o(443, 444), o(445, 446), o(447, 448), o(449, 450)]
          ],
          [],
          [
            [o(451, 452), o(453, 454)],
            [o(455, 456), o(457, 458), o(459, 460), o(461, 462), o(463, 464)]
          ],
          [
            [o(465, 466)],
            [o(467, 468), o(469, 470)]
          ],
          [
            [o(471, 472)],
            [o(473, 474), o(475, 476), o(477, 478), o(479, 480)]
          ],
          [
            [o(481, 482)],
            [o(483, 484), o(485, 486), o(487, 488), o(489, 490)]
          ]
        ],
        e.ponyBackManes = [null, [
          [o(401, 402)],
          [o(403, 404), o(405, 406), o(407, 408)],
          [o(409, 410), o(411, 412)],
          [o(413, 414), o(415, 416)],
          [o(417, 418), o(419, 420)],
          [o(421, 422), o(423, 424)]
        ],
          [
            [o(435, 436), o(437, 438)],
            [o(439, 440), o(441, 442), o(443, 444), o(445, 446), o(447, 448), o(449, 450)]
          ],
          [
            [o(425, 426)],
            [o(427, 428), o(429, 430), o(431, 432), o(433, 434)]
          ],
          [
            [o(451, 452), o(453, 454)],
            [o(455, 456), o(457, 458), o(459, 460), o(461, 462), o(463, 464)]
          ],
          [
            [o(465, 466)],
            [o(467, 468), o(469, 470)]
          ],
          [
            [o(471, 472)],
            [o(473, 474), o(475, 476), o(477, 478), o(479, 480)]
          ],
          [
            [o(481, 482)],
            [o(483, 484), o(485, 486), o(487, 488), o(489, 490)]
          ]
        ],
        e.ponyTails = [null, [
          [o(491, 492)],
          [o(493, 494), o(495, 496), o(497, 498), o(499, 500)],
          [o(501, 502), o(503, 504)],
          [o(505, 506), o(507, 508)],
          [o(509, 510), o(511, 512)],
          [o(513, 514), o(515, 516)]
        ],
          [
            [o(517, 518)],
            [o(519, 520), o(521, 522), o(523, 524), o(525, 526)],
            [o(527, 528), o(529, 530)],
            [o(531, 532), o(533, 534)],
            [o(535, 536), o(537, 538)],
            [o(539, 540), o(541, 542)]
          ],
          [
            [o(543, 544)],
            [o(545, 546), o(547, 548), o(549, 550), o(551, 552), o(553, 554)]
          ],
          [
            [o(555, 556)],
            [o(557, 558), o(559, 560), o(561, 562), o(563, 564), o(565, 566)]
          ],
          [
            [o(567, 568)],
            [o(569, 570), o(571, 572), o(573, 574), o(575, 576)]
          ],
          [
            [o(577, 578)],
            [o(579, 580), o(581, 582), o(583, 584), o(585, 586), o(587, 588)]
          ]
        ],
        e.ponyEyeLeft = [null, c(589, 591, 593, 595), c(597, 599, 601, 603), c(605, 607, 609, 611), c(613, 615, 617, 619), c(621, 623, 625, 627), c(629, 631, 633, 635)],
        e.ponyEyeRight = [null, c(590, 592, 594, 596), c(598, 600, 602, 604), c(606, 608, 610, 612), c(614, 616, 618, 620), c(622, 624, 626, 628), c(630, 632, 634, 636)],
        e.ponyNoses = [l(637, 638, 639), l(640, 641, 642), l(643, 644, 645), l(646, 647, 648), l(649, 650, 651), l(652, 653, 654), l(655, 656, 657)],
        e.ponyFreckles = [null, k[660], k[661], k[662], k[663]],
        e.ponyHorns = [null, [
          [o(664, 665)]
        ],
          [
            [o(666, 667)]
          ]
        ],
        e.ponyWings = [null, [
          [o(668, 669)]
        ]],
        e.ponyLegFrontStand = [o(670, 671)],
        e.ponyLegBackStand = [o(672, 673)],
        e.ponyLegFrontTrot = [o(684, 685), o(686, 687), o(688, 689), o(690, 691), o(692, 693), o(694, 695), o(696, 697), o(698, 699), o(700, 701), o(702, 703), o(704, 705), o(706, 707), o(708, 709), o(710, 711), o(712, 713), o(714, 715)],
        e.ponyLegBackTrot = [o(716, 717), o(718, 719), o(720, 721), o(722, 723), o(724, 725), o(726, 727), o(728, 729), o(730, 731), o(732, 733), o(734, 735), o(736, 737), o(738, 739), o(740, 741), o(742, 743), o(744, 745), o(746, 747)],
        e.ponyBobsBodyTrot = [i(0, 1), i(0, 0), i(0, -1), i(0, -2), i(0, -2), i(0, -2), i(0, -1), i(0, 0), i(0, 1), i(0, 0), i(0, -1), i(0, -2), i(0, -2), i(0, -2), i(0, -1), i(0, 0)],
        e.ponyBobsHeadTrot = [i(0, 0), i(0, 0), i(0, -1), i(0, -2), i(0, -2), i(0, -2), i(0, -1), i(0, 0), i(0, 0), i(0, 0), i(0, -1), i(0, -2), i(0, -2), i(0, -2), i(0, -1), i(0, 0)],
        e.ponyFetlocksFrontStand = [o(748, 749)],
        e.ponyFetlocksFrontTrot = [o(750, 751), o(752, 753), o(754, 755), o(756, 757), o(758, 759), o(760, 761), o(762, 763), o(764, 765), o(766, 767), o(768, 769), o(770, 771), o(772, 773), o(774, 775), o(776, 777), o(778, 779), o(780, 781)],
        e.ponyFetlocksBackStand = [o(782, 783)],
        e.ponyFetlocksBackTrot = [o(784, 785), o(786, 787), o(788, 789), o(790, 791), o(792, 793), o(794, 795), o(796, 797), o(798, 799), o(800, 801), o(802, 803), o(804, 805), o(806, 807), o(808, 809), o(810, 811), o(812, 813), o(814, 815)],
        e.ponyFrontLegAccessoriesStand = [
          [null, [
            [o(816, 817)],
            [o(818, 819), o(820, 821), o(822, 823), o(824, 825), o(826, 827), o(828, 829)]
          ]]
        ],
        e.ponyFrontLegAccessoriesTrot = [
          [null, [
            [o(830, 831)],
            [o(832, 833), o(834, 835), o(836, 837), o(838, 839), o(840, 841), o(842, 843)]
          ]],
          [null, [
            [o(844, 845)],
            [o(846, 847), o(848, 849), o(850, 851), o(852, 853), o(854, 855), o(856, 857)]
          ]],
          [null, [
            [o(858, 859)],
            [o(860, 861), o(862, 863), o(864, 865), o(866, 867), o(868, 869), o(870, 871)]
          ]],
          [null, [
            [o(872, 873)],
            [o(874, 875), o(876, 877), o(878, 879), o(880, 881), o(882, 883), o(884, 885)]
          ]],
          [null, [
            [o(886, 887)],
            [o(888, 889), o(890, 891), o(892, 893), o(894, 895), o(896, 897), o(898, 899)]
          ]],
          [null, [
            [o(900, 901)],
            [o(902, 903), o(904, 905), o(906, 907), o(908, 909), o(910, 911), o(912, 913)]
          ]],
          [null, [
            [o(914, 915)],
            [o(916, 917), o(918, 919), o(920, 921), o(922, 923), o(924, 925), o(926, 927)]
          ]],
          [null, [
            [o(928, 929)],
            [o(930, 931), o(932, 933), o(934, 935), o(936, 937), o(938, 939), o(940, 941)]
          ]],
          [null, [
            [o(942, 943)],
            [o(944, 945), o(946, 947), o(948, 949), o(950, 951), o(952, 953), o(954, 955)]
          ]],
          [null, [
            [o(956, 957)],
            [o(958, 959), o(960, 961), o(962, 963), o(964, 965), o(966, 967), o(968, 969)]
          ]],
          [null, [
            [o(970, 971)],
            [o(972, 973), o(974, 975), o(976, 977), o(978, 979), o(980, 981), o(982, 983)]
          ]],
          [null, [
            [o(984, 985)],
            [o(986, 987), o(988, 989), o(990, 991), o(992, 993), o(994, 995), o(996, 997)]
          ]],
          [null, [
            [o(998, 999)],
            [o(1e3, 1001), o(1002, 1003), o(1004, 1005), o(1006, 1007), o(1008, 1009), o(1010, 1011)]
          ]],
          [null, [
            [o(1012, 1013)],
            [o(1014, 1015), o(1016, 1017), o(1018, 1019), o(1020, 1021), o(1022, 1023), o(1024, 1025)]
          ]],
          [null, [
            [o(1026, 1027)],
            [o(1028, 1029), o(1030, 1031), o(1032, 1033), o(1034, 1035), o(1036, 1037), o(1038, 1039)]
          ]],
          [null, [
            [o(1040, 1041)],
            [o(1042, 1043), o(1044, 1045), o(1046, 1047), o(1048, 1049), o(1050, 1051), o(1052, 1053)]
          ]]
        ],
        e.ponyBackLegAccessoriesStand = [
          [null, [
            [o(1054, 1055)],
            [o(1056, 1057), o(1058, 1059), o(1060, 1061), o(1062, 1063), o(1064, 1065), o(1066, 1067)]
          ]]
        ],
        e.ponyBackLegAccessoriesTrot = [
          [null, [
            [o(1068, 1069)],
            [o(1070, 1071), o(1072, 1073), o(1074, 1075), o(1076, 1077), o(1078, 1079), o(1080, 1081)]
          ]],
          [null, [
            [o(1082, 1083)],
            [o(1084, 1085), o(1086, 1087), o(1088, 1089), o(1090, 1091), o(1092, 1093), o(1094, 1095)]
          ]],
          [null, [
            [o(1096, 1097)],
            [o(1098, 1099), o(1100, 1101), o(1102, 1103), o(1104, 1105), o(1106, 1107), o(1108, 1109)]
          ]],
          [null, [
            [o(1110, 1111)],
            [o(1112, 1113), o(1114, 1115), o(1116, 1117), o(1118, 1119), o(1120, 1121), o(1122, 1123)]
          ]],
          [null, [
            [o(1124, 1125)],
            [o(1126, 1127), o(1128, 1129), o(1130, 1131), o(1132, 1133), o(1134, 1135), o(1136, 1137)]
          ]],
          [null, [
            [o(1138, 1139)],
            [o(1140, 1141), o(1142, 1143), o(1144, 1145), o(1146, 1147), o(1148, 1149), o(1150, 1151)]
          ]],
          [null, [
            [o(1152, 1153)],
            [o(1154, 1155), o(1156, 1157), o(1158, 1159), o(1160, 1161), o(1162, 1163), o(1164, 1165)]
          ]],
          [null, [
            [o(1166, 1167)],
            [o(1168, 1169), o(1170, 1171), o(1172, 1173), o(1174, 1175), o(1176, 1177), o(1178, 1179)]
          ]],
          [null, [
            [o(1180, 1181)],
            [o(1182, 1183), o(1184, 1185), o(1186, 1187), o(1188, 1189), o(1190, 1191), o(1192, 1193)]
          ]],
          [null, [
            [o(1194, 1195)],
            [o(1196, 1197), o(1198, 1199), o(1200, 1201), o(1202, 1203), o(1204, 1205), o(1206, 1207)]
          ]],
          [null, [
            [o(1208, 1209)],
            [o(1210, 1211), o(1212, 1213), o(1214, 1215), o(1216, 1217), o(1218, 1219), o(1220, 1221)]
          ]],
          [null, [
            [o(1222, 1223)],
            [o(1224, 1225), o(1226, 1227), o(1228, 1229), o(1230, 1231), o(1232, 1233), o(1234, 1235)]
          ]],
          [null, [
            [o(1236, 1237)],
            [o(1238, 1239), o(1240, 1241), o(1242, 1243), o(1244, 1245), o(1246, 1247), o(1248, 1249)]
          ]],
          [null, [
            [o(1250, 1251)],
            [o(1252, 1253), o(1254, 1255), o(1256, 1257), o(1258, 1259), o(1260, 1261), o(1262, 1263)]
          ]],
          [null, [
            [o(1264, 1265)],
            [o(1266, 1267), o(1268, 1269), o(1270, 1271), o(1272, 1273), o(1274, 1275), o(1276, 1277)]
          ]],
          [null, [
            [o(1278, 1279)],
            [o(1280, 1281), o(1282, 1283), o(1284, 1285), o(1286, 1287), o(1288, 1289), o(1290, 1291)]
          ]]
        ],
        e.ponyFaceAccessories = [null, [
          [a(1293, 1294, 1292)]
        ],
          [
            [o(1295, 1296)]
          ],
          [
            [a(1298, 1299, 1297)]
          ]
        ],
        e.ponyEarAccessories = [null, [
          [o(1300, 1301)]
        ],
          [
            [o(1302, 1303)]
          ],
          [
            [o(1304, 1305)]
          ],
          [
            [o(1306, 1307)]
          ],
          [
            [o(1308, 1309), o(1310, 1311)]
          ]
        ],
        e.ponyHeadAccessories = [null, [
          [o(1312, 1313)]
        ],
          [
            [o(1314, 1315)],
            [o(1316, 1317), o(1318, 1319), o(1320, 1321), o(1322, 1323)],
            [o(1324, 1325), o(1326, 1327), o(1328, 1329), o(1330, 1331)],
            [o(1332, 1333), o(1334, 1335), o(1336, 1337), o(1338, 1339)]
          ],
          [
            [o(1340, 1341)],
            [o(1342, 1343), o(1344, 1345)],
            [o(1346, 1347), o(1348, 1349), o(1350, 1351)],
            [o(1352, 1353), o(1354, 1355), o(1356, 1357), o(1358, 1359)],
            [o(1360, 1361), o(1362, 1363), o(1364, 1365)]
          ]
        ],
        e.ponyNeckAccessories = [null, [
          [o(1366, 1367)],
          [o(1368, 1369), o(1370, 1371)]
        ],
          [
            [o(1372, 1373)],
            [o(1374, 1375), o(1376, 1377)],
            [o(1378, 1379), o(1380, 1381), o(1382, 1383), o(1384, 1385)],
            [o(1386, 1387), o(1388, 1389)]
          ],
          [
            [o(1390, 1391)],
            [o(1392, 1393), o(1394, 1395)],
            [o(1396, 1397), o(1398, 1399), o(1400, 1401)],
            [o(1402, 1403), o(1404, 1405), o(1406, 1407), o(1408, 1409), o(1410, 1411), o(1412, 1413)],
            [o(1414, 1415), o(1416, 1417), o(1418, 1419)]
          ]
        ],
        e.ponyFacialHair = [null, [
          [o(1420, 1421)]
        ]],
        e.butterfly = [k[1737], k[1738], k[1739], k[1740]],
        e.ponyEyeshadow = k[658],
        e.ponyEyeshadowShine = k[659],
        e.ponyBody = o(674, 675),
        e.ponyHead = o(676, 677),
        e.ponyEar = o(678, 679),
        e.ponyEar2 = o(680, 681),
        e.ponyShadow = k[682],
        e.ponySelection = k[683],
        e.tree = f(1422, 1423, 1424, 1425, 1426),
        e.apple = s(1427, 1428),
        e.cloud = u(1429),
        e.jacko = s(1430, 1431),
        e.pumpkin = s(1432, 1433),
        e.rock = s(1434, 1435),
        e.sign = s(1436, 1437),
        e.dev = k[1705],
        e.grass = k[1706],
        e.mod = k[1707],
        e.nipple = k[1708],
        e.nipple2 = k[1709],
        e.pixel = k[1710],
        e.emotes = [h("apple", 1711), h("green_apple", 1712), h("heart", 1713), h("pizza", 1714), h("pumpkin", 1715), h("rock", 1716)],
        e.bubble = p(2, 1717, 1718, 1719, 1720, 1721, 1722, 1723, 1724, 1725),
        e.bubble2 = p(2, 1726, 1727, 1728, 1729, 1730, 1731, 1732, 1733, 1734),
        e.light = k[1735],
        e.light3 = k[1736],
        e.ponFrontManes = [null, [m(1, 3), m(2, 9), m(3, 5), m(4, 7), m(5, 5), m(6, 9)],
          [m(7, 3), m(8, 9), m(9, 5), m(10, 7), m(11, 5), m(12, 9)],
          [m(13, 3), m(14, 11)],
          [m(15, 3), m(16, 11)],
          [],
          [m(17, 3), m(18, 11)],
          [],
          [m(19, 3), m(20, 11)],
          []
        ],
        e.ponTopManes = [null, [m(21, 3), m(22, 9), m(23, 5), m(24, 7), m(25, 5), m(26, 9)],
          [m(27, 3), m(28, 9), m(29, 5), m(30, 7), m(31, 5), m(32, 9)],
          [m(33, 3), m(34, 11)],
          [m(35, 3), m(36, 11)],
          [m(37, 3), m(38, 9)],
          [m(39, 3), m(40, 11)],
          [m(41, 3), m(42, 9)],
          [m(43, 3), m(44, 11)],
          [m(45, 3), m(46, 7)]
        ],
        e.ponBehindManes = [null, [m(47, 3), m(48, 11), m(49, 5), m(50, 9), m(51, 3), m(52, 11)],
          [],
          [m(53, 3), m(54, 13)],
          [],
          [],
          [],
          [],
          [],
          [m(55, 3), m(56, 13)]
        ],
        e.ponManes = [null, [m(57, 3), m(58, 11), m(59, 5), m(60, 9), m(61, 5), m(62, 11)],
          [m(63, 3), m(64, 9), m(65, 5), m(66, 7), m(67, 5), m(68, 9)],
          [m(69, 3), m(70, 13)],
          [m(71, 3), m(72, 11)],
          [m(73, 3), m(74, 9)],
          [m(75, 3), m(76, 11)],
          [m(77, 3), m(78, 9)],
          [m(79, 3), m(80, 11)],
          [m(81, 3), m(82, 13)]
        ],
        e.ponBackFrontManes = [null, [m(83, 3), m(84, 7), m(85, 5), m(86, 5), m(87, 5), m(88, 5)],
          [],
          [m(89, 3), m(90, 9)],
          [],
          [],
          [],
          []
        ],
        e.ponBackBehindManes = [null, [],
          [m(91, 5), m(92, 13)],
          [],
          [m(93, 5), m(94, 11)],
          [m(95, 3), m(96, 5)],
          [m(97, 3), m(98, 9)],
          [m(99, 3), m(100, 17)]
        ],
        e.ponBackManes = [null, [m(83, 3), m(84, 7), m(85, 5), m(86, 5), m(87, 5), m(88, 5)],
          [m(91, 5), m(92, 13)],
          [m(89, 3), m(90, 9)],
          [m(93, 5), m(94, 11)],
          [m(95, 3), m(96, 5)],
          [m(97, 3), m(98, 9)],
          [m(99, 3), m(100, 17)]
        ],
        e.ponTails = [null, [m(101, 3), m(102, 9), m(103, 5), m(104, 5), m(105, 5), m(106, 5)],
          [m(107, 3), m(108, 9), m(109, 5), m(110, 5), m(111, 5), m(112, 5)],
          [m(113, 3), m(114, 11)],
          [m(115, 3), m(116, 11)],
          [m(117, 3), m(118, 9)],
          [m(119, 3), m(120, 11)]
        ],
        e.ponEyeLeft = [null, w(121, 123, 125), w(127, 129, 131), w(133, 135, 137), w(139, 141, 143), w(145, 147, 0), w(149, 151, 0)],
        e.ponEyeRight = [null, w(122, 124, 126), w(128, 130, 132), w(134, 136, 138), w(140, 142, 144), w(146, 148, 0), w(150, 152, 0)],
        e.ponNoses = [_(0, 153, 154), _(0, 155, 156), _(0, 157, 158), _(0, 159, 160), _(161, 162, 163), _(164, 165, 166), _(0, 167, 168)],
        e.ponFreckles = [null, A[171], A[172], A[173], A[174]],
        e.ponHorns = [null, [m(175, 3)],
          [m(176, 3)]
        ],
        e.ponWings = [null, [m(177, 3)]],
        e.ponLegFrontStand = [A[178]],
        e.ponLegBackStand = [A[179]],
        e.ponLegFrontTrot = [A[188], A[189], A[190], A[191], A[192], A[193], A[194], A[195], A[196], A[197], A[198], A[199], A[200], A[201], A[202], A[203]],
        e.ponLegBackTrot = [A[204], A[205], A[206], A[207], A[208], A[209], A[210], A[211], A[212], A[213], A[214], A[215], A[216], A[217], A[218], A[219]],
        e.ponFetlocksFrontStand = [m(220, 3)],
        e.ponFetlocksFrontTrot = [m(221, 3), m(222, 3), m(223, 3), m(224, 3), m(225, 3), m(226, 3), m(227, 3), m(228, 3), m(229, 3), m(230, 3), m(231, 3), m(232, 3), m(233, 3), m(234, 3), m(235, 3), m(236, 3)],
        e.ponFetlocksBackStand = [m(237, 3)],
        e.ponFetlocksBackTrot = [m(238, 3), m(239, 3), m(240, 3), m(241, 3), m(242, 3), m(243, 3), m(244, 3), m(245, 3), m(246, 3), m(247, 3), m(248, 3), m(249, 3), m(250, 3), m(251, 3), m(252, 3), m(253, 3)],
        e.ponFrontLegAccessoriesStand = [
          [null, [m(254, 3), m(255, 13)]]
        ],
        e.ponFrontLegAccessoriesTrot = [
          [null, [m(256, 3), m(257, 13)]],
          [null, [m(258, 3), m(259, 13)]],
          [null, [m(260, 3), m(261, 13)]],
          [null, [m(262, 3), m(263, 13)]],
          [null, [m(264, 3), m(265, 13)]],
          [null, [m(266, 3), m(267, 13)]],
          [null, [m(268, 3), m(269, 13)]],
          [null, [m(270, 3), m(271, 13)]],
          [null, [m(272, 3), m(273, 13)]],
          [null, [m(274, 3), m(275, 13)]],
          [null, [m(276, 3), m(277, 13)]],
          [null, [m(278, 3), m(279, 13)]],
          [null, [m(280, 3), m(281, 13)]],
          [null, [m(282, 3), m(283, 13)]],
          [null, [m(284, 3), m(285, 13)]],
          [null, [m(286, 3), m(287, 13)]]
        ],
        e.ponBackLegAccessoriesStand = [
          [null, [m(288, 3), m(289, 13)]]
        ],
        e.ponBackLegAccessoriesTrot = [
          [null, [m(290, 3), m(291, 13)]],
          [null, [m(292, 3), m(293, 13)]],
          [null, [m(294, 3), m(295, 13)]],
          [null, [m(296, 3), m(297, 13)]],
          [null, [m(298, 3), m(299, 13)]],
          [null, [m(300, 3), m(301, 13)]],
          [null, [m(302, 3), m(303, 13)]],
          [null, [m(304, 3), m(305, 13)]],
          [null, [m(306, 3), m(307, 13)]],
          [null, [m(308, 3), m(309, 13)]],
          [null, [m(310, 3), m(311, 13)]],
          [null, [m(312, 3), m(313, 13)]],
          [null, [m(314, 3), m(315, 13)]],
          [null, [m(316, 3), m(317, 13)]],
          [null, [m(318, 3), m(319, 13)]],
          [null, [m(320, 3), m(321, 13)]]
        ],
        e.ponFaceAccessories = [null, [v(323, 3, 322, [0, 4294967153])],
          [m(324, 3)],
          [v(326, 3, 325, [0, 4294967153])]
        ],
        e.ponEarAccessories = [null, [m(327, 3)],
          [m(328, 3)],
          [m(329, 3)],
          [m(330, 3)],
          [m(331, 5)]
        ],
        e.ponHeadAccessories = [null, [m(332, 3)],
          [m(333, 3), m(334, 9), m(335, 9), m(336, 9)],
          [m(337, 3), m(338, 5), m(339, 7), m(340, 9), m(341, 7)]
        ],
        e.ponNeckAccessories = [null, [m(342, 3), m(343, 5)],
          [m(344, 3), m(345, 5), m(346, 9), m(347, 5)],
          [m(348, 3), m(349, 5), m(350, 7), m(351, 13), m(352, 7)]
        ],
        e.ponFacialHair = [null, [m(353, 3)]],
        e.ponEyeshadow = A[169],
        e.ponEyeshadowShine = A[170],
        e.ponBody = A[180],
        e.ponHead = A[181],
        e.ponEar = A[182],
        e.ponEar2 = A[183],
        e.ponShadow = A[184],
        e.ponSelection = A[185],
        e.ponCM = A[186],
        e.ponCMFlip = A[187],
        e.tree2 = x(354, 355, 356, 357, 358, [0, 1648566271, 1176305919, 2978502143, 3686626303, 2093650687, 2440584959, 1800616447, 3036666623, 3029561599, 2087013887, 1890942719, 1648236543, 1328153087, 542583551, 1553622527, 1066096127, 2328465407, 828261375, 1166170623, 3607295, 745882111, 1099582975]),
        e.apple_2 = b(359, 360, [0, 738592255, 2097348863, 4202988031, 3523608831, 3523806463]),
        e.cloud_2 = y(361),
        e.jacko_2 = b(362, 363, [0, 1217814527, 5904127, 2318663935, 4171326463, 4292055551, 4001643519, 3512541951, 3227390719, 2722895103, 4275213823, 4293951487, 4088222463]),
        e.pumpkin_2 = b(364, 365, [0, 1217814527, 5904127, 2318663935, 4171326463, 4292055551, 4102701567, 3613926399, 3227390719, 2722895103, 4275213823]),
        e.rock_2 = b(366, 367, [0, 2020893439, 3418335487, 2593489919, 2980879103, 1667060479]),
        e.sign_2 = b(368, 369, [0, 2303012607, 3988029695, 2875473919, 3464778495, 572662527, 75]),
        e.dev_2 = g(370, [0, 3174994431, 4294967295]),
        e.grass_2 = g(371, [2093650687, 3036666623, 2464591615, 1890942719]),
        e.mod_2 = g(372, [0, 1596952575, 4294967295]),
        e.nipple_2 = g(373, [4294967295, 0]),
        e.nipple2_2 = g(374, [4294967295, 255, 0]),
        e.pixel_2 = g(375, [4294967295]),
        e.rectSprite = A[376],
        e.bubble_2 = $(2, 377, 378, 379, 380, 381, 382, 383, 384, 385),
        e.bubble2_2 = $(2, 386, 387, 388, 389, 390, 391, 392, 393, 394),
        e.butterfly2 = E([395, 396, 397, 398], [0, 2151972607, 4068601343]),
        e.bat2 = E([399, 400, 401, 402], [0, 774778623, 1179010815]),
        e.tileSheet = S["tiles.png"],
        e.tileSprite = {
          x: 0,
          y: 0,
          w: 32,
          h: 24,
          ox: 0,
          oy: 0
        },
        e.spriteSheets = [{
          src: M,
          sprites: k
        }, {
          src: T,
          sprites: A
        }, {
          src: e.tileSheet,
          sprites: [e.tileSprite]
        }],
        e.font = [
          [0, 1438],
          [9786, 1439],
          [9787, 1440],
          [9829, 1441],
          [9830, 1442],
          [9827, 1443],
          [9824, 1444],
          [8226, 1445],
          [9688, 1446],
          [9675, 1447],
          [9689, 1448],
          [9794, 1449],
          [9792, 1450],
          [9834, 1451],
          [9835, 1452],
          [9788, 1453],
          [9658, 1454],
          [9668, 1455],
          [8597, 1456],
          [8252, 1457],
          [182, 1458],
          [167, 1459],
          [9644, 1460],
          [8616, 1461],
          [8593, 1462],
          [8595, 1463],
          [8594, 1464],
          [8592, 1465],
          [8735, 1466],
          [8596, 1467],
          [9650, 1468],
          [9660, 1469],
          [33, 1470],
          [34, 1471],
          [35, 1472],
          [36, 1473],
          [37, 1474],
          [38, 1475],
          [39, 1476],
          [40, 1477],
          [41, 1478],
          [42, 1479],
          [43, 1480],
          [44, 1481],
          [45, 1482],
          [46, 1483],
          [47, 1484],
          [48, 1485],
          [49, 1486],
          [50, 1487],
          [51, 1488],
          [52, 1489],
          [53, 1490],
          [54, 1491],
          [55, 1492],
          [56, 1493],
          [57, 1494],
          [58, 1495],
          [59, 1496],
          [60, 1497],
          [61, 1498],
          [62, 1499],
          [63, 1500],
          [64, 1501],
          [65, 1502],
          [66, 1503],
          [67, 1504],
          [68, 1505],
          [69, 1506],
          [70, 1507],
          [71, 1508],
          [72, 1509],
          [73, 1510],
          [74, 1511],
          [75, 1512],
          [76, 1513],
          [77, 1514],
          [78, 1515],
          [79, 1516],
          [80, 1517],
          [81, 1518],
          [82, 1519],
          [83, 1520],
          [84, 1521],
          [85, 1522],
          [86, 1523],
          [87, 1524],
          [88, 1525],
          [89, 1526],
          [90, 1527],
          [91, 1528],
          [92, 1529],
          [93, 1530],
          [94, 1531],
          [95, 1532],
          [96, 1533],
          [97, 1534],
          [98, 1535],
          [99, 1536],
          [100, 1537],
          [101, 1538],
          [102, 1539],
          [103, 1540],
          [104, 1541],
          [105, 1542],
          [106, 1543],
          [107, 1544],
          [108, 1545],
          [109, 1546],
          [110, 1547],
          [111, 1548],
          [112, 1549],
          [113, 1550],
          [114, 1551],
          [115, 1552],
          [116, 1553],
          [117, 1554],
          [118, 1555],
          [119, 1556],
          [120, 1557],
          [121, 1558],
          [122, 1559],
          [123, 1560],
          [124, 1561],
          [125, 1562],
          [126, 1563],
          [8962, 1564],
          [199, 1565],
          [252, 1566],
          [233, 1567],
          [226, 1568],
          [228, 1569],
          [224, 1570],
          [229, 1571],
          [231, 1572],
          [234, 1573],
          [235, 1574],
          [232, 1575],
          [239, 1576],
          [238, 1577],
          [236, 1578],
          [196, 1579],
          [197, 1580],
          [201, 1581],
          [230, 1582],
          [198, 1583],
          [244, 1584],
          [246, 1585],
          [242, 1586],
          [251, 1587],
          [249, 1588],
          [255, 1589],
          [214, 1590],
          [220, 1591],
          [248, 1592],
          [163, 1593],
          [216, 1594],
          [215, 1595],
          [402, 1596],
          [225, 1597],
          [237, 1598],
          [243, 1599],
          [250, 1600],
          [241, 1601],
          [209, 1602],
          [170, 1603],
          [186, 1604],
          [191, 1605],
          [174, 1606],
          [172, 1607],
          [189, 1608],
          [188, 1609],
          [161, 1610],
          [171, 1611],
          [187, 1612],
          [1040, 1613],
          [1072, 1614],
          [1041, 1615],
          [1073, 1616],
          [1042, 1617],
          [1074, 1618],
          [1043, 1619],
          [1075, 1620],
          [1044, 1621],
          [1076, 1622],
          [1045, 1623],
          [1077, 1624],
          [1025, 1625],
          [1105, 1626],
          [1046, 1627],
          [1078, 1628],
          [1047, 1629],
          [1079, 1630],
          [1048, 1631],
          [1080, 1632],
          [1049, 1633],
          [1081, 1634],
          [1050, 1635],
          [1082, 1636],
          [1051, 1637],
          [1083, 1638],
          [1052, 1639],
          [1084, 1640],
          [1053, 1641],
          [1085, 1642],
          [1054, 1643],
          [1086, 1644],
          [1055, 1645],
          [1087, 1646],
          [1056, 1647],
          [1088, 1648],
          [1057, 1649],
          [1089, 1650],
          [1058, 1651],
          [1090, 1652],
          [1059, 1653],
          [1091, 1654],
          [1060, 1655],
          [1092, 1656],
          [1061, 1657],
          [1093, 1658],
          [1062, 1659],
          [1094, 1660],
          [1063, 1661],
          [1095, 1662],
          [1064, 1663],
          [1096, 1664],
          [1065, 1665],
          [1097, 1666],
          [1066, 1667],
          [1098, 1668],
          [1067, 1669],
          [1099, 1670],
          [1068, 1671],
          [1100, 1672],
          [1069, 1673],
          [1101, 1674],
          [1070, 1675],
          [1102, 1676],
          [1071, 1677],
          [1103, 1678],
          [260, 1679],
          [261, 1680],
          [262, 1681],
          [263, 1682],
          [280, 1683],
          [281, 1684],
          [323, 1685],
          [324, 1686],
          [346, 1687],
          [347, 1688],
          [377, 1689],
          [378, 1690],
          [379, 1691],
          [380, 1692],
          [321, 1693],
          [322, 1694],
          [211, 1695],
          [12484, 1696],
          [362, 1697],
          [363, 1698],
          [12471, 1699],
          [183, 1700],
          [180, 1701],
          [176, 1702],
          [128544, 1703],
          [9825, 1704]
        ].map(function(t) {
          return {
            code: t[0],
            sprite: k[t[1]]
          }
        }),
        n.exports
  });
  System.registerDynamic("55", ["1e"], !0, function(t, e, n) {
    "use strict";
    var r = t("1e");
    e.stand = {
      name: "stand",
      frames: 1,
      framesShift: 0,
      headBobs: [{
        x: 0,
        y: 0
      }],
      bodyBobs: [{
        x: 0,
        y: 0
      }],
      skew: [0],
      skewRev: [0],
      frontLegs: r.ponyLegFrontStand,
      backLegs: r.ponyLegBackStand,
      frontHooves: [null, r.ponyFetlocksFrontStand],
      backHooves: [null, r.ponyFetlocksBackStand],
      frontLegAccessory: r.ponyFrontLegAccessoriesStand,
      backLegAccessory: r.ponyBackLegAccessoriesStand,
      frontLegs2: r.ponLegFrontStand,
      backLegs2: r.ponLegBackStand,
      frontHooves2: [null, r.ponFetlocksFrontStand],
      backHooves2: [null, r.ponFetlocksBackStand],
      frontLegAccessory2: r.ponFrontLegAccessoriesStand,
      backLegAccessory2: r.ponBackLegAccessoriesStand
    };
    var i = [-1, 0, 1, 0, -1, -2, -3, -2, -1, 0, 1, 0, -1, -2, -3, -2].map(function(t) {
      return .25 * (t + 2)
    });
    return e.trot = {
      name: "trot",
      frames: 16,
      framesShift: 8,
      skew: i,
      skewRev: i.map(function(t) {
        return .5 - t
      }),
      headBobs: r.ponyBobsHeadTrot,
      bodyBobs: r.ponyBobsBodyTrot,
      frontLegs: r.ponyLegFrontTrot,
      backLegs: r.ponyLegBackTrot,
      frontHooves: [null, r.ponyFetlocksFrontTrot],
      backHooves: [null, r.ponyFetlocksBackTrot],
      frontLegAccessory: r.ponyFrontLegAccessoriesTrot,
      backLegAccessory: r.ponyBackLegAccessoriesTrot,
      frontLegs2: r.ponLegFrontTrot,
      backLegs2: r.ponLegBackTrot,
      frontHooves2: [null, r.ponFetlocksFrontTrot],
      backHooves2: [null, r.ponFetlocksBackTrot],
      frontLegAccessory2: r.ponFrontLegAccessoriesTrot,
      backLegAccessory2: r.ponBackLegAccessoriesTrot
    },
        e.animations = [e.stand, e.trot],
        n.exports
  });
  System.registerDynamic("41", [getCodeName("gl-matrix"), "21", "23", "c9", "1e", "55"], !0, function(t, e, n) {
    "use strict";

    function r() {
      return {
        animation: g.stand,
        animationFrame: 0,
        blinkFrame: 1
      }
    }

    function i(t, e, n, r, i, o) {
      return f.mat2d.identity(v),
          f.mat2d.translate(v, v, f.vec2.set(y, n + i, r + o)),
          d.skewY(v, v, e),
          f.mat2d.translate(v, v, f.vec2.set(y, -n, -r)),
      t && f.mat2d.mul(v, t, v),
          v
    }

    function o(t, n, r, o, u, l) {
      var f = o - e.PONY_WIDTH / 2,
          d = u - e.PONY_HEIGHT;
      l.selected && t.drawSprite(m.ponSelection, null, n.defaultPalette, f, d),
      l.shadow && t.drawSprite(m.ponShadow, h.SHADOW_COLOR, n.defaultPalette, f, d);
      var g = t.transform,
          v = r.animation,
          y = r.animationFrame % v.frames,
          E = (r.animationFrame + v.framesShift) % v.frames,
          A = p.at(v.headBobs, y),
          C = p.at(v.bodyBobs, y),
          D = f + C.x,
          O = d + C.y,
          I = f + A.x,
          R = d + A.y,
          F = v.skew[y],
          P = v.skewRev[y];
      t.transform = i(g, P * S, x, $, I, R),
          c(t, m.ponBehindManes, n.mane, 0, 0),
          t.transform = g,
          t.transform = i(g, F * k, M, T, I, R),
          c(t, m.ponBackBehindManes, n.backMane, 0, 0),
          t.transform = g;
      var j = !n.mane || !n.mane.type,
          N = j ? I - 1 : I,
          L = j ? R + 4 : R,
          U = n.headAccessory && 3 !== n.headAccessory.type;
      t.transform = i(g, F * (U ? k : 0), 35, T, N, L),
          c(t, m.ponHeadAccessories, n.headAccessory, 0, 0),
          t.transform = g;
      var B = f - 3,
          V = d - 1,
          H = v.frontLegs2,
          z = v.backLegs2,
          Y = p.at(v.frontHooves2, n.frontHooves && n.frontHooves.type),
          q = p.at(v.backHooves2, n.backHooves && n.backHooves.type),
          W = v.frontLegAccessory2,
          G = v.backLegAccessory2;
      l.onlyHead || (a(t, B, V, H, Y, W, n.frontLegAccessory, E, n.coatPalette, n.frontHooves.palette, h.FAR_COLOR),
          a(t, B, V, z, q, G, n.backLegAccessory, E, n.coatPalette, n.backHooves.palette, h.FAR_COLOR)),
      l.onlyHead || (t.transform = i(g, F * w, b, _, D, O),
          c(t, m.ponTails, n.tail, 0, 0),
          t.transform = g),
          t.drawSprite(m.ponBody, null, n.coatPalette, D, O),
      l.onlyHead || (a(t, f, d, H, Y, W, n.frontLegAccessory, y, n.coatPalette, n.frontHooves.palette, h.WHITE),
          a(t, f, d, z, q, G, n.backLegAccessory, y, n.coatPalette, n.backHooves.palette, h.WHITE)),
      l.onlyHead || (t.drawSprite(l.flipped && n.cmFlip ? m.ponCMFlip : m.ponCM, null, n.cmPalette, D + 43, O + 49),
          c(t, m.ponWings, n.wings, D, O)),
          c(t, m.ponNeckAccessories, n.neckAccessory, D, O),
          s(t, n, I, R, F, P, r.blinkFrame, l.flipped)
    }

    function a(t, e, n, r, i, o, a, s, u, l, f) {
      var h = p.at(i, s);
      t.drawSprite(p.at(r, s), f, u, e, n),
          t.drawSprite(h ? h.color : null, f, l, e, n),
          c(t, p.at(o, s), a, e, n, f)
    }

    function s(t, e, n, r, o, a, s, f) {
      void 0 === s && (s = 1);
      var d = t.transform;
      t.drawSprite(m.ponEar2, null, e.coatPalette, n, r),
          t.drawSprite(m.ponHead, null, e.coatPalette, n, r),
          c(t, m.ponFacialHair, e.facialHair, n, r);
      var g = p.at(m.ponNoses, e.muzzle);
      t.drawSprite(g.mouth, null, e.defaultPalette, n, r),
          t.drawSprite(g.muzzle, null, e.coatPalette, n, r),
      e.fangs && t.drawSprite(g.fangs, null, e.defaultPalette, n, r);
      var v = u(e.freckles, f);
      t.drawSprite(p.at(m.ponFreckles, v), null, e.frecklesColor, n, r),
      e.eyeshadow && (t.drawSprite(m.ponEyeshadow, null, e.eyeshadowColor, n, r),
          t.drawSprite(m.ponEyeshadowShine, h.SHINES_COLOR, e.defaultPalette, n, r));
      var y = f ? e.eyeColorRight : e.eyeColorLeft,
          b = f ? e.eyeColorLeft : e.eyeColorRight,
          _ = f ? e.eyeOpennessRight : e.eyeOpennessLeft,
          w = f ? e.eyeOpennessLeft : e.eyeOpennessRight;
      l(t, p.at(m.ponEyeLeft, Math.max(s, _)), e, y, n, r),
          l(t, p.at(m.ponEyeRight, Math.max(s, w)), e, b, n, r),
          t.transform = i(d, o * k, M, T, n, r),
          c(t, m.ponBackFrontManes, e.backMane, 0, 0),
          t.transform = d;
      var S = i(d, a * E, x, $, n, r);
      t.transform = S,
          c(t, m.ponTopManes, e.mane, 0, 0),
          t.transform = d,
          c(t, m.ponHorns, e.horn, n, r),
          t.drawSprite(m.ponEar, null, e.coatPalette, n, r),
          c(t, m.ponFaceAccessories, e.faceAccessory, n, r),
          c(t, m.ponEarAccessories, e.earAccessory, n, r),
          t.transform = S,
          c(t, m.ponFrontManes, e.mane, 0, 0),
          t.transform = d
    }

    function u(t, e) {
      var n = 0 | t;
      return e && 3 === n ? n = 4 : e && 4 === n && (n = 3),
          n
    }

    function l(t, e, n, r, i, o) {
      e && (t.drawSprite(n.eyelashes ? e.lashes : e.normal, null, n.eyePalette, i, o),
          t.drawSprite(e.iris, null, r, i, o))
    }

    function c(t, e, n, r, i, o) {
      var a = n && p.at(e, n.type);
      if (a) {
        var s = p.at(a, n.pattern);
        s && (t.drawSprite(s.color, o, n.palette, r, i),
            t.drawSprite(s.extra, null, n.extraPalette, r, i))
      }
    }

    var f = t(getCodeName("gl-matrix")),
        p = t("21"),
        h = t("23"),
        d = t("c9"),
        m = t("1e"),
        g = t("55");
    e.PONY_WIDTH = 80,
        e.PONY_HEIGHT = 70,
        e.BLINK_FRAMES = [2, 6, 6, 4, 2],
        e.createDefaultPonyState = r;
    var v = f.mat2d.create(),
        y = f.vec2.create(),
        b = 42,
        _ = 50,
        w = 0,
        x = 42,
        $ = 27,
        E = 0,
        S = 0,
        M = 40,
        T = 27,
        k = 0;
    return e.drawPonyGL2 = o,
        e.drawSpriteSet2 = c,
        n.exports
  });
  System.registerDynamic("cb", ["20", "30", "41"], !0, function(t, e, n) {
    "use strict";
    var r = t("20"),
        i = t("30"),
        o = t("41"),
        a = function() {
          function t(t, e, n) {
            this.$location = t,
                this.gameService = e,
                this.model = n,
                this.maxNameLength = r.PLAYER_NAME_MAX_LENGTH,
                this.state = o.createDefaultPonyState(),
                this.authError = t.search().error
          }

          return Object.defineProperty(t.prototype, "joining", {
            get: function() {
              return this.gameService.joining
            },
            enumerable: !0,
            configurable: !0
          }),
              Object.defineProperty(t.prototype, "pony", {
                get: function() {
                  return this.model.pony
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "ponies", {
                get: function() {
                  return this.model.ponies
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, "canNew", {
                get: function() {
                  return this.ponies.length < r.PONY_LIMIT
                },
                enumerable: !0,
                configurable: !0
              }),
              t.prototype.new = function() {
                this.model.selectPony(i.createDefaultPony()),
                    this.$location.url("/character")
              },
              t.prototype.select = function(t) {
                this.model.selectPony(t)
              },
              t.$inject = ["$location", "gameService", "model"],
              t
        }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = a,
        n.exports
  });
  System.registerDynamic("cc", [], !0, function(t, e, n) {
    return n.exports = '<div class="text-center heading"><img src="/images/logo.png" width="574" height="130" class="pixelart hidden-xs"><img src="/images/logo-small.png" width="287" height="65" class="pixelart hidden-lg hidden-md hidden-sm"></div><div class="center-block home-content"><div ng-if="vm.model.loading" style="font-size: 50px; padding: 150px 0;" class="text-muted text-center"><i class="fa fa-fw fa-spin fa-spinner"></i></div><div ng-if="!vm.model.loading"><div ng-if="!vm.model.account" class="form-group"><sign-in-box></sign-in-box></div><div ng-if="vm.authError" class="form-group"><div class="alert alert-danger">{{vm.authError}}</div></div><div ng-if="!!vm.model.account"><div class="form-group"><div class="input-group"><input type="text" ng-model="vm.pony.name" placeholder="name of your character" maxlength="{{vm.maxNameLength}}" ng-disabled="vm.joining" class="form-control text-center"><div class="input-group-btn"><a href="/character" ng-class="{ disabled: vm.joining }" class="btn btn-default">edit</a><div uib-dropdown style="width: auto;" class="btn-group"><button type="button" ng-disabled="!vm.ponies.length || vm.joining" uib-dropdown-toggle class="btn btn-default"><span class="caret"></span></button><ul uib-dropdown-menu class="dropdown-menu-right"><li ng-repeat="i in vm.ponies | orderBy:\'name\' track by $index"><a href="#" ng-click="vm.select(i)">{{i.name}}</a></li><li ng-if="vm.canNew"><a href="#" ng-click="vm.new()" class="text-center"><em>new pony</em></a></li></ul></div></div></div></div><div class="form-group"><character-preview pony="vm.pony" state="vm.state"></character-preview></div><div class="form-group text-center"><play-box></play-box></div><div style="max-width: 400px;" class="rules center-block text-left"><h4>General rules</h4><ul class="text-muted"><li>Be kind to others</li><li>Don\'t spam</li><li>Don\'t modify the game with hacks or scripts</li><li>Don\'t encourage spamming or hacking</li></ul></div><div style="max-width: 400px;" class="rules center-block text-left"><h4>Notice</h4><p class="text-muted">This game is very early in development. There might be bugs and occasional downtimes.</p><p class="text-muted">Please do not redistribute any of the game files or code.</p></div></div></div></div>',
        n.exports
  });
  System.registerDynamic("cd", [], !0, function(t, e, n) {
    return n.exports = '<h1>About</h1><div class="row"><div class="col-md-6"><p class="lead">A game of ponies building a town\n</p><h2>Keyboard shortcuts</h2><ul><li><b>movement</b><ul><li>use <kbd><i class="fa fa-arrow-up"></i></kbd> <kbd><i class="fa fa-arrow-left"></i></kbd> <kbd><i class="fa fa-arrow-down"></i></kbd> <kbd><i class="fa fa-arrow-right"></i></kbd>\nor <kbd class="b">W</kbd> <kbd class="b">A</kbd> <kbd class="b">S</kbd> <kbd class="b">D</kbd> to move</li><li>hold <kbd class="b">shift</kbd> to walk slowly</li></ul></li><li><b>chat</b><ul><li><kbd class="b">enter</kbd> to open chat box and send a message</li><li><kbd class="b">esc</kbd> to cancel the message</li></ul></li><li><b>zoom (1x, 2x, 3x, 4x)</b> - <kbd class="b">P</kbd></li><li><b>hide all text</b> - <kbd class="b">F2</kbd></li><li><b>fade all objects</b> - <kbd class="b">F4</kbd></li><li><b>fullscreen</b> - <kbd class="b">F11</kbd></li><li>hold <kbd class="b">shift</kbd> to be able to click on ground and items behind other players</li></ul><h2>Emotes</h2><p>You can use emotes in chat by typings their name surrounded by colons <samp>:apple:</samp>\nor by using unicode characters assigned to them. Available emotes:\n</p><div class="columns-200"><ul><li ng-repeat="e in vm.emotes">:{{e.name}}: - {{e.symbol}}</li></ul></div><h2>Technology</h2><p>The entire game is written in <a href="http://www.typescriptlang.org/">TypeScript</a>,\na typed superset of JavaScript that compiles to plain JavaScript.\nServer side code is running on <a href="https://nodejs.org/en/">Node.js</a> server with WebSockets for communication.\nUser interface is built using <a href="https://angularjs.org/">Angular.js</a> framework and \nthe game itself is using WebGL for rendering graphics.\n</p><h2>The Team</h2><h3 id="agamnentzar">Agamnentzar</h3>\n<p><a href="http://agamnentzar.deviantart.com/">deviantart</a> | <a href="http://agamnentzar.tumblr.com/">tumblr</a></p>\n<ul>\n<li>Designer</li>\n<li>Programmer</li>\n<li>Artist</li>\n</ul>\n<h3 id="shino">Shino</h3>\n<p><a href="http://shinodage.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n<li>Animator</li>\n</ul>\n<h3 id="chirachan">ChiraChan</h3>\n<p><a href="http://chiramii-chan.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<h3 id="velenor">Velenor</h3>\n<p><a href="http://velenor.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n<li>Animator</li>\n</ul>\n<h3 id="disastral">Disastral</h3>\n<p><a href="http://askdisastral.tumblr.com/">tumblr</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<h3 id="cyberpon3">CyberPon3</h3>\n<p><a href="http://cyberpon3.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Programmer</li>\n</ul>\n<h2>Other contributors</h2><div class="columns-200"><p><strong>OtakuAP</strong> - <a href="http://otakuap.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n<li>Animator</li>\n</ul>\n<p><strong>Velvet-Frost</strong> - <a href="http://velvet-frost.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<p><strong>Jet7Wave</strong> - <a href="http://jetwave.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<p><strong>Meno</strong> - <a href="http://menojar.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<p><strong>Lalieri</strong> - <a href="http://lalieri.tumblr.com/">tumblr</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<p><strong>Goodly</strong> - <a href="http://goodlyay.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n</div></div><div class="col-md-6"><h2>Changelog</h2><h4 id="v0-16-2">v0.16.2</h4>\n<ul>\n<li>Added tags for developers <span class="label label-dev">DEV</span> and moderators <span class="label label-mod">MOD</span></li>\n<li>Added :green_apple: and :angry: emotes</li>\n<li>Added locking of save &amp; join button to prevent getting rate limited</li>\n<li>Improved performance of drawing chat boxes</li>\n<li>Fixed issues with incorrect drawing order of butterflies</li>\n<li>Fixed padding issues on selection box</li>\n<li>Fixed error messages not being displayed correctly</li>\n<li>Fixed rate limits being too low for IPs shared by multiple people</li>\n<li>Fixed issue that could cause flickering or broken rendering in some cases</li>\n</ul>\n<h4 id="v0-16-1">v0.16.1</h4>\n<ul>\n<li>Added export method to save pictures of created character</li>\n<li>Improved look of floating character to make it more obvious</li>\n<li>Improved performance of character creator</li>\n<li>Improved performance of chat bubbles rendering</li>\n<li>Fixed image scaling for selection boxes on high DPI devices</li>\n<li>Fixed in-game color of eyeshadow shine</li>\n<li>Fixed issues with rendering engine</li>\n<li>Fixed issues ignore user option not working in certain situations</li>\n<li>Fixed game screen stuck blinking when error occurs during play</li>\n</ul>\n<h4 id="v0-16-0">v0.16.0</h4>\n<ul>\n<li>Added option for locking back leg accessory</li>\n<li>Added loading message when joining to the game</li>\n<li>Added button for opening color picker without selecting input box</li>\n<li>Added floating character preview when scrolling far down in character editor</li>\n<li>Added shortcut <kbd>F4</kbd> for fading all objects</li>\n<li>Improved rendering performance</li>\n<li>Improved selection when selecting a pony from a group of stacked ponies</li>\n<li>Fixed issues when joining to the game</li>\n<li>Fixed issues with updating game state when game runs in background tab</li>\n<li>Fixed issue with glasses color difference between editor and the game</li>\n<li>Fixed issue with automatic account merging not working in certain cases</li>\n<li>Fixed issue with clock showing 60 minutes</li>\n<li>Fixed scale on high DPI devices</li>\n<li>Fixed graphical glitches on some devices</li>\n<li>Fixed cancelling joining not working in certain cases</li>\n<li>Fixed back hair and tail color resetting in certain cases</li>\n</ul>\n<h4 id="v0-15-2">v0.15.2</h4>\n<ul>\n<li>Fixed deleting ponies</li>\n<li>Fixed clouds overlapping</li>\n<li>Fixed glass in glasses not rendering properly</li>\n</ul>\n<h4 id="v0-15-1">v0.15.1</h4>\n<ul>\n<li>Fixed errors when leaving and joining the game</li>\n<li>Fixed selection ring not showing up</li>\n<li>Fixed non-flipped buttmark being drawn incorrectly</li>\n<li>Fixed color parsing issue with empty colors</li>\n<li>Fixed locking colors for accessories</li>\n</ul>\n<h4 id="v0-15-0">v0.15.0</h4>\n<ul>\n<li>Added socks</li>\n<li>Added server name in settings dropdown</li>\n<li>Added associated social site account list on account page</li>\n<li>Added saving of last used zoom level</li>\n<li>Removed security check causing page styles to not load on some setups</li>\n<li>Improved performance of rendering engine</li>\n<li>Increased max number of ponies to 20</li>\n<li>Fixed redirecting to home page when reloading account page</li>\n<li>Fixed game screen blinking randomly</li>\n</ul>\n<h4 id="v0-14-5">v0.14.5</h4>\n<ul>\n<li>Fixed wrapping long names on character selection box</li>\n</ul>\n<h4 id="v0-14-4">v0.14.4</h4>\n<ul>\n<li>Added duplicate character option to character creator</li>\n<li>Added better error handling for DDOS protection errors</li>\n<li>Added option to share social accounts on pony selection box</li>\n<li>Added automatic closing of pony selection box when selected pony leaves the game</li>\n<li>Enabled swear filter by default on safe server</li>\n<li>Removed security check causing page to not load on some setups</li>\n<li>Fixed game crashing when changing scale if given resolution is not suported</li>\n<li>Fixed caching issues with main page</li>\n</ul>\n<h4 id="v0-14-3">v0.14.3</h4>\n<ul>\n<li>Fixed color picker hiding when selecting a color</li>\n<li>Fixed color picker input not selecting text when focused on firefox</li>\n<li>Fixed performance issue when selecting colors in character creator</li>\n<li>Fixed being redirected to home page from character creator on refresh</li>\n</ul>\n<h4 id="v0-14-2">v0.14.2</h4>\n<ul>\n<li>Added client script version check when joining to the game</li>\n</ul>\n<h4 id="v0-14-1">v0.14.1</h4>\n<ul>\n<li>Hotfixes</li>\n</ul>\n<h4 id="v0-14-0">v0.14.0</h4>\n<ul>\n<li>Added selecting other players (hold <kbd>shift</kbd> to be able to click on ground and items behind other players)</li>\n<li>Added option for ignoring other players</li>\n<li>Fixed about page inaccuracies</li>\n<li>Fixed gamepad controls</li>\n</ul>\n<h4 id="v0-13-2">v0.13.2</h4>\n<ul>\n<li>Added slow walking with <kbd>shift</kbd> key</li>\n<li>Adjusted day-night cycle length and night darkness intensity</li>\n<li>Adjusted dead zone for gamepads</li>\n<li>Improved networking performance</li>\n<li>Fixed disconnect issues on mobile devices</li>\n</ul>\n<h4 id="v0-13-1">v0.13.1</h4>\n<ul>\n<li>Fixed multiple servers not connecting properly</li>\n</ul>\n<h4 id="v0-13-0">v0.13.0</h4>\n<ul>\n<li>Added touch and gamepad controls</li>\n<li>Added day-night cycle</li>\n<li>Added game time clock</li>\n<li>Added option to leave game without having to reload the page</li>\n<li>Added support for multiple servers</li>\n<li>Fixed horn outlines</li>\n<li>Fixed zoom repeating when holding zoom key</li>\n<li>Fixed getting logged out when closing browser</li>\n</ul>\n<h4 id="v0-12-1">v0.12.1</h4>\n<ul>\n<li>Added back lighting test shortcut <kbd>T</kbd></li>\n<li>Added keyboard shortcut <kbd>F2</kbd> for hiding all text messages</li>\n<li>Fixed issue with setting color and opennes independently for left and right eye</li>\n<li>Fixed issue with incorrect pony name text placement</li>\n<li>Fixed being able to spawn inside a tree</li>\n</ul>\n<h4 id="v0-12-0">v0.12.0</h4>\n<ul>\n<li>Added trees</li>\n<li>Added pumpkins</li>\n<li>Added eyeshadow</li>\n<li>Added hats</li>\n<li>Added tie</li>\n<li>Added reading glasses</li>\n<li>Added flower ear accessory</li>\n<li>Added new face markings</li>\n<li>Added new emotes</li>\n<li>Changed map design</li>\n<li>Fixed head accessories placement without hair</li>\n<li>Fixed not being able to set 6th color on 2nd mane</li>\n</ul>\n<h4 id="v0-11-4">v0.11.4</h4>\n<ul>\n<li>Added new scarf pattern</li>\n<li>Improved rendering performance</li>\n<li>Fixed not being able to see name of a pony when they are saying something</li>\n<li>Fixed issues with server restart</li>\n<li>Fixed fetlocks in trot animation</li>\n<li>Fixed issues with font and emote spacing</li>\n</ul>\n<h4 id="v0-11-3">v0.11.3</h4>\n<ul>\n<li>Added scarf accessory</li>\n<li>Added option for hiding all chat messages with russian text</li>\n<li>Added list of rules and in-development notice</li>\n<li>Fixed some issues with chat messages</li>\n<li>Fixed multiple issues with manes</li>\n<li>Fixed issue with fetlocks</li>\n</ul>\n<h4 id="v0-11-2">v0.11.2</h4>\n<ul>\n<li>Added announcements support</li>\n<li>Added hide background switch for pony creator</li>\n<li>Removed stones from the spawning area</li>\n</ul>\n<h4 id="v0-11-1">v0.11.1</h4>\n<ul>\n<li>Added polish characters to pixel font</li>\n<li>Fixed sign-in with facebook</li>\n<li>Fixed cancelling character edit</li>\n<li>Fixed clouds</li>\n<li>Fixed spelling mistake</li>\n<li>Fixed buttmark position</li>\n</ul>\n<h4 id="v0-11-0">v0.11.0</h4>\n<ul>\n<li>Added cyrillic characters to pixel font</li>\n<li>Added logos</li>\n<li>Added optional swear filter</li>\n<li>Added more mane styles</li>\n<li>Reworked sign-in and account system</li>\n<li>Improved networking performance</li>\n</ul>\n<h4 id="v0-10-1">v0.10.1</h4>\n<ul>\n<li>Fixed connection resetting every 10 seconds when not in game</li>\n</ul>\n<h4 id="v0-10-0">v0.10.0</h4>\n<ul>\n<li>Added back butterflies</li>\n<li>Improved networking performance</li>\n<li>Fixed not initialized errors</li>\n<li>Fixed deleting character not updating character list</li>\n<li>Fixed cursor and camera offset errors on screens with high pixel density</li>\n<li>Fixed styling issue in chat box</li>\n</ul>\n<h4 id="v0-9-8">v0.9.8</h4>\n<ul>\n<li>Improved connection performance</li>\n<li>Fixed issues with chat box focus on Safari and Edge</li>\n</ul>\n<h4 id="v0-9-7">v0.9.7</h4>\n<ul>\n<li>Added chat buttons</li>\n<li>Improved connection performance</li>\n<li>Fixed automatically signing in after signing up for new account</li>\n<li>Fixed character name not saving if joining the game from home screen</li>\n</ul>\n<h4 id="v0-9-6">v0.9.6</h4>\n<ul>\n<li>Added logging off after 15 minutes of no activity</li>\n<li>Improved performance of joining to the game</li>\n<li>Fixed multiple issues with character creator on IE11</li>\n</ul>\n<h4 id="v0-9-5">v0.9.5</h4>\n<ul>\n<li>Fixed non-flippable buttmarks</li>\n<li>Fixed some rate limiting issues</li>\n</ul>\n<h4 id="v0-9-4">v0.9.4</h4>\n<ul>\n<li>Removed ability to log into the same character multiple times</li>\n<li>Added back rocks</li>\n<li>Added displaying of WegGL initialization error</li>\n</ul>\n<h4 id="v0-9-3">v0.9.3</h4>\n<ul>\n<li>Removed rocks</li>\n</ul>\n<h4 id="v0-9-2">v0.9.2</h4>\n<ul>\n<li>Removed butterflies</li>\n<li>Removed debug code</li>\n</ul>\n<h4 id="v0-9-1">v0.9.1</h4>\n<ul>\n<li>Fixed issue with rendering when value is out of range</li>\n</ul>\n<h4 id="v0-9-0">v0.9.0</h4>\n<ul>\n<li>Added shading to trot animation</li>\n<li>Added new mane styles</li>\n<li>Added mane color patterns</li>\n<li>Added option for non-flippable butt marks</li>\n<li>Added account system</li>\n<li>Added saving characters on server side</li>\n<li>Fixed eye colors switching sides  when turning left and right</li>\n<li>Fixed performance issues with rendering</li>\n<li>Fixed shader code not working on some low end devices</li>\n<li>Fixed errors when character has invalid values set for sprite types</li>\n<li>Fixed being able to use transparency for character colors</li>\n<li>Fixed chat not limiting characters properly</li>\n</ul>\n<h4 id="v0-8-0">v0.8.0</h4>\n<ul>\n<li>Added character customization in game</li>\n<li>Added eye blinking</li>\n<li>Added character selection on home screen</li>\n</ul>\n<h4 id="v0-7-0">v0.7.0</h4>\n<ul>\n<li>Removed spawn command</li>\n<li>Added character creation prototype</li>\n</ul>\n<h4 id="v0-6-1">v0.6.1</h4>\n<ul>\n<li>Fixed mouse not working in the game</li>\n</ul>\n<h4 id="v0-6-0">v0.6.0</h4>\n<ul>\n<li>Added AFK indicator</li>\n<li>Updated styles</li>\n<li>Fixed wrong cursor position on retina displays and zommed in pages</li>\n<li>Fixed emoticon parsing</li>\n<li>Fixed issue on mobile devices</li>\n</ul>\n<h4 id="v0-5-0">v0.5.0</h4>\n<ul>\n<li>Added butterfies</li>\n<li>Added apples</li>\n<li>Added apple emote to chat</li>\n<li>Fixed login form not displaying on mobile safari</li>\n</ul>\n<div class="text-muted">• c •</div></div></div>',
        n.exports
  });
  System.registerDynamic("ce", [], !0, function(t, e, n) {
    return n.exports = '<div ng-init="vm.init()" class="row"><div class="col-md-6 text-center"><div style="max-width: 400px; margin: auto;" class="input-group"><input type="text" ng-model="vm.pony.name" placeholder="name of your character" maxlength="{{vm.maxNameLength}}" class="form-control text-center"><div class="input-group-btn"><button type="button" ng-click="vm.new()" ng-disabled="!vm.canNew" class="btn btn-default">new</button><div uib-dropdown class="btn-group"><button type="button" ng-disabled="!vm.ponies.length" uib-dropdown-toggle class="btn btn-default"><span class="caret"></span></button><ul uib-dropdown-menu class="dropdown-menu-right"><li ng-repeat="p in vm.ponies | orderBy:\'name\' track by $index"><a href="#" ng-click="vm.select(p)">{{p.name}}</a></li></ul></div><button type="button" ng-if="!vm.deleting" ng-disabled="!vm.canDelete" ng-click="vm.deleting = true" title="delete pony" class="btn btn-danger"><i class="fa fa-trash"></i></button><button type="button" ng-if="vm.deleting" ng-disabled="!vm.canDelete" ng-click="vm.deleting = false" uib-tooltip="cancel" class="btn btn-danger"><i class="fa fa-fw fa-times"></i></button><button type="button" ng-if="vm.deleting" ng-disabled="!vm.canDelete" ng-click="vm.delete()" uib-tooltip="confirm delete" class="btn btn-success"><i class="fa fa-fw fa-check"></i></button></div></div><div style="margin: 30px auto 20px auto;" fix-to-top="vm.fixed = fixed" fix-to-top-offset="-40" class="character-preview-box"><character-preview pony="vm.pony" state="vm.state" no-background="true" no-shadow="vm.fixed"></character-preview></div><div class="form-group text-center"><button ng-disabled="!vm.canDuplicate" ng-click="vm.duplicate()" class="btn btn-lg btn-default">Duplicate</button> <button ng-disabled="!vm.canRevert" ng-click="vm.revert()" class="btn btn-lg btn-default">Revert</button> <button ng-disabled="!vm.canSave" ng-click="vm.save()" class="btn btn-lg btn-default">Save</button></div><div style="max-width: 400px;" class="center-block"><play-box label="Save and Play" error="vm.error"></play-box></div><div style="max-width: 400px;" class="rules center-block text-left"><h4>General rules</h4><ul class="text-muted"><li>Be kind to others</li><li>Don\'t spam</li><li>Don\'t modify the game with hacks or scripts</li><li>Don\'t encourage spamming or hacking</li></ul></div><div style="max-width: 400px;" class="rules center-block text-left"><h4>Notice</h4><p class="text-muted">This game is very early in development. There might be bugs and occasional downtimes.</p><p class="text-muted">Please do not redistribute any of the game files or code.</p></div></div><div style="min-height: 500px;" class="col-md-6"><uib-tabset type="pills" active="vm.activeTab" ng-if="vm.loaded"><uib-tab heading="body"><div class="panel container-fluid character-tab"><div class="form-horizontal"><div class="row form-group"><div class="col-sm-4"><label class="control-label">General options</label></div><div class="col-sm-8"><div class="clearfix"><check-box icon="fa-check" checked="vm.pony.customOutlines" class="pull-left"></check-box><label style="margin-left: 10px;" class="form-control-static text-muted">allow custom outlines</label></div></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Show social site</label></div><div class="col-sm-8"><div uib-dropdown class="dropdown btn-group"><button uib-dropdown-toggle class="btn btn-default"><i ng-if="vm.site.icon" ng-class="vm.site.icon" ng-style="{ color: vm.site.color }" class="fa fa-fw fa-lg"></i><b> {{vm.site.name}} </b><span class="caret"></span></button><ul uib-dropdown-menu class="dropdown-menu"><li ng-repeat="s in vm.sites"><a ng-click="vm.site = s"><i ng-class="s.icon" ng-style="{ color: s.color }" class="fa fa-fw fa-lg"></i><b> {{s.name}}</b></a></li></ul></div> <div uib-dropdown ng-if="vm.tags.length &gt; 1" class="dropdown btn-group"><button uib-dropdown-toggle class="btn btn-default"><span ng-if="vm.tag.id" ng-class="\'label-\' + vm.tag.id" class="label">{{vm.tag.id}}</span><b ng-if="!vm.tag.id">{{vm.tag.name}}</b> <span class="caret"></span></button><ul uib-dropdown-menu class="dropdown-menu"><li ng-repeat="t in vm.tags"><a ng-click="vm.tag = t"><span ng-if="t.id" ng-class="\'label-\' + t.id" class="label">{{t.id}}</span><b ng-if="!t.id">{{t.name}}</b></a></li></ul></div></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Animation</label></div><div class="col-sm-8"><div class="btn-group"><label ng-repeat="a in ::vm.animations" ng-model="vm.activeAnimation" uib-btn-radio="::$index" class="btn btn-primary">{{::a.name}}</label></div> <button ng-click="vm.export(vm.activeAnimation)" class="btn btn-default"><i class="fa fa-save"></i></button> <button ng-if="vm.canExport" ng-click="vm.export()" class="btn btn-default"><i class="fa fa-save"></i> all</button></div></div><div class="row form-group"><div class="col-sm-4"><check-box icon="fa-play" checked="vm.playAnimation" class="lock-box"></check-box><label class="control-label">Frame</label></div><div class="col-sm-8"><input type="number" ng-model="vm.state.animationFrame" ng-disabled="vm.playAnimation" min="0" class="form-control"></div></div><hr><fill-outline label="Body color" fill="vm.pony.coatFill" outline="vm.pony.coatOutline" outline-locked="vm.pony.lockCoatOutline" outline-hidden="!vm.customOutlines"></fill-outline><hr><sprite-set-selection label="Horn" base="vm.baseCoatColor" set="vm.pony.horn" sets="::vm.horns" outline-hidden="!vm.customOutlines" compact="true"></sprite-set-selection><hr><sprite-set-selection label="Wings" base="vm.baseCoatColor" set="vm.pony.wings" sets="::vm.wings" outline-hidden="!vm.customOutlines" compact="true"></sprite-set-selection><hr><sprite-set-selection label="Front hooves" base="vm.baseCoatColor" set="vm.pony.frontHooves" sets="::vm.frontHooves" outline-hidden="!vm.customOutlines" compact="true"></sprite-set-selection><hr><sprite-set-selection label="Back hooves" base="vm.baseCoatColor" set="vm.pony.backHooves" sets="::vm.backHooves" outline-hidden="!vm.customOutlines" compact="true"></sprite-set-selection><hr><div class="row form-group"><div class="col-sm-12 text-center"><label class="control-label text-muted">Butt mark</label></div></div><div class="row form-group"><div class="col-sm-7"><button ng-click="vm.clearCM()" title="Clear all" class="btn btn-primary"><i class="fa fa-fw fa-trash"></i></button> <div class="btn-group"><label ng-model="vm.brushType" uib-btn-radio="\'eraser\'" title="Eraser" class="btn btn-primary"><i class="fa fa-fw fa-eraser"></i></label><label ng-model="vm.brushType" uib-btn-radio="\'eyedropper\'" title="Eyedropper" class="btn btn-primary"><i class="fa fa-fw fa-eyedropper"></i></label><label ng-model="vm.brushType" uib-btn-radio="\'brush\'" title="Brush" class="btn btn-primary"><i class="fa fa-fw fa-paint-brush"></i></label></div></div><div class="col-sm-5"><color-picker color="vm.brush"></color-picker></div></div><div class="row form-group"><div class="col-sm-12 text-center"><bitmap-box bitmap="vm.pony.cm" tool="vm.brushType" color="vm.brush" width="::vm.cmSize" height="::vm.cmSize"></bitmap-box></div></div><div class="row form-group"><div class="col-sm-12 text-center"><check-box icon="fa-check" checked="vm.pony.cmFlip"></check-box><label style="margin-left: 10px; vertical-align: top;" class="form-control-static text-muted">don\'t flip mark on the other side</label></div></div></div></div></uib-tab><uib-tab heading="mane"><div class="panel container-fluid character-tab"><div class="form-horizontal"><sprite-set-selection label="Mane" base="vm.baseHairColor" set="vm.pony.mane" sets="::vm.manes" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection><hr><sprite-set-selection label="Back mane" base="vm.baseHairColor" set="vm.pony.backMane" sets="::vm.backManes" outline-hidden="!vm.customOutlines"></sprite-set-selection></div></div></uib-tab><uib-tab heading="tail"><div class="panel container-fluid character-tab"><div class="form-horizontal"><sprite-set-selection label="Tail" base="vm.baseHairColor" set="vm.pony.tail" sets="::vm.tails" outline-hidden="!vm.customOutlines"></sprite-set-selection></div></div></uib-tab><uib-tab heading="face"><div class="panel container-fluid character-tab"><div class="form-horizontal"><div class="row form-group"><div class="col-sm-4"><label class="control-label">Eyelashes</label></div><div class="col-sm-8"><div class="btn-group"><label ng-model="vm.pony.eyelashes" uib-btn-radio="0" class="btn btn-primary">no</label><label ng-model="vm.pony.eyelashes" uib-btn-radio="1" class="btn btn-primary">yes</label></div></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Eye color</label></div><div class="col-sm-8"><color-picker color="vm.pony.eyeColorRight" changed="vm.eyeColorLockChanged(vm.pony.lockEyeColor)"></color-picker></div></div><div class="row form-group"><div class="col-sm-4"><check-box checked="vm.pony.lockEyeColor" icon="fa-lock" changed="vm.eyeColorLockChanged($value)" class="lock-box"></check-box><label class="control-label">Eye color (left)</label></div><div class="col-sm-8"><color-picker color="vm.pony.eyeColorLeft" is-disabled="vm.pony.lockEyeColor"></color-picker></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Eye whites color</label></div><div class="col-sm-8"><color-picker color="vm.pony.eyeWhites"></color-picker></div></div><div class="row form-group"><div class="col-sm-4"><check-box checked="vm.pony.lockEyes" icon="fa-lock" changed="vm.eyeOpennessChanged($value)" class="lock-box"></check-box><label class="control-label">Eye openness</label></div><div class="col-sm-4 col-xs-6"><input type="number" ng-model="vm.pony.eyeOpennessRight" min="1" max="6" step="1" ng-change="vm.eyeOpennessChanged(vm.pony.lockEyes)" class="form-control"></div><div class="col-sm-4 col-xs-6"><input type="number" ng-model="vm.pony.eyeOpennessLeft" min="1" max="6" step="1" ng-disabled="vm.pony.lockEyes" class="form-control"></div></div><div class="row form-group"><div class="col-sm-4"><check-box checked="vm.pony.eyeshadow" icon="fa-check" class="lock-box"></check-box><label class="control-label">Eyeshadow</label></div><div class="col-sm-8"><color-picker color="vm.pony.eyeshadowColor" is-disabled="!vm.pony.eyeshadow"></color-picker></div></div><hr><div class="row form-group"><div class="col-sm-4"><label class="control-label">Expression</label></div><div class="col-sm-8"><sprite-selection selected="vm.pony.muzzle" sprites="vm.muzzles" fill="vm.pony.coatFill" outline="vm.pony.coatOutline" circle="vm.pony.coatFill"></sprite-selection></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Fangs</label></div><div class="col-sm-8"><sprite-selection selected="vm.pony.fangs" sprites="vm.fangs" outline="vm.pony.coatOutline" circle="vm.pony.coatFill"></sprite-selection></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Markings</label></div><div class="col-sm-8"><sprite-selection selected="vm.pony.freckles" sprites="vm.freckles" fill="vm.pony.frecklesColor" outline="vm.pony.coatOutline" circle="vm.pony.coatFill"></sprite-selection></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Markings color</label></div><div class="col-sm-8"><color-picker color="vm.pony.frecklesColor" is-disabled="!vm.pony.freckles"></color-picker></div></div><hr><sprite-set-selection label="Facial hair" base="vm.baseHairColor" set="vm.pony.facialHair" sets="::vm.facialHair" outline-hidden="!vm.customOutlines"></sprite-set-selection></div></div></uib-tab><uib-tab heading="other"><div class="panel container-fluid character-tab"><div class="form-horizontal"><uib-tabset active="vm.activeAccessoryTab"><uib-tab heading="head"><div style="margin-top: 10px;"><sprite-set-selection label="Head accessories" base="vm.baseHeadAccessoryColor" set="vm.pony.headAccessory" sets="::vm.headAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection><hr><sprite-set-selection label="Ear accessories" base="vm.baseEarAccessoryColor" set="vm.pony.earAccessory" sets="::vm.earAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection><hr><sprite-set-selection label="Face accessories" base="vm.baseFaceAccessoryColor" set="vm.pony.faceAccessory" sets="::vm.faceAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection></div></uib-tab><uib-tab heading="neck"><div style="margin-top: 10px;"><sprite-set-selection label="Neck accessories" base="vm.baseNeckAccessoryColor" set="vm.pony.neckAccessory" sets="::vm.neckAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection></div></uib-tab><uib-tab heading="legs"><div style="margin-top: 10px;"><sprite-set-selection label="Front leg accessories" base="vm.baseFrontLegAccessoryColor" set="vm.pony.frontLegAccessory" sets="::vm.frontLegAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection><hr><div class="row form-group"><div class="col-sm-12"><div class="clearfix"><check-box icon="fa-check" checked="vm.pony.lockBackLegAccessory" class="pull-left"></check-box><label style="margin-left: 10px;" class="form-control-static text-muted">use the same accessory for back legs</label></div></div></div><sprite-set-selection label="Back leg accessories" base="vm.baseBackLegAccessoryColor" set="vm.pony.backLegAccessory" sets="::vm.backLegAccessories" outline-hidden="!vm.customOutlines" non-lockable="true" ng-if="!vm.pony.lockBackLegAccessory"></sprite-set-selection></div></uib-tab></uib-tabset></div></div></uib-tab></uib-tabset></div></div>',
        n.exports
  });
  System.registerDynamic("cf", [], !0, function(t, e, n) {
    return n.exports = '<div ng-init="vm.init()"><h1>Account settings</h1></div><div class="row"><div class="col-md-6"><form name="form" ng-submit="vm.submit()" style="max-width: 400px;" class="form"><div class="form-group"><h3>Account details</h3></div><div class="form-group"><label for="account-name" class="control-label">name</label><input id="account-name" type="text" ng-model="vm.data.name" required maxlength="{{vm.nameMaxLength}}" class="form-control"></div><div ng-if="vm.error" class="form-group"><div class="alert alert-danger">{{vm.error}}</div></div><div class="form-group"><button type="submit" ng-disabled="!vm.canSubmit || form.$pristine || form.$invalid || form.$pending" class="btn btn-primary">Save</button></div></form></div><div class="col-md-6"><div class="form form-horizontal"><div class="form-group row"><div class="col-xs-12"><h3>Game settings</h3></div></div><div class="form-group row"><div class="col-xs-6"><label class="control-label">bad word filter</label></div><div class="col-xs-6 btn-group"><label ng-model="vm.settings.filterSwearWords" uib-btn-radio="true" class="btn btn-primary">ON</label><label ng-model="vm.settings.filterSwearWords" uib-btn-radio="false" class="btn btn-primary">OFF</label></div></div><div class="form-group row"><div class="col-xs-6"><label class="control-label">hide all messages with russian text</label></div><div class="col-xs-6 btn-group"><label ng-model="vm.settings.filterCyrillic" uib-btn-radio="true" class="btn btn-primary">ON</label><label ng-model="vm.settings.filterCyrillic" uib-btn-radio="false" class="btn btn-primary">OFF</label></div></div></div><h3>Connected accounts</h3><div ng-repeat="s in vm.sites"><a ng-href="{{s.url}}" target="_blank"><i ng-class="s.icon" class="fa fa-fw fa-lg"></i><b>{{s.name}}</b></a></div></div><div class="row"><div class="col-xs-12"><a href="/" style="max-width: 200px; margin-top: 50px;" class="btn btn-lg btn-primary btn-block center-block"><i class="fa fa-angle-double-left"></i> Back to game</a></div></div></div>',
        n.exports
  });
  System.registerDynamic("d0", [getCodeName("AngularRoute"), getCodeName("AngularAnimate"), getCodeName("angular-ui/bootstrap.js"), getCodeName("Angular"), "99", "9a", "9c", "9d", "9e", "cb", "cc", "cd", "ce", "cf"], !0, function(t, e, n) {
    "use strict";
    t(getCodeName("AngularRoute")),
        t(getCodeName("AngularAnimate")),
        t(getCodeName("angular-ui/bootstrap.js"));
    var r = t(getCodeName("Angular")),
        i = t("99");
    e.app = r.module("app", ["ngRoute", "ngAnimate", "ui.bootstrap"]),
        i.init(e.app),
        e.app.directive("a", function() {
          return {
            restrict: "E",
            link: function(t, e, n) {
              !n.target && n.href && /^https?:/.test(n.href) && (e[0].setAttribute("target", "_blank"),
                  e[0].setAttribute("rel", "noopener noreferrer"))
            }
          }
        });
    var o = function() {
      function t(t, e) {
        this.gameService = t,
            this.model = e
      }

      return Object.defineProperty(t.prototype, "selected", {
        get: function() {
          return this.gameService.selected
        },
        enumerable: !0,
        configurable: !0
      }),
          Object.defineProperty(t.prototype, "playing", {
            get: function() {
              return this.gameService.playing
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.init = function() {
            var t = document.getElementById("music");
            t && (t.volume = .15)
          },
          t.$inject = ["gameService", "model"],
          t
    }();
    e.app.component("ponyTownApp", {
      controller: o,
      controllerAs: "vm",
      template: t("9a")
    });
    var a = t("9c"),
        s = t("9d"),
        u = t("9e"),
        l = t("cb");
    return e.app.config(["$routeProvider", "$locationProvider", function(e, n) {
      n.html5Mode(!0),
          e.when("/", {
            template: t("cc"),
            controller: l.default,
            controllerAs: "vm"
          }).when("/about", {
            template: t("cd"),
            controller: u.default,
            controllerAs: "vm"
          }).when("/character", {
            template: t("ce"),
            controller: a.default,
            controllerAs: "vm"
          }).when("/account", {
            template: t("cf"),
            controller: s.default,
            controllerAs: "vm"
          }).otherwise({
            redirectTo: "/"
          })
    }]),
        n.exports
  });
  System.registerDynamic("1f", [], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      return "undefined" != typeof document ? document.body.getAttribute(t) : null
    }

    function i(t) {
      var e = "undefined" != typeof document ? document.getElementById(t) : null;
      return e ? e.innerHTML : null
    }
    return e.debug = "true" === r("data-debug"),
        e.version = r("data-version") || null,
        e.debugOptions = e.debug && "undefined" != typeof localStorage ? localStorage : {},
        e.oauthProviders = JSON.parse(i("oauth-providers") || "[]"),
    "undefined" != typeof window && (window.debugOptions = e.debugOptions),
        n.exports
  });
  System.registerDynamic("main", ["3", "4", "d0", getCodeName("BlueBird"), getCodeName("Angular"), "1f"], !0, function(require, e, n) {
    "use strict";
    require("3");
    require("4");
    require("d0");
    var r = require(getCodeName("BlueBird")),
        i = require(getCodeName("Angular")),
        o = require("1f");
    o.debug && r.config({
      warnings: !1,
      longStackTraces: !0
    }),
        //i.element().ready(function () {
        //return
        i.bootstrap(document, ["app"]);
    //  }),
    return n.exports
  })
}