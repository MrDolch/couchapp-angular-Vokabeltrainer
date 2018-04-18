mergeObject = (master, change) ->
    mergeProperty master, change, key for key of change
    master._created = change._created if master._created > change._created

mergeProperty = (master, change, key) ->
    if isPropertyAMap change, key
        [master[key], master._modified[key]] = [{},{}] if not master[key]
        for k, v of change[key]
            if isSubPropertyAMap change, key, k
                [master[key][k], master._modified[key][k]] = [{},{}] if not master[key][k]
                for l, w of change[key][k]
                    [master[key][k][l], master._modified[key][k][l]] = [w, change._modified[key][k][l]]
            else if (master._modified[key][k] || 0) < change._modified[key][k]
                [master[key][k], master._modified[key][k]] = [v, change._modified[key][k]]
    else if (master._modified[key] || 0) < change._modified[key]
        [master[key], master._modified[key]] = [change[key], change._modified[key]]

isPropertyAMap = (o, key) ->
    Object.prototype.toString.call(o._modified[key]) == '[object Object]'

isSubPropertyAMap = (o, key, k) ->
    Object.prototype.toString.call(o._modified[key][k]) == '[object Object]'

(key, values, rereduce) ->
    mergeObject values[0], change for change in values
    return values[0]
