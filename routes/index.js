const express = require('express');

const router = express.Router();

require('./user.routes')(router);
require('./product_category.routes')(router);
require('./product_sub_category.routes')(router);
require('./products.routes')(router);
require('./address.routes')(router);
require('./cart.routes')(router);
require('./order.routes')(router);
require('./blog.routes')(router);
require('./coupon.routes')(router);
require('./pet.routes')(router);
require('./auth.routes')(router);
require('./chat_room.routes')(router);
require('./message.routes')(router);
require('./feedback.routes')(router);
require('./ngo.routes')(router);
require('./events.routes')(router);
require('./veterinary.routes')(router);
require('./cart_item.routes')(router);
// admin routes
require('./admin/user.routes')(router);
require('./admin/product.routes')(router);

module.exports.router = router;
