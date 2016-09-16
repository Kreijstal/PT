var libraries;
var modules = function(System) {
  var e = this.require,
    n = this.exports,
    r = this.module;
  libraries = getLibraries(System);
  libraries.npmModules();
  (function() {
    var e = System.amdDefine;
    ! function(t, i) {
      "function" == typeof e && e.amd ? e("2", [], i) : "object" == typeof n ? r.exports = i() : t.returnExports = i()
    }(this, libraries.es6)
  })();
  (function() {
    var e = System.amdDefine;
    e("3", ["2"], function(t) {
      return t
    })
  }());
  System.registerDynamic("e", [], !0, function(t, e, n) {
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
  System.registerDynamic("f", [], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      for (var e = "", n = 0; n < t; n++)
        e += o[Math.floor(Math.random() * o.length)];
      return e
    }

    function i(t, e) {
      var n = e[t];
      if (n) {
        var r = Date.now();
        if (r - n.last < n.limit)
          return !1;
        n.last = r
      }
      return !0
    }

    var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
    return e.randomString = r,
      e.checkRateLimit = i,
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
          } catch (t) {}
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
          t.prototype.writeUint8 = function(t) {
            throw new Error("not implemented")
          },
          t.prototype.writeBytes = function(t) {
            throw new Error("not implemented")
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

        return t.prototype.readUint8 = function() {
            throw new Error("not implemented")
          },
          t.prototype.readBytes = function(t) {
            throw new Error("not implemented")
          },
          t.prototype.readBoolean = function() {
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
            this.offset = 0,
            this.view = null,
            this.buffer = null
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
  System.registerDynamic("18", [getCodeName("BlueBird"), "e", "19", "f", "10", "11", "12", "15", "17", getCodeName("BufferForTheBrowser")], !0, function(t, e, n) {
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
          o = t("e"),
          a = t("19"),
          s = t("f"),
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
                      i.socket.onclose = null,
                        i.socket.close(),
                        i.socket = null
                    } catch (t) {}
                },
                this.defers = [],
                this.inProgressFields = {},
                this.rateLimits = [],
                this.options.server.forEach(function(t, e) {
                  "string" == typeof t ? i.createMethod(t, e, {}) : (i.createMethod(t[0], e, t[1]),
                    t[1].rateLimit && (i.rateLimits[e] = {
                      limit: t[1].rateLimit + 50,
                      last: 0
                    }))
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
                    a = u.createHandlers(o.getBinary(e.server), o.getBinary(e.client)),
                    s = o.getNames(e.server),
                    h = o.getNames(e.client),
                    d = o.getIgnore(e.server).concat(o.getIgnore(e.client));
                  e.debug ? this.packet = new c.DebugPacketHandler(h, s, i, r, a, d, this.log) : this.packet = new l.PacketHandler(h, s, i, r, a),
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
                          return t[1].reject(new Error("disconnected"))
                        }),
                        t.defers = [],
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
                    for (var u = [], l = 0; l < arguments.length; l++)
                      u[l - 0] = arguments[l];
                    if (!o.isConnected)
                      return i.reject(new Error("not connected"));
                    if (!s.checkRateLimit(e, o.rateLimits))
                      return i.reject(new Error("rate limit exceeded"));
                    o.sentSize += o.packet.send(o.socket, t, e, u);
                    var c = ++o.lastSentId,
                      f = r();
                    return a.set(o.defers, c, f),
                      o.inProgressFields[n]++,
                      f.promise
                  },
                  this.special["*resolve:" + t] = function(t, e) {
                    var r = a.get(o.defers, t);
                    r && (a.remove(o.defers, t),
                      o.inProgressFields[n]--,
                      o.apply(function() {
                        return r.resolve(e)
                      }))
                  },
                  this.special["*reject:" + t] = function(t, e) {
                    var r = a.get(o.defers, t);
                    r && (a.remove(o.defers, t),
                      o.inProgressFields[n]--,
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
  System.registerDynamic("19", [], !0, function(t, e, n) {
    "use strict";

    function r(t, e) {
      for (var n = 0; n < t.length; n++)
        if (t[n][0] === e)
          return t[n][1]
    }

    function i(t, e, n) {
      for (var r = 0; r < t.length; r++)
        if (t[r][0] === e)
          return void(t[r][1] = n);
      t.push([e, n])
    }

    function o(t, e) {
      for (var n = 0; n < t.length; n++)
        if (t[n][0] === e) {
          t.splice(n, 1);
          break
        }
    }

    return e.get = r,
      e.set = i,
      e.remove = o,
      n.exports
  });
  System.registerDynamic("1b", ["19"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      return void 0 === t && (t = {}),
        function(e, n) {
          var r = l.get(c, e.constructor) || [];
          r.push({
              name: n,
              options: t
            }),
            l.set(c, e.constructor, r)
        }
    }

    function i(t) {
      return function(e) {
        l.set(f, e, t)
      }
    }

    function o(t) {
      return l.get(f, t)
    }

    function a(t) {
      return l.get(c, t)
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

    var l = t("19"),
      c = [],
      f = [];
    return e.Method = r,
      e.Socket = i,
      e.getSocketMetadata = o,
      e.getMethodMetadata = a,
      e.getMethods = u,
      n.exports
  });
  System.registerDynamic("1c", ["e", "18", "1b"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      for (var n in t)
        e.hasOwnProperty(n) || (e[n] = t[n])
    }

    r(t("e"));
    var i = t("18");
    e.ClientSocket = i.ClientSocket;
    var o = t("1b");
    return e.Method = o.Method,
      n.exports
  });
  System.registerDynamic("1d", ["1c"], !0, function(t, e, n) {
    return n.exports = t("1c"),
      n.exports
  });
  System.registerDynamic("1e", ["1f", "20", "21", "22", "23", "24"], !0, function(t, e, n) {
    "use strict";
    var r = t("1f"),
      i = t("20"),
      o = t("21"),
      a = t("22"),
      s = t("23"),
      u = t("24"),
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
          t.prototype.drawEntities = function(t, e) {
            var n = this;
            this.entitiesDrawn = 0,
              this.entities.sort(function(t, e) {
                return t.y === e.y ? t.x - e.x : t.y - e.y
              }),
              this.entities.forEach(function(r) {
                function a(e, n) {
                  e && t.drawRect(n, f(r.x * o.tileWidth + e.x), f(r.y * o.tileHeight + e.y), f(e.w), f(e.h))
                }

                r.draw && e.isVisible(r) && (r.draw(t),
                    n.entitiesDrawn++),
                  i.debugOptions.showHelpers && (t.globalAlpha = .3,
                    r.collider && t.drawRect(u.RED, f((r.x + r.collider.x) * o.tileWidth), f((r.y + r.collider.y) * o.tileHeight), f(r.collider.w * o.tileWidth), f(r.collider.h * o.tileHeight)),
                    a(r.bounds, u.ORANGE),
                    a(r.coverBounds, u.BLUE),
                    a(r.interactBounds, u.PURPLE),
                    t.globalAlpha = 1)
              })
          },
          t.prototype.drawEntities2 = function(t, e) {
            var n = this;
            this.entitiesDrawn = 0,
              this.entities.sort(function(t, e) {
                return t.y === e.y ? t.x - e.x : t.y - e.y
              }),
              this.entities.forEach(function(r) {
                r.draw2 && e.isVisible(r) && (r.draw2(t),
                  n.entitiesDrawn++)
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
  System.registerDynamic("25", [getCodeName("Lodash"), "1f", "27", "22", "21", "24"], !0, function(t, e, n) {
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
      return i && o ? $.addRects(r(i, -e, -n), r(o, -e, -n)) : i ? r(i, -e, -n) : r(o, -e, -n)
    }

    function o(t, e, n) {
      var r = e.palette ? n.addInts(e.palette) : null,
        i = 8,
        o = 5 * Math.random();
      return {
        bounds: {
          x: -t[0].w / 2,
          y: -t[0].h,
          w: t[0].w,
          h: t[0].h
        },
        update: function(t) {
          o += t
        },
        draw: function(e) {
          var n = Math.floor(o * i) % t.length,
            r = t[n];
          r && e.drawSprite(r, null, Math.round(this.x * S.tileWidth - r.w / 2), Math.round(this.y * S.tileHeight - r.h))
        },
        draw2: function(t) {
          var n = Math.floor(o * i) % e.frames.length,
            a = e.frames[n];
          a && t.drawSprite(a, null, r, Math.round(this.x * S.tileWidth - a.w / 2), Math.round(this.y * S.tileHeight - a.h))
        }
      }
    }

    function a(t, e, n, r, o, a) {
      void 0 === a && (a = T.SHADOW_COLOR);
      var s = e.shadow ? o.add(M) : null,
        u = e.palette ? o.addInts(e.palette) : null;
      return {
        bounds: i(t, n, r),
        draw: function(e) {
          var i = Math.round(this.x * S.tileWidth - n),
            o = Math.round(this.y * S.tileHeight - r);
          e.drawSprite(t.shadow, a, i, o),
            e.drawSprite(t.color, null, i, o)
        },
        draw2: function(t) {
          var i = Math.round(this.x * S.tileWidth - n),
            o = Math.round(this.y * S.tileHeight - r);
          t.drawSprite(e.shadow, a, s, i, o),
            t.drawSprite(e.color, null, u, i, o)
        },
        release: function() {
          E.releasePalette(s),
            E.releasePalette(u)
        }
      }
    }

    function s(t) {
      var n = x.tree.stump,
        i = x.tree.stumpShadow,
        o = x.tree.trunk,
        a = t.add(M),
        s = t.addInts(x.tree2.palette),
        u = x.tree2.stump,
        l = x.tree2.stumpShadow,
        c = x.tree2.trunk;
      return {
        bounds: $.addRects($.addRects(r(n, -e.treeOffsetX, -e.treeOffsetY), r(o, -e.treeOffsetX, -e.treeOffsetY)), r(i, -e.treeOffsetX, -e.treeOffsetY)),
        coverBounds: {
          x: -50,
          y: -135,
          w: 110,
          h: 120
        },
        draw: function(t) {
          var r = Math.round(this.x * S.tileWidth - e.treeOffsetX),
            a = Math.round(this.y * S.tileHeight - e.treeOffsetY);
          t.drawSprite(i, T.SHADOW_COLOR, r, a),
            t.drawSprite(n, null, r, a),
            t.globalAlpha = 1 - .6 * (this.coverLifting || 0),
            t.drawSprite(o, null, r, a),
            t.globalAlpha = 1
        },
        draw2: function(t) {
          var n = Math.round(this.x * S.tileWidth - e.treeOffsetX),
            r = Math.round(this.y * S.tileHeight - e.treeOffsetY);
          t.drawSprite(l, T.SHADOW_COLOR, a, n, r),
            t.drawSprite(u, null, s, n, r),
            t.globalAlpha = 1 - .6 * (this.coverLifting || 0),
            t.drawSprite(c, null, s, n, r),
            t.globalAlpha = 1
        }
      }
    }

    function u(t) {
      var n = x.tree.crown,
        i = x.tree.shadow,
        o = t.add(M),
        a = t.addInts(x.tree2.palette),
        s = x.tree2.crown,
        u = x.tree2.shadow;
      return {
        bounds: $.addRects(r(n, -e.treeOffsetX, -e.treeOffsetY - e.treeOffset), r(i, -e.treeOffsetX, -e.treeOffsetY - e.treeOffset)),
        coverBounds: {
          x: -50,
          y: -135 - e.treeOffset,
          w: 110,
          h: 120
        },
        draw: function(t) {
          var r = Math.round(this.x * S.tileWidth - e.treeOffsetX),
            o = Math.round(this.y * S.tileHeight - e.treeOffsetY - e.treeOffset);
          t.drawSprite(i, T.SHADOW_COLOR, r, o),
            t.globalAlpha = 1 - .6 * (this.coverLifting || 0),
            t.drawSprite(n, null, r, o),
            t.globalAlpha = 1
        },
        draw2: function(t) {
          var n = Math.round(this.x * S.tileWidth - e.treeOffsetX),
            r = Math.round(this.y * S.tileHeight - e.treeOffsetY - e.treeOffset);
          t.drawSprite(u, T.SHADOW_COLOR, o, n, r),
            t.globalAlpha = 1 - .6 * (this.coverLifting || 0),
            t.drawSprite(s, null, a, n, r),
            t.globalAlpha = 1
        }
      }
    }

    function l(t, e, n, r) {
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

    function c(t, e, n, r) {
      for (var i = [], o = 4; o < arguments.length; o++)
        i[o - 4] = arguments[o];
      return w.assign.apply(void 0, [{
        type: t,
        id: e,
        x: n,
        y: r
      }].concat(i))
    }

    function f(t, e, n, r) {
      return c("apple", t, e, n, {
        interactive: !0
      }, k ? a(x.apple, x.apple_2, 4, 4, r) : {}, {
        bounds: {
          x: -8,
          y: -8,
          w: 16,
          h: 16
        }
      })
    }

    function p(t, e, n, r, i) {
      return c("sign", t, e, n, {
        interactive: !0
      }, k ? a(x.sign, x.sign_2, 11, 24, i) : {}, r, {
        options: r
      })
    }

    function h(t, e, n, r) {
      return c("rock", t, e, n, l(-.5, -.25, 1, .5), k ? a(x.rock, x.rock_2, 15, 15, r) : {})
    }

    function d(t, e, n, r) {
      return c("pumpkin", t, e, n, l(-.35, -.25, .7, .5), k ? a(x.pumpkin, x.pumpkin_2, 11, 15, r) : {})
    }

    function v(t, e, n, r) {
      return c("tree", t, e, n, l(-.5, 0, 1, .5), k ? s(r) : {})
    }

    function m(t, e, n, r) {
      return c("tree-crown", t, e, n, k ? u(r) : {})
    }

    function g(t, n, r, i) {
      return c("tree-stump", t, n, r, l(-.5, -.1, 1, .5), k ? a(A, C, e.treeOffsetX, e.treeOffsetY, i) : {})
    }

    function y(t, e, n, r) {
      return c("butterfly", t, e, n, k ? o(x.butterfly, x.butterfly2, r) : {})
    }

    function b(t, e, n, r) {
      var i = x.cloud.shadow,
        o = i.w / S.tileWidth,
        s = i.h / S.tileHeight;
      return c("cloud", t, e, n, {
        vx: -.5,
        vy: 0
      }, {
        bounds: {
          x: -o / 2,
          y: -s,
          w: o,
          h: s
        }
      }, k ? a(x.cloud, x.cloud_2, i.w / 2, i.h, r, T.CLOUD_SHADOW_COLOR) : {})
    }

    function _(t, e, n, r, i, o) {
      return "cloud" === t ? b(e, n, r, o) : "apple" === t ? f(e, n, r, o) : "rock" === t ? h(e, n, r, o) : "sign" === t ? p(e, n, r, i, o) : "tree" === t ? v(e, n, r, o) : "tree-crown" === t ? m(e, n, r, o) : "tree-stump" === t ? g(e, n, r, o) : "pumpkin" === t ? d(e, n, r, o) : "butterfly" === t ? y(e, n, r, o) : null
    }

    var w = t(getCodeName("Lodash")),
      x = t("1f"),
      E = t("27"),
      $ = t("22"),
      S = t("21"),
      T = t("24"),
      k = "undefined" != typeof window,
      M = ["transparent", "white"],
      A = {
        color: x.tree.stump,
        shadow: x.tree.stumpShadow
      },
      C = {
        color: x.tree2.stump,
        shadow: x.tree2.stumpShadow,
        palette: x.tree2.palette
      };
    return e.treeOffsetX = 72,
      e.treeOffsetY = 162,
      e.treeOffset = 30,
      e.createApple = f,
      e.createSign = p,
      e.createRock = h,
      e.createPumpkin = d,
      e.createTree = v,
      e.createTreeCrown = m,
      e.createTreeStump = g,
      e.createButterfly = y,
      e.createCloud = b,
      e.createAnEntity = _,
      n.exports
  });
  System.registerDynamic("28", [getCodeName("Lodash"), "1d", "22", "21", "29", "2a", "1e", "25", "2b", "2c"], !0, function(t, e, n) {
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
      a = t("1d"),
      s = t("22"),
      u = t("21"),
      l = t("29"),
      c = t("2a"),
      f = t("1e"),
      p = t("25"),
      h = t("2b"),
      d = t("2c"),
      v = function(t, e) {
        t.player = e,
          t.player.interactive = !1,
          s.setupSetTes(e)
      },
      m = h.default.game,
      g = [5, 9, 10, 6, 6, 6, 6, 1],
      y = function() {
        function t(t, e, n) {
          this.gameService = t,
            this.server = e,
            this.$timeout = n
        }

        return t.prototype.connected = function() {
            m.player = null,
              m.map = new c.Map(0, 0),
              this.gameService.joined()
          },
          t.prototype.disconnected = function() {
            this.gameService.disconnected()
          },
          t.prototype.invalidVersion = function() {
            location.reload()
          },
          t.prototype.map = function(t) {
            m.baseTime = Date.now() - t.time,
              m.map = new c.Map(t.regionsX, t.regionsY)
          },
          t.prototype.subscribeRegion = function(t, e, n) {
            var r = new f.Region(0, t, e);
            r.load(n),
              m.map.setRegion(t, e, r)
          },
          t.prototype.unsubscribeRegion = function(t, e) {
            m.map.setRegion(t, e, null)
          },
          t.prototype.updateTile = function(t, e, n) {
            m.map.setTile(t, e, n)
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
            })
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
                c = new l.Pony(t, f, u, h, m.paletteManager),
                o.assign(c, n),
                c.name = this.filterText(d, c.name, t === this.myId)
            } else
              c = p.createAnEntity(e, t, r, i, n, m.paletteManager);
            c ? (c.id = t,
              c.x = r,
              c.y = i,
              c.vx = a,
              c.vy = s,
              m.map.addEntity(c),
              t === this.myId && this.$timeout(function() {
                return v(m, c)
              })) : console.error("unknown entity type", e)
          },
          t.prototype.removeEntity = function(t) {
            m.map.removeEntity(t),
              m.isSelected(t) && this.$timeout(function() {
                m.isSelected(t) && m.select(null)
              }, 15e3)
          },
          t.prototype.updateEntity = function(t, e, n, r, i) {
            var o = m.map.findEntity(t);
            o !== m.player && (o ? (o.x = e,
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
            var n = m.map.findEntity(t);
            n ? o.assign(n, e) : console.error("updateEntityOptions: missing entity", t)
          },
          t.prototype.says = function(t, e, n) {
            var r = m.map.findEntity(t);
            if (r) {
              var i = r.id === this.myId,
                o = this.gameService.account;
              if (!i && o.settings.filterCyrillic && d.containsCyrillic(e))
                return;
              if (r.ignored && 2 !== n)
                return;
              if (!m.camera.isVisible(r))
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
            m.player = null,
              m.map = new c.Map(0, 0),
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
            binary: [g]
          }), i("design:type", Function), i("design:paramtypes", [Array]), i("design:returntype", void 0)], t.prototype, "addEntities", null),
          r([a.Method({
            binary: g
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
  System.registerDynamic("2d", [getCodeName("BlueBird"), getCodeName("Lodash"), "1d", "22", "2b", "28", "20"], !0, function(t, e, n) {
    "use strict";
    var r = t(getCodeName("BlueBird")),
      i = t(getCodeName("Lodash")),
      o = t("1d"),
      a = t("22"),
      s = t("2b"),
      u = t("28"),
      l = t("20"),
      c = s.default.game,
      f = function() {
        function t(t, e) {
          this.$timeout = t,
            this.model = e,
            this.playing = !1,
            this.joining = !1,
            this.offline = !1,
            this.protectionError = !1,
            this.servers = [],
            this.initialized = !1,
            this.updateStatus()
        }

        return Object.defineProperty(t.prototype, "selected", {
            get: function() {
              return c.selected
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
              return !!this.model.pony && !!this.model.pony.name && !this.joining && this.server && !this.server.offline
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
                    l.debugOptions.autoJoin && setTimeout(function() {
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
                var n = new o.ClientSocket(t);
                n.client = new u.ClientActions(e, n.server, e.$timeout),
                  n.connect(),
                  c.startup(n, function(t) {
                    return e.$timeout(t)
                  });
                var r = a.start(c),
                  i = r.promise,
                  s = r.cancel;
                return e.cancelGameLoop = s,
                  i
              }).catch(function(t) {
                throw e.left(),
                  t
              }))
          },
          t.prototype.leave = function() {
            c.socket && (c.socket.isConnected ? c.socket.server.leave() : c.socket.disconnect()),
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
              c.release()
          },
          t.prototype.disconnected = function() {
            var t = this;
            this.$timeout.cancel(this.disconnectedTimeout),
              this.disconnectedTimeout = this.$timeout(function() {
                return t.left()
              }, 1e4)
          },
          t.$inject = ["$timeout", "model"],
          t
      }();
    return e.GameService = f,
      n.exports
  });
  System.registerDynamic("2f", [], !0, function(t, e, n) {
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
  System.registerDynamic("30", [getCodeName("BlueBird"), getCodeName("Lodash"), "31", "22", "2f", "20", "2c"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      return t.length ? t[0] : u.createDefaultPony()
    }

    function i(t, e) {
      return e.lastUsed && t.lastUsed ? e.lastUsed.localeCompare(t.lastUsed) : 0
    }

    function o() {
      try {
        return window.self !== window.top
      } catch (t) {
        return !0
      }
    }

    var a = t(getCodeName("BlueBird")),
      s = t(getCodeName("Lodash")),
      u = t("31"),
      l = t("22"),
      c = t("2f"),
      f = t("20"),
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
                    sri: window.__sri ? "FAIL" : "OK",
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
  System.registerDynamic("32", ["22"], !0, function(t, e, n) {
    "use strict";
    var r = t("22"),
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
  System.registerDynamic("33", [], !0, function(t, e, n) {
    return n.exports = '<div ng-class="{ disabled: vm.isDisabled }" class="color-picker"><div ng-style="{ background: vm.bg }" class="color-picker-box"></div><input type="text" ng-focus="vm.focus($event)" ng-blur="vm.open = false" ng-model="vm.inputColor" ng-disabled="vm.isDisabled" spellcheck="false" ng-change="vm.inputChanged()" class="form-control"><div ng-class="{ open: vm.open }" class="dropdown"><div ng-mousedown="vm.stopEvent($event)" class="dropdown-menu dropdown-menu-right color-picker-menu"><div class="color-picker-content"><div ag-drag="vm.dragSV($event)" ag-drag-relative="self" ag-drag-prevent="true" class="color-picker-sv"><div ng-style="{ background: vm.hue }" class="color-picker-sv-bg"><div class="color-picker-sv-overlay-white"><div class="color-picker-sv-overlay-black"></div></div></div><div ng-style="{ left: vm.svLeft + \'%\', top: vm.svTop + \'%\' }" class="color-wheel-circle-sv"><div></div></div></div><div ag-drag="vm.dragHue($event)" ag-drag-relative="self" ag-drag-prevent="true" class="color-picker-hue"><div ng-style="{ top: vm.hueTop + \'%\' }" class="color-wheel-circle-hue"><div></div></div></div></div></div></div></div>',
      n.exports
  });
  System.registerDynamic("34", ["22", "35", "33"], !0, function(t, e, n) {
    "use strict";
    var r = t("22"),
      i = t("35"),
      o = 175,
      a = function() {
        function t(t) {
          this.$timeout = t,
            this.s = 0,
            this.v = 0,
            this.h = 0,
            this.lastColor = ""
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
            this.open = !0,
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
            var t = i.default.fromHsva(this.h, this.s, this.v, 1).css(),
              e = this.color !== t;
            this.lastColor = this.color = t,
              e && this.changed && this.changed({
                $value: t
              })
          },
          t.prototype.inputChanged = function() {
            var t = this;
            this.$timeout(function() {
              t.changed && t.changed({
                $value: t.color
              })
            }, 0)
          },
          t.prototype.stopEvent = function(t) {
            t.stopPropagation(),
              t.preventDefault()
          },
          t.$inject = ["$timeout"],
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
        template: t("33")
      },
      n.exports
  });
  System.registerDynamic("36", [], !0, function(t, e, n) {
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
  System.registerDynamic("37", [], !0, function(t, e, n) {
    return n.exports = '<div class="row form-group"><div class="col-sm-4"><check-box ng-if="vm.hasLock &amp;&amp; !vm.nonLockable" checked="vm.locked" icon="fa-lock" changed="vm.lockChanged($value)" title="Automatic color" class="lock-box"></check-box><label class="control-label text-muted">{{vm.label || \'Color\'}}</label></div><div class="col-sm-8"><color-picker color="vm.fill" is-disabled="vm.locked" changed="vm.fillChanged($value)"></color-picker></div></div><div ng-if="!vm.outlineHidden" class="row form-group"><div class="col-sm-4"><check-box checked="vm.outlineLocked" icon="fa-lock" changed="vm.outlineLockChanged($value)" title="Automatic outline" class="lock-box"></check-box><label class="control-label text-muted">Outline</label></div><div class="col-sm-8"><color-picker color="vm.outline" is-disabled="vm.outlineLocked"></color-picker></div></div>',
      n.exports
  });
  System.registerDynamic("38", ["39", "37"], !0, function(t, e, n) {
    "use strict";
    var r = t("39"),
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
        template: t("37")
      },
      n.exports
  });
  System.registerDynamic("3a", ["22", "35", "3b"], !0, function(t, e, n) {
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
      r(t, e.fill),
        r(t, e.outline),
        r(t, e.extra)
    }

    function o(t, e, n, r, i) {
      var o = Math.round((t.canvas.width / 2 - i.w) / 2 - i.x),
        a = Math.round((t.canvas.height / 2 - i.h) / 2 - i.y);
      e.fill && l.drawColoredSprite(t, e.fill, n, o, a),
        e.outline && l.drawColoredSprite(t, e.outline, r, o, a),
        e.extra && l.drawSprite(t, e.extra, o, a)
    }

    function a(t, e) {
      return Array.isArray(t) ? t[e] : t
    }

    var s = t("22"),
      u = t("35"),
      l = t("3b"),
      c = 52,
      f = function() {
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
                e.width = c,
                  e.height = c;
                var n = e.getContext("2d");
                n.save(),
                  n.clearRect(0, 0, e.width, e.height);
                var r = t.sprite;
                if (r) {
                  t.circle && (n.fillStyle = u.default.parse(t.circle).css(),
                      n.beginPath(),
                      n.arc(e.width / 2, e.height / 2, e.width / 3, 0, 2 * Math.PI),
                      n.fill()),
                    n.scale(2, 2),
                    s.disableImageSmoothing(n);
                  var l = {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0
                  };
                  Array.isArray(r) ? (r.forEach(function(t) {
                      return i(l, t)
                    }),
                    r.forEach(function(e, r) {
                      return o(n, e, a(t.fill, r), a(t.outline, r), l)
                    })) : (i(l, r),
                    o(n, r, a(t.fill, 0), a(t.outline, 0), l))
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
        controller: f,
        controllerAs: "vm",
        template: '<canvas></canvas><i ng-if="!vm.sprite" class="fa fa-fw fa-times"></i>'
      },
      n.exports
  });
  System.registerDynamic("3c", [], !0, function(t, e, n) {
    return n.exports = '<div class="selection-list"><div class="selection-list-content"><sprite-box ng-repeat="i in vm.sprites track by $index" ng-class="{ active: vm.selected === $index }" ng-click="vm.selected = $index" sprite="i" fill="vm.fill" outline="vm.outline" circle="vm.circle" class="selection-item"></sprite-box></div></div>',
      n.exports
  });
  System.registerDynamic("3d", ["3c"], !0, function(t, e, n) {
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
        template: t("3c")
      },
      n.exports
  });
  System.registerDynamic("3e", [], !0, function(t, e, n) {
    return n.exports = '<div ng-if="vm.compact"><div class="row form-group"><div class="col-sm-4"><label class="control-label">{{vm.label}}</label></div><div class="col-sm-8"><sprite-selection selected="vm.set.type" sprites="vm.sprites" fill="vm.set.fills[0]" outline="vm.set.outlines[0]"></sprite-selection></div></div></div><div ng-if="!vm.compact"><div class="row form-group"><div class="col-sm-12 text-center"><label class="control-label text-muted">{{vm.label}}</label></div></div><div class="row form-group"><div class="col-sm-12"><sprite-selection selected="vm.set.type" sprites="vm.sprites" fill="vm.set.fills[0]" outline="vm.set.outlines[0]"></sprite-selection></div></div></div><div ng-if="vm.set.type &amp;&amp; vm.sets[vm.set.type].length &gt; 1"><div class="row form-group"><div class="col-sm-12 text-center"><label class="control-label text-muted">Color pattern</label></div></div><div class="row form-group"><div class="col-sm-12"><sprite-selection selected="vm.set.pattern" sprites="vm.sets[vm.set.type]" fill="vm.exampleFills" outline="vm.exampleOutlines"></sprite-selection></div></div></div><fill-outline ng-repeat="c in vm.set.fills track by $index" ng-if="vm.patternColors &gt; $index" label="Color {{$index + 1}}" base="vm.base" outline-hidden="vm.outlineHidden" fill="vm.set.fills[$index]" locked="vm.set.lockFills[$index]" non-lockable="$index === 0 &amp;&amp; vm.nonLockable" outline="vm.set.outlines[$index]" outline-locked="vm.set.lockOutlines[$index]"></fill-outline>',
      n.exports
  });
  System.registerDynamic("3f", ["3e"], !0, function(t, e, n) {
    "use strict";
    var r = function() {
      function t() {
        this.exampleFills = ["Orange", "DodgerBlue", "LimeGreen", "Orchid", "crimson", "Aquamarine"],
          this.exampleOutlines = ["Chocolate", "SteelBlue", "ForestGreen", "DarkOrchid", "darkred", "DarkTurquoise"]
      }

      return Object.defineProperty(t.prototype, "patternColors", {
          get: function() {
            var t = this.set && this.sets && this.sets[this.set.type] && this.sets[this.set.type][this.set.pattern];
            return t ? t.length : this.nonLockable ? 1 : 0
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
        template: t("3e")
      },
      n.exports
  });
  System.registerDynamic("40", ["35"], !0, function(t, e, n) {
    "use strict";
    var r = t("35"),
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
  System.registerDynamic("41", ["22", "31", "42", "43", "44"], !0, function(t, e, n) {
    "use strict";
    var r = t("22"),
      i = t("31"),
      o = t("42"),
      a = t("43"),
      s = t("44"),
      u = 3,
      l = function() {
        function t(t) {
          this.$element = t
        }

        return t.prototype.$onInit = function() {
            var t = this;
            return this.canvas = this.$element[0].querySelector("canvas"),
              this.interval = setInterval(function() {
                return t.draw()
              }, 1e3 / 24),
              s.loadSpriteSheets()
          },
          t.prototype.$onDestroy = function() {
            clearInterval(this.interval)
          },
          t.prototype.draw = function() {
            var t = u * r.getPixelRatio();
            o.resizeCanvasToElementSize(this.canvas);
            var e = Math.round(this.canvas.width / t),
              n = Math.round(this.canvas.height / t);
            this.buffer = this.buffer || r.createCanvas(e, n),
              o.resizeCanvas(this.buffer, e, n);
            var s = this.buffer.getContext("2d"),
              l = Math.round(e / 2),
              c = Math.round(n / 2 + 28);
            this.noBackground ? s.clearRect(0, 0, e, n) : (s.fillStyle = "LightGreen",
                s.fillRect(0, 0, e, n)),
              this.pony && a.drawPony2D(s, i.toRenderInfo(this.pony), this.state || a.createDefaultPonyState(), l, c, !1);
            var f = this.canvas.getContext("2d");
            this.noBackground && f.clearRect(0, 0, this.canvas.width, this.canvas.height),
              f.save(),
              r.disableImageSmoothing(f),
              f.scale(t, t),
              f.drawImage(this.buffer, 0, 0),
              f.restore()
          },
          t.$inject = ["$element"],
          t
      }();
    return Object.defineProperty(e, "__esModule", {
        value: !0
      }),
      e.default = {
        controller: l,
        controllerAs: "vm",
        bindings: {
          pony: "<",
          state: "<",
          noBackground: "<"
        },
        template: '<canvas class="character-preview"></canvas>'
      },
      n.exports
  });
  System.registerDynamic("45", [], !0, function(t, e, n) {
    return n.exports = '<div class="chat-box"><i ng-click="vm.toggle()" class="fa fa-fw fa-comment chat-open-button game-button"></i><div ng-show="vm.isOpen" class="chat-input-box"><input ng-model="vm.message" ng-keydown="vm.keydown($event)" maxlength="{{::vm.maxSayLength}}" class="chat-input"><i ng-click="vm.send()" class="fa fa-fw fa-angle-double-right chat-send-button game-button"></i></div></div>',
      n.exports
  });
  System.registerDynamic("46", ["21", "2b", "45"], !0, function(t, e, n) {
    "use strict";
    var r = t("21"),
      i = t("2b"),
      o = i.default.game,
      a = function() {
        function t(t, e) {
          var n = this;
          this.maxSayLength = r.SAY_MAX_LENGTH,
            this.isOpen = !1,
            this.input = e[0].querySelector(".chat-input"),
            o.onChat = function() {
              return t(function() {
                return n.chat()
              })
            },
            o.onCommand = function() {
              return t(function() {
                return n.command()
              })
            },
            o.onCancel = function() {
              return !!n.isOpen && !!t(function() {
                return n.close()
              })
            }
        }

        return t.prototype.send = function() {
            var t = (this.message || "").trim();
            this.close(),
              o.player && t && o.socket.server.say(t)
          },
          t.prototype.keydown = function(t) {
            13 === t.keyCode ? this.send() : 27 === t.keyCode && this.close()
          },
          t.prototype.chat = function() {
            this.isOpen ? this.send() : this.open()
          },
          t.prototype.command = function() {
            this.isOpen || (this.chat(),
              this.message = "/")
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
    return e.ChatBox = a,
      Object.defineProperty(e, "__esModule", {
        value: !0
      }),
      e.default = {
        controller: a,
        controllerAs: "vm",
        template: t("45")
      },
      n.exports
  });
  System.registerDynamic("47", [], !0, function(t, e, n) {
    return n.exports = '<div uib-dropdown is-open="vm.dropdownOpen" class="settings-box"><span id="clock" class="settings-clock">00:00</span><i uib-dropdown-toggle class="fa fa-fw fa-gear game-button"></i><ul uib-dropdown-menu ng-if="vm.dropdownOpen" class="dropdown-menu pull-right settings-box-menu"><li class="dropdown-header">{{vm.server}}</li><li ng-mouseup="$event.stopPropagation(); $event.preventDefault();" ng-click="$event.stopPropagation(); $event.preventDefault();"><a ng-click="vm.changeScale()"><i class="fa fa-fw fa-search"></i> Change scale (x{{vm.scale}})</a></li><li class="divider"></li><li><a ng-click="vm.leave()"><i class="fa fa-fw fa-sign-out"></i> Leave</a></li></ul></div>',
      n.exports
  });
  System.registerDynamic("48", ["2b", "47"], !0, function(t, e, n) {
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
        template: t("47")
      },
      n.exports
  });
  System.registerDynamic("49", [], !0, function(t, e, n) {
    return n.exports = '<li ng-if="vm.model.account" uib-dropdown><a uib-dropdown-toggle class="cursor-pointer">{{vm.model.account.name}} <span class="caret"></span></a><ul uib-dropdown-menu><li><a href="/account">Account settings</a></li><li><a href="/auth/sign-out" target="_self" class="cursor-pointer">Sign out</a></li></ul></li>',
      n.exports
  });
  System.registerDynamic("4a", ["49"], !0, function(t, e, n) {
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
        template: t("49")
      },
      n.exports
  });
  System.registerDynamic("4b", [], !0, function(t, e, n) {
    return n.exports = '<nav class="navbar navbar-inverse"><div class="navbar-header navbar-main"><button ng-click="vm.menuExpanded = !vm.menuExpanded" class="navbar-toggle collapsed"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a ng-if="vm.logo &amp;&amp; !vm.isActive(\'/\')" href="/" class="main-logo-small hidden-xs"><img src="/images/logo-small.png" width="287" height="65"></a></div><div uib-collapse="!vm.menuExpanded" class="collapse navbar-collapse"><div ng-if="vm.model.loading" style="font-size: 20px; padding: 10px 20px;" class="navbar-right text-muted"><i class="fa fa-fw fa-spin fa-spinner"></i></div><form ng-if="!vm.model.loading &amp;&amp; !vm.model.account" class="navbar-form navbar-right"><div uib-dropdown class="button-group"><button uib-dropdown-toggle class="btn btn-default">Sign in <span class="caret"></span></button><ul uib-dropdown-menu><li ng-repeat="p in vm.providers"><a ng-href="{{p.url}}" target="_self"><i ng-class="p.icon" class="fa fa-fw"></i> {{p.name}}</a></li></ul></div></form><ul class="nav navbar-nav navbar-right"><ng-transclude></ng-transclude><li ng-repeat="i in vm.items" ng-class="{ active: vm.isActive(i.href) }" class="navbar-link"><a ng-href="{{i.href}}">{{i.name}}</a></li><li ng-if="vm.model.account" uib-dropdown><a uib-dropdown-toggle class="cursor-pointer">{{vm.model.account.name}} <span class="caret"></span></a><ul uib-dropdown-menu><li><a href="/account">Account settings</a></li><li><a href="/auth/sign-out" target="_self" class="cursor-pointer">Sign out</a></li></ul></li></ul></div></nav>',
      n.exports
  });
  System.registerDynamic("4c", ["20", "4b"], !0, function(t, e, n) {
    "use strict";
    var r = t("20"),
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
        template: t("4b")
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
  System.registerDynamic("4d", [], !0, function(t, e, n) {
    return n.exports = '<div class="sign-in-box center-block"><div class="text-center"><p class="lead">Sign in with your social site account</p><div class="sign-in-box-providers"><a ng-repeat="p in vm.providers" ng-href="{{p.url}}" target="_self" title="{{p.name}}" ng-style="{ borderBottomColor: p.disabled ? \'#666\' : p.color }" ng-class="{ disabled: p.disabled }" class="btn btn-lg btn-provider"><i ng-class="p.icon" class="fa fa-fw fa-lg"></i></a></div></div></div>',
      n.exports
  });
  System.registerDynamic("4e", ["20", "4d"], !0, function(t, e, n) {
    "use strict";
    var r = t("20"),
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
        template: t("4d")
      },
      n.exports
  });
  System.registerDynamic("4f", [], !0, function(t, e, n) {
    return n.exports = '<div class="play-box"><div uib-dropdown class="form-group btn-group dropdown"><button ng-if="!vm.joining" ng-click="vm.play()" ng-disabled="!vm.canPlay" type="button" class="btn btn-lg btn-success play-box-btn"><span ng-if="vm.server"><strong>{{vm.label || \'Play\'}}</strong> on<span> {{vm.server.name}}</span></span><span ng-if="!vm.server" class="text-faded">select server to play</span></button><button ng-if="vm.joining" ng-click="vm.cancel()" type="button" class="btn btn-lg btn-success play-box-btn"><i class="fa fa-spinner fa-spin"></i> Cancel</button><button uib-dropdown-toggle class="btn btn-lg btn-success"><span class="caret"></span></button><ul uib-dropdown-menu style="width: 100%;" class="dropdown-menu"><li ng-repeat="s in vm.servers"><a ng-click="vm.server = s"><div ng-if="s.offline" class="pull-right text-unsafe">offline</div><div ng-if="!s.offline" class="pull-right text-muted">online ({{s.online}})</div><strong>{{s.name}}</strong><div class="text-muted text-wrap">{{s.desc}}</div></a></li></ul></div><div ng-if="vm.server.offline" class="form-group"><div class="alert alert-info">Selected server is offline, try again later</div></div><div ng-if="vm.offline" class="form-group"><div class="alert alert-info">Server is offline, try again later</div></div><div ng-if="vm.invalidVersion &amp;&amp; !vm.offline" class="form-group"><div class="alert alert-info">Your client version is outdated, <a ng-click="vm.reload()" class="alert-link">reload</a> to be able to play.</div></div><div ng-if="vm.protectionError &amp;&amp; !vm.offline" class="form-group"><div class="alert alert-info">DDOS protection error, <a ng-click="vm.reload()" class="alert-link">reload</a> to continue.</div></div><div ng-if="vm.error" class="form-group"><div class="alert alert-danger">{{vm.error}}</div></div><div ng-if="vm.server" class="form-group text-left"><h4>Server rules</h4><p class="text-muted">{{vm.server.desc}}</p></div></div>',
      n.exports
  });
  System.registerDynamic("50", ["22", "20", "4f"], !0, function(t, e, n) {
    "use strict";
    var r = t("22"),
      i = t("20"),
      o = function() {
        function t(t, e, n) {
          this.$location = t,
            this.gameService = e,
            this.model = n,
            this.handleError = r.errorHandler(this)
        }

        return Object.defineProperty(t.prototype, "server", {
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
              return this.gameService.version && this.gameService.version !== i.version
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
            return this.error = null,
              this.model.savePony(this.model.pony).then(function(e) {
                return t.gameService.join(e.id)
              }).catch(this.handleError)
          },
          t.prototype.cancel = function() {
            this.gameService.leave()
          },
          t.prototype.reload = function() {
            location.reload(!0)
          },
          t.$inject = ["$location", "gameService", "model"],
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
        template: t("4f")
      },
      n.exports
  });
  (function() {
    var i = System.amdDefine;
    ! function(t, e) {
      "object" == typeof n && "undefined" != typeof r ? r.exports = e() : "function" == typeof i && i.amd ? i("51", [], e) : t.moment = e()
    }(this, libraries.momentJS)
  })();
  (function() {
    var e = System.amdDefine;
    e("52", ["51"], function(t) {
      return t
    })
  })();
  System.registerDynamic("53", [], !0, function(t, e, n) {
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
  System.registerDynamic("54", [getCodeName("Lodash")], !0, function(t, e, n) {
    "use strict";

    function r(t, e) {
      return t && a.includes(t.roles, e)
    }

    function i(t) {
      return r(t, "admin") || r(t, "superadmin")
    }

    function o(t) {
      return r(t, "mod") || i(t)
    }

    var a = t(getCodeName("Lodash"));
    return e.hasRole = r,
      e.isAdmin = i,
      e.isMod = o,
      n.exports
  });
  System.registerDynamic("29", [getCodeName("gl-matrix"), "22", "21", "43", "31", "5c"], !0, function(t, e, n) {
    "use strict";
    var r = t(getCodeName("gl-matrix")),
      i = t("22"),
      o = t("21"),
      a = t("43"),
      s = t("31"),
      u = t("5c"),
      l = r.mat2d.create(),
      c = r.vec2.create(),
      f = function() {
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
          this.info = s.toRenderInfo(c),
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
              this.state.animation = this.walking ? u.trot : u.stand,
              this.state.animationFrame = Math.floor(this.time * o.frameTime) % this.state.animation.frames
          },
          t.prototype.getTransform = function() {
            return r.mat2d.identity(l),
              r.mat2d.translate(l, l, r.vec2.set(c, Math.round(this.x * o.tileWidth), Math.round(this.y * o.tileHeight))),
              r.mat2d.scale(l, l, r.vec2.set(c, this.right ? -1 : 1, 1)),
              l
          },
          t.prototype.draw = function(t) {
            t.transform = this.getTransform(),
              a.drawPonyGL(t, this.info, this.state, 0, 0, this.right, this.selected),
              t.transform = null
          },
          t.prototype.draw2 = function(t) {
            t.transform = this.getTransform(),
              a.drawPonyGL2(t, this.pal, this.state, 0, 0, this.right, this.selected),
              t.transform = null
          },
          t.prototype.drawHead = function(t) {
            a.drawPony2D(t, this.info, {
              animation: u.stand,
              animationFrame: 0,
              blinkFrame: 0
            }, 0, 0, !0)
          },
          t.prototype.release = function() {
            s.releasePalettes(this.pal)
          },
          t
      }();
    return e.Pony = f,
      n.exports
  });
  System.registerDynamic("2a", ["21", "22", "23"], !0, function(t, e, n) {
    "use strict";

    function r(t, e) {
      if (!t.interactive)
        return !1;
      var n = t.interactBounds || t.bounds;
      return o.contains(t.x, t.y, n, e)
    }

    var i = t("21"),
      o = t("22"),
      a = t("23"),
      s = function() {
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
              return this.regionsX * i.REGION_SIZE
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "height", {
            get: function() {
              return this.regionsY * i.REGION_SIZE
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
          t.prototype.findEntity = function(t) {
            var e = null;
            return this.forEachRegion(function(n) {
                return !(e = o.findById(n.entities, t))
              }),
              e
          },
          t.prototype.findClosestEntity = function(t, e) {
            var n, r = 0;
            return this.forEachEntity(function(i) {
                if (!e || e(i)) {
                  var a = o.distance(i, t);
                  (a < r || !n) && (n = i,
                    r = a)
                }
              }),
              n
          },
          t.prototype.addEntity = function(t) {
            this.regions[0] && this.regions[0].entities.push(t)
          },
          t.prototype.removeEntity = function(t) {
            var e = this.findEntity(t);
            e && (this.forEachRegion(function(e) {
                return !o.removeById(e.entities, t)
              }),
              e.release && e.release())
          },
          t.prototype.pickEntity = function(t, e) {
            var n = null;
            return this.forEachRegion(function(i) {
                return !(n = i.entities.find(function(n) {
                  return ("pony" !== n.type || !e) && r(n, t)
                }))
              }),
              n
          },
          t.prototype.getTotalEntities = function(t) {
            var e = 0;
            return this.forEachRegion(function(n) {
                e += t ? n.entities.reduce(function(e, n) {
                  return e + (t(n) ? 1 : 0)
                }, 0) : n.entities.length
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
              this.setDirty(t * i.REGION_SIZE - 1, e * i.REGION_SIZE - 1, i.REGION_SIZE + 2, i.REGION_SIZE + 2),
              this.regions[t + e * this.regionsX] = n,
              this.updateMinMaxRegion())
          },
          t.prototype.getRegion = function(t, e) {
            return t >= 0 && e >= 0 && t < this.regionsX && e < this.regionsY ? this.regions[t + e * this.regionsX] : null
          },
          t.prototype.getRegionGlobal = function(t, e) {
            var n = Math.floor(t / i.REGION_SIZE),
              r = Math.floor(e / i.REGION_SIZE);
            return this.getRegion(n, r)
          },
          t.prototype.getTile = function(t, e) {
            var n = this.getRegionGlobal(t, e);
            return n ? n.getTile(t - n.x * i.REGION_SIZE, e - n.y * i.REGION_SIZE) : a.TileType.None
          },
          t.prototype.doRelativeToRegion = function(t, e, n) {
            var r = this.getRegionGlobal(t, e);
            if (r) {
              var o = Math.floor(t - r.x * i.REGION_SIZE),
                a = Math.floor(e - r.y * i.REGION_SIZE);
              n(r, o, a)
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
            if (!a.canWalk(r))
              return !0;
            if (!t.collider)
              return !1;
            var i = !1;
            return this.forEachEntity(function(r) {
                return r !== t && r.canCollideWith && r.collider && o.collidersIntersect(e, n, t.collider, r.x, r.y, r.collider) ? (i = !0, !1) : void 0
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
          t.prototype.drawEntities = function(t, e) {
            this.forEachRegion(function(n) {
              return n.drawEntities(t, e)
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
    return e.Map = s,
      n.exports
  });
  System.registerDynamic("5e", ["21", "22"], !0, function(t, e, n) {
    "use strict";
    var r = t("21"),
      i = t("22"),
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
              v = i.clamp(c - (n - p) / 2, 0, u),
              m = i.clamp(f - (h + (o - h) / 2), 0, l),
              g = i.clamp(f - (o - h) / 2, 0, l);
            this.x = Math.floor(i.clamp(this.x, d, v)),
              this.y = Math.floor(i.clamp(this.y, m, g))
          },
          t.prototype.isVisible = function(t) {
            var e = t.bounds;
            if (!e)
              return !0;
            var n = e.x + t.x * r.tileWidth,
              i = e.y + t.y * r.tileHeight;
            return this.isRectVisible(n, i, e.w, e.h)
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
  System.registerDynamic("23", [], !0, function(t, e, n) {
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
  System.registerDynamic("5f", [getCodeName("Lodash"), "35", "24"], !0, function(t, e, n) {
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
        r = e * n / d,
        i = r % 60,
        a = Math.floor(r / 60);
      return o.padStart(a.toFixed(), 2, "0") + ":" + o.padStart(i.toFixed(), 2, "0")
    }

    var o = t(getCodeName("Lodash")),
      a = t("35"),
      s = t("24"),
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
  System.registerDynamic("60", ["24", "61"], !0, function(t, e, n) {
    "use strict";

    function r(t, e, n, r, i, o, s, u) {
      return s = a.setXY(t, e, o, s, u),
        o[s++] = n,
        o[s++] = r,
        o[s++] = i,
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
      o = t("24"),
      a = t("61"),
      s = 5,
      u = 4,
      l = function(t) {
        function e(e) {
          t.call(this, e, 256, 1e4, 4 * s)
        }

        return i(e, t),
          e.prototype.drawImage = function(t, e, n, i, a, s, u, l, c, f) {
            var p = (e || o.WHITE).toFloat(this.globalAlpha),
              h = this.setupTexture(t),
              d = h[0],
              v = h[1],
              m = u + c,
              g = l + f,
              y = n / d,
              b = i / v,
              _ = (n + a) / d,
              w = (i + s) / v,
              x = this.vertices,
              E = this.transform,
              $ = this.index;
            $ = r(u, l, y, b, p, x, $, E),
              $ = r(m, l, _, b, p, x, $, E),
              $ = r(m, g, _, w, p, x, $, E),
              $ = r(u, g, y, w, p, x, $, E),
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
            var t = s * u;
            return [{
              name: "position",
              buffer: this.vertexBuffer,
              size: 2,
              stride: t
            }, {
              name: "texcoord0",
              buffer: this.vertexBuffer,
              size: 2,
              offset: 2 * u,
              stride: t
            }, {
              name: "color",
              buffer: this.vertexBuffer,
              size: 4,
              stride: t,
              offset: 4 * u,
              type: this.gl.UNSIGNED_BYTE,
              normalized: !0
            }]
          },
          e
      }(a.BaseSpriteBatch);
    return e.SpriteBatch = l,
      n.exports
  });
  System.registerDynamic("62", [getCodeName("typedarray-pool"), getCodeName("ndarray-ops"), getCodeName("ndarray")], !0, function(t, e, n) {
    "use strict";

    function r(t, e, n, r, i) {
      this.gl = t,
        this.type = e,
        this.handle = n,
        this.length = r,
        this.usage = i
    }

    function i(t, e, n, r, i, o) {
      var a = i.length * i.BYTES_PER_ELEMENT;
      if (o < 0)
        return t.bufferData(e, i, r),
          a;
      if (a + o > n)
        throw new Error("gl-buffer: If resizing buffer, must not specify offset");
      return t.bufferSubData(e, o, i),
        n
    }

    function o(t, e) {
      for (var n = u.malloc(t.length, e), r = t.length, i = 0; i < r; ++i)
        n[i] = t[i];
      return n
    }

    function a(t, e) {
      for (var n = 1, r = e.length - 1; r >= 0; --r) {
        if (e[r] !== n)
          return !1;
        n *= t[r]
      }
      return !0
    }

    function s(t, e, n, i) {
      if (n = n || t.ARRAY_BUFFER,
        i = i || t.DYNAMIC_DRAW,
        n !== t.ARRAY_BUFFER && n !== t.ELEMENT_ARRAY_BUFFER)
        throw new Error("gl-buffer: Invalid type for webgl buffer, must be either gl.ARRAY_BUFFER or gl.ELEMENT_ARRAY_BUFFER");
      if (i !== t.DYNAMIC_DRAW && i !== t.STATIC_DRAW && i !== t.STREAM_DRAW)
        throw new Error("gl-buffer: Invalid usage for buffer, must be either gl.DYNAMIC_DRAW, gl.STATIC_DRAW or gl.STREAM_DRAW");
      var o = t.createBuffer(),
        a = new r(t, n, o, 0, i);
      return a.update(e),
        a
    }

    var u = t(getCodeName("typedarray-pool")),
      l = t(getCodeName("ndarray-ops")),
      c = t(getCodeName("ndarray")),
      f = ["uint8", "uint8_clamped", "uint16", "uint32", "int8", "int16", "int32", "float32"],
      p = r.prototype;
    return p.bind = function() {
        this.gl.bindBuffer(this.type, this.handle)
      },
      p.unbind = function() {
        this.gl.bindBuffer(this.type, null)
      },
      p.dispose = function() {
        this.gl.deleteBuffer(this.handle)
      },
      p.update = function(t, e) {
        if ("number" != typeof e && (e = -1),
          this.bind(),
          "object" == typeof t && "undefined" != typeof t.shape) {
          var n = t.dtype;
          if (f.indexOf(n) < 0 && (n = "float32"),
            this.type === this.gl.ELEMENT_ARRAY_BUFFER) {
            var r = gl.getExtension("OES_element_index_uint");
            n = r && "uint16" !== n ? "uint32" : "uint16"
          }
          if (n === t.dtype && a(t.shape, t.stride))
            0 === t.offset && t.data.length === t.shape[0] ? this.length = i(this.gl, this.type, this.length, this.usage, t.data, e) : this.length = i(this.gl, this.type, this.length, this.usage, t.data.subarray(t.offset, t.shape[0]), e);
          else {
            var s = u.malloc(t.size, n),
              p = c(s, t.shape);
            l.assign(p, t),
              e < 0 ? this.length = i(this.gl, this.type, this.length, this.usage, s, e) : this.length = i(this.gl, this.type, this.length, this.usage, s.subarray(0, t.size), e),
              u.free(s)
          }
        } else if (Array.isArray(t)) {
          var h;
          h = this.type === this.gl.ELEMENT_ARRAY_BUFFER ? o(t, "uint16") : o(t, "float32"),
            e < 0 ? this.length = i(this.gl, this.type, this.length, this.usage, h, e) : this.length = i(this.gl, this.type, this.length, this.usage, h.subarray(0, t.length), e),
            u.free(h)
        } else if ("object" == typeof t && "number" == typeof t.length)
          this.length = i(this.gl, this.type, this.length, this.usage, t, e);
        else {
          if ("number" != typeof t && void 0 !== t)
            throw new Error("gl-buffer: Invalid data type");
          if (e >= 0)
            throw new Error("gl-buffer: Cannot specify offset when resizing buffer");
          t = 0 | t,
            t <= 0 && (t = 1),
            this.gl.bufferData(this.type, 0 | t, this.usage),
            this.length = t
        }
      },
      n.exports = s,
      n.exports
  });
  System.registerDynamic("63", ["62"], !0, function(t, e, n) {
    return n.exports = t("62"),
      n.exports
  });
  System.registerDynamic("64", ["65"], !0, function(t, e, n) {
    "use strict";

    function r(t, e, n, r, i, o) {
      this.location = t,
        this.dimension = e,
        this.a = n,
        this.b = r,
        this.c = i,
        this.d = o
    }

    function i(t, e, n) {
      this.gl = t,
        this._ext = e,
        this.handle = n,
        this._attribs = [],
        this._useElements = !1,
        this._elementsType = t.UNSIGNED_SHORT
    }

    function o(t, e) {
      return new i(t, e, e.createVertexArrayOES())
    }

    var a = t("65");
    return r.prototype.bind = function(t) {
        switch (this.dimension) {
          case 1:
            t.vertexAttrib1f(this.location, this.a);
            break;
          case 2:
            t.vertexAttrib2f(this.location, this.a, this.b);
            break;
          case 3:
            t.vertexAttrib3f(this.location, this.a, this.b, this.c);
            break;
          case 4:
            t.vertexAttrib4f(this.location, this.a, this.b, this.c, this.d)
        }
      },
      i.prototype.bind = function() {
        this._ext.bindVertexArrayOES(this.handle);
        for (var t = 0; t < this._attribs.length; ++t)
          this._attribs[t].bind(this.gl)
      },
      i.prototype.unbind = function() {
        this._ext.bindVertexArrayOES(null)
      },
      i.prototype.dispose = function() {
        this._ext.deleteVertexArrayOES(this.handle)
      },
      i.prototype.update = function(t, e, n) {
        if (this.bind(),
          a(this.gl, e, t),
          this.unbind(),
          this._attribs.length = 0,
          t)
          for (var i = 0; i < t.length; ++i) {
            var o = t[i];
            "number" == typeof o ? this._attribs.push(new r(i, 1, o)) : Array.isArray(o) && this._attribs.push(new r(i, o.length, o[0], o[1], o[2], o[3]))
          }
        this._useElements = !!e,
          this._elementsType = n || this.gl.UNSIGNED_SHORT
      },
      i.prototype.draw = function(t, e, n) {
        n = n || 0;
        var r = this.gl;
        this._useElements ? r.drawElements(t, e, this._elementsType, n) : r.drawArrays(t, n, e)
      },
      n.exports = o,
      n.exports
  });
  System.registerDynamic("65", [], !0, function(t, e, n) {
    "use strict";

    function r(t, e, n) {
      e ? e.bind() : t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null);
      var r = 0 | t.getParameter(t.MAX_VERTEX_ATTRIBS);
      if (n) {
        if (n.length > r)
          throw new Error("gl-vao: Too many vertex attributes (" + n.length + "/" + r + ")");
        for (var i = 0; i < n.length; ++i) {
          var o = n[i];
          if (o.buffer) {
            var a = o.buffer,
              s = o.size || 4,
              u = o.type || t.FLOAT,
              l = !!o.normalized,
              c = o.stride || 0,
              f = o.offset || 0;
            a.bind(),
              t.enableVertexAttribArray(i),
              t.vertexAttribPointer(i, s, u, l, c, f)
          } else {
            if ("number" == typeof o)
              t.vertexAttrib1f(i, o);
            else if (1 === o.length)
              t.vertexAttrib1f(i, o[0]);
            else if (2 === o.length)
              t.vertexAttrib2f(i, o[0], o[1]);
            else if (3 === o.length)
              t.vertexAttrib3f(i, o[0], o[1], o[2]);
            else {
              if (4 !== o.length)
                throw new Error("gl-vao: Invalid vertex attribute");
              t.vertexAttrib4f(i, o[0], o[1], o[2], o[3])
            }
            t.disableVertexAttribArray(i)
          }
        }
        for (; i < r; ++i)
          t.disableVertexAttribArray(i)
      } else {
        t.bindBuffer(t.ARRAY_BUFFER, null);
        for (var i = 0; i < r; ++i)
          t.disableVertexAttribArray(i)
      }
    }

    return n.exports = r,
      n.exports
  });
  System.registerDynamic("66", ["65"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      this.gl = t,
        this._elements = null,
        this._attributes = null,
        this._elementsType = t.UNSIGNED_SHORT
    }

    function i(t) {
      return new r(t)
    }

    var o = t("65");
    return r.prototype.bind = function() {
        o(this.gl, this._elements, this._attributes)
      },
      r.prototype.update = function(t, e, n) {
        this._elements = e,
          this._attributes = t,
          this._elementsType = n || this.gl.UNSIGNED_SHORT
      },
      r.prototype.dispose = function() {},
      r.prototype.unbind = function() {},
      r.prototype.draw = function(t, e, n) {
        n = n || 0;
        var r = this.gl;
        this._elements ? r.drawElements(t, e, this._elementsType, n) : r.drawArrays(t, n, e)
      },
      n.exports = i,
      n.exports
  });
  System.registerDynamic("67", ["64", "66"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      this.bindVertexArrayOES = t.bindVertexArray.bind(t),
        this.createVertexArrayOES = t.createVertexArray.bind(t),
        this.deleteVertexArrayOES = t.deleteVertexArray.bind(t)
    }

    function i(t, e, n, i) {
      var s, u = t.createVertexArray ? new r(t) : t.getExtension("OES_vertex_array_object");
      return s = u ? o(t, u) : a(t),
        s.update(e, n, i),
        s
    }

    var o = t("64"),
      a = t("66");
    return n.exports = i,
      n.exports
  });
  System.registerDynamic("68", ["67"], !0, function(t, e, n) {
    return n.exports = t("67"),
      n.exports
  });
  System.registerDynamic("61", ["63", getCodeName("gl-texture2d"), "68", "22", "69"], !0, function(t, e, n) {
    "use strict";

    function r(t, e, n, r, i) {
      if (i) {
        var o = t;
        t = i[0] * o + i[2] * e + i[4],
          e = i[1] * o + i[3] * e + i[5]
      }
      return n[r++] = t,
        n[r++] = e,
        r
    }

    var i = t("63"),
      o = t(getCodeName("gl-texture2d")),
      a = t("68"),
      s = t("22"),
      u = t("69");
    e.setXY = r;
    var l = function() {
      function t(t, e, n, r) {
        this.gl = t,
          this.initialCapacity = e,
          this.maxCapacity = n,
          this.floatsPerSprite = r,
          this.tris = 0,
          this.globalAlpha = 1,
          this.index = 0,
          this.spritesCount = 0,
          this.spritesCapacity = 0,
          this.ensureCapacity(e);
        var i = s.createCanvas(1, 1),
          a = i.getContext("2d");
        a.fillStyle = "white",
          a.fillRect(0, 0, 1, 1),
          this.defaultTexture = o(t, i)
      }

      return t.prototype.dispose = function() {
          this.vertexBuffer && (this.vertexBuffer.dispose(),
              this.vertexBuffer = null),
            this.indexBuffer && (this.indexBuffer.dispose(),
              this.indexBuffer = null),
            this.vao && (this.vao.dispose(),
              this.vao = null)
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
            e > this.maxCapacity || (this.dispose(),
              this.spritesCapacity = e,
              this.vertices = new Float32Array(this.spritesCapacity * this.floatsPerSprite),
              this.indices = u.createIndices(this.spritesCapacity),
              this.vertexBuffer = i(this.gl, this.vertices, this.gl.ARRAY_BUFFER, this.gl.STATIC_DRAW),
              this.indexBuffer = i(this.gl, this.indices, this.gl.ELEMENT_ARRAY_BUFFER, this.gl.STATIC_DRAW),
              this.vao = a(this.gl, this.getAttributes(), this.indexBuffer),
              this.vao.bind())
          }
        },
        t.prototype.getAttributes = function() {
          throw new Error("not implemented")
        },
        t
    }();
    return e.BaseSpriteBatch = l,
      n.exports
  });
  System.registerDynamic("6b", ["24", "61"], !0, function(t, e, n) {
    "use strict";

    function r(t, e, n, r, i, o, s, u, l, c) {
      return l = a.setXY(t, e, u, l, c),
        u[l++] = n,
        u[l++] = r,
        u[l++] = i,
        u[l++] = o,
        u[l++] = s,
        l
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
      o = t("24"),
      a = t("61"),
      s = 7,
      u = 4,
      l = function(t) {
        function e(e) {
          t.call(this, e, 256, 1e4, 4 * s)
        }

        return i(e, t),
          e.prototype.drawImage = function(t, e, n, i, a, s, u, l, c, f, p) {
            var h = (e || o.WHITE).toFloat(this.globalAlpha),
              d = this.setupTexture(t),
              v = d[0],
              m = d[1],
              g = l + f,
              y = c + p,
              b = i / v,
              _ = a / m,
              w = (i + s) / v,
              x = (a + u) / m,
              E = n ? n.u : 0,
              $ = n ? n.v : 0,
              S = this.vertices,
              T = this.transform,
              k = this.index;
            k = r(l, c, b, _, E, $, h, S, k, T),
              k = r(g, c, w, _, E, $, h, S, k, T),
              k = r(g, y, w, x, E, $, h, S, k, T),
              k = r(l, y, b, x, E, $, h, S, k, T),
              this.index = k,
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
              size: 2,
              stride: t
            }, {
              name: "texcoord0",
              buffer: this.vertexBuffer,
              size: 2,
              offset: 2 * u,
              stride: t
            }, {
              name: "texcoord1",
              buffer: this.vertexBuffer,
              size: 2,
              offset: 4 * u,
              stride: t
            }, {
              name: "color",
              buffer: this.vertexBuffer,
              size: 4,
              stride: t,
              offset: 6 * u,
              type: this.gl.UNSIGNED_BYTE,
              normalized: !0
            }]
          },
          e
      }(a.BaseSpriteBatch);
    return e.PaletteSpriteBatch = l,
      n.exports
  });
  System.registerDynamic("6c", [], !0, function(t, e, n) {
    "use strict";

    function r(t, e, n, r, i) {
      var o = t.tex;
      return {
        tex: o,
        x: e,
        y: n,
        w: r,
        h: i,
        ox: 0,
        oy: 0
      }
    }

    function i(t, e, n, r, i, o, a) {
      if (e.h && e.w)
        for (var s = 0; s < a; s += e.h)
          for (var u = 0; u < o; u += e.w) {
            var l = Math.min(e.w, o - u),
              c = Math.min(e.h, a - s);
            t.drawImage(e.tex, n, e.x, e.y, l, c, r + u, i + s, l, c)
          }
    }

    var o = function() {
      function t(t, e, n, i, o) {
        if (this.t = e,
          this.l = n,
          this.b = i,
          this.r = o, !t.tex)
          throw new Error("creating sprite button before sprites texture initialization");
        this.topLeft = r(t, t.x, t.y, n, e),
          this.topRight = r(t, t.x + t.w - o, t.y, o, e),
          this.bottomLeft = r(t, t.x, t.y + t.h - i, n, i),
          this.bottomRight = r(t, t.x + t.w - o, t.y + t.h - i, o, i),
          this.top = r(t, t.x + n, t.y, t.w - (n + o), e),
          this.bottom = r(t, t.x + n, t.y + t.h - i, t.w - (n + o), i),
          this.left = r(t, t.x, t.y + e, n, t.h - (e + i)),
          this.right = r(t, t.x + t.w - o, t.y + e, o, t.h - (e + i)),
          this.bg = r(t, t.x + n, t.y + e, t.w - (n + o), t.h - (e + i))
      }

      return t.prototype.draw = function(t, e, n, r, o, a) {
          var s = n + o - this.r,
            u = r + a - this.b,
            l = o - (this.l + this.r),
            c = a - (this.t + this.b);
          t.drawSprite(this.topLeft, e, n, r),
            t.drawSprite(this.topRight, e, s, r),
            t.drawSprite(this.bottomLeft, e, n, u),
            t.drawSprite(this.bottomRight, e, s, u),
            i(t, this.top, e, n + this.l, r, l, this.t),
            i(t, this.left, e, n, r + this.t, this.l, c),
            i(t, this.bg, e, n + this.l, r + this.t, l, c),
            i(t, this.right, e, n + o - this.r, r + this.t, this.r, c),
            i(t, this.bottom, e, n + this.l, r + a - this.b, l, this.b)
        },
        t
    }();
    return e.SpriteButton = o,
      n.exports
  });
  System.registerDynamic("6d", ["22"], !0, function(t, e, n) {
    "use strict";
    var r = t("22"),
      i = " ".charCodeAt(0),
      o = "\t".charCodeAt(0),
      a = "?".charCodeAt(0),
      s = "\n".charCodeAt(0),
      u = "\r".charCodeAt(0),
      l = function() {
        function t(t) {
          var e = this;
          this.lineSpacing = 2,
            this.characterSpacing = 1,
            this.chars = [],
            this.emotes = [],
            this.emotePictures = [],
            t.forEach(function(t) {
              t && (e.chars[t.code] = t.sprite)
            });
          var n = this.chars[0],
            r = 3;
          this.height = n.h,
            this.chars[i] = {
              x: 0,
              y: 0,
              w: r,
              h: n.h,
              ox: 0,
              oy: 0
            },
            this.chars[o] = {
              x: 0,
              y: 0,
              w: 4 * r,
              h: n.h,
              ox: 0,
              oy: 0
            }
        }

        return t.prototype.getChar = function(t) {
            return this.chars[t] || this.chars[a]
          },
          t.prototype.parseEmotes = function(t) {
            return this.emotes.reduce(function(t, e) {
              var n = e.regex,
                r = e.char;
              return t.replace(n, r)
            }, t)
          },
          t.prototype.forEachChar = function(t, e) {
            t = this.parseEmotes(t);
            for (var n = 0; n < t.length; n++) {
              var i = n,
                o = t.charCodeAt(n);
              r.isSurrogate(o) && n + 1 < t.length && (o = r.fromSurrogate(o, t.charCodeAt(n + 1)),
                  n++),
                o !== u && e(o, i)
            }
          },
          t.prototype.addEmoticon = function(t, e, n) {
            this.emotes.push({
              regex: t,
              char: e
            });
            var i = e.charCodeAt(0);
            r.isSurrogate(i) && e.length > 1 && (i = r.fromSurrogate(i, e.charCodeAt(1))),
              n && (this.emotePictures[i] = n)
          },
          t.prototype.measureChar = function(t) {
            return (this.emotePictures[t] || this.getChar(t)).w
          },
          t.prototype.drawChar = function(t, e, n, r, i) {
            var o = this.emotePictures[e];
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
              t === s ? (n = Math.max(n, i),
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
            this.forEachChar(e, function(e, u) {
              e === s ? (a = r,
                i += o.height + o.lineSpacing) : a += o.drawChar(t, e, n, a, i) + o.characterSpacing
            })
          },
          t.prototype.drawTextJumping = function(t, e, n, r, i, o) {
            var a = this;
            r = Math.round(r),
              i = Math.round(i);
            var u = r;
            this.forEachChar(e, function(e, l) {
              e === s ? (u = r,
                i += a.height + a.lineSpacing) : u += a.drawChar(t, e, n, u, o && o.indexOf(l) !== -1 ? i - 1 : i) + a.characterSpacing
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
    return e.SpriteFont = l,
      n.exports
  });
  System.registerDynamic("6e", [getCodeName("gl-texture2d")], !0, function(t, e, n) {
    "use strict";

    function r(t, e) {
      e.forEach(function(e) {
        e.tex = o(t, e.img),
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
          t.sprites.forEach(function(t) {
            return t.tex = null
          })
      })
    }

    var o = t(getCodeName("gl-texture2d"));
    return e.createTexturesForSpriteSheets = r,
      e.releaseTexturesForSpriteSheets = i,
      n.exports
  });
  System.registerDynamic("6f", ["70", "71", "72"], !0, function(t, e, n) {
    return function(e) {
        "use strict";

        function r(t) {
          var e = new Function("y", "return function(){return y}");
          return e(t)
        }

        function i(t, e) {
          for (var n = new Array(t), r = 0; r < t; ++r)
            n[r] = e;
          return n
        }

        function o(t, e, n, o) {
          function u(n) {
            var r = new Function("gl", "wrapper", "locations", "return function(){return gl.getUniform(wrapper.program,locations[" + n + "])}");
            return r(t, e, o)
          }

          function l(t, e, n) {
            switch (n) {
              case "bool":
              case "int":
              case "sampler2D":
              case "samplerCube":
                return "gl.uniform1i(locations[" + e + "],obj" + t + ")";
              case "float":
                return "gl.uniform1f(locations[" + e + "],obj" + t + ")";
              default:
                var r = n.indexOf("vec");
                if (!(0 <= r && r <= 1 && n.length === 4 + r)) {
                  if (0 === n.indexOf("mat") && 4 === n.length) {
                    var i = n.charCodeAt(n.length - 1) - 48;
                    if (i < 2 || i > 4)
                      throw new s("", "Invalid uniform dimension type for matrix " + name + ": " + n);
                    return "gl.uniformMatrix" + i + "fv(locations[" + e + "],false,obj" + t + ")"
                  }
                  throw new s("", "Unknown uniform data type for " + name + ": " + n)
                }
                var i = n.charCodeAt(n.length - 1) - 48;
                if (i < 2 || i > 4)
                  throw new s("", "Invalid data type");
                switch (n.charAt(0)) {
                  case "b":
                  case "i":
                    return "gl.uniform" + i + "iv(locations[" + e + "],obj" + t + ")";
                  case "v":
                    return "gl.uniform" + i + "fv(locations[" + e + "],obj" + t + ")";
                  default:
                    throw new s("", "Unrecognized data type for vector " + name + ": " + n)
                }
            }
          }

          function c(t, e) {
            if ("object" != typeof e)
              return [
                [t, e]
              ];
            var n = [];
            for (var r in e) {
              var i = e[r],
                o = t;
              o += parseInt(r) + "" === r ? "[" + r + "]" : "." + r,
                "object" == typeof i ? n.push.apply(n, c(o, i)) : n.push([o, i])
            }
            return n
          }

          function f(e) {
            for (var r = ["return function updateProperty(obj){"], i = c("", e), a = 0; a < i.length; ++a) {
              var s = i[a],
                u = s[0],
                f = s[1];
              o[f] && r.push(l(u, f, n[f].type))
            }
            r.push("return obj}");
            var p = new Function("gl", "locations", r.join("\n"));
            return p(t, o)
          }

          function p(t) {
            switch (t) {
              case "bool":
                return !1;
              case "int":
              case "sampler2D":
              case "samplerCube":
                return 0;
              case "float":
                return 0;
              default:
                var e = t.indexOf("vec");
                if (0 <= e && e <= 1 && t.length === 4 + e) {
                  var n = t.charCodeAt(t.length - 1) - 48;
                  if (n < 2 || n > 4)
                    throw new s("", "Invalid data type");
                  return "b" === t.charAt(0) ? i(n, !1) : i(n, 0)
                }
                if (0 === t.indexOf("mat") && 4 === t.length) {
                  var n = t.charCodeAt(t.length - 1) - 48;
                  if (n < 2 || n > 4)
                    throw new s("", "Invalid uniform dimension type for matrix " + name + ": " + t);
                  return i(n * n, 0)
                }
                throw new s("", "Unknown uniform data type for " + name + ": " + t)
            }
          }

          function h(t, e, i) {
            if ("object" == typeof i) {
              var a = d(i);
              Object.defineProperty(t, e, {
                get: r(a),
                set: f(i),
                enumerable: !0,
                configurable: !1
              })
            } else
              o[i] ? Object.defineProperty(t, e, {
                get: u(i),
                set: f(i),
                enumerable: !0,
                configurable: !1
              }) : t[e] = p(n[i].type)
          }

          function d(t) {
            var e;
            if (Array.isArray(t)) {
              e = new Array(t.length);
              for (var n = 0; n < t.length; ++n)
                h(e, n, t[n])
            } else {
              e = {};
              for (var r in t)
                h(e, r, t[r])
            }
            return e
          }

          var v = a(n, !0);
          return {
            get: r(d(v)),
            set: f(v),
            enumerable: !0,
            configurable: !0
          }
        }

        var a = t("70"),
          s = t("71");
        n.exports = o
      }(t("72")),
      n.exports
  });
  System.registerDynamic("73", ["71"], !0, function(t, e, n) {
    "use strict";

    function r(t, e, n, r, i, o) {
      this._gl = t,
        this._wrapper = e,
        this._index = n,
        this._locations = r,
        this._dimension = i,
        this._constFunc = o
    }

    function i(t, e, n, i, o, a, s) {
      for (var u = ["gl", "v"], l = [], c = 0; c < o; ++c)
        u.push("x" + c),
        l.push("x" + c);
      u.push("if(x0.length===void 0){return gl.vertexAttrib" + o + "f(v," + l.join() + ")}else{return gl.vertexAttrib" + o + "fv(v,x0)}");
      var f = Function.apply(null, u),
        p = new r(t, e, n, i, o, f);
      Object.defineProperty(a, s, {
        set: function(e) {
          return t.disableVertexAttribArray(i[n]),
            f(t, i[n], e),
            e
        },
        get: function() {
          return p
        },
        enumerable: !0
      })
    }

    function o(t, e, n, r, o, a, s) {
      for (var u = new Array(o), l = new Array(o), c = 0; c < o; ++c)
        i(t, e, n[c], r, o, u, c),
        l[c] = u[c];
      Object.defineProperty(u, "location", {
          set: function(t) {
            if (Array.isArray(t))
              for (var e = 0; e < o; ++e)
                l[e].location = t[e];
            else
              for (var e = 0; e < o; ++e)
                l[e].location = t + e;
            return t
          },
          get: function() {
            for (var t = new Array(o), e = 0; e < o; ++e)
              t[e] = r[n[e]];
            return t
          },
          enumerable: !0
        }),
        u.pointer = function(e, i, a, s) {
          e = e || t.FLOAT,
            i = !!i,
            a = a || o * o,
            s = s || 0;
          for (var u = 0; u < o; ++u) {
            var l = r[n[u]];
            t.vertexAttribPointer(l, o, e, i, a, s + u * o),
              t.enableVertexAttribArray(l)
          }
        };
      var f = new Array(o),
        p = t["vertexAttrib" + o + "fv"];
      Object.defineProperty(a, s, {
        set: function(e) {
          for (var i = 0; i < o; ++i) {
            var a = r[n[i]];
            if (t.disableVertexAttribArray(a),
              Array.isArray(e[0]))
              p.call(t, a, e[i]);
            else {
              for (var s = 0; s < o; ++s)
                f[s] = e[o * i + s];
              p.call(t, a, f)
            }
          }
          return e
        },
        get: function() {
          return u
        },
        enumerable: !0
      })
    }

    function a(t, e, n, r) {
      for (var a = {}, u = 0, l = n.length; u < l; ++u) {
        var c = n[u],
          f = c.name,
          p = c.type,
          h = c.locations;
        switch (p) {
          case "bool":
          case "int":
          case "float":
            i(t, e, h[0], r, 1, a, f);
            break;
          default:
            if (p.indexOf("vec") >= 0) {
              var d = p.charCodeAt(p.length - 1) - 48;
              if (d < 2 || d > 4)
                throw new s("", "Invalid data type for attribute " + f + ": " + p);
              i(t, e, h[0], r, d, a, f)
            } else {
              if (!(p.indexOf("mat") >= 0))
                throw new s("", "Unknown data type for attribute " + f + ": " + p);
              var d = p.charCodeAt(p.length - 1) - 48;
              if (d < 2 || d > 4)
                throw new s("", "Invalid data type for attribute " + f + ": " + p);
              o(t, e, h, r, d, a, f)
            }
        }
      }
      return a
    }

    n.exports = a;
    var s = t("71"),
      u = r.prototype;
    return u.pointer = function(t, e, n, r) {
        var i = this,
          o = i._gl,
          a = i._locations[i._index];
        o.vertexAttribPointer(a, i._dimension, t || o.FLOAT, !!e, n || 0, r || 0),
          o.enableVertexAttribArray(a)
      },
      u.set = function(t, e, n, r) {
        return this._constFunc(this._locations[this._index], t, e, n, r)
      },
      Object.defineProperty(u, "location", {
        get: function() {
          return this._locations[this._index]
        },
        set: function(t) {
          return t !== this._locations[this._index] && (this._locations[this._index] = 0 | t,
              this._wrapper.program = null),
            0 | t
        }
      }),
      n.exports
  });
  System.registerDynamic("70", [], !0, function(t, e, n) {
    "use strict";

    function r(t, e) {
      for (var n = {}, r = 0; r < t.length; ++r)
        for (var i = t[r].name, o = i.split("."), a = n, s = 0; s < o.length; ++s) {
          var u = o[s].split("[");
          if (u.length > 1) {
            u[0] in a || (a[u[0]] = []),
              a = a[u[0]];
            for (var l = 1; l < u.length; ++l) {
              var c = parseInt(u[l]);
              l < u.length - 1 || s < o.length - 1 ? (c in a || (l < u.length - 1 ? a[c] = [] : a[c] = {}),
                a = a[c]) : e ? a[c] = r : a[c] = t[r].type
            }
          } else
            s < o.length - 1 ? (u[0] in a || (a[u[0]] = {}),
              a = a[u[0]]) : e ? a[u[0]] = r : a[u[0]] = t[r].type
        }
      return n
    }

    return n.exports = r,
      n.exports
  });
  System.registerDynamic("74", [], !0, function(t, e, n) {
    var r;
    return function(t) {
        function n() {
          var t = arguments[0],
            e = n.cache;
          return e[t] && e.hasOwnProperty(t) || (e[t] = n.parse(t)),
            n.format.call(null, e[t], arguments)
        }

        function i(t) {
          return Object.prototype.toString.call(t).slice(8, -1).toLowerCase()
        }

        function o(t, e) {
          return Array(e + 1).join(t)
        }

        var a = {
          not_string: /[^s]/,
          number: /[diefg]/,
          json: /[j]/,
          not_json: /[^j]/,
          text: /^[^\x25]+/,
          modulo: /^\x25{2}/,
          placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijosuxX])/,
          key: /^([a-z_][a-z_\d]*)/i,
          key_access: /^\.([a-z_][a-z_\d]*)/i,
          index_access: /^\[(\d+)\]/,
          sign: /^[\+\-]/
        };
        n.format = function(t, e) {
            var r, s, u, l, c, f, p, h = 1,
              d = t.length,
              v = "",
              m = [],
              g = !0,
              y = "";
            for (s = 0; s < d; s++)
              if (v = i(t[s]),
                "string" === v)
                m[m.length] = t[s];
              else if ("array" === v) {
              if (l = t[s],
                l[2])
                for (r = e[h],
                  u = 0; u < l[2].length; u++) {
                  if (!r.hasOwnProperty(l[2][u]))
                    throw new Error(n("[sprintf] property '%s' does not exist", l[2][u]));
                  r = r[l[2][u]]
                }
              else
                r = l[1] ? e[l[1]] : e[h++];
              if ("function" == i(r) && (r = r()),
                a.not_string.test(l[8]) && a.not_json.test(l[8]) && "number" != i(r) && isNaN(r))
                throw new TypeError(n("[sprintf] expecting number but found %s", i(r)));
              switch (a.number.test(l[8]) && (g = r >= 0),
                l[8]) {
                case "b":
                  r = r.toString(2);
                  break;
                case "c":
                  r = String.fromCharCode(r);
                  break;
                case "d":
                case "i":
                  r = parseInt(r, 10);
                  break;
                case "j":
                  r = JSON.stringify(r, null, l[6] ? parseInt(l[6]) : 0);
                  break;
                case "e":
                  r = l[7] ? r.toExponential(l[7]) : r.toExponential();
                  break;
                case "f":
                  r = l[7] ? parseFloat(r).toFixed(l[7]) : parseFloat(r);
                  break;
                case "g":
                  r = l[7] ? parseFloat(r).toPrecision(l[7]) : parseFloat(r);
                  break;
                case "o":
                  r = r.toString(8);
                  break;
                case "s":
                  r = (r = String(r)) && l[7] ? r.substring(0, l[7]) : r;
                  break;
                case "u":
                  r >>>= 0;
                  break;
                case "x":
                  r = r.toString(16);
                  break;
                case "X":
                  r = r.toString(16).toUpperCase()
              }
              a.json.test(l[8]) ? m[m.length] = r : (!a.number.test(l[8]) || g && !l[3] ? y = "" : (y = g ? "+" : "-",
                  r = r.toString().replace(a.sign, "")),
                f = l[4] ? "0" === l[4] ? "0" : l[4].charAt(1) : " ",
                p = l[6] - (y + r).length,
                c = l[6] && p > 0 ? o(f, p) : "",
                m[m.length] = l[5] ? y + r + c : "0" === f ? y + c + r : c + y + r)
            }
            return m.join("")
          },
          n.cache = {},
          n.parse = function(t) {
            for (var e = t, n = [], r = [], i = 0; e;) {
              if (null !== (n = a.text.exec(e)))
                r[r.length] = n[0];
              else if (null !== (n = a.modulo.exec(e)))
                r[r.length] = "%";
              else {
                if (null === (n = a.placeholder.exec(e)))
                  throw new SyntaxError("[sprintf] unexpected placeholder");
                if (n[2]) {
                  i |= 1;
                  var o = [],
                    s = n[2],
                    u = [];
                  if (null === (u = a.key.exec(s)))
                    throw new SyntaxError("[sprintf] failed to parse named argument key");
                  for (o[o.length] = u[1];
                    "" !== (s = s.substring(u[0].length));)
                    if (null !== (u = a.key_access.exec(s)))
                      o[o.length] = u[1];
                    else {
                      if (null === (u = a.index_access.exec(s)))
                        throw new SyntaxError("[sprintf] failed to parse named argument key");
                      o[o.length] = u[1]
                    }
                  n[2] = o
                } else
                  i |= 2;
                if (3 === i)
                  throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
                r[r.length] = n
              }
              e = e.substring(n[0].length)
            }
            return r
          };
        var s = function(t, e, r) {
          return r = (e || []).slice(0),
            r.splice(0, 0, t),
            n.apply(null, r)
        };
        "undefined" != typeof e ? (e.sprintf = n,
          e.vsprintf = s) : (t.sprintf = n,
          t.vsprintf = s,
          "function" == typeof r && r.amd && r(function() {
            return {
              sprintf: n,
              vsprintf: s
            }
          }))
      }("undefined" == typeof window ? this : window),
      n.exports
  });
  System.registerDynamic("75", ["74"], !0, function(t, e, n) {
    return n.exports = t("74"),
      n.exports
  });
  System.registerDynamic("76", [], !0, function(t, e, n) {
    return n.exports = {
        0: "NONE",
        1: "ONE",
        2: "LINE_LOOP",
        3: "LINE_STRIP",
        4: "TRIANGLES",
        5: "TRIANGLE_STRIP",
        6: "TRIANGLE_FAN",
        256: "DEPTH_BUFFER_BIT",
        512: "NEVER",
        513: "LESS",
        514: "EQUAL",
        515: "LEQUAL",
        516: "GREATER",
        517: "NOTEQUAL",
        518: "GEQUAL",
        519: "ALWAYS",
        768: "SRC_COLOR",
        769: "ONE_MINUS_SRC_COLOR",
        770: "SRC_ALPHA",
        771: "ONE_MINUS_SRC_ALPHA",
        772: "DST_ALPHA",
        773: "ONE_MINUS_DST_ALPHA",
        774: "DST_COLOR",
        775: "ONE_MINUS_DST_COLOR",
        776: "SRC_ALPHA_SATURATE",
        1024: "STENCIL_BUFFER_BIT",
        1028: "FRONT",
        1029: "BACK",
        1032: "FRONT_AND_BACK",
        1280: "INVALID_ENUM",
        1281: "INVALID_VALUE",
        1282: "INVALID_OPERATION",
        1285: "OUT_OF_MEMORY",
        1286: "INVALID_FRAMEBUFFER_OPERATION",
        2304: "CW",
        2305: "CCW",
        2849: "LINE_WIDTH",
        2884: "CULL_FACE",
        2885: "CULL_FACE_MODE",
        2886: "FRONT_FACE",
        2928: "DEPTH_RANGE",
        2929: "DEPTH_TEST",
        2930: "DEPTH_WRITEMASK",
        2931: "DEPTH_CLEAR_VALUE",
        2932: "DEPTH_FUNC",
        2960: "STENCIL_TEST",
        2961: "STENCIL_CLEAR_VALUE",
        2962: "STENCIL_FUNC",
        2963: "STENCIL_VALUE_MASK",
        2964: "STENCIL_FAIL",
        2965: "STENCIL_PASS_DEPTH_FAIL",
        2966: "STENCIL_PASS_DEPTH_PASS",
        2967: "STENCIL_REF",
        2968: "STENCIL_WRITEMASK",
        2978: "VIEWPORT",
        3024: "DITHER",
        3042: "BLEND",
        3088: "SCISSOR_BOX",
        3089: "SCISSOR_TEST",
        3106: "COLOR_CLEAR_VALUE",
        3107: "COLOR_WRITEMASK",
        3317: "UNPACK_ALIGNMENT",
        3333: "PACK_ALIGNMENT",
        3379: "MAX_TEXTURE_SIZE",
        3386: "MAX_VIEWPORT_DIMS",
        3408: "SUBPIXEL_BITS",
        3410: "RED_BITS",
        3411: "GREEN_BITS",
        3412: "BLUE_BITS",
        3413: "ALPHA_BITS",
        3414: "DEPTH_BITS",
        3415: "STENCIL_BITS",
        3553: "TEXTURE_2D",
        4352: "DONT_CARE",
        4353: "FASTEST",
        4354: "NICEST",
        5120: "BYTE",
        5121: "UNSIGNED_BYTE",
        5122: "SHORT",
        5123: "UNSIGNED_SHORT",
        5124: "INT",
        5125: "UNSIGNED_INT",
        5126: "FLOAT",
        5386: "INVERT",
        5890: "TEXTURE",
        6401: "STENCIL_INDEX",
        6402: "DEPTH_COMPONENT",
        6406: "ALPHA",
        6407: "RGB",
        6408: "RGBA",
        6409: "LUMINANCE",
        6410: "LUMINANCE_ALPHA",
        7680: "KEEP",
        7681: "REPLACE",
        7682: "INCR",
        7683: "DECR",
        7936: "VENDOR",
        7937: "RENDERER",
        7938: "VERSION",
        9728: "NEAREST",
        9729: "LINEAR",
        9984: "NEAREST_MIPMAP_NEAREST",
        9985: "LINEAR_MIPMAP_NEAREST",
        9986: "NEAREST_MIPMAP_LINEAR",
        9987: "LINEAR_MIPMAP_LINEAR",
        10240: "TEXTURE_MAG_FILTER",
        10241: "TEXTURE_MIN_FILTER",
        10242: "TEXTURE_WRAP_S",
        10243: "TEXTURE_WRAP_T",
        10497: "REPEAT",
        10752: "POLYGON_OFFSET_UNITS",
        16384: "COLOR_BUFFER_BIT",
        32769: "CONSTANT_COLOR",
        32770: "ONE_MINUS_CONSTANT_COLOR",
        32771: "CONSTANT_ALPHA",
        32772: "ONE_MINUS_CONSTANT_ALPHA",
        32773: "BLEND_COLOR",
        32774: "FUNC_ADD",
        32777: "BLEND_EQUATION_RGB",
        32778: "FUNC_SUBTRACT",
        32779: "FUNC_REVERSE_SUBTRACT",
        32819: "UNSIGNED_SHORT_4_4_4_4",
        32820: "UNSIGNED_SHORT_5_5_5_1",
        32823: "POLYGON_OFFSET_FILL",
        32824: "POLYGON_OFFSET_FACTOR",
        32854: "RGBA4",
        32855: "RGB5_A1",
        32873: "TEXTURE_BINDING_2D",
        32926: "SAMPLE_ALPHA_TO_COVERAGE",
        32928: "SAMPLE_COVERAGE",
        32936: "SAMPLE_BUFFERS",
        32937: "SAMPLES",
        32938: "SAMPLE_COVERAGE_VALUE",
        32939: "SAMPLE_COVERAGE_INVERT",
        32968: "BLEND_DST_RGB",
        32969: "BLEND_SRC_RGB",
        32970: "BLEND_DST_ALPHA",
        32971: "BLEND_SRC_ALPHA",
        33071: "CLAMP_TO_EDGE",
        33170: "GENERATE_MIPMAP_HINT",
        33189: "DEPTH_COMPONENT16",
        33306: "DEPTH_STENCIL_ATTACHMENT",
        33635: "UNSIGNED_SHORT_5_6_5",
        33648: "MIRRORED_REPEAT",
        33901: "ALIASED_POINT_SIZE_RANGE",
        33902: "ALIASED_LINE_WIDTH_RANGE",
        33984: "TEXTURE0",
        33985: "TEXTURE1",
        33986: "TEXTURE2",
        33987: "TEXTURE3",
        33988: "TEXTURE4",
        33989: "TEXTURE5",
        33990: "TEXTURE6",
        33991: "TEXTURE7",
        33992: "TEXTURE8",
        33993: "TEXTURE9",
        33994: "TEXTURE10",
        33995: "TEXTURE11",
        33996: "TEXTURE12",
        33997: "TEXTURE13",
        33998: "TEXTURE14",
        33999: "TEXTURE15",
        34e3: "TEXTURE16",
        34001: "TEXTURE17",
        34002: "TEXTURE18",
        34003: "TEXTURE19",
        34004: "TEXTURE20",
        34005: "TEXTURE21",
        34006: "TEXTURE22",
        34007: "TEXTURE23",
        34008: "TEXTURE24",
        34009: "TEXTURE25",
        34010: "TEXTURE26",
        34011: "TEXTURE27",
        34012: "TEXTURE28",
        34013: "TEXTURE29",
        34014: "TEXTURE30",
        34015: "TEXTURE31",
        34016: "ACTIVE_TEXTURE",
        34024: "MAX_RENDERBUFFER_SIZE",
        34041: "DEPTH_STENCIL",
        34055: "INCR_WRAP",
        34056: "DECR_WRAP",
        34067: "TEXTURE_CUBE_MAP",
        34068: "TEXTURE_BINDING_CUBE_MAP",
        34069: "TEXTURE_CUBE_MAP_POSITIVE_X",
        34070: "TEXTURE_CUBE_MAP_NEGATIVE_X",
        34071: "TEXTURE_CUBE_MAP_POSITIVE_Y",
        34072: "TEXTURE_CUBE_MAP_NEGATIVE_Y",
        34073: "TEXTURE_CUBE_MAP_POSITIVE_Z",
        34074: "TEXTURE_CUBE_MAP_NEGATIVE_Z",
        34076: "MAX_CUBE_MAP_TEXTURE_SIZE",
        34338: "VERTEX_ATTRIB_ARRAY_ENABLED",
        34339: "VERTEX_ATTRIB_ARRAY_SIZE",
        34340: "VERTEX_ATTRIB_ARRAY_STRIDE",
        34341: "VERTEX_ATTRIB_ARRAY_TYPE",
        34342: "CURRENT_VERTEX_ATTRIB",
        34373: "VERTEX_ATTRIB_ARRAY_POINTER",
        34466: "NUM_COMPRESSED_TEXTURE_FORMATS",
        34467: "COMPRESSED_TEXTURE_FORMATS",
        34660: "BUFFER_SIZE",
        34661: "BUFFER_USAGE",
        34816: "STENCIL_BACK_FUNC",
        34817: "STENCIL_BACK_FAIL",
        34818: "STENCIL_BACK_PASS_DEPTH_FAIL",
        34819: "STENCIL_BACK_PASS_DEPTH_PASS",
        34877: "BLEND_EQUATION_ALPHA",
        34921: "MAX_VERTEX_ATTRIBS",
        34922: "VERTEX_ATTRIB_ARRAY_NORMALIZED",
        34930: "MAX_TEXTURE_IMAGE_UNITS",
        34962: "ARRAY_BUFFER",
        34963: "ELEMENT_ARRAY_BUFFER",
        34964: "ARRAY_BUFFER_BINDING",
        34965: "ELEMENT_ARRAY_BUFFER_BINDING",
        34975: "VERTEX_ATTRIB_ARRAY_BUFFER_BINDING",
        35040: "STREAM_DRAW",
        35044: "STATIC_DRAW",
        35048: "DYNAMIC_DRAW",
        35632: "FRAGMENT_SHADER",
        35633: "VERTEX_SHADER",
        35660: "MAX_VERTEX_TEXTURE_IMAGE_UNITS",
        35661: "MAX_COMBINED_TEXTURE_IMAGE_UNITS",
        35663: "SHADER_TYPE",
        35664: "FLOAT_VEC2",
        35665: "FLOAT_VEC3",
        35666: "FLOAT_VEC4",
        35667: "INT_VEC2",
        35668: "INT_VEC3",
        35669: "INT_VEC4",
        35670: "BOOL",
        35671: "BOOL_VEC2",
        35672: "BOOL_VEC3",
        35673: "BOOL_VEC4",
        35674: "FLOAT_MAT2",
        35675: "FLOAT_MAT3",
        35676: "FLOAT_MAT4",
        35678: "SAMPLER_2D",
        35680: "SAMPLER_CUBE",
        35712: "DELETE_STATUS",
        35713: "COMPILE_STATUS",
        35714: "LINK_STATUS",
        35715: "VALIDATE_STATUS",
        35716: "INFO_LOG_LENGTH",
        35717: "ATTACHED_SHADERS",
        35718: "ACTIVE_UNIFORMS",
        35719: "ACTIVE_UNIFORM_MAX_LENGTH",
        35720: "SHADER_SOURCE_LENGTH",
        35721: "ACTIVE_ATTRIBUTES",
        35722: "ACTIVE_ATTRIBUTE_MAX_LENGTH",
        35724: "SHADING_LANGUAGE_VERSION",
        35725: "CURRENT_PROGRAM",
        36003: "STENCIL_BACK_REF",
        36004: "STENCIL_BACK_VALUE_MASK",
        36005: "STENCIL_BACK_WRITEMASK",
        36006: "FRAMEBUFFER_BINDING",
        36007: "RENDERBUFFER_BINDING",
        36048: "FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE",
        36049: "FRAMEBUFFER_ATTACHMENT_OBJECT_NAME",
        36050: "FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL",
        36051: "FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE",
        36053: "FRAMEBUFFER_COMPLETE",
        36054: "FRAMEBUFFER_INCOMPLETE_ATTACHMENT",
        36055: "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT",
        36057: "FRAMEBUFFER_INCOMPLETE_DIMENSIONS",
        36061: "FRAMEBUFFER_UNSUPPORTED",
        36064: "COLOR_ATTACHMENT0",
        36096: "DEPTH_ATTACHMENT",
        36128: "STENCIL_ATTACHMENT",
        36160: "FRAMEBUFFER",
        36161: "RENDERBUFFER",
        36162: "RENDERBUFFER_WIDTH",
        36163: "RENDERBUFFER_HEIGHT",
        36164: "RENDERBUFFER_INTERNAL_FORMAT",
        36168: "STENCIL_INDEX8",
        36176: "RENDERBUFFER_RED_SIZE",
        36177: "RENDERBUFFER_GREEN_SIZE",
        36178: "RENDERBUFFER_BLUE_SIZE",
        36179: "RENDERBUFFER_ALPHA_SIZE",
        36180: "RENDERBUFFER_DEPTH_SIZE",
        36181: "RENDERBUFFER_STENCIL_SIZE",
        36194: "RGB565",
        36336: "LOW_FLOAT",
        36337: "MEDIUM_FLOAT",
        36338: "HIGH_FLOAT",
        36339: "LOW_INT",
        36340: "MEDIUM_INT",
        36341: "HIGH_INT",
        36346: "SHADER_COMPILER",
        36347: "MAX_VERTEX_UNIFORM_VECTORS",
        36348: "MAX_VARYING_VECTORS",
        36349: "MAX_FRAGMENT_UNIFORM_VECTORS",
        37440: "UNPACK_FLIP_Y_WEBGL",
        37441: "UNPACK_PREMULTIPLY_ALPHA_WEBGL",
        37442: "CONTEXT_LOST_WEBGL",
        37443: "UNPACK_COLORSPACE_CONVERSION_WEBGL",
        37444: "BROWSER_DEFAULT_WEBGL"
      },
      n.exports
  });
  System.registerDynamic("77", ["76"], !0, function(t, e, n) {
    var r = t("76");
    return n.exports = function(t) {
        return r[t]
      },
      n.exports
  });
  System.registerDynamic("78", [], !0, function(t, e, n) {
    return n.exports = ["<<=", ">>=", "++", "--", "<<", ">>", "<=", ">=", "==", "!=", "&&", "||", "+=", "-=", "*=", "/=", "%=", "&=", "^^", "^=", "|=", "(", ")", "[", "]", ".", "!", "~", "*", "/", "%", "+", "-", "<", ">", "&", "^", "|", "?", ":", "=", ",", ";", "{", "}"],
      n.exports
  });
  System.registerDynamic("79", [], !0, function(t, e, n) {
    return n.exports = ["precision", "highp", "mediump", "lowp", "attribute", "const", "uniform", "varying", "break", "continue", "do", "for", "while", "if", "else", "in", "out", "inout", "float", "int", "void", "bool", "true", "false", "discard", "return", "mat2", "mat3", "mat4", "vec2", "vec3", "vec4", "ivec2", "ivec3", "ivec4", "bvec2", "bvec3", "bvec4", "sampler1D", "sampler2D", "sampler3D", "samplerCube", "sampler1DShadow", "sampler2DShadow", "struct", "asm", "class", "union", "enum", "typedef", "template", "this", "packed", "goto", "switch", "default", "inline", "noinline", "volatile", "public", "static", "extern", "external", "interface", "long", "short", "double", "half", "fixed", "unsigned", "input", "output", "hvec2", "hvec3", "hvec4", "dvec2", "dvec3", "dvec4", "fvec2", "fvec3", "fvec4", "sampler2DRect", "sampler3DRect", "sampler2DRectShadow", "sizeof", "cast", "namespace", "using"],
      n.exports
  });
  System.registerDynamic("7a", ["79"], !0, function(t, e, n) {
    var r = t("79");
    return n.exports = r.slice().concat(["layout", "centroid", "smooth", "case", "mat2x2", "mat2x3", "mat2x4", "mat3x2", "mat3x3", "mat3x4", "mat4x2", "mat4x3", "mat4x4", "uint", "uvec2", "uvec3", "uvec4", "samplerCubeShadow", "sampler2DArray", "sampler2DArrayShadow", "isampler2D", "isampler3D", "isamplerCube", "isampler2DArray", "usampler2D", "usampler3D", "usamplerCube", "usampler2DArray", "coherent", "restrict", "readonly", "writeonly", "resource", "atomic_uint", "noperspective", "patch", "sample", "subroutine", "common", "partition", "active", "filter", "image1D", "image2D", "image3D", "imageCube", "iimage1D", "iimage2D", "iimage3D", "iimageCube", "uimage1D", "uimage2D", "uimage3D", "uimageCube", "image1DArray", "image2DArray", "iimage1DArray", "iimage2DArray", "uimage1DArray", "uimage2DArray", "image1DShadow", "image2DShadow", "image1DArrayShadow", "image2DArrayShadow", "imageBuffer", "iimageBuffer", "uimageBuffer", "sampler1DArray", "sampler1DArrayShadow", "isampler1D", "isampler1DArray", "usampler1D", "usampler1DArray", "isampler2DRect", "usampler2DRect", "samplerBuffer", "isamplerBuffer", "usamplerBuffer", "sampler2DMS", "isampler2DMS", "usampler2DMS", "sampler2DMSArray", "isampler2DMSArray", "usampler2DMSArray"]),
      n.exports
  });
  System.registerDynamic("7b", [], !0, function(t, e, n) {
    return n.exports = ["abs", "acos", "all", "any", "asin", "atan", "ceil", "clamp", "cos", "cross", "dFdx", "dFdy", "degrees", "distance", "dot", "equal", "exp", "exp2", "faceforward", "floor", "fract", "gl_BackColor", "gl_BackLightModelProduct", "gl_BackLightProduct", "gl_BackMaterial", "gl_BackSecondaryColor", "gl_ClipPlane", "gl_ClipVertex", "gl_Color", "gl_DepthRange", "gl_DepthRangeParameters", "gl_EyePlaneQ", "gl_EyePlaneR", "gl_EyePlaneS", "gl_EyePlaneT", "gl_Fog", "gl_FogCoord", "gl_FogFragCoord", "gl_FogParameters", "gl_FragColor", "gl_FragCoord", "gl_FragData", "gl_FragDepth", "gl_FragDepthEXT", "gl_FrontColor", "gl_FrontFacing", "gl_FrontLightModelProduct", "gl_FrontLightProduct", "gl_FrontMaterial", "gl_FrontSecondaryColor", "gl_LightModel", "gl_LightModelParameters", "gl_LightModelProducts", "gl_LightProducts", "gl_LightSource", "gl_LightSourceParameters", "gl_MaterialParameters", "gl_MaxClipPlanes", "gl_MaxCombinedTextureImageUnits", "gl_MaxDrawBuffers", "gl_MaxFragmentUniformComponents", "gl_MaxLights", "gl_MaxTextureCoords", "gl_MaxTextureImageUnits", "gl_MaxTextureUnits", "gl_MaxVaryingFloats", "gl_MaxVertexAttribs", "gl_MaxVertexTextureImageUnits", "gl_MaxVertexUniformComponents", "gl_ModelViewMatrix", "gl_ModelViewMatrixInverse", "gl_ModelViewMatrixInverseTranspose", "gl_ModelViewMatrixTranspose", "gl_ModelViewProjectionMatrix", "gl_ModelViewProjectionMatrixInverse", "gl_ModelViewProjectionMatrixInverseTranspose", "gl_ModelViewProjectionMatrixTranspose", "gl_MultiTexCoord0", "gl_MultiTexCoord1", "gl_MultiTexCoord2", "gl_MultiTexCoord3", "gl_MultiTexCoord4", "gl_MultiTexCoord5", "gl_MultiTexCoord6", "gl_MultiTexCoord7", "gl_Normal", "gl_NormalMatrix", "gl_NormalScale", "gl_ObjectPlaneQ", "gl_ObjectPlaneR", "gl_ObjectPlaneS", "gl_ObjectPlaneT", "gl_Point", "gl_PointCoord", "gl_PointParameters", "gl_PointSize", "gl_Position", "gl_ProjectionMatrix", "gl_ProjectionMatrixInverse", "gl_ProjectionMatrixInverseTranspose", "gl_ProjectionMatrixTranspose", "gl_SecondaryColor", "gl_TexCoord", "gl_TextureEnvColor", "gl_TextureMatrix", "gl_TextureMatrixInverse", "gl_TextureMatrixInverseTranspose", "gl_TextureMatrixTranspose", "gl_Vertex", "greaterThan", "greaterThanEqual", "inversesqrt", "length", "lessThan", "lessThanEqual", "log", "log2", "matrixCompMult", "max", "min", "mix", "mod", "normalize", "not", "notEqual", "pow", "radians", "reflect", "refract", "sign", "sin", "smoothstep", "sqrt", "step", "tan", "texture2D", "texture2DLod", "texture2DProj", "texture2DProjLod", "textureCube", "textureCubeLod", "texture2DLodEXT", "texture2DProjLodEXT", "textureCubeLodEXT", "texture2DGradEXT", "texture2DProjGradEXT", "textureCubeGradEXT"],
      n.exports
  });
  System.registerDynamic("7c", ["7b"], !0, function(t, e, n) {
    var r = t("7b");
    return r = r.slice().filter(function(t) {
        return !/^(gl\_|texture)/.test(t)
      }),
      n.exports = r.concat(["gl_VertexID", "gl_InstanceID", "gl_Position", "gl_PointSize", "gl_FragCoord", "gl_FrontFacing", "gl_FragDepth", "gl_PointCoord", "gl_MaxVertexAttribs", "gl_MaxVertexUniformVectors", "gl_MaxVertexOutputVectors", "gl_MaxFragmentInputVectors", "gl_MaxVertexTextureImageUnits", "gl_MaxCombinedTextureImageUnits", "gl_MaxTextureImageUnits", "gl_MaxFragmentUniformVectors", "gl_MaxDrawBuffers", "gl_MinProgramTexelOffset", "gl_MaxProgramTexelOffset", "gl_DepthRangeParameters", "gl_DepthRange", "trunc", "round", "roundEven", "isnan", "isinf", "floatBitsToInt", "floatBitsToUint", "intBitsToFloat", "uintBitsToFloat", "packSnorm2x16", "unpackSnorm2x16", "packUnorm2x16", "unpackUnorm2x16", "packHalf2x16", "unpackHalf2x16", "outerProduct", "transpose", "determinant", "inverse", "texture", "textureSize", "textureProj", "textureLod", "textureOffset", "texelFetch", "texelFetchOffset", "textureProjOffset", "textureLodOffset", "textureProjLod", "textureProjLodOffset", "textureGrad", "textureGradOffset", "textureProjGrad", "textureProjGradOffset"]),
      n.exports
  });
  System.registerDynamic("7d", ["79", "78", "7b", "7a", "7c"], !0, function(t, e, n) {
    function r(t) {
      function e(t) {
        t.length && V.push({
          type: E[U],
          data: t,
          position: Y,
          line: H,
          column: z
        })
      }

      function n(t) {
        N = 0,
          G += t,
          j = G.length;
        for (var e; F = G[N],
          N < j;) {
          switch (e = N,
            U) {
            case f:
              N = M();
              break;
            case p:
              N = k();
              break;
            case h:
              N = T();
              break;
            case d:
              N = A();
              break;
            case v:
              N = O();
              break;
            case x:
              N = D();
              break;
            case m:
              N = I();
              break;
            case c:
              N = R();
              break;
            case _:
              N = S();
              break;
            case l:
              N = $()
          }
          if (e !== N)
            switch (G[e]) {
              case "\n":
                z = 0,
                  ++H;
                break;
              default:
                ++z
            }
        }
        return L += N,
          G = G.slice(N),
          V
      }

      function r(t) {
        return B.length && e(B.join("")),
          U = w,
          e("(eof)"),
          V
      }

      function $() {
        return B = B.length ? [] : B,
          "/" === P && "*" === F ? (Y = L + N - 1,
            U = f,
            P = F,
            N + 1) : "/" === P && "/" === F ? (Y = L + N - 1,
            U = p,
            P = F,
            N + 1) : "#" === F ? (U = h,
            Y = L + N,
            N) : /\s/.test(F) ? (U = _,
            Y = L + N,
            N) : (W = /\d/.test(F),
            q = /[^\w_]/.test(F),
            Y = L + N,
            U = W ? v : q ? d : c,
            N)
      }

      function S() {
        return /[^\s]/g.test(F) ? (e(B.join("")),
          U = l,
          N) : (B.push(F),
          P = F,
          N + 1)
      }

      function T() {
        return "\r" !== F && "\n" !== F || "\\" === P ? (B.push(F),
          P = F,
          N + 1) : (e(B.join("")),
          U = l,
          N)
      }

      function k() {
        return T()
      }

      function M() {
        return "/" === F && "*" === P ? (B.push(F),
          e(B.join("")),
          U = l,
          N + 1) : (B.push(F),
          P = F,
          N + 1)
      }

      function A() {
        if ("." === P && /\d/.test(F))
          return U = m,
            N;
        if ("/" === P && "*" === F)
          return U = f,
            N;
        if ("/" === P && "/" === F)
          return U = p,
            N;
        if ("." === F && B.length) {
          for (; C(B);)
          ;
          return U = m,
            N
        }
        if (";" === F || ")" === F || "(" === F) {
          if (B.length)
            for (; C(B);)
          ;
          return e(F),
            U = l,
            N + 1
        }
        var t = 2 === B.length && "=" !== F;
        if (/[\w_\d\s]/.test(F) || t) {
          for (; C(B);)
          ;
          return U = l,
            N
        }
        return B.push(F),
          P = F,
          N + 1
      }

      function C(t) {
        for (var n, r, i = 0;;) {
          if (n = o.indexOf(t.slice(0, t.length + i).join("")),
            r = o[n],
            n === -1) {
            if (i-- + t.length > 0)
              continue;
            r = t.slice(0, 1).join("")
          }
          return e(r),
            Y += r.length,
            B = B.slice(r.length),
            B.length
        }
      }

      function D() {
        return /[^a-fA-F0-9]/.test(F) ? (e(B.join("")),
          U = l,
          N) : (B.push(F),
          P = F,
          N + 1)
      }

      function O() {
        return "." === F ? (B.push(F),
          U = m,
          P = F,
          N + 1) : /[eE]/.test(F) ? (B.push(F),
          U = m,
          P = F,
          N + 1) : "x" === F && 1 === B.length && "0" === B[0] ? (U = x,
          B.push(F),
          P = F,
          N + 1) : /[^\d]/.test(F) ? (e(B.join("")),
          U = l,
          N) : (B.push(F),
          P = F,
          N + 1)
      }

      function I() {
        return "f" === F && (B.push(F),
            P = F,
            N += 1),
          /[eE]/.test(F) ? (B.push(F),
            P = F,
            N + 1) : "-" === F && /[eE]/.test(P) ? (B.push(F),
            P = F,
            N + 1) : /[^\d]/.test(F) ? (e(B.join("")),
            U = l,
            N) : (B.push(F),
            P = F,
            N + 1)
      }

      function R() {
        if (/[^\d\w_]/.test(F)) {
          var t = B.join("");
          return U = Z.indexOf(t) > -1 ? b : X.indexOf(t) > -1 ? y : g,
            e(B.join("")),
            U = l,
            N
        }
        return B.push(F),
          P = F,
          N + 1
      }

      var F, P, j, N = 0,
        L = 0,
        U = l,
        B = [],
        V = [],
        H = 1,
        z = 0,
        Y = 0,
        W = !1,
        q = !1,
        G = "";
      t = t || {};
      var X = a,
        Z = i;
      return "300 es" === t.version && (X = u,
          Z = s),
        function(t) {
          return V = [],
            null !== t ? n(t.replace ? t.replace(/\r\n/g, "\n") : t) : r()
        }
    }

    n.exports = r;
    var i = t("79"),
      o = t("78"),
      a = t("7b"),
      s = t("7a"),
      u = t("7c"),
      l = 999,
      c = 9999,
      f = 0,
      p = 1,
      h = 2,
      d = 3,
      v = 4,
      m = 5,
      g = 6,
      y = 7,
      b = 8,
      _ = 9,
      w = 10,
      x = 11,
      E = ["block-comment", "line-comment", "preprocessor", "operator", "integer", "float", "ident", "builtin", "keyword", "whitespace", "eof", "integer"];
    return n.exports
  });
  System.registerDynamic("7e", ["7d"], !0, function(t, e, n) {
    function r(t, e) {
      var n = i(e),
        r = [];
      return r = r.concat(n(t)),
        r = r.concat(n(null))
    }

    var i = t("7d");
    return n.exports = r,
      n.exports
  });
  System.registerDynamic("7f", ["7e"], !0, function(t, e, n) {
    return n.exports = t("7e"),
      n.exports
  });
  System.registerDynamic("80", [], !0, function(t, e, n) {
    return n.exports = function(t) {
        return atob(t)
      },
      n.exports
  });
  System.registerDynamic("81", ["80"], !0, function(t, e, n) {
    return n.exports = t("80"),
      n.exports
  });
  System.registerDynamic("82", ["7f", "81"], !0, function(t, e, n) {
    function r(t) {
      for (var e = Array.isArray(t) ? t : i(t), n = 0; n < e.length; n++) {
        var r = e[n];
        if ("preprocessor" === r.type) {
          var a = r.data.match(/\#define\s+SHADER_NAME(_B64)?\s+(.+)$/);
          if (a && a[2]) {
            var s = a[1],
              u = a[2];
            return (s ? o(u) : u).trim()
          }
        }
      }
    }

    var i = t("7f"),
      o = t("81");
    return n.exports = r,
      n.exports
  });
  System.registerDynamic("83", ["82"], !0, function(t, e, n) {
    return n.exports = t("82"),
      n.exports
  });
  System.registerDynamic("84", [], !0, function(t, e, n) {
    "use strict";

    function r(t, e) {
      if ("string" != typeof t)
        throw new TypeError("repeat-string expects a string.");
      if (1 === e)
        return t;
      if (2 === e)
        return t + t;
      var n = t.length * e;
      for (i === t && "undefined" != typeof i || (i = t,
          o = ""); n > o.length && e > 0 && (1 & e && (o += t),
          e >>= 1);)
        t += t;
      return o.substr(0, n)
    }

    var i, o = "";
    return n.exports = r,
      n.exports
  });
  System.registerDynamic("85", ["84"], !0, function(t, e, n) {
    return n.exports = t("84"),
      n.exports
  });
  System.registerDynamic("86", ["85"], !0, function(t, e, n) {
    "use strict";
    var r = t("85");
    return n.exports = function(t, e, n) {
        return n = "undefined" != typeof n ? n + "" : " ",
          r(n, e) + t
      },
      n.exports
  });
  System.registerDynamic("87", ["86"], !0, function(t, e, n) {
    return n.exports = t("86"),
      n.exports
  });
  System.registerDynamic("88", ["87"], !0, function(t, e, n) {
    function r(t, e, n) {
      e = "number" == typeof e ? e : 1,
        n = n || ": ";
      var r = t.split(/\r?\n/),
        o = String(r.length + e - 1).length;
      return r.map(function(t, r) {
        var a = r + e,
          s = String(a).length,
          u = i(a, o - s);
        return u + n + t
      }).join("\n")
    }

    var i = t("87");
    return n.exports = r,
      n.exports
  });
  System.registerDynamic("89", ["88"], !0, function(t, e, n) {
    return n.exports = t("88"),
      n.exports
  });
  System.registerDynamic("8a", ["75", "77", "83", "89"], !0, function(t, e, n) {
    function r(t, e, n) {
      "use strict";
      var r = a(e) || "of unknown name (see npm glsl-shader-name)",
        u = "unknown type";
      void 0 !== n && (u = n === o.FRAGMENT_SHADER ? "fragment" : "vertex");
      for (var l = i("Error compiling %s shader %s:\n", u, r), c = i("%s%s", l, t), f = t.split("\n"), p = {}, h = 0; h < f.length; h++) {
        var d = f[h];
        if ("" !== d) {
          var v = parseInt(d.split(":")[2]);
          if (isNaN(v))
            throw new Error(i("Could not parse error: %s", d));
          p[v] = d
        }
      }
      for (var m = s(e).split("\n"), h = 0; h < m.length; h++)
        if (p[h + 3] || p[h + 2] || p[h + 1]) {
          var g = m[h];
          if (l += g + "\n",
            p[h + 1]) {
            var y = p[h + 1];
            y = y.substr(y.split(":", 3).join(":").length + 1).trim(),
              l += i("^^^ %s\n\n", y)
          }
        }
      return {
        long: l.trim(),
        short: c.trim()
      }
    }

    var i = t("75").sprintf,
      o = t("77"),
      a = t("83"),
      s = t("89");
    return n.exports = r,
      n.exports
  });
  System.registerDynamic("8b", ["8a"], !0, function(t, e, n) {
    return n.exports = t("8a"),
      n.exports
  });
  System.registerDynamic("8c", [], !0, function(t, e, n) {
    function r(t, e) {
      var n = {
          identity: e
        },
        r = t.valueOf;
      return Object.defineProperty(t, "valueOf", {
          value: function(t) {
            return t !== e ? r.apply(this, arguments) : n
          },
          writable: !0
        }),
        n
    }

    return n.exports = r,
      n.exports
  });
  System.registerDynamic("8d", ["8c"], !0, function(t, e, n) {
    function r() {
      var t = {};
      return function(e) {
        if (("object" != typeof e || null === e) && "function" != typeof e)
          throw new Error("Weakmap-shim: Key must be object");
        var n = e.valueOf(t);
        return n && n.identity === t ? n : i(e, t)
      }
    }

    var i = t("8c");
    return n.exports = r,
      n.exports
  });
  System.registerDynamic("8e", ["8d"], !0, function(t, e, n) {
    function r() {
      var t = i();
      return {
        get: function(e, n) {
          var r = t(e);
          return r.hasOwnProperty("value") ? r.value : n
        },
        set: function(e, n) {
          t(e).value = n
        },
        has: function(e) {
          return "value" in t(e)
        },
        delete: function(e) {
          return delete t(e).value
        }
      }
    }

    var i = t("8d");
    return n.exports = r,
      n.exports
  });
  System.registerDynamic("8f", ["8e"], !0, function(t, e, n) {
    return n.exports = t("8e"),
      n.exports
  });
  System.registerDynamic("90", ["71", "8b", "8f"], !0, function(t, e, n) {
    "use strict";

    function r(t, e, n, r, i, o, a) {
      this.id = t,
        this.src = e,
        this.type = n,
        this.shader = r,
        this.count = o,
        this.programs = [],
        this.cache = a
    }

    function i(t) {
      this.gl = t,
        this.shaders = [{}, {}],
        this.programs = {}
    }

    function o(t, e, n) {
      var r = t.createShader(e);
      if (t.shaderSource(r, n),
        t.compileShader(r), !t.getShaderParameter(r, t.COMPILE_STATUS)) {
        var i = t.getShaderInfoLog(r);
        try {
          var o = f(i, n, e)
        } catch (t) {
          throw console.warn("Failed to format compiler error: " + t),
            new c(i, "Error compiling shader:\n" + i)
        }
        throw new c(i, o.short, o.long)
      }
      return r
    }

    function a(t, e, n, r, i) {
      var o = t.createProgram();
      t.attachShader(o, e),
        t.attachShader(o, n);
      for (var a = 0; a < r.length; ++a)
        t.bindAttribLocation(o, i[a], r[a]);
      if (t.linkProgram(o), !t.getProgramParameter(o, t.LINK_STATUS)) {
        var s = t.getProgramInfoLog(o);
        throw new c(s, "Error linking program: " + s)
      }
      return o
    }

    function s(t) {
      var e = h.get(t);
      return e || (e = new i(t),
          h.set(t, e)),
        e
    }

    function u(t, e, n) {
      return s(t).getShaderReference(e, n)
    }

    function l(t, e, n, r, i) {
      return s(t).getProgram(e, n, r, i)
    }

    e.shader = u,
      e.program = l;
    var c = t("71"),
      f = t("8b"),
      p = "undefined" == typeof WeakMap ? t("8f") : WeakMap,
      h = new p,
      d = 0;
    r.prototype.dispose = function() {
      if (0 === --this.count) {
        for (var t = this.cache, e = t.gl, n = this.programs, r = 0, i = n.length; r < i; ++r) {
          var o = t.programs[n[r]];
          o && (delete t.programs[r],
            e.deleteProgram(o))
        }
        e.deleteShader(this.shader),
          delete t.shaders[this.type === e.FRAGMENT_SHADER | 0][this.src]
      }
    };
    var v = i.prototype;
    return v.getShaderReference = function(t, e) {
        var n = this.gl,
          i = this.shaders[t === n.FRAGMENT_SHADER | 0],
          a = i[e];
        if (a && n.isShader(a.shader))
          a.count += 1;
        else {
          var s = o(n, t, e);
          a = i[e] = new r((d++), e, t, s, [], 1, this)
        }
        return a
      },
      v.getProgram = function(t, e, n, r) {
        var i = [t.id, e.id, n.join(":"), r.join(":")].join("@"),
          o = this.programs[i];
        return o && this.gl.isProgram(o) || (this.programs[i] = o = a(this.gl, t.shader, e.shader, n, r),
            t.programs.push(i),
            e.programs.push(i)),
          o
      },
      n.exports
  });
  System.registerDynamic("91", [], !0, function(t, e, n) {
    "use strict";

    function r(t, e) {
      if (!s) {
        var n = Object.keys(a);
        s = {};
        for (var r = 0; r < n.length; ++r) {
          var i = n[r];
          s[t[i]] = a[i]
        }
      }
      return s[e]
    }

    function i(t, e) {
      for (var n = t.getProgramParameter(e, t.ACTIVE_UNIFORMS), i = [], o = 0; o < n; ++o) {
        var a = t.getActiveUniform(e, o);
        if (a) {
          var s = r(t, a.type);
          if (a.size > 1)
            for (var u = 0; u < a.size; ++u)
              i.push({
                name: a.name.replace("[0]", "[" + u + "]"),
                type: s
              });
          else
            i.push({
              name: a.name,
              type: s
            })
        }
      }
      return i
    }

    function o(t, e) {
      for (var n = t.getProgramParameter(e, t.ACTIVE_ATTRIBUTES), i = [], o = 0; o < n; ++o) {
        var a = t.getActiveAttrib(e, o);
        a && i.push({
          name: a.name,
          type: r(t, a.type)
        })
      }
      return i
    }

    e.uniforms = i,
      e.attributes = o;
    var a = {
        FLOAT: "float",
        FLOAT_VEC2: "vec2",
        FLOAT_VEC3: "vec3",
        FLOAT_VEC4: "vec4",
        INT: "int",
        INT_VEC2: "ivec2",
        INT_VEC3: "ivec3",
        INT_VEC4: "ivec4",
        BOOL: "bool",
        BOOL_VEC2: "bvec2",
        BOOL_VEC3: "bvec3",
        BOOL_VEC4: "bvec4",
        FLOAT_MAT2: "mat2",
        FLOAT_MAT3: "mat3",
        FLOAT_MAT4: "mat4",
        SAMPLER_2D: "sampler2D",
        SAMPLER_CUBE: "samplerCube"
      },
      s = null;
    return n.exports
  });
  System.registerDynamic("71", [], !0, function(t, e, n) {
    function r(t, e, n) {
      this.shortMessage = e || "",
        this.longMessage = n || "",
        this.rawError = t || "",
        this.message = "gl-shader: " + (e || t || "") + (n ? "\n" + n : ""),
        this.stack = (new Error).stack
    }

    return r.prototype = new Error,
      r.prototype.name = "GLError",
      r.prototype.constructor = r,
      n.exports = r,
      n.exports
  });
  System.registerDynamic("92", ["6f", "73", "70", "90", "91", "71"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      this.gl = t,
        this.gl.lastAttribCount = 0,
        this._vref = this._fref = this._relink = this.vertShader = this.fragShader = this.program = this.attributes = this.uniforms = this.types = null
    }

    function i(t, e) {
      return t.name < e.name ? -1 : 1
    }

    function o(t, e, n, i, o) {
      var a = new r(t);
      return a.update(e, n, i, o),
        a
    }

    var a = t("6f"),
      s = t("73"),
      u = t("70"),
      l = t("90"),
      c = t("91"),
      f = t("71"),
      p = r.prototype;
    return p.bind = function() {
        this.program || this._relink();
        var t, e = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_ATTRIBUTES),
          n = this.gl.lastAttribCount;
        if (e > n)
          for (t = n; t < e; t++)
            this.gl.enableVertexAttribArray(t);
        else if (n > e)
          for (t = e; t < n; t++)
            this.gl.disableVertexAttribArray(t);
        this.gl.lastAttribCount = e,
          this.gl.useProgram(this.program)
      },
      p.dispose = function() {
        for (var t = this.gl.lastAttribCount, e = 0; e < t; e++)
          this.gl.disableVertexAttribArray(e);
        this.gl.lastAttribCount = 0,
          this._fref && this._fref.dispose(),
          this._vref && this._vref.dispose(),
          this.attributes = this.types = this.vertShader = this.fragShader = this.program = this._relink = this._fref = this._vref = null
      },
      p.update = function(t, e, n, r) {
        function o() {
          h.program = l.program(d, h._vref, h._fref, w, x);
          for (var t = 0; t < n.length; ++t)
            M[t] = d.getUniformLocation(h.program, n[t].name)
        }

        if (!e || 1 === arguments.length) {
          var p = t;
          t = p.vertex,
            e = p.fragment,
            n = p.uniforms,
            r = p.attributes
        }
        var h = this,
          d = h.gl,
          v = h._vref;
        h._vref = l.shader(d, d.VERTEX_SHADER, t),
          v && v.dispose(),
          h.vertShader = h._vref.shader;
        var m = this._fref;
        if (h._fref = l.shader(d, d.FRAGMENT_SHADER, e),
          m && m.dispose(),
          h.fragShader = h._fref.shader, !n || !r) {
          var g = d.createProgram();
          if (d.attachShader(g, h.fragShader),
            d.attachShader(g, h.vertShader),
            d.linkProgram(g), !d.getProgramParameter(g, d.LINK_STATUS)) {
            var y = d.getProgramInfoLog(g);
            throw new f(y, "Error linking program:" + y)
          }
          n = n || c.uniforms(d, g),
            r = r || c.attributes(d, g),
            d.deleteProgram(g)
        }
        r = r.slice(),
          r.sort(i);
        var b, _ = [],
          w = [],
          x = [];
        for (b = 0; b < r.length; ++b) {
          var E = r[b];
          if (E.type.indexOf("mat") >= 0) {
            for (var $ = 0 | E.type.charAt(E.type.length - 1), S = new Array($), T = 0; T < $; ++T)
              S[T] = x.length,
              w.push(E.name + "[" + T + "]"),
              "number" == typeof E.location ? x.push(E.location + T) : Array.isArray(E.location) && E.location.length === $ && "number" == typeof E.location[T] ? x.push(0 | E.location[T]) : x.push(-1);
            _.push({
              name: E.name,
              type: E.type,
              locations: S
            })
          } else
            _.push({
              name: E.name,
              type: E.type,
              locations: [x.length]
            }),
            w.push(E.name),
            "number" == typeof E.location ? x.push(0 | E.location) : x.push(-1)
        }
        var k = 0;
        for (b = 0; b < x.length; ++b)
          if (x[b] < 0) {
            for (; x.indexOf(k) >= 0;)
              k += 1;
            x[b] = k
          }
        var M = new Array(n.length);
        o(),
          h._relink = o,
          h.types = {
            uniforms: u(n),
            attributes: u(r)
          },
          h.attributes = s(d, h, _, x),
          Object.defineProperty(h, "uniforms", a(d, h, n, M))
      },
      n.exports = o,
      n.exports
  });
  System.registerDynamic("93", ["92"], !0, function(t, e, n) {
    return n.exports = t("92"),
      n.exports
  });
  System.registerDynamic("69", ["93", getCodeName("gl-matrix")], !0, function(t, e, n) {
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
        p.mat4.identity(t),
        p.mat4.translate(t, t, p.vec3.fromValues(-1, 1, 0)),
        p.mat4.scale(t, t, p.vec3.fromValues(2 / e, -2 / n, 1)),
        p.mat4.scale(t, t, p.vec3.fromValues(r, r, 1)),
        p.mat4.translate(t, t, p.vec3.fromValues(i, o, 0)),
        t
    }

    function s(t, e, n, r, i, o) {
      return void 0 === r && (r = 1),
        void 0 === i && (i = 0),
        void 0 === o && (o = 0),
        p.mat4.identity(t),
        p.mat4.translate(t, t, p.vec3.fromValues(-1, -1, 0)),
        p.mat4.scale(t, t, p.vec3.fromValues(2 / e, 2 / n, 1)),
        p.mat4.scale(t, t, p.vec3.fromValues(r, r, 1)),
        p.mat4.translate(t, t, p.vec3.fromValues(i, o, 0)),
        t
    }

    function u(t) {
      return f(t, h + "\n\t\tattribute vec2 position;\n\t\tattribute vec2 texcoords;\n\n\t\tuniform mat4 transform;\n\n\t\tvarying vec2 textureCoord;\n\n\t\tvoid main() {\n\t\t\ttextureCoord = texcoords;\n\t\t\tgl_Position = transform * vec4(position, 0, 1);\n\t\t}\n\t", h + "\n\t\tuniform sampler2D sampler1;\n\n\t\tvarying vec2 textureCoord;\n\n\t\tvoid main() {\n\t\t\tgl_FragColor = texture2D(sampler1, vec2(textureCoord.x, textureCoord.y));\n\t\t}\n\t")
    }

    function l(t) {
      return f(t, h + "\n\t\tattribute vec2 position;\n\t\tattribute vec2 texcoords;\n\t\tattribute vec4 vertexColor;\n\n\t\tuniform mat4 transform;\n\t\tuniform vec4 lighting;\n\n\t\tvarying vec2 textureCoord;\n\t\tvarying vec4 vColor;\n\n\t\tvoid main() {\n\t\t\ttextureCoord = texcoords;\n\t\t\tvColor = vertexColor * lighting;\n\t\t\tgl_Position = transform * vec4(position, 0, 1);\n\t\t}\n\t", h + "\n\t\tuniform sampler2D sampler1;\n\n\t\tvarying vec2 textureCoord;\n\t\tvarying vec4 vColor;\n\n\t\tvoid main() {\n\t\t\tgl_FragColor = texture2D(sampler1, vec2(textureCoord.x, textureCoord.y)) * vColor;\n\t\t}\n\t")
    }

    function c(t) {
      var e = f(t, h + "\n\t\tattribute vec2 position;\n\t\tattribute vec2 texcoords;\n\t\tattribute vec2 texcoords1;\n\t\tattribute vec4 vertexColor;\n\n\t\tuniform mat4 transform;\n\t\tuniform vec4 lighting;\n\n\t\tvarying vec2 textureCoord;\n\t\tvarying vec2 paletteCoord;\n\t\tvarying vec4 vColor;\n\n\t\tvoid main() {\n\t\t\ttextureCoord = texcoords;\n\t\t\tpaletteCoord = texcoords1;\n\t\t\tvColor = vertexColor * lighting;\n\t\t\tgl_Position = transform * vec4(position, 0, 1);\n\t\t}\n\t", h + "\n\t\tuniform sampler2D sampler1; // sprite\n\t\tuniform sampler2D sampler2; // palette\n\t\tuniform float pixelSize;\n\n\t\tvarying vec2 textureCoord;\n\t\tvarying vec2 paletteCoord;\n\t\tvarying vec4 vColor;\n\n\t\tvoid main() {\n\t\t\tvec4 sprite = texture2D(sampler1, vec2(textureCoord.x, textureCoord.y));\n\t\t\tvec4 palette = texture2D(sampler2, vec2(paletteCoord.x + sprite.x * pixelSize, paletteCoord.y));\n\t\t\tgl_FragColor = vec4(palette.xyz * sprite.y, palette.w) * vColor;\n\t\t}\n\t");
      return t.useProgram(e.program),
        t.uniform1i(t.getUniformLocation(e.program, "sampler1"), 0),
        t.uniform1i(t.getUniformLocation(e.program, "sampler2"), 1),
        t.useProgram(null),
        e
    }

    var f = t("93"),
      p = t(getCodeName("gl-matrix")),
      h = "\n\t#ifdef GL_ES\n\tprecision mediump float;\n\t#endif\n";
    return e.getRenderTargetSize = r,
      e.getWebGLContext = i,
      e.createIndices = o,
      e.createViewMatrix = a,
      e.createViewMatrix2 = s,
      e.createBasicShader = u,
      e.createSpriteShader = l,
      e.createPaletteShader = c,
      n.exports
  });
  System.registerDynamic("9e", [], !0, function(t, e, n) {
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
            window.addEventListener("blur", function(e) {
              t.manager.clear()
            }))
        },
        t.prototype.update = function() {},
        t
    }();
    return e.KeyboardController = i,
      n.exports
  });
  System.registerDynamic("9f", [], !0, function(t, e, n) {
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
  System.registerDynamic("a0", ["22"], !0, function(t, e, n) {
    "use strict";

    function r(t, e) {
      for (var n = 0; n < t.changedTouches.length; ++n) {
        var r = t.changedTouches.item(n);
        if (r.identifier === e)
          return r
      }
      return null
    }

    var i = t("22"),
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
  System.registerDynamic("a1", [getCodeName("Lodash")], !0, function(t, e, n) {
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
  System.registerDynamic("a2", [getCodeName("Lodash"), "9e", "9f", "a0", "a1"], !0, function(t, e, n) {
    "use strict";
    var r = t(getCodeName("Lodash")),
      i = t("9e"),
      o = t("9f"),
      a = t("a0"),
      s = t("a1"),
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
  System.registerDynamic("42", ["22"], !0, function(t, e, n) {
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

    var a = t("22");
    return e.resizeCanvas = r,
      e.resizeCanvasToElementSize = i,
      e.createOrResizeCanvas = o,
      n.exports
  });
  System.registerDynamic("a3", [getCodeName("gl-matrix"), getCodeName("gl-fbo"), "22", "21", "29", "2a", "5e", "24", "23", "5f", "60", "6b", "6c", "6d", "27", "6e", "69", "1f", "a2", "3b", "42", "20", "2c", "a4"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      return 2 === t ? v.ADMIN_COLOR : 1 === t ? v.SYSTEM_COLOR : v.WHITE
    }

    function i(t) {
      t.player && t.player.tes && t.player.tes()
    }

    function o(t) {
      C.emotes.forEach(function(e) {
        var n = e.regex,
          r = e.symbol,
          i = e.sprite;
        return t.addEmoticon(n, r, i)
      })
    }

    function a(t) {
      return t && t.dispose(),
        null
    }

    function s() {
      return c.clamp(0 | +D.getItem("game-scale") || (c.getPixelRatio() > 1 ? 3 : 2), 1, 4)
    }

    var u = t(getCodeName("gl-matrix")),
      l = t(getCodeName("gl-fbo")),
      c = t("22"),
      f = t("21"),
      p = t("29"),
      h = t("2a"),
      d = t("5e"),
      v = t("24"),
      m = t("23"),
      g = t("5f"),
      y = t("60"),
      b = t("6b"),
      _ = t("6c"),
      w = t("6d"),
      x = t("27"),
      E = t("6e"),
      $ = t("69"),
      S = t("1f"),
      T = t("a2"),
      k = t("3b"),
      M = t("42"),
      A = t("20"),
      C = t("2c"),
      D = t("a4"),
      O = function() {
        function t() {
          this.fps = 0,
            this.map = new h.Map(0, 0),
            this.scale = s(),
            this.baseTime = 0,
            this.camera = new d.Camera,
            this.failedToCreateWebGL = !1,
            this.apply = function(t) {
              return t()
            },
            this.paletteManager = new x.PaletteManager,
            this.input = new T.InputManager,
            this.timeSize = 0,
            this.lastStats = 0,
            this.sent = 0,
            this.recv = 0,
            this.textJump = 0,
            this.hideText = !1,
            this.hover = {
              x: 0,
              y: 0
            },
            this.legacyRenderer = !1,
            this.viewMatrix = u.mat4.create(),
            this.initialized = !1
        }

        return t.prototype.changeScale = function() {
            this.scale = this.scale % 4 + 1,
              D.setItem("game-scale", this.scale.toString())
          },
          t.prototype.load = function() {
            return this.loadPromise || (this.loadPromise = k.loadSpriteSheets(S.spriteSheets, "/images/"))
          },
          t.prototype.init = function() {
            var t = this;
            this.initialized || (this.initialized = !0,
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
              A.debug && this.input.onReleased([84], function() {
                return t.legacyRenderer = !t.legacyRenderer
              }),
              this.resizeCanvas(),
              window.addEventListener("resize", function() {
                return t.resizeCanvas()
              }),
              this.gl || this.initWebGL())
          },
          t.prototype.initWebGL = function() {
            try {
              this.updateCamera();
              var t = this.gl = $.getWebGLContext(this.canvas),
                e = $.getRenderTargetSize(this.camera.w, this.camera.h);
              this.frameBuffer = l(t, [e, e], {
                  depth: !1
                }),
                this.spriteShader = $.createSpriteShader(t),
                this.spriteBatch = new y.SpriteBatch(t),
                this.paletteShader = $.createPaletteShader(t),
                this.paletteBatch = new b.PaletteSpriteBatch(t),
                E.createTexturesForSpriteSheets(t, S.spriteSheets),
                this.spriteBatch.rectSprite = S.pixel,
                this.button = new _.SpriteButton(S.bubble, 2, 2, 2, 2),
                this.font = new w.SpriteFont(S.font),
                o(this.font)
            } catch (t) {
              throw console.error(t),
                this.releaseWebGL(),
                t
            }
          },
          t.prototype.releaseWebGL = function() {
            this.gl = null,
              this.font = null,
              this.button = null,
              this.frameBuffer = a(this.frameBuffer),
              this.spriteShader = a(this.spriteShader),
              this.paletteShader = a(this.paletteShader),
              this.spriteBatch = a(this.spriteBatch),
              this.paletteBatch = a(this.paletteBatch),
              a(this.paletteManager),
              E.releaseTexturesForSpriteSheets(S.spriteSheets)
          },
          t.prototype.updateCamera = function() {
            this.camera.w = Math.ceil(this.canvas.width / this.scale),
              this.camera.h = Math.ceil(this.canvas.height / this.scale)
          },
          t.prototype.release = function() {
            this.selected = null,
              this.socket && (this.socket.disconnect(),
                this.socket = null),
              a(this.paletteManager)
          },
          t.prototype.startup = function(t, e) {
            this.selected = null,
              this.socket = t,
              this.apply = e
          },
          t.prototype.update = function(t) {
            if (this.socket && this.socket.isConnected) {
              var e = this.camera,
                n = this.player,
                r = this.map;
              if (i(this),
                this.input.update(),
                this.updateCamera(),
                n && r) {
                var o = this.input.axisX,
                  a = this.input.axisY,
                  s = c.length(o, a),
                  u = s < .5 || this.input.isPressed(16),
                  l = c.vectorToDir(o, a),
                  p = o || a ? c.dirToVector(l) : {
                    x: 0,
                    y: 0
                  },
                  h = o || a ? u ? 1 : 2 : 0,
                  d = c.flagsToSpeed(h),
                  v = p.x * d,
                  g = p.y * d;
                if (n.vx !== v || n.vy !== g) {
                  var y = c.encodeMovement(n.x, n.y, l, h),
                    b = y[0],
                    _ = y[1];
                  this.socket.server.update(b, _)
                }
                if (n.vx = v,
                  n.vy = g,
                  e.update(n, r),
                  this.input.getAction(1002)) {
                  var w = this.scale / c.getPixelRatio(),
                    x = e.screenToWorld({
                      x: this.input.getRange(1e3) / w,
                      y: this.input.getRange(1001) / w
                    }),
                    E = r.pickEntity(x, this.input.isPressed(16));
                  if (E)
                    "pony" === E.type ? this.select(E) : this.socket.server.interact(E.id);
                  else if (this.selected)
                    this.select(null);
                  else {
                    var $ = this.map.getTile(0 | x.x, 0 | x.y) === m.TileType.Grass ? m.TileType.Dirt : m.TileType.Grass;
                    this.socket.server.changeTile(0 | x.x, 0 | x.y, $)
                  }
                }
                r.update(t);
                var S = n.x * f.tileWidth,
                  T = n.y * f.tileHeight;
                r.forEachEntity(function(t) {
                  t.coverBounds && (t.coverLifted = c.containsPoint(t.x * f.tileWidth, t.y * f.tileHeight, t.coverBounds, S, T))
                })
              }
              var k = this.scale / c.getPixelRatio();
              this.hover = this.camera.screenToWorld({
                  x: this.input.getRange(1e3) / k,
                  y: this.input.getRange(1001) / k
                }),
                this.timeSize += t,
                this.textJump += 4 * t,
                this.timeSize > 1 && (this.sent = 8 * this.socket.sentSize / this.timeSize / 1024,
                  this.recv = 8 * this.socket.receivedSize / this.timeSize / 1024,
                  this.socket.sentSize = 0,
                  this.socket.receivedSize = 0,
                  this.timeSize = 0)
            }
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
          t.prototype.draw = function() {
            if (this.gl) {
              var t = this.gl,
                e = this.camera,
                n = e.w,
                r = e.h,
                i = Math.round(this.scale);
              if (this.initializeFrameBuffer(n, r),
                t.enable(t.SCISSOR_TEST),
                t.scissor(0, 0, n, r),
                t.viewport(0, 0, n, r),
                t.disable(t.DEPTH_TEST),
                t.enable(t.BLEND),
                t.blendEquation(t.FUNC_ADD),
                t.blendFunc(t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA),
                t.clearColor(v.BG_COLOR.floatR, v.BG_COLOR.floatG, v.BG_COLOR.floatB, 1),
                t.clear(t.COLOR_BUFFER_BIT),
                this.map) {
                var o = $.createViewMatrix(this.viewMatrix, e.w, e.h, 1, -e.x, -e.y),
                  a = g.getLight(this.getTime()),
                  s = a.toFloatArray();
                this.legacyRenderer ? (this.spriteBatch.begin(this.spriteShader),
                  this.spriteShader.uniforms.transform = o,
                  this.spriteShader.uniforms.lighting = s,
                  this.map.drawTiles(this.spriteBatch, e),
                  this.map.drawEntities(this.spriteBatch, e),
                  this.spriteBatch.end()) : (this.paletteManager.commit(this.gl),
                  this.paletteBatch.palette = this.paletteManager.texture,
                  this.spriteBatch.begin(this.spriteShader),
                  this.spriteShader.uniforms.transform = o,
                  this.spriteShader.uniforms.lighting = s,
                  this.map.drawTiles(this.spriteBatch, e),
                  this.spriteBatch.end(),
                  this.paletteBatch.begin(this.paletteShader),
                  this.paletteShader.uniforms.transform = o,
                  this.paletteShader.uniforms.lighting = s,
                  this.paletteShader.uniforms.pixelSize = this.paletteManager.pixelSize,
                  this.map.drawEntities2(this.paletteBatch, e),
                  this.paletteBatch.end())
              }
              this.spriteBatch.begin(this.spriteShader),
                this.spriteShader.uniforms.transform = $.createViewMatrix(this.viewMatrix, e.w, e.h, 1),
                this.spriteShader.uniforms.lighting = [1, 1, 1, 1],
                this.drawChatAndNames(),
                this.socket && this.socket.isConnected || this.drawMessage(this.spriteBatch, "Connecting..."),
                this.spriteBatch.end(),
                t.disable(t.SCISSOR_TEST),
                t.bindFramebuffer(t.FRAMEBUFFER, null),
                t.viewport(0, 0, this.canvas.width, this.canvas.height),
                this.spriteBatch.begin(this.spriteShader),
                this.spriteShader.uniforms.transform = $.createViewMatrix2(this.viewMatrix, this.canvas.width, this.canvas.height, i),
                this.spriteShader.uniforms.lighting = [1, 1, 1, 1],
                this.spriteBatch.drawImage(this.frameBuffer.color[0], null, 0, 0, n, r, 0, 0, n, r),
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
              n = c.getPixelRatio(),
              r = Math.round(t * n),
              i = Math.round(e * n);
            M.resizeCanvas(this.canvas, r, i)
          },
          t.prototype.initializeFrameBuffer = function(t, e) {
            var n = $.getRenderTargetSize(t, e);
            if (n !== this.frameBuffer.shape[0]) {
              var r = this.gl.getParameter(this.gl.MAX_RENDERBUFFER_SIZE);
              if (n > r)
                return void this.scale++;
              this.frameBuffer.shape = [n, n]
            }
            this.frameBuffer.bind()
          },
          t.prototype.drawChatAndNames = function() {
            var t = this;
            this.hideText || this.map.forEachEntity(function(e) {
              var n = e.interactBounds || e.bounds;
              if (e !== t.player && e.name && n && c.contains(e.x, e.y, n, t.hover)) {
                var r = t.camera.worldToScreen(e);
                t.drawNamePlate(t.spriteBatch, e.name, r.x, r.y + n.y - 12)
              }
              if (e.says) {
                var r = t.camera.worldToScreen(e);
                t.drawSpeechBaloon(t.spriteBatch, e.says, r.x, r.y + n.y - 18)
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
                  return t instanceof p.Pony
                }) : 0,
                s = this.legacyRenderer ? "legacy" : "",
                u = A.debug ? "(" + i + "/" + o + ") " + e + " tris" : "";
              this.stats.textContent = s + " " + this.fps.toFixed(0) + " fps " + n + "/" + r + " kb/s " + a + " ponies " + u,
                this.lastStats = t,
                this.clock.textContent = g.formatHourMinutes(this.getTime())
            }
            this.spriteBatch.tris = 0,
              this.paletteBatch.tris = 0
          },
          t.prototype.drawMessage = function(t, e) {
            var n = 100,
              r = Math.round((this.camera.h - n) / 2);
            t.drawRect(v.GRAY, 0, r, this.camera.w, n),
              this.font.drawTextAligned(t, e, v.WHITE, {
                x: 0,
                y: r,
                w: this.camera.w,
                h: n
              }, "center", "middle")
          },
          t.prototype.drawNamePlate = function(t, e, n, r) {
            var i = this.font.measureText(e),
              o = n - Math.round(i.w / 2),
              a = r - i.h + 8;
            this.font.drawText(t, e, v.BLACK, o, a)
          },
          t.prototype.drawSpeechBaloon = function(t, e, n, i) {
            var o = e.message,
              a = e.type,
              s = e.timer,
              u = this.font.measureText(o);
            if (c.intersect(0, 0, this.camera.w, this.camera.h, n - u.w / 2, i - u.h / 2, u.w, u.h)) {
              var l = .2,
                p = (f.SAYS_TIME - s) / l,
                h = s / l,
                d = [3, 2, 1, 0, -1, 0],
                m = [-4, -3, -2, -1],
                g = p * d.length,
                y = h * m.length,
                b = c.clamp(Math.round(g), 0, d.length - 1),
                _ = c.clamp(Math.round(y), 0, m.length);
              i += _ < m.length ? m[_] : d[b];
              var w = Math.min(p, h, 1),
                x = 4,
                E = n - Math.round(u.w / 2),
                $ = i - u.h;
              t.globalAlpha = .6 * w,
                this.button.draw(t, v.BLACK, E - x, $ - x, u.w + 2 * x, u.h + 2 * x),
                t.drawSprite(S.nipple, v.BLACK, n - Math.round(S.nipple.w / 2), i + x),
                t.globalAlpha = w,
                this.font.drawText(t, o, r(a), E, $),
                t.globalAlpha = 1
            }
          },
          t
      }();
    return Object.defineProperty(e, "__esModule", {
        value: !0
      }),
      e.default = O,
      n.exports
  });
  System.registerDynamic("2b", ["a3"], !0, function(t, e, n) {
    "use strict";
    var r, i = t("a3"),
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
  System.registerDynamic("a5", [], !0, function(t, e, n) {
    return n.exports = '<script type="text/ng-template" id="pony-box-note-popover.html"><textarea cols="20" rows="6" ag-auto-focus ng-model="vm.pony.note" ng-keydown="vm.keydown($event)" ng-blur="vm.blur()" class="form-control pony-box-note-editor"></textarea></script><div class="pony-box"><div class="pony-box-rect"><div class="pony-box-name">{{vm.name}}</div><div class="pony-box-buttons"><div class="btn-group"><button uib-tooltip="{{vm.pony.ignored ? \'Unignore player\' : \'Ignore player\'}}" ng-click="vm.toggleIgnore()" ng-class="{ \'btn-danger\': vm.pony.ignored }" class="btn btn-xs btn-default"><i class="fa fa-ban"></i></button></div> <a ng-if="vm.site" ng-href="{{vm.site.url}}" target="_blank" class="pony-box-site"><i ng-class="vm.site.icon" ng-style="{ color: vm.site.color }" class="fa fa-fw fa-lg"></i><b> {{vm.site.name}}</b></a></div><div ng-if="vm.isMod" class="btn-group pony-box-buttons-mod"><button ng-click="vm.report()" uib-tooltip="Report" class="btn btn-xs btn-default"><i class="fa fa-flag"></i></button><button uib-tooltip="{{vm.isNoteOpen ? null : vm.pony.note}}" tooltip-placement="bottom" tooltip-class="tooltip-pre" uib-popover-template="\'pony-box-note-popover.html\'" popover-placement="bottom" popover-is-open="vm.isNoteOpen" ng-class="{ \'btn-danger\': !!vm.pony.note }" class="btn btn-xs btn-default"><i class="fa fa-sticky-note"></i></button><div uib-dropdown ng-if="vm.isMod" uib-tooltip="{{vm.timeoutTooltip}}" class="btn-group dropdown"><button uib-dropdown-toggle ng-class="{ \'btn-danger\': vm.hasTimeout }" class="btn btn-xs btn-default"><i class="fa fa-clock-o"></i></button><ul uib-dropdown-menu class="dropdown-menu pull-right"><li ng-repeat="t in vm.timeouts"><a ng-click="vm.timeout(t.value)">{{t.label}}</a></li></ul></div><button ng-click="vm.toggleMute()" uib-tooltip="{{vm.pony.muted ? \'Unmute\' : \'Mute\'}}" ng-class="{ \'btn-danger\': vm.pony.muted }" class="btn btn-xs btn-default"><i class="fa fa-microphone-slash"></i></button><button ng-click="vm.toggleShadow()" uib-tooltip="{{vm.pony.shadow ? \'Unshadow\' : \'Shadow\'}}" ng-class="{ \'btn-danger\': vm.pony.shadow }" class="btn btn-xs btn-default"><i class="fa fa-eye-slash"></i></button></div></div><div class="pony-box-avatar"><canvas width="100" height="100"></canvas><div class="pony-box-avatar-cover"></div></div></div>',
      n.exports
  });
  System.registerDynamic("a6", ["52", "21", "53", "22", "54", "2b", "2c", "a5"], !0, function(t, e, n) {
    "use strict";
    var r = t("52"),
      i = t("21"),
      o = t("53"),
      a = t("22"),
      s = t("54"),
      u = t("2b"),
      l = t("2c"),
      c = u.default.game,
      f = 3,
      p = function() {
        function t(t, e) {
          this.$element = t,
            this.model = e,
            this.timeouts = i.TIMEOUTS,
            this.canvas = t.find("canvas")[0]
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
              this.name = l.emotes.reduce(function(t, e) {
                  return t.replace(e.regex, e.symbol)
                }, this.pony.name),
                this.site = this.pony.site ? l.toSocialSiteInfo(this.pony.site) : null;
              var e = this.canvas.getContext("2d");
              e.save(),
                e.fillStyle = "#444",
                e.fillRect(0, 0, this.canvas.width, this.canvas.height),
                this.pony && (e.translate(9 * f, 54 * f),
                  e.scale(-f, f),
                  a.disableImageSmoothing(e),
                  this.pony.drawHead(e)),
                e.restore()
            }
          },
          t.prototype.report = function() {
            this.isMod && this.modAction(o.ModAction.Report)
          },
          t.prototype.timeout = function(t) {
            this.isMod && (this.modAction(o.ModAction.Timeout, t),
              this.pony.timeout = a.fromNow(t).toISOString())
          },
          t.prototype.toggleIgnore = function() {
            this.playerAction(this.pony.ignored ? o.PlayerAction.Unignore : o.PlayerAction.Ignore),
              this.pony.ignored = !this.pony.ignored
          },
          t.prototype.toggleMute = function() {
            this.isMod && (this.modAction(this.pony.muted ? o.ModAction.Unmute : o.ModAction.Mute),
              this.pony.muted = !this.pony.muted)
          },
          t.prototype.toggleShadow = function() {
            this.isMod && (this.modAction(this.pony.shadow ? o.ModAction.Unshadow : o.ModAction.Shadow),
              this.pony.shadow = !this.pony.shadow)
          },
          t.prototype.blur = function() {
            this.isMod && (c.socket.server.setNote(this.pony.id, this.pony.note),
              this.isNoteOpen = !1)
          },
          t.prototype.keydown = function(t) {
            27 === t.keyCode && this.blur()
          },
          t.prototype.playerAction = function(t, e) {
            void 0 === e && (e = 0),
              c.socket.server.playerAction(this.pony.id, t)
          },
          t.prototype.modAction = function(t, e) {
            void 0 === e && (e = 0),
              c.socket.server.modAction(this.pony.id, t, e)
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
        controller: p,
        controllerAs: "vm",
        template: t("a5")
      },
      n.exports
  });
  System.registerDynamic("a7", [getCodeName("BlueBird"), "52", "2d", "30", "32", "34", "36", "38", "3a", "3d", "3f", "40", "41", "46", "48", "4a", "4c", "4e", "50", "a6"], !0, function(t, e, n) {
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
        t.component("colorPicker", l.default),
        t.component("checkBox", c.default),
        t.component("fillOutline", f.default),
        t.component("spriteBox", p.default),
        t.component("spriteSelection", h.default),
        t.component("spriteSetSelection", d.default),
        t.component("bitmapBox", v.default),
        t.component("characterPreview", m.default),
        t.component("chatBox", g.default),
        t.component("settingsBox", y.default),
        t.component("accountButton", b.default),
        t.component("menuBar", _.menuBar),
        t.component("menuItem", _.menuItem),
        t.component("signInBox", w.default),
        t.component("playBox", x.default),
        t.component("ponyBox", E.default)
    }

    var i = t(getCodeName("BlueBird")),
      o = t("52"),
      a = t("2d"),
      s = t("30"),
      u = t("32"),
      l = t("34"),
      c = t("36"),
      f = t("38"),
      p = t("3a"),
      h = t("3d"),
      d = t("3f"),
      v = t("40"),
      m = t("41"),
      g = t("46"),
      y = t("48"),
      b = t("4a"),
      _ = t("4c"),
      w = t("4e"),
      x = t("50"),
      E = t("a6");
    return e.init = r,
      n.exports
  });
  System.registerDynamic("a8", [], !0, function(t, e, n) {
    return n.exports = '<div ng-init="vm.init()" class="app"><div ng-style="{ display: vm.playing ? \'block\' : \'none\' }" class="app-game"><canvas id="canvas"></canvas><span id="stats"></span><settings-box></settings-box><chat-box></chat-box><pony-box id="pony-box" pony="vm.selected" ng-if="vm.selected"></pony-box><div id="touch-origin"></div><div id="touch-position"></div></div><div ng-if="!vm.playing" class="app-cover fadeview"><div class="container"><menu-bar logo="true" model="vm.model"><menu-item href="/" name="Home"></menu-item><menu-item href="/about" name="About"></menu-item><menu-item href="/character" name="Characters" ng-if="vm.model.account"></menu-item></menu-bar><div><div ng-view class="app-view"></div></div><footer class="app-footer clearfix"><div class="pull-left text-muted text-nowrap">version <b>0.15.1-alpha</b></div><div class="pull-right text-muted text-nowrap">&copy; 2016 <a href="https://twitter.com/Agamnentzar" class="text-muted">Agamnentzar</a> | <a href="http://agamnentzar.deviantart.com/" title="DeviantArt" class="text-muted"><i class="fa fa-fw fa-deviantart"></i></a><a href="http://agamnentzar.tumblr.com/" title="Tumblr" class="text-muted"><i class="fa fa-fw fa-tumblr"></i></a><a href="https://twitter.com/Agamnentzar" title="Twitter" class="text-muted"><i class="fa fa-fw fa-twitter"></i></a><a href="https://github.com/Agamnentzar" title="Github" class="text-muted"><i class="fa fa-fw fa-github"></i></a> <a href="mailto:agamnentzar&#64;gmail.com" target="_blank" title="Email" class="text-muted"><i class="fa fa-fw fa-envelope"></i></a></div></footer></div></div></div>',
      n.exports
  });
  System.registerDynamic("44", ["1f", "3b"], !0, function(t, e, n) {
    "use strict";

    function r() {
      return i || (i = a.loadSpriteSheets(o.spriteSheets, "/images/"))
    }

    var i, o = t("1f"),
      a = t("3b");
    return e.loadSpriteSheets = r,
      n.exports
  });
  System.registerDynamic("a4", [], !0, function(t, e, n) {
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
          this.data[t] = e
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
  System.registerDynamic("a9", [getCodeName("Lodash"), "21", "22", "43", "31", "1f", "44", "5c", "20", "a4"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      return t && t.fills && t.fills[0]
    }

    var i = t(getCodeName("Lodash")),
      o = t("21"),
      a = t("22"),
      s = t("43"),
      u = t("31"),
      l = t("1f"),
      c = t("44"),
      f = t("5c"),
      p = t("20"),
      h = t("a4"),
      d = l.ponyNoses[0],
      v = function() {
        function t(t, e, n, r, i) {
          var u = this;
          this.$http = e,
            this.$location = n,
            this.gameService = r,
            this.model = i,
            this.maxNameLength = o.PLAYER_NAME_MAX_LENGTH,
            this.state = s.createDefaultPonyState(),
            this.saved = [],
            this.brushType = "brush",
            this.brush = "orange",
            this.horns = l.ponyHorns,
            this.manes = l.ponyManes,
            this.backManes = l.ponyBackManes,
            this.tails = l.ponyTails,
            this.facialHair = l.ponyFacialHair,
            this.wings = l.ponyWings,
            this.headAccessories = l.ponyHeadAccessories,
            this.earAccessories = l.ponyEarAccessories,
            this.faceAccessories = l.ponyFaceAccessories,
            this.neckAccessories = l.ponyNeckAccessories,
            this.frontLegAccessories = l.ponyFrontLegAccessoriesStand[0],
            this.backLegAccessories = l.ponyBackLegAccessoriesStand[0],
            this.frontHooves = [null, [
              [l.ponyFetlocksFrontStand[0]]
            ]],
            this.backHooves = [null, [
              [l.ponyFetlocksBackStand[0]]
            ]],
            this.animations = f.animations,
            this.activeAnimation = 0,
            this.muzzles = l.ponyNoses.map(function(t) {
              return {
                fill: null,
                outline: t.muzzle,
                extra: t.mouth
              }
            }),
            this.freckles = l.ponyFreckles.map(function(t) {
              return t ? {
                fill: t,
                outline: d.muzzle
              } : null
            }),
            this.fangs = [null, {
              fill: null,
              outline: d.muzzle,
              extra: d.fangs
            }],
            this.loaded = !1,
            this.playAnimation = !0,
            this.cmSize = o.CM_SIZE,
            this.deleting = !1,
            this.nextBlink = 0,
            this.blinkFrames = s.BLINK_FRAMES,
            this.blinkFrame = -1,
            this.handleError = a.errorHandler(this),
            this.destroyed = !1,
            t.$on("$destroy", function() {
              return u.destroy()
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
              return 0 | parseInt(h.getItem("character-active-tab"), 10)
            },
            set: function(t) {
              h.setItem("character-active-tab", t)
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "activeAccessoryTab", {
            get: function() {
              return 0 | parseInt(h.getItem("character-active-accessory-tab"), 10)
            },
            set: function(t) {
              h.setItem("character-active-accessory-tab", t)
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
              return p.debug
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
          t.prototype.init = function() {
            var t = this;
            if (this.model.accountPromise.then(function(e) {
                e || t.$location.url("/")
              }),
              p.debug) {
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
            return c.loadSpriteSheets().then(function() {
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
            this.deleting = !1,
              this.pony = u.createDefaultPony()
          },
          t.prototype.select = function(t) {
            t && (this.deleting = !1,
              this.pony = t)
          },
          Object.defineProperty(t.prototype, "canSave", {
            get: function() {
              return !this.model.saving && !!this.pony && !!this.pony.name
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.save = function() {
            return this.error = null,
              this.deleting = !1,
              this.model.savePony(this.pony).catch(this.handleError)
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
            this.select(a.findById(this.ponies, this.pony.id))
          },
          Object.defineProperty(t.prototype, "canDelete", {
            get: function() {
              return !!this.pony.id
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.delete = function() {
            return this.error = null,
              this.deleting = !1,
              this.model.removePony(this.pony).catch(this.handleError)
          },
          Object.defineProperty(t.prototype, "canDuplicate", {
            get: function() {
              return this.canNew
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.duplicate = function() {
            this.deleting = !1,
              this.pony = i.cloneDeep(this.pony),
              this.pony.name = "",
              delete this.pony.id
          },
          t.prototype.export = function() {
            var t = 80,
              e = 80,
              n = this.animations.reduce(function(t, e) {
                return t + e.frames
              }, 0),
              r = a.createCanvas(t * n, e),
              i = r.getContext("2d"),
              o = u.toRenderInfo(this.pony),
              l = 0;
            this.animations.forEach(function(n) {
                for (var r = 0; r < n.frames; r++,
                  l++) {
                  var a = {
                    animation: n,
                    animationFrame: r,
                    blinkFrame: 1
                  };
                  s.drawPony2D(i, o, a, l * t + t / 2, e - 10)
                }
              }),
              window.open(r.toDataURL())
          },
          t.$inject = ["$scope", "$http", "$location", "gameService", "model"],
          t
      }();
    return Object.defineProperty(e, "__esModule", {
        value: !0
      }),
      e.default = v,
      n.exports
  });
  System.registerDynamic("2c", [getCodeName("Lodash"), "1f", "20"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      return t.replace(c, function(t) {
        return a.repeat("*", t.length)
      })
    }

    function i(t) {
      return /[\u0400-\u04FF]/.test(t)
    }

    function o(t) {
      var e = t.id,
        n = t.name,
        r = t.url,
        i = t.provider,
        o = u.oauthProviders.find(function(t) {
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

    var a = t(getCodeName("Lodash")),
      s = t("1f"),
      u = t("20");
    e.emotes = [{
      regex: /:apple:/g,
      symbol: "🍎",
      sprite: s.apple.color
    }, {
      regex: /:heart:/g,
      symbol: "❤",
      sprite: s.heartemote
    }, {
      regex: /:pumpkin:/g,
      symbol: "🎃",
      sprite: s.pumpkinemote
    }, {
      regex: /:pizza:/g,
      symbol: "🍕",
      sprite: s.pizzaemote
    }, {
      regex: /:rock:/g,
      symbol: "⽯",
      sprite: s.rockemote
    }, {
      regex: /:face:/g,
      symbol: "ツ",
      sprite: null
    }, {
      regex: /:derp:/g,
      symbol: "シ",
      sprite: null
    }];
    var l = ["all?ahu?", "aids", "akbar", "alt ?[+-] ?f4", "anal", "anus", "(bitch)?ass(fuck|hole|hat|licker|wipe)?", "autis(ts?|ms?|tic)", "bitch(e?s)?", "(blow|hoof|foot|hand|rim) ?jobs?", "boners?", "boob(s|ie|ies)?", "buttplugs?", "can[cs]er(s|ous)?", "(horse|mare)?cocks?", "clit(oris)?", "(ctrl|control) ?[+-]? ?w", "cum(s|ming)?", "cumdump(sters?)?", "cunts?", "deepthroat(ing)?", "(horse)?dicks?", "dildos?", "fap(p?ing)?", "foalcon", "(brony|furry?|gay|horse|pony|nigg?er)?fag(s|g?[oi]t(s|ry)?)?", "(brony|furry?|gay|horse|pony|nigg?er|butt|mother)?fu(c|k|cc|ck)(ed|er|ing?|able|face)?", "gang ?bang(ed|ing)?", "hitlers?", "(in|self)cest", "jizz(ed|ing)?", "lubed?", "masturbat(e|tion|ing)?", "milfs?", "molest(ation|ing|ed|ia)?", "nazi(s|sm|sts?)?", "negros?", "nigg?as?", "nigg?[e3](rs?|st)?", "norm(y|ies?)", "orgasms?", "org(y|ies)", "piss(ing)?", "penis(es)?", "porno?", "prostitutes?", "(octo|horse|pony)?puss(y|ies)?(juice)?", "raep", "rap(e|ed|es|ing)", "retards?", "sieg ?h[ea]il", "semen", "(anal|butt)?(sex|secks|secs|seks)", "(bull)?shit(s|ting)?", "slut(s|ty)?", "spunk", "(cock)?suck(ing|er)?", "tit(s|ty|ties?)?", "tranny", "wank(ing|ers?)?", "whores?", "vaginas?", "vulva"],
      c = new RegExp("\\b(" + l.join("|") + ")\\b", "gi");
    return e.filterBadWords = r,
      e.containsCyrillic = i,
      e.toSocialSiteInfo = o,
      n.exports
  });
  System.registerDynamic("aa", [getCodeName("Lodash"), "21", "2c", "22"], !0, function(t, e, n) {
    "use strict";
    var r = t(getCodeName("Lodash")),
      i = t("21"),
      o = t("2c"),
      a = t("22"),
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
  System.registerDynamic("b2", [], !0, function(t, e, n) {
    function r() {
      throw new Error("setTimeout has not been defined")
    }

    function i() {
      throw new Error("clearTimeout has not been defined")
    }

    function o(t) {
      if (f === setTimeout)
        return setTimeout(t, 0);
      if ((f === r || !f) && setTimeout)
        return f = setTimeout,
          setTimeout(t, 0);
      try {
        return f(t, 0)
      } catch (e) {
        try {
          return f.call(null, t, 0)
        } catch (e) {
          return f.call(this, t, 0)
        }
      }
    }

    function a(t) {
      if (p === clearTimeout)
        return clearTimeout(t);
      if ((p === i || !p) && clearTimeout)
        return p = clearTimeout,
          clearTimeout(t);
      try {
        return p(t)
      } catch (e) {
        try {
          return p.call(null, t)
        } catch (e) {
          return p.call(this, t)
        }
      }
    }

    function s() {
      m && d && (m = !1,
        d.length ? v = d.concat(v) : g = -1,
        v.length && u())
    }

    function u() {
      if (!m) {
        var t = o(s);
        m = !0;
        for (var e = v.length; e;) {
          for (d = v,
            v = []; ++g < e;)
            d && d[g].run();
          g = -1,
            e = v.length
        }
        d = null,
          m = !1,
          a(t)
      }
    }

    function l(t, e) {
      this.fun = t,
        this.array = e
    }

    function c() {}

    var f, p, h = n.exports = {};
    ! function() {
      try {
        f = "function" == typeof setTimeout ? setTimeout : r
      } catch (t) {
        f = r
      }
      try {
        p = "function" == typeof clearTimeout ? clearTimeout : i
      } catch (t) {
        p = i
      }
    }();
    var d, v = [],
      m = !1,
      g = -1;
    return h.nextTick = function(t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var n = 1; n < arguments.length; n++)
            e[n - 1] = arguments[n];
        v.push(new l(t, e)),
          1 !== v.length || m || o(u)
      },
      l.prototype.run = function() {
        this.fun.apply(null, this.array)
      },
      h.title = "browser",
      h.browser = !0,
      h.env = {},
      h.argv = [],
      h.version = "",
      h.versions = {},
      h.on = c,
      h.addListener = c,
      h.once = c,
      h.off = c,
      h.removeListener = c,
      h.removeAllListeners = c,
      h.emit = c,
      h.binding = function(t) {
        throw new Error("process.binding is not supported")
      },
      h.cwd = function() {
        return "/"
      },
      h.chdir = function(t) {
        throw new Error("process.chdir is not supported")
      },
      h.umask = function() {
        return 0
      },
      n.exports
  });
  System.registerDynamic("b3", ["b2"], !0, function(t, e, n) {
    return n.exports = t("b2"),
      n.exports
  });
  System.registerDynamic("b4", ["b3"], !0, function(e, n, r) {
    return r.exports = System._nodeRequire ? process : e("b3"),
      r.exports
  });
  System.registerDynamic("72", ["b4"], !0, function(t, e, n) {
    return n.exports = t("b4"),
      n.exports
  });
  System.registerDynamic("27", [getCodeName("Lodash"), getCodeName("gl-texture2d"), "22", "35"], !0, function(t, e, n) {
    "use strict";

    function r(t, e) {
      return t.colors.length === e.colors.length && o.isEqual(t.colors, e.colors)
    }

    function i(t) {
      t && t.refs && t.refs--
    }

    var o = t(getCodeName("Lodash")),
      a = t(getCodeName("gl-texture2d")),
      s = t("22"),
      u = t("35"),
      l = 128,
      c = 1024;
    e.releasePalette = i;
    var f = function() {
      function t(t) {
        void 0 === t && (t = l),
          this.size = t,
          this.palettes = [],
          this.dirty = [],
          this.dirtyMinY = 0,
          this.dirtyMaxY = -1,
          this.lastX = 0,
          this.lastY = 0
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
        t.prototype.addInts = function(t) {
          var e = {
              x: 0,
              y: 0,
              u: 0,
              v: 0,
              refs: 1,
              colors: t
            },
            n = o.find(this.palettes, function(t) {
              return r(t, e)
            });
          return n ? (n.refs++,
            n) : (this.palettes.push(e),
            this.dirty.push(e),
            e)
        },
        t.prototype.add = function(t, e) {
          return void 0 === e && (e = !0),
            this.addInts(t.map(function(t) {
              return u.default.parse(t).toInt()
            }))
        },
        t.prototype.commit = function(t) {
          if (this.texture || this.initializeTexture(t, this.size),
            this.dirty.length) {
            if (!this.arrange(this.dirty))
              for (this.cleanupPalettes(); !this.arrange(this.dirty);) {
                if (!(this.size < c))
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
            this.size = l,
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
          this.texture && this.texture.dispose(),
            this.texture = a(t, [e, e]),
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
              s.u = n / e,
              s.v = r / e,
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
            for (var t = s.getTempCanvas().getContext("2d").createImageData(this.size, this.dirtyMaxY - this.dirtyMinY + 1), e = this.palettes, n = 0; n < e.length; n++) {
              var r = e[n],
                i = r.x,
                o = r.y,
                a = r.colors;
              if (!(o < this.dirtyMinY || o > this.dirtyMaxY))
                for (var u = 4 * (i + (o - this.dirtyMinY) * t.width), l = 0; l < a.length; l++) {
                  var c = a[l];
                  t.data[u++] = c >> 24 & 255,
                    t.data[u++] = c >> 16 & 255,
                    t.data[u++] = c >> 8 & 255,
                    t.data[u++] = c >> 0 & 255
                }
            }
            this.texture.setPixels(t, 0, this.dirtyMinY),
              this.dirtyMinY = 0,
              this.dirtyMaxY = -1
          }
        },
        t
    }();
    return e.PaletteManager = f,
      n.exports
  });
  System.registerDynamic("39", ["35"], !0, function(t, e, n) {
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

    var a = t("35");
    return e.fillToOutline = r,
      e.colorToFar = i,
      e.darkenColor = o,
      n.exports
  });
  System.registerDynamic("31", [getCodeName("Lodash"), "1f", "27", "22", "39", "21", "35"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      return R.mergeWith({}, a(), R.cloneDeep(t), function(t, e) {
        if (null == e)
          return t
      })
    }

    function i(t, e, n) {
      void 0 === e && (e = !0),
        void 0 === n && (n = "gold");
      var r = [n, "dodgerblue", "limegreen", "orchid", "crimson", "aquamarine"],
        i = r.map(N.fillToOutline);
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
      return R.range(0, L.CM_SIZE * L.CM_SIZE).map(function() {
        return ""
      })
    }

    function a() {
      return {
        id: null,
        name: "",
        site: null,
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
        cm: o(),
        cmFlip: !1,
        customOutlines: !1
      }
    }

    function s(t) {
      return U.default.parseWithAlpha(t, 1)
    }

    function u(t) {
      return s(N.colorToFar(t))
    }

    function l(t) {
      return u(t && t[0] ? t[0] : "black")
    }

    function c(t) {
      return U.default.parse(t)
    }

    function f(t) {
      return t ? t.map(s) : null
    }

    function p(t) {
      return t ? {
        type: t.type,
        pattern: t.pattern,
        fills: f(t.fills),
        outlines: f(t.outlines),
        lockFills: t.lockFills,
        lockOutlines: t.lockOutlines
      } : null
    }

    function h(t) {
      return t ? {
        type: t.type,
        pattern: t.pattern,
        fills: t.fills && t.fills.map(u),
        outlines: t.outlines && t.outlines.map(u),
        lockFills: t.lockFills,
        lockOutlines: t.lockOutlines
      } : null
    }

    function d(t) {
      return {
        name: t.name,
        site: t.site,
        horn: p(t.horn),
        wings: p(t.wings),
        frontHooves: p(t.frontHooves),
        backHooves: p(t.backHooves),
        mane: p(t.mane),
        backMane: p(t.backMane),
        tail: p(t.tail),
        facialHair: p(t.facialHair),
        headAccessory: p(t.headAccessory),
        earAccessory: p(t.earAccessory),
        faceAccessory: p(t.faceAccessory),
        neckAccessory: p(t.neckAccessory),
        frontLegAccessory: p(t.frontLegAccessory),
        backLegAccessory: p(t.backLegAccessory),
        coatFill: s(t.coatFill),
        coatOutline: s(t.coatOutline),
        lockCoatOutline: t.lockCoatOutline,
        darkCoatFill: u(t.coatFill),
        darkCoatOutline: u(t.coatOutline),
        eyelashes: t.eyelashes,
        eyeColorLeft: s(t.eyeColorLeft),
        eyeColorRight: s(t.eyeColorRight),
        eyeWhites: s(t.eyeWhites),
        eyeOpennessLeft: t.eyeOpennessLeft,
        eyeOpennessRight: t.eyeOpennessRight,
        eyeshadow: t.eyeshadow,
        eyeshadowColor: s(t.eyeshadowColor),
        lockEyes: t.lockEyes,
        lockEyeColor: t.lockEyeColor,
        fangs: t.fangs,
        muzzle: t.muzzle,
        freckles: t.freckles,
        frecklesColor: s(t.frecklesColor),
        cm: t.cm && t.cm.map(c),
        cmFlip: t.cmFlip,
        darkFrontHoovesFill: l(t.frontHooves && t.frontHooves.fills),
        darkFrontHoovesOutline: l(t.frontHooves && t.frontHooves.outlines),
        darkBackHoovesFill: l(t.backHooves && t.backHooves.fills),
        darkBackHoovesOutline: l(t.backHooves && t.backHooves.outlines),
        darkBackLegAccessory: h(t.backLegAccessory),
        darkFrontLegAccessory: h(t.frontLegAccessory),
        customOutlines: t.customOutlines
      }
    }

    function v(t) {
      return t.map(function(t) {
        return t ? t.map(function(t) {
          return t.length
        }) : [0]
      })
    }

    function m(t) {
      return t ? U.default.parse(t).toHexRGB() : ""
    }

    function g(t) {
      return Object.keys(t).forEach(function(e) {
          null == t[e] && delete t[e]
        }),
        t
    }

    function y(t) {
      return t ? 1 : 0
    }

    function b(t) {
      return !!+t
    }

    function _(t, e) {
      return t.slice(0, e).map(y).join(" ")
    }

    function w(t) {
      return t && t.split ? t.split(" ").map(b) : null
    }

    function x(t, e) {
      return t.slice(0, e).map(m).join(" ")
    }

    function E(t) {
      return t && t.split ? t.split(" ") : null
    }

    function $(t, e, n) {
      if (void 0 === n && (n = !0), !t || n && 0 === t.type)
        return null;
      var r = e ? v(e) : null,
        i = r ? j.at(j.at(r, t.type), t.pattern) : 6;
      return [t.type, t.pattern, x(t.fills, i), x(t.outlines, i), _(t.lockFills, i), _(t.lockOutlines, i)]
    }

    function S(t) {
      return t ? {
        type: t[0],
        pattern: t[1],
        fills: E(t[2]),
        outlines: E(t[3]),
        lockFills: w(t[4]),
        lockOutlines: w(t[5])
      } : null
    }

    function T(t) {
      var e = {
        name: t.name,
        site: t.site,
        h: $(t.horn, F.ponyHorns),
        w: $(t.wings, F.ponyWings),
        fh: $(t.frontHooves, null),
        bh: $(t.backHooves, null),
        m: $(t.mane, F.ponyManes, !1),
        bm: $(t.backMane, F.ponyBackManes, !1),
        t: $(t.tail, F.ponyTails, !1),
        fac: $(t.facialHair, F.ponyFacialHair),
        ha: $(t.headAccessory, F.ponyHeadAccessories),
        ea: $(t.earAccessory, F.ponyEarAccessories),
        fa: $(t.faceAccessory, F.ponyFaceAccessories),
        na: $(t.neckAccessory, F.ponyNeckAccessories),
        fla: $(t.frontLegAccessory, F.ponyFrontLegAccessoriesStand[0]),
        bla: $(t.backLegAccessory, F.ponyBackLegAccessoriesStand[0]),
        cf: m(t.coatFill),
        co: m(t.coatOutline),
        lco: y(t.lockCoatOutline),
        el: t.eyelashes,
        ecl: m(t.eyeColorLeft),
        ecr: m(t.eyeColorRight),
        ew: m(t.eyeWhites),
        eol: t.eyeOpennessLeft,
        eor: t.eyeOpennessRight,
        es: y(t.eyeshadow),
        esc: m(t.eyeshadowColor),
        le: y(t.lockEyes),
        lec: y(t.lockEyeColor),
        fan: t.fangs,
        mu: t.muzzle,
        fr: t.freckles,
        frc: t.freckles ? m(t.frecklesColor) : null,
        cm: t.cm && t.cm.some(function(t) {
          return !!t
        }) ? R.dropRightWhile(t.cm.map(m), function(t) {
          return !t
        }) : null,
        cmf: y(t.cmFlip),
        col: y(t.customOutlines)
      };
      return g(e)
    }

    function k(t) {
      var e = {
        id: t.id,
        name: t.name,
        site: t.site,
        lastUsed: t.lastUsed,
        horn: S(t.h),
        wings: S(t.w),
        frontHooves: S(t.fh),
        backHooves: S(t.bh),
        mane: S(t.m),
        backMane: S(t.bm),
        tail: S(t.t),
        facialHair: S(t.fac),
        headAccessory: S(t.ha),
        earAccessory: S(t.ea),
        faceAccessory: S(t.fa),
        neckAccessory: S(t.na),
        frontLegAccessory: S(t.fla),
        backLegAccessory: S(t.bla),
        coatFill: t.cf,
        coatOutline: t.co,
        lockCoatOutline: b(t.lco),
        eyelashes: t.el,
        eyeColorLeft: t.ecl,
        eyeColorRight: t.ecr,
        eyeWhites: t.ew,
        eyeOpennessLeft: t.eol,
        eyeOpennessRight: t.eor,
        eyeshadow: b(t.es),
        eyeshadowColor: t.esc,
        lockEyes: b(t.le),
        lockEyeColor: b(t.lec),
        fangs: t.fan,
        muzzle: t.mu,
        freckles: t.fr,
        frecklesColor: t.frc,
        cm: t.cm,
        cmFlip: b(t.cmf),
        customOutlines: b(t.col)
      };
      return r(e)
    }

    function M(t, e) {
      for (var n = t || [], r = e || [], i = Math.max(n.length, r.length), o = [], a = 0; a < i; a++)
        o.push(n[a] || "#000"),
        o.push(r[a] || "#000");
      return o
    }

    function A(t) {
      return M(t.fills, t.outlines)
    }

    function C(t) {
      return [0].concat(t.map(function(t) {
        return U.default.parseWithAlpha(t, 1).toInt()
      }))
    }

    function D(t, e) {
      return t ? {
        type: t.type,
        pattern: t.pattern,
        palette: e.addInts(C(A(t)))
      } : null
    }

    function O(t, e) {
      return {
        name: t.name,
        site: t.site,
        horn: D(t.horn, e),
        wings: D(t.wings, e),
        frontHooves: D(t.frontHooves, e),
        backHooves: D(t.backHooves, e),
        mane: D(t.mane, e),
        backMane: D(t.backMane, e),
        tail: D(t.tail, e),
        facialHair: D(t.facialHair, e),
        headAccessory: D(t.headAccessory, e),
        earAccessory: D(t.earAccessory, e),
        faceAccessory: D(t.faceAccessory, e),
        neckAccessory: D(t.neckAccessory, e),
        frontLegAccessory: D(t.frontLegAccessory, e),
        backLegAccessory: D(t.backLegAccessory, e),
        coatPalette: e.addInts(C([t.coatFill, t.coatOutline])),
        coatFill: null,
        coatOutline: null,
        lockCoatOutline: t.lockCoatOutline,
        eyelashes: t.eyelashes,
        eyeColorLeft: e.addInts(C([t.eyeWhites, "black", t.eyeColorLeft])),
        eyeColorRight: e.addInts(C([t.eyeWhites, "black", t.eyeColorRight])),
        eyeWhites: null,
        eyeOpennessLeft: t.eyeOpennessLeft,
        eyeOpennessRight: t.eyeOpennessRight,
        eyeshadow: t.eyeshadow,
        eyeshadowColor: e.addInts(C([t.eyeshadowColor])),
        lockEyes: t.lockEyes,
        lockEyeColor: t.lockEyeColor,
        fangs: t.fangs,
        muzzle: t.muzzle,
        freckles: t.freckles,
        frecklesColor: e.addInts(C([t.frecklesColor])),
        cm: null,
        cmFlip: t.cmFlip,
        cmPalette: t.cm ? e.add(t.cm) : null,
        customOutlines: t.customOutlines,
        defaultPalette: e.addInts(C(["white", "black", "721946", "f39f4b"]))
      }
    }

    function I(t) {
      R.forOwn(t, P.releasePalette)
    }

    var R = t(getCodeName("Lodash")),
      F = t("1f"),
      P = t("27"),
      j = t("22"),
      N = t("39"),
      L = t("21"),
      U = t("35");
    return e.fixPony = r,
      e.createSpriteSet = i,
      e.createDefaultCM = o,
      e.createDefaultPony = a,
      e.toRenderInfo = d,
      e.compressPonyInfo = T,
      e.decompressPonyInfo = k,
      e.toPalette = O,
      e.releasePalettes = I,
      n.exports
  });
  System.registerDynamic("24", ["35"], !0, function(t, e, n) {
    "use strict";
    var r = t("35");
    return e.WHITE = r.default.parse("white"),
      e.BLACK = r.default.parse("black"),
      e.ORANGE = r.default.parse("orange"),
      e.BLUE = r.default.parse("blue"),
      e.GRAY = r.default.parse("#444"),
      e.RED = r.default.parse("red"),
      e.PURPLE = r.default.parse("purple"),
      e.BG_COLOR = r.default.parse("LightGreen"),
      e.ADMIN_COLOR = r.default.parse("HotPink"),
      e.SYSTEM_COLOR = r.default.parse("#999"),
      e.SHADOW_COLOR = new r.default(0, 0, 0, .3),
      e.CLOUD_SHADOW_COLOR = new r.default(0, 0, 0, .2),
      e.SHINES_COLOR = new r.default(255, 255, 255, .4),
      e.FAR_COLOR = r.default.fromHsva(0, 0, .8, 1),
      n.exports
  });
  System.registerDynamic("c9", [], !0, function(t, e, n) {
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
  System.registerDynamic("ca", ["c9"], !0, function(t, e, n) {
    return n.exports = t("c9"),
      n.exports
  });
  System.registerDynamic("35", ["ca"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      var e = (0 | t).toString(16);
      return 2 === e.length ? e : "0" + e
    }

    var i = t("ca"),
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
          t.parse = function(e) {
            if ("string" != typeof e)
              return new t(0, 0, 0, 0);
            if (e = e.trim().toLowerCase(),
              "" === e || "none" === e || "transparent" === e)
              return new t(0, 0, 0, 0);
            e = t.names[e] || e;
            var n = /(\d+)[ ,]+(\d+)[ ,]+(\d+)([ ,]+(\d*\.?\d+))?/.exec(e);
            if (n)
              return new t(parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3], 10), n[5] ? parseFloat(n[5]) : 1);
            var r = /[0-9a-f]+/i.exec(e);
            if (r) {
              var i = void 0,
                o = void 0,
                a = void 0,
                s = void 0,
                u = r[0];
              return 3 === u.length ? (i = 17 * parseInt(u.charAt(0), 16),
                  o = 17 * parseInt(u.charAt(1), 16),
                  a = 17 * parseInt(u.charAt(2), 16),
                  s = 1) : (i = parseInt(u.substr(0, 2), 16),
                  o = parseInt(u.substr(2, 2), 16),
                  a = parseInt(u.substr(4, 2), 16),
                  s = u.length >= 8 ? parseInt(u.substr(6, 2), 16) / 255 : 1),
                new t(i, o, a, s)
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
  System.registerDynamic("21", [], !0, function(t, e, n) {
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
  System.registerDynamic("22", [getCodeName("BlueBird"), getCodeName("Lodash"), "21"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      return new RegExp("^" + X.escapeRegExp((t || "").trim()) + "$", "i")
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
      return !!X.remove(t, function(t) {
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

    function d(t, e, n, r) {
      var i = n.x / Z.tileWidth + t,
        o = n.y / Z.tileHeight + e,
        a = n.w / Z.tileWidth,
        s = n.h / Z.tileHeight;
      return r.x > i && r.x < i + a && r.y > o && r.y < o + s
    }

    function v(t, e, n, r, i) {
      var o = n.x + t,
        a = n.y + e,
        s = n.w,
        u = n.h;
      return r > o && r < o + s && i > a && i < a + u
    }

    function m(t, e) {
      return Math.sqrt(t * t + e * e)
    }

    function g(t, e) {
      var n = t.x - e.x,
        r = t.y - e.y;
      return m(n, r)
    }

    function y(t, e) {
      if (!t.bounds || !e.bounds)
        return !1;
      var n = t.x + t.bounds.x,
        r = t.y + t.bounds.y,
        i = e.x + e.bounds.x,
        o = e.y + e.bounds.y;
      return x(n, r, t.bounds.w, t.bounds.h, i, o, e.bounds.w, e.bounds.h)
    }

    function b(t, e) {
      return x(t.x, t.y, t.w, t.h, e.x, e.y, e.w, e.h)
    }

    function _(t, e) {
      var n = Math.min(t.x, e.x),
        r = Math.min(t.y, e.y);
      return {
        x: n,
        y: r,
        w: Math.max(t.x + t.w, e.x + e.w) - n,
        h: Math.max(t.y + t.h, e.y + e.h) - r
      }
    }

    function w(t, e, n, r, i, o) {
      return x(t + n.x, e + n.y, n.w, n.h, r + o.x, i + o.y, o.w, o.h)
    }

    function x(t, e, n, r, i, o, a, s) {
      return t <= i + a && t + n >= i && e <= o + s && e + r >= o
    }

    function E(t) {
      return t >= 55296 && t <= 56319
    }

    function $(t, e) {
      return ((1023 & t) << 10) + (1023 & e) + 65536
    }

    function S(t, e) {
      void 0 === e && (e = !1);
      for (var n = e ? Q : K, r = "", i = 0; i < t; i++)
        r += n[Math.random() * n.length | 0];
      return r
    }

    function T(t) {
      var n = t.data,
        r = t.status,
        i = n;
      throw 500 !== r && 5 === Math.floor(r / 100) ? new Error(e.PROTECTION_ERROR) : 403 === r ? new Error(e.ACCESS_ERROR) : 404 === r ? new Error(e.NOT_FOUND_ERROR) : new Error(i && i.error || e.OFFLINE_ERROR)
    }

    function k(t) {
      return G.resolve(t).catch(T).then(function(t) {
        return t.data
      })
    }

    function M(t) {
      return function(e) {
        t.error = e.message
      }
    }

    function A() {
      return J || (J = D(1, 1))
    }

    function C() {
      return "undefined" != typeof window ? window.devicePixelRatio || 1 : 1
    }

    function D(t, e) {
      var n = document.createElement("canvas");
      return n.width = t,
        n.height = e,
        n
    }

    function O(t) {
      return new G(function(e, n) {
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

    function I(t) {
      "imageSmoothingEnabled" in t ? t.imageSmoothingEnabled = !1 : (t.webkitImageSmoothingEnabled = !1,
        t.mozImageSmoothingEnabled = !1,
        t.msImageSmoothingEnabled = !1)
    }

    function R(t) {
      var e = 3 & t;
      return 2 === e ? Z.PONY_SPEED_TROT : 1 === e ? Z.PONY_SPEED_WALK : 0
    }

    function F(t) {
      var e = tt[(0 | t) % tt.length];
      return {
        x: e[0],
        y: e[1]
      }
    }

    function P(t, e) {
      var n = Math.atan2(t, -e);
      return Math.round((n < 0 ? n + rt : n) * it) % tt.length
    }

    function j(t, e, n, r) {
      var i = Math.floor(100 * s(t, 0, 1e5)) | n << 24,
        o = Math.floor(100 * s(e, 0, 1e5)) | r << 24;
      return [i ^ et, o ^ nt]
    }

    function N(t, e) {
      t ^= et,
        e ^= nt;
      var n = (16777215 & t) / 100,
        r = (16777215 & e) / 100,
        i = t >> 24 & 255,
        o = e >> 24 & 255;
      return [n, r, i, o]
    }

    function L(t, e) {
      return !(t < 0) && (t > 0 || e)
    }

    function U(t) {
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

    function B(t) {
      var e, n = !1,
        r = G.resolve(t.load()).then(function() {
          if (n)
            throw new Error("cancelled");
          t.init();
          var r = performance.now(),
            i = r,
            o = 0,
            a = 0;
          e = requestAnimationFrame(function n(s) {
            e = requestAnimationFrame(n),
              o++,
              s - i > 1e3 && (a = 1e3 * o / (s - i),
                o = 0,
                i = s),
              t.fps = a,
              t.update((s - r) / 1e3),
              t.draw(),
              r = s
          })
        }),
        i = function() {
          cancelAnimationFrame(e),
            n = !0
        };
      return {
        promise: r,
        cancel: i
      }
    }

    function V(t, e) {
      t && ("transform" in t.style ? t.style.transform = e : t.style.webkitTransform = e)
    }

    function H(t) {
      return !!t.pointerType
    }

    function z(t) {
      return !!t.touches
    }

    function Y(t) {
      return z(t) ? 0 : t.button
    }

    function W(t) {
      return z(t) ? t.touches[0].pageX : t.pageX
    }

    function q(t) {
      return z(t) ? t.touches[0].pageY : t.pageY
    }

    var G = t(getCodeName("BlueBird")),
      X = t(getCodeName("Lodash")),
      Z = t("21"),
      K = "abcdefghijklmnopqrstuvwxyz0123456789_",
      Q = K + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
      e.contains = d,
      e.containsPoint = v,
      e.length = m,
      e.distance = g,
      e.entitiesIntersect = y,
      e.rectsIntersect = b,
      e.addRects = _,
      e.collidersIntersect = w,
      e.intersect = x,
      e.isSurrogate = E,
      e.fromSurrogate = $,
      e.randomString = S,
      e.ACCESS_ERROR = "Access denied",
      e.NOT_FOUND_ERROR = "Not found",
      e.OFFLINE_ERROR = "Server is offline",
      e.PROTECTION_ERROR = "DDOS protection error, reload the page to continue",
      e.handleReject = T,
      e.toPromise = k,
      e.errorHandler = M;
    var J;
    e.getTempCanvas = A,
      e.getPixelRatio = C,
      e.createCanvas = D,
      e.loadImage = O,
      e.disableImageSmoothing = I;
    var tt = [
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
      et = 63540507,
      nt = 1026711136,
      rt = 2 * Math.PI,
      it = tt.length / rt;
    return e.flagsToSpeed = R,
      e.dirToVector = F,
      e.vectorToDir = P,
      e.encodeMovement = j,
      e.decodeMovement = N,
      e.isFacingRight = L,
      e.setupSetTes = U,
      e.start = B,
      e.setTransform = V,
      e.isPointer = H,
      e.isTouch = z,
      e.getButton = Y,
      e.getX = W,
      e.getY = q,
      n.exports
  });
  System.registerDynamic("3b", [getCodeName("BlueBird"), "35", "22"], !0, function(t, e, n) {
    "use strict";

    function r(t, e) {
      var n = Object.keys(t).reduce(function(e, n) {
        var r = t[n];
        if (r) {
          var i = e[r.src] || [];
          i.push(r),
            e[r.src] = i
        }
        return e
      }, {});
      return l.map(Object.keys(n), function(t) {
        return f.loadImage(e + t).then(function(e) {
          return n[t].forEach(function(t) {
            return t.img = e
          })
        })
      })
    }

    function i(t, e) {
      return f.loadImage(e + t.src).then(function(e) {
        t.img = e,
          t.sprites.filter(function(t) {
            return !!t
          }).forEach(function(t) {
            return t.img = e
          })
      })
    }

    function o(t, e) {
      return l.map(t, function(t) {
        return i(t, e)
      }).then(function() {})
    }

    function a(t, e, n, r) {
      e && e.w && e.h && e.img && t.drawImage(e.img, e.x, e.y, e.w, e.h, n + e.ox, r + e.oy, e.w, e.h)
    }

    function s(t, e) {
      return p = p || f.createCanvas(t, e),
        (p.width < t || p.height < e) && (p.width = Math.max(p.width, t),
          p.height = Math.max(p.height, e)),
        p.getContext("2d")
    }

    function u(t, e, n, r, i) {
      if (e && e.img) {
        var o = s(e.w, e.h),
          a = c.default.parse(n);
        o.fillStyle = "#" + a.toHexRGB(),
          o.globalCompositeOperation = "source-over",
          o.fillRect(0, 0, e.w, e.h),
          o.globalCompositeOperation = "destination-in",
          o.drawImage(e.img, e.x, e.y, e.w, e.h, 0, 0, e.w, e.h),
          o.globalCompositeOperation = "multiply",
          o.drawImage(e.img, e.x, e.y, e.w, e.h, 0, 0, e.w, e.h);
        var u = t.globalAlpha;
        t.globalAlpha = u * a.a,
          t.drawImage(o.canvas, 0, 0, e.w, e.h, r + e.ox, i + e.oy, e.w, e.h),
          t.globalAlpha = u
      }
    }

    var l = t(getCodeName("BlueBird")),
      c = t("35"),
      f = t("22");
    e.loadSprites = r,
      e.loadSpriteSheets = o,
      e.drawSprite = a;
    var p;
    return e.drawColoredSprite = u,
      n.exports
  });
  System.registerDynamic("cc", [], !0, function(t, e, n) {
    return n.exports = {
        "pony.png": "pony-85f36bafe3.png",
        "pony2.png": "pony2-7da47c9017.png",
        "tiles.png": "tiles-1147a10312.png"
      },
      n.exports
  });
  System.registerDynamic("1f", ["cc"], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      return t ? {
        x: t[0],
        y: t[1],
        w: t[2],
        h: t[3],
        ox: t[4],
        oy: t[5],
        src: w
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
        fill: E[t],
        outline: E[e]
      }
    }

    function a(t, e, n) {
      return {
        fill: E[t],
        outline: E[e],
        extra: E[n]
      }
    }

    function s(t, e) {
      return {
        color: E[t],
        shadow: E[e]
      }
    }

    function u(t) {
      return {
        shadow: E[t]
      }
    }

    function l(t, e, n) {
      return {
        mouth: E[t],
        muzzle: E[e],
        fangs: E[n]
      }
    }

    function c(t, e, n, r) {
      return {
        fill: E[t],
        line: E[e],
        iris: E[n],
        lashes: E[r]
      }
    }

    function f(t, e, n, r, i) {
      return {
        stump: E[t],
        trunk: E[e],
        crown: E[n],
        stumpShadow: E[r],
        shadow: E[i]
      }
    }

    function p(t) {
      return t ? {
        x: t[0],
        y: t[1],
        w: t[2],
        h: t[3],
        ox: t[4],
        oy: t[5],
        src: x
      } : null
    }

    function h(t, e) {
      return {
        color: $[t],
        palette: e
      }
    }

    function d(t) {
      return {
        shadow: $[t]
      }
    }

    function v(t, e, n) {
      return {
        color: $[t],
        shadow: $[e],
        palette: n
      }
    }

    function m(t, e, n) {
      return {
        mouth: $[t],
        muzzle: $[e],
        fangs: $[n]
      }
    }

    function g(t, e, n) {
      return {
        normal: $[t],
        lashes: $[e],
        iris: $[n]
      }
    }

    function y(t, e, n, r, i, o) {
      return {
        stump: $[t],
        trunk: $[e],
        crown: $[n],
        stumpShadow: $[r],
        shadow: $[i],
        palette: o
      }
    }

    function b(t, e) {
      return {
        frames: t.map(function(t) {
          return $[t]
        }),
        palette: e
      }
    }

    var _ = t("cc"),
      w = _["pony.png"],
      x = _["pony2.png"],
      E = [null, [175, 284, 9, 7, 31, 28],
        [347, 298, 12, 6, 29, 30],
        [121, 143, 1, 1, 38, 28], null, [211, 284, 8, 7, 31, 28],
        [371, 298, 12, 6, 29, 30],
        [95, 315, 7, 4, 33, 30],
        [31, 305, 9, 5, 32, 30],
        [416, 298, 9, 6, 31, 29],
        [359, 298, 12, 6, 29, 30],
        [154, 305, 7, 5, 32, 28],
        [444, 133, 1, 1, 40, 30],
        [78, 298, 4, 7, 31, 28],
        [36, 319, 4, 4, 29, 32],
        [495, 298, 7, 6, 33, 28],
        [138, 305, 8, 5, 33, 30],
        [193, 284, 9, 7, 31, 28],
        [347, 298, 12, 6, 29, 30],
        [8, 315, 8, 4, 31, 28], null, [148, 285, 4, 6, 31, 29],
        [181, 315, 6, 4, 29, 32],
        [435, 309, 6, 5, 34, 28],
        [187, 315, 6, 4, 35, 30],
        [175, 284, 9, 7, 31, 28],
        [347, 298, 12, 6, 29, 30],
        [121, 143, 1, 1, 38, 28], null, [211, 284, 8, 7, 31, 28],
        [371, 298, 12, 6, 29, 30],
        [95, 315, 7, 4, 33, 30],
        [31, 305, 9, 5, 32, 30],
        [416, 298, 9, 6, 31, 29],
        [359, 298, 12, 6, 29, 30],
        [154, 305, 7, 5, 32, 28],
        [444, 133, 1, 1, 40, 30],
        [78, 298, 4, 7, 31, 28],
        [36, 319, 4, 4, 29, 32],
        [495, 298, 7, 6, 33, 28],
        [138, 305, 8, 5, 33, 30],
        [193, 284, 9, 7, 31, 28],
        [347, 298, 12, 6, 29, 30],
        [8, 315, 8, 4, 31, 28], null, [148, 285, 4, 6, 31, 29],
        [181, 315, 6, 4, 29, 32],
        [435, 309, 6, 5, 34, 28],
        [187, 315, 6, 4, 35, 30],
        [124, 213, 8, 15, 35, 26],
        [98, 212, 10, 15, 34, 28],
        [439, 155, 2, 1, 37, 26], null, [279, 237, 8, 14, 35, 27],
        [108, 228, 9, 14, 34, 29],
        [492, 263, 8, 11, 35, 26],
        [368, 265, 5, 11, 39, 28],
        [206, 276, 10, 8, 31, 27],
        [84, 276, 12, 8, 30, 28],
        [251, 283, 8, 8, 31, 27],
        [305, 283, 7, 8, 30, 28],
        [320, 304, 4, 6, 37, 29],
        [143, 285, 5, 7, 37, 29],
        [251, 310, 4, 5, 32, 28],
        [507, 309, 5, 5, 31, 29],
        [121, 143, 1, 1, 35, 28],
        [444, 133, 1, 1, 33, 29],
        [12, 319, 4, 4, 32, 29],
        [395, 318, 5, 4, 31, 30],
        [235, 310, 4, 5, 32, 29],
        [128, 285, 5, 7, 31, 29],
        [451, 80, 3, 3, 33, 29],
        [319, 310, 4, 5, 31, 29],
        [428, 322, 4, 3, 32, 31],
        [465, 318, 5, 4, 31, 32],
        [193, 197, 20, 15, 21, 20],
        [41, 179, 22, 17, 20, 19],
        [312, 274, 13, 9, 28, 20],
        [349, 251, 16, 12, 26, 19],
        [455, 238, 20, 13, 21, 22],
        [504, 224, 8, 14, 20, 22],
        [493, 304, 14, 5, 27, 28],
        [83, 159, 6, 1, 27, 33],
        [166, 319, 8, 3, 33, 30],
        [148, 319, 9, 3, 33, 31],
        [323, 208, 20, 15, 21, 20],
        [41, 179, 22, 17, 20, 19],
        [455, 251, 19, 12, 22, 21], null, [388, 211, 12, 15, 21, 20],
        [153, 180, 15, 17, 20, 19],
        [365, 253, 15, 12, 25, 21],
        [360, 208, 15, 15, 26, 19],
        [312, 283, 7, 8, 34, 25],
        [487, 274, 9, 9, 33, 25],
        [263, 208, 20, 15, 21, 20],
        [41, 179, 22, 17, 20, 19],
        [493, 251, 19, 12, 22, 22], null, [509, 23, 3, 11, 21, 24],
        [350, 237, 6, 14, 20, 22],
        [66, 227, 11, 14, 23, 20],
        [43, 212, 11, 15, 24, 19],
        [49, 254, 10, 12, 29, 21],
        [193, 212, 10, 15, 30, 19],
        [407, 275, 7, 9, 34, 23],
        [162, 266, 7, 10, 35, 23],
        [193, 197, 20, 15, 21, 20],
        [41, 179, 22, 17, 20, 19],
        [312, 274, 13, 9, 28, 20],
        [349, 251, 16, 12, 26, 19],
        [455, 238, 20, 13, 21, 22],
        [504, 224, 8, 14, 20, 22],
        [493, 304, 14, 5, 27, 28],
        [83, 159, 6, 1, 27, 33],
        [166, 319, 8, 3, 33, 30],
        [148, 319, 9, 3, 33, 31],
        [323, 208, 20, 15, 21, 20],
        [41, 179, 22, 17, 20, 19],
        [455, 251, 19, 12, 22, 21], null, [388, 211, 12, 15, 21, 20],
        [153, 180, 15, 17, 20, 19],
        [365, 253, 15, 12, 25, 21],
        [360, 208, 15, 15, 26, 19],
        [312, 283, 7, 8, 34, 25],
        [487, 274, 9, 9, 33, 25],
        [263, 208, 20, 15, 21, 20],
        [41, 179, 22, 17, 20, 19],
        [493, 251, 19, 12, 22, 22], null, [509, 23, 3, 11, 21, 24],
        [350, 237, 6, 14, 20, 22],
        [66, 227, 11, 14, 23, 20],
        [43, 212, 11, 15, 24, 19],
        [49, 254, 10, 12, 29, 21],
        [193, 212, 10, 15, 30, 19],
        [407, 275, 7, 9, 34, 23],
        [162, 266, 7, 10, 35, 23],
        [408, 177, 20, 17, 21, 23],
        [39, 139, 22, 21, 20, 22],
        [304, 298, 15, 6, 26, 23],
        [55, 276, 17, 8, 25, 22],
        [437, 225, 13, 14, 21, 25],
        [154, 213, 5, 15, 20, 25],
        [385, 226, 13, 14, 22, 26],
        [443, 252, 12, 12, 22, 31],
        [296, 315, 5, 4, 34, 27],
        [83, 159, 6, 1, 34, 31],
        [30, 310, 6, 5, 35, 26],
        [14, 242, 2, 2, 40, 30],
        [474, 251, 19, 12, 22, 23],
        [331, 223, 21, 14, 21, 22],
        [492, 322, 9, 2, 28, 23],
        [478, 304, 15, 5, 26, 22],
        [254, 298, 18, 6, 22, 24],
        [292, 274, 20, 9, 21, 24],
        [383, 265, 19, 10, 22, 25],
        [35, 276, 20, 8, 22, 28],
        [400, 314, 10, 4, 31, 27],
        [94, 319, 12, 3, 30, 29],
        [72, 325, 4, 2, 37, 29],
        [35, 325, 5, 2, 37, 30],
        [278, 263, 16, 11, 25, 21],
        [408, 239, 18, 13, 24, 20],
        [246, 274, 5, 10, 25, 21],
        [59, 241, 9, 13, 24, 20],
        [426, 264, 7, 11, 27, 21],
        [139, 255, 5, 12, 30, 21],
        [421, 275, 6, 9, 32, 22],
        [100, 267, 6, 10, 33, 22],
        [232, 304, 5, 6, 36, 25],
        [436, 284, 6, 7, 36, 25],
        [289, 251, 21, 12, 21, 21],
        [159, 213, 25, 14, 19, 20],
        [272, 298, 17, 6, 25, 21],
        [14, 276, 21, 8, 23, 20],
        [387, 304, 21, 5, 21, 23],
        [209, 298, 24, 6, 19, 23],
        [233, 298, 21, 6, 21, 26],
        [185, 298, 24, 6, 19, 27],
        [462, 304, 16, 5, 26, 28],
        [427, 304, 19, 5, 24, 29],
        [458, 153, 8, 2, 34, 29],
        [480, 322, 12, 2, 31, 30],
        [310, 251, 20, 12, 28, 20],
        [288, 223, 22, 14, 27, 19],
        [66, 298, 4, 7, 28, 25],
        [148, 267, 5, 10, 27, 23],
        [508, 12, 4, 11, 31, 20],
        [131, 242, 6, 13, 30, 19],
        [232, 275, 8, 9, 35, 22],
        [343, 263, 10, 11, 35, 21],
        [406, 298, 10, 6, 38, 25],
        [175, 276, 11, 8, 38, 24],
        [345, 131, 22, 22, 20, 22],
        [340, 106, 23, 25, 18, 21],
        [202, 284, 9, 7, 33, 22],
        [425, 298, 9, 6, 32, 21],
        [247, 251, 21, 12, 20, 23],
        [231, 224, 19, 14, 18, 22],
        [19, 161, 20, 18, 22, 26],
        [54, 212, 11, 15, 21, 31],
        [157, 319, 9, 3, 33, 29],
        [119, 196, 2, 1, 32, 31],
        [118, 322, 6, 3, 36, 30],
        [52, 323, 6, 2, 34, 31],
        [352, 223, 20, 14, 20, 24],
        [408, 194, 22, 16, 19, 23],
        [126, 299, 6, 6, 34, 25],
        [460, 283, 6, 8, 35, 24],
        [326, 283, 7, 8, 27, 24],
        [154, 266, 8, 10, 27, 23],
        [39, 241, 10, 13, 20, 25],
        [19, 212, 12, 15, 19, 24],
        [154, 298, 4, 7, 24, 32],
        [433, 275, 5, 9, 23, 32],
        [130, 325, 3, 2, 24, 32],
        [121, 138, 1, 3, 23, 32],
        [121, 141, 1, 2, 27, 32], null, [182, 305, 3, 5, 24, 34],
        [316, 304, 4, 6, 23, 35],
        [58, 298, 4, 7, 24, 32],
        [359, 274, 4, 9, 23, 32],
        [231, 212, 2, 4, 25, 34], null, [155, 242, 2, 2, 24, 32],
        [121, 138, 1, 3, 23, 32],
        [106, 325, 3, 2, 25, 32], null, [182, 305, 3, 5, 24, 34],
        [316, 304, 4, 6, 23, 35],
        [54, 298, 4, 7, 24, 32],
        [359, 274, 4, 9, 23, 32],
        [511, 11, 1, 1, 27, 32], null, null, [88, 145, 1, 1, 23, 34],
        [96, 325, 4, 2, 24, 32],
        [88, 141, 1, 2, 23, 32],
        [182, 305, 3, 5, 24, 34],
        [316, 304, 4, 6, 23, 35],
        [0, 267, 7, 10, 25, 33],
        [59, 254, 9, 12, 24, 32],
        [465, 322, 3, 3, 27, 33],
        [114, 196, 5, 1, 27, 32],
        [7, 267, 7, 10, 25, 33],
        [474, 263, 9, 11, 24, 33],
        [469, 155, 11, 20, 20, 31],
        [419, 136, 13, 22, 19, 30], null, [444, 133, 1, 1, 31, 32],
        [184, 284, 9, 7, 21, 31],
        [455, 274, 11, 9, 20, 30],
        [263, 192, 5, 16, 21, 35],
        [269, 154, 8, 19, 19, 33],
        [231, 310, 4, 5, 20, 46],
        [351, 304, 3, 6, 19, 46],
        [505, 175, 7, 16, 24, 32],
        [417, 39, 5, 16, 27, 33],
        [39, 160, 20, 19, 21, 20],
        [466, 133, 22, 22, 20, 19],
        [312, 274, 13, 9, 28, 20],
        [349, 251, 16, 12, 26, 19],
        [475, 238, 20, 13, 21, 22],
        [504, 224, 8, 14, 20, 22],
        [152, 284, 13, 7, 27, 28],
        [319, 298, 14, 6, 27, 30],
        [95, 315, 7, 4, 33, 30],
        [21, 305, 10, 5, 32, 30],
        [182, 305, 3, 5, 24, 34],
        [316, 304, 4, 6, 23, 35],
        [389, 158, 20, 19, 21, 20],
        [301, 131, 22, 22, 20, 19],
        [0, 180, 19, 17, 22, 21],
        [444, 133, 1, 1, 40, 30],
        [388, 211, 12, 15, 21, 20],
        [153, 180, 15, 17, 20, 19],
        [408, 225, 15, 14, 25, 21],
        [168, 180, 15, 17, 26, 19],
        [224, 275, 8, 9, 33, 25],
        [91, 266, 9, 10, 33, 25],
        [182, 305, 3, 5, 24, 34],
        [316, 304, 4, 6, 23, 35],
        [409, 158, 20, 19, 21, 20],
        [323, 131, 22, 22, 20, 19],
        [330, 251, 19, 12, 22, 22], null, [509, 23, 3, 11, 21, 24],
        [350, 237, 6, 14, 20, 22],
        [66, 227, 11, 14, 23, 20],
        [43, 212, 11, 15, 24, 19],
        [398, 226, 10, 14, 29, 21],
        [291, 191, 11, 17, 29, 19],
        [169, 266, 7, 10, 34, 23],
        [405, 264, 7, 11, 35, 23],
        [182, 305, 3, 5, 24, 34],
        [316, 304, 4, 6, 23, 35],
        [303, 208, 20, 15, 21, 20],
        [19, 179, 22, 17, 20, 19],
        [312, 274, 13, 9, 28, 20],
        [349, 251, 16, 12, 26, 19],
        [475, 238, 20, 13, 21, 22],
        [504, 224, 8, 14, 20, 22],
        [152, 284, 13, 7, 27, 28],
        [319, 298, 14, 6, 27, 30],
        [95, 315, 7, 4, 33, 30],
        [21, 305, 10, 5, 32, 30],
        [213, 197, 20, 15, 21, 20],
        [63, 179, 22, 17, 20, 19],
        [424, 252, 19, 12, 22, 21],
        [444, 133, 1, 1, 40, 30],
        [388, 211, 12, 15, 21, 20],
        [153, 180, 15, 17, 20, 19],
        [408, 225, 15, 14, 25, 21],
        [168, 180, 15, 17, 26, 19],
        [224, 275, 8, 9, 33, 25],
        [91, 266, 9, 10, 33, 25],
        [283, 208, 20, 15, 21, 20],
        [19, 179, 22, 17, 20, 19],
        [330, 251, 19, 12, 22, 22], null, [509, 23, 3, 11, 21, 24],
        [350, 237, 6, 14, 20, 22],
        [66, 227, 11, 14, 23, 20],
        [43, 212, 11, 15, 24, 19],
        [398, 226, 10, 14, 29, 21],
        [291, 191, 11, 17, 29, 19],
        [169, 266, 7, 10, 34, 23],
        [405, 264, 7, 11, 35, 23],
        [299, 153, 22, 20, 21, 23],
        [277, 131, 24, 22, 20, 22],
        [289, 298, 15, 6, 26, 23],
        [55, 276, 17, 8, 25, 22],
        [437, 225, 13, 14, 21, 25],
        [154, 213, 5, 15, 20, 25],
        [372, 226, 13, 14, 22, 26],
        [443, 252, 12, 12, 22, 31],
        [279, 237, 8, 14, 35, 27],
        [0, 228, 9, 14, 34, 29],
        [492, 263, 8, 11, 35, 26],
        [368, 265, 5, 11, 39, 28],
        [197, 266, 7, 10, 25, 33],
        [500, 263, 8, 11, 25, 33],
        [405, 252, 19, 12, 22, 23],
        [310, 223, 21, 14, 21, 22],
        [492, 322, 9, 2, 28, 23],
        [478, 304, 15, 5, 26, 22],
        [254, 298, 18, 6, 22, 24],
        [292, 274, 20, 9, 21, 24],
        [383, 265, 19, 10, 22, 25],
        [35, 276, 20, 8, 22, 28],
        [186, 276, 10, 8, 31, 27],
        [72, 276, 12, 8, 30, 28],
        [320, 304, 4, 6, 37, 29],
        [153, 291, 5, 7, 37, 29],
        [278, 263, 16, 11, 25, 21],
        [408, 239, 18, 13, 24, 20],
        [246, 274, 5, 10, 25, 21],
        [59, 241, 9, 13, 24, 20],
        [426, 264, 7, 11, 27, 21],
        [139, 255, 5, 12, 30, 21],
        [421, 275, 6, 9, 32, 22],
        [100, 267, 6, 10, 33, 22],
        [232, 304, 5, 6, 36, 25],
        [436, 284, 6, 7, 36, 25],
        [268, 251, 21, 12, 21, 21],
        [263, 223, 25, 14, 19, 20],
        [272, 298, 17, 6, 25, 21],
        [14, 276, 21, 8, 23, 20],
        [387, 304, 21, 5, 21, 23],
        [209, 298, 24, 6, 19, 23],
        [233, 298, 21, 6, 21, 26],
        [185, 298, 24, 6, 19, 27],
        [446, 304, 16, 5, 26, 28],
        [408, 304, 19, 5, 24, 29],
        [410, 314, 10, 4, 32, 29],
        [474, 53, 12, 4, 31, 30],
        [310, 251, 20, 12, 28, 20],
        [288, 223, 22, 14, 27, 19],
        [66, 298, 4, 7, 28, 25],
        [148, 267, 5, 10, 27, 23],
        [508, 12, 4, 11, 31, 20],
        [131, 242, 6, 13, 30, 19],
        [232, 275, 8, 9, 35, 22],
        [343, 263, 10, 11, 35, 21],
        [406, 298, 10, 6, 38, 25],
        [175, 276, 11, 8, 38, 24],
        [367, 131, 22, 22, 20, 22],
        [363, 106, 23, 25, 18, 21],
        [202, 284, 9, 7, 33, 22],
        [425, 298, 9, 6, 32, 21],
        [247, 251, 21, 12, 20, 23],
        [231, 224, 19, 14, 18, 22],
        [19, 161, 20, 18, 22, 26],
        [54, 212, 11, 15, 21, 31],
        [139, 319, 9, 3, 33, 29],
        [319, 310, 4, 5, 31, 29],
        [390, 314, 10, 4, 32, 30],
        [438, 314, 9, 4, 31, 32],
        [454, 32, 20, 27, 20, 24],
        [486, 0, 22, 29, 19, 23],
        [126, 299, 6, 6, 34, 25],
        [460, 283, 6, 8, 35, 24],
        [326, 283, 7, 8, 27, 24],
        [154, 266, 8, 10, 27, 23],
        [39, 241, 10, 13, 20, 25],
        [19, 212, 12, 15, 19, 24],
        [263, 192, 5, 16, 21, 35],
        [269, 154, 8, 19, 19, 33],
        [231, 310, 4, 5, 20, 46],
        [351, 304, 3, 6, 19, 46],
        [505, 175, 7, 16, 24, 32],
        [417, 39, 5, 16, 27, 33],
        [378, 265, 5, 11, 39, 35],
        [301, 237, 7, 14, 38, 33],
        [510, 161, 2, 4, 40, 37],
        [369, 314, 3, 5, 38, 37],
        [27, 284, 4, 8, 39, 38],
        [490, 318, 4, 4, 39, 43],
        [405, 247, 3, 5, 41, 35],
        [441, 123, 4, 10, 41, 33],
        [450, 264, 5, 11, 39, 35],
        [301, 237, 7, 14, 38, 33],
        [439, 184, 3, 8, 40, 37], null, [363, 265, 5, 11, 39, 35],
        [9, 228, 7, 14, 38, 33],
        [176, 298, 3, 7, 41, 36],
        [19, 284, 4, 8, 40, 37],
        [445, 264, 5, 11, 39, 35],
        [301, 237, 7, 14, 38, 33],
        [509, 34, 3, 10, 40, 36], null, [373, 265, 5, 11, 39, 35],
        [308, 237, 7, 14, 38, 33],
        [439, 176, 3, 8, 40, 38],
        [451, 70, 3, 10, 40, 37],
        [217, 254, 7, 12, 36, 37],
        [99, 227, 9, 14, 35, 36],
        [433, 291, 5, 7, 36, 40],
        [190, 266, 7, 10, 35, 37],
        [118, 267, 6, 10, 37, 37],
        [68, 325, 4, 2, 36, 46],
        [224, 241, 5, 10, 38, 39],
        [510, 241, 2, 2, 37, 48],
        [429, 167, 3, 8, 40, 41],
        [450, 225, 5, 14, 39, 36],
        [389, 136, 15, 22, 37, 22],
        [424, 112, 17, 24, 36, 21],
        [510, 243, 2, 2, 41, 26],
        [486, 318, 4, 4, 40, 25],
        [217, 322, 5, 3, 42, 22],
        [196, 276, 10, 8, 39, 21],
        [510, 243, 2, 2, 41, 26],
        [486, 318, 4, 4, 40, 25],
        [496, 274, 9, 9, 43, 24],
        [111, 242, 7, 13, 46, 23],
        [104, 242, 7, 13, 44, 25],
        [348, 304, 3, 6, 48, 35],
        [321, 263, 11, 11, 37, 28],
        [16, 241, 12, 13, 36, 28],
        [484, 283, 5, 8, 37, 36],
        [124, 267, 6, 10, 36, 35],
        [239, 264, 7, 11, 40, 33],
        [157, 241, 9, 13, 39, 32],
        [229, 230, 2, 3, 43, 37], null, [252, 304, 5, 6, 42, 33],
        [210, 254, 7, 12, 41, 32],
        [229, 230, 2, 3, 43, 37], null, [232, 264, 7, 11, 40, 33],
        [95, 241, 9, 13, 39, 32],
        [106, 267, 6, 10, 40, 34],
        [179, 254, 8, 12, 39, 33],
        [247, 304, 5, 6, 40, 38],
        [291, 283, 7, 8, 39, 37],
        [502, 193, 10, 16, 37, 29],
        [371, 173, 12, 18, 36, 28],
        [427, 275, 6, 9, 41, 29],
        [187, 254, 8, 12, 40, 28],
        [104, 255, 7, 12, 37, 33],
        [77, 241, 9, 13, 36, 33],
        [484, 209, 14, 15, 30, 35],
        [289, 173, 16, 18, 29, 34],
        [49, 241, 10, 13, 30, 35],
        [87, 212, 11, 15, 29, 34],
        [42, 227, 12, 14, 30, 35],
        [358, 173, 13, 18, 29, 34],
        [250, 224, 13, 14, 30, 36],
        [75, 196, 13, 16, 30, 35],
        [442, 275, 4, 9, 40, 37],
        [7, 255, 7, 12, 38, 36],
        [236, 251, 6, 13, 37, 32],
        [0, 213, 8, 15, 36, 31],
        [86, 298, 4, 7, 39, 32],
        [454, 283, 6, 8, 38, 31],
        [440, 322, 4, 3, 39, 37],
        [217, 315, 6, 4, 38, 36],
        [445, 318, 5, 4, 37, 40],
        [503, 314, 8, 4, 36, 40],
        [259, 315, 6, 4, 37, 41],
        [106, 305, 8, 5, 36, 41],
        [89, 138, 13, 22, 48, 42],
        [44, 115, 15, 24, 47, 41],
        [0, 305, 11, 5, 48, 42],
        [70, 284, 14, 7, 47, 41],
        [51, 266, 11, 10, 48, 44],
        [308, 263, 13, 11, 47, 45],
        [0, 197, 13, 16, 48, 48],
        [19, 196, 15, 16, 47, 49],
        [149, 242, 6, 13, 48, 50],
        [132, 213, 8, 15, 47, 50],
        [0, 139, 13, 22, 48, 42],
        [74, 115, 15, 24, 47, 41],
        [432, 156, 10, 20, 48, 43],
        [88, 139, 1, 2, 47, 47],
        [26, 139, 13, 22, 48, 42],
        [262, 131, 15, 23, 47, 41],
        [480, 155, 10, 20, 48, 44],
        [61, 139, 12, 21, 47, 44],
        [13, 139, 13, 22, 48, 42],
        [44, 115, 15, 24, 47, 41],
        [244, 154, 13, 20, 48, 43], null, [102, 138, 13, 22, 48, 42],
        [59, 115, 15, 24, 47, 41],
        [345, 173, 13, 18, 48, 46],
        [14, 244, 2, 2, 60, 61],
        [88, 227, 11, 14, 48, 42],
        [101, 196, 13, 16, 47, 41],
        [237, 304, 5, 6, 48, 42],
        [458, 298, 8, 6, 47, 41],
        [11, 305, 10, 5, 49, 44],
        [363, 276, 9, 8, 51, 43],
        [391, 275, 8, 9, 49, 47],
        [494, 283, 5, 8, 53, 49],
        [157, 231, 2, 3, 51, 50],
        [357, 304, 3, 6, 50, 49],
        [170, 227, 11, 14, 48, 42],
        [101, 196, 13, 16, 47, 41],
        [72, 266, 10, 10, 48, 44], null, [201, 227, 10, 14, 48, 42],
        [49, 196, 13, 16, 47, 41],
        [164, 276, 11, 8, 48, 45],
        [165, 284, 10, 7, 50, 47],
        [159, 227, 11, 14, 48, 42],
        [88, 196, 13, 16, 47, 41],
        [28, 241, 11, 13, 48, 43],
        [444, 133, 1, 1, 50, 49],
        [77, 227, 11, 14, 48, 42],
        [62, 196, 13, 16, 47, 41],
        [465, 263, 9, 11, 48, 45],
        [444, 133, 1, 1, 55, 48],
        [38, 254, 11, 12, 47, 43],
        [498, 209, 13, 15, 46, 42],
        [337, 274, 11, 9, 47, 43],
        [14, 254, 13, 12, 46, 42],
        [62, 266, 10, 10, 47, 44],
        [84, 284, 11, 7, 46, 48],
        [383, 275, 8, 9, 48, 46],
        [372, 276, 9, 8, 47, 48],
        [108, 299, 6, 6, 49, 47],
        [414, 275, 7, 9, 48, 48],
        [402, 272, 3, 3, 51, 48],
        [172, 310, 5, 5, 49, 48],
        [366, 153, 13, 20, 47, 42],
        [404, 136, 15, 22, 46, 41],
        [389, 131, 12, 5, 47, 42],
        [333, 298, 14, 6, 46, 41],
        [16, 227, 13, 14, 47, 45],
        [34, 196, 15, 16, 46, 45],
        [31, 212, 12, 15, 47, 47],
        [421, 210, 13, 15, 46, 48],
        [204, 266, 7, 10, 47, 49],
        [82, 298, 4, 7, 51, 53],
        [450, 275, 4, 9, 48, 50],
        [508, 263, 4, 10, 47, 50],
        [454, 59, 19, 24, 47, 42],
        [403, 86, 21, 26, 46, 41],
        [76, 160, 14, 19, 52, 42],
        [445, 109, 21, 25, 46, 41],
        [244, 131, 18, 23, 47, 43],
        [88, 139, 1, 2, 46, 47],
        [488, 133, 17, 22, 47, 44],
        [269, 173, 20, 18, 46, 49],
        [352, 153, 14, 20, 48, 46],
        [321, 153, 17, 20, 47, 47],
        [499, 83, 13, 23, 47, 42],
        [386, 106, 16, 25, 46, 41],
        [479, 314, 8, 4, 47, 42],
        [395, 298, 11, 6, 46, 41],
        [325, 274, 12, 9, 47, 44],
        [294, 263, 14, 11, 46, 44],
        [90, 160, 12, 19, 48, 46],
        [212, 180, 14, 17, 47, 48],
        [383, 177, 9, 18, 50, 47],
        [305, 173, 14, 18, 48, 48],
        [363, 304, 3, 6, 50, 48],
        [248, 284, 3, 7, 50, 49],
        [79, 319, 3, 4, 35, 34],
        [120, 134, 2, 4, 28, 34],
        [262, 304, 5, 6, 34, 33],
        [344, 304, 4, 6, 27, 33],
        [157, 228, 2, 3, 35, 35],
        [401, 131, 1, 3, 29, 35],
        [121, 144, 1, 1, 39, 35],
        [121, 144, 1, 1, 26, 35],
        [462, 322, 3, 3, 35, 35],
        [157, 228, 2, 3, 28, 35],
        [177, 310, 5, 5, 34, 34],
        [255, 310, 4, 5, 27, 34],
        [157, 228, 2, 3, 35, 35],
        [401, 131, 1, 3, 29, 35],
        [121, 144, 1, 1, 39, 35],
        [121, 144, 1, 1, 26, 35],
        [133, 325, 3, 2, 35, 36],
        [229, 236, 2, 2, 28, 36],
        [460, 318, 5, 4, 34, 35],
        [474, 318, 4, 4, 27, 35],
        [229, 236, 2, 2, 35, 36],
        [401, 134, 1, 2, 29, 36],
        [121, 144, 1, 1, 39, 35],
        [121, 144, 1, 1, 26, 35],
        [429, 175, 3, 1, 35, 37],
        [439, 155, 2, 1, 28, 37],
        [222, 322, 5, 3, 34, 36],
        [404, 322, 4, 3, 27, 36],
        [439, 155, 2, 1, 35, 37],
        [121, 143, 1, 1, 29, 37],
        [121, 144, 1, 1, 39, 36],
        [121, 144, 1, 1, 26, 36], null, null, [505, 324, 5, 2, 34, 37],
        [92, 325, 4, 2, 27, 37], null, null, [121, 144, 1, 1, 39, 37],
        [121, 144, 1, 1, 26, 37], null, null, [10, 325, 5, 2, 34, 37],
        [84, 325, 4, 2, 27, 37], null, null, [121, 144, 1, 1, 39, 37],
        [121, 144, 1, 1, 26, 37], null, [341, 315, 5, 4, 29, 38],
        [121, 143, 1, 1, 33, 41], null, [217, 310, 5, 5, 29, 38],
        [121, 143, 1, 1, 32, 42], null, [24, 319, 4, 4, 29, 38],
        [121, 143, 1, 1, 32, 42], null, [222, 310, 5, 5, 29, 38],
        [121, 143, 1, 1, 32, 42],
        [439, 192, 2, 1, 31, 42],
        [341, 315, 5, 4, 29, 38],
        [121, 143, 1, 1, 33, 41],
        [127, 325, 3, 2, 31, 41],
        [341, 315, 5, 4, 29, 38],
        [121, 143, 1, 1, 33, 41], null, [276, 315, 5, 4, 29, 38],
        [121, 143, 1, 1, 33, 42],
        [383, 298, 12, 6, 27, 33],
        [502, 298, 7, 6, 29, 33],
        [499, 106, 11, 3, 27, 39],
        [153, 276, 11, 8, 27, 34],
        [121, 143, 1, 1, 36, 40],
        [121, 143, 1, 1, 27, 40],
        [332, 304, 4, 6, 30, 27],
        [478, 283, 6, 8, 29, 25],
        [357, 310, 3, 5, 31, 28],
        [302, 304, 5, 6, 30, 27],
        [466, 298, 8, 6, 38, 48],
        [0, 277, 9, 8, 38, 47],
        [13, 197, 6, 16, 32, 54],
        [171, 197, 8, 16, 31, 55],
        [126, 197, 10, 16, 42, 54],
        [226, 180, 12, 17, 41, 54],
        [380, 195, 18, 16, 31, 41],
        [85, 179, 20, 17, 30, 41],
        [380, 240, 13, 13, 27, 31],
        [233, 209, 15, 15, 26, 30],
        [446, 275, 4, 9, 40, 28],
        [112, 267, 6, 10, 39, 27],
        [335, 310, 4, 5, 27, 28],
        [107, 285, 6, 7, 26, 27],
        [31, 284, 39, 7, 22, 66],
        [251, 274, 41, 9, 21, 65],
        [445, 86, 6, 17, 32, 53],
        [392, 177, 8, 18, 31, 53],
        [115, 138, 6, 17, 34, 53],
        [400, 177, 8, 18, 33, 53],
        [505, 133, 7, 18, 35, 52],
        [10, 161, 9, 19, 34, 52],
        [186, 197, 7, 16, 35, 51],
        [353, 191, 9, 17, 34, 51],
        [140, 213, 7, 15, 35, 51],
        [136, 197, 9, 16, 34, 51],
        [329, 237, 7, 14, 35, 51],
        [213, 212, 9, 15, 34, 51],
        [356, 237, 6, 14, 35, 52],
        [108, 213, 8, 15, 34, 52],
        [118, 242, 7, 13, 34, 53],
        [220, 227, 9, 14, 33, 53],
        [125, 242, 6, 13, 34, 53],
        [263, 237, 8, 14, 33, 53],
        [111, 255, 6, 12, 33, 53],
        [184, 241, 8, 13, 32, 53],
        [419, 264, 7, 11, 31, 52],
        [77, 254, 9, 12, 30, 52],
        [195, 254, 8, 12, 30, 51],
        [181, 227, 10, 14, 29, 50],
        [175, 241, 9, 13, 29, 51],
        [65, 212, 11, 15, 28, 50],
        [280, 191, 11, 17, 27, 51],
        [332, 173, 13, 18, 26, 51],
        [343, 191, 10, 17, 28, 52],
        [256, 174, 12, 18, 27, 52],
        [439, 193, 8, 17, 30, 53],
        [429, 176, 10, 18, 29, 53],
        [495, 238, 15, 13, 42, 51],
        [455, 224, 17, 14, 41, 51],
        [114, 197, 12, 16, 42, 51],
        [198, 180, 14, 17, 41, 51],
        [333, 191, 10, 17, 42, 50],
        [244, 174, 12, 18, 41, 50],
        [447, 193, 8, 17, 42, 49],
        [475, 175, 10, 18, 41, 49],
        [247, 192, 8, 17, 42, 49],
        [495, 175, 10, 18, 41, 49],
        [255, 192, 8, 17, 42, 49],
        [485, 175, 10, 18, 41, 49],
        [114, 160, 8, 18, 42, 50],
        [0, 161, 10, 19, 41, 50],
        [504, 57, 8, 19, 42, 51],
        [379, 153, 10, 20, 41, 51],
        [458, 134, 8, 19, 42, 51],
        [490, 155, 10, 20, 41, 51],
        [432, 136, 9, 19, 42, 51],
        [458, 155, 11, 20, 41, 51],
        [500, 155, 10, 20, 42, 50],
        [474, 32, 12, 21, 41, 50],
        [257, 154, 12, 20, 42, 49],
        [403, 39, 14, 21, 41, 49],
        [102, 160, 12, 19, 42, 49],
        [338, 153, 14, 20, 41, 49],
        [319, 173, 13, 18, 42, 49],
        [442, 156, 15, 19, 41, 49],
        [489, 224, 15, 14, 42, 50],
        [343, 208, 17, 15, 41, 50],
        [426, 239, 15, 13, 42, 51],
        [472, 224, 17, 14, 41, 51],
        [45, 325, 5, 2, 32, 68],
        [505, 191, 7, 2, 31, 69],
        [45, 325, 5, 2, 32, 68],
        [505, 191, 7, 2, 31, 69],
        [58, 323, 6, 2, 34, 68],
        [174, 319, 8, 3, 33, 68],
        [321, 315, 5, 4, 37, 66],
        [115, 155, 7, 5, 36, 66],
        [510, 151, 2, 5, 40, 62],
        [312, 304, 4, 6, 39, 62],
        [510, 151, 2, 5, 40, 61],
        [120, 128, 2, 6, 41, 61],
        [510, 151, 2, 5, 40, 60],
        [120, 128, 2, 6, 41, 60],
        [510, 156, 2, 5, 39, 61],
        [120, 115, 2, 7, 40, 60],
        [510, 156, 2, 5, 39, 61],
        [120, 115, 2, 7, 40, 60],
        [360, 310, 3, 5, 37, 61],
        [257, 304, 5, 6, 36, 61],
        [510, 156, 2, 5, 37, 60],
        [508, 291, 4, 7, 36, 59],
        [396, 322, 4, 3, 32, 60],
        [429, 309, 6, 5, 31, 59],
        [396, 322, 4, 3, 31, 60],
        [223, 315, 6, 4, 30, 60],
        [490, 324, 5, 2, 29, 62],
        [223, 315, 6, 4, 29, 61],
        [480, 324, 5, 2, 27, 66],
        [21, 323, 7, 2, 26, 67],
        [45, 325, 5, 2, 28, 67],
        [14, 323, 7, 2, 27, 68],
        [45, 325, 5, 2, 30, 68],
        [505, 191, 7, 2, 29, 69],
        [58, 323, 6, 2, 46, 68],
        [174, 319, 8, 3, 45, 68],
        [510, 165, 2, 4, 55, 60],
        [312, 304, 4, 6, 54, 59],
        [27, 299, 3, 6, 51, 61],
        [34, 298, 4, 7, 51, 61],
        [286, 315, 5, 4, 47, 63],
        [488, 298, 7, 6, 46, 62],
        [50, 325, 5, 2, 45, 64],
        [247, 315, 6, 4, 45, 63],
        [282, 322, 5, 3, 45, 63],
        [124, 322, 6, 3, 44, 64],
        [151, 315, 6, 4, 44, 62],
        [168, 305, 7, 5, 43, 62],
        [369, 319, 6, 3, 43, 65],
        [471, 314, 8, 4, 42, 65],
        [28, 323, 6, 2, 43, 68],
        [174, 319, 8, 3, 42, 68],
        [28, 323, 6, 2, 43, 68],
        [174, 319, 8, 3, 42, 68],
        [28, 323, 6, 2, 44, 68],
        [174, 319, 8, 3, 43, 68],
        [46, 323, 6, 2, 46, 68],
        [0, 315, 8, 4, 45, 67],
        [202, 322, 5, 3, 48, 66],
        [489, 309, 6, 5, 48, 65],
        [381, 314, 3, 5, 51, 63],
        [16, 220, 3, 7, 52, 62],
        [387, 314, 3, 5, 52, 62],
        [16, 213, 3, 7, 53, 61],
        [351, 310, 3, 5, 54, 59],
        [173, 298, 3, 7, 55, 58],
        [231, 216, 2, 4, 55, 60],
        [340, 304, 4, 6, 54, 59],
        [117, 255, 6, 12, 32, 58],
        [117, 228, 8, 14, 31, 57],
        [115, 325, 3, 2, 35, 58],
        [142, 322, 5, 3, 34, 57],
        [80, 325, 4, 2, 34, 60],
        [100, 322, 6, 3, 33, 59],
        [64, 325, 4, 2, 34, 62],
        [339, 319, 6, 3, 33, 61],
        [55, 325, 5, 2, 33, 64],
        [270, 319, 7, 3, 32, 63],
        [30, 325, 5, 2, 33, 66],
        [228, 319, 7, 3, 32, 65],
        [64, 323, 6, 2, 32, 68],
        [455, 314, 8, 4, 31, 67],
        [224, 251, 6, 13, 32, 57],
        [400, 211, 8, 15, 31, 56],
        [115, 325, 3, 2, 35, 57],
        [277, 322, 5, 3, 34, 56],
        [416, 322, 4, 3, 34, 59],
        [291, 319, 6, 3, 33, 59],
        [64, 325, 4, 2, 34, 62],
        [34, 323, 6, 2, 33, 62],
        [30, 325, 5, 2, 33, 64],
        [0, 323, 7, 2, 32, 64],
        [495, 324, 5, 2, 33, 66],
        [0, 323, 7, 2, 32, 66],
        [64, 323, 6, 2, 32, 68],
        [206, 319, 8, 3, 31, 68],
        [143, 242, 6, 13, 34, 57],
        [116, 213, 8, 15, 33, 56],
        [133, 325, 3, 2, 35, 57],
        [142, 322, 5, 3, 34, 56],
        [356, 322, 4, 3, 35, 59],
        [199, 315, 6, 4, 34, 58],
        [64, 325, 4, 2, 35, 62],
        [339, 319, 6, 3, 34, 61],
        [25, 325, 5, 2, 35, 64],
        [339, 319, 6, 3, 34, 63],
        [495, 324, 5, 2, 35, 66],
        [228, 319, 7, 3, 34, 65],
        [76, 323, 6, 2, 34, 68],
        [16, 315, 8, 4, 33, 67],
        [322, 237, 7, 14, 35, 56],
        [430, 194, 9, 16, 34, 55],
        [509, 54, 3, 3, 35, 56],
        [455, 318, 5, 4, 34, 55],
        [366, 314, 3, 5, 36, 57],
        [417, 55, 5, 5, 35, 57],
        [40, 319, 4, 4, 36, 60],
        [477, 309, 6, 5, 35, 59],
        [56, 319, 4, 4, 37, 62],
        [459, 309, 6, 5, 36, 61],
        [331, 315, 5, 4, 37, 64],
        [235, 315, 6, 4, 36, 64],
        [336, 315, 5, 4, 37, 66],
        [0, 299, 7, 6, 36, 65],
        [203, 254, 7, 12, 35, 55],
        [211, 227, 9, 14, 34, 54],
        [429, 175, 3, 1, 35, 55],
        [88, 323, 5, 2, 34, 54],
        [462, 322, 3, 3, 35, 56],
        [410, 318, 5, 4, 34, 55],
        [85, 319, 3, 4, 36, 58],
        [420, 318, 5, 4, 35, 58],
        [424, 322, 4, 3, 36, 61],
        [175, 315, 6, 4, 35, 60],
        [435, 318, 5, 4, 37, 62],
        [235, 315, 6, 4, 36, 62],
        [352, 322, 4, 3, 38, 64],
        [441, 309, 6, 5, 37, 63],
        [412, 264, 7, 11, 35, 55],
        [166, 241, 9, 13, 34, 54],
        [118, 325, 3, 2, 35, 55],
        [142, 322, 5, 3, 34, 54],
        [471, 322, 3, 3, 35, 56],
        [207, 322, 5, 3, 34, 56],
        [372, 314, 3, 5, 36, 57],
        [417, 55, 5, 5, 35, 57],
        [82, 319, 3, 4, 37, 60],
        [267, 310, 4, 5, 36, 59],
        [227, 310, 4, 5, 37, 61],
        [197, 304, 5, 6, 36, 60],
        [91, 319, 3, 4, 39, 62],
        [222, 304, 5, 6, 38, 61],
        [211, 266, 7, 10, 35, 55],
        [86, 254, 9, 12, 34, 54],
        [119, 178, 3, 1, 36, 55],
        [232, 322, 5, 3, 35, 54],
        [510, 173, 2, 2, 37, 56],
        [20, 325, 5, 2, 35, 56],
        [474, 322, 3, 3, 35, 57],
        [511, 7, 1, 4, 34, 57],
        [252, 322, 5, 3, 35, 59],
        [157, 310, 5, 5, 35, 58],
        [306, 315, 5, 4, 36, 60],
        [197, 304, 5, 6, 36, 59],
        [470, 318, 4, 4, 38, 61],
        [222, 304, 5, 6, 38, 60],
        [433, 264, 6, 11, 35, 55],
        [208, 241, 8, 13, 34, 54],
        [88, 143, 1, 2, 38, 55],
        [346, 315, 5, 4, 35, 54],
        [60, 325, 4, 2, 35, 56],
        [267, 322, 5, 3, 34, 56],
        [109, 325, 3, 2, 35, 58],
        [473, 80, 1, 3, 34, 58],
        [28, 319, 4, 4, 35, 59],
        [453, 309, 6, 5, 34, 59],
        [291, 310, 4, 5, 36, 60],
        [444, 133, 1, 1, 36, 64],
        [354, 310, 3, 5, 38, 61],
        [46, 291, 5, 7, 37, 60],
        [183, 266, 7, 10, 34, 56],
        [68, 254, 9, 12, 33, 55],
        [108, 212, 2, 1, 37, 56],
        [70, 323, 6, 2, 34, 55],
        [292, 322, 5, 3, 34, 57],
        [214, 319, 7, 3, 33, 57],
        [88, 325, 4, 2, 34, 59],
        [510, 241, 2, 2, 33, 60],
        [412, 322, 4, 3, 35, 60],
        [471, 309, 6, 5, 34, 59],
        [239, 310, 4, 5, 36, 60],
        [444, 133, 1, 1, 36, 64],
        [363, 310, 3, 5, 38, 61],
        [46, 291, 5, 7, 37, 60],
        [130, 267, 6, 10, 34, 56],
        [171, 254, 8, 12, 33, 55],
        [121, 143, 1, 1, 36, 56],
        [333, 319, 6, 3, 34, 55],
        [15, 325, 5, 2, 34, 57],
        [256, 319, 7, 3, 33, 57],
        [452, 322, 4, 3, 34, 58],
        [88, 139, 1, 2, 33, 60],
        [20, 319, 4, 4, 34, 59],
        [62, 310, 5, 5, 34, 59],
        [247, 310, 4, 5, 35, 60],
        [42, 310, 5, 5, 35, 60],
        [384, 314, 3, 5, 37, 61],
        [257, 304, 5, 6, 36, 61],
        [218, 266, 6, 10, 33, 55],
        [155, 254, 8, 12, 32, 54],
        [124, 325, 3, 2, 35, 55],
        [193, 315, 6, 4, 33, 54],
        [25, 325, 5, 2, 33, 56],
        [473, 80, 1, 3, 32, 56],
        [448, 322, 4, 3, 33, 58],
        [94, 322, 6, 3, 32, 58],
        [4, 319, 4, 4, 34, 59],
        [88, 139, 1, 2, 33, 61],
        [494, 318, 4, 4, 35, 60],
        [197, 304, 5, 6, 34, 59],
        [91, 319, 3, 4, 36, 61],
        [340, 304, 4, 6, 36, 60],
        [240, 275, 6, 9, 31, 54],
        [224, 264, 8, 11, 30, 53],
        [510, 245, 2, 2, 35, 54],
        [229, 315, 6, 4, 32, 53],
        [344, 322, 4, 3, 32, 54],
        [357, 319, 6, 3, 31, 54],
        [485, 324, 5, 2, 31, 56],
        [7, 323, 7, 2, 30, 56],
        [0, 325, 5, 2, 31, 58],
        [501, 322, 7, 2, 30, 58],
        [327, 322, 5, 3, 31, 59],
        [510, 241, 2, 2, 30, 60],
        [360, 322, 4, 3, 32, 60],
        [429, 309, 6, 5, 31, 59],
        [136, 267, 6, 10, 30, 53],
        [163, 254, 8, 12, 29, 52],
        [436, 322, 4, 3, 32, 53],
        [211, 315, 6, 4, 31, 52],
        [344, 322, 4, 3, 31, 54],
        [357, 319, 6, 3, 30, 54],
        [485, 324, 5, 2, 30, 56],
        [7, 323, 7, 2, 29, 56],
        [40, 325, 5, 2, 30, 58],
        [501, 322, 7, 2, 29, 58],
        [182, 322, 5, 3, 30, 59],
        [88, 139, 1, 2, 29, 60],
        [360, 322, 4, 3, 31, 60],
        [429, 309, 6, 5, 30, 59],
        [176, 266, 7, 10, 29, 54],
        [95, 254, 9, 12, 28, 53],
        [139, 325, 3, 2, 33, 54],
        [301, 315, 5, 4, 32, 53],
        [152, 322, 5, 3, 31, 54],
        [495, 309, 6, 5, 30, 54],
        [367, 237, 5, 3, 30, 56],
        [88, 139, 1, 2, 29, 56],
        [485, 324, 5, 2, 29, 58],
        [7, 323, 7, 2, 28, 58],
        [500, 324, 5, 2, 29, 60],
        [501, 322, 7, 2, 28, 60],
        [212, 322, 5, 3, 29, 61],
        [46, 315, 7, 4, 28, 61],
        [68, 241, 9, 13, 27, 55],
        [76, 212, 11, 15, 26, 54],
        [368, 322, 4, 3, 32, 55],
        [326, 315, 5, 4, 32, 54],
        [388, 322, 4, 3, 31, 57],
        [265, 315, 6, 4, 30, 56],
        [257, 322, 5, 3, 29, 59],
        [249, 319, 7, 3, 28, 59],
        [297, 322, 5, 3, 28, 61],
        [249, 319, 7, 3, 27, 61],
        [136, 322, 6, 3, 27, 63],
        [190, 319, 8, 3, 26, 63],
        [5, 325, 5, 2, 27, 66],
        [116, 315, 7, 4, 26, 65],
        [192, 241, 8, 13, 28, 56],
        [203, 212, 10, 15, 27, 55],
        [100, 325, 3, 2, 33, 56],
        [440, 318, 5, 4, 32, 55],
        [380, 322, 4, 3, 32, 57],
        [303, 319, 6, 3, 31, 57],
        [336, 322, 4, 3, 31, 59],
        [327, 319, 6, 3, 30, 59],
        [197, 322, 5, 3, 30, 61],
        [53, 315, 7, 4, 29, 61],
        [356, 315, 5, 4, 29, 63],
        [109, 315, 7, 4, 28, 63],
        [375, 208, 5, 3, 28, 66],
        [123, 315, 7, 4, 27, 66],
        [7, 242, 7, 13, 30, 57],
        [222, 212, 9, 15, 29, 56],
        [459, 322, 3, 3, 34, 57],
        [351, 315, 5, 4, 33, 56],
        [340, 322, 4, 3, 33, 59],
        [321, 319, 6, 3, 32, 59],
        [197, 322, 5, 3, 32, 61],
        [284, 319, 7, 3, 31, 61],
        [408, 322, 4, 3, 32, 63],
        [321, 319, 6, 3, 31, 63],
        [147, 322, 5, 3, 31, 65],
        [235, 319, 7, 3, 30, 65],
        [64, 323, 6, 2, 30, 68],
        [206, 319, 8, 3, 29, 68],
        [149, 228, 8, 14, 44, 56],
        [302, 191, 11, 17, 42, 54],
        [157, 322, 5, 3, 44, 56],
        [98, 305, 8, 5, 42, 54],
        [502, 318, 4, 4, 46, 57],
        [24, 310, 6, 5, 45, 57],
        [72, 319, 4, 4, 47, 60],
        [477, 309, 6, 5, 46, 59],
        [291, 315, 5, 4, 47, 62],
        [422, 309, 7, 5, 46, 61],
        [162, 322, 5, 3, 47, 65],
        [39, 315, 7, 4, 46, 64],
        [309, 319, 6, 3, 46, 67],
        [146, 305, 8, 5, 45, 66],
        [466, 274, 11, 9, 46, 55],
        [380, 253, 14, 12, 44, 53],
        [167, 322, 5, 3, 46, 55],
        [14, 299, 7, 6, 44, 53],
        [44, 319, 4, 4, 48, 56],
        [292, 304, 5, 6, 48, 55],
        [47, 310, 5, 5, 49, 57],
        [42, 310, 5, 5, 49, 57],
        [32, 319, 4, 4, 51, 59],
        [132, 299, 6, 6, 50, 58],
        [57, 310, 5, 5, 52, 59],
        [282, 304, 5, 6, 52, 59],
        [387, 319, 3, 3, 54, 61],
        [339, 310, 4, 5, 54, 60],
        [483, 263, 9, 11, 45, 56],
        [54, 227, 12, 14, 43, 54],
        [177, 322, 5, 3, 45, 56],
        [175, 305, 7, 5, 43, 54],
        [76, 319, 3, 4, 47, 57],
        [87, 310, 5, 5, 46, 56],
        [259, 310, 4, 5, 48, 58],
        [272, 304, 5, 6, 47, 58],
        [271, 310, 4, 5, 49, 60],
        [95, 285, 6, 7, 48, 59],
        [275, 310, 4, 5, 50, 61],
        [267, 304, 5, 6, 50, 61],
        [88, 319, 3, 4, 51, 63],
        [324, 304, 4, 6, 51, 62],
        [238, 180, 6, 12, 46, 55],
        [191, 227, 10, 14, 43, 54],
        [468, 322, 3, 3, 46, 55],
        [88, 315, 7, 4, 43, 54],
        [478, 318, 4, 4, 46, 56],
        [430, 318, 5, 4, 45, 56],
        [425, 318, 5, 4, 46, 58],
        [7, 299, 7, 6, 45, 57],
        [122, 310, 5, 5, 46, 60],
        [366, 309, 7, 5, 45, 60],
        [405, 318, 5, 4, 47, 62],
        [373, 309, 7, 5, 46, 61],
        [390, 318, 5, 4, 47, 63],
        [380, 309, 7, 5, 46, 63],
        [134, 255, 5, 12, 45, 54],
        [271, 237, 8, 14, 43, 53],
        [121, 325, 3, 2, 46, 54],
        [221, 319, 7, 3, 43, 53],
        [372, 322, 4, 3, 46, 55],
        [339, 319, 6, 3, 45, 55],
        [281, 315, 5, 4, 45, 57],
        [137, 315, 7, 4, 44, 57],
        [271, 315, 5, 4, 45, 59],
        [39, 315, 7, 4, 44, 59],
        [262, 322, 5, 3, 45, 62],
        [60, 315, 7, 4, 44, 61],
        [76, 325, 4, 2, 46, 64],
        [112, 322, 6, 3, 45, 64],
        [129, 255, 5, 12, 45, 54],
        [133, 228, 8, 14, 43, 53],
        [103, 325, 3, 2, 46, 54],
        [205, 315, 6, 4, 43, 53],
        [400, 318, 5, 4, 45, 55],
        [394, 309, 7, 5, 44, 54],
        [415, 318, 5, 4, 45, 56],
        [102, 315, 7, 4, 44, 56],
        [450, 318, 5, 4, 45, 58],
        [39, 315, 7, 4, 44, 58],
        [272, 322, 5, 3, 45, 61],
        [60, 315, 7, 4, 44, 60],
        [287, 322, 5, 3, 45, 63],
        [46, 315, 7, 4, 44, 63],
        [123, 255, 6, 12, 44, 54],
        [125, 228, 8, 14, 43, 53],
        [121, 325, 3, 2, 46, 54],
        [297, 319, 6, 3, 43, 53],
        [372, 322, 4, 3, 46, 55],
        [175, 315, 6, 4, 45, 54],
        [372, 322, 4, 3, 46, 57],
        [351, 319, 6, 3, 45, 56],
        [307, 322, 5, 3, 45, 59],
        [228, 319, 7, 3, 44, 58],
        [381, 319, 6, 3, 44, 61],
        [182, 319, 8, 3, 43, 60],
        [106, 322, 6, 3, 44, 63],
        [82, 305, 8, 5, 43, 62],
        [0, 242, 7, 13, 43, 55],
        [154, 197, 9, 16, 42, 53],
        [508, 322, 4, 2, 45, 55],
        [130, 315, 7, 4, 43, 53],
        [364, 322, 4, 3, 46, 56],
        [130, 322, 6, 3, 45, 56],
        [192, 322, 5, 3, 45, 58],
        [242, 319, 7, 3, 44, 58],
        [322, 322, 5, 3, 45, 60],
        [228, 319, 7, 3, 44, 60],
        [375, 319, 6, 3, 44, 63],
        [24, 315, 8, 4, 43, 62],
        [315, 319, 6, 3, 43, 65],
        [74, 305, 8, 5, 42, 64],
        [343, 237, 7, 14, 43, 56],
        [238, 192, 9, 17, 42, 54],
        [420, 322, 4, 3, 44, 56],
        [408, 309, 7, 5, 42, 54],
        [281, 315, 5, 4, 45, 57],
        [415, 309, 7, 5, 44, 56],
        [271, 315, 5, 4, 45, 59],
        [60, 315, 7, 4, 44, 59],
        [383, 173, 6, 4, 44, 62],
        [487, 314, 8, 4, 43, 62],
        [74, 315, 7, 4, 43, 64],
        [420, 314, 9, 4, 42, 64],
        [263, 319, 7, 3, 43, 67],
        [429, 314, 9, 4, 42, 67],
        [315, 237, 7, 14, 43, 56],
        [371, 191, 9, 17, 42, 54],
        [420, 322, 4, 3, 44, 56],
        [408, 309, 7, 5, 42, 54],
        [400, 322, 4, 3, 46, 57],
        [157, 315, 6, 4, 45, 56],
        [311, 315, 5, 4, 45, 59],
        [32, 315, 7, 4, 44, 59],
        [241, 315, 6, 4, 44, 62],
        [447, 314, 8, 4, 43, 62],
        [74, 315, 7, 4, 43, 64],
        [420, 314, 9, 4, 42, 64],
        [263, 319, 7, 3, 43, 67],
        [429, 314, 9, 4, 42, 67],
        [336, 237, 7, 14, 44, 56],
        [313, 191, 10, 17, 42, 54],
        [317, 322, 5, 3, 44, 56],
        [58, 305, 8, 5, 42, 54],
        [16, 319, 4, 4, 46, 57],
        [169, 315, 6, 4, 45, 57],
        [302, 322, 5, 3, 46, 60],
        [67, 315, 7, 4, 45, 59],
        [241, 315, 6, 4, 45, 62],
        [447, 314, 8, 4, 44, 62],
        [253, 315, 6, 4, 45, 64],
        [495, 314, 8, 4, 44, 64],
        [263, 319, 7, 3, 44, 67],
        [429, 314, 9, 4, 43, 67],
        [8, 213, 8, 15, 44, 55],
        [442, 175, 11, 18, 42, 53],
        [345, 319, 6, 3, 44, 55],
        [40, 305, 9, 5, 42, 53],
        [432, 322, 4, 3, 46, 56],
        [163, 315, 6, 4, 45, 56],
        [332, 322, 4, 3, 47, 58],
        [169, 315, 6, 4, 46, 58],
        [311, 310, 4, 5, 47, 60],
        [0, 310, 6, 5, 46, 60],
        [21, 299, 6, 6, 46, 62],
        [450, 298, 8, 6, 45, 62],
        [18, 310, 6, 5, 46, 65],
        [442, 298, 8, 6, 45, 65],
        [447, 210, 8, 15, 46, 54],
        [464, 175, 11, 18, 44, 52],
        [112, 325, 3, 2, 46, 54],
        [36, 310, 6, 5, 44, 52],
        [505, 151, 5, 4, 47, 55],
        [120, 299, 6, 6, 47, 54],
        [482, 318, 4, 4, 48, 57],
        [447, 309, 6, 5, 47, 57],
        [202, 310, 5, 5, 48, 59],
        [481, 298, 7, 6, 47, 59],
        [465, 309, 6, 5, 48, 62],
        [405, 284, 7, 7, 47, 61],
        [192, 310, 5, 5, 49, 64],
        [391, 284, 7, 7, 48, 63],
        [147, 213, 7, 15, 47, 53],
        [453, 175, 11, 18, 44, 51],
        [477, 322, 3, 3, 47, 53],
        [401, 309, 7, 5, 44, 51],
        [498, 318, 4, 4, 48, 54],
        [483, 309, 6, 5, 47, 53],
        [76, 319, 3, 4, 49, 57],
        [417, 55, 5, 5, 48, 56],
        [158, 298, 4, 7, 49, 58],
        [418, 284, 6, 7, 48, 58],
        [360, 304, 3, 6, 50, 61],
        [258, 291, 5, 7, 49, 60],
        [354, 304, 3, 6, 51, 62],
        [283, 291, 5, 7, 50, 62],
        [141, 228, 8, 14, 47, 53],
        [268, 191, 12, 17, 44, 51],
        [444, 322, 4, 3, 47, 53],
        [434, 298, 8, 6, 44, 51],
        [48, 319, 4, 4, 48, 54],
        [87, 310, 5, 5, 48, 54],
        [392, 322, 4, 3, 49, 57],
        [477, 309, 6, 5, 48, 56],
        [307, 304, 5, 6, 49, 58],
        [191, 304, 6, 6, 48, 58],
        [343, 310, 4, 5, 50, 61],
        [412, 284, 6, 7, 49, 60],
        [470, 318, 4, 4, 51, 63],
        [222, 304, 5, 6, 51, 62],
        [455, 263, 10, 11, 47, 53],
        [423, 225, 14, 14, 44, 51],
        [247, 322, 5, 3, 47, 53],
        [66, 305, 8, 5, 44, 51],
        [242, 322, 5, 3, 48, 54],
        [144, 315, 7, 4, 47, 53],
        [0, 319, 4, 4, 50, 55],
        [6, 310, 6, 5, 49, 55],
        [0, 319, 4, 4, 51, 57],
        [212, 304, 5, 6, 50, 57],
        [64, 319, 4, 4, 52, 59],
        [444, 133, 1, 1, 52, 63],
        [327, 310, 4, 5, 53, 59],
        [308, 291, 5, 7, 53, 58],
        [29, 266, 11, 10, 46, 54],
        [441, 239, 14, 13, 44, 52],
        [237, 322, 5, 3, 46, 54],
        [474, 298, 7, 6, 44, 52],
        [44, 319, 4, 4, 48, 55],
        [292, 304, 5, 6, 48, 54],
        [47, 310, 5, 5, 49, 56],
        [42, 310, 5, 5, 49, 56],
        [32, 319, 4, 4, 51, 58],
        [102, 299, 6, 6, 50, 57],
        [287, 310, 4, 5, 52, 59],
        [136, 325, 3, 2, 52, 63],
        [510, 169, 2, 4, 55, 60],
        [509, 298, 3, 6, 55, 59],
        [73, 159, 10, 1, 27, 38],
        [106, 319, 12, 3, 26, 37], null, [118, 319, 12, 3, 26, 37], null, [432, 155, 7, 1, 28, 38],
        [130, 319, 9, 3, 27, 37], null, [439, 155, 2, 1, 43, 31], null, [229, 233, 2, 3, 43, 30], null, [229, 236, 2, 2, 43, 30], null, [231, 220, 2, 4, 43, 30], null, [117, 310, 5, 5, 41, 31], null, [121, 143, 1, 1, 43, 33], null, [73, 139, 15, 20, 39, 20],
        [441, 134, 17, 22, 38, 19],
        [474, 57, 30, 26, 26, 17],
        [422, 32, 32, 28, 25, 16],
        [248, 209, 15, 15, 41, 18],
        [59, 160, 17, 19, 40, 16],
        [200, 241, 8, 13, 43, 17], null, [14, 266, 15, 10, 41, 19], null, [424, 86, 21, 26, 26, 17],
        [486, 29, 23, 28, 25, 16],
        [455, 209, 15, 15, 41, 17],
        [105, 179, 16, 17, 41, 16],
        [86, 241, 9, 13, 41, 20],
        [398, 195, 10, 16, 40, 19],
        [367, 240, 13, 13, 43, 18], null, [424, 86, 21, 26, 26, 17],
        [486, 29, 23, 28, 25, 16],
        [434, 210, 13, 15, 43, 17],
        [137, 180, 16, 17, 41, 16],
        [86, 241, 9, 13, 41, 20],
        [398, 195, 10, 16, 40, 19],
        [332, 263, 11, 11, 41, 19],
        [384, 322, 4, 3, 49, 28],
        [424, 86, 21, 26, 26, 17],
        [486, 29, 23, 28, 25, 16],
        [22, 115, 22, 24, 32, 12],
        [427, 60, 24, 26, 31, 11],
        [466, 109, 22, 24, 32, 12],
        [451, 83, 24, 26, 31, 11],
        [353, 263, 10, 11, 38, 19],
        [27, 254, 11, 12, 38, 19],
        [0, 115, 22, 24, 32, 12],
        [316, 106, 24, 25, 31, 12],
        [353, 263, 10, 11, 38, 19],
        [27, 254, 11, 12, 38, 19],
        [488, 109, 22, 24, 32, 12],
        [403, 60, 24, 26, 31, 11],
        [375, 211, 13, 15, 41, 12],
        [183, 180, 15, 17, 40, 11],
        [394, 253, 11, 12, 38, 18],
        [393, 240, 12, 13, 38, 18],
        [251, 238, 12, 13, 40, 15],
        [29, 227, 13, 14, 39, 15],
        [470, 209, 14, 15, 32, 21],
        [121, 180, 16, 17, 31, 20],
        [402, 112, 22, 24, 32, 12],
        [475, 83, 24, 26, 31, 11],
        [353, 263, 10, 11, 38, 19],
        [27, 254, 11, 12, 38, 19],
        [408, 210, 13, 15, 40, 12],
        [323, 191, 10, 17, 42, 11],
        [277, 319, 7, 3, 31, 46],
        [49, 305, 9, 5, 30, 45],
        [441, 133, 3, 1, 31, 48],
        [172, 322, 5, 3, 30, 47],
        [40, 323, 6, 2, 32, 46],
        [463, 314, 8, 4, 31, 45],
        [287, 237, 7, 14, 31, 45],
        [362, 191, 9, 17, 30, 44],
        [230, 251, 6, 13, 32, 46],
        [179, 197, 7, 16, 31, 45],
        [0, 255, 7, 12, 31, 45],
        [184, 213, 9, 14, 30, 44],
        [441, 112, 4, 11, 34, 46],
        [242, 251, 5, 13, 33, 45],
        [508, 0, 3, 12, 33, 47],
        [362, 237, 5, 14, 32, 47],
        [60, 319, 4, 4, 31, 46],
        [90, 299, 6, 6, 30, 45],
        [438, 275, 4, 9, 34, 45],
        [142, 267, 6, 10, 33, 44],
        [294, 237, 7, 14, 31, 45],
        [145, 197, 9, 16, 30, 44],
        [137, 242, 6, 13, 32, 46],
        [163, 197, 8, 16, 31, 45],
        [439, 264, 6, 11, 32, 46],
        [216, 241, 8, 13, 31, 45],
        [509, 44, 3, 10, 32, 47],
        [233, 197, 5, 12, 31, 46],
        [229, 227, 2, 3, 36, 46],
        [90, 305, 8, 5, 31, 45],
        [451, 60, 3, 10, 32, 47],
        [144, 255, 5, 12, 31, 46],
        [229, 227, 2, 3, 36, 46],
        [90, 305, 8, 5, 31, 45],
        [510, 127, 2, 6, 32, 50],
        [38, 298, 4, 7, 31, 49],
        [155, 244, 2, 2, 33, 47],
        [8, 319, 4, 4, 32, 46],
        [229, 227, 2, 3, 36, 46],
        [90, 305, 8, 5, 31, 45],
        [121, 145, 1, 1, 33, 50],
        [52, 319, 4, 4, 31, 49],
        [157, 234, 2, 3, 32, 51],
        [283, 310, 4, 5, 31, 50],
        [157, 234, 2, 3, 32, 53],
        [506, 318, 4, 4, 31, 52],
        [401, 134, 1, 2, 33, 55],
        [380, 191, 3, 4, 32, 54],
        [429, 158, 3, 9, 32, 47],
        [149, 255, 5, 12, 31, 46],
        [229, 227, 2, 3, 36, 46],
        [90, 305, 8, 5, 31, 45],
        [120, 122, 2, 6, 32, 51],
        [23, 284, 4, 8, 31, 49],
        [121, 143, 1, 1, 31, 45],
        [372, 223, 3, 3, 30, 44],
        [244, 106, 47, 25, 48, 151],
        [403, 0, 19, 39, 63, 122],
        [0, 0, 122, 115, 17, 9],
        [455, 193, 47, 16, 48, 161],
        [122, 106, 122, 74, 14, 122],
        [399, 275, 8, 9, 0, 0],
        [198, 319, 8, 3, 0, 7],
        [122, 0, 281, 106, 0, 0],
        [277, 153, 22, 20, 0, 0],
        [229, 238, 22, 13, 0, 9],
        [89, 115, 31, 23, 0, 0],
        [247, 263, 31, 11, 0, 14],
        [291, 106, 25, 25, 1, 1],
        [366, 304, 21, 5, 3, 22],
        [472, 283, 6, 8, 0, 0],
        [275, 283, 8, 8, 0, 0],
        [120, 277, 8, 8, 0, 0],
        [241, 284, 7, 7, 0, 0],
        [363, 284, 7, 7, 0, 0],
        [298, 283, 7, 8, 0, 0],
        [319, 283, 7, 8, 0, 0],
        [68, 319, 4, 4, 0, 2],
        [96, 277, 8, 8, 0, 0],
        [138, 299, 6, 6, 0, 1],
        [128, 277, 8, 8, 0, 0],
        [283, 283, 8, 8, 0, 0],
        [466, 283, 6, 8, 0, 0],
        [267, 283, 8, 8, 0, 0],
        [259, 283, 8, 8, 0, 0],
        [216, 276, 8, 8, 0, 0],
        [377, 284, 7, 7, 0, 0],
        [398, 284, 7, 7, 0, 0],
        [351, 283, 6, 8, 0, 0],
        [430, 284, 6, 7, 0, 0],
        [504, 76, 8, 7, 0, 0],
        [104, 277, 8, 8, 0, 0],
        [363, 319, 6, 3, 0, 4],
        [136, 277, 8, 8, 0, 0],
        [0, 285, 6, 7, 0, 0],
        [448, 284, 6, 7, 0, 0],
        [387, 309, 7, 5, 0, 1],
        [161, 305, 7, 5, 0, 1],
        [81, 315, 7, 4, 0, 2],
        [130, 305, 8, 5, 0, 1],
        [122, 305, 8, 5, 0, 1],
        [114, 305, 8, 5, 0, 1],
        [511, 0, 1, 7, 0, 0],
        [348, 322, 4, 3, 0, 0],
        [188, 291, 5, 7, 0, 0],
        [193, 291, 5, 7, 0, 0],
        [233, 291, 5, 7, 0, 0],
        [263, 291, 5, 7, 0, 0],
        [510, 238, 2, 3, 0, 0],
        [150, 298, 4, 7, 0, 0],
        [146, 298, 4, 7, 0, 0],
        [376, 322, 4, 3, 0, 2],
        [67, 310, 5, 5, 0, 1],
        [401, 131, 1, 3, 0, 5],
        [114, 178, 5, 1, 0, 3],
        [401, 134, 1, 2, 0, 5],
        [293, 291, 5, 7, 0, 0],
        [76, 291, 5, 7, 0, 0],
        [368, 291, 5, 7, 0, 0],
        [378, 291, 5, 7, 0, 0],
        [168, 291, 5, 7, 0, 0],
        [398, 291, 5, 7, 0, 0],
        [413, 291, 5, 7, 0, 0],
        [443, 291, 5, 7, 0, 0],
        [448, 291, 5, 7, 0, 0],
        [453, 291, 5, 7, 0, 0],
        [458, 291, 5, 7, 0, 0],
        [508, 23, 1, 6, 0, 1],
        [473, 66, 1, 7, 0, 1],
        [50, 298, 4, 7, 0, 0],
        [361, 315, 5, 4, 0, 2],
        [46, 298, 4, 7, 0, 0],
        [473, 291, 5, 7, 0, 0],
        [442, 284, 6, 7, 0, 0],
        [213, 291, 5, 7, 0, 0],
        [478, 291, 5, 7, 0, 0],
        [56, 291, 5, 7, 0, 0],
        [493, 291, 5, 7, 0, 0],
        [183, 291, 5, 7, 0, 0],
        [5, 292, 5, 7, 0, 0],
        [121, 292, 5, 7, 0, 0],
        [118, 285, 5, 7, 0, 0],
        [179, 298, 3, 7, 0, 0],
        [141, 292, 5, 7, 0, 0],
        [86, 291, 5, 7, 0, 0],
        [136, 292, 5, 7, 0, 0],
        [126, 292, 5, 7, 0, 0],
        [116, 292, 5, 7, 0, 0],
        [76, 291, 5, 7, 0, 0],
        [111, 292, 5, 7, 0, 0],
        [106, 292, 5, 7, 0, 0],
        [101, 292, 5, 7, 0, 0],
        [96, 292, 5, 7, 0, 0],
        [51, 291, 5, 7, 0, 0],
        [91, 292, 5, 7, 0, 0],
        [25, 292, 5, 7, 0, 0],
        [20, 292, 5, 7, 0, 0],
        [133, 285, 5, 7, 0, 0],
        [15, 292, 5, 7, 0, 0],
        [10, 292, 5, 7, 0, 0],
        [402, 265, 3, 7, 0, 0],
        [0, 292, 5, 7, 0, 0],
        [170, 298, 3, 7, 0, 0],
        [312, 322, 5, 3, 0, 0],
        [114, 178, 5, 1, 0, 7],
        [157, 237, 2, 3, 0, 0],
        [72, 310, 5, 5, 0, 2],
        [503, 291, 5, 7, 0, 0],
        [77, 310, 5, 5, 0, 2],
        [498, 291, 5, 7, 0, 0],
        [82, 310, 5, 5, 0, 2],
        [74, 298, 4, 7, 0, 0],
        [297, 304, 5, 6, 0, 2],
        [483, 291, 5, 7, 0, 0],
        [473, 73, 1, 7, 0, 0],
        [499, 283, 5, 8, 0, 0],
        [42, 298, 4, 7, 0, 0],
        [510, 120, 2, 7, 0, 0],
        [97, 310, 5, 5, 0, 2],
        [102, 310, 5, 5, 0, 2],
        [107, 310, 5, 5, 0, 2],
        [202, 304, 5, 6, 0, 2],
        [217, 304, 5, 6, 0, 2],
        [112, 310, 5, 5, 0, 2],
        [127, 310, 5, 5, 0, 2],
        [405, 240, 3, 7, 0, 0],
        [132, 310, 5, 5, 0, 2],
        [137, 310, 5, 5, 0, 2],
        [147, 310, 5, 5, 0, 2],
        [507, 304, 5, 5, 0, 2],
        [227, 304, 5, 6, 0, 2],
        [152, 310, 5, 5, 0, 2],
        [62, 298, 4, 7, 0, 0],
        [473, 59, 1, 7, 0, 0],
        [70, 298, 4, 7, 0, 0],
        [82, 323, 6, 2, 0, 0],
        [162, 310, 5, 5, 0, 2],
        [504, 283, 5, 8, 0, 0],
        [113, 285, 5, 7, 0, 0],
        [428, 291, 5, 7, 0, 0],
        [423, 291, 5, 7, 0, 0],
        [418, 291, 5, 7, 0, 0],
        [408, 291, 5, 7, 0, 0],
        [403, 291, 5, 7, 0, 0],
        [393, 291, 5, 7, 0, 1],
        [388, 291, 5, 7, 0, 0],
        [178, 291, 5, 7, 0, 0],
        [383, 291, 5, 7, 0, 0],
        [182, 298, 3, 7, 0, 0],
        [373, 291, 5, 7, 0, 0],
        [510, 113, 2, 7, 0, 0],
        [363, 291, 5, 7, 0, 0],
        [358, 291, 5, 7, 0, 0],
        [353, 291, 5, 7, 0, 0],
        [167, 310, 5, 5, 0, 2],
        [348, 291, 5, 7, 0, 0],
        [343, 291, 5, 7, 0, 0],
        [338, 291, 5, 7, 0, 0],
        [333, 291, 5, 7, 0, 0],
        [328, 291, 5, 7, 0, 0],
        [323, 291, 5, 7, 0, 0],
        [489, 283, 5, 8, 0, 0],
        [303, 291, 5, 7, 0, 0],
        [298, 291, 5, 7, 0, 0],
        [242, 304, 5, 6, 0, 2],
        [288, 291, 5, 7, 0, 0],
        [278, 291, 5, 7, 0, 0],
        [456, 322, 3, 3, 0, 2],
        [9, 277, 5, 8, 0, 0],
        [268, 291, 5, 7, 0, 0],
        [510, 106, 2, 7, 0, 0],
        [253, 291, 5, 7, 0, 0],
        [248, 291, 5, 7, 0, 0],
        [243, 291, 5, 7, 0, 0],
        [238, 291, 5, 7, 0, 0],
        [277, 304, 5, 6, 0, 0],
        [287, 304, 5, 6, 0, 0],
        [223, 291, 5, 7, 0, 0],
        [12, 310, 6, 5, 0, 1],
        [187, 322, 5, 3, 0, 3],
        [218, 291, 5, 7, 0, 0],
        [14, 284, 5, 8, 0, 0],
        [402, 106, 1, 6, 0, 1],
        [182, 310, 5, 5, 0, 1],
        [187, 310, 5, 5, 0, 1],
        [213, 291, 5, 7, 0, 0],
        [197, 310, 5, 5, 0, 2],
        [208, 291, 5, 7, 0, 0],
        [203, 291, 5, 7, 0, 0],
        [198, 291, 5, 7, 0, 0],
        [279, 310, 4, 5, 0, 2],
        [162, 298, 4, 7, 0, 0],
        [375, 314, 3, 5, 0, 2],
        [339, 283, 6, 8, 0, 0],
        [207, 304, 5, 6, 0, 2],
        [183, 291, 5, 7, 0, 0],
        [82, 310, 5, 5, 0, 2],
        [183, 291, 5, 7, 0, 0],
        [178, 291, 5, 7, 0, 0],
        [173, 291, 5, 7, 0, 0],
        [207, 310, 5, 5, 0, 2],
        [168, 291, 5, 7, 0, 0],
        [299, 310, 4, 5, 0, 2],
        [163, 291, 5, 7, 0, 0],
        [303, 310, 4, 5, 0, 2],
        [158, 291, 5, 7, 0, 0],
        [166, 298, 4, 7, 0, 0],
        [86, 291, 5, 7, 0, 0],
        [307, 310, 4, 5, 0, 2],
        [81, 291, 5, 7, 0, 0],
        [315, 310, 4, 5, 0, 2],
        [227, 284, 7, 7, 0, 0],
        [212, 310, 5, 5, 0, 2],
        [118, 285, 5, 7, 0, 0],
        [323, 310, 4, 5, 0, 2],
        [76, 291, 5, 7, 0, 0],
        [107, 310, 5, 5, 0, 2],
        [71, 291, 5, 7, 0, 0],
        [331, 310, 4, 5, 0, 2],
        [66, 291, 5, 7, 0, 0],
        [336, 304, 4, 6, 0, 2],
        [56, 291, 5, 7, 0, 0],
        [77, 310, 5, 5, 0, 2],
        [51, 291, 5, 7, 0, 0],
        [378, 314, 3, 5, 0, 2],
        [41, 291, 5, 7, 0, 0],
        [328, 304, 4, 6, 0, 2],
        [36, 291, 5, 7, 0, 0],
        [138, 285, 5, 7, 0, 1],
        [133, 285, 5, 7, 0, 0],
        [507, 304, 5, 5, 0, 2],
        [357, 283, 6, 8, 0, 0],
        [185, 304, 6, 6, 0, 2],
        [123, 285, 5, 7, 0, 0],
        [347, 310, 4, 5, 0, 2],
        [384, 284, 7, 7, 0, 0],
        [142, 310, 5, 5, 0, 2],
        [112, 277, 8, 8, 0, 0],
        [96, 299, 6, 6, 0, 2],
        [61, 291, 5, 7, 0, 0],
        [52, 310, 5, 5, 0, 2],
        [424, 284, 6, 7, 0, 0],
        [501, 309, 6, 5, 0, 2],
        [30, 298, 4, 7, 0, 0],
        [243, 310, 4, 5, 0, 2],
        [148, 291, 5, 7, 0, 0],
        [263, 310, 4, 5, 0, 2],
        [101, 285, 6, 7, 0, 0],
        [92, 310, 5, 5, 0, 2],
        [131, 292, 5, 7, 0, 0],
        [295, 310, 4, 5, 0, 2],
        [345, 283, 6, 8, 0, 0],
        [445, 103, 6, 6, 0, 2],
        [488, 291, 5, 7, 0, 0],
        [488, 291, 5, 7, 0, 0],
        [333, 283, 6, 8, 0, 0],
        [114, 299, 6, 6, 0, 2],
        [468, 291, 5, 7, 0, 0],
        [463, 291, 5, 7, 0, 0],
        [438, 291, 5, 7, 0, 0],
        [438, 291, 5, 7, 0, 0],
        [313, 291, 5, 7, 0, 0],
        [313, 291, 5, 7, 0, 0],
        [228, 291, 5, 7, 0, 0],
        [228, 291, 5, 7, 0, 0],
        [6, 285, 6, 7, 0, 0],
        [509, 283, 3, 7, 0, 0],
        [31, 291, 5, 7, 0, 0],
        [370, 284, 7, 7, 0, 0],
        [273, 291, 5, 7, 0, 0],
        [318, 291, 5, 7, 0, 0],
        [234, 284, 7, 7, 0, 0],
        [454, 0, 32, 32, 0, 0],
        [422, 0, 32, 32, 0, 0],
        [144, 277, 8, 8, 0, 1],
        [227, 322, 5, 3, 0, 0],
        [316, 315, 5, 4, 0, 0],
        [121, 143, 1, 1, 0, 0],
        [505, 274, 7, 9, 0, 0],
        [477, 274, 10, 9, 0, 0],
        [219, 284, 8, 7, 0, 1],
        [40, 266, 11, 10, 0, 1],
        [82, 266, 9, 10, 1, 2],
        [40, 266, 11, 10, 0, 1],
        [348, 274, 11, 9, 0, 1]
      ].map(r),
      $ = [null, [385, 106, 12, 8, 29, 28],
        [404, 221, 12, 8, 29, 28],
        [428, 221, 12, 8, 29, 28],
        [392, 221, 12, 8, 29, 28],
        [416, 221, 12, 8, 29, 28],
        [380, 221, 12, 8, 29, 28],
        [385, 106, 12, 8, 29, 28],
        [404, 221, 12, 8, 29, 28],
        [428, 221, 12, 8, 29, 28],
        [392, 221, 12, 8, 29, 28],
        [416, 221, 12, 8, 29, 28],
        [380, 221, 12, 8, 29, 28],
        [383, 176, 10, 17, 34, 26],
        [393, 176, 10, 17, 34, 26],
        [68, 221, 12, 9, 30, 27],
        [80, 221, 12, 9, 30, 27],
        [507, 181, 5, 6, 31, 28],
        [507, 175, 5, 6, 31, 28],
        [116, 159, 5, 7, 31, 29],
        [507, 150, 5, 7, 31, 29],
        [22, 160, 22, 17, 20, 19],
        [384, 159, 22, 17, 20, 19],
        [44, 160, 22, 17, 20, 19],
        [0, 161, 22, 17, 20, 19],
        [339, 171, 22, 17, 20, 19],
        [361, 171, 22, 17, 20, 19],
        [22, 160, 22, 17, 20, 19],
        [384, 159, 22, 17, 20, 19],
        [44, 160, 22, 17, 20, 19],
        [0, 161, 22, 17, 20, 19],
        [339, 171, 22, 17, 20, 19],
        [361, 171, 22, 17, 20, 19],
        [44, 139, 22, 21, 20, 22],
        [22, 139, 22, 21, 20, 22],
        [178, 196, 21, 14, 21, 22],
        [263, 204, 21, 14, 21, 22],
        [47, 208, 18, 13, 24, 20],
        [29, 208, 18, 13, 24, 20],
        [50, 194, 25, 14, 19, 20],
        [0, 194, 25, 14, 19, 20],
        [135, 196, 22, 14, 27, 19],
        [408, 193, 22, 14, 27, 19],
        [385, 114, 24, 25, 18, 21],
        [475, 110, 24, 25, 18, 21],
        [162, 180, 22, 16, 19, 23],
        [0, 178, 22, 16, 19, 23],
        [430, 158, 5, 9, 23, 32],
        [314, 154, 5, 9, 23, 32],
        [417, 39, 5, 9, 23, 32],
        [417, 48, 5, 9, 23, 32],
        [507, 132, 5, 9, 23, 32],
        [507, 141, 5, 9, 23, 32],
        [270, 218, 9, 12, 24, 32],
        [221, 210, 9, 12, 24, 32],
        [499, 110, 13, 22, 19, 30],
        [107, 137, 13, 22, 19, 30],
        [0, 139, 22, 22, 20, 19],
        [485, 135, 22, 22, 20, 19],
        [463, 135, 22, 22, 20, 19],
        [441, 135, 22, 22, 20, 19],
        [266, 132, 22, 22, 20, 19],
        [244, 132, 22, 22, 20, 19],
        [94, 159, 22, 17, 20, 19],
        [430, 175, 22, 17, 20, 19],
        [310, 172, 22, 17, 20, 19],
        [288, 172, 22, 17, 20, 19],
        [266, 172, 22, 17, 20, 19],
        [244, 172, 22, 17, 20, 19],
        [320, 131, 24, 22, 20, 22],
        [344, 131, 24, 22, 20, 22],
        [157, 196, 21, 14, 21, 22],
        [199, 196, 21, 14, 21, 22],
        [47, 208, 18, 13, 24, 20],
        [29, 208, 18, 13, 24, 20],
        [25, 194, 25, 14, 19, 20],
        [110, 196, 25, 14, 19, 20],
        [135, 196, 22, 14, 27, 19],
        [408, 193, 22, 14, 27, 19],
        [451, 110, 24, 25, 18, 21],
        [361, 106, 24, 25, 18, 21],
        [486, 0, 22, 29, 19, 23],
        [486, 29, 22, 29, 19, 23],
        [0, 208, 7, 14, 38, 33],
        [505, 207, 7, 14, 38, 33],
        [100, 139, 7, 14, 38, 33],
        [332, 172, 7, 14, 38, 33],
        [369, 204, 7, 14, 38, 33],
        [498, 207, 7, 14, 38, 33],
        [408, 207, 9, 14, 35, 36],
        [252, 205, 9, 14, 35, 36],
        [467, 60, 17, 24, 36, 21],
        [0, 115, 17, 24, 36, 21],
        [93, 208, 9, 13, 39, 32],
        [376, 208, 9, 13, 39, 32],
        [244, 154, 12, 18, 36, 28],
        [256, 154, 12, 18, 36, 28],
        [339, 153, 16, 18, 29, 34],
        [355, 153, 16, 18, 29, 34],
        [499, 192, 8, 15, 36, 31],
        [94, 193, 8, 15, 36, 31],
        [47, 115, 15, 24, 47, 41],
        [62, 115, 15, 24, 47, 41],
        [77, 115, 15, 24, 47, 41],
        [32, 115, 15, 24, 47, 41],
        [92, 115, 15, 24, 47, 41],
        [17, 115, 15, 24, 47, 41],
        [210, 180, 13, 16, 47, 41],
        [223, 180, 13, 16, 47, 41],
        [332, 188, 13, 16, 47, 41],
        [345, 188, 13, 16, 47, 41],
        [184, 180, 13, 16, 47, 41],
        [197, 180, 13, 16, 47, 41],
        [295, 189, 13, 15, 46, 42],
        [308, 189, 13, 15, 46, 42],
        [107, 115, 15, 22, 46, 41],
        [451, 88, 15, 22, 46, 41],
        [268, 106, 21, 26, 46, 41],
        [491, 84, 21, 26, 46, 41],
        [425, 114, 16, 25, 46, 41],
        [409, 114, 16, 25, 46, 41],
        [430, 167, 5, 6, 34, 33],
        [508, 42, 4, 6, 27, 33],
        [314, 163, 6, 6, 34, 33],
        [116, 172, 5, 6, 26, 33],
        [510, 62, 2, 3, 35, 35],
        [511, 35, 1, 3, 29, 35],
        [507, 221, 5, 5, 34, 34],
        [230, 210, 4, 5, 27, 34],
        [117, 223, 6, 5, 34, 34],
        [403, 208, 5, 5, 26, 34],
        [510, 62, 2, 3, 35, 35],
        [511, 35, 1, 3, 29, 35],
        [219, 227, 5, 4, 34, 35],
        [508, 54, 4, 4, 27, 35],
        [186, 227, 6, 4, 34, 35],
        [209, 227, 5, 4, 26, 35],
        [484, 63, 2, 2, 35, 36],
        [511, 38, 1, 2, 29, 36],
        [417, 57, 5, 3, 34, 36],
        [403, 218, 4, 3, 27, 36],
        [314, 169, 6, 3, 34, 36],
        [110, 193, 5, 3, 26, 36],
        [510, 65, 2, 1, 35, 37],
        [511, 41, 1, 1, 29, 37],
        [224, 227, 5, 2, 34, 37],
        [498, 228, 4, 2, 27, 37],
        [115, 178, 6, 2, 34, 37],
        [430, 173, 5, 2, 26, 37],
        [145, 228, 5, 2, 34, 37],
        [162, 227, 4, 2, 27, 37],
        [332, 186, 6, 2, 34, 37],
        [507, 205, 5, 2, 26, 37],
        [507, 226, 5, 4, 29, 38],
        [511, 40, 1, 1, 33, 41],
        [140, 223, 5, 5, 29, 38],
        [511, 40, 1, 1, 32, 42],
        [230, 215, 4, 4, 29, 38],
        [511, 40, 1, 1, 32, 42],
        [225, 222, 5, 5, 29, 38],
        [511, 40, 1, 1, 32, 42],
        [484, 67, 2, 1, 31, 42],
        [507, 226, 5, 4, 29, 38],
        [511, 40, 1, 1, 33, 41],
        [509, 166, 3, 2, 31, 41],
        [507, 226, 5, 4, 29, 38],
        [511, 40, 1, 1, 33, 41],
        [214, 227, 5, 4, 29, 38],
        [511, 40, 1, 1, 33, 42],
        [174, 222, 12, 6, 27, 33],
        [0, 222, 7, 6, 29, 33],
        [134, 228, 11, 3, 27, 39],
        [440, 221, 11, 8, 27, 34],
        [511, 40, 1, 1, 36, 40],
        [511, 40, 1, 1, 27, 40],
        [397, 106, 6, 8, 29, 25],
        [116, 166, 5, 6, 30, 27],
        [451, 221, 9, 8, 38, 47],
        [422, 176, 8, 17, 31, 54],
        [66, 160, 12, 17, 41, 54],
        [452, 175, 20, 17, 30, 41],
        [280, 189, 15, 15, 26, 30],
        [435, 139, 6, 10, 39, 27],
        [435, 149, 6, 7, 26, 27],
        [468, 221, 39, 7, 22, 66],
        [27, 221, 41, 9, 21, 65],
        [145, 223, 5, 5, 0, 0],
        [135, 223, 5, 5, 0, 0],
        [86, 159, 8, 18, 31, 53],
        [78, 159, 8, 18, 33, 53],
        [330, 153, 9, 19, 34, 52],
        [22, 177, 9, 17, 34, 51],
        [367, 188, 9, 16, 34, 51],
        [472, 192, 9, 15, 34, 51],
        [376, 193, 8, 15, 34, 52],
        [417, 207, 9, 14, 33, 53],
        [458, 207, 8, 14, 33, 53],
        [110, 210, 8, 13, 32, 53],
        [279, 218, 9, 12, 30, 52],
        [359, 204, 10, 14, 29, 50],
        [441, 192, 11, 15, 28, 50],
        [371, 153, 13, 18, 26, 51],
        [280, 154, 12, 18, 27, 52],
        [420, 158, 10, 18, 29, 53],
        [284, 204, 17, 14, 41, 51],
        [406, 159, 14, 17, 41, 51],
        [268, 154, 12, 18, 41, 50],
        [489, 157, 10, 18, 41, 49],
        [479, 157, 10, 18, 41, 49],
        [499, 157, 10, 18, 41, 49],
        [320, 153, 10, 19, 41, 50],
        [410, 139, 10, 20, 41, 51],
        [441, 114, 10, 20, 41, 51],
        [399, 139, 11, 20, 41, 51],
        [66, 139, 12, 21, 41, 50],
        [403, 39, 14, 21, 41, 49],
        [385, 139, 14, 20, 41, 49],
        [420, 139, 15, 19, 41, 49],
        [263, 189, 17, 15, 41, 50],
        [75, 194, 17, 14, 41, 51],
        [484, 228, 7, 3, 31, 68],
        [484, 228, 7, 3, 31, 68],
        [499, 132, 8, 3, 33, 68],
        [110, 223, 7, 5, 36, 66],
        [507, 193, 4, 6, 39, 62],
        [509, 157, 3, 6, 40, 61],
        [509, 157, 3, 6, 40, 60],
        [508, 35, 3, 7, 39, 60],
        [508, 35, 3, 7, 39, 60],
        [507, 187, 5, 6, 36, 61],
        [508, 7, 4, 7, 36, 59],
        [123, 223, 6, 5, 31, 59],
        [198, 227, 6, 4, 30, 60],
        [150, 227, 6, 4, 29, 61],
        [0, 228, 7, 3, 26, 66],
        [491, 228, 7, 3, 27, 67],
        [484, 228, 7, 3, 29, 68],
        [499, 132, 8, 3, 45, 68],
        [508, 48, 4, 6, 54, 59],
        [508, 0, 4, 7, 51, 61],
        [100, 153, 7, 6, 46, 62],
        [156, 227, 6, 4, 45, 63],
        [192, 227, 6, 4, 44, 63],
        [376, 188, 7, 5, 43, 62],
        [158, 223, 8, 4, 42, 65],
        [468, 228, 8, 3, 42, 68],
        [468, 228, 8, 3, 42, 68],
        [468, 228, 8, 3, 43, 68],
        [150, 223, 8, 4, 45, 67],
        [129, 223, 6, 5, 48, 65],
        [508, 21, 4, 7, 51, 62],
        [508, 14, 4, 7, 52, 61],
        [508, 28, 4, 7, 54, 58],
        [507, 199, 4, 6, 54, 59],
        [466, 207, 8, 14, 31, 57],
        [450, 207, 8, 14, 31, 57],
        [102, 193, 8, 15, 31, 56],
        [400, 193, 8, 15, 31, 56],
        [392, 193, 8, 15, 33, 56],
        [384, 193, 8, 15, 33, 56],
        [236, 189, 9, 16, 34, 55],
        [254, 189, 9, 16, 34, 55],
        [243, 205, 9, 14, 34, 54],
        [234, 205, 9, 14, 34, 54],
        [385, 208, 9, 13, 34, 54],
        [394, 208, 9, 13, 34, 54],
        [203, 210, 9, 12, 34, 54],
        [212, 210, 9, 12, 34, 54],
        [118, 210, 8, 13, 34, 54],
        [142, 210, 8, 13, 34, 54],
        [297, 218, 9, 12, 33, 55],
        [288, 218, 9, 12, 33, 55],
        [306, 218, 8, 12, 33, 55],
        [346, 218, 8, 12, 33, 55],
        [322, 218, 8, 12, 32, 54],
        [314, 218, 8, 12, 32, 54],
        [354, 218, 8, 11, 30, 53],
        [362, 218, 8, 11, 30, 53],
        [330, 218, 8, 12, 29, 52],
        [338, 218, 8, 12, 29, 52],
        [194, 210, 9, 12, 28, 53],
        [261, 218, 9, 12, 28, 53],
        [430, 192, 11, 15, 26, 54],
        [321, 189, 11, 15, 26, 54],
        [462, 192, 10, 15, 27, 55],
        [452, 192, 10, 15, 27, 55],
        [490, 192, 9, 15, 29, 56],
        [481, 192, 9, 15, 29, 56],
        [496, 175, 11, 17, 42, 54],
        [94, 176, 11, 17, 42, 54],
        [180, 210, 14, 12, 44, 53],
        [166, 210, 14, 12, 44, 53],
        [315, 204, 12, 14, 43, 54],
        [327, 204, 12, 14, 43, 54],
        [349, 204, 10, 14, 43, 54],
        [339, 204, 10, 14, 43, 54],
        [490, 207, 8, 14, 43, 53],
        [442, 207, 8, 14, 43, 53],
        [434, 207, 8, 14, 43, 53],
        [426, 207, 8, 14, 43, 53],
        [482, 207, 8, 14, 43, 53],
        [474, 207, 8, 14, 43, 53],
        [358, 188, 9, 16, 42, 53],
        [245, 189, 9, 16, 42, 53],
        [58, 177, 9, 17, 42, 54],
        [31, 177, 9, 17, 42, 54],
        [40, 177, 9, 17, 42, 54],
        [49, 177, 9, 17, 42, 54],
        [403, 176, 10, 17, 42, 54],
        [105, 176, 10, 17, 42, 54],
        [468, 157, 11, 18, 42, 53],
        [457, 157, 11, 18, 42, 53],
        [446, 157, 11, 18, 44, 52],
        [435, 157, 11, 18, 44, 52],
        [292, 154, 11, 18, 44, 51],
        [303, 154, 11, 18, 44, 51],
        [484, 175, 12, 17, 44, 51],
        [472, 175, 12, 17, 44, 51],
        [220, 196, 14, 14, 44, 51],
        [301, 204, 14, 14, 44, 51],
        [79, 208, 14, 13, 44, 52],
        [65, 208, 14, 13, 44, 52],
        [110, 228, 12, 3, 26, 37],
        [122, 228, 12, 3, 26, 37],
        [174, 228, 9, 3, 27, 37],
        [510, 66, 2, 1, 43, 31],
        [484, 60, 2, 3, 43, 30],
        [484, 65, 2, 2, 43, 30],
        [510, 58, 2, 4, 43, 30],
        [403, 213, 5, 5, 41, 31],
        [368, 131, 17, 22, 38, 19],
        [454, 32, 32, 28, 25, 16],
        [403, 60, 32, 28, 25, 16],
        [422, 32, 32, 28, 25, 16],
        [435, 60, 32, 28, 25, 16],
        [467, 84, 24, 26, 31, 11],
        [403, 88, 24, 26, 31, 11],
        [486, 58, 24, 26, 31, 11],
        [244, 106, 24, 26, 31, 11],
        [427, 88, 24, 26, 31, 11],
        [216, 222, 9, 5, 30, 45],
        [207, 222, 9, 5, 30, 45],
        [76, 177, 9, 17, 30, 44],
        [85, 177, 9, 17, 30, 44],
        [413, 176, 9, 17, 30, 44],
        [67, 177, 9, 17, 30, 44],
        [126, 210, 8, 13, 31, 45],
        [102, 208, 8, 13, 31, 45],
        [150, 210, 8, 13, 31, 45],
        [134, 210, 8, 13, 31, 45],
        [158, 210, 8, 13, 31, 45],
        [509, 163, 3, 3, 30, 44],
        [289, 106, 47, 25, 48, 151],
        [403, 0, 19, 39, 63, 122],
        [0, 0, 122, 115, 17, 9],
        [115, 180, 47, 16, 48, 161],
        [122, 106, 122, 74, 14, 122],
        [236, 180, 8, 9, 0, 0],
        [476, 228, 8, 3, 0, 7],
        [122, 0, 281, 106, 0, 0],
        [78, 139, 22, 20, 0, 0],
        [7, 208, 22, 13, 0, 9],
        [289, 131, 31, 23, 0, 0],
        [230, 219, 31, 11, 0, 14],
        [336, 106, 25, 25, 1, 1],
        [186, 222, 21, 5, 3, 22],
        [422, 0, 32, 32, 0, 0],
        [454, 0, 32, 32, 0, 0],
        [460, 221, 8, 8, 0, 1],
        [370, 218, 5, 3, 0, 0],
        [204, 227, 5, 4, 0, 0],
        [510, 67, 1, 1, 0, 0],
        [103, 221, 7, 9, 0, 0],
        [370, 221, 10, 9, 0, 0],
        [166, 222, 8, 7, 0, 1],
        [7, 221, 11, 10, 0, 1],
        [18, 221, 9, 10, 1, 2],
        [7, 221, 11, 10, 0, 1],
        [92, 221, 11, 9, 0, 1]
      ].map(p);
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
          [, o(217, 218), o(219, 220), , o(221, 222)],
          [o(223, 224), o(225, 226)],
          [o(227, 228), o(229, 230), , o(231, 232)],
          [o(233, 234), o(235, 236)],
          [o(237, 238), o(239, 240), , , o(241, 242)]
        ],
        [],
        [
          [o(243, 244)],
          [, , o(245, 246), , , o(247, 248)]
        ],
        [],
        [],
        [],
        [],
        [],
        [
          [o(249, 250)],
          [, o(251, 252), o(253, 254), o(255, 256), o(257, 258), o(259, 260)]
        ]
      ],
      e.ponyManes = [null, [
          [o(261, 262)],
          [o(263, 264), o(265, 266), o(267, 268), o(269, 270), o(271, 272)],
          [o(273, 274), o(275, 276)],
          [o(277, 278), o(279, 280), o(281, 282), o(283, 284)],
          [o(285, 286), o(287, 288)],
          [o(289, 290), o(291, 292), o(293, 294), o(295, 296), o(297, 298)]
        ],
        [
          [o(299, 300)],
          [o(301, 302), o(303, 304), o(305, 306), o(307, 308)],
          [o(309, 310), o(311, 312)],
          [o(313, 314), o(315, 316), o(317, 318)],
          [o(319, 320), o(321, 322)],
          [o(323, 324), o(325, 326), o(327, 328), o(329, 330)]
        ],
        [
          [o(331, 332)],
          [o(333, 334), o(335, 336), o(337, 338), o(339, 340), o(341, 342), o(343, 344)]
        ],
        [
          [o(345, 346)],
          [o(347, 348), o(349, 350), o(351, 352), o(353, 354), o(355, 356)]
        ],
        [
          [o(357, 358)],
          [o(359, 360), o(361, 362), o(363, 364), o(365, 366)]
        ],
        [
          [o(367, 368)],
          [o(369, 370), o(371, 372), o(373, 374), o(375, 376), o(377, 378)]
        ],
        [
          [o(379, 380)],
          [o(381, 382), o(383, 384), o(385, 386), o(387, 388)]
        ],
        [
          [o(389, 390)],
          [o(391, 392), o(393, 394), o(395, 396), o(397, 398), o(399, 400)]
        ],
        [
          [o(401, 402)],
          [o(403, 404), o(405, 406), o(407, 408), o(409, 410), o(411, 412), o(413, 414)]
        ]
      ],
      e.ponyBackFrontManes = [null, [
          [o(415, 416)],
          [o(417, 418), o(419, 420), o(421, 422)],
          [o(423, 424), o(425, 426)],
          [o(427, 428), o(429, 430)],
          [o(431, 432), o(433, 434)],
          [o(435, 436), o(437, 438)]
        ],
        [],
        [
          [o(439, 440)],
          [o(441, 442), o(443, 444), o(445, 446), o(447, 448)]
        ],
        [],
        [],
        [],
        []
      ],
      e.ponyBackBehindManes = [null, [],
        [
          [o(449, 450), o(451, 452)],
          [o(453, 454), o(455, 456), o(457, 458), o(459, 460), o(461, 462), o(463, 464)]
        ],
        [],
        [
          [o(465, 466), o(467, 468)],
          [o(469, 470), o(471, 472), o(473, 474), o(475, 476), o(477, 478)]
        ],
        [
          [o(479, 480)],
          [o(481, 482), o(483, 484)]
        ],
        [
          [o(485, 486)],
          [o(487, 488), o(489, 490), o(491, 492), o(493, 494)]
        ],
        [
          [o(495, 496)],
          [o(497, 498), o(499, 500), o(501, 502), o(503, 504)]
        ]
      ],
      e.ponyBackManes = [null, [
          [o(415, 416)],
          [o(417, 418), o(419, 420), o(421, 422)],
          [o(423, 424), o(425, 426)],
          [o(427, 428), o(429, 430)],
          [o(431, 432), o(433, 434)],
          [o(435, 436), o(437, 438)]
        ],
        [
          [o(449, 450), o(451, 452)],
          [o(453, 454), o(455, 456), o(457, 458), o(459, 460), o(461, 462), o(463, 464)]
        ],
        [
          [o(439, 440)],
          [o(441, 442), o(443, 444), o(445, 446), o(447, 448)]
        ],
        [
          [o(465, 466), o(467, 468)],
          [o(469, 470), o(471, 472), o(473, 474), o(475, 476), o(477, 478)]
        ],
        [
          [o(479, 480)],
          [o(481, 482), o(483, 484)]
        ],
        [
          [o(485, 486)],
          [o(487, 488), o(489, 490), o(491, 492), o(493, 494)]
        ],
        [
          [o(495, 496)],
          [o(497, 498), o(499, 500), o(501, 502), o(503, 504)]
        ]
      ],
      e.ponyTails = [null, [
          [o(505, 506)],
          [o(507, 508), o(509, 510), o(511, 512), o(513, 514)],
          [o(515, 516), o(517, 518)],
          [o(519, 520), o(521, 522)],
          [o(523, 524), o(525, 526)],
          [o(527, 528), o(529, 530)]
        ],
        [
          [o(531, 532)],
          [o(533, 534), o(535, 536), o(537, 538), o(539, 540)],
          [o(541, 542), o(543, 544)],
          [o(545, 546), o(547, 548)],
          [o(549, 550), o(551, 552)],
          [o(553, 554), o(555, 556)]
        ],
        [
          [o(557, 558)],
          [o(559, 560), o(561, 562), o(563, 564), o(565, 566), o(567, 568)]
        ],
        [
          [o(569, 570)],
          [o(571, 572), o(573, 574), o(575, 576), o(577, 578), o(579, 580)]
        ],
        [
          [o(581, 582)],
          [o(583, 584), o(585, 586), o(587, 588), o(589, 590)]
        ],
        [
          [o(591, 592)],
          [o(593, 594), o(595, 596), o(597, 598), o(599, 600), o(601, 602)]
        ]
      ],
      e.ponyEyeLeft = [null, c(603, 605, 607, 609), c(611, 613, 615, 617), c(619, 621, 623, 625), c(627, 629, 631, 633), c(635, 637, 639, 641), c(643, 645, 647, 649)],
      e.ponyEyeRight = [null, c(604, 606, 608, 610), c(612, 614, 616, 618), c(620, 622, 624, 626), c(628, 630, 632, 634), c(636, 638, 640, 642), c(644, 646, 648, 650)],
      e.ponyNoses = [l(651, 652, 653), l(654, 655, 656), l(657, 658, 659), l(660, 661, 662), l(663, 664, 665), l(666, 667, 668), l(669, 670, 671)],
      e.ponyFreckles = [null, E[674], E[675], E[676], E[677]],
      e.ponyHorns = [null, [
          [o(678, 679)]
        ],
        [
          [o(680, 681)]
        ]
      ],
      e.ponyWings = [null, [
        [o(682, 683)]
      ]],
      e.ponyLegFrontStand = [o(684, 685)],
      e.ponyLegBackStand = [o(686, 687)],
      e.ponyLegFrontTrot = [o(698, 699), o(700, 701), o(702, 703), o(704, 705), o(706, 707), o(708, 709), o(710, 711), o(712, 713), o(714, 715), o(716, 717), o(718, 719), o(720, 721), o(722, 723), o(724, 725), o(726, 727), o(728, 729)],
      e.ponyLegBackTrot = [o(730, 731), o(732, 733), o(734, 735), o(736, 737), o(738, 739), o(740, 741), o(742, 743), o(744, 745), o(746, 747), o(748, 749), o(750, 751), o(752, 753), o(754, 755), o(756, 757), o(758, 759), o(760, 761)],
      e.ponyBobsBodyTrot = [i(0, 1), i(0, 0), i(0, -1), i(0, -2), i(0, -2), i(0, -2), i(0, -1), i(0, 0), i(0, 1), i(0, 0), i(0, -1), i(0, -2), i(0, -2), i(0, -2), i(0, -1), i(0, 0)],
      e.ponyBobsHeadTrot = [i(0, 0), i(0, 0), i(0, -1), i(0, -2), i(0, -2), i(0, -2), i(0, -1), i(0, 0), i(0, 0), i(0, 0), i(0, -1), i(0, -2), i(0, -2), i(0, -2), i(0, -1), i(0, 0)],
      e.ponyFetlocksFrontStand = [o(762, 763)],
      e.ponyFetlocksFrontTrot = [o(764, 765), o(766, 767), o(768, 769), o(770, 771), o(772, 773), o(774, 775), o(776, 777), o(778, 779), o(780, 781), o(782, 783), o(784, 785), o(786, 787), o(788, 789), o(790, 791), o(792, 793), o(794, 795)],
      e.ponyFetlocksBackStand = [o(796, 797)],
      e.ponyFetlocksBackTrot = [o(798, 799), o(800, 801), o(802, 803), o(804, 805), o(806, 807), o(808, 809), o(810, 811), o(812, 813), o(814, 815), o(816, 817), o(818, 819), o(820, 821), o(822, 823), o(824, 825), o(826, 827), o(828, 829)],
      e.ponyFrontLegAccessoriesStand = [
        [null, [
          [o(830, 831)],
          [o(832, 833), o(834, 835), o(836, 837), o(838, 839), o(840, 841), o(842, 843)]
        ]]
      ],
      e.ponyFrontLegAccessoriesTrot = [
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
        ]],
        [null, [
          [o(1054, 1055)],
          [o(1056, 1057), o(1058, 1059), o(1060, 1061), o(1062, 1063), o(1064, 1065), o(1066, 1067)]
        ]]
      ],
      e.ponyBackLegAccessoriesStand = [
        [null, [
          [o(1068, 1069)],
          [o(1070, 1071), o(1072, 1073), o(1074, 1075), o(1076, 1077), o(1078, 1079), o(1080, 1081)]
        ]]
      ],
      e.ponyBackLegAccessoriesTrot = [
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
        ]],
        [null, [
          [o(1292, 1293)],
          [o(1294, 1295), o(1296, 1297), o(1298, 1299), o(1300, 1301), o(1302, 1303), o(1304, 1305)]
        ]]
      ],
      e.ponyFaceAccessories = [null, [
          [a(1307, 1308, 1306)]
        ],
        [
          [o(1309, 1310)]
        ],
        [
          [a(1312, 1313, 1311)]
        ]
      ],
      e.ponyEarAccessories = [null, [
          [o(1314, 1315)]
        ],
        [
          [o(1316, 1317)]
        ],
        [
          [o(1318, 1319)]
        ],
        [
          [o(1320, 1321)]
        ],
        [
          [o(1322, 1323), o(1324, 1325)]
        ]
      ],
      e.ponyHeadAccessories = [null, [
          [o(1326, 1327)]
        ],
        [
          [o(1328, 1329)],
          [o(1330, 1331), o(1332, 1333), o(1334, 1335), o(1336, 1337)],
          [o(1338, 1339), o(1340, 1341), o(1342, 1343), o(1344, 1345)],
          [o(1346, 1347), o(1348, 1349), o(1350, 1351), o(1352, 1353)]
        ],
        [
          [o(1354, 1355)],
          [o(1356, 1357), o(1358, 1359)],
          [o(1360, 1361), o(1362, 1363), o(1364, 1365)],
          [o(1366, 1367), o(1368, 1369), o(1370, 1371), o(1372, 1373)],
          [o(1374, 1375), o(1376, 1377), o(1378, 1379)]
        ]
      ],
      e.ponyNeckAccessories = [null, [
          [o(1380, 1381)],
          [o(1382, 1383), o(1384, 1385)]
        ],
        [
          [o(1386, 1387)],
          [o(1388, 1389), o(1390, 1391)],
          [o(1392, 1393), o(1394, 1395), o(1396, 1397), o(1398, 1399)],
          [o(1400, 1401), o(1402, 1403)]
        ],
        [
          [o(1404, 1405)],
          [o(1406, 1407), o(1408, 1409)],
          [o(1410, 1411), o(1412, 1413), o(1414, 1415)],
          [o(1416, 1417), o(1418, 1419), o(1420, 1421), o(1422, 1423), o(1424, 1425), o(1426, 1427)],
          [o(1428, 1429), o(1430, 1431), o(1432, 1433)]
        ]
      ],
      e.ponyFacialHair = [null, [
        [o(1434, 1435)]
      ]],
      e.butterfly = [E[1721], E[1722], E[1723], E[1724]],
      e.ponyEyeshadow = E[672],
      e.ponyEyeshadowShine = E[673],
      e.ponyBody = o(688, 689),
      e.ponyHead = o(690, 691),
      e.ponyEar = o(692, 693),
      e.ponyEar2 = o(694, 695),
      e.ponyShadow = E[696],
      e.ponySelection = E[697],
      e.tree = f(1436, 1437, 1438, 1439, 1440),
      e.apple = s(1441, 1442),
      e.cloud = u(1443),
      e.pumpkin = s(1444, 1445),
      e.rock = s(1446, 1447),
      e.sign = s(1448, 1449),
      e.bubble = E[1712],
      e.bubble2 = E[1713],
      e.heartemote = E[1714],
      e.nipple = E[1715],
      e.nipple2 = E[1716],
      e.pixel = E[1717],
      e.pizzaemote = E[1718],
      e.pumpkinemote = E[1719],
      e.rockemote = E[1720],
      e.ponFrontManes = [null, [$[1], $[2], $[3], $[4], $[5], $[6]],
        [$[7], $[8], $[9], $[10], $[11], $[12]],
        [$[13], $[14]],
        [$[15], $[16]],
        [],
        [$[17], $[18]],
        [],
        [$[19], $[20]],
        []
      ],
      e.ponTopManes = [null, [$[21], $[22], $[23], $[24], $[25], $[26]],
        [$[27], $[28], $[29], $[30], $[31], $[32]],
        [$[33], $[34]],
        [$[35], $[36]],
        [$[37], $[38]],
        [$[39], $[40]],
        [$[41], $[42]],
        [$[43], $[44]],
        [$[45], $[46]]
      ],
      e.ponBehindManes = [null, [$[47], $[48], $[49], $[50], $[51], $[52]],
        [],
        [$[53], $[54]],
        [],
        [],
        [],
        [],
        [],
        [$[55], $[56]]
      ],
      e.ponManes = [null, [$[57], $[58], $[59], $[60], $[61], $[62]],
        [$[63], $[64], $[65], $[66], $[67], $[68]],
        [$[69], $[70]],
        [$[71], $[72]],
        [$[73], $[74]],
        [$[75], $[76]],
        [$[77], $[78]],
        [$[79], $[80]],
        [$[81], $[82]]
      ],
      e.ponBackFrontManes = [null, [$[83], $[84], $[85], $[86], $[87], $[88]],
        [],
        [$[89], $[90]],
        [],
        [],
        [],
        []
      ],
      e.ponBackBehindManes = [null, [],
        [$[91], $[92]],
        [],
        [$[93], $[94]],
        [$[95], $[96]],
        [$[97], $[98]],
        [$[99], $[100]]
      ],
      e.ponBackManes = [null, [$[83], $[84], $[85], $[86], $[87], $[88]],
        [$[91], $[92]],
        [$[89], $[90]],
        [$[93], $[94]],
        [$[95], $[96]],
        [$[97], $[98]],
        [$[99], $[100]]
      ],
      e.ponTails = [null, [$[101], $[102], $[103], $[104], $[105], $[106]],
        [$[107], $[108], $[109], $[110], $[111], $[112]],
        [$[113], $[114]],
        [$[115], $[116]],
        [$[117], $[118]],
        [$[119], $[120]]
      ],
      e.ponEyeLeft = [null, g(121, 123, 125), g(127, 129, 131), g(133, 135, 137), g(139, 141, 143), g(145, 147, 0), g(149, 151, 0)],
      e.ponEyeRight = [null, g(122, 124, 126), g(128, 130, 132), g(134, 136, 138), g(140, 142, 144), g(146, 148, 0), g(150, 152, 0)],
      e.ponNoses = [m(0, 153, 154), m(0, 155, 156), m(0, 157, 158), m(0, 159, 160), m(161, 162, 163), m(164, 165, 166), m(0, 167, 168)],
      e.ponFreckles = [null, $[171], $[172], $[173], $[174]],
      e.ponHorns = [null, [$[175]],
        [$[176]]
      ],
      e.ponWings = [null, [$[177]]],
      e.ponLegFrontStand = [$[178]],
      e.ponLegBackStand = [$[179]],
      e.ponLegFrontTrot = [$[188], $[189], $[190], $[191], $[192], $[193], $[194], $[195], $[196], $[197], $[198], $[199], $[200], $[201], $[202], $[203]],
      e.ponLegBackTrot = [$[204], $[205], $[206], $[207], $[208], $[209], $[210], $[211], $[212], $[213], $[214], $[215], $[216], $[217], $[218], $[219]],
      e.ponFetlocksFrontStand = [$[220]],
      e.ponFetlocksFrontTrot = [$[221], $[222], $[223], $[224], $[225], $[226], $[227], $[228], $[229], $[230], $[231], $[232], $[233], $[234], $[235], $[236]],
      e.ponFetlocksBackStand = [$[237]],
      e.ponFetlocksBackTrot = [$[238], $[239], $[240], $[241], $[242], $[243], $[244], $[245], $[246], $[247], $[248], $[249], $[250], $[251], $[252], $[253]],
      e.ponFrontLegAccessoriesStand = [
        [null, [$[254], $[255]]]
      ],
      e.ponFrontLegAccessoriesTrot = [
        [null, [$[256], $[257]]],
        [null, [$[258], $[259]]],
        [null, [$[260], $[261]]],
        [null, [$[262], $[263]]],
        [null, [$[264], $[265]]],
        [null, [$[266], $[267]]],
        [null, [$[268], $[269]]],
        [null, [$[270], $[271]]],
        [null, [$[272], $[273]]],
        [null, [$[274], $[275]]],
        [null, [$[276], $[277]]],
        [null, [$[278], $[279]]],
        [null, [$[280], $[281]]],
        [null, [$[282], $[283]]],
        [null, [$[284], $[285]]],
        [null, [$[286], $[287]]]
      ],
      e.ponBackLegAccessoriesStand = [
        [null, [$[288], $[289]]]
      ],
      e.ponBackLegAccessoriesTrot = [
        [null, [$[290], $[291]]],
        [null, [$[292], $[293]]],
        [null, [$[294], $[295]]],
        [null, [$[296], $[297]]],
        [null, [$[298], $[299]]],
        [null, [$[300], $[301]]],
        [null, [$[302], $[303]]],
        [null, [$[304], $[305]]],
        [null, [$[306], $[307]]],
        [null, [$[308], $[309]]],
        [null, [$[310], $[311]]],
        [null, [$[312], $[313]]],
        [null, [$[314], $[315]]],
        [null, [$[316], $[317]]],
        [null, [$[318], $[319]]],
        [null, [$[320], $[321]]]
      ],
      e.ponFaceAccessories = [null, [$[322]],
        [$[323]],
        [$[324]]
      ],
      e.ponEarAccessories = [null, [$[325]],
        [$[326]],
        [$[327]],
        [$[328]],
        [$[329]]
      ],
      e.ponHeadAccessories = [null, [$[330]],
        [$[331], $[332], $[333], $[334]],
        [$[335], $[336], $[337], $[338], $[339]]
      ],
      e.ponNeckAccessories = [null, [$[340], $[341]],
        [$[342], $[343], $[344], $[345]],
        [$[346], $[347], $[348], $[349], $[350]]
      ],
      e.ponFacialHair = [null, [$[351]]],
      e.ponEyeshadow = $[169],
      e.ponEyeshadowShine = $[170],
      e.ponBody = $[180],
      e.ponHead = $[181],
      e.ponEar = $[182],
      e.ponEar2 = $[183],
      e.ponShadow = $[184],
      e.ponSelection = $[185],
      e.ponCM = $[186],
      e.ponCMFlip = $[187],
      e.tree2 = y(352, 353, 354, 355, 356, [0, 1648566271, 1176305919, 2978502143, 3686626303, 2093650687, 2440584959, 1800616447, 3036666623, 3029561599, 2087013887, 1890942719, 1648236543, 1328153087, 542583551, 1553622527, 1066096127, 2328465407, 828261375, 1166170623, 3607295, 745882111, 1099582975]),
      e.apple_2 = v(357, 358, [0, 738592255, 2097348863, 4202988031, 3523608831, 3523806463]),
      e.cloud_2 = d(359),
      e.pumpkin_2 = v(360, 361, [0, 1217814527, 5904127, 2318663935, 4171326463, 4292055551, 4102701567, 3613926399, 3227390719, 2722895103, 4275213823]),
      e.rock_2 = v(362, 363, [0, 2020893439, 3418335487, 2593489919, 2980879103, 1667060479]),
      e.sign_2 = v(364, 365, [0, 2303012607, 3988029695, 2875473919, 3464778495, 572662527, 75]),
      e.bubble_2 = h(366, [0, 4294967295]),
      e.bubble2_2 = h(367, [0, 255, 4294967295]),
      e.heartemote_2 = h(368, [0, 3875537151, 3254780159, 2902458623]),
      e.nipple_2 = h(369, [4294967295, 0]),
      e.nipple2_2 = h(370, [4294967295, 255, 0]),
      e.pixel_2 = h(371, [4294967295]),
      e.pizzaemote_2 = h(372, [2354323967, 0, 4158365183, 3548861951, 3956117759, 3523872255, 2751726079, 3770116607]),
      e.pumpkinemote_2 = h(373, [0, 864834559, 5838335, 2368405759, 4085792767, 3479444991, 4291463167]),
      e.rockemote_2 = h(374, [0, 2020893439, 3418335487, 2593489919, 2980879103]),
      e.butterfly2 = b([375, 376, 377, 378], [0, 2151972607, 4068601343]),
      e.tileSheet = _["tiles.png"],
      e.tileSprite = {
        x: 0,
        y: 0,
        w: 32,
        h: 24,
        ox: 0,
        oy: 0
      },
      e.spriteSheets = [{
        src: w,
        sprites: E
      }, {
        src: x,
        sprites: $
      }, {
        src: e.tileSheet,
        sprites: [e.tileSprite]
      }],
      e.font = [
        [0, 1450],
        [9786, 1451],
        [9787, 1452],
        [9829, 1453],
        [9830, 1454],
        [9827, 1455],
        [9824, 1456],
        [8226, 1457],
        [9688, 1458],
        [9675, 1459],
        [9689, 1460],
        [9794, 1461],
        [9792, 1462],
        [9834, 1463],
        [9835, 1464],
        [9788, 1465],
        [9658, 1466],
        [9668, 1467],
        [8597, 1468],
        [8252, 1469],
        [182, 1470],
        [167, 1471],
        [9644, 1472],
        [8616, 1473],
        [8593, 1474],
        [8595, 1475],
        [8594, 1476],
        [8592, 1477],
        [8735, 1478],
        [8596, 1479],
        [9650, 1480],
        [9660, 1481],
        [33, 1482],
        [34, 1483],
        [35, 1484],
        [36, 1485],
        [37, 1486],
        [38, 1487],
        [39, 1488],
        [40, 1489],
        [41, 1490],
        [42, 1491],
        [43, 1492],
        [44, 1493],
        [45, 1494],
        [46, 1495],
        [47, 1496],
        [48, 1497],
        [49, 1498],
        [50, 1499],
        [51, 1500],
        [52, 1501],
        [53, 1502],
        [54, 1503],
        [55, 1504],
        [56, 1505],
        [57, 1506],
        [58, 1507],
        [59, 1508],
        [60, 1509],
        [61, 1510],
        [62, 1511],
        [63, 1512],
        [64, 1513],
        [65, 1514],
        [66, 1515],
        [67, 1516],
        [68, 1517],
        [69, 1518],
        [70, 1519],
        [71, 1520],
        [72, 1521],
        [73, 1522],
        [74, 1523],
        [75, 1524],
        [76, 1525],
        [77, 1526],
        [78, 1527],
        [79, 1528],
        [80, 1529],
        [81, 1530],
        [82, 1531],
        [83, 1532],
        [84, 1533],
        [85, 1534],
        [86, 1535],
        [87, 1536],
        [88, 1537],
        [89, 1538],
        [90, 1539],
        [91, 1540],
        [92, 1541],
        [93, 1542],
        [94, 1543],
        [95, 1544],
        [96, 1545],
        [97, 1546],
        [98, 1547],
        [99, 1548],
        [100, 1549],
        [101, 1550],
        [102, 1551],
        [103, 1552],
        [104, 1553],
        [105, 1554],
        [106, 1555],
        [107, 1556],
        [108, 1557],
        [109, 1558],
        [110, 1559],
        [111, 1560],
        [112, 1561],
        [113, 1562],
        [114, 1563],
        [115, 1564],
        [116, 1565],
        [117, 1566],
        [118, 1567],
        [119, 1568],
        [120, 1569],
        [121, 1570],
        [122, 1571],
        [123, 1572],
        [124, 1573],
        [125, 1574],
        [126, 1575],
        [8962, 1576],
        [199, 1577],
        [252, 1578],
        [233, 1579],
        [226, 1580],
        [228, 1581],
        [224, 1582],
        [229, 1583],
        [231, 1584],
        [234, 1585],
        [235, 1586],
        [232, 1587],
        [239, 1588],
        [238, 1589],
        [236, 1590],
        [196, 1591],
        [197, 1592],
        [201, 1593],
        [230, 1594],
        [198, 1595],
        [244, 1596],
        [246, 1597],
        [242, 1598],
        [251, 1599],
        [249, 1600],
        [255, 1601],
        [214, 1602],
        [220, 1603],
        [248, 1604],
        [163, 1605],
        [216, 1606],
        [215, 1607],
        [402, 1608],
        [225, 1609],
        [237, 1610],
        [243, 1611],
        [250, 1612],
        [241, 1613],
        [209, 1614],
        [170, 1615],
        [186, 1616],
        [191, 1617],
        [174, 1618],
        [172, 1619],
        [189, 1620],
        [188, 1621],
        [161, 1622],
        [171, 1623],
        [187, 1624],
        [1040, 1625],
        [1072, 1626],
        [1041, 1627],
        [1073, 1628],
        [1042, 1629],
        [1074, 1630],
        [1043, 1631],
        [1075, 1632],
        [1044, 1633],
        [1076, 1634],
        [1045, 1635],
        [1077, 1636],
        [1025, 1637],
        [1105, 1638],
        [1046, 1639],
        [1078, 1640],
        [1047, 1641],
        [1079, 1642],
        [1048, 1643],
        [1080, 1644],
        [1049, 1645],
        [1081, 1646],
        [1050, 1647],
        [1082, 1648],
        [1051, 1649],
        [1083, 1650],
        [1052, 1651],
        [1084, 1652],
        [1053, 1653],
        [1085, 1654],
        [1054, 1655],
        [1086, 1656],
        [1055, 1657],
        [1087, 1658],
        [1056, 1659],
        [1088, 1660],
        [1057, 1661],
        [1089, 1662],
        [1058, 1663],
        [1090, 1664],
        [1059, 1665],
        [1091, 1666],
        [1060, 1667],
        [1092, 1668],
        [1061, 1669],
        [1093, 1670],
        [1062, 1671],
        [1094, 1672],
        [1063, 1673],
        [1095, 1674],
        [1064, 1675],
        [1096, 1676],
        [1065, 1677],
        [1097, 1678],
        [1066, 1679],
        [1098, 1680],
        [1067, 1681],
        [1099, 1682],
        [1068, 1683],
        [1100, 1684],
        [1069, 1685],
        [1101, 1686],
        [1070, 1687],
        [1102, 1688],
        [1071, 1689],
        [1103, 1690],
        [260, 1691],
        [261, 1692],
        [262, 1693],
        [263, 1694],
        [280, 1695],
        [281, 1696],
        [323, 1697],
        [324, 1698],
        [346, 1699],
        [347, 1700],
        [377, 1701],
        [378, 1702],
        [379, 1703],
        [380, 1704],
        [321, 1705],
        [322, 1706],
        [211, 1707],
        [12484, 1708],
        [362, 1709],
        [363, 1710],
        [12471, 1711]
      ].map(function(t) {
        return {
          code: t[0],
          sprite: E[t[1]]
        }
      }),
      n.exports
  });
  System.registerDynamic("5c", ["1f"], !0, function(t, e, n) {
    "use strict";
    var r = t("1f");
    return e.stand = {
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
      },
      e.trot = {
        name: "trot",
        frames: 16,
        framesShift: 8,
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
  System.registerDynamic("43", ["21", "22", "24", "1f", "3b", "5c"], !0, function(t, e, n) {
    "use strict";

    function r() {
      return {
        animation: $.stand,
        animationFrame: 0,
        blinkFrame: 1
      }
    }

    function i(t, n, r, i, u, c, p) {
      var h = i - e.PONY_WIDTH / 2,
        d = u - e.PONY_HEIGHT,
        v = r.animation,
        m = r.animationFrame % v.frames,
        g = (r.animationFrame + v.framesShift) % v.frames,
        y = _.at(v.headBobs, m),
        b = _.at(v.bodyBobs, m),
        E = h + b.x,
        $ = d + b.y,
        S = h + y.x,
        T = d + y.y;
      p && t.drawSprite(x.ponySelection, null, h, d),
        t.drawSprite(x.ponyShadow, w.SHADOW_COLOR, h, d),
        l(t, x.ponyBackBehindManes, n.backMane, S, T);
      var k = !n.mane || !n.mane.type,
        M = k ? S - 1 : S,
        A = k ? T + 4 : T;
      l(t, x.ponyHeadAccessories, n.headAccessory, M, A);
      var C = h - 3,
        D = d - 1,
        O = v.frontLegs,
        I = v.backLegs,
        R = _.at(v.frontHooves, n.frontHooves && n.frontHooves.type),
        F = _.at(v.backHooves, n.backHooves && n.backHooves.type),
        P = v.frontLegAccessory,
        j = v.backLegAccessory;
      o(t, C, D, O, R, P, n.darkFrontLegAccessory, g, n.darkCoatFill, n.darkCoatOutline, n.darkFrontHoovesFill, n.darkFrontHoovesOutline),
        o(t, C, D, I, F, j, n.darkBackLegAccessory, g, n.darkCoatFill, n.darkCoatOutline, n.darkBackHoovesFill, n.darkBackHoovesOutline),
        l(t, x.ponyTails, n.tail, E, $),
        s(t, x.ponyBody, n.coatFill, n.coatOutline, E, $);
      var N = n.frontHooves && n.frontHooves.fills && n.frontHooves.fills[0],
        L = n.frontHooves && n.frontHooves.outlines && n.frontHooves.outlines[0],
        U = n.backHooves && n.backHooves.fills && n.backHooves.fills[0],
        B = n.backHooves && n.backHooves.outlines && n.backHooves.outlines[0];
      o(t, h, d, O, R, P, n.frontLegAccessory, m, n.coatFill, n.coatOutline, N, L),
        o(t, h, d, I, F, j, n.backLegAccessory, m, n.coatFill, n.coatOutline, U, B),
        f(t, n.cm, E + 43, $ + 49, c && n.cmFlip),
        l(t, x.ponyWings, n.wings, E, $),
        l(t, x.ponyNeckAccessories, n.neckAccessory, E, $),
        a(t, n, S, T, r.blinkFrame, c)
    }

    function o(t, e, n, r, i, o, a, u, c, f, p, h) {
      s(t, _.at(r, u), c, f, e, n),
        s(t, _.at(i, u), p, h, e, n),
        l(t, _.at(o, u), a, e, n)
    }

    function a(t, e, n, r, i, o) {
      void 0 === i && (i = 1),
        l(t, x.ponyBehindManes, e.mane, n, r),
        s(t, x.ponyEar2, e.coatFill, e.coatOutline, n, r),
        s(t, x.ponyHead, e.coatFill, e.coatOutline, n, r),
        l(t, x.ponyFacialHair, e.facialHair, n, r);
      var a = _.at(x.ponyNoses, e.muzzle);
      t.drawSprite(a.mouth, w.WHITE, n, r),
        t.drawSprite(a.muzzle, e.coatOutline, n, r),
        e.fangs && t.drawSprite(a.fangs, w.WHITE, n, r);
      var u = 0 | e.freckles;
      o && 3 === u ? u = 4 : o && 4 === u && (u = 3),
        t.drawSprite(_.at(x.ponyFreckles, u), e.frecklesColor, n, r),
        e.eyeshadow && (t.drawSprite(x.ponyEyeshadow, e.eyeshadowColor, n, r),
          t.drawSprite(x.ponyEyeshadowShine, w.SHINES_COLOR, n, r));
      var f = o ? e.eyeColorRight : e.eyeColorLeft,
        p = o ? e.eyeColorLeft : e.eyeColorRight,
        h = o ? e.eyeOpennessRight : e.eyeOpennessLeft,
        d = o ? e.eyeOpennessLeft : e.eyeOpennessRight;
      c(t, _.at(x.ponyEyeLeft, Math.max(i, h)), e, f, n, r),
        c(t, _.at(x.ponyEyeRight, Math.max(i, d)), e, p, n, r),
        l(t, x.ponyBackFrontManes, e.backMane, n, r),
        l(t, x.ponyTopManes, e.mane, n, r),
        l(t, x.ponyHorns, e.horn, n, r),
        s(t, x.ponyEar, e.coatFill, e.coatOutline, n, r),
        l(t, x.ponyFaceAccessories, e.faceAccessory, n, r),
        l(t, x.ponyEarAccessories, e.earAccessory, n, r),
        l(t, x.ponyFrontManes, e.mane, n, r)
    }

    function s(t, e, n, r, i, o) {
      e && e.fill && t.drawSprite(e.fill, n, i, o),
        e && e.outline && t.drawSprite(e.outline, r, i, o),
        e && e.extra && t.drawSprite(e.extra, w.WHITE, i, o)
    }

    function u(t, e, n, r, i, o) {
      e && e.forEach(function(e, a) {
        return s(t, e, _.at(n, a), _.at(r, a), i, o)
      })
    }

    function l(t, e, n, r, i) {
      if (n) {
        var o = _.at(e, n.type);
        o && u(t, _.at(o, n.pattern), n.fills, n.outlines, r, i)
      }
    }

    function c(t, e, n, r, i, o) {
      e && (t.drawSprite(e.fill, n.eyeWhites, i, o),
        t.drawSprite(e.iris, r, i, o),
        t.drawSprite(e.line, w.BLACK, i, o),
        n.eyelashes && t.drawSprite(e.lashes, n.coatOutline, i, o))
    }

    function f(t, e, n, r, i) {
      if (e)
        for (var o = 0; o < b.CM_SIZE; o++)
          for (var a = 0; a < b.CM_SIZE; a++) {
            var s = i ? e[b.CM_SIZE - a - 1 + o * b.CM_SIZE] : e[a + o * b.CM_SIZE];
            s && t.drawRect(s, n + a, r + o, 1, 1)
          }
    }

    function p(t, e, n, r, o, a, s) {
      void 0 === a && (a = !1),
        void 0 === s && (s = !1);
      try {
        i({
          drawSprite: function(e, n, r, i) {
            E.drawColoredSprite(t, e, n ? n.css() : "white", r, i)
          },
          drawRect: function(e, n, r, i, o) {
            t.fillStyle = e ? e.css() : "white",
              t.fillRect(n, r, i, o)
          }
        }, e, n, r, o, a, s)
      } catch (t) {
        console.error(t)
      }
    }

    function h(t, e, n, r, o, a, s) {
      void 0 === a && (a = !1),
        void 0 === s && (s = !1);
      try {
        i(t, e, n, r, o, a, s)
      } catch (t) {
        console.error(t)
      }
    }

    function d(t, n, r, i, o, a, s) {
      void 0 === a && (a = !1),
        void 0 === s && (s = !1);
      var u = i - e.PONY_WIDTH / 2,
        l = o - e.PONY_HEIGHT;
      s && t.drawSprite(x.ponSelection, null, n.defaultPalette, u, l),
        t.drawSprite(x.ponShadow, w.SHADOW_COLOR, n.defaultPalette, u, l);
      var c = r.animation,
        f = r.animationFrame % c.frames,
        p = (r.animationFrame + c.framesShift) % c.frames,
        h = _.at(c.headBobs, f),
        d = _.at(c.bodyBobs, f),
        g = u + d.x,
        b = l + d.y,
        E = u + h.x,
        $ = l + h.y;
      y(t, x.ponBackBehindManes, n.backMane, E, $);
      var S = !n.mane || !n.mane.type,
        T = S ? E - 1 : E,
        k = S ? $ + 4 : $;
      y(t, x.ponHeadAccessories, n.headAccessory, T, k);
      var M = u - 3,
        A = l - 1,
        C = c.frontLegs2,
        D = c.backLegs2,
        O = _.at(c.frontHooves2, n.frontHooves && n.frontHooves.type),
        I = _.at(c.backHooves2, n.backHooves && n.backHooves.type),
        R = c.frontLegAccessory2,
        F = c.backLegAccessory2;
      v(t, M, A, C, O, R, n.frontLegAccessory, p, n.coatPalette, n.frontHooves.palette, w.FAR_COLOR),
        v(t, M, A, D, I, F, n.backLegAccessory, p, n.coatPalette, n.backHooves.palette, w.FAR_COLOR),
        y(t, x.ponTails, n.tail, g, b),
        t.drawSprite(x.ponBody, null, n.coatPalette, g, b),
        v(t, u, l, C, O, R, n.frontLegAccessory, f, n.coatPalette, n.frontHooves.palette, w.WHITE),
        v(t, u, l, D, I, F, n.backLegAccessory, f, n.coatPalette, n.backHooves.palette, w.WHITE),
        t.drawSprite(a && n.cmFlip ? x.ponCMFlip : x.ponCM, null, n.cmPalette, g + 43, b + 49),
        y(t, x.ponWings, n.wings, g, b),
        y(t, x.ponNeckAccessories, n.neckAccessory, g, b),
        m(t, n, E, $, r.blinkFrame, a)
    }

    function v(t, e, n, r, i, o, a, s, u, l, c) {
      t.drawSprite(_.at(r, s), c, u, e, n),
        t.drawSprite(_.at(i, s), c, l, e, n),
        y(t, _.at(o, s), a, e, n, c)
    }

    function m(t, e, n, r, i, o) {
      void 0 === i && (i = 1),
        y(t, x.ponBehindManes, e.mane, n, r),
        t.drawSprite(x.ponEar2, null, e.coatPalette, n, r),
        t.drawSprite(x.ponHead, null, e.coatPalette, n, r),
        y(t, x.ponFacialHair, e.facialHair, n, r);
      var a = _.at(x.ponNoses, e.muzzle);
      t.drawSprite(a.mouth, null, e.defaultPalette, n, r),
        t.drawSprite(a.muzzle, null, e.coatPalette, n, r),
        e.fangs && t.drawSprite(a.fangs, null, e.defaultPalette, n, r);
      var s = 0 | e.freckles;
      o && 3 === s ? s = 4 : o && 4 === s && (s = 3),
        t.drawSprite(_.at(x.ponFreckles, s), null, e.frecklesColor, n, r),
        e.eyeshadow && (t.drawSprite(x.ponEyeshadow, null, e.eyeshadowColor, n, r),
          t.drawSprite(x.ponEyeshadowShine, w.SHINES_COLOR, e.defaultPalette, n, r));
      var u = o ? e.eyeColorRight : e.eyeColorLeft,
        l = o ? e.eyeColorLeft : e.eyeColorRight,
        c = o ? e.eyeOpennessRight : e.eyeOpennessLeft,
        f = o ? e.eyeOpennessLeft : e.eyeOpennessRight;
      g(t, _.at(x.ponEyeLeft, Math.max(i, c)), e, u, n, r),
        g(t, _.at(x.ponEyeRight, Math.max(i, f)), e, l, n, r),
        y(t, x.ponBackFrontManes, e.backMane, n, r),
        y(t, x.ponTopManes, e.mane, n, r),
        y(t, x.ponHorns, e.horn, n, r),
        t.drawSprite(x.ponEar, null, e.coatPalette, n, r),
        y(t, x.ponFaceAccessories, e.faceAccessory, n, r),
        y(t, x.ponEarAccessories, e.earAccessory, n, r),
        y(t, x.ponFrontManes, e.mane, n, r)
    }

    function g(t, e, n, r, i, o) {
      e && (t.drawSprite(n.eyelashes ? e.lashes : e.normal, null, r, i, o),
        t.drawSprite(e.iris, null, r, i, o))
    }

    function y(t, e, n, r, i, o) {
      var a = n && _.at(e, n.type);
      a && t.drawSprite(_.at(a, n.pattern), o, n.palette, r, i)
    }

    var b = t("21"),
      _ = t("22"),
      w = t("24"),
      x = t("1f"),
      E = t("3b"),
      $ = t("5c");
    return e.PONY_WIDTH = 80,
      e.PONY_HEIGHT = 70,
      e.BLINK_FRAMES = [2, 6, 6, 4, 2],
      e.createDefaultPonyState = r,
      e.drawPony2D = p,
      e.drawPonyGL = h,
      e.drawPonyGL2 = d,
      n.exports
  });
  System.registerDynamic("cd", ["21", "31", "43"], !0, function(t, e, n) {
    "use strict";
    var r = t("21"),
      i = t("31"),
      o = t("43"),
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
  System.registerDynamic("ce", [], !0, function(t, e, n) {
    return n.exports = '<div class="text-center heading"><img src="/images/logo.png" width="574" height="130" class="hidden-xs"><img src="/images/logo-small.png" width="287" height="65" class="hidden-lg hidden-md hidden-sm"></div><div class="center-block home-content"><div ng-if="vm.model.loading" style="font-size: 50px; padding: 150px 0;" class="text-muted text-center"><i class="fa fa-fw fa-spin fa-spinner"></i></div><div ng-if="!vm.model.loading"><div ng-if="!vm.model.account" class="form-group"><sign-in-box></sign-in-box></div><div ng-if="vm.authError" class="form-group"><div class="alert alert-danger">{{vm.authError}}</div></div><div ng-if="!!vm.model.account"><div class="form-group"><div class="input-group"><input type="text" ng-model="vm.pony.name" placeholder="name of your character" maxlength="{{vm.maxNameLength}}" ng-disabled="vm.joining" class="form-control text-center"><div class="input-group-btn"><a href="/character" ng-class="{ disabled: vm.joining }" class="btn btn-default">edit</a><div uib-dropdown style="width: auto;" class="btn-group"><button type="button" ng-disabled="!vm.ponies.length || vm.joining" uib-dropdown-toggle class="btn btn-default"><span class="caret"></span></button><ul uib-dropdown-menu class="dropdown-menu-right"><li ng-repeat="i in vm.ponies | orderBy:\'name\' track by $index"><a href="#" ng-click="vm.select(i)">{{i.name}}</a></li><li ng-if="vm.canNew"><a href="#" ng-click="vm.new()" class="text-center"><em>new pony</em></a></li></ul></div></div></div></div><div class="form-group"><character-preview pony="vm.pony" state="vm.state"></character-preview></div><div class="form-group text-center"><play-box></play-box></div><div style="max-width: 400px;" class="rules center-block text-left"><h4>General rules</h4><ul class="text-muted"><li>Be kind to others</li><li>Don\'t spam</li><li>Don\'t modify the game with hacks or scripts</li><li>Don\'t encourage spamming or hacking</li></ul></div><div style="max-width: 400px;" class="rules center-block text-left"><h4>Notice</h4><p class="text-muted">This game is very early in development. There might be bugs and occasional downtimes.</p><p class="text-muted">Please do not redistribute any of the game files or code.</p></div></div></div></div>',
      n.exports
  });
  System.registerDynamic("cf", [], !0, function(t, e, n) {
    return n.exports = '<h1>About</h1><div class="row"><div class="col-md-6"><p class="lead">A game of ponies building a town\n</p><h2>Keyboard shortcuts</h2><ul><li><b>movement</b><ul><li>use <kbd><i class="fa fa-arrow-up"></i></kbd> <kbd><i class="fa fa-arrow-left"></i></kbd> <kbd><i class="fa fa-arrow-down"></i></kbd> <kbd><i class="fa fa-arrow-right"></i></kbd>\nor <kbd class="b">W</kbd> <kbd class="b">A</kbd> <kbd class="b">S</kbd> <kbd class="b">D</kbd> to move</li><li>hold <kbd class="b">shift</kbd> to walk slowly</li></ul></li><li><b>chat</b><ul><li><kbd class="b">enter</kbd> to open chat box and send a message</li><li><kbd class="b">esc</kbd> to cancel the message</li></ul></li><li><b>zoom (1x, 2x, 3x, 4x)</b> - <kbd class="b">P</kbd></li><li><b>hide all text</b> - <kbd class="b">F2</kbd></li><li><b>fullscreen</b> - <kbd class="b">F11</kbd></li><li>hold <kbd class="b">shift</kbd> to be able to click on ground and items behind other players</li></ul><h2>Emotes</h2><p>You can use emotes in chat by typings their name surrounded by colons <samp>:apple:</samp>\nor by using unicode characters assigned to them. Available emotes:\n</p><ul><li>:face: - ツ</li><li>:derp: - シ</li><li>:heart: - ❤</li><li>:rock: - ⽯</li><li>:apple: - 🍎</li><li>:pizza: - 🍕</li><li>:pumpkin: - 🎃</li></ul><h2>Technology</h2><p>The entire game is written in <a href="http://www.typescriptlang.org/">TypeScript</a>,\na typed superset of JavaScript that compiles to plain JavaScript.\nServer side code is running on <a href="https://nodejs.org/en/">Node.js</a> server with WebSockets for communication.\nUser interface is built using <a href="https://angularjs.org/">Angular.js</a> framework and \nthe game itself is using WebGL for rendering graphics.\n</p><h2>The Team</h2><h3 id="agamnentzar">Agamnentzar</h3>\n<p><a href="http://agamnentzar.deviantart.com/">deviantart</a> | <a href="http://agamnentzar.tumblr.com/">tumblr</a></p>\n<ul>\n<li>Designer</li>\n<li>Programmer</li>\n<li>Artist</li>\n</ul>\n<h3 id="shino">Shino</h3>\n<p><a href="http://shinodage.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n<li>Animator</li>\n</ul>\n<h3 id="chirachan">ChiraChan</h3>\n<p><a href="http://chiramii-chan.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<h3 id="velenor">Velenor</h3>\n<p><a href="http://velenor.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n<li>Animator</li>\n</ul>\n<h3 id="disastral">Disastral</h3>\n<p><a href="http://askdisastral.tumblr.com/">tumblr</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<h3 id="cyberpon3">CyberPon3</h3>\n<p><a href="http://cyberpon3.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Programmer</li>\n</ul>\n<h2>Other contributors</h2><p><strong>OtakuAP</strong> - <a href="http://otakuap.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n<li>Animator</li>\n</ul>\n<p><strong>Velvet-Frost</strong> - <a href="http://velvet-frost.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<p><strong>Jet7Wave</strong> - <a href="http://jetwave.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<p><strong>Meno</strong> - <a href="http://menojar.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<p><strong>Lalieri</strong> - <a href="http://lalieri.tumblr.com/">tumblr</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n</div><div class="col-md-6"><h2>Changelog</h2><h4 id="v0-15-1">v0.15.1</h4>\n<ul>\n<li>Fixed errors when leaving and joining the game</li>\n<li>Fixed selection ring not showing up</li>\n<li>Fixed non-flipped buttmark being drawn incorrectly</li>\n<li>Fixed color parsing issue with empty colors</li>\n<li>Fixed locking colors for accessories</li>\n</ul>\n<h4 id="v0-15-0">v0.15.0</h4>\n<ul>\n<li>Added socks</li>\n<li>Added server name in settings dropdown</li>\n<li>Added associated social site account list on account page</li>\n<li>Added saving of last used zoom level</li>\n<li>Removed security check causing page styles to not load on some setups</li>\n<li>Improved performance of rendering engine</li>\n<li>Fixed redirecting to home page when reloading account page</li>\n<li>Fixed game screen blinking randomly</li>\n</ul>\n<h4 id="v0-14-5">v0.14.5</h4>\n<ul>\n<li>Fixed wrapping long names on character selection box</li>\n</ul>\n<h4 id="v0-14-4">v0.14.4</h4>\n<ul>\n<li>Added duplicate character option to character creator</li>\n<li>Added better error handling for DDOS protection errors</li>\n<li>Added option to share social accounts on pony selection box</li>\n<li>Added automatic closing of pony selection box when selected pony leaves the game</li>\n<li>Enabled swear filter by default on safe server</li>\n<li>Removed security check causing page to not load on some setups</li>\n<li>Fixed game crashing when changing scale if given resolution is not suported</li>\n<li>Fixed caching issues with main page</li>\n</ul>\n<h4 id="v0-14-3">v0.14.3</h4>\n<ul>\n<li>Fixed color picker hiding when selecting a color</li>\n<li>Fixed color picker input not selecting text when focused on firefox</li>\n<li>Fixed performance issue when selecting colors in character creator</li>\n<li>Fixed being redirected to home page from character creator on refresh</li>\n</ul>\n<h4 id="v0-14-2">v0.14.2</h4>\n<ul>\n<li>Added client script version check when joining to the game</li>\n</ul>\n<h4 id="v0-14-1">v0.14.1</h4>\n<ul>\n<li>Hotfixes</li>\n</ul>\n<h4 id="v0-14-0">v0.14.0</h4>\n<ul>\n<li>Added selecting other players (hold <kbd>shift</kbd> to be able to click on ground and items behind other players)</li>\n<li>Added option for ignoring other players</li>\n<li>Fixed about page inaccuracies</li>\n<li>Fixed gamepad controls</li>\n</ul>\n<h4 id="v0-13-2">v0.13.2</h4>\n<ul>\n<li>Added slow walking with <kbd>shift</kbd> key</li>\n<li>Adjusted day-night cycle length and night darkness intensity</li>\n<li>Adjusted dead zone for gamepads</li>\n<li>Improved networking performance</li>\n<li>Fixed disconnect issues on mobile devices</li>\n</ul>\n<h4 id="v0-13-1">v0.13.1</h4>\n<ul>\n<li>Fixed multiple servers not connecting properly</li>\n</ul>\n<h4 id="v0-13-0">v0.13.0</h4>\n<ul>\n<li>Added touch and gamepad controls</li>\n<li>Added day-night cycle</li>\n<li>Added game time clock</li>\n<li>Added option to leave game without having to reload the page</li>\n<li>Added support for multiple servers</li>\n<li>Fixed horn outlines</li>\n<li>Fixed zoom repeating when holding zoom key</li>\n<li>Fixed getting logged out when closing browser</li>\n</ul>\n<h4 id="v0-12-1">v0.12.1</h4>\n<ul>\n<li>Added back lighting test shortcut <kbd>T</kbd></li>\n<li>Added keyboard shortcut <kbd>F2</kbd> for hiding all text messages</li>\n<li>Fixed issue with setting color and opennes independently for left and right eye</li>\n<li>Fixed issue with incorrect pony name text placement</li>\n<li>Fixed being able to spawn inside a tree</li>\n</ul>\n<h4 id="v0-12-0">v0.12.0</h4>\n<ul>\n<li>Added trees</li>\n<li>Added pumpkins</li>\n<li>Added eyeshadow</li>\n<li>Added hats</li>\n<li>Added tie</li>\n<li>Added reading glasses</li>\n<li>Added flower ear accessory</li>\n<li>Added new face markings</li>\n<li>Added new emotes</li>\n<li>Changed map design</li>\n<li>Fixed head accessories placement without hair</li>\n<li>Fixed not being able to set 6th color on 2nd mane</li>\n</ul>\n<h4 id="v0-11-4">v0.11.4</h4>\n<ul>\n<li>Added new scarf pattern</li>\n<li>Improved rendering performance</li>\n<li>Fixed not being able to see name of a pony when they are saying something</li>\n<li>Fixed issues with server restart</li>\n<li>Fixed fetlocks in trot animation</li>\n<li>Fixed issues with font and emote spacing</li>\n</ul>\n<h4 id="v0-11-3">v0.11.3</h4>\n<ul>\n<li>Added scarf accessory</li>\n<li>Added option for hiding all chat messages with russian text</li>\n<li>Added list of rules and in-development notice</li>\n<li>Fixed some issues with chat messages</li>\n<li>Fixed multiple issues with manes</li>\n<li>Fixed issue with fetlocks</li>\n</ul>\n<h4 id="v0-11-2">v0.11.2</h4>\n<ul>\n<li>Added announcements support</li>\n<li>Added hide background switch for pony creator</li>\n<li>Removed stones from the spawning area</li>\n</ul>\n<h4 id="v0-11-1">v0.11.1</h4>\n<ul>\n<li>Added polish characters to pixel font</li>\n<li>Fixed sign-in with facebook</li>\n<li>Fixed cancelling character edit</li>\n<li>Fixed clouds</li>\n<li>Fixed spelling mistake</li>\n<li>Fixed buttmark position</li>\n</ul>\n<h4 id="v0-11-0">v0.11.0</h4>\n<ul>\n<li>Added cyrillic characters to pixel font</li>\n<li>Added logos</li>\n<li>Added optional swear filter</li>\n<li>Added more mane styles</li>\n<li>Reworked sign-in and account system</li>\n<li>Improved networking performance</li>\n</ul>\n<h4 id="v0-10-1">v0.10.1</h4>\n<ul>\n<li>Fixed connection resetting every 10 seconds when not in game</li>\n</ul>\n<h4 id="v0-10-0">v0.10.0</h4>\n<ul>\n<li>Added back butterflies</li>\n<li>Improved networking performance</li>\n<li>Fixed not initialized errors</li>\n<li>Fixed deleting character not updating character list</li>\n<li>Fixed cursor and camera offset errors on screens with high pixel density</li>\n<li>Fixed styling issue in chat box</li>\n</ul>\n<h4 id="v0-9-8">v0.9.8</h4>\n<ul>\n<li>Improved connection performance</li>\n<li>Fixed issues with chat box focus on Safari and Edge</li>\n</ul>\n<h4 id="v0-9-7">v0.9.7</h4>\n<ul>\n<li>Added chat buttons</li>\n<li>Improved connection performance</li>\n<li>Fixed automatically signing in after signing up for new account</li>\n<li>Fixed character name not saving if joining the game from home screen</li>\n</ul>\n<h4 id="v0-9-6">v0.9.6</h4>\n<ul>\n<li>Added logging off after 15 minutes of no activity</li>\n<li>Improved performance of joining to the game</li>\n<li>Fixed multiple issues with character creator on IE11</li>\n</ul>\n<h4 id="v0-9-5">v0.9.5</h4>\n<ul>\n<li>Fixed non-flippable buttmarks</li>\n<li>Fixed some rate limiting issues</li>\n</ul>\n<h4 id="v0-9-4">v0.9.4</h4>\n<ul>\n<li>Removed ability to log into the same character multiple times</li>\n<li>Added back rocks</li>\n<li>Added displaying of WegGL initialization error</li>\n</ul>\n<h4 id="v0-9-3">v0.9.3</h4>\n<ul>\n<li>Removed rocks</li>\n</ul>\n<h4 id="v0-9-2">v0.9.2</h4>\n<ul>\n<li>Removed butterflies</li>\n<li>Removed debug code</li>\n</ul>\n<h4 id="v0-9-1">v0.9.1</h4>\n<ul>\n<li>Fixed issue with rendering when value is out of range</li>\n</ul>\n<h4 id="v0-9-0">v0.9.0</h4>\n<ul>\n<li>Added shading to trot animation</li>\n<li>Added new mane styles</li>\n<li>Added mane color patterns</li>\n<li>Added option for non-flippable butt marks</li>\n<li>Added account system</li>\n<li>Added saving characters on server side</li>\n<li>Fixed eye colors switching sides  when turning left and right</li>\n<li>Fixed performance issues with rendering</li>\n<li>Fixed shader code not working on some low end devices</li>\n<li>Fixed errors when character has invalid values set for sprite types</li>\n<li>Fixed being able to use transparency for character colors</li>\n<li>Fixed chat not limiting characters properly</li>\n</ul>\n<h4 id="v0-8-0">v0.8.0</h4>\n<ul>\n<li>Added character customization in game</li>\n<li>Added eye blinking</li>\n<li>Added character selection on home screen</li>\n</ul>\n<h4 id="v0-7-0">v0.7.0</h4>\n<ul>\n<li>Removed spawn command</li>\n<li>Added character creation prototype</li>\n</ul>\n<h4 id="v0-6-1">v0.6.1</h4>\n<ul>\n<li>Fixed mouse not working in the game</li>\n</ul>\n<h4 id="v0-6-0">v0.6.0</h4>\n<ul>\n<li>Added AFK indicator</li>\n<li>Updated styles</li>\n<li>Fixed wrong cursor position on retina displays and zommed in pages</li>\n<li>Fixed emoticon parsing</li>\n<li>Fixed issue on mobile devices</li>\n</ul>\n<h4 id="v0-5-0">v0.5.0</h4>\n<ul>\n<li>Added butterfies</li>\n<li>Added apples</li>\n<li>Added apple emote to chat</li>\n<li>Fixed login form not displaying on mobile safari</li>\n</ul>\n</div></div>',
      n.exports
  });
  System.registerDynamic("d0", [], !0, function(t, e, n) {
    return n.exports = '<div ng-init="vm.init()" class="row"><div class="col-md-6 text-center"><div style="max-width: 400px; margin: auto;" class="input-group"><input type="text" ng-model="vm.pony.name" placeholder="name of your character" maxlength="{{vm.maxNameLength}}" autofocus class="form-control text-center"><div class="input-group-btn"><button type="button" ng-click="vm.new()" ng-disabled="!vm.canNew" class="btn btn-default">new</button><div uib-dropdown class="btn-group"><button type="button" ng-disabled="!vm.ponies.length" uib-dropdown-toggle class="btn btn-default"><span class="caret"></span></button><ul uib-dropdown-menu class="dropdown-menu-right"><li ng-repeat="p in vm.ponies | orderBy:\'name\' track by $index"><a href="#" ng-click="vm.select(p)">{{p.name}}</a></li></ul></div><button type="button" ng-if="!vm.deleting" ng-disabled="!vm.canDelete" ng-click="vm.deleting = true" title="delete pony" class="btn btn-danger"><i class="fa fa-trash"></i></button><button type="button" ng-if="vm.deleting" ng-disabled="!vm.canDelete" ng-click="vm.deleting = false" uib-tooltip="cancel" class="btn btn-danger"><i class="fa fa-fw fa-times"></i></button><button type="button" ng-if="vm.deleting" ng-disabled="!vm.canDelete" ng-click="vm.delete()" uib-tooltip="confirm delete" class="btn btn-success"><i class="fa fa-fw fa-check"></i></button></div></div><div style="margin: 30px 0 20px 0;" class="text-center"><character-preview pony="vm.pony" state="vm.state" no-background="vm.noBackground"></character-preview></div><div class="form-group text-center"><button ng-disabled="!vm.canDuplicate" ng-click="vm.duplicate()" class="btn btn-lg btn-default">Duplicate</button> <button ng-disabled="!vm.canRevert" ng-click="vm.revert()" class="btn btn-lg btn-default">Revert</button> <button ng-disabled="!vm.canSave" ng-click="vm.save()" class="btn btn-lg btn-default">Save</button></div><div style="max-width: 400px;" class="center-block"><play-box label="Save and Play" error="vm.error"></play-box></div><div style="max-width: 400px;" class="rules center-block text-left"><h4>General rules</h4><ul class="text-muted"><li>Be kind to others</li><li>Don\'t spam</li><li>Don\'t modify the game with hacks or scripts</li><li>Don\'t encourage spamming or hacking</li></ul></div><div style="max-width: 400px;" class="rules center-block text-left"><h4>Notice</h4><p class="text-muted">This game is very early in development. There might be bugs and occasional downtimes.</p><p class="text-muted">Please do not redistribute any of the game files or code.</p></div></div><div style="min-height: 500px;" class="col-md-6"><uib-tabset type="pills" active="vm.activeTab" ng-if="vm.loaded"><uib-tab heading="body"><div class="panel container-fluid character-tab"><div class="form-horizontal"><div class="row form-group"><div class="col-sm-4"><label class="control-label">General options</label></div><div class="col-sm-8"><div class="clearfix"><check-box icon="fa-check" checked="vm.pony.customOutlines" class="pull-left"></check-box><label style="margin-left: 10px;" class="form-control-static text-muted">allow custom outlines</label></div></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Show social site</label></div><div class="col-sm-8"><div uib-dropdown class="dropdown"><button uib-dropdown-toggle class="btn btn-default"><i ng-if="vm.site.icon" ng-class="vm.site.icon" ng-style="{ color: vm.site.color }" class="fa fa-fw fa-lg"></i><b> {{vm.site.name}} </b><span class="caret"></span></button><ul uib-dropdown-menu class="dropdown-menu"><li ng-repeat="s in vm.sites"><a ng-click="vm.site = s"><i ng-class="s.icon" ng-style="{ color: s.color }" class="fa fa-fw fa-lg"></i><b> {{s.name}}</b></a></li></ul></div></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Animation</label></div><div class="col-sm-8"><div class="btn-group"><label ng-repeat="a in ::vm.animations" ng-model="vm.activeAnimation" uib-btn-radio="::$index" class="btn btn-primary">{{::a.name}}</label></div> <button ng-if="vm.canExport" ng-click="vm.export()" class="btn btn-default">export</button></div></div><div class="row form-group"><div class="col-sm-4"><check-box icon="fa-play" checked="vm.playAnimation" class="lock-box"></check-box><label class="control-label">Frame</label></div><div class="col-sm-8"><input type="number" ng-model="vm.state.animationFrame" ng-disabled="vm.playAnimation" min="0" class="form-control"></div></div><hr><fill-outline label="Body color" fill="vm.pony.coatFill" outline="vm.pony.coatOutline" outline-locked="vm.pony.lockCoatOutline" outline-hidden="!vm.customOutlines"></fill-outline><hr><sprite-set-selection label="Horn" base="vm.baseCoatColor" set="vm.pony.horn" sets="::vm.horns" outline-hidden="!vm.customOutlines" compact="true"></sprite-set-selection><hr><sprite-set-selection label="Wings" base="vm.baseCoatColor" set="vm.pony.wings" sets="::vm.wings" outline-hidden="!vm.customOutlines" compact="true"></sprite-set-selection><hr><sprite-set-selection label="Front hooves" base="vm.baseCoatColor" set="vm.pony.frontHooves" sets="::vm.frontHooves" outline-hidden="!vm.customOutlines" compact="true"></sprite-set-selection><hr><sprite-set-selection label="Back hooves" base="vm.baseCoatColor" set="vm.pony.backHooves" sets="::vm.backHooves" outline-hidden="!vm.customOutlines" compact="true"></sprite-set-selection><hr><div class="row form-group"><div class="col-sm-12 text-center"><label class="control-label text-muted">Butt mark</label></div></div><div class="row form-group"><div class="col-sm-7"><button ng-click="vm.clearCM()" title="Clear all" class="btn btn-primary"><i class="fa fa-fw fa-trash"></i></button> <div class="btn-group"><label ng-model="vm.brushType" uib-btn-radio="\'eraser\'" title="Eraser" class="btn btn-primary"><i class="fa fa-fw fa-eraser"></i></label><label ng-model="vm.brushType" uib-btn-radio="\'eyedropper\'" title="Eyedropper" class="btn btn-primary"><i class="fa fa-fw fa-eyedropper"></i></label><label ng-model="vm.brushType" uib-btn-radio="\'brush\'" title="Brush" class="btn btn-primary"><i class="fa fa-fw fa-paint-brush"></i></label></div></div><div class="col-sm-5"><color-picker color="vm.brush"></color-picker></div></div><div class="row form-group"><div class="col-sm-12 text-center"><bitmap-box bitmap="vm.pony.cm" tool="vm.brushType" color="vm.brush" width="::vm.cmSize" height="::vm.cmSize"></bitmap-box></div></div><div class="row form-group"><div class="col-sm-12 text-center"><check-box icon="fa-check" checked="vm.pony.cmFlip"></check-box><label style="margin-left: 10px; vertical-align: top;" class="form-control-static text-muted">don\'t flip mark on the other side</label></div></div><hr><div class="row form-group"><div class="col-sm-4"><label class="control-label">Other options</label></div><div class="col-sm-8"><div class="clearfix"><check-box icon="fa-check" checked="vm.noBackground" class="pull-left"></check-box><label style="margin-left: 10px;" class="form-control-static text-muted">hide background</label></div></div></div></div></div></uib-tab><uib-tab heading="mane"><div class="panel container-fluid character-tab"><div class="form-horizontal"><sprite-set-selection label="Mane" base="vm.baseHairColor" set="vm.pony.mane" sets="::vm.manes" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection><hr><sprite-set-selection label="Back mane" base="vm.baseHairColor" set="vm.pony.backMane" sets="::vm.backManes" outline-hidden="!vm.customOutlines"></sprite-set-selection></div></div></uib-tab><uib-tab heading="tail"><div class="panel container-fluid character-tab"><div class="form-horizontal"><sprite-set-selection label="Tail" base="vm.baseHairColor" set="vm.pony.tail" sets="::vm.tails" outline-hidden="!vm.customOutlines"></sprite-set-selection></div></div></uib-tab><uib-tab heading="face"><div class="panel container-fluid character-tab"><div class="form-horizontal"><div class="row form-group"><div class="col-sm-4"><label class="control-label">Eyelashes</label></div><div class="col-sm-8"><div class="btn-group"><label ng-model="vm.pony.eyelashes" uib-btn-radio="0" class="btn btn-primary">no</label><label ng-model="vm.pony.eyelashes" uib-btn-radio="1" class="btn btn-primary">yes</label></div></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Eye color</label></div><div class="col-sm-8"><color-picker color="vm.pony.eyeColorRight" changed="vm.eyeColorLockChanged(vm.pony.lockEyeColor)"></color-picker></div></div><div class="row form-group"><div class="col-sm-4"><check-box checked="vm.pony.lockEyeColor" icon="fa-lock" changed="vm.eyeColorLockChanged($value)" class="lock-box"></check-box><label class="control-label">Eye color (left)</label></div><div class="col-sm-8"><color-picker color="vm.pony.eyeColorLeft" is-disabled="vm.pony.lockEyeColor"></color-picker></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Eye whites color</label></div><div class="col-sm-8"><color-picker color="vm.pony.eyeWhites"></color-picker></div></div><div class="row form-group"><div class="col-sm-4"><check-box checked="vm.pony.lockEyes" icon="fa-lock" changed="vm.eyeOpennessChanged($value)" class="lock-box"></check-box><label class="control-label">Eye openness</label></div><div class="col-sm-4 col-xs-6"><input type="number" ng-model="vm.pony.eyeOpennessRight" min="1" max="6" step="1" ng-change="vm.eyeOpennessChanged(vm.pony.lockEyes)" class="form-control"></div><div class="col-sm-4 col-xs-6"><input type="number" ng-model="vm.pony.eyeOpennessLeft" min="1" max="6" step="1" ng-disabled="vm.pony.lockEyes" class="form-control"></div></div><div class="row form-group"><div class="col-sm-4"><check-box checked="vm.pony.eyeshadow" icon="fa-check" class="lock-box"></check-box><label class="control-label">Eyeshadow</label></div><div class="col-sm-8"><color-picker color="vm.pony.eyeshadowColor" is-disabled="!vm.pony.eyeshadow"></color-picker></div></div><hr><div class="row form-group"><div class="col-sm-4"><label class="control-label">Expression</label></div><div class="col-sm-8"><sprite-selection selected="vm.pony.muzzle" sprites="vm.muzzles" fill="vm.pony.coatFill" outline="vm.pony.coatOutline" circle="vm.pony.coatFill"></sprite-selection></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Fangs</label></div><div class="col-sm-8"><sprite-selection selected="vm.pony.fangs" sprites="vm.fangs" outline="vm.pony.coatOutline" circle="vm.pony.coatFill"></sprite-selection></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Markings</label></div><div class="col-sm-8"><sprite-selection selected="vm.pony.freckles" sprites="vm.freckles" fill="vm.pony.frecklesColor" outline="vm.pony.coatOutline" circle="vm.pony.coatFill"></sprite-selection></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Markings color</label></div><div class="col-sm-8"><color-picker color="vm.pony.frecklesColor" is-disabled="!vm.pony.freckles"></color-picker></div></div><hr><sprite-set-selection label="Facial hair" base="vm.baseHairColor" set="vm.pony.facialHair" sets="::vm.facialHair" outline-hidden="!vm.customOutlines"></sprite-set-selection></div></div></uib-tab><uib-tab heading="other"><div class="panel container-fluid character-tab"><div class="form-horizontal"><uib-tabset active="vm.activeAccessoryTab"><uib-tab heading="head"><div style="margin-top: 10px;"><sprite-set-selection label="Head accessories" base="vm.baseHeadAccessoryColor" set="vm.pony.headAccessory" sets="::vm.headAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection><hr><sprite-set-selection label="Ear accessories" base="vm.baseEarAccessoryColor" set="vm.pony.earAccessory" sets="::vm.earAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection><hr><sprite-set-selection label="Face accessories" base="vm.baseFaceAccessoryColor" set="vm.pony.faceAccessory" sets="::vm.faceAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection></div></uib-tab><uib-tab heading="neck"><div style="margin-top: 10px;"><sprite-set-selection label="Neck accessories" base="vm.baseNeckAccessoryColor" set="vm.pony.neckAccessory" sets="::vm.neckAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection></div></uib-tab><uib-tab heading="legs"><div style="margin-top: 10px;"><sprite-set-selection label="Front leg accessories" base="vm.baseFrontLegAccessoryColor" set="vm.pony.frontLegAccessory" sets="::vm.frontLegAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection><hr><sprite-set-selection label="Back leg accessories" base="vm.baseBackLegAccessoryColor" set="vm.pony.backLegAccessory" sets="::vm.backLegAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection></div></uib-tab></uib-tabset></div></div></uib-tab></uib-tabset></div></div>',
      n.exports
  });
  System.registerDynamic("d1", [], !0, function(t, e, n) {
    return n.exports = '<div ng-init="vm.init()"><h1>Account settings</h1></div><div class="row"><div class="col-md-6"><form name="form" ng-submit="vm.submit()" style="max-width: 400px;" class="form"><div class="form-group"><h3>Account details</h3></div><div class="form-group"><label for="account-name" class="control-label">name</label><input id="account-name" type="text" ng-model="vm.data.name" required maxlength="{{vm.nameMaxLength}}" class="form-control"></div><div ng-if="vm.error" class="form-group"><div class="alert alert-danger">{{vm.error}}</div></div><div class="form-group"><button type="submit" ng-disabled="!vm.canSubmit || form.$pristine || form.$invalid || form.$pending" class="btn btn-primary">Save</button></div></form></div><div class="col-md-6"><div class="form form-horizontal"><div class="form-group row"><div class="col-xs-12"><h3>Game settings</h3></div></div><div class="form-group row"><div class="col-xs-6"><label class="control-label">bad word filter</label></div><div class="col-xs-6 btn-group"><label ng-model="vm.settings.filterSwearWords" uib-btn-radio="true" class="btn btn-primary">ON</label><label ng-model="vm.settings.filterSwearWords" uib-btn-radio="false" class="btn btn-primary">OFF</label></div></div><div class="form-group row"><div class="col-xs-6"><label class="control-label">hide all messages with russian text</label></div><div class="col-xs-6 btn-group"><label ng-model="vm.settings.filterCyrillic" uib-btn-radio="true" class="btn btn-primary">ON</label><label ng-model="vm.settings.filterCyrillic" uib-btn-radio="false" class="btn btn-primary">OFF</label></div></div></div><h3>Connected accounts</h3><div ng-repeat="s in vm.sites"><a ng-href="{{s.url}}" target="_blank"><i ng-class="s.icon" class="fa fa-fw fa-lg"></i><b>{{s.name}}</b></a></div></div><div class="row"><div class="col-xs-12"><a href="/" style="max-width: 200px; margin-top: 50px;" class="btn btn-lg btn-primary btn-block center-block"><i class="fa fa-angle-double-left"></i> Back to game</a></div></div></div>',
      n.exports
  });
  System.registerDynamic("d2", [getCodeName("AngularRoute"), getCodeName("AngularAnimate"), "b", getCodeName("Angular"), "a7", "a8", "a9", "aa", "cd", "ce", "cf", "d0", "d1"], !0, function(t, e, n) {
    "use strict";
    t(getCodeName("AngularRoute")),
      t(getCodeName("AngularAnimate")),
      t("b");
    var r = t(getCodeName("Angular")),
      i = t("a7");
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
      }),
      e.app.run(["$http", function(t) {
        window.__sriTestPassed || t.get("/scripts/test.js").then(function(e) {
          var n = e.data;
          return t.post("/api2/sri", {
            script: n
          })
        })
      }]);
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
      template: t("a8")
    });
    var a = t("a9"),
      s = t("aa"),
      u = t("cd");
    return e.app.config(["$routeProvider", "$locationProvider", function(e, n) {
        n.html5Mode(!0),
          e.when("/", {
            template: t("ce"),
            controller: u.default,
            controllerAs: "vm"
          }).when("/about", {
            template: t("cf"),
            controller: function() {},
            controllerAs: "vm"
          }).when("/character", {
            template: t("d0"),
            controller: a.default,
            controllerAs: "vm"
          }).when("/account", {
            template: t("d1"),
            controller: s.default,
            controllerAs: "vm"
          }).otherwise({
            redirectTo: "/"
          })
      }]),
      n.exports
  });
  System.registerDynamic("20", [], !0, function(t, e, n) {
    "use strict";

    function r(t) {
      return "undefined" != typeof document ? document.body.getAttribute(t) : null
    }

    function i(t) {
      return "undefined" != typeof document ? document.getElementById(t).innerHTML : null
    }

    return e.debug = "true" === r("data-debug"),
      e.debugOptions = e.debug && "undefined" != typeof localStorage ? localStorage : {},
      e.version = r("data-version") || null,
      e.oauthProviders = JSON.parse(i("oauth-providers") || "[]"),
      n.exports
  });
  System.registerDynamic("main", ["3", "4", "5", "d2", getCodeName("BlueBird"), getCodeName("Angular"), "20"], !0, function(t, e, n) {
    "use strict";
    window.__ponytown = !0,
      t("3"),
      t("4"),
      t("5"),
      t("d2");
    var r = t(getCodeName("BlueBird")),
      i = t(getCodeName("Angular")),
      o = t("20");
    o.debug && r.config({
        warnings: !1,
        longStackTraces: !0
      }),
      //    i.element().ready(function () {
      //        return
      i.bootstrap(document, ["app"]);
    // })
    return n.exports
  })
}