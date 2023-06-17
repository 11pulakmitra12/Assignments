const express = require('express');
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const options = require('./swagger/swagger.json');
const swaggerJsdoc = require("swagger-jsdoc");
const bodyParser = require('body-parser');


app.use(cors())
app.use(bodyParser.json())
require('./routes/route.validateToken')(app)

const swaggerDocument = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    explorer: true
}));


const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server running on port ${port}`))