/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4287850865")

  // remove field
  collection.fields.removeById("autodate3342387181")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4287850865")

  // add field
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "autodate3342387181",
    "name": "autodate",
    "onCreate": true,
    "onUpdate": true,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  return app.save(collection)
})
