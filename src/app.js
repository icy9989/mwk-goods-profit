const express = require("express");
const cors = require("cors");
const apiErrorHandler = require("./middleware/error.middleware");
const { allowedOrigin } = require("./utils/cors");

const { loginRouter } = require("./routes/auth.user.route");
const { categoryRouter } = require("./routes/category.route");
const { unitRouter } = require("./routes/unit.route");
const { productRouter } = require("./routes/product.route");
const { saleTransactionRouter } = require("./routes/sale_transaction.route"); 
const { expenseRouter } = require("./routes/expense.route");
const { expenseTransactionRouter } = require("./routes/expense_transaction.route")

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

loginRouter(app);
categoryRouter(app);
unitRouter(app);
productRouter(app);
saleTransactionRouter(app);
expenseRouter(app);
expenseTransactionRouter(app);

app.use(apiErrorHandler);

module.exports = app;
