import {
  Application,
  Router,
  send,
} from 'https://deno.land/x/oak@v10.6.0/mod.ts';
import { Client } from 'https://deno.land/x/postgres@v0.15.0/mod.ts';
import { ENVS } from './dbEnvs.ts';

type TMember = {
  id: number;
  created_at: string;
  name: string;
};

const parseBigInt = (membarTableData: TMember[]): TMember[] => {
  const parsedData = membarTableData.map((row) =>
    JSON.parse(
      JSON.stringify(row, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
      )
    )
  );
  return parsedData;
};

/**
 * Database Connection
 */
const postgresClient = new Client({
  user: 'postgres',
  database: 'postgres',
  hostname: ENVS.hostName,
  password: ENVS.password,
  port: ENVS.port,
});

await postgresClient.connect();

/**
 * Application Routings
 */
const app = new Application();
const router = new Router();

app.addEventListener('listen', ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? 'https://' : 'http://'}${
      hostname ?? 'localhost'
    }:${port}`
  );
});

app.addEventListener('error', (evt) => {
  console.log(evt.error);
});

// Static content
router.get('/static/:path+', async (ctx) => {
  await send(ctx, ctx.request.url.pathname, {
    root: Deno.cwd(),
  });
});

// Root Page Html
router.get('/', async (ctx) => {
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/static`,
    index: 'index.html',
  });
});

/**
 * API
 */
router.get('/api/v1/members', async (ctx) => {
  const result = await postgresClient.queryObject<TMember>(
    'select * from members'
  );
  console.log('result: ', result);
  const parsedData = parseBigInt(result.rows);
  parsedData.sort((a, b) => a.id - b.id);
  ctx.response.body = parsedData;
});

router.post('/api/v1/member', async (ctx) => {
  const reqBody = ctx.request.body();
  const requestData = await reqBody.value;
  console.log('requestData:', requestData);
  const result = await postgresClient.queryObject<TMember>(
    `insert into members (name) values ('${requestData.name}')`
  );
  console.log('result:', result);
  ctx.response.body = result.rows;
});

router.delete('/api/v1/member/:id', async (ctx) => {
  console.log('ctx.params:', ctx.params);
  const { id } = ctx.params;
  const result = await postgresClient.queryObject<TMember>(
    `delete from members where id='${id}'`
  );
  console.log('result:', result);
  ctx.response.body = result.rows;
});

router.put('/api/v1/member/:id', async (ctx) => {
  const { id } = ctx.params;
  const reqBody = ctx.request.body();
  const requestData = await reqBody.value;
  console.log('requestData:', requestData);
  const result = await postgresClient.queryObject<TMember>(
    `update members set name = '${requestData.name}' where id='${id}'`
  );
  console.log('result:', result);
  ctx.response.body = result.rows;
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
