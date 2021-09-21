var t = db.transaction(['people'], 'readonly');
var store = t.objectStore('people');
var index = store.index('name');
var range = IDBKeyRange.bound('B', 'D');
index.openCursor(range).onsuccess = function(e) {
    var cursor = e.target.result;
    if (cursor) {
        console.log(cursor.key + ':');
        for (var field in cursor.value) {
            console.log(cursor.value[field]);
        }
        cursor.continue();
    }
}