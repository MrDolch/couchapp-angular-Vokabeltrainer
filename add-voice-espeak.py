#!/usr/bin/python

import couchdb
import subprocess

couch = couchdb.Server("http://192.168.1.10:5984")
db = couch['vokabeltrainer']

rows = db.view('_design/couchapp/_view/phrases', group=True)
i = 0;
for row in rows:
	doc = row['value']
	if doc == None:
		continue
	
	print "%s %s %s" % (doc['_id'], doc['language'], doc['text'])
	
	p = subprocess.Popen('espeak -v %s --ipa=1 -q "%s"' % (doc['language'], doc['text']), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
	ipa = ""
	for line in p.stdout.readlines():
		ipa += line
		retval = p.wait()

	p = subprocess.Popen('espeak -v %s --stdout "%s" | base64' % (doc['language'], doc['text']), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
	sample = ""
	for line in p.stdout.readlines():
		sample += line
		retval = p.wait()

	espeakDoc = {'class':"EspeakSample",
		'phraseId': doc['_id'], 
		'language': doc['language'], 
		'text': doc['text'], 
		'ipa': ipa.strip(),
		'sample': sample}
	db.save(espeakDoc)
