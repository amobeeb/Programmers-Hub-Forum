import express from 'express';
import bodyParser from 'body-parser';
import swaggerJSDocs from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import expressUpload from 'express-fileupload';
import routes from './routes/index';
import Response from './utils/index';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressUpload({ useTempFiles: true }));

const PORT = 8000;
const server = `http://localhost:${PORT}`;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'PROGRAMMERS_HUB_FORUM',
      description:
        'This application is developed towards creating an interactive platform for Programmers Hub Members',
      contact: {
        name: 'Fortune',
      },
      servwers: `${server}`,
    },
    basePath: '/api/v1',
  },
  // loop on all route
  apis: ['**/**.route.js'], // pass all in array
};

app.use('/api/v1', routes);
// serve swagger to all routes
const swaggerDOCS = swaggerJSDocs(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDOCS));

app.get('/', (req, res) => {
  Response(res, { status: 200, message: 'Welcome to programmers_Hub_Forum' });
});

app.listen(PORT, () => {
  console.log(`sever listening on ${server}`);
});

export default app;
