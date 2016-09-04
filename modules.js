var npmModules = (function(System) {
    var mdls = {
       "toBlobShim":{
            name:"4",
            dependencies: [],
            executingRequire:false
        },
        "CanvasContext2DEllipseShim":
            name:"5",
            dependencies: [],
            executingRequire:false
        },
        "angular.js":
            name:"d3",
            dependencies: [],
            executingRequire:false
        
    }
          
    var PassThroughs={
      Angular:{
        name:"7"
        passTo:"angular.js"
      }
    }
    
    libraries["SystemJS/lib/global-helers.js"]("undefined" != typeof self ? self : global);
    libraries.amdModules("undefined" != typeof self ? self : global);
    Object.keys(mdls).forEach(register);
    
    function getRegisterArray(name){
        var obj=mdls[name];
        return [obj.name,obj.dependencies,obj.executingRequire,libraries[name]];
    }
    function register(name) {
        var registerArray=getRegisterArray(name);
        System.registerDynamic.apply(this,registerArray);
    }
    function registerPassthrough(name) {
        var obj=PassThroughs[name];
        System.registerDynamic(obj.name,[mdls[obj[name]].name],true,function(require,exports,module){
        module.exports = require(mdls[obj[name]].name);
        return module.exports;
        });
    }

});
var libraries;
var modules =
  function (System) {
    //These variables are not used in ponytown.
    var e = this.require
      , n = this.exports
      , r = this.module;
      libraries=getLibraries(System);
      npmModules(System);
      (function () {
        !function (t, i) {
          "function" == typeof System.amdDefine && System.amdDefine.amd ? System.amdDefine("2", [], i) : "object" == typeof n ? r.exports = i() : t.returnExports = i()
        }(this, libraries.es6)
      })();
      (function () {
        var e = System.amdDefine;
        e("3", ["2"], function (t) {
          return t
        })
      })();
      
      System.registerDynamic("6", ["7"], !1, function (e, n, r) {
        var i = System.get("@@global-helpers").prepareGlobal(r.id, null, null);
        libraries.angular_route();
        return i();
      });
      System.registerDynamic("8", ["6"], !0, function (t, e, n) {
        return n.exports = t("6"),
          n.exports
      });
      System.registerDynamic("9", ["7"], !1, function (e, n, r) {
        var i = System.get("@@global-helpers").prepareGlobal(r.id, null, null);
        libraries.angular_animate();
        return i()
      });
      System.registerDynamic("a", ["9"], !0, function (t, e, n) {
        return n.exports = t("9"),
          n.exports
      });
      System.registerDynamic("b", [], !1, function (e, n, r) {
        var i = System.get("@@global-helpers").prepareGlobal(r.id, null, null);
        libraries.angularUI();
        return i()
      });
      System.registerDynamic("c", [], !1, function (e, i, o) {
        var a = System.get("@@global-helpers").prepareGlobal(o.id, null, null);
        libraries.bluebird();
        return a();
      });
      System.registerDynamic("d", ["c"], !0, function (t, e, n) {
        return n.exports = t("c"),
          n.exports
      });
      System.registerDynamic("e", [], !0, function (t, e, n) {
        "use strict";
        function getNames(t) {
          return t.map(function (t) {
            return "string" == typeof t ? t : t[0]
          })
        }

        function getIgnore(t) {
          return t.map(function (t) {
            return "string" != typeof t && t[1].ignore ? t[0] : null
          }).filter(function (t) {
            return !!t
          })
        }

        function getBinary(t) {
          var e = {};
          return t.forEach(function (t) {
            "string" != typeof t && t[1].binary && (e[t[0]] = t[1].binary)
          }),
            e
        }

        return e.getNames = getNames,
          e.getIgnore = getIgnore,
          e.getBinary = getBinary,
          n.exports
      });
      System.registerDynamic("f", [], !0, function (t, e, n) {
        "use strict";
        function randomString(t) {
          for (var e = "", n = 0; n < t; n++)
            e += o[Math.floor(Math.random() * o.length)];
          return e
        }

        function checkRateLimit(t, e) {
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
        return e.randomString = randomString,
          e.checkRateLimit = checkRateLimit,
          n.exports
      });
      System.registerDynamic("10", [], !0, function (t, e, n) {
        "use strict";
        function r(t) {
          return !t.some(function (t) {
            return 10 === t || 9 === t || Array.isArray(t)
          })
        }

        function i(t, e, n) {
          if (t instanceof Array) {
            if (r(t))
              return "writer.measureSimpleArray(" + e + ", " + t.reduce(function (t, e) {
                  return t + c[e]
                }, 0) + ")";
            var o = ""
              , a = 0;
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

        function createHandlers(t, e) {
          var n = Object.keys(t).map(function (e) {
            return e + ": " + a(t[e])
          })
            , r = Object.keys(e).map(function (t) {
            return t + ": " + u(e[t])
          })
            , i = "var write = {\n\t" + n.join(",\n\t") + "\n};\n\nvar read = {\n\t" + r.join(",\n\t") + "\n};\n\nreturn { write: write, read: read };";
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
          e.createHandlers = createHandlers,
          n.exports
      });
      System.registerDynamic("11", [], !0, function (t, e, n) {
        "use strict";
        e.defaultHandleFunction = function (t, e, n, r, i) {
          return n.apply(r, i)
        }
        ;
        var PacketHandler = function () {
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

          return t.prototype.write = function (t, e, n, r) {
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
          }
            ,
            t.prototype.read = function (t) {
              if ("string" == typeof t)
                return JSON.parse(t);
              this.packetReader.setBuffer(t);
              var e = this.packetReader.readUint8()
                , n = this.readNames[e]
                , r = this.readHandlers[n]
                , i = [e];
              if (!r)
                throw new Error("Missing packet handler for: " + n + " (" + e + ")");
              return r(this.packetReader, i),
                i
            }
            ,
            t.prototype.getFuncName = function (t, e) {
              return 255 === t ? "*version" : 253 === t ? "*reject:" + this.remoteNames[e.shift()] : 254 === t ? "*resolve:" + this.remoteNames[e.shift()] : this.readNames[t]
            }
            ,
            t.prototype.send = function (t, e, n, r) {
              try {
                return this.write(t, e, n, r)
              } catch (t) {
                return 0
              }
            }
            ,
            t.prototype.recv = function (t, n, r, i) {
              void 0 === i && (i = e.defaultHandleFunction);
              var o = this.read(t);
              try {
                var a = o.shift()
                  , s = this.getFuncName(a, o)
                  , u = s && "*" === s[0]
                  , l = u ? r : n
                  , c = l[s]
              } catch (t) {
              }
              return c && i(a, s, c, l, o),
              t.length || t.byteLength || 0
            }
            ,
            t
        }();
        return e.PacketHandler = PacketHandler,
          n.exports
      });
      System.registerDynamic("12", ["11"], !0, function (require, e, n) {
        "use strict";
        var extend = this && this.__extends || function (t, e) {
            function n() {
              this.constructor = t
            }

            for (var r in e)
              e.hasOwnProperty(r) && (t[r] = e[r]);
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
              new n)
          }
          , i = require("11")
          , DebugPacketHandler = function (PacketHandler) {
          function DebugPacketHandler(readNames, remoteNames, packetWriter, packetReader, handlers, ignorePackets, log) {
            PacketHandler.call(this, readNames, remoteNames, packetWriter, packetReader, handlers),
              this.ignorePackets = ignorePackets,
              this.log = log
          }

          return extend(DebugPacketHandler, PacketHandler),
            DebugPacketHandler.prototype.send = function (t, e, n, r) {
              var i = this.write(t, e, n, r);
              if (this.ignorePackets.indexOf(e) === -1) {
                var o = this.lastWriteBinary ? "bin" : "str";
                this.log("SEND [" + i + "] (" + o + ")", e, r)
              }
              return i
            }
            ,
            DebugPacketHandler.prototype.recv = function (t, e, n, r) {
              void 0 === r && (r = i.defaultHandleFunction);
              var o = this.read(t)
                , a = o.shift()
                , s = this.getFuncName(a, o);
              s || this.log("invalid message id: " + a);
              var u = s && "*" === s[0]
                , l = u ? n : e
                , c = l[s]
                , f = t.length || t.byteLength;
              if (this.ignorePackets.indexOf(s) === -1) {
                var p = "string" != typeof t ? "bin" : "str";
                this.log("RECV [" + f + "] (" + p + ")", s, o)
              }
              return c ? r(a, s, c, l, o) : this.log("invalid message: " + s, o),
                f
            }
            ,
            DebugPacketHandler
        }(i.PacketHandler);
        return e.DebugPacketHandler = DebugPacketHandler,
          n.exports
      });
      System.registerDynamic("13", ["14"], !0, function (t, e, n) {
        "use strict";
        var r = t("14")
          , BasePacketWriter = function () {
          function t() {
          }

          return t.prototype.measureString = function (t) {
            if (null == t)
              return this.measureLength(-1);
            var e = r.stringLengthInBytes(t);
            return this.measureLength(e) + e
          }
            ,
            t.prototype.measureObject = function (t) {
              return null == t ? this.measureLength(-1) : this.measureString(JSON.stringify(t))
            }
            ,
            t.prototype.measureArray = function (t, e) {
              return null == t ? this.measureLength(-1) : this.measureLength(t.length) + t.reduce(function (t, n) {
                return t + e(n)
              }, 0)
            }
            ,
            t.prototype.measureSimpleArray = function (t, e) {
              return null == t ? this.measureLength(-1) : this.measureLength(t.length) + t.length * e
            }
            ,
            t.prototype.measureLength = function (t) {
              return t === -1 ? 2 : t < 127 ? 1 : t < 16383 ? 2 : t < 2097151 ? 3 : 4
            }
            ,
            t.prototype.writeUint8 = function (t) {
              throw new Error("not implemented")
            }
            ,
            t.prototype.writeBytes = function (t) {
              throw new Error("not implemented")
            }
            ,
            t.prototype.writeBoolean = function (t) {
              this.writeUint8(t ? 1 : 0)
            }
            ,
            t.prototype.writeString = function (t) {
              if (null == t)
                this.writeLength(-1);
              else {
                var e = r.encodeString(t);
                this.writeLength(e.length),
                  this.writeBytes(e)
              }
            }
            ,
            t.prototype.writeObject = function (t) {
              null == t ? this.writeString(null) : this.writeString(JSON.stringify(t))
            }
            ,
            t.prototype.writeArray = function (t, e) {
              null == t ? this.writeLength(-1) : (this.writeLength(t.length),
                t.forEach(e))
            }
            ,
            t.prototype.writeLength = function (t) {
              if (t === -1)
                this.writeUint8(128),
                  this.writeUint8(0);
              else
                do
                  this.writeUint8(127 & t | (t >> 7 ? 128 : 0)),
                    t >>= 7;
                while (t)
            }
            ,
            t
        }();
        return e.BasePacketWriter = BasePacketWriter,
          n.exports
      });
      System.registerDynamic("15", ["13"], !0, function (t, e, n) {
        "use strict";
        var r = this && this.__extends || function (t, e) {
            function n() {
              this.constructor = t
            }

            for (var r in e)
              e.hasOwnProperty(r) && (t[r] = e[r]);
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
              new n)
          }
          , i = t("13")
          , o = function (t) {
          function e() {
            t.apply(this, arguments),
              this.offset = 0
          }

          return r(e, t),
            e.prototype.getBuffer = function () {
              return this.buffer
            }
            ,
            e.prototype.init = function (t) {
              this.offset = 0,
                this.buffer = new ArrayBuffer(t),
                this.view = new DataView(this.buffer),
                this.bytes = new Uint8Array(this.buffer)
            }
            ,
            e.prototype.writeInt8 = function (t) {
              this.view.setInt8(this.offset, t),
                this.offset += 1
            }
            ,
            e.prototype.writeUint8 = function (t) {
              this.view.setUint8(this.offset, t),
                this.offset += 1
            }
            ,
            e.prototype.writeInt16 = function (t) {
              this.view.setInt16(this.offset, t),
                this.offset += 2
            }
            ,
            e.prototype.writeUint16 = function (t) {
              this.view.setUint16(this.offset, t),
                this.offset += 2
            }
            ,
            e.prototype.writeInt32 = function (t) {
              this.view.setInt32(this.offset, t),
                this.offset += 4
            }
            ,
            e.prototype.writeUint32 = function (t) {
              this.view.setUint32(this.offset, t),
                this.offset += 4
            }
            ,
            e.prototype.writeFloat32 = function (t) {
              this.view.setFloat32(this.offset, t),
                this.offset += 4
            }
            ,
            e.prototype.writeFloat64 = function (t) {
              this.view.setFloat64(this.offset, t),
                this.offset += 8
            }
            ,
            e.prototype.writeBytes = function (t) {
              this.bytes.set(t, this.offset),
                this.offset += t.length
            }
            ,
            e
        }(i.BasePacketWriter);
        return Object.defineProperty(e, "__esModule", {
          value: !0
        }),
          e.default = o,
          n.exports
      });
      System.registerDynamic("14", [], !0, function (t, e, n) {
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

        function stringLengthInBytes(t) {
          var e = 0;
          return r(t, function (t) {
            return e += i(t)
          }),
            e
        }

        function encodeString(t) {
          if (null == t)
            return null;
          var e = new Uint8Array(stringLengthInBytes(t))
            , n = 0;
          return r(t, function (t) {
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

        function decodeString(t) {
          if (null == t)
            return null;
          for (var e = "", n = 0; n < t.length;) {
            var r = t[n++]
              , i = void 0;
            if (0 === (128 & r))
              i = r;
            else if (192 === (224 & r)) {
              var o = s(t, n++);
              if (i = (31 & r) << 6 | o,
                i < 128)
                throw Error("Invalid continuation byte")
            } else if (224 === (240 & r)) {
              var o = s(t, n++)
                , a = s(t, n++);
              if (i = (15 & r) << 12 | o << 6 | a,
                i < 2048)
                throw Error("Invalid continuation byte");
              if (i >= 55296 && i <= 57343)
                throw Error("Lone surrogate U+" + i.toString(16).toUpperCase() + " is not a scalar value")
            } else {
              if (240 !== (248 & r))
                throw Error("Invalid UTF-8 detected");
              var o = s(t, n++)
                , a = s(t, n++)
                , u = s(t, n++);
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

        return e.stringLengthInBytes = stringLengthInBytes,
          e.encodeString = encodeString,
          e.decodeString = decodeString,
          n.exports
      });
      System.registerDynamic("16", ["14"], !0, function (t, e, n) {
        "use strict";
        var r = t("14")
          , BasePacketReader = function () {
          function t() {
          }

          return t.prototype.readUint8 = function () {
            throw new Error("not implemented")
          }
            ,
            t.prototype.readBytes = function (t) {
              throw new Error("not implemented")
            }
            ,
            t.prototype.readBoolean = function () {
              return 1 === this.readUint8()
            }
            ,
            t.prototype.readArray = function (t) {
              var e = this.readLength();
              if (e === -1)
                return null;
              for (var n = new Array(e), r = 0; r < e; r++)
                n[r] = t();
              return n
            }
            ,
            t.prototype.readString = function () {
              var t = this.readLength();
              return t === -1 ? null : r.decodeString(this.readBytes(t))
            }
            ,
            t.prototype.readObject = function () {
              var t = this.readString();
              return null == t ? null : JSON.parse(t)
            }
            ,
            t.prototype.readLength = function () {
              var t = 0
                , e = 0
                , n = 0;
              do {
                var r = this.readUint8();
                t |= (127 & r) << e,
                  e += 7,
                  n++
              } while (128 & r);
              return 2 === n && 0 === t ? -1 : t
            }
            ,
            t
        }();
        return e.BasePacketReader = BasePacketReader,
          n.exports
      });
      System.registerDynamic("17", ["16"], !0, function (t, e, n) {
        "use strict";
        var r = this && this.__extends || function (t, e) {
            function n() {
              this.constructor = t
            }

            for (var r in e)
              e.hasOwnProperty(r) && (t[r] = e[r]);
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
              new n)
          }
          , i = t("16")
          , o = function (t) {
          function e() {
            t.apply(this, arguments),
              this.offset = 0,
              this.view = null ,
              this.buffer = null
          }

          return r(e, t),
            e.prototype.setBuffer = function (t) {
              this.offset = 0,
                this.buffer = t,
                this.view = new DataView(this.buffer)
            }
            ,
            e.prototype.readInt8 = function () {
              return this.offset += 1,
                this.view.getInt8(this.offset - 1)
            }
            ,
            e.prototype.readUint8 = function () {
              return this.offset += 1,
                this.view.getUint8(this.offset - 1)
            }
            ,
            e.prototype.readInt16 = function () {
              return this.offset += 2,
                this.view.getInt16(this.offset - 2)
            }
            ,
            e.prototype.readUint16 = function () {
              return this.offset += 2,
                this.view.getUint16(this.offset - 2)
            }
            ,
            e.prototype.readInt32 = function () {
              return this.offset += 4,
                this.view.getInt32(this.offset - 4)
            }
            ,
            e.prototype.readUint32 = function () {
              return this.offset += 4,
                this.view.getUint32(this.offset - 4)
            }
            ,
            e.prototype.readFloat32 = function () {
              return this.offset += 4,
                this.view.getFloat32(this.offset - 4)
            }
            ,
            e.prototype.readFloat64 = function () {
              return this.offset += 8,
                this.view.getFloat64(this.offset - 8)
            }
            ,
            e.prototype.readBytes = function (t) {
              return this.offset += t,
                new Uint8Array(this.view.buffer, this.offset - t, t)
            }
            ,
            e
        }(i.BasePacketReader);
        return Object.defineProperty(e, "__esModule", {
          value: !0
        }),
          e.default = o,
          n.exports
      });
      System.registerDynamic("18", ["d", "e", "19", "f", "10", "11", "12", "15", "17", "1a"], !0, function (require, e, n) {
        return function (n) {
          "use strict";
          function r() {
            var t = {};
            return t.promise = new i(function (e, n) {
                t.resolve = e,
                  t.reject = n
              }
            ),
              t
          }

          var i = require("d")
            , o = require("e")
            , a = require("19")
            , s = require("f")
            , handlers = require("10")
            , packetHandler = require("11")
            , debugPacketHandler = require("12")
            , PacketWriter = require("15")
            , PacketReader = require("17")
            , ClientSocket = function () {
            function t(t, e, n, r) {
              var i = this;
              void 0 === n && (n = function (t) {
                  return t()
                }
              ),
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
                this.beforeunload = function () {
                  if (i.socket)
                    try {
                      i.socket.onclose = null ,
                        i.socket.close(),
                        i.socket = null
                    } catch (t) {
                    }
                }
                ,
                this.defers = [],
                this.inProgressFields = {},
                this.rateLimits = [],
                this.options.server.forEach(function (t, e) {
                  "string" == typeof t ? i.createMethod(t, e, {}) : (i.createMethod(t[0], e, t[1]),
                  t[1].rateLimit && (i.rateLimits[e] = {
                    limit: t[1].rateLimit + 50,
                    last: 0
                  }))
                }),
                this.special["*version"] = function (t) {
                  t === i.options.hash ? i.versionValidated = !0 : i.client.invalidVersion && i.client.invalidVersion(t, i.options.hash)
                }
            }

            return t.prototype.getWebsocketUrl = function () {
              var t = this.options
                , e = t.host || location.host
                , n = t.path || "/ws"
                , r = t.ssl || "https:" === location.protocol ? "wss://" : "ws://"
                , i = t.token ? "?t=" + t.token : "";
              if (t.requestParams) {
                var o = Object.keys(t.requestParams).map(function (e) {
                  return e + "=" + encodeURIComponent(t.requestParams[e])
                }).join("&");
                i += (i ? "&" : "?") + o
              }
              return r + e + n + i
            }
              ,
              t.prototype.connect = function () {
                var t = this;
                if (this.connecting = !0,
                    !this.socket) {
                  var e = this.options;
                  this.socket = new WebSocket(this.getWebsocketUrl()),
                    window.addEventListener("beforeunload", this.beforeunload);
                  var packetReader = new PacketReader.default
                    , packetWriter = new PacketWriter.default
                    , theHandlers = handlers.createHandlers(o.getBinary(e.server), o.getBinary(e.client))
                    , remoteNames = o.getNames(e.server)
                    , readNames = o.getNames(e.client)
                    , ignorePackets = o.getIgnore(e.server).concat(o.getIgnore(e.client));
                  e.debug ? this.packet = new debugPacketHandler.DebugPacketHandler(readNames, remoteNames, packetWriter, packetReader, theHandlers, ignorePackets, this.log) : this.packet = new packetHandler.PacketHandler(readNames, remoteNames, packetWriter, packetReader, theHandlers),
                    this.packet.supportsBinary = !!this.socket.binaryType,
                    this.socket.binaryType = "arraybuffer",
                    this.socket.onmessage = function (e) {
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
                    }
                    ,
                    this.socket.onopen = function () {
                      e.debug && t.log("socket opened"),
                        t.lastSentId = 0,
                        t.isConnected = !0,
                      t.socket && t.packet.supportsBinary && t.socket.send("undefined" != typeof n ? new n(0) : new ArrayBuffer(0)),
                      t.client.connected && t.client.connected(),
                      e.pingInterval && (t.pingInterval = setInterval(function () {
                        return t.sendPing()
                      }, e.pingInterval))
                    }
                    ,
                    this.socket.onerror = function (n) {
                      e.debug && t.log("socket error", n)
                    }
                    ,
                    this.socket.onclose = function (n) {
                      e.debug && t.log("socket closed", n),
                        t.socket = null ,
                        t.versionValidated = !1,
                      t.isConnected && (t.isConnected = !1,
                      t.client.disconnected && t.client.disconnected()),
                      t.connecting && (t.reconnectTimeout = setTimeout(function () {
                        t.connect(),
                          t.reconnectTimeout = null
                      }, e.reconnectTimeout)),
                        t.defers.forEach(function (t) {
                          return t[1].reject(new Error("disconnected"))
                        }),
                        t.defers = [],
                        Object.keys(t.inProgressFields).forEach(function (e) {
                          return t.inProgressFields[e] = 0
                        }),
                      t.pingInterval && (clearInterval(t.pingInterval),
                        t.pingInterval = null )
                    }
                }
              }
              ,
              t.prototype.disconnect = function () {
                this.connecting = !1,
                this.reconnectTimeout && (clearTimeout(this.reconnectTimeout),
                  this.reconnectTimeout = null ),
                this.pingInterval && (clearInterval(this.pingInterval),
                  this.pingInterval = null ),
                this.socket && (this.socket.close(),
                  this.socket = null ),
                  window.removeEventListener("beforeunload", this.beforeunload)
              }
              ,
              t.prototype.sendPing = function () {
                try {
                  var t = Date.now();
                  this.socket && this.versionValidated && t - this.lastPing > this.options.pingInterval && (this.socket.send(""),
                    this.lastPing = Date.now())
                } catch (t) {
                }
              }
              ,
              t.prototype.createMethod = function (t, e, n) {
                n.promise ? this.createPromiseMethod(t, e, n.progress) : this.createSimpleMethod(t, e)
              }
              ,
              t.prototype.createSimpleMethod = function (t, e) {
                var n = this;
                this.server[t] = function () {
                  for (var r = [], i = 0; i < arguments.length; i++)
                    r[i - 0] = arguments[i];
                  return !!s.checkRateLimit(e, n.rateLimits) && (n.sentSize += n.packet.send(n.socket, t, e, r),
                      n.lastSentId++,
                      !0)
                }
              }
              ,
              t.prototype.createPromiseMethod = function (t, e, n) {
                var o = this;
                n && (this.inProgressFields[n] = 0,
                  Object.defineProperty(this.server, n, {
                    get: function () {
                      return !!o.inProgressFields[n]
                    }
                  })),
                  this.server[t] = function () {
                    for (var u = [], l = 0; l < arguments.length; l++)
                      u[l - 0] = arguments[l];
                    if (!o.isConnected)
                      return i.reject(new Error("not connected"));
                    if (!s.checkRateLimit(e, o.rateLimits))
                      return i.reject(new Error("rate limit exceeded"));
                    o.sentSize += o.packet.send(o.socket, t, e, u);
                    var c = ++o.lastSentId
                      , f = r();
                    return a.set(o.defers, c, f),
                      o.inProgressFields[n]++,
                      f.promise
                  }
                  ,
                  this.special["*resolve:" + t] = function (t, e) {
                    var r = a.get(o.defers, t);
                    r && (a.remove(o.defers, t),
                      o.inProgressFields[n]--,
                      o.apply(function () {
                        return r.resolve(e)
                      }))
                  }
                  ,
                  this.special["*reject:" + t] = function (t, e) {
                    var r = a.get(o.defers, t);
                    r && (a.remove(o.defers, t),
                      o.inProgressFields[n]--,
                      o.apply(function () {
                        return r.reject(new Error(e))
                      }))
                  }
              }
              ,
              t
          }();
          e.ClientSocket = ClientSocket
        }(require("1a").Buffer),
          n.exports
      }),
      System.registerDynamic("19", [], !0, function (t, e, n) {
        "use strict";
        function get(t, e) {
          for (var n = 0; n < t.length; n++)
            if (t[n][0] === e)
              return t[n][1]
        }

        function i(t, e, n) {
          for (var r = 0; r < t.length; r++)
            if (t[r][0] === e)
              return void (t[r][1] = n);
          t.push([e, n])
        }

        function o(t, e) {
          for (var n = 0; n < t.length; n++)
            if (t[n][0] === e) {
              t.splice(n, 1);
              break
            }
        }

        return e.get = get,
          e.set = i,
          e.remove = o,
          n.exports
      }),
      System.registerDynamic("1b", ["19"], !0, function (t, e, n) {
        "use strict";
        function Method(t) {
          return void 0 === t && (t = {}),
            function (e, n) {
              var r = l.get(c, e.constructor) || [];
              r.push({
                name: n,
                options: t
              }),
                l.set(c, e.constructor, r)
            }
        }

        function Socket(t) {
          return function (e) {
            l.set(f, e, t)
          }
        }

        function getSocketMetadata(t) {
          return l.get(f, t)
        }

        function getMethodNetadata(t) {
          return l.get(c, t)
        }

        function s(t) {
          return Object.keys(t).filter(function (e) {
            return "connected" !== e && "disconnected" !== e && "invalidVersion" !== e && "function" == typeof t[e]
          }).map(function (t) {
            return {
              name: t,
              options: {}
            }
          })
        }

        function getMethods(t) {
          return getMethodNetadata(t) || s(t.prototype)
        }

        var l = t("19")
          , c = []
          , f = [];
        return e.Method = Method,
          e.Socket = Socket,
          e.getSocketMetadata = getSocketMetadata,
          e.getMethodMetadata = getMethodNetadata,
          e.getMethods = getMethods,
          n.exports
      }),
      System.registerDynamic("1c", ["e", "18", "1b"], !0, function (t, e, n) {
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
      }),
      System.registerDynamic("1d", ["1c"], !0, function (t, e, n) {
        return n.exports = t("1c"),
          n.exports
      }),
      System.registerDynamic("1e", ["1f", "20", "21", "22", "23", "24"], !0, function (require, e, n) {
        "use strict";
        var r = require("1f")
          , i = require("20")
          , o = require("21")
          , a = require("22")
          , s = require("23")
          , u = require("24")
          , floor = Math.floor
          , ceil = Math.ceil
          , round = Math.round
          , Region = function () {
          function region(t, e, n) {
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

          return region.prototype.getTiles = function () {
            return this.tiles
          }
            ,
            region.prototype.load = function (t) {
              this.tiles = t;
              for (var e = 0; e < this.tiles.length; e++)
                this.tileIndices[e] = -1
            }
            ,
            region.prototype.canWalk = function (t, e) {
              if (t < 0 || e < 0 || t > o.REGION_SIZE || e > o.REGION_SIZE)
                return !1;
              var n = this.getTile(t, e);
              return n && s.canWalk(n)
            }
            ,
            region.prototype.getTile = function (t, e) {
              return this.tiles[(0 | t) + (0 | e) * o.REGION_SIZE]
            }
            ,
            region.prototype.setTile = function (t, e, n) {
              this.tiles[floor(t) + floor(e) * o.REGION_SIZE] = n
            }
            ,
            region.prototype.setDirty = function (t, e) {
              this.tileIndices[floor(t) + floor(e) * o.REGION_SIZE] = -1
            }
            ,
            region.prototype.drawEntities = function (t, e) {
              var n = this;
              this.entitiesDrawn = 0,
                this.entities.sort(function (t, e) {
                  return t.y === e.y ? t.x - e.x : t.y - e.y
                }),
                this.entities.forEach(function (r) {
                  function a(e, n) {
                    e && t.drawRect(n, round(r.x * o.tileWidth + e.x), round(r.y * o.tileHeight + e.y), round(e.w), round(e.h))
                  }

                  r.draw && e.isVisible(r) && (r.draw(t),
                    n.entitiesDrawn++),
                  i.debugOptions.showHelpers && (t.globalAlpha = .3,
                  r.collider && t.drawRect(u.RED, round((r.x + r.collider.x) * o.tileWidth), round((r.y + r.collider.y) * o.tileHeight), round(r.collider.w * o.tileWidth), round(r.collider.h * o.tileHeight)),
                    a(r.bounds, u.ORANGE),
                    a(r.coverBounds, u.BLUE),
                    a(r.interactBounds, u.PURPLE),
                    t.globalAlpha = 1)
                })
            }
            ,
            region.prototype.drawTiles = function (t, e, n) {
              var r = this.x * o.REGION_SIZE
                , i = this.y * o.REGION_SIZE;
              if (e.isRectVisible(r * o.tileWidth, i * o.tileHeight, o.REGION_SIZE * o.tileWidth, o.REGION_SIZE * o.tileHeight))
                for (var s = a.clamp(floor(e.x / o.tileWidth - r), 0, o.REGION_SIZE), u = a.clamp(floor(e.y / o.tileHeight - i), 0, o.REGION_SIZE), f = a.clamp(ceil((e.x + e.w) / o.tileWidth - r), 0, o.REGION_SIZE), p = a.clamp(ceil((e.y + e.h) / o.tileHeight - i), 0, o.REGION_SIZE), h = u; h <= p; h++)
                  for (var d = s; d < f; d++)
                    this.drawMapTile(t, d, h, d + r, h + i, n)
            }
            ,
            region.prototype.getTileType = function (t, e, n) {
              return t >= 0 && e >= 0 && t < o.REGION_SIZE && e < o.REGION_SIZE ? this.getTile(t, e) : n.getTile(t + this.x * o.REGION_SIZE, e + this.y * o.REGION_SIZE)
            }
            ,
            region.prototype.updateTileIndex = function (t, e, n) {
              var r, i = this.getTile(t, e), a = 0;
              i === s.TileType.Dirt ? r = 47 : i === s.TileType.Grass && (a += this.getTileType(t - 1, e - 1, n) === i ? 1 : 0,
                a += this.getTileType(t, e - 1, n) === i ? 2 : 0,
                a += this.getTileType(t + 1, e - 1, n) === i ? 4 : 0,
                a += this.getTileType(t - 1, e, n) === i ? 8 : 0,
                a += this.getTileType(t + 1, e, n) === i ? 16 : 0,
                a += this.getTileType(t - 1, e + 1, n) === i ? 32 : 0,
                a += this.getTileType(t, e + 1, n) === i ? 64 : 0,
                a += this.getTileType(t + 1, e + 1, n) === i ? 128 : 0,
                r = s.TILE_MAP[a]);
              var u = s.TILE_COUNT_MAP[r]
                , l = s.TILE_MAP_MAP[r] + (u > 1 ? this.randoms[t + e * o.REGION_SIZE] % u : 0);
              return this.tileIndices[t + e * o.REGION_SIZE] = l
            }
            ,
            region.prototype.drawMapTile = function (t, e, n, i, a, s) {
              var u = this.tileIndices[e + n * o.REGION_SIZE];
              u === -1 && (u = this.updateTileIndex(e, n, s));
              var l = 8
                , c = u % l
                , f = Math.floor(u / l)
                , p = c * o.tileWidth
                , h = f * o.tileHeight;
              t.drawImage(r.tileSprite.tex, null, p, h, o.tileWidth, o.tileHeight, i * o.tileWidth, a * o.tileHeight, o.tileWidth, o.tileHeight)
            }
            ,
            region
        }();
        return e.Region = Region,
          n.exports
      }),
      System.registerDynamic("25", ["21"], !0, function (t, e, n) {
        "use strict";
        var r = t("21")
          , doodad = function () {
          function Doodad(t, e, n, r) {
            this.id = t,
              this.x = e,
              this.y = n,
              this.sprite = r,
              this.type = "doodad";
            var i = this.sprite.w
              , o = this.sprite.h;
            this.bounds = {
              x: -i / 2,
              y: -o,
              w: i,
              h: o
            }
          }

          return Doodad.prototype.draw = function (t) {
            var e = this.sprite.w
              , n = this.sprite.h;
            t.drawSprite(this.sprite, null, Math.round(this.x * r.tileWidth + -e / 2), Math.round(this.y * r.tileHeight - n))
          }
            ,
            Doodad
        }();
        return e.Doodad = doodad,
          n.exports
      }),
      System.registerDynamic("26", ["21"], !0, function (t, e, n) {
        "use strict";
        var r = t("21")
          , i = 8
          , animated = function () {
          function t(t, e, n, r) {
            this.id = t,
              this.x = e,
              this.y = n,
              this.sprites = r,
              this.type = "animated",
              this.time = 5 * Math.random();
            var i = r[0]
              , o = i.w
              , a = i.h;
            this.bounds = {
              x: -o / 2,
              y: -a,
              w: o,
              h: a
            }
          }

          return t.prototype.update = function (t) {
            this.time += t
          }
            ,
            t.prototype.draw = function (t) {
              var e = Math.floor(this.time * i) % this.sprites.length
                , n = this.sprites[e];
              n && t.drawSprite(n, null, Math.round(this.x * r.tileWidth - n.w / 2), Math.round(this.y * r.tileHeight - n.h))
            }
            ,
            t
        }();
        return e.Animated = animated,
          n.exports
      }),
      System.registerDynamic("27", ["28", "1f", "22", "21", "24"], !0, function (t, e, n) {
        "use strict";
        function r(t, e, n) {
          return {
            x: t.ox + e,
            y: t.oy + n,
            w: t.w,
            h: t.h
          }
        }

        function i(t) {
          return {
            bounds: {
              x: -t.w / 2,
              y: -t.h,
              w: t.w,
              h: t.h
            },
            draw: function (e) {
              e.drawSprite(t, null, Math.round(this.x * w.tileWidth - t.w / 2), Math.round(this.y * w.tileHeight - t.h))
            }
          }
        }

        function o(t, e, n, i) {
          return {
            bounds: _.addRects(r(t, -n, -i), r(e, -n, -i)),
            draw: function (r) {
              var o = Math.round(this.x * w.tileWidth - n)
                , a = Math.round(this.y * w.tileHeight - i);
              r.drawSprite(e, x.SHADOW_COLOR, o, a),
                r.drawSprite(t, null, o, a)
            }
          }
        }

        function a() {
          var t = b.tree.stump
            , n = b.tree.stumpShadow
            , i = b.tree.trunk;
          return {
            bounds: _.addRects(_.addRects(r(t, -e.treeOffsetX, -e.treeOffsetY), r(i, -e.treeOffsetX, -e.treeOffsetY)), r(n, -e.treeOffsetX, -e.treeOffsetY)),
            coverBounds: {
              x: -50,
              y: -135,
              w: 110,
              h: 120
            },
            draw: function (r) {
              var o = Math.round(this.x * w.tileWidth - e.treeOffsetX)
                , a = Math.round(this.y * w.tileHeight - e.treeOffsetY);
              r.drawSprite(n, x.SHADOW_COLOR, o, a),
                r.drawSprite(t, null, o, a),
                r.globalAlpha = 1 - .6 * (this.coverLifting || 0),
                r.drawSprite(i, null, o, a),
                r.globalAlpha = 1
            }
          }
        }

        function s() {
          var t = b.tree.crown
            , n = b.tree.shadow;
          return {
            bounds: _.addRects(r(t, -e.treeOffsetX, -e.treeOffsetY - e.treeOffset), r(n, -e.treeOffsetX, -e.treeOffsetY - e.treeOffset)),
            coverBounds: {
              x: -50,
              y: -135 - e.treeOffset,
              w: 110,
              h: 120
            },
            draw: function (r) {
              var i = Math.round(this.x * w.tileWidth - e.treeOffsetX)
                , o = Math.round(this.y * w.tileHeight - e.treeOffsetY - e.treeOffset);
              r.drawSprite(n, x.SHADOW_COLOR, i, o),
                r.globalAlpha = 1 - .6 * (this.coverLifting || 0),
                r.drawSprite(t, null, i, o),
                r.globalAlpha = 1
            }
          }
        }

        function u(t) {
          return E ? t : {}
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
          return y.assign.apply(void 0, [{
            type: t,
            id: e,
            x: n,
            y: r
          }].concat(i))
        }

        function createApple(t, e, n) {
          return c("apple", t, e, n, {
            interactive: !0
          }, u(o(b.apple.color, b.apple.shadow, 4, 4)), {
            bounds: {
              x: -8,
              y: -8,
              w: 16,
              h: 16
            }
          })
        }

        function createSign(t, e, n, r) {
          return c("sign", t, e, n, {
            interactive: !0
          }, u(i(b.sign)), r, {
            options: r
          })
        }

        function createRock(t, e, n) {
          return c("rock", t, e, n, l(-.5, -.25, 1, .5), u(o(b.rock.color, b.rock.shadow, 15, 15)))
        }

        function createPumpkin(t, e, n) {
          return c("pumpkin", t, e, n, l(-.35, -.25, .7, .5), u(o(b.pumpkin.color, b.pumpkin.shadow, 11, 15)))
        }

        function createTree(t, e, n) {
          return c("tree", t, e, n, l(-.5, 0, 1, .5), u(a()))
        }

        function m(t, e, n) {
          return c("tree-crown", t, e, n, u(s()))
        }

        function g(t, n, r) {
          return c("tree-stump", t, n, r, l(-.5, -.1, 1, .5), u(o(b.tree.stump, b.tree.stumpShadow, e.treeOffsetX, e.treeOffsetY)))
        }

        var y = t("28")
          , b = t("1f")
          , _ = t("22")
          , w = t("21")
          , x = t("24")
          , E = "undefined" != typeof window;
        return e.treeOffsetX = 72,
          e.treeOffsetY = 162,
          e.treeOffset = 30,
          e.createApple = createApple,
          e.createSign = createSign,
          e.createRock = createRock,
          e.createPumpkin = createPumpkin,
          e.createTree = createTree,
          e.createTreeCrown = m,
          e.createTreeStump = g,
          n.exports
      }),
      System.registerDynamic("29", ["28"], !0, function (t, e, n) {
        "use strict";
        function r(t) {
          return t.replace(s, function (t) {
            return o.repeat("*", t.length)
          })
        }

        function i(t) {
          return /[\u0400-\u04FF]/.test(t)
        }

        var o = t("28")
          , a = ["all?ahu?", "aids", "akbar", "alt ?[+-] ?f4", "anal", "anus", "(bitch)?ass(fuck|hole|hat|licker|wipe)?", "autis(ts?|ms?|tic)", "bitch(e?s)?", "(blow|hoof|foot|hand|rim) ?jobs?", "boners?", "boob(s|ie|ies)?", "buttplugs?", "can[cs]er(s|ous)?", "(horse|mare)?cocks?", "clit(oris)?", "(ctrl|control) ?[+-]? ?w", "cum(s|ming)?", "cumdump(sters?)?", "cunts?", "deepthroat(ing)?", "(horse)?dicks?", "dildos?", "fap(p?ing)?", "foalcon", "(brony|furry?|gay|horse|pony|nigg?er)?fag(s|g?[oi]t(s|ry)?)?", "(brony|furry?|gay|horse|pony|nigg?er|butt|mother)?fu(c|k|cc|ck)(ed|er|ing?|able|face)?", "gang ?bang(ed|ing)?", "hitlers?", "(in|self)cest", "jizz(ed|ing)?", "lubed?", "masturbat(e|tion|ing)?", "milfs?", "molest(ation|ing|ed|ia)?", "nazi(s|sm|sts?)?", "negros?", "nigg?as?", "nigg?[e3](rs?|st)?", "norm(y|ies?)", "orgasms?", "org(y|ies)", "piss(ing)?", "penis(es)?", "porno?", "prostitutes?", "(octo|horse|pony)?puss(y|ies)?(juice)?", "raep", "rap(e|ed|es|ing)", "retards?", "sieg ?h[ea]il", "semen", "(anal|butt)?(sex|secks|secs|seks)", "(bull)?shit(s|ting)?", "slut(s|ty)?", "spunk", "(cock)?suck(ing|er)?", "tit(s|ty|ties?)?", "tranny", "wank(ing|ers?)?", "whores?", "vaginas?", "vulva"]
          , s = new RegExp("\\b(" + a.join("|") + ")\\b", "gi");
        return e.filterBadWords = r,
          e.containsCyrillic = i,
          n.exports
      }),
      System.registerDynamic("2a", ["28", "1d", "22", "21", "2b", "2c", "1e", "25", "26", "27", "1f", "2d", "29"], !0, function (t, e, n) {
        "use strict";
        function r(t, e) {
          return t.settings.filterSwearWords ? y.filterBadWords(e) : e
        }

        var i = this && this.__decorate || function (t, e, n, r) {
            var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
              a = Reflect.decorate(t, e, n, r);
            else
              for (var s = t.length - 1; s >= 0; s--)
                (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
            return o > 3 && a && Object.defineProperty(e, n, a),
              a
          }
          , o = this && this.__metadata || function (t, e) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
              return Reflect.metadata(t, e)
          }
          , a = t("28")
          , s = t("1d")
          , u = t("22")
          , l = t("21")
          , c = t("2b")
          , f = t("2c")
          , p = t("1e")
          , h = t("25")
          , d = t("26")
          , v = t("27")
          , m = t("1f")
          , g = t("2d")
          , y = t("29")
          , b = function (t, e) {
          t.player = e,
            t.player.interactive = !1,
            u.setupSetTes(e)
        }
          , _ = g.default.game
          , w = [5, 9, 10, 6, 6, 6, 6, 1]
          , x = function () {
          function clientActions(t, e, n) {
            this.gameService = t,
              this.server = e,
              this.$timeout = n
          }

          return clientActions.prototype.connected = function () {
            _.player = null ,
              _.map = new f.Map(0, 0),
              this.gameService.joined()
          }
            ,
            clientActions.prototype.disconnected = function () {
              this.gameService.disconnected()
            }
            ,
            clientActions.prototype.invalidVersion = function () {
              location.reload()
            }
            ,
            clientActions.prototype.map = function (t) {
              _.baseTime = Date.now() - t.time,
                _.map = new f.Map(t.regionsX, t.regionsY)
            }
            ,
            clientActions.prototype.subscribeRegion = function (t, e, n) {
              var r = new p.Region(0, t, e);
              r.load(n),
                _.map.setRegion(t, e, r)
            }
            ,
            clientActions.prototype.unsubscribeRegion = function (t, e) {
              _.map.setRegion(t, e, null)
            }
            ,
            clientActions.prototype.updateTile = function (t, e, n) {
              _.map.setTile(t, e, n)
            }
            ,
            clientActions.prototype.myEntityId = function (t) {
              this.myId = t
            }
            ,
            clientActions.prototype.addEntities = function (t) {
              var e = this;
              t.forEach(function (t) {
                var n = t[0]
                  , r = t[1]
                  , i = t[2]
                  , o = t[3]
                  , a = t[4]
                  , s = t[5]
                  , u = t[6]
                  , l = t[7];
                return e.addEntity(n, r, i, o, a, s, u, l)
              })
            }
            ,
            clientActions.prototype.addEntity = function (t, e, n, i, o, s, u, l) {
              var f;
              if ("cloud" === e)
                f = new h.Doodad(t, i, o, m.cloud);
              else if ("apple" === e)
                f = v.createApple(t, i, o);
              else if ("rock" === e)
                f = v.createRock(t, i, o);
              else if ("sign" === e)
                f = v.createSign(t, i, o, n);
              else if ("tree" === e)
                f = v.createTree(t, i, o);
              else if ("tree-crown" === e)
                f = v.createTreeCrown(t, i, o);
              else if ("tree-stump" === e)
                f = v.createTreeStump(t, i, o);
              else if ("pumpkin" === e)
                f = v.createPumpkin(t, i, o);
              else if ("butterfly" === e)
                f = new d.Animated(t, i, o, m.butterfly);
              else if ("pony" === e) {
                var p = n.info
                  , g = this.gameService.account;
                g.settings.filterSwearWords && p.cmo && t !== this.myId && (p.cm = null ),
                  delete n.info,
                  f = new c.Pony(t, p, l),
                  a.assign(f, n),
                  f.name = r(g, f.name)
              } else
                console.error("unknown entity type", e);
              f && (f.id = t,
                f.x = i,
                f.y = o,
                f.vx = s,
                f.vy = u,
                _.map.addEntity(f),
              t === this.myId && this.$timeout(function () {
                return b(_, f)
              }))
            }
            ,
            clientActions.prototype.removeEntity = function (t) {
              _.map.removeEntity(t)
            }
            ,
            clientActions.prototype.updateEntity = function (t, e, n, r, i) {
              var o = _.map.findEntity(t);
              o !== _.player && (o ? (o.x = e,
                o.y = n,
                o.vx = r,
                o.vy = i) : console.error("updateEntity: missing entity", t))
            }
            ,
            clientActions.prototype.updateEntities = function (t, e) {
              var n = this;
              t.forEach(function (t) {
                var e = t[0]
                  , r = t[1]
                  , i = t[2]
                  , o = t[3]
                  , a = t[4];
                return n.updateEntity(e, r, i, o, a)
              }),
                e.forEach(function (t) {
                  return n.removeEntity(t)
                })
            }
            ,
            clientActions.prototype.updateEntityOptions = function (t, e) {
              var n = _.map.findEntity(t);
              n ? a.assign(n, e) : console.error("updateEntityOptions: missing entity", t);
            }
            ,
            clientActions.prototype.says = function (t, e, n) {
              var i = _.map.findEntity(t);
              if (i) {
                var o = i.id === this.myId
                  , a = this.gameService.account;
                if (!o && a.settings.filterCyrillic && y.containsCyrillic(e))
                  return;
                if (i.ignored && 2 !== n)
                  return;
                i.says = {
                  message: o ? e : r(a, e),
                  timer: l.SAYS_TIME,
                  type: n
                }
              } else
                console.error("says: missing entity", t)
            }
            ,
            clientActions.prototype.left = function () {
              _.player = null ,
                _.map = new f.Map(0, 0),
                this.gameService.left()
            }
            ,
            i([s.Method(), o("design:type", Function), o("design:paramtypes", [Object]), o("design:returntype", void 0)], clientActions.prototype, "map", null),
            i([s.Method({
              binary: [1, 1, [1]]
            }), o("design:type", Function), o("design:paramtypes", [Number, Number, Array]), o("design:returntype", void 0)], clientActions.prototype, "subscribeRegion", null),
            i([s.Method({
              binary: [1, 1]
            }), o("design:type", Function), o("design:paramtypes", [Number, Number]), o("design:returntype", void 0)], clientActions.prototype, "unsubscribeRegion", null),
            i([s.Method({
              binary: [3, 3, 1]
            }), o("design:type", Function), o("design:paramtypes", [Number, Number, Number]), o("design:returntype", void 0)], clientActions.prototype, "updateTile", null),
            i([s.Method({
              binary: [5]
            }), o("design:type", Function), o("design:paramtypes", [Number]), o("design:returntype", void 0)], clientActions.prototype, "myEntityId", null),
            i([s.Method({
              binary: [w]
            }), o("design:type", Function), o("design:paramtypes", [Array]), o("design:returntype", void 0)], clientActions.prototype, "addEntities", null),
            i([s.Method({
              binary: w
            }), o("design:type", Function), o("design:paramtypes", [Number, String, Object, Number, Number, Number, Number, Number]), o("design:returntype", void 0)], clientActions.prototype, "addEntity", null),
            i([s.Method({
              binary: [[5, 6, 6, 6, 6, 1], [5]]
            }), o("design:type", Function), o("design:paramtypes", [Array, Array]), o("design:returntype", void 0)], clientActions.prototype, "updateEntities", null),
            i([s.Method(), o("design:type", Function), o("design:paramtypes", [Number, Object]), o("design:returntype", void 0)], clientActions.prototype, "updateEntityOptions", null),
            i([s.Method(), o("design:type", Function), o("design:paramtypes", [Number, String, Number]), o("design:returntype", void 0)], clientActions.prototype, "says", null),
            i([s.Method(), o("design:type", Function), o("design:paramtypes", []), o("design:returntype", void 0)], clientActions.prototype, "left", null),
            clientActions
        }();
        return e.ClientActions = x,
          n.exports
      }),
      System.registerDynamic("2e", ["2f", "28", "1d", "22", "2d", "2a", "20"], !0, function (require, exports, module) {
        "use strict";
        var r = require("2f")
          , i = require("28")
          , clientSocket = require("1d")
          , a = require("22")
          , s = require("2d")
          , clientActions = require("2a")
          , l = require("20")
          , game = s.default.game
          , GameService = function () {
          function gameService($timeout, model) {
            this.$timeout = $timeout,
              this.model = model,
              this.playing = !1,
              this.joining = !1,
              this.offline = !1,
              this.servers = [],
              this.initialized = !1,
              this.updateStatus()
          }

          return Object.defineProperty(gameService.prototype, "selected", {
            get: function () {
              return game.selected
            },
            enumerable: !0,
            configurable: !0
          }),
            Object.defineProperty(gameService.prototype, "account", {
              get: function () {
                return this.model.account
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(gameService.prototype, "canPlay", {
              get: function () {
                return !!this.model.pony && !!this.model.pony.name && !this.joining && this.server && !this.server.offline
              },
              enumerable: !0,
              configurable: !0
            }),
            gameService.prototype.updateStatus = function () {
              var t = this;
              r.resolve().then(function () {
                return t.joining || t.playing || !t.account ? null : t.model.status().then(function (e) {
                  t.initialized = !0,
                    t.offline = !1,
                    t.version = e.version,
                    i.merge(t.servers, e.servers),
                  !t.server && t.account.settings.defaultServer && (t.server = t.servers.find(function (e) {
                    return e.id === t.account.settings.defaultServer
                  }),
                  l.debugOptions.autoJoin && setTimeout(function () {
                    return t.join(t.model.pony.id)
                  }))
                }).catch(function (e) {
                  return t.offline = "Server is offline" === e.message
                })
              }).then(function () {
                return setTimeout(function () {
                  return t.updateStatus()
                }, t.initialized ? 5e3 : 500)
              })
            }
            ,
            gameService.prototype.join = function (t) {
              var self = this;
              return this.playing || this.joining ? r.resolve() : (this.joining = !0,
                this.model.join(this.server.id, t).then(function (t) {
                  var client_socket = new clientSocket.ClientSocket(t);
                  client_socket.client = new clientActions.ClientActions(self, client_socket.server, self.$timeout);
                    client_socket.connect();
                    game.socket = client_socket;
                  var r = a.start(game)
                    , i = r.promise
                    , s = r.cancel;
                  return self.cancelGameLoop = s,
                    i
                }).catch(function (t) {
                  throw self.left(),
                    t
                }))
            }
            ,
            gameService.prototype.leave = function () {
              game.socket && (game.socket.isConnected ? game.socket.server.leave() : game.socket.disconnect()),
                this.left()
            }
            ,
            gameService.prototype.joined = function () {
              var t = this;
              this.$timeout.cancel(this.disconnectedTimeout),
                this.$timeout(function () {
                  t.joining = !1,
                    t.playing = !0
                })
            }
            ,
            gameService.prototype.left = function () {
              var t = this;
              this.cancelGameLoop && (this.cancelGameLoop(),
                this.cancelGameLoop = null ),
                this.$timeout.cancel(this.disconnectedTimeout),
                this.$timeout(function () {
                  t.joining = !1,
                    t.playing = !1
                }),
                game.release()
            }
            ,
            gameService.prototype.disconnected = function () {
              var t = this;
              this.$timeout.cancel(this.disconnectedTimeout),
                this.disconnectedTimeout = this.$timeout(function () {
                  return t.left()
                }, 1e4)
            }
            ,
            gameService.$inject = ["$timeout", "model"],
            gameService
        }();
        return exports.GameService = GameService,
          module.exports
      }),
      System.registerDynamic("30", [], !0, function (t, e, n) {
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
      }),
      System.registerDynamic("31", ["2f", "28", "32", "22", "30", "20"], !0, function (t, e, n) {
        "use strict";
        function r(t) {
          return t.length ? t[0] : s.createDefaultPony()
        }

        function i(t, e) {
          return e.lastUsed && t.lastUsed ? e.lastUsed.localeCompare(t.lastUsed) : 0
        }

        var o = t("2f")
          , a = t("28")
          , s = t("32")
          , u = t("22")
          , l = t("30")
          , c = t("20")
          , f = function () {
          function t(t) {
            var e = this;
            this.$http = t,
              this.loading = !0,
              this.ponies = [],
              this.saving = !1,
              this._pony = s.createDefaultPony(),
              this.getAccount().then(function (t) {
                l.configureUser({
                  id: t.id,
                  username: t.name
                }),
                  e.account = t,
                  e.ponies = t.ponies.map(s.decompressPonyInfo).sort(i),
                  e.selectPony(r(e.ponies))
              }).catch(function (t) {
                "Access denied" !== t.message && console.error(t)
              }).finally(function () {
                return e.loading = !1
              })
          }

          return Object.defineProperty(t.prototype, "pony", {
            get: function () {
              return this._pony
            },
            enumerable: !0,
            configurable: !0
          }),
            t.prototype.selectPony = function (t) {
              this._pony = a.cloneDeep(t)
            }
            ,
            t.prototype.getAccount = function () {
              return u.toPromise(this.$http.get("/api/account"))
            }
            ,
            t.prototype.updateAccount = function (t) {
              var e = this;
              return u.toPromise(this.$http.post("/api/account-update", {
                account: t
              })).tap(function (t) {
                return a.merge(e.account, t)
              })
            }
            ,
            t.prototype.saveSettings = function (t) {
              var e = this;
              return u.toPromise(this.$http.post("/api/account-settings", {
                settings: t
              })).tap(function (t) {
                return a.merge(e.account, t)
              })
            }
            ,
            t.prototype.getPonies = function () {
              return u.toPromise(this.$http.get("/api/pony")).then(function (t) {
                return t.map(s.decompressPonyInfo)
              })
            }
            ,
            t.prototype.savePony = function (t) {
              var e = this;
              return this.saving ? o.reject(new Error("Saving in progress")) : (this.saving = !0,
                u.toPromise(this.$http.post("/api/pony/save", {
                  pony: t
                })).then(s.decompressPonyInfo).tap(function (n) {
                  a.remove(e.ponies, function (e) {
                    return e.id === t.id
                  }),
                    e.ponies.push(n),
                    e.ponies.sort(i),
                  e.pony === t && e.selectPony(n)
                }).finally(function () {
                  return e.saving = !1
                }))
            }
            ,
            t.prototype.removePony = function (t) {
              var e = this;
              return u.toPromise(this.$http.post("/api/pony/remove", {
                id: t.id
              })).then(function () {
                a.remove(e.ponies, function (e) {
                  return e.id === t.id
                }),
                e.pony === t && e.selectPony(r(e.ponies))
              })
            }
            ,
            t.prototype.status = function () {
              return u.toPromise(this.$http.get("/api2/game/status"))
            }
            ,
            t.prototype.join = function (t, e) {
              return u.toPromise(this.$http.post("/api/game/join", {
                serverId: t,
                ponyId: e,
                version: c.version
              }))
            }
            ,
            t.$inject = ["$http"],
            t
        }();
        return e.Model = f,
          n.exports
      }),
      System.registerDynamic("33", ["22"], !0, function (t, e, n) {
        "use strict";
        var r = t("22")
          , i = {
          left: 0,
          top: 0
        }
          , o = function () {
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

          return t.prototype.setupEvents = function (t, e, n, o) {
            var a = this;
            t.addEventListener(e, function (e) {
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
                var s, u = e, l = function (t) {
                    u = t,
                      t.preventDefault(),
                      a.send(t, "drag")
                  }
                  , c = function (t) {
                    r.getButton(t) === a.button && (r.isTouch(t) || (u = t),
                      s())
                  }
                  ;
                s = function () {
                  a.send(u, "end"),
                    window.removeEventListener(n, l),
                    window.removeEventListener(o, c),
                    window.removeEventListener("blur", s),
                    a.dragging = !1
                }
                  ,
                  window.addEventListener(n, l),
                  window.addEventListener(o, c),
                  window.addEventListener("blur", s),
                  e.stopPropagation()
              }
            })
          }
            ,
            t.prototype.send = function (t, e) {
              if (this.drag) {
                var n = r.getX(t)
                  , i = r.getY(t);
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
            }
            ,
            t
        }();
        return e.AgDrag = o,
          Object.defineProperty(e, "__esModule", {
            value: !0
          }),
          e.default = ["$parse", "applyCallback", function (t, e) {
            return {
              restrict: "A",
              compile: function (n, r) {
                var i = t(r.agDrag);
                return function (t, n) {
                  var a = new o(n[0]);
                  a.drag = function (n) {
                    return e(function () {
                      i(t, n)
                    })
                  }
                    ,
                    a.relative = r.agDragRelative
                }
              }
            }
          }
          ],
          n.exports
      }),
      System.registerDynamic("34", [], !0, function (t, e, n) {
        return n.exports = '<div ng-class="{ disabled: vm.isDisabled }" class="color-picker"><div ng-style="{ background: vm.bg }" class="color-picker-box"></div><input type="text" ng-focus="vm.focus($event)" ng-blur="vm.open = false" ng-model="vm.inputColor" ng-disabled="vm.isDisabled" spellcheck="false" ng-change="vm.inputChanged()" class="form-control"><div ng-class="{ open: vm.open }" class="dropdown"><div ng-mousedown="$event.stopPropagation(); $event.preventDefault();" class="dropdown-menu dropdown-menu-right color-picker-menu"><div class="color-picker-content"><div ag-drag="vm.dragSV($event)" ag-drag-relative="self" class="color-picker-sv"><div ng-style="{ background: vm.hue }" class="color-picker-sv-bg"><div class="color-picker-sv-overlay-white"><div class="color-picker-sv-overlay-black"></div></div></div><div ng-style="{ left: vm.svLeft + \'%\', top: vm.svTop + \'%\' }" class="color-wheel-circle-sv"><div></div></div></div><div ag-drag="vm.dragHue($event)" ag-drag-relative="self" class="color-picker-hue"><div ng-style="{ top: vm.hueTop + \'%\' }" class="color-wheel-circle-hue"><div></div></div></div></div></div></div></div>',
          n.exports
      }),
      System.registerDynamic("35", ["22", "36", "34"], !0, function (t, e, n) {
        "use strict";
        var r = t("22")
          , i = t("36")
          , o = 175
          , a = function () {
          function t(t) {
            this.$timeout = t,
              this.s = 0,
              this.v = 0,
              this.h = 0,
              this.lastColor = ""
          }

          return t.prototype.focus = function (t) {
            this.open = !0,
              event.target.select()
          }
            ,
            t.prototype.dragSV = function (t) {
              var e = t.event
                , n = t.x
                , i = t.y;
              e.preventDefault(),
                this.updateHsv(),
                this.s = r.clamp(n / o, 0, 1),
                this.v = 1 - r.clamp(i / o, 0, 1),
                this.updateColor()
            }
            ,
            t.prototype.dragHue = function (t) {
              var e = t.event
                , n = t.y;
              e.preventDefault(),
                this.updateHsv(),
                this.h = r.clamp(360 * n / o, 0, 360),
                this.updateColor()
            }
            ,
            t.prototype.updateHsv = function () {
              if (this.lastColor !== this.color) {
                var t = i.default.parseWithAlpha(this.color, 1).hsva(this.h)
                  , e = t.h
                  , n = t.s
                  , r = t.v;
                this.h = e,
                  this.s = n,
                  this.v = r,
                  this.lastColor = this.color
              }
            }
            ,
            t.prototype.updateColor = function () {
              var t = i.default.fromHsva(this.h, this.s, this.v, 1).css()
                , e = this.color !== t;
              this.lastColor = this.color = t,
              e && this.changed && this.changed({
                $value: t
              })
            }
            ,
            t.prototype.inputChanged = function () {
              var t = this;
              this.$timeout(function () {
                t.changed && t.changed({
                  $value: t.color
                })
              }, 0)
            }
            ,
            Object.defineProperty(t.prototype, "inputColor", {
              get: function () {
                return this.isDisabled && this.disabledColor ? this.disabledColor : this.color
              },
              set: function (t) {
                this.isDisabled || (this.color = t)
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "bg", {
              get: function () {
                return i.default.parseWithAlpha(this.inputColor, 1).css()
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "svLeft", {
              get: function () {
                return this.updateHsv(),
                100 * this.s
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "svTop", {
              get: function () {
                return this.updateHsv(),
                100 * (1 - this.v)
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "hueTop", {
              get: function () {
                return this.updateHsv(),
                100 * this.h / 360
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "hue", {
              get: function () {
                return this.updateHsv(),
                  i.default.fromHsva(this.h, 1, 1, 1).css()
              },
              enumerable: !0,
              configurable: !0
            }),
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
            template: t("34")
          },
          n.exports
      }),
      System.registerDynamic("37", [], !0, function (t, e, n) {
        "use strict";
        var r = function () {
          function t() {
          }

          return t.prototype.toggle = function () {
            this.disabled || (this.checked = !this.checked,
            this.changed && this.changed({
              $value: this.checked
            }))
          }
            ,
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
      }),
      System.registerDynamic("38", [], !0, function (t, e, n) {
        return n.exports = '<div class="row form-group"><div class="col-sm-4"><check-box ng-if="vm.hasLock &amp;&amp; !vm.nonLockable" checked="vm.locked" icon="fa-lock" changed="vm.lockChanged($value)" title="Automatic color" class="lock-box"></check-box><label class="control-label text-muted">{{vm.label || \'Color\'}}</label></div><div class="col-sm-8"><color-picker color="vm.fill" is-disabled="vm.locked" changed="vm.fillChanged($value)"></color-picker></div></div><div ng-if="!vm.outlineHidden" class="row form-group"><div class="col-sm-4"><check-box checked="vm.outlineLocked" icon="fa-lock" changed="vm.outlineLockChanged($value)" title="Automatic outline" class="lock-box"></check-box><label class="control-label text-muted">Outline</label></div><div class="col-sm-8"><color-picker color="vm.outline" is-disabled="vm.outlineLocked"></color-picker></div></div>',
          n.exports
      }),
      System.registerDynamic("39", ["3a", "38"], !0, function (t, e, n) {
        "use strict";
        var r = t("3a")
          , i = function () {
          function t() {
          }

          return t.prototype.fillChanged = function (t) {
            this.outlineLocked && (this.outline = r.fillToOutline(t))
          }
            ,
            t.prototype.lockChanged = function (t) {
              t && (this.fill = this.base,
                this.outlineLockChanged(this.outlineLocked))
            }
            ,
            t.prototype.outlineLockChanged = function (t) {
              t && (this.outline = r.fillToOutline(this.fill))
            }
            ,
            t.prototype.$onChanges = function (t) {
              this.locked && t.base && (this.fill = t.base.currentValue,
                this.outlineLockChanged(this.outlineLocked))
            }
            ,
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
            template: t("38")
          },
          n.exports
      }),
      System.registerDynamic("3b", ["22", "36", "3c"], !0, function (t, e, n) {
        "use strict";
        function r(t, e) {
          if (e && 0 !== e.w && 0 !== e.h)
            if (0 === t.w || 0 === t.h)
              t.x = e.ox,
                t.y = e.oy,
                t.w = e.w,
                t.h = e.h;
            else {
              var n = Math.min(t.x, e.ox)
                , r = Math.min(t.y, e.oy);
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
          var o = Math.round((t.canvas.width / 2 - i.w) / 2 - i.x)
            , a = Math.round((t.canvas.height / 2 - i.h) / 2 - i.y);
          e.fill && l.drawColoredSprite(t, e.fill, n, o, a),
          e.outline && l.drawColoredSprite(t, e.outline, r, o, a),
          e.extra && l.drawSprite(t, e.extra, o, a)
        }

        function a(t, e) {
          return Array.isArray(t) ? t[e] : t
        }

        var s = t("22")
          , u = t("36")
          , l = t("3c")
          , c = 52
          , f = function () {
          function t(t, e) {
            var n = this;
            this.$element = e,
              t.$watch("vm.sprite", function () {
                return n.redraw()
              }),
              t.$watch("vm.circle", function () {
                return n.redraw()
              });
            for (var r = 0; r < 6; r++)
              t.$watch("vm.fill[" + r + "]", function () {
                return n.redraw()
              }),
                t.$watch("vm.outline[" + r + "]", function () {
                  return n.redraw()
                })
          }

          return t.prototype.redraw = function () {
            var t = this;
            clearTimeout(this.timeout),
              this.timeout = setTimeout(function () {
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
                  Array.isArray(r) ? (r.forEach(function (t) {
                    return i(l, t)
                  }),
                    r.forEach(function (e, r) {
                      return o(n, e, a(t.fill, r), a(t.outline, r), l)
                    })) : (i(l, r),
                    o(n, r, a(t.fill, 0), a(t.outline, 0), l))
                }
                n.restore()
              })
          }
            ,
            t.prototype.$onInit = function () {
              this.redraw()
            }
            ,
            t.prototype.$onChanges = function () {
              this.redraw()
            }
            ,
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
      }),
      System.registerDynamic("3d", [], !0, function (t, e, n) {
        return n.exports = '<div class="selection-list"><div class="selection-list-content"><sprite-box ng-repeat="i in vm.sprites track by $index" ng-class="{ active: vm.selected === $index }" ng-click="vm.selected = $index" sprite="i" fill="vm.fill" outline="vm.outline" circle="vm.circle" class="selection-item"></sprite-box></div></div>',
          n.exports
      }),
      System.registerDynamic("3e", ["3d"], !0, function (t, e, n) {
        "use strict";
        var r = function () {
          function t() {
          }

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
            template: t("3d")
          },
          n.exports
      }),
      System.registerDynamic("3f", [], !0, function (t, e, n) {
        return n.exports = '<div ng-if="vm.compact"><div class="row form-group"><div class="col-sm-4"><label class="control-label">{{vm.label}}</label></div><div class="col-sm-8"><sprite-selection selected="vm.set.type" sprites="vm.sprites" fill="vm.set.fills[0]" outline="vm.set.outlines[0]"></sprite-selection></div></div></div><div ng-if="!vm.compact"><div class="row form-group"><div class="col-sm-12 text-center"><label class="control-label text-muted">{{vm.label}}</label></div></div><div class="row form-group"><div class="col-sm-12"><sprite-selection selected="vm.set.type" sprites="vm.sprites" fill="vm.set.fills[0]" outline="vm.set.outlines[0]"></sprite-selection></div></div></div><div ng-if="vm.set.type &amp;&amp; vm.sets[vm.set.type].length &gt; 1"><div class="row form-group"><div class="col-sm-12 text-center"><label class="control-label text-muted">Color pattern</label></div></div><div class="row form-group"><div class="col-sm-12"><sprite-selection selected="vm.set.pattern" sprites="vm.sets[vm.set.type]" fill="vm.exampleFills" outline="vm.exampleOutlines"></sprite-selection></div></div></div><fill-outline ng-repeat="c in vm.set.fills track by $index" ng-if="vm.patternColors &gt; $index" label="Color {{$index + 1}}" base="vm.base" outline-hidden="vm.outlineHidden" fill="vm.set.fills[$index]" locked="vm.set.lockFills[$index]" non-lockable="$index === 0 &amp;&amp; vm.nonLockable" outline="vm.set.outlines[$index]" outline-locked="vm.set.lockOutlines[$index]"></fill-outline>',
          n.exports
      }),
      System.registerDynamic("40", ["3f"], !0, function (t, e, n) {
        "use strict";
        var r = function () {
          function t() {
            this.exampleFills = ["Orange", "DodgerBlue", "LimeGreen", "Orchid", "crimson", "Aquamarine"],
              this.exampleOutlines = ["Chocolate", "SteelBlue", "ForestGreen", "DarkOrchid", "darkred", "DarkTurquoise"]
          }

          return Object.defineProperty(t.prototype, "patternColors", {
            get: function () {
              var t = this.set && this.sets && this.sets[this.set.type] && this.sets[this.set.type][this.set.pattern];
              return t ? t.length : this.nonLockable ? 1 : 0
            },
            enumerable: !0,
            configurable: !0
          }),
            t.prototype.$onChanges = function () {
              this.sprites = this.sets ? this.sets.map(function (t) {
                return t ? t[0] : null
              }) : null
            }
            ,
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
            template: t("3f")
          },
          n.exports
      }),
      System.registerDynamic("41", ["36"], !0, function (t, e, n) {
        "use strict";
        var r = t("36")
          , i = function () {
          function t() {
          }

          return t.prototype.$onChanges = function (t) {
            if (t.width || t.height) {
              this.rows = [];
              for (var e = 0; e < this.height; e++) {
                this.rows[e] = [];
                for (var n = 0; n < this.width; n++)
                  this.rows[e][n] = n + this.width * e
              }
            }
          }
            ,
            t.prototype.draw = function (t) {
              this.bitmap && ("eraser" === this.tool ? this.bitmap[t] = "" : "brush" === this.tool ? this.bitmap[t] = r.default.parse(this.bitmap[t]).equal(r.default.parse(this.color)) ? "" : this.color : "eyedropper" === this.tool && (this.color = this.bitmap[t]))
            }
            ,
            t.prototype.colorAt = function (t) {
              return this.bitmap[t] ? r.default.parse(this.bitmap[t]).css() : ""
            }
            ,
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
      }),
      System.registerDynamic("42", ["22", "32", "43", "44", "45"], !0, function (t, e, n) {
        "use strict";
        var r = t("22")
          , i = t("32")
          , o = t("43")
          , a = t("44")
          , s = t("45")
          , u = 3
          , l = function () {
          function t(t) {
            this.$element = t
          }

          return t.prototype.$onInit = function () {
            var t = this;
            return this.canvas = this.$element[0].querySelector("canvas"),
              this.interval = setInterval(function () {
                return t.draw()
              }, 1e3 / 24),
              s.loadSpriteSheets()
          }
            ,
            t.prototype.$onDestroy = function () {
              clearInterval(this.interval)
            }
            ,
            t.prototype.draw = function () {
              var t = u * r.getPixelRatio();
              o.resizeCanvasToElementSize(this.canvas);
              var e = Math.round(this.canvas.width / t)
                , n = Math.round(this.canvas.height / t);
              this.buffer = this.buffer || r.createCanvas(e, n),
                o.resizeCanvas(this.buffer, e, n);
              var s = this.buffer.getContext("2d")
                , l = Math.round(e / 2)
                , c = Math.round(n / 2 + 28);
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
            }
            ,
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
      }),
      System.registerDynamic("46", [], !0, function (t, e, n) {
        return n.exports = '<div class="chat-box"><i ng-click="vm.toggle()" class="fa fa-fw fa-comment chat-open-button game-button"></i><div ng-show="vm.isOpen" class="chat-input-box"><input ng-model="vm.message" ng-keydown="vm.keydown($event)" maxlength="{{::vm.maxSayLength}}" class="chat-input"><i ng-click="vm.send()" class="fa fa-fw fa-angle-double-right chat-send-button game-button"></i></div></div>',
          n.exports
      }),
      System.registerDynamic("47", ["21", "2d", "46"], !0, function (t, e, n) {
        "use strict";
        var r = t("21")
          , i = t("2d")
          , o = i.default.game
          , a = function () {
          function t(t, e) {
            var n = this;
            this.maxSayLength = r.SAY_MAX_LENGTH,
              this.isOpen = !1,
              this.input = e[0].querySelector(".chat-input"),
              o.onChat = function () {
                return t(function () {
                  return n.chat()
                })
              }
              ,
              o.onCommand = function () {
                return t(function () {
                  return n.command()
                })
              }
              ,
              o.onCancel = function () {
                return !!n.isOpen && !!t(function () {
                    return n.close()
                  })
              }
          }

          return t.prototype.send = function () {
            var t = (this.message || "").trim();
            this.close(),
            o.player && t && o.socket.server.say(t)
          }
            ,
            t.prototype.keydown = function (t) {
              13 === t.keyCode ? this.send() : 27 === t.keyCode && this.close()
            }
            ,
            t.prototype.chat = function () {
              this.isOpen ? this.send() : this.open()
            }
            ,
            t.prototype.command = function () {
              this.isOpen || (this.chat(),
                this.message = "/")
            }
            ,
            t.prototype.open = function () {
              var t = this;
              this.isOpen || (this.isOpen = !0,
                setTimeout(function () {
                  return t.input.focus()
                }))
            }
            ,
            t.prototype.close = function () {
              this.isOpen && (this.input.blur(),
                this.isOpen = !1,
                this.message = null )
            }
            ,
            t.prototype.toggle = function () {
              this.isOpen ? this.close() : this.open()
            }
            ,
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
            template: t("46")
          },
          n.exports
      }),
      System.registerDynamic("48", [], !0, function (t, e, n) {
        return n.exports = '<div uib-dropdown is-open="vm.dropdownOpen" class="settings-box"><span id="clock" class="settings-clock">00:00</span><i uib-dropdown-toggle class="fa fa-fw fa-gear game-button"></i><ul uib-dropdown-menu ng-if="vm.dropdownOpen" class="dropdown-menu pull-right"><li ng-mouseup="$event.stopPropagation(); $event.preventDefault();" ng-click="$event.stopPropagation(); $event.preventDefault();"><a ng-click="vm.changeScale()"><i class="fa fa-fw fa-search"></i> Change scale (x{{vm.scale}})</a></li><li class="divider"></li><li><a ng-click="vm.leave()"><i class="fa fa-fw fa-sign-out"></i> Leave</a></li></ul></div>',
          n.exports
      }),
      System.registerDynamic("49", ["2d", "48"], !0, function (t, e, n) {
        "use strict";
        var r = t("2d")
          , i = r.default.game
          , o = function () {
          function t(t, e) {
            this.$timeout = t,
              this.gameService = e
          }

          return Object.defineProperty(t.prototype, "scale", {
            get: function () {
              return i.scale
            },
            enumerable: !0,
            configurable: !0
          }),
            t.prototype.$onInit = function () {
              var t = this
                , e = document.getElementById("canvas");
              e.addEventListener("touchstart", function () {
                t.dropdownOpen && t.$timeout(function () {
                  return t.dropdownOpen = !1
                }, 0)
              })
            }
            ,
            t.prototype.leave = function () {
              this.gameService.leave()
            }
            ,
            t.prototype.changeScale = function () {
              i.changeScale()
            }
            ,
            t.$inject = ["$timeout", "gameService"],
            t
        }();
        return Object.defineProperty(e, "__esModule", {
          value: !0
        }),
          e.default = {
            controller: o,
            controllerAs: "vm",
            template: t("48")
          },
          n.exports
      }),
      System.registerDynamic("4a", [], !0, function (t, e, n) {
        return n.exports = '<li ng-if="vm.model.account" uib-dropdown><a uib-dropdown-toggle class="cursor-pointer">{{vm.model.account.name}} <span class="caret"></span></a><ul uib-dropdown-menu><li><a href="/account">Account settings</a></li><li><a href="/auth/sign-out" target="_self" class="cursor-pointer">Sign out</a></li></ul></li>',
          n.exports
      }),
      System.registerDynamic("4b", ["4a"], !0, function (t, e, n) {
        "use strict";
        var r = function () {
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
            template: t("4a")
          },
          n.exports
      }),
      System.registerDynamic("4c", [], !0, function (t, e, n) {
        return n.exports = '<nav class="navbar navbar-inverse"><div class="navbar-header navbar-main"><button ng-click="vm.menuExpanded = !vm.menuExpanded" class="navbar-toggle collapsed"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a ng-if="vm.logo &amp;&amp; !vm.isActive(\'/\')" href="/" class="main-logo-small hidden-xs"><img src="/images/logo-small.png" width="287" height="65"></a></div><div uib-collapse="!vm.menuExpanded" class="collapse navbar-collapse"><div ng-if="vm.model.loading" style="font-size: 20px; padding: 10px 20px;" class="navbar-right text-muted"><i class="fa fa-fw fa-spin fa-spinner"></i></div><form ng-if="!vm.model.loading &amp;&amp; !vm.model.account" class="navbar-form navbar-right"><div uib-dropdown class="button-group"><button uib-dropdown-toggle class="btn btn-default">Sign in <span class="caret"></span></button><ul uib-dropdown-menu><li ng-repeat="p in vm.providers"><a ng-href="{{p.url}}" target="_self"><i ng-class="p.icon" class="fa fa-fw"></i> {{p.name}}</a></li></ul></div></form><ul class="nav navbar-nav navbar-right"><ng-transclude></ng-transclude><li ng-repeat="i in vm.items" ng-class="{ active: vm.isActive(i.href) }" class="navbar-link"><a ng-href="{{i.href}}">{{i.name}}</a></li><li ng-if="vm.model.account" uib-dropdown><a uib-dropdown-toggle class="cursor-pointer">{{vm.model.account.name}} <span class="caret"></span></a><ul uib-dropdown-menu><li><a href="/account">Account settings</a></li><li><a href="/auth/sign-out" target="_self" class="cursor-pointer">Sign out</a></li></ul></li></ul></div></nav>',
          n.exports
      }),
      System.registerDynamic("4d", ["20", "4c"], !0, function (t, e, n) {
        "use strict";
        var r = t("20")
          , i = function () {
          function t(t) {
            this.$location = t,
              this.items = [],
              this.providers = r.oauthProviders.filter(function (t) {
                return !t.disabled
              })
          }

          return t.prototype.isActive = function (t) {
            return t === this.$location.url()
          }
            ,
            t.$inject = ["$location"],
            t
        }()
          , o = function () {
          function t() {
          }

          return t.prototype.$onInit = function () {
            this.menuBar.items.push(this)
          }
            ,
            t.prototype.$onDestroy = function () {
              this.menuBar.items.splice(this.menuBar.items.indexOf(this), 1)
            }
            ,
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
          template: t("4c")
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
      }),
      System.registerDynamic("4e", [], !0, function (t, e, n) {
        return n.exports = '<div class="sign-in-box center-block"><div class="text-center"><p class="lead">Sign in with your social site account</p><div class="sign-in-box-providers"><a ng-repeat="p in vm.providers" ng-href="{{p.url}}" target="_self" title="{{p.name}}" ng-style="{ borderBottomColor: p.disabled ? \'#666\' : p.color }" ng-class="{ disabled: p.disabled }" class="btn btn-lg btn-provider"><i ng-class="p.icon" class="fa fa-fw fa-lg"></i></a></div></div></div>',
          n.exports
      }),
      System.registerDynamic("4f", ["20", "4e"], !0, function (t, e, n) {
        "use strict";
        var r = t("20")
          , i = function () {
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
            template: t("4e")
          },
          n.exports
      }),
      System.registerDynamic("50", [], !0, function (t, e, n) {
        return n.exports = '<div class="play-box"><div uib-dropdown class="form-group btn-group dropdown"><button ng-if="!vm.joining" ng-click="vm.play()" ng-disabled="!vm.canPlay" type="button" class="btn btn-lg btn-success play-box-btn"><span ng-if="vm.server"><strong>{{vm.label || \'Play\'}}</strong> on<span> {{vm.server.name}}</span></span><span ng-if="!vm.server" class="text-faded">select server to play</span></button><button ng-if="vm.joining" ng-click="vm.cancel()" type="button" class="btn btn-lg btn-success play-box-btn"><i class="fa fa-spinner fa-spin"></i> Cancel</button><button uib-dropdown-toggle class="btn btn-lg btn-success"><span class="caret"></span></button><ul uib-dropdown-menu style="width: 100%;" class="dropdown-menu"><li ng-repeat="s in vm.servers"><a ng-click="vm.server = s"><div ng-if="s.offline" class="pull-right text-unsafe">offline</div><div ng-if="!s.offline" class="pull-right text-muted">online ({{s.online}})</div><strong>{{s.name}}</strong><div class="text-muted text-wrap">{{s.desc}}</div></a></li></ul></div><div ng-if="vm.server.offline" class="form-group"><div class="alert alert-info">Selected server is offline, try again later</div></div><div ng-if="vm.offline" class="form-group"><div class="alert alert-info">Server is offline, try again later</div></div><div ng-if="vm.invalidVersion &amp;&amp; !vm.offline" class="form-group"><div class="alert alert-info">Your client version is outdated, <a ng-click="vm.reload()" class="alert-link">reload</a> to be able to play.</div></div><div ng-if="vm.error" class="form-group"><div class="alert alert-danger">{{vm.error}}</div></div><div ng-if="vm.server" class="form-group text-left"><h4>Server rules</h4><p class="text-muted">{{vm.server.desc}}</p></div></div>',
          n.exports
      }),
      System.registerDynamic("51", ["22", "20", "50"], !0, function (t, e, n) {
        "use strict";
        var r = t("22")
          , i = t("20")
          , o = function () {
          function t(t, e, n) {
            this.$location = t,
              this.gameService = e,
              this.model = n,
              this.handleError = r.errorHandler(this)
          }

          return Object.defineProperty(t.prototype, "server", {
            get: function () {
              return this.gameService.server
            },
            set: function (t) {
              this.gameService.server = t
            },
            enumerable: !0,
            configurable: !0
          }),
            Object.defineProperty(t.prototype, "servers", {
              get: function () {
                return this.gameService.servers
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "offline", {
              get: function () {
                return this.gameService.offline
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "invalidVersion", {
              get: function () {
                return this.gameService.version && this.gameService.version !== i.version
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "joining", {
              get: function () {
                return this.gameService.joining
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "canPlay", {
              get: function () {
                return this.server && this.gameService.canPlay
              },
              enumerable: !0,
              configurable: !0
            }),
            t.prototype.play = function () {
              var t = this;
              return this.error = null ,
                this.model.savePony(this.model.pony).then(function (e) {
                  return t.gameService.join(e.id)
                }).catch(this.handleError)
            }
            ,
            t.prototype.cancel = function () {
              this.gameService.leave()
            }
            ,
            t.prototype.reload = function () {
              location.reload(!0)
            }
            ,
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
            template: t("50")
          },
          n.exports
      });
      (function (t, e) {
          "object" == typeof n && "undefined" != typeof r ? r.exports = e() : "function" == typeof System.amdDefine && System.amdDefine.amd ? System.amdDefine("52", [], e) : t.moment = e()
        })(this, libraries.momentJS);
        System.amdDefine("53", ["52"], function (t) {
          return t
        });
      System.registerDynamic("54", [], !0, function (t, e, n) {
        "use strict";
        !function (t) {
          t[t.None = 0] = "None",
            t[t.Ignore = 1] = "Ignore",
            t[t.Unignore = 2] = "Unignore",
            t[t.Report = 3] = "Report",
            t[t.Mute = 4] = "Mute",
            t[t.Unmute = 5] = "Unmute",
            t[t.Shadow = 6] = "Shadow",
            t[t.Unshadow = 7] = "Unshadow",
            t[t.Timeout = 8] = "Timeout"
        }(e.PlayerAction || (e.PlayerAction = {}));
        e.PlayerAction;
        return n.exports
      });
      System.registerDynamic("55", ["28"], !0, function (t, e, n) {
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

        var a = t("28");
        return e.hasRole = r,
          e.isAdmin = i,
          e.isMod = o,
          n.exports
      });
      System.registerDynamic("56", ["57", "58", "59"], !0, function (t, e, n) {
        "use strict";
        function r(t) {
          m = [t.LINEAR, t.NEAREST_MIPMAP_LINEAR, t.LINEAR_MIPMAP_NEAREST, t.LINEAR_MIPMAP_NEAREST],
            g = [t.NEAREST, t.LINEAR, t.NEAREST_MIPMAP_NEAREST, t.NEAREST_MIPMAP_LINEAR, t.LINEAR_MIPMAP_NEAREST, t.LINEAR_MIPMAP_LINEAR],
            y = [t.REPEAT, t.CLAMP_TO_EDGE, t.MIRRORED_REPEAT]
        }

        function i(t, e, n) {
          var r = t.gl
            , i = r.getParameter(r.MAX_TEXTURE_SIZE);
          if (e < 0 || e > i || n < 0 || n > i)
            throw new Error("gl-texture2d: Invalid texture size");
          return t._shape = [e, n],
            t.bind(),
            r.texImage2D(r.TEXTURE_2D, 0, t.format, e, n, 0, t.format, t.type, null),
            t._mipLevels = [0],
            t
        }

        function o(t, e, n, r, i, o) {
          this.gl = t,
            this.handle = e,
            this.format = i,
            this.type = o,
            this._shape = [n, r],
            this._mipLevels = [0],
            this._magFilter = t.NEAREST,
            this._minFilter = t.NEAREST,
            this._wrapS = t.CLAMP_TO_EDGE,
            this._wrapT = t.CLAMP_TO_EDGE,
            this._anisoSamples = 1;
          var a = this
            , s = [this._wrapS, this._wrapT];
          Object.defineProperties(s, [{
            get: function () {
              return a._wrapS
            },
            set: function (t) {
              return a.wrapS = t
            }
          }, {
            get: function () {
              return a._wrapT
            },
            set: function (t) {
              return a.wrapT = t
            }
          }]),
            this._wrapVector = s;
          var u = [this._shape[0], this._shape[1]];
          Object.defineProperties(u, [{
            get: function () {
              return a._shape[0]
            },
            set: function (t) {
              return a.width = t
            }
          }, {
            get: function () {
              return a._shape[1]
            },
            set: function (t) {
              return a.height = t
            }
          }]),
            this._shapeVector = u
        }

        function a(t, e) {
          return 3 === t.length ? 1 === e[2] && e[1] === t[0] * t[2] && e[0] === t[2] : 1 === e[0] && e[1] === t[0]
        }

        function s(t, e, n, r, i, o, s, u) {
          var l = u.dtype
            , c = u.shape.slice();
          if (c.length < 2 || c.length > 3)
            throw new Error("gl-texture2d: Invalid ndarray, must be 2d or 3d");
          var f = 0
            , p = 0
            , m = a(c, u.stride.slice());
          "float32" === l ? f = t.FLOAT : "float64" === l ? (f = t.FLOAT,
            m = !1,
            l = "float32") : "uint8" === l ? f = t.UNSIGNED_BYTE : (f = t.UNSIGNED_BYTE,
            m = !1,
            l = "uint8");
          var g = 1;
          if (2 === c.length)
            p = t.LUMINANCE,
              c = [c[0], c[1], 1],
              u = h(u.data, c, [u.stride[0], u.stride[1], 1], u.offset);
          else {
            if (3 !== c.length)
              throw new Error("gl-texture2d: Invalid shape for texture");
            if (1 === c[2])
              p = t.ALPHA;
            else if (2 === c[2])
              p = t.LUMINANCE_ALPHA;
            else if (3 === c[2])
              p = t.RGB;
            else {
              if (4 !== c[2])
                throw new Error("gl-texture2d: Invalid shape for pixel coords");
              p = t.RGBA
            }
            g = c[2]
          }
          if (p !== t.LUMINANCE && p !== t.ALPHA || i !== t.LUMINANCE && i !== t.ALPHA || (p = i),
            p !== i)
            throw new Error("gl-texture2d: Incompatible texture format for setPixels");
          var y = u.size
            , _ = s.indexOf(r) < 0;
          if (_ && s.push(r),
            f === o && m)
            0 === u.offset && u.data.length === y ? _ ? t.texImage2D(t.TEXTURE_2D, r, i, c[0], c[1], 0, i, o, u.data) : t.texSubImage2D(t.TEXTURE_2D, r, e, n, c[0], c[1], i, o, u.data) : _ ? t.texImage2D(t.TEXTURE_2D, r, i, c[0], c[1], 0, i, o, u.data.subarray(u.offset, u.offset + y)) : t.texSubImage2D(t.TEXTURE_2D, r, e, n, c[0], c[1], i, o, u.data.subarray(u.offset, u.offset + y));
          else {
            var w;
            w = o === t.FLOAT ? v.mallocFloat32(y) : v.mallocUint8(y);
            var x = h(w, c, [c[2], c[2] * c[0], 1]);
            f === t.FLOAT && o === t.UNSIGNED_BYTE ? b(x, u) : d.assign(x, u),
              _ ? t.texImage2D(t.TEXTURE_2D, r, i, c[0], c[1], 0, i, o, w.subarray(0, y)) : t.texSubImage2D(t.TEXTURE_2D, r, e, n, c[0], c[1], i, o, w.subarray(0, y)),
              o === t.FLOAT ? v.freeFloat32(w) : v.freeUint8(w)
          }
        }

        function u(t) {
          var e = t.createTexture();
          return t.bindTexture(t.TEXTURE_2D, e),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
            e
        }

        function l(t, e, n, r, i) {
          var a = t.getParameter(t.MAX_TEXTURE_SIZE);
          if (e < 0 || e > a || n < 0 || n > a)
            throw new Error("gl-texture2d: Invalid texture shape");
          if (i === t.FLOAT && !t.getExtension("OES_texture_float"))
            throw new Error("gl-texture2d: Floating point textures not supported on this platform");
          var s = u(t);
          return t.texImage2D(t.TEXTURE_2D, 0, r, e, n, 0, r, i, null),
            new o(t, s, e, n, r, i)
        }

        function c(t, e, n, r) {
          var i = u(t);
          return t.texImage2D(t.TEXTURE_2D, 0, n, n, r, e),
            new o(t, i, 0 | e.width, 0 | e.height, n, r)
        }

        function f(t, e) {
          var n = e.dtype
            , r = e.shape.slice()
            , i = t.getParameter(t.MAX_TEXTURE_SIZE);
          if (r[0] < 0 || r[0] > i || r[1] < 0 || r[1] > i)
            throw new Error("gl-texture2d: Invalid texture size");
          var s = a(r, e.stride.slice())
            , l = 0;
          "float32" === n ? l = t.FLOAT : "float64" === n ? (l = t.FLOAT,
            s = !1,
            n = "float32") : "uint8" === n ? l = t.UNSIGNED_BYTE : (l = t.UNSIGNED_BYTE,
            s = !1,
            n = "uint8");
          var c = 0;
          if (2 === r.length)
            c = t.LUMINANCE,
              r = [r[0], r[1], 1],
              e = h(e.data, r, [e.stride[0], e.stride[1], 1], e.offset);
          else {
            if (3 !== r.length)
              throw new Error("gl-texture2d: Invalid shape for texture");
            if (1 === r[2])
              c = t.ALPHA;
            else if (2 === r[2])
              c = t.LUMINANCE_ALPHA;
            else if (3 === r[2])
              c = t.RGB;
            else {
              if (4 !== r[2])
                throw new Error("gl-texture2d: Invalid shape for pixel coords");
              c = t.RGBA
            }
          }
          l !== t.FLOAT || t.getExtension("OES_texture_float") || (l = t.UNSIGNED_BYTE,
            s = !1);
          var f, p, m = e.size;
          if (s)
            f = 0 === e.offset && e.data.length === m ? e.data : e.data.subarray(e.offset, e.offset + m);
          else {
            var g = [r[2], r[2] * r[0], 1];
            p = v.malloc(m, n);
            var y = h(p, r, g, 0);
            "float32" !== n && "float64" !== n || l !== t.UNSIGNED_BYTE ? d.assign(y, e) : b(y, e),
              f = p.subarray(0, m)
          }
          var _ = u(t);
          return t.texImage2D(t.TEXTURE_2D, 0, c, r[0], r[1], 0, c, l, f),
          s || v.free(p),
            new o(t, _, r[0], r[1], c, l)
        }

        function p(t) {
          if (arguments.length <= 1)
            throw new Error("gl-texture2d: Missing arguments for texture2d constructor");
          if (m || r(t),
            "number" == typeof arguments[1])
            return l(t, arguments[1], arguments[2], arguments[3] || t.RGBA, arguments[4] || t.UNSIGNED_BYTE);
          if (Array.isArray(arguments[1]))
            return l(t, 0 | arguments[1][0], 0 | arguments[1][1], arguments[2] || t.RGBA, arguments[3] || t.UNSIGNED_BYTE);
          if ("object" == typeof arguments[1]) {
            var e = arguments[1];
            if (e instanceof HTMLCanvasElement || e instanceof HTMLImageElement || e instanceof HTMLVideoElement || e instanceof ImageData)
              return c(t, e, arguments[2] || t.RGBA, arguments[3] || t.UNSIGNED_BYTE);
            if (e.shape && e.data && e.stride)
              return f(t, e)
          }
          throw new Error("gl-texture2d: Invalid arguments for texture2d constructor")
        }

        var h = t("57")
          , d = t("58")
          , v = t("59");
        n.exports = p;
        var m = null
          , g = null
          , y = null
          , b = function (t, e) {
          d.muls(t, e, 255)
        }
          , _ = o.prototype;
        return Object.defineProperties(_, {
          minFilter: {
            get: function () {
              return this._minFilter
            },
            set: function (t) {
              this.bind();
              var e = this.gl;
              if (this.type === e.FLOAT && m.indexOf(t) >= 0 && (e.getExtension("OES_texture_float_linear") || (t = e.NEAREST)),
                g.indexOf(t) < 0)
                throw new Error("gl-texture2d: Unknown filter mode " + t);
              return e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, t),
                this._minFilter = t
            }
          },
          magFilter: {
            get: function () {
              return this._magFilter
            },
            set: function (t) {
              this.bind();
              var e = this.gl;
              if (this.type === e.FLOAT && m.indexOf(t) >= 0 && (e.getExtension("OES_texture_float_linear") || (t = e.NEAREST)),
                g.indexOf(t) < 0)
                throw new Error("gl-texture2d: Unknown filter mode " + t);
              return e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, t),
                this._magFilter = t
            }
          },
          mipSamples: {
            get: function () {
              return this._anisoSamples
            },
            set: function (t) {
              var e = this._anisoSamples;
              if (this._anisoSamples = 0 | Math.max(t, 1),
                e !== this._anisoSamples) {
                var n = gl.getExtension("EXT_texture_filter_anisotropic");
                n && this.gl.texParameterf(this.gl.TEXTURE_2D, n.TEXTURE_MAX_ANISOTROPY_EXT, this._anisoSamples)
              }
              return this._anisoSamples
            }
          },
          wrapS: {
            get: function () {
              return this._wrapS
            },
            set: function (t) {
              if (this.bind(),
                y.indexOf(t) < 0)
                throw new Error("gl-texture2d: Unknown wrap mode " + t);
              return this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, t),
                this._wrapS = t
            }
          },
          wrapT: {
            get: function () {
              return this._wrapT
            },
            set: function (t) {
              if (this.bind(),
                y.indexOf(t) < 0)
                throw new Error("gl-texture2d: Unknown wrap mode " + t);
              return this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, t),
                this._wrapT = t
            }
          },
          wrap: {
            get: function () {
              return this._wrapVector
            },
            set: function (t) {
              if (Array.isArray(t) || (t = [t, t]),
                2 !== t.length)
                throw new Error("gl-texture2d: Must specify wrap mode for rows and columns");
              for (var e = 0; e < 2; ++e)
                if (y.indexOf(t[e]) < 0)
                  throw new Error("gl-texture2d: Unknown wrap mode " + t);
              this._wrapS = t[0],
                this._wrapT = t[1];
              var n = this.gl;
              return this.bind(),
                n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, this._wrapS),
                n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, this._wrapT),
                t
            }
          },
          shape: {
            get: function () {
              return this._shapeVector
            },
            set: function (t) {
              if (Array.isArray(t)) {
                if (2 !== t.length)
                  throw new Error("gl-texture2d: Invalid texture shape")
              } else
                t = [0 | t, 0 | t];
              return i(this, 0 | t[0], 0 | t[1]),
                [0 | t[0], 0 | t[1]]
            }
          },
          width: {
            get: function () {
              return this._shape[0]
            },
            set: function (t) {
              return t = 0 | t,
                i(this, t, this._shape[1]),
                t
            }
          },
          height: {
            get: function () {
              return this._shape[1]
            },
            set: function (t) {
              return t = 0 | t,
                i(this, this._shape[0], t),
                t
            }
          }
        }),
          _.bind = function (t) {
            var e = this.gl;
            return void 0 !== t && e.activeTexture(e.TEXTURE0 + (0 | t)),
              e.bindTexture(e.TEXTURE_2D, this.handle),
              void 0 !== t ? 0 | t : e.getParameter(e.ACTIVE_TEXTURE) - e.TEXTURE0
          }
          ,
          _.dispose = function () {
            this.gl.deleteTexture(this.handle)
          }
          ,
          _.generateMipmap = function () {
            this.bind(),
              this.gl.generateMipmap(this.gl.TEXTURE_2D);
            for (var t = Math.min(this._shape[0], this._shape[1]), e = 0; t > 0; ++e,
              t >>>= 1)
              this._mipLevels.indexOf(e) < 0 && this._mipLevels.push(e)
          }
          ,
          _.setPixels = function (t, e, n, r) {
            var i = this.gl;
            if (this.bind(),
                Array.isArray(e) ? (r = n,
                  n = 0 | e[1],
                  e = 0 | e[0]) : (e = e || 0,
                  n = n || 0),
                r = r || 0,
              t instanceof HTMLCanvasElement || t instanceof ImageData || t instanceof HTMLImageElement || t instanceof HTMLVideoElement) {
              var o = this._mipLevels.indexOf(r) < 0;
              o ? (i.texImage2D(i.TEXTURE_2D, 0, this.format, this.format, this.type, t),
                this._mipLevels.push(r)) : i.texSubImage2D(i.TEXTURE_2D, r, e, n, this.format, this.type, t)
            } else {
              if (!(t.shape && t.stride && t.data))
                throw new Error("gl-texture2d: Unsupported data type");
              if (t.shape.length < 2 || e + t.shape[1] > this._shape[1] >>> r || n + t.shape[0] > this._shape[0] >>> r || e < 0 || n < 0)
                throw new Error("gl-texture2d: Texture dimensions are out of bounds");
              s(i, e, n, r, this.format, this.type, this._mipLevels, t)
            }
          }
          ,
          n.exports
      });
      System.registerDynamic("5a", ["56"], !0, function (t, e, n) {
        return n.exports = t("56"),
          n.exports
      }),
      System.registerDynamic("5b", ["5a"], !0, function (t, e, n) {
        "use strict";
        function r(t) {
          var e = t.getParameter(t.FRAMEBUFFER_BINDING)
            , n = t.getParameter(t.RENDERBUFFER_BINDING)
            , r = t.getParameter(t.TEXTURE_BINDING_2D);
          return [e, n, r]
        }

        function i(t, e) {
          t.bindFramebuffer(t.FRAMEBUFFER, e[0]),
            t.bindRenderbuffer(t.RENDERBUFFER, e[1]),
            t.bindTexture(t.TEXTURE_2D, e[2])
        }

        function o(t, e) {
          var n = t.getParameter(e.MAX_COLOR_ATTACHMENTS_WEBGL);
          y = new Array(n + 1);
          for (var r = 0; r <= n; ++r) {
            for (var i = new Array(n), o = 0; o < r; ++o)
              i[o] = t.COLOR_ATTACHMENT0 + o;
            for (var o = r; o < n; ++o)
              i[o] = t.NONE;
            y[r] = i
          }
        }

        function a(t) {
          switch (t) {
            case d:
              throw new Error("gl-fbo: Framebuffer unsupported");
            case v:
              throw new Error("gl-fbo: Framebuffer incomplete attachment");
            case m:
              throw new Error("gl-fbo: Framebuffer incomplete dimensions");
            case g:
              throw new Error("gl-fbo: Framebuffer incomplete missing attachment");
            default:
              throw new Error("gl-fbo: Framebuffer failed for unspecified reason")
          }
        }

        function s(t, e, n, r, i, o) {
          if (!r)
            return null;
          var a = h(t, e, n, i, r);
          return a.magFilter = t.NEAREST,
            a.minFilter = t.NEAREST,
            a.mipSamples = 1,
            a.bind(),
            t.framebufferTexture2D(t.FRAMEBUFFER, o, t.TEXTURE_2D, a.handle, 0),
            a
        }

        function u(t, e, n, r, i) {
          var o = t.createRenderbuffer();
          return t.bindRenderbuffer(t.RENDERBUFFER, o),
            t.renderbufferStorage(t.RENDERBUFFER, r, e, n),
            t.framebufferRenderbuffer(t.FRAMEBUFFER, i, t.RENDERBUFFER, o),
            o
        }

        function l(t) {
          var e = r(t.gl)
            , n = t.gl
            , o = t.handle = n.createFramebuffer()
            , l = t._shape[0]
            , c = t._shape[1]
            , f = t.color.length
            , p = t._ext
            , h = t._useStencil
            , d = t._useDepth
            , v = t._colorType;
          n.bindFramebuffer(n.FRAMEBUFFER, o);
          for (var m = 0; m < f; ++m)
            t.color[m] = s(n, l, c, v, n.RGBA, n.COLOR_ATTACHMENT0 + m);
          0 === f ? (t._color_rb = u(n, l, c, n.RGBA4, n.COLOR_ATTACHMENT0),
          p && p.drawBuffersWEBGL(y[0])) : f > 1 && p.drawBuffersWEBGL(y[f]);
          var g = n.getExtension("WEBGL_depth_texture");
          g ? h ? t.depth = s(n, l, c, g.UNSIGNED_INT_24_8_WEBGL, n.DEPTH_STENCIL, n.DEPTH_STENCIL_ATTACHMENT) : d && (t.depth = s(n, l, c, n.UNSIGNED_SHORT, n.DEPTH_COMPONENT, n.DEPTH_ATTACHMENT)) : d && h ? t._depth_rb = u(n, l, c, n.DEPTH_STENCIL, n.DEPTH_STENCIL_ATTACHMENT) : d ? t._depth_rb = u(n, l, c, n.DEPTH_COMPONENT16, n.DEPTH_ATTACHMENT) : h && (t._depth_rb = u(n, l, c, n.STENCIL_INDEX, n.STENCIL_ATTACHMENT));
          var b = n.checkFramebufferStatus(n.FRAMEBUFFER);
          if (b !== n.FRAMEBUFFER_COMPLETE) {
            t._destroyed = !0,
              n.bindFramebuffer(n.FRAMEBUFFER, null),
              n.deleteFramebuffer(t.handle),
              t.handle = null ,
            t.depth && (t.depth.dispose(),
              t.depth = null ),
            t._depth_rb && (n.deleteRenderbuffer(t._depth_rb),
              t._depth_rb = null );
            for (var m = 0; m < t.color.length; ++m)
              t.color[m].dispose(),
                t.color[m] = null;
            t._color_rb && (n.deleteRenderbuffer(t._color_rb),
              t._color_rb = null ),
              i(n, e),
              a(b)
          }
          i(n, e)
        }

        function c(t, e, n, r, i, o, a, s) {
          this.gl = t,
            this._shape = [0 | e, 0 | n],
            this._destroyed = !1,
            this._ext = s,
            this.color = new Array(i);
          for (var u = 0; u < i; ++u)
            this.color[u] = null;
          this._color_rb = null ,
            this.depth = null ,
            this._depth_rb = null ,
            this._colorType = r,
            this._useDepth = o,
            this._useStencil = a;
          var c = this
            , f = [0 | e, 0 | n];
          Object.defineProperties(f, {
            0: {
              get: function () {
                return c._shape[0]
              },
              set: function (t) {
                return c.width = t
              }
            },
            1: {
              get: function () {
                return c._shape[1]
              },
              set: function (t) {
                return c.height = t
              }
            }
          }),
            this._shapeVector = f,
            l(this)
        }

        function f(t, e, n) {
          if (t._destroyed)
            throw new Error("gl-fbo: Can't resize destroyed FBO");
          if (t._shape[0] !== e || t._shape[1] !== n) {
            var o = t.gl
              , s = o.getParameter(o.MAX_RENDERBUFFER_SIZE);
            if (e < 0 || e > s || n < 0 || n > s)
              throw new Error("gl-fbo: Can't resize FBO, invalid dimensions");
            t._shape[0] = e,
              t._shape[1] = n;
            for (var u = r(o), l = 0; l < t.color.length; ++l)
              t.color[l].shape = t._shape;
            t._color_rb && (o.bindRenderbuffer(o.RENDERBUFFER, t._color_rb),
              o.renderbufferStorage(o.RENDERBUFFER, o.RGBA4, t._shape[0], t._shape[1])),
            t.depth && (t.depth.shape = t._shape),
            t._depth_rb && (o.bindRenderbuffer(o.RENDERBUFFER, t._depth_rb),
              t._useDepth && t._useStencil ? o.renderbufferStorage(o.RENDERBUFFER, o.DEPTH_STENCIL, t._shape[0], t._shape[1]) : t._useDepth ? o.renderbufferStorage(o.RENDERBUFFER, o.DEPTH_COMPONENT16, t._shape[0], t._shape[1]) : t._useStencil && o.renderbufferStorage(o.RENDERBUFFER, o.STENCIL_INDEX, t._shape[0], t._shape[1])),
              o.bindFramebuffer(o.FRAMEBUFFER, t.handle);
            var c = o.checkFramebufferStatus(o.FRAMEBUFFER);
            c !== o.FRAMEBUFFER_COMPLETE && (t.dispose(),
              i(o, u),
              a(c)),
              i(o, u)
          }
        }

        function p(t, e, n, r) {
          d || (d = t.FRAMEBUFFER_UNSUPPORTED,
            v = t.FRAMEBUFFER_INCOMPLETE_ATTACHMENT,
            m = t.FRAMEBUFFER_INCOMPLETE_DIMENSIONS,
            g = t.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT);
          var i = t.getExtension("WEBGL_draw_buffers");
          if (!y && i && o(t, i),
            Array.isArray(e) && (r = n,
              n = 0 | e[1],
              e = 0 | e[0]),
            "number" != typeof e)
            throw new Error("gl-fbo: Missing shape parameter");
          var a = t.getParameter(t.MAX_RENDERBUFFER_SIZE);
          if (e < 0 || e > a || n < 0 || n > a)
            throw new Error("gl-fbo: Parameters are too large for FBO");
          r = r || {};
          var s = 1;
          if ("color" in r) {
            if (s = Math.max(0 | r.color, 0),
              s < 0)
              throw new Error("gl-fbo: Must specify a nonnegative number of colors");
            if (s > 1) {
              if (!i)
                throw new Error("gl-fbo: Multiple draw buffer extension not supported");
              if (s > t.getParameter(i.MAX_COLOR_ATTACHMENTS_WEBGL))
                throw new Error("gl-fbo: Context does not support " + s + " draw buffers")
            }
          }
          var u = t.UNSIGNED_BYTE
            , l = t.getExtension("OES_texture_float");
          if (r.float && s > 0) {
            if (!l)
              throw new Error("gl-fbo: Context does not support floating point textures");
            u = t.FLOAT
          } else
            r.preferFloat && s > 0 && l && (u = t.FLOAT);
          var f = !0;
          "depth" in r && (f = !!r.depth);
          var p = !1;
          return "stencil" in r && (p = !!r.stencil),
            new c(t, e, n, u, s, f, p, i)
        }

        var h = t("5a");
        n.exports = p;
        var d, v, m, g, y = null, b = c.prototype;
        return Object.defineProperties(b, {
          shape: {
            get: function () {
              return this._destroyed ? [0, 0] : this._shapeVector
            },
            set: function (t) {
              if (Array.isArray(t) || (t = [0 | t, 0 | t]),
                2 !== t.length)
                throw new Error("gl-fbo: Shape vector must be length 2");
              var e = 0 | t[0]
                , n = 0 | t[1];
              return f(this, e, n),
                [e, n]
            },
            enumerable: !1
          },
          width: {
            get: function () {
              return this._destroyed ? 0 : this._shape[0]
            },
            set: function (t) {
              return t = 0 | t,
                f(this, t, this._shape[1]),
                t
            },
            enumerable: !1
          },
          height: {
            get: function () {
              return this._destroyed ? 0 : this._shape[1]
            },
            set: function (t) {
              return t = 0 | t,
                f(this, this._shape[0], t),
                t
            },
            enumerable: !1
          }
        }),
          b.bind = function () {
            if (!this._destroyed) {
              var t = this.gl;
              t.bindFramebuffer(t.FRAMEBUFFER, this.handle),
                t.viewport(0, 0, this._shape[0], this._shape[1])
            }
          }
          ,
          b.dispose = function () {
            if (!this._destroyed) {
              this._destroyed = !0;
              var t = this.gl;
              t.deleteFramebuffer(this.handle),
                this.handle = null ,
              this.depth && (this.depth.dispose(),
                this.depth = null ),
              this._depth_rb && (t.deleteRenderbuffer(this._depth_rb),
                this._depth_rb = null );
              for (var e = 0; e < this.color.length; ++e)
                this.color[e].dispose(),
                  this.color[e] = null;
              this._color_rb && (t.deleteRenderbuffer(this._color_rb),
                this._color_rb = null )
            }
          }
          ,
          n.exports
      }),
      System.registerDynamic("5c", ["5b"], !0, function (t, e, n) {
        return n.exports = t("5b"),
          n.exports
      }),
      System.registerDynamic("2b", ["5e", "22", "21", "44", "32", "5d"], !0, function (t, e, n) {
        "use strict";
        var r = t("5e")
          , i = t("22")
          , o = t("21")
          , a = t("44")
          , s = t("32")
          , u = t("5d")
          , l = r.mat2d.create()
          , c = r.vec2.create()
          , f = function () {
          function t(t, e, n) {
            this.id = t,
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
            var r = a.PONY_WIDTH
              , o = a.PONY_HEIGHT;
            this.bounds = {
              x: -r / 2,
              y: -o,
              w: r,
              h: o + 5
            },
              this.interactBounds = {
                x: -20,
                y: -50,
                w: 40,
                h: 50
              },
              this.info = s.toRenderInfo(s.decompressPonyInfo(e)),
              this.right = i.hasFlag(n, 1)
          }

          return t.prototype.update = function (t) {
            this.time += t,
            this.time - this.nextBlink > 1 && (this.nextBlink = this.time + 2 * Math.random() + 3),
              this.walking = !(!this.vx && !this.vy),
              this.right = i.isFacingRight(this.vx, this.right);
            var e = Math.floor((this.time - this.nextBlink) * o.frameTime);
            this.state.blinkFrame = a.BLINK_FRAMES[e] || 1,
              this.state.animation = this.walking ? u.trot : u.stand,
              this.state.animationFrame = Math.floor(this.time * o.frameTime) % this.state.animation.frames
          }
            ,
            t.prototype.draw = function (t) {
              r.mat2d.identity(l),
                r.mat2d.translate(l, l, r.vec2.set(c, Math.round(this.x * o.tileWidth), Math.round(this.y * o.tileHeight))),
                r.mat2d.scale(l, l, r.vec2.set(c, this.right ? -1 : 1, 1)),
                t.transform = l,
                a.drawPonyGL(t, this.info, this.state, 0, 0, this.right, this.selected),
                t.transform = null
            }
            ,
            t.prototype.drawHead = function (t) {
              a.drawPony2D(t, this.info, {
                animation: u.stand,
                animationFrame: 0,
                blinkFrame: 0
              }, 0, 0, !0)
            }
            ,
            t
        }();
        return e.Pony = f,
          n.exports
      }),
      System.registerDynamic("23", [], !0, function (t, e, n) {
        "use strict";
        function r(t) {
          return t !== o.None
        }

        function i(t) {
          return t >= o.Dirt && t <= o.Grass
        }

        !function (t) {
          t[t.None = 0] = "None",
            t[t.Dirt = 1] = "Dirt",
            t[t.Grass = 2] = "Grass"
        }(e.TileType || (e.TileType = {}));
        var o = e.TileType;
        e.TILE_COUNTS = [[0, 4], [2, 3], [4, 3], [6, 3], [8, 3], [13, 3], [14, 3], [47, 4]],
          e.TILE_COUNT_MAP = [],
          e.TILE_MAP_MAP = [],
          e.TILE_COUNTS.forEach(function (t) {
            var n = t[0]
              , r = t[1];
            return e.TILE_COUNT_MAP[n] = r
          });
        for (var a = 0, s = 0; s <= 47; s++)
          e.TILE_MAP_MAP[s] = a,
            a += e.TILE_COUNT_MAP[s] || 1;
        return e.canWalk = r,
          e.isValidTile = i,
          e.TILE_MAP = [46, 46, 22, 22, 46, 46, 22, 22, 21, 21, 17, 11, 21, 21, 17, 11, 19, 19, 18, 18, 19, 19, 12, 12, 14, 14, 24, 28, 14, 14, 30, 6, 46, 46, 22, 22, 46, 46, 22, 22, 21, 21, 17, 11, 21, 21, 17, 11, 19, 19, 18, 18, 19, 19, 12, 12, 14, 14, 24, 28, 14, 14, 30, 6, 20, 20, 13, 13, 20, 20, 13, 13, 16, 16, 23, 32, 16, 16, 23, 32, 15, 15, 25, 25, 15, 15, 34, 34, 26, 26, 45, 41, 26, 26, 42, 36, 20, 20, 13, 13, 20, 20, 13, 13, 10, 10, 31, 4, 10, 10, 31, 4, 15, 15, 25, 25, 15, 15, 34, 34, 27, 27, 43, 37, 27, 27, 35, 5, 46, 46, 22, 22, 46, 46, 22, 22, 21, 21, 17, 11, 21, 21, 17, 11, 19, 19, 18, 18, 19, 19, 12, 12, 14, 14, 24, 28, 14, 14, 30, 6, 46, 46, 22, 22, 46, 46, 22, 22, 21, 21, 17, 11, 21, 21, 17, 11, 19, 19, 18, 18, 19, 19, 12, 12, 14, 14, 24, 28, 14, 14, 30, 6, 20, 20, 13, 13, 20, 20, 13, 13, 16, 16, 23, 32, 16, 16, 23, 32, 9, 9, 33, 33, 9, 9, 8, 8, 29, 29, 44, 39, 29, 29, 38, 7, 20, 20, 13, 13, 20, 20, 13, 13, 10, 10, 31, 4, 10, 10, 31, 4, 9, 9, 33, 33, 9, 9, 8, 8, 2, 2, 40, 3, 2, 2, 1, 0],
          n.exports
      }),
      System.registerDynamic("2c", ["21", "22", "23"], !0, function (t, e, n) {
        "use strict";
        function r(t, e) {
          if (!t.interactive)
            return !1;
          var n = t.interactBounds || t.bounds;
          return o.contains(t.x, t.y, n, e)
        }

        var i = t("21")
          , o = t("22")
          , a = t("23")
          , s = function () {
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
            get: function () {
              return this.regionsX * i.REGION_SIZE
            },
            enumerable: !0,
            configurable: !0
          }),
            Object.defineProperty(t.prototype, "height", {
              get: function () {
                return this.regionsY * i.REGION_SIZE
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "entities", {
              get: function () {
                return this.regions[0] ? this.regions[0].entities : []
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "entitiesDrawn", {
              get: function () {
                var t = 0;
                return this.forEachRegion(function (e) {
                  return t += e.entitiesDrawn
                }),
                  t
              },
              enumerable: !0,
              configurable: !0
            }),
            t.prototype.findEntity = function (t) {
              var e = null;
              return this.forEachRegion(function (n) {
                return !(e = o.findById(n.entities, t))
              }),
                e
            }
            ,
            t.prototype.findClosestEntity = function (t, e) {
              var n, r = 0;
              return this.forEachEntity(function (i) {
                if (!e || e(i)) {
                  var a = o.distance(i, t);
                  (a < r || !n) && (n = i,
                    r = a)
                }
              }),
                n
            }
            ,
            t.prototype.addEntity = function (t) {
              this.regions[0] && this.regions[0].entities.push(t)
            }
            ,
            t.prototype.removeEntity = function (t) {
              this.forEachRegion(function (e) {
                return !o.removeById(e.entities, t)
              })
            }
            ,
            t.prototype.pickEntity = function (t, e) {
              var n = null;
              return this.forEachRegion(function (i) {
                return !(n = i.entities.find(function (n) {
                  return ("pony" !== n.type || !e) && r(n, t)
                }))
              }),
                n
            }
            ,
            t.prototype.getTotalEntities = function (t) {
              var e = 0;
              return this.forEachRegion(function (n) {
                e += t ? n.entities.reduce(function (e, n) {
                  return e + (t(n) ? 1 : 0)
                }, 0) : n.entities.length
              }),
                e
            }
            ,
            t.prototype.updateMinMaxRegion = function () {
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
            }
            ,
            t.prototype.setRegion = function (t, e, n) {
              t >= 0 && e >= 0 && t < this.regionsX && e < this.regionsY && (this.regions[t + e * this.regionsX] = null ,
                this.setDirty(t * i.REGION_SIZE - 1, e * i.REGION_SIZE - 1, i.REGION_SIZE + 2, i.REGION_SIZE + 2),
                this.regions[t + e * this.regionsX] = n,
                this.updateMinMaxRegion())
            }
            ,
            t.prototype.getRegion = function (t, e) {
              return t >= 0 && e >= 0 && t < this.regionsX && e < this.regionsY ? this.regions[t + e * this.regionsX] : null
            }
            ,
            t.prototype.getRegionGlobal = function (t, e) {
              var n = Math.floor(t / i.REGION_SIZE)
                , r = Math.floor(e / i.REGION_SIZE);
              return this.getRegion(n, r)
            }
            ,
            t.prototype.getTile = function (t, e) {
              var n = this.getRegionGlobal(t, e);
              return n ? n.getTile(t - n.x * i.REGION_SIZE, e - n.y * i.REGION_SIZE) : a.TileType.None
            }
            ,
            t.prototype.doRelativeToRegion = function (t, e, n) {
              var r = this.getRegionGlobal(t, e);
              if (r) {
                var o = Math.floor(t - r.x * i.REGION_SIZE)
                  , a = Math.floor(e - r.y * i.REGION_SIZE);
                n(r, o, a)
              }
            }
            ,
            t.prototype.setTile = function (t, e, n) {
              this.doRelativeToRegion(t, e, function (t, e, r) {
                return t.setTile(e, r, n)
              }),
                this.setDirty(t - 1, e - 1, 3, 3)
            }
            ,
            t.prototype.setDirty = function (t, e, n, r) {
              for (var i = 0; i < r; i++)
                for (var o = 0; o < n; o++)
                  this.doRelativeToRegion(o + t, i + e, function (t, e, n) {
                    return t.setDirty(e, n)
                  })
            }
            ,
            t.prototype.isCollision = function (t, e, n) {
              var r = this.getTile(e, n);
              if (!a.canWalk(r))
                return !0;
              if (!t.collider)
                return !1;
              var i = !1;
              return this.forEachEntity(function (r) {
                return r !== t && r.canCollideWith && r.collider && o.collidersIntersect(e, n, t.collider, r.x, r.y, r.collider) ? (i = !0,
                  !1) : void 0
              }),
                i
            }
            ,
            t.prototype.update = function (t) {
              var e = this;
              this.forEachRegion(function (n) {
                n.entities.forEach(function (n) {
                  if (n.update && n.update(t),
                    n.vx || n.vy)
                    if (n.canCollide) {
                      var r = n.x + n.vx * t
                        , i = n.y + n.vy * t;
                      e.isCollision(n, r, i) ? e.isCollision(n, n.x, i) ? e.isCollision(n, r, n.y) || (n.x = r) : n.y = i : (n.x = r,
                        n.y = i)
                    } else
                      n.x += n.vx * t,
                        n.y += n.vy * t;
                  if (n.set && n.set(),
                    n.says && (n.says.timer -= t,
                    n.says.timer < 0 && (n.says.timer = 0,
                      n.says = null )),
                      n.coverBounds) {
                    var o = n.coverLifting || 0;
                    n.coverLifted && o < 1 ? n.coverLifting = Math.min(o + 2 * t, 1) : !n.coverLifted && o > 0 && (n.coverLifting = Math.max(o - 2 * t, 0))
                  }
                })
              })
            }
            ,
            t.prototype.draw = function (t, e) {
              var n = this;
              this.forEachRegion(function (r) {
                return r.drawTiles(t, e, n)
              }),
                this.forEachRegion(function (n) {
                  return n.drawEntities(t, e)
                })
            }
            ,
            t.prototype.forEachRegion = function (t) {
              for (var e = this.minRegionY; e <= this.maxRegionY; e++)
                for (var n = this.minRegionX; n <= this.maxRegionX; n++) {
                  var r = this.getRegion(n, e);
                  if (r && t(r) === !1)
                    return
                }
            }
            ,
            t.prototype.forEachEntity = function (t) {
              this.forEachRegion(function (e) {
                return e.entities.forEach(t)
              })
            }
            ,
            t
        }();
        return e.Map = s,
          n.exports
      }),
      System.registerDynamic("5f", ["21", "22"], !0, function (t, e, n) {
        "use strict";
        var r = t("21")
          , i = t("22")
          , o = function () {
          function t() {
            this.x = 0,
              this.y = 0,
              this.w = 100,
              this.h = 100
          }

          return t.prototype.update = function (t, e) {
            var n = this.w
              , o = this.h
              , a = e.width * r.tileWidth
              , s = e.height * r.tileHeight
              , u = a - n
              , l = s - o
              , c = t.x * r.tileWidth
              , f = t.y * r.tileHeight
              , p = Math.floor(.3 * n)
              , h = Math.floor(.3 * o)
              , d = i.clamp(c - (p + (n - p) / 2), 0, u)
              , v = i.clamp(c - (n - p) / 2, 0, u)
              , m = i.clamp(f - (h + (o - h) / 2), 0, l)
              , g = i.clamp(f - (o - h) / 2, 0, l);
            this.x = Math.floor(i.clamp(this.x, d, v)),
              this.y = Math.floor(i.clamp(this.y, m, g))
          }
            ,
            t.prototype.isVisible = function (t) {
              var e = t.bounds;
              if (!e)
                return !0;
              var n = e.x + t.x * r.tileWidth
                , i = e.y + t.y * r.tileHeight;
              return this.isRectVisible(n, i, e.w, e.h)
            }
            ,
            t.prototype.isRectVisible = function (t, e, n, r) {
              return this.x <= t + n && this.x + this.w >= t && this.y <= e + r && this.y + this.h >= e
            }
            ,
            t.prototype.screenToCamera = function (t) {
              return t ? {
                x: Math.round(t.x + this.x),
                y: Math.round(t.y + this.y)
              } : null
            }
            ,
            t.prototype.screenToWorld = function (t) {
              return t ? {
                x: (t.x + this.x) / r.tileWidth,
                y: (t.y + this.y) / r.tileHeight
              } : null
            }
            ,
            t.prototype.worldToScreen = function (t) {
              return t ? {
                x: Math.round(t.x * r.tileWidth - this.x),
                y: Math.round(t.y * r.tileHeight - this.y)
              } : null
            }
            ,
            t
        }();
        return e.Camera = o,
          n.exports
      }),
      System.registerDynamic("60", ["28", "36", "24"], !0, function (t, e, n) {
        "use strict";
        function r(t) {
          for (var e = t % d, n = 24 * e / d, r = 1; r < h.length; r++)
            if (h[r] >= n) {
              var i = h[r - 1]
                , o = h[r]
                , u = p[r - 1]
                , l = p[r];
              return a.default.lerp(u, l, (n - i) / (o - i))
            }
          return s.WHITE
        }

        function i(t) {
          var e = t % d
            , n = 1440
            , r = e * n / d
            , i = r % 60
            , a = Math.floor(r / 60);
          return o.padStart(a.toFixed(), 2, "0") + ":" + o.padStart(i.toFixed(), 2, "0")
        }

        var o = t("28")
          , a = t("36")
          , s = t("24")
          , u = "ffffff"
          , l = "d4ab64"
          , c = "3e489e"
          , f = "cfcc7e"
          , p = [c, c, f, u, u, l, c, c].map(a.default.parse)
          , h = [0, 4, 4.75, 5.5, 19.5, 20.25, 21, 24]
          , d = 288e4;
        return e.getLight = r,
          e.getTime = i,
          n.exports
      }),
      System.registerDynamic("61", ["59", "58", "57"], !0, function (t, e, n) {
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
          var o = t.createBuffer()
            , a = new r(t, n, o, 0, i);
          return a.update(e),
            a
        }

        var u = t("59")
          , l = t("58")
          , c = t("57")
          , f = ["uint8", "uint8_clamped", "uint16", "uint32", "int8", "int16", "int32", "float32"]
          , p = r.prototype;
        return p.bind = function () {
          this.gl.bindBuffer(this.type, this.handle)
        }
          ,
          p.unbind = function () {
            this.gl.bindBuffer(this.type, null)
          }
          ,
          p.dispose = function () {
            this.gl.deleteBuffer(this.handle)
          }
          ,
          p.update = function (t, e) {
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
                var s = u.malloc(t.size, n)
                  , p = c(s, t.shape);
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
          }
          ,
          n.exports = s,
          n.exports
      }),
      System.registerDynamic("62", ["61"], !0, function (t, e, n) {
        return n.exports = t("61"),
          n.exports
      }),
      System.registerDynamic("63", ["64"], !0, function (t, e, n) {
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

        var a = t("64");
        return r.prototype.bind = function (t) {
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
        }
          ,
          i.prototype.bind = function () {
            this._ext.bindVertexArrayOES(this.handle);
            for (var t = 0; t < this._attribs.length; ++t)
              this._attribs[t].bind(this.gl)
          }
          ,
          i.prototype.unbind = function () {
            this._ext.bindVertexArrayOES(null)
          }
          ,
          i.prototype.dispose = function () {
            this._ext.deleteVertexArrayOES(this.handle)
          }
          ,
          i.prototype.update = function (t, e, n) {
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
          }
          ,
          i.prototype.draw = function (t, e, n) {
            n = n || 0;
            var r = this.gl;
            this._useElements ? r.drawElements(t, e, this._elementsType, n) : r.drawArrays(t, n, e)
          }
          ,
          n.exports = o,
          n.exports
      }),
      System.registerDynamic("64", [], !0, function (t, e, n) {
        "use strict";
        function r(t, e, n) {
          e ? e.bind() : t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null);
          var r = 0 | t.getParameter(t.MAX_VERTEX_ATTRIBS);
          if (n) {
            if (n.length > r)
              throw new Error("gl-vao: Too many vertex attributes");
            for (var i = 0; i < n.length; ++i) {
              var o = n[i];
              if (o.buffer) {
                var a = o.buffer
                  , s = o.size || 4
                  , u = o.type || t.FLOAT
                  , l = !!o.normalized
                  , c = o.stride || 0
                  , f = o.offset || 0;
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
      }),
      System.registerDynamic("65", ["64"], !0, function (t, e, n) {
        "use strict";
        function r(t) {
          this.gl = t,
            this._elements = null ,
            this._attributes = null ,
            this._elementsType = t.UNSIGNED_SHORT
        }

        function i(t) {
          return new r(t)
        }

        var o = t("64");
        return r.prototype.bind = function () {
          o(this.gl, this._elements, this._attributes)
        }
          ,
          r.prototype.update = function (t, e, n) {
            this._elements = e,
              this._attributes = t,
              this._elementsType = n || this.gl.UNSIGNED_SHORT
          }
          ,
          r.prototype.dispose = function () {
          }
          ,
          r.prototype.unbind = function () {
          }
          ,
          r.prototype.draw = function (t, e, n) {
            n = n || 0;
            var r = this.gl;
            this._elements ? r.drawElements(t, e, this._elementsType, n) : r.drawArrays(t, n, e)
          }
          ,
          n.exports = i,
          n.exports
      }),
      System.registerDynamic("66", ["63", "65"], !0, function (t, e, n) {
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

        var o = t("63")
          , a = t("65");
        return n.exports = i,
          n.exports
      }),
      System.registerDynamic("67", ["66"], !0, function (t, e, n) {
        return n.exports = t("66"),
          n.exports
      }),
      System.registerDynamic("68", ["62", "6a", "67", "22", "24", "69"], !0, function (t, e, n) {
        "use strict";
        function r(t, e, n, r, i, o, a, s) {
          if (s) {
            var u = t;
            t = s[0] * u + s[2] * e + s[4],
              e = s[1] * u + s[3] * e + s[5]
          }
          return o[a++] = t,
            o[a++] = e,
            o[a++] = n,
            o[a++] = r,
            o[a++] = i,
            a
        }

        var i = t("62")
          , o = t("6a")
          , a = t("67")
          , s = t("22")
          , u = t("24")
          , l = t("69")
          , c = 1e4
          , f = 16
          , p = 4
          , h = 5
          , d = function () {
          function t(t) {
            this.gl = t,
              this.tris = 0,
              this.globalAlpha = 1,
              this.count = 0,
              this.capacity = 0,
              this.index = 0,
              this.ensureCapacity(f);
            var e = s.createCanvas(1, 1)
              , n = e.getContext("2d");
            n.fillStyle = "white",
              n.fillRect(0, 0, 1, 1),
              this.defaultTexture = o(t, e)
          }

          return t.prototype.dispose = function () {
            this.vertexBuffer && (this.vertexBuffer.dispose(),
              this.vertexBuffer = null ),
            this.indexBuffer && (this.indexBuffer.dispose(),
              this.indexBuffer = null ),
            this.vao && (this.vao.dispose(),
              this.vao = null )
          }
            ,
            t.prototype.begin = function (t) {
              t.bind(),
                this.tris = 0,
                this.texture = this.defaultTexture,
                this.vao.bind()
            }
            ,
            t.prototype.drawImage = function (t, e, n, i, o, a, s, l, c, f) {
              t = t || this.defaultTexture,
              this.texture !== t && this.flush(),
              this.ensureCapacity(this.count + 1) || (this.flush(),
                this.ensureCapacity(this.count + 1)),
                this.texture = t,
              e || (e = u.WHITE);
              var p = e.toFloat(this.globalAlpha)
                , h = t.shape
                , d = h[0]
                , v = h[1]
                , m = n / d
                , g = i / v
                , y = (n + o) / d
                , b = (i + a) / v
                , _ = s
                , w = l
                , x = s + c
                , E = l + f
                , $ = this.vertices
                , S = this.transform
                , T = this.index;
              T = r(_, w, m, g, p, $, T, S),
                T = r(x, w, y, g, p, $, T, S),
                T = r(x, E, y, b, p, $, T, S),
                T = r(_, E, m, b, p, $, T, S),
                this.index = T,
                this.count++,
                this.tris += 2
            }
            ,
            t.prototype.drawRect = function (t, e, n, r, i) {
              if (r && i) {
                var o = this.rectSprite;
                o ? this.drawImage(o.tex, t, o.x, o.y, o.w, o.h, e, n, r, i) : this.drawImage(null, t, 0, 0, 1, 1, e, n, r, i)
              }
            }
            ,
            t.prototype.drawSprite = function (t, e, n, r) {
              t && t.w && t.h && t.tex && this.drawImage(t.tex, e, t.x, t.y, t.w, t.h, n + t.ox, r + t.oy, t.w, t.h)
            }
            ,
            t.prototype.end = function () {
              this.flush(),
                this.vao.unbind()
            }
            ,
            t.prototype.ensureCapacity = function (t) {
              if (this.capacity < t) {
                var e = this.capacity ? 2 * this.capacity : f;
                if (e > c)
                  return !1;
                var n = new Float32Array(e * p * h);
                this.vertices && n.set(this.vertices),
                  this.capacity = e,
                  this.vertices = n,
                  this.indices = l.createIndices(this.capacity),
                  this.dispose();
                var r = this.gl.STATIC_DRAW
                  , o = 4 * h;
                this.vertexBuffer = i(this.gl, this.vertices, this.gl.ARRAY_BUFFER, r),
                  this.indexBuffer = i(this.gl, this.indices, this.gl.ELEMENT_ARRAY_BUFFER, this.gl.STATIC_DRAW),
                  this.vao = a(this.gl, [{
                    name: "position",
                    buffer: this.vertexBuffer,
                    size: 2,
                    stride: o
                  }, {
                    name: "texcoord0",
                    buffer: this.vertexBuffer,
                    size: 2,
                    offset: 8,
                    stride: o
                  }, {
                    name: "color",
                    buffer: this.vertexBuffer,
                    size: 4,
                    stride: o,
                    offset: 16,
                    type: this.gl.UNSIGNED_BYTE,
                    normalized: !0
                  }], this.indexBuffer)
              }
              return !0
            }
            ,
            t.prototype.flush = function () {
              if (this.index && this.texture) {
                var t = this.vertices.subarray(0, this.index);
                this.vertexBuffer.update(t, 0),
                this.texture && this.texture.bind(0);
                var e = this.index / (4 * h);
                e && this.vao.draw(this.gl.TRIANGLES, 6 * e, 0),
                  this.texture = null ,
                  this.count = 0,
                  this.index = 0
              }
            }
            ,
            t
        }();
        return e.SpriteBatch = d,
          n.exports
      }),
      System.registerDynamic("6b", [], !0, function (t, e, n) {
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
                var l = Math.min(e.w, o - u)
                  , c = Math.min(e.h, a - s);
                t.drawImage(e.tex, n, e.x, e.y, l, c, r + u, i + s, l, c)
              }
        }

        var o = function () {
          function t(t, e, n, i, o) {
            if (this.t = e,
                this.l = n,
                this.b = i,
                this.r = o,
                !t.tex)
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

          return t.prototype.draw = function (t, e, n, r, o, a) {
            var s = n + o - this.r
              , u = r + a - this.b
              , l = o - (this.l + this.r)
              , c = a - (this.t + this.b);
            t.drawSprite(this.topLeft, e, n, r),
              t.drawSprite(this.topRight, e, s, r),
              t.drawSprite(this.bottomLeft, e, n, u),
              t.drawSprite(this.bottomRight, e, s, u),
              i(t, this.top, e, n + this.l, r, l, this.t),
              i(t, this.left, e, n, r + this.t, this.l, c),
              i(t, this.bg, e, n + this.l, r + this.t, l, c),
              i(t, this.right, e, n + o - this.r, r + this.t, this.r, c),
              i(t, this.bottom, e, n + this.l, r + a - this.b, l, this.b)
          }
            ,
            t
        }();
        return e.SpriteButton = o,
          n.exports
      }),
      System.registerDynamic("6c", ["22"], !0, function (t, e, n) {
        "use strict";
        var r = t("22")
          , i = " ".charCodeAt(0)
          , o = "\t".charCodeAt(0)
          , a = "?".charCodeAt(0)
          , s = "\n".charCodeAt(0)
          , u = "\r".charCodeAt(0)
          , l = function () {
          function t(t) {
            var e = this;
            this.lineSpacing = 2,
              this.characterSpacing = 1,
              this.chars = [],
              this.emotes = [],
              this.emotePictures = [],
              t.forEach(function (t) {
                t && (e.chars[t.code] = t.sprite)
              });
            var n = this.chars[0]
              , r = 3;
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

          return t.prototype.getChar = function (t) {
            return this.chars[t] || this.chars[a]
          }
            ,
            t.prototype.parseEmotes = function (t) {
              return this.emotes.reduce(function (t, e) {
                var n = e.regex
                  , r = e.char;
                return t.replace(n, r)
              }, t)
            }
            ,
            t.prototype.forEachChar = function (t, e) {
              t = this.parseEmotes(t);
              for (var n = 0; n < t.length; n++) {
                var i = n
                  , o = t.charCodeAt(n);
                r.isSurrogate(o) && n + 1 < t.length && (o = r.fromSurrogate(o, t.charCodeAt(n + 1)),
                  n++),
                o !== u && e(o, i)
              }
            }
            ,
            t.prototype.addEmoticon = function (t, e, n) {
              this.emotes.push({
                regex: new RegExp(t, "g"),
                char: e
              });
              var i = e.charCodeAt(0);
              r.isSurrogate(i) && e.length > 1 && (i = r.fromSurrogate(i, e.charCodeAt(1))),
              n && (this.emotePictures[i] = n)
            }
            ,
            t.prototype.measureChar = function (t) {
              return (this.emotePictures[t] || this.getChar(t)).w
            }
            ,
            t.prototype.drawChar = function (t, e, n, r, i) {
              var o = this.emotePictures[e];
              if (o)
                return t.drawSprite(o, null, r, i - 1),
                  o.w;
              var a = this.getChar(e);
              return t.drawSprite(a, n, r, i),
                a.w
            }
            ,
            t.prototype.measureText = function (t) {
              var e = this
                , n = 0
                , r = 1
                , i = 0;
              return this.forEachChar(t, function (t) {
                t === s ? (n = Math.max(n, i),
                  i = 0,
                  r++) : (i && (i += e.characterSpacing),
                  i += e.measureChar(t))
              }),
              {
                w: Math.max(n, i),
                h: r * this.height + (r - 1) * this.lineSpacing
              }
            }
            ,
            t.prototype.drawText = function (t, e, n, r, i) {
              var o = this;
              r = Math.round(r),
                i = Math.round(i);
              var a = r;
              this.forEachChar(e, function (e, u) {
                e === s ? (a = r,
                  i += o.height + o.lineSpacing) : a += o.drawChar(t, e, n, a, i) + o.characterSpacing
              })
            }
            ,
            t.prototype.drawTextJumping = function (t, e, n, r, i, o) {
              var a = this;
              r = Math.round(r),
                i = Math.round(i);
              var u = r;
              this.forEachChar(e, function (e, l) {
                e === s ? (u = r,
                  i += a.height + a.lineSpacing) : u += a.drawChar(t, e, n, u, o && o.indexOf(l) !== -1 ? i - 1 : i) + a.characterSpacing
              })
            }
            ,
            t.prototype.drawTextAligned = function (t, e, n, r, i, o) {
              void 0 === i && (i = "left"),
              void 0 === o && (o = "top");
              var a = r.x
                , s = r.y;
              if ("left" !== i || "top" !== o) {
                var u = this.measureText(e);
                "left" !== i && (a += "center" === i ? (r.w - u.w) / 2 : r.w - u.w),
                "top" !== o && (s += "middle" === o ? (r.h - u.h) / 2 : r.h - u.h)
              }
              this.drawText(t, e, n, a, s)
            }
            ,
            t
        }();
        return e.SpriteFont = l,
          n.exports
      }),
      System.registerDynamic("6d", [], !0, function (t, e, n) {
        "use strict";
        function r(t) {
          for (var e = new Array(t), n = 0; n < t; ++n)
            e[n] = n;
          return e
        }

        return n.exports = r,
          n.exports
      }),
      System.registerDynamic("6e", ["6d"], !0, function (t, e, n) {
        return n.exports = t("6d"),
          n.exports
      }),
      System.registerDynamic("6f", ["1a"], !0, function (t, e, n) {
        return function (t) {
          function e(t) {
            return !!t.constructor && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t)
          }

          function r(t) {
            return "function" == typeof t.readFloatLE && "function" == typeof t.slice && e(t.slice(0, 0))
          }

          n.exports = function (t) {
            return null != t && (e(t) || r(t) || !!t._isBuffer)
          }
        }(t("1a").Buffer),
          n.exports
      }),
      System.registerDynamic("70", ["6f"], !0, function (t, e, n) {
        return n.exports = t("6f"),
          n.exports
      }),
      System.registerDynamic("71", ["6e", "70"], !0, function (t, e, n) {
        function r(t, e) {
          return t[0] - e[0]
        }

        function i() {
          var t, e = this.stride, n = new Array(e.length);
          for (t = 0; t < n.length; ++t)
            n[t] = [Math.abs(e[t]), t];
          n.sort(r);
          var i = new Array(n.length);
          for (t = 0; t < i.length; ++t)
            i[t] = n[t][1];
          return i
        }

        function o(t, e) {
          var n = ["View", e, "d", t].join("");
          e < 0 && (n = "View_Nil" + t);
          var r = "generic" === t;
          if (e === -1) {
            var o = "function " + n + "(a){this.data=a;};var proto=" + n + ".prototype;proto.dtype='" + t + "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " + n + "(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_" + n + "(a){return new " + n + "(a);}"
              , a = new Function(o);
            return a()
          }
          if (0 === e) {
            var o = "function " + n + "(a,d) {this.data = a;this.offset = d};var proto=" + n + ".prototype;proto.dtype='" + t + "';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function " + n + "_copy() {return new " + n + "(this.data,this.offset)};proto.pick=function " + n + "_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function " + n + "_get(){return " + (r ? "this.data.get(this.offset)" : "this.data[this.offset]") + "};proto.set=function " + n + "_set(v){return " + (r ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v") + "};return function construct_" + n + "(a,b,c,d){return new " + n + "(a,d)}"
              , a = new Function("TrivialArray", o);
            return a(f[t][0])
          }
          var o = ["'use strict'"]
            , s = u(e)
            , l = s.map(function (t) {
            return "i" + t
          })
            , c = "this.offset+" + s.map(function (t) {
              return "this.stride[" + t + "]*i" + t
            }).join("+")
            , p = s.map(function (t) {
            return "b" + t
          }).join(",")
            , h = s.map(function (t) {
            return "c" + t
          }).join(",");
          o.push("function " + n + "(a," + p + "," + h + ",d){this.data=a", "this.shape=[" + p + "]", "this.stride=[" + h + "]", "this.offset=d|0}", "var proto=" + n + ".prototype", "proto.dtype='" + t + "'", "proto.dimension=" + e),
            o.push("Object.defineProperty(proto,'size',{get:function " + n + "_size(){return " + s.map(function (t) {
                return "this.shape[" + t + "]"
              }).join("*"), "}})"),
            1 === e ? o.push("proto.order=[0]") : (o.push("Object.defineProperty(proto,'order',{get:"),
              e < 4 ? (o.push("function " + n + "_order(){"),
                2 === e ? o.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})") : 3 === e && o.push("var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})")) : o.push("ORDER})")),
            o.push("proto.set=function " + n + "_set(" + l.join(",") + ",v){"),
            r ? o.push("return this.data.set(" + c + ",v)}") : o.push("return this.data[" + c + "]=v}"),
            o.push("proto.get=function " + n + "_get(" + l.join(",") + "){"),
            r ? o.push("return this.data.get(" + c + ")}") : o.push("return this.data[" + c + "]}"),
            o.push("proto.index=function " + n + "_index(", l.join(), "){return " + c + "}"),
            o.push("proto.hi=function " + n + "_hi(" + l.join(",") + "){return new " + n + "(this.data," + s.map(function (t) {
                return ["(typeof i", t, "!=='number'||i", t, "<0)?this.shape[", t, "]:i", t, "|0"].join("")
              }).join(",") + "," + s.map(function (t) {
                return "this.stride[" + t + "]"
              }).join(",") + ",this.offset)}");
          var d = s.map(function (t) {
            return "a" + t + "=this.shape[" + t + "]"
          })
            , v = s.map(function (t) {
            return "c" + t + "=this.stride[" + t + "]"
          });
          o.push("proto.lo=function " + n + "_lo(" + l.join(",") + "){var b=this.offset,d=0," + d.join(",") + "," + v.join(","));
          for (var m = 0; m < e; ++m)
            o.push("if(typeof i" + m + "==='number'&&i" + m + ">=0){d=i" + m + "|0;b+=c" + m + "*d;a" + m + "-=d}");
          o.push("return new " + n + "(this.data," + s.map(function (t) {
              return "a" + t
            }).join(",") + "," + s.map(function (t) {
              return "c" + t
            }).join(",") + ",b)}"),
            o.push("proto.step=function " + n + "_step(" + l.join(",") + "){var " + s.map(function (t) {
                return "a" + t + "=this.shape[" + t + "]"
              }).join(",") + "," + s.map(function (t) {
                return "b" + t + "=this.stride[" + t + "]"
              }).join(",") + ",c=this.offset,d=0,ceil=Math.ceil");
          for (var m = 0; m < e; ++m)
            o.push("if(typeof i" + m + "==='number'){d=i" + m + "|0;if(d<0){c+=b" + m + "*(a" + m + "-1);a" + m + "=ceil(-a" + m + "/d)}else{a" + m + "=ceil(a" + m + "/d)}b" + m + "*=d}");
          o.push("return new " + n + "(this.data," + s.map(function (t) {
              return "a" + t
            }).join(",") + "," + s.map(function (t) {
              return "b" + t
            }).join(",") + ",c)}");
          for (var g = new Array(e), y = new Array(e), m = 0; m < e; ++m)
            g[m] = "a[i" + m + "]",
              y[m] = "b[i" + m + "]";
          o.push("proto.transpose=function " + n + "_transpose(" + l + "){" + l.map(function (t, e) {
              return t + "=(" + t + "===undefined?" + e + ":" + t + "|0)"
            }).join(";"), "var a=this.shape,b=this.stride;return new " + n + "(this.data," + g.join(",") + "," + y.join(",") + ",this.offset)}"),
            o.push("proto.pick=function " + n + "_pick(" + l + "){var a=[],b=[],c=this.offset");
          for (var m = 0; m < e; ++m)
            o.push("if(typeof i" + m + "==='number'&&i" + m + ">=0){c=(c+this.stride[" + m + "]*i" + m + ")|0}else{a.push(this.shape[" + m + "]);b.push(this.stride[" + m + "])}");
          o.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"),
            o.push("return function construct_" + n + "(data,shape,stride,offset){return new " + n + "(data," + s.map(function (t) {
                return "shape[" + t + "]"
              }).join(",") + "," + s.map(function (t) {
                return "stride[" + t + "]"
              }).join(",") + ",offset)}");
          var a = new Function("CTOR_LIST", "ORDER", o.join("\n"));
          return a(f[t], i)
        }

        function a(t) {
          if (l(t))
            return "buffer";
          if (c)
            switch (Object.prototype.toString.call(t)) {
              case "[object Float64Array]":
                return "float64";
              case "[object Float32Array]":
                return "float32";
              case "[object Int8Array]":
                return "int8";
              case "[object Int16Array]":
                return "int16";
              case "[object Int32Array]":
                return "int32";
              case "[object Uint8Array]":
                return "uint8";
              case "[object Uint16Array]":
                return "uint16";
              case "[object Uint32Array]":
                return "uint32";
              case "[object Uint8ClampedArray]":
                return "uint8_clamped"
            }
          return Array.isArray(t) ? "array" : "generic"
        }

        function s(t, e, n, r) {
          if (void 0 === t) {
            var i = f.array[0];
            return i([])
          }
          "number" == typeof t && (t = [t]),
          void 0 === e && (e = [t.length]);
          var s = e.length;
          if (void 0 === n) {
            n = new Array(s);
            for (var u = s - 1, l = 1; u >= 0; --u)
              n[u] = l,
                l *= e[u]
          }
          if (void 0 === r) {
            r = 0;
            for (var u = 0; u < s; ++u)
              n[u] < 0 && (r -= (e[u] - 1) * n[u])
          }
          for (var c = a(t), p = f[c]; p.length <= s + 1;)
            p.push(o(c, p.length - 1));
          var i = p[s + 1];
          return i(t, e, n, r)
        }

        var u = t("6e")
          , l = t("70")
          , c = "undefined" != typeof Float64Array
          , f = {
          float32: [],
          float64: [],
          int8: [],
          int16: [],
          int32: [],
          uint8: [],
          uint16: [],
          uint32: [],
          array: [],
          uint8_clamped: [],
          buffer: [],
          generic: []
        };
        return n.exports = s,
          n.exports
      }),
      System.registerDynamic("57", ["71"], !0, function (t, e, n) {
        return n.exports = t("71"),
          n.exports
      }),
      System.registerDynamic("72", [], !0, function (t, e, n) {
        "use strict";
        function r(t, e) {
          for (var n = 1, r = t.length, i = t[0], o = t[0], a = 1; a < r; ++a)
            if (o = i,
                i = t[a],
                e(i, o)) {
              if (a === n) {
                n++;
                continue
              }
              t[n++] = i
            }
          return t.length = n,
            t
        }

        function i(t) {
          for (var e = 1, n = t.length, r = t[0], i = t[0], o = 1; o < n; ++o,
            i = r)
            if (i = r,
                r = t[o],
              r !== i) {
              if (o === e) {
                e++;
                continue
              }
              t[e++] = r
            }
          return t.length = e,
            t
        }

        function o(t, e, n) {
          return 0 === t.length ? t : e ? (n || t.sort(e),
            r(t, e)) : (n || t.sort(),
            i(t))
        }

        return n.exports = o,
          n.exports
      }),
      System.registerDynamic("73", ["72"], !0, function (t, e, n) {
        return n.exports = t("72"),
          n.exports
      }),
      System.registerDynamic("74", ["73", "75"], !0, function (t, e, n) {
        return function (e) {
          "use strict";
          function r(t, e, n) {
            var r, i, o = t.length, a = e.arrayArgs.length, s = e.indexArgs.length > 0, u = [], l = [], c = 0, f = 0;
            for (r = 0; r < o; ++r)
              l.push(["i", r, "=0"].join(""));
            for (i = 0; i < a; ++i)
              for (r = 0; r < o; ++r)
                f = c,
                  c = t[r],
                  0 === r ? l.push(["d", i, "s", r, "=t", i, "p", c].join("")) : l.push(["d", i, "s", r, "=(t", i, "p", c, "-s", f, "*t", i, "p", f, ")"].join(""));
            for (u.push("var " + l.join(",")),
                   r = o - 1; r >= 0; --r)
              c = t[r],
                u.push(["for(i", r, "=0;i", r, "<s", c, ";++i", r, "){"].join(""));
            for (u.push(n),
                   r = 0; r < o; ++r) {
              for (f = c,
                     c = t[r],
                     i = 0; i < a; ++i)
                u.push(["p", i, "+=d", i, "s", r].join(""));
              s && (r > 0 && u.push(["index[", f, "]-=s", f].join("")),
                u.push(["++index[", c, "]"].join(""))),
                u.push("}")
            }
            return u.join("\n")
          }

          function i(t, e, n, i) {
            for (var o = e.length, a = n.arrayArgs.length, s = n.blockSize, u = n.indexArgs.length > 0, l = [], c = 0; c < a; ++c)
              l.push(["var offset", c, "=p", c].join(""));
            for (var c = t; c < o; ++c)
              l.push(["for(var j" + c + "=SS[", e[c], "]|0;j", c, ">0;){"].join("")),
                l.push(["if(j", c, "<", s, "){"].join("")),
                l.push(["s", e[c], "=j", c].join("")),
                l.push(["j", c, "=0"].join("")),
                l.push(["}else{s", e[c], "=", s].join("")),
                l.push(["j", c, "-=", s, "}"].join("")),
              u && l.push(["index[", e[c], "]=j", c].join(""));
            for (var c = 0; c < a; ++c) {
              for (var f = ["offset" + c], p = t; p < o; ++p)
                f.push(["j", p, "*t", c, "p", e[p]].join(""));
              l.push(["p", c, "=(", f.join("+"), ")"].join(""))
            }
            l.push(r(e, n, i));
            for (var c = t; c < o; ++c)
              l.push("}");
            return l.join("\n")
          }

          function o(t) {
            for (var e = 0, n = t[0].length; e < n;) {
              for (var r = 1; r < t.length; ++r)
                if (t[r][e] !== t[0][e])
                  return e;
              ++e
            }
            return e
          }

          function a(t, e, n) {
            for (var r = t.body, i = [], o = [], a = 0; a < t.args.length; ++a) {
              var s = t.args[a];
              if (!(s.count <= 0)) {
                var u = new RegExp(s.name, "g")
                  , l = ""
                  , c = e.arrayArgs.indexOf(a);
                switch (e.argTypes[a]) {
                  case "offset":
                    var f = e.offsetArgIndex.indexOf(a)
                      , p = e.offsetArgs[f];
                    c = p.array,
                      l = "+q" + f;
                  case "array":
                    l = "p" + c + l;
                    var h = "l" + a
                      , d = "a" + c;
                    if (0 === e.arrayBlockIndices[c])
                      1 === s.count ? "generic" === n[c] ? s.lvalue ? (i.push(["var ", h, "=", d, ".get(", l, ")"].join("")),
                        r = r.replace(u, h),
                        o.push([d, ".set(", l, ",", h, ")"].join(""))) : r = r.replace(u, [d, ".get(", l, ")"].join("")) : r = r.replace(u, [d, "[", l, "]"].join("")) : "generic" === n[c] ? (i.push(["var ", h, "=", d, ".get(", l, ")"].join("")),
                        r = r.replace(u, h),
                      s.lvalue && o.push([d, ".set(", l, ",", h, ")"].join(""))) : (i.push(["var ", h, "=", d, "[", l, "]"].join("")),
                        r = r.replace(u, h),
                      s.lvalue && o.push([d, "[", l, "]=", h].join("")));
                    else {
                      for (var v = [s.name], m = [l], g = 0; g < Math.abs(e.arrayBlockIndices[c]); g++)
                        v.push("\\s*\\[([^\\]]+)\\]"),
                          m.push("$" + (g + 1) + "*t" + c + "b" + g);
                      if (u = new RegExp(v.join(""), "g"),
                          l = m.join("+"),
                        "generic" === n[c])
                        throw new Error("cwise: Generic arrays not supported in combination with blocks!");
                      r = r.replace(u, [d, "[", l, "]"].join(""))
                    }
                    break;
                  case "scalar":
                    r = r.replace(u, "Y" + e.scalarArgs.indexOf(a));
                    break;
                  case "index":
                    r = r.replace(u, "index");
                    break;
                  case "shape":
                    r = r.replace(u, "shape")
                }
              }
            }
            return [i.join("\n"), r, o.join("\n")].join("\n").trim()
          }

          function s(t) {
            for (var e = new Array(t.length), n = !0, r = 0; r < t.length; ++r) {
              var i = t[r]
                , o = i.match(/\d+/);
              o = o ? o[0] : "",
                0 === i.charAt(0) ? e[r] = "u" + i.charAt(1) + o : e[r] = i.charAt(0) + o,
              r > 0 && (n = n && e[r] === e[r - 1])
            }
            return n ? e[0] : e.join("")
          }

          function u(t, e) {
            for (var n = e[1].length - Math.abs(t.arrayBlockIndices[0]) | 0, u = new Array(t.arrayArgs.length), c = new Array(t.arrayArgs.length), f = 0; f < t.arrayArgs.length; ++f)
              c[f] = e[2 * f],
                u[f] = e[2 * f + 1];
            for (var p = [], h = [], d = [], v = [], m = [], f = 0; f < t.arrayArgs.length; ++f) {
              t.arrayBlockIndices[f] < 0 ? (d.push(0),
                v.push(n),
                p.push(n),
                h.push(n + t.arrayBlockIndices[f])) : (d.push(t.arrayBlockIndices[f]),
                v.push(t.arrayBlockIndices[f] + n),
                p.push(0),
                h.push(t.arrayBlockIndices[f]));
              for (var g = [], y = 0; y < u[f].length; y++)
                d[f] <= u[f][y] && u[f][y] < v[f] && g.push(u[f][y] - d[f]);
              m.push(g)
            }
            for (var b = ["SS"], _ = ["'use strict'"], w = [], y = 0; y < n; ++y)
              w.push(["s", y, "=SS[", y, "]"].join(""));
            for (var f = 0; f < t.arrayArgs.length; ++f) {
              b.push("a" + f),
                b.push("t" + f),
                b.push("p" + f);
              for (var y = 0; y < n; ++y)
                w.push(["t", f, "p", y, "=t", f, "[", d[f] + y, "]"].join(""));
              for (var y = 0; y < Math.abs(t.arrayBlockIndices[f]); ++y)
                w.push(["t", f, "b", y, "=t", f, "[", p[f] + y, "]"].join(""))
            }
            for (var f = 0; f < t.scalarArgs.length; ++f)
              b.push("Y" + f);
            if (t.shapeArgs.length > 0 && w.push("shape=SS.slice(0)"),
              t.indexArgs.length > 0) {
              for (var x = new Array(n), f = 0; f < n; ++f)
                x[f] = "0";
              w.push(["index=[", x.join(","), "]"].join(""))
            }
            for (var f = 0; f < t.offsetArgs.length; ++f) {
              for (var E = t.offsetArgs[f], $ = [], y = 0; y < E.offset.length; ++y)
                0 !== E.offset[y] && (1 === E.offset[y] ? $.push(["t", E.array, "p", y].join("")) : $.push([E.offset[y], "*t", E.array, "p", y].join("")));
              0 === $.length ? w.push("q" + f + "=0") : w.push(["q", f, "=", $.join("+")].join(""))
            }
            var S = l([].concat(t.pre.thisVars).concat(t.body.thisVars).concat(t.post.thisVars));
            w = w.concat(S),
              _.push("var " + w.join(","));
            for (var f = 0; f < t.arrayArgs.length; ++f)
              _.push("p" + f + "|=0");
            t.pre.body.length > 3 && _.push(a(t.pre, t, c));
            var T = a(t.body, t, c)
              , k = o(m);
            k < n ? _.push(i(k, m[0], t, T)) : _.push(r(m[0], t, T)),
            t.post.body.length > 3 && _.push(a(t.post, t, c)),
            t.debug && console.log("-----Generated cwise routine for ", e, ":\n" + _.join("\n") + "\n----------");
            var M = [t.funcName || "unnamed", "_cwise_loop_", u[0].join("s"), "m", k, s(c)].join("")
              , A = new Function(["function ", M, "(", b.join(","), "){", _.join("\n"), "} return ", M].join(""));
            return A()
          }

          var l = t("73");
          n.exports = u
        }(t("75")),
          n.exports
      }),
      System.registerDynamic("76", ["74"], !0, function (t, e, n) {
        "use strict";
        function r(t) {
          var e = ["'use strict'", "var CACHED={}"]
            , n = []
            , r = t.funcName + "_cwise_thunk";
          e.push(["return function ", r, "(", t.shimArgs.join(","), "){"].join(""));
          for (var o = [], a = [], s = [["array", t.arrayArgs[0], ".shape.slice(", Math.max(0, t.arrayBlockIndices[0]), t.arrayBlockIndices[0] < 0 ? "," + t.arrayBlockIndices[0] + ")" : ")"].join("")], u = [], l = [], c = 0; c < t.arrayArgs.length; ++c) {
            var f = t.arrayArgs[c];
            n.push(["t", f, "=array", f, ".dtype,", "r", f, "=array", f, ".order"].join("")),
              o.push("t" + f),
              o.push("r" + f),
              a.push("t" + f),
              a.push("r" + f + ".join()"),
              s.push("array" + f + ".data"),
              s.push("array" + f + ".stride"),
              s.push("array" + f + ".offset|0"),
            c > 0 && (u.push("array" + t.arrayArgs[0] + ".shape.length===array" + f + ".shape.length+" + (Math.abs(t.arrayBlockIndices[0]) - Math.abs(t.arrayBlockIndices[c]))),
              l.push("array" + t.arrayArgs[0] + ".shape[shapeIndex+" + Math.max(0, t.arrayBlockIndices[0]) + "]===array" + f + ".shape[shapeIndex+" + Math.max(0, t.arrayBlockIndices[c]) + "]"))
          }
          t.arrayArgs.length > 1 && (e.push("if (!(" + u.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')"),
            e.push("for(var shapeIndex=array" + t.arrayArgs[0] + ".shape.length-" + Math.abs(t.arrayBlockIndices[0]) + "; shapeIndex-->0;) {"),
            e.push("if (!(" + l.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same shape!')"),
            e.push("}"));
          for (var c = 0; c < t.scalarArgs.length; ++c)
            s.push("scalar" + t.scalarArgs[c]);
          n.push(["type=[", a.join(","), "].join()"].join("")),
            n.push("proc=CACHED[type]"),
            e.push("var " + n.join(",")),
            e.push(["if(!proc){", "CACHED[type]=proc=compile([", o.join(","), "])}", "return proc(", s.join(","), ")}"].join("")),
          t.debug && console.log("-----Generated thunk:\n" + e.join("\n") + "\n----------");
          var p = new Function("compile", e.join("\n"));
          return p(i.bind(void 0, t))
        }

        var i = t("74");
        return n.exports = r,
          n.exports
      }),
      System.registerDynamic("77", ["76"], !0, function (t, e, n) {
        "use strict";
        function r() {
          this.argTypes = [],
            this.shimArgs = [],
            this.arrayArgs = [],
            this.arrayBlockIndices = [],
            this.scalarArgs = [],
            this.offsetArgs = [],
            this.offsetArgIndex = [],
            this.indexArgs = [],
            this.shapeArgs = [],
            this.funcName = "",
            this.pre = null ,
            this.body = null ,
            this.post = null ,
            this.debug = !1
        }

        function i(t) {
          var e = new r;
          e.pre = t.pre,
            e.body = t.body,
            e.post = t.post;
          var n = t.args.slice(0);
          e.argTypes = n;
          for (var i = 0; i < n.length; ++i) {
            var a = n[i];
            if ("array" === a || "object" == typeof a && a.blockIndices) {
              if (e.argTypes[i] = "array",
                  e.arrayArgs.push(i),
                  e.arrayBlockIndices.push(a.blockIndices ? a.blockIndices : 0),
                  e.shimArgs.push("array" + i),
                i < e.pre.args.length && e.pre.args[i].count > 0)
                throw new Error("cwise: pre() block may not reference array args");
              if (i < e.post.args.length && e.post.args[i].count > 0)
                throw new Error("cwise: post() block may not reference array args")
            } else if ("scalar" === a)
              e.scalarArgs.push(i),
                e.shimArgs.push("scalar" + i);
            else if ("index" === a) {
              if (e.indexArgs.push(i),
                i < e.pre.args.length && e.pre.args[i].count > 0)
                throw new Error("cwise: pre() block may not reference array index");
              if (i < e.body.args.length && e.body.args[i].lvalue)
                throw new Error("cwise: body() block may not write to array index");
              if (i < e.post.args.length && e.post.args[i].count > 0)
                throw new Error("cwise: post() block may not reference array index")
            } else if ("shape" === a) {
              if (e.shapeArgs.push(i),
                i < e.pre.args.length && e.pre.args[i].lvalue)
                throw new Error("cwise: pre() block may not write to array shape");
              if (i < e.body.args.length && e.body.args[i].lvalue)
                throw new Error("cwise: body() block may not write to array shape");
              if (i < e.post.args.length && e.post.args[i].lvalue)
                throw new Error("cwise: post() block may not write to array shape")
            } else {
              if ("object" != typeof a || !a.offset)
                throw new Error("cwise: Unknown argument type " + n[i]);
              e.argTypes[i] = "offset",
                e.offsetArgs.push({
                  array: a.array,
                  offset: a.offset
                }),
                e.offsetArgIndex.push(i)
            }
          }
          if (e.arrayArgs.length <= 0)
            throw new Error("cwise: No array arguments specified");
          if (e.pre.args.length > n.length)
            throw new Error("cwise: Too many arguments in pre() block");
          if (e.body.args.length > n.length)
            throw new Error("cwise: Too many arguments in body() block");
          if (e.post.args.length > n.length)
            throw new Error("cwise: Too many arguments in post() block");
          return e.debug = !!t.printCode || !!t.debug,
            e.funcName = t.funcName || "cwise",
            e.blockSize = t.blockSize || 64,
            o(e)
        }

        var o = t("76");
        return n.exports = i,
          n.exports
      }),
      System.registerDynamic("78", ["77"], !0, function (t, e, n) {
        return n.exports = t("77"),
          n.exports
      }),
      System.registerDynamic("79", ["78"], !0, function (t, e, n) {
        "use strict";
        function r(t) {
          if (!t)
            return s;
          for (var e = 0; e < t.args.length; ++e) {
            var n = t.args[e];
            0 === e ? t.args[e] = {
              name: n,
              lvalue: !0,
              rvalue: !!t.rvalue,
              count: t.count || 1
            } : t.args[e] = {
              name: n,
              lvalue: !1,
              rvalue: !0,
              count: 1
            }
          }
          return t.thisVars || (t.thisVars = []),
          t.localVars || (t.localVars = []),
            t
        }

        function i(t) {
          return a({
            args: t.args,
            pre: r(t.pre),
            body: r(t.body),
            post: r(t.proc),
            funcName: t.funcName
          })
        }

        function o(t) {
          for (var e = [], n = 0; n < t.args.length; ++n)
            e.push("a" + n);
          var r = new Function("P", ["return function ", t.funcName, "_ndarrayops(", e.join(","), ") {P(", e.join(","), ");return a0}"].join(""));
          return r(i(t))
        }

        var a = t("78")
          , s = {
          body: "",
          args: [],
          thisVars: [],
          localVars: []
        }
          , u = {
          add: "+",
          sub: "-",
          mul: "*",
          div: "/",
          mod: "%",
          band: "&",
          bor: "|",
          bxor: "^",
          lshift: "<<",
          rshift: ">>",
          rrshift: ">>>"
        };
        !function () {
          for (var t in u) {
            var n = u[t];
            e[t] = o({
              args: ["array", "array", "array"],
              body: {
                args: ["a", "b", "c"],
                body: "a=b" + n + "c"
              },
              funcName: t
            }),
              e[t + "eq"] = o({
                args: ["array", "array"],
                body: {
                  args: ["a", "b"],
                  body: "a" + n + "=b"
                },
                rvalue: !0,
                funcName: t + "eq"
              }),
              e[t + "s"] = o({
                args: ["array", "array", "scalar"],
                body: {
                  args: ["a", "b", "s"],
                  body: "a=b" + n + "s"
                },
                funcName: t + "s"
              }),
              e[t + "seq"] = o({
                args: ["array", "scalar"],
                body: {
                  args: ["a", "s"],
                  body: "a" + n + "=s"
                },
                rvalue: !0,
                funcName: t + "seq"
              })
          }
        }();
        var l = {
          not: "!",
          bnot: "~",
          neg: "-",
          recip: "1.0/"
        };
        !function () {
          for (var t in l) {
            var n = l[t];
            e[t] = o({
              args: ["array", "array"],
              body: {
                args: ["a", "b"],
                body: "a=" + n + "b"
              },
              funcName: t
            }),
              e[t + "eq"] = o({
                args: ["array"],
                body: {
                  args: ["a"],
                  body: "a=" + n + "a"
                },
                rvalue: !0,
                count: 2,
                funcName: t + "eq"
              })
          }
        }();
        var c = {
          and: "&&",
          or: "||",
          eq: "===",
          neq: "!==",
          lt: "<",
          gt: ">",
          leq: "<=",
          geq: ">="
        };
        !function () {
          for (var t in c) {
            var n = c[t];
            e[t] = o({
              args: ["array", "array", "array"],
              body: {
                args: ["a", "b", "c"],
                body: "a=b" + n + "c"
              },
              funcName: t
            }),
              e[t + "s"] = o({
                args: ["array", "array", "scalar"],
                body: {
                  args: ["a", "b", "s"],
                  body: "a=b" + n + "s"
                },
                funcName: t + "s"
              }),
              e[t + "eq"] = o({
                args: ["array", "array"],
                body: {
                  args: ["a", "b"],
                  body: "a=a" + n + "b"
                },
                rvalue: !0,
                count: 2,
                funcName: t + "eq"
              }),
              e[t + "seq"] = o({
                args: ["array", "scalar"],
                body: {
                  args: ["a", "s"],
                  body: "a=a" + n + "s"
                },
                rvalue: !0,
                count: 2,
                funcName: t + "seq"
              })
          }
        }();
        var f = ["abs", "acos", "asin", "atan", "ceil", "cos", "exp", "floor", "log", "round", "sin", "sqrt", "tan"];
        !function () {
          for (var t = 0; t < f.length; ++t) {
            var n = f[t];
            e[n] = o({
              args: ["array", "array"],
              pre: {
                args: [],
                body: "this_f=Math." + n,
                thisVars: ["this_f"]
              },
              body: {
                args: ["a", "b"],
                body: "a=this_f(b)",
                thisVars: ["this_f"]
              },
              funcName: n
            }),
              e[n + "eq"] = o({
                args: ["array"],
                pre: {
                  args: [],
                  body: "this_f=Math." + n,
                  thisVars: ["this_f"]
                },
                body: {
                  args: ["a"],
                  body: "a=this_f(a)",
                  thisVars: ["this_f"]
                },
                rvalue: !0,
                count: 2,
                funcName: n + "eq"
              })
          }
        }();
        var p = ["max", "min", "atan2", "pow"];
        !function () {
          for (var t = 0; t < p.length; ++t) {
            var n = p[t];
            e[n] = o({
              args: ["array", "array", "array"],
              pre: {
                args: [],
                body: "this_f=Math." + n,
                thisVars: ["this_f"]
              },
              body: {
                args: ["a", "b", "c"],
                body: "a=this_f(b,c)",
                thisVars: ["this_f"]
              },
              funcName: n
            }),
              e[n + "s"] = o({
                args: ["array", "array", "scalar"],
                pre: {
                  args: [],
                  body: "this_f=Math." + n,
                  thisVars: ["this_f"]
                },
                body: {
                  args: ["a", "b", "c"],
                  body: "a=this_f(b,c)",
                  thisVars: ["this_f"]
                },
                funcName: n + "s"
              }),
              e[n + "eq"] = o({
                args: ["array", "array"],
                pre: {
                  args: [],
                  body: "this_f=Math." + n,
                  thisVars: ["this_f"]
                },
                body: {
                  args: ["a", "b"],
                  body: "a=this_f(a,b)",
                  thisVars: ["this_f"]
                },
                rvalue: !0,
                count: 2,
                funcName: n + "eq"
              }),
              e[n + "seq"] = o({
                args: ["array", "scalar"],
                pre: {
                  args: [],
                  body: "this_f=Math." + n,
                  thisVars: ["this_f"]
                },
                body: {
                  args: ["a", "b"],
                  body: "a=this_f(a,b)",
                  thisVars: ["this_f"]
                },
                rvalue: !0,
                count: 2,
                funcName: n + "seq"
              })
          }
        }();
        var h = ["atan2", "pow"];
        return function () {
          for (var t = 0; t < h.length; ++t) {
            var n = h[t];
            e[n + "op"] = o({
              args: ["array", "array", "array"],
              pre: {
                args: [],
                body: "this_f=Math." + n,
                thisVars: ["this_f"]
              },
              body: {
                args: ["a", "b", "c"],
                body: "a=this_f(c,b)",
                thisVars: ["this_f"]
              },
              funcName: n + "op"
            }),
              e[n + "ops"] = o({
                args: ["array", "array", "scalar"],
                pre: {
                  args: [],
                  body: "this_f=Math." + n,
                  thisVars: ["this_f"]
                },
                body: {
                  args: ["a", "b", "c"],
                  body: "a=this_f(c,b)",
                  thisVars: ["this_f"]
                },
                funcName: n + "ops"
              }),
              e[n + "opeq"] = o({
                args: ["array", "array"],
                pre: {
                  args: [],
                  body: "this_f=Math." + n,
                  thisVars: ["this_f"]
                },
                body: {
                  args: ["a", "b"],
                  body: "a=this_f(b,a)",
                  thisVars: ["this_f"]
                },
                rvalue: !0,
                count: 2,
                funcName: n + "opeq"
              }),
              e[n + "opseq"] = o({
                args: ["array", "scalar"],
                pre: {
                  args: [],
                  body: "this_f=Math." + n,
                  thisVars: ["this_f"]
                },
                body: {
                  args: ["a", "b"],
                  body: "a=this_f(b,a)",
                  thisVars: ["this_f"]
                },
                rvalue: !0,
                count: 2,
                funcName: n + "opseq"
              })
          }
        }(),
          e.any = a({
            args: ["array"],
            pre: s,
            body: {
              args: [{
                name: "a",
                lvalue: !1,
                rvalue: !0,
                count: 1
              }],
              body: "if(a){return true}",
              localVars: [],
              thisVars: []
            },
            post: {
              args: [],
              localVars: [],
              thisVars: [],
              body: "return false"
            },
            funcName: "any"
          }),
          e.all = a({
            args: ["array"],
            pre: s,
            body: {
              args: [{
                name: "x",
                lvalue: !1,
                rvalue: !0,
                count: 1
              }],
              body: "if(!x){return false}",
              localVars: [],
              thisVars: []
            },
            post: {
              args: [],
              localVars: [],
              thisVars: [],
              body: "return true"
            },
            funcName: "all"
          }),
          e.sum = a({
            args: ["array"],
            pre: {
              args: [],
              localVars: [],
              thisVars: ["this_s"],
              body: "this_s=0"
            },
            body: {
              args: [{
                name: "a",
                lvalue: !1,
                rvalue: !0,
                count: 1
              }],
              body: "this_s+=a",
              localVars: [],
              thisVars: ["this_s"]
            },
            post: {
              args: [],
              localVars: [],
              thisVars: ["this_s"],
              body: "return this_s"
            },
            funcName: "sum"
          }),
          e.prod = a({
            args: ["array"],
            pre: {
              args: [],
              localVars: [],
              thisVars: ["this_s"],
              body: "this_s=1"
            },
            body: {
              args: [{
                name: "a",
                lvalue: !1,
                rvalue: !0,
                count: 1
              }],
              body: "this_s*=a",
              localVars: [],
              thisVars: ["this_s"]
            },
            post: {
              args: [],
              localVars: [],
              thisVars: ["this_s"],
              body: "return this_s"
            },
            funcName: "prod"
          }),
          e.norm2squared = a({
            args: ["array"],
            pre: {
              args: [],
              localVars: [],
              thisVars: ["this_s"],
              body: "this_s=0"
            },
            body: {
              args: [{
                name: "a",
                lvalue: !1,
                rvalue: !0,
                count: 2
              }],
              body: "this_s+=a*a",
              localVars: [],
              thisVars: ["this_s"]
            },
            post: {
              args: [],
              localVars: [],
              thisVars: ["this_s"],
              body: "return this_s"
            },
            funcName: "norm2squared"
          }),
          e.norm2 = a({
            args: ["array"],
            pre: {
              args: [],
              localVars: [],
              thisVars: ["this_s"],
              body: "this_s=0"
            },
            body: {
              args: [{
                name: "a",
                lvalue: !1,
                rvalue: !0,
                count: 2
              }],
              body: "this_s+=a*a",
              localVars: [],
              thisVars: ["this_s"]
            },
            post: {
              args: [],
              localVars: [],
              thisVars: ["this_s"],
              body: "return Math.sqrt(this_s)"
            },
            funcName: "norm2"
          }),
          e.norminf = a({
            args: ["array"],
            pre: {
              args: [],
              localVars: [],
              thisVars: ["this_s"],
              body: "this_s=0"
            },
            body: {
              args: [{
                name: "a",
                lvalue: !1,
                rvalue: !0,
                count: 4
              }],
              body: "if(-a>this_s){this_s=-a}else if(a>this_s){this_s=a}",
              localVars: [],
              thisVars: ["this_s"]
            },
            post: {
              args: [],
              localVars: [],
              thisVars: ["this_s"],
              body: "return this_s"
            },
            funcName: "norminf"
          }),
          e.norm1 = a({
            args: ["array"],
            pre: {
              args: [],
              localVars: [],
              thisVars: ["this_s"],
              body: "this_s=0"
            },
            body: {
              args: [{
                name: "a",
                lvalue: !1,
                rvalue: !0,
                count: 3
              }],
              body: "this_s+=a<0?-a:a",
              localVars: [],
              thisVars: ["this_s"]
            },
            post: {
              args: [],
              localVars: [],
              thisVars: ["this_s"],
              body: "return this_s"
            },
            funcName: "norm1"
          }),
          e.sup = a({
            args: ["array"],
            pre: {
              body: "this_h=-Infinity",
              args: [],
              thisVars: ["this_h"],
              localVars: []
            },
            body: {
              body: "if(_inline_1_arg0_>this_h)this_h=_inline_1_arg0_",
              args: [{
                name: "_inline_1_arg0_",
                lvalue: !1,
                rvalue: !0,
                count: 2
              }],
              thisVars: ["this_h"],
              localVars: []
            },
            post: {
              body: "return this_h",
              args: [],
              thisVars: ["this_h"],
              localVars: []
            }
          }),
          e.inf = a({
            args: ["array"],
            pre: {
              body: "this_h=Infinity",
              args: [],
              thisVars: ["this_h"],
              localVars: []
            },
            body: {
              body: "if(_inline_1_arg0_<this_h)this_h=_inline_1_arg0_",
              args: [{
                name: "_inline_1_arg0_",
                lvalue: !1,
                rvalue: !0,
                count: 2
              }],
              thisVars: ["this_h"],
              localVars: []
            },
            post: {
              body: "return this_h",
              args: [],
              thisVars: ["this_h"],
              localVars: []
            }
          }),
          e.argmin = a({
            args: ["index", "array", "shape"],
            pre: {
              body: "{this_v=Infinity;this_i=_inline_0_arg2_.slice(0)}",
              args: [{
                name: "_inline_0_arg0_",
                lvalue: !1,
                rvalue: !1,
                count: 0
              }, {
                name: "_inline_0_arg1_",
                lvalue: !1,
                rvalue: !1,
                count: 0
              }, {
                name: "_inline_0_arg2_",
                lvalue: !1,
                rvalue: !0,
                count: 1
              }],
              thisVars: ["this_i", "this_v"],
              localVars: []
            },
            body: {
              body: "{if(_inline_1_arg1_<this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
              args: [{
                name: "_inline_1_arg0_",
                lvalue: !1,
                rvalue: !0,
                count: 2
              }, {
                name: "_inline_1_arg1_",
                lvalue: !1,
                rvalue: !0,
                count: 2
              }],
              thisVars: ["this_i", "this_v"],
              localVars: ["_inline_1_k"]
            },
            post: {
              body: "{return this_i}",
              args: [],
              thisVars: ["this_i"],
              localVars: []
            }
          }),
          e.argmax = a({
            args: ["index", "array", "shape"],
            pre: {
              body: "{this_v=-Infinity;this_i=_inline_0_arg2_.slice(0)}",
              args: [{
                name: "_inline_0_arg0_",
                lvalue: !1,
                rvalue: !1,
                count: 0
              }, {
                name: "_inline_0_arg1_",
                lvalue: !1,
                rvalue: !1,
                count: 0
              }, {
                name: "_inline_0_arg2_",
                lvalue: !1,
                rvalue: !0,
                count: 1
              }],
              thisVars: ["this_i", "this_v"],
              localVars: []
            },
            body: {
              body: "{if(_inline_1_arg1_>this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
              args: [{
                name: "_inline_1_arg0_",
                lvalue: !1,
                rvalue: !0,
                count: 2
              }, {
                name: "_inline_1_arg1_",
                lvalue: !1,
                rvalue: !0,
                count: 2
              }],
              thisVars: ["this_i", "this_v"],
              localVars: ["_inline_1_k"]
            },
            post: {
              body: "{return this_i}",
              args: [],
              thisVars: ["this_i"],
              localVars: []
            }
          }),
          e.random = o({
            args: ["array"],
            pre: {
              args: [],
              body: "this_f=Math.random",
              thisVars: ["this_f"]
            },
            body: {
              args: ["a"],
              body: "a=this_f()",
              thisVars: ["this_f"]
            },
            funcName: "random"
          }),
          e.assign = o({
            args: ["array", "array"],
            body: {
              args: ["a", "b"],
              body: "a=b"
            },
            funcName: "assign"
          }),
          e.assigns = o({
            args: ["array", "scalar"],
            body: {
              args: ["a", "b"],
              body: "a=b"
            },
            funcName: "assigns"
          }),
          e.equals = a({
            args: ["array", "array"],
            pre: s,
            body: {
              args: [{
                name: "x",
                lvalue: !1,
                rvalue: !0,
                count: 1
              }, {
                name: "y",
                lvalue: !1,
                rvalue: !0,
                count: 1
              }],
              body: "if(x!==y){return false}",
              localVars: [],
              thisVars: []
            },
            post: {
              args: [],
              localVars: [],
              thisVars: [],
              body: "return true"
            },
            funcName: "equals"
          }),
          n.exports
      }),
      System.registerDynamic("58", ["79"], !0, function (t, e, n) {
        return n.exports = t("79"),
          n.exports
      }),
      System.registerDynamic("7a", [], !0, function (t, e, n) {
        "use strict";
        function r(t) {
          var e = 32;
          return t &= -t,
          t && e--,
          65535 & t && (e -= 16),
          16711935 & t && (e -= 8),
          252645135 & t && (e -= 4),
          858993459 & t && (e -= 2),
          1431655765 & t && (e -= 1),
            e
        }

        var i = 32;
        e.INT_BITS = i,
          e.INT_MAX = 2147483647,
          e.INT_MIN = -1 << i - 1,
          e.sign = function (t) {
            return (t > 0) - (t < 0)
          }
          ,
          e.abs = function (t) {
            var e = t >> i - 1;
            return (t ^ e) - e
          }
          ,
          e.min = function (t, e) {
            return e ^ (t ^ e) & -(t < e)
          }
          ,
          e.max = function (t, e) {
            return t ^ (t ^ e) & -(t < e)
          }
          ,
          e.isPow2 = function (t) {
            return !(t & t - 1 || !t)
          }
          ,
          e.log2 = function (t) {
            var e, n;
            return e = (t > 65535) << 4,
              t >>>= e,
              n = (t > 255) << 3,
              t >>>= n,
              e |= n,
              n = (t > 15) << 2,
              t >>>= n,
              e |= n,
              n = (t > 3) << 1,
              t >>>= n,
              e |= n,
            e | t >> 1
          }
          ,
          e.log10 = function (t) {
            return t >= 1e9 ? 9 : t >= 1e8 ? 8 : t >= 1e7 ? 7 : t >= 1e6 ? 6 : t >= 1e5 ? 5 : t >= 1e4 ? 4 : t >= 1e3 ? 3 : t >= 100 ? 2 : t >= 10 ? 1 : 0
          }
          ,
          e.popCount = function (t) {
            return t -= t >>> 1 & 1431655765,
              t = (858993459 & t) + (t >>> 2 & 858993459),
            16843009 * (t + (t >>> 4) & 252645135) >>> 24
          }
          ,
          e.countTrailingZeros = r,
          e.nextPow2 = function (t) {
            return t += 0 === t,
              --t,
              t |= t >>> 1,
              t |= t >>> 2,
              t |= t >>> 4,
              t |= t >>> 8,
              t |= t >>> 16,
            t + 1
          }
          ,
          e.prevPow2 = function (t) {
            return t |= t >>> 1,
              t |= t >>> 2,
              t |= t >>> 4,
              t |= t >>> 8,
              t |= t >>> 16,
            t - (t >>> 1)
          }
          ,
          e.parity = function (t) {
            return t ^= t >>> 16,
              t ^= t >>> 8,
              t ^= t >>> 4,
              t &= 15,
            27030 >>> t & 1
          }
        ;
        var o = new Array(256);
        return function (t) {
          for (var e = 0; e < 256; ++e) {
            var n = e
              , r = e
              , i = 7;
            for (n >>>= 1; n; n >>>= 1)
              r <<= 1,
                r |= 1 & n,
                --i;
            t[e] = r << i & 255
          }
        }(o),
          e.reverse = function (t) {
            return o[255 & t] << 24 | o[t >>> 8 & 255] << 16 | o[t >>> 16 & 255] << 8 | o[t >>> 24 & 255]
          }
          ,
          e.interleave2 = function (t, e) {
            return t &= 65535,
              t = 16711935 & (t | t << 8),
              t = 252645135 & (t | t << 4),
              t = 858993459 & (t | t << 2),
              t = 1431655765 & (t | t << 1),
              e &= 65535,
              e = 16711935 & (e | e << 8),
              e = 252645135 & (e | e << 4),
              e = 858993459 & (e | e << 2),
              e = 1431655765 & (e | e << 1),
            t | e << 1
          }
          ,
          e.deinterleave2 = function (t, e) {
            return t = t >>> e & 1431655765,
              t = 858993459 & (t | t >>> 1),
              t = 252645135 & (t | t >>> 2),
              t = 16711935 & (t | t >>> 4),
              t = 65535 & (t | t >>> 16),
            t << 16 >> 16
          }
          ,
          e.interleave3 = function (t, e, n) {
            return t &= 1023,
              t = 4278190335 & (t | t << 16),
              t = 251719695 & (t | t << 8),
              t = 3272356035 & (t | t << 4),
              t = 1227133513 & (t | t << 2),
              e &= 1023,
              e = 4278190335 & (e | e << 16),
              e = 251719695 & (e | e << 8),
              e = 3272356035 & (e | e << 4),
              e = 1227133513 & (e | e << 2),
              t |= e << 1,
              n &= 1023,
              n = 4278190335 & (n | n << 16),
              n = 251719695 & (n | n << 8),
              n = 3272356035 & (n | n << 4),
              n = 1227133513 & (n | n << 2),
            t | n << 2
          }
          ,
          e.deinterleave3 = function (t, e) {
            return t = t >>> e & 1227133513,
              t = 3272356035 & (t | t >>> 2),
              t = 251719695 & (t | t >>> 4),
              t = 4278190335 & (t | t >>> 8),
              t = 1023 & (t | t >>> 16),
            t << 22 >> 22
          }
          ,
          e.nextCombination = function (t) {
            var e = t | t - 1;
            return e + 1 | (~e & -~e) - 1 >>> r(t) + 1
          }
          ,
          n.exports
      }),
      System.registerDynamic("7b", ["7a"], !0, function (t, e, n) {
        return n.exports = t("7a"),
          n.exports
      }),
    System.registerDynamic("7c", [], !0, function (t, e, n) {
      "use strict";
      function r(t, e, n) {
        var i = 0 | t[n];
        if (i <= 0)
          return [];
        var o, a = new Array(i);
        if (n === t.length - 1)
          for (o = 0; o < i; ++o)
            a[o] = e;
        else
          for (o = 0; o < i; ++o)
            a[o] = r(t, e, n + 1);
        return a
      }

      function i(t, e) {
        var n, r;
        for (n = new Array(t),
               r = 0; r < t; ++r)
          n[r] = e;
        return n
      }

      function o(t, e) {
        switch ("undefined" == typeof e && (e = 0),
          typeof t) {
          case "number":
            if (t > 0)
              return i(0 | t, e);
            break;
          case "object":
            if ("number" == typeof t.length)
              return r(t, e, 0)
        }
        return []
      }

      return n.exports = o,
        n.exports
    }),
    System.registerDynamic("7d", ["7c"], !0, function (t, e, n) {
      return n.exports = t("7c"),
        n.exports
    }),
    System.registerDynamic("7e", [], !0, function (t, e, n) {
      var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      return function (t) {
        "use strict";
        function e(t) {
          var e = t.charCodeAt(0);
          return e === a || e === f ? 62 : e === s || e === p ? 63 : e < u ? -1 : e < u + 10 ? e - u + 26 + 26 : e < c + 26 ? e - c : e < l + 26 ? e - l + 26 : void 0
        }

        function n(t) {
          function n(t) {
            l[f++] = t
          }

          var r, i, a, s, u, l;
          if (t.length % 4 > 0)
            throw new Error("Invalid string. Length must be a multiple of 4");
          var c = t.length;
          u = "=" === t.charAt(c - 2) ? 2 : "=" === t.charAt(c - 1) ? 1 : 0,
            l = new o(3 * t.length / 4 - u),
            a = u > 0 ? t.length - 4 : t.length;
          var f = 0;
          for (r = 0,
                 i = 0; r < a; r += 4,
                 i += 3)
            s = e(t.charAt(r)) << 18 | e(t.charAt(r + 1)) << 12 | e(t.charAt(r + 2)) << 6 | e(t.charAt(r + 3)),
              n((16711680 & s) >> 16),
              n((65280 & s) >> 8),
              n(255 & s);
          return 2 === u ? (s = e(t.charAt(r)) << 2 | e(t.charAt(r + 1)) >> 4,
            n(255 & s)) : 1 === u && (s = e(t.charAt(r)) << 10 | e(t.charAt(r + 1)) << 4 | e(t.charAt(r + 2)) >> 2,
            n(s >> 8 & 255),
            n(255 & s)),
            l
        }

        function i(t) {
          function e(t) {
            return r.charAt(t)
          }

          function n(t) {
            return e(t >> 18 & 63) + e(t >> 12 & 63) + e(t >> 6 & 63) + e(63 & t)
          }

          var i, o, a, s = t.length % 3, u = "";
          for (i = 0,
                 a = t.length - s; i < a; i += 3)
            o = (t[i] << 16) + (t[i + 1] << 8) + t[i + 2],
              u += n(o);
          switch (s) {
            case 1:
              o = t[t.length - 1],
                u += e(o >> 2),
                u += e(o << 4 & 63),
                u += "==";
              break;
            case 2:
              o = (t[t.length - 2] << 8) + t[t.length - 1],
                u += e(o >> 10),
                u += e(o >> 4 & 63),
                u += e(o << 2 & 63),
                u += "="
          }
          return u
        }

        var o = "undefined" != typeof Uint8Array ? Uint8Array : Array
          , a = "+".charCodeAt(0)
          , s = "/".charCodeAt(0)
          , u = "0".charCodeAt(0)
          , l = "a".charCodeAt(0)
          , c = "A".charCodeAt(0)
          , f = "-".charCodeAt(0)
          , p = "_".charCodeAt(0);
        t.toByteArray = n,
          t.fromByteArray = i
      }("undefined" == typeof e ? this.base64js = {} : e),
        n.exports
    }),
    System.registerDynamic("7f", ["7e"], !0, function (t, e, n) {
      return n.exports = t("7e"),
        n.exports
    }),
    System.registerDynamic("80", [], !0, function (t, e, n) {
      return e.read = function (t, e, n, r, i) {
        var o, a, s = 8 * i - r - 1, u = (1 << s) - 1, l = u >> 1, c = -7, f = n ? i - 1 : 0, p = n ? -1 : 1, h = t[e + f];
        for (f += p,
               o = h & (1 << -c) - 1,
               h >>= -c,
               c += s; c > 0; o = 256 * o + t[e + f],
               f += p,
               c -= 8)
          ;
        for (a = o & (1 << -c) - 1,
               o >>= -c,
               c += r; c > 0; a = 256 * a + t[e + f],
               f += p,
               c -= 8)
          ;
        if (0 === o)
          o = 1 - l;
        else {
          if (o === u)
            return a ? NaN : (h ? -1 : 1) * (1 / 0);
          a += Math.pow(2, r),
            o -= l
        }
        return (h ? -1 : 1) * a * Math.pow(2, o - r)
      }
        ,
        e.write = function (t, e, n, r, i, o) {
          var a, s, u, l = 8 * o - i - 1, c = (1 << l) - 1, f = c >> 1, p = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, h = r ? 0 : o - 1, d = r ? 1 : -1, v = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
          for (e = Math.abs(e),
                 isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0,
                   a = c) : (a = Math.floor(Math.log(e) / Math.LN2),
                 e * (u = Math.pow(2, -a)) < 1 && (a--,
                   u *= 2),
                   e += a + f >= 1 ? p / u : p * Math.pow(2, 1 - f),
                 e * u >= 2 && (a++,
                   u /= 2),
                   a + f >= c ? (s = 0,
                     a = c) : a + f >= 1 ? (s = (e * u - 1) * Math.pow(2, i),
                     a += f) : (s = e * Math.pow(2, f - 1) * Math.pow(2, i),
                     a = 0)); i >= 8; t[n + h] = 255 & s,
                 h += d,
                 s /= 256,
                 i -= 8)
            ;
          for (a = a << i | s,
                 l += i; l > 0; t[n + h] = 255 & a,
                 h += d,
                 a /= 256,
                 l -= 8)
            ;
          t[n + h - d] |= 128 * v
        }
        ,
        n.exports
    }),
    System.registerDynamic("81", ["80"], !0, function (t, e, n) {
      return n.exports = t("80"),
        n.exports
    }),
    System.registerDynamic("82", [], !0, function (t, e, n) {
      var r = {}.toString;
      return n.exports = Array.isArray || function (t) {
          return "[object Array]" == r.call(t)
        }
        ,
        n.exports
    }),
    System.registerDynamic("83", ["82"], !0, function (t, e, n) {
      return n.exports = t("82"),
        n.exports
    }),
    System.registerDynamic("84", ["7f", "81", "83"], !0, function (t, e, n) {
      "use strict";
      function r() {
        function t() {
        }

        try {
          var e = new Uint8Array(1);
          return e.foo = function () {
            return 42
          }
            ,
            e.constructor = t,
          42 === e.foo() && e.constructor === t && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
        } catch (t) {
          return !1
        }
      }

      function i() {
        return o.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
      }

      function o(t) {
        return this instanceof o ? (o.TYPED_ARRAY_SUPPORT || (this.length = 0,
          this.parent = void 0),
          "number" == typeof t ? a(this, t) : "string" == typeof t ? s(this, t, arguments.length > 1 ? arguments[1] : "utf8") : u(this, t)) : arguments.length > 1 ? new o(t, arguments[1]) : new o(t)
      }

      function a(t, e) {
        if (t = v(t, e < 0 ? 0 : 0 | m(e)),
            !o.TYPED_ARRAY_SUPPORT)
          for (var n = 0; n < e; n++)
            t[n] = 0;
        return t
      }

      function s(t, e, n) {
        "string" == typeof n && "" !== n || (n = "utf8");
        var r = 0 | y(e, n);
        return t = v(t, r),
          t.write(e, n),
          t
      }

      function u(t, e) {
        if (o.isBuffer(e))
          return l(t, e);
        if (K(e))
          return c(t, e);
        if (null == e)
          throw new TypeError("must start with number, buffer, array or string");
        if ("undefined" != typeof ArrayBuffer) {
          if (e.buffer instanceof ArrayBuffer)
            return f(t, e);
          if (e instanceof ArrayBuffer)
            return p(t, e)
        }
        return e.length ? h(t, e) : d(t, e)
      }

      function l(t, e) {
        var n = 0 | m(e.length);
        return t = v(t, n),
          e.copy(t, 0, 0, n),
          t
      }

      function c(t, e) {
        var n = 0 | m(e.length);
        t = v(t, n);
        for (var r = 0; r < n; r += 1)
          t[r] = 255 & e[r];
        return t
      }

      function f(t, e) {
        var n = 0 | m(e.length);
        t = v(t, n);
        for (var r = 0; r < n; r += 1)
          t[r] = 255 & e[r];
        return t
      }

      function p(t, e) {
        return o.TYPED_ARRAY_SUPPORT ? (e.byteLength,
          t = o._augment(new Uint8Array(e))) : t = f(t, new Uint8Array(e)),
          t
      }

      function h(t, e) {
        var n = 0 | m(e.length);
        t = v(t, n);
        for (var r = 0; r < n; r += 1)
          t[r] = 255 & e[r];
        return t
      }

      function d(t, e) {
        var n, r = 0;
        "Buffer" === e.type && K(e.data) && (n = e.data,
          r = 0 | m(n.length)),
          t = v(t, r);
        for (var i = 0; i < r; i += 1)
          t[i] = 255 & n[i];
        return t
      }

      function v(t, e) {
        o.TYPED_ARRAY_SUPPORT ? (t = o._augment(new Uint8Array(e)),
          t.__proto__ = o.prototype) : (t.length = e,
          t._isBuffer = !0);
        var n = 0 !== e && e <= o.poolSize >>> 1;
        return n && (t.parent = Q),
          t
      }

      function m(t) {
        if (t >= i())
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i().toString(16) + " bytes");
        return 0 | t
      }

      function g(t, e) {
        if (!(this instanceof g))
          return new g(t, e);
        var n = new o(t, e);
        return delete n.parent,
          n
      }

      function y(t, e) {
        "string" != typeof t && (t = "" + t);
        var n = t.length;
        if (0 === n)
          return 0;
        for (var r = !1; ;)
          switch (e) {
            case "ascii":
            case "binary":
            case "raw":
            case "raws":
              return n;
            case "utf8":
            case "utf-8":
              return H(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * n;
            case "hex":
              return n >>> 1;
            case "base64":
              return q(t).length;
            default:
              if (r)
                return H(t).length;
              e = ("" + e).toLowerCase(),
                r = !0
          }
      }

      function b(t, e, n) {
        var r = !1;
        if (e = 0 | e,
            n = void 0 === n || n === 1 / 0 ? this.length : 0 | n,
          t || (t = "utf8"),
          e < 0 && (e = 0),
          n > this.length && (n = this.length),
          n <= e)
          return "";
        for (; ;)
          switch (t) {
            case "hex":
              return D(this, e, n);
            case "utf8":
            case "utf-8":
              return k(this, e, n);
            case "ascii":
              return A(this, e, n);
            case "binary":
              return C(this, e, n);
            case "base64":
              return T(this, e, n);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return O(this, e, n);
            default:
              if (r)
                throw new TypeError("Unknown encoding: " + t);
              t = (t + "").toLowerCase(),
                r = !0
          }
      }

      function _(t, e, n, r) {
        n = Number(n) || 0;
        var i = t.length - n;
        r ? (r = Number(r),
        r > i && (r = i)) : r = i;
        var o = e.length;
        if (o % 2 !== 0)
          throw new Error("Invalid hex string");
        r > o / 2 && (r = o / 2);
        for (var a = 0; a < r; a++) {
          var s = parseInt(e.substr(2 * a, 2), 16);
          if (isNaN(s))
            throw new Error("Invalid hex string");
          t[n + a] = s
        }
        return a
      }

      function w(t, e, n, r) {
        return G(H(e, t.length - n), t, n, r)
      }

      function x(t, e, n, r) {
        return G(z(e), t, n, r)
      }

      function E(t, e, n, r) {
        return x(t, e, n, r)
      }

      function $(t, e, n, r) {
        return G(q(e), t, n, r)
      }

      function S(t, e, n, r) {
        return G(Y(e, t.length - n), t, n, r)
      }

      function T(t, e, n) {
        return 0 === e && n === t.length ? X.fromByteArray(t) : X.fromByteArray(t.slice(e, n))
      }

      function k(t, e, n) {
        n = Math.min(t.length, n);
        for (var r = [], i = e; i < n;) {
          var o = t[i]
            , a = null
            , s = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
          if (i + s <= n) {
            var u, l, c, f;
            switch (s) {
              case 1:
                o < 128 && (a = o);
                break;
              case 2:
                u = t[i + 1],
                128 === (192 & u) && (f = (31 & o) << 6 | 63 & u,
                f > 127 && (a = f));
                break;
              case 3:
                u = t[i + 1],
                  l = t[i + 2],
                128 === (192 & u) && 128 === (192 & l) && (f = (15 & o) << 12 | (63 & u) << 6 | 63 & l,
                f > 2047 && (f < 55296 || f > 57343) && (a = f));
                break;
              case 4:
                u = t[i + 1],
                  l = t[i + 2],
                  c = t[i + 3],
                128 === (192 & u) && 128 === (192 & l) && 128 === (192 & c) && (f = (15 & o) << 18 | (63 & u) << 12 | (63 & l) << 6 | 63 & c,
                f > 65535 && f < 1114112 && (a = f))
            }
          }
          null === a ? (a = 65533,
            s = 1) : a > 65535 && (a -= 65536,
            r.push(a >>> 10 & 1023 | 55296),
            a = 56320 | 1023 & a),
            r.push(a),
            i += s
        }
        return M(r)
      }

      function M(t) {
        var e = t.length;
        if (e <= J)
          return String.fromCharCode.apply(String, t);
        for (var n = "", r = 0; r < e;)
          n += String.fromCharCode.apply(String, t.slice(r, r += J));
        return n
      }

      function A(t, e, n) {
        var r = "";
        n = Math.min(t.length, n);
        for (var i = e; i < n; i++)
          r += String.fromCharCode(127 & t[i]);
        return r
      }

      function C(t, e, n) {
        var r = "";
        n = Math.min(t.length, n);
        for (var i = e; i < n; i++)
          r += String.fromCharCode(t[i]);
        return r
      }

      function D(t, e, n) {
        var r = t.length;
        (!e || e < 0) && (e = 0),
        (!n || n < 0 || n > r) && (n = r);
        for (var i = "", o = e; o < n; o++)
          i += V(t[o]);
        return i
      }

      function O(t, e, n) {
        for (var r = t.slice(e, n), i = "", o = 0; o < r.length; o += 2)
          i += String.fromCharCode(r[o] + 256 * r[o + 1]);
        return i
      }

      function I(t, e, n) {
        if (t % 1 !== 0 || t < 0)
          throw new RangeError("offset is not uint");
        if (t + e > n)
          throw new RangeError("Trying to access beyond buffer length")
      }

      function R(t, e, n, r, i, a) {
        if (!o.isBuffer(t))
          throw new TypeError("buffer must be a Buffer instance");
        if (e > i || e < a)
          throw new RangeError("value is out of bounds");
        if (n + r > t.length)
          throw new RangeError("index out of range")
      }

      function F(t, e, n, r) {
        e < 0 && (e = 65535 + e + 1);
        for (var i = 0, o = Math.min(t.length - n, 2); i < o; i++)
          t[n + i] = (e & 255 << 8 * (r ? i : 1 - i)) >>> 8 * (r ? i : 1 - i)
      }

      function P(t, e, n, r) {
        e < 0 && (e = 4294967295 + e + 1);
        for (var i = 0, o = Math.min(t.length - n, 4); i < o; i++)
          t[n + i] = e >>> 8 * (r ? i : 3 - i) & 255
      }

      function j(t, e, n, r, i, o) {
        if (e > i || e < o)
          throw new RangeError("value is out of bounds");
        if (n + r > t.length)
          throw new RangeError("index out of range");
        if (n < 0)
          throw new RangeError("index out of range")
      }

      function N(t, e, n, r, i) {
        return i || j(t, e, n, 4, 3.4028234663852886e38, -3.4028234663852886e38),
          Z.write(t, e, n, r, 23, 4),
        n + 4
      }

      function L(t, e, n, r, i) {
        return i || j(t, e, n, 8, 1.7976931348623157e308, -1.7976931348623157e308),
          Z.write(t, e, n, r, 52, 8),
        n + 8
      }

      function U(t) {
        if (t = B(t).replace(et, ""),
          t.length < 2)
          return "";
        for (; t.length % 4 !== 0;)
          t += "=";
        return t
      }

      function B(t) {
        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
      }

      function V(t) {
        return t < 16 ? "0" + t.toString(16) : t.toString(16)
      }

      function H(t, e) {
        e = e || 1 / 0;
        for (var n, r = t.length, i = null, o = [], a = 0; a < r; a++) {
          if (n = t.charCodeAt(a),
            n > 55295 && n < 57344) {
            if (!i) {
              if (n > 56319) {
                (e -= 3) > -1 && o.push(239, 191, 189);
                continue
              }
              if (a + 1 === r) {
                (e -= 3) > -1 && o.push(239, 191, 189);
                continue
              }
              i = n;
              continue
            }
            if (n < 56320) {
              (e -= 3) > -1 && o.push(239, 191, 189),
                i = n;
              continue
            }
            n = (i - 55296 << 10 | n - 56320) + 65536
          } else
            i && (e -= 3) > -1 && o.push(239, 191, 189);
          if (i = null ,
            n < 128) {
            if ((e -= 1) < 0)
              break;
            o.push(n)
          } else if (n < 2048) {
            if ((e -= 2) < 0)
              break;
            o.push(n >> 6 | 192, 63 & n | 128)
          } else if (n < 65536) {
            if ((e -= 3) < 0)
              break;
            o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
          } else {
            if (!(n < 1114112))
              throw new Error("Invalid code point");
            if ((e -= 4) < 0)
              break;
            o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
          }
        }
        return o
      }

      function z(t) {
        for (var e = [], n = 0; n < t.length; n++)
          e.push(255 & t.charCodeAt(n));
        return e
      }

      function Y(t, e) {
        for (var n, r, i, o = [], a = 0; a < t.length && !((e -= 2) < 0); a++)
          n = t.charCodeAt(a),
            r = n >> 8,
            i = n % 256,
            o.push(i),
            o.push(r);
        return o
      }

      function q(t) {
        return X.toByteArray(U(t))
      }

      function G(t, e, n, r) {
        for (var i = 0; i < r && !(i + n >= e.length || i >= t.length); i++)
          e[i + n] = t[i];
        return i
      }

      var W = this
        , X = t("7f")
        , Z = t("81")
        , K = t("83");
      e.Buffer = o,
        e.SlowBuffer = g,
        e.INSPECT_MAX_BYTES = 50,
        o.poolSize = 8192;
      var Q = {};
      o.TYPED_ARRAY_SUPPORT = void 0 !== W.TYPED_ARRAY_SUPPORT ? W.TYPED_ARRAY_SUPPORT : r(),
        o.TYPED_ARRAY_SUPPORT ? (o.prototype.__proto__ = Uint8Array.prototype,
          o.__proto__ = Uint8Array) : (o.prototype.length = void 0,
          o.prototype.parent = void 0),
        o.isBuffer = function (t) {
          return !(null == t || !t._isBuffer)
        }
        ,
        o.compare = function (t, e) {
          if (!o.isBuffer(t) || !o.isBuffer(e))
            throw new TypeError("Arguments must be Buffers");
          if (t === e)
            return 0;
          for (var n = t.length, r = e.length, i = 0, a = Math.min(n, r); i < a && t[i] === e[i];)
            ++i;
          return i !== a && (n = t[i],
            r = e[i]),
            n < r ? -1 : r < n ? 1 : 0
        }
        ,
        o.isEncoding = function (t) {
          switch (String(t).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "binary":
            case "base64":
            case "raw":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1
          }
        }
        ,
        o.concat = function (t, e) {
          if (!K(t))
            throw new TypeError("list argument must be an Array of Buffers.");
          if (0 === t.length)
            return new o(0);
          var n;
          if (void 0 === e)
            for (e = 0,
                   n = 0; n < t.length; n++)
              e += t[n].length;
          var r = new o(e)
            , i = 0;
          for (n = 0; n < t.length; n++) {
            var a = t[n];
            a.copy(r, i),
              i += a.length
          }
          return r
        }
        ,
        o.byteLength = y,
        o.prototype.toString = function () {
          var t = 0 | this.length;
          return 0 === t ? "" : 0 === arguments.length ? k(this, 0, t) : b.apply(this, arguments)
        }
        ,
        o.prototype.equals = function (t) {
          if (!o.isBuffer(t))
            throw new TypeError("Argument must be a Buffer");
          return this === t || 0 === o.compare(this, t)
        }
        ,
        o.prototype.inspect = function () {
          var t = ""
            , n = e.INSPECT_MAX_BYTES;
          return this.length > 0 && (t = this.toString("hex", 0, n).match(/.{2}/g).join(" "),
          this.length > n && (t += " ... ")),
          "<Buffer " + t + ">"
        }
        ,
        o.prototype.compare = function (t) {
          if (!o.isBuffer(t))
            throw new TypeError("Argument must be a Buffer");
          return this === t ? 0 : o.compare(this, t)
        }
        ,
        o.prototype.indexOf = function (t, e) {
          function n(t, e, n) {
            for (var r = -1, i = 0; n + i < t.length; i++)
              if (t[n + i] === e[r === -1 ? 0 : i - r]) {
                if (r === -1 && (r = i),
                  i - r + 1 === e.length)
                  return n + r
              } else
                r = -1;
            return -1
          }

          if (e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648),
              e >>= 0,
            0 === this.length)
            return -1;
          if (e >= this.length)
            return -1;
          if (e < 0 && (e = Math.max(this.length + e, 0)),
            "string" == typeof t)
            return 0 === t.length ? -1 : String.prototype.indexOf.call(this, t, e);
          if (o.isBuffer(t))
            return n(this, t, e);
          if ("number" == typeof t)
            return o.TYPED_ARRAY_SUPPORT && "function" === Uint8Array.prototype.indexOf ? Uint8Array.prototype.indexOf.call(this, t, e) : n(this, [t], e);
          throw new TypeError("val must be string, number or Buffer")
        }
        ,
        o.prototype.get = function (t) {
          return console.log(".get() is deprecated. Access using array indexes instead."),
            this.readUInt8(t)
        }
        ,
        o.prototype.set = function (t, e) {
          return console.log(".set() is deprecated. Access using array indexes instead."),
            this.writeUInt8(t, e)
        }
        ,
        o.prototype.write = function (t, e, n, r) {
          if (void 0 === e)
            r = "utf8",
              n = this.length,
              e = 0;
          else if (void 0 === n && "string" == typeof e)
            r = e,
              n = this.length,
              e = 0;
          else if (isFinite(e))
            e = 0 | e,
              isFinite(n) ? (n = 0 | n,
              void 0 === r && (r = "utf8")) : (r = n,
                n = void 0);
          else {
            var i = r;
            r = e,
              e = 0 | n,
              n = i
          }
          var o = this.length - e;
          if ((void 0 === n || n > o) && (n = o),
            t.length > 0 && (n < 0 || e < 0) || e > this.length)
            throw new RangeError("attempt to write outside buffer bounds");
          r || (r = "utf8");
          for (var a = !1; ;)
            switch (r) {
              case "hex":
                return _(this, t, e, n);
              case "utf8":
              case "utf-8":
                return w(this, t, e, n);
              case "ascii":
                return x(this, t, e, n);
              case "binary":
                return E(this, t, e, n);
              case "base64":
                return $(this, t, e, n);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return S(this, t, e, n);
              default:
                if (a)
                  throw new TypeError("Unknown encoding: " + r);
                r = ("" + r).toLowerCase(),
                  a = !0
            }
        }
        ,
        o.prototype.toJSON = function () {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
          }
        }
      ;
      var J = 4096;
      o.prototype.slice = function (t, e) {
        var n = this.length;
        t = ~~t,
          e = void 0 === e ? n : ~~e,
          t < 0 ? (t += n,
          t < 0 && (t = 0)) : t > n && (t = n),
          e < 0 ? (e += n,
          e < 0 && (e = 0)) : e > n && (e = n),
        e < t && (e = t);
        var r;
        if (o.TYPED_ARRAY_SUPPORT)
          r = o._augment(this.subarray(t, e));
        else {
          var i = e - t;
          r = new o(i, (void 0));
          for (var a = 0; a < i; a++)
            r[a] = this[a + t]
        }
        return r.length && (r.parent = this.parent || this),
          r
      }
        ,
        o.prototype.readUIntLE = function (t, e, n) {
          t = 0 | t,
            e = 0 | e,
          n || I(t, e, this.length);
          for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);)
            r += this[t + o] * i;
          return r
        }
        ,
        o.prototype.readUIntBE = function (t, e, n) {
          t = 0 | t,
            e = 0 | e,
          n || I(t, e, this.length);
          for (var r = this[t + --e], i = 1; e > 0 && (i *= 256);)
            r += this[t + --e] * i;
          return r
        }
        ,
        o.prototype.readUInt8 = function (t, e) {
          return e || I(t, 1, this.length),
            this[t]
        }
        ,
        o.prototype.readUInt16LE = function (t, e) {
          return e || I(t, 2, this.length),
          this[t] | this[t + 1] << 8
        }
        ,
        o.prototype.readUInt16BE = function (t, e) {
          return e || I(t, 2, this.length),
          this[t] << 8 | this[t + 1]
        }
        ,
        o.prototype.readUInt32LE = function (t, e) {
          return e || I(t, 4, this.length),
          (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
        }
        ,
        o.prototype.readUInt32BE = function (t, e) {
          return e || I(t, 4, this.length),
          16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
        }
        ,
        o.prototype.readIntLE = function (t, e, n) {
          t = 0 | t,
            e = 0 | e,
          n || I(t, e, this.length);
          for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);)
            r += this[t + o] * i;
          return i *= 128,
          r >= i && (r -= Math.pow(2, 8 * e)),
            r
        }
        ,
        o.prototype.readIntBE = function (t, e, n) {
          t = 0 | t,
            e = 0 | e,
          n || I(t, e, this.length);
          for (var r = e, i = 1, o = this[t + --r]; r > 0 && (i *= 256);)
            o += this[t + --r] * i;
          return i *= 128,
          o >= i && (o -= Math.pow(2, 8 * e)),
            o
        }
        ,
        o.prototype.readInt8 = function (t, e) {
          return e || I(t, 1, this.length),
            128 & this[t] ? (255 - this[t] + 1) * -1 : this[t]
        }
        ,
        o.prototype.readInt16LE = function (t, e) {
          e || I(t, 2, this.length);
          var n = this[t] | this[t + 1] << 8;
          return 32768 & n ? 4294901760 | n : n
        }
        ,
        o.prototype.readInt16BE = function (t, e) {
          e || I(t, 2, this.length);
          var n = this[t + 1] | this[t] << 8;
          return 32768 & n ? 4294901760 | n : n
        }
        ,
        o.prototype.readInt32LE = function (t, e) {
          return e || I(t, 4, this.length),
          this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
        }
        ,
        o.prototype.readInt32BE = function (t, e) {
          return e || I(t, 4, this.length),
          this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
        }
        ,
        o.prototype.readFloatLE = function (t, e) {
          return e || I(t, 4, this.length),
            Z.read(this, t, !0, 23, 4)
        }
        ,
        o.prototype.readFloatBE = function (t, e) {
          return e || I(t, 4, this.length),
            Z.read(this, t, !1, 23, 4)
        }
        ,
        o.prototype.readDoubleLE = function (t, e) {
          return e || I(t, 8, this.length),
            Z.read(this, t, !0, 52, 8)
        }
        ,
        o.prototype.readDoubleBE = function (t, e) {
          return e || I(t, 8, this.length),
            Z.read(this, t, !1, 52, 8)
        }
        ,
        o.prototype.writeUIntLE = function (t, e, n, r) {
          t = +t,
            e = 0 | e,
            n = 0 | n,
          r || R(this, t, e, n, Math.pow(2, 8 * n), 0);
          var i = 1
            , o = 0;
          for (this[e] = 255 & t; ++o < n && (i *= 256);)
            this[e + o] = t / i & 255;
          return e + n
        }
        ,
        o.prototype.writeUIntBE = function (t, e, n, r) {
          t = +t,
            e = 0 | e,
            n = 0 | n,
          r || R(this, t, e, n, Math.pow(2, 8 * n), 0);
          var i = n - 1
            , o = 1;
          for (this[e + i] = 255 & t; --i >= 0 && (o *= 256);)
            this[e + i] = t / o & 255;
          return e + n
        }
        ,
        o.prototype.writeUInt8 = function (t, e, n) {
          return t = +t,
            e = 0 | e,
          n || R(this, t, e, 1, 255, 0),
          o.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
            this[e] = 255 & t,
          e + 1
        }
        ,
        o.prototype.writeUInt16LE = function (t, e, n) {
          return t = +t,
            e = 0 | e,
          n || R(this, t, e, 2, 65535, 0),
            o.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
              this[e + 1] = t >>> 8) : F(this, t, e, !0),
          e + 2
        }
        ,
        o.prototype.writeUInt16BE = function (t, e, n) {
          return t = +t,
            e = 0 | e,
          n || R(this, t, e, 2, 65535, 0),
            o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8,
              this[e + 1] = 255 & t) : F(this, t, e, !1),
          e + 2
        }
        ,
        o.prototype.writeUInt32LE = function (t, e, n) {
          return t = +t,
            e = 0 | e,
          n || R(this, t, e, 4, 4294967295, 0),
            o.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24,
              this[e + 2] = t >>> 16,
              this[e + 1] = t >>> 8,
              this[e] = 255 & t) : P(this, t, e, !0),
          e + 4
        }
        ,
        o.prototype.writeUInt32BE = function (t, e, n) {
          return t = +t,
            e = 0 | e,
          n || R(this, t, e, 4, 4294967295, 0),
            o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24,
              this[e + 1] = t >>> 16,
              this[e + 2] = t >>> 8,
              this[e + 3] = 255 & t) : P(this, t, e, !1),
          e + 4
        }
        ,
        o.prototype.writeIntLE = function (t, e, n, r) {
          if (t = +t,
              e = 0 | e,
              !r) {
            var i = Math.pow(2, 8 * n - 1);
            R(this, t, e, n, i - 1, -i)
          }
          var o = 0
            , a = 1
            , s = t < 0 ? 1 : 0;
          for (this[e] = 255 & t; ++o < n && (a *= 256);)
            this[e + o] = (t / a >> 0) - s & 255;
          return e + n
        }
        ,
        o.prototype.writeIntBE = function (t, e, n, r) {
          if (t = +t,
              e = 0 | e,
              !r) {
            var i = Math.pow(2, 8 * n - 1);
            R(this, t, e, n, i - 1, -i)
          }
          var o = n - 1
            , a = 1
            , s = t < 0 ? 1 : 0;
          for (this[e + o] = 255 & t; --o >= 0 && (a *= 256);)
            this[e + o] = (t / a >> 0) - s & 255;
          return e + n
        }
        ,
        o.prototype.writeInt8 = function (t, e, n) {
          return t = +t,
            e = 0 | e,
          n || R(this, t, e, 1, 127, -128),
          o.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
          t < 0 && (t = 255 + t + 1),
            this[e] = 255 & t,
          e + 1
        }
        ,
        o.prototype.writeInt16LE = function (t, e, n) {
          return t = +t,
            e = 0 | e,
          n || R(this, t, e, 2, 32767, -32768),
            o.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
              this[e + 1] = t >>> 8) : F(this, t, e, !0),
          e + 2
        }
        ,
        o.prototype.writeInt16BE = function (t, e, n) {
          return t = +t,
            e = 0 | e,
          n || R(this, t, e, 2, 32767, -32768),
            o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8,
              this[e + 1] = 255 & t) : F(this, t, e, !1),
          e + 2
        }
        ,
        o.prototype.writeInt32LE = function (t, e, n) {
          return t = +t,
            e = 0 | e,
          n || R(this, t, e, 4, 2147483647, -2147483648),
            o.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
              this[e + 1] = t >>> 8,
              this[e + 2] = t >>> 16,
              this[e + 3] = t >>> 24) : P(this, t, e, !0),
          e + 4
        }
        ,
        o.prototype.writeInt32BE = function (t, e, n) {
          return t = +t,
            e = 0 | e,
          n || R(this, t, e, 4, 2147483647, -2147483648),
          t < 0 && (t = 4294967295 + t + 1),
            o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24,
              this[e + 1] = t >>> 16,
              this[e + 2] = t >>> 8,
              this[e + 3] = 255 & t) : P(this, t, e, !1),
          e + 4
        }
        ,
        o.prototype.writeFloatLE = function (t, e, n) {
          return N(this, t, e, !0, n)
        }
        ,
        o.prototype.writeFloatBE = function (t, e, n) {
          return N(this, t, e, !1, n)
        }
        ,
        o.prototype.writeDoubleLE = function (t, e, n) {
          return L(this, t, e, !0, n)
        }
        ,
        o.prototype.writeDoubleBE = function (t, e, n) {
          return L(this, t, e, !1, n)
        }
        ,
        o.prototype.copy = function (t, e, n, r) {
          if (n || (n = 0),
            r || 0 === r || (r = this.length),
            e >= t.length && (e = t.length),
            e || (e = 0),
            r > 0 && r < n && (r = n),
            r === n)
            return 0;
          if (0 === t.length || 0 === this.length)
            return 0;
          if (e < 0)
            throw new RangeError("targetStart out of bounds");
          if (n < 0 || n >= this.length)
            throw new RangeError("sourceStart out of bounds");
          if (r < 0)
            throw new RangeError("sourceEnd out of bounds");
          r > this.length && (r = this.length),
          t.length - e < r - n && (r = t.length - e + n);
          var i, a = r - n;
          if (this === t && n < e && e < r)
            for (i = a - 1; i >= 0; i--)
              t[i + e] = this[i + n];
          else if (a < 1e3 || !o.TYPED_ARRAY_SUPPORT)
            for (i = 0; i < a; i++)
              t[i + e] = this[i + n];
          else
            t._set(this.subarray(n, n + a), e);
          return a
        }
        ,
        o.prototype.fill = function (t, e, n) {
          if (t || (t = 0),
            e || (e = 0),
            n || (n = this.length),
            n < e)
            throw new RangeError("end < start");
          if (n !== e && 0 !== this.length) {
            if (e < 0 || e >= this.length)
              throw new RangeError("start out of bounds");
            if (n < 0 || n > this.length)
              throw new RangeError("end out of bounds");
            var r;
            if ("number" == typeof t)
              for (r = e; r < n; r++)
                this[r] = t;
            else {
              var i = H(t.toString())
                , o = i.length;
              for (r = e; r < n; r++)
                this[r] = i[r % o]
            }
            return this
          }
        }
        ,
        o.prototype.toArrayBuffer = function () {
          if ("undefined" != typeof Uint8Array) {
            if (o.TYPED_ARRAY_SUPPORT)
              return new o(this).buffer;
            for (var t = new Uint8Array(this.length), e = 0, n = t.length; e < n; e += 1)
              t[e] = this[e];
            return t.buffer
          }
          throw new TypeError("Buffer.toArrayBuffer not supported in this browser")
        }
      ;
      var tt = o.prototype;
      o._augment = function (t) {
        return t.constructor = o,
          t._isBuffer = !0,
          t._set = t.set,
          t.get = tt.get,
          t.set = tt.set,
          t.write = tt.write,
          t.toString = tt.toString,
          t.toLocaleString = tt.toString,
          t.toJSON = tt.toJSON,
          t.equals = tt.equals,
          t.compare = tt.compare,
          t.indexOf = tt.indexOf,
          t.copy = tt.copy,
          t.slice = tt.slice,
          t.readUIntLE = tt.readUIntLE,
          t.readUIntBE = tt.readUIntBE,
          t.readUInt8 = tt.readUInt8,
          t.readUInt16LE = tt.readUInt16LE,
          t.readUInt16BE = tt.readUInt16BE,
          t.readUInt32LE = tt.readUInt32LE,
          t.readUInt32BE = tt.readUInt32BE,
          t.readIntLE = tt.readIntLE,
          t.readIntBE = tt.readIntBE,
          t.readInt8 = tt.readInt8,
          t.readInt16LE = tt.readInt16LE,
          t.readInt16BE = tt.readInt16BE,
          t.readInt32LE = tt.readInt32LE,
          t.readInt32BE = tt.readInt32BE,
          t.readFloatLE = tt.readFloatLE,
          t.readFloatBE = tt.readFloatBE,
          t.readDoubleLE = tt.readDoubleLE,
          t.readDoubleBE = tt.readDoubleBE,
          t.writeUInt8 = tt.writeUInt8,
          t.writeUIntLE = tt.writeUIntLE,
          t.writeUIntBE = tt.writeUIntBE,
          t.writeUInt16LE = tt.writeUInt16LE,
          t.writeUInt16BE = tt.writeUInt16BE,
          t.writeUInt32LE = tt.writeUInt32LE,
          t.writeUInt32BE = tt.writeUInt32BE,
          t.writeIntLE = tt.writeIntLE,
          t.writeIntBE = tt.writeIntBE,
          t.writeInt8 = tt.writeInt8,
          t.writeInt16LE = tt.writeInt16LE,
          t.writeInt16BE = tt.writeInt16BE,
          t.writeInt32LE = tt.writeInt32LE,
          t.writeInt32BE = tt.writeInt32BE,
          t.writeFloatLE = tt.writeFloatLE,
          t.writeFloatBE = tt.writeFloatBE,
          t.writeDoubleLE = tt.writeDoubleLE,
          t.writeDoubleBE = tt.writeDoubleBE,
          t.fill = tt.fill,
          t.inspect = tt.inspect,
          t.toArrayBuffer = tt.toArrayBuffer,
          t
      }
      ;
      var et = /[^+\/0-9A-Za-z-_]/g;
      return n.exports
    }),
    System.registerDynamic("85", ["84"], !0, function (t, e, n) {
      return n.exports = t("84"),
        n.exports
    }),
    System.registerDynamic("86", ["85"], !0, function (e, n, r) {
      return r.exports = System._nodeRequire ? System._nodeRequire("buffer") : e("85"),
        r.exports
    }),
    System.registerDynamic("1a", ["86"], !0, function (t, e, n) {
      return n.exports = t("86"),
        n.exports
    }),
    System.registerDynamic("87", ["7b", "7d", "1a"], !0, function (t, e, n) {
      var r = this;
      return function (n) {
        "use strict";
        function i(t) {
          if (t) {
            var e = t.length || t.byteLength
              , n = y.log2(e);
            x[n].push(t)
          }
        }

        function o(t) {
          i(t.buffer)
        }

        function a(t) {
          var t = y.nextPow2(t)
            , e = y.log2(t)
            , n = x[e];
          return n.length > 0 ? n.pop() : new ArrayBuffer(t)
        }

        function s(t) {
          return new Uint8Array(a(t), 0, t)
        }

        function u(t) {
          return new Uint16Array(a(2 * t), 0, t)
        }

        function l(t) {
          return new Uint32Array(a(4 * t), 0, t)
        }

        function c(t) {
          return new Int8Array(a(t), 0, t)
        }

        function f(t) {
          return new Int16Array(a(2 * t), 0, t)
        }

        function p(t) {
          return new Int32Array(a(4 * t), 0, t)
        }

        function h(t) {
          return new Float32Array(a(4 * t), 0, t)
        }

        function d(t) {
          return new Float64Array(a(8 * t), 0, t)
        }

        function v(t) {
          return _ ? new Uint8ClampedArray(a(t), 0, t) : s(t)
        }

        function m(t) {
          return new DataView(a(t), 0, t)
        }

        function g(t) {
          t = y.nextPow2(t);
          var e = y.log2(t)
            , r = E[e];
          return r.length > 0 ? r.pop() : new n(t)
        }

        var y = t("7b")
          , b = t("7d");
        r.__TYPEDARRAY_POOL || (r.__TYPEDARRAY_POOL = {
          UINT8: b([32, 0]),
          UINT16: b([32, 0]),
          UINT32: b([32, 0]),
          INT8: b([32, 0]),
          INT16: b([32, 0]),
          INT32: b([32, 0]),
          FLOAT: b([32, 0]),
          DOUBLE: b([32, 0]),
          DATA: b([32, 0]),
          UINT8C: b([32, 0]),
          BUFFER: b([32, 0])
        });
        var _ = "undefined" != typeof Uint8ClampedArray
          , w = r.__TYPEDARRAY_POOL;
        w.UINT8C || (w.UINT8C = b([32, 0])),
        w.BUFFER || (w.BUFFER = b([32, 0]));
        var x = w.DATA
          , E = w.BUFFER;
        e.free = function (t) {
          if (n.isBuffer(t))
            E[y.log2(t.length)].push(t);
          else {
            if ("[object ArrayBuffer]" !== Object.prototype.toString.call(t) && (t = t.buffer),
                !t)
              return;
            var e = t.length || t.byteLength
              , r = 0 | y.log2(e);
            x[r].push(t)
          }
        }
          ,
          e.freeUint8 = e.freeUint16 = e.freeUint32 = e.freeInt8 = e.freeInt16 = e.freeInt32 = e.freeFloat32 = e.freeFloat = e.freeFloat64 = e.freeDouble = e.freeUint8Clamped = e.freeDataView = o,
          e.freeArrayBuffer = i,
          e.freeBuffer = function (t) {
            E[y.log2(t.length)].push(t)
          }
          ,
          e.malloc = function (t, e) {
            if (void 0 === e || "arraybuffer" === e)
              return a(t);
            switch (e) {
              case "uint8":
                return s(t);
              case "uint16":
                return u(t);
              case "uint32":
                return l(t);
              case "int8":
                return c(t);
              case "int16":
                return f(t);
              case "int32":
                return p(t);
              case "float":
              case "float32":
                return h(t);
              case "double":
              case "float64":
                return d(t);
              case "uint8_clamped":
                return v(t);
              case "buffer":
                return g(t);
              case "data":
              case "dataview":
                return m(t);
              default:
                return null
            }
            return null
          }
          ,
          e.mallocArrayBuffer = a,
          e.mallocUint8 = s,
          e.mallocUint16 = u,
          e.mallocUint32 = l,
          e.mallocInt8 = c,
          e.mallocInt16 = f,
          e.mallocInt32 = p,
          e.mallocFloat32 = e.mallocFloat = h,
          e.mallocFloat64 = e.mallocDouble = d,
          e.mallocUint8Clamped = v,
          e.mallocDataView = m,
          e.mallocBuffer = g,
          e.clearCache = function () {
            for (var t = 0; t < 32; ++t)
              w.UINT8[t].length = 0,
                w.UINT16[t].length = 0,
                w.UINT32[t].length = 0,
                w.INT8[t].length = 0,
                w.INT16[t].length = 0,
                w.INT32[t].length = 0,
                w.FLOAT[t].length = 0,
                w.DOUBLE[t].length = 0,
                w.UINT8C[t].length = 0,
                x[t].length = 0,
                E[t].length = 0
          }
      }(t("1a").Buffer),
        n.exports
    }),
    System.registerDynamic("59", ["87"], !0, function (t, e, n) {
      return n.exports = t("87"),
        n.exports
    }),
    System.registerDynamic("88", ["57", "58", "59"], !0, function (t, e, n) {
      "use strict";
      function r(t) {
        m = [t.LINEAR, t.NEAREST_MIPMAP_LINEAR, t.LINEAR_MIPMAP_NEAREST, t.LINEAR_MIPMAP_NEAREST],
          g = [t.NEAREST, t.LINEAR, t.NEAREST_MIPMAP_NEAREST, t.NEAREST_MIPMAP_LINEAR, t.LINEAR_MIPMAP_NEAREST, t.LINEAR_MIPMAP_LINEAR],
          y = [t.REPEAT, t.CLAMP_TO_EDGE, t.MIRRORED_REPEAT]
      }

      function i(t, e, n) {
        var r = t.gl
          , i = r.getParameter(r.MAX_TEXTURE_SIZE);
        if (e < 0 || e > i || n < 0 || n > i)
          throw new Error("gl-texture2d: Invalid texture size");
        return t._shape = [e, n],
          t.bind(),
          r.texImage2D(r.TEXTURE_2D, 0, t.format, e, n, 0, t.format, t.type, null),
          t._mipLevels = [0],
          t
      }

      function o(t, e, n, r, i, o) {
        this.gl = t,
          this.handle = e,
          this.format = i,
          this.type = o,
          this._shape = [n, r],
          this._mipLevels = [0],
          this._magFilter = t.NEAREST,
          this._minFilter = t.NEAREST,
          this._wrapS = t.CLAMP_TO_EDGE,
          this._wrapT = t.CLAMP_TO_EDGE,
          this._anisoSamples = 1;
        var a = this
          , s = [this._wrapS, this._wrapT];
        Object.defineProperties(s, [{
          get: function () {
            return a._wrapS
          },
          set: function (t) {
            return a.wrapS = t
          }
        }, {
          get: function () {
            return a._wrapT
          },
          set: function (t) {
            return a.wrapT = t
          }
        }]),
          this._wrapVector = s;
        var u = [this._shape[0], this._shape[1]];
        Object.defineProperties(u, [{
          get: function () {
            return a._shape[0]
          },
          set: function (t) {
            return a.width = t
          }
        }, {
          get: function () {
            return a._shape[1]
          },
          set: function (t) {
            return a.height = t
          }
        }]),
          this._shapeVector = u
      }

      function a(t, e) {
        return 3 === t.length ? 1 === e[2] && e[1] === t[0] * t[2] && e[0] === t[2] : 1 === e[0] && e[1] === t[0]
      }

      function s(t, e, n, r, i, o, s, u) {
        var l = u.dtype
          , c = u.shape.slice();
        if (c.length < 2 || c.length > 3)
          throw new Error("gl-texture2d: Invalid ndarray, must be 2d or 3d");
        var f = 0
          , p = 0
          , m = a(c, u.stride.slice());
        "float32" === l ? f = t.FLOAT : "float64" === l ? (f = t.FLOAT,
          m = !1,
          l = "float32") : "uint8" === l ? f = t.UNSIGNED_BYTE : (f = t.UNSIGNED_BYTE,
          m = !1,
          l = "uint8");
        var g = 1;
        if (2 === c.length)
          p = t.LUMINANCE,
            c = [c[0], c[1], 1],
            u = h(u.data, c, [u.stride[0], u.stride[1], 1], u.offset);
        else {
          if (3 !== c.length)
            throw new Error("gl-texture2d: Invalid shape for texture");
          if (1 === c[2])
            p = t.ALPHA;
          else if (2 === c[2])
            p = t.LUMINANCE_ALPHA;
          else if (3 === c[2])
            p = t.RGB;
          else {
            if (4 !== c[2])
              throw new Error("gl-texture2d: Invalid shape for pixel coords");
            p = t.RGBA
          }
          g = c[2]
        }
        if (p !== t.LUMINANCE && p !== t.ALPHA || i !== t.LUMINANCE && i !== t.ALPHA || (p = i),
          p !== i)
          throw new Error("gl-texture2d: Incompatible texture format for setPixels");
        var y = u.size
          , _ = s.indexOf(r) < 0;
        if (_ && s.push(r),
          f === o && m)
          0 === u.offset && u.data.length === y ? _ ? t.texImage2D(t.TEXTURE_2D, r, i, c[0], c[1], 0, i, o, u.data) : t.texSubImage2D(t.TEXTURE_2D, r, e, n, c[0], c[1], i, o, u.data) : _ ? t.texImage2D(t.TEXTURE_2D, r, i, c[0], c[1], 0, i, o, u.data.subarray(u.offset, u.offset + y)) : t.texSubImage2D(t.TEXTURE_2D, r, e, n, c[0], c[1], i, o, u.data.subarray(u.offset, u.offset + y));
        else {
          var w;
          w = o === t.FLOAT ? v.mallocFloat32(y) : v.mallocUint8(y);
          var x = h(w, c, [c[2], c[2] * c[0], 1]);
          f === t.FLOAT && o === t.UNSIGNED_BYTE ? b(x, u) : d.assign(x, u),
            _ ? t.texImage2D(t.TEXTURE_2D, r, i, c[0], c[1], 0, i, o, w.subarray(0, y)) : t.texSubImage2D(t.TEXTURE_2D, r, e, n, c[0], c[1], i, o, w.subarray(0, y)),
            o === t.FLOAT ? v.freeFloat32(w) : v.freeUint8(w)
        }
      }

      function u(t) {
        var e = t.createTexture();
        return t.bindTexture(t.TEXTURE_2D, e),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
          e
      }

      function l(t, e, n, r, i) {
        var a = t.getParameter(t.MAX_TEXTURE_SIZE);
        if (e < 0 || e > a || n < 0 || n > a)
          throw new Error("gl-texture2d: Invalid texture shape");
        if (i === t.FLOAT && !t.getExtension("OES_texture_float"))
          throw new Error("gl-texture2d: Floating point textures not supported on this platform");
        var s = u(t);
        return t.texImage2D(t.TEXTURE_2D, 0, r, e, n, 0, r, i, null),
          new o(t, s, e, n, r, i)
      }

      function c(t, e, n, r) {
        var i = u(t);
        return t.texImage2D(t.TEXTURE_2D, 0, n, n, r, e),
          new o(t, i, 0 | e.width, 0 | e.height, n, r)
      }

      function f(t, e) {
        var n = e.dtype
          , r = e.shape.slice()
          , i = t.getParameter(t.MAX_TEXTURE_SIZE);
        if (r[0] < 0 || r[0] > i || r[1] < 0 || r[1] > i)
          throw new Error("gl-texture2d: Invalid texture size");
        var s = a(r, e.stride.slice())
          , l = 0;
        "float32" === n ? l = t.FLOAT : "float64" === n ? (l = t.FLOAT,
          s = !1,
          n = "float32") : "uint8" === n ? l = t.UNSIGNED_BYTE : (l = t.UNSIGNED_BYTE,
          s = !1,
          n = "uint8");
        var c = 0;
        if (2 === r.length)
          c = t.LUMINANCE,
            r = [r[0], r[1], 1],
            e = h(e.data, r, [e.stride[0], e.stride[1], 1], e.offset);
        else {
          if (3 !== r.length)
            throw new Error("gl-texture2d: Invalid shape for texture");
          if (1 === r[2])
            c = t.ALPHA;
          else if (2 === r[2])
            c = t.LUMINANCE_ALPHA;
          else if (3 === r[2])
            c = t.RGB;
          else {
            if (4 !== r[2])
              throw new Error("gl-texture2d: Invalid shape for pixel coords");
            c = t.RGBA
          }
        }
        l !== t.FLOAT || t.getExtension("OES_texture_float") || (l = t.UNSIGNED_BYTE,
          s = !1);
        var f, p, m = e.size;
        if (s)
          f = 0 === e.offset && e.data.length === m ? e.data : e.data.subarray(e.offset, e.offset + m);
        else {
          var g = [r[2], r[2] * r[0], 1];
          p = v.malloc(m, n);
          var y = h(p, r, g, 0);
          "float32" !== n && "float64" !== n || l !== t.UNSIGNED_BYTE ? d.assign(y, e) : b(y, e),
            f = p.subarray(0, m)
        }
        var _ = u(t);
        return t.texImage2D(t.TEXTURE_2D, 0, c, r[0], r[1], 0, c, l, f),
        s || v.free(p),
          new o(t, _, r[0], r[1], c, l)
      }

      function p(t) {
        if (arguments.length <= 1)
          throw new Error("gl-texture2d: Missing arguments for texture2d constructor");
        if (m || r(t),
          "number" == typeof arguments[1])
          return l(t, arguments[1], arguments[2], arguments[3] || t.RGBA, arguments[4] || t.UNSIGNED_BYTE);
        if (Array.isArray(arguments[1]))
          return l(t, 0 | arguments[1][0], 0 | arguments[1][1], arguments[2] || t.RGBA, arguments[3] || t.UNSIGNED_BYTE);
        if ("object" == typeof arguments[1]) {
          var e = arguments[1];
          if (e instanceof HTMLCanvasElement || e instanceof HTMLImageElement || e instanceof HTMLVideoElement || e instanceof ImageData)
            return c(t, e, arguments[2] || t.RGBA, arguments[3] || t.UNSIGNED_BYTE);
          if (e.shape && e.data && e.stride)
            return f(t, e)
        }
        throw new Error("gl-texture2d: Invalid arguments for texture2d constructor")
      }

      var h = t("57")
        , d = t("58")
        , v = t("59");
      n.exports = p;
      var m = null
        , g = null
        , y = null
        , b = function (t, e) {
        d.muls(t, e, 255)
      }
        , _ = o.prototype;
      return Object.defineProperties(_, {
        minFilter: {
          get: function () {
            return this._minFilter
          },
          set: function (t) {
            this.bind();
            var e = this.gl;
            if (this.type === e.FLOAT && m.indexOf(t) >= 0 && (e.getExtension("OES_texture_float_linear") || (t = e.NEAREST)),
              g.indexOf(t) < 0)
              throw new Error("gl-texture2d: Unknown filter mode " + t);
            return e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, t),
              this._minFilter = t
          }
        },
        magFilter: {
          get: function () {
            return this._magFilter
          },
          set: function (t) {
            this.bind();
            var e = this.gl;
            if (this.type === e.FLOAT && m.indexOf(t) >= 0 && (e.getExtension("OES_texture_float_linear") || (t = e.NEAREST)),
              g.indexOf(t) < 0)
              throw new Error("gl-texture2d: Unknown filter mode " + t);
            return e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, t),
              this._magFilter = t
          }
        },
        mipSamples: {
          get: function () {
            return this._anisoSamples
          },
          set: function (t) {
            var e = this._anisoSamples;
            if (this._anisoSamples = 0 | Math.max(t, 1),
              e !== this._anisoSamples) {
              var n = this.gl.getExtension("EXT_texture_filter_anisotropic");
              n && this.gl.texParameterf(this.gl.TEXTURE_2D, n.TEXTURE_MAX_ANISOTROPY_EXT, this._anisoSamples)
            }
            return this._anisoSamples
          }
        },
        wrapS: {
          get: function () {
            return this._wrapS
          },
          set: function (t) {
            if (this.bind(),
              y.indexOf(t) < 0)
              throw new Error("gl-texture2d: Unknown wrap mode " + t);
            return this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, t),
              this._wrapS = t
          }
        },
        wrapT: {
          get: function () {
            return this._wrapT
          },
          set: function (t) {
            if (this.bind(),
              y.indexOf(t) < 0)
              throw new Error("gl-texture2d: Unknown wrap mode " + t);
            return this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, t),
              this._wrapT = t
          }
        },
        wrap: {
          get: function () {
            return this._wrapVector
          },
          set: function (t) {
            if (Array.isArray(t) || (t = [t, t]),
              2 !== t.length)
              throw new Error("gl-texture2d: Must specify wrap mode for rows and columns");
            for (var e = 0; e < 2; ++e)
              if (y.indexOf(t[e]) < 0)
                throw new Error("gl-texture2d: Unknown wrap mode " + t);
            this._wrapS = t[0],
              this._wrapT = t[1];
            var n = this.gl;
            return this.bind(),
              n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, this._wrapS),
              n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, this._wrapT),
              t
          }
        },
        shape: {
          get: function () {
            return this._shapeVector
          },
          set: function (t) {
            if (Array.isArray(t)) {
              if (2 !== t.length)
                throw new Error("gl-texture2d: Invalid texture shape")
            } else
              t = [0 | t, 0 | t];
            return i(this, 0 | t[0], 0 | t[1]),
              [0 | t[0], 0 | t[1]]
          }
        },
        width: {
          get: function () {
            return this._shape[0]
          },
          set: function (t) {
            return t = 0 | t,
              i(this, t, this._shape[1]),
              t
          }
        },
        height: {
          get: function () {
            return this._shape[1]
          },
          set: function (t) {
            return t = 0 | t,
              i(this, this._shape[0], t),
              t
          }
        }
      }),
        _.bind = function (t) {
          var e = this.gl;
          return void 0 !== t && e.activeTexture(e.TEXTURE0 + (0 | t)),
            e.bindTexture(e.TEXTURE_2D, this.handle),
            void 0 !== t ? 0 | t : e.getParameter(e.ACTIVE_TEXTURE) - e.TEXTURE0
        }
        ,
        _.dispose = function () {
          this.gl.deleteTexture(this.handle)
        }
        ,
        _.generateMipmap = function () {
          this.bind(),
            this.gl.generateMipmap(this.gl.TEXTURE_2D);
          for (var t = Math.min(this._shape[0], this._shape[1]), e = 0; t > 0; ++e,
            t >>>= 1)
            this._mipLevels.indexOf(e) < 0 && this._mipLevels.push(e)
        }
        ,
        _.setPixels = function (t, e, n, r) {
          var i = this.gl;
          if (this.bind(),
              Array.isArray(e) ? (r = n,
                n = 0 | e[1],
                e = 0 | e[0]) : (e = e || 0,
                n = n || 0),
              r = r || 0,
            t instanceof HTMLCanvasElement || t instanceof ImageData || t instanceof HTMLImageElement || t instanceof HTMLVideoElement) {
            var o = this._mipLevels.indexOf(r) < 0;
            o ? (i.texImage2D(i.TEXTURE_2D, 0, this.format, this.format, this.type, t),
              this._mipLevels.push(r)) : i.texSubImage2D(i.TEXTURE_2D, r, e, n, this.format, this.type, t)
          } else {
            if (!(t.shape && t.stride && t.data))
              throw new Error("gl-texture2d: Unsupported data type");
            if (t.shape.length < 2 || e + t.shape[1] > this._shape[1] >>> r || n + t.shape[0] > this._shape[0] >>> r || e < 0 || n < 0)
              throw new Error("gl-texture2d: Texture dimensions are out of bounds");
            s(i, e, n, r, this.format, this.type, this._mipLevels, t)
          }
        }
        ,
        n.exports
    }),
    System.registerDynamic("6a", ["88"], !0, function (t, e, n) {
      return n.exports = t("88"),
        n.exports
    }),
    System.registerDynamic("89", ["6a"], !0, function (t, e, n) {
      "use strict";
      function r(t, e) {
        e.forEach(function (e) {
          e.tex = o(t, e.img),
            e.sprites.filter(function (t) {
              return !!t
            }).forEach(function (t) {
              return t.tex = e.tex
            })
        })
      }

      function i(t) {
        t.forEach(function (t) {
          t.tex && (t.tex.dispose(),
            t.tex = null ),
            t.sprites.forEach(function (t) {
              return t.tex = null
            })
        })
      }

      var o = t("6a");
      return e.createTexturesForSpriteSheets = r,
        e.releaseTexturesForSpriteSheets = i,
        n.exports
    }),
    System.registerDynamic("8a", [], !0, function (t, e, n) {
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
          d = null ,
            m = !1,
            a(t)
        }
      }

      function l(t, e) {
        this.fun = t,
          this.array = e
      }

      function c() {
      }

      var f, p, h = n.exports = {};
      !function () {
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
      var d, v = [], m = !1, g = -1;
      return h.nextTick = function (t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var n = 1; n < arguments.length; n++)
            e[n - 1] = arguments[n];
        v.push(new l(t, e)),
        1 !== v.length || m || o(u)
      }
        ,
        l.prototype.run = function () {
          this.fun.apply(null, this.array)
        }
        ,
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
        h.binding = function (t) {
          throw new Error("process.binding is not supported")
        }
        ,
        h.cwd = function () {
          return "/"
        }
        ,
        h.chdir = function (t) {
          throw new Error("process.chdir is not supported")
        }
        ,
        h.umask = function () {
          return 0
        }
        ,
        n.exports
    }),
    System.registerDynamic("8b", ["8a"], !0, function (t, e, n) {
      return n.exports = t("8a"),
        n.exports
    }),
    System.registerDynamic("8c", ["8b"], !0, function (e, n, r) {
      return r.exports = System._nodeRequire ? process : e("8b"),
        r.exports
    }),
    System.registerDynamic("75", ["8c"], !0, function (t, e, n) {
      return n.exports = t("8c"),
        n.exports
    }),
    System.registerDynamic("8d", ["8e", "8f", "75"], !0, function (t, e, n) {
      return function (e) {
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
              return [[t, e]];
            var n = [];
            for (var r in e) {
              var i = e[r]
                , o = t;
              o += parseInt(r) + "" === r ? "[" + r + "]" : "." + r,
                "object" == typeof i ? n.push.apply(n, c(o, i)) : n.push([o, i])
            }
            return n
          }

          function f(e) {
            for (var r = ["return function updateProperty(obj){"], i = c("", e), a = 0; a < i.length; ++a) {
              var s = i[a]
                , u = s[0]
                , f = s[1];
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

        var a = t("8e")
          , s = t("8f");
        n.exports = o
      }(t("75")),
        n.exports
    }),
    System.registerDynamic("90", ["8f"], !0, function (t, e, n) {
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
        var f = Function.apply(null, u)
          , p = new r(t, e, n, i, o, f);
        Object.defineProperty(a, s, {
          set: function (e) {
            return t.disableVertexAttribArray(i[n]),
              f(t, i[n], e),
              e
          },
          get: function () {
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
          set: function (t) {
            if (Array.isArray(t))
              for (var e = 0; e < o; ++e)
                l[e].location = t[e];
            else
              for (var e = 0; e < o; ++e)
                l[e].location = t + e;
            return t
          },
          get: function () {
            for (var t = new Array(o), e = 0; e < o; ++e)
              t[e] = r[n[e]];
            return t
          },
          enumerable: !0
        }),
          u.pointer = function (e, i, a, s) {
            e = e || t.FLOAT,
              i = !!i,
              a = a || o * o,
              s = s || 0;
            for (var u = 0; u < o; ++u) {
              var l = r[n[u]];
              t.vertexAttribPointer(l, o, e, i, a, s + u * o),
                t.enableVertexAttribArray(l)
            }
          }
        ;
        var f = new Array(o)
          , p = t["vertexAttrib" + o + "fv"];
        Object.defineProperty(a, s, {
          set: function (e) {
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
          get: function () {
            return u
          },
          enumerable: !0
        })
      }

      function a(t, e, n, r) {
        for (var a = {}, u = 0, l = n.length; u < l; ++u) {
          var c = n[u]
            , f = c.name
            , p = c.type
            , h = c.locations;
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
      var s = t("8f")
        , u = r.prototype;
      return u.pointer = function (t, e, n, r) {
        var i = this
          , o = i._gl
          , a = i._locations[i._index];
        o.vertexAttribPointer(a, i._dimension, t || o.FLOAT, !!e, n || 0, r || 0),
          o.enableVertexAttribArray(a)
      }
        ,
        u.set = function (t, e, n, r) {
          return this._constFunc(this._locations[this._index], t, e, n, r)
        }
        ,
        Object.defineProperty(u, "location", {
          get: function () {
            return this._locations[this._index]
          },
          set: function (t) {
            return t !== this._locations[this._index] && (this._locations[this._index] = 0 | t,
              this._wrapper.program = null ),
            0 | t
          }
        }),
        n.exports
    }),
    System.registerDynamic("8e", [], !0, function (t, e, n) {
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
    }),
    System.registerDynamic("91", [], !0, function (t, e, n) {
      var r;
      return function (t) {
        function n() {
          var t = arguments[0]
            , e = n.cache;
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
        n.format = function (t, e) {
          var r, s, u, l, c, f, p, h = 1, d = t.length, v = "", m = [], g = !0, y = "";
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
        }
          ,
          n.cache = {},
          n.parse = function (t) {
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
                  var o = []
                    , s = n[2]
                    , u = [];
                  if (null === (u = a.key.exec(s)))
                    throw new SyntaxError("[sprintf] failed to parse named argument key");
                  for (o[o.length] = u[1]; "" !== (s = s.substring(u[0].length));)
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
          }
        ;
        var s = function (t, e, r) {
            return r = (e || []).slice(0),
              r.splice(0, 0, t),
              n.apply(null, r)
          }
          ;
        "undefined" != typeof e ? (e.sprintf = n,
          e.vsprintf = s) : (t.sprintf = n,
          t.vsprintf = s,
        "function" == typeof r && r.amd && r(function () {
          return {
            sprintf: n,
            vsprintf: s
          }
        }))
      }("undefined" == typeof window ? this : window),
        n.exports
    }),
    System.registerDynamic("92", ["91"], !0, function (t, e, n) {
      return n.exports = t("91"),
        n.exports
    }),
    System.registerDynamic("93", [], !0, function (t, e, n) {
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
    }),
    System.registerDynamic("94", ["93"], !0, function (t, e, n) {
      var r = t("93");
      return n.exports = function (t) {
        return r[t]
      }
        ,
        n.exports
    }),
    System.registerDynamic("95", [], !0, function (t, e, n) {
      return n.exports = ["<<=", ">>=", "++", "--", "<<", ">>", "<=", ">=", "==", "!=", "&&", "||", "+=", "-=", "*=", "/=", "%=", "&=", "^^", "^=", "|=", "(", ")", "[", "]", ".", "!", "~", "*", "/", "%", "+", "-", "<", ">", "&", "^", "|", "?", ":", "=", ",", ";", "{", "}"],
        n.exports
    }),
    System.registerDynamic("96", [], !0, function (t, e, n) {
      return n.exports = ["precision", "highp", "mediump", "lowp", "attribute", "const", "uniform", "varying", "break", "continue", "do", "for", "while", "if", "else", "in", "out", "inout", "float", "int", "void", "bool", "true", "false", "discard", "return", "mat2", "mat3", "mat4", "vec2", "vec3", "vec4", "ivec2", "ivec3", "ivec4", "bvec2", "bvec3", "bvec4", "sampler1D", "sampler2D", "sampler3D", "samplerCube", "sampler1DShadow", "sampler2DShadow", "struct", "asm", "class", "union", "enum", "typedef", "template", "this", "packed", "goto", "switch", "default", "inline", "noinline", "volatile", "public", "static", "extern", "external", "interface", "long", "short", "double", "half", "fixed", "unsigned", "input", "output", "hvec2", "hvec3", "hvec4", "dvec2", "dvec3", "dvec4", "fvec2", "fvec3", "fvec4", "sampler2DRect", "sampler3DRect", "sampler2DRectShadow", "sizeof", "cast", "namespace", "using"],
        n.exports
    }),
    System.registerDynamic("97", ["96"], !0, function (t, e, n) {
      var r = t("96");
      return n.exports = r.slice().concat(["layout", "centroid", "smooth", "case", "mat2x2", "mat2x3", "mat2x4", "mat3x2", "mat3x3", "mat3x4", "mat4x2", "mat4x3", "mat4x4", "uint", "uvec2", "uvec3", "uvec4", "samplerCubeShadow", "sampler2DArray", "sampler2DArrayShadow", "isampler2D", "isampler3D", "isamplerCube", "isampler2DArray", "usampler2D", "usampler3D", "usamplerCube", "usampler2DArray", "coherent", "restrict", "readonly", "writeonly", "resource", "atomic_uint", "noperspective", "patch", "sample", "subroutine", "common", "partition", "active", "filter", "image1D", "image2D", "image3D", "imageCube", "iimage1D", "iimage2D", "iimage3D", "iimageCube", "uimage1D", "uimage2D", "uimage3D", "uimageCube", "image1DArray", "image2DArray", "iimage1DArray", "iimage2DArray", "uimage1DArray", "uimage2DArray", "image1DShadow", "image2DShadow", "image1DArrayShadow", "image2DArrayShadow", "imageBuffer", "iimageBuffer", "uimageBuffer", "sampler1DArray", "sampler1DArrayShadow", "isampler1D", "isampler1DArray", "usampler1D", "usampler1DArray", "isampler2DRect", "usampler2DRect", "samplerBuffer", "isamplerBuffer", "usamplerBuffer", "sampler2DMS", "isampler2DMS", "usampler2DMS", "sampler2DMSArray", "isampler2DMSArray", "usampler2DMSArray"]),
        n.exports
    }),
    System.registerDynamic("98", [], !0, function (t, e, n) {
      return n.exports = ["abs", "acos", "all", "any", "asin", "atan", "ceil", "clamp", "cos", "cross", "dFdx", "dFdy", "degrees", "distance", "dot", "equal", "exp", "exp2", "faceforward", "floor", "fract", "gl_BackColor", "gl_BackLightModelProduct", "gl_BackLightProduct", "gl_BackMaterial", "gl_BackSecondaryColor", "gl_ClipPlane", "gl_ClipVertex", "gl_Color", "gl_DepthRange", "gl_DepthRangeParameters", "gl_EyePlaneQ", "gl_EyePlaneR", "gl_EyePlaneS", "gl_EyePlaneT", "gl_Fog", "gl_FogCoord", "gl_FogFragCoord", "gl_FogParameters", "gl_FragColor", "gl_FragCoord", "gl_FragData", "gl_FragDepth", "gl_FragDepthEXT", "gl_FrontColor", "gl_FrontFacing", "gl_FrontLightModelProduct", "gl_FrontLightProduct", "gl_FrontMaterial", "gl_FrontSecondaryColor", "gl_LightModel", "gl_LightModelParameters", "gl_LightModelProducts", "gl_LightProducts", "gl_LightSource", "gl_LightSourceParameters", "gl_MaterialParameters", "gl_MaxClipPlanes", "gl_MaxCombinedTextureImageUnits", "gl_MaxDrawBuffers", "gl_MaxFragmentUniformComponents", "gl_MaxLights", "gl_MaxTextureCoords", "gl_MaxTextureImageUnits", "gl_MaxTextureUnits", "gl_MaxVaryingFloats", "gl_MaxVertexAttribs", "gl_MaxVertexTextureImageUnits", "gl_MaxVertexUniformComponents", "gl_ModelViewMatrix", "gl_ModelViewMatrixInverse", "gl_ModelViewMatrixInverseTranspose", "gl_ModelViewMatrixTranspose", "gl_ModelViewProjectionMatrix", "gl_ModelViewProjectionMatrixInverse", "gl_ModelViewProjectionMatrixInverseTranspose", "gl_ModelViewProjectionMatrixTranspose", "gl_MultiTexCoord0", "gl_MultiTexCoord1", "gl_MultiTexCoord2", "gl_MultiTexCoord3", "gl_MultiTexCoord4", "gl_MultiTexCoord5", "gl_MultiTexCoord6", "gl_MultiTexCoord7", "gl_Normal", "gl_NormalMatrix", "gl_NormalScale", "gl_ObjectPlaneQ", "gl_ObjectPlaneR", "gl_ObjectPlaneS", "gl_ObjectPlaneT", "gl_Point", "gl_PointCoord", "gl_PointParameters", "gl_PointSize", "gl_Position", "gl_ProjectionMatrix", "gl_ProjectionMatrixInverse", "gl_ProjectionMatrixInverseTranspose", "gl_ProjectionMatrixTranspose", "gl_SecondaryColor", "gl_TexCoord", "gl_TextureEnvColor", "gl_TextureMatrix", "gl_TextureMatrixInverse", "gl_TextureMatrixInverseTranspose", "gl_TextureMatrixTranspose", "gl_Vertex", "greaterThan", "greaterThanEqual", "inversesqrt", "length", "lessThan", "lessThanEqual", "log", "log2", "matrixCompMult", "max", "min", "mix", "mod", "normalize", "not", "notEqual", "pow", "radians", "reflect", "refract", "sign", "sin", "smoothstep", "sqrt", "step", "tan", "texture2D", "texture2DLod", "texture2DProj", "texture2DProjLod", "textureCube", "textureCubeLod", "texture2DLodEXT", "texture2DProjLodEXT", "textureCubeLodEXT", "texture2DGradEXT", "texture2DProjGradEXT", "textureCubeGradEXT"],
        n.exports
    }),
    System.registerDynamic("99", ["98"], !0, function (t, e, n) {
      var r = t("98");
      return r = r.slice().filter(function (t) {
        return !/^(gl\_|texture)/.test(t)
      }),
        n.exports = r.concat(["gl_VertexID", "gl_InstanceID", "gl_Position", "gl_PointSize", "gl_FragCoord", "gl_FrontFacing", "gl_FragDepth", "gl_PointCoord", "gl_MaxVertexAttribs", "gl_MaxVertexUniformVectors", "gl_MaxVertexOutputVectors", "gl_MaxFragmentInputVectors", "gl_MaxVertexTextureImageUnits", "gl_MaxCombinedTextureImageUnits", "gl_MaxTextureImageUnits", "gl_MaxFragmentUniformVectors", "gl_MaxDrawBuffers", "gl_MinProgramTexelOffset", "gl_MaxProgramTexelOffset", "gl_DepthRangeParameters", "gl_DepthRange", "trunc", "round", "roundEven", "isnan", "isinf", "floatBitsToInt", "floatBitsToUint", "intBitsToFloat", "uintBitsToFloat", "packSnorm2x16", "unpackSnorm2x16", "packUnorm2x16", "unpackUnorm2x16", "packHalf2x16", "unpackHalf2x16", "outerProduct", "transpose", "determinant", "inverse", "texture", "textureSize", "textureProj", "textureLod", "textureOffset", "texelFetch", "texelFetchOffset", "textureProjOffset", "textureLodOffset", "textureProjLod", "textureProjLodOffset", "textureGrad", "textureGradOffset", "textureProjGrad", "textureProjGradOffset"]),
        n.exports
    }),
    System.registerDynamic("9a", ["96", "95", "98", "97", "99"], !0, function (t, e, n) {
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
            W += t,
            j = W.length;
          for (var e; F = W[N],
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
              switch (W[e]) {
                case "\n":
                  z = 0,
                    ++H;
                  break;
                default:
                  ++z
              }
          }
          return L += N,
            W = W.slice(N),
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
              N) : (q = /\d/.test(F),
              G = /[^\w_]/.test(F),
              Y = L + N,
              U = q ? v : G ? d : c,
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
          return "\n" === F && "\\" !== P ? (e(B.join("")),
            U = l,
            N) : (B.push(F),
            P = F,
          N + 1)
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
          for (var n, r, i = 0; ;) {
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

        var F, P, j, N = 0, L = 0, U = l, B = [], V = [], H = 1, z = 0, Y = 0, q = !1, G = !1, W = "";
        t = t || {};
        var X = a
          , Z = i;
        return "300 es" === t.version && (X = u,
          Z = s),
          function (t) {
            return V = [],
              null !== t ? n(t) : r()
          }
      }

      n.exports = r;
      var i = t("96")
        , o = t("95")
        , a = t("98")
        , s = t("97")
        , u = t("99")
        , l = 999
        , c = 9999
        , f = 0
        , p = 1
        , h = 2
        , d = 3
        , v = 4
        , m = 5
        , g = 6
        , y = 7
        , b = 8
        , _ = 9
        , w = 10
        , x = 11
        , E = ["block-comment", "line-comment", "preprocessor", "operator", "integer", "float", "ident", "builtin", "keyword", "whitespace", "eof", "integer"];
      return n.exports
    }),
    System.registerDynamic("9b", ["9a"], !0, function (t, e, n) {
      function r(t, e) {
        var n = i(e)
          , r = [];
        return r = r.concat(n(t)),
          r = r.concat(n(null))
      }

      var i = t("9a");
      return n.exports = r,
        n.exports
    }),
    System.registerDynamic("9c", ["9b"], !0, function (t, e, n) {
      return n.exports = t("9b"),
        n.exports
    }),
    System.registerDynamic("9d", [], !0, function (t, e, n) {
      return n.exports = function (t) {
        return atob(t)
      }
        ,
        n.exports
    }),
    System.registerDynamic("9e", ["9d"], !0, function (t, e, n) {
      return n.exports = t("9d"),
        n.exports
    }),
    System.registerDynamic("9f", ["9c", "9e"], !0, function (t, e, n) {
      function r(t) {
        for (var e = Array.isArray(t) ? t : i(t), n = 0; n < e.length; n++) {
          var r = e[n];
          if ("preprocessor" === r.type) {
            var a = r.data.match(/\#define\s+SHADER_NAME(_B64)?\s+(.+)$/);
            if (a && a[2]) {
              var s = a[1]
                , u = a[2];
              return (s ? o(u) : u).trim()
            }
          }
        }
      }

      var i = t("9c")
        , o = t("9e");
      return n.exports = r,
        n.exports
    }),
    System.registerDynamic("a0", ["9f"], !0, function (t, e, n) {
      return n.exports = t("9f"),
        n.exports
    }),
    System.registerDynamic("a1", [], !0, function (t, e, n) {
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
    }),
    System.registerDynamic("a2", ["a1"], !0, function (t, e, n) {
      return n.exports = t("a1"),
        n.exports
    }),
    System.registerDynamic("a3", ["a2"], !0, function (t, e, n) {
      "use strict";
      var r = t("a2");
      return n.exports = function (t, e, n) {
        return n = "undefined" != typeof n ? n + "" : " ",
        r(n, e) + t
      }
        ,
        n.exports
    }),
    System.registerDynamic("a4", ["a3"], !0, function (t, e, n) {
      return n.exports = t("a3"),
        n.exports
    }),
    System.registerDynamic("a5", ["a4"], !0, function (t, e, n) {
      function r(t, e, n) {
        e = "number" == typeof e ? e : 1,
          n = n || ": ";
        var r = t.split(/\r?\n/)
          , o = String(r.length + e - 1).length;
        return r.map(function (t, r) {
          var a = r + e
            , s = String(a).length
            , u = i(a, o - s);
          return u + n + t
        }).join("\n")
      }

      var i = t("a4");
      return n.exports = r,
        n.exports
    }),
    System.registerDynamic("a6", ["a5"], !0, function (t, e, n) {
      return n.exports = t("a5"),
        n.exports
    }),
    System.registerDynamic("a7", ["92", "94", "a0", "a6"], !0, function (t, e, n) {
      function r(t, e, n) {
        "use strict";
        var r = a(e) || "of unknown name (see npm glsl-shader-name)"
          , u = "unknown type";
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

      var i = t("92").sprintf
        , o = t("94")
        , a = t("a0")
        , s = t("a6");
      return n.exports = r,
        n.exports
    }),
    System.registerDynamic("a8", ["a7"], !0, function (t, e, n) {
      return n.exports = t("a7"),
        n.exports
    }),
    System.registerDynamic("a9", [], !0, function (t, e, n) {
      function r(t, e) {
        var n = {
          identity: e
        }
          , r = t.valueOf;
        return Object.defineProperty(t, "valueOf", {
          value: function (t) {
            return t !== e ? r.apply(this, arguments) : n
          },
          writable: !0
        }),
          n
      }

      return n.exports = r,
        n.exports
    }),
    System.registerDynamic("aa", ["a9"], !0, function (t, e, n) {
      function r() {
        var t = {};
        return function (e) {
          if (("object" != typeof e || null === e) && "function" != typeof e)
            throw new Error("Weakmap-shim: Key must be object");
          var n = e.valueOf(t);
          return n && n.identity === t ? n : i(e, t)
        }
      }

      var i = t("a9");
      return n.exports = r,
        n.exports
    }),
    System.registerDynamic("ab", ["aa"], !0, function (t, e, n) {
      function r() {
        var t = i();
        return {
          get: function (e, n) {
            var r = t(e);
            return r.hasOwnProperty("value") ? r.value : n
          },
          set: function (e, n) {
            t(e).value = n
          },
          has: function (e) {
            return "value" in t(e)
          },
          delete: function (e) {
            return delete t(e).value
          }
        }
      }

      var i = t("aa");
      return n.exports = r,
        n.exports
    }),
    System.registerDynamic("ac", ["ab"], !0, function (t, e, n) {
      return n.exports = t("ab"),
        n.exports
    }),
    System.registerDynamic("ad", ["8f", "a8", "ac"], !0, function (t, e, n) {
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
            t.compileShader(r),
            !t.getShaderParameter(r, t.COMPILE_STATUS)) {
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
        if (t.linkProgram(o),
            !t.getProgramParameter(o, t.LINK_STATUS)) {
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
      var c = t("8f")
        , f = t("a8")
        , p = "undefined" == typeof WeakMap ? t("ac") : WeakMap
        , h = new p
        , d = 0;
      r.prototype.dispose = function () {
        if (0 === --this.count) {
          for (var t = this.cache, e = t.gl, n = this.programs, r = 0, i = n.length; r < i; ++r) {
            var o = t.programs[n[r]];
            o && (delete t.programs[r],
              e.deleteProgram(o))
          }
          e.deleteShader(this.shader),
            delete t.shaders[this.type === e.FRAGMENT_SHADER | 0][this.src]
        }
      }
      ;
      var v = i.prototype;
      return v.getShaderReference = function (t, e) {
        var n = this.gl
          , i = this.shaders[t === n.FRAGMENT_SHADER | 0]
          , a = i[e];
        if (a && n.isShader(a.shader))
          a.count += 1;
        else {
          var s = o(n, t, e);
          a = i[e] = new r((d++), e, t, s, [], 1, this)
        }
        return a
      }
        ,
        v.getProgram = function (t, e, n, r) {
          var i = [t.id, e.id, n.join(":"), r.join(":")].join("@")
            , o = this.programs[i];
          return o && this.gl.isProgram(o) || (this.programs[i] = o = a(this.gl, t.shader, e.shader, n, r),
            t.programs.push(i),
            e.programs.push(i)),
            o
        }
        ,
        n.exports
    }),
    System.registerDynamic("ae", [], !0, function (t, e, n) {
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
      }
        , s = null;
      return n.exports
    }),
    System.registerDynamic("8f", [], !0, function (t, e, n) {
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
    }),
    System.registerDynamic("af", ["8d", "90", "8e", "ad", "ae", "8f"], !0, function (t, e, n) {
      "use strict";
      function r(t) {
        this.gl = t,
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

      var a = t("8d")
        , s = t("90")
        , u = t("8e")
        , l = t("ad")
        , c = t("ae")
        , f = t("8f")
        , p = r.prototype;
      return p.bind = function () {
        this.program || this._relink(),
          this.gl.useProgram(this.program)
      }
        ,
        p.dispose = function () {
          this._fref && this._fref.dispose(),
          this._vref && this._vref.dispose(),
            this.attributes = this.types = this.vertShader = this.fragShader = this.program = this._relink = this._fref = this._vref = null
        }
        ,
        p.update = function (t, e, n, r) {
          function o() {
            h.program = l.program(d, h._vref, h._fref, _, w);
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
          var h = this
            , d = h.gl
            , v = h._vref;
          h._vref = l.shader(d, d.VERTEX_SHADER, t),
          v && v.dispose(),
            h.vertShader = h._vref.shader;
          var m = this._fref;
          if (h._fref = l.shader(d, d.FRAGMENT_SHADER, e),
            m && m.dispose(),
              h.fragShader = h._fref.shader,
            !n || !r) {
            var g = d.createProgram();
            if (d.attachShader(g, h.fragShader),
                d.attachShader(g, h.vertShader),
                d.linkProgram(g),
                !d.getProgramParameter(g, d.LINK_STATUS)) {
              var y = d.getProgramInfoLog(g);
              throw new f(y, "Error linking program:" + y)
            }
            n = n || c.uniforms(d, g),
              r = r || c.attributes(d, g),
              d.deleteProgram(g)
          }
          r = r.slice(),
            r.sort(i);
          for (var b = [], _ = [], w = [], x = 0; x < r.length; ++x) {
            var E = r[x];
            if (E.type.indexOf("mat") >= 0) {
              for (var $ = 0 | E.type.charAt(E.type.length - 1), S = new Array($), T = 0; T < $; ++T)
                S[T] = w.length,
                  _.push(E.name + "[" + T + "]"),
                  "number" == typeof E.location ? w.push(E.location + T) : Array.isArray(E.location) && E.location.length === $ && "number" == typeof E.location[T] ? w.push(0 | E.location[T]) : w.push(-1);
              b.push({
                name: E.name,
                type: E.type,
                locations: S
              })
            } else
              b.push({
                name: E.name,
                type: E.type,
                locations: [w.length]
              }),
                _.push(E.name),
                "number" == typeof E.location ? w.push(0 | E.location) : w.push(-1)
          }
          for (var k = 0, x = 0; x < w.length; ++x)
            if (w[x] < 0) {
              for (; w.indexOf(k) >= 0;)
                k += 1;
              w[x] = k
            }
          var M = new Array(n.length);
          o(),
            h._relink = o,
            h.types = {
              uniforms: u(n),
              attributes: u(r)
            },
            h.attributes = s(d, h, b, w),
            Object.defineProperty(h, "uniforms", a(d, h, n, M))
        }
        ,
        n.exports = o,
        n.exports
    }),
    System.registerDynamic("b0", ["af"], !0, function (t, e, n) {
      return n.exports = t("af"),
        n.exports
    }),
    System.registerDynamic("b1", ["b2"], !0, function (t, e, n) {
      var r = t("b2")
        , i = {};
      return i.create = function () {
        var t = new r.ARRAY_TYPE(4);
        return t[0] = 1,
          t[1] = 0,
          t[2] = 0,
          t[3] = 1,
          t
      }
        ,
        i.clone = function (t) {
          var e = new r.ARRAY_TYPE(4);
          return e[0] = t[0],
            e[1] = t[1],
            e[2] = t[2],
            e[3] = t[3],
            e
        }
        ,
        i.copy = function (t, e) {
          return t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t
        }
        ,
        i.identity = function (t) {
          return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 1,
            t
        }
        ,
        i.fromValues = function (t, e, n, i) {
          var o = new r.ARRAY_TYPE(4);
          return o[0] = t,
            o[1] = e,
            o[2] = n,
            o[3] = i,
            o
        }
        ,
        i.set = function (t, e, n, r, i) {
          return t[0] = e,
            t[1] = n,
            t[2] = r,
            t[3] = i,
            t
        }
        ,
        i.transpose = function (t, e) {
          if (t === e) {
            var n = e[1];
            t[1] = e[2],
              t[2] = n
          } else
            t[0] = e[0],
              t[1] = e[2],
              t[2] = e[1],
              t[3] = e[3];
          return t
        }
        ,
        i.invert = function (t, e) {
          var n = e[0]
            , r = e[1]
            , i = e[2]
            , o = e[3]
            , a = n * o - i * r;
          return a ? (a = 1 / a,
            t[0] = o * a,
            t[1] = -r * a,
            t[2] = -i * a,
            t[3] = n * a,
            t) : null
        }
        ,
        i.adjoint = function (t, e) {
          var n = e[0];
          return t[0] = e[3],
            t[1] = -e[1],
            t[2] = -e[2],
            t[3] = n,
            t
        }
        ,
        i.determinant = function (t) {
          return t[0] * t[3] - t[2] * t[1]
        }
        ,
        i.multiply = function (t, e, n) {
          var r = e[0]
            , i = e[1]
            , o = e[2]
            , a = e[3]
            , s = n[0]
            , u = n[1]
            , l = n[2]
            , c = n[3];
          return t[0] = r * s + o * u,
            t[1] = i * s + a * u,
            t[2] = r * l + o * c,
            t[3] = i * l + a * c,
            t
        }
        ,
        i.mul = i.multiply,
        i.rotate = function (t, e, n) {
          var r = e[0]
            , i = e[1]
            , o = e[2]
            , a = e[3]
            , s = Math.sin(n)
            , u = Math.cos(n);
          return t[0] = r * u + o * s,
            t[1] = i * u + a * s,
            t[2] = r * -s + o * u,
            t[3] = i * -s + a * u,
            t
        }
        ,
        i.scale = function (t, e, n) {
          var r = e[0]
            , i = e[1]
            , o = e[2]
            , a = e[3]
            , s = n[0]
            , u = n[1];
          return t[0] = r * s,
            t[1] = i * s,
            t[2] = o * u,
            t[3] = a * u,
            t
        }
        ,
        i.fromRotation = function (t, e) {
          var n = Math.sin(e)
            , r = Math.cos(e);
          return t[0] = r,
            t[1] = n,
            t[2] = -n,
            t[3] = r,
            t
        }
        ,
        i.fromScaling = function (t, e) {
          return t[0] = e[0],
            t[1] = 0,
            t[2] = 0,
            t[3] = e[1],
            t
        }
        ,
        i.str = function (t) {
          return "mat2(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")"
        }
        ,
        i.frob = function (t) {
          return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2))
        }
        ,
        i.LDU = function (t, e, n, r) {
          return t[2] = r[2] / r[0],
            n[0] = r[0],
            n[1] = r[1],
            n[3] = r[3] - t[2] * n[1],
            [t, e, n]
        }
        ,
        i.add = function (t, e, n) {
          return t[0] = e[0] + n[0],
            t[1] = e[1] + n[1],
            t[2] = e[2] + n[2],
            t[3] = e[3] + n[3],
            t
        }
        ,
        i.subtract = function (t, e, n) {
          return t[0] = e[0] - n[0],
            t[1] = e[1] - n[1],
            t[2] = e[2] - n[2],
            t[3] = e[3] - n[3],
            t
        }
        ,
        i.sub = i.subtract,
        i.exactEquals = function (t, e) {
          return t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3]
        }
        ,
        i.equals = function (t, e) {
          var n = t[0]
            , i = t[1]
            , o = t[2]
            , a = t[3]
            , s = e[0]
            , u = e[1]
            , l = e[2]
            , c = e[3];
          return Math.abs(n - s) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(s)) && Math.abs(i - u) <= r.EPSILON * Math.max(1, Math.abs(i), Math.abs(u)) && Math.abs(o - l) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(l)) && Math.abs(a - c) <= r.EPSILON * Math.max(1, Math.abs(a), Math.abs(c))
        }
        ,
        i.multiplyScalar = function (t, e, n) {
          return t[0] = e[0] * n,
            t[1] = e[1] * n,
            t[2] = e[2] * n,
            t[3] = e[3] * n,
            t
        }
        ,
        i.multiplyScalarAndAdd = function (t, e, n, r) {
          return t[0] = e[0] + n[0] * r,
            t[1] = e[1] + n[1] * r,
            t[2] = e[2] + n[2] * r,
            t[3] = e[3] + n[3] * r,
            t
        }
        ,
        n.exports = i,
        n.exports
    }),
    System.registerDynamic("b3", ["b2"], !0, function (t, e, n) {
      var r = t("b2")
        , i = {};
      return i.create = function () {
        var t = new r.ARRAY_TYPE(6);
        return t[0] = 1,
          t[1] = 0,
          t[2] = 0,
          t[3] = 1,
          t[4] = 0,
          t[5] = 0,
          t
      }
        ,
        i.clone = function (t) {
          var e = new r.ARRAY_TYPE(6);
          return e[0] = t[0],
            e[1] = t[1],
            e[2] = t[2],
            e[3] = t[3],
            e[4] = t[4],
            e[5] = t[5],
            e
        }
        ,
        i.copy = function (t, e) {
          return t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t[4] = e[4],
            t[5] = e[5],
            t
        }
        ,
        i.identity = function (t) {
          return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 1,
            t[4] = 0,
            t[5] = 0,
            t
        }
        ,
        i.fromValues = function (t, e, n, i, o, a) {
          var s = new r.ARRAY_TYPE(6);
          return s[0] = t,
            s[1] = e,
            s[2] = n,
            s[3] = i,
            s[4] = o,
            s[5] = a,
            s
        }
        ,
        i.set = function (t, e, n, r, i, o, a) {
          return t[0] = e,
            t[1] = n,
            t[2] = r,
            t[3] = i,
            t[4] = o,
            t[5] = a,
            t
        }
        ,
        i.invert = function (t, e) {
          var n = e[0]
            , r = e[1]
            , i = e[2]
            , o = e[3]
            , a = e[4]
            , s = e[5]
            , u = n * o - r * i;
          return u ? (u = 1 / u,
            t[0] = o * u,
            t[1] = -r * u,
            t[2] = -i * u,
            t[3] = n * u,
            t[4] = (i * s - o * a) * u,
            t[5] = (r * a - n * s) * u,
            t) : null
        }
        ,
        i.determinant = function (t) {
          return t[0] * t[3] - t[1] * t[2]
        }
        ,
        i.multiply = function (t, e, n) {
          var r = e[0]
            , i = e[1]
            , o = e[2]
            , a = e[3]
            , s = e[4]
            , u = e[5]
            , l = n[0]
            , c = n[1]
            , f = n[2]
            , p = n[3]
            , h = n[4]
            , d = n[5];
          return t[0] = r * l + o * c,
            t[1] = i * l + a * c,
            t[2] = r * f + o * p,
            t[3] = i * f + a * p,
            t[4] = r * h + o * d + s,
            t[5] = i * h + a * d + u,
            t
        }
        ,
        i.mul = i.multiply,
        i.rotate = function (t, e, n) {
          var r = e[0]
            , i = e[1]
            , o = e[2]
            , a = e[3]
            , s = e[4]
            , u = e[5]
            , l = Math.sin(n)
            , c = Math.cos(n);
          return t[0] = r * c + o * l,
            t[1] = i * c + a * l,
            t[2] = r * -l + o * c,
            t[3] = i * -l + a * c,
            t[4] = s,
            t[5] = u,
            t
        }
        ,
        i.scale = function (t, e, n) {
          var r = e[0]
            , i = e[1]
            , o = e[2]
            , a = e[3]
            , s = e[4]
            , u = e[5]
            , l = n[0]
            , c = n[1];
          return t[0] = r * l,
            t[1] = i * l,
            t[2] = o * c,
            t[3] = a * c,
            t[4] = s,
            t[5] = u,
            t
        }
        ,
        i.translate = function (t, e, n) {
          var r = e[0]
            , i = e[1]
            , o = e[2]
            , a = e[3]
            , s = e[4]
            , u = e[5]
            , l = n[0]
            , c = n[1];
          return t[0] = r,
            t[1] = i,
            t[2] = o,
            t[3] = a,
            t[4] = r * l + o * c + s,
            t[5] = i * l + a * c + u,
            t
        }
        ,
        i.fromRotation = function (t, e) {
          var n = Math.sin(e)
            , r = Math.cos(e);
          return t[0] = r,
            t[1] = n,
            t[2] = -n,
            t[3] = r,
            t[4] = 0,
            t[5] = 0,
            t
        }
        ,
        i.fromScaling = function (t, e) {
          return t[0] = e[0],
            t[1] = 0,
            t[2] = 0,
            t[3] = e[1],
            t[4] = 0,
            t[5] = 0,
            t
        }
        ,
        i.fromTranslation = function (t, e) {
          return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 1,
            t[4] = e[0],
            t[5] = e[1],
            t
        }
        ,
        i.str = function (t) {
          return "mat2d(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ")"
        }
        ,
        i.frob = function (t) {
          return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + 1)
        }
        ,
        i.add = function (t, e, n) {
          return t[0] = e[0] + n[0],
            t[1] = e[1] + n[1],
            t[2] = e[2] + n[2],
            t[3] = e[3] + n[3],
            t[4] = e[4] + n[4],
            t[5] = e[5] + n[5],
            t
        }
        ,
        i.subtract = function (t, e, n) {
          return t[0] = e[0] - n[0],
            t[1] = e[1] - n[1],
            t[2] = e[2] - n[2],
            t[3] = e[3] - n[3],
            t[4] = e[4] - n[4],
            t[5] = e[5] - n[5],
            t
        }
        ,
        i.sub = i.subtract,
        i.multiplyScalar = function (t, e, n) {
          return t[0] = e[0] * n,
            t[1] = e[1] * n,
            t[2] = e[2] * n,
            t[3] = e[3] * n,
            t[4] = e[4] * n,
            t[5] = e[5] * n,
            t
        }
        ,
        i.multiplyScalarAndAdd = function (t, e, n, r) {
          return t[0] = e[0] + n[0] * r,
            t[1] = e[1] + n[1] * r,
            t[2] = e[2] + n[2] * r,
            t[3] = e[3] + n[3] * r,
            t[4] = e[4] + n[4] * r,
            t[5] = e[5] + n[5] * r,
            t
        }
        ,
        i.exactEquals = function (t, e) {
          return t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3] && t[4] === e[4] && t[5] === e[5]
        }
        ,
        i.equals = function (t, e) {
          var n = t[0]
            , i = t[1]
            , o = t[2]
            , a = t[3]
            , s = t[4]
            , u = t[5]
            , l = e[0]
            , c = e[1]
            , f = e[2]
            , p = e[3]
            , h = e[4]
            , d = e[5];
          return Math.abs(n - l) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(l)) && Math.abs(i - c) <= r.EPSILON * Math.max(1, Math.abs(i), Math.abs(c)) && Math.abs(o - f) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(f)) && Math.abs(a - p) <= r.EPSILON * Math.max(1, Math.abs(a), Math.abs(p)) && Math.abs(s - h) <= r.EPSILON * Math.max(1, Math.abs(s), Math.abs(h)) && Math.abs(u - d) <= r.EPSILON * Math.max(1, Math.abs(u), Math.abs(d))
        }
        ,
        n.exports = i,
        n.exports
    }),
    System.registerDynamic("b4", ["b2"], !0, function (t, e, n) {
      var r = t("b2")
        , i = {
        scalar: {},
        SIMD: {}
      };
      return i.create = function () {
        var t = new r.ARRAY_TYPE(16);
        return t[0] = 1,
          t[1] = 0,
          t[2] = 0,
          t[3] = 0,
          t[4] = 0,
          t[5] = 1,
          t[6] = 0,
          t[7] = 0,
          t[8] = 0,
          t[9] = 0,
          t[10] = 1,
          t[11] = 0,
          t[12] = 0,
          t[13] = 0,
          t[14] = 0,
          t[15] = 1,
          t
      }
        ,
        i.clone = function (t) {
          var e = new r.ARRAY_TYPE(16);
          return e[0] = t[0],
            e[1] = t[1],
            e[2] = t[2],
            e[3] = t[3],
            e[4] = t[4],
            e[5] = t[5],
            e[6] = t[6],
            e[7] = t[7],
            e[8] = t[8],
            e[9] = t[9],
            e[10] = t[10],
            e[11] = t[11],
            e[12] = t[12],
            e[13] = t[13],
            e[14] = t[14],
            e[15] = t[15],
            e
        }
        ,
        i.copy = function (t, e) {
          return t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t[4] = e[4],
            t[5] = e[5],
            t[6] = e[6],
            t[7] = e[7],
            t[8] = e[8],
            t[9] = e[9],
            t[10] = e[10],
            t[11] = e[11],
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15],
            t
        }
        ,
        i.fromValues = function (t, e, n, i, o, a, s, u, l, c, f, p, h, d, v, m) {
          var g = new r.ARRAY_TYPE(16);
          return g[0] = t,
            g[1] = e,
            g[2] = n,
            g[3] = i,
            g[4] = o,
            g[5] = a,
            g[6] = s,
            g[7] = u,
            g[8] = l,
            g[9] = c,
            g[10] = f,
            g[11] = p,
            g[12] = h,
            g[13] = d,
            g[14] = v,
            g[15] = m,
            g
        }
        ,
        i.set = function (t, e, n, r, i, o, a, s, u, l, c, f, p, h, d, v, m) {
          return t[0] = e,
            t[1] = n,
            t[2] = r,
            t[3] = i,
            t[4] = o,
            t[5] = a,
            t[6] = s,
            t[7] = u,
            t[8] = l,
            t[9] = c,
            t[10] = f,
            t[11] = p,
            t[12] = h,
            t[13] = d,
            t[14] = v,
            t[15] = m,
            t
        }
        ,
        i.identity = function (t) {
          return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 0,
            t[5] = 1,
            t[6] = 0,
            t[7] = 0,
            t[8] = 0,
            t[9] = 0,
            t[10] = 1,
            t[11] = 0,
            t[12] = 0,
            t[13] = 0,
            t[14] = 0,
            t[15] = 1,
            t
        }
        ,
        i.scalar.transpose = function (t, e) {
          if (t === e) {
            var n = e[1]
              , r = e[2]
              , i = e[3]
              , o = e[6]
              , a = e[7]
              , s = e[11];
            t[1] = e[4],
              t[2] = e[8],
              t[3] = e[12],
              t[4] = n,
              t[6] = e[9],
              t[7] = e[13],
              t[8] = r,
              t[9] = o,
              t[11] = e[14],
              t[12] = i,
              t[13] = a,
              t[14] = s
          } else
            t[0] = e[0],
              t[1] = e[4],
              t[2] = e[8],
              t[3] = e[12],
              t[4] = e[1],
              t[5] = e[5],
              t[6] = e[9],
              t[7] = e[13],
              t[8] = e[2],
              t[9] = e[6],
              t[10] = e[10],
              t[11] = e[14],
              t[12] = e[3],
              t[13] = e[7],
              t[14] = e[11],
              t[15] = e[15];
          return t
        }
        ,
        i.SIMD.transpose = function (t, e) {
          var n, r, i, o, a, s, u, l, c, f;
          return n = SIMD.Float32x4.load(e, 0),
            r = SIMD.Float32x4.load(e, 4),
            i = SIMD.Float32x4.load(e, 8),
            o = SIMD.Float32x4.load(e, 12),
            a = SIMD.Float32x4.shuffle(n, r, 0, 1, 4, 5),
            s = SIMD.Float32x4.shuffle(i, o, 0, 1, 4, 5),
            u = SIMD.Float32x4.shuffle(a, s, 0, 2, 4, 6),
            l = SIMD.Float32x4.shuffle(a, s, 1, 3, 5, 7),
            SIMD.Float32x4.store(t, 0, u),
            SIMD.Float32x4.store(t, 4, l),
            a = SIMD.Float32x4.shuffle(n, r, 2, 3, 6, 7),
            s = SIMD.Float32x4.shuffle(i, o, 2, 3, 6, 7),
            c = SIMD.Float32x4.shuffle(a, s, 0, 2, 4, 6),
            f = SIMD.Float32x4.shuffle(a, s, 1, 3, 5, 7),
            SIMD.Float32x4.store(t, 8, c),
            SIMD.Float32x4.store(t, 12, f),
            t
        }
        ,
        i.transpose = r.USE_SIMD ? i.SIMD.transpose : i.scalar.transpose,
        i.scalar.invert = function (t, e) {
          var n = e[0]
            , r = e[1]
            , i = e[2]
            , o = e[3]
            , a = e[4]
            , s = e[5]
            , u = e[6]
            , l = e[7]
            , c = e[8]
            , f = e[9]
            , p = e[10]
            , h = e[11]
            , d = e[12]
            , v = e[13]
            , m = e[14]
            , g = e[15]
            , y = n * s - r * a
            , b = n * u - i * a
            , _ = n * l - o * a
            , w = r * u - i * s
            , x = r * l - o * s
            , E = i * l - o * u
            , $ = c * v - f * d
            , S = c * m - p * d
            , T = c * g - h * d
            , k = f * m - p * v
            , M = f * g - h * v
            , A = p * g - h * m
            , C = y * A - b * M + _ * k + w * T - x * S + E * $;
          return C ? (C = 1 / C,
            t[0] = (s * A - u * M + l * k) * C,
            t[1] = (i * M - r * A - o * k) * C,
            t[2] = (v * E - m * x + g * w) * C,
            t[3] = (p * x - f * E - h * w) * C,
            t[4] = (u * T - a * A - l * S) * C,
            t[5] = (n * A - i * T + o * S) * C,
            t[6] = (m * _ - d * E - g * b) * C,
            t[7] = (c * E - p * _ + h * b) * C,
            t[8] = (a * M - s * T + l * $) * C,
            t[9] = (r * T - n * M - o * $) * C,
            t[10] = (d * x - v * _ + g * y) * C,
            t[11] = (f * _ - c * x - h * y) * C,
            t[12] = (s * S - a * k - u * $) * C,
            t[13] = (n * k - r * S + i * $) * C,
            t[14] = (v * b - d * w - m * y) * C,
            t[15] = (c * w - f * b + p * y) * C,
            t) : null
        }
        ,
        i.SIMD.invert = function (t, e) {
          var n, r, i, o, a, s, u, l, c, f, p = SIMD.Float32x4.load(e, 0), h = SIMD.Float32x4.load(e, 4), d = SIMD.Float32x4.load(e, 8), v = SIMD.Float32x4.load(e, 12);
          return a = SIMD.Float32x4.shuffle(p, h, 0, 1, 4, 5),
            r = SIMD.Float32x4.shuffle(d, v, 0, 1, 4, 5),
            n = SIMD.Float32x4.shuffle(a, r, 0, 2, 4, 6),
            r = SIMD.Float32x4.shuffle(r, a, 1, 3, 5, 7),
            a = SIMD.Float32x4.shuffle(p, h, 2, 3, 6, 7),
            o = SIMD.Float32x4.shuffle(d, v, 2, 3, 6, 7),
            i = SIMD.Float32x4.shuffle(a, o, 0, 2, 4, 6),
            o = SIMD.Float32x4.shuffle(o, a, 1, 3, 5, 7),
            a = SIMD.Float32x4.mul(i, o),
            a = SIMD.Float32x4.swizzle(a, 1, 0, 3, 2),
            s = SIMD.Float32x4.mul(r, a),
            u = SIMD.Float32x4.mul(n, a),
            a = SIMD.Float32x4.swizzle(a, 2, 3, 0, 1),
            s = SIMD.Float32x4.sub(SIMD.Float32x4.mul(r, a), s),
            u = SIMD.Float32x4.sub(SIMD.Float32x4.mul(n, a), u),
            u = SIMD.Float32x4.swizzle(u, 2, 3, 0, 1),
            a = SIMD.Float32x4.mul(r, i),
            a = SIMD.Float32x4.swizzle(a, 1, 0, 3, 2),
            s = SIMD.Float32x4.add(SIMD.Float32x4.mul(o, a), s),
            c = SIMD.Float32x4.mul(n, a),
            a = SIMD.Float32x4.swizzle(a, 2, 3, 0, 1),
            s = SIMD.Float32x4.sub(s, SIMD.Float32x4.mul(o, a)),
            c = SIMD.Float32x4.sub(SIMD.Float32x4.mul(n, a), c),
            c = SIMD.Float32x4.swizzle(c, 2, 3, 0, 1),
            a = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(r, 2, 3, 0, 1), o),
            a = SIMD.Float32x4.swizzle(a, 1, 0, 3, 2),
            i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1),
            s = SIMD.Float32x4.add(SIMD.Float32x4.mul(i, a), s),
            l = SIMD.Float32x4.mul(n, a),
            a = SIMD.Float32x4.swizzle(a, 2, 3, 0, 1),
            s = SIMD.Float32x4.sub(s, SIMD.Float32x4.mul(i, a)),
            l = SIMD.Float32x4.sub(SIMD.Float32x4.mul(n, a), l),
            l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1),
            a = SIMD.Float32x4.mul(n, r),
            a = SIMD.Float32x4.swizzle(a, 1, 0, 3, 2),
            l = SIMD.Float32x4.add(SIMD.Float32x4.mul(o, a), l),
            c = SIMD.Float32x4.sub(SIMD.Float32x4.mul(i, a), c),
            a = SIMD.Float32x4.swizzle(a, 2, 3, 0, 1),
            l = SIMD.Float32x4.sub(SIMD.Float32x4.mul(o, a), l),
            c = SIMD.Float32x4.sub(c, SIMD.Float32x4.mul(i, a)),
            a = SIMD.Float32x4.mul(n, o),
            a = SIMD.Float32x4.swizzle(a, 1, 0, 3, 2),
            u = SIMD.Float32x4.sub(u, SIMD.Float32x4.mul(i, a)),
            l = SIMD.Float32x4.add(SIMD.Float32x4.mul(r, a), l),
            a = SIMD.Float32x4.swizzle(a, 2, 3, 0, 1),
            u = SIMD.Float32x4.add(SIMD.Float32x4.mul(i, a), u),
            l = SIMD.Float32x4.sub(l, SIMD.Float32x4.mul(r, a)),
            a = SIMD.Float32x4.mul(n, i),
            a = SIMD.Float32x4.swizzle(a, 1, 0, 3, 2),
            u = SIMD.Float32x4.add(SIMD.Float32x4.mul(o, a), u),
            c = SIMD.Float32x4.sub(c, SIMD.Float32x4.mul(r, a)),
            a = SIMD.Float32x4.swizzle(a, 2, 3, 0, 1),
            u = SIMD.Float32x4.sub(u, SIMD.Float32x4.mul(o, a)),
            c = SIMD.Float32x4.add(SIMD.Float32x4.mul(r, a), c),
            f = SIMD.Float32x4.mul(n, s),
            f = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(f, 2, 3, 0, 1), f),
            f = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(f, 1, 0, 3, 2), f),
            a = SIMD.Float32x4.reciprocalApproximation(f),
            f = SIMD.Float32x4.sub(SIMD.Float32x4.add(a, a), SIMD.Float32x4.mul(f, SIMD.Float32x4.mul(a, a))),
            (f = SIMD.Float32x4.swizzle(f, 0, 0, 0, 0)) ? (SIMD.Float32x4.store(t, 0, SIMD.Float32x4.mul(f, s)),
              SIMD.Float32x4.store(t, 4, SIMD.Float32x4.mul(f, u)),
              SIMD.Float32x4.store(t, 8, SIMD.Float32x4.mul(f, l)),
              SIMD.Float32x4.store(t, 12, SIMD.Float32x4.mul(f, c)),
              t) : null
        }
        ,
        i.invert = r.USE_SIMD ? i.SIMD.invert : i.scalar.invert,
        i.scalar.adjoint = function (t, e) {
          var n = e[0]
            , r = e[1]
            , i = e[2]
            , o = e[3]
            , a = e[4]
            , s = e[5]
            , u = e[6]
            , l = e[7]
            , c = e[8]
            , f = e[9]
            , p = e[10]
            , h = e[11]
            , d = e[12]
            , v = e[13]
            , m = e[14]
            , g = e[15];
          return t[0] = s * (p * g - h * m) - f * (u * g - l * m) + v * (u * h - l * p),
            t[1] = -(r * (p * g - h * m) - f * (i * g - o * m) + v * (i * h - o * p)),
            t[2] = r * (u * g - l * m) - s * (i * g - o * m) + v * (i * l - o * u),
            t[3] = -(r * (u * h - l * p) - s * (i * h - o * p) + f * (i * l - o * u)),
            t[4] = -(a * (p * g - h * m) - c * (u * g - l * m) + d * (u * h - l * p)),
            t[5] = n * (p * g - h * m) - c * (i * g - o * m) + d * (i * h - o * p),
            t[6] = -(n * (u * g - l * m) - a * (i * g - o * m) + d * (i * l - o * u)),
            t[7] = n * (u * h - l * p) - a * (i * h - o * p) + c * (i * l - o * u),
            t[8] = a * (f * g - h * v) - c * (s * g - l * v) + d * (s * h - l * f),
            t[9] = -(n * (f * g - h * v) - c * (r * g - o * v) + d * (r * h - o * f)),
            t[10] = n * (s * g - l * v) - a * (r * g - o * v) + d * (r * l - o * s),
            t[11] = -(n * (s * h - l * f) - a * (r * h - o * f) + c * (r * l - o * s)),
            t[12] = -(a * (f * m - p * v) - c * (s * m - u * v) + d * (s * p - u * f)),
            t[13] = n * (f * m - p * v) - c * (r * m - i * v) + d * (r * p - i * f),
            t[14] = -(n * (s * m - u * v) - a * (r * m - i * v) + d * (r * u - i * s)),
            t[15] = n * (s * p - u * f) - a * (r * p - i * f) + c * (r * u - i * s),
            t
        }
        ,
        i.SIMD.adjoint = function (t, e) {
          var n, r, i, o, a, s, u, l, c, f, p, h, d, n = SIMD.Float32x4.load(e, 0), r = SIMD.Float32x4.load(e, 4), i = SIMD.Float32x4.load(e, 8), o = SIMD.Float32x4.load(e, 12);
          return c = SIMD.Float32x4.shuffle(n, r, 0, 1, 4, 5),
            s = SIMD.Float32x4.shuffle(i, o, 0, 1, 4, 5),
            a = SIMD.Float32x4.shuffle(c, s, 0, 2, 4, 6),
            s = SIMD.Float32x4.shuffle(s, c, 1, 3, 5, 7),
            c = SIMD.Float32x4.shuffle(n, r, 2, 3, 6, 7),
            l = SIMD.Float32x4.shuffle(i, o, 2, 3, 6, 7),
            u = SIMD.Float32x4.shuffle(c, l, 0, 2, 4, 6),
            l = SIMD.Float32x4.shuffle(l, c, 1, 3, 5, 7),
            c = SIMD.Float32x4.mul(u, l),
            c = SIMD.Float32x4.swizzle(c, 1, 0, 3, 2),
            f = SIMD.Float32x4.mul(s, c),
            p = SIMD.Float32x4.mul(a, c),
            c = SIMD.Float32x4.swizzle(c, 2, 3, 0, 1),
            f = SIMD.Float32x4.sub(SIMD.Float32x4.mul(s, c), f),
            p = SIMD.Float32x4.sub(SIMD.Float32x4.mul(a, c), p),
            p = SIMD.Float32x4.swizzle(p, 2, 3, 0, 1),
            c = SIMD.Float32x4.mul(s, u),
            c = SIMD.Float32x4.swizzle(c, 1, 0, 3, 2),
            f = SIMD.Float32x4.add(SIMD.Float32x4.mul(l, c), f),
            d = SIMD.Float32x4.mul(a, c),
            c = SIMD.Float32x4.swizzle(c, 2, 3, 0, 1),
            f = SIMD.Float32x4.sub(f, SIMD.Float32x4.mul(l, c)),
            d = SIMD.Float32x4.sub(SIMD.Float32x4.mul(a, c), d),
            d = SIMD.Float32x4.swizzle(d, 2, 3, 0, 1),
            c = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s, 2, 3, 0, 1), l),
            c = SIMD.Float32x4.swizzle(c, 1, 0, 3, 2),
            u = SIMD.Float32x4.swizzle(u, 2, 3, 0, 1),
            f = SIMD.Float32x4.add(SIMD.Float32x4.mul(u, c), f),
            h = SIMD.Float32x4.mul(a, c),
            c = SIMD.Float32x4.swizzle(c, 2, 3, 0, 1),
            f = SIMD.Float32x4.sub(f, SIMD.Float32x4.mul(u, c)),
            h = SIMD.Float32x4.sub(SIMD.Float32x4.mul(a, c), h),
            h = SIMD.Float32x4.swizzle(h, 2, 3, 0, 1),
            c = SIMD.Float32x4.mul(a, s),
            c = SIMD.Float32x4.swizzle(c, 1, 0, 3, 2),
            h = SIMD.Float32x4.add(SIMD.Float32x4.mul(l, c), h),
            d = SIMD.Float32x4.sub(SIMD.Float32x4.mul(u, c), d),
            c = SIMD.Float32x4.swizzle(c, 2, 3, 0, 1),
            h = SIMD.Float32x4.sub(SIMD.Float32x4.mul(l, c), h),
            d = SIMD.Float32x4.sub(d, SIMD.Float32x4.mul(u, c)),
            c = SIMD.Float32x4.mul(a, l),
            c = SIMD.Float32x4.swizzle(c, 1, 0, 3, 2),
            p = SIMD.Float32x4.sub(p, SIMD.Float32x4.mul(u, c)),
            h = SIMD.Float32x4.add(SIMD.Float32x4.mul(s, c), h),
            c = SIMD.Float32x4.swizzle(c, 2, 3, 0, 1),
            p = SIMD.Float32x4.add(SIMD.Float32x4.mul(u, c), p),
            h = SIMD.Float32x4.sub(h, SIMD.Float32x4.mul(s, c)),
            c = SIMD.Float32x4.mul(a, u),
            c = SIMD.Float32x4.swizzle(c, 1, 0, 3, 2),
            p = SIMD.Float32x4.add(SIMD.Float32x4.mul(l, c), p),
            d = SIMD.Float32x4.sub(d, SIMD.Float32x4.mul(s, c)),
            c = SIMD.Float32x4.swizzle(c, 2, 3, 0, 1),
            p = SIMD.Float32x4.sub(p, SIMD.Float32x4.mul(l, c)),
            d = SIMD.Float32x4.add(SIMD.Float32x4.mul(s, c), d),
            SIMD.Float32x4.store(t, 0, f),
            SIMD.Float32x4.store(t, 4, p),
            SIMD.Float32x4.store(t, 8, h),
            SIMD.Float32x4.store(t, 12, d),
            t
        }
        ,
        i.adjoint = r.USE_SIMD ? i.SIMD.adjoint : i.scalar.adjoint,
        i.determinant = function (t) {
          var e = t[0]
            , n = t[1]
            , r = t[2]
            , i = t[3]
            , o = t[4]
            , a = t[5]
            , s = t[6]
            , u = t[7]
            , l = t[8]
            , c = t[9]
            , f = t[10]
            , p = t[11]
            , h = t[12]
            , d = t[13]
            , v = t[14]
            , m = t[15]
            , g = e * a - n * o
            , y = e * s - r * o
            , b = e * u - i * o
            , _ = n * s - r * a
            , w = n * u - i * a
            , x = r * u - i * s
            , E = l * d - c * h
            , $ = l * v - f * h
            , S = l * m - p * h
            , T = c * v - f * d
            , k = c * m - p * d
            , M = f * m - p * v;
          return g * M - y * k + b * T + _ * S - w * $ + x * E
        }
        ,
        i.SIMD.multiply = function (t, e, n) {
          var r = SIMD.Float32x4.load(e, 0)
            , i = SIMD.Float32x4.load(e, 4)
            , o = SIMD.Float32x4.load(e, 8)
            , a = SIMD.Float32x4.load(e, 12)
            , s = SIMD.Float32x4.load(n, 0)
            , u = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s, 0, 0, 0, 0), r), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s, 1, 1, 1, 1), i), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s, 2, 2, 2, 2), o), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s, 3, 3, 3, 3), a))));
          SIMD.Float32x4.store(t, 0, u);
          var l = SIMD.Float32x4.load(n, 4)
            , c = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(l, 0, 0, 0, 0), r), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(l, 1, 1, 1, 1), i), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(l, 2, 2, 2, 2), o), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(l, 3, 3, 3, 3), a))));
          SIMD.Float32x4.store(t, 4, c);
          var f = SIMD.Float32x4.load(n, 8)
            , p = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(f, 0, 0, 0, 0), r), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(f, 1, 1, 1, 1), i), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(f, 2, 2, 2, 2), o), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(f, 3, 3, 3, 3), a))));
          SIMD.Float32x4.store(t, 8, p);
          var h = SIMD.Float32x4.load(n, 12)
            , d = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h, 0, 0, 0, 0), r), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h, 1, 1, 1, 1), i), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h, 2, 2, 2, 2), o), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h, 3, 3, 3, 3), a))));
          return SIMD.Float32x4.store(t, 12, d),
            t
        }
        ,
        i.scalar.multiply = function (t, e, n) {
          var r = e[0]
            , i = e[1]
            , o = e[2]
            , a = e[3]
            , s = e[4]
            , u = e[5]
            , l = e[6]
            , c = e[7]
            , f = e[8]
            , p = e[9]
            , h = e[10]
            , d = e[11]
            , v = e[12]
            , m = e[13]
            , g = e[14]
            , y = e[15]
            , b = n[0]
            , _ = n[1]
            , w = n[2]
            , x = n[3];
          return t[0] = b * r + _ * s + w * f + x * v,
            t[1] = b * i + _ * u + w * p + x * m,
            t[2] = b * o + _ * l + w * h + x * g,
            t[3] = b * a + _ * c + w * d + x * y,
            b = n[4],
            _ = n[5],
            w = n[6],
            x = n[7],
            t[4] = b * r + _ * s + w * f + x * v,
            t[5] = b * i + _ * u + w * p + x * m,
            t[6] = b * o + _ * l + w * h + x * g,
            t[7] = b * a + _ * c + w * d + x * y,
            b = n[8],
            _ = n[9],
            w = n[10],
            x = n[11],
            t[8] = b * r + _ * s + w * f + x * v,
            t[9] = b * i + _ * u + w * p + x * m,
            t[10] = b * o + _ * l + w * h + x * g,
            t[11] = b * a + _ * c + w * d + x * y,
            b = n[12],
            _ = n[13],
            w = n[14],
            x = n[15],
            t[12] = b * r + _ * s + w * f + x * v,
            t[13] = b * i + _ * u + w * p + x * m,
            t[14] = b * o + _ * l + w * h + x * g,
            t[15] = b * a + _ * c + w * d + x * y,
            t
        }
        ,
        i.multiply = r.USE_SIMD ? i.SIMD.multiply : i.scalar.multiply,
        i.mul = i.multiply,
        i.scalar.translate = function (t, e, n) {
          var r, i, o, a, s, u, l, c, f, p, h, d, v = n[0], m = n[1], g = n[2];
          return e === t ? (t[12] = e[0] * v + e[4] * m + e[8] * g + e[12],
            t[13] = e[1] * v + e[5] * m + e[9] * g + e[13],
            t[14] = e[2] * v + e[6] * m + e[10] * g + e[14],
            t[15] = e[3] * v + e[7] * m + e[11] * g + e[15]) : (r = e[0],
            i = e[1],
            o = e[2],
            a = e[3],
            s = e[4],
            u = e[5],
            l = e[6],
            c = e[7],
            f = e[8],
            p = e[9],
            h = e[10],
            d = e[11],
            t[0] = r,
            t[1] = i,
            t[2] = o,
            t[3] = a,
            t[4] = s,
            t[5] = u,
            t[6] = l,
            t[7] = c,
            t[8] = f,
            t[9] = p,
            t[10] = h,
            t[11] = d,
            t[12] = r * v + s * m + f * g + e[12],
            t[13] = i * v + u * m + p * g + e[13],
            t[14] = o * v + l * m + h * g + e[14],
            t[15] = a * v + c * m + d * g + e[15]),
            t
        }
        ,
        i.SIMD.translate = function (t, e, n) {
          var r = SIMD.Float32x4.load(e, 0)
            , i = SIMD.Float32x4.load(e, 4)
            , o = SIMD.Float32x4.load(e, 8)
            , a = SIMD.Float32x4.load(e, 12)
            , s = SIMD.Float32x4(n[0], n[1], n[2], 0);
          e !== t && (t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t[4] = e[4],
            t[5] = e[5],
            t[6] = e[6],
            t[7] = e[7],
            t[8] = e[8],
            t[9] = e[9],
            t[10] = e[10],
            t[11] = e[11]),
            r = SIMD.Float32x4.mul(r, SIMD.Float32x4.swizzle(s, 0, 0, 0, 0)),
            i = SIMD.Float32x4.mul(i, SIMD.Float32x4.swizzle(s, 1, 1, 1, 1)),
            o = SIMD.Float32x4.mul(o, SIMD.Float32x4.swizzle(s, 2, 2, 2, 2));
          var u = SIMD.Float32x4.add(r, SIMD.Float32x4.add(i, SIMD.Float32x4.add(o, a)));
          return SIMD.Float32x4.store(t, 12, u),
            t
        }
        ,
        i.translate = r.USE_SIMD ? i.SIMD.translate : i.scalar.translate,
        i.scalar.scale = function (t, e, n) {
          var r = n[0]
            , i = n[1]
            , o = n[2];
          return t[0] = e[0] * r,
            t[1] = e[1] * r,
            t[2] = e[2] * r,
            t[3] = e[3] * r,
            t[4] = e[4] * i,
            t[5] = e[5] * i,
            t[6] = e[6] * i,
            t[7] = e[7] * i,
            t[8] = e[8] * o,
            t[9] = e[9] * o,
            t[10] = e[10] * o,
            t[11] = e[11] * o,
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15],
            t
        }
        ,
        i.SIMD.scale = function (t, e, n) {
          var r, i, o, a = SIMD.Float32x4(n[0], n[1], n[2], 0);
          return r = SIMD.Float32x4.load(e, 0),
            SIMD.Float32x4.store(t, 0, SIMD.Float32x4.mul(r, SIMD.Float32x4.swizzle(a, 0, 0, 0, 0))),
            i = SIMD.Float32x4.load(e, 4),
            SIMD.Float32x4.store(t, 4, SIMD.Float32x4.mul(i, SIMD.Float32x4.swizzle(a, 1, 1, 1, 1))),
            o = SIMD.Float32x4.load(e, 8),
            SIMD.Float32x4.store(t, 8, SIMD.Float32x4.mul(o, SIMD.Float32x4.swizzle(a, 2, 2, 2, 2))),
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15],
            t
        }
        ,
        i.scale = r.USE_SIMD ? i.SIMD.scale : i.scalar.scale,
        i.rotate = function (t, e, n, i) {
          var o, a, s, u, l, c, f, p, h, d, v, m, g, y, b, _, w, x, E, $, S, T, k, M, A = i[0], C = i[1], D = i[2], O = Math.sqrt(A * A + C * C + D * D);
          return Math.abs(O) < r.EPSILON ? null : (O = 1 / O,
            A *= O,
            C *= O,
            D *= O,
            o = Math.sin(n),
            a = Math.cos(n),
            s = 1 - a,
            u = e[0],
            l = e[1],
            c = e[2],
            f = e[3],
            p = e[4],
            h = e[5],
            d = e[6],
            v = e[7],
            m = e[8],
            g = e[9],
            y = e[10],
            b = e[11],
            _ = A * A * s + a,
            w = C * A * s + D * o,
            x = D * A * s - C * o,
            E = A * C * s - D * o,
            $ = C * C * s + a,
            S = D * C * s + A * o,
            T = A * D * s + C * o,
            k = C * D * s - A * o,
            M = D * D * s + a,
            t[0] = u * _ + p * w + m * x,
            t[1] = l * _ + h * w + g * x,
            t[2] = c * _ + d * w + y * x,
            t[3] = f * _ + v * w + b * x,
            t[4] = u * E + p * $ + m * S,
            t[5] = l * E + h * $ + g * S,
            t[6] = c * E + d * $ + y * S,
            t[7] = f * E + v * $ + b * S,
            t[8] = u * T + p * k + m * M,
            t[9] = l * T + h * k + g * M,
            t[10] = c * T + d * k + y * M,
            t[11] = f * T + v * k + b * M,
          e !== t && (t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15]),
            t)
        }
        ,
        i.scalar.rotateX = function (t, e, n) {
          var r = Math.sin(n)
            , i = Math.cos(n)
            , o = e[4]
            , a = e[5]
            , s = e[6]
            , u = e[7]
            , l = e[8]
            , c = e[9]
            , f = e[10]
            , p = e[11];
          return e !== t && (t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15]),
            t[4] = o * i + l * r,
            t[5] = a * i + c * r,
            t[6] = s * i + f * r,
            t[7] = u * i + p * r,
            t[8] = l * i - o * r,
            t[9] = c * i - a * r,
            t[10] = f * i - s * r,
            t[11] = p * i - u * r,
            t
        }
        ,
        i.SIMD.rotateX = function (t, e, n) {
          var r = SIMD.Float32x4.splat(Math.sin(n))
            , i = SIMD.Float32x4.splat(Math.cos(n));
          e !== t && (t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15]);
          var o = SIMD.Float32x4.load(e, 4)
            , a = SIMD.Float32x4.load(e, 8);
          return SIMD.Float32x4.store(t, 4, SIMD.Float32x4.add(SIMD.Float32x4.mul(o, i), SIMD.Float32x4.mul(a, r))),
            SIMD.Float32x4.store(t, 8, SIMD.Float32x4.sub(SIMD.Float32x4.mul(a, i), SIMD.Float32x4.mul(o, r))),
            t
        }
        ,
        i.rotateX = r.USE_SIMD ? i.SIMD.rotateX : i.scalar.rotateX,
        i.scalar.rotateY = function (t, e, n) {
          var r = Math.sin(n)
            , i = Math.cos(n)
            , o = e[0]
            , a = e[1]
            , s = e[2]
            , u = e[3]
            , l = e[8]
            , c = e[9]
            , f = e[10]
            , p = e[11];
          return e !== t && (t[4] = e[4],
            t[5] = e[5],
            t[6] = e[6],
            t[7] = e[7],
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15]),
            t[0] = o * i - l * r,
            t[1] = a * i - c * r,
            t[2] = s * i - f * r,
            t[3] = u * i - p * r,
            t[8] = o * r + l * i,
            t[9] = a * r + c * i,
            t[10] = s * r + f * i,
            t[11] = u * r + p * i,
            t
        }
        ,
        i.SIMD.rotateY = function (t, e, n) {
          var r = SIMD.Float32x4.splat(Math.sin(n))
            , i = SIMD.Float32x4.splat(Math.cos(n));
          e !== t && (t[4] = e[4],
            t[5] = e[5],
            t[6] = e[6],
            t[7] = e[7],
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15]);
          var o = SIMD.Float32x4.load(e, 0)
            , a = SIMD.Float32x4.load(e, 8);
          return SIMD.Float32x4.store(t, 0, SIMD.Float32x4.sub(SIMD.Float32x4.mul(o, i), SIMD.Float32x4.mul(a, r))),
            SIMD.Float32x4.store(t, 8, SIMD.Float32x4.add(SIMD.Float32x4.mul(o, r), SIMD.Float32x4.mul(a, i))),
            t
        }
        ,
        i.rotateY = r.USE_SIMD ? i.SIMD.rotateY : i.scalar.rotateY,
        i.scalar.rotateZ = function (t, e, n) {
          var r = Math.sin(n)
            , i = Math.cos(n)
            , o = e[0]
            , a = e[1]
            , s = e[2]
            , u = e[3]
            , l = e[4]
            , c = e[5]
            , f = e[6]
            , p = e[7];
          return e !== t && (t[8] = e[8],
            t[9] = e[9],
            t[10] = e[10],
            t[11] = e[11],
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15]),
            t[0] = o * i + l * r,
            t[1] = a * i + c * r,
            t[2] = s * i + f * r,
            t[3] = u * i + p * r,
            t[4] = l * i - o * r,
            t[5] = c * i - a * r,
            t[6] = f * i - s * r,
            t[7] = p * i - u * r,
            t
        }
        ,
        i.SIMD.rotateZ = function (t, e, n) {
          var r = SIMD.Float32x4.splat(Math.sin(n))
            , i = SIMD.Float32x4.splat(Math.cos(n));
          e !== t && (t[8] = e[8],
            t[9] = e[9],
            t[10] = e[10],
            t[11] = e[11],
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15]);
          var o = SIMD.Float32x4.load(e, 0)
            , a = SIMD.Float32x4.load(e, 4);
          return SIMD.Float32x4.store(t, 0, SIMD.Float32x4.add(SIMD.Float32x4.mul(o, i), SIMD.Float32x4.mul(a, r))),
            SIMD.Float32x4.store(t, 4, SIMD.Float32x4.sub(SIMD.Float32x4.mul(a, i), SIMD.Float32x4.mul(o, r))),
            t
        }
        ,
        i.rotateZ = r.USE_SIMD ? i.SIMD.rotateZ : i.scalar.rotateZ,
        i.fromTranslation = function (t, e) {
          return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 0,
            t[5] = 1,
            t[6] = 0,
            t[7] = 0,
            t[8] = 0,
            t[9] = 0,
            t[10] = 1,
            t[11] = 0,
            t[12] = e[0],
            t[13] = e[1],
            t[14] = e[2],
            t[15] = 1,
            t
        }
        ,
        i.fromScaling = function (t, e) {
          return t[0] = e[0],
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 0,
            t[5] = e[1],
            t[6] = 0,
            t[7] = 0,
            t[8] = 0,
            t[9] = 0,
            t[10] = e[2],
            t[11] = 0,
            t[12] = 0,
            t[13] = 0,
            t[14] = 0,
            t[15] = 1,
            t
        }
        ,
        i.fromRotation = function (t, e, n) {
          var i, o, a, s = n[0], u = n[1], l = n[2], c = Math.sqrt(s * s + u * u + l * l);
          return Math.abs(c) < r.EPSILON ? null : (c = 1 / c,
            s *= c,
            u *= c,
            l *= c,
            i = Math.sin(e),
            o = Math.cos(e),
            a = 1 - o,
            t[0] = s * s * a + o,
            t[1] = u * s * a + l * i,
            t[2] = l * s * a - u * i,
            t[3] = 0,
            t[4] = s * u * a - l * i,
            t[5] = u * u * a + o,
            t[6] = l * u * a + s * i,
            t[7] = 0,
            t[8] = s * l * a + u * i,
            t[9] = u * l * a - s * i,
            t[10] = l * l * a + o,
            t[11] = 0,
            t[12] = 0,
            t[13] = 0,
            t[14] = 0,
            t[15] = 1,
            t)
        }
        ,
        i.fromXRotation = function (t, e) {
          var n = Math.sin(e)
            , r = Math.cos(e);
          return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 0,
            t[5] = r,
            t[6] = n,
            t[7] = 0,
            t[8] = 0,
            t[9] = -n,
            t[10] = r,
            t[11] = 0,
            t[12] = 0,
            t[13] = 0,
            t[14] = 0,
            t[15] = 1,
            t
        }
        ,
        i.fromYRotation = function (t, e) {
          var n = Math.sin(e)
            , r = Math.cos(e);
          return t[0] = r,
            t[1] = 0,
            t[2] = -n,
            t[3] = 0,
            t[4] = 0,
            t[5] = 1,
            t[6] = 0,
            t[7] = 0,
            t[8] = n,
            t[9] = 0,
            t[10] = r,
            t[11] = 0,
            t[12] = 0,
            t[13] = 0,
            t[14] = 0,
            t[15] = 1,
            t
        }
        ,
        i.fromZRotation = function (t, e) {
          var n = Math.sin(e)
            , r = Math.cos(e);
          return t[0] = r,
            t[1] = n,
            t[2] = 0,
            t[3] = 0,
            t[4] = -n,
            t[5] = r,
            t[6] = 0,
            t[7] = 0,
            t[8] = 0,
            t[9] = 0,
            t[10] = 1,
            t[11] = 0,
            t[12] = 0,
            t[13] = 0,
            t[14] = 0,
            t[15] = 1,
            t
        }
        ,
        i.fromRotationTranslation = function (t, e, n) {
          var r = e[0]
            , i = e[1]
            , o = e[2]
            , a = e[3]
            , s = r + r
            , u = i + i
            , l = o + o
            , c = r * s
            , f = r * u
            , p = r * l
            , h = i * u
            , d = i * l
            , v = o * l
            , m = a * s
            , g = a * u
            , y = a * l;
          return t[0] = 1 - (h + v),
            t[1] = f + y,
            t[2] = p - g,
            t[3] = 0,
            t[4] = f - y,
            t[5] = 1 - (c + v),
            t[6] = d + m,
            t[7] = 0,
            t[8] = p + g,
            t[9] = d - m,
            t[10] = 1 - (c + h),
            t[11] = 0,
            t[12] = n[0],
            t[13] = n[1],
            t[14] = n[2],
            t[15] = 1,
            t
        }
        ,
        i.getTranslation = function (t, e) {
          return t[0] = e[12],
            t[1] = e[13],
            t[2] = e[14],
            t
        }
        ,
        i.getRotation = function (t, e) {
          var n = e[0] + e[5] + e[10]
            , r = 0;
          return n > 0 ? (r = 2 * Math.sqrt(n + 1),
            t[3] = .25 * r,
            t[0] = (e[6] - e[9]) / r,
            t[1] = (e[8] - e[2]) / r,
            t[2] = (e[1] - e[4]) / r) : e[0] > e[5] & e[0] > e[10] ? (r = 2 * Math.sqrt(1 + e[0] - e[5] - e[10]),
            t[3] = (e[6] - e[9]) / r,
            t[0] = .25 * r,
            t[1] = (e[1] + e[4]) / r,
            t[2] = (e[8] + e[2]) / r) : e[5] > e[10] ? (r = 2 * Math.sqrt(1 + e[5] - e[0] - e[10]),
            t[3] = (e[8] - e[2]) / r,
            t[0] = (e[1] + e[4]) / r,
            t[1] = .25 * r,
            t[2] = (e[6] + e[9]) / r) : (r = 2 * Math.sqrt(1 + e[10] - e[0] - e[5]),
            t[3] = (e[1] - e[4]) / r,
            t[0] = (e[8] + e[2]) / r,
            t[1] = (e[6] + e[9]) / r,
            t[2] = .25 * r),
            t
        }
        ,
        i.fromRotationTranslationScale = function (t, e, n, r) {
          var i = e[0]
            , o = e[1]
            , a = e[2]
            , s = e[3]
            , u = i + i
            , l = o + o
            , c = a + a
            , f = i * u
            , p = i * l
            , h = i * c
            , d = o * l
            , v = o * c
            , m = a * c
            , g = s * u
            , y = s * l
            , b = s * c
            , _ = r[0]
            , w = r[1]
            , x = r[2];
          return t[0] = (1 - (d + m)) * _,
            t[1] = (p + b) * _,
            t[2] = (h - y) * _,
            t[3] = 0,
            t[4] = (p - b) * w,
            t[5] = (1 - (f + m)) * w,
            t[6] = (v + g) * w,
            t[7] = 0,
            t[8] = (h + y) * x,
            t[9] = (v - g) * x,
            t[10] = (1 - (f + d)) * x,
            t[11] = 0,
            t[12] = n[0],
            t[13] = n[1],
            t[14] = n[2],
            t[15] = 1,
            t
        }
        ,
        i.fromRotationTranslationScaleOrigin = function (t, e, n, r, i) {
          var o = e[0]
            , a = e[1]
            , s = e[2]
            , u = e[3]
            , l = o + o
            , c = a + a
            , f = s + s
            , p = o * l
            , h = o * c
            , d = o * f
            , v = a * c
            , m = a * f
            , g = s * f
            , y = u * l
            , b = u * c
            , _ = u * f
            , w = r[0]
            , x = r[1]
            , E = r[2]
            , $ = i[0]
            , S = i[1]
            , T = i[2];
          return t[0] = (1 - (v + g)) * w,
            t[1] = (h + _) * w,
            t[2] = (d - b) * w,
            t[3] = 0,
            t[4] = (h - _) * x,
            t[5] = (1 - (p + g)) * x,
            t[6] = (m + y) * x,
            t[7] = 0,
            t[8] = (d + b) * E,
            t[9] = (m - y) * E,
            t[10] = (1 - (p + v)) * E,
            t[11] = 0,
            t[12] = n[0] + $ - (t[0] * $ + t[4] * S + t[8] * T),
            t[13] = n[1] + S - (t[1] * $ + t[5] * S + t[9] * T),
            t[14] = n[2] + T - (t[2] * $ + t[6] * S + t[10] * T),
            t[15] = 1,
            t
        }
        ,
        i.fromQuat = function (t, e) {
          var n = e[0]
            , r = e[1]
            , i = e[2]
            , o = e[3]
            , a = n + n
            , s = r + r
            , u = i + i
            , l = n * a
            , c = r * a
            , f = r * s
            , p = i * a
            , h = i * s
            , d = i * u
            , v = o * a
            , m = o * s
            , g = o * u;
          return t[0] = 1 - f - d,
            t[1] = c + g,
            t[2] = p - m,
            t[3] = 0,
            t[4] = c - g,
            t[5] = 1 - l - d,
            t[6] = h + v,
            t[7] = 0,
            t[8] = p + m,
            t[9] = h - v,
            t[10] = 1 - l - f,
            t[11] = 0,
            t[12] = 0,
            t[13] = 0,
            t[14] = 0,
            t[15] = 1,
            t
        }
        ,
        i.frustum = function (t, e, n, r, i, o, a) {
          var s = 1 / (n - e)
            , u = 1 / (i - r)
            , l = 1 / (o - a);
          return t[0] = 2 * o * s,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 0,
            t[5] = 2 * o * u,
            t[6] = 0,
            t[7] = 0,
            t[8] = (n + e) * s,
            t[9] = (i + r) * u,
            t[10] = (a + o) * l,
            t[11] = -1,
            t[12] = 0,
            t[13] = 0,
            t[14] = a * o * 2 * l,
            t[15] = 0,
            t
        }
        ,
        i.perspective = function (t, e, n, r, i) {
          var o = 1 / Math.tan(e / 2)
            , a = 1 / (r - i);
          return t[0] = o / n,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 0,
            t[5] = o,
            t[6] = 0,
            t[7] = 0,
            t[8] = 0,
            t[9] = 0,
            t[10] = (i + r) * a,
            t[11] = -1,
            t[12] = 0,
            t[13] = 0,
            t[14] = 2 * i * r * a,
            t[15] = 0,
            t
        }
        ,
        i.perspectiveFromFieldOfView = function (t, e, n, r) {
          var i = Math.tan(e.upDegrees * Math.PI / 180)
            , o = Math.tan(e.downDegrees * Math.PI / 180)
            , a = Math.tan(e.leftDegrees * Math.PI / 180)
            , s = Math.tan(e.rightDegrees * Math.PI / 180)
            , u = 2 / (a + s)
            , l = 2 / (i + o);
          return t[0] = u,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 0,
            t[5] = l,
            t[6] = 0,
            t[7] = 0,
            t[8] = -((a - s) * u * .5),
            t[9] = (i - o) * l * .5,
            t[10] = r / (n - r),
            t[11] = -1,
            t[12] = 0,
            t[13] = 0,
            t[14] = r * n / (n - r),
            t[15] = 0,
            t
        }
        ,
        i.ortho = function (t, e, n, r, i, o, a) {
          var s = 1 / (e - n)
            , u = 1 / (r - i)
            , l = 1 / (o - a);
          return t[0] = -2 * s,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 0,
            t[5] = -2 * u,
            t[6] = 0,
            t[7] = 0,
            t[8] = 0,
            t[9] = 0,
            t[10] = 2 * l,
            t[11] = 0,
            t[12] = (e + n) * s,
            t[13] = (i + r) * u,
            t[14] = (a + o) * l,
            t[15] = 1,
            t
        }
        ,
        i.lookAt = function (t, e, n, o) {
          var a, s, u, l, c, f, p, h, d, v, m = e[0], g = e[1], y = e[2], b = o[0], _ = o[1], w = o[2], x = n[0], E = n[1], $ = n[2];
          return Math.abs(m - x) < r.EPSILON && Math.abs(g - E) < r.EPSILON && Math.abs(y - $) < r.EPSILON ? i.identity(t) : (p = m - x,
            h = g - E,
            d = y - $,
            v = 1 / Math.sqrt(p * p + h * h + d * d),
            p *= v,
            h *= v,
            d *= v,
            a = _ * d - w * h,
            s = w * p - b * d,
            u = b * h - _ * p,
            v = Math.sqrt(a * a + s * s + u * u),
            v ? (v = 1 / v,
              a *= v,
              s *= v,
              u *= v) : (a = 0,
              s = 0,
              u = 0),
            l = h * u - d * s,
            c = d * a - p * u,
            f = p * s - h * a,
            v = Math.sqrt(l * l + c * c + f * f),
            v ? (v = 1 / v,
              l *= v,
              c *= v,
              f *= v) : (l = 0,
              c = 0,
              f = 0),
            t[0] = a,
            t[1] = l,
            t[2] = p,
            t[3] = 0,
            t[4] = s,
            t[5] = c,
            t[6] = h,
            t[7] = 0,
            t[8] = u,
            t[9] = f,
            t[10] = d,
            t[11] = 0,
            t[12] = -(a * m + s * g + u * y),
            t[13] = -(l * m + c * g + f * y),
            t[14] = -(p * m + h * g + d * y),
            t[15] = 1,
            t)
        }
        ,
        i.str = function (t) {
          return "mat4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ", " + t[9] + ", " + t[10] + ", " + t[11] + ", " + t[12] + ", " + t[13] + ", " + t[14] + ", " + t[15] + ")"
        }
        ,
        i.frob = function (t) {
          return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + Math.pow(t[6], 2) + Math.pow(t[7], 2) + Math.pow(t[8], 2) + Math.pow(t[9], 2) + Math.pow(t[10], 2) + Math.pow(t[11], 2) + Math.pow(t[12], 2) + Math.pow(t[13], 2) + Math.pow(t[14], 2) + Math.pow(t[15], 2))
        }
        ,
        i.add = function (t, e, n) {
          return t[0] = e[0] + n[0],
            t[1] = e[1] + n[1],
            t[2] = e[2] + n[2],
            t[3] = e[3] + n[3],
            t[4] = e[4] + n[4],
            t[5] = e[5] + n[5],
            t[6] = e[6] + n[6],
            t[7] = e[7] + n[7],
            t[8] = e[8] + n[8],
            t[9] = e[9] + n[9],
            t[10] = e[10] + n[10],
            t[11] = e[11] + n[11],
            t[12] = e[12] + n[12],
            t[13] = e[13] + n[13],
            t[14] = e[14] + n[14],
            t[15] = e[15] + n[15],
            t
        }
        ,
        i.subtract = function (t, e, n) {
          return t[0] = e[0] - n[0],
            t[1] = e[1] - n[1],
            t[2] = e[2] - n[2],
            t[3] = e[3] - n[3],
            t[4] = e[4] - n[4],
            t[5] = e[5] - n[5],
            t[6] = e[6] - n[6],
            t[7] = e[7] - n[7],
            t[8] = e[8] - n[8],
            t[9] = e[9] - n[9],
            t[10] = e[10] - n[10],
            t[11] = e[11] - n[11],
            t[12] = e[12] - n[12],
            t[13] = e[13] - n[13],
            t[14] = e[14] - n[14],
            t[15] = e[15] - n[15],
            t
        }
        ,
        i.sub = i.subtract,
        i.multiplyScalar = function (t, e, n) {
          return t[0] = e[0] * n,
            t[1] = e[1] * n,
            t[2] = e[2] * n,
            t[3] = e[3] * n,
            t[4] = e[4] * n,
            t[5] = e[5] * n,
            t[6] = e[6] * n,
            t[7] = e[7] * n,
            t[8] = e[8] * n,
            t[9] = e[9] * n,
            t[10] = e[10] * n,
            t[11] = e[11] * n,
            t[12] = e[12] * n,
            t[13] = e[13] * n,
            t[14] = e[14] * n,
            t[15] = e[15] * n,
            t
        }
        ,
        i.multiplyScalarAndAdd = function (t, e, n, r) {
          return t[0] = e[0] + n[0] * r,
            t[1] = e[1] + n[1] * r,
            t[2] = e[2] + n[2] * r,
            t[3] = e[3] + n[3] * r,
            t[4] = e[4] + n[4] * r,
            t[5] = e[5] + n[5] * r,
            t[6] = e[6] + n[6] * r,
            t[7] = e[7] + n[7] * r,
            t[8] = e[8] + n[8] * r,
            t[9] = e[9] + n[9] * r,
            t[10] = e[10] + n[10] * r,
            t[11] = e[11] + n[11] * r,
            t[12] = e[12] + n[12] * r,
            t[13] = e[13] + n[13] * r,
            t[14] = e[14] + n[14] * r,
            t[15] = e[15] + n[15] * r,
            t
        }
        ,
        i.exactEquals = function (t, e) {
          return t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3] && t[4] === e[4] && t[5] === e[5] && t[6] === e[6] && t[7] === e[7] && t[8] === e[8] && t[9] === e[9] && t[10] === e[10] && t[11] === e[11] && t[12] === e[12] && t[13] === e[13] && t[14] === e[14] && t[15] === e[15]
        }
        ,
        i.equals = function (t, e) {
          var n = t[0]
            , i = t[1]
            , o = t[2]
            , a = t[3]
            , s = t[4]
            , u = t[5]
            , l = t[6]
            , c = t[7]
            , f = t[8]
            , p = t[9]
            , h = t[10]
            , d = t[11]
            , v = t[12]
            , m = t[13]
            , g = t[14]
            , y = t[15]
            , b = e[0]
            , _ = e[1]
            , w = e[2]
            , x = e[3]
            , E = e[4]
            , $ = e[5]
            , S = e[6]
            , T = e[7]
            , k = e[8]
            , M = e[9]
            , A = e[10]
            , C = e[11]
            , D = e[12]
            , O = e[13]
            , I = e[14]
            , R = e[15];
          return Math.abs(n - b) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(b)) && Math.abs(i - _) <= r.EPSILON * Math.max(1, Math.abs(i), Math.abs(_)) && Math.abs(o - w) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(w)) && Math.abs(a - x) <= r.EPSILON * Math.max(1, Math.abs(a), Math.abs(x)) && Math.abs(s - E) <= r.EPSILON * Math.max(1, Math.abs(s), Math.abs(E)) && Math.abs(u - $) <= r.EPSILON * Math.max(1, Math.abs(u), Math.abs($)) && Math.abs(l - S) <= r.EPSILON * Math.max(1, Math.abs(l), Math.abs(S)) && Math.abs(c - T) <= r.EPSILON * Math.max(1, Math.abs(c), Math.abs(T)) && Math.abs(f - k) <= r.EPSILON * Math.max(1, Math.abs(f), Math.abs(k)) && Math.abs(p - M) <= r.EPSILON * Math.max(1, Math.abs(p), Math.abs(M)) && Math.abs(h - A) <= r.EPSILON * Math.max(1, Math.abs(h), Math.abs(A)) && Math.abs(d - C) <= r.EPSILON * Math.max(1, Math.abs(d), Math.abs(C)) && Math.abs(v - D) <= r.EPSILON * Math.max(1, Math.abs(v), Math.abs(D)) && Math.abs(m - O) <= r.EPSILON * Math.max(1, Math.abs(m), Math.abs(O)) && Math.abs(g - I) <= r.EPSILON * Math.max(1, Math.abs(g), Math.abs(I)) && Math.abs(y - R) <= r.EPSILON * Math.max(1, Math.abs(y), Math.abs(R))
        }
        ,
        n.exports = i,
        n.exports
    }),
    System.registerDynamic("b5", ["b2"], !0, function (t, e, n) {
      var r = t("b2")
        , i = {};
      return i.create = function () {
        var t = new r.ARRAY_TYPE(9);
        return t[0] = 1,
          t[1] = 0,
          t[2] = 0,
          t[3] = 0,
          t[4] = 1,
          t[5] = 0,
          t[6] = 0,
          t[7] = 0,
          t[8] = 1,
          t
      }
        ,
        i.fromMat4 = function (t, e) {
          return t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[4],
            t[4] = e[5],
            t[5] = e[6],
            t[6] = e[8],
            t[7] = e[9],
            t[8] = e[10],
            t
        }
        ,
        i.clone = function (t) {
          var e = new r.ARRAY_TYPE(9);
          return e[0] = t[0],
            e[1] = t[1],
            e[2] = t[2],
            e[3] = t[3],
            e[4] = t[4],
            e[5] = t[5],
            e[6] = t[6],
            e[7] = t[7],
            e[8] = t[8],
            e
        }
        ,
        i.copy = function (t, e) {
          return t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t[4] = e[4],
            t[5] = e[5],
            t[6] = e[6],
            t[7] = e[7],
            t[8] = e[8],
            t
        }
        ,
        i.fromValues = function (t, e, n, i, o, a, s, u, l) {
          var c = new r.ARRAY_TYPE(9);
          return c[0] = t,
            c[1] = e,
            c[2] = n,
            c[3] = i,
            c[4] = o,
            c[5] = a,
            c[6] = s,
            c[7] = u,
            c[8] = l,
            c
        }
        ,
        i.set = function (t, e, n, r, i, o, a, s, u, l) {
          return t[0] = e,
            t[1] = n,
            t[2] = r,
            t[3] = i,
            t[4] = o,
            t[5] = a,
            t[6] = s,
            t[7] = u,
            t[8] = l,
            t
        }
        ,
        i.identity = function (t) {
          return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 1,
            t[5] = 0,
            t[6] = 0,
            t[7] = 0,
            t[8] = 1,
            t
        }
        ,
        i.transpose = function (t, e) {
          if (t === e) {
            var n = e[1]
              , r = e[2]
              , i = e[5];
            t[1] = e[3],
              t[2] = e[6],
              t[3] = n,
              t[5] = e[7],
              t[6] = r,
              t[7] = i
          } else
            t[0] = e[0],
              t[1] = e[3],
              t[2] = e[6],
              t[3] = e[1],
              t[4] = e[4],
              t[5] = e[7],
              t[6] = e[2],
              t[7] = e[5],
              t[8] = e[8];
          return t
        }
        ,
        i.invert = function (t, e) {
          var n = e[0]
            , r = e[1]
            , i = e[2]
            , o = e[3]
            , a = e[4]
            , s = e[5]
            , u = e[6]
            , l = e[7]
            , c = e[8]
            , f = c * a - s * l
            , p = -c * o + s * u
            , h = l * o - a * u
            , d = n * f + r * p + i * h;
          return d ? (d = 1 / d,
            t[0] = f * d,
            t[1] = (-c * r + i * l) * d,
            t[2] = (s * r - i * a) * d,
            t[3] = p * d,
            t[4] = (c * n - i * u) * d,
            t[5] = (-s * n + i * o) * d,
            t[6] = h * d,
            t[7] = (-l * n + r * u) * d,
            t[8] = (a * n - r * o) * d,
            t) : null
        }
        ,
        i.adjoint = function (t, e) {
          var n = e[0]
            , r = e[1]
            , i = e[2]
            , o = e[3]
            , a = e[4]
            , s = e[5]
            , u = e[6]
            , l = e[7]
            , c = e[8];
          return t[0] = a * c - s * l,
            t[1] = i * l - r * c,
            t[2] = r * s - i * a,
            t[3] = s * u - o * c,
            t[4] = n * c - i * u,
            t[5] = i * o - n * s,
            t[6] = o * l - a * u,
            t[7] = r * u - n * l,
            t[8] = n * a - r * o,
            t
        }
        ,
        i.determinant = function (t) {
          var e = t[0]
            , n = t[1]
            , r = t[2]
            , i = t[3]
            , o = t[4]
            , a = t[5]
            , s = t[6]
            , u = t[7]
            , l = t[8];
          return e * (l * o - a * u) + n * (-l * i + a * s) + r * (u * i - o * s)
        }
        ,
        i.multiply = function (t, e, n) {
          var r = e[0]
            , i = e[1]
            , o = e[2]
            , a = e[3]
            , s = e[4]
            , u = e[5]
            , l = e[6]
            , c = e[7]
            , f = e[8]
            , p = n[0]
            , h = n[1]
            , d = n[2]
            , v = n[3]
            , m = n[4]
            , g = n[5]
            , y = n[6]
            , b = n[7]
            , _ = n[8];
          return t[0] = p * r + h * a + d * l,
            t[1] = p * i + h * s + d * c,
            t[2] = p * o + h * u + d * f,
            t[3] = v * r + m * a + g * l,
            t[4] = v * i + m * s + g * c,
            t[5] = v * o + m * u + g * f,
            t[6] = y * r + b * a + _ * l,
            t[7] = y * i + b * s + _ * c,
            t[8] = y * o + b * u + _ * f,
            t
        }
        ,
        i.mul = i.multiply,
        i.translate = function (t, e, n) {
          var r = e[0]
            , i = e[1]
            , o = e[2]
            , a = e[3]
            , s = e[4]
            , u = e[5]
            , l = e[6]
            , c = e[7]
            , f = e[8]
            , p = n[0]
            , h = n[1];
          return t[0] = r,
            t[1] = i,
            t[2] = o,
            t[3] = a,
            t[4] = s,
            t[5] = u,
            t[6] = p * r + h * a + l,
            t[7] = p * i + h * s + c,
            t[8] = p * o + h * u + f,
            t
        }
        ,
        i.rotate = function (t, e, n) {
          var r = e[0]
            , i = e[1]
            , o = e[2]
            , a = e[3]
            , s = e[4]
            , u = e[5]
            , l = e[6]
            , c = e[7]
            , f = e[8]
            , p = Math.sin(n)
            , h = Math.cos(n);
          return t[0] = h * r + p * a,
            t[1] = h * i + p * s,
            t[2] = h * o + p * u,
            t[3] = h * a - p * r,
            t[4] = h * s - p * i,
            t[5] = h * u - p * o,
            t[6] = l,
            t[7] = c,
            t[8] = f,
            t
        }
        ,
        i.scale = function (t, e, n) {
          var r = n[0]
            , i = n[1];
          return t[0] = r * e[0],
            t[1] = r * e[1],
            t[2] = r * e[2],
            t[3] = i * e[3],
            t[4] = i * e[4],
            t[5] = i * e[5],
            t[6] = e[6],
            t[7] = e[7],
            t[8] = e[8],
            t
        }
        ,
        i.fromTranslation = function (t, e) {
          return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 1,
            t[5] = 0,
            t[6] = e[0],
            t[7] = e[1],
            t[8] = 1,
            t
        }
        ,
        i.fromRotation = function (t, e) {
          var n = Math.sin(e)
            , r = Math.cos(e);
          return t[0] = r,
            t[1] = n,
            t[2] = 0,
            t[3] = -n,
            t[4] = r,
            t[5] = 0,
            t[6] = 0,
            t[7] = 0,
            t[8] = 1,
            t
        }
        ,
        i.fromScaling = function (t, e) {
          return t[0] = e[0],
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = e[1],
            t[5] = 0,
            t[6] = 0,
            t[7] = 0,
            t[8] = 1,
            t
        }
        ,
        i.fromMat2d = function (t, e) {
          return t[0] = e[0],
            t[1] = e[1],
            t[2] = 0,
            t[3] = e[2],
            t[4] = e[3],
            t[5] = 0,
            t[6] = e[4],
            t[7] = e[5],
            t[8] = 1,
            t
        }
        ,
        i.fromQuat = function (t, e) {
          var n = e[0]
            , r = e[1]
            , i = e[2]
            , o = e[3]
            , a = n + n
            , s = r + r
            , u = i + i
            , l = n * a
            , c = r * a
            , f = r * s
            , p = i * a
            , h = i * s
            , d = i * u
            , v = o * a
            , m = o * s
            , g = o * u;
          return t[0] = 1 - f - d,
            t[3] = c - g,
            t[6] = p + m,
            t[1] = c + g,
            t[4] = 1 - l - d,
            t[7] = h - v,
            t[2] = p - m,
            t[5] = h + v,
            t[8] = 1 - l - f,
            t
        }
        ,
        i.normalFromMat4 = function (t, e) {
          var n = e[0]
            , r = e[1]
            , i = e[2]
            , o = e[3]
            , a = e[4]
            , s = e[5]
            , u = e[6]
            , l = e[7]
            , c = e[8]
            , f = e[9]
            , p = e[10]
            , h = e[11]
            , d = e[12]
            , v = e[13]
            , m = e[14]
            , g = e[15]
            , y = n * s - r * a
            , b = n * u - i * a
            , _ = n * l - o * a
            , w = r * u - i * s
            , x = r * l - o * s
            , E = i * l - o * u
            , $ = c * v - f * d
            , S = c * m - p * d
            , T = c * g - h * d
            , k = f * m - p * v
            , M = f * g - h * v
            , A = p * g - h * m
            , C = y * A - b * M + _ * k + w * T - x * S + E * $;
          return C ? (C = 1 / C,
            t[0] = (s * A - u * M + l * k) * C,
            t[1] = (u * T - a * A - l * S) * C,
            t[2] = (a * M - s * T + l * $) * C,
            t[3] = (i * M - r * A - o * k) * C,
            t[4] = (n * A - i * T + o * S) * C,
            t[5] = (r * T - n * M - o * $) * C,
            t[6] = (v * E - m * x + g * w) * C,
            t[7] = (m * _ - d * E - g * b) * C,
            t[8] = (d * x - v * _ + g * y) * C,
            t) : null
        }
        ,
        i.str = function (t) {
          return "mat3(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ")"
        }
        ,
        i.frob = function (t) {
          return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + Math.pow(t[6], 2) + Math.pow(t[7], 2) + Math.pow(t[8], 2))
        }
        ,
        i.add = function (t, e, n) {
          return t[0] = e[0] + n[0],
            t[1] = e[1] + n[1],
            t[2] = e[2] + n[2],
            t[3] = e[3] + n[3],
            t[4] = e[4] + n[4],
            t[5] = e[5] + n[5],
            t[6] = e[6] + n[6],
            t[7] = e[7] + n[7],
            t[8] = e[8] + n[8],
            t
        }
        ,
        i.subtract = function (t, e, n) {
          return t[0] = e[0] - n[0],
            t[1] = e[1] - n[1],
            t[2] = e[2] - n[2],
            t[3] = e[3] - n[3],
            t[4] = e[4] - n[4],
            t[5] = e[5] - n[5],
            t[6] = e[6] - n[6],
            t[7] = e[7] - n[7],
            t[8] = e[8] - n[8],
            t
        }
        ,
        i.sub = i.subtract,
        i.multiplyScalar = function (t, e, n) {
          return t[0] = e[0] * n,
            t[1] = e[1] * n,
            t[2] = e[2] * n,
            t[3] = e[3] * n,
            t[4] = e[4] * n,
            t[5] = e[5] * n,
            t[6] = e[6] * n,
            t[7] = e[7] * n,
            t[8] = e[8] * n,
            t
        }
        ,
        i.multiplyScalarAndAdd = function (t, e, n, r) {
          return t[0] = e[0] + n[0] * r,
            t[1] = e[1] + n[1] * r,
            t[2] = e[2] + n[2] * r,
            t[3] = e[3] + n[3] * r,
            t[4] = e[4] + n[4] * r,
            t[5] = e[5] + n[5] * r,
            t[6] = e[6] + n[6] * r,
            t[7] = e[7] + n[7] * r,
            t[8] = e[8] + n[8] * r,
            t
        }
        ,
        i.exactEquals = function (t, e) {
          return t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3] && t[4] === e[4] && t[5] === e[5] && t[6] === e[6] && t[7] === e[7] && t[8] === e[8]
        }
        ,
        i.equals = function (t, e) {
          var n = t[0]
            , i = t[1]
            , o = t[2]
            , a = t[3]
            , s = t[4]
            , u = t[5]
            , l = t[6]
            , c = t[7]
            , f = t[8]
            , p = e[0]
            , h = e[1]
            , d = e[2]
            , v = e[3]
            , m = e[4]
            , g = e[5]
            , y = t[6]
            , b = e[7]
            , _ = e[8];
          return Math.abs(n - p) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(p)) && Math.abs(i - h) <= r.EPSILON * Math.max(1, Math.abs(i), Math.abs(h)) && Math.abs(o - d) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(d)) && Math.abs(a - v) <= r.EPSILON * Math.max(1, Math.abs(a), Math.abs(v)) && Math.abs(s - m) <= r.EPSILON * Math.max(1, Math.abs(s), Math.abs(m)) && Math.abs(u - g) <= r.EPSILON * Math.max(1, Math.abs(u), Math.abs(g)) && Math.abs(l - y) <= r.EPSILON * Math.max(1, Math.abs(l), Math.abs(y)) && Math.abs(c - b) <= r.EPSILON * Math.max(1, Math.abs(c), Math.abs(b)) && Math.abs(f - _) <= r.EPSILON * Math.max(1, Math.abs(f), Math.abs(_))
        }
        ,
        n.exports = i,
        n.exports
    }),
    System.registerDynamic("b6", ["b2", "b5", "b7", "b8"], !0, function (t, e, n) {
      var r = t("b2")
        , i = t("b5")
        , o = t("b7")
        , a = t("b8")
        , s = {};
      return s.create = function () {
        var t = new r.ARRAY_TYPE(4);
        return t[0] = 0,
          t[1] = 0,
          t[2] = 0,
          t[3] = 1,
          t
      }
        ,
        s.rotationTo = function () {
          var t = o.create()
            , e = o.fromValues(1, 0, 0)
            , n = o.fromValues(0, 1, 0);
          return function (r, i, a) {
            var u = o.dot(i, a);
            return u < -.999999 ? (o.cross(t, e, i),
            o.length(t) < 1e-6 && o.cross(t, n, i),
              o.normalize(t, t),
              s.setAxisAngle(r, t, Math.PI),
              r) : u > .999999 ? (r[0] = 0,
              r[1] = 0,
              r[2] = 0,
              r[3] = 1,
              r) : (o.cross(t, i, a),
              r[0] = t[0],
              r[1] = t[1],
              r[2] = t[2],
              r[3] = 1 + u,
              s.normalize(r, r))
          }
        }(),
        s.setAxes = function () {
          var t = i.create();
          return function (e, n, r, i) {
            return t[0] = r[0],
              t[3] = r[1],
              t[6] = r[2],
              t[1] = i[0],
              t[4] = i[1],
              t[7] = i[2],
              t[2] = -n[0],
              t[5] = -n[1],
              t[8] = -n[2],
              s.normalize(e, s.fromMat3(e, t))
          }
        }(),
        s.clone = a.clone,
        s.fromValues = a.fromValues,
        s.copy = a.copy,
        s.set = a.set,
        s.identity = function (t) {
          return t[0] = 0,
            t[1] = 0,
            t[2] = 0,
            t[3] = 1,
            t
        }
        ,
        s.setAxisAngle = function (t, e, n) {
          n = .5 * n;
          var r = Math.sin(n);
          return t[0] = r * e[0],
            t[1] = r * e[1],
            t[2] = r * e[2],
            t[3] = Math.cos(n),
            t
        }
        ,
        s.getAxisAngle = function (t, e) {
          var n = 2 * Math.acos(e[3])
            , r = Math.sin(n / 2);
          return 0 != r ? (t[0] = e[0] / r,
            t[1] = e[1] / r,
            t[2] = e[2] / r) : (t[0] = 1,
            t[1] = 0,
            t[2] = 0),
            n
        }
        ,
        s.add = a.add,
        s.multiply = function (t, e, n) {
          var r = e[0]
            , i = e[1]
            , o = e[2]
            , a = e[3]
            , s = n[0]
            , u = n[1]
            , l = n[2]
            , c = n[3];
          return t[0] = r * c + a * s + i * l - o * u,
            t[1] = i * c + a * u + o * s - r * l,
            t[2] = o * c + a * l + r * u - i * s,
            t[3] = a * c - r * s - i * u - o * l,
            t
        }
        ,
        s.mul = s.multiply,
        s.scale = a.scale,
        s.rotateX = function (t, e, n) {
          n *= .5;
          var r = e[0]
            , i = e[1]
            , o = e[2]
            , a = e[3]
            , s = Math.sin(n)
            , u = Math.cos(n);
          return t[0] = r * u + a * s,
            t[1] = i * u + o * s,
            t[2] = o * u - i * s,
            t[3] = a * u - r * s,
            t
        }
        ,
        s.rotateY = function (t, e, n) {
          n *= .5;
          var r = e[0]
            , i = e[1]
            , o = e[2]
            , a = e[3]
            , s = Math.sin(n)
            , u = Math.cos(n);
          return t[0] = r * u - o * s,
            t[1] = i * u + a * s,
            t[2] = o * u + r * s,
            t[3] = a * u - i * s,
            t
        }
        ,
        s.rotateZ = function (t, e, n) {
          n *= .5;
          var r = e[0]
            , i = e[1]
            , o = e[2]
            , a = e[3]
            , s = Math.sin(n)
            , u = Math.cos(n);
          return t[0] = r * u + i * s,
            t[1] = i * u - r * s,
            t[2] = o * u + a * s,
            t[3] = a * u - o * s,
            t
        }
        ,
        s.calculateW = function (t, e) {
          var n = e[0]
            , r = e[1]
            , i = e[2];
          return t[0] = n,
            t[1] = r,
            t[2] = i,
            t[3] = Math.sqrt(Math.abs(1 - n * n - r * r - i * i)),
            t
        }
        ,
        s.dot = a.dot,
        s.lerp = a.lerp,
        s.slerp = function (t, e, n, r) {
          var i, o, a, s, u, l = e[0], c = e[1], f = e[2], p = e[3], h = n[0], d = n[1], v = n[2], m = n[3];
          return o = l * h + c * d + f * v + p * m,
          o < 0 && (o = -o,
            h = -h,
            d = -d,
            v = -v,
            m = -m),
            1 - o > 1e-6 ? (i = Math.acos(o),
              a = Math.sin(i),
              s = Math.sin((1 - r) * i) / a,
              u = Math.sin(r * i) / a) : (s = 1 - r,
              u = r),
            t[0] = s * l + u * h,
            t[1] = s * c + u * d,
            t[2] = s * f + u * v,
            t[3] = s * p + u * m,
            t
        }
        ,
        s.sqlerp = function () {
          var t = s.create()
            , e = s.create();
          return function (n, r, i, o, a, u) {
            return s.slerp(t, r, a, u),
              s.slerp(e, i, o, u),
              s.slerp(n, t, e, 2 * u * (1 - u)),
              n
          }
        }(),
        s.invert = function (t, e) {
          var n = e[0]
            , r = e[1]
            , i = e[2]
            , o = e[3]
            , a = n * n + r * r + i * i + o * o
            , s = a ? 1 / a : 0;
          return t[0] = -n * s,
            t[1] = -r * s,
            t[2] = -i * s,
            t[3] = o * s,
            t
        }
        ,
        s.conjugate = function (t, e) {
          return t[0] = -e[0],
            t[1] = -e[1],
            t[2] = -e[2],
            t[3] = e[3],
            t
        }
        ,
        s.length = a.length,
        s.len = s.length,
        s.squaredLength = a.squaredLength,
        s.sqrLen = s.squaredLength,
        s.normalize = a.normalize,
        s.fromMat3 = function (t, e) {
          var n, r = e[0] + e[4] + e[8];
          if (r > 0)
            n = Math.sqrt(r + 1),
              t[3] = .5 * n,
              n = .5 / n,
              t[0] = (e[5] - e[7]) * n,
              t[1] = (e[6] - e[2]) * n,
              t[2] = (e[1] - e[3]) * n;
          else {
            var i = 0;
            e[4] > e[0] && (i = 1),
            e[8] > e[3 * i + i] && (i = 2);
            var o = (i + 1) % 3
              , a = (i + 2) % 3;
            n = Math.sqrt(e[3 * i + i] - e[3 * o + o] - e[3 * a + a] + 1),
              t[i] = .5 * n,
              n = .5 / n,
              t[3] = (e[3 * o + a] - e[3 * a + o]) * n,
              t[o] = (e[3 * o + i] + e[3 * i + o]) * n,
              t[a] = (e[3 * a + i] + e[3 * i + a]) * n
          }
          return t
        }
        ,
        s.str = function (t) {
          return "quat(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")"
        }
        ,
        s.exactEquals = a.exactEquals,
        s.equals = a.equals,
        n.exports = s,
        n.exports
    }),
    System.registerDynamic("b9", ["b2"], !0, function (t, e, n) {
      var r = t("b2")
        , i = {};
      return i.create = function () {
        var t = new r.ARRAY_TYPE(2);
        return t[0] = 0,
          t[1] = 0,
          t
      }
        ,
        i.clone = function (t) {
          var e = new r.ARRAY_TYPE(2);
          return e[0] = t[0],
            e[1] = t[1],
            e
        }
        ,
        i.fromValues = function (t, e) {
          var n = new r.ARRAY_TYPE(2);
          return n[0] = t,
            n[1] = e,
            n
        }
        ,
        i.copy = function (t, e) {
          return t[0] = e[0],
            t[1] = e[1],
            t
        }
        ,
        i.set = function (t, e, n) {
          return t[0] = e,
            t[1] = n,
            t
        }
        ,
        i.add = function (t, e, n) {
          return t[0] = e[0] + n[0],
            t[1] = e[1] + n[1],
            t
        }
        ,
        i.subtract = function (t, e, n) {
          return t[0] = e[0] - n[0],
            t[1] = e[1] - n[1],
            t
        }
        ,
        i.sub = i.subtract,
        i.multiply = function (t, e, n) {
          return t[0] = e[0] * n[0],
            t[1] = e[1] * n[1],
            t
        }
        ,
        i.mul = i.multiply,
        i.divide = function (t, e, n) {
          return t[0] = e[0] / n[0],
            t[1] = e[1] / n[1],
            t
        }
        ,
        i.div = i.divide,
        i.ceil = function (t, e) {
          return t[0] = Math.ceil(e[0]),
            t[1] = Math.ceil(e[1]),
            t
        }
        ,
        i.floor = function (t, e) {
          return t[0] = Math.floor(e[0]),
            t[1] = Math.floor(e[1]),
            t
        }
        ,
        i.min = function (t, e, n) {
          return t[0] = Math.min(e[0], n[0]),
            t[1] = Math.min(e[1], n[1]),
            t
        }
        ,
        i.max = function (t, e, n) {
          return t[0] = Math.max(e[0], n[0]),
            t[1] = Math.max(e[1], n[1]),
            t
        }
        ,
        i.round = function (t, e) {
          return t[0] = Math.round(e[0]),
            t[1] = Math.round(e[1]),
            t
        }
        ,
        i.scale = function (t, e, n) {
          return t[0] = e[0] * n,
            t[1] = e[1] * n,
            t
        }
        ,
        i.scaleAndAdd = function (t, e, n, r) {
          return t[0] = e[0] + n[0] * r,
            t[1] = e[1] + n[1] * r,
            t
        }
        ,
        i.distance = function (t, e) {
          var n = e[0] - t[0]
            , r = e[1] - t[1];
          return Math.sqrt(n * n + r * r)
        }
        ,
        i.dist = i.distance,
        i.squaredDistance = function (t, e) {
          var n = e[0] - t[0]
            , r = e[1] - t[1];
          return n * n + r * r
        }
        ,
        i.sqrDist = i.squaredDistance,
        i.length = function (t) {
          var e = t[0]
            , n = t[1];
          return Math.sqrt(e * e + n * n)
        }
        ,
        i.len = i.length,
        i.squaredLength = function (t) {
          var e = t[0]
            , n = t[1];
          return e * e + n * n
        }
        ,
        i.sqrLen = i.squaredLength,
        i.negate = function (t, e) {
          return t[0] = -e[0],
            t[1] = -e[1],
            t
        }
        ,
        i.inverse = function (t, e) {
          return t[0] = 1 / e[0],
            t[1] = 1 / e[1],
            t
        }
        ,
        i.normalize = function (t, e) {
          var n = e[0]
            , r = e[1]
            , i = n * n + r * r;
          return i > 0 && (i = 1 / Math.sqrt(i),
            t[0] = e[0] * i,
            t[1] = e[1] * i),
            t
        }
        ,
        i.dot = function (t, e) {
          return t[0] * e[0] + t[1] * e[1]
        }
        ,
        i.cross = function (t, e, n) {
          var r = e[0] * n[1] - e[1] * n[0];
          return t[0] = t[1] = 0,
            t[2] = r,
            t
        }
        ,
        i.lerp = function (t, e, n, r) {
          var i = e[0]
            , o = e[1];
          return t[0] = i + r * (n[0] - i),
            t[1] = o + r * (n[1] - o),
            t
        }
        ,
        i.random = function (t, e) {
          e = e || 1;
          var n = 2 * r.RANDOM() * Math.PI;
          return t[0] = Math.cos(n) * e,
            t[1] = Math.sin(n) * e,
            t
        }
        ,
        i.transformMat2 = function (t, e, n) {
          var r = e[0]
            , i = e[1];
          return t[0] = n[0] * r + n[2] * i,
            t[1] = n[1] * r + n[3] * i,
            t
        }
        ,
        i.transformMat2d = function (t, e, n) {
          var r = e[0]
            , i = e[1];
          return t[0] = n[0] * r + n[2] * i + n[4],
            t[1] = n[1] * r + n[3] * i + n[5],
            t
        }
        ,
        i.transformMat3 = function (t, e, n) {
          var r = e[0]
            , i = e[1];
          return t[0] = n[0] * r + n[3] * i + n[6],
            t[1] = n[1] * r + n[4] * i + n[7],
            t
        }
        ,
        i.transformMat4 = function (t, e, n) {
          var r = e[0]
            , i = e[1];
          return t[0] = n[0] * r + n[4] * i + n[12],
            t[1] = n[1] * r + n[5] * i + n[13],
            t
        }
        ,
        i.forEach = function () {
          var t = i.create();
          return function (e, n, r, i, o, a) {
            var s, u;
            for (n || (n = 2),
                 r || (r = 0),
                   u = i ? Math.min(i * n + r, e.length) : e.length,
                   s = r; s < u; s += n)
              t[0] = e[s],
                t[1] = e[s + 1],
                o(t, t, a),
                e[s] = t[0],
                e[s + 1] = t[1];
            return e
          }
        }(),
        i.str = function (t) {
          return "vec2(" + t[0] + ", " + t[1] + ")"
        }
        ,
        i.exactEquals = function (t, e) {
          return t[0] === e[0] && t[1] === e[1]
        }
        ,
        i.equals = function (t, e) {
          var n = t[0]
            , i = t[1]
            , o = e[0]
            , a = e[1];
          return Math.abs(n - o) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(o)) && Math.abs(i - a) <= r.EPSILON * Math.max(1, Math.abs(i), Math.abs(a))
        }
        ,
        n.exports = i,
        n.exports
    }),
    System.registerDynamic("b7", ["b2"], !0, function (t, e, n) {
      var r = t("b2")
        , i = {};
      return i.create = function () {
        var t = new r.ARRAY_TYPE(3);
        return t[0] = 0,
          t[1] = 0,
          t[2] = 0,
          t
      }
        ,
        i.clone = function (t) {
          var e = new r.ARRAY_TYPE(3);
          return e[0] = t[0],
            e[1] = t[1],
            e[2] = t[2],
            e
        }
        ,
        i.fromValues = function (t, e, n) {
          var i = new r.ARRAY_TYPE(3);
          return i[0] = t,
            i[1] = e,
            i[2] = n,
            i
        }
        ,
        i.copy = function (t, e) {
          return t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t
        }
        ,
        i.set = function (t, e, n, r) {
          return t[0] = e,
            t[1] = n,
            t[2] = r,
            t
        }
        ,
        i.add = function (t, e, n) {
          return t[0] = e[0] + n[0],
            t[1] = e[1] + n[1],
            t[2] = e[2] + n[2],
            t
        }
        ,
        i.subtract = function (t, e, n) {
          return t[0] = e[0] - n[0],
            t[1] = e[1] - n[1],
            t[2] = e[2] - n[2],
            t
        }
        ,
        i.sub = i.subtract,
        i.multiply = function (t, e, n) {
          return t[0] = e[0] * n[0],
            t[1] = e[1] * n[1],
            t[2] = e[2] * n[2],
            t
        }
        ,
        i.mul = i.multiply,
        i.divide = function (t, e, n) {
          return t[0] = e[0] / n[0],
            t[1] = e[1] / n[1],
            t[2] = e[2] / n[2],
            t
        }
        ,
        i.div = i.divide,
        i.ceil = function (t, e) {
          return t[0] = Math.ceil(e[0]),
            t[1] = Math.ceil(e[1]),
            t[2] = Math.ceil(e[2]),
            t
        }
        ,
        i.floor = function (t, e) {
          return t[0] = Math.floor(e[0]),
            t[1] = Math.floor(e[1]),
            t[2] = Math.floor(e[2]),
            t
        }
        ,
        i.min = function (t, e, n) {
          return t[0] = Math.min(e[0], n[0]),
            t[1] = Math.min(e[1], n[1]),
            t[2] = Math.min(e[2], n[2]),
            t
        }
        ,
        i.max = function (t, e, n) {
          return t[0] = Math.max(e[0], n[0]),
            t[1] = Math.max(e[1], n[1]),
            t[2] = Math.max(e[2], n[2]),
            t
        }
        ,
        i.round = function (t, e) {
          return t[0] = Math.round(e[0]),
            t[1] = Math.round(e[1]),
            t[2] = Math.round(e[2]),
            t
        }
        ,
        i.scale = function (t, e, n) {
          return t[0] = e[0] * n,
            t[1] = e[1] * n,
            t[2] = e[2] * n,
            t
        }
        ,
        i.scaleAndAdd = function (t, e, n, r) {
          return t[0] = e[0] + n[0] * r,
            t[1] = e[1] + n[1] * r,
            t[2] = e[2] + n[2] * r,
            t
        }
        ,
        i.distance = function (t, e) {
          var n = e[0] - t[0]
            , r = e[1] - t[1]
            , i = e[2] - t[2];
          return Math.sqrt(n * n + r * r + i * i)
        }
        ,
        i.dist = i.distance,
        i.squaredDistance = function (t, e) {
          var n = e[0] - t[0]
            , r = e[1] - t[1]
            , i = e[2] - t[2];
          return n * n + r * r + i * i
        }
        ,
        i.sqrDist = i.squaredDistance,
        i.length = function (t) {
          var e = t[0]
            , n = t[1]
            , r = t[2];
          return Math.sqrt(e * e + n * n + r * r)
        }
        ,
        i.len = i.length,
        i.squaredLength = function (t) {
          var e = t[0]
            , n = t[1]
            , r = t[2];
          return e * e + n * n + r * r
        }
        ,
        i.sqrLen = i.squaredLength,
        i.negate = function (t, e) {
          return t[0] = -e[0],
            t[1] = -e[1],
            t[2] = -e[2],
            t
        }
        ,
        i.inverse = function (t, e) {
          return t[0] = 1 / e[0],
            t[1] = 1 / e[1],
            t[2] = 1 / e[2],
            t
        }
        ,
        i.normalize = function (t, e) {
          var n = e[0]
            , r = e[1]
            , i = e[2]
            , o = n * n + r * r + i * i;
          return o > 0 && (o = 1 / Math.sqrt(o),
            t[0] = e[0] * o,
            t[1] = e[1] * o,
            t[2] = e[2] * o),
            t
        }
        ,
        i.dot = function (t, e) {
          return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
        }
        ,
        i.cross = function (t, e, n) {
          var r = e[0]
            , i = e[1]
            , o = e[2]
            , a = n[0]
            , s = n[1]
            , u = n[2];
          return t[0] = i * u - o * s,
            t[1] = o * a - r * u,
            t[2] = r * s - i * a,
            t
        }
        ,
        i.lerp = function (t, e, n, r) {
          var i = e[0]
            , o = e[1]
            , a = e[2];
          return t[0] = i + r * (n[0] - i),
            t[1] = o + r * (n[1] - o),
            t[2] = a + r * (n[2] - a),
            t
        }
        ,
        i.hermite = function (t, e, n, r, i, o) {
          var a = o * o
            , s = a * (2 * o - 3) + 1
            , u = a * (o - 2) + o
            , l = a * (o - 1)
            , c = a * (3 - 2 * o);
          return t[0] = e[0] * s + n[0] * u + r[0] * l + i[0] * c,
            t[1] = e[1] * s + n[1] * u + r[1] * l + i[1] * c,
            t[2] = e[2] * s + n[2] * u + r[2] * l + i[2] * c,
            t
        }
        ,
        i.bezier = function (t, e, n, r, i, o) {
          var a = 1 - o
            , s = a * a
            , u = o * o
            , l = s * a
            , c = 3 * o * s
            , f = 3 * u * a
            , p = u * o;
          return t[0] = e[0] * l + n[0] * c + r[0] * f + i[0] * p,
            t[1] = e[1] * l + n[1] * c + r[1] * f + i[1] * p,
            t[2] = e[2] * l + n[2] * c + r[2] * f + i[2] * p,
            t
        }
        ,
        i.random = function (t, e) {
          e = e || 1;
          var n = 2 * r.RANDOM() * Math.PI
            , i = 2 * r.RANDOM() - 1
            , o = Math.sqrt(1 - i * i) * e;
          return t[0] = Math.cos(n) * o,
            t[1] = Math.sin(n) * o,
            t[2] = i * e,
            t
        }
        ,
        i.transformMat4 = function (t, e, n) {
          var r = e[0]
            , i = e[1]
            , o = e[2]
            , a = n[3] * r + n[7] * i + n[11] * o + n[15];
          return a = a || 1,
            t[0] = (n[0] * r + n[4] * i + n[8] * o + n[12]) / a,
            t[1] = (n[1] * r + n[5] * i + n[9] * o + n[13]) / a,
            t[2] = (n[2] * r + n[6] * i + n[10] * o + n[14]) / a,
            t
        }
        ,
        i.transformMat3 = function (t, e, n) {
          var r = e[0]
            , i = e[1]
            , o = e[2];
          return t[0] = r * n[0] + i * n[3] + o * n[6],
            t[1] = r * n[1] + i * n[4] + o * n[7],
            t[2] = r * n[2] + i * n[5] + o * n[8],
            t
        }
        ,
        i.transformQuat = function (t, e, n) {
          var r = e[0]
            , i = e[1]
            , o = e[2]
            , a = n[0]
            , s = n[1]
            , u = n[2]
            , l = n[3]
            , c = l * r + s * o - u * i
            , f = l * i + u * r - a * o
            , p = l * o + a * i - s * r
            , h = -a * r - s * i - u * o;
          return t[0] = c * l + h * -a + f * -u - p * -s,
            t[1] = f * l + h * -s + p * -a - c * -u,
            t[2] = p * l + h * -u + c * -s - f * -a,
            t
        }
        ,
        i.rotateX = function (t, e, n, r) {
          var i = []
            , o = [];
          return i[0] = e[0] - n[0],
            i[1] = e[1] - n[1],
            i[2] = e[2] - n[2],
            o[0] = i[0],
            o[1] = i[1] * Math.cos(r) - i[2] * Math.sin(r),
            o[2] = i[1] * Math.sin(r) + i[2] * Math.cos(r),
            t[0] = o[0] + n[0],
            t[1] = o[1] + n[1],
            t[2] = o[2] + n[2],
            t
        }
        ,
        i.rotateY = function (t, e, n, r) {
          var i = []
            , o = [];
          return i[0] = e[0] - n[0],
            i[1] = e[1] - n[1],
            i[2] = e[2] - n[2],
            o[0] = i[2] * Math.sin(r) + i[0] * Math.cos(r),
            o[1] = i[1],
            o[2] = i[2] * Math.cos(r) - i[0] * Math.sin(r),
            t[0] = o[0] + n[0],
            t[1] = o[1] + n[1],
            t[2] = o[2] + n[2],
            t
        }
        ,
        i.rotateZ = function (t, e, n, r) {
          var i = []
            , o = [];
          return i[0] = e[0] - n[0],
            i[1] = e[1] - n[1],
            i[2] = e[2] - n[2],
            o[0] = i[0] * Math.cos(r) - i[1] * Math.sin(r),
            o[1] = i[0] * Math.sin(r) + i[1] * Math.cos(r),
            o[2] = i[2],
            t[0] = o[0] + n[0],
            t[1] = o[1] + n[1],
            t[2] = o[2] + n[2],
            t
        }
        ,
        i.forEach = function () {
          var t = i.create();
          return function (e, n, r, i, o, a) {
            var s, u;
            for (n || (n = 3),
                 r || (r = 0),
                   u = i ? Math.min(i * n + r, e.length) : e.length,
                   s = r; s < u; s += n)
              t[0] = e[s],
                t[1] = e[s + 1],
                t[2] = e[s + 2],
                o(t, t, a),
                e[s] = t[0],
                e[s + 1] = t[1],
                e[s + 2] = t[2];
            return e
          }
        }(),
        i.angle = function (t, e) {
          var n = i.fromValues(t[0], t[1], t[2])
            , r = i.fromValues(e[0], e[1], e[2]);
          i.normalize(n, n),
            i.normalize(r, r);
          var o = i.dot(n, r);
          return o > 1 ? 0 : Math.acos(o)
        }
        ,
        i.str = function (t) {
          return "vec3(" + t[0] + ", " + t[1] + ", " + t[2] + ")"
        }
        ,
        i.exactEquals = function (t, e) {
          return t[0] === e[0] && t[1] === e[1] && t[2] === e[2]
        }
        ,
        i.equals = function (t, e) {
          var n = t[0]
            , i = t[1]
            , o = t[2]
            , a = e[0]
            , s = e[1]
            , u = e[2];
          return Math.abs(n - a) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(a)) && Math.abs(i - s) <= r.EPSILON * Math.max(1, Math.abs(i), Math.abs(s)) && Math.abs(o - u) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(u))
        }
        ,
        n.exports = i,
        n.exports
    }),
    System.registerDynamic("b2", [], !0, function (t, e, n) {
      var r = {};
      r.EPSILON = 1e-6,
        r.ARRAY_TYPE = "undefined" != typeof Float32Array ? Float32Array : Array,
        r.RANDOM = Math.random,
        r.ENABLE_SIMD = !1,
        r.SIMD_AVAILABLE = r.ARRAY_TYPE === Float32Array && "SIMD" in this,
        r.USE_SIMD = r.ENABLE_SIMD && r.SIMD_AVAILABLE,
        r.setMatrixArrayType = function (t) {
          r.ARRAY_TYPE = t
        }
      ;
      var i = Math.PI / 180;
      return r.toRadian = function (t) {
        return t * i
      }
        ,
        r.equals = function (t, e) {
          return Math.abs(t - e) <= r.EPSILON * Math.max(1, Math.abs(t), Math.abs(e))
        }
        ,
        n.exports = r,
        n.exports
    }),
    System.registerDynamic("b8", ["b2"], !0, function (t, e, n) {
      var r = t("b2")
        , i = {};
      return i.create = function () {
        var t = new r.ARRAY_TYPE(4);
        return t[0] = 0,
          t[1] = 0,
          t[2] = 0,
          t[3] = 0,
          t
      }
        ,
        i.clone = function (t) {
          var e = new r.ARRAY_TYPE(4);
          return e[0] = t[0],
            e[1] = t[1],
            e[2] = t[2],
            e[3] = t[3],
            e
        }
        ,
        i.fromValues = function (t, e, n, i) {
          var o = new r.ARRAY_TYPE(4);
          return o[0] = t,
            o[1] = e,
            o[2] = n,
            o[3] = i,
            o
        }
        ,
        i.copy = function (t, e) {
          return t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t
        }
        ,
        i.set = function (t, e, n, r, i) {
          return t[0] = e,
            t[1] = n,
            t[2] = r,
            t[3] = i,
            t
        }
        ,
        i.add = function (t, e, n) {
          return t[0] = e[0] + n[0],
            t[1] = e[1] + n[1],
            t[2] = e[2] + n[2],
            t[3] = e[3] + n[3],
            t
        }
        ,
        i.subtract = function (t, e, n) {
          return t[0] = e[0] - n[0],
            t[1] = e[1] - n[1],
            t[2] = e[2] - n[2],
            t[3] = e[3] - n[3],
            t
        }
        ,
        i.sub = i.subtract,
        i.multiply = function (t, e, n) {
          return t[0] = e[0] * n[0],
            t[1] = e[1] * n[1],
            t[2] = e[2] * n[2],
            t[3] = e[3] * n[3],
            t
        }
        ,
        i.mul = i.multiply,
        i.divide = function (t, e, n) {
          return t[0] = e[0] / n[0],
            t[1] = e[1] / n[1],
            t[2] = e[2] / n[2],
            t[3] = e[3] / n[3],
            t
        }
        ,
        i.div = i.divide,
        i.ceil = function (t, e) {
          return t[0] = Math.ceil(e[0]),
            t[1] = Math.ceil(e[1]),
            t[2] = Math.ceil(e[2]),
            t[3] = Math.ceil(e[3]),
            t
        }
        ,
        i.floor = function (t, e) {
          return t[0] = Math.floor(e[0]),
            t[1] = Math.floor(e[1]),
            t[2] = Math.floor(e[2]),
            t[3] = Math.floor(e[3]),
            t
        }
        ,
        i.min = function (t, e, n) {
          return t[0] = Math.min(e[0], n[0]),
            t[1] = Math.min(e[1], n[1]),
            t[2] = Math.min(e[2], n[2]),
            t[3] = Math.min(e[3], n[3]),
            t
        }
        ,
        i.max = function (t, e, n) {
          return t[0] = Math.max(e[0], n[0]),
            t[1] = Math.max(e[1], n[1]),
            t[2] = Math.max(e[2], n[2]),
            t[3] = Math.max(e[3], n[3]),
            t
        }
        ,
        i.round = function (t, e) {
          return t[0] = Math.round(e[0]),
            t[1] = Math.round(e[1]),
            t[2] = Math.round(e[2]),
            t[3] = Math.round(e[3]),
            t
        }
        ,
        i.scale = function (t, e, n) {
          return t[0] = e[0] * n,
            t[1] = e[1] * n,
            t[2] = e[2] * n,
            t[3] = e[3] * n,
            t
        }
        ,
        i.scaleAndAdd = function (t, e, n, r) {
          return t[0] = e[0] + n[0] * r,
            t[1] = e[1] + n[1] * r,
            t[2] = e[2] + n[2] * r,
            t[3] = e[3] + n[3] * r,
            t
        }
        ,
        i.distance = function (t, e) {
          var n = e[0] - t[0]
            , r = e[1] - t[1]
            , i = e[2] - t[2]
            , o = e[3] - t[3];
          return Math.sqrt(n * n + r * r + i * i + o * o)
        }
        ,
        i.dist = i.distance,
        i.squaredDistance = function (t, e) {
          var n = e[0] - t[0]
            , r = e[1] - t[1]
            , i = e[2] - t[2]
            , o = e[3] - t[3];
          return n * n + r * r + i * i + o * o
        }
        ,
        i.sqrDist = i.squaredDistance,
        i.length = function (t) {
          var e = t[0]
            , n = t[1]
            , r = t[2]
            , i = t[3];
          return Math.sqrt(e * e + n * n + r * r + i * i)
        }
        ,
        i.len = i.length,
        i.squaredLength = function (t) {
          var e = t[0]
            , n = t[1]
            , r = t[2]
            , i = t[3];
          return e * e + n * n + r * r + i * i
        }
        ,
        i.sqrLen = i.squaredLength,
        i.negate = function (t, e) {
          return t[0] = -e[0],
            t[1] = -e[1],
            t[2] = -e[2],
            t[3] = -e[3],
            t
        }
        ,
        i.inverse = function (t, e) {
          return t[0] = 1 / e[0],
            t[1] = 1 / e[1],
            t[2] = 1 / e[2],
            t[3] = 1 / e[3],
            t
        }
        ,
        i.normalize = function (t, e) {
          var n = e[0]
            , r = e[1]
            , i = e[2]
            , o = e[3]
            , a = n * n + r * r + i * i + o * o;
          return a > 0 && (a = 1 / Math.sqrt(a),
            t[0] = n * a,
            t[1] = r * a,
            t[2] = i * a,
            t[3] = o * a),
            t
        }
        ,
        i.dot = function (t, e) {
          return t[0] * e[0] + t[1] * e[1] + t[2] * e[2] + t[3] * e[3]
        }
        ,
        i.lerp = function (t, e, n, r) {
          var i = e[0]
            , o = e[1]
            , a = e[2]
            , s = e[3];
          return t[0] = i + r * (n[0] - i),
            t[1] = o + r * (n[1] - o),
            t[2] = a + r * (n[2] - a),
            t[3] = s + r * (n[3] - s),
            t
        }
        ,
        i.random = function (t, e) {
          return e = e || 1,
            t[0] = r.RANDOM(),
            t[1] = r.RANDOM(),
            t[2] = r.RANDOM(),
            t[3] = r.RANDOM(),
            i.normalize(t, t),
            i.scale(t, t, e),
            t
        }
        ,
        i.transformMat4 = function (t, e, n) {
          var r = e[0]
            , i = e[1]
            , o = e[2]
            , a = e[3];
          return t[0] = n[0] * r + n[4] * i + n[8] * o + n[12] * a,
            t[1] = n[1] * r + n[5] * i + n[9] * o + n[13] * a,
            t[2] = n[2] * r + n[6] * i + n[10] * o + n[14] * a,
            t[3] = n[3] * r + n[7] * i + n[11] * o + n[15] * a,
            t
        }
        ,
        i.transformQuat = function (t, e, n) {
          var r = e[0]
            , i = e[1]
            , o = e[2]
            , a = n[0]
            , s = n[1]
            , u = n[2]
            , l = n[3]
            , c = l * r + s * o - u * i
            , f = l * i + u * r - a * o
            , p = l * o + a * i - s * r
            , h = -a * r - s * i - u * o;
          return t[0] = c * l + h * -a + f * -u - p * -s,
            t[1] = f * l + h * -s + p * -a - c * -u,
            t[2] = p * l + h * -u + c * -s - f * -a,
            t[3] = e[3],
            t
        }
        ,
        i.forEach = function () {
          var t = i.create();
          return function (e, n, r, i, o, a) {
            var s, u;
            for (n || (n = 4),
                 r || (r = 0),
                   u = i ? Math.min(i * n + r, e.length) : e.length,
                   s = r; s < u; s += n)
              t[0] = e[s],
                t[1] = e[s + 1],
                t[2] = e[s + 2],
                t[3] = e[s + 3],
                o(t, t, a),
                e[s] = t[0],
                e[s + 1] = t[1],
                e[s + 2] = t[2],
                e[s + 3] = t[3];
            return e
          }
        }(),
        i.str = function (t) {
          return "vec4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")"
        }
        ,
        i.exactEquals = function (t, e) {
          return t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3]
        }
        ,
        i.equals = function (t, e) {
          var n = t[0]
            , i = t[1]
            , o = t[2]
            , a = t[3]
            , s = e[0]
            , u = e[1]
            , l = e[2]
            , c = e[3];
          return Math.abs(n - s) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(s)) && Math.abs(i - u) <= r.EPSILON * Math.max(1, Math.abs(i), Math.abs(u)) && Math.abs(o - l) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(l)) && Math.abs(a - c) <= r.EPSILON * Math.max(1, Math.abs(a), Math.abs(c))
        }
        ,
        n.exports = i,
        n.exports
    }),
    System.registerDynamic("ba", ["b2", "b1", "b3", "b5", "b4", "b6", "b9", "b7", "b8"], !0, function (t, e, n) {
      return e.glMatrix = t("b2"),
        e.mat2 = t("b1"),
        e.mat2d = t("b3"),
        e.mat3 = t("b5"),
        e.mat4 = t("b4"),
        e.quat = t("b6"),
        e.vec2 = t("b9"),
        e.vec3 = t("b7"),
        e.vec4 = t("b8"),
        n.exports
    }),
    System.registerDynamic("5e", ["ba"], !0, function (t, e, n) {
      return n.exports = t("ba"),
        n.exports
    }),
    System.registerDynamic("69", ["b0", "5e"], !0, function (t, e, n) {
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
        }
          , n = t.getContext("webgl", e) || t.getContext("experimental-webgl", e);
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
        return f(t, h + "\n\t\tattribute vec2 position;\n\t\tattribute vec2 texcoords;\n\t\tattribute vec2 texcoords1;\n\t\tattribute vec4 vertexColor;\n\n\t\tuniform mat4 transform;\n\t\tuniform vec4 lighting;\n\n\t\tvarying vec2 textureCoord;\n\t\tvarying vec2 paletteCoord;\n\t\tvarying vec4 vColor;\n\n\t\tvoid main() {\n\t\t\ttextureCoord = texcoords;\n\t\t\tpaletteCoord = texcoords1;\n\t\t\tvColor = vertexColor * lighting;\n\t\t\tgl_Position = transform * vec4(position, 0, 1);\n\t\t}\n\t", h + "\n\t\tuniform sampler2D sampler1; // sprite\n\t\tuniform sampler2D sampler2; // palette\n\t\tuniform float pixelSize;\n\n\t\tvarying vec2 textureCoord;\n\t\tvarying vec2 paletteCoord;\n\t\tvarying vec4 vColor;\n\n\t\tvoid main() {\n\t\t\tvec4 sprite = texture2D(sampler1, vec2(textureCoord.x, textureCoord.y));\n\t\t\tvec4 palette = texture2D(sampler2, vec2(paletteCoord.x + sprite.x * pixelSize, paletteCoord.y));\n\t\t\tgl_FragColor = vec4(palette.xyz * sprite.y, palette.w) * vColor;\n\t\t}\n\t")
      }

      var f = t("b0")
        , p = t("5e")
        , h = "\n\t#ifdef GL_ES\n\tprecision mediump float;\n\t#endif\n";
      return e.getRenderTargetSize = r,
        e.getWebGLContext = i,
        e.createIndices = o,
        e.createViewMatrix = a,
        e.createViewMatrix2 = s,
        e.createBasicShader = u,
        e.createSpriteShader = l,
        e.createPaletteShader = c,
        n.exports
    }),
    System.registerDynamic("bb", [], !0, function (t, e, n) {
      "use strict";
      function r(t) {
        return t.target && /^(input|textarea|select)$/i.test(t.target.tagName)
      }

      var i = function () {
        function t(t) {
          this.manager = t
        }

        return t.prototype.initialize = function () {
          var t = this;
          this.initialized || (this.initialized = !0,
            window.addEventListener("keydown", function (e) {
              !r(e) && t.manager.setValue(e.keyCode, 1) && (e.preventDefault(),
                e.stopPropagation())
            }),
            window.addEventListener("keyup", function (e) {
              t.manager.setValue(e.keyCode, 0) && (e.preventDefault(),
                e.stopPropagation())
            }),
            window.addEventListener("blur", function (e) {
              t.manager.clear()
            }))
        }
          ,
          t.prototype.update = function () {
          }
          ,
          t.prototype.draw = function () {
          }
          ,
          t
      }();
      return e.KeyboardController = i,
        n.exports
    }),
    System.registerDynamic("bc", [], !0, function (t, e, n) {
      "use strict";
      var r = [1002, 1004, 1003]
        , i = function () {
        function t(t) {
          this.manager = t
        }

        return t.prototype.initialize = function () {
          var t = this;
          if (!this.initialized) {
            this.initialized = !0;
            var e = document.getElementById("canvas");
            e.addEventListener("mousemove", function (e) {
              t.manager.setValue(1e3, Math.floor(e.clientX)),
                t.manager.setValue(1001, Math.floor(e.clientY))
            }),
              e.addEventListener("mousedown", function (e) {
                t.manager.setValue(r[e.button], 1)
              }),
              e.addEventListener("mouseup", function (e) {
                t.manager.setValue(r[e.button], 0)
              }),
              e.addEventListener("contextmenu", function (t) {
                t.preventDefault(),
                  t.stopPropagation()
              }),
              window.addEventListener("blur", function () {
                t.manager.setValue(1002, 0)
              })
          }
        }
          ,
          t.prototype.update = function () {
          }
          ,
          t.prototype.draw = function () {
          }
          ,
          t
      }();
      return e.MouseController = i,
        n.exports
    }),
    System.registerDynamic("bd", ["22"], !0, function (t, e, n) {
      "use strict";
      function r(t, e) {
        for (var n = 0; n < t.changedTouches.length; ++n) {
          var r = t.changedTouches.item(n);
          if (r.identifier === e)
            return r
        }
        return null
      }

      var i = t("22")
        , o = 15
        , a = 100
        , s = function () {
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

        return t.prototype.initialize = function () {
          var t = this;
          if (!this.initialized) {
            this.initialized = !0,
              this.origin = document.getElementById("touch-origin"),
              this.position = document.getElementById("touch-position");
            var e = document.getElementById("canvas");
            e.addEventListener("touchstart", function (e) {
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
              e.addEventListener("touchmove", function (e) {
                e.preventDefault(),
                  e.stopPropagation();
                var n = r(e, t.touchId);
                n && (t.touchCurrent = {
                  x: n.clientX,
                  y: n.clientY
                },
                  t.updateInput())
              }),
              e.addEventListener("touchend", function (e) {
                e.preventDefault(),
                  e.stopPropagation();
                var n = r(e, t.touchId);
                n && (t.touchIsDrag || (t.manager.setValue(1e3, t.touchStart.x),
                  t.manager.setValue(1001, t.touchStart.y),
                  t.manager.setValue(1002, 1)),
                  t.resetTouch())
              }),
              window.addEventListener("blur", function () {
                return t.resetTouch()
              })
          }
        }
          ,
          t.prototype.update = function () {
          }
          ,
          t.prototype.draw = function () {
            var t = this.touchIsDrag && this.touchId !== -1
              , e = this.touchId !== -1;
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
          }
          ,
          t.prototype.resetTouch = function () {
            this.touchId = -1,
              this.touchStart = this.touchCurrent = {
                x: 0,
                y: 0
              },
              this.touchIsDrag = !1,
              this.updateInput()
          }
          ,
          t.prototype.updateInput = function () {
            var t = this.touchStart.y - this.touchCurrent.y
              , e = this.touchStart.x - this.touchCurrent.x
              , n = Math.atan2(t, e)
              , r = Math.sqrt(t * t + e * e);
            if (r > o) {
              var i = Math.min((r - o) / (a - o), 1);
              this.touchIsDrag = !0,
                this.manager.setValue(2e3, -Math.cos(n) * i),
                this.manager.setValue(2001, -Math.sin(n) * i)
            } else
              this.manager.setValue(2e3, 0),
                this.manager.setValue(2001, 0)
          }
          ,
          t
      }();
      return e.TouchController = s,
        n.exports
    }),
    System.registerDynamic("be", ["28"], !0, function (t, e, n) {
      "use strict";
      var r = t("28")
        , i = .2
        , o = function () {
        function t(t) {
          this.manager = t,
            this.gamepadIndex = -1
        }

        return t.prototype.initialize = function () {
          var t = this;
          this.initialized || (this.initialized = !0,
            window.addEventListener("gamepadconnected", function (e) {
              t.gamepadIndex = e.gamepad.index
            }),
            window.addEventListener("gamepaddisconnected", function (e) {
              t.gamepadIndex === e.gamepad.index && t.scanGamepads()
            }),
            this.scanGamepads())
        }
          ,
          t.prototype.update = function () {
            if (this.gamepadIndex !== -1) {
              var t = navigator.getGamepads()
                , e = t[this.gamepadIndex];
              if (!e)
                return void this.scanGamepads();
              var n = "(null) (null) (Vendor: 045e Product: 0289)" === e.id || "045e-0289-Microsoft X-Box pad v2 (US)" === e.id
                , r = n ? 4 : 3
                , o = Math.sqrt(e.axes[0] * e.axes[0] + e.axes[1] * e.axes[1]);
              if (o > i) {
                this.zeroed = !1;
                var a = Math.min((o - i) / (1 - i), 1)
                  , s = Math.atan2(e.axes[1], e.axes[0]);
                this.manager.setValue(2e3, Math.cos(s) * a),
                  this.manager.setValue(2001, Math.sin(s) * a)
              } else
                this.zeroed || (this.manager.setValue(2e3, 0),
                  this.manager.setValue(2001, 0),
                  this.zeroed = !0);
              this.manager.setValue(3003, e.buttons[r] && e.buttons[r].pressed ? 1 : 0)
            }
          }
          ,
          t.prototype.draw = function () {
          }
          ,
          t.prototype.scanGamepads = function () {
            var t = r.find(navigator.getGamepads(), function (t) {
              return !!t
            });
            this.gamepadIndex = t ? t.index : -1
          }
          ,
          t
      }();
      return e.GamePadController = o,
        n.exports
    }),
    System.registerDynamic("bf", ["28", "bb", "bc", "bd", "be"], !0, function (t, e, n) {
      "use strict";
      var r = t("28")
        , i = t("bb")
        , o = t("bc")
        , a = t("bd")
        , s = t("be")
        , u = function () {
        function t() {
          this.inputs = [],
            this.actions = []
        }

        return Object.defineProperty(t.prototype, "axisX", {
          get: function () {
            var t = this.getRange(2e3)
              , e = this.getState(37, 65, 3014)
              , n = this.getState(39, 68, 3015)
              , i = t + (e ? -1 : n ? 1 : 0);
            return r.clamp(i, -1, 1)
          },
          enumerable: !0,
          configurable: !0
        }),
          Object.defineProperty(t.prototype, "axisY", {
            get: function () {
              var t = this.getRange(2001)
                , e = this.getState(38, 87, 3012)
                , n = this.getState(40, 83, 3013)
                , i = t + (e ? -1 : n ? 1 : 0);
              return r.clamp(i, -1, 1)
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.initialize = function () {
            this.controllers = [new i.KeyboardController(this), new o.MouseController(this), new a.TouchController(this), new s.GamePadController(this)],
              this.controllers.forEach(function (t) {
                return t.initialize()
              })
          }
          ,
          t.prototype.update = function () {
            this.controllers.forEach(function (t) {
              return t.update()
            })
          }
          ,
          t.prototype.draw = function () {
            this.controllers.forEach(function (t) {
              return t.draw()
            })
          }
          ,
          t.prototype.onPressed = function (t, e) {
            this.onAction(t, function (t, n) {
              1 === n && e()
            })
          }
          ,
          t.prototype.onReleased = function (t, e) {
            this.onAction(t, function (t, n) {
              0 === n && e()
            })
          }
          ,
          t.prototype.isPressed = function () {
            for (var t = [], e = 0; e < arguments.length; e++)
              t[e - 0] = arguments[e];
            return this.getState.apply(this, t)
          }
          ,
          t.prototype.onAction = function (t, e) {
            var n = this
              , r = Array.isArray(t) ? t : [t];
            r.forEach(function (t) {
              n.actions[t] || (n.actions[t] = []),
                n.actions[t].push(e)
            })
          }
          ,
          t.prototype.getAction = function () {
            for (var t = this, e = [], n = 0; n < arguments.length; n++)
              e[n - 0] = arguments[n];
            return e.reduce(function (e, n) {
              var r = !!t.inputs[n];
              return t.inputs[n] = 0,
              e || r
            }, !1)
          }
          ,
          t.prototype.getState = function () {
            for (var t = this, e = [], n = 0; n < arguments.length; n++)
              e[n - 0] = arguments[n];
            return e.some(function (e) {
              return !!t.inputs[e]
            })
          }
          ,
          t.prototype.getRange = function () {
            for (var t = this, e = [], n = 0; n < arguments.length; n++)
              e[n - 0] = arguments[n];
            return e.reduce(function (e, n) {
              return e + (t.inputs[n] || 0)
            }, 0)
          }
          ,
          t.prototype.setValue = function (t, e) {
            return !((this.inputs[t] || 0) === e || (this.inputs[t] = e,
                !this.actions[t])) && (this.actions[t].forEach(function (n) {
                return n(t, e)
              }),
                !0)
          }
          ,
          t.prototype.clear = function () {
            this.inputs = []
          }
          ,
          t
      }();
      return e.InputManager = u,
        n.exports
    }),
    System.registerDynamic("43", ["22"], !0, function (t, e, n) {
      "use strict";
      function r(t, e, n) {
        t.width === e && t.height === n || (t.width = e,
          t.height = n)
      }

      function i(t) {
        var e = t.getBoundingClientRect()
          , n = a.getPixelRatio()
          , i = Math.round(e.width * n)
          , o = Math.round(e.height * n);
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
    }),
    System.registerDynamic("c0", ["5e", "5c", "22", "21", "2b", "2c", "5f", "24", "60", "68", "6b", "6c", "89", "69", "1f", "bf", "3c", "43", "20"], !0, function (t, e, n) {
      "use strict";
      function r(t) {
        return 2 === t ? h.ADMIN_COLOR : 1 === t ? h.SYSTEM_COLOR : h.WHITE
      }

      function i(t) {
        t.player && t.player.tes && t.player.tes()
      }

      function o(t) {
        t.addEmoticon(":apple:", "🍎", _.apple.color),
          t.addEmoticon(":heart:", "❤", _.heartemote),
          t.addEmoticon(":pumpkin:", "🎃", _.pumpkinemote),
          t.addEmoticon(":pizza:", "🍕", _.pizzaemote),
          t.addEmoticon(":rock:", "⽯", _.rockemote),
          t.addEmoticon(":face:", "ツ"),
          t.addEmoticon(":derp:", "シ")
      }

      var a = t("5e")
        , s = t("5c")
        , u = t("22")
        , l = t("21")
        , c = t("2b")
        , f = t("2c")
        , p = t("5f")
        , h = t("24")
        , d = t("60")
        , v = t("68")
        , m = t("6b")
        , g = t("6c")
        , y = t("89")
        , b = t("69")
        , _ = t("1f")
        , w = t("bf")
        , x = t("3c")
        , E = t("43")
        , $ = t("20")
        , S = function () {
        function t() {
          this.map = new f.Map(0, 0),
            this.scale = u.getPixelRatio() > 1 ? 3 : 2,
            this.baseTime = 0,
            this.camera = new p.Camera,
            this.failedToCreateWebGL = !1,
            this.apply = function (t) {
              return t()
            }
            ,
            this.input = new w.InputManager,
            this.timeSize = 0,
            this.lastStats = 0,
            this.sent = 0,
            this.recv = 0,
            this.textJump = 0,
            this.hideText = !1,
            this.viewMatrix = a.mat4.create(),
            this.initialized = !1
        }

        return t.prototype.changeScale = function () {
          this.scale = this.scale % 4 + 1
        }
          ,
          t.prototype.load = function () {
            return this.loadPromise || (this.loadPromise = x.loadSpriteSheets(_.spriteSheets, "/images/"))
          }
          ,
          t.prototype.init = function () {
            var t = this;
            this.initialized || (this.initialized = !0,
              this.canvas = document.getElementById("canvas"),
              this.stats = document.getElementById("stats"),
              this.clock = document.getElementById("clock"),
              this.input.initialize(),
              this.input.onReleased([80, 3003], function () {
                return t.changeScale()
              }),
              this.input.onPressed(13, function () {
                return t.onChat()
              }),
              this.input.onPressed(27, function () {
                t.onCancel() || t.select(null)
              }),
              this.input.onPressed(191, function () {
                return t.onCommand()
              }),
              this.input.onPressed(113, function () {
                return t.hideText = !t.hideText
              }),
              this.resizeCanvas(),
              window.addEventListener("resize", function () {
                return t.resizeCanvas()
              }),
            this.gl || this.initWebGL())
          }
          ,
          t.prototype.initWebGL = function () {
            try {
              this.updateCamera();
              var t = this.gl = b.getWebGLContext(this.canvas)
                , e = b.getRenderTargetSize(this.camera.w, this.camera.h);
              this.frameBuffer = s(t, [e, e], {
                depth: !1
              }),
                this.spriteShader = b.createSpriteShader(t),
                this.spriteBatch = new v.SpriteBatch(t),
                y.createTexturesForSpriteSheets(t, _.spriteSheets),
                this.spriteBatch.rectSprite = _.pixel,
                this.button = new m.SpriteButton(_.bubble, 2, 2, 2, 2),
                this.font = new g.SpriteFont(_.font),
                o(this.font)
            } catch (t) {
              throw console.error(t),
                this.releaseWebGL(),
                t
            }
          }
          ,
          t.prototype.releaseWebGL = function () {
            this.gl = null ,
              this.font = null ,
              this.button = null ,
            this.frameBuffer && (this.frameBuffer.dispose(),
              this.frameBuffer = null ),
            this.spriteShader && (this.spriteShader.dispose(),
              this.spriteShader = null ),
            this.spriteBatch && (this.spriteBatch.dispose(),
              this.spriteBatch = null ),
              y.releaseTexturesForSpriteSheets(_.spriteSheets)
          }
          ,
          t.prototype.updateCamera = function () {
            this.camera.w = Math.ceil(this.canvas.width / this.scale),
              this.camera.h = Math.ceil(this.canvas.height / this.scale)
          }
          ,
          t.prototype.release = function () {
            this.socket && (this.socket.disconnect(),
              this.socket = null )
          }
          ,
          t.prototype.update = function (t) {
            if (this.socket && this.socket.isConnected) {
              var e = this.camera
                , n = this.player
                , r = this.map;
              if (i(this),
                  this.input.update(),
                  this.updateCamera(),
                n && r) {
                var o = this.input.axisX
                  , a = this.input.axisY
                  , s = u.length(o, a)
                  , c = s < .5 || this.input.isPressed(16)
                  , f = u.vectorToDir(o, a)
                  , p = o || a ? u.dirToVector(f) : {
                  x: 0,
                  y: 0
                }
                  , h = o || a ? c ? 1 : 2 : 0
                  , d = u.flagsToSpeed(h)
                  , v = p.x * d
                  , m = p.y * d;
                if (n.vx !== v || n.vy !== m) {
                  var g = u.encodeMovement(n.x, n.y, f, h)
                    , y = g[0]
                    , b = g[1];
                  this.socket.server.update(y, b)
                }
                if (n.vx = v,
                    n.vy = m,
                    e.update(n, r),
                    this.input.getAction(1002)) {
                  var _ = this.scale / u.getPixelRatio()
                    , w = e.screenToWorld({
                    x: this.input.getRange(1e3) / _,
                    y: this.input.getRange(1001) / _
                  })
                    , x = r.pickEntity(w, this.input.isPressed(16));
                  x ? "pony" === x.type ? this.select(x) : this.socket.server.interact(x.id) : this.selected ? this.select(null) : this.socket.server.changeTile(0 | w.x, 0 | w.y)
                }
                r.update(t);
                var E = n.x * l.tileWidth
                  , $ = n.y * l.tileHeight;
                r.forEachEntity(function (t) {
                  t.coverBounds && (t.coverLifted = u.containsPoint(t.x * l.tileWidth, t.y * l.tileHeight, t.coverBounds, E, $))
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
          }
          ,
          t.prototype.select = function (t) {
            var e = this;
            this.selected !== t && this.apply(function () {
              e.selected && (e.selected.selected = !1),
                e.selected = t,
              e.selected && (e.selected.selected = !0);
            })
          }
          ,
          t.prototype.draw = function (t) {
            var e = this
              , n = this.gl
              , r = Math.round(this.scale)
              , i = d.getLight(this.getTime());
            if (n) {
              var o = this.camera.w
                , a = this.camera.h
                , s = b.getRenderTargetSize(o, a);
              s !== this.frameBuffer.shape[0] && (this.frameBuffer.shape = [s, s]),
                this.frameBuffer.bind(),
                n.enable(n.SCISSOR_TEST),
                n.scissor(0, 0, o, a),
                n.viewport(0, 0, o, a),
                n.disable(n.DEPTH_TEST),
                n.enable(n.BLEND),
                n.blendEquation(n.FUNC_ADD),
                n.blendFunc(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA),
                n.clearColor(h.BG_COLOR.floatR, h.BG_COLOR.floatG, h.BG_COLOR.floatB, 1),
                n.clear(n.COLOR_BUFFER_BIT),
                this.spriteBatch.begin(this.spriteShader),
                this.spriteShader.uniforms.transform = b.createViewMatrix(this.viewMatrix, this.camera.w, this.camera.h, 1, -this.camera.x, -this.camera.y),
                this.spriteShader.uniforms.lighting = i.toFloatArray(),
              this.map && this.map.draw(this.spriteBatch, this.camera),
                this.spriteBatch.end();
              var l = this.spriteBatch.tris;
              if (this.spriteBatch.begin(this.spriteShader),
                  this.spriteShader.uniforms.transform = b.createViewMatrix(this.viewMatrix, this.camera.w, this.camera.h, 1),
                  this.spriteShader.uniforms.lighting = [1, 1, 1, 1],
                  !this.hideText) {
                var f = this.scale / u.getPixelRatio()
                  , p = this.camera.screenToWorld({
                  x: this.input.getRange(1e3) / f,
                  y: this.input.getRange(1001) / f
                });
                this.map.forEachRegion(function (t) {
                  t.entities.forEach(function (t) {
                    if (t !== e.player && t.name) {
                      var n = t.interactBounds || t.bounds;
                      if (n && u.contains(t.x, t.y, n, p)) {
                        var r = e.camera.worldToScreen(t);
                        e.drawNamePlate(e.spriteBatch, t.name, r.x, r.y - 62)
                      }
                    }
                    if (t.says) {
                      var r = e.camera.worldToScreen(t);
                      e.drawSpeechBaloon(e.spriteBatch, t.says, r.x, r.y - 68)
                    }
                  })
                })
              }
              this.socket && this.socket.isConnected || this.drawMessage(this.spriteBatch, "Connecting..."),
                this.spriteBatch.end(),
                l += this.spriteBatch.tris,
                this.input.draw(),
                n.disable(n.SCISSOR_TEST),
                n.bindFramebuffer(n.FRAMEBUFFER, null),
                n.viewport(0, 0, this.canvas.width, this.canvas.height),
                this.spriteBatch.begin(this.spriteShader),
                this.spriteShader.uniforms.transform = b.createViewMatrix2(this.viewMatrix, this.canvas.width, this.canvas.height, r),
                this.spriteShader.uniforms.lighting = [1, 1, 1, 1],
                this.spriteBatch.drawImage(this.frameBuffer.color[0], null, 0, 0, o, a, 0, 0, o, a),
                this.spriteBatch.end();
              var v = Date.now();
              if (v - this.lastStats > 1e3) {
                var m = this.sent.toFixed()
                  , g = this.recv.toFixed()
                  , y = this.map ? this.map.entitiesDrawn : 0
                  , _ = this.map ? this.map.getTotalEntities() : 0
                  , w = this.map ? this.map.getTotalEntities(function (t) {
                  return t instanceof c.Pony
                }) : 0;
                this.stats.textContent = t.toFixed(0) + " fps " + m + "/" + g + " kb/s " + w + " ponies" + ($.debug ? " (" + y + "/" + _ + ") " + l + " tris" : ""),
                  this.lastStats = v,
                  this.clock.textContent = d.getTime(this.getTime())
              }
            }
          }
          ,
          t.prototype.getTime = function () {
            return this.baseTime + Date.now()
          }
          ,
          t.prototype.resizeCanvas = function () {
            var t = window.innerWidth
              , e = window.innerHeight
              , n = u.getPixelRatio()
              , r = Math.round(t * n)
              , i = Math.round(e * n);
            E.resizeCanvas(this.canvas, r, i)
          }
          ,
          t.prototype.drawMessage = function (t, e) {
            var n = 100
              , r = Math.round((this.camera.h - n) / 2);
            t.drawRect(h.GRAY, 0, r, this.camera.w, n),
              this.font.drawTextAligned(t, e, h.WHITE, {
                x: 0,
                y: r,
                w: this.camera.w,
                h: n
              }, "center", "middle")
          }
          ,
          t.prototype.drawNamePlate = function (t, e, n, r) {
            var i = this.font.measureText(e)
              , o = n - Math.round(i.w / 2)
              , a = r - i.h + 8;
            this.font.drawText(t, e, h.BLACK, o, a)
          }
          ,
          t.prototype.drawSpeechBaloon = function (t, e, n, i) {
            var o = e.message
              , a = e.type
              , s = e.timer
              , c = this.font.measureText(o);
            if (u.intersect(0, 0, this.camera.w, this.camera.h, n - c.w / 2, i - c.h / 2, c.w, c.h)) {
              var f = .2
                , p = (l.SAYS_TIME - s) / f
                , d = s / f
                , v = [3, 2, 1, 0, -1, 0]
                , m = [-4, -3, -2, -1]
                , g = p * v.length
                , y = d * m.length
                , b = u.clamp(Math.round(g), 0, v.length - 1)
                , w = u.clamp(Math.round(y), 0, m.length);
              i += w < m.length ? m[w] : v[b];
              var x = Math.min(p, d, 1)
                , E = 4
                , $ = n - Math.round(c.w / 2)
                , S = i - c.h;
              t.globalAlpha = .6 * x,
                this.button.draw(t, h.BLACK, $ - E, S - E, c.w + 2 * E, c.h + 2 * E),
                t.drawSprite(_.nipple, h.BLACK, n - Math.round(_.nipple.w / 2), i + E),
                t.globalAlpha = x,
                this.font.drawText(t, o, r(a), $, S),
                t.globalAlpha = 1
            }
          }
          ,
          t
      }();
      return Object.defineProperty(e, "__esModule", {
        value: !0
      }),
        e.default = S,
        n.exports
    }),
    System.registerDynamic("2d", ["c0"], !0, function (t, e, n) {
      "use strict";
      var r, i = t("c0");
      return Object.defineProperty(e, "__esModule", {
        value: !0
      }),
        e.default = {
          get game() {
            return r ? r : r = new i.default
          }
        },
        n.exports
    }),
    System.registerDynamic("c1", [], !0, function (t, e, n) {
      return n.exports = '<div class="pony-box"><div class="pony-box-rect"><div class="pony-box-name">{{vm.name}}</div><div class="pony-box-buttons"><div class="btn-group"><button uib-tooltip="{{vm.pony.ignored ? \'Unignore player\' : \'Ignore player\'}}" ng-click="vm.toggleIgnore()" ng-class="{ \'btn-danger\': vm.pony.ignored }" class="btn btn-xs btn-default"><i class="fa fa-ban"></i></button></div> <div ng-if="vm.isMod" class="btn-group"><button ng-click="vm.report()" uib-tooltip="Report" class="btn btn-xs btn-default"><i class="fa fa-flag"></i></button><div uib-dropdown ng-if="vm.isMod" uib-tooltip="{{vm.timeoutTooltip}}" class="btn-group dropdown"><button uib-dropdown-toggle ng-class="{ \'btn-danger\': vm.hasTimeout }" class="btn btn-xs btn-default"><i class="fa fa-clock-o"></i></button><ul uib-dropdown-menu class="dropdown-menu"><li ng-repeat="t in vm.timeouts"><a ng-click="vm.timeout(t.value)">{{t.label}}</a></li></ul></div><button ng-click="vm.toggleMute()" uib-tooltip="{{vm.pony.muted ? \'Unmute\' : \'Mute\'}}" ng-class="{ \'btn-danger\': vm.pony.muted }" class="btn btn-xs btn-default"><i class="fa fa-microphone-slash"></i></button><button ng-click="vm.toggleShadow()" uib-tooltip="{{vm.pony.shadow ? \'Unshadow\' : \'Shadow\'}}" ng-class="{ \'btn-danger\': vm.pony.shadow }" class="btn btn-xs btn-default"><i class="fa fa-eye-slash"></i></button></div></div></div><div class="pony-box-avatar"><canvas width="100" height="100"></canvas><div class="pony-box-avatar-cover"></div></div></div>',
        n.exports
    }),
    System.registerDynamic("c2", ["53", "21", "54", "22", "55", "2d", "c1"], !0, function (t, e, n) {
      "use strict";
      var r = t("53")
        , i = t("21")
        , o = t("54")
        , a = t("22")
        , s = t("55")
        , u = t("2d")
        , l = u.default.game
        , c = 3
        , f = function () {
        function t(t, e) {
          this.$element = t,
            this.model = e,
            this.timeouts = i.TIMEOUTS,
            this.canvas = t.find("canvas")[0]
        }

        return Object.defineProperty(t.prototype, "isMod", {
          get: function () {
            return s.isMod(this.model.account)
          },
          enumerable: !0,
          configurable: !0
        }),
          Object.defineProperty(t.prototype, "hasTimeout", {
            get: function () {
              return new Date(this.pony.timeout) > new Date
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "timeoutTooltip", {
            get: function () {
              return this.hasTimeout ? r(this.pony.timeout).fromNow(!0) : "Timeout"
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.$onChanges = function (t) {
            if (t.pony) {
              this.name = this.pony.name.replace(/:apple:/g, "🍎").replace(/:heart:/g, "❤").replace(/:pumpkin:/g, "🎃").replace(/:pizza:/g, "🍕").replace(/:rock:/g, "⽯").replace(/:face:/g, "ツ").replace(/:derp:/g, "シ");
              var e = this.canvas.getContext("2d");
              e.save(),
                e.fillStyle = "#444",
                e.fillRect(0, 0, this.canvas.width, this.canvas.height),
              this.pony && (e.translate(9 * c, 54 * c),
                e.scale(-c, c),
                a.disableImageSmoothing(e),
                this.pony.drawHead(e)),
                e.restore()
            }
          }
          ,
          t.prototype.report = function () {
            this.isMod && this.action(o.PlayerAction.Report)
          }
          ,
          t.prototype.timeout = function (t) {
            this.isMod && (this.action(o.PlayerAction.Timeout, t),
              this.pony.timeout = a.fromNow(t).toISOString())
          }
          ,
          t.prototype.toggleIgnore = function () {
            this.action(this.pony.ignored ? o.PlayerAction.Unignore : o.PlayerAction.Ignore),
              this.pony.ignored = !this.pony.ignored
          }
          ,
          t.prototype.toggleMute = function () {
            this.isMod && (this.action(this.pony.muted ? o.PlayerAction.Unmute : o.PlayerAction.Mute),
              this.pony.muted = !this.pony.muted)
          }
          ,
          t.prototype.toggleShadow = function () {
            this.isMod && (this.action(this.pony.shadow ? o.PlayerAction.Unshadow : o.PlayerAction.Shadow),
              this.pony.shadow = !this.pony.shadow)
          }
          ,
          t.prototype.action = function (t, e) {
            void 0 === e && (e = 0),
              l.socket.server.playerAction(this.pony.id, t, e)
          }
          ,
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
          controller: f,
          controllerAs: "vm",
          template: t("c1")
        },
        n.exports
    }),
    System.registerDynamic("c3", ["2f", "53", "2e", "31", "33", "35", "37", "39", "3b", "3e", "40", "41", "42", "47", "49", "4b", "4d", "4f", "51", "c2"], !0, function (t, e, n) {
      "use strict";
      function r(t) {
        t.run(["$rootScope", function (t) {
          i.setScheduler(function (e) {
            t.$evalAsync(e)
          })
        }
        ]),
          t.config(["$uibTooltipProvider", function (t) {
            t.options({
              appendToBody: !0
            })
          }
          ]),
          t.filter("fromNow", function () {
            var t = function (t, e) {
                return o(t).fromNow(e)
              }
              ;
            return t.$stateful = !0,
              t
          }),
          t.service("gameService", a.GameService),
          t.service("model", s.Model),
          t.service("applyCallback", ["$timeout", function (t) {
            return function (e) {
              t(e)
            }
          }
          ]),
          t.directive("agDrag", u.default),
          t.directive("agAutoFocus", function () {
            return {
              restrict: "A",
              link: function (t, e) {
                setTimeout(function () {
                  return e[0].focus()
                }, 100)
              }
            }
          }),
          t.directive("a", function () {
            return {
              restrict: "E",
              link: function (t, e, n) {
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

      var i = t("2f")
        , o = t("53")
        , a = t("2e")
        , s = t("31")
        , u = t("33")
        , l = t("35")
        , c = t("37")
        , f = t("39")
        , p = t("3b")
        , h = t("3e")
        , d = t("40")
        , v = t("41")
        , m = t("42")
        , g = t("47")
        , y = t("49")
        , b = t("4b")
        , _ = t("4d")
        , w = t("4f")
        , x = t("51")
        , E = t("c2");
      return e.init = r,
        n.exports
    }),
    System.registerDynamic("c4", [], !0, function (t, e, n) {
      return n.exports = '<div ng-init="vm.init()" class="app"><div ng-style="{ display: vm.playing ? \'block\' : \'none\' }" class="app-game"><canvas id="canvas"></canvas><span id="stats"></span><settings-box></settings-box><chat-box></chat-box><pony-box id="pony-box" pony="vm.selected" ng-if="vm.selected"></pony-box><div id="touch-origin"></div><div id="touch-position"></div></div><div ng-if="!vm.playing" class="app-cover fadeview"><div class="container"><menu-bar logo="true" model="vm.model"><menu-item href="/" name="Home"></menu-item><menu-item href="/about" name="About"></menu-item><menu-item href="/character" name="Characters" ng-if="vm.model.account"></menu-item></menu-bar><div><div ng-view class="app-view"></div></div><footer class="app-footer clearfix"><div class="pull-left text-muted text-nowrap">version <b>0.14.2-alpha</b></div><div class="pull-right text-muted text-nowrap">&copy; 2016 <a href="mailto:agamnentzar&#64;gmail.com" class="text-muted">Agamnentzar</a> | <a href="http://agamnentzar.deviantart.com/" title="DeviantArt" class="text-muted"><i class="fa fa-deviantart"></i></a> <a href="http://agamnentzar.tumblr.com/" title="Tumblr" class="text-muted"><i class="fa fa-tumblr"></i></a> <a href="https://twitter.com/Agamnentzar" title="Twitter" class="text-muted"><i class="fa fa-twitter"></i></a> <a href="https://github.com/Agamnentzar" title="Github" class="text-muted"><i class="fa fa-github"></i></a></div></footer></div></div></div>',
        n.exports
    }),
    System.registerDynamic("45", ["1f", "3c"], !0, function (t, e, n) {
      "use strict";
      function r() {
        return i || (i = a.loadSpriteSheets(o.spriteSheets, "/images/"))
      }

      var i, o = t("1f"), a = t("3c");
      return e.loadSpriteSheets = r,
        n.exports
    }),
    System.registerDynamic("c5", [], !0, function (t, e, n) {
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
          } catch (t) {
          }
      }

      var a = null;
      return e.getItem = r,
        e.setItem = i,
        e.removeItem = o,
        n.exports
    }),
    System.registerDynamic("c6", ["28", "21", "22", "44", "32", "1f", "45", "5d", "20", "c5"], !0, function (t, e, n) {
      "use strict";
      var r = t("28")
        , i = t("21")
        , o = t("22")
        , a = t("44")
        , s = t("32")
        , u = t("1f")
        , l = t("45")
        , c = t("5d")
        , f = t("20")
        , p = t("c5")
        , h = u.ponyNoses[0]
        , d = function () {
        function t(t, e, n, r, s) {
          var l = this;
          this.$http = e,
            this.$location = n,
            this.gameService = r,
            this.model = s,
            this.maxNameLength = i.PLAYER_NAME_MAX_LENGTH,
            this.state = a.createDefaultPonyState(),
            this.saved = [],
            this.brushType = "brush",
            this.brush = "orange",
            this.horns = u.ponyHorns,
            this.manes = u.ponyManes,
            this.backManes = u.ponyBackManes,
            this.tails = u.ponyTails,
            this.facialHair = u.ponyFacialHair,
            this.wings = u.ponyWings,
            this.headAccessories = u.ponyHeadAccessories,
            this.earAccessories = u.ponyEarAccessories,
            this.faceAccessories = u.ponyFaceAccessories,
            this.neckAccessories = u.ponyNeckAccessories,
            this.frontLegAccessories = u.ponyFrontLegAccessoriesStand[0],
            this.backLegAccessories = u.ponyBackLegAccessoriesStand[0],
            this.frontHooves = [null, [[u.ponyFetlocksFrontStand[0]]]],
            this.backHooves = [null, [[u.ponyFetlocksBackStand[0]]]],
            this.animations = c.animations,
            this.activeAnimation = 0,
            this.muzzles = u.ponyNoses.map(function (t) {
              return {
                fill: null,
                outline: t.muzzle,
                extra: t.mouth
              }
            }),
            this.freckles = u.ponyFreckles.map(function (t) {
              return t ? {
                fill: t,
                outline: h.muzzle
              } : null
            }),
            this.fangs = [null, {
              fill: null,
              outline: h.muzzle,
              extra: h.fangs
            }],
            this.loaded = !1,
            this.playAnimation = !0,
            this.cmSize = i.CM_SIZE,
            this.deleting = !1,
            this.nextBlink = 0,
            this.blinkFrames = a.BLINK_FRAMES,
            this.blinkFrame = -1,
            this.handleError = o.errorHandler(this),
            this.destroyed = !1,
            t.$on("$destroy", function () {
              return l.destroy()
            })
        }

        return Object.defineProperty(t.prototype, "customOutlines", {
          get: function () {
            return this.pony.customOutlines
          },
          enumerable: !0,
          configurable: !0
        }),
          Object.defineProperty(t.prototype, "ponies", {
            get: function () {
              return this.model.ponies
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "pony", {
            get: function () {
              return this.model.pony
            },
            set: function (t) {
              this.model.selectPony(t)
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "activeTab", {
            get: function () {
              return 0 | parseInt(p.getItem("character-active-tab"), 10)
            },
            set: function (t) {
              p.setItem("character-active-tab", t)
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "activeAccessoryTab", {
            get: function () {
              return 0 | parseInt(p.getItem("character-active-accessory-tab"), 10)
            },
            set: function (t) {
              p.setItem("character-active-accessory-tab", t)
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "baseHairColor", {
            get: function () {
              return this.pony.mane && this.pony.mane.fills && this.pony.mane.fills[0]
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "baseCoatColor", {
            get: function () {
              return this.pony.coatFill
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "canExport", {
            get: function () {
              return f.debug
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.init = function () {
            var t = this;
            if (this.model.account || this.$location.url("/"),
                f.debug) {
              var e, n;
              window.addEventListener("keydown", function (r) {
                71 === r.keyCode && (n || e || (n = t.pony.backLegAccessory,
                  e = t.pony.frontLegAccessory,
                  t.pony.backLegAccessory = null ,
                  t.pony.frontLegAccessory = null ))
              }),
                window.addEventListener("keyup", function (r) {
                  71 === r.keyCode && (t.pony.backLegAccessory = n,
                    t.pony.frontLegAccessory = e,
                    n = null ,
                    e = null )
                })
            }
            var r = Date.now();
            return l.loadSpriteSheets().then(function () {
              t.destroyed || (t.loaded = !0,
                t.interval = setInterval(function () {
                  var e = Date.now();
                  t.update(e - r),
                    r = e
                }, 1e3 / 24))
            })
          }
          ,
          t.prototype.destroy = function () {
            this.destroyed = !0,
              clearInterval(this.interval)
          }
          ,
          t.prototype.update = function (t) {
            var e = Date.now();
            this.state.animation = this.animations[this.activeAnimation],
            this.playAnimation && (this.state.animationFrame = (this.state.animationFrame + 1) % this.state.animation.frames),
              this.blinkFrame === -1 ? this.nextBlink < e && (this.blinkFrame = 0) : (this.blinkFrame++,
              this.blinkFrame >= this.blinkFrames.length && (this.nextBlink = e + 2e3 * Math.random() + 3e3,
                this.blinkFrame = -1)),
              this.state.blinkFrame = this.blinkFrame === -1 ? 1 : this.blinkFrames[this.blinkFrame]
          }
          ,
          t.prototype.clearCM = function () {
            r.fill(this.pony.cm, "")
          }
          ,
          t.prototype.eyeColorLockChanged = function (t) {
            t && (this.pony.eyeColorLeft = this.pony.eyeColorRight)
          }
          ,
          t.prototype.eyeOpennessChanged = function (t) {
            t && (this.pony.eyeOpennessLeft = this.pony.eyeOpennessRight)
          }
          ,
          Object.defineProperty(t.prototype, "canNew", {
            get: function () {
              return this.ponies.length < i.PONY_LIMIT
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.new = function () {
            this.deleting = !1,
              this.pony = s.createDefaultPony()
          }
          ,
          t.prototype.select = function (t) {
            t && (this.deleting = !1,
              this.pony = t)
          }
          ,
          Object.defineProperty(t.prototype, "canSave", {
            get: function () {
              return !this.model.saving && !!this.pony && !!this.pony.name
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.save = function () {
            return this.error = null ,
              this.deleting = !1,
              this.model.savePony(this.pony).catch(this.handleError)
          }
          ,
          Object.defineProperty(t.prototype, "canRevert", {
            get: function () {
              var t = this;
              return !!this.pony.id && this.ponies.some(function (e) {
                  return e.id === t.pony.id
                })
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.revert = function () {
            this.select(o.findById(this.ponies, this.pony.id))
          }
          ,
          Object.defineProperty(t.prototype, "canDelete", {
            get: function () {
              return !!this.pony.id
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.delete = function () {
            return this.error = null ,
              this.deleting = !1,
              this.model.removePony(this.pony).catch(this.handleError)
          }
          ,
          t.prototype.export = function () {
            var t = 80
              , e = 80
              , n = this.animations.reduce(function (t, e) {
              return t + e.frames
            }, 0)
              , r = o.createCanvas(t * n, e)
              , i = r.getContext("2d")
              , u = s.toRenderInfo(this.pony)
              , l = 0;
            this.animations.forEach(function (n) {
              for (var r = 0; r < n.frames; r++,
                l++) {
                var o = {
                  animation: n,
                  animationFrame: r,
                  blinkFrame: 1
                };
                a.drawPony2D(i, u, o, l * t + t / 2, e - 10)
              }
            }),
              window.open(r.toDataURL())
          }
          ,
          t.$inject = ["$scope", "$http", "$location", "gameService", "model"],
          t
      }();
      return Object.defineProperty(e, "__esModule", {
        value: !0
      }),
        e.default = d,
        n.exports
    }),
    System.registerDynamic("c7", ["28", "21", "22"], !0, function (t, e, n) {
      "use strict";
      var r = t("28")
        , i = t("21")
        , o = t("22")
        , a = function () {
        function t(t, e, n) {
          var r = this;
          this.$location = e,
            this.model = n,
            this.nameMinLength = i.ACCOUNT_NAME_MIN_LENGTH,
            this.nameMaxLength = i.ACCOUNT_NAME_MAX_LENGTH,
            this.settings = {},
            this.handleError = o.errorHandler(this),
            t.$watchCollection("[vm.settings.filterSwearWords, vm.settings.filterCyrillic]", function () {
              return r.saveSettings()
            })
        }

        return t.prototype.init = function () {
          var t = this.model.account;
          t ? (this.settings = r.clone(t.settings),
            this.data = {
              name: t.name
            }) : this.$location.url("/")
        }
          ,
          Object.defineProperty(t.prototype, "canSubmit", {
            get: function () {
              return this.data.name && !!this.data.name.trim().length
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.submit = function () {
            this.canSubmit && (this.error = null ,
              this.model.updateAccount(this.data).catch(this.handleError))
          }
          ,
          t.prototype.saveSettings = function () {
            r.isEqual(this.settings, this.model.account.settings) || this.model.saveSettings(this.settings).catch(this.handleError)
          }
          ,
          t.$inject = ["$scope", "$location", "model"],
          t
      }();
      return Object.defineProperty(e, "__esModule", {
        value: !0
      }),
        e.default = a,
        n.exports
    }),
    System.registerDynamic("3a", ["36"], !0, function (t, e, n) {
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

      var a = t("36");
      return e.fillToOutline = r,
        e.colorToFar = i,
        e.darkenColor = o,
        n.exports
    }),
    System.registerDynamic("32", ["28", "1f", "22", "3a", "21", "36"], !0, function (t, e, n) {
      "use strict";
      function r(t) {
        return D.mergeWith({}, a(), D.cloneDeep(t), function (t, e) {
          if (null == e)
            return t
        })
      }

      function i(t, e, n) {
        void 0 === e && (e = !0),
        void 0 === n && (n = "gold");
        var r = [n, "dodgerblue", "limegreen", "orchid", "crimson", "aquamarine"]
          , i = r.map(R.fillToOutline);
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
        return D.range(0, F.CM_SIZE * F.CM_SIZE).map(function () {
          return ""
        })
      }

      function a() {
        return {
          id: null,
          name: "",
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
        return P.default.parseWithAlpha(t, 1)
      }

      function u(t) {
        return s(R.colorToFar(t))
      }

      function l(t) {
        return u(t && t[0] ? t[0] : "black")
      }

      function c(t) {
        return P.default.parse(t)
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
      }

      function m(t) {
        return t.map(function (t) {
          return t ? t.map(function (t) {
            return t.length
          }) : [0]
        })
      }

      function g(t) {
        return t ? P.default.parse(t).toHexRGB() : ""
      }

      function y(t) {
        return Object.keys(t).forEach(function (e) {
          null == t[e] && delete t[e]
        }),
          t
      }

      function b(t) {
        return t ? 1 : 0
      }

      function _(t) {
        return !!+t
      }

      function w(t, e) {
        return t.slice(0, e).map(b).join(" ")
      }

      function x(t) {
        return t && t.split ? t.split(" ").map(_) : null
      }

      function E(t, e) {
        return t.slice(0, e).map(g).join(" ")
      }

      function $(t) {
        return t && t.split ? t.split(" ") : null
      }

      function S(t, e, n) {
        if (void 0 === n && (n = !0),
          !t || n && 0 === t.type)
          return null;
        var r = e ? m(e) : null
          , i = r ? I.at(I.at(r, t.type), t.pattern) : 6;
        return [t.type, t.pattern, E(t.fills, i), E(t.outlines, i), w(t.lockFills, i), w(t.lockOutlines, i)]
      }

      function T(t) {
        return t ? {
          type: t[0],
          pattern: t[1],
          fills: $(t[2]),
          outlines: $(t[3]),
          lockFills: x(t[4]),
          lockOutlines: x(t[5])
        } : null
      }

      function k(t) {
        var e = {
          name: t.name,
          h: S(t.horn, O.ponyHorns),
          w: S(t.wings, O.ponyWings),
          fh: S(t.frontHooves, null),
          bh: S(t.backHooves, null),
          m: S(t.mane, O.ponyManes, !1),
          bm: S(t.backMane, O.ponyBackManes, !1),
          t: S(t.tail, O.ponyTails, !1),
          fac: S(t.facialHair, O.ponyFacialHair),
          ha: S(t.headAccessory, O.ponyHeadAccessories),
          ea: S(t.earAccessory, O.ponyEarAccessories),
          fa: S(t.faceAccessory, O.ponyFaceAccessories),
          na: S(t.neckAccessory, O.ponyNeckAccessories),
          fla: S(t.frontLegAccessory, O.ponyFrontLegAccessoriesStand[0]),
          bla: S(t.backLegAccessory, O.ponyBackLegAccessoriesStand[0]),
          cf: g(t.coatFill),
          co: g(t.coatOutline),
          lco: b(t.lockCoatOutline),
          el: t.eyelashes,
          ecl: g(t.eyeColorLeft),
          ecr: g(t.eyeColorRight),
          ew: g(t.eyeWhites),
          eol: t.eyeOpennessLeft,
          eor: t.eyeOpennessRight,
          es: b(t.eyeshadow),
          esc: g(t.eyeshadowColor),
          le: b(t.lockEyes),
          lec: b(t.lockEyeColor),
          fan: t.fangs,
          mu: t.muzzle,
          fr: t.freckles,
          frc: t.freckles ? g(t.frecklesColor) : null,
          cm: t.cm && t.cm.some(function (t) {
            return !!t
          }) ? D.dropRightWhile(t.cm.map(g), function (t) {
            return !t
          }) : null,
          cmf: b(t.cmFlip),
          col: b(t.customOutlines)
        };
        return y(e)
      }

      function M(t) {
        var e = {
          id: t.id,
          name: t.name,
          lastUsed: t.lastUsed,
          horn: T(t.h),
          wings: T(t.w),
          frontHooves: T(t.fh),
          backHooves: T(t.bh),
          mane: T(t.m),
          backMane: T(t.bm),
          tail: T(t.t),
          facialHair: T(t.fac),
          headAccessory: T(t.ha),
          earAccessory: T(t.ea),
          faceAccessory: T(t.fa),
          neckAccessory: T(t.na),
          frontLegAccessory: T(t.fla),
          backLegAccessory: T(t.bla),
          coatFill: t.cf,
          coatOutline: t.co,
          lockCoatOutline: _(t.lco),
          eyelashes: t.el,
          eyeColorLeft: t.ecl,
          eyeColorRight: t.ecr,
          eyeWhites: t.ew,
          eyeOpennessLeft: t.eol,
          eyeOpennessRight: t.eor,
          eyeshadow: _(t.es),
          eyeshadowColor: t.esc,
          lockEyes: _(t.le),
          lockEyeColor: _(t.lec),
          fangs: t.fan,
          muzzle: t.mu,
          freckles: t.fr,
          frecklesColor: t.frc,
          cm: t.cm,
          cmFlip: _(t.cmf),
          customOutlines: _(t.col)
        };
        return r(e)
      }

      function A(t) {
        return {
          type: t.type,
          pattern: t.pattern,
          palette: 0
        }
      }

      function C(t) {
        return {
          name: t.name,
          horn: A(t.horn),
          wings: A(t.wings),
          frontHooves: A(t.frontHooves),
          backHooves: A(t.backHooves),
          mane: A(t.mane),
          backMane: A(t.backMane),
          tail: A(t.tail),
          facialHair: A(t.facialHair),
          headAccessory: A(t.headAccessory),
          earAccessory: A(t.earAccessory),
          faceAccessory: A(t.faceAccessory),
          neckAccessory: A(t.neckAccessory),
          frontLegAccessory: A(t.frontLegAccessory),
          backLegAccessory: A(t.backLegAccessory),
          coat: 0,
          coatFill: 0,
          coatOutline: 0,
          lockCoatOutline: t.lockCoatOutline,
          eyelashes: t.eyelashes,
          eyeColorLeft: 0,
          eyeColorRight: 0,
          eyeWhites: 0,
          eyeOpennessLeft: t.eyeOpennessLeft,
          eyeOpennessRight: t.eyeOpennessRight,
          eyeshadow: t.eyeshadow,
          eyeshadowColor: 0,
          lockEyes: t.lockEyes,
          lockEyeColor: t.lockEyeColor,
          fangs: t.fangs,
          muzzle: t.muzzle,
          freckles: t.freckles,
          frecklesColor: 0,
          cm: [],
          cmFlip: t.cmFlip,
          customOutlines: t.customOutlines
        }
      }

      var D = t("28")
        , O = t("1f")
        , I = t("22")
        , R = t("3a")
        , F = t("21")
        , P = t("36");
      return e.fixPony = r,
        e.createSpriteSet = i,
        e.createDefaultCM = o,
        e.createDefaultPony = a,
        e.toRenderInfo = d,
        e.randomizePony = v,
        e.compressPonyInfo = k,
        e.decompressPonyInfo = M,
        e.toPalette = C,
        n.exports
    }),
    System.registerDynamic("24", ["36"], !0, function (t, e, n) {
      "use strict";
      var r = t("36");
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
        e.SHINES_COLOR = new r.default(255, 255, 255, .4),
        n.exports
    }),
    System.registerDynamic("c8", [], !0, function (t, e, n) {
      var r = new Int8Array(4)
        , i = new Int32Array(r.buffer, 0, 1)
        , o = new Float32Array(r.buffer, 0, 1)
        , a = function () {
        }
        ;
      return a.intBitsToFloat = function (t) {
        return i[0] = t,
          o[0]
      }
        ,
        a.floatToIntBits = function (t) {
          return o[0] = t,
            i[0]
        }
        ,
        a.intToFloatColor = function (t) {
          return a.intBitsToFloat(4278190079 & t)
        }
        ,
        a.colorToFloat = function (t, e, n, r) {
          var i = r << 24 | n << 16 | e << 8 | t;
          return a.intToFloatColor(i)
        }
        ,
        a.isPowerOfTwo = function (t) {
          return 0 === (t & t - 1)
        }
        ,
        a.nextPowerOfTwo = function (t) {
          return t--,
            t |= t >> 1,
            t |= t >> 2,
            t |= t >> 4,
            t |= t >> 8,
            t |= t >> 16,
          t + 1
        }
        ,
        n.exports = a,
        n.exports
    }),
    System.registerDynamic("c9", ["c8"], !0, function (t, e, n) {
      return n.exports = t("c8"),
        n.exports
    }),
    System.registerDynamic("36", ["c9"], !0, function (t, e, n) {
      "use strict";
      function r(t) {
        var e = (0 | t).toString(16);
        return 2 === e.length ? e : "0" + e
      }

      var i = t("c9")
        , o = function () {
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
          get: function () {
            return this.r / 255
          },
          enumerable: !0,
          configurable: !0
        }),
          Object.defineProperty(t.prototype, "floatG", {
            get: function () {
              return this.g / 255
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "floatB", {
            get: function () {
              return this.b / 255
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "floatA", {
            get: function () {
              return this.a
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.toFloat = function (t) {
            return void 0 === t && (t = 1),
              i.colorToFloat(this.r, this.g, this.b, this.a * t * 255)
          }
          ,
          t.prototype.toFloatArray = function () {
            return [this.floatR, this.floatG, this.floatB, this.floatA]
          }
          ,
          t.prototype.toHexRGB = function () {
            return r(this.r) + r(this.g) + r(this.b)
          }
          ,
          t.prototype.toHexRGBA = function () {
            return r(this.r) + r(this.g) + r(this.b) + r(255 * this.a)
          }
          ,
          t.prototype.toRGB = function () {
            return "rgb(" + this.r + "," + this.g + "," + this.b + ")"
          }
          ,
          t.prototype.toRGBA = function () {
            return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")"
          }
          ,
          t.prototype.complementary = function () {
            var e = this.hsva();
            return e.h += e.h >= 180 ? -180 : 180,
              t.fromHsvaObject(e)
          }
          ,
          t.prototype.css = function () {
            return 1 === this.a ? "#" + this.toHexRGB() : this.toRGBA()
          }
          ,
          t.prototype.hsva = function (e) {
            return t.rgb2hsv(this.r, this.g, this.b, this.a, e)
          }
          ,
          t.prototype.equal = function (t) {
            return !!t && this.r === t.r && this.g === t.g && this.b === t.b && this.a === t.a
          }
          ,
          t.prototype.darken = function (t) {
            this.r *= t,
              this.g *= t,
              this.b *= t
          }
          ,
          t.compare = function (t, e) {
            if (null === t && null === e)
              return 0;
            if (null == t || null == e)
              return 1;
            var n = t.hsva()
              , r = e.hsva();
            return .25 * (Math.abs(n.h - r.h) / 360) + .25 * Math.abs(n.s - r.s) + .25 * Math.abs(n.v - r.v) + .25 * Math.abs(n.a - r.a)
          }
          ,
          t.lerp = function (e, n, r) {
            var i = r
              , o = 1 - r;
            return new t(e.r * o + n.r * i, e.g * o + n.g * i, e.b * o + n.b * i, e.a * o + n.a * i)
          }
          ,
          t.fromHsva = function (e, n, r, i) {
            var o = t.hsv2rgb(e, n, r, i);
            return new t(o.r, o.g, o.b, o.a)
          }
          ,
          t.fromHsvaObject = function (e) {
            return t.fromHsva(e.h, e.s, e.v, e.a)
          }
          ,
          t.parse = function (e) {
            if ("string" != typeof e)
              return new t(0, 0, 0, 0);
            if (e = e.trim().toLowerCase(),
              "" === e || "none" === e || "transparent" === e)
              return new t(0, 0, 0, 0);
            e = t.names[e] || e;
            var n = /(\d+)[ ,]+(\d+)[ ,]+(\d+)([ ,]+(\d*\.?\d+))?/.exec(e);
            if (n)
              return new t(parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3], 10), n[5] ? parseFloat(n[5]) : 1);
            e = e.replace(/^#+/, "");
            var r, i, o, a;
            return 3 === e.length ? (r = 17 * parseInt(e.charAt(0), 16),
              i = 17 * parseInt(e.charAt(1), 16),
              o = 17 * parseInt(e.charAt(2), 16),
              a = 1) : (r = parseInt(e.substr(0, 2), 16),
              i = parseInt(e.substr(2, 2), 16),
              o = parseInt(e.substr(4, 2), 16),
              a = e.length >= 8 ? parseInt(e.substr(6, 2), 16) / 255 : 1),
              new t(r, i, o, a)
          }
          ,
          t.parseWithAlpha = function (e, n) {
            var r = t.parse(e);
            return r.a = +n,
              r
          }
          ,
          t.rgb2hex = function (t, e, n, i) {
            return r(t) + r(e) + r(n) + r(255 * i)
          }
          ,
          t.rgb2hsv = function (t, e, n, r, i) {
            void 0 === i && (i = 0),
              t /= 255,
              e /= 255,
              n /= 255,
              i /= 360;
            var o = Math.max(t, e, n)
              , a = Math.min(t, e, n)
              , s = o
              , u = o - a
              , l = 0 === o ? 0 : u / o;
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
          }
          ,
          t.hsv2rgb = function (t, e, n, r) {
            t = Math.max(0, Math.min(360, 360 === t ? 0 : t)),
              e = Math.max(0, Math.min(1, e)),
              n = Math.max(0, Math.min(1, n));
            var i = n
              , o = n
              , a = n;
            if (0 !== e) {
              t /= 60;
              var s = Math.floor(t)
                , u = t - s
                , l = n * (1 - e)
                , c = n * (1 - e * u)
                , f = n * (1 - e * (1 - u));
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
          }
          ,
          t.h2rgb = function (t) {
            t /= 60;
            var e = 0
              , n = 0
              , r = 0
              , i = Math.floor(t)
              , o = t - i
              , a = 1 - o
              , s = 1 - (1 - o);
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
          }
          ,
          t.random = function () {
            var e = Object.keys(t.names)
              , n = t.names[e[Math.random() * e.length | 0]];
            return t.parse(n)
          }
          ,
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
    }),
    System.registerDynamic("ca", ["@empty"], !0, libraries.lodash),
    System.registerDynamic("28", ["ca"], !0, function (t, e, n) {
      return n.exports = t("ca"),
        n.exports
    }),
    System.registerDynamic("21", [], !0, function (t, e, n) {
      "use strict";
      return e.PONY_SPEED_TROT = 4,
        e.PONY_SPEED_WALK = 2,
        e.SAYS_TIME = 6,
        e.REGION_SIZE = 20,
        e.MAP_SIZE = 3,
        e.CLOUD_COUNT = 10,
        e.CM_SIZE = 5,
        e.SAY_MAX_LENGTH = 64,
        e.PLAYER_NAME_MAX_LENGTH = 20,
        e.ACCOUNT_NAME_MIN_LENGTH = 1,
        e.ACCOUNT_NAME_MAX_LENGTH = 32,
        e.PONY_LIMIT = 16,
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
    }),
    System.registerDynamic("22", ["2f", "28", "21"], !0, function (t, e, n) {
      "use strict";
      function matchString(t) {
        return new RegExp("^" + W.escapeRegExp((t || "").trim()) + "$", "i")
      }

      function fromNow(t) {
        var e = new Date;
        return e.setTime(e.getTime() + t),
          e
      }

      function hasFlag(t, e) {
        return (t & e) === e
      }

      function at(t, e) {
        return t ? t[s(0 | e, 0, t.length - 1)] : null
      }

      function s(t, e, n) {
        return t > e ? t < n ? t : n : e
      }

      function u(t, e) {
        return t.find(function (t) {
          return t.id === e
        })
      }

      function l(t, e) {
        if (t)
          for (var n = -1; (n = t.indexOf(e)) !== -1;)
            t.splice(n, 1)
      }

      function c(t, e) {
        return !!W.remove(t, function (t) {
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
        var i = n.x / X.tileWidth + t
          , o = n.y / X.tileHeight + e
          , a = n.w / X.tileWidth
          , s = n.h / X.tileHeight;
        return r.x > i && r.x < i + a && r.y > o && r.y < o + s
      }

      function v(t, e, n, r, i) {
        var o = n.x + t
          , a = n.y + e
          , s = n.w
          , u = n.h;
        return r > o && r < o + s && i > a && i < a + u
      }

      function m(t, e) {
        return Math.sqrt(t * t + e * e)
      }

      function g(t, e) {
        var n = t.x - e.x
          , r = t.y - e.y;
        return m(n, r)
      }

      function y(t, e) {
        if (!t.bounds || !e.bounds)
          return !1;
        var n = t.x + t.bounds.x
          , r = t.y + t.bounds.y
          , i = e.x + e.bounds.x
          , o = e.y + e.bounds.y;
        return x(n, r, t.bounds.w, t.bounds.h, i, o, e.bounds.w, e.bounds.h)
      }

      function b(t, e) {
        return x(t.x, t.y, t.w, t.h, e.x, e.y, e.w, e.h)
      }

      function _(t, e) {
        var n = Math.min(t.x, e.x)
          , r = Math.min(t.y, e.y);
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
        for (var n = e ? K : Z, r = "", i = 0; i < t; i++)
          r += n[Math.random() * n.length | 0];
        return r
      }

      function T(t) {
        return function (e) {
          t.error = e.message
        }
      }

      function k(t) {
        var e = t.data
          , n = t.status;
        throw 520 === n || 522 === n ? new Error("DDOS protection error, reload the page to continue") : 403 === n ? new Error("Access denied") : new Error(e || "Server is offline")
      }

      function toPromise(t) {
        return BluebirdPromise.resolve(t).catch(k).then(function (t) {
          return t.data
        })
      }

      function getPixelRatio() {
        return "undefined" != typeof window ? window.devicePixelRatio || 1 : 1
      }

      function createCanvas(t, e) {
        var n = document.createElement("canvas");
        return n.width = t,
          n.height = e,
          n
      }

      function loadImage(path) {
        return new BluebirdPromise(function (e, n) {
            var image = new Image;
            image.addEventListener("load", function () {
              return e(image)
            }),
              image.addEventListener("error", function () {
                return n(new Error("Failed to load image: " + path))
              }),
              image.src = path
          }
        )
      }

      function disableImageSmoothing(t) {
        "imageSmoothingEnabled" in t ? t.imageSmoothingEnabled = !1 : (t.webkitImageSmoothingEnabled = !1,
          t.mozImageSmoothingEnabled = !1,
          t.msImageSmoothingEnabled = !1)
      }

      function flagsToSpeed(t) {
        var e = 3 & t;
        return 2 === e ? X.PONY_SPEED_TROT : 1 === e ? X.PONY_SPEED_WALK : 0
      }

      function dirToVector(t) {
        var e = Q[(0 | t) % Q.length];
        return {
          x: e[0],
          y: e[1]
        }
      }

      function vectorToDir(t, e) {
        var n = Math.atan2(t, -e);
        return Math.round((n < 0 ? n + et : n) * nt) % Q.length
      }

      function encodeMovement(t, e, n, r) {
        var i = Math.floor(100 * s(t, 0, 1e5)) | n << 24
          , o = Math.floor(100 * s(e, 0, 1e5)) | r << 24;
        return [i ^ J, o ^ tt]
      }

      function decodeMovement(t, e) {
        t ^= J,
          e ^= tt;
        var n = (16777215 & t) / 100
          , r = (16777215 & e) / 100
          , i = t >> 24 & 255
          , o = e >> 24 & 255;
        return [n, r, i, o]
      }

      function N(t, e) {
        return !(t < 0) && (t > 0 || e)
      }

      function setupSetTes(t) {
        var e, n;
        t && (t.set = function () {
          e = t.x,
            n = t.y
        }
          ,
          t.tes = function () {
            t.x = e,
              t.y = n
          }
          ,
          t.set())
      }

      function start(t) {
        var e, n = !1, r = BluebirdPromise.resolve(t.load()).then(function () {
            if (n)
              throw new Error("cancelled");
            t.init();
            var r = performance.now()
              , i = r
              , o = 0
              , a = 0;
            e = requestAnimationFrame(function n(s) {
              e = requestAnimationFrame(n),
                o++,
              s - i > 1e3 && (a = 1e3 * o / (s - i),
                o = 0,
                i = s),
                t.update((s - r) / 1e3),
                t.draw(a),
                r = s
            })
          }), i = function () {
            cancelAnimationFrame(e),
              n = !0
          }
          ;
        return {
          promise: r,
          cancel: i
        }
      }

      function setTransform(t, e) {
        t && ("transform" in t.style ? t.style.transform = e : t.style.webkitTransform = e)
      }

      function isPointer(t) {
        return !!t.pointerType
      }

      function isTouch(t) {
        return !!t.touches
      }

      function getButton(t) {
        return isTouch(t) ? 0 : t.button
      }

      function getX(t) {
        return isTouch(t) ? t.touches[0].pageX : t.pageX
      }

      function getY(t) {
        return isTouch(t) ? t.touches[0].pageY : t.pageY
      }

      var BluebirdPromise = t("2f")
        , W = t("28")
        , X = t("21")
        , Z = "abcdefghijklmnopqrstuvwxyz0123456789_"
        , K = Z + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      e.matchString = matchString,
        e.fromNow = fromNow,
        e.hasFlag = hasFlag,
        e.at = at,
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
        e.errorHandler = T,
        e.handleReject = k,
        e.toPromise = toPromise,
        e.getPixelRatio = getPixelRatio,
        e.createCanvas = createCanvas,
        e.loadImage = loadImage,
        e.disableImageSmoothing = disableImageSmoothing;
      var Q = [[0, -1], [.5, -1], [1, -1], [1, -.5], [1, 0], [1, .5], [1, 1], [.5, 1], [0, 1], [-.5, 1], [-1, 1], [-1, .5], [-1, 0], [-1, -.5], [-1, -1], [-.5, -1]]
        , J = 63540507
        , tt = 1026711136
        , et = 2 * Math.PI
        , nt = Q.length / et;
      return e.flagsToSpeed = flagsToSpeed,
        e.dirToVector = dirToVector,
        e.vectorToDir = vectorToDir,
        e.encodeMovement = encodeMovement,
        e.decodeMovement = decodeMovement,
        e.isFacingRight = N,
        e.setupSetTes = setupSetTes,
        e.start = start,
        e.setTransform = setTransform,
        e.isPointer = isPointer,
        e.isTouch = isTouch,
        e.getButton = getButton,
        e.getX = getX,
        e.getY = getY,
        n.exports
    }),
    System.registerDynamic("3c", ["2f", "36", "22"], !0, function (t, e, n) {
      "use strict";
      function loadSprites(t, e) {
        var n = Object.keys(t).reduce(function (e, n) {
          var r = t[n];
          if (r) {
            var i = e[r.src] || [];
            i.push(r),
              e[r.src] = i
          }
          return e
        }, {});
        return BluebirdPromise.map(Object.keys(n), function (t) {
          return f.loadImage(e + t).then(function (e) {
            return n[t].forEach(function (t) {
              return t.img = e
            })
          })
        })
      }

      function loadSpriteSheet(spriteSheet, directory) {
        return f.loadImage(directory + spriteSheet.src).then(function (e) {
          spriteSheet.img = e,
            spriteSheet.sprites.filter(function (t) {
              return !!t
            }).forEach(function (t) {
              return t.img = e
            })
        })
      }

      function loadSpriteSheets(spriteSheets, directory) {
        return BluebirdPromise.map(spriteSheets, function (spriteSheet) {
          return loadSpriteSheet(spriteSheet, directory)
        })//is this needed?
          .then(function () {
        })
      }

      function drawSprite(t, e, n, r) {
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
          var o = s(e.w, e.h)
            , a = c.default.parse(n);
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

      var BluebirdPromise = t("2f")
        , c = t("36")
        , f = t("22");
      e.loadSprites = loadSprites,
        e.loadSpriteSheets = loadSpriteSheets,
        e.drawSprite = drawSprite;
      var p;
      return e.drawColoredSprite = u,
        n.exports
    }),
    System.registerDynamic("cb", [], !0, function (t, e, n) {
      return n.exports = {
        "pony.png": "pony-fd75098daf.png",
        "pony2.png": "pony2-59be800973.png",
        "tiles.png": "tiles-1147a10312.png"
      },
        n.exports
    }),
    System.registerDynamic("1f", ["cb"], !0, function (t, e, n) {
      "use strict";
      function r(t) {
        return t ? {
          x: t[0],
          y: t[1],
          w: t[2],
          h: t[3],
          ox: t[4],
          oy: t[5],
          src: h
        } : null
      }

      function i(t) {
        return t ? {
          x: t[0],
          y: t[1],
          w: t[2],
          h: t[3],
          ox: t[4],
          oy: t[5],
          src: d
        } : null
      }

      function o(t, e) {
        return {
          x: t,
          y: e
        }
      }

      function a(t, e) {
        return {
          fill: v[t],
          outline: v[e]
        }
      }

      function s(t, e, n) {
        return {
          fill: v[t],
          outline: v[e],
          extra: v[n]
        }
      }

      function u(t, e) {
        return {
          color: v[t],
          shadow: v[e]
        }
      }

      function l(t, e, n) {
        return {
          mouth: v[t],
          muzzle: v[e],
          fangs: v[n]
        }
      }

      function c(t, e, n, r) {
        return {
          fill: v[t],
          line: v[e],
          iris: v[n],
          lashes: v[r]
        }
      }

      function f(t, e, n, r, i) {
        return {
          stump: v[t],
          trunk: v[e],
          crown: v[n],
          stumpShadow: v[r],
          shadow: v[i]
        }
      }

      var p = t("cb")
        , h = p["pony.png"]
        , d = p["pony2.png"]
        , v = [null, [159, 284, 9, 7, 31, 28], [276, 298, 12, 6, 29, 30], [511, 11, 1, 1, 38, 28], null, [504, 76, 8, 7, 31, 28], [288, 298, 12, 6, 29, 30], [457, 314, 7, 4, 33, 30], [437, 304, 9, 5, 32, 30], [354, 298, 9, 6, 31, 29], [312, 298, 12, 6, 29, 30], [106, 305, 7, 5, 32, 28], [511, 152, 1, 1, 40, 30], [151, 292, 4, 7, 31, 28], [312, 318, 4, 4, 29, 32], [410, 298, 7, 6, 33, 28], [487, 304, 8, 5, 33, 30], [82, 284, 9, 7, 31, 28], [276, 298, 12, 6, 29, 30], [305, 314, 8, 4, 31, 28], null, [234, 304, 4, 6, 31, 29], [69, 315, 6, 4, 29, 32], [320, 309, 6, 5, 34, 28], [81, 315, 6, 4, 35, 30], [159, 284, 9, 7, 31, 28], [276, 298, 12, 6, 29, 30], [511, 11, 1, 1, 38, 28], null, [504, 76, 8, 7, 31, 28], [288, 298, 12, 6, 29, 30], [457, 314, 7, 4, 33, 30], [437, 304, 9, 5, 32, 30], [354, 298, 9, 6, 31, 29], [312, 298, 12, 6, 29, 30], [106, 305, 7, 5, 32, 28], [511, 152, 1, 1, 40, 30], [151, 292, 4, 7, 31, 28], [312, 318, 4, 4, 29, 32], [410, 298, 7, 6, 33, 28], [487, 304, 8, 5, 33, 30], [82, 284, 9, 7, 31, 28], [276, 298, 12, 6, 29, 30], [305, 314, 8, 4, 31, 28], null, [234, 304, 4, 6, 31, 29], [69, 315, 6, 4, 29, 32], [320, 309, 6, 5, 34, 28], [81, 315, 6, 4, 35, 30], [150, 213, 8, 15, 35, 26], [203, 212, 10, 15, 34, 28], [60, 195, 2, 1, 37, 26], null, [270, 237, 8, 14, 35, 27], [117, 228, 9, 14, 34, 29], [485, 263, 8, 11, 35, 26], [92, 265, 5, 11, 39, 28], [180, 276, 10, 8, 31, 27], [70, 276, 12, 8, 30, 28], [235, 283, 8, 8, 31, 27], [273, 283, 7, 8, 30, 28], [230, 304, 4, 6, 37, 29], [240, 291, 5, 7, 37, 29], [122, 310, 4, 5, 32, 28], [501, 309, 5, 5, 31, 29], [511, 11, 1, 1, 35, 28], [511, 152, 1, 1, 33, 29], [308, 318, 4, 4, 32, 29], [194, 315, 5, 4, 31, 30], [142, 310, 4, 5, 32, 29], [125, 292, 5, 7, 31, 29], [296, 322, 3, 3, 33, 29], [146, 310, 4, 5, 31, 29], [270, 322, 4, 3, 32, 31], [149, 315, 5, 4, 31, 32], [315, 208, 20, 15, 21, 20], [413, 177, 22, 17, 20, 19], [296, 274, 13, 9, 28, 20], [375, 253, 16, 12, 26, 19], [240, 238, 20, 13, 21, 22], [26, 227, 8, 14, 20, 22], [380, 304, 14, 5, 27, 28], [435, 193, 6, 1, 27, 33], [17, 319, 8, 3, 33, 30], [493, 318, 9, 3, 33, 31], [275, 208, 20, 15, 21, 20], [413, 177, 22, 17, 20, 19], [411, 252, 19, 12, 22, 21], null, [388, 211, 12, 15, 21, 20], [85, 179, 15, 17, 20, 19], [92, 253, 15, 12, 25, 21], [240, 209, 15, 15, 26, 19], [266, 283, 7, 8, 34, 25], [464, 274, 9, 9, 33, 25], [295, 208, 20, 15, 21, 20], [413, 177, 22, 17, 20, 19], [430, 252, 19, 12, 22, 22], null, [509, 23, 3, 11, 21, 24], [460, 193, 6, 14, 20, 22], [59, 227, 11, 14, 23, 20], [23, 212, 11, 15, 24, 19], [47, 254, 10, 12, 29, 21], [213, 212, 10, 15, 30, 19], [390, 275, 7, 9, 34, 23], [195, 266, 7, 10, 35, 23], [315, 208, 20, 15, 21, 20], [413, 177, 22, 17, 20, 19], [296, 274, 13, 9, 28, 20], [375, 253, 16, 12, 26, 19], [240, 238, 20, 13, 21, 22], [26, 227, 8, 14, 20, 22], [380, 304, 14, 5, 27, 28], [435, 193, 6, 1, 27, 33], [17, 319, 8, 3, 33, 30], [493, 318, 9, 3, 33, 31], [275, 208, 20, 15, 21, 20], [413, 177, 22, 17, 20, 19], [411, 252, 19, 12, 22, 21], null, [388, 211, 12, 15, 21, 20], [85, 179, 15, 17, 20, 19], [92, 253, 15, 12, 25, 21], [240, 209, 15, 15, 26, 19], [266, 283, 7, 8, 34, 25], [464, 274, 9, 9, 33, 25], [295, 208, 20, 15, 21, 20], [413, 177, 22, 17, 20, 19], [430, 252, 19, 12, 22, 22], null, [509, 23, 3, 11, 21, 24], [460, 193, 6, 14, 20, 22], [59, 227, 11, 14, 23, 20], [23, 212, 11, 15, 24, 19], [47, 254, 10, 12, 29, 21], [213, 212, 10, 15, 30, 19], [390, 275, 7, 9, 34, 23], [195, 266, 7, 10, 35, 23], [0, 179, 20, 17, 21, 23], [26, 139, 22, 21, 20, 22], [233, 298, 15, 6, 26, 23], [41, 276, 17, 8, 25, 22], [374, 226, 13, 14, 21, 25], [466, 175, 5, 15, 20, 25], [34, 226, 13, 14, 22, 26], [0, 254, 12, 12, 22, 31], [129, 315, 5, 4, 34, 27], [435, 193, 6, 1, 34, 31], [362, 309, 6, 5, 35, 26], [458, 324, 2, 2, 40, 30], [318, 251, 19, 12, 22, 23], [317, 223, 21, 14, 21, 22], [327, 322, 9, 2, 28, 23], [365, 304, 15, 5, 26, 22], [200, 298, 18, 6, 22, 24], [276, 274, 20, 9, 21, 24], [366, 265, 19, 10, 22, 25], [21, 276, 20, 8, 22, 28], [258, 314, 10, 4, 31, 27], [461, 318, 12, 3, 30, 29], [393, 324, 4, 2, 37, 29], [362, 324, 5, 2, 37, 30], [266, 263, 16, 11, 25, 21], [458, 238, 18, 13, 24, 20], [149, 267, 5, 10, 25, 21], [65, 241, 9, 13, 24, 20], [419, 264, 7, 11, 27, 21], [140, 255, 5, 12, 30, 21], [411, 275, 6, 9, 32, 22], [107, 267, 6, 10, 33, 22], [153, 304, 5, 6, 36, 25], [416, 284, 6, 7, 36, 25], [235, 251, 21, 12, 21, 21], [173, 213, 25, 14, 19, 20], [83, 298, 17, 6, 25, 21], [0, 276, 21, 8, 23, 20], [274, 304, 21, 5, 21, 23], [59, 298, 24, 6, 19, 23], [179, 298, 21, 6, 21, 26], [155, 298, 24, 6, 19, 27], [349, 304, 16, 5, 26, 28], [295, 304, 19, 5, 24, 29], [336, 322, 8, 2, 34, 29], [356, 251, 12, 2, 31, 30], [298, 251, 20, 12, 28, 20], [295, 223, 22, 14, 27, 19], [44, 171, 4, 7, 28, 25], [154, 267, 5, 10, 27, 23], [508, 12, 4, 11, 31, 20], [135, 242, 6, 13, 30, 19], [482, 274, 8, 9, 35, 22], [330, 263, 10, 11, 35, 21], [335, 298, 10, 6, 38, 25], [82, 276, 11, 8, 38, 24], [301, 131, 22, 22, 20, 22], [338, 106, 23, 25, 18, 21], [73, 284, 9, 7, 33, 22], [345, 298, 9, 6, 32, 21], [256, 251, 21, 12, 20, 23], [240, 224, 19, 14, 18, 22], [0, 161, 20, 18, 22, 26], [52, 212, 11, 15, 21, 31], [502, 318, 9, 3, 33, 29], [62, 195, 2, 1, 32, 31], [236, 319, 6, 3, 36, 30], [460, 207, 6, 2, 34, 31], [482, 223, 20, 14, 20, 24], [482, 192, 22, 16, 19, 23], [465, 298, 6, 6, 34, 25], [506, 282, 6, 8, 35, 24], [152, 277, 7, 8, 27, 24], [75, 266, 8, 10, 27, 23], [260, 238, 10, 13, 20, 25], [400, 211, 12, 15, 19, 24], [504, 297, 4, 7, 24, 32], [429, 275, 5, 9, 23, 32], [446, 324, 3, 2, 24, 32], [473, 80, 1, 3, 23, 32], [511, 144, 1, 2, 27, 32], null, [92, 235, 3, 5, 24, 34], [155, 285, 4, 6, 23, 35], [0, 298, 4, 7, 24, 32], [96, 196, 4, 9, 23, 32], [439, 318, 2, 4, 25, 34], null, [462, 324, 2, 2, 24, 32], [473, 80, 1, 3, 23, 32], [432, 156, 3, 2, 25, 32], null, [92, 235, 3, 5, 24, 34], [155, 285, 4, 6, 23, 35], [4, 298, 4, 7, 24, 32], [96, 196, 4, 9, 23, 32], [511, 154, 1, 1, 27, 32], null, null, [276, 154, 1, 1, 23, 34], [240, 190, 4, 2, 24, 32], [511, 150, 1, 2, 23, 32], [92, 235, 3, 5, 24, 34], [155, 285, 4, 6, 23, 35], [174, 266, 7, 10, 25, 33], [449, 252, 9, 12, 24, 32], [314, 322, 3, 3, 27, 33], [446, 193, 5, 1, 27, 32], [188, 266, 7, 10, 25, 33], [458, 263, 9, 11, 24, 33], [244, 154, 11, 20, 20, 31], [419, 136, 13, 22, 19, 30], null, [511, 152, 1, 1, 31, 32], [91, 284, 9, 7, 21, 31], [321, 274, 11, 9, 20, 30], [417, 39, 5, 16, 21, 35], [504, 57, 8, 19, 19, 33], [182, 310, 4, 5, 20, 46], [246, 304, 3, 6, 19, 46], [406, 195, 7, 16, 24, 32], [506, 174, 5, 16, 27, 33], [472, 155, 20, 19, 21, 20], [367, 131, 22, 22, 20, 19], [296, 274, 13, 9, 28, 20], [375, 253, 16, 12, 26, 19], [412, 239, 20, 13, 21, 22], [26, 227, 8, 14, 20, 22], [39, 284, 13, 7, 27, 28], [248, 298, 14, 6, 27, 30], [457, 314, 7, 4, 33, 30], [427, 304, 10, 5, 32, 30], [92, 235, 3, 5, 24, 34], [155, 285, 4, 6, 23, 35], [492, 155, 20, 19, 21, 20], [323, 131, 22, 22, 20, 19], [66, 179, 19, 17, 22, 21], [511, 152, 1, 1, 40, 30], [388, 211, 12, 15, 21, 20], [85, 179, 15, 17, 20, 19], [359, 223, 15, 14, 25, 21], [185, 180, 15, 17, 26, 19], [366, 275, 8, 9, 33, 25], [57, 266, 9, 10, 33, 25], [92, 235, 3, 5, 24, 34], [155, 285, 4, 6, 23, 35], [383, 158, 20, 19, 21, 20], [345, 131, 22, 22, 20, 19], [337, 251, 19, 12, 22, 22], null, [509, 23, 3, 11, 21, 24], [460, 193, 6, 14, 20, 22], [59, 227, 11, 14, 23, 20], [23, 212, 11, 15, 24, 19], [194, 227, 10, 14, 29, 21], [299, 191, 11, 17, 29, 19], [83, 266, 7, 10, 34, 23], [426, 264, 7, 11, 35, 23], [92, 235, 3, 5, 24, 34], [155, 285, 4, 6, 23, 35], [203, 197, 20, 15, 21, 20], [44, 178, 22, 17, 20, 19], [296, 274, 13, 9, 28, 20], [375, 253, 16, 12, 26, 19], [412, 239, 20, 13, 21, 22], [26, 227, 8, 14, 20, 22], [39, 284, 13, 7, 27, 28], [248, 298, 14, 6, 27, 30], [457, 314, 7, 4, 33, 30], [427, 304, 10, 5, 32, 30], [335, 208, 20, 15, 21, 20], [100, 178, 22, 17, 20, 19], [356, 253, 19, 12, 22, 21], [511, 152, 1, 1, 40, 30], [388, 211, 12, 15, 21, 20], [85, 179, 15, 17, 20, 19], [359, 223, 15, 14, 25, 21], [185, 180, 15, 17, 26, 19], [366, 275, 8, 9, 33, 25], [57, 266, 9, 10, 33, 25], [355, 208, 20, 15, 21, 20], [44, 178, 22, 17, 20, 19], [337, 251, 19, 12, 22, 22], null, [509, 23, 3, 11, 21, 24], [460, 193, 6, 14, 20, 22], [59, 227, 11, 14, 23, 20], [23, 212, 11, 15, 24, 19], [194, 227, 10, 14, 29, 21], [299, 191, 11, 17, 29, 19], [83, 266, 7, 10, 34, 23], [426, 264, 7, 11, 35, 23], [277, 153, 22, 20, 21, 23], [277, 131, 24, 22, 20, 22], [218, 298, 15, 6, 26, 23], [41, 276, 17, 8, 25, 22], [374, 226, 13, 14, 21, 25], [466, 175, 5, 15, 20, 25], [95, 226, 13, 14, 22, 26], [0, 254, 12, 12, 22, 31], [270, 237, 8, 14, 35, 27], [126, 228, 9, 14, 34, 29], [485, 263, 8, 11, 35, 26], [92, 265, 5, 11, 39, 28], [216, 266, 7, 10, 25, 33], [411, 264, 8, 11, 25, 33], [458, 251, 19, 12, 22, 23], [338, 223, 21, 14, 21, 22], [327, 322, 9, 2, 28, 23], [365, 304, 15, 5, 26, 22], [200, 298, 18, 6, 22, 24], [276, 274, 20, 9, 21, 24], [366, 265, 19, 10, 22, 25], [21, 276, 20, 8, 22, 28], [170, 276, 10, 8, 31, 27], [58, 276, 12, 8, 30, 28], [230, 304, 4, 6, 37, 29], [330, 291, 5, 7, 37, 29], [266, 263, 16, 11, 25, 21], [458, 238, 18, 13, 24, 20], [149, 267, 5, 10, 25, 21], [65, 241, 9, 13, 24, 20], [419, 264, 7, 11, 27, 21], [140, 255, 5, 12, 30, 21], [411, 275, 6, 9, 32, 22], [107, 267, 6, 10, 33, 22], [153, 304, 5, 6, 36, 25], [416, 284, 6, 7, 36, 25], [277, 251, 21, 12, 21, 21], [270, 223, 25, 14, 19, 20], [83, 298, 17, 6, 25, 21], [0, 276, 21, 8, 23, 20], [274, 304, 21, 5, 21, 23], [59, 298, 24, 6, 19, 23], [179, 298, 21, 6, 21, 26], [155, 298, 24, 6, 19, 27], [333, 304, 16, 5, 26, 28], [314, 304, 19, 5, 24, 29], [258, 310, 10, 4, 32, 29], [474, 53, 12, 4, 31, 30], [298, 251, 20, 12, 28, 20], [295, 223, 22, 14, 27, 19], [44, 171, 4, 7, 28, 25], [154, 267, 5, 10, 27, 23], [508, 12, 4, 11, 31, 20], [135, 242, 6, 13, 30, 19], [482, 274, 8, 9, 35, 22], [330, 263, 10, 11, 35, 21], [335, 298, 10, 6, 38, 25], [82, 276, 11, 8, 38, 24], [442, 133, 22, 22, 20, 22], [315, 106, 23, 25, 18, 21], [73, 284, 9, 7, 33, 22], [345, 298, 9, 6, 32, 21], [256, 251, 21, 12, 20, 23], [240, 224, 19, 14, 18, 22], [0, 161, 20, 18, 22, 26], [52, 212, 11, 15, 21, 31], [0, 319, 9, 3, 33, 29], [146, 310, 4, 5, 31, 29], [268, 314, 10, 4, 32, 30], [296, 314, 9, 4, 31, 32], [454, 32, 20, 27, 20, 24], [486, 0, 22, 29, 19, 23], [465, 298, 6, 6, 34, 25], [506, 282, 6, 8, 35, 24], [152, 277, 7, 8, 27, 24], [75, 266, 8, 10, 27, 23], [260, 238, 10, 13, 20, 25], [400, 211, 12, 15, 19, 24], [417, 39, 5, 16, 21, 35], [504, 57, 8, 19, 19, 33], [182, 310, 4, 5, 20, 46], [246, 304, 3, 6, 19, 46], [406, 195, 7, 16, 24, 32], [506, 174, 5, 16, 27, 33], [97, 265, 5, 11, 39, 35], [344, 237, 7, 14, 38, 33], [445, 318, 2, 4, 40, 37], [247, 310, 3, 5, 38, 37], [362, 276, 4, 8, 39, 38], [348, 318, 4, 4, 39, 43], [244, 310, 3, 5, 41, 35], [240, 180, 4, 10, 41, 33], [102, 265, 5, 11, 39, 35], [344, 237, 7, 14, 38, 33], [442, 121, 3, 8, 40, 37], null, [361, 265, 5, 11, 39, 35], [309, 237, 7, 14, 38, 33], [53, 298, 3, 7, 41, 36], [476, 283, 4, 8, 40, 37], [356, 265, 5, 11, 39, 35], [344, 237, 7, 14, 38, 33], [451, 70, 3, 10, 40, 36], null, [160, 255, 5, 11, 39, 35], [302, 237, 7, 14, 38, 33], [92, 227, 3, 8, 40, 38], [509, 34, 3, 10, 40, 37], [121, 255, 7, 12, 36, 37], [214, 227, 9, 14, 35, 36], [190, 291, 5, 7, 36, 40], [167, 266, 7, 10, 35, 37], [131, 267, 6, 10, 37, 37], [385, 324, 4, 2, 36, 46], [235, 241, 5, 10, 38, 39], [452, 324, 2, 2, 37, 48], [165, 242, 3, 8, 40, 41], [270, 209, 5, 14, 39, 36], [404, 136, 15, 22, 37, 22], [22, 115, 17, 24, 36, 21], [447, 322, 2, 2, 41, 26], [360, 318, 4, 4, 40, 25], [5, 322, 5, 3, 42, 22], [190, 276, 10, 8, 39, 21], [447, 322, 2, 2, 41, 26], [360, 318, 4, 4, 40, 25], [473, 274, 9, 9, 43, 24], [505, 237, 7, 13, 46, 23], [107, 242, 7, 13, 44, 25], [267, 304, 3, 6, 48, 35], [309, 263, 11, 11, 37, 28], [12, 241, 12, 13, 36, 28], [451, 283, 5, 8, 37, 36], [223, 266, 6, 10, 36, 35], [433, 264, 7, 11, 40, 33], [83, 241, 9, 13, 39, 32], [323, 322, 2, 3, 43, 37], null, [183, 304, 5, 6, 42, 33], [214, 254, 7, 12, 41, 32], [323, 322, 2, 3, 43, 37], null, [34, 265, 7, 11, 40, 33], [177, 241, 9, 13, 39, 32], [229, 266, 6, 10, 40, 34], [198, 254, 8, 12, 39, 33], [178, 304, 5, 6, 40, 38], [259, 283, 7, 8, 39, 37], [135, 197, 10, 16, 37, 29], [256, 174, 12, 18, 36, 28], [423, 275, 6, 9, 41, 29], [206, 254, 8, 12, 40, 28], [221, 254, 7, 12, 37, 33], [47, 241, 9, 13, 36, 33], [460, 209, 14, 15, 30, 35], [296, 173, 16, 18, 29, 34], [24, 241, 10, 13, 30, 35], [12, 212, 11, 15, 29, 34], [400, 226, 12, 14, 30, 35], [365, 173, 13, 18, 29, 34], [0, 227, 13, 14, 30, 36], [58, 196, 13, 16, 30, 35], [454, 264, 4, 9, 40, 37], [228, 254, 7, 12, 38, 36], [489, 250, 6, 13, 37, 32], [118, 213, 8, 15, 36, 31], [12, 298, 4, 7, 39, 32], [306, 283, 6, 8, 38, 31], [202, 322, 4, 3, 39, 37], [63, 315, 6, 4, 38, 36], [264, 318, 5, 4, 37, 40], [353, 314, 8, 4, 36, 40], [105, 315, 6, 4, 37, 41], [0, 305, 8, 5, 36, 41], [13, 139, 13, 22, 48, 42], [69, 115, 15, 24, 47, 41], [406, 304, 11, 5, 48, 42], [484, 283, 14, 7, 47, 41], [11, 266, 11, 10, 48, 44], [296, 263, 13, 11, 47, 45], [393, 195, 13, 16, 48, 48], [100, 195, 15, 16, 47, 49], [153, 242, 6, 13, 48, 50], [134, 213, 8, 15, 47, 50], [0, 139, 13, 22, 48, 42], [39, 115, 15, 24, 47, 41], [452, 155, 10, 20, 48, 43], [511, 146, 1, 2, 47, 47], [97, 138, 13, 22, 48, 42], [262, 131, 15, 23, 47, 41], [266, 154, 10, 20, 48, 44], [474, 32, 12, 21, 47, 44], [84, 138, 13, 22, 48, 42], [69, 115, 15, 24, 47, 41], [358, 153, 13, 20, 48, 43], null, [498, 133, 13, 22, 48, 42], [54, 115, 15, 24, 47, 41], [352, 173, 13, 18, 48, 46], [354, 274, 2, 2, 60, 61], [259, 224, 11, 14, 48, 42], [13, 196, 13, 16, 47, 41], [69, 304, 5, 6, 48, 42], [395, 298, 8, 6, 47, 41], [417, 304, 10, 5, 49, 44], [209, 276, 9, 8, 51, 43], [374, 275, 8, 9, 49, 47], [466, 283, 5, 8, 53, 49], [321, 322, 2, 3, 51, 50], [264, 304, 3, 6, 50, 49], [81, 227, 11, 14, 48, 42], [13, 196, 13, 16, 47, 41], [22, 266, 10, 10, 48, 44], null, [184, 227, 10, 14, 48, 42], [26, 196, 13, 16, 47, 41], [93, 276, 11, 8, 48, 45], [63, 284, 10, 7, 50, 47], [70, 227, 11, 14, 48, 42], [0, 196, 13, 16, 47, 41], [447, 239, 11, 13, 48, 43], [511, 152, 1, 1, 50, 49], [173, 227, 11, 14, 48, 42], [71, 196, 13, 16, 47, 41], [467, 263, 9, 11, 48, 45], [511, 152, 1, 1, 55, 48], [501, 250, 11, 12, 47, 43], [375, 211, 13, 15, 46, 42], [332, 274, 11, 9, 47, 43], [34, 253, 13, 12, 46, 42], [47, 266, 10, 10, 47, 44], [52, 284, 11, 7, 46, 48], [382, 275, 8, 9, 48, 46], [218, 276, 9, 8, 47, 48], [118, 299, 6, 6, 49, 47], [404, 275, 7, 9, 48, 48], [509, 321, 3, 3, 51, 48], [60, 310, 5, 5, 49, 48], [345, 153, 13, 20, 47, 42], [389, 136, 15, 22, 46, 41], [394, 304, 12, 5, 47, 42], [262, 298, 14, 6, 46, 41], [387, 226, 13, 14, 47, 45], [378, 195, 15, 16, 46, 45], [0, 212, 12, 15, 47, 47], [39, 211, 13, 15, 46, 48], [202, 266, 7, 10, 47, 49], [488, 297, 4, 7, 51, 53], [438, 275, 4, 9, 48, 50], [40, 179, 4, 10, 47, 50], [454, 59, 19, 24, 47, 42], [424, 86, 21, 26, 46, 41], [48, 159, 14, 19, 52, 42], [361, 106, 21, 25, 46, 41], [244, 131, 18, 23, 47, 43], [511, 146, 1, 2, 46, 47], [464, 133, 17, 22, 47, 44], [276, 173, 20, 18, 46, 49], [70, 139, 14, 20, 48, 46], [299, 153, 17, 20, 47, 47], [499, 83, 13, 23, 47, 42], [382, 106, 16, 25, 46, 41], [361, 314, 8, 4, 47, 42], [324, 298, 11, 6, 46, 41], [309, 274, 12, 9, 47, 44], [282, 263, 14, 11, 46, 44], [62, 159, 12, 19, 48, 46], [200, 180, 14, 17, 47, 48], [388, 177, 9, 18, 50, 47], [312, 173, 14, 18, 48, 48], [258, 304, 3, 6, 50, 48], [41, 298, 3, 7, 50, 49], null, [378, 173, 5, 4, 29, 38], [511, 11, 1, 1, 33, 41], null, [417, 55, 5, 5, 29, 38], [511, 11, 1, 1, 32, 42], null, [352, 318, 4, 4, 29, 38], [511, 11, 1, 1, 32, 42], null, [496, 309, 5, 5, 29, 38], [511, 11, 1, 1, 32, 42], [64, 195, 2, 1, 31, 42], [378, 173, 5, 4, 29, 38], [511, 11, 1, 1, 33, 41], [413, 324, 3, 2, 31, 41], [378, 173, 5, 4, 29, 38], [511, 11, 1, 1, 33, 41], null, [214, 315, 5, 4, 29, 38], [511, 11, 1, 1, 33, 42], [165, 250, 3, 4, 35, 34], [447, 318, 2, 4, 28, 34], [213, 304, 5, 6, 34, 33], [96, 205, 4, 6, 27, 33], [32, 273, 2, 3, 35, 35], [511, 139, 1, 3, 29, 35], [511, 153, 1, 1, 39, 35], [511, 153, 1, 1, 26, 35], [302, 322, 3, 3, 35, 35], [32, 273, 2, 3, 28, 35], [456, 309, 5, 5, 34, 34], [138, 310, 4, 5, 27, 34], [32, 273, 2, 3, 35, 35], [511, 139, 1, 3, 29, 35], [511, 153, 1, 1, 39, 35], [511, 153, 1, 1, 26, 35], [437, 324, 3, 2, 35, 36], [456, 324, 2, 2, 28, 36], [159, 315, 5, 4, 34, 35], [316, 318, 4, 4, 27, 35], [456, 324, 2, 2, 35, 36], [511, 148, 1, 2, 29, 36], [511, 153, 1, 1, 39, 35], [511, 153, 1, 1, 26, 35], [451, 193, 3, 1, 35, 37], [60, 195, 2, 1, 28, 37], [125, 322, 5, 3, 34, 36], [222, 322, 4, 3, 27, 36], [60, 195, 2, 1, 35, 37], [511, 11, 1, 1, 29, 37], [511, 153, 1, 1, 39, 36], [511, 153, 1, 1, 26, 36], null, null, [342, 324, 5, 2, 34, 37], [377, 324, 4, 2, 27, 37], null, null, [511, 153, 1, 1, 39, 37], [511, 153, 1, 1, 26, 37], null, null, [367, 324, 5, 2, 34, 37], [405, 324, 4, 2, 27, 37], null, null, [511, 153, 1, 1, 39, 37], [511, 153, 1, 1, 26, 37], [300, 298, 12, 6, 27, 33], [431, 298, 7, 6, 29, 33], [473, 318, 11, 3, 27, 39], [159, 276, 11, 8, 27, 34], [511, 11, 1, 1, 36, 40], [511, 11, 1, 1, 27, 40], [226, 304, 4, 6, 30, 27], [336, 283, 6, 8, 29, 25], [241, 310, 3, 5, 31, 28], [148, 299, 5, 6, 30, 27], [379, 298, 8, 6, 38, 48], [200, 276, 9, 8, 38, 47], [20, 161, 6, 16, 32, 54], [504, 192, 8, 16, 31, 55], [115, 197, 10, 16, 42, 54], [228, 180, 12, 17, 41, 54], [40, 195, 18, 16, 31, 41], [20, 179, 20, 17, 30, 41], [386, 240, 13, 13, 27, 31], [497, 208, 15, 15, 26, 30], [434, 275, 4, 9, 40, 28], [137, 267, 6, 10, 39, 27], [170, 310, 4, 5, 27, 28], [398, 284, 6, 7, 26, 27], [0, 284, 39, 7, 22, 66], [235, 274, 41, 9, 21, 65], [445, 86, 6, 17, 32, 53], [405, 177, 8, 18, 31, 53], [435, 156, 6, 17, 34, 53], [397, 177, 8, 18, 33, 53], [115, 115, 7, 18, 35, 52], [26, 160, 9, 19, 34, 52], [189, 197, 7, 16, 35, 51], [258, 192, 9, 17, 34, 51], [453, 210, 7, 15, 35, 51], [145, 197, 9, 16, 34, 51], [337, 237, 7, 14, 35, 51], [109, 213, 9, 15, 34, 51], [477, 237, 6, 14, 35, 52], [232, 212, 8, 15, 34, 52], [114, 242, 7, 13, 34, 53], [135, 228, 9, 14, 33, 53], [141, 242, 6, 13, 34, 53], [152, 228, 8, 14, 33, 53], [134, 255, 6, 12, 33, 53], [219, 241, 8, 13, 32, 53], [440, 264, 7, 11, 31, 52], [66, 254, 9, 12, 30, 52], [190, 254, 8, 12, 30, 51], [502, 223, 10, 14, 29, 50], [168, 241, 9, 13, 29, 51], [63, 212, 11, 15, 28, 50], [310, 191, 11, 17, 27, 51], [326, 173, 13, 18, 26, 51], [351, 191, 10, 17, 28, 52], [244, 174, 12, 18, 27, 52], [466, 192, 8, 17, 30, 53], [446, 175, 10, 18, 29, 53], [432, 239, 15, 13, 42, 51], [460, 224, 17, 14, 41, 51], [84, 196, 12, 16, 42, 51], [214, 180, 14, 17, 41, 51], [321, 191, 10, 17, 42, 50], [472, 174, 12, 18, 41, 50], [370, 191, 8, 17, 42, 49], [456, 175, 10, 18, 41, 49], [474, 192, 8, 17, 42, 49], [378, 177, 10, 18, 41, 49], [267, 192, 8, 17, 42, 49], [100, 160, 10, 18, 41, 49], [268, 174, 8, 18, 42, 50], [74, 159, 10, 19, 41, 50], [92, 160, 8, 19, 42, 51], [462, 155, 10, 20, 41, 51], [84, 160, 8, 19, 42, 51], [442, 155, 10, 20, 41, 51], [35, 160, 9, 19, 42, 51], [255, 154, 11, 20, 41, 51], [432, 136, 10, 20, 42, 50], [110, 138, 12, 21, 41, 50], [371, 153, 12, 20, 42, 49], [403, 39, 14, 21, 41, 49], [110, 159, 12, 19, 42, 49], [331, 153, 14, 20, 41, 49], [339, 173, 13, 18, 42, 49], [420, 158, 15, 19, 41, 49], [429, 225, 15, 14, 42, 50], [223, 197, 17, 15, 41, 50], [92, 240, 15, 13, 42, 51], [412, 225, 17, 14, 41, 51], [402, 322, 5, 2, 32, 68], [115, 195, 7, 2, 31, 69], [402, 322, 5, 2, 32, 68], [115, 195, 7, 2, 31, 69], [20, 177, 6, 2, 34, 68], [9, 319, 8, 3, 33, 68], [144, 315, 5, 4, 37, 66], [47, 305, 7, 5, 36, 66], [153, 299, 2, 5, 40, 62], [40, 189, 4, 6, 39, 62], [153, 299, 2, 5, 40, 61], [458, 232, 2, 6, 41, 61], [153, 299, 2, 5, 41, 59], [458, 232, 2, 6, 42, 59], [256, 310, 2, 5, 39, 61], [32, 266, 2, 7, 40, 60], [256, 310, 2, 5, 39, 61], [32, 266, 2, 7, 40, 60], [253, 310, 3, 5, 37, 61], [193, 304, 5, 6, 36, 61], [256, 310, 2, 5, 37, 60], [500, 297, 4, 7, 36, 59], [218, 322, 4, 3, 32, 60], [326, 309, 6, 5, 31, 59], [218, 322, 4, 3, 31, 60], [506, 314, 6, 4, 30, 60], [412, 322, 5, 2, 29, 62], [506, 314, 6, 4, 29, 61], [347, 324, 5, 2, 27, 66], [351, 322, 7, 2, 26, 67], [402, 322, 5, 2, 28, 67], [365, 322, 7, 2, 27, 68], [402, 322, 5, 2, 30, 68], [115, 195, 7, 2, 29, 69], [20, 177, 6, 2, 46, 68], [9, 319, 8, 3, 45, 68], [443, 318, 2, 4, 55, 60], [40, 189, 4, 6, 54, 59], [255, 304, 3, 6, 51, 61], [16, 298, 4, 7, 51, 61], [284, 318, 5, 4, 47, 63], [452, 298, 7, 6, 46, 62], [432, 322, 5, 2, 45, 64], [87, 315, 6, 4, 45, 63], [70, 322, 5, 3, 45, 63], [176, 319, 6, 3, 44, 64], [111, 315, 6, 4, 44, 62], [113, 305, 7, 5, 43, 62], [455, 321, 6, 3, 43, 65], [321, 314, 8, 4, 42, 65], [109, 211, 6, 2, 43, 68], [9, 319, 8, 3, 42, 68], [109, 211, 6, 2, 43, 68], [9, 319, 8, 3, 42, 68], [109, 211, 6, 2, 44, 68], [9, 319, 8, 3, 43, 68], [372, 322, 6, 2, 46, 68], [393, 314, 8, 4, 45, 67], [50, 322, 5, 3, 48, 66], [308, 309, 6, 5, 48, 65], [220, 310, 3, 5, 51, 63], [509, 290, 3, 7, 52, 62], [229, 310, 3, 5, 52, 62], [38, 298, 3, 7, 53, 61], [232, 310, 3, 5, 54, 59], [44, 298, 3, 7, 55, 58], [437, 318, 2, 4, 55, 60], [222, 304, 4, 6, 54, 59], [128, 255, 6, 12, 32, 58], [294, 237, 8, 14, 31, 57], [434, 324, 3, 2, 35, 58], [494, 321, 5, 3, 34, 57], [368, 251, 4, 2, 34, 60], [467, 321, 6, 3, 33, 59], [389, 324, 4, 2, 34, 62], [164, 319, 6, 3, 33, 61], [332, 324, 5, 2, 33, 64], [99, 319, 7, 3, 32, 63], [427, 322, 5, 2, 33, 66], [57, 319, 7, 3, 32, 65], [506, 190, 6, 2, 32, 68], [369, 314, 8, 4, 31, 67], [147, 242, 6, 13, 32, 57], [142, 213, 8, 15, 31, 56], [434, 324, 3, 2, 35, 57], [10, 322, 5, 3, 34, 56], [282, 322, 4, 3, 34, 59], [212, 319, 6, 3, 33, 59], [389, 324, 4, 2, 34, 62], [378, 322, 6, 2, 33, 62], [427, 322, 5, 2, 33, 64], [344, 322, 7, 2, 32, 64], [442, 322, 5, 2, 33, 66], [344, 322, 7, 2, 32, 66], [506, 190, 6, 2, 32, 68], [25, 319, 8, 3, 31, 68], [495, 250, 6, 13, 34, 57], [158, 213, 8, 15, 33, 56], [437, 324, 3, 2, 35, 57], [494, 321, 5, 3, 34, 56], [250, 322, 4, 3, 35, 59], [39, 315, 6, 4, 34, 58], [389, 324, 4, 2, 35, 62], [164, 319, 6, 3, 34, 61], [407, 322, 5, 2, 35, 64], [164, 319, 6, 3, 34, 63], [442, 322, 5, 2, 35, 66], [57, 319, 7, 3, 34, 65], [384, 322, 6, 2, 34, 68], [377, 314, 8, 4, 33, 67], [351, 237, 7, 14, 35, 56], [154, 197, 9, 16, 34, 55], [290, 322, 3, 3, 35, 56], [219, 315, 5, 4, 34, 55], [238, 310, 3, 5, 36, 57], [416, 309, 5, 5, 35, 57], [412, 318, 4, 4, 36, 60], [383, 153, 6, 5, 35, 59], [356, 318, 4, 4, 37, 62], [380, 309, 6, 5, 36, 61], [164, 315, 5, 4, 37, 64], [93, 315, 6, 4, 36, 64], [204, 315, 5, 4, 37, 66], [403, 298, 7, 6, 36, 65], [107, 255, 7, 12, 35, 55], [223, 227, 9, 14, 34, 54], [451, 193, 3, 1, 35, 55], [372, 324, 5, 2, 34, 54], [302, 322, 3, 3, 35, 56], [234, 315, 5, 4, 34, 55], [432, 318, 3, 4, 36, 58], [269, 318, 5, 4, 35, 58], [214, 322, 4, 3, 36, 61], [51, 315, 6, 4, 35, 60], [299, 318, 5, 4, 37, 62], [93, 315, 6, 4, 36, 62], [182, 322, 4, 3, 38, 64], [374, 309, 6, 5, 37, 63], [447, 264, 7, 11, 35, 55], [186, 241, 9, 13, 34, 54], [422, 324, 3, 2, 35, 55], [494, 321, 5, 3, 34, 54], [308, 322, 3, 3, 35, 56], [75, 322, 5, 3, 34, 56], [226, 310, 3, 5, 36, 57], [416, 309, 5, 5, 35, 57], [429, 318, 3, 4, 37, 60], [150, 310, 4, 5, 36, 59], [114, 310, 4, 5, 37, 61], [79, 304, 5, 6, 36, 60], [442, 129, 3, 4, 39, 62], [89, 304, 5, 6, 38, 61], [160, 266, 7, 10, 35, 55], [75, 254, 9, 12, 34, 54], [457, 193, 3, 1, 36, 55], [160, 322, 5, 3, 35, 54], [464, 324, 2, 2, 37, 56], [417, 322, 5, 2, 35, 56], [305, 322, 3, 3, 35, 57], [511, 7, 1, 4, 34, 57], [0, 322, 5, 3, 35, 59], [50, 310, 5, 5, 35, 58], [244, 315, 5, 4, 36, 60], [79, 304, 5, 6, 36, 59], [320, 318, 4, 4, 38, 61], [89, 304, 5, 6, 38, 60], [350, 263, 6, 11, 35, 55], [211, 241, 8, 13, 34, 54], [511, 142, 1, 2, 38, 55], [224, 315, 5, 4, 35, 54], [397, 324, 4, 2, 35, 56], [15, 322, 5, 3, 34, 56], [440, 324, 3, 2, 35, 58], [511, 106, 1, 3, 34, 58], [400, 318, 4, 4, 35, 59], [410, 309, 6, 5, 34, 59], [202, 310, 4, 5, 36, 60], [511, 152, 1, 1, 36, 64], [250, 310, 3, 5, 38, 61], [105, 285, 5, 7, 37, 60], [181, 266, 7, 10, 34, 56], [57, 254, 9, 12, 33, 55], [58, 195, 2, 1, 37, 56], [390, 322, 6, 2, 34, 55], [40, 322, 5, 3, 34, 57], [113, 319, 7, 3, 33, 57], [381, 324, 4, 2, 34, 59], [452, 324, 2, 2, 33, 60], [278, 322, 4, 3, 35, 60], [368, 309, 6, 5, 34, 59], [102, 310, 4, 5, 36, 60], [511, 152, 1, 1, 36, 64], [214, 310, 3, 5, 38, 61], [105, 285, 5, 7, 37, 60], [113, 267, 6, 10, 34, 56], [174, 254, 8, 12, 33, 55], [511, 11, 1, 1, 36, 56], [248, 319, 6, 3, 34, 55], [337, 324, 5, 2, 34, 57], [64, 319, 7, 3, 33, 57], [266, 322, 4, 3, 34, 58], [511, 146, 1, 2, 33, 60], [392, 318, 4, 4, 34, 59], [431, 309, 5, 5, 34, 59], [194, 310, 4, 5, 35, 60], [426, 309, 5, 5, 35, 60], [235, 310, 3, 5, 37, 61], [193, 304, 5, 6, 36, 61], [119, 267, 6, 10, 33, 55], [182, 254, 8, 12, 32, 54], [416, 324, 3, 2, 35, 55], [75, 315, 6, 4, 33, 54], [407, 322, 5, 2, 33, 56], [511, 106, 1, 3, 32, 56], [262, 322, 4, 3, 33, 58], [182, 319, 6, 3, 32, 58], [332, 318, 4, 4, 34, 59], [511, 146, 1, 2, 33, 61], [364, 318, 4, 4, 35, 60], [79, 304, 5, 6, 34, 59], [442, 129, 3, 4, 36, 61], [222, 304, 4, 6, 36, 60], [417, 275, 6, 9, 31, 54], [493, 263, 8, 11, 30, 53], [460, 324, 2, 2, 35, 54], [117, 315, 6, 4, 32, 53], [254, 315, 4, 3, 32, 54], [146, 319, 6, 3, 31, 54], [437, 322, 5, 2, 31, 56], [358, 322, 7, 2, 30, 56], [357, 324, 5, 2, 31, 58], [435, 173, 7, 2, 30, 58], [30, 322, 5, 3, 31, 59], [452, 324, 2, 2, 30, 60], [234, 322, 4, 3, 32, 60], [326, 309, 6, 5, 31, 59], [143, 267, 6, 10, 30, 53], [84, 254, 8, 12, 29, 52], [238, 322, 4, 3, 32, 53], [99, 315, 6, 4, 31, 52], [254, 315, 4, 3, 31, 54], [146, 319, 6, 3, 30, 54], [437, 322, 5, 2, 30, 56], [358, 322, 7, 2, 29, 56], [352, 324, 5, 2, 30, 58], [435, 173, 7, 2, 29, 58], [80, 322, 5, 3, 30, 59], [511, 146, 1, 2, 29, 60], [234, 322, 4, 3, 31, 60], [326, 309, 6, 5, 30, 59], [209, 266, 7, 10, 29, 54], [165, 254, 9, 12, 28, 53], [425, 324, 3, 2, 33, 54], [139, 315, 5, 4, 32, 53], [105, 322, 5, 3, 31, 54], [398, 309, 6, 5, 30, 54], [115, 322, 5, 3, 30, 56], [511, 146, 1, 2, 29, 56], [437, 322, 5, 2, 29, 58], [358, 322, 7, 2, 28, 58], [422, 322, 5, 2, 29, 60], [435, 173, 7, 2, 28, 60], [165, 322, 5, 3, 29, 61], [485, 314, 7, 4, 28, 61], [74, 241, 9, 13, 27, 55], [74, 212, 11, 15, 26, 54], [286, 322, 4, 3, 32, 55], [154, 315, 5, 4, 32, 54], [210, 322, 4, 3, 31, 57], [27, 315, 6, 4, 30, 56], [504, 321, 5, 3, 29, 59], [85, 319, 7, 3, 28, 59], [25, 322, 5, 3, 28, 61], [85, 319, 7, 3, 27, 61], [194, 319, 6, 3, 27, 63], [41, 319, 8, 3, 26, 63], [327, 324, 5, 2, 27, 66], [436, 314, 7, 4, 26, 65], [195, 241, 8, 13, 28, 56], [85, 212, 10, 15, 27, 55], [449, 324, 3, 2, 33, 56], [169, 315, 5, 4, 32, 55], [194, 322, 4, 3, 32, 57], [224, 319, 6, 3, 31, 57], [174, 322, 4, 3, 31, 59], [242, 319, 6, 3, 30, 59], [100, 322, 5, 3, 30, 61], [401, 314, 7, 4, 29, 61], [179, 315, 5, 4, 29, 63], [492, 314, 7, 4, 28, 63], [135, 322, 5, 3, 28, 66], [478, 314, 7, 4, 27, 66], [128, 242, 7, 13, 30, 57], [223, 212, 9, 15, 29, 56], [375, 208, 3, 3, 34, 57], [199, 315, 5, 4, 33, 56], [170, 322, 4, 3, 33, 59], [218, 319, 6, 3, 32, 59], [100, 322, 5, 3, 32, 61], [106, 319, 7, 3, 31, 61], [186, 322, 4, 3, 32, 63], [218, 319, 6, 3, 31, 63], [65, 322, 5, 3, 31, 65], [78, 319, 7, 3, 30, 65], [506, 190, 6, 2, 30, 68], [25, 319, 8, 3, 29, 68], [160, 228, 8, 14, 44, 56], [288, 191, 11, 17, 42, 54], [45, 322, 5, 3, 44, 56], [463, 304, 8, 5, 42, 54], [404, 318, 4, 4, 46, 57], [404, 309, 6, 5, 45, 57], [416, 318, 4, 4, 47, 60], [383, 153, 6, 5, 46, 59], [209, 315, 5, 4, 47, 62], [295, 309, 7, 5, 46, 61], [35, 322, 5, 3, 47, 65], [408, 314, 7, 4, 46, 64], [140, 319, 6, 3, 46, 67], [8, 305, 8, 5, 45, 66], [501, 273, 11, 9, 46, 55], [391, 253, 14, 12, 44, 53], [60, 322, 5, 3, 46, 55], [417, 298, 7, 6, 44, 53], [408, 318, 4, 4, 48, 56], [398, 106, 5, 6, 48, 55], [436, 309, 5, 5, 49, 57], [426, 309, 5, 5, 49, 57], [304, 318, 4, 4, 51, 59], [471, 298, 6, 6, 50, 58], [446, 309, 5, 5, 52, 59], [198, 304, 5, 6, 52, 59], [451, 80, 3, 3, 54, 61], [130, 310, 4, 5, 54, 60], [476, 263, 9, 11, 45, 56], [47, 227, 12, 14, 43, 54], [20, 322, 5, 3, 45, 56], [288, 309, 7, 5, 43, 54], [426, 318, 3, 4, 47, 57], [481, 309, 5, 5, 46, 56], [90, 310, 4, 5, 48, 58], [208, 304, 5, 6, 47, 58], [98, 310, 4, 5, 49, 60], [434, 284, 6, 7, 48, 59], [106, 310, 4, 5, 50, 61], [203, 304, 5, 6, 50, 61], [423, 318, 3, 4, 51, 63], [218, 304, 4, 6, 51, 62], [477, 251, 6, 12, 46, 55], [204, 227, 10, 14, 43, 54], [311, 322, 3, 3, 46, 55], [443, 314, 7, 4, 43, 54], [380, 318, 4, 4, 46, 56], [229, 315, 5, 4, 45, 56], [239, 315, 5, 4, 46, 58], [424, 298, 7, 6, 45, 57], [10, 310, 5, 5, 46, 60], [141, 305, 7, 5, 45, 60], [249, 315, 5, 4, 47, 62], [115, 133, 7, 5, 46, 61], [254, 318, 5, 4, 47, 63], [120, 305, 7, 5, 46, 63], [150, 255, 5, 12, 45, 54], [144, 228, 8, 14, 43, 53], [443, 324, 3, 2, 46, 54], [92, 319, 7, 3, 43, 53], [226, 322, 4, 3, 46, 55], [164, 319, 6, 3, 45, 55], [189, 315, 5, 4, 45, 57], [499, 314, 7, 4, 44, 57], [184, 315, 5, 4, 45, 59], [408, 314, 7, 4, 44, 59], [95, 322, 5, 3, 45, 62], [450, 314, 7, 4, 44, 61], [409, 324, 4, 2, 46, 64], [158, 319, 6, 3, 45, 64], [477, 224, 5, 12, 45, 54], [286, 237, 8, 14, 43, 53], [419, 324, 3, 2, 46, 54], [57, 315, 6, 4, 43, 53], [294, 318, 5, 4, 45, 55], [99, 305, 7, 5, 44, 54], [289, 318, 5, 4, 45, 56], [7, 315, 7, 4, 44, 56], [274, 318, 5, 4, 45, 58], [408, 314, 7, 4, 44, 58], [90, 322, 5, 3, 45, 61], [450, 314, 7, 4, 44, 60], [150, 322, 5, 3, 45, 63], [485, 314, 7, 4, 44, 63], [405, 253, 6, 12, 44, 54], [232, 227, 8, 14, 43, 53], [443, 324, 3, 2, 46, 54], [134, 319, 6, 3, 43, 53], [226, 322, 4, 3, 46, 55], [51, 315, 6, 4, 45, 54], [226, 322, 4, 3, 46, 57], [206, 319, 6, 3, 45, 56], [120, 322, 5, 3, 45, 59], [57, 319, 7, 3, 44, 58], [473, 321, 6, 3, 44, 61], [33, 319, 8, 3, 43, 60], [152, 319, 6, 3, 44, 63], [503, 304, 8, 5, 43, 62], [121, 242, 7, 13, 43, 55], [163, 197, 9, 16, 42, 53], [401, 324, 4, 2, 45, 55], [0, 315, 7, 4, 43, 53], [178, 322, 4, 3, 46, 56], [461, 321, 6, 3, 45, 56], [155, 322, 5, 3, 45, 58], [120, 319, 7, 3, 44, 58], [140, 322, 5, 3, 45, 60], [57, 319, 7, 3, 44, 60], [449, 321, 6, 3, 44, 63], [313, 314, 8, 4, 43, 62], [230, 319, 6, 3, 43, 65], [24, 305, 8, 5, 42, 64], [330, 237, 7, 14, 43, 56], [249, 192, 9, 17, 42, 54], [198, 322, 4, 3, 44, 56], [127, 305, 7, 5, 42, 54], [189, 315, 5, 4, 45, 57], [274, 309, 7, 5, 44, 56], [184, 315, 5, 4, 45, 59], [450, 314, 7, 4, 44, 59], [188, 319, 6, 3, 44, 62], [385, 314, 8, 4, 43, 62], [422, 314, 7, 4, 43, 64], [278, 314, 9, 4, 42, 64], [71, 319, 7, 3, 43, 67], [287, 314, 9, 4, 42, 67], [323, 237, 7, 14, 43, 56], [361, 191, 9, 17, 42, 54], [198, 322, 4, 3, 44, 56], [127, 305, 7, 5, 42, 54], [206, 322, 4, 3, 46, 57], [123, 315, 6, 4, 45, 56], [174, 315, 5, 4, 45, 59], [415, 314, 7, 4, 44, 59], [21, 315, 6, 4, 44, 62], [329, 314, 8, 4, 43, 62], [429, 314, 7, 4, 43, 64], [278, 314, 9, 4, 42, 64], [71, 319, 7, 3, 43, 67], [287, 314, 9, 4, 42, 67], [316, 237, 7, 14, 44, 56], [331, 191, 10, 17, 42, 54], [489, 321, 5, 3, 44, 56], [32, 305, 8, 5, 42, 54], [328, 318, 4, 4, 46, 57], [45, 315, 6, 4, 45, 57], [110, 322, 5, 3, 46, 60], [14, 315, 7, 4, 45, 59], [21, 315, 6, 4, 45, 62], [329, 314, 8, 4, 44, 62], [268, 310, 6, 4, 45, 64], [337, 314, 8, 4, 44, 64], [71, 319, 7, 3, 44, 67], [287, 314, 9, 4, 43, 67], [474, 209, 8, 15, 44, 55], [435, 175, 11, 18, 42, 53], [200, 319, 6, 3, 44, 55], [446, 304, 9, 5, 42, 53], [254, 322, 4, 3, 46, 56], [33, 315, 6, 4, 45, 56], [258, 322, 4, 3, 47, 58], [45, 315, 6, 4, 46, 58], [166, 310, 4, 5, 47, 60], [338, 309, 6, 5, 46, 60], [100, 299, 6, 6, 46, 62], [371, 298, 8, 6, 45, 62], [386, 309, 6, 5, 46, 65], [363, 298, 8, 6, 45, 65], [126, 213, 8, 15, 46, 54], [484, 174, 11, 18, 44, 52], [428, 324, 3, 2, 46, 54], [302, 309, 6, 5, 44, 52], [134, 315, 5, 4, 47, 55], [112, 299, 6, 6, 47, 54], [340, 318, 4, 4, 48, 57], [332, 309, 6, 5, 47, 57], [30, 310, 5, 5, 48, 59], [438, 298, 7, 6, 47, 59], [350, 309, 6, 5, 48, 62], [360, 284, 7, 7, 47, 61], [471, 309, 5, 5, 49, 64], [219, 284, 7, 7, 48, 63], [166, 213, 7, 15, 47, 53], [495, 174, 11, 18, 44, 51], [509, 54, 3, 3, 47, 53], [40, 305, 7, 5, 44, 51], [388, 318, 4, 4, 48, 54], [392, 309, 6, 5, 47, 53], [426, 318, 3, 4, 49, 57], [416, 309, 5, 5, 48, 56], [484, 297, 4, 7, 49, 58], [386, 284, 6, 7, 48, 58], [252, 304, 3, 6, 50, 61], [345, 291, 5, 7, 49, 60], [249, 304, 3, 6, 51, 62], [360, 291, 5, 7, 50, 62], [278, 237, 8, 14, 47, 53], [276, 191, 12, 17, 44, 51], [242, 322, 4, 3, 47, 53], [387, 298, 8, 6, 44, 51], [324, 318, 4, 4, 48, 54], [481, 309, 5, 5, 48, 54], [190, 322, 4, 3, 49, 57], [383, 153, 6, 5, 48, 56], [188, 304, 5, 6, 49, 58], [142, 299, 6, 6, 48, 58], [206, 310, 4, 5, 50, 61], [374, 284, 6, 7, 49, 60], [320, 318, 4, 4, 51, 63], [89, 304, 5, 6, 51, 62], [340, 263, 10, 11, 47, 53], [444, 225, 14, 14, 44, 51], [85, 322, 5, 3, 47, 53], [16, 305, 8, 5, 44, 51], [499, 321, 5, 3, 48, 54], [471, 314, 7, 4, 47, 53], [384, 318, 4, 4, 50, 55], [314, 309, 6, 5, 49, 55], [384, 318, 4, 4, 51, 57], [84, 304, 5, 6, 50, 57], [396, 318, 4, 4, 52, 59], [511, 152, 1, 1, 52, 63], [134, 310, 4, 5, 53, 59], [120, 292, 5, 7, 53, 58], [400, 265, 11, 10, 46, 54], [372, 240, 14, 13, 44, 52], [479, 321, 5, 3, 46, 54], [445, 298, 7, 6, 44, 52], [408, 318, 4, 4, 48, 55], [398, 106, 5, 6, 48, 54], [436, 309, 5, 5, 49, 56], [426, 309, 5, 5, 49, 56], [304, 318, 4, 4, 51, 58], [106, 299, 6, 6, 50, 57], [186, 310, 4, 5, 52, 59], [431, 324, 3, 2, 52, 63], [435, 318, 2, 4, 55, 60], [261, 304, 3, 6, 55, 59], [66, 178, 10, 1, 27, 38], [499, 106, 12, 3, 26, 37], null, [449, 318, 12, 3, 26, 37], null, [76, 178, 7, 1, 28, 38], [484, 318, 9, 3, 27, 37], null, [60, 195, 2, 1, 43, 31], null, [319, 322, 2, 3, 43, 30], null, [456, 324, 2, 2, 43, 30], null, [441, 318, 2, 4, 43, 30], null, [45, 310, 5, 5, 41, 31], null, [511, 11, 1, 1, 43, 33], null, [316, 153, 15, 20, 39, 20], [481, 133, 17, 22, 38, 19], [474, 57, 30, 26, 26, 17], [422, 32, 32, 28, 25, 16], [255, 209, 15, 15, 41, 18], [403, 158, 17, 19, 40, 16], [203, 241, 8, 13, 43, 17], null, [385, 265, 15, 10, 41, 19], null, [403, 86, 21, 26, 26, 17], [486, 29, 23, 28, 25, 16], [482, 208, 15, 15, 41, 17], [154, 180, 16, 17, 41, 16], [56, 241, 9, 13, 41, 20], [125, 197, 10, 16, 40, 19], [34, 240, 13, 13, 43, 18], null, [403, 86, 21, 26, 26, 17], [486, 29, 23, 28, 25, 16], [440, 210, 13, 15, 43, 17], [122, 180, 16, 17, 41, 16], [56, 241, 9, 13, 41, 20], [125, 197, 10, 16, 40, 19], [501, 262, 11, 11, 41, 19], [274, 322, 4, 3, 49, 28], [403, 86, 21, 26, 26, 17], [486, 29, 23, 28, 25, 16], [0, 115, 22, 24, 32, 12], [475, 83, 24, 26, 31, 11], [490, 109, 22, 24, 32, 12], [427, 60, 24, 26, 31, 11], [320, 263, 10, 11, 38, 19], [12, 254, 11, 12, 38, 19], [468, 109, 22, 24, 32, 12], [291, 106, 24, 25, 31, 12], [320, 263, 10, 11, 38, 19], [12, 254, 11, 12, 38, 19], [420, 112, 22, 24, 32, 12], [403, 60, 24, 26, 31, 11], [96, 211, 13, 15, 41, 12], [170, 180, 15, 17, 40, 11], [23, 254, 11, 12, 38, 18], [0, 241, 12, 13, 38, 18], [399, 240, 12, 13, 40, 15], [13, 227, 13, 14, 39, 15], [413, 210, 14, 15, 32, 21], [138, 180, 16, 17, 31, 20], [398, 112, 22, 24, 32, 12], [451, 83, 24, 26, 31, 11], [320, 263, 10, 11, 38, 19], [12, 254, 11, 12, 38, 19], [427, 210, 13, 15, 40, 12], [341, 191, 10, 17, 42, 11], [127, 319, 7, 3, 31, 46], [389, 131, 9, 5, 30, 45], [454, 193, 3, 1, 31, 48], [55, 322, 5, 3, 30, 47], [396, 322, 6, 2, 32, 46], [345, 314, 8, 4, 31, 45], [358, 237, 7, 14, 31, 45], [240, 192, 9, 17, 30, 44], [483, 250, 6, 13, 32, 46], [196, 197, 7, 16, 31, 45], [114, 255, 7, 12, 31, 45], [108, 228, 9, 14, 30, 44], [44, 160, 4, 11, 34, 46], [198, 213, 5, 13, 33, 45], [508, 0, 3, 12, 33, 47], [34, 212, 5, 14, 32, 47], [336, 318, 4, 4, 31, 46], [136, 299, 6, 6, 30, 45], [442, 275, 4, 9, 34, 45], [125, 267, 6, 10, 33, 44], [365, 237, 7, 14, 31, 45], [172, 197, 9, 16, 30, 44], [159, 242, 6, 13, 32, 46], [181, 197, 8, 16, 31, 45], [41, 265, 6, 11, 32, 46], [227, 241, 8, 13, 31, 45], [451, 60, 3, 10, 32, 47], [145, 255, 5, 12, 31, 46], [372, 237, 2, 3, 36, 46], [479, 304, 8, 5, 31, 45], [509, 44, 3, 10, 32, 47], [155, 255, 5, 12, 31, 46], [372, 237, 2, 3, 36, 46], [479, 304, 8, 5, 31, 45], [272, 304, 2, 6, 32, 50], [508, 297, 4, 7, 31, 49], [454, 324, 2, 2, 33, 47], [376, 318, 4, 4, 32, 46], [372, 237, 2, 3, 36, 46], [479, 304, 8, 5, 31, 45], [276, 155, 1, 1, 33, 50], [368, 318, 4, 4, 31, 49], [90, 273, 2, 3, 32, 51], [154, 310, 4, 5, 31, 50], [90, 273, 2, 3, 32, 53], [344, 318, 4, 4, 31, 52], [511, 148, 1, 2, 33, 55], [420, 318, 3, 4, 32, 54], [442, 112, 3, 9, 32, 47], [168, 228, 5, 12, 31, 46], [372, 237, 2, 3, 36, 46], [479, 304, 8, 5, 31, 45], [270, 304, 2, 6, 32, 51], [480, 283, 4, 8, 31, 49], [511, 11, 1, 1, 31, 45], [299, 322, 3, 3, 30, 44], [244, 106, 47, 25, 48, 151], [403, 0, 19, 39, 63, 122], [0, 0, 122, 115, 17, 9], [413, 194, 47, 16, 48, 161], [122, 106, 122, 74, 14, 122], [490, 274, 8, 9, 0, 0], [49, 319, 8, 3, 0, 7], [48, 139, 22, 20, 0, 0], [483, 237, 22, 13, 0, 9], [84, 115, 31, 23, 0, 0], [235, 263, 31, 11, 0, 14], [342, 283, 6, 8, 0, 0], [227, 276, 8, 8, 0, 0], [128, 277, 8, 8, 0, 0], [198, 284, 7, 7, 0, 0], [184, 284, 7, 7, 0, 0], [287, 283, 7, 8, 0, 0], [280, 283, 7, 8, 0, 0], [372, 318, 4, 4, 0, 2], [104, 277, 8, 8, 0, 0], [445, 103, 6, 6, 0, 1], [112, 277, 8, 8, 0, 0], [136, 277, 8, 8, 0, 0], [300, 283, 6, 8, 0, 0], [144, 277, 8, 8, 0, 0], [243, 283, 8, 8, 0, 0], [446, 275, 8, 8, 0, 0], [226, 284, 7, 7, 0, 0], [353, 284, 7, 7, 0, 0], [324, 283, 6, 8, 0, 0], [392, 284, 6, 7, 0, 0], [176, 284, 8, 7, 0, 0], [251, 283, 8, 8, 0, 0], [170, 319, 6, 3, 0, 4], [120, 277, 8, 8, 0, 0], [410, 284, 6, 7, 0, 0], [422, 284, 6, 7, 0, 0], [281, 309, 7, 5, 0, 1], [134, 305, 7, 5, 0, 1], [464, 314, 7, 4, 0, 2], [471, 304, 8, 5, 0, 1], [495, 304, 8, 5, 0, 1], [455, 304, 8, 5, 0, 1], [473, 66, 1, 7, 0, 0], [230, 322, 4, 3, 0, 0], [245, 291, 5, 7, 0, 0], [10, 291, 5, 7, 0, 0], [499, 290, 5, 7, 0, 0], [494, 290, 5, 7, 0, 0], [325, 322, 2, 3, 0, 0], [139, 292, 4, 7, 0, 0], [135, 292, 4, 7, 0, 0], [246, 322, 4, 3, 0, 2], [65, 310, 5, 5, 0, 1], [511, 139, 1, 3, 0, 5], [441, 193, 5, 1, 0, 3], [511, 148, 1, 2, 0, 5], [295, 291, 5, 7, 0, 0], [235, 291, 5, 7, 0, 0], [225, 291, 5, 7, 0, 0], [195, 291, 5, 7, 0, 0], [95, 291, 5, 7, 0, 0], [40, 291, 5, 7, 0, 0], [140, 285, 5, 7, 0, 0], [100, 292, 5, 7, 0, 0], [205, 291, 5, 7, 0, 0], [5, 291, 5, 7, 0, 0], [125, 285, 5, 7, 0, 0], [508, 23, 1, 6, 0, 1], [473, 59, 1, 7, 0, 1], [8, 298, 4, 7, 0, 0], [259, 318, 5, 4, 0, 2], [24, 298, 4, 7, 0, 0], [425, 291, 5, 7, 0, 0], [428, 284, 6, 7, 0, 0], [200, 291, 5, 7, 0, 0], [120, 285, 5, 7, 0, 0], [400, 291, 5, 7, 0, 0], [255, 291, 5, 7, 0, 0], [315, 291, 5, 7, 0, 0], [110, 292, 5, 7, 0, 0], [280, 291, 5, 7, 0, 0], [340, 291, 5, 7, 0, 0], [50, 298, 3, 7, 0, 0], [420, 291, 5, 7, 0, 0], [365, 291, 5, 7, 0, 0], [220, 291, 5, 7, 0, 0], [285, 291, 5, 7, 0, 0], [305, 291, 5, 7, 0, 0], [235, 291, 5, 7, 0, 0], [110, 285, 5, 7, 0, 0], [115, 285, 5, 7, 0, 0], [484, 290, 5, 7, 0, 0], [0, 291, 5, 7, 0, 0], [60, 291, 5, 7, 0, 0], [90, 291, 5, 7, 0, 0], [325, 291, 5, 7, 0, 0], [375, 291, 5, 7, 0, 0], [380, 291, 5, 7, 0, 0], [395, 291, 5, 7, 0, 0], [45, 291, 5, 7, 0, 0], [56, 298, 3, 7, 0, 0], [85, 291, 5, 7, 0, 0], [498, 274, 3, 7, 0, 0], [484, 321, 5, 3, 0, 0], [441, 193, 5, 1, 0, 7], [317, 322, 2, 3, 0, 0], [421, 309, 5, 5, 0, 2], [230, 291, 5, 7, 0, 0], [54, 305, 5, 5, 0, 2], [260, 291, 5, 7, 0, 0], [506, 309, 5, 5, 0, 2], [496, 297, 4, 7, 0, 0], [173, 304, 5, 6, 0, 2], [185, 291, 5, 7, 0, 0], [511, 0, 1, 7, 0, 0], [348, 283, 5, 8, 0, 0], [480, 291, 4, 7, 0, 0], [458, 225, 2, 7, 0, 0], [476, 309, 5, 5, 0, 2], [486, 309, 5, 5, 0, 2], [451, 309, 5, 5, 0, 2], [168, 304, 5, 6, 0, 2], [163, 304, 5, 6, 0, 2], [0, 310, 5, 5, 0, 2], [5, 310, 5, 5, 0, 2], [32, 298, 3, 7, 0, 0], [15, 310, 5, 5, 0, 2], [20, 310, 5, 5, 0, 2], [25, 310, 5, 5, 0, 2], [148, 305, 5, 5, 0, 2], [158, 304, 5, 6, 0, 2], [40, 310, 5, 5, 0, 2], [28, 298, 4, 7, 0, 0], [473, 73, 1, 7, 0, 0], [20, 298, 4, 7, 0, 0], [466, 190, 6, 2, 0, 0], [55, 310, 5, 5, 0, 2], [461, 283, 5, 8, 0, 0], [410, 291, 5, 7, 0, 0], [430, 291, 5, 7, 0, 0], [435, 291, 5, 7, 0, 0], [440, 291, 5, 7, 0, 0], [445, 291, 5, 7, 0, 0], [455, 291, 5, 7, 0, 0], [130, 292, 5, 7, 0, 1], [100, 285, 5, 7, 0, 0], [130, 285, 5, 7, 0, 0], [135, 285, 5, 7, 0, 0], [35, 298, 3, 7, 0, 0], [150, 285, 5, 7, 0, 0], [90, 266, 2, 7, 0, 0], [489, 290, 5, 7, 0, 0], [504, 290, 5, 7, 0, 0], [15, 291, 5, 7, 0, 0], [85, 310, 5, 5, 0, 2], [20, 291, 5, 7, 0, 0], [25, 291, 5, 7, 0, 0], [30, 291, 5, 7, 0, 0], [35, 291, 5, 7, 0, 0], [50, 291, 5, 7, 0, 0], [55, 291, 5, 7, 0, 0], [446, 283, 5, 8, 0, 0], [65, 291, 5, 7, 0, 0], [70, 291, 5, 7, 0, 0], [59, 304, 5, 6, 0, 2], [75, 291, 5, 7, 0, 0], [80, 291, 5, 7, 0, 0], [293, 322, 3, 3, 0, 2], [456, 283, 5, 8, 0, 0], [155, 291, 5, 7, 0, 0], [233, 284, 2, 7, 0, 0], [165, 291, 5, 7, 0, 0], [170, 291, 5, 7, 0, 0], [175, 291, 5, 7, 0, 0], [180, 291, 5, 7, 0, 0], [64, 304, 5, 6, 0, 0], [74, 304, 5, 6, 0, 0], [210, 291, 5, 7, 0, 0], [344, 309, 6, 5, 0, 1], [145, 322, 5, 3, 0, 3], [215, 291, 5, 7, 0, 0], [471, 283, 5, 8, 0, 0], [511, 133, 1, 6, 0, 1], [80, 310, 5, 5, 0, 1], [75, 310, 5, 5, 0, 1], [200, 291, 5, 7, 0, 0], [70, 310, 5, 5, 0, 2], [265, 291, 5, 7, 0, 0], [270, 291, 5, 7, 0, 0], [275, 291, 5, 7, 0, 0], [190, 310, 4, 5, 0, 2], [492, 297, 4, 7, 0, 0], [217, 310, 3, 5, 0, 2], [318, 283, 6, 8, 0, 0], [94, 304, 5, 6, 0, 2], [315, 291, 5, 7, 0, 0], [506, 309, 5, 5, 0, 2], [315, 291, 5, 7, 0, 0], [130, 285, 5, 7, 0, 0], [335, 291, 5, 7, 0, 0], [35, 310, 5, 5, 0, 2], [95, 291, 5, 7, 0, 0], [118, 310, 4, 5, 0, 2], [350, 291, 5, 7, 0, 0], [110, 310, 4, 5, 0, 2], [355, 291, 5, 7, 0, 0], [147, 292, 4, 7, 0, 0], [365, 291, 5, 7, 0, 0], [94, 310, 4, 5, 0, 2], [370, 291, 5, 7, 0, 0], [210, 310, 4, 5, 0, 2], [205, 284, 7, 7, 0, 0], [461, 309, 5, 5, 0, 2], [340, 291, 5, 7, 0, 0], [198, 310, 4, 5, 0, 2], [235, 291, 5, 7, 0, 0], [451, 309, 5, 5, 0, 2], [405, 291, 5, 7, 0, 0], [162, 310, 4, 5, 0, 2], [415, 291, 5, 7, 0, 0], [242, 304, 4, 6, 0, 2], [400, 291, 5, 7, 0, 0], [54, 305, 5, 5, 0, 2], [60, 291, 5, 7, 0, 0], [223, 310, 3, 5, 0, 2], [450, 291, 5, 7, 0, 0], [238, 304, 4, 6, 0, 2], [465, 291, 5, 7, 0, 0], [475, 291, 5, 7, 0, 1], [380, 291, 5, 7, 0, 0], [148, 305, 5, 5, 0, 2], [294, 283, 6, 8, 0, 0], [130, 299, 6, 6, 0, 2], [105, 292, 5, 7, 0, 0], [158, 310, 4, 5, 0, 2], [367, 284, 7, 7, 0, 0], [441, 309, 5, 5, 0, 2], [498, 282, 8, 8, 0, 0], [477, 298, 6, 6, 0, 2], [115, 292, 5, 7, 0, 0], [466, 309, 5, 5, 0, 2], [380, 284, 6, 7, 0, 0], [356, 309, 6, 5, 0, 2], [143, 292, 4, 7, 0, 0], [178, 310, 4, 5, 0, 2], [385, 291, 5, 7, 0, 0], [174, 310, 4, 5, 0, 2], [404, 284, 6, 7, 0, 0], [491, 309, 5, 5, 0, 2], [290, 291, 5, 7, 0, 0], [126, 310, 4, 5, 0, 2], [330, 283, 6, 8, 0, 0], [459, 298, 6, 6, 0, 2], [145, 285, 5, 7, 0, 0], [145, 285, 5, 7, 0, 0], [312, 283, 6, 8, 0, 0], [124, 299, 6, 6, 0, 2], [470, 291, 5, 7, 0, 0], [460, 291, 5, 7, 0, 0], [390, 291, 5, 7, 0, 0], [390, 291, 5, 7, 0, 0], [320, 291, 5, 7, 0, 0], [320, 291, 5, 7, 0, 0], [310, 291, 5, 7, 0, 0], [310, 291, 5, 7, 0, 0], [440, 284, 6, 7, 0, 0], [47, 298, 3, 7, 0, 0], [160, 291, 5, 7, 0, 0], [212, 284, 7, 7, 0, 0], [300, 291, 5, 7, 0, 0], [250, 291, 5, 7, 0, 0], [191, 284, 7, 7, 0, 0], [422, 0, 32, 32, 0, 0], [454, 0, 32, 32, 0, 0], [122, 0, 281, 106, 0, 0], [354, 276, 8, 8, 0, 1], [130, 322, 5, 3, 0, 0], [279, 318, 5, 4, 0, 0], [511, 11, 1, 1, 0, 0], [397, 275, 7, 9, 0, 0], [454, 274, 10, 9, 0, 0], [168, 284, 8, 7, 0, 1], [445, 109, 23, 24, 0, 0], [0, 266, 11, 10, 0, 1], [66, 266, 9, 10, 1, 2], [0, 266, 11, 10, 0, 1], [343, 274, 11, 9, 0, 1]].map(r)
        , m = [null, [75, 7, 11, 3, 27, 39], [64, 0, 11, 8, 27, 34], [120, 0, 1, 1, 36, 40], [120, 0, 1, 1, 27, 40], [35, 0, 8, 17, 31, 54], [20, 0, 15, 17, 38, 54], [0, 0, 20, 17, 30, 41], [43, 0, 15, 15, 26, 30], [58, 0, 6, 10, 39, 27], [114, 0, 6, 7, 26, 27], [75, 0, 39, 7, 22, 66]].map(i);
      return e.ponyFrontManes = [null, [[a(1, 2)], [, a(3, 4), a(5, 6), a(7, 8)], [a(9, 10), a(11, 12)], [, a(13, 14), a(15, 16)], [a(17, 18), a(19, 20)], [, , a(21, 22), a(23, 24)]], [[a(25, 26)], [, a(27, 28), a(29, 30), a(31, 32)], [a(33, 34), a(35, 36)], [, a(37, 38), a(39, 40)], [a(41, 42), a(43, 44)], [, , a(45, 46), a(47, 48)]], [[a(49, 50)], [a(51, 52), , , a(53, 54), a(55, 56)]], [[a(57, 58)], [, , , a(59, 60), a(61, 62)]], [], [[a(63, 64)], [, , , a(65, 66), a(67, 68)]], [], [[a(69, 70)], [, , , a(71, 72), a(73, 74)]], []],
        e.ponyTopManes = [null, [[a(75, 76)], [a(77, 78), a(79, 80), a(81, 82), a(83, 84)], [a(85, 86), a(87, 88)], [a(89, 90), a(91, 92), a(93, 94)], [a(95, 96), a(97, 98)], [a(99, 100), a(101, 102), a(103, 104), a(105, 106)]], [[a(107, 108)], [a(109, 110), a(111, 112), a(113, 114), a(115, 116)], [a(117, 118), a(119, 120)], [a(121, 122), a(123, 124), a(125, 126)], [a(127, 128), a(129, 130)], [a(131, 132), a(133, 134), a(135, 136), a(137, 138)]], [[a(139, 140)], [a(141, 142), a(143, 144), a(145, 146), a(147, 148), a(149, 150)]], [[a(151, 152)], [a(153, 154), a(155, 156), a(157, 158), a(159, 160), a(161, 162)]], [[a(163, 164)], [a(165, 166), a(167, 168), a(169, 170), a(171, 172)]], [[a(173, 174)], [a(175, 176), a(177, 178), a(179, 180), a(181, 182), a(183, 184)]], [[a(185, 186)], [a(187, 188), a(189, 190), a(191, 192), a(193, 194)]], [[a(195, 196)], [a(197, 198), a(199, 200), a(201, 202), a(203, 204), a(205, 206)]], [[a(207, 208)], [a(209, 210), a(211, 212), a(213, 214)]]],
        e.ponyBehindManes = [null, [[a(215, 216)], [, a(217, 218), a(219, 220), , a(221, 222)], [a(223, 224), a(225, 226)], [a(227, 228), a(229, 230), , a(231, 232)], [a(233, 234), a(235, 236)], [a(237, 238), a(239, 240), , , a(241, 242)]], [], [[a(243, 244)], [, , a(245, 246), , , a(247, 248)]], [], [], [], [], [], [[a(249, 250)], [, a(251, 252), a(253, 254), a(255, 256), a(257, 258), a(259, 260)]]],
        e.ponyManes = [null, [[a(261, 262)], [a(263, 264), a(265, 266), a(267, 268), a(269, 270), a(271, 272)], [a(273, 274), a(275, 276)], [a(277, 278), a(279, 280), a(281, 282), a(283, 284)], [a(285, 286), a(287, 288)], [a(289, 290), a(291, 292), a(293, 294), a(295, 296), a(297, 298)]], [[a(299, 300)], [a(301, 302), a(303, 304), a(305, 306), a(307, 308)], [a(309, 310), a(311, 312)], [a(313, 314), a(315, 316), a(317, 318)], [a(319, 320), a(321, 322)], [a(323, 324), a(325, 326), a(327, 328), a(329, 330)]], [[a(331, 332)], [a(333, 334), a(335, 336), a(337, 338), a(339, 340), a(341, 342), a(343, 344)]], [[a(345, 346)], [a(347, 348), a(349, 350), a(351, 352), a(353, 354), a(355, 356)]], [[a(357, 358)], [a(359, 360), a(361, 362), a(363, 364), a(365, 366)]], [[a(367, 368)], [a(369, 370), a(371, 372), a(373, 374), a(375, 376), a(377, 378)]], [[a(379, 380)], [a(381, 382), a(383, 384), a(385, 386), a(387, 388)]], [[a(389, 390)], [a(391, 392), a(393, 394), a(395, 396), a(397, 398), a(399, 400)]], [[a(401, 402)], [a(403, 404), a(405, 406), a(407, 408), a(409, 410), a(411, 412), a(413, 414)]]],
        e.ponyBackFrontManes = [null, [[a(415, 416)], [a(417, 418), a(419, 420), a(421, 422)], [a(423, 424), a(425, 426)], [a(427, 428), a(429, 430)], [a(431, 432), a(433, 434)], [a(435, 436), a(437, 438)]], [], [[a(439, 440)], [a(441, 442), a(443, 444), a(445, 446), a(447, 448)]], [], [], [], []],
        e.ponyBackBehindManes = [null, [], [[a(449, 450), a(451, 452)], [a(453, 454), a(455, 456), a(457, 458), a(459, 460), a(461, 462), a(463, 464)]], [], [[a(465, 466), a(467, 468)], [a(469, 470), a(471, 472), a(473, 474), a(475, 476), a(477, 478)]], [[a(479, 480)], [a(481, 482), a(483, 484)]], [[a(485, 486)], [a(487, 488), a(489, 490), a(491, 492), a(493, 494)]], [[a(495, 496)], [a(497, 498), a(499, 500), a(501, 502), a(503, 504)]]],
        e.ponyBackManes = [null, [[a(415, 416)], [a(417, 418), a(419, 420), a(421, 422)], [a(423, 424), a(425, 426)], [a(427, 428), a(429, 430)], [a(431, 432), a(433, 434)], [a(435, 436), a(437, 438)]], [[a(449, 450), a(451, 452)], [a(453, 454), a(455, 456), a(457, 458), a(459, 460), a(461, 462), a(463, 464)]], [[a(439, 440)], [a(441, 442), a(443, 444), a(445, 446), a(447, 448)]], [[a(465, 466), a(467, 468)], [a(469, 470), a(471, 472), a(473, 474), a(475, 476), a(477, 478)]], [[a(479, 480)], [a(481, 482), a(483, 484)]], [[a(485, 486)], [a(487, 488), a(489, 490), a(491, 492), a(493, 494)]], [[a(495, 496)], [a(497, 498), a(499, 500), a(501, 502), a(503, 504)]]],
        e.ponyTails = [null, [[a(505, 506)], [a(507, 508), a(509, 510), a(511, 512), a(513, 514)], [a(515, 516), a(517, 518)], [a(519, 520), a(521, 522)], [a(523, 524), a(525, 526)], [a(527, 528), a(529, 530)]], [[a(531, 532)], [a(533, 534), a(535, 536), a(537, 538), a(539, 540)], [a(541, 542), a(543, 544)], [a(545, 546), a(547, 548)], [a(549, 550), a(551, 552)], [a(553, 554), a(555, 556)]], [[a(557, 558)], [a(559, 560), a(561, 562), a(563, 564), a(565, 566), a(567, 568)]], [[a(569, 570)], [a(571, 572), a(573, 574), a(575, 576), a(577, 578), a(579, 580)]], [[a(581, 582)], [a(583, 584), a(585, 586), a(587, 588), a(589, 590)]], [[a(591, 592)], [a(593, 594), a(595, 596), a(597, 598), a(599, 600), a(601, 602)]]],
        e.ponyNoses = [l(603, 604, 605), l(606, 607, 608), l(609, 610, 611), l(612, 613, 614), l(615, 616, 617), l(618, 619, 620), l(621, 622, 623)],
        e.ponyEyeLeft = [null, c(624, 626, 628, 630), c(632, 634, 636, 638), c(640, 642, 644, 646), c(648, 650, 652, 654), c(656, 658, 660, 662), c(664, 666, 668, 670)],
        e.ponyEyeRight = [null, c(625, 627, 629, 631), c(633, 635, 637, 639), c(641, 643, 645, 647), c(649, 651, 653, 655), c(657, 659, 661, 663), c(665, 667, 669, 671)],
        e.ponyFreckles = [null, v[674], v[675], v[676], v[677]],
        e.ponyHorns = [null, [[a(678, 679)]], [[a(680, 681)]]],
        e.ponyWings = [null, [[a(682, 683)]]],
        e.ponyLegFrontStand = [a(684, 685)],
        e.ponyLegBackStand = [a(686, 687)],
        e.ponyLegFrontTrot = [a(698, 699), a(700, 701), a(702, 703), a(704, 705), a(706, 707), a(708, 709), a(710, 711), a(712, 713), a(714, 715), a(716, 717), a(718, 719), a(720, 721), a(722, 723), a(724, 725), a(726, 727), a(728, 729)],
        e.ponyLegBackTrot = [a(730, 731), a(732, 733), a(734, 735), a(736, 737), a(738, 739), a(740, 741), a(742, 743), a(744, 745), a(746, 747), a(748, 749), a(750, 751), a(752, 753), a(754, 755), a(756, 757), a(758, 759), a(760, 761)],
        e.ponyBobsBodyTrot = [o(0, 1), o(0, 0), o(0, -1), o(0, -2), o(0, -2), o(0, -2), o(0, -1), o(0, 0), o(0, 1), o(0, 0), o(0, -1), o(0, -2), o(0, -2), o(0, -2), o(0, -1), o(0, 0)],
        e.ponyBobsHeadTrot = [o(0, 0), o(0, 0), o(0, -1), o(0, -2), o(0, -2), o(0, -2), o(0, -1), o(0, 0), o(0, 0), o(0, 0), o(0, -1), o(0, -2), o(0, -2), o(0, -2), o(0, -1), o(0, 0)],
        e.ponyFetlocksFrontStand = [a(762, 763)],
        e.ponyFetlocksFrontTrot = [a(764, 765), a(766, 767), a(768, 769), a(770, 771), a(772, 773), a(774, 775), a(776, 777), a(778, 779), a(780, 781), a(782, 783), a(784, 785), a(786, 787), a(788, 789), a(790, 791), a(792, 793), a(794, 795)],
        e.ponyFetlocksBackStand = [a(796, 797)],
        e.ponyFetlocksBackTrot = [a(798, 799), a(800, 801), a(802, 803), a(804, 805), a(806, 807), a(808, 809), a(810, 811), a(812, 813), a(814, 815), a(816, 817), a(818, 819), a(820, 821), a(822, 823), a(824, 825), a(826, 827), a(828, 829)],
        e.ponyFrontLegAccessoriesStand = [[null, [[a(830, 831)], [a(832, 833), a(834, 835), a(836, 837), a(838, 839), a(840, 841), a(842, 843)]]]],
        e.ponyFrontLegAccessoriesTrot = [[null, [[a(844, 845)], [a(846, 847), a(848, 849), a(850, 851), a(852, 853), a(854, 855), a(856, 857)]]], [null, [[a(858, 859)], [a(860, 861), a(862, 863), a(864, 865), a(866, 867), a(868, 869), a(870, 871)]]], [null, [[a(872, 873)], [a(874, 875), a(876, 877), a(878, 879), a(880, 881), a(882, 883), a(884, 885)]]], [null, [[a(886, 887)], [a(888, 889), a(890, 891), a(892, 893), a(894, 895), a(896, 897), a(898, 899)]]], [null, [[a(900, 901)], [a(902, 903), a(904, 905), a(906, 907), a(908, 909), a(910, 911), a(912, 913)]]], [null, [[a(914, 915)], [a(916, 917), a(918, 919), a(920, 921), a(922, 923), a(924, 925), a(926, 927)]]], [null, [[a(928, 929)], [a(930, 931), a(932, 933), a(934, 935), a(936, 937), a(938, 939), a(940, 941)]]], [null, [[a(942, 943)], [a(944, 945), a(946, 947), a(948, 949), a(950, 951), a(952, 953), a(954, 955)]]], [null, [[a(956, 957)], [a(958, 959), a(960, 961), a(962, 963), a(964, 965), a(966, 967), a(968, 969)]]], [null, [[a(970, 971)], [a(972, 973), a(974, 975), a(976, 977), a(978, 979), a(980, 981), a(982, 983)]]], [null, [[a(984, 985)], [a(986, 987), a(988, 989), a(990, 991), a(992, 993), a(994, 995), a(996, 997)]]], [null, [[a(998, 999)], [a(1e3, 1001), a(1002, 1003), a(1004, 1005), a(1006, 1007), a(1008, 1009), a(1010, 1011)]]], [null, [[a(1012, 1013)], [a(1014, 1015), a(1016, 1017), a(1018, 1019), a(1020, 1021), a(1022, 1023), a(1024, 1025)]]], [null, [[a(1026, 1027)], [a(1028, 1029), a(1030, 1031), a(1032, 1033), a(1034, 1035), a(1036, 1037), a(1038, 1039)]]], [null, [[a(1040, 1041)], [a(1042, 1043), a(1044, 1045), a(1046, 1047), a(1048, 1049), a(1050, 1051), a(1052, 1053)]]], [null, [[a(1054, 1055)], [a(1056, 1057), a(1058, 1059), a(1060, 1061), a(1062, 1063), a(1064, 1065), a(1066, 1067)]]]],
        e.ponyBackLegAccessoriesStand = [[null, [[a(1068, 1069)], [a(1070, 1071), a(1072, 1073), a(1074, 1075), a(1076, 1077), a(1078, 1079), a(1080, 1081)]]]],
        e.ponyBackLegAccessoriesTrot = [[null, [[a(1082, 1083)], [a(1084, 1085), a(1086, 1087), a(1088, 1089), a(1090, 1091), a(1092, 1093), a(1094, 1095)]]], [null, [[a(1096, 1097)], [a(1098, 1099), a(1100, 1101), a(1102, 1103), a(1104, 1105), a(1106, 1107), a(1108, 1109)]]], [null, [[a(1110, 1111)], [a(1112, 1113), a(1114, 1115), a(1116, 1117), a(1118, 1119), a(1120, 1121), a(1122, 1123)]]], [null, [[a(1124, 1125)], [a(1126, 1127), a(1128, 1129), a(1130, 1131), a(1132, 1133), a(1134, 1135), a(1136, 1137)]]], [null, [[a(1138, 1139)], [a(1140, 1141), a(1142, 1143), a(1144, 1145), a(1146, 1147), a(1148, 1149), a(1150, 1151)]]], [null, [[a(1152, 1153)], [a(1154, 1155), a(1156, 1157), a(1158, 1159), a(1160, 1161), a(1162, 1163), a(1164, 1165)]]], [null, [[a(1166, 1167)], [a(1168, 1169), a(1170, 1171), a(1172, 1173), a(1174, 1175), a(1176, 1177), a(1178, 1179)]]], [null, [[a(1180, 1181)], [a(1182, 1183), a(1184, 1185), a(1186, 1187), a(1188, 1189), a(1190, 1191), a(1192, 1193)]]], [null, [[a(1194, 1195)], [a(1196, 1197), a(1198, 1199), a(1200, 1201), a(1202, 1203), a(1204, 1205), a(1206, 1207)]]], [null, [[a(1208, 1209)], [a(1210, 1211), a(1212, 1213), a(1214, 1215), a(1216, 1217), a(1218, 1219), a(1220, 1221)]]], [null, [[a(1222, 1223)], [a(1224, 1225), a(1226, 1227), a(1228, 1229), a(1230, 1231), a(1232, 1233), a(1234, 1235)]]], [null, [[a(1236, 1237)], [a(1238, 1239), a(1240, 1241), a(1242, 1243), a(1244, 1245), a(1246, 1247), a(1248, 1249)]]], [null, [[a(1250, 1251)], [a(1252, 1253), a(1254, 1255), a(1256, 1257), a(1258, 1259), a(1260, 1261), a(1262, 1263)]]], [null, [[a(1264, 1265)], [a(1266, 1267), a(1268, 1269), a(1270, 1271), a(1272, 1273), a(1274, 1275), a(1276, 1277)]]], [null, [[a(1278, 1279)], [a(1280, 1281), a(1282, 1283), a(1284, 1285), a(1286, 1287), a(1288, 1289), a(1290, 1291)]]], [null, [[a(1292, 1293)], [a(1294, 1295), a(1296, 1297), a(1298, 1299), a(1300, 1301), a(1302, 1303), a(1304, 1305)]]]],
        e.ponyFaceAccessories = [null, [[s(1307, 1308, 1306)]], [[a(1309, 1310)]], [[s(1312, 1313, 1311)]]],
        e.ponyEarAccessories = [null, [[a(1314, 1315)]], [[a(1316, 1317)]], [[a(1318, 1319)]], [[a(1320, 1321)]], [[a(1322, 1323), a(1324, 1325)]]],
        e.ponyHeadAccessories = [null, [[a(1326, 1327)]], [[a(1328, 1329)], [a(1330, 1331), a(1332, 1333), a(1334, 1335), a(1336, 1337)], [a(1338, 1339), a(1340, 1341), a(1342, 1343), a(1344, 1345)], [a(1346, 1347), a(1348, 1349), a(1350, 1351), a(1352, 1353)]], [[a(1354, 1355)], [a(1356, 1357), a(1358, 1359)], [a(1360, 1361), a(1362, 1363), a(1364, 1365)], [a(1366, 1367), a(1368, 1369), a(1370, 1371), a(1372, 1373)], [a(1374, 1375), a(1376, 1377), a(1378, 1379)]]],
        e.ponyNeckAccessories = [null, [[a(1380, 1381)], [a(1382, 1383), a(1384, 1385)]], [[a(1386, 1387)], [a(1388, 1389), a(1390, 1391)], [a(1392, 1393), a(1394, 1395), a(1396, 1397), a(1398, 1399)], [a(1400, 1401), a(1402, 1403)]], [[a(1404, 1405)], [a(1406, 1407), a(1408, 1409)], [a(1410, 1411), a(1412, 1413), a(1414, 1415)], [a(1416, 1417), a(1418, 1419), a(1420, 1421), a(1422, 1423), a(1424, 1425), a(1426, 1427)], [a(1428, 1429), a(1430, 1431), a(1432, 1433)]]],
        e.ponyFacialHair = [null, [[a(1434, 1435)]]],
        e.butterfly = [v[1720], v[1721], v[1722], v[1723]],
        e.ponyEyeshadow = v[672],
        e.ponyEyeshadowShine = v[673],
        e.ponyBody = a(688, 689),
        e.ponyHead = a(690, 691),
        e.ponyEar = a(692, 693),
        e.ponyEar2 = a(694, 695),
        e.ponyShadow = v[696],
        e.ponySelection = v[697],
        e.tree = f(1436, 1437, 1438, 1439, 1440),
        e.apple = u(1441, 1442),
        e.pumpkin = u(1443, 1444),
        e.rock = u(1445, 1446),
        e.bubble = v[1709],
        e.bubble2 = v[1710],
        e.cloud = v[1711],
        e.heartemote = v[1712],
        e.nipple = v[1713],
        e.nipple2 = v[1714],
        e.pixel = v[1715],
        e.pizzaemote = v[1716],
        e.pumpkinemote = v[1717],
        e.rockemote = v[1718],
        e.sign = v[1719],
        e.ponFreckles = [null, m[1], m[2], m[3], m[4]],
        e.ponLegFrontStand = [m[5]],
        e.ponLegBackStand = [m[6]],
        e.ponBody = m[7],
        e.ponHead = m[8],
        e.ponEar = m[9],
        e.ponEar2 = m[10],
        e.ponShadow = m[11],
        e.tileSheet = p["tiles.png"],
        e.tileSprite = {
          x: 0,
          y: 0,
          w: 32,
          h: 24,
          ox: 0,
          oy: 0
        },
        e.spriteSheets = [{
          src: h,
          sprites: v
        }, {
          src: d,
          sprites: m
        }, {
          src: e.tileSheet,
          sprites: [e.tileSprite]
        }],
        e.font = [[0, 1447], [9786, 1448], [9787, 1449], [9829, 1450], [9830, 1451], [9827, 1452], [9824, 1453], [8226, 1454], [9688, 1455], [9675, 1456], [9689, 1457], [9794, 1458], [9792, 1459], [9834, 1460], [9835, 1461], [9788, 1462], [9658, 1463], [9668, 1464], [8597, 1465], [8252, 1466], [182, 1467], [167, 1468], [9644, 1469], [8616, 1470], [8593, 1471], [8595, 1472], [8594, 1473], [8592, 1474], [8735, 1475], [8596, 1476], [9650, 1477], [9660, 1478], [33, 1479], [34, 1480], [35, 1481], [36, 1482], [37, 1483], [38, 1484], [39, 1485], [40, 1486], [41, 1487], [42, 1488], [43, 1489], [44, 1490], [45, 1491], [46, 1492], [47, 1493], [48, 1494], [49, 1495], [50, 1496], [51, 1497], [52, 1498], [53, 1499], [54, 1500], [55, 1501], [56, 1502], [57, 1503], [58, 1504], [59, 1505], [60, 1506], [61, 1507], [62, 1508], [63, 1509], [64, 1510], [65, 1511], [66, 1512], [67, 1513], [68, 1514], [69, 1515], [70, 1516], [71, 1517], [72, 1518], [73, 1519], [74, 1520], [75, 1521], [76, 1522], [77, 1523], [78, 1524], [79, 1525], [80, 1526], [81, 1527], [82, 1528], [83, 1529], [84, 1530], [85, 1531], [86, 1532], [87, 1533], [88, 1534], [89, 1535], [90, 1536], [91, 1537], [92, 1538], [93, 1539], [94, 1540], [95, 1541], [96, 1542], [97, 1543], [98, 1544], [99, 1545], [100, 1546], [101, 1547], [102, 1548], [103, 1549], [104, 1550], [105, 1551], [106, 1552], [107, 1553], [108, 1554], [109, 1555], [110, 1556], [111, 1557], [112, 1558], [113, 1559], [114, 1560], [115, 1561], [116, 1562], [117, 1563], [118, 1564], [119, 1565], [120, 1566], [121, 1567], [122, 1568], [123, 1569], [124, 1570], [125, 1571], [126, 1572], [8962, 1573], [199, 1574], [252, 1575], [233, 1576], [226, 1577], [228, 1578], [224, 1579], [229, 1580], [231, 1581], [234, 1582], [235, 1583], [232, 1584], [239, 1585], [238, 1586], [236, 1587], [196, 1588], [197, 1589], [201, 1590], [230, 1591], [198, 1592], [244, 1593], [246, 1594], [242, 1595], [251, 1596], [249, 1597], [255, 1598], [214, 1599], [220, 1600], [248, 1601], [163, 1602], [216, 1603], [215, 1604], [402, 1605], [225, 1606], [237, 1607], [243, 1608], [250, 1609], [241, 1610], [209, 1611], [170, 1612], [186, 1613], [191, 1614], [174, 1615], [172, 1616], [189, 1617], [188, 1618], [161, 1619], [171, 1620], [187, 1621], [1040, 1622], [1072, 1623], [1041, 1624], [1073, 1625], [1042, 1626], [1074, 1627], [1043, 1628], [1075, 1629], [1044, 1630], [1076, 1631], [1045, 1632], [1077, 1633], [1025, 1634], [1105, 1635], [1046, 1636], [1078, 1637], [1047, 1638], [1079, 1639], [1048, 1640], [1080, 1641], [1049, 1642], [1081, 1643], [1050, 1644], [1082, 1645], [1051, 1646], [1083, 1647], [1052, 1648], [1084, 1649], [1053, 1650], [1085, 1651], [1054, 1652], [1086, 1653], [1055, 1654], [1087, 1655], [1056, 1656], [1088, 1657], [1057, 1658], [1089, 1659], [1058, 1660], [1090, 1661], [1059, 1662], [1091, 1663], [1060, 1664], [1092, 1665], [1061, 1666], [1093, 1667], [1062, 1668], [1094, 1669], [1063, 1670], [1095, 1671], [1064, 1672], [1096, 1673], [1065, 1674], [1097, 1675], [1066, 1676], [1098, 1677], [1067, 1678], [1099, 1679], [1068, 1680], [1100, 1681], [1069, 1682], [1101, 1683], [1070, 1684], [1102, 1685], [1071, 1686], [1103, 1687], [260, 1688], [261, 1689], [262, 1690], [263, 1691], [280, 1692], [281, 1693], [323, 1694], [324, 1695], [346, 1696], [347, 1697], [377, 1698], [378, 1699], [379, 1700], [380, 1701], [321, 1702], [322, 1703], [211, 1704], [12484, 1705], [362, 1706], [363, 1707], [12471, 1708]].map(function (t) {
          return {
            code: t[0],
            sprite: v[t[1]]
          }
        }),
        n.exports
    }),
    System.registerDynamic("5d", ["1f"], !0, function (t, e, n) {
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
        backLegAccessory: r.ponyBackLegAccessoriesStand
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
          backLegAccessory: r.ponyBackLegAccessoriesTrot
        },
        e.animations = [e.stand, e.trot],
        n.exports
    });
    System.registerDynamic("44", ["21", "22", "24", "1f", "3c", "5d"], !0, function (t, e, n) {
      "use strict";
      function r() {
        return {
          animation: _.stand,
          animationFrame: 0,
          blinkFrame: 1
        }
      }

      function i(t, n, r, i, u, c, p) {
        var h = i - e.PONY_WIDTH / 2
          , d = u - e.PONY_HEIGHT
          , v = r.animation
          , b = r.animationFrame % v.frames
          , _ = (r.animationFrame + v.framesShift) % v.frames
          , w = m.at(v.headBobs, b)
          , x = m.at(v.bodyBobs, b)
          , E = h + x.x
          , $ = d + x.y
          , S = h + w.x
          , T = d + w.y;
        p && t.drawSprite(y.ponySelection, null, h, d),
          t.drawSprite(y.ponyShadow, g.SHADOW_COLOR, h, d),
          l(t, y.ponyBackBehindManes, n.backMane, S, T);
        var k = !n.mane || !n.mane.type
          , M = k ? S - 1 : S
          , A = k ? T + 4 : T;
        l(t, y.ponyHeadAccessories, n.headAccessory, M, A);
        var C = h - 3
          , D = d - 1
          , O = v.frontLegs
          , I = v.backLegs
          , R = m.at(v.frontHooves, n.frontHooves && n.frontHooves.type)
          , F = m.at(v.backHooves, n.backHooves && n.backHooves.type)
          , P = v.frontLegAccessory
          , j = v.backLegAccessory;
        o(t, C, D, O, R, P, n.darkFrontLegAccessory, _, n.darkCoatFill, n.darkCoatOutline, n.darkFrontHoovesFill, n.darkFrontHoovesOutline),
          o(t, C, D, I, F, j, n.darkBackLegAccessory, _, n.darkCoatFill, n.darkCoatOutline, n.darkBackHoovesFill, n.darkBackHoovesOutline),
          l(t, y.ponyTails, n.tail, E, $),
          s(t, y.ponyBody, n.coatFill, n.coatOutline, E, $);
        var N = n.frontHooves && n.frontHooves.fills && n.frontHooves.fills[0]
          , L = n.frontHooves && n.frontHooves.outlines && n.frontHooves.outlines[0]
          , U = n.backHooves && n.backHooves.fills && n.backHooves.fills[0]
          , B = n.backHooves && n.backHooves.outlines && n.backHooves.outlines[0];
        o(t, h, d, O, R, P, n.frontLegAccessory, b, n.coatFill, n.coatOutline, N, L),
          o(t, h, d, I, F, j, n.backLegAccessory, b, n.coatFill, n.coatOutline, U, B),
          f(t, n.cm, E + 43, $ + 49, c && n.cmFlip),
          l(t, y.ponyWings, n.wings, E, $),
          l(t, y.ponyNeckAccessories, n.neckAccessory, E, $),
          a(t, n, S, T, r.blinkFrame, c)
      }

      function o(t, e, n, r, i, o, a, u, l, c, f, p) {
        s(t, m.at(r, u), l, c, e, n),
          s(t, m.at(i, u), f, p, e, n)
      }

      function a(t, e, n, r, i, o) {
        void 0 === i && (i = 1),
          l(t, y.ponyBehindManes, e.mane, n, r),
          s(t, y.ponyEar2, e.coatFill, e.coatOutline, n, r),
          s(t, y.ponyHead, e.coatFill, e.coatOutline, n, r),
          l(t, y.ponyFacialHair, e.facialHair, n, r);
        var a = m.at(y.ponyNoses, e.muzzle);
        t.drawSprite(a.mouth, g.WHITE, n, r),
          t.drawSprite(a.muzzle, e.coatOutline, n, r),
        e.fangs && t.drawSprite(a.fangs, g.WHITE, n, r);
        var u = 0 | e.freckles;
        o && 3 === u ? u = 4 : o && 4 === u && (u = 3),
          t.drawSprite(m.at(y.ponyFreckles, u), e.frecklesColor, n, r),
        e.eyeshadow && (t.drawSprite(y.ponyEyeshadow, e.eyeshadowColor, n, r),
          t.drawSprite(y.ponyEyeshadowShine, g.SHINES_COLOR, n, r));
        var f = o ? e.eyeColorRight : e.eyeColorLeft
          , p = o ? e.eyeColorLeft : e.eyeColorRight
          , h = o ? e.eyeOpennessRight : e.eyeOpennessLeft
          , d = o ? e.eyeOpennessLeft : e.eyeOpennessRight;
        c(t, m.at(y.ponyEyeLeft, Math.max(i, h)), e, f, n, r),
          c(t, m.at(y.ponyEyeRight, Math.max(i, d)), e, p, n, r),
          l(t, y.ponyBackFrontManes, e.backMane, n, r),
          l(t, y.ponyTopManes, e.mane, n, r),
          l(t, y.ponyHorns, e.horn, n, r),
          s(t, y.ponyEar, e.coatFill, e.coatOutline, n, r),
          l(t, y.ponyFaceAccessories, e.faceAccessory, n, r),
          l(t, y.ponyEarAccessories, e.earAccessory, n, r),
          l(t, y.ponyFrontManes, e.mane, n, r)
      }

      function s(t, e, n, r, i, o) {
        e && e.fill && t.drawSprite(e.fill, n, i, o),
        e && e.outline && t.drawSprite(e.outline, r, i, o),
        e && e.extra && t.drawSprite(e.extra, g.WHITE, i, o)
      }

      function u(t, e, n, r, i, o) {
        e && e.forEach(function (e, a) {
          return s(t, e, m.at(n, a), m.at(r, a), i, o)
        })
      }

      function l(t, e, n, r, i) {
        if (n) {
          var o = m.at(e, n.type);
          o && u(t, m.at(o, n.pattern), n.fills, n.outlines, r, i)
        }
      }

      function c(t, e, n, r, i, o) {
        e && (t.drawSprite(e.fill, n.eyeWhites, i, o),
          t.drawSprite(e.iris, r, i, o),
          t.drawSprite(e.line, g.BLACK, i, o),
        n.eyelashes && t.drawSprite(e.lashes, n.coatOutline, i, o))
      }

      function f(t, e, n, r, i) {
        if (e)
          for (var o = 0; o < v.CM_SIZE; o++)
            for (var a = 0; a < v.CM_SIZE; a++) {
              var s = i ? e[v.CM_SIZE - a - 1 + o * v.CM_SIZE] : e[a + o * v.CM_SIZE];
              s && t.drawRect(s, n + a, r + o, 1, 1)
            }
      }

      function p(t, e, n, r, o, a, s) {
        void 0 === a && (a = !1),
        void 0 === s && (s = !1);
        try {
          i({
            drawSprite: function (e, n, r, i) {
              b.drawColoredSprite(t, e, n ? n.css() : "white", r, i)
            },
            drawRect: function (e, n, r, i, o) {
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

      function d(t, e, n, r, i, o) {
        void 0 === o && (o = !1)
      }

      var v = t("21")
        , m = t("22")
        , g = t("24")
        , y = t("1f")
        , b = t("3c")
        , _ = t("5d");
      return e.PONY_WIDTH = 80,
        e.PONY_HEIGHT = 70,
        e.BLINK_FRAMES = [2, 6, 6, 4, 2],
        e.createDefaultPonyState = r,
        e.drawPony2D = p,
        e.drawPonyGL = h,
        e.drawPonyGL2 = d,
        n.exports
    });
    System.registerDynamic("cc", ["21", "32", "44"], !0, function (t, e, n) {
      "use strict";
      var r = t("21")
        , i = t("32")
        , o = t("44")
        , a = function () {
        function t(t, e, n) {
          this.$location = t,
            this.gameService = e,
            this.model = n,
            this.maxNameLength = r.PLAYER_NAME_MAX_LENGTH,
            this.state = o.createDefaultPonyState(),
            this.authError = t.search().error
        }

        return Object.defineProperty(t.prototype, "joining", {
          get: function () {
            return this.gameService.joining
          },
          enumerable: !0,
          configurable: !0
        }),
          Object.defineProperty(t.prototype, "pony", {
            get: function () {
              return this.model.pony
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "ponies", {
            get: function () {
              return this.model.ponies
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "canNew", {
            get: function () {
              return this.ponies.length < r.PONY_LIMIT
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.new = function () {
            this.model.selectPony(i.createDefaultPony()),
              this.$location.url("/character")
          }
          ,
          t.prototype.select = function (t) {
            this.model.selectPony(t)
          }
          ,
          t.$inject = ["$location", "gameService", "model"],
          t
      }();
      return Object.defineProperty(e, "__esModule", {
        value: !0
      }),
        e.default = a,
        n.exports
    }),
      System.registerDynamic("cd", [], !0, function (t, e, n) {
        return n.exports = '<div class="text-center heading"><img src="/images/logo.png" width="574" height="130" class="hidden-xs"><img src="/images/logo-small.png" width="287" height="65" class="hidden-lg hidden-md hidden-sm"></div><div class="center-block home-content"><div ng-if="vm.model.loading" style="font-size: 50px; padding: 150px 0;" class="text-muted text-center"><i class="fa fa-fw fa-spin fa-spinner"></i></div><div ng-if="!vm.model.loading"><div ng-if="!vm.model.account" class="form-group"><sign-in-box></sign-in-box></div><div ng-if="vm.authError" class="form-group"><div class="alert alert-danger">{{vm.authError}}</div></div><div ng-if="!!vm.model.account"><div class="form-group"><div class="input-group"><input type="text" ng-model="vm.pony.name" placeholder="name of your character" maxlength="{{vm.maxNameLength}}" ng-disabled="vm.joining" class="form-control text-center"><div class="input-group-btn"><a href="/character" ng-class="{ disabled: vm.joining }" class="btn btn-default">edit</a><div uib-dropdown style="width: auto;" class="btn-group"><button type="button" ng-disabled="!vm.ponies.length || vm.joining" uib-dropdown-toggle class="btn btn-default"><span class="caret"></span></button><ul uib-dropdown-menu class="dropdown-menu-right"><li ng-repeat="i in vm.ponies | orderBy:\'name\' track by $index"><a href="#" ng-click="vm.select(i)">{{i.name}}</a></li><li ng-if="vm.canNew"><a href="#" ng-click="vm.new()" class="text-center"><em>new pony</em></a></li></ul></div></div></div></div><div class="form-group"><character-preview pony="vm.pony" state="vm.state"></character-preview></div><div class="form-group text-center"><play-box></play-box></div><div style="max-width: 400px;" class="rules center-block text-left"><h4>General rules</h4><ul class="text-muted"><li>Be kind to others</li><li>Don\'t spam</li><li>Don\'t modify the game with hacks or scripts</li><li>Don\'t encourage spamming or hacking</li></ul></div><div style="max-width: 400px;" class="rules center-block text-left"><h4>Notice</h4><p class="text-muted">This game is very early in development. There might be bugs and occasional downtimes.</p><p class="text-muted">Please do not redistribute any of the game files or code.</p></div></div></div></div>',
          n.exports
      }),
      System.registerDynamic("ce", [], !0, function (t, e, n) {
        return n.exports = '<h1>About</h1><div class="row"><div class="col-md-6"><p class="lead">A game of ponies building a town\n</p><h2>Keyboard shortcuts</h2><ul><li><b>movement </b> - <kbd><i class="fa fa-arrow-up"></i></kbd> <kbd><i class="fa fa-arrow-left"></i></kbd> <kbd><i class="fa fa-arrow-down"></i></kbd> <kbd><i class="fa fa-arrow-right"></i></kbd> or <kbd><b>W</b></kbd> <kbd><b>A</b></kbd> <kbd><b>S</b></kbd> <kbd><b>D</b></kbd> hold <kbd>shift</kbd> to walk slowly</li><li><b>chat</b><ul><li><kbd><b>enter</b></kbd> to open chat box and send a message</li><li><kbd><b>esc</b></kbd> to cancel the message</li></ul></li><li><b>zoom (1x, 2x, 3x, 4x) </b> - <kbd><b>P</b></kbd></li><li><b>hide all text</b> - <kbd><b>F2</b></kbd></li><li><b>fullscreen</b> - <kbd><b>F11</b></kbd></li><li>hold <kbd><b>shift</b></kbd> to be able to click on ground and items behind other players</li></ul><h2>Emotes</h2><p>You can use emotes in chat by typings their name surrounded by colons <samp>:apple:</samp>\nor by using unicode characters assigned to them. Available emotes:\n</p><ul><li>:face: - ツ</li><li>:derp: - シ</li><li>:heart: - ❤</li><li>:rock: - ⽯</li><li>:apple: - 🍎</li><li>:pizza: - 🍕</li><li>:pumpkin: - 🎃</li></ul><h2>Technology</h2><p>The entire game is written in <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>,\na typed superset of JavaScript that compiles to plain JavaScript.\nServer side code is running on <a href="https://nodejs.org/en/" target="_blank">Node.js</a> server with WebSockets for communication.\nUser interface is built using <a href="https://angularjs.org/" target="_blank">Angular.js</a> framework and \nthe game itself is using WebGL for rendering graphics.\n</p><h2>The Team</h2><h3 id="agamnentzar">Agamnentzar</h3>\n<p><a href="http://agamnentzar.deviantart.com/">deviantart</a> | <a href="http://agamnentzar.tumblr.com/">tumblr</a></p>\n<ul>\n<li>Designer</li>\n<li>Programmer</li>\n<li>Artist</li>\n</ul>\n<h3 id="shino">Shino</h3>\n<p><a href="http://shinodage.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n<li>Animator</li>\n</ul>\n<h3 id="chirachan">ChiraChan</h3>\n<p><a href="http://chiramii-chan.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<h3 id="velenor">Velenor</h3>\n<p><a href="http://velenor.deviantart.com/">tumblr</a></p>\n<ul>\n<li>Artist</li>\n<li>Animator</li>\n</ul>\n<h3 id="disastral">Disastral</h3>\n<p><a href="http://askdisastral.tumblr.com/">tumblr</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<h3 id="cyberpon3">CyberPon3</h3>\n<p><a href="http://cyberpon3.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Programmer</li>\n</ul>\n<h2>Other contributors</h2><p><strong>OtakuAP</strong> - <a href="http://otakuap.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n<li>Animator</li>\n</ul>\n<p><strong>Velvet-Frost</strong> - <a href="http://velvet-frost.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<p><strong>Jet7Wave</strong> - <a href="http://jetwave.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<p><strong>Meno</strong> - <a href="http://menojar.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<p><strong>Lalieri</strong> - <a href="http://lalieri.tumblr.com/">tumblr</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n</div><div class="col-md-6"><h2>Changelog</h2><h4 id="v0-14-2">v0.14.2</h4>\n<ul>\n<li>Added client script version check when joining to the game</li>\n</ul>\n<h4 id="v0-14-1">v0.14.1</h4>\n<ul>\n<li>Hotfixes</li>\n</ul>\n<h4 id="v0-14-0">v0.14.0</h4>\n<ul>\n<li>Fixed about page inaccuracies</li>\n<li>Fixed gamepad controls</li>\n<li>Added selecting other players (hold <kbd>shift</kbd> to be able to click on ground and items behind other players)</li>\n<li>Added option for ignoring other players</li>\n</ul>\n<h4 id="v0-13-2">v0.13.2</h4>\n<ul>\n<li>Adjusted day-night cycle length and night darkness intensity</li>\n<li>Adjusted dead zone for gamepads</li>\n<li>Added slow walking with <kbd>shift</kbd> key</li>\n<li>Fixed disconnect issues on mobile devices</li>\n<li>Improved networking performance</li>\n</ul>\n<h4 id="v0-13-1">v0.13.1</h4>\n<ul>\n<li>Fixed multiple servers not connecting properly</li>\n</ul>\n<h4 id="v0-13-0">v0.13.0</h4>\n<ul>\n<li>Added touch and gamepad controls</li>\n<li>Added day-night cycle</li>\n<li>Added game time clock</li>\n<li>Added option to leave game without having to reload the page</li>\n<li>Added support for multiple servers</li>\n<li>Fixed horn outlines</li>\n<li>Fixed zoom repeating when holding zoom key</li>\n<li>Fixed getting logged out when closing browser</li>\n</ul>\n<h4 id="v0-12-1">v0.12.1</h4>\n<ul>\n<li>Added back lighting test shortcut <kbd>T</kbd></li>\n<li>Added keyboard shortcut <kbd>F2</kbd> for hiding all text messages</li>\n<li>Fixed issue with setting color and opennes independently for left and right eye</li>\n<li>Fixed issue with incorrect pony name text placement</li>\n<li>Fixed being able to spawn inside a tree</li>\n</ul>\n<h4 id="v0-12-0">v0.12.0</h4>\n<ul>\n<li>Added trees</li>\n<li>Added pumpkins</li>\n<li>Added eyeshadow</li>\n<li>Added hats</li>\n<li>Added tie</li>\n<li>Added reading glasses</li>\n<li>Added flower ear accessory</li>\n<li>Added new face markings</li>\n<li>Added new emotes</li>\n<li>Changed map design</li>\n<li>Fixed head accessories placement without hair</li>\n<li>Fixed not being able to set 6th color on 2nd mane</li>\n</ul>\n<h4 id="v0-11-4">v0.11.4</h4>\n<ul>\n<li>Added new scarf pattern</li>\n<li>Improved rendering performance</li>\n<li>Fixed not being able to see name of a pony when they are saying something</li>\n<li>Fixed issues with server restart</li>\n<li>Fixed fetlocks in trot animation</li>\n<li>Fixed issues with font and emote spacing</li>\n</ul>\n<h4 id="v0-11-3">v0.11.3</h4>\n<ul>\n<li>Added scarf accessory</li>\n<li>Added option for hiding all chat messages with russian text</li>\n<li>Added list of rules and in-development notice</li>\n<li>Fixed some issues with chat messages</li>\n<li>Fixed multiple issues with manes</li>\n<li>Fixed issue with fetlocks</li>\n</ul>\n<h4 id="v0-11-2">v0.11.2</h4>\n<ul>\n<li>Added announcements support</li>\n<li>Added hide background switch for pony creator</li>\n<li>Removed stones from the spawning area</li>\n</ul>\n<h4 id="v0-11-1">v0.11.1</h4>\n<ul>\n<li>Added polish characters to pixel font</li>\n<li>Fixed sign-in with facebook</li>\n<li>Fixed cancelling character edit</li>\n<li>Fixed clouds</li>\n<li>Fixed spelling mistake</li>\n<li>Fixed buttmark position</li>\n</ul>\n<h4 id="v0-11-0">v0.11.0</h4>\n<ul>\n<li>Reworked sign-in and account system</li>\n<li>Added cyrillic characters to pixel font</li>\n<li>Added logos</li>\n<li>Added optional swear filter</li>\n<li>Added more mane styles</li>\n<li>Improved networking performance</li>\n</ul>\n<h4 id="v0-10-1">v0.10.1</h4>\n<ul>\n<li>Fixed connection resetting every 10 seconds when not in game</li>\n</ul>\n<h4 id="v0-10-0">v0.10.0</h4>\n<ul>\n<li>Added back butterflies</li>\n<li>Improved networking performance</li>\n<li>Fixed not initialized errors</li>\n<li>Fixed deleting character not updating character list</li>\n<li>Fixed cursor and camera offset errors on screens with high pixel density</li>\n<li>Fixed styling issue in chat box</li>\n</ul>\n<h4 id="v0-9-8">v0.9.8</h4>\n<ul>\n<li>Improved connection performance</li>\n<li>Fixed issues with chat box focus on Safari and Edge</li>\n</ul>\n<h4 id="v0-9-7">v0.9.7</h4>\n<ul>\n<li>Added chat buttons</li>\n<li>Improved connection performance</li>\n<li>Fixed automatically signing in after signing up for new account</li>\n<li>Fixed character name not saving if joining the game from home screen</li>\n</ul>\n<h4 id="v0-9-6">v0.9.6</h4>\n<ul>\n<li>Added logging off after 15 minutes of no activity</li>\n<li>Improved performance of joining to the game</li>\n<li>Fixed multiple issues with character creator on IE11</li>\n</ul>\n<h4 id="v0-9-5">v0.9.5</h4>\n<ul>\n<li>Fixed non-flippable buttmarks</li>\n<li>Fixed some rate limiting issues</li>\n</ul>\n<h4 id="v0-9-4">v0.9.4</h4>\n<ul>\n<li>Removed ability to log into the same character multiple times</li>\n<li>Added back rocks</li>\n<li>Added displaying of WegGL initialization error</li>\n</ul>\n<h4 id="v0-9-3">v0.9.3</h4>\n<ul>\n<li>Removed rocks</li>\n</ul>\n<h4 id="v0-9-2">v0.9.2</h4>\n<ul>\n<li>Removed butterflies</li>\n<li>Removed debug code</li>\n</ul>\n<h4 id="v0-9-1">v0.9.1</h4>\n<ul>\n<li>Fixed issue with rendering when value is out of range</li>\n</ul>\n<h4 id="v0-9-0">v0.9.0</h4>\n<ul>\n<li>Added shading to trot animation</li>\n<li>Added new mane styles</li>\n<li>Added mane color patterns</li>\n<li>Added option for non-flippable butt marks</li>\n<li>Added account system</li>\n<li>Added saving characters on server side</li>\n<li>Fixed eye colors switching sides  when turning left and right</li>\n<li>Fixed performance issues with rendering</li>\n<li>Fixed shader code not working on some low end devices</li>\n<li>Fixed errors when character has invalid values set for sprite types</li>\n<li>Fixed being able to use transparency for character colors</li>\n<li>Fixed chat not limiting characters properly</li>\n</ul>\n<h4 id="v0-8-0">v0.8.0</h4>\n<ul>\n<li>Added character customization in game</li>\n<li>Added eye blinking</li>\n<li>Added character selection on home screen</li>\n</ul>\n<h4 id="v0-7-0">v0.7.0</h4>\n<ul>\n<li>Removed spawn command</li>\n<li>Added character creation prototype</li>\n</ul>\n<h4 id="v0-6-1">v0.6.1</h4>\n<ul>\n<li>Fixed mouse not working in the game</li>\n</ul>\n<h4 id="v0-6-0">v0.6.0</h4>\n<ul>\n<li>Added AFK indicator</li>\n<li>Updated styles</li>\n<li>Fixed wrong cursor position on retina displays and zommed in pages</li>\n<li>Fixed emoticon parsing</li>\n<li>Fixed issue on mobile devices</li>\n</ul>\n<h4 id="v0-5-0">v0.5.0</h4>\n<ul>\n<li>Added butterfies</li>\n<li>Added apples</li>\n<li>Added apple emote to chat</li>\n<li>Fixed login form not displaying on mobile safari</li>\n</ul>\n</div></div>',
          n.exports
      }),
      System.registerDynamic("cf", [], !0, function (t, e, n) {
        return n.exports = '<div ng-init="vm.init()" class="row"><div class="col-md-6 text-center"><div style="max-width: 400px; margin: auto;" class="input-group"><input type="text" ng-model="vm.pony.name" placeholder="name of your character" maxlength="{{vm.maxNameLength}}" autofocus class="form-control text-center"><div class="input-group-btn"><button type="button" ng-click="vm.new()" ng-disabled="!vm.canNew" class="btn btn-default">new</button><div uib-dropdown class="btn-group"><button type="button" ng-disabled="!vm.ponies.length" uib-dropdown-toggle class="btn btn-default"><span class="caret"></span></button><ul uib-dropdown-menu class="dropdown-menu-right"><li ng-repeat="p in vm.ponies | orderBy:\'name\' track by $index"><a href="#" ng-click="vm.select(p)">{{p.name}}</a></li></ul></div><button type="button" ng-if="!vm.deleting" ng-disabled="!vm.canDelete" ng-click="vm.deleting = true" title="delete pony" class="btn btn-danger"><i class="fa fa-trash"></i></button><button type="button" ng-if="vm.deleting" ng-disabled="!vm.canDelete" ng-click="vm.deleting = false" uib-tooltip="cancel" class="btn btn-danger"><i class="fa fa-fw fa-times"></i></button><button type="button" ng-if="vm.deleting" ng-disabled="!vm.canDelete" ng-click="vm.delete()" uib-tooltip="confirm delete" class="btn btn-success"><i class="fa fa-fw fa-check"></i></button></div></div><div style="margin: 30px 0 20px 0;" class="text-center"><character-preview pony="vm.pony" state="vm.state" no-background="vm.noBackground"></character-preview></div><div class="form-group text-center"><button ng-disabled="!vm.canRevert" ng-click="vm.revert()" class="btn btn-lg btn-default">Revert</button> <button ng-disabled="!vm.canSave" ng-click="vm.save()" class="btn btn-lg btn-default">Save</button></div><div style="max-width: 400px;" class="center-block"><play-box label="Save and Play" error="vm.error"></play-box></div><div style="max-width: 400px;" class="rules center-block text-left"><h4>General rules</h4><ul class="text-muted"><li>Be kind to others</li><li>Don\'t spam</li><li>Don\'t modify the game with hacks or scripts</li><li>Don\'t encourage spamming or hacking</li></ul></div><div style="max-width: 400px;" class="rules center-block text-left"><h4>Notice</h4><p class="text-muted">This game is very early in development. There might be bugs and occasional downtimes.</p><p class="text-muted">Please do not redistribute any of the game files or code.</p></div></div><div style="min-height: 500px;" class="col-md-6"><uib-tabset type="pills" active="vm.activeTab" ng-if="vm.loaded"><uib-tab heading="body"><div class="panel container-fluid character-tab"><div class="form-horizontal"><div class="row form-group"><div class="col-sm-4"><label class="control-label">General options</label></div><div class="col-sm-8"><div class="clearfix"><check-box icon="fa-check" checked="vm.pony.customOutlines" class="pull-left"></check-box><label style="margin-left: 10px;" class="form-control-static text-muted">allow custom outlines</label></div></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Animation</label></div><div class="col-sm-8"><div class="btn-group"><label ng-repeat="a in ::vm.animations" ng-model="vm.activeAnimation" uib-btn-radio="::$index" class="btn btn-primary">{{::a.name}}</label></div> <button ng-if="vm.canExport" ng-click="vm.export()" class="btn btn-default">export</button></div></div><div class="row form-group"><div class="col-sm-4"><check-box icon="fa-play" checked="vm.playAnimation" class="lock-box"></check-box><label class="control-label">Frame</label></div><div class="col-sm-8"><input type="number" ng-model="vm.state.animationFrame" ng-disabled="vm.playAnimation" min="0" class="form-control"></div></div><hr><fill-outline label="Body color" fill="vm.pony.coatFill" outline="vm.pony.coatOutline" outline-locked="vm.pony.lockCoatOutline" outline-hidden="!vm.customOutlines"></fill-outline><hr><sprite-set-selection label="Horn" base="vm.baseCoatColor" set="vm.pony.horn" sets="::vm.horns" outline-hidden="!vm.customOutlines" compact="true"></sprite-set-selection><hr><sprite-set-selection label="Wings" base="vm.baseCoatColor" set="vm.pony.wings" sets="::vm.wings" outline-hidden="!vm.customOutlines" compact="true"></sprite-set-selection><hr><sprite-set-selection label="Front hooves" base="vm.baseCoatColor" set="vm.pony.frontHooves" sets="::vm.frontHooves" outline-hidden="!vm.customOutlines" compact="true"></sprite-set-selection><hr><sprite-set-selection label="Back hooves" base="vm.baseCoatColor" set="vm.pony.backHooves" sets="::vm.backHooves" outline-hidden="!vm.customOutlines" compact="true"></sprite-set-selection><hr><div class="row form-group"><div class="col-sm-12 text-center"><label class="control-label text-muted">Butt mark</label></div></div><div class="row form-group"><div class="col-sm-7"><button ng-click="vm.clearCM()" title="Clear all" class="btn btn-primary"><i class="fa fa-fw fa-trash"></i></button> <div class="btn-group"><label ng-model="vm.brushType" uib-btn-radio="\'eraser\'" title="Eraser" class="btn btn-primary"><i class="fa fa-fw fa-eraser"></i></label><label ng-model="vm.brushType" uib-btn-radio="\'eyedropper\'" title="Eyedropper" class="btn btn-primary"><i class="fa fa-fw fa-eyedropper"></i></label><label ng-model="vm.brushType" uib-btn-radio="\'brush\'" title="Brush" class="btn btn-primary"><i class="fa fa-fw fa-paint-brush"></i></label></div></div><div class="col-sm-5"><color-picker color="vm.brush"></color-picker></div></div><div class="row form-group"><div class="col-sm-12 text-center"><bitmap-box bitmap="vm.pony.cm" tool="vm.brushType" color="vm.brush" width="::vm.cmSize" height="::vm.cmSize"></bitmap-box></div></div><div class="row form-group"><div class="col-sm-12 text-center"><check-box icon="fa-check" checked="vm.pony.cmFlip"></check-box><label style="margin-left: 10px; vertical-align: top;" class="form-control-static text-muted">don\'t flip mark on the other side</label></div></div><hr><div class="row form-group"><div class="col-sm-4"><label class="control-label">Other options</label></div><div class="col-sm-8"><div class="clearfix"><check-box icon="fa-check" checked="vm.noBackground" class="pull-left"></check-box><label style="margin-left: 10px;" class="form-control-static text-muted">hide background</label></div></div></div></div></div></uib-tab><uib-tab heading="mane"><div class="panel container-fluid character-tab"><div class="form-horizontal"><sprite-set-selection label="Mane" base="vm.baseHairColor" set="vm.pony.mane" sets="::vm.manes" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection><hr><sprite-set-selection label="Back mane" base="vm.baseHairColor" set="vm.pony.backMane" sets="::vm.backManes" outline-hidden="!vm.customOutlines"></sprite-set-selection></div></div></uib-tab><uib-tab heading="tail"><div class="panel container-fluid character-tab"><div class="form-horizontal"><sprite-set-selection label="Tail" base="vm.baseHairColor" set="vm.pony.tail" sets="::vm.tails" outline-hidden="!vm.customOutlines"></sprite-set-selection></div></div></uib-tab><uib-tab heading="face"><div class="panel container-fluid character-tab"><div class="form-horizontal"><div class="row form-group"><div class="col-sm-4"><label class="control-label">Eyelashes</label></div><div class="col-sm-8"><div class="btn-group"><label ng-model="vm.pony.eyelashes" uib-btn-radio="0" class="btn btn-primary">no</label><label ng-model="vm.pony.eyelashes" uib-btn-radio="1" class="btn btn-primary">yes</label></div></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Eye color</label></div><div class="col-sm-8"><color-picker color="vm.pony.eyeColorRight" changed="vm.eyeColorLockChanged(vm.pony.lockEyeColor)"></color-picker></div></div><div class="row form-group"><div class="col-sm-4"><check-box checked="vm.pony.lockEyeColor" icon="fa-lock" changed="vm.eyeColorLockChanged($value)" class="lock-box"></check-box><label class="control-label">Eye color (left)</label></div><div class="col-sm-8"><color-picker color="vm.pony.eyeColorLeft" is-disabled="vm.pony.lockEyeColor"></color-picker></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Eye whites color</label></div><div class="col-sm-8"><color-picker color="vm.pony.eyeWhites"></color-picker></div></div><div class="row form-group"><div class="col-sm-4"><check-box checked="vm.pony.lockEyes" icon="fa-lock" changed="vm.eyeOpennessChanged($value)" class="lock-box"></check-box><label class="control-label">Eye openness</label></div><div class="col-sm-4 col-xs-6"><input type="number" ng-model="vm.pony.eyeOpennessRight" min="1" max="6" step="1" ng-change="vm.eyeOpennessChanged(vm.pony.lockEyes)" class="form-control"></div><div class="col-sm-4 col-xs-6"><input type="number" ng-model="vm.pony.eyeOpennessLeft" min="1" max="6" step="1" ng-disabled="vm.pony.lockEyes" class="form-control"></div></div><div class="row form-group"><div class="col-sm-4"><check-box checked="vm.pony.eyeshadow" icon="fa-check" class="lock-box"></check-box><label class="control-label">Eyeshadow</label></div><div class="col-sm-8"><color-picker color="vm.pony.eyeshadowColor" is-disabled="!vm.pony.eyeshadow"></color-picker></div></div><hr><div class="row form-group"><div class="col-sm-4"><label class="control-label">Expression</label></div><div class="col-sm-8"><sprite-selection selected="vm.pony.muzzle" sprites="vm.muzzles" fill="vm.pony.coatFill" outline="vm.pony.coatOutline" circle="vm.pony.coatFill"></sprite-selection></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Fangs</label></div><div class="col-sm-8"><sprite-selection selected="vm.pony.fangs" sprites="vm.fangs" outline="vm.pony.coatOutline" circle="vm.pony.coatFill"></sprite-selection></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Markings</label></div><div class="col-sm-8"><sprite-selection selected="vm.pony.freckles" sprites="vm.freckles" fill="vm.pony.frecklesColor" outline="vm.pony.coatOutline" circle="vm.pony.coatFill"></sprite-selection></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Markings color</label></div><div class="col-sm-8"><color-picker color="vm.pony.frecklesColor" is-disabled="!vm.pony.freckles"></color-picker></div></div><hr><sprite-set-selection label="Facial hair" base="vm.baseHairColor" set="vm.pony.facialHair" sets="::vm.facialHair" outline-hidden="!vm.customOutlines"></sprite-set-selection></div></div></uib-tab><uib-tab heading="other"><div class="panel container-fluid character-tab"><div class="form-horizontal"><uib-tabset active="vm.activeAccessoryTab"><uib-tab heading="head"><div style="margin-top: 10px;"><sprite-set-selection label="Head accessories" set="vm.pony.headAccessory" sets="::vm.headAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection><hr><sprite-set-selection label="Ear accessories" set="vm.pony.earAccessory" sets="::vm.earAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection><hr><sprite-set-selection label="Face accessories" set="vm.pony.faceAccessory" sets="::vm.faceAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection></div></uib-tab><uib-tab heading="neck"><div style="margin-top: 10px;"><sprite-set-selection label="Neck accessories" set="vm.pony.neckAccessory" sets="::vm.neckAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection></div></uib-tab></uib-tabset></div></div></uib-tab></uib-tabset></div></div>',
          n.exports
      }),
      System.registerDynamic("d0", [], !0, function (t, e, n) {
        return n.exports = '<div ng-init="vm.init()"><h1>Account settings</h1></div><div class="row"><div class="col-md-6"><form name="form" ng-submit="vm.submit()" style="max-width: 400px;" class="form"><div class="form-group"><h3>Account details</h3></div><div class="form-group"><label for="account-name" class="control-label">name</label><input id="account-name" type="text" ng-model="vm.data.name" required maxlength="{{vm.nameMaxLength}}" class="form-control"></div><div ng-if="vm.error" class="form-group"><div class="alert alert-danger">{{vm.error}}</div></div><div class="form-group"><button type="submit" ng-disabled="!vm.canSubmit || form.$pristine || form.$invalid || form.$pending" class="btn btn-primary">Save</button></div></form></div><div class="col-md-6"><div class="form form-horizontal"><div class="form-group row"><div class="col-xs-12"><h3>Game settings</h3></div></div><div class="form-group row"><div class="col-xs-6"><label class="control-label">bad word filter</label></div><div class="col-xs-6 btn-group"><label ng-model="vm.settings.filterSwearWords" uib-btn-radio="true" class="btn btn-primary">ON</label><label ng-model="vm.settings.filterSwearWords" uib-btn-radio="false" class="btn btn-primary">OFF</label></div></div><div class="form-group row"><div class="col-xs-6"><label class="control-label">hide all messages with russian text</label></div><div class="col-xs-6 btn-group"><label ng-model="vm.settings.filterCyrillic" uib-btn-radio="true" class="btn btn-primary">ON</label><label ng-model="vm.settings.filterCyrillic" uib-btn-radio="false" class="btn btn-primary">OFF</label></div></div></div></div><div class="row"><div class="col-xs-12"><a href="/" style="max-width: 200px; margin-top: 50px;" class="btn btn-lg btn-primary btn-block center-block"><i class="fa fa-angle-double-left"></i> Back to game</a></div></div></div>',
          n.exports
      }),
      System.registerDynamic("d1", ["8", "a", "b", "7", "c3", "c4", "c6", "c7", "cc", "cd", "ce", "cf", "d0"], !0, function (t, e, n) {
        "use strict";
        t("8"),
          t("a"),
          t("b");
        var r = t("7")
          , i = t("c3");
        e.app = r.module("app", ["ngRoute", "ngAnimate", "ui.bootstrap"]),
          i.init(e.app),
          e.app.directive("a", function () {
            return {
              restrict: "E",
              link: function (t, e, n) {
                !n.target && n.href && /^https?:/.test(n.href) && (e[0].setAttribute("target", "_blank"),
                  e[0].setAttribute("rel", "noopener noreferrer"))
              }
            }
          });
        var vm = function () {
          function VM(t, e) {
            this.gameService = t,
              this.model = e
          }

          return Object.defineProperty(VM.prototype, "selected", {
            get: function () {
              return this.gameService.selected
            },
            enumerable: !0,
            configurable: !0
          }),
            Object.defineProperty(VM.prototype, "playing", {
              get: function () {
                return this.gameService.playing
              },
              enumerable: !0,
              configurable: !0
            }),
            VM.prototype.init = function () {
              var t = document.getElementById("music");
              t && (t.volume = .15)
            }
            ,
            VM.$inject = ["gameService", "model"],
            VM
        }();
        e.app.component("ponyTownApp", {
          controller: vm,
          controllerAs: "vm",
          template: t("c4")
        });
        var a = t("c6")
          , s = t("c7")
          , u = t("cc");
        return e.app.config(["$routeProvider", "$locationProvider", function (e, n) {
          n.html5Mode(!0),
            e.when("/", {
              template: t("cd"),
              controller: u.default,
              controllerAs: "vm"
            }).when("/about", {
              template: t("ce"),
              controller: function () {
              },
              controllerAs: "vm"
            }).when("/character", {
              template: t("cf"),
              controller: a.default,
              controllerAs: "vm"
            }).when("/account", {
              template: t("d0"),
              controller: s.default,
              controllerAs: "vm"
            }).otherwise({
              redirectTo: "/"
            })
        }
        ]),
          n.exports
      }),
      System.registerDynamic("d2", ["d"], !1, function (require, i, module) {
        return module.exports = require("d"),
          module.exports
      }),
      System.registerDynamic("2f", ["d2"], !0, function (t, e, n) {
        return n.exports = t("d2"),
          n.exports
      }),


      System.registerDynamic("20", [], !0, function (t, e, n) {
        "use strict";
        function r(t) {
          return "undefined" != typeof document ? document.body.getAttribute(t) : null
        }

        function i(t) {
          return "undefined" != typeof document ? document.getElementById(t).innerHTML : null
        }

        return e.debug = "true" === r("data-debug"),
          e.debugOptions = e.debug && "undefined" != typeof localStorage ? localStorage : {},
          e.version = r("data-version") || null ,
          e.oauthProviders = JSON.parse(i("oauth-providers") || "[]"),
          n.exports
      });
	 System.registerDynamic("main", ["3", "4", "5", "d1", "2f", "7", "20"], !0, function (t, e, n) {
        "use strict";
        t("3");
          t("4");
          t("5");
          t("d1");
        var BlueBirdPRomise = t("2f")
          , angular = t("7")
          , PonyTownAppSettings = t("20");
        PonyTownAppSettings.debug && BlueBirdPRomise.config({
          warnings: !1,
          longStackTraces: !0
        });
        //  angular.element().ready(function () {
			//thanks to document.write magic this isn't so ready-ee anymore
          /*  return */
		  angular.bootstrap(document, ["app"]);
        //  }),
         return n.exports
      })
  }