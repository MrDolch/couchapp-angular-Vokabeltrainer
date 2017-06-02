// Map function
function(doc) {
    if (doc.class==="Language") emit(doc._id, doc);
}
