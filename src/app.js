const express = require("express");
const cors = require("cors");
const apiErrorHandler = require("./middleware/error.middleware");
const { allowedOrigin } = require("./utils/cors");
const { categoryRouter } = require("./routes/category.route");
const { unitRouter } = require("./routes/unit.route");
const { expenseRouter } = require("./routes/expense.route");
const { productRouter } = require("./routes/product.route");
const { loginRouter } = require("./routes/auth.user.route");

const corsConfig = {
    origin: allowedOrigin,
};

const app = express();

app.use(cors(corsConfig));

app.get('/', (req, res) => {      
    res.send("Hello, world!");
});

//middleware
app.use(express.json());

categoryRouter(app);
unitRouter(app);
expenseRouter(app);
productRouter(app);
loginRouter(app);

app.use(apiErrorHandler);

module.exports = app;
