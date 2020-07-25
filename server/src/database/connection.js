import knex from 'knex';
import configs from '../../knexfile';

const connection = knex(configs);

export default connection;
