var elasticlunr = require('elasticlunr');
fs = require('fs');

var index = elasticlunr(function () {
    this.addField('title');
    this.addField('body');
    this.setRef('id');
    this.saveDocument(true);
});

var doc1 = {
    "id": 1,
    "title": "Oracle released its latest database Oracle 12g",
    "body": "Yestaday Oracle has released its new database Oracle 12g, this would make more money for this company and lead to a nice profit report of annual year. Girl"

}

var doc2 = {
    "id": 2,
    "title": "Oracle released its profit report of 2015",
    "body": "Boy As expected, Oracle released its profit report of 2015, during the good sales of database and hardware, Oracle's profit of 2015 reached 12.5 Billion."
}

var doc3 = {
    "id": 3,
    "title": "Oracle is great",
    "body": "As a gay"
}

index.addField("Fuck")
index.addDoc(doc1);
index.addDoc(doc2);
index.addDoc(doc3);
fs.writeFile('./example_index.json', JSON.stringify(index), function (err) {
    if (err) throw err;
    console.log('done');
});

console.log(index.search("Oracle"));
console.log(index.getFields())
