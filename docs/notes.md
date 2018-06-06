| Sales Order | items  | batch    | parent DocRef | commit    |
| ----------- | ------ | -------- | ------------- | --------- |
| Create      | Create | Required | Required      | No Commit |
| Update      | Update | Optional | Required      | Optional  |
| Update      | Create | Optional | Required      | Optional  |

batch | docRef | create batch | Use Docref
Y | Y | N |
N | Y |

* multiple items -- DONE
* sales order update DONE
* SO update, SOI create DONE
* resolve error
* SO update, SOI update
* error - memory leak
