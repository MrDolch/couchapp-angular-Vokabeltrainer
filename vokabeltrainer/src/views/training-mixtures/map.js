// Map function
function(doc) {
    if (doc.class==="TrainingMixture"){
		emit(doc.language, doc);
	}
}
