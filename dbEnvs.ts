import { Env } from 'https://deno.land/x/env@v2.2.0/env.js';
const env = new Env();

const hostName = env.require('HOST_NAME');
const password = env.require('PASSWORD');
const port = env.require('PORT');

export const ENVS = { hostName, password, port };
