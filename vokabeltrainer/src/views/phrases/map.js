// Map function
function(doc) {
    if (doc.class==="Phrase") emit(doc.language, doc);
}
