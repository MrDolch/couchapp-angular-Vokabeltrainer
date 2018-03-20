function(key, values, rereduce) {
    master = values[0];
    for (i = 1; i < values.length; i++) {
        right = values[i];
        for (key in right._timestamps) {
            if ((master._timestamps[key] || 0) < right._timestamps[key]) {
                master[key] = right[key];
                master._timestamps[key] = right._timestamps[key];
            }
        }
    }

    return master;
}