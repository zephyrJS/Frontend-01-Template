var objects = [
    "eval",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt",
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "Array",
    "Date",
    "RegExp",
    "Promise",
    "Proxy",
    "Map",
    "WeakMap",
    "Set",
    "WeakSet",
    "Function",
    "Boolean",
    "String",
    "Number",
    "Symbol",
    "Object",
    "Error",
    "EvalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError",
    "ArrayBuffer",
    "SharedArrayBuffer",
    "DataView",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint16Array",
    "Uint32Array",
    "Uint8ClampedArray",
    "Atomics",
    "JSON",
    "Math",
    "Reflect"
  ].map(val => ({
    path: [val],
    object: this[val],
  }))
  
  console.log("objects", objects)
  
  const set = new Set();
  
  let cur;
  while (objects.length) {
    cur = objects.shift();
    if (set.has(cur.object)) {
      continue;
    }
    set.add(cur.object)
    console.log(cur.path.join(''))
    // if (cur.path[0] === "Date" && cur.path[1] === "__proto__") debugger
    let proto = Object.getPrototypeOf(cur.object)
    if (proto) {
      objects.push({
        path: cur.path.concat(["__proto__"]),
        object: proto
      })
    }
  
    for (let key of Object.getOwnPropertyNames(cur.object)) {
      const pro = Object.getOwnPropertyDescriptor(cur.object, key)
  
  
      if (pro.hasOwnProperty("value")
      && pro.value !== null
      && ["object"].includes((typeof pro.value))
      && pro.value instanceof Object
      ) {
        objects.push({
          path: cur.path.concat([key]),
          object: pro.value
        })
      }
      if (pro.hasOwnProperty("get") && (typeof pro.get === "function")) {
        objects.push({
          path: cur.path.concat([key]),
          object: pro.get,
        })
      }
      if (pro.hasOwnProperty("set") && (typeof pro.set === "function")) {
        objects.push({
          path: cur.path.concat([key]),
          object: pro.set,
        })
      }
    }
    // try {
      
    // } catch (error) {
    //   debugger;
    // }
  }