merge = (master, change) ->
    mergeProperties master, change, key for key of change
    master._created = change._created if master._created > change._created

mergeProperties = (master, change, key) ->
    if isPropertyAMap change, key
        [master[key], master._modified[key]] = [{},{}] if not master[key]
        for k, v of change[key]
            [master[key][k], master._modified[key][k]] = [v, change._modified[key][k]]

    else if (master._modified[key] || 0) < change._modified[key]
        [master[key], master._modified[key]] = [change[key], change._modified[key]]

isPropertyAMap = (o, key) ->
    Object.prototype.toString.call(o._modified[key]) == '[object Object]'

(key, values, rereduce) ->
    merge values[0], change for change in values
 #   values[0].keys = (values[0].keys||[]) + key
    return values[0]
